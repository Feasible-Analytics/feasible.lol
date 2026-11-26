---
# Created: 2026-11-16
# Copyright (c) 2026 Cloudmanic Labs, LLC. All rights reserved.
title: "How Feasible is built: one Go binary and a SQLite file per account"
seotitle: "How Feasible is built: one Go binary, a SQLite file per account"
slug: "how-feasible-is-built"
description: "Feasible is web analytics in one 8 MB Go binary, with one SQLite file per account. Here's how the visitor ID works without cookies, how events reach disk, and what's still hard."
lede: "One binary, one SQLite file per account, no cookies. Here's the code that does it, and the parts that don't work well yet."
date: 2026-11-16
checked: 2026-11-16
author: "Spicer Matthews"
---

The whole of Feasible is one file. You download about 8 MB, run it, and you have web analytics: the dashboard, the tracking script, the email reports, the API.

You don't need Docker, and there's no Postgres, no ClickHouse and no queue. I want to show how that works, with the code, and then show where it hurts.

Everything below is in [the repo](https://github.com/Feasible-Analytics/app.feasible.lol). It's AGPL-3.0.

## Why so small

Counting pageviews is a small job that got sold as a big one.

A site with a million pageviews a month sends less than half an event a second. Stored with every index and summary we keep, that month is about 300 MB. The measurements are in [`internal/bench/RESULTS.md`](https://github.com/Feasible-Analytics/app.feasible.lol/blob/main/internal/bench/RESULTS.md).

A job that size doesn't need a cluster. So I built for the size it is.

## One binary

Feasible is written in Go. The React dashboard, the server-rendered pages, the tracker, the email templates, the migrations and the bot lists are compiled into the binary with `go:embed`. This is the dashboard's:

```go
// assetFS holds the compiled bundle. The build writes app.js, app.css and
// index.html here; nothing else in the directory is served.
//
//go:embed assets/index.html assets/app.js assets/app.css
var assetFS embed.FS
```

The compiled front end is committed, so building from source is `go build -o feasible ./cmd/feasible` and you don't need Node unless you change the dashboard.

The SQLite driver is `modernc.org/sqlite`, which is pure Go. No cgo means one machine cross-compiles every release: Linux, macOS and Windows, on amd64 and arm64. Each archive is about 8 MB.

Upgrading is replacing the file and running `feasible db migrate`. Migrations never run on their own. A binary that's newer than its databases refuses to start and tells you the command.

## One SQLite file per account

A small `system.db` holds users, teams and sites. Each account's events live in their own SQLite file.

That one choice does a lot of work:

- Deleting an account's analytics is deleting a file. Nothing is left behind in a shared table.
- A backup is `feasible db backup`, which runs SQLite's `VACUUM INTO` on each file and writes clean copies.
- A report for one account only ever opens that account's file.
- The whole install is one directory.

Every connection is opened with the same settings, and they aren't optional:

```go
const Pragmas = "_pragma=journal_mode(WAL)" +
    "&_pragma=synchronous(FULL)" +
    "&_pragma=secure_delete(1)" +
    "&_pragma=busy_timeout(5000)" +
    "&_pragma=foreign_keys(1)" +
    "&_pragma=cache_size(-64000)" +
    "&_pragma=mmap_size(268435456)" +
    "&_pragma=temp_store(MEMORY)" +
    "&_pragma=wal_autocheckpoint(1000)"
```

WAL means a dashboard read never blocks a write. `synchronous(FULL)` is the expensive one, and it's there on purpose. I'll come back to it.

## Counting visitors without a cookie

Feasible sets no cookie and never writes an IP address to disk. It still has to tell you how many people visited.

Each event gets a visitor number. It's a hash of four things the request already carries:

```go
// Fingerprint computes the visitor id.
//
//    user_id = SipHash-2-4(key = daily_salt,
//                          msg = user_agent || client_ip || site_domain || root_domain)
func Fingerprint(salt []byte, userAgent, clientIP, siteDomain, rootDomain string) int64 {
    var msg strings.Builder
    msg.Grow(len(userAgent) + len(clientIP) + len(siteDomain) + len(rootDomain))
    msg.WriteString(userAgent)
    msg.WriteString(clientIP)
    msg.WriteString(siteDomain)
    msg.WriteString(rootDomain)

    k0, k1 := saltKey(salt)

    return int64(siphash.Hash(k0, k1, []byte(msg.String())))
}
```

The IP address is used in memory for this hash and for a city lookup against a local database file. Then it's dropped. Only the number is stored.

The site's domain is part of the message. So the same person on two different sites gets two unrelated numbers.

The key changes every UTC day. There's no table of keys and no rotation job. Each day's key is derived from one deployment secret and the day number:

```go
// derive uses HMAC for domain-separated, deterministic expansion of the shared
// value and UTC day into the 16 bytes consumed by SipHash.
func (s *Source) derive(day int64) []byte {
    mac := hmac.New(sha256.New, s.shared)
    _, _ = mac.Write([]byte("feasible-visitor-salt-v1"))

    var encoded [8]byte
    binary.BigEndian.PutUint64(encoded[:], uint64(day))
    _, _ = mac.Write(encoded[:])

    return append([]byte(nil), mac.Sum(nil)[:Size]...)
}
```

Same browser, same day, same number. The next day it's a different number, and reports never join the two.

I want to be exact about what this is. It's pseudonymous, not anonymous. Someone who only has the database can't turn a number back into a person. But whoever holds the deployment secret can derive a past day's key and test guesses of an IP and user agent against the stored hashes. Daily keys aren't stored, but they can be recomputed. If you self-host, that secret is yours and nobody else's.

It also costs you things. There's no returning-visitor rate and no cohorts. Daily visitors don't add up to weekly visitors. An office behind one address, all on the same browser version, can count as one person.

I think that's the right trade for a traffic counter. You should know it's a trade.

## Getting an event to disk

SQLite is slow if you commit every row and fast if you commit in batches. So events wait in a buffer, briefly:

```go
// DefaultBufferSize is how many events accumulate before a flush is forced.
const DefaultBufferSize = 250

// DefaultFlushInterval is the longest an event waits before being written.
const DefaultFlushInterval = 500 * time.Millisecond
```

A flush happens at 250 events or half a second, whichever comes first. The batch is grouped by account and written as one transaction per account.

The request doesn't get its `202` until that transaction is fsynced. That's what `synchronous(FULL)` buys. When Feasible says it has your event, the event is on disk and not in a buffer that a crash would take with it.

Your visitors don't pay for the wait. The script sends with `keepalive` and doesn't wait for the answer.

Reports don't scan raw events for finished days. Every hour a worker rebuilds hourly and daily summary tables, and reports read those for every finished day they cover. Only what's left, like today, comes from raw events. On a test site with 1.39 million events spread over a year, top pages for the last 28 days comes back in 81 to 111 ms. Twelve months takes 0.4 to 0.7 seconds.

## What's hard

This is the part I'd want to read first.

**Throughput falls as accounts share a writer.** On an M4 laptop, under saturation, one account takes about 4,700 events a second. Spread the same load over more accounts and it drops:

| Accounts | Events a second |
|---:|---:|
| 1 | 4,739 |
| 4 | 3,018 |
| 16 | 1,661 |
| 64 | 691 |

There's no plateau. One shared 250-event buffer spread over many accounts becomes many small transactions, each with its own fsync. At 256 accounts the benchmark currently fails partway with 503s. The fix points at batching per account, and it isn't done.

Keep the scale in mind, though. A site with a million pageviews a month sends under half an event a second, and 691 a second is about 1.8 billion a month. The curve is ugly. The floor is still high.

**Raw scans are slow.** The summaries make the common reports fast. A report that has to read raw events isn't: 28 days of top pages takes about 2 seconds that way, and a year takes 8 to 13. Filtering by country doesn't narrow the scan. That's an index I haven't built.

**SQLite isn't compact.** A column store would hold the same events in far fewer bytes. I gave that up for one file, one process and nothing to tune.

**I haven't measured a minimum server.** The benchmark records throughput, disk and read times. It doesn't record memory. So I don't publish a minimum, and the laptop numbers above are laptop numbers.

**The hosted service is one server.** It's in Montreal. There's no EU region. Releases are still numbered 0.0.x, and they ship often.

**The script isn't the smallest.** It's 3,629 bytes gzipped. The build fails if it grows past 3.75 KiB. Others are smaller.

## Try it

There's a [live demo](https://app.feasible.lol/public/stopoverpayingforanalytics.com) with no sign-up. Its traffic is generated, so click anything.

Self-hosting is free, and it's the same binary with every feature in it. The [quick start](https://github.com/Feasible-Analytics/app.feasible.lol#self-host) is a download, eight settings and three commands.

If you'd rather I ran it, the hosted version is $99 a year for every site you have, up to a million pageviews a month. There's a 30-day trial and it doesn't ask for a card.

If you find where the SQLite design breaks, [open an issue](https://github.com/Feasible-Analytics/app.feasible.lol/issues). I'd like to hear it.
