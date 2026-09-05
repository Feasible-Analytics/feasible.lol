---
title: "Can I compare two date ranges?"
description: "Yes - previous period or year over year, one keystroke. Custom range against custom range isn't in the dashboard."
category: "reports"
weight: 110
---

Yes. Press `X`.

Comparison is [built into the dashboard](/features/dashboard/), has three settings, and is on by default:

- **No comparison**
- **Previous period** - the same length of time immediately before. The default.
- **Year over year** - the same dates last year.

Turn it on and three things change. The graph draws a thin dashed line for the earlier period. Each of the six top tiles gets a change chip. And when you open a report in the drawer, the sorted column gets one too, so you can see which pages or sources moved rather than just that the total did.

Pick whichever comparison answers your question. Previous period is right for "did the campaign work". Year over year is right for anything seasonal, where last month is a terrible baseline and last December is a good one.

The arrow keys step the whole window by one period at a time, calendar-aware, so `←` from "Last month" goes to the month before rather than back thirty days.

Two limits, said plainly:

**Comparison is hidden on Realtime.** There's nothing sensible to compare five minutes to.

**You can't pick an arbitrary custom range to compare against.** The dashboard offers previous period and year over year, and that's it. If you need "this launch week versus that launch week", the [API](/docs/api/) will do it - the query engine accepts an explicit comparison range even though the UI doesn't offer one.

When the earlier period had no traffic at all, the chip says so rather than printing an infinite percentage increase. And if you want to mark *why* something moved, [annotations](/help/what-is-an-annotation/) put a note on the chart where the change is.
