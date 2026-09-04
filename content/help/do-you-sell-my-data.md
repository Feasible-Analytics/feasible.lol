---
title: "Do you sell my data?"
description: "No. There's no data broker, no ad network, no partner feed, and no plan to add one. We sell software for $9.99 a month."
category: "privacy-and-the-law"
weight: 110
updated: 2026-09-03
---

No. We sell software for $9.99 a month. That's the entire business model.

There's no ad network, no data broker, no "anonymized industry benchmark" product, no partner feed, no audience segment, no lookalike anything. The terms of service say plainly what we will never do with your data, and this is it.

Two structural facts make the promise more than a promise.

**Aggregating across customers is impossible by design.** Your domain is an input to [the visitor hash](/help/how-do-you-count-unique-visitors-without-cookies/), so the same human on two of our customers' sites is two unrelated 64-bit numbers. There's no key to join on. A cross-site audience isn't something we've decided not to build — it's something the data shape doesn't support.

**There's nothing valuable to sell.** No IP addresses, no emails, no user IDs, no persistent identifiers, no per-person timelines. What we hold is counts of paths, referrers, coarse locations and device strings, keyed to a number that expires overnight. That's a bad product to be a data broker with.

The people who *do* touch your data are named. Sub-processors are on a public list — the hosting provider, the mail sender, the payment processor — and they're bound by the [DPA](/dpa/). That's it.

If the model ever changed, you'd see it in the terms and you could [take every raw event with you](/help/how-do-i-export-my-data/) the same afternoon. Export is a button, it works in every account state, and it includes the raw rows rather than just the summaries — which is the part that makes leaving actually possible.

And if you'd rather not take our word for any of it, the source is [public](/open-source/) and you can [run it yourself](/help/can-i-run-feasible-myself/).
