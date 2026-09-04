---
title: "What analytics actually costs"
seotitle: "What Web Analytics Actually Costs — The Whole Price Ladder"
description: "Every privacy-friendly analytics vendor's published price at 10k, 100k, 1M, 5M and 10M pageviews a month — with what each one actually counts."
lede: "Ten vendors, five traffic levels, one table. Plus the thing that makes most of these numbers wrong: almost nobody bills for the same unit."
versus: "everyone else"
checked: 2026-09-03
weight: 5
wide: true
verdict: |
  Below about 100,000 pageviews a month, several of these are cheaper than we
  are and you should take one. Above that, the spread is $99 to $2,040 for
  counting the same traffic. The number that decides your real bill isn't on
  any pricing page — it's what the vendor counts as one unit, so check that
  first.
faq:
  - q: "Which web analytics tool is cheapest?"
    a: >-
      It depends on your traffic. Below 100,000 pageviews a month, Google
      Analytics and Umami Hobby are free, Pirsch Standard is $60 a year and
      Plausible Starter is $90 — all cheaper than Feasible's $99. At a million
      pageviews a month, Feasible is $99 and the rest of the field runs from
      $240 to $2,040.
  - q: "Why do analytics vendors charge such different prices for the same traffic?"
    a: >-
      Mostly because they count different things. Some bill pageviews, some bill
      pageviews plus events, and some bill "datapoints" or "hits" that include
      downloads, outbound clicks, site searches and each individual event
      property. Two sites with identical traffic can land three tiers apart.
  - q: "What does Feasible count against its million-a-month limit?"
    a: >-
      Pageviews and custom events, between them — including the outbound
      clicks, file downloads and form submissions the script fires on its own.
      Custom properties never count, however many you attach. Neither do the
      engagement pings behind scroll depth and time on page, or sites, seats,
      goals and funnels.
  - q: "What happens if I go over my limit?"
    a: >-
      On Feasible you get emails at 70%, 85% and 100%. One month over costs
      nothing. Two consecutive full months over gets an email asking you to
      reply within 14 days, and only then does the dashboard lock. Collection
      never stops, nothing is deleted, and export works throughout.
faqHeading: "Common questions about analytics pricing"
---

Analytics pricing pages are hard to compare on purpose. Different units,
different plan tiers hiding different features, sliders that don't show you the
top of the ladder.

So here's all of it in one table, at list price, from each vendor's own pricing
page, read on September 3, 2026.

## The whole ladder

Annual cost in USD, on annual billing where the vendor offers it, before tax.
The column headings say pageviews — but read the units section below, because
five of these vendors don't bill pageviews.

| Vendor / plan | 10k/mo | 100k/mo | 1M/mo | 5M/mo | 10M/mo |
|---|---:|---:|---:|---:|---:|
| **Feasible** | **$99** | **$99** | **$99** | Talk to us | Talk to us |
| Google Analytics 4 | $0 | $0 | $0 | $0 | $0 |
| Umami Cloud — Hobby | $0 | $0 | — | — | — |
| Pirsch — Standard | $60 | $120 | $540 | $990 | $1,590 |
| Plausible — Starter | $90 | $190 | $690 | $1,290 | $1,690 |
| Plausible — Growth | $140 | $290 | $1,040 | $1,940 | $2,540 |
| Plausible — Business | $190 | $390 | $1,390 | $2,590 | $3,390 |
| Fathom | $150 | $150 | $600 | $1,400 | $2,000 |
| Simple Analytics — Simple | $150 | $200 | $600 | $1,200 | $1,600 |
| Umami Cloud — Pro | $240 | $240 | $240 | $1,680 | — |
| Matomo Cloud | $260 | $420 | $2,040 | $9,750 | $19,000 |

A dash means the vendor doesn't offer that volume on that plan.

**We are not the cheapest at the bottom.** At 10,000 pageviews a month, Pirsch
Standard is $60 and Plausible Starter is $90, both under our $99, and Google
Analytics and Umami Hobby are free. If you run one small site by yourself, one
of those is a better deal and you should take it.

At a million pageviews a month, the same list runs $99 to $2,040. That's the
part we built a company around.

## What each vendor actually counts

This matters more than the headline price, and it's the reason two sites with
identical traffic land on different tiers.

| Vendor | Billing unit | What that means for you |
|---|---|---|
| **Feasible** | **Pageviews + custom events** | Same unit as Plausible and Fathom. Custom properties, goal conversions and engagement pings are free and uncounted. |
| Plausible | Pageviews + custom events | Every custom event you fire eats a pageview. |
| Fathom | Pageviews + custom events | Their FAQ: custom event and API requests "will be counted as if they were pageviews." |
| Simple Analytics | **Datapoints** | Pageviews, plus events, plus stored event metadata. |
| Umami | **Events** | Their FAQ: "each data property stored counts as one event." Five properties on one event is six events. |
| Pirsch | Pageviews + events + 10% of session extensions | Their pricing page also notes deleted domains keep counting until the limit resets. |
| Matomo | **Hits** | Their FAQ: pageviews, events, downloads, outlinks, site searches, content tracking and crashes. |
| Google Analytics 4 | Events | Everything is an event, but the quota is free. |

### The multiplier, worked through

Take one real-ish shop: 700,000 pageviews a month, 20,000 purchases each
carrying five properties, 30,000 signups each carrying two.

| | Counted | Which tier |
|---|---:|---|
| Feasible | 750,000 | Inside the $99 plan |
| Plausible | 750,000 | Under 1M |
| Umami | 910,000 | Under 1M, but a sixth property pushes it over |
| Matomo (with downloads and outlinks tracked) | 1.4M–2M hits | Two tiers up, $3,990/yr |

Same shop. Same traffic. Feasible and Plausible read the same number here,
because the unit is the same — the difference between those two is the price,
not the meter. The rest of the spread comes entirely from what the meter counts:
Umami bills the 160,000 stored properties, Matomo bills the downloads and
outlinks and searches as hits of their own.

If you take one thing from this page: **before you compare two prices, find the
sentence on each pricing page that defines the unit.** It's usually in the FAQ,
usually short, and usually the most expensive sentence on the page.

## What you actually get at a million a month

Price alone is still misleading, because the cheap plan on most of these isn't
the plan with the features.

| Vendor / plan | Annual | Sites | Team seats | Retention | Notable gaps at this price |
|---|---:|---|---|---|---|
| **Feasible** | **$99** | **Unlimited** | **Unlimited** | **5 years** | No SSO, session replay, heatmaps, A/B testing, cohort report or mobile SDKs |
| Plausible Starter | $690 | 1 | Owner only | 3 years | No custom properties, funnels or Stats API |
| Plausible Growth | $1,040 | 3 | 3 | 3 years | Still no custom properties, funnels or Stats API |
| Plausible Business | $1,390 | 10 | 10 | 5 years | Raw event export is Enterprise-only |
| Fathom | $600 | 75 | Not published | "Forever" | No funnels or custom properties |
| Simple Analytics | $600 | 10 | 1 (+$240/yr each) | 3 years | No funnels; seats are billed |
| Matomo Cloud | $2,040 | 30 | 30 | Configurable | Funnels, heatmaps, replay and A/B tests are premium plugins |
| Pirsch Standard | $540 | 50 | Unlimited | Unlimited | No funnels, no teams |
| Umami Pro | $240 | 20 | 10 | 2 years | Session replay and heatmaps are Business-tier |

Two numbers to notice.

**Plausible's advertised entry price is a single site with no teammates.** Custom
properties, funnels, ecommerce revenue attribution and the Stats API all start
on Business — $1,390 a year at a million pageviews. And scheduled raw event
export is Enterprise-only, so there is no published self-serve price at which
you can get your own raw events out.

**Simple Analytics bills per seat.** One user included, $20 a month for each
extra. Five people at a million datapoints is $1,560 a year.

## Google Analytics is free. Here's the bill anyway

GA4 costs $0 at every volume on this table, and that's real. What it costs
instead:

- **148,451 bytes of script**, gzipped, versus our 3,377. Measured the same day,
  same method.
- **A consent banner**, because GA4 sets cookies.
- **2 or 14 months** of event-level retention on standard properties. The
  26-, 38- and 50-month options are marked "360 only."
- **Thresholded reports.** Google: "Data thresholds are system defined. You
  can't adjust them."
- **Your visitors' behavior going to an advertising company.**

Google Analytics 360 is the paid tier, and Google publishes no price for it —
their upgrade page tells you to contact an account representative. Any figure
you see quoted for 360 comes from a reseller or an analyst, not from Google.
We're not going to put a number on it.

The long version is on
[Feasible vs Google Analytics](/compare/google-analytics/).

## What happens when you go over

Rarely on a pricing page, always in the terms. Worth checking before you commit.

**Feasible.** We email you at 70%, 85% and 100%. One month over costs nothing at
all. Two consecutive full months over gets you an email asking you to reply
within 14 days, and only if nobody replies does the dashboard lock. **Collection
never stops, nothing is deleted, and export works the whole time.** There is no
overage charge in our billing code, because there is no overage tier.

**Pirsch** publishes the strictest policy we found. From their pricing page: "If
you reach the usage limit before the end of your billing period, your access
will be limited to the day you reached the limit," with five days to upgrade
before you get gaps.

**Fathom** deserves credit here — they say they won't switch your analytics off
over an occasional spike, and if you're over two months running they'll tell you
they're upgrading you. That's a decent policy and we're not claiming an edge
over it.

## Self-hosting, if that's the plan

Free isn't free when it needs a bigger box.

| | What it runs on | Documented requirement |
|---|---|---|
| **Feasible** | One Go binary, one SQLite file | 1 core, 512 MB RAM, 1 GB disk |
| Umami | Node.js + PostgreSQL, 2 containers | None published |
| Matomo | PHP + MySQL/MariaDB | Their own table: 2 CPU / 2 GB at 100k pageviews, **4 CPU / 8 GB at 1M** |
| Plausible CE | App + ClickHouse + PostgreSQL, 3 containers | README recommends at least 2 GB |
| PostHog | 37 services in the hobby compose file | Docs say 4 vCPU / 16 GB; the installer says 8 GB |

Two footnotes on that table. ClickHouse's own operations docs recommend "32 GB
or more" and warn about memory exceptions under 16 GB, which is a separate point
from what Plausible's README asks for. And Matomo's developer docs say that
above 500 page views a day you should turn off browser archiving and run
archiving from cron — which then becomes something you check weekly.

We're not claiming SQLite stores data more efficiently than a column store. It
doesn't. The claim is operational: one process, one file, nothing to tune.

## How to work out your own number

1. Take your real monthly pageviews from whatever you use now.
2. Add every custom event you fire, or plan to.
3. If the vendor counts event properties, multiply those events by the number of
   properties on each.
4. If it counts hits, add downloads, outbound clicks and site searches.
5. Now read the ladder at that number — not at your pageview count.
6. Then check the plan actually has the features you need at that tier. On
   several of these, it doesn't.

For Feasible, step 1 is the whole calculation. That's the design.

## Sources

Every figure above was read from the vendor's own page on **September 3, 2026**.
Prices change; if something here is stale, tell us and we'll fix it.

- Plausible — <https://plausible.io/#pricing>
- Fathom — <https://usefathom.com/pricing>
- Simple Analytics — <https://www.simpleanalytics.com/pricing>
- Matomo — <https://matomo.org/pricing/> · hits defined at
  <https://matomo.org/faq/general/what-is-a-hit/>
- Pirsch — <https://pirsch.io/pricing>
- Umami — <https://umami.is/pricing>
- Google Analytics 4 — retention:
  <https://support.google.com/analytics/answer/7667196> · thresholding:
  <https://support.google.com/analytics/answer/9383630>
- Matomo self-hosting requirements —
  <https://matomo.org/faq/on-premise/matomo-requirements/>
- ClickHouse operations tips — <https://clickhouse.com/docs/operations/tips>
- Feasible — [our pricing page](/pricing/), which is the same $99 whether you
  read it here or there.

Script sizes were measured the same day with
`curl -H 'Accept-Encoding: identity' <url> | gzip -9 | wc -c`.

Head-to-heads with the detail: [Google Analytics](/compare/google-analytics/) ·
[Plausible](/compare/plausible/) · [Fathom](/compare/fathom/) ·
[Matomo](/compare/matomo/) · [Simple Analytics](/compare/simple-analytics/) ·
[Umami](/compare/umami/).
