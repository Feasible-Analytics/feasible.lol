---
title: "Can I import my Google Analytics history?"
description: "Yes — connect a Google account and we walk GA4 a day at a time. It arrives as roll-ups, and filters on it behave honestly."
category: "importing-and-exporting"
weight: 10
---

Yes. Connect the Google account that owns the property and we'll pull it in.

1. Go to **Site settings → Imports**.
2. Connect Google. It's a read-only OAuth scope — analytics read, nothing else.
3. Pick the property and start the import.

It runs as a background job, walking GA4 a day at a time, and it's resumable — a network wobble or a rate limit doesn't mean starting again. You'll get an email when it finishes. Big properties take a while; you don't have to sit there.

What comes across: daily totals, pages, sources, locations, devices, browsers and operating systems.

**The imported history is roll-ups, not raw events**, because that's all the export gives us. Which raises the obvious question — what happens when you filter on something the import didn't carry?

Most tools quietly zero it out, which is how a chart ends up showing a cliff on the day you switched tools. Feasible records *which dimensions the source actually reported*, alongside the data. So a filter on a dimension the import has narrows the imported history exactly like it narrows native traffic, and a filter on a dimension it lacks is reported as a labelled gap rather than a zero. You can tell the difference between "nobody" and "we don't know".

Two things to expect:

**The numbers won't match GA exactly**, and they shouldn't — different bot filtering, different session definitions, [different everything](/help/why-is-my-traffic-lower-than-google-analytics/). Treat imported history as the shape of the past, not a reconciled ledger.

**Goals don't come across.** They're evaluated as events arrive and [don't backfill](/help/why-doesnt-my-goal-show-past-conversions/), imported or not.

Coming from something that isn't GA? [CSVs work too](/help/can-i-import-a-csv/).
