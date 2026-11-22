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

Amounts are stored as integer minor units, so there's no floating-point drift on your totals. Any ISO-4217 currency works. If you take money in several, each currency is totalled on its own: nothing is converted, and a query over a range with more than one [asks which to total](/docs/goals-funnels/#revenue).

You get [three revenue metrics](/features/revenue/) out of it - total revenue, average revenue and revenue per visitor - alongside the goal's own conversion rate. Revenue shows as a sub-line under the goal in the **Goals** tab.

The part worth understanding is the attribution. **Revenue is credited to the source that started the visit**, not to whatever the referrer happened to be at the moment of payment. So a customer who arrives from your newsletter, browses, and gets bounced through a checkout provider on the way back has their money credited to the newsletter - [which is why payment providers never show up as your best marketing channel](/help/why-doesnt-stripe-show-up-as-a-source/).

Two practical notes:

**Send it from where you know the amount.** Usually that's the confirmation page, in the browser, where the order total is already on screen. If only your server knows the right amount, send the event from the request the visitor made, such as the checkout handler, with their address and user agent:

```
POST https://app.feasible.lol/api/event
Content-Type: application/json
X-Forwarded-For: <the visitor's address>
User-Agent: <the visitor's User-Agent>

{"n": "Purchase", "d": "example.com", "u": "https://example.com/checkout",
 "$": {"amount": 49.00, "currency": "USD"}}
```

With those two headers it counts as the same visitor as their browser, so it lands in the same visit and is credited to the same source. A payment webhook comes from your payment provider, not the visitor, so a sale sent from there is counted at your server. [The API docs](/docs/api/#sending-events) have every field, and the [Laravel](/integrations/laravel/#server-side-events) and [Django](/integrations/django/#server-side-events) pages have working code.

**There's no dedicated ecommerce event set.** No cart, no product, no line items - just a generic revenue object on any event you like. Put the detail you need in [custom properties](/help/event-scope-vs-session-scope-for-custom-properties/) instead.
