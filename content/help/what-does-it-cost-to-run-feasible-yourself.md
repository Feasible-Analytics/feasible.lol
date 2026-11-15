---
title: "What does it cost to run Feasible yourself?"
description: "A small VPS and your time. We haven't measured a minimum machine, so here's what we have measured: throughput, disk and report speed."
category: "self-hosting"
weight: 20
---

A small VPS, plus your time.

We haven't measured a minimum machine, so we don't publish one. What we have measured is in
[`internal/bench/RESULTS.md`](https://github.com/Feasible-Analytics/app.feasible.lol/blob/main/internal/bench/RESULTS.md), taken on a 10-core laptop:

- **About 4,700 events a second** under sustained load, for one account, each committed to disk
  before it's acknowledged. It drops to roughly 1,700 when one process carries sixteen accounts,
  because each account is a separate database with its own commit. A site doing a million pageviews
  a month averages under half an event a second.
- **About 300 MB on disk** for a million pageviews, with every index and roll-up built. That's about
  210 bytes an event, so a million pageviews a month is about 3.5 GB a year.
- **0.4 to 0.7 seconds** for a 12-month report, read from the roll-ups.

So the storage cost of a busy site for a year is smaller than a phone photo album.

There are builds for Linux, macOS and Windows, on amd64 and arm64. No database server, no message
queue, no cache, no column store, nothing to tune.

**The real saving is operational, not the disk.** It's one binary and one directory of SQLite files. There's no cluster to keep quorum on, no separate analytical database whose own documentation asks for 32 GB of RAM before it'll behave, and nothing that wakes you up because a node fell out. Back it up with `feasible db backup`, which writes a consistent snapshot of every database.

What it costs you is time, and that's the comparison. Upgrades, TLS renewals, disk alarms, the 2am one. If your answer to that is "fine, I already run servers", self-hosting is cheap. If it's "I'd rather not", [$9.99 a month](/pricing/) is the alternative and it's the same software.

[How to start it](/help/can-i-run-feasible-myself/) · [do I need Docker](/help/do-i-need-docker/) · [the numbers in full](/docs/self-hosting/#how-big-a-server)
