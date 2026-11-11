---
title: "Can I import my Google Analytics history?"
description: "Connect your GA4 property and import a historical date range. Learn which reports move, what stays behind, and why CSV exports need preparation."
category: "importing-and-exporting"
weight: 10
updated: 2026-11-11
---

Yes. Connect Google Analytics 4 from **Site settings → Imports**, then choose a property and a date range.

1. Open **Site settings → Imports → Google Analytics** and connect the Google account that can read the property.
2. Choose the GA4 property. The import reads property-level reports, without a hostname or data-stream filter. If it combines several websites or apps, don't treat those totals as one website's history.
3. Choose historical dates ending before today and before Feasible started collecting traffic for this site. The range must not overlap an earlier traffic import.
4. Press **Import Analytics history**. Follow the job's progress and any error on the Imports screen.

The import brings in daily totals and breakdowns for pages, sources, locations, devices, browsers, operating systems and landing pages. These are aggregated reports, not individual events.

**Connecting isn't the import.** You still need to select the property and dates, then start the job. Self-hosted installs need Google provider credentials configured before this section appears.

## What to expect

**Visitors across several days are summed daily counts.** They aren't a deduplicated count of people across the whole date range. Google may also withhold some report data.

**The numbers won't match exactly.** Bot filtering and session definitions differ. [Compare trends rather than treating the two tools as a reconciled ledger](/help/why-is-my-traffic-lower-than-google-analytics/).

**Goals, audiences and saved reports don't move.** Recreate the goals you need. Imported reports don't recreate individual visits or the sequence of events for a funnel.

**Check the result before removing your old tag.** Pick several dates and compare the imported totals and breakdowns. Keep your own export of the old data too.

## Can I upload a GA4 CSV instead?

Feasible accepts [documented CSV columns](/help/can-i-import-a-csv/), not every report a tool can export. A GA4 report download isn't guaranteed to match that format.

A CSV needs a `date` column, supported dimension and metric names, and daily totals rather than rates or averages. Map the fields carefully and check their meaning. Renaming an average to a total doesn't convert the data. Unknown columns stop the import.

Use the direct GA4 connection when available. If you need the CSV route, [read the format first](/docs/import-export/#import) and test a small historical range before uploading the rest.

**Universal Analytics is different.** Google [ended access to its data in July 2024](https://support.google.com/analytics/answer/11583528). If you didn't export it then, there's no history left there to retrieve.
