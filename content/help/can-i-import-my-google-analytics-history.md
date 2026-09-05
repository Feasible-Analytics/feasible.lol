---
title: "Can I import my Google Analytics history?"
description: "Yes. Export your GA4 reports as CSV and upload the folder. Imported history appears beside your new data."
category: "importing-and-exporting"
weight: 10
---

Yes, as CSV.

1. In GA4, open the reports you want to keep - pages, traffic acquisition, locations, devices, browsers - and download each one as CSV.
2. In Feasible, go to **Site settings → Imports**.
3. Upload the files, or zip the folder and upload that.

It runs as a background job and emails you when it's done. Pages, sources, locations, devices and browsers land on the same charts as your live traffic, dated where they belong, so your history sits behind the day you installed the script.

A direct Google connection is on the way. Today it's a CSV upload.

**The imported history is roll-ups, not raw events**, because that's all a report export gives us. Which raises the obvious question - what happens when you filter on something the import didn't carry?

Most tools quietly zero it out, which is how a chart ends up showing a cliff on the day you switched tools. Feasible records *which dimensions the source reported*, alongside the data. So a filter on a dimension the import has narrows the imported history like it narrows native traffic, and a filter on a dimension it lacks is reported as a labeled gap rather than a zero. You can tell the difference between "nobody" and "we don't know".

Two things to expect:

**The numbers won't match GA exactly**, and they shouldn't - different bot filtering, different session definitions, [different everything](/help/why-is-my-traffic-lower-than-google-analytics/). Treat imported history as the shape of the past, not a reconciled ledger.

**Goals don't come across.** They're evaluated as events arrive and [don't backfill](/help/why-doesnt-my-goal-show-past-conversions/), imported or not.

**Universal Analytics history probably isn't there to export.** Google cut off access to it in July 2024. If you didn't take a copy then, nobody can get it back for you.

The column names the parser accepts are listed under [can I import a CSV](/help/can-i-import-a-csv/) - the same set works for a GA4 export or any other tool's.
