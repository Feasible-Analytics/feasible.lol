---
title: "Why doesn't my goal show past conversions?"
description: "Goals count from the moment you create them. They don't backfill, and the reason is that backfilled numbers would be wrong."
category: "goals-and-events"
weight: 20
---

Goals don't backfill. They count from the moment you save them.

Create a goal today and yesterday stays empty, even if the events were arriving all along. The creation form says so before you save, because it's the single most common surprise in any analytics tool.

Why not just backfill? Because the numbers would be quietly wrong. A conversion isn't only "did this event happen" — it's a conversion rate, which needs a denominator, and a goal's definition can include property constraints and page patterns that were never evaluated against the events as they arrived. Recomputing all of that after the fact produces a figure that looks authoritative and isn't. We'd rather show you an empty chart that's true.

There's a real cost to this, and it's this: **create your goals on day one.** Even the ones you're not sure you need. A goal you never look at costs nothing; a goal you wish you'd made in March is gone.

If you genuinely need the history, there is one route. The events themselves *are* stored — it's the goal evaluation that isn't retroactive. You can filter the dashboard by event name, or query the raw events through the [API](/docs/) or [the export](/help/how-do-i-export-my-data/), and count them yourself for the period before the goal existed. Clumsy, but the data is there.

Two things that are *not* the problem, in case you're checking:

- **Event names are case-sensitive.** `signup` and `Signup` are different goals. This causes about half the "my goal shows nothing" emails.
- **Automatic goals are created with the site**, so [those four](/help/what-are-the-four-automatic-goals/) have been counting since day one.
