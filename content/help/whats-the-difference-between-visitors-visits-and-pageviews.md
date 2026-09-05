---
title: "What's the difference between visitors, visits and pageviews?"
seotitle: "Visitors vs visits vs pageviews - Feasible"
description: "One person, one sitting, one page load. Three tiles on the dashboard, and they answer three different questions."
category: "reports"
weight: 5
---

One person, one sitting, one page load.

**Unique visitors** is people. One person reading four pages this morning is one visitor.

**Total visits** is sittings. That's also called a session. The same person coming back after lunch is one visitor and two visits, because [a visit closes after 30 minutes of inactivity](/help/what-is-a-visit-and-when-does-it-end/).

**Total pageviews** is page loads. Four pages this morning and three after lunch is seven pageviews, two visits, one visitor.

So the three numbers always climb in that order: visitors ≤ visits ≤ pageviews. Usually.

Two things about visitors catch people out.

**Visitors don't add up across days.** The visitor identifier is [rebuilt from a fresh salt every day](/help/how-do-you-count-unique-visitors-without-cookies/), so somebody who comes back on Tuesday is a new visitor on Tuesday. Seven daily counts summed will always be larger than the week's number shown on the tile - the tile is right, your addition isn't. This is true of every analytics tool that de-duplicates over a window; it's just more visible here because the window is a day.

**Unique visitors can exceed pageviews.** It looks impossible and it isn't. A custom event with no pageview attached - a form submission on a page loaded yesterday, an outbound click after a bfcache restore - creates a visitor without adding a pageview.

If you only ever look at one of the three, look at visitors. It's the one that answers "is this growing".
