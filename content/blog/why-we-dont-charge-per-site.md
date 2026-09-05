---
title: "Why we don't charge per site"
slug: "why-we-dont-charge-per-site"
description: "Per-site and per-seat pricing tolls the moment you'd install a tool again. We count pageviews and custom events, and stop there - here's what everyone else counts."
lede: "A second site costs us almost nothing, so we don't charge for it. The harder question is what a monthly limit should count."
date: 2026-09-02
checked: 2026-09-03
---

You launch a second site. It gets four hundred visitors a month. You go to add it to your analytics, and the answer is a bigger plan.

That's the moment this post is about. Not the price - the shape of it.

## What per-site pricing costs

Published list prices, annual billing, checked September 3, 2026.

| Vendor and plan | Per year at 1M pv/mo | Sites | Seats |
|---|---|---|---|
| [Plausible Starter](https://plausible.io/#pricing) | $690 | 1 | Owner only |
| [Plausible Growth](https://plausible.io/#pricing) | $1,040 | 3 | 3 |
| [Plausible Business](https://plausible.io/#pricing) | $1,390 | 10 | 10 |
| [Fathom](https://usefathom.com/pricing) | $600 | 75 | Not published |
| [Simple Analytics](https://www.simpleanalytics.com/pricing) | $600 | 10 | 1 |
| [Matomo Cloud](https://matomo.org/pricing/) | $2,040 | 30 | 30 |
| [Pirsch Standard](https://pirsch.io/pricing) | $540 | 50 | Unlimited |
| [Umami Pro](https://umami.is/pricing) | $240 | 20 | 10 |
| **Feasible** | **$99** | Unlimited | Unlimited |

Some of those are generous, and worth saying so. Pirsch gives you fifty sites and unlimited teammates on the cheap plan. Fathom sells extra sites in packs of fifty for $100 a year, which is a fair price for a real thing. Umami's twenty sites for $240 is good value by any reading.

But look at the first three rows as a ladder rather than three products. One site. Three sites. Ten sites. The site count is the thing that moves you up it, and at Simple Analytics the same is true of people - one user is included and each additional seat is $240 a year.

Here's our objection, and it's structural, not personal. **A per-site price puts a toll booth at the exact moment a customer is about to make you more useful to them.** The second site is when a tool stops being a thing you check and starts being the thing you check. The fifth colleague you add is the one who makes it hard to leave. Metering both is metering the habit you spent all that money acquiring.

A second site costs us almost nothing. A million pageviews a month is [about 3.5 GB a year and 0.4 writes a second](/blog/what-it-costs-to-count-a-million-pageviews/), and splitting that across nine sites instead of one doesn't change the arithmetic. Neither does a sixth login. So we don't charge for either, and if that ever stops being true we'll tell you what changed instead of quietly adding a tier.

## Compare the billing unit

This matters more than the site count, and almost nobody puts it on a comparison table.

Those vendors don't all count the same thing. Sourced from each vendor's own pages and FAQs, checked September 3, 2026:

| Vendor | What counts against the limit |
|---|---|
| [Plausible](https://plausible.io/#pricing) | pageviews + custom events |
| [Fathom](https://usefathom.com/pricing) | pageviews + custom events - their FAQ says those requests are "counted as if they were pageviews" |
| [Simple Analytics](https://www.simpleanalytics.com/pricing) | **datapoints** - pageviews, events, and *each stored event property* |
| [Umami](https://umami.is/pricing) | **events** - pageviews, custom events, and each stored property |
| [Pirsch](https://pirsch.io/pricing) | pageviews + custom events + 10% of session-extension events; deleted domains keep counting until the limit resets |
| [Matomo](https://matomo.org/faq/general/what-is-a-hit/) | **hits** - "a tracked page view, an event tracking, a download, an outlink, an onsite search or a content tracking request" |
| **Feasible** | pageviews + custom events |

Now put that next to a normal Tuesday afternoon decision: *let's start tracking outbound clicks.*

On Matomo's definition, every outbound click is a hit. So are downloads. So are site searches. A site with all three turned on can generate two or three hits per pageview, which means a million-pageview site can need Matomo's 2M or 5M tier - $399 or $975 a month rather than $204 ([matomo.org/pricing](https://matomo.org/pricing/), checked September 3, 2026). Your traffic didn't change. Your instrumentation did.

On the datapoint model it's finer-grained still. A pageview carrying five properties can bill as six datapoints. Add a property to an event you fire on every page and you've just multiplied your bill by a number you'd have to sit down to work out.

None of that is hidden - every one of those definitions is on the vendor's own site, which is why we can link it. It's just that it's on a FAQ page and the price is on a pricing page, and you make the decision looking at the second one.

The practical effect is a slow tax on describing your business. Every extra field on an event is a line item somewhere, so the tool asks you to think about the bill every time you consider measuring something properly.

**So here's ours, plainly. We count pageviews and custom events.** That's the same unit Plausible and Fathom use, and it includes the outbound clicks, file downloads and form submissions our script fires on its own. Turn on outbound-click tracking and our number moves too. We're not going to run a page that pretends otherwise.

**What we don't count is the describing.** Properties are free, however many you hang on an event. So are the engagement and scroll pings behind time-on-page and scroll depth, because you can't switch those off. So are sites, seats, goals and funnels. A sixth field on your purchase event costs nothing here and a tier somewhere else.

Two units, both of which you can count yourself before you buy. That's as simple as we could make it and still be telling the truth.

## What the limit is

A million pageviews and custom events a month, between them. Per account, per calendar month, UTC. Unlimited sites, unlimited teammates, unlimited properties, five years of retention. $9.99 a month or $99 a year.

A limit has to exist somewhere. Storage is real, CPU is real, and a plan with no number on it is a plan that gets repriced the first time someone points a firehose at it - usually by adding a tier and moving everyone up one. We'd rather publish the number now.

What we care more about is what happens when you cross it, because that's where a pricing page stops being marketing.

Emails at 70%, 85% and 100%. **One full month over costs you nothing at all.** Two consecutive complete months over and we email asking you to reply, with fourteen days on the clock. Only if nobody replies does the dashboard lock - and even then collection never stops, nothing is deleted, and export keeps working. Come back in range, or reply to the email, and it unlocks straight away. There's no overage charge in the product because we didn't write one.

Compare that to a policy on the other side, and this is a real published one: Pirsch states that "If you reach the usage limit before the end of your billing period, your access will be limited to the day you reached the limit," with five days to upgrade or wait for the reset ([pirsch.io/pricing](https://pirsch.io/pricing), checked September 3, 2026).

And credit where it's due, because Fathom's policy here is better than most and we're not going to pretend otherwise. Theirs: "We'll never turn your analytics off for occasional traffic spikes… if you go over for two months in a row, we'll let you know we're upgrading you" ([usefathom.com/pricing](https://usefathom.com/pricing), checked September 3, 2026). That's the right instinct. The difference is what the upgrade costs.

One last thing that belongs in a pricing post more than a features post. **Raw event export is a button here**, in every plan and every copy of the software, hosted or self-hosted - one ZIP with the roll-up CSVs and the raw rows. At Plausible, scheduled raw event export is an Enterprise line item ([plausible.io](https://plausible.io/#pricing), checked September 3, 2026), which means there's no published price at which you can get your own raw events out on a self-serve plan.

Getting your data out shouldn't require the expensive plan. You should be able to leave without a project.

Above a million pageviews a month, email `sales@feasible.lol` and we'll work it out. Everything else is on [the pricing page](/pricing/), and the [comparisons](/compare/) have the rest of the ladders with their sources.
