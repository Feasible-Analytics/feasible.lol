---
title: "Open source web analytics you can read"
seotitle: "Open source web analytics you can read and self-host"
description: "Feasible is AGPL-3.0-or-later. Read the code, run the same build we run on a 512 MB box, or let us host it for $9.99 a month. Go and SQLite."
lede: "The license, the code, what self-hosting takes, and how other open-source tools compare."
kicker: "OPEN SOURCE"
weight: 50
wide: true
checked: 2026-09-03
faq:
  - q: "What license is Feasible under?"
    a: "AGPL-3.0-or-later, for the app and the browser tracker. You can run it, modify it and self-host it. If you offer it to others as a network service, you have to make your source available to those users."
  - q: "Is the self-hosted version cut down?"
    a: "No. It's the same build. Set `FEASIBLE_APP_HOSTED=false` and every feature is free and unrestricted - the API, funnels, custom properties, webhooks, the MCP server, raw event export, teams. There's no Community Edition and no license-key module."
  - q: "What does it take to run?"
    a: "One binary and one directory of SQLite files. The floor is 1 CPU core, 512 MB of RAM and 1 GB of disk; 2 cores and 2 GB is comfortable. No Docker, no Postgres, no ClickHouse, no Redis, no queue."
  - q: "Does AGPL mean I have to open-source my website?"
    a: "No. The license concerns the analytics software, not the site you point it at. It asks you to publish source if you modify Feasible and then offer it to other people over a network."
  - q: "Is Feasible's license more permissive than Plausible's?"
    a: "No. Both are AGPL-3.0-or-later - the same license. Anyone claiming otherwise is wrong, and you can check it in thirty seconds by opening both LICENSE files."
  - q: "Why pay $99 a year if I can run it for free?"
    a: "Because you'd rather not. Self-hosting means a box, backups, upgrades and being the person who gets paged. The hosted service is us doing that. Both get the same features."
---

Feasible is open source under **AGPL-3.0-or-later**, app and browser tracker
alike. The code is at
[github.com/Feasible-Analytics/app.feasible.lol](https://github.com/Feasible-Analytics/app.feasible.lol).

[Plausible](https://github.com/plausible/analytics/blob/master/LICENSE.md) uses
the same license. [Umami](https://github.com/umami-software/umami/blob/master/LICENSE)
uses the more permissive MIT license. Checked September 3, 2026. Our difference
is what ships in the self-hosted build.

## Nothing is held back

Set `FEASIBLE_APP_HOSTED=false` and every feature works: API, funnels, custom
properties, webhooks, MCP, raw export, teams, sharing, reports, and alerts.
There's no separate edition, license key, or plan check.

## How the field is licensed

Read on September 3, 2026 by opening the `LICENSE` file in each repository, not by
trusting a badge.

| Tool | License | Self-host | The thing worth knowing |
|---|---|---|---|
| **Feasible** | AGPL-3.0-or-later | Yes | Same build we host. No carve-out directory |
| [Plausible](https://github.com/plausible/analytics/blob/master/LICENSE.md) | AGPL-3.0-or-later, except `extra/` | Yes, as Community Edition | `extra/` grants no rights and holds funnels, SSO, consolidated view and the Sites API. CE is a twice-yearly release. Sites and seats are unlimited in CE, and the Stats API **is** included |
| [Matomo](https://github.com/matomo-org/matomo/blob/master/LICENSE) | GPL-3.0-or-later | Yes | GPL, not AGPL - no network-source clause. Premium plugins such as Funnels are proprietary under InnoCraft's EULA |
| [Umami](https://github.com/umami-software/umami/blob/master/LICENSE) | MIT | Yes | **More permissive than ours**, and MIT since 2020. Their FAQ says Cloud has email reports and a streaming API the self-hosted build doesn't |
| [PostHog](https://github.com/PostHog/posthog/blob/master/LICENSE) | MIT, except `ee/` | Yes | `ee/` needs an enterprise license to run in production |
| [GoatCounter](https://github.com/arp242/goatcounter/blob/master/LICENSE) | EUPL-1.2 (modified) | Yes | Small, careful, philosophically close to us |
| [Counter.dev](https://github.com/ihucos/counter.dev) | AGPL-3.0 | Yes | Tiny project, pay-what-you-want hosting |
| [Fathom](https://github.com/usefathom/fathom) | Closed. "Fathom Lite" is MIT | Lite only | Lite isn't archived, but no code change since January 2023 |
| Pirsch | Closed product; the Go tracking library is AGPL-3.0 | Enterprise tier only | - |
| Simple Analytics, Google Analytics 4, Cloudflare, Vercel, Netlify | Closed | No | - |

Plausible's core is open source. Its `extra/` directory uses different terms and
doesn't ship in Community Edition. Umami's MIT license is more permissive than
our AGPL. Pick Umami if license freedom matters most. Pick Feasible if you want
the hosted and self-hosted builds to match.

## What self-hosting takes

One binary. One directory of SQLite files. That's the deployment.

```bash
cp .env.sample .env          # set FEASIBLE_APP_HOSTED=false
feasible db migrate
feasible account create --email owner@example.com --name "Account owner"
feasible serve
```

`account create` prints a password once. Public signup is off in self-hosted
mode. The operator creates accounts.

**Requirements:** 1 CPU core, 512 MB of RAM, 1 GB of disk at the floor. Two cores
and 2 GB is comfortable. Written in Go 1.26, pure-Go SQLite with no cgo, one
binary, no Docker file in the repo because there's nothing to orchestrate. No
Postgres, no ClickHouse, no Redis, no message queue.

**Storage:** about 210 bytes an event. A million pageviews a month for a year is
roughly 3.5 GB.

**Throughput:** about 6,000 events per second per process, with accept latency
around 13 µs at the median. Reports read from pre-built roll-ups: 28 days of top
pages comes back in 81–111 ms; twelve months in 0.4–0.7 s.

SQLite isn't denser than a column store. It's easier to run: one file, one
process, nothing to tune.

For comparison, [Plausible Community Edition](https://github.com/plausible/community-edition)
asks for at least 2 GB of RAM. [Matomo's sizing table](https://matomo.org/faq/on-premise/matomo-requirements/)
calls for 2 GB at 100,000 monthly pageviews and 8 GB at one million.
[PostHog](https://posthog.com/docs/self-host) asks for 8 GB. Checked September 3,
2026.

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

We sell the hosted service. The public source is your way out if we disappear.
If you'd rather run it, run it. Every feature works.

## The one thing AGPL asks of you

If you modify Feasible and offer it to others over a network, you must share the
source with those users. Running it for your own sites doesn't require you to
open-source your website.

If your employer bans AGPL software, use the hosted service.

---

[Read the source](https://github.com/Feasible-Analytics/app.feasible.lol).
