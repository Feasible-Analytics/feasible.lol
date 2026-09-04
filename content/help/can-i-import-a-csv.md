---
title: "Can I import a CSV?"
description: "Yes — loose CSVs or a ZIP of them. The column names are the interface, and there's a documented set we recognize."
category: "importing-and-exporting"
weight: 20
---

Yes. Loose CSV files or a ZIP of them, under **Site settings → [Imports](/docs/import-export/)**.

The column headers are the interface. Give a file a recognized dimension column and one or more recognized metric columns and it imports. A column we don't recognize stops the import and names the column, rather than being dropped quietly and leaving you with numbers that are too small.

**Dimension columns:** `page` (or `path`), `hostname`, `page_title`, `name` (or `event_name`), `entry_page`, `exit_page`, `referrer`, `source`, `channel`, `utm_source`, `utm_medium`, `utm_campaign`, `country`, `region`, `city`, `device`, `screen_size`, `browser`, `browser_version`, `operating_system`, `operating_system_version`, `language`.

**Metric columns:** `visitors`, `visits` (or `entrances`), `pageviews`, `events`, `bounces`, `exits`, `visit_duration`, `time_on_page`.

**Dates** must be `2026-01-31`, `2026/01/31` or RFC 3339. Only unambiguous layouts are accepted — nothing that would let `03/04` mean either March or April, because a silent off-by-a-month in a year of history is unrecoverable.

The limits are generous: 5,000,000 rows per file, 100 CSVs per archive, 1 GiB uncompressed. Archives are checked for compression-bomb ratios before they're opened.

It runs as a background job and emails you when it's done.

Two useful facts:

**The sheet names match [our own export](/help/whats-in-the-export/)**, so a directory of exported CSVs imports file-for-file. Moving a site between accounts, or restoring after a reset, is export-then-import.

**Imported data records which dimensions it actually carried**, so filtering it behaves honestly rather than silently zeroing a chart on the day the import ends. Same mechanism as the [Google Analytics import](/help/can-i-import-my-google-analytics-history/).

Something not lining up? [Send us a few rows](mailto:help@feasible.lol) and we'll tell you what the parser saw.
