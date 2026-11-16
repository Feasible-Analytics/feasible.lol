#!/usr/bin/env bash
#
# Read and write a Harbor campaign note without losing anyone else's edits.
#
# Created: 2026-09-06
# Copyright (c) 2026 Cloudmanic Labs, LLC. All rights reserved.
#
# The campaign note has two authors: this skill on every run, and the person who
# owns the campaign whenever they feel like it. `harbor notes update` replaces
# the whole body and has no conflict guard, so the ordinary fetch-edit-write
# cycle silently destroys any edit made while the run was working. Over six
# months that is not a question of if.
#
# So reads record the note's version, and writes refuse when it has moved. The
# window shrinks from the length of a whole run to the moment between check and
# write.
#
#   note-write.sh read  <note-id> <file>   fetch the body, remember the version
#   note-write.sh write <note-id> <file>   write it back, only if unchanged
#   note-write.sh check <note-id>          has it moved since the read?
#
# Tasks live inside the note body as <harbor-task> blocks that a Markdown
# read-back drops, and harbor v0.1.5 deletes a task outright when a body update
# leaves its block out, without refusing or warning. So a write carries every
# block the stored note has back into the body as raw HTML, then checks the
# stored note still has them all. A harbor that offers --keep-tasks gets that
# flag instead.

set -euo pipefail

STATE_DIR="${NOTE_WRITE_STATE_DIR:-${TMPDIR:-/tmp}/harbor-note-write}"
mkdir -p "$STATE_DIR"

usage() {
  sed -n '/^#   note-write.sh/,/^#$/p' "$0" | sed 's/^# \{0,2\}//'
  exit 1
}

# The version marker. `usn` is Harbor's own per-record counter and moves on any
# write; content_hash is carried too so a mismatch can be reported as a real
# content change rather than a bump from a title or notebook edit.
version_of() {
  harbor notes get "$1" --json | jq -r '"\(.usn) \(.content_hash)"'
}

state_file() { printf '%s/%s' "$STATE_DIR" "$1"; }

cmd_read() {
  local id="$1" out="$2"
  harbor notes get "$id" --format markdown --json | jq -r '.content' > "$out"
  version_of "$id" > "$(state_file "$id")"
  echo "read $id -> $out (version $(cut -d' ' -f1 < "$(state_file "$id")"))"
}

cmd_check() {
  local id="$1" sf now
  sf="$(state_file "$id")"
  [[ -f "$sf" ]] || { echo "no recorded version for $id — read it first" >&2; exit 2; }
  now="$(version_of "$id")"
  if [[ "$now" == "$(cat "$sf")" ]]; then
    echo "unchanged"
  else
    echo "CHANGED since read: was $(cut -d' ' -f1 < "$sf"), now $(cut -d' ' -f1 <<<"$now")"
    return 1
  fi
}

cmd_write() {
  local id="$1" in="$2" sf now
  [[ -f "$in" ]] || { echo "no such file: $in" >&2; exit 1; }
  sf="$(state_file "$id")"
  [[ -f "$sf" ]] || { echo "refusing: no recorded version for $id. Read it first." >&2; exit 2; }

  now="$(version_of "$id")"
  if [[ "$now" != "$(cat "$sf")" ]]; then
    cat >&2 <<EOF
REFUSING TO WRITE. The note changed since it was read.

  version at read:  $(cut -d' ' -f1 < "$sf")
  version now:      $(cut -d' ' -f1 <<<"$now")

Somebody edited it while this run was working, and writing now would delete
their edit. Nothing has been written.

Re-read the note, apply the same change to the new content, and write again.
Do not work around this by re-reading and blindly overwriting: the point is to
carry their edit forward, not to get past the check.
EOF
    return 1
  fi

  # The note is unchanged since the read, so its task blocks are the ones the
  # read dropped. Note which they are before writing.
  local before
  before="$(task_ids "$id")"

  if keep_tasks_flag; then
    harbor notes update "$id" --file "$in" --keep-tasks --json | jq -r '"written, usn \(.usn)"'
  else
    local body
    body="$(mktemp "$STATE_DIR/body.XXXXXX")"
    with_task_blocks "$in" "$before" > "$body"
    harbor notes update "$id" --file "$body" --json | jq -r '"written, usn \(.usn)"'
    rm -f "$body"
  fi
  version_of "$id" > "$sf"

  local missing
  missing="$(comm -23 <(sort <<<"$before") <(task_ids "$id" | sort) | grep -v '^$' || true)"
  if [[ -n "$missing" ]]; then
    echo "WARNING: the note lost these tasks in the write: $missing" >&2
    echo "Recreate them in Harbor before the next run." >&2
    return 1
  fi
}

# task_ids lists the ids of the <harbor-task> blocks in the stored note, one a
# line, in body order.
task_ids() {
  harbor notes get "$1" --format html --json | jq -r '.content' \
    | grep -oE '<harbor-task[^>]*id="[^"]+"' | sed -E 's/.*id="([^"]+)".*/\1/' || true
}

# keep_tasks_flag reports whether this harbor build can keep tasks itself.
keep_tasks_flag() {
  harbor notes update --help 2>&1 | grep -q -- '--keep-tasks'
}

# with_task_blocks prints a Markdown body with each task block appended as raw
# HTML, skipping any the file already carries. The open and close tags go on
# separate lines so Markdown keeps the element as a block of its own rather
# than wrapping it in a paragraph. A task created in Harbor lands at the end of
# the body, so the end is where these go back.
with_task_blocks() {
  local file="$1" ids="$2" id
  cat "$file"
  while IFS= read -r id; do
    [[ -n "$id" ]] || continue
    grep -q "harbor-task id=\"$id\"" "$file" && continue
    printf '\n\n<harbor-task id="%s">\n</harbor-task>\n' "$id"
  done <<<"$ids"
}

[[ $# -ge 2 ]] || usage
case "$1" in
  read)  [[ $# -eq 3 ]] || usage; cmd_read  "$2" "$3" ;;
  write) [[ $# -eq 3 ]] || usage; cmd_write "$2" "$3" ;;
  check) cmd_check "$2" ;;
  *) usage ;;
esac
