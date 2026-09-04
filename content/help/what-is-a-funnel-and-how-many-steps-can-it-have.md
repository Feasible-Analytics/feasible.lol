---
title: "What is a funnel, and how many steps can it have?"
description: "An ordered sequence of goals with the drop-off between each. Two steps minimum, eight maximum, and two matching modes."
category: "goals-and-events"
weight: 40
---

An ordered sequence of goals, showing how many people made it to each step and how many fell out between.

**Two steps minimum, eight maximum.** Every step is a [goal](/features/goals-and-funnels/) you've already created, so build the goals first.

A signup funnel usually looks like this:

1. Viewed `/pricing`
2. Started signup
3. Verified email
4. Made a first project

You get numbered horizontal bars, visitors at each step, the conversion rate, and "{count} dropped · {rate}" between them. The header tells you the overall completion rate. The value isn't the total — it's spotting that step three loses 60% of everyone, which is a Tuesday afternoon's work to fix and worth more than a month of traffic.

**Two matching modes**, and picking the right one matters:

- **Sequential** — the steps happen in order, but other things can happen in between. This is what you want almost always. Real people browse.
- **Strict** — the steps must be consecutive events with nothing between them. Use it when the sequence is a genuine machine-like flow and any detour means failure.

Choose Sequential unless you have a specific reason. Strict on a normal website will show you a near-zero completion rate and it won't be telling you anything.

Set them up under **Site settings → Funnels**, then read them in the **Funnels** tab of the Behavior card.

Two limits worth knowing. Funnels inherit the [no-backfill rule](/help/why-doesnt-my-goal-show-past-conversions/) from their goals — a funnel is only as old as its youngest step. And if you want to know where people went *instead*, the **Explore** tab does that: pick a page and walk forwards or backwards through where visitors actually came from and left to, with explicit entry and exit rows.
