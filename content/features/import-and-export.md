---
title: "Import your history, export everything"
description: "Bring history in as CSV, and take everything out as one ZIP — ten roll-up sheets plus every raw event. Not a paid add-on."
lede: "Your history comes with you, and so does everything you collect here."
weight: 100
note: |
  Import is CSV today. You can authorize a Google Analytics or Search Console
  account, but nothing pulls data across yet and there's no search-terms report
  on this end. A direct Google connection is on the way; until it lands, export
  from Google and upload the files.
---

Two directions, both of them a button.

**In:** loose CSVs, or a ZIP of them. **Out:** one ZIP containing ten roll-up
sheets and every raw event Feasible has stored for the site.

## Bringing history in

The single biggest reason people stay on analytics they've stopped liking is
that leaving means abandoning years of numbers. It's the first objection in
every thread on the subject, and it's a fair one.

Export your GA4 reports as CSV and upload the folder — pages, sources,
locations, devices and browsers land on the same charts as your live traffic,
dated where they belong. It's the same path any other tool's export takes.

Import takes a ZIP or loose files. Recognized dimension columns cover page,
hostname, page title, event name, entry and exit page, referrer, source,
channel, the three UTM fields, country, region, city, device, screen size,
browser and version, operating system and version, and language. Metric columns
are visitors, visits, pageviews, events, bounces, exits, visit duration and time
on page. If your previous tool exports daily roll-up CSVs with columns named
like that, they come straight in.

Dates have to be unambiguous — `2026-01-02`, `2026/01/02`, or RFC 3339. We won't
guess whether `01/02` is January 2nd or February 1st, because guessing wrong
puts a month of traffic on the wrong days and nothing about the result looks
broken.

The guards are generous and finite: 5,000,000 rows per file, 100 files per
archive, 1 GiB uncompressed, and a compression-ratio limit that stops a zip
bomb from being an interesting afternoon.

## Imported history behaves like history

Here's the part most importers get wrong.

Imported data arrives as roll-up rows carrying the full dimension block **plus a
record of which dimensions the source actually reported**. So when you filter to
Germany, imported traffic narrows exactly like native traffic. And when you
filter by something the source never provided — screen size, say, from a tool
that didn't export it — that period is reported as a labeled gap rather than
silently rendering as zero.

The difference matters when somebody looks at a two-year chart. A gap says "we
don't know". A zero says "there was none". Only one of those is true, and the
wrong one turns into a business decision.

## Taking everything out

Ask for an export and a background job builds a ZIP: ten roll-up sheets —
visitors, sources, pages, entry pages, exit pages, locations, devices, browsers,
operating systems, custom events — plus **the raw events**. Not a summary of
them. The rows.

The download link is good for 24 hours.

Raw event export isn't a premium tier, an enterprise line item, or a support
ticket. It's a button on your settings screen, in every copy of Feasible,
including the [self-hosted](/open-source/) one. Elsewhere in this category,
getting your own raw events out is the thing you have to call sales about.

## Why export works even when your account doesn't

If your card fails, Feasible locks the dashboard after 30 days. Collection keeps
running. Export keeps working — in every phase, without exception, right up to
deletion.

That's a deliberate decision written into the access rules rather than a
courtesy we extend when someone emails. Data portability that evaporates the
moment you stop paying isn't portability; it's a deposit. And an analytics
company whose retention strategy is "your history is in here and you can't have
it" has stopped selling a product and started running a lock-in.

The same instinct explains the whole design. The [API](/features/api-and-webhooks/)
has no plan check. The source is [AGPL](/open-source-web-analytics/), so if we disappear
tomorrow the software you were using still runs. Export is a button, so the
answer to "what if we want to leave" is a shrug and a ZIP file.

Imports and exports both live on one settings screen per site, and
`import.completed` and `import.failed` exist as
[webhook](/features/api-and-webhooks/) event types too, though nothing publishes
them yet. More in
[the import and export docs](/docs/import-export/).
