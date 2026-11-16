---
title: "Import and export"
description: "Bring history in from CSV, and take everything out in one ZIP - including every raw event, in every plan."
lede: "Bringing history in, and taking everything out - including every raw event."
weight: 100
---

Bring history in from wherever you were before, and take everything out at any time. Both live at
`/settings/sites/<your domain>/imports`.

## Export

Press **Prepare an export** and a background job builds a ZIP containing:

- the ten roll-up tables as CSV - visitors, sources, pages, entry pages, exit pages, locations,
  devices, browsers, operating systems and custom events;
- `raw_events.csv` - **every event, one row each**.

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

Every figure in the export is a **total** - bounces and seconds, never rates and averages. A rate
can't be added to another rate, so an export of averages is one you can look at and never re-import.

## Import

The upload on the Imports screen takes two kinds of file: the ZIP Plausible exports, and CSV files
in our documented columns. Google Analytics 4 comes in through
[its own connector](#google-analytics-4) instead.

### A Plausible export

Plausible exports a site's history as one ZIP of daily CSV files, from the site's settings under
**Imports & Exports → Export to CSV**
([Plausible's docs](https://plausible.io/docs/export-stats), checked November 16, 2026). Upload that
ZIP as it is. There's nothing to unzip or rename.

The import recognizes it from the file names inside and brings in visitors, sources, pages, entry
and exit pages, locations, devices, browsers, operating systems, custom events and custom
properties. Pages keep their scroll depth and time on page, and outbound-link and file-download
events keep the link they were for. Sources get a channel worked out from the source and UTM tags,
because the export doesn't carry one.

When it finishes, each custom event name becomes an event [goal](/docs/goals-funnels/#goals) that
starts on the first day of the import, so its imported history counts. Each custom property becomes
one you can [break down by](/docs/custom-properties/#reading-them-back) in the dashboard and the API.

The ZIP has to include the visitors file. If it holds a CSV we don't recognize, the import stops and
names the problem rather than skipping the file. The limits below apply to it too.

Nothing is de-duplicated, so if both scripts ran on your site for a while, those days count twice.

### Your own CSVs

Upload one CSV, or a ZIP of them. Use the [documented column names](/help/can-i-import-a-csv/)
and include a `date` column. The ten formats match Feasible's own roll-up exports.
Another tool's download may need conversion. In particular, don't assume an unchanged GA4 report
CSV will import: its headers, date layout and metrics may differ.

A ZIP's `raw_events.csv` is skipped, so re-importing one of our own exports doesn't
count everything twice.

The limits: **200 MB** an upload, **5,000,000 rows** a file, 100 CSVs in one ZIP, and 1 GiB once a
ZIP is unpacked.

Dates have to be `2026-08-31`, `2026/08/31` or full RFC 3339. An ambiguous `03/04/2026` is refused
rather than guessed at, because guessing wrong moves a quarter of your history by nine months and
nothing tells you.

**A column we don't recognize stops the import and names the column.** The alternative - dropping it
quietly - gives you numbers that are too small and no way to know it.

### What imported history becomes

This is the part that decides whether the feature is worth anything.

Imported data is stored as roll-up rows that carry *every dimension the source reported*, plus a
record of which dimensions it reported at all. Two consequences:

- A filter on a dimension your imported data has narrows it like native traffic.
- A filter on a dimension the source never reported shows a **labeled gap** - not zero. "We don't
  know" and "there was none" are different answers, and a report that conflates them is worse than
  one that refuses.

Storing per-dimension totals instead is the common shortcut, and it's why applying any filter to
imported data elsewhere makes it vanish.

Imported history behaves differently in the two places you read it. **The dashboard folds it into
every non-realtime query**, so your charts show one continuous history. **The query API leaves it
out unless you ask** - send `"include": {"imports": true}` - so an integration's number can never
change the day an import finishes.

Nothing is merged or de-duplicated - uploading the same file twice creates two imports and counts it
twice. Deleting an import removes the history it brought in, and nothing else, which is also
how you undo that.

## The Google connectors

### Google Analytics 4

Connect Google Analytics from the site's Imports screen, choose a property, then select a
historical date range and press **Import Analytics history**. The job runs in the background and
reports progress or failure on that screen. Connecting alone doesn't start an import.

Reports cover the selected property, without a hostname or data-stream filter. A property
containing several websites or apps can therefore include traffic beyond this Feasible site.
Check the property's scope before importing.

Dates must end before today and before this site's collected traffic, without overlapping earlier
traffic imports. The importer brings in daily totals and breakdowns for pages, sources, locations,
devices, browsers, operating systems and landing pages. It doesn't recreate raw events, goals,
audiences or saved reports. Visitor totals over multiple days are summed daily counts.

[Follow the GA4 import guide](/help/can-i-import-my-google-analytics-history/) and verify a few dates
before you remove the old tracker. Google may withhold report data, and metric definitions differ.

### Google Search Console

Search Console tells you what people typed into Google before they clicked through to your site. Our
tracker can't see that on its own, because Google takes the search words out of the referrer.

On the site's Imports screen, press **Connect search performance** and sign in with a Google account
that has the site verified in Search Console. Choose the property this site should read, then press
**Save and import**. The first import pulls everything Search Console still holds, about 16 months.
After that, Feasible re-reads the last five days every six hours, because Google keeps revising its
own figures for a few days.

The data appears in the **Search performance** card on the dashboard. It has four tabs: search terms,
landing pages, countries and devices. Every row shows clicks, impressions, click-through rate and
average position, and the search terms and landing pages tabs have a box to narrow the list.

A few things work differently from the rest of the dashboard:

- Google publishes about a day and a half late, so today and usually yesterday are empty.
- Google's clicks won't match our visit counts. Google counts clicks on a result, we count visits
  that reached the page, and Google leaves out search terms too few people used.
- The dashboard's filters don't apply to this card, and shared links and public dashboards don't
  show it.

### Connection scope

Google authorization is **per site**. Connecting a second site creates a separate grant, so revoking
one doesn't disconnect the other. Self-hosted installs only show this section when Google provider
credentials are configured. Search Console uses its own connection; it doesn't import GA4 traffic.

## A locked or dormant account

Export is reachable in every state an account can be in, including a locked dashboard, a stopped
collection, and the day before a scheduled deletion.

It's your data and we won't withhold it to collect a debt. The timetable is on the
[pricing page](/pricing/).
