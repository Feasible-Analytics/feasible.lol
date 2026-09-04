---
title: "Why it's fast and small"
description: "A 3,377-byte tracking script, reports that answer in 81 to 111 ms, about 210 bytes stored per event, and one binary that runs on 512 MB of RAM."
lede: "A 3,377-byte script on your pages, and reports that come back before you've finished looking at the screen."
weight: 120
checked: 2026-09-03
note: |
  Above roughly ten million estimated row reads, a query can come back as a
  labeled sample with a button to demand the exact number. And a filtered report
  that has to touch raw rows still scans every session in the range — a heavily
  filtered all-time query is the slow case, and we know it.
---

**3,377 bytes gzipped.** That's the whole tracking script — 7,099 bytes before
compression, one request, cached for an hour.

Measured against Google's `gtag.js`, both gzipped, in September 2026, that's
about 43 times smaller. We're not going to dress that up as a revolution; it's
a few hundred milliseconds on a phone on a bad connection, once. But it's a few
hundred milliseconds you're currently spending to count pageviews.

## The size is a build failure, not a goal

There's a byte budget of 3,584 for the base script. Go over it and the build
exits 1 — enforced twice, once in the bundler and again in a Go test that reads
the shipped file.

That's the only way script weight stays small. A performance target that lives
in a doc gets missed by 200 bytes at a time, in commits that each look
reasonable, until one day the "lightweight" script is 40 KB and nobody can point
at the change that did it. A number that breaks the build gets argued about
before it ships.

The optional Web Vitals module is a separate 3,946 gzipped bytes, dynamically
imported only if you turn it on, so people who don't want it don't carry it.

The transport is `fetch` with `keepalive` sending `text/plain`, which avoids a
CORS preflight — one request per event, not two. Every event is written to a
local outbox before the request starts and replayed with the same idempotency key
until a `2xx` clears it, so a flaky connection loses nothing and double-counts
nothing.

## Reports read from roll-ups

Top pages over the last 28 days: **81 to 111 ms**. Over twelve months: 0.4 to
0.7 seconds.

The same reports computed from raw rows take 2.1 to 2.5 seconds and 7.6 to 13.1
seconds. That gap is the entire argument for pre-aggregating: not that
roll-ups are clever, but that a 28-day report is something you open forty times
a day and eleven seconds is the difference between a tool you use and a tool you
avoid.

Today's numbers come from raw events instead — under 25 ms, and always current,
because a roll-up that lags is worse than no roll-up when you're watching a
launch.

## About 210 bytes an event

A million pageviews, stored for a year, is a measured **293.8 MB** database. At a million a month, a year is about **3.5 GB**. All in —
events, sessions, roll-ups, the lot.

Ingest handles about **6,000 events a second per process**, and accepting one
takes around **13 microseconds** at the median, flat regardless of write load.
The minimum machine is 1 CPU core, 512 MB of RAM and 1 GB of disk. Two cores and
2 GB is comfortable.

The dashboard is held to the same standard. React and `react-dom` are its only
two runtime dependencies — no charting library, no map library, no router, no
state library. The line chart is hand-drawn SVG. The world map is generated
country outlines. The flags are Unicode characters rather than 250 images. The
page fetches no fonts from anywhere, and source favicons are proxied through our
own origin so opening your reports doesn't tell anyone else you did.

## Why one binary and one file

Go 1.26, SQLite with a pure-Go driver so there's no cgo, compiled into a single
executable. No Docker, no Postgres, no ClickHouse, no Redis, no message queue.
`feasible serve` is the whole product.

This isn't a claim about storage density — a column store beats SQLite on disk,
and we're not going to pretend otherwise. The claim is operational, and it's the
one that decides whether you can actually run this.

A column-store analytics stack is a different sport. ClickHouse's own
documentation recommends 32 GB of RAM for ClickHouse alone, before you add the
application in front of it, the cache, the queue and the person who understands
all four at 3am. Feasible runs on 512 MB, in one process, with one file to back
up and nothing to tune. `feasible db backup` writes a consistent snapshot;
that's the disaster recovery plan.

For us that means the hosted service costs little enough that $9.99 a month
works with room to spare. For you it means [self-hosting](/open-source/) is a
weekend afternoon and a small VPS, not a cluster and an on-call rotation. Same
binary either way — there's no cut-down build.

The measurements above come from the benchmark suite in the repository, on an
Apple M4 laptop. You can [run them yourself](/open-source/), which is the only
reason to publish numbers at all.

More on what the script does in [the docs](/docs/script-options/), and what
happens when a number is an estimate in [metric definitions](/docs/metrics/).
