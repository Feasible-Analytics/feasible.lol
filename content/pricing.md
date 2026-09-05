---
title: "One plan. $9.99 a month."
layout: "pricing"
seotitle: "Pricing: $9.99 a month for everything"
description: "One plan. $9.99 a month or $99 a year. Unlimited sites, unlimited users, a million pageviews a month, five years of data. No tiers, no per-site fees."
lede: "One plan with everything in it. Thirty days free first, and we don't ask for a card to start."
checked: 2026-09-03
faqHeading: "Questions people ask before they pay"
faq:
  - q: "What happens when the trial ends?"
    a: "Nothing gets charged because we never took a card. If you don't pay, the dashboard locks after 30 days. Collection continues for 30 more days, then the account is deleted on day 90. We email you before each step. Export keeps working until deletion."
  - q: "What if I go over a million pageviews?"
    a: "We email you at 70%, 85%, and 100%. One month over changes nothing. After two full months over, we ask you to reply within 14 days. No reply locks the dashboard, but collection and export keep working. There are no overage charges."
  - q: "How do I cancel?"
    a: "Use the billing portal. No email required. You keep access through the period you already paid for."
  - q: "Do you give refunds?"
    a: "We refund yearly plans pro rata within 30 days of purchase. Monthly payments aren't refunded."
  - q: "Do you count events?"
    a: "Yes. The one-million limit covers pageviews and custom events, including automatic outbound-click, download, and form events. Properties, engagement pings, sites, seats, goals, and funnels don't count."
  - q: "Do you charge per site?"
    a: "No. Add unlimited sites. The one-million allowance is shared across them."
  - q: "Do you charge per seat?"
    a: "No. Add unlimited teammates. Five roles and per-site guest access are included."
  - q: "Is there a free plan?"
    a: "No. The hosted product is free for 30 days, then $9.99 a month. [Self-hosting](/open-source/) is free."
  - q: "Do you do non-profit or open-source discounts?"
    a: "There's no formal program, but ask. Email [sales@feasible.lol](mailto:sales@feasible.lol) and tell us about the project."
  - q: "Can I pay yearly?"
    a: "Yes. It's $99 a year. Change plans from the billing portal."
  - q: "What if I self-host?"
    a: "You pay nothing and get every feature. Feasible is AGPL-3.0-or-later with no license key or reduced community edition. [Run it yourself](/open-source/)."
  - q: "Will the price go up?"
    a: "We have no plan to raise it. If that changes, we will say so here first. A year already paid for keeps its price."
---

One product. One plan. Every feature is included.

## What counts, and what doesn't

We count pageviews and custom events. You get one million a month across all your
sites. Automatic outbound-click, download, and form events count too.

We don't count properties, engagement pings, sites, seats, goals, or funnels.

That second list is where the units stop agreeing:

| Vendor | What they bill for | Source |
|---|---|---|
| **Feasible** | **Pageviews + custom events** | - |
| Plausible | Pageviews + custom events | [plausible.io](https://plausible.io/#pricing) |
| Fathom | Pageviews + custom events | [usefathom.com](https://usefathom.com/pricing) |
| Simple Analytics | Datapoints - pageviews, events, and **each stored event property** | [simpleanalytics.com](https://www.simpleanalytics.com/pricing) |
| Umami Cloud | Events - pageviews, custom events, and **each stored property** | [umami.is](https://umami.is/pricing) |
| Matomo Cloud | Hits - pageviews, events, downloads, outbound clicks and site searches | [matomo.org](https://matomo.org/faq/general/what-is-a-hit/) |
| Pirsch | Pageviews + custom events + 10% of session-extension events | [pirsch.io](https://pirsch.io/pricing) |

Read what each company counts before comparing prices. Plausible and Fathom use
the same meter we do. Other tools may also count properties, searches, or content
tracking. That can push the same traffic into a larger plan.

All of the above checked on the vendors' own published pages, September 3, 2026.

## Five years, and what that means

The plan guarantees five years of data. We don't delete older data while your
account is open.

If you need a longer window written down, because a policy or an auditor requires it,
[that's an email to sales](#enterprise).

## What the same traffic costs elsewhere

We sell one of these. Every figure below is the vendor's annual list price for one
million pageviews a month.

| Plan | A year | Sites / seats | Source |
|---|---|---|---|
| **Feasible** | **$99** | Unlimited / unlimited | - |
| Umami Cloud - Pro | $240 | 20 / 10 | [umami.is](https://umami.is/pricing) |
| Pirsch - Standard | $540 | 50 / unlimited | [pirsch.io](https://pirsch.io/pricing) |
| Fathom | $600 | 75 / not published | [usefathom.com](https://usefathom.com/pricing) |
| Simple Analytics | $600 | 10 / 1 (+$240 a year each) | [simpleanalytics.com](https://www.simpleanalytics.com/pricing) |
| Plausible - Business | $1,390 | 10 / 10 | [plausible.io](https://plausible.io/#pricing) |
| Matomo Cloud | $2,040 | 30 / 30 | [matomo.org](https://matomo.org/pricing/) |

Plausible has cheaper plans. Business is the first with custom properties,
funnels, and the Stats API, so that is the closest match.

At 10,000 pageviews a month, Plausible Starter is $90 a year and Pirsch Standard
is $60. Both cost less than Feasible. Our price wins when you add traffic, sites,
teammates, or features.

The whole ladder, at 10k, 100k, 1M, 5M and 10M pageviews a month, is on
[the pricing comparison page](/compare/pricing/). One vendor at a time, there's
[how this compares to Plausible](/compare/plausible/),
[how this compares to Fathom](/compare/fathom/), and
[every Google Analytics alternative, priced](/alternatives/google-analytics/).

## Why it costs this little

Counting pageviews is cheap. A stored event takes about 210 bytes. A million
pageviews a month for a year takes about 3.5 GB.

Feasible is one Go binary and one SQLite file per account. No cluster, queue, or
extra database. [Check the open source code](/open-source-web-analytics/).

## Over a million pageviews? {#enterprise}

Need more traffic or longer retention? Email
**[sales@feasible.lol](mailto:sales@feasible.lol)**. It's the same product. We
only need to price the extra volume.

If you go over before talking to us:

1. We email you at 70%, 85% and 100% of the limit.
2. One full month over costs nothing and changes nothing.
3. Two complete months over in a row, and we email asking you to reply within 14 days.
4. No reply after that, and the dashboard locks.

**Collection never stops.** We don't throttle, sample, delete, or charge an
overage. Export keeps working. Reply to our email or drop below the limit to
unlock the dashboard.

## The trial, refunds and canceling

The trial lasts 30 days and needs no credit card.

**Refunds.** Ask within 30 days and we refund a yearly plan pro rata. Monthly
payments aren't refunded.

**Canceling.** Use the billing portal any time. Monthly to yearly switches now.
Yearly to monthly switches at renewal.

Prices are USD and before tax. Sales tax, VAT or GST is worked out at checkout from
your billing address and shown before you pay.
