---
title: "What's in the export?"
description: "One ZIP: ten roll-up CSVs and the raw events. Here's every sheet and what each one holds."
category: "importing-and-exporting"
weight: 40
---

One ZIP with eleven files in it — ten roll-up sheets plus the raw events.

**The ten roll-ups**, one CSV each:

- `imported_visitors` — daily totals: visitors, visits, pageviews, bounces, visit duration
- `imported_sources` — referrer, source, channel and the UTM fields
- `imported_pages` — page paths, with titles
- `imported_entry_pages` — where visits started
- `imported_exit_pages` — where they ended
- `imported_locations` — country, region, city
- `imported_devices` — device type and screen size
- `imported_browsers` — browser and version
- `imported_operating_systems` — OS and version
- `imported_custom_events` — your events and their properties

**And the raw events.** Every individual row, with its dimensions, not a summary of them. This is the file that makes the export worth something — a summary can't be re-aggregated a different way, and raw rows can.

What's *not* in there is an IP address, because [there never was one](/help/do-you-store-ip-addresses/). The visitor identifier is the daily hash, which means rows from different days can't be joined into a person's history. That's the same limit that applies to us.

The sheet names aren't arbitrary. They're the same names the [CSV importer](/help/can-i-import-a-csv/) reads, so an export imports straight back — into another site, another account, or the same one after a reset. Moving a site between teams is export, add, import.

Open them in anything. They're plain CSVs with header rows.

The download link lasts 24 hours and you can make a new export whenever you like. [How to create one](/help/how-do-i-export-my-data/) — and note it works in every account state, including a locked or lapsed one.
