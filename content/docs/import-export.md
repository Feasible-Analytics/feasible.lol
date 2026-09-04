---
title: "Import and export"
description: "Bring history in from CSV, and take everything out in one ZIP — including every raw event, in every plan."
lede: "Bringing history in, and taking everything out — including every raw event."
weight: 100
---

Bring history in from wherever you were before, and take everything out at any time. Both live at
`/settings/sites/<your domain>/imports`.

## Export

Press **Prepare an export** and a background job builds a ZIP containing:

- the ten roll-up tables as CSV — visitors, sources, pages, entry pages, exit pages, locations,
  devices, browsers, operating systems and custom events;
- `raw_events.csv` — **every event, one row each**.

The raw file is in every plan. Data you generated on your own site is yours, and putting the only
complete copy of it behind a plan is how a customer finds out they can't leave.

What each file contains is worth knowing before you compare two of them:

- The ten roll-up CSVs are your **real traffic**. They leave out anything classified as a bot, and
  anything you previously imported, so re-importing your own export can't double your history.
- `raw_events.csv` is **everything**, bot-classified rows included, with a `bot_reason` column so you
  can tell which is which. It also carries the exact custom property JSON, revenue amount and
  currency, UTM content and term, and the full URL stored for each event. Treat that file as
  sensitive if your site broke the rule about
  [not sending personal data](/docs/custom-properties/#dont-put-personal-data-in-a-property).

The download link is good for **24 hours**, and it only exists in the process that prepared it. If
the server restarts before you use it, the export shows as built by an earlier run with no link, and
you prepare another. That takes seconds.

Every figure in the export is a **total** — bounces and seconds, never rates and averages. A rate
can't be added to another rate, so an export of averages is one you can look at and never re-import.

## Import

Upload one CSV, or a ZIP of them. The same ten formats, with the column spellings an established
analytics export already uses, so a directory of files from your old product imports here without
editing.

A ZIP's `raw_events.csv` is deliberately skipped, so re-importing one of our own exports doesn't
count everything twice.

The limits: **200 MB** an upload, **5,000,000 rows** a file, and 100 CSVs in one ZIP.

Dates have to be `2026-08-31`, `2026/08/31` or full RFC 3339. An ambiguous `03/04/2026` is refused
rather than guessed at, because guessing wrong moves a quarter of your history by nine months and
nothing tells you.

**A column we don't recognise stops the import and names the column.** The alternative — dropping it
quietly — gives you numbers that are too small and no way to know it.

### What imported history actually becomes

This is the part that decides whether the feature is worth anything.

Imported data is stored as roll-up rows that carry *every dimension the source reported*, plus a
record of which dimensions it reported at all. Two consequences:

- A filter on a dimension your imported data has narrows it exactly like native traffic.
- A filter on a dimension the source never reported shows a **labelled gap** — not zero. "We don't
  know" and "there was none" are different answers, and a report that conflates them is worse than
  one that refuses.

Storing per-dimension totals instead is the common shortcut, and it's why applying any filter to
imported data elsewhere makes it vanish.

Imported history is **opt-in when you read it**: a report includes it only when you ask, so a number
is never quietly part native and part imported.

Nothing is merged or de-duplicated — uploading the same file twice creates two imports and counts it
twice. Deleting an import removes exactly the history it brought in, and nothing else, which is also
how you undo that.

## The hosted-analytics and search connectors

{{< callout type="warn" title="Connecting works. The import doesn't run yet." >}}
Authorising Google Analytics 4 or Search Console stores a grant and does nothing further in this
build. Use the CSV path in the meantime.

We'd rather say that than let you connect an account and wait for data that isn't coming.
{{< /callout >}}

The authorisation is **per site**: connecting a second site with the same provider account creates a
second, independent grant, so revoking one can never silently disconnect the other. The section only
appears on an install that has provider credentials configured.

Two things to expect rather than report as bugs once the import does run. **Search-performance data
arrives about 24 to 36 hours late**, so today and usually yesterday will be empty — that's the
source's reporting delay, not a gap in your tracking. And there's **no search-terms report** on this
end: Search Console data lands in its own table and nothing reads it back yet.

## A locked or dormant account

Export is reachable in every state an account can be in, including a locked dashboard, a stopped
collection, and the day before a scheduled deletion.

It's your data and we won't withhold it to collect a debt. The timetable is on the
[pricing page](/pricing/).
