---
title: "One plan. $9.99 a month."
layout: "pricing"
seotitle: "Pricing — $9.99 a month for everything"
description: "One plan. $9.99 a month or $99 a year. Unlimited sites, unlimited users, a million pageviews a month, five years of data. No tiers, no per-site fees."
lede: "One plan with everything in it. Thirty days free first, and we don't ask for a card to start."
checked: 2026-09-03
faqHeading: "Questions people ask before they pay"
faq:
  - q: "What happens when the trial ends?"
    a: "Nothing gets charged, because we never took a card. You get an email a week before it ends and another the day before. If you don't pay, the dashboard locks 30 days after the trial ends, collection keeps running for another 30 days after that, and the account is deleted on day 90 — with nine warning emails along the way. Export works in every one of those states. Pay at any point before the end and everything comes back in about fifteen seconds."
  - q: "What if I go over a million pageviews?"
    a: "We email you at 70%, 85% and 100% of the limit. One month over costs nothing and changes nothing. Two complete months over in a row and we email asking you to reply within 14 days. If nobody replies, the dashboard locks — but collection never stops, nothing is throttled, nothing is deleted, and there's no overage charge. Drop back under, or reply to the email, and it unlocks."
  - q: "How do I cancel?"
    a: "From your own billing portal, any time, without emailing anyone first. Cancelling stops the next charge and you keep the dashboard until the period you already paid for runs out."
  - q: "Do you give refunds?"
    a: "A yearly plan is refunded pro rata within 30 days of purchase, on request — no form, and nobody will try to talk you out of it. Monthly isn't refunded, because cancelling stops the next charge and there's at most one month at stake."
  - q: "Do you count events?"
    a: "No. We count pageviews. Custom events, goals, funnels and custom properties are unlimited and never counted against your limit — including the properties attached to every event. So are the engagement pings the script sends for time-on-page and scroll depth."
  - q: "Do you charge per site?"
    a: "No. Unlimited sites on one account for one price. The million pageviews is the total across every site you track, not a cap on each one, so ten small sites cost exactly what one does."
  - q: "Do you charge per seat?"
    a: "No. Unlimited team members. There are five roles — owner, admin, editor, billing and viewer — plus per-site guest access, so a contractor can see one site and your accountant can see the invoices. None of them costs anything."
  - q: "Is there a free plan?"
    a: "No. There are 30 free days with no credit card, and after that it's $9.99 a month. If you want a free copy forever, [self-host it](/open-source/) — that's free, unrestricted, and has every feature the hosted version has."
  - q: "Do you do non-profit or open-source discounts?"
    a: "There's no published program, but ask. Email [sales@feasible.lol](mailto:sales@feasible.lol) and tell us what the project is. We can hand out complimentary accounts and we do."
  - q: "Can I pay yearly?"
    a: "Yes — $99 a year, which is twelve months for the price of ten. Switching from monthly to yearly prorates immediately. Switching back to monthly takes effect at your next renewal. Both happen in your own billing portal."
  - q: "What if I self-host?"
    a: "Then you pay nothing and you get everything. Feasible is AGPL-3.0-or-later, and there's no licence key, no plan check and no cut-down community build — the whole product is one binary and a SQLite file. [Here's how to run it](/open-source/)."
  - q: "Will the price go up?"
    a: "It's $9.99 a month or $99 a year today, and we have no plan to raise it. If that ever changes we'll announce it here before it happens, and a year you've already paid for stays at the price you paid."
---

There's one plan because there's one product. No starter tier that can't do funnels,
no growth tier that adds three seats, no business tier that finally hands over the
API.

## What counts, and what doesn't

We count pageviews. That's the only number on your account with a ceiling, and the
ceiling is a million a month across every site you track.

This matters more than the sticker price, because the industry doesn't agree on what a
"pageview" is. Several vendors bill for a broader unit, and the multiplier isn't
always small:

| Vendor | What they bill for | Source |
|---|---|---|
| **Feasible** | **Pageviews. Nothing else.** | — |
| Plausible | Pageviews + custom events | [plausible.io](https://plausible.io/#pricing) |
| Fathom | Pageviews + custom events | [usefathom.com](https://usefathom.com/pricing) |
| Simple Analytics | Datapoints — pageviews, events, and **each stored event property** | [simpleanalytics.com](https://www.simpleanalytics.com/pricing) |
| Umami Cloud | Events — pageviews, custom events, and **each stored property** | [umami.is](https://umami.is/pricing) |
| Matomo Cloud | Hits — pageviews, events, downloads, outbound clicks and site searches | [matomo.org](https://matomo.org/faq/general/what-is-a-hit/) |
| Pirsch | Pageviews + custom events + 10% of session-extension events | [pirsch.io](https://pirsch.io/pricing) |

Read the second column before you compare the first. None of it is a trick — every one
of those units is published and documented — but it means the tier you need is often
bigger than your traffic looks.

Here's one shop on three meters. Say you do 400,000 pageviews a month, you track
outbound clicks and PDF downloads, and every purchase event carries five properties:
order value, currency, plan, coupon and country.

- **Counting pageviews**, that's 400,000. The events and the properties are free.
- **On a datapoint meter** where each stored property counts, one purchase with five
  properties bills as six datapoints instead of one.
- **On a hit meter**, every outbound click and every download is its own hit on top of
  the pageview, so the number you're billed on isn't the number in your traffic
  report.

You end up shopping for a tier based on a number you can't predict. We'd rather you
shopped on the number you already know.

All of the above checked on the vendors' own published pages, September 3, 2026.

## Five years, and what that means

The plan includes five years of data retention. That's a floor, not a countdown.

In practice we don't delete anything while your account is open — there's no job in
the software that ages your data out. If you've been here six years, you have six
years of history. Five years is the number we're willing to commit to in writing, not
a timer running against the data you already have.

If you need a longer window written down, because a policy or an auditor requires it,
[that's an email to sales](#enterprise).

## What the same traffic costs elsewhere

We sell one of these, so read the table knowing that. Every figure is the vendor's own
list price on annual billing, for a million pageviews a month.

| Plan | A year | Sites / seats | Source |
|---|---|---|---|
| **Feasible** | **$99** | Unlimited / unlimited | — |
| Umami Cloud — Pro | $240 | 20 / 10 | [umami.is](https://umami.is/pricing) |
| Pirsch — Standard | $540 | 50 / unlimited | [pirsch.io](https://pirsch.io/pricing) |
| Fathom | $600 | 75 / not published | [usefathom.com](https://usefathom.com/pricing) |
| Simple Analytics | $600 | 10 / 1 (+$240 a year each) | [simpleanalytics.com](https://www.simpleanalytics.com/pricing) |
| Plausible — Business | $1,390 | 10 / 10 | [plausible.io](https://plausible.io/#pricing) |
| Matomo Cloud | $2,040 | 30 / 30 | [matomo.org](https://matomo.org/pricing/) |

Plausible has cheaper plans than the one listed; Business is the first of theirs that
includes custom properties, funnels and the Stats API, which is why it's the row that
compares to ours. Their Starter plan is $690 a year at this volume and has none of the
three.

**And be honest about the other end of the ladder:** at 10,000 pageviews a month,
Plausible Starter is $90 a year and Pirsch Standard is $60. Both are cheaper than us.
If you run one small site, never fire a custom event and work alone, we are not the
cheapest thing you can buy — we're the one whose price doesn't move when any of that
changes.

The whole ladder, at 10k, 100k, 1M, 5M and 10M pageviews a month, is on
[the pricing comparison page](/compare/pricing/).

## Why it costs this little

Because counting pageviews is cheap, and the software was built to match.

A stored event is about 210 bytes, all in. A million pageviews a month for a whole
year is a 294 MB database. One process accepts around 6,000 events a second and takes
about 13 microseconds to decide on one. The minimum server is one CPU core, 512 MB of
RAM and a gigabyte of disk.

There's no cluster underneath this — one Go binary, one SQLite file per account, no
Postgres, no ClickHouse, no Redis, no queue, no Docker. Nothing is running that we'd
have to charge you for. [The whole thing is open source](/open-source/) if you'd
rather check that than take our word for it.

## Over a million pageviews? {#enterprise}

Above a million pageviews a month, or if you need data kept longer than five years,
email **[sales@feasible.lol](mailto:sales@feasible.lol)** and tell us roughly how much
traffic you have.

There's no published enterprise ladder because there's no enterprise product. It's the
same software with the same features — the conversation is only about what your volume
actually costs to run.

None of that is urgent, either. Here's exactly what happens if you sail past a million
without talking to anyone:

1. We email you at 70%, 85% and 100% of the limit.
2. One full month over costs nothing and changes nothing.
3. Two complete months over in a row, and we email asking you to reply within 14 days.
4. No reply after that, and the dashboard locks.

**Collection never stops.** Not at the limit, not at the lock. Nothing is throttled,
nothing is sampled away, nothing is deleted, and there's no overage charge — that tier
doesn't exist in the code. Export keeps working the whole time. Reply to the email, or
drop back under the limit, and the dashboard comes back.

## The trial, refunds and cancelling

The trial is 30 days and takes no credit card. There's no payment record of you at all
until somebody actually pays, so there's nothing to forget to cancel.

**Refunds.** A yearly plan is refunded pro rata within 30 days of purchase, on request
— no form, and nobody will try to talk you out of it. Monthly isn't refunded;
cancelling stops the next charge and there's at most one month at stake.

**Cancelling** happens in your own billing portal, any time, without emailing us first.
Switching monthly to yearly prorates immediately. Switching back to monthly takes
effect at renewal.

Prices are USD and before tax. Sales tax, VAT or GST is worked out at checkout from
your billing address and shown before you pay.
