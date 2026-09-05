---
title: "How is time on page measured?"
description: "Only while the tab is visible and focused. A page left open in a background tab accrues nothing."
category: "reports"
weight: 100
---

Only while the tab is visible and focused.

Most tools infer time on page from the gap between two pageviews, which is why the last page of every visit gets zero seconds and why a tab left open overnight reports eight hours of rapt attention. Feasible measures it instead.

The script accrues time only when the browser says the page is visible **and** the document has focus. Switch tabs, minimize the window, or click into another app and the clock stops. Come back and it starts again. There's no polling timer chewing CPU - the accrued time is flushed with the `engagement` event, along with [scroll depth](/help/what-is-scroll-depth/).

What that buys you:

- **The last page of a visit has a real duration**, not a zero.
- **A single-page visit has a real duration**, so a [bounce](/help/what-is-bounce-rate/) isn't automatically worthless.
- **Background tabs don't inflate anything.** The number is smaller than you're used to, and closer to true.

Two related numbers can get mixed up:

**Visit duration** is the whole sitting, and it's one of the six tiles on the dashboard.

**Time on page** is per page, and it lives in the query engine and the API rather than on a tile. Pull it through the API or the MCP server when you want a per-page read.

The thing it can't do is measure someone who's looking at the screen without touching anything - reading is invisible to a browser. Nothing measures that, here or anywhere. Focus time is the closest proxy, which is why it's the one we use.
