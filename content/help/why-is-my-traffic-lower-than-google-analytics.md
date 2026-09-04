---
title: "Why is my traffic lower than Google Analytics said?"
description: "Usually four reasons: different bot filtering, different definitions, different blocking, and GA4's own thresholds. Here's how to check each."
category: "reports"
weight: 80
checked: 2026-09-03
---

Four reasons, and you can check three of them in about ten minutes.

**We filter more bots, and we show you the count.** Feasible runs [five classification checks](/help/how-do-you-handle-bots/) and refuses anything that matches — crawlers, headless browsers, datacenter addresses, monitors, AI scrapers. Open the health panel and read the drop counts by reason. On a site with any backlinks at all, that number is often 20–40% of raw requests. This is usually the whole gap.

**The words mean different things.** A "visit" here is one sitting that closes after 30 minutes of inactivity. A "session" elsewhere may restart on a campaign change, on midnight, or on a different timeout. Compare pageviews to pageviews before you compare anything else — that's the one definition everybody shares.

**The blocking is different.** Blocklists carry different hostnames, so the two scripts don't get blocked by exactly the same people. Somewhere around 13% of visitors block something, but that varies enormously — a developer blog and a recipe site are not the same audience, and neither is a mobile-heavy one. If it matters to you, [serving the script from your own domain](/help/can-i-proxy-the-script-from-my-own-domain/) narrows the gap.

**GA4 thresholds and samples its reports.** When a report might identify individuals, rows are withheld, and large date ranges get estimated rather than counted. Google's own documentation says the BigQuery export is the guaranteed-unsampled route. Feasible discloses sampling when it happens, with a badge and a one-click "show exact numbers" — so the two tools aren't hiding the same amount from you.

Then the boring one: check the **time zone** on both sites and check you haven't left a stray tag on one of them. If the numbers still don't reconcile, [the general version of this question](/help/my-numbers-dont-match-another-tool/) has the rest.
