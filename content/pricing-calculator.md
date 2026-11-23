---
# Created: 2026-11-23
# Copyright (c) 2026 Cloudmanic Labs, LLC. All rights reserved.
title: "Analytics pricing calculator"
seotitle: "Web analytics pricing calculator: sites, traffic and team"
description: "Put in your sites, monthly pageviews and teammates. See what Plausible, Fathom, Matomo, Umami, Pirsch, Simple Analytics and Feasible charge you a year."
lede: "Put in your sites, your traffic and your team. You'll see what each analytics vendor would charge you a year for it, from their own published prices."
url: "/pricing/calculator/"
layout: "calculator"
kicker: "Pricing"
date: 2026-11-23
lastmod: 2026-11-23
checked: 2026-11-20
faqHeading: "Questions about the calculator"
faq:
  - q: "How much does website analytics cost a year?"
    a: >-
      Anywhere from nothing to a few thousand dollars, depending on your traffic
      and which plan has the features you need. At a million pageviews a month,
      the published plans run from $99 for Feasible to $2,040 for Matomo Cloud,
      and Google Analytics 4 is free. Put your own numbers in the calculator for
      your answer.
  - q: "Is Feasible always the cheapest?"
    a: >-
      No. At 10,000 pageviews a month, Pirsch Standard is $60 and Plausible
      Starter is $90, both under our $99, and GA4 and Umami's Hobby plan are
      free. Above a million pageviews a month we don't publish a price at all.
      We're cheapest once you add sites, people or funnels, because that's where
      per-site and per-seat plans add up.
  - q: "Why do some vendors show a range?"
    a: >-
      Because they sell price steps we haven't checked. When your traffic falls
      between two steps we have read from their pricing page, you get both
      prices instead of a guess. Their own page has the exact figure.
  - q: "Can I share a result?"
    a: >-
      Yes. Your numbers go into the page address as you type, so the link
      carries your setup. The button under the answer copies it for you.
---

## How it works

You give it your sites, your traffic and your team. It runs them against each
vendor's published price ladder and picks that vendor's cheapest plan that
fits: enough sites, enough logins, and funnels or revenue tracking if you tick
them.

**It reads your number in each vendor's own unit.** Plausible, Fathom and
Feasible count pageviews plus custom events, so put both in. Simple Analytics
counts datapoints, which their docs describe as pageviews and events. Umami
also counts each stored event property, and Matomo counts downloads, outbound
clicks and site searches as hits of their own, so your real number there can
be higher than the one you typed.
[What each vendor counts](/compare/pricing/#what-each-vendor-counts).

**Some answers are a range, on purpose.** Vendors sell more price steps than
we've checked. Plausible, for one, has steps between 100,000 and a million
that aren't on our table. When your traffic lands between two steps we have
checked, you see both prices. A range is honest. A number we made up isn't.

**Teammates means people besides you.** Plausible, Umami and Matomo cap "team
members", and we read that as people besides the account owner, because
Plausible's one-site plan has none. Simple Analytics includes one user and
charges $200 a year for each extra. Fathom doesn't publish a limit.

**Sites can cost extra.** Fathom includes 50 sites up to 500,000 pageviews and
75 at a million, and sells more in packs of 50 for $100 a year, up to 15 packs.
Past a million they only say bigger plans include more, so any packs you'd need
there show as the top of a range.

**Funnels and revenue tracking can move you up a plan.** On Plausible both
start on Business. Pirsch Standard has neither; their Plus plan has both.
Fathom tracks revenue but has no funnels. Umami Cloud, Matomo Cloud and GA4
have both. Simple Analytics' goals can have several steps and show the
conversion rate between them, which their features page calls funnels, though
their changelog says the steps aren't always one visit. We couldn't find
revenue tracking there. We checked all of that on each vendor's own pages on
November 23, 2026.

**Past a million pageviews a month, we don't publish a price.** So there the
calculator says "Talk to us" and doesn't claim we're cheapest. That's the
honest answer even when it isn't the flattering one.

## What it leaves out

- **Pirsch Plus.** It adds funnels, revenue tracking and unlimited sites. We
  haven't checked its price at every traffic level, so when you need one of
  those, Pirsch shows "Not priced here" instead of a number.
- **Plans priced by quote.** Plausible past 10 sites or 10 team members, Matomo
  Cloud past 30, and Simple Analytics past 10 sites or 2.5 million datapoints
  all move to an Enterprise plan with no published price. Those show "Contact
  sales".
- **More than 10 million a month.** Our price table stops there, so the
  calculator does too.
- **Self-hosting.** Feasible, Matomo, Umami and Plausible's Community Edition
  are free to run yourself. This page is about hosted plans.
  [Self-hosting, compared](/compare/pricing/#self-hosting).
- **Monthly billing.** Every figure is the annual price where the vendor offers
  one. Umami Cloud bills monthly only, so theirs is twelve months.
- **Tax.** Every price is before it.

## Sources

Every price and plan limit was read from the vendor's own pricing page on
November 20, 2026. Funnels, revenue tracking, and which price steps sit next to
each other on each ladder were checked again on November 23, 2026.

- Plausible - <https://plausible.io/#pricing>
- Fathom - <https://usefathom.com/pricing>
- Simple Analytics - <https://www.simpleanalytics.com/pricing> · goals:
  <https://docs.simpleanalytics.com/goals> · features:
  <https://www.simpleanalytics.com/features> · changelog:
  <https://www.simpleanalytics.com/changelog>
- Matomo Cloud - <https://matomo.org/pricing/>
- Pirsch - <https://pirsch.io/pricing>
- Umami Cloud - <https://umami.is/pricing>
- Google Analytics 4 - <https://support.google.com/analytics/answer/11202874> ·
  funnel exploration: <https://support.google.com/analytics/answer/9327974> ·
  ecommerce: <https://developers.google.com/analytics/devguides/collection/ga4/ecommerce>
- Feasible - [our pricing page](/pricing/)

The full table, with what each vendor counts and what happens when you go over,
is on [what web analytics costs](/compare/pricing/). Running client sites?
Here's [the math for agencies](/agencies/).
