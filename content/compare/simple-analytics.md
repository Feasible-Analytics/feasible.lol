---
title: "Feasible vs Simple Analytics"
seotitle: "Feasible vs Simple Analytics - price, seats, limits"
description: "Simple Analytics is $600 a year at a million datapoints and $200 a year per extra seat. Feasible is $99 flat with unlimited users. Compared."
lede: "Simple Analytics keeps your data in the Netherlands, which we can't. It also charges per seat, which adds up faster than the sticker suggests once you're a team."
versus: "Simple Analytics"
checked: 2026-09-03
lastmod: 2026-11-20
weight: 50
verdict: |
  If your data has to stay in the EU, Simple Analytics hosts in the Netherlands
  and we host in Montreal, Canada - that's the whole decision, and price
  shouldn't move you. If you're a team, the per-seat pricing is where this gets
  expensive: five people at a million a month is $1,400 a year there and $99
  here.
faq:
  - q: "What is a datapoint in Simple Analytics?"
    a: >-
      Their meter is named datapoints rather than pageviews, and their docs
      describe a datapoint as "events or page views." That's the same two
      things Feasible counts, so the same traffic reads about the same on both
      meters. The difference is the price on top of it, and the seats.
  - q: "How much does Simple Analytics cost for a team?"
    a: >-
      The plan includes one user, and their pricing page lists extra seats at
      $20 a month each, or $200 a year on annual billing. Five people at a
      million datapoints a month works out at $1,400 a year. Feasible has no
      seat pricing at all.
  - q: "Where is Simple Analytics data stored?"
    a: >-
      In the Netherlands, so inside the EU. Feasible is hosted in Montreal,
      Canada, by Cloudmanic Labs, a company in Oregon, with international transfers handled by
      standard contractual clauses through our DPA. If EU residency is a hard
      requirement, that decides it.
  - q: "Does Simple Analytics have a free plan?"
    a: >-
      Yes - five websites, one user, 30 days of retention, and a badge on your
      site. We don't have a free plan; we have a 30-day trial that takes no
      card.
---

Simple Analytics has been at this since 2018, keeps everything in the
Netherlands, and has a free plan that's usable if you don't mind the
badge. Two of those three are things we can't offer.

Here's the rest of it.

## Price

From [their pricing page](https://www.simpleanalytics.com/pricing), read
November 20, 2026. Their ladder is measured in **datapoints** - more on that in a
second. Annual is ten times monthly.

| Datapoints / month | Simple Analytics | Feasible |
|---|---:|---:|
| Up to 100,000 | $200 | **$99** |
| Up to 250,000 | $300 | **$99** |
| Up to 500,000 | $400 | **$99** |
| Up to 1,000,000 | $600 | **$99** |
| Up to 2,500,000 | $1,200 | Talk to us |
| Above 2,500,000 | Enterprise, quoted | Talk to us |

Annual USD, list price, before tax. Those figures are for one user. The smallest
paid tier is 100,000; below that, their free plan covers five sites with 30 days
of history.

## Seats

Simple Analytics' paid plan includes **one user**. Their pricing page puts extra
seats at $20 a month each, or "+$200/yr per extra user" on annual billing.

So a five-person team at a million datapoints a month:

| | Simple Analytics | Feasible |
|---|---:|---:|
| Plan | $600 | $99 |
| 4 extra seats | $800 | $0 |
| **Total per year** | **$1,400** | **$99** |

Feasible has no seat pricing at all. Unlimited team members, five roles - owner,
admin, editor, billing, viewer - plus per-site guest editors and guest viewers.
Adding your designer to look at one site costs nothing, so you do it,
which is the point.

## What counts

Their meter counts datapoints, and their docs describe a datapoint as "events or
page views" ([docs.simpleanalytics.com](https://docs.simpleanalytics.com/metadata)).
We count pageviews and custom events. Same two things.

So a site doing 800,000 pageviews a month that fires 50,000 events reads about
850,000 on both meters: inside our $99 plan, and in their $600 band. Metadata you
attach to an event goes in with that event; their docs don't describe it as a
datapoint of its own. Our engagement pings, the ones behind scroll depth and time
on page, don't count either, because you can't turn those off and billing you for
them would be a trick.

So the meter isn't the difference here. The price on top of it is, and the seats.

*Correction, November 20, 2026: an earlier version of this page said Simple
Analytics counts each stored metadata field as a datapoint. Their docs describe a
datapoint as a pageview or an event, so it doesn't.*

## Side by side

| | Feasible | Simple Analytics |
|---|---|---|
| At 1M/month | $99/yr | $600/yr (one user) |
| Billing unit | Pageviews + custom events | Datapoints - pageviews and events |
| Users included | Unlimited | 1 |
| Extra seats | $0 | $200/yr each, on annual billing |
| Sites | Unlimited | 10 on the paid plan |
| Retention | Unlimited | 3 years |
| Free plan | No - 30-day trial, no card | Yes, with a badge and 30-day retention |
| Data location | Montreal, Canada | Netherlands |
| Cookies on visitors | None | None |
| Funnels | Yes | No |
| Custom properties | Yes | Metadata on events |
| API | Yes, 10,000 req/hr | Yes |
| Webhooks | Yes | No |
| MCP server | Built in | No |
| Dropped-event log with reasons | Yes | No |
| Self-hosting | Yes, the same build we run | No |
| Source code | AGPL-3.0-or-later | Closed |
| Session replay, heatmaps, A/B tests | No | No |
| Cohort / retention report | No | No |
| SSO | No | Not on their pricing page |
| Mobile SDKs | No | No |
| Trial | 30 days, no card | 14 days, no card |

## The script

Measured with `gzip -9`: Simple Analytics 3,826 bytes on September 8, 2026,
Feasible 3,629 on November 15, 2026. Close enough that neither of us should make a fuss about it,
and both a rounding error next to Google's 148,590.

## When the numbers look wrong

Every analytics tool drops traffic - bots, scrapers, datacenter addresses,
browsers too old to trust, requests from hostnames you never registered. That's
right. The question is whether you can see it happen.

Feasible has a health screen per site showing the last 24 hours of accepted and
dropped events, with a named reason attached to every drop: `bot`,
`datacenter_ip`, `referrer_spam`, `outdated_browser`, `automation`,
`hostname_not_allowed`, `shield_ip`, `rate_limited` and more.

It also shows which client address it resolved for your last request and which
header it came from, and it warns you when your reverse proxy isn't forwarding
visitor addresses - the misconfiguration that silently collapses every visitor
into one and puts them all in your datacenter's city. A button sends a real test
event through the public URL, so it tests your proxy and headers the way a
browser would rather than calling an internal function and telling you
everything's fine.

That's the feature we'd point at if you asked what Feasible is for.
Analytics that quietly loses part of your traffic is worse than analytics that
tells you it did.

## Going over the limit

Worth checking on any vendor before you commit, because it's never on the
pricing page.

Feasible emails you at 70%, 85% and 100% of the million. One month over costs
nothing at all. Two consecutive complete months over gets you an email asking
you to reply within 14 days, and only if nobody replies does the dashboard lock.
Collection never stops, nothing is deleted, and export keeps working the whole
time. There's no overage charge, because there's no overage tier in the billing
code.

## Moving over

Feasible imports CSV and ZIP uploads, so a Simple Analytics export comes across
as CSV and lands on the same charts as your live traffic.

Both are one paste into your `<head>`, so run them side by side for a week before
you cancel anything. Two tools counting the same traffic never agree exactly,
and it's better to see that on your own site than read about it.

## Where Simple Analytics wins

**EU hosting.** Their data stays in the Netherlands. Ours is in Montreal,
Canada, Cloudmanic Labs is in Oregon, and our international transfers run on standard contractual clauses
through our DPA. If EU residency is a requirement, that's the end of the
conversation and you should buy theirs.

**A real free plan.** Five websites, one user, 30 days of retention, a badge on
your site. If you just want to know whether anyone visited, that's free forever
and we don't have an equivalent. Our answer is a 30-day trial with no card.

**A longer track record.** They've been running since 2018 with a stable
product. We launched this year. If you want the option that has already survived
a few years of other people's edge cases, that's a fair reason.

**They take Bitcoin.** We don't. Small thing, but if it matters to you it
matters.

## Where Feasible wins

You have more than one person. You have more than ten sites. You want funnels
and webhooks. Or you want the source code, because a hosted-only product is a company you're betting
on rather than software you own.

At one user, one site, low traffic and EU hosting required, buy theirs. Past
that, the gap is $99 against $200 to $1,200, plus $200 for each extra person.

More: [the whole price ladder](/compare/pricing/), or
[what Feasible does](/features/), gaps included.
