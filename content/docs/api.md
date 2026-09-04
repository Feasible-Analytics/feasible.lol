---
title: "The APIs"
description: "Send events, read numbers back with one query endpoint, manage sites and goals. One bearer key, in every plan."
lede: "Sending events, reading numbers back, keys and rate limits."
weight: 110
---

Two APIs: one to send events, one to read numbers back. Both are HTTP and JSON, both are documented
here in full, and there's no paid tier for API access. There isn't a plan check in the API code at
all.

## Sending events

```
POST /api/event
Content-Type: application/json

{
  "n": "pageview",
  "d": "example.com",
  "u": "https://example.com/pricing",
  "r": "https://duckduckgo.com/"
}
```

No authentication. The tracker runs in a browser, so a credential here would be a credential
published on your website. The site is identified by `d`, and an event for a domain we don't hold is
dropped.

| Field | Meaning |
|---|---|
| `n` | **Required.** Event name — `pageview`, `engagement`, or your own. |
| `d` | **Required.** Domain, matching a registered site. |
| `u` | The page URL. Strongly recommended: without it there's no page to report against. |
| `r` | The referrer. |
| `p` | Custom properties, as an object. |
| `t` | Page title. |
| `$` | Revenue, as `{"amount": 49.00, "currency": "USD"}`. |
| `sd` | Scroll depth, 1–100. |
| `e` | Engaged time in milliseconds, as a delta since the last measurement. |
| `k` | Idempotency key. Must be a valid UUID, or the request is a `400`. |
| `i` | `false` marks an event as non-interactive, so it can't un-bounce a visit. Absent means interactive. |
| `w` | Viewport width in CSS pixels, bucketed into a screen size. |
| `v` | Tracker version. |

`application/json`, `text/plain`, `application/x-www-form-urlencoded` and a missing content type are
all accepted, and the body is parsed as JSON regardless — the browser script sends `text/plain`
deliberately, to avoid a CORS preflight on every pageview. The body is capped at 64 KiB.

### Why it always answers 202

The response is `202 Accepted` as soon as the event enters the process's write buffer, before it
reaches the database that will hold it. And it's **also** `202` for an event we decided not to count.

The buffer flushes every half-second or 250 events and is drained on a graceful shutdown, but a
successful response isn't an fsync guarantee if the process crashes in that window.

A beacon can't act on a status code, so a 4xx would only produce a retry that fails identically.

For decisions made before the response, the reason travels in the `x-feasible-dropped` response
header. CORS exposes that header, and the browser tracker's callback returns it as `dropped`. Every
reason comes from a closed set, so it can be counted rather than read:

- `unknown_site` — the domain isn't one we hold.
- `account_dormant` — collection has stopped for this account.
- `site_deleted` — the site is gone.
- `shield_ip` — an address one of your [shields](/docs/shields/) excludes.
- `rate_limited` — too many requests from one source address.
- `invalid_payload` — properties or revenue that aren't the shape the field is for.
- `internal_error` — our failure, not yours, and counted as such.
- `bot`, `datacenter_ip`, `referrer_spam`, `outdated_browser`, `automation` — these are
  **classifications, not deletions**. The event is stored with the reason attached and left out of
  your reports by default, so you can put it back.

Four more reasons are decided after the response has already gone out. They're counted on your
ingestion health panel but can never appear in that header or the browser callback, so a bare `202`
can still become one of these:

- `shield_country`, `shield_page` and `hostname_not_allowed` — applied at the shard that holds your
  data. See [excluding traffic](/docs/shields/).
- `no_session_for_engagement` — a measurement whose pageview never arrived. It's only established
  when the orphaned measurement expires, half an hour after we answered it, which is why the counter
  is the only place you'll ever see it.

A genuine `400` is reserved for a body we couldn't read at all, a payload missing `n` or `d`, a
malformed `k`, and a request arriving straight from a data center with no forwarded address or user
agent — each with a sentence naming what's missing.

### Stating attribution for a server-side event

An offline or delayed conversion has no referrer of its own and would otherwise be Direct forever.
Send the attribution explicitly, as full-length top-level fields, and it's used instead:

```
{
  "n": "Purchase", "d": "example.com", "u": "https://example.com/order/complete",
  "referrer": "https://news.ycombinator.com/",
  "utm_source": "hn", "utm_medium": "referral", "utm_campaign": "launch"
}
```

### Debugging one request

Send `X-Debug-Request: true` with any event — the value has to be `true`, not `1` — and the response
is `200` with the fully derived event as JSON: the address we resolved and which header it came from,
whether a trusted proxy is configured, the visitor identifier and the salt day, the geolocation, the
channel, every field we'd store, the drop or bot reason, and the tally of anything truncated.

**Nothing is written.** It's answered before the buffer, the counters and the log, so it's safe
against production, and it's the fastest way to prove a proxy is passing the visitor's address
through.

### The no-script pixel

```
GET /api/event/pixel.gif?d=example.com[&u=][&n=][&r=][&p=]
```

Only `d` is required; the page URL falls back to the `Referer` header, and the event name defaults to
`pageview`. It always returns the image, and puts any failure in the same `x-feasible-dropped`
header.

### Rate limiting on ingest

100 requests a second per source address, with a burst of 500. A limited request is a `202` with the
reason `rate_limited`. No address is ever written to disk to enforce it.

## Reading numbers back

```
POST /api/v2/query
Authorization: Bearer feas_…
Content-Type: application/json

{
  "site_id": "example.com",
  "metrics": ["visitors", "pageviews", "bounce_rate"],
  "date_range": "28d",
  "dimensions": ["visit:source"],
  "filters": [["is", "visit:country", ["US"]]],
  "order_by": [["visitors", "desc"]],
  "pagination": { "limit": 100, "offset": 0 },
  "include": { "comparisons": { "mode": "previous_period" } }
}
```

Every report in the product is this one request with different metrics and dimensions. There's no
per-card endpoint and there won't be one: a handler per card is a handler per way for the same number
to be wrong.

**An unknown key is a 400, not a shrug.** A typo that's silently ignored is a query that answers a
question you didn't ask.

### Metrics

`visitors`, `visits`, `pageviews`, `events`, `views_per_visit`, `bounce_rate`, `visit_duration`,
`time_on_page`, `scroll_depth`, `exit_rate`, `conversion_rate`, `group_conversion_rate`,
`total_revenue`, `average_revenue`, `revenue_per_visitor`.

What each one means is on [metric definitions](/docs/metrics/). Numeric
[custom properties](/docs/custom-properties/) can also be aggregated —
`sum(event:props:price)`, `p95(event:props:load_ms)` and the rest.

### Dimensions

Event-scoped: `event:name`, `event:page`, `event:page_title`, `event:hostname`, `event:goal`.

Visit-scoped: `visit:source`, `visit:referrer`, `visit:channel`, `visit:utm_source`,
`visit:utm_medium`, `visit:utm_campaign`, `visit:entry_page`, `visit:exit_page`, `visit:country`,
`visit:region`, `visit:city`, `visit:device`, `visit:screen`, `visit:browser`,
`visit:browser_version`, `visit:os`, `visit:os_version`, `visit:language`.

Time: `time`, `time:minute`, `time:hour`, `time:day`, `time:week`, `time:month`. Bare `time` takes
whatever width the range implies.

And `event:props:<name>` for any custom property. `visit:screen_size`, `visit:device_type` and
`event:path` are accepted as aliases so an existing integration keeps working.

### Filters

Positional arrays. Filters AND together; the values inside one filter OR together.

```
["is", "visit:country", ["US", "CA"]]
["contains", "event:page", ["/blog/"], { "case_sensitive": false }]
["has_done", ["is", "event:name", ["Signup"]]]
```

Operators: `is`, `is_not`, `contains`, `contains_not`, `matches`, `matches_not`, and `has_done`,
which takes an inner filter and selects the visits that did that thing at some point.

A time dimension can't be filtered — narrow the date range instead.

### Date ranges

A preset: `day`, `24h`, `7d`, `28d`, `91d`, `month`, `last_month`, `year`, `12mo`, `all`, `realtime`
(30 minutes), `5m`.

Or a pair of dates, **with the end inclusive** — `["2026-08-01", "2026-08-31"]` covers all of the
31st.

Buckets are cut in the site's own time zone unless you override `timezone` with an IANA name. Set
`include.comparisons` to `previous_period`, `year_over_year` or `custom`; a period still in progress
is compared against the same elapsed time, not against a whole earlier one.

### Limits

Up to 5 dimensions, 32 filters, 1,000 values in one filter, 10,000 rows per page (100 by default),
and a 1 MiB request body.

### The answer

```
{
  "results": [
    { "metrics": [1204, 3310, 41.2], "dimensions": ["Google"],
      "comparison": { "metrics": [980, 2740, 44.0], "change": [22.9, 20.8, -6.4] } }
  ],
  "meta": { "interval": "day", "sources": ["rollup", "raw"], "sample_rate": 1, "present_index": null },
  "query": { "…": "the query as we resolved it, including the exact date bounds" }
}
```

Two details that save an argument later.

`change` is **null**, not zero and not infinity, when the earlier value was zero. There's no
percentage change from nothing.

And `meta.sources` tells you whether an answer came from raw events, from pre-computed summaries, or
from both, so "this number moved and nothing changed" has somewhere to start.

`meta.metric_warnings` is where a metric says it isn't telling you the whole truth — money left out
for want of an exchange rate, groups truncated, a bucket still filling. It's attached per metric
rather than to the whole query.

### When a query is sampled

A very large query may return `meta.sampling`. Its rate applies coherently to the primary and
comparison periods, and the metadata lists `scaled_metrics` separately from `direct_metrics`.

Additive totals are inverse-rate expanded. Rates, averages, minima, maxima and percentiles are
calculated directly within deterministic event or session row buckets and remain estimates that can
differ materially under skew. Sparse and empty samples are disclosed, and no confidence interval is
implied.

Send `"exact": true` to refuse automatic sampling. More on
[when a number is an estimate](/docs/metrics/#when-a-number-is-an-estimate).

## The v1 endpoints

If you're migrating from an established analytics API, these take the same query strings you already
send and are answered by the same engine:

- `GET /api/v1/stats/aggregate`
- `GET /api/v1/stats/timeseries`
- `GET /api/v1/stats/breakdown`
- `GET /api/v1/stats/realtime/visitors` — answers a bare integer, as that shape does

They take `site_id`, `metrics`, `period`, `date`, `filters`, `compare`, `with_bots` and
`with_imported`, with `property`, `limit` and `page` on breakdown, and `interval` on timeseries.

The filter grammar is the string one: `visit:country==US;event:page~/blog/`, with `==`, `!=`, `~` and
`!~`, clauses separated by `;` and values by `|`.

`period` accepts `30d` and `6mo`, which v2 doesn't, and they're converted to explicit bounds so a
migrating dashboard shows the same numbers.

One difference on purpose: a non-numeric `limit` or `page` is a `400` naming the problem, rather than
a 500.

## Managing sites, goals and the rest

Sites, goals, funnels, custom properties, shared links, guests, team memberships and the tracker
snippet are managed under `/api/v1/sites/…` and `/api/v1/teams/…`. [Webhooks](/docs/webhooks/) live
under `/api/v1/webhooks`.

A site is addressed by its domain, not a number. Goal, property and funnel definitions created
through the API are immediately available in settings and dashboard reports — see
[goals and funnels](/docs/goals-funnels/).

One thing to expect: `PUT /api/v1/teams/memberships` and `PUT /api/v1/sites/guests` never insert a
membership directly. They create a revocable invitation that expires in 48 hours, and return the same
shape whether or not the address already has an account. `owner` isn't an invitational role —
ownership moves only through the transfer workflow.

## API keys

A key looks like `feas_` followed by 43 characters. It's shown once, at creation, and stored only as
a hash. We can't recover it for you and wouldn't want to be able to.

Create one under *Settings → Team and members → API keys*, or from the command line:

```
feasible api-key create --team 1 --user 1 --name "Looker Studio"
feasible api-key list --team 1
feasible api-key revoke --team 1 --id <key id>
```

Revoking keeps the row and marks it revoked; a revoked key then behaves exactly as though it never
existed.

Four scopes exist — `stats:read`, `sites:read`, `sites:provision` and `webhooks:write` — and a key
created with no scopes carries all of them. Using a route your key doesn't cover is a `403` naming
the scope you need.

The key goes in `Authorization: Bearer …` and nowhere else. A key in a query string ends up in every
proxy log between you and us, so it isn't accepted there.

The same key works for the Stats API, the Sites API, webhooks and [the MCP server](/docs/mcp/).

## Rate limits

10,000 requests an hour per key by default, and a key can carry its own limit. It's per key rather
than per account, so one runaway script can't starve your dashboard.

Every authenticated response carries `X-RateLimit-Limit`, `X-RateLimit-Remaining` and
`X-RateLimit-Reset` (Unix seconds) — not only the ones that were refused, so you can back off before
you're told to. Over the limit is a `429` with `Retry-After` in seconds.

The window is a fixed hour rather than a sliding one, which is worth knowing if you're pacing a batch
job: up to twice the limit can pass across a boundary.

## A locked account

If a dashboard is locked for non-payment, the API is locked with it. Every `/api/v1/` and `/api/v2/`
route answers `402` with a reason and what to do about it. A key that can still answer "how many
visitors did I have" isn't a lock.

Collection never stops for that reason. The timetable is on the [pricing page](/pricing/).

## Getting your data out

Export is a screen rather than an API call. *Settings → Sites → your site → Import and export*
prepares a ZIP of the ten roll-up tables plus every raw event, and it works in every account state
including a locked one. See [import and export](/docs/import-export/).
