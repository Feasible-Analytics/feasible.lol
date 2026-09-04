---
title: "I'm seeing spam referrers"
description: "Most are filtered before they reach your reports. Here's how to check, and how to kill the ones that got through."
category: "troubleshooting"
weight: 40
---

Most of it never reaches your reports. Check the health panel before you go rule-writing.

Referrer spam is filtered as one of [five bot classification checks](/help/how-do-you-handle-bots/). A known junk referrer is matched by host — with `www.` stripped, falling back to the registrable domain — and refused with the reason `referrer_spam`. Open **Site settings → Health** and you'll see the count. It's usually larger than the amount that got through.

If something *has* got through, there are three moves.

**Tell us.** [Email the domain](mailto:help@feasible.lol) to us and we'll add it to the list, which fixes it for every customer rather than just you. This is the one worth doing.

**Filter your view.** In the dashboard, add a filter under **Acquisition** — `Source` `is not` `thespamdomain.com` — and the report is clean while you wait.

**Shield the entry point.** If the junk is hitting a specific path, a page shield under **Site settings → Shields** stops it centrally within 15 seconds. If it's arriving on a hostname you don't own, the hostname allow-list already refuses it as `hostname_not_allowed`.

Two things worth knowing about how spam behaves here:

**There's no separate Referrers card to pollute.** Referrer is a filter rather than a report, so junk shows up as a row in Sources rather than as a whole screen of noise.

**Filtered events are counted, not deleted.** You can see exactly how much spam you got and when it started, which is more useful than a report that simply never mentions it. If your traffic looks strange, that count is often the explanation.

If you [self-host](/help/can-i-run-feasible-myself/), the spam and bot lists ship inside the binary and you can replace them with your own files on disk without rebuilding. They don't refresh themselves at runtime.
