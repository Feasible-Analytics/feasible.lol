---
title: "Plausible alternatives, compared"
seotitle: "Plausible alternatives: seven tools, real prices"
description: "Seven Plausible alternatives on price, limits and licence, with each vendor's own published figure and the date we checked it. We make one of them."
lede: "Seven tools that do what Plausible does. What they cost, and where each one beats us."
kicker: "ROUNDUP"
weight: 20
wide: true
checked: 2026-09-03
faq:
  - q: "What's the best alternative to Plausible?"
    a: "It depends what pushed you off it. For unlimited sites and seats on one price, Feasible - which we make. For an MIT licence, Umami. For a free personal site, GoatCounter. For feature depth and on-premise, Matomo. For unlimited retention, Pirsch. If you left because you wanted EU hosting, you should probably stay."
  - q: "Why do people look for a Plausible alternative?"
    a: "Almost always the tier ladder rather than the product. Custom properties, funnels and the Stats API start at the Business plan, which is $1,390 a year at a million pageviews on their published pricing, checked September 3, 2026. People who only need those three things go looking for a flatter price."
  - q: "Is there a free Plausible alternative?"
    a: "Yes. GoatCounter's hosted tier is free for reasonable public use, and Umami's Hobby plan is free up to 100,000 events a month. Umami, Matomo, Plausible and Feasible are all free if you run them on your own server, where you pay in setup, backups and upgrades instead."
  - q: "Will my numbers match after switching from Plausible?"
    a: "Close, but not identical. Both are cookieless and both filter bots, but the definitions differ slightly and no two analytics tools ever agree exactly. Compare trends rather than absolute figures for the first month."
---

{{< callout title="A word about us before the table" >}}
We make Feasible, which is on this list. So read the table, not us: every price
below is the vendor's own published figure with a link and the date we checked
it. Where another tool is the better answer, that's said plainly.
{{< /callout >}}

Plausible is the product that made privacy-friendly analytics mainstream, and it is the most polished thing in the category. Most people who go looking for an alternative are not unhappy with the software.

They are unhappy with the ladder.

## Why people leave

Custom properties, funnels, ecommerce revenue and the Stats API all start at the Business plan. At a million pageviews a month that is **$1,390 a year** on [Plausible's published pricing](https://plausible.io/#pricing), checked September 3, 2026. The entry plan is $690 and has none of them.

The other two reasons come up less often. Scheduled raw event export is Enterprise-only, so no self-serve plan gets your own raw events out on a schedule. And Community Edition, the self-hosted build, ships twice a year and leaves out funnels, ecommerce revenue goals, SSO and the Sites API.

None of that makes Plausible a bad product. It makes it a product with a shape, and the shape suits some people and not others.

## The alternatives, side by side

Annual USD, on annual billing where offered. **The "counts" column decides the bill** - read it before comparing two prices.

| Tool | 100k pv/mo | 1M pv/mo | Counts | Sites | Seats | Source | Retention |
|---|---|---|---|---|---|---|---|
| **Feasible** | **$99** | **$99** | pageviews + events | unlimited | unlimited | AGPL-3.0 | 5 years |
| [Plausible Starter](https://plausible.io/#pricing) | $190 | $690 | pageviews + events | 1 | owner only | AGPL-3.0 (CE) | 3 years |
| [Plausible Growth](https://plausible.io/#pricing) | $290 | $1,040 | pageviews + events | 3 | 3 | AGPL-3.0 (CE) | 3 years |
| [Plausible Business](https://plausible.io/#pricing) | $390 | $1,390 | pageviews + events | 10 | 10 | AGPL-3.0 (CE) | 5 years |
| [Umami Cloud Pro](https://umami.is/pricing) | $240 | $240 | events, incl. each property | 20 | 10 | MIT | 2 years |
| [Pirsch Standard](https://pirsch.io/pricing) | $120 | $540 | pageviews + events + 10% extensions | 50 | unlimited | closed | unlimited |
| [Fathom](https://usefathom.com/pricing) | $150 | $600 | pageviews + events | 75 | not published | closed | forever |
| [Simple Analytics](https://www.simpleanalytics.com/pricing) | $200 | $600 | datapoints, incl. each property | 10 | 1 (+$240/yr) | closed | 3 years |
| [Matomo Cloud](https://matomo.org/pricing/) | $420 | $2,040 | **hits** | 30 | 30 | GPL-3.0 | configurable |
| [GoatCounter](https://www.goatcounter.com/) | $0 | n/a | pageviews | - | - | EUPL-1.2 | - |

All three Plausible tiers are listed because leaving the middle one out would flatter us. Growth is $1,040 at a million and still has no custom properties, funnels or Stats API, which is why Business is the tier this page compares against: it is the first one with them.

Every figure read from the vendor's own pricing page on September 3, 2026. Prices change; the links are there so you can check.

## Each one, and where it beats us

### Umami

The closest thing to a like-for-like swap, and **MIT licensed, which is genuinely more permissive than our AGPL-3.0**. If you want to embed the code in something proprietary, Umami is the only one here that lets you without argument.

Cloud Pro is flat to a million events at $240 a year, which is the second-cheapest number in the table.

**Where it beats us:** the licence, and a large self-hosting community.

**The cost:** monthly billing only, so there is no annual discount. Retention is two years. The unit is events including each stored property, so a pageview carrying five properties can bill as six.

### Pirsch

$540 a year at a million, unlimited seats, fifty sites, and **unlimited retention** - the only tool here that keeps everything forever without charging extra for it.

**Where it beats us:** retention, plainly. If you need five-year-old data in ten years, Pirsch says yes and we say five years.

**The cost:** no funnels and no teams on Standard. The unit adds 10% of session-extension events on top of pageviews and custom events.

### Fathom

Running since 2018 and unusually good at the unglamorous parts. EU isolation is free on every plan: EU visitors' pageviews route to EU servers where the IP is stripped before anything reaches US infrastructure. Retention is "forever". 75 sites at the million-pageview tier.

**Where it beats us:** EU isolation on a US-run product, and a seven-year track record we do not have.

**The cost:** $600 a year at a million, closed source, and neither funnels nor custom properties at any price.

### Simple Analytics

Clean, opinionated, and long-established. Good exports and a genuinely simple dashboard.

**Where it beats us:** design taste and a longer history.

**The cost:** the unit is datapoints, counting pageviews, events **and each stored event property separately**, so one pageview with five properties can bill as six. Extra seats are $240 a year each beyond the first.

### Matomo

The deepest tool in the category and the oldest, shipping since 2007. Segments, custom dimensions, heatmaps, A/B testing, roll-up reporting, ecommerce, and a real on-premise install where the core is free under GPL-3.0.

**Where it beats us:** feature depth, and the fact that a public-sector procurement office has heard of it. If you need on-premise with an audit trail and a support contract, this is the answer and we are not close.

**The cost:** $2,040 a year at a million **hits** on Cloud. A hit is a pageview, event, download, outbound click or site search, so a site with download tracking often needs a tier above its pageview count. Premium plugins are sold separately.

### GoatCounter

Free for reasonable public use, tiny, and run by one person who has been doing it for years. EUPL-1.2.

**Where it beats us:** it is free, and for a personal blog that is the whole argument.

**The cost:** it does not scale to a million pageviews on the hosted tier, and there are no funnels, properties or teams.

### Feasible - us

$99 a year, flat, to a million pageviews and custom events. Unlimited sites, unlimited team members, unlimited goals, funnels and custom properties. Five years of retention. Full API, webhooks and raw export in every copy, including the self-hosted one.

**Where we beat the list:** nothing is metered except pageviews and events, and nothing is held back from the open-source build. No cut-down community edition, no feature behind a higher tier.

**The cost:** we are new. Launched in 2026, US-hosted, with none of the track record Plausible, Fathom or Matomo have earned. Our tracker is 3,569 bytes gzipped, about 2.8 times bigger on the wire than Plausible's. And if you want data in the EU, we do not have an answer yet.

## Tools that show up in these lists but are not alternatives

Roundups for this query often include [PostHog](https://posthog.com/) and similar product-analytics platforms. They are good tools solving a different problem: session replay, feature flags, experiments and funnels over user identity. If that is what you want, none of the tools in the table above will satisfy you, including ours.

## Which to pick

- **You want the licence to be permissive.** Umami. MIT beats every AGPL and GPL option here.
- **You need data in the EU.** Stay on Plausible, or look at Fathom's EU isolation. We cannot help and neither can most of this table.
- **You need depth and on-premise procurement.** Matomo.
- **You need retention measured in decades.** Pirsch or Fathom.
- **You run a personal site.** GoatCounter, free.
- **You left because of the ladder.** That is us. One price, nothing metered but pageviews and events, and everything included at the bottom tier.

## Where Plausible wins

Maturity and hosting, and neither is close.

Plausible has run in production for years with a large customer base, hosts in Falkenstein, Germany, with the company in Estonia, and has a straightforward answer for a European buyer who wants their data in Europe. Their tracker is 1,285 bytes gzipped, smaller than ours. Community Edition is AGPL-3.0-or-later with unlimited sites and seats and includes the Stats API.

If those things matter more to you than the price ladder, the honest advice is to stay where you are.

If you want the head-to-head instead of the roundup, [Feasible vs Plausible](/compare/plausible/) puts the two price lists side by side.
