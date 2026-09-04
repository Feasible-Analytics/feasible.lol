---
title: "Open source web analytics you can actually read"
seotitle: "Open source web analytics you can read and self-host"
description: "Feasible is AGPL-3.0-or-later. Read the code, run the same build we run on a 512 MB box, or let us host it for $9.99 a month. Go and SQLite."
lede: "The license, the repo, what self-hosting actually takes, and an honest look at how the other open-source options are put together."
kicker: "OPEN SOURCE"
weight: 50
wide: true
checked: 2026-09-03
faq:
  - q: "What license is Feasible under?"
    a: "AGPL-3.0-or-later, for the app and the browser tracker. You can run it, modify it and self-host it. If you offer it to others as a network service, you have to make your source available to those users."
  - q: "Is the self-hosted version cut down?"
    a: "No. It's the same build. Set `FEASIBLE_APP_HOSTED=false` and every feature is free and unrestricted — the API, funnels, custom properties, webhooks, the MCP server, raw event export, teams. There's no Community Edition and no license-key module."
  - q: "What does it take to run?"
    a: "One binary and one directory of SQLite files. The floor is 1 CPU core, 512 MB of RAM and 1 GB of disk; 2 cores and 2 GB is comfortable. No Docker, no Postgres, no ClickHouse, no Redis, no queue."
  - q: "Does AGPL mean I have to open-source my website?"
    a: "No. The license concerns the analytics software, not the site you point it at. It asks you to publish source if you modify Feasible and then offer it to other people over a network."
  - q: "Is Feasible's license more permissive than Plausible's?"
    a: "No. Both are AGPL-3.0-or-later — the same license. Anyone claiming otherwise is wrong, and you can check it in thirty seconds by opening both LICENSE files."
  - q: "Why pay $99 a year if I can run it for free?"
    a: "Because you'd rather not. Self-hosting means a box, backups, upgrades and being the person who gets paged. The hosted service is us doing that. Both get the same features."
---

Feasible is open source under **AGPL-3.0-or-later**, app and browser tracker
alike. The code is at
[github.com/Feasible-Analytics/app.feasible.lol](https://github.com/Feasible-Analytics/app.feasible.lol).

We're not going to claim a freer license than the well-known alternatives,
because we don't have one. Plausible's Community Edition is AGPL-3.0-or-later
too. That's the same license, and you can check it by opening both `LICENSE`
files.

What's actually different is what you get when you run it.

## Nothing is held back

Three things, all checkable.

**There's no cut-down edition.** The thing we run is the thing you can run.
Set `FEASIBLE_APP_HOSTED=false` and every product feature is free and
unrestricted: the public API, funnels, custom properties, webhooks, the built-in
MCP server, raw event export, teams and roles, sharing, email reports, alerts.
There's no separate "community" build with the good parts removed and no
long-term release branch that lags the hosted one.

**There's no directory in the repo you aren't allowed to compile.** No `ee/`, no
`extra/`, no all-rights-reserved corner. Search the repo for `license_key` or `premium` and you get nothing, because
there's no license-key module to find. The only hits for `enterprise` are us
writing that we don't have one.

**No feature is behind a higher tier.** There's one plan. The API package
contains no plan check at all — not as a policy, as a fact about the code.

That last one has a practical edge. **Raw event export is a button here**, in
every plan and every build: one ZIP with ten roll-up CSVs plus the raw events.

## How the field is licensed

Read on September 3, 2026 by opening the `LICENSE` file in each repository, not by
trusting a badge.

| Tool | License | Self-host | The thing worth knowing |
|---|---|---|---|
| **Feasible** | AGPL-3.0-or-later | Yes | Same build we host. No carve-out directory |
| [Plausible](https://github.com/plausible/analytics/blob/master/LICENSE.md) | AGPL-3.0-or-later, except `extra/` | Yes, as Community Edition | `extra/` grants no rights and holds funnels, SSO, consolidated view and the Sites API. CE is a twice-yearly release. Sites and seats are unlimited in CE, and the Stats API **is** included |
| [Matomo](https://github.com/matomo-org/matomo/blob/master/LICENSE) | GPL-3.0-or-later | Yes | GPL, not AGPL — no network-source clause. Premium plugins such as Funnels are proprietary under InnoCraft's EULA |
| [Umami](https://github.com/umami-software/umami/blob/master/LICENSE) | MIT | Yes | **More permissive than ours**, and MIT since 2020. Their FAQ says Cloud has email reports and a streaming API the self-hosted build doesn't |
| [PostHog](https://github.com/PostHog/posthog/blob/master/LICENSE) | MIT, except `ee/` | Yes | `ee/` needs an enterprise license to run in production |
| [GoatCounter](https://github.com/arp242/goatcounter/blob/master/LICENSE) | EUPL-1.2 (modified) | Yes | Small, careful, philosophically close to us |
| [Counter.dev](https://github.com/ihucos/counter.dev) | AGPL-3.0 | Yes | Tiny project, pay-what-you-want hosting |
| [Fathom](https://github.com/usefathom/fathom) | Closed. "Fathom Lite" is MIT | Lite only | Lite isn't archived, but no code change since January 2023 |
| Pirsch | Closed product; the Go tracking library is AGPL-3.0 | Enterprise tier only | — |
| Simple Analytics, Google Analytics 4, Cloudflare, Vercel, Netlify | Closed | No | — |

Two notes on fairness, because this table is the sort of thing people screenshot.

Plausible's core genuinely is AGPL, and calling the project "not really open
source" would be overreach. The narrow, checkable statement is the one that
lands: their `extra/` directory carries its own copyright file saying no rights
to use or distribute are granted, and their build excludes it from the Community
Edition compile path. That's a normal open-core arrangement — PostHog and Matomo
do versions of the same thing — but it's the difference between their
self-hosted build and ours.

And Umami's MIT license really is more permissive than our AGPL. If license
permissiveness is your first criterion, they win that row. We think "what's
actually in the build" matters more, but that's an opinion and you're entitled
to a different one.

## What self-hosting actually takes

One binary. One directory of SQLite files. That's the deployment.

```bash
cp .env.sample .env          # set FEASIBLE_APP_HOSTED=false
feasible db migrate
feasible account create --email owner@example.com --name "Account owner"
feasible serve
```

`account create` prints a generated password once — generated rather than typed,
so it never lands in shell history or a process list. Public signup is disabled
in self-hosted mode, so putting the login page on the internet doesn't let
strangers make accounts. The operator creates them.

**Requirements:** 1 CPU core, 512 MB of RAM, 1 GB of disk at the floor. Two cores
and 2 GB is comfortable. Written in Go 1.26, pure-Go SQLite with no cgo, one
binary, no Docker file in the repo because there's nothing to orchestrate. No
Postgres, no ClickHouse, no Redis, no message queue.

**Storage:** about 210 bytes an event. A million pageviews a month for a year is
roughly 3.5 GB.

**Throughput:** about 6,000 events per second per process, with accept latency
around 13 µs at the median. Reports read from pre-built roll-ups: 28 days of top
pages comes back in 81–111 ms; twelve months in 0.4–0.7 s.

We're not going to claim SQLite is more storage-efficient than a column store,
because it isn't. The claim is operational: one file, one process, nothing to
tune, and a backup is a file copy.

For scale, the shape of the alternatives. Plausible's Community Edition compose
file runs three services — the app, ClickHouse and Postgres — and their README
asks for at least 2 GB of RAM; ClickHouse's own documentation recommends 32 GB
for ClickHouse itself. Matomo's own sizing table goes from 2 GB at 100,000 pageviews a month
to 8 GB at a million. PostHog's self-host stack is 37 services and its installer
asks for 8 GB minimum. All read September 3, 2026.

That's not a knock on their engineering — those systems are built for different
volumes and they're honest about the requirements. It's a statement about what
each one costs you to keep alive on a Sunday.

## Hosted or self-hosted

| | Self-hosted | Hosted |
|---|---|---|
| Price | Free, plus your server | $9.99/month or $99/year |
| Features | Every one | Every one |
| Public API, funnels, custom properties, webhooks, MCP | Yes | Yes |
| Raw event export | Yes | Yes |
| Monthly limit | Whatever your box does | 1,000,000 pageviews and events, then talk to us |
| Retention | Your disk, your rules | 5 years |
| Data location | Wherever you run it | United States |
| Upgrades, backups, being paged at 3 a.m. | You | Us |

The honest pitch: we're selling the hosted service. The source being public is a
promise about what happens if we disappear, not the sales argument. If you'd
rather run it, run it — that route is complete and unrestricted, and we're not
going to email you about upgrading.

## The one thing AGPL asks of you

If you modify Feasible and offer the modified version to other people over a
network, you have to make your source available to those users. That's it.
Running it for your own sites, modified or not, triggers nothing. It doesn't
require you to open-source your website, and it places no restriction on
commercial use.

If your employer bans AGPL software outright — Google, the Apache Software
Foundation and the CNCF all publish policies to that effect — then the hosted
service is the route, since you're a customer of a service rather than a
distributor of the code.

---

Read the source at
[github.com/Feasible-Analytics/app.feasible.lol](https://github.com/Feasible-Analytics/app.feasible.lol).
More on [what the hosted service costs](/pricing/) and
[running it yourself](/open-source/).
