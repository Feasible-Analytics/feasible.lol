---
title: "Feasible vs Simple Analytics"
seotitle: "Feasible vs Simple Analytics — Price, Datapoints, Seats"
description: "Simple Analytics bills datapoints, not pageviews, and charges $240 a year per extra seat. Feasible is $99 flat with unlimited users. Compared."
lede: "Simple Analytics keeps your data in the Netherlands, which we can't. It also bills for datapoints and charges per seat, which adds up faster than the sticker suggests."
versus: "Simple Analytics"
checked: 2026-09-03
weight: 50
verdict: |
  If your data has to stay in the EU, Simple Analytics hosts in the Netherlands
  and we host in the United States — that's the whole decision, and price
  shouldn't move you. If you're a team, the per-seat pricing is where this gets
  expensive: five people at a million a month is $1,560 a year there and $99
  here.
faq:
  - q: "What is a datapoint in Simple Analytics?"
    a: >-
      Their meter counts datapoints rather than pageviews — pageviews plus
      events plus stored event metadata. So a site that instruments its
      conversions well burns through the tier faster than its traffic suggests.
      Feasible counts pageviews and nothing else.
  - q: "How much does Simple Analytics cost for a team?"
    a: >-
      The plan includes one user, and their pricing page lists extra seats at
      $20 a month each — $240 a year. Five people at a million datapoints a
      month works out at $1,560 a year. Feasible has no seat pricing at all.
  - q: "Where is Simple Analytics data stored?"
    a: >-
      In the Netherlands, so inside the EU. Feasible is hosted in the United
      States by Cloudmanic Labs, with international transfers handled by
      standard contractual clauses through our DPA. If EU residency is a hard
      requirement, that decides it.
  - q: "Does Simple Analytics have a free plan?"
    a: >-
      Yes — five websites, one user, 30 days of retention, and a badge on your
      site. We don't have a free plan; we have a 30-day trial that takes no
      card.
---

Simple Analytics has been at this since 2018, keeps everything in the
Netherlands, and has a free plan that's genuinely usable if you don't mind the
badge. Two of those three are things we can't offer.

Here's the rest of it.

## The price, at every volume

From [their pricing page](https://www.simpleanalytics.com/pricing), read
September 3, 2026. Their ladder is measured in **datapoints**, not pageviews —
more on that in a second. Annual is ten times monthly.

| Datapoints / month | Simple Analytics | Feasible |
|---|---:|---:|
| Up to 20,000 | $150 | **$99** |
| Up to 100,000 | $200 | **$99** |
| Up to 500,000 | $400 | **$99** |
| Up to 1,000,000 | $600 | **$99** |
| Up to 5,000,000 | $1,200 | Talk to us |
| Up to 10,000,000 | $1,600 | Talk to us |

Annual USD, list price, before tax. Those figures are for one user.

## Then add the people

Simple Analytics' paid plan includes **one user**. Their pricing page puts extra
seats at "+$20/mo per extra user" — $240 a year each.

So a five-person team at a million datapoints a month:

| | Simple Analytics | Feasible |
|---|---:|---:|
| Plan | $600 | $99 |
| 4 extra seats | $960 | $0 |
| **Total per year** | **$1,560** | **$99** |

Feasible has no seat pricing at all. Unlimited team members, five roles — owner,
admin, editor, billing, viewer — plus per-site guest editors and guest viewers.
Adding your designer to look at one site costs nothing, so you actually do it,
which is the point.

## Datapoints aren't pageviews

This is the part that catches people. Their meter counts datapoints: pageviews,
plus events, plus stored event metadata — not pageviews alone.

The arithmetic, on events alone: a site doing 800,000 pageviews a month that
tracks signups, downloads and outbound clicks on 250,000 visits is at 1,050,000
datapoints. That's over the $600 band and into the $800 one. On Feasible it's
800,000 pageviews, and the events are free — they don't count at all.

Feasible's limit counts pageviews and nothing else. Custom events, custom
properties, goal conversions and the engagement pings behind scroll depth and
time on page are all outside it, deliberately, so instrumenting your site
properly never raises your bill.

## Side by side

| | Feasible | Simple Analytics |
|---|---|---|
| At 1M/month | $99/yr | $600/yr (one user) |
| Billing unit | Pageviews only | Datapoints — pageviews, events, metadata |
| Users included | Unlimited | 1 |
| Extra seats | $0 | $240/yr each |
| Sites | Unlimited | 10 on the paid plan |
| Retention | 5 years | 3 years |
| Free plan | No — 30-day trial, no card | Yes, with a badge and 30-day retention |
| Data location | United States | Netherlands |
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
| SSO | No | Enterprise |
| Mobile SDKs | No | No |
| Trial | 30 days, no card | 14 days, no card |

## The script

Measured September 3, 2026 with `gzip -9`: Feasible 3,377 bytes, Simple
Analytics 3,832. Close enough that neither of us should make a fuss about it,
and both a rounding error next to Google's 148,451.

## When the numbers look wrong

Every analytics tool drops traffic — bots, scrapers, datacenter addresses,
browsers too old to trust, requests from hostnames you never registered. That's
right. The question is whether you can see it happen.

Feasible has a health screen per site showing the last 24 hours of accepted and
dropped events, with a named reason attached to every drop: `bot`,
`datacenter_ip`, `referrer_spam`, `outdated_browser`, `automation`,
`hostname_not_allowed`, `shield_ip`, `rate_limited` and more. It shows which
client address it resolved for your last request and which header it came from.
It warns you when your reverse proxy isn't forwarding visitor addresses — the
misconfiguration that silently collapses every visitor into one and puts them
all in your datacenter's city. And it has a button that sends a real test event
through the public URL, so it tests your proxy and headers the way a browser
would rather than calling an internal function and telling you everything's
fine.

That's the feature we'd point at if you asked what Feasible is actually for.
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

Feasible imports Google Analytics 4 over OAuth, and takes CSV and ZIP uploads
for everything else — so a Simple Analytics export comes across as CSV.

Both are one tag in your `<head>`, so run them side by side for a week before
you cancel anything. Two tools counting the same traffic never agree exactly,
and it's better to see that on your own site than read about it.

## Where Simple Analytics wins

**EU hosting.** Their data stays in the Netherlands. Cloudmanic Labs is in
Oregon, and our international transfers run on standard contractual clauses
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

## Where we'd tell you to pick us

You have more than one person. You have more than ten sites. You want funnels
and webhooks. You'd rather your event tracking didn't raise your bill. Or you
want the source code, because a hosted-only product is a company you're betting
on rather than software you own.

At one user, one site, low traffic and EU hosting required, buy theirs. Past
that, the gap is $99 against $600 and up.

More: [the whole price ladder](/compare/pricing/), or
[what Feasible does](/features/), gaps included.
