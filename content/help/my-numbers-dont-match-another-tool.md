---
title: "My numbers don't match another tool"
description: "They never will, and the gap is explainable. Six things to check, in the order that finds it fastest."
category: "troubleshooting"
weight: 30
---

Two analytics tools will never agree, and that's not a bug in either of them.

They filter different bots, define a session differently, get blocked by different lists, and round in different places. Anyone who tells you their numbers match another vendor's exactly is running one script through two badges.

What you can do is explain the gap. Work down this list — it's ordered by how often each one turns out to be the answer.

1. **Compare pageviews to pageviews.** It's the only metric everyone defines the same way. Visitors and sessions are where the definitions diverge, so start with the one that can't.
2. **Read the drop counts on the health panel.** [Every refused event has a named reason](/help/why-are-my-events-being-dropped/). On a site with backlinks, bot filtering alone is usually the entire gap on its own — and the panel gives you the exact number rather than an estimate.
3. **Check both time zones.** If one tool is on UTC and yours is on your site's local clock, every daily figure is shifted and the totals for a week won't line up.
4. **Check for a duplicate tag.** Two copies of any script means double-counted pageviews in whichever tool has the duplicate. View source and search.
5. **Check what each tool counts as a session.** Ours [closes after 30 minutes of inactivity](/help/what-is-a-visit-and-when-does-it-end/) and never restarts mid-visit on a referrer change. Some tools restart on a campaign change or at midnight, which inflates session counts against ours.
6. **Check whether either tool is sampling or thresholding.** We disclose sampling with a badge and a one-click "show exact numbers". Not everyone does.

If you're comparing against Google Analytics specifically, [there's a version of this with the GA-shaped detail in it](/help/why-is-my-traffic-lower-than-google-analytics/).

Still can't account for it? [Email us](mailto:help@feasible.lol) with both numbers and a date range. We'll look.
