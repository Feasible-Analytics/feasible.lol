---
title: "What it costs to count a million pageviews"
slug: "what-it-costs-to-count-a-million-pageviews"
description: "A million pageviews a month is a 294 MB file and a $4 server. Here's the measured arithmetic, and the published price lists next to it."
lede: "We measured what a million pageviews a month actually asks of a machine, then priced the machine. Then we put the invoices next to it."
date: 2026-08-21
checked: 2026-09-03
---

A pageview, stored the way we store it, is 210 bytes. A million of them a month, kept for a full year, is a 294 MB file.

That's most of the post. But nobody's analytics invoice looks like a 294 MB file, so it's worth walking the rest of the way slowly.

## What a million pageviews asks of a machine

A million pageviews isn't a million rows. Scroll and engagement pings ride along so you can have time-on-page and scroll depth, so the honest event count for a million-pageview month is about 1.39 million. Over 365 days that's a 293.8 MB account database, plus 4.2 MB for the system database that holds accounts, sites and sessions.

The write rate is the part people get wrong. A million pageviews a month *sounds* like load. Spread over a month it's about 0.4 writes a second.

One Feasible process accepts around 6,000 events a second through the whole path — parse, geolocate, hash, drop the IP, commit. Median time to accept one is 13 microseconds, and it stays there regardless of what else is writing. So the machine is doing roughly one fifteen-thousandth of what it could.

Reads are the same story, for a boring reason: the reports are built when the events arrive, not when you open the page. Twenty-eight days of top pages comes back in 81 to 111 milliseconds. Twelve months takes 0.4 to 0.7 seconds.

The floor we publish is one CPU core, 512 MB of RAM and a gigabyte of disk. What we'd actually put a busy site on is two cores and 2 GB, because headroom is cheap and pager duty isn't.

Those figures are from `internal/bench/RESULTS.md` in [our repo](https://github.com/Feasible-Analytics/app.feasible.lol), measured on a laptop. The repo's public and so is the benchmark. Run it and tell us if we're wrong.

## What that machine costs

This part is just shopping. Prices below are list, checked September 3, 2026.

| Host | Plan | RAM | Transfer | Per month | Per year |
|---|---|---|---|---|---|
| [DigitalOcean](https://www.digitalocean.com/pricing/droplets) | Basic, 1 vCPU | 512 MiB | 500 GiB | $4.00 | $48 |
| [DigitalOcean](https://www.digitalocean.com/pricing/droplets) | Basic, 1 vCPU | 1 GiB | 1,000 GiB | $6.00 | $72 |
| [Vultr](https://api.vultr.com/v2/plans) | `vc2-1c-1gb` | 1 GB | 1 TB | $5.00 | $60 |
| [Hetzner](https://www.hetzner.com/cloud/) | CX23, 2 vCPU | 4 GB | 20 TB | €5.49 net | ~€66 net |

One note on that last row, because stale numbers circulate: Hetzner raised prices on June 15, 2026 — the CX23 went from €3.99 to €5.49, and their ARM boxes are now *more* expensive than the Intel ones. Any Hetzner figure from an older blog post is wrong, including the ones we used to quote at each other.

Then bandwidth. Our tracking script is 3,377 bytes gzipped, 7,099 raw. Assume a deliberately pessimistic 30% of pageviews fetch it fresh rather than from cache: 300,000 × 3,377 bytes is about 1 GB a month, against the 500 GiB that $4 droplet includes. It's a rounding error, and it would still be a rounding error if we were ten times worse at caching.

Storage fits. CPU is asleep. Bandwidth doesn't register. The box is $48 to $72 a year.

We don't run one box, to be clear. Ingest is a separate tier from the app, and there's more than one of each, because a single machine that reboots is an outage and we'd rather it weren't. That's a redundancy bill. It isn't a large one, and it doesn't scale with your pageviews the way an invoice does.

## Not every architecture fits on that box

This is the honest caveat, and it cuts against us in one place.

Plausible's Community Edition runs three containers — their application, PostgreSQL and ClickHouse — and their README asks for "at least 2 GB of RAM" ([github.com/plausible/community-edition](https://github.com/plausible/community-edition), checked September 3, 2026). ClickHouse's own documentation recommends **32 GB** and warns that below 16 GB "you may experience various memory exceptions because default settings do not match this amount of memory" ([clickhouse.com/docs/operations/tips](https://clickhouse.com/docs/operations/tips), checked September 3, 2026).

That's not a knock on either. ClickHouse is a column store, and column stores are extraordinary at exactly the queries analytics asks. On ClickBench — ClickHouse's own benchmark, built on 100 million real pageview rows — ClickHouse stores a row in 145 bytes where SQLite takes 758. If we told you SQLite was more efficient on disk, we'd be lying to you by a factor of 5.2.

What SQLite buys us isn't bytes. It's that there's one file, one process, nothing to tune, no cluster to keep quorate, and a backup that's a file copy. On a machine this small, that's worth more than compression.

And credit where it's due before we talk about money: the privacy-friendly analytics companies got the important thing right, and got it right first. No cookies, no cross-site identity, no selling behavior to advertisers. They made that normal while everyone else was still arguing about it. The disagreement below is about a price, not about principles.

## What a million pageviews a month costs at each vendor

Annual list price, annual billing, at 1,000,000 pageviews a month. Checked September 3, 2026.

| Vendor and plan | Per year | Sites | Seats | Retention |
|---|---|---|---|---|
| [Matomo Cloud](https://matomo.org/pricing/) | $2,040 | 30 | 30 | Configurable |
| [Plausible Business](https://plausible.io/#pricing) | $1,390 | 10 | 10 | 5 years |
| [Plausible Growth](https://plausible.io/#pricing) | $1,040 | 3 | 3 | 3 years |
| [Plausible Starter](https://plausible.io/#pricing) | $690 | 1 | Owner only | 3 years |
| [Fathom](https://usefathom.com/pricing) | $600 | 75 | Not published | Forever |
| [Simple Analytics](https://www.simpleanalytics.com/pricing) | $600 | 10 | 1 | 3 years |
| [Pirsch Standard](https://pirsch.io/pricing) | $540 | 50 | Unlimited | Unlimited |
| [Umami Pro](https://umami.is/pricing) | $240 | 20 | 10 | 2 years |
| **Feasible** | **$99** | Unlimited | Unlimited | 5 years |

Two things about that table that matter more than the ordering.

**The plans aren't the same plan.** Plausible's $690 Starter is one site and no teammates, and custom properties, funnels and the Stats API all start on Business at $1,390. Comparing our price to Starter's would be the same trick we're complaining about, so we've listed all three.

**The units aren't the same unit.** Matomo bills in *hits* — [their own definition](https://matomo.org/faq/general/what-is-a-hit/) counts "a tracked page view, an event tracking, a download, an outlink, an onsite search or a content tracking request." Turn on download and outbound-link tracking and a million pageviews can be two or three million hits, which is a different row on that price list. Simple Analytics and Umami count each stored event *property* as a unit of its own. We wrote a [separate post about billing units](/blog/why-we-dont-charge-per-site/), because it's the part of the bill nobody puts on the comparison page.

## Where the gap comes from

Some of it is real. A stack with a column store, a relational database and a queue in front of it costs more to run than one binary and a file — genuinely, not as a rhetorical device. Support costs money. Salaries cost money. A company that raised outside money has a number it has to hit, and that number is set by the people who wrote the check, not by the server.

Our costs are different because our company is different. One plan. No sales team. No investors. Twenty-odd years of Cloudmanic Labs paying for itself. That isn't a virtue, it's a starting position — but it's why $99 works here and might not work somewhere else.

So: $48 to $72 a year for the machine. $99 to $2,040 a year for the service. We charge $99, both numbers are above, and we're not going to draw the line between them for you.

We registered a `.lol` domain before we ran any of this. Running it didn't change our minds.

The arithmetic is all reproducible — [the pricing page](/pricing/) has our side of it, [the comparisons](/compare/) have theirs, and the benchmark is in the repo. If a number here is wrong, mail `help@feasible.lol` and we'll fix the page.
