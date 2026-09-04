---
title: "Feasible vs Plausible"
seotitle: "Feasible vs Plausible — Price, Limits, Features"
description: "A million pageviews, unlimited sites and unlimited users for $99 a year. Here's how that lines up against Plausible's published pricing, tier by tier."
lede: "Two published price lists, side by side, and an honest account of what Plausible does better."
versus: "Plausible"
checked: 2026-09-03
weight: 20
verdict: |
  If your data has to sit in the EU, or you want the tool with the longest
  track record and the biggest community in privacy-friendly analytics,
  Plausible is the safer pick and we'd tell you so. If you run more than one
  site, have more than one person looking at it, or want funnels, custom
  properties, the API and raw export without moving up a tier, the arithmetic
  goes the other way — hard.
faq:
  - q: "How much does Plausible cost at a million pageviews a month?"
    a: >-
      $690 a year on Starter, $1,040 on Growth and $1,390 on Business, from
      their published pricing on September 3, 2026. Business is the first plan
      with custom properties, funnels and the Stats API. Feasible is $99 with
      all three included.
  - q: "Is Feasible more permissively licensed than Plausible?"
    a: >-
      No. Both are AGPL-3.0-or-later — the same license. The difference is
      narrower: Plausible's repository has an `extra/` directory whose own
      COPYING.txt grants no rights to use or distribute the code in it, and the
      Community Edition build excludes it. Feasible has no such directory.
  - q: "Does Plausible's Community Edition have the API?"
    a: >-
      It has the Stats API. The Sites API is the one that isn't in Community
      Edition, along with marketing funnels, user journeys, ecommerce revenue
      goals and SSO. Community Edition also isn't capped on sites or team
      members — those caps are a Plausible Cloud pricing thing.
  - q: "Can I export raw events from Plausible?"
    a: >-
      Scheduled raw event data export is listed as an Enterprise feature, so
      there's no published self-serve price for it. Feasible exports raw events
      as a ZIP from site settings, on the only plan there is.
---

Plausible got the privacy model right before most people accepted there was a
model to get right. No cookies, no cross-site identity, a small script, numbers
a human can read. We're building in the space they helped define, and it would
be strange to pretend otherwise.

So let's do the part that's actually checkable: two price lists, next to each
other.

## The price, at every volume

Plausible's ladder is on [their pricing page](https://plausible.io/#pricing),
read September 3, 2026. Annual is ten times monthly — two months free, their
words. Feasible is $99 a year, or $9.99 a month, up to a million pageviews.

| Pageviews / month | Plausible Starter | Plausible Growth | Plausible Business | Feasible |
|---|---:|---:|---:|---:|
| 10,000 | $90 | $140 | $190 | **$99** |
| 100,000 | $190 | $290 | $390 | **$99** |
| 1,000,000 | $690 | $1,040 | **$1,390** | **$99** |
| 5,000,000 | $1,290 | $1,940 | $2,590 | Talk to us |
| 10,000,000 | $1,690 | $2,540 | $3,390 | Talk to us |

All figures are annual USD, list price, before tax.

**At 10,000 pageviews, Plausible Starter is cheaper than we are.** $90 against
$99. If you run one small site by yourself and don't need an API, that's a
better deal and we're not going to argue with it.

The gap opens at scale and at inclusions. At a million pageviews a month,
Plausible Business is $1,390 a year. Feasible is $99. That's fourteen times, and
it's the whole reason this company exists.

## The cheap plan is one site and no teammates

Comparing headline prices only works if the plans contain the same things. They
don't.

From Plausible's own pricing cards, read September 3, 2026:

- **Starter** — one site. Three years of retention. No team members at all.
- **Growth** — up to 3 sites, up to 3 team members.
- **Business** — up to 10 sites, up to 10 team members, five years of
  retention, and the first plan with **custom properties, funnels and user
  journeys, ecommerce revenue attribution and the Stats API** (600 requests an
  hour).
- **Enterprise** — custom pricing. More sites, more seats, SSO, the Sites API,
  and scheduled raw event data exports.

Feasible has one plan. Unlimited sites, unlimited team members, five roles plus
per-site guests, funnels, custom properties, revenue goals, the full API at
10,000 requests an hour, webhooks, an MCP server, and five years of retention.
$99 a year.

## Raw export is a button here

This is the difference that surprises people most. On Plausible, **scheduled raw
event data export is an Enterprise feature** — it's listed on the Enterprise
card and nowhere else. There is no published self-serve price at which you can
get your own raw events out.

On Feasible, export is a button in site settings on the only plan there is. You
get one ZIP: ten roll-up CSVs plus the raw events. It works during a trial, and
it keeps working if your payment fails, because locking someone out of their own
data is not a retention strategy.

## What each of you actually counts

Plausible's limit counts pageviews plus custom events. Feasible's counts
pageviews, and nothing else — custom events, custom properties and the
engagement pings behind scroll depth and time on page don't touch it.

Concretely: a site doing 900,000 pageviews a month that fires a `Signup` event,
a `Purchase` event and a `Download` event on 150,000 of those visits is at
1,050,000 against a Plausible pageview limit, and 900,000 against ours. Same
traffic, different tier.

It's a smaller gap than the vendors who bill per stored event property, but it's
real, and it's the kind of thing you only find out about in month three.

## Side by side

| | Feasible | Plausible |
|---|---|---|
| Entry price | $9.99/mo · $99/yr | $9/mo · $90/yr (Starter, 10k) |
| At 1M pageviews/mo | $99/yr | $690–$1,390/yr depending on plan |
| Sites | Unlimited | 1 / 3 / 10 by plan |
| Team members | Unlimited | 0 / 3 / 10 by plan |
| Retention | 5 years | 3 years, 5 on Business |
| Billing unit | Pageviews | Pageviews + custom events |
| Funnels | Yes | Business plan |
| Custom properties | Yes | Business plan |
| Stats API | Yes, 10,000 req/hr | Business plan, 600 req/hr |
| Raw event export | Yes, in the plan | Enterprise |
| Webhooks | Yes | No |
| MCP server | Built in | No |
| Dropped-event log with reasons | Yes | No |
| Data location | United States | Germany |
| Saved segments | **No** | Yes |
| SSO | **No** | Enterprise |
| Looker Studio connector | Community-deployed | Yes, official |
| Session replay, heatmaps, A/B tests | No | No |
| Cohort / retention report | No | No |
| Mobile SDKs | No | No |
| License | AGPL-3.0-or-later | AGPL-3.0-or-later |
| Trial | 30 days, no card | 30 days, no card |

## The open-source part, precisely

Both products are under the same license: **AGPL-3.0-or-later**. Anyone telling
you one of us is more permissively licensed than the other is wrong, and you can
check it by opening two LICENSE files.

The difference is narrower than a license name and easier to verify. Plausible's
repository contains an `extra/` directory with its own
[COPYING.txt](https://github.com/plausible/analytics/blob/master/extra/COPYING.txt),
which says the code there is "provided for informational purposes only, and no
rights to use, distribute or otherwise exploit this software are granted to
you." That directory holds funnels, SSO, the consolidated view and the Sites
API, and the build excludes it from Community Edition.

That's a completely normal open-core arrangement. Matomo and PostHog do the same
thing. Feasible just doesn't have one — there's no `extra/`, no `ee/`, no
license-key check, no folder you're not allowed to compile. The thing we host is
the thing you can run.

Two more differences that follow from that, both from
[Plausible's own self-hosting docs](https://plausible.io/docs/self-hosting):
Community Edition is "a long term release published twice per year so latest
features and improvements won't be immediately available," and marketing
funnels, user journeys, ecommerce revenue goals, SSO and the Sites API aren't in
it.

Two corrections while we're here, because they get repeated wrongly: **the Stats
API is in Community Edition** (it's the Sites API that isn't), and **Community
Edition isn't capped on sites or team members** — those caps are a Cloud pricing
thing.

## Running it yourself

Plausible Community Edition is three containers: the app, ClickHouse and
PostgreSQL. Their README recommends at least 2 GB of RAM. ClickHouse's own
[operations docs](https://clickhouse.com/docs/operations/tips) recommend "32 GB
or more" and warn that under 16 GB "you may experience various memory
exceptions." Both things can be true — it runs on 2 GB, and the column store
underneath it was built for machines an order of magnitude larger.

Feasible is one Go binary and one SQLite file. No Docker, no Postgres, no
ClickHouse, no queue. It starts on 1 core and 512 MB of RAM.

We're not claiming SQLite stores data more efficiently than ClickHouse — it
doesn't, by a wide margin. The claim is operational: there's one process and one
file, and nothing to tune.

## Where Plausible wins

**Your data sits in Germany.** Plausible hosts in Falkenstein on Hetzner, and
the company is in the EU. Cloudmanic Labs is in Oregon, and our international
transfers run on standard contractual clauses through our DPA. If EU residency
is a requirement rather than a preference, that decides it, and no amount of
price difference should change your mind.

**Their script is smaller than ours.** Measured the same day, the same way:
Plausible 1,291 bytes gzipped, Feasible 3,377. They win that one, comfortably.

**They've been at it longer.** More years in production, a much bigger
community, more people who've already hit the edge case you're about to hit, an
official Looker Studio connector, and a documented Enterprise tier with SSO if
your company requires it.

**Saved segments.** They have them. We don't — our filters are per-session, and
segments only exist server-side behind a shared link.

If any of those is the thing you actually need, buy theirs. If what you need is
several sites, several people, funnels and the API without a tier change, and
five years of history for $99, that's what we built.

Next: [the whole price ladder](/compare/pricing/) across every vendor, or
[what's in Feasible](/features/) with the gaps listed honestly.
