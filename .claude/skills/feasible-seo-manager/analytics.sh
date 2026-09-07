#!/usr/bin/env bash
#
# Read campaign numbers back from a Feasible analytics site.
#
# Created: 2026-09-06
# Copyright (c) 2026 Cloudmanic Labs, LLC. All rights reserved.
#
# Every run of the manager skill measures through this script rather than
# hand-writing queries, because a six-month log is only worth keeping if week 3
# and week 19 were counted the same way. Change a query here and it changes
# everywhere at once.
#
# The API key never appears in a command line, an environment dump, or this
# repository. Supply it one of two ways:
#
#   FEASIBLE_API_KEY      the key itself, already in the environment
#   FEASIBLE_API_KEY_REF  a 1Password secret reference, read at call time
#
# The campaign's Harbor note names which reference to use. Nothing about the
# credential belongs in a public repo.

set -euo pipefail

API_BASE="${FEASIBLE_API_BASE:-https://app.feasible.lol}"
SITE="${FEASIBLE_SITE:-}"
RANGE="${2:-all}"

usage() {
  cat <<'USAGE'
Usage: analytics.sh <command> [date-range]

Commands
  summary     Visitors, visits, pageviews, bounce rate for the range
  organic     The committed metric: visitors arriving from organic search
  channels    Every acquisition channel, largest first
  sources     Referrer sources, largest first
  pages       Top 20 landing pages by pageviews
  entry       Top 20 entry pages for organic visitors only
  goals       Conversion events, by channel
  weekly      The full weekly reading, formatted for the Harbor note
  raw '<json>'  Send an arbitrary query body

Date range   A Feasible preset (day, 7d, 28d, 91d, month, year, all, realtime)
             or a JSON pair like '["2026-09-07","2026-10-06"]'. Defaults to all.

Environment
  FEASIBLE_SITE          required, e.g. feasible.lol
  FEASIBLE_API_KEY       the key, or
  FEASIBLE_API_KEY_REF   a 1Password reference such as op://Vault/Item/credential
  FEASIBLE_API_BASE      defaults to https://app.feasible.lol
USAGE
}

# Resolve the key at the last possible moment and keep it in a local, so it is
# never exported to a child process that might log its environment.
resolve_key() {
  if [[ -n "${FEASIBLE_API_KEY:-}" ]]; then
    printf '%s' "$FEASIBLE_API_KEY"
    return
  fi
  if [[ -n "${FEASIBLE_API_KEY_REF:-}" ]]; then
    if [[ -z "${OP_SERVICE_ACCOUNT_TOKEN:-}" && -r "$HOME/.config/1password.json" ]]; then
      OP_SERVICE_ACCOUNT_TOKEN="$(jq -r .service_account_token "$HOME/.config/1password.json")"
      export OP_SERVICE_ACCOUNT_TOKEN
    fi
    op read "$FEASIBLE_API_KEY_REF"
    return
  fi
  echo "error: set FEASIBLE_API_KEY or FEASIBLE_API_KEY_REF" >&2
  exit 1
}

# A date range is either a preset word or a JSON array. Emit it as the correct
# JSON type so a literal pair is not quoted into a meaningless string.
range_json() {
  if [[ "$RANGE" == \[* ]]; then printf '%s' "$RANGE"; else printf '"%s"' "$RANGE"; fi
}

# The key reaches curl through a config file on stdin, never as an argument.
# Two separate exposures are being closed here, and both have burned people:
#   ps      an argument is readable by every user on the box for the life of
#           the process, so --header "Authorization: ..." is not safe
#   set -x  a trace prints every expanded argument, so even building the header
#           with printf leaks it to anyone who debugs the script
# Tracing is therefore suppressed across the whole function and restored after.
query() {
  local body="$1" key trace_was_on=0
  case "$-" in *x*) trace_was_on=1; set +x ;; esac

  key="$(resolve_key)"
  printf 'header = "Authorization: Bearer %s"\n' "$key" \
    | curl -sS --max-time 30 -K - \
        --url "$API_BASE/api/v2/query" \
        --request POST \
        --header "Content-Type: application/json" \
        --data-binary "$body"

  local rc=$?
  unset key
  [[ $trace_was_on -eq 1 ]] && set -x
  return $rc
}

# A failed query returns a 200 with an error field on some paths, so check the
# payload rather than trusting the status code.
check() {
  local out="$1"
  if [[ "$(jq -r '.error // empty' <<<"$out")" != "" ]]; then
    echo "API error: $(jq -r '.error' <<<"$out")" >&2
    exit 1
  fi
  printf '%s' "$out"
}

[[ $# -ge 1 ]] || { usage; exit 1; }
[[ -n "$SITE" ]] || { echo "error: set FEASIBLE_SITE" >&2; exit 1; }

CMD="$1"
R="$(range_json)"
GOAL="${FEASIBLE_GOAL:-register-click}"
ORGANIC='["is","visit:channel",["Organic Search"]]'

case "$CMD" in
  summary)
    BODY="{\"site_id\":\"$SITE\",\"metrics\":[\"visitors\",\"visits\",\"pageviews\",\"bounce_rate\"],\"date_range\":$R}"
    check "$(query "$BODY")" \
      | jq -r '.results[0].metrics | "visitors=\(.[0]) visits=\(.[1]) pageviews=\(.[2]) bounce=\(.[3])"'
    ;;

  organic)
    BODY="{\"site_id\":\"$SITE\",\"metrics\":[\"visitors\",\"visits\",\"pageviews\"],\"date_range\":$R,\"filters\":[$ORGANIC],\"include\":{\"comparisons\":{\"mode\":\"previous_period\"}}}"
    check "$(query "$BODY")" \
      | jq -r '.results[0] | "organic_visitors=\(.metrics[0]) organic_visits=\(.metrics[1]) organic_pageviews=\(.metrics[2]) prev=\(.comparison.metrics[0] // "n/a") change=\(.comparison.change[0] // "null")"'
    ;;

  channels)
    BODY="{\"site_id\":\"$SITE\",\"metrics\":[\"visitors\",\"visits\",\"pageviews\"],\"date_range\":$R,\"dimensions\":[\"visit:channel\"],\"order_by\":[[\"visitors\",\"desc\"]]}"
    check "$(query "$BODY")" | jq -r '.results[] | [.dimensions[0], .metrics[0], .metrics[1], .metrics[2]] | @tsv'
    ;;

  sources)
    BODY="{\"site_id\":\"$SITE\",\"metrics\":[\"visitors\"],\"date_range\":$R,\"dimensions\":[\"visit:source\"],\"order_by\":[[\"visitors\",\"desc\"]],\"pagination\":{\"limit\":25}}"
    check "$(query "$BODY")" | jq -r '.results[] | [(if .dimensions[0] == "" then "(direct)" else .dimensions[0] end), .metrics[0]] | @tsv'
    ;;

  pages)
    BODY="{\"site_id\":\"$SITE\",\"metrics\":[\"pageviews\",\"visitors\"],\"date_range\":$R,\"dimensions\":[\"event:page\"],\"order_by\":[[\"pageviews\",\"desc\"]],\"pagination\":{\"limit\":20}}"
    check "$(query "$BODY")" | jq -r '.results[] | [.dimensions[0], .metrics[0], .metrics[1]] | @tsv'
    ;;

  entry)
    BODY="{\"site_id\":\"$SITE\",\"metrics\":[\"visitors\",\"visits\"],\"date_range\":$R,\"dimensions\":[\"visit:entry_page\"],\"filters\":[$ORGANIC],\"order_by\":[[\"visitors\",\"desc\"]],\"pagination\":{\"limit\":20}}"
    check "$(query "$BODY")" | jq -r '.results[] | [.dimensions[0], .metrics[0], .metrics[1]] | @tsv'
    ;;

  goals)
    # event:goal can only be filtered on, never grouped by, so break the
    # conversion event down across channels instead.
    BODY="{\"site_id\":\"$SITE\",\"metrics\":[\"visitors\",\"events\"],\"date_range\":$R,\"dimensions\":[\"visit:channel\"],\"filters\":[[\"is\",\"event:name\",[\"$GOAL\"]]],\"order_by\":[[\"events\",\"desc\"]]}"
    check "$(query "$BODY")" | jq -r '.results[] | [.dimensions[0], .metrics[1], .metrics[0]] | @tsv'
    ;;

  weekly)
    B1="{\"site_id\":\"$SITE\",\"metrics\":[\"visitors\",\"pageviews\"],\"date_range\":$R}"
    B2="{\"site_id\":\"$SITE\",\"metrics\":[\"visitors\",\"visits\",\"pageviews\"],\"date_range\":$R,\"filters\":[$ORGANIC]}"
    B3="{\"site_id\":\"$SITE\",\"metrics\":[\"visitors\",\"events\"],\"date_range\":$R,\"filters\":[$ORGANIC,[\"is\",\"event:name\",[\"$GOAL\"]]]}"
    ALL="$(check "$(query "$B1")")"
    ORG="$(check "$(query "$B2")")"
    CNV="$(check "$(query "$B3")")"
    printf 'range\t%s\n'             "$RANGE"
    printf 'all_visitors\t%s\n'      "$(jq -r '.results[0].metrics[0]' <<<"$ALL")"
    printf 'all_pageviews\t%s\n'     "$(jq -r '.results[0].metrics[1]' <<<"$ALL")"
    printf 'organic_visitors\t%s\n'  "$(jq -r '.results[0].metrics[0]' <<<"$ORG")"
    printf 'organic_visits\t%s\n'    "$(jq -r '.results[0].metrics[1]' <<<"$ORG")"
    printf 'organic_pageviews\t%s\n' "$(jq -r '.results[0].metrics[2]' <<<"$ORG")"
    printf 'organic_%s\t%s\n' "$GOAL" "$(jq -r '.results[0].metrics[1]' <<<"$CNV")"
    ;;

  raw)
    [[ $# -ge 2 ]] || { echo "error: raw needs a JSON body" >&2; exit 1; }
    query "$2" | jq .
    ;;

  -h|--help|help) usage ;;
  *) echo "unknown command: $CMD" >&2; usage; exit 1 ;;
esac
