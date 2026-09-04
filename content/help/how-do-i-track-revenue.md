---
title: "How do I track revenue?"
description: "Attach an amount and a currency to an event, then mark the goal as a revenue goal. Any ISO-4217 currency works."
category: "goals-and-events"
weight: 60
---

Attach an amount and a currency to the event, then mark the goal as a revenue goal.

**1. Send the event with a revenue object:**

```js
feasible('Purchase', {
  revenue: { amount: 49.00, currency: 'USD' }
})
```

**2. Create the goal.** Under **Site settings → Goals**, add a custom-event goal named `Purchase`, tick the revenue box, and set the currency.

Amounts are stored as integer minor units, so there's no floating-point drift on your totals. Any ISO-4217 currency works, and if you take money in several, cross-currency reporting uses stored exchange rates that refresh every 24 hours.

You get four numbers out of it: total revenue, average revenue, revenue per visitor, and the conversion rate. Revenue shows as a sub-line under the goal in the **Goals** tab.

The part worth understanding is the attribution. **Revenue is credited to the source that started the visit**, not to whatever the referrer happened to be at the moment of payment. So a customer who arrives from your newsletter, browses, and gets bounced through a checkout provider on the way back has their money credited to the newsletter — [which is why payment providers never show up as your best marketing channel](/help/why-doesnt-stripe-show-up-as-a-source/).

Two practical notes:

**Send it from where you know the amount.** If the price is only correct on your server, use one of the server-side SDKs rather than the browser — and remember to forward the visitor's IP and user agent, which is the one thing every server-side integration gets wrong. The [docs](/docs/) cover it.

**There's no dedicated ecommerce event set.** No cart, no product, no line items — just a generic revenue object on any event you like. Put the detail you need in [custom properties](/help/event-scope-vs-session-scope-for-custom-properties/) instead.
