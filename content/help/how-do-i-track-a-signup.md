---
title: "How do I track a signup?"
description: "One line of JavaScript and one goal. Two minutes, and it counts from the moment you save it."
category: "goals-and-events"
weight: 10
---

Send an event, then make it a goal.

**1. Fire the event** where the signup actually succeeds — after the account is created, not on the button click:

```js
feasible('Signup')
```

The function is already on the page; the script installs it. If you're sending events before the script has loaded, the standard queue stub works and they'll be replayed.

**2. Create the goal.** Go to **Site settings → Goals**, add a goal, choose **Custom event**, and type `Signup`. The name has to match exactly — it's case-sensitive.

That's it. Conversions appear in the **Goals** tab of the Behaviour card with uniques, totals and a conversion rate, and clicking the row filters the whole dashboard to people who converted. Which is the actually useful part: now you can see which sources, countries and landing pages produce signups rather than just traffic.

**If your signup is a page load** — a `/welcome` or `/thanks` page — you don't need JavaScript at all. Make a goal of the **Page** kind with the pattern `/welcome`, or `/thanks/*` to catch everything underneath.

Add properties if there's something worth splitting by:

```js
feasible('Signup', { props: { plan: 'pro', source: 'pricing-page' } })
```

Now the plan breakdown is a report. Just [pick the right scope](/help/event-scope-vs-session-scope-for-custom-properties/) — it decides the denominator of every conversion rate you'll read off it.

One thing to know before you go looking for last month: **[goals don't backfill](/help/why-doesnt-my-goal-show-past-conversions/)**. Counting starts when you save.
