---
title: "Why doesn't Stripe show up as a source?"
description: "Because attribution is frozen when the visit starts. A payment redirect can't overwrite the channel that earned the sale."
category: "goals-and-events"
weight: 70
---

Because your payment provider didn't send you that customer, and the report shouldn't say it did.

Here's the failure mode in other tools. Someone clicks your newsletter, reads the pricing page, goes off to a hosted checkout on `checkout.stripe.com`, pays, and gets redirected back to `/thanks`. That return trip carries a referrer of `stripe.com`. If the tool re-attributes on every referrer change, it starts a new session, credits it to Stripe, and now your best-performing marketing channel is your payment processor. Every conversion, every month, forever.

Feasible freezes attribution at the start of the visit. Whatever brought somebody in owns the whole sitting - source, channel, campaign and UTMs - and nothing that happens mid-visit rewrites it. The newsletter gets the credit, because the newsletter earned it.

The same logic covers every mid-visit redirect: payment pages, OAuth providers, identity gateways, link shorteners in your own emails, and the "continue with Google" round trip.

Two things follow.

**[Revenue lands on the right channel](/help/how-do-i-track-revenue/).** Since revenue is credited to the source that started the visit, your revenue-per-channel report reflects marketing rather than plumbing.

**A visit that's over is over.** If somebody leaves for two hours and comes back through your payment provider's receipt email, that's a new visit and it will be attributed to whatever started it - because [30 minutes of silence closes a visit](/help/what-is-a-visit-and-when-does-it-end/). That's correct too; it really is a different sitting.

If you *do* want to see the payment domain, it's still there as a referrer - filter by it under **Acquisition** in the filter menu. It just doesn't get to be a [source](/help/whats-the-difference-between-a-source-and-a-channel/).
