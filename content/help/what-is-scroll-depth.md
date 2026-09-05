---
title: "What is scroll depth?"
description: "How far down a page somebody got, as a percentage. It's most useful as a goal - 'reached 75% of the article'."
category: "reports"
weight: 90
---

How far down the page somebody got, as a percentage of its height.

The script tracks the deepest point reached during the visit and sends it as part of an `engagement` event - the same event that carries [time on page](/help/how-is-time-on-page-measured/). There's no polling timer running in the background; it's flushed when the reading settles or when somebody scrolls deeper.

The useful form is a **goal**. Scroll depth is one of the three goal kinds, alongside a page pattern and a custom event. Create one, set the threshold, and optionally narrow it to a set of pages:

1. Go to **Site settings → Goals**.
2. Add a goal, choose **Scroll depth**.
3. Set the percentage - 50% and 75% are the usual ones.
4. Narrow it to a page pattern if you want it to mean something specific, like `/blog/*`.

Now "reached 75% of an article" is a conversion you can put in a [funnel](/help/what-is-a-funnel-and-how-many-steps-can-it-have/), break down by source, or compare across campaigns. That's a far better read on whether people are reading than [bounce rate](/help/what-is-bounce-rate/), which can't tell a two-second bounce from a four-minute one.

As a raw metric, `scroll_depth` lives in the query engine and the API rather than on one of the six dashboard tiles. If you want it as a number in a report of your own, that's where to get it.

Two caveats. On a very short page everyone reaches 100% without reading anything - the viewport already covers it. And a goal only counts from the moment you create it, because [goals don't backfill](/help/why-doesnt-my-goal-show-past-conversions/). Make the ones you want now.
