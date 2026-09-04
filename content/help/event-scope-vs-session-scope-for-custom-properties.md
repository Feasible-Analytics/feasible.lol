---
title: "What's the difference between event scope and session scope?"
description: "Event scope describes one hit. Session scope describes the whole visit. The choice decides your conversion-rate denominator."
category: "goals-and-events"
weight: 50
---

Event scope describes one hit. Session scope describes the whole visit.

Every [custom property](/features/custom-properties/) in Feasible is one or the other, and you pick when you enable it. This looks like a detail and it isn't — **the scope decides the denominator of every conversion rate you read off that property.**

**Event scope** is for things that are true of a single action. The `plan` a purchase was on. The `search_term` on a search. The `url` of an outbound click. It varies hit to hit within one visit, and it should.

**Session scope** is for things that are true of the person for the whole sitting. Whether they were logged in. Their account tier. Which A/B variant they landed in. It's set once and applies to everything they do.

Here's why it matters. Say you tag a property `logged_in` and want the conversion rate for logged-in visitors.

- **Session-scoped**, the denominator is *visits where the person was logged in* — which is the question you actually asked.
- **Event-scoped**, the denominator is *events that carried `logged_in`* — which excludes every hit that didn't send it, and quietly inflates the rate.

Both numbers are computed correctly. Only one answers your question. Getting this wrong is how a report ends up confidently misleading, and it's the sort of thing that's very hard to notice later.

Rules of thumb: if the value could change between two pageviews in the same visit, it's event scope. If it describes the person, it's session scope.

Properties are allow-listed per site — enable the ones you want under **Site settings → Properties**, or allow all of them. Events that didn't carry the property land in a [labelled `(none)` bucket](/help/what-does-none-mean-in-a-breakdown/) rather than vanishing from the total.

And keep personal data out of them. The [DPA](/dpa/) prohibits it, not just the docs.
