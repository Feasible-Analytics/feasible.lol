---
title: "Feasible vs Matomo"
seotitle: "Feasible vs Matomo — Price, Hits vs Pageviews, Features"
description: "Matomo Cloud is $2,040 a year at a million hits — and hits aren't pageviews. Feasible is $99. Matomo also does far more than we do. Both, explained."
lede: "Matomo does much more than Feasible, and charges about twenty times as much. Whether that's a good trade depends entirely on which reports you open."
versus: "Matomo"
checked: 2026-09-03
weight: 40
verdict: |
  Matomo is the right answer if you need depth — heatmaps, session recording,
  A/B testing, custom dimensions, hundreds of segments, server-log import, an
  on-premise deployment with a support contract. We have none of that, and no
  amount of price difference substitutes for a report you actually need. If you
  open a dashboard to see traffic, sources and conversions, Matomo is a very
  large tool for that job and a very large bill.
---

Matomo has been going since 2007 and does more than everything else in this
comparison combined. Heatmaps. Session recording. A/B testing. Form analytics.
A tag manager. Custom dimensions, roll-up reporting, a server-log importer, a
plugin marketplace, on-premise deployments with real support contracts.

We do none of that. Read the concession section before you read the prices,
because on features this isn't close.

## The price, at every volume

From [Matomo's pricing page](https://matomo.org/pricing/), read September 3,
2026. Matomo publishes in euros; the USD figures are theirs, from the same page.
Annual billing is ten times monthly.

| Hits / month | Matomo Cloud | Feasible |
|---|---:|---:|
| 50,000 | $260 | **$99** |
| 100,000 | $420 | **$99** |
| 600,000 | $1,390 | **$99** |
| 1,000,000 | **$2,040** | **$99** |
| 5,000,000 | $9,750 | Talk to us |
| 10,000,000 | $19,000 | Talk to us |

Annual USD, list price, before tax.

At a million a month, Matomo Cloud is $2,040 a year and Feasible is $99. Twenty
times. But that comparison is unfair to us, and here's why.

## A hit is not a pageview

Matomo doesn't bill for pageviews. It bills for hits, and its
[own FAQ](https://matomo.org/faq/general/what-is-a-hit/) defines one as "a single
interaction sent to Matomo and processed for reporting or analysis" — page
views, events, downloads, outlinks, site searches, content tracking and crashes.
(Heartbeat timers used to measure time on page don't count, which is fair.)

So turn on download tracking and outbound-link tracking, which most sites do,
and one pageview can send two or three hits.

Work it through. A documentation site doing 400,000 pageviews a month with
outbound links and file downloads tracked, plus site search, can comfortably
generate a million hits. That site is on Matomo's $2,040 tier. On Feasible it's
400,000 pageviews against a million-pageview limit, and every one of those
events, downloads and searches is free. $99.

That's the trap worth checking before you compare any two prices in this market:
**find out what the number on the pricing page actually counts.**

## Self-hosting: free core, paid plugins, real servers

Matomo's core is GPL-3.0 and free to self-host. That's genuine, and it's the
reason Matomo runs on a large share of the privacy-conscious web.

Two things follow that people miss.

**The features that make Matomo Matomo are proprietary and sold separately.**
Funnels, heatmaps, session recording, A/B testing and form analytics are premium
plugins under the InnoCraft licence. Since 2025 they're sold as On-Premise
bundles, and the cheapest one — Team, up to 4 users and 5 million hits a month —
is €2,750 a year on Matomo's pricing page. Business is €14,500.

**It needs a real server, and a cron job you have to watch.** Matomo's own
[requirements page](https://matomo.org/faq/on-premise/matomo-requirements/)
recommends 2 CPUs and 2 GB of RAM up to 100,000 pageviews a month, and **4 CPUs
and 8 GB up to a million**, plus a second server above that. Their developer
docs are blunter still: with
[more than 500 page views a day](https://developer.matomo.org/guides/archiving)
you should disable browser archiving and set up CLI archiving. And their
archiving FAQ says your "most important job as an administrator will be to check
weekly, or daily, for any messages which arise during the archiving process."

Feasible self-hosted is one Go binary and one SQLite file, on 1 core and 512 MB
of RAM. No PHP, no MySQL, no archiving cron, no plugin licences. Every feature
is in it, because there's only one build.

We're not claiming SQLite is a better database than MySQL for analytics — that's
not the argument. The argument is that there's one process and one file, and
nothing to tune.

## The script

Measured September 3, 2026 with `gzip -9`:

| | Gzipped |
|---|---:|
| Feasible | **3,377 bytes** |
| Matomo (`matomo.js`) | 46,303 bytes |

About fourteen times. Reproduce with
`curl -H 'Accept-Encoding: identity' <url> | gzip -9 | wc -c`.

Some of that weight is Matomo doing more — heatmap and session-recording capture
have to live somewhere. It's still 46 KB on every page load.

## Side by side

| | Feasible | Matomo Cloud |
|---|---|---|
| At 1M/month | $99/yr (pageviews) | $2,040/yr (hits) |
| Billing unit | Pageviews only | Hits — views, events, downloads, outlinks, searches |
| Sites | Unlimited | 30 on mid tiers |
| Team members | Unlimited | 30 on mid tiers |
| Segments | Filters, not saved | 100 |
| Goals | Unlimited | 150 |
| Custom dimensions | Custom properties, unlimited | 30 |
| Data location | United States | Europe |
| Tracking script (gzipped) | 3,377 bytes | 46,303 bytes |
| Cookies on visitors | None | Yes by default, can be disabled |
| Funnels | Yes, in the plan | Yes (premium plugin on-premise) |
| Heatmaps | **No** | Yes (premium) |
| Session recording | **No** | Yes (premium) |
| A/B testing | **No** | Yes (premium) |
| Form analytics | **No** | Yes (premium) |
| Tag manager | **No** | Yes |
| Server-log import | **No** | Yes |
| Cohort / retention report | **No** | Yes |
| SSO | **No** | Yes |
| Mobile SDKs | **No** | Yes |
| Webhooks | Yes | No |
| MCP server | Built in | No |
| Dropped-event log with reasons | Yes | No |
| Licence | AGPL-3.0-or-later | GPL-3.0-or-later (core) |
| Self-host cost | Free, every feature | Free core, €2,750/yr for the premium bundle |

## Where Matomo wins

Almost everywhere on features, and it isn't close.

**Depth.** Visitor logs, visitor profiles, custom dimensions, hundreds of
segments, ecommerce reporting, goal attribution across dozens of models,
roll-up reporting across properties. If someone in your organisation asks a
question you didn't anticipate, Matomo probably answers it. We probably don't.

**The premium plugins.** Heatmaps, session recording, A/B testing and form
analytics are things we do not have and have not announced. If any of them is on
your list, this comparison is over.

**Enterprise fit.** SSO, on-premise deployment with a paid support contract,
twenty years of compliance paperwork, and the fact that public-sector
procurement in Europe already knows the name. We have none of that either.

**A lighter copyleft licence.** Matomo's core is GPL-3.0. Ours is AGPL-3.0 —
same family, but AGPL adds a network clause GPL doesn't have. On that specific
axis Matomo asks less of you than we do, and it's worth knowing if your
company's policy cares.

**Your data sits in Europe** on Matomo Cloud. We're in Oregon.

## Where we'd tell you to pick us

If what you look at is traffic, pages, sources, countries, devices, goals and
funnels — and you'd like the bill to be $99 and the server to be one file — then
the twenty-times difference is buying you reports you don't open.

That's the whole pitch. Matomo is a bigger tool. Some people need a bigger tool.

More: [the whole price ladder](/compare/pricing/), or
[what's in Feasible](/features/) with the gaps listed plainly.
