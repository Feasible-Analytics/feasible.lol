---
title: "Revenue tracking"
description: "Attach an amount and a currency to any goal. Feasible credits the money to the source that started the visit, so your payment provider never becomes your best channel."
lede: "Put money on a goal, and see which channel actually earned it."
weight: 50
note: |
  The revenue metrics don't appear in the dashboard's six tiles or the drawer's
  columns. Money shows up as a sub-line on goal rows, and the totals — total
  revenue, average revenue, revenue per visitor — come back through the query
  API. There are also no dedicated ecommerce events: no cart, no products, no
  line items. Just an amount and a currency.
---

Any [goal](/features/goals-and-funnels/) can carry money. Mark it as a revenue
goal, pick a currency, and send the amount with the event:

```js
feasible('Purchase', { revenue: { amount: 49.99, currency: 'USD' } })
```

That's the whole integration. Three metrics come out of it — total revenue,
average revenue, and revenue per visitor — and every one of them can be broken
down by any dimension Feasible has, which is the point.

## The money goes to the source that started the visit

This is the decision that makes the report worth reading.

Picture the sequence. Somebody clicks a link on Hacker News, reads for a while,
comes back the next morning, clicks buy, and gets redirected to a hosted
checkout page. Payment succeeds, they land back on your thank-you page, and the
referrer on that final pageview is your payment provider.

Credit the last referrer and your best marketing channel is Stripe. It'll sit
at the top of the table looking authoritative, and it's not merely useless —
it's actively misleading, because you can't buy more Stripe. Every dollar you
earned gets attributed to the company that moved it.

Feasible freezes attribution at the start of the visit. The source, channel and
campaign are decided when the visit begins and don't change for anything that
happens afterwards. So the money lands on Hacker News, where it belongs, and
payment providers never appear as a source at all.

The same rule is why your numbers don't reshuffle when somebody comes back
through a different door. It's listed in [the metric docs](/docs/metrics/) under
things that look like bugs and aren't, because the first time you see it, it
does.

## Currencies, and integers

Amounts are stored as integer minor units. $49.99 is 4999, not a float.

That sounds pedantic until you sum a hundred thousand of them and the total is
off by eleven cents, at which point nobody trusts any number on the page. Money
that has to reconcile with an accounting system can't drift, so it isn't stored
in a type that drifts.

Currency is a standard ISO-4217 code, and a goal can use any of them. If you
sell in dollars, euros and yen, each goal keeps its own currency and reports
that span more than one convert using stored exchange rates refreshed every 24
hours. The original amount is never overwritten by the converted one.

## What you get, and what you don't

You get money on a dimension. Revenue by channel, by campaign, by country, by
device, by [custom property](/features/custom-properties/) — revenue per visitor
for people who arrived on mobile from your newsletter, if that's the question.
That's a real question, and most analytics tools answer it by making you export
to a spreadsheet.

You don't get an ecommerce suite. There are no product events, no cart events,
no line items, no average-order-value report built out of them. Feasible takes
an amount and a currency and treats it as a number attached to a conversion.
If you need per-SKU merchandising analysis, your store platform already does
that better than a privacy-preserving analytics tool ever will, and it has the
order data to do it with.

The gap between those two is deliberate. Building the ecommerce suite means
collecting a lot more about individual purchases than "somebody in Germany paid
49.99," and the entire [privacy model](/features/privacy/) is built on not
knowing that. We'd rather answer the marketing question well than answer the
merchandising question badly.

Revenue reads back through [the API](/features/api-and-webhooks/) like any other
metric, so a weekly revenue-by-channel figure in your own dashboard is one
`POST /api/v2/query` away. It's included at $9.99 a month, like everything else
— see [the price](/pricing/).
