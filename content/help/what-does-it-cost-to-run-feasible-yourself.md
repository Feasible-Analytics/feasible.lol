---
title: "What does it cost to run Feasible yourself?"
description: "Whatever the smallest VPS costs. One core, 512 MB of RAM, a gigabyte of disk. That's the real minimum, measured."
category: "self-hosting"
weight: 20
---

Whatever the cheapest box at your host costs.

The measured minimum:

| | Minimum | Comfortable |
|---|---|---|
| CPU | 1 core | 2 cores |
| Memory | 512 MB | 2 GB |
| Disk | 1 GB plus data | an SSD |
| OS | Linux, macOS or BSD - x86-64 or arm64 | |

That's the whole shopping list. No database server, no message queue, no cache, no column store, nothing to tune.

The numbers behind it, all measured rather than estimated:

- **About 6,000 events per second** through the full accept path, per process.
- **Roughly 13 microseconds** to accept an event.
- **About 210 bytes stored per event.** A million pageviews stored for a full year comes to a measured 294 MB. At a million a month, a year is about 3.5 GB.

So the storage cost of a busy site for a year is smaller than a phone photo album.

**The real saving is operational, not the disk.** It's one binary and one directory of SQLite files. There's no cluster to keep quorum on, no separate analytical database whose own documentation asks for 32 GB of RAM before it'll behave, and nothing that wakes you up because a node fell out. Back it up by copying files - there's a `db backup` command that writes a consistent snapshot.

What it costs you is time, and that's the comparison. Upgrades, TLS renewals, disk alarms, the 2am one. If your answer to that is "fine, I already run servers", self-hosting is cheap. If it's "I'd rather not", [$9.99 a month](/pricing/) is the alternative and it's the same software.

[How to start it](/help/can-i-run-feasible-myself/) · [do I need Docker](/help/do-i-need-docker/)
