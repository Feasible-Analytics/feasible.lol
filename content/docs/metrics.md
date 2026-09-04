---
title: "Metric definitions"
description: "What every Feasible metric means, with the arithmetic behind four results that surprise people in every analytics product."
lede: "What each number means, and four results that surprise people."
weight: 60
---

Most of these are what you'd expect. The four at the bottom are the ones that surprise people, and
they surprise people in every analytics product. We'd rather write them down, with the arithmetic,
than let you find them in a meeting.

## The metrics

- **Unique visitors** — distinct visitor identifiers in the period. Read the section below before you
  use this number in a sentence containing the word "people".
- **Total visits** — a visit is a run of activity that ends after 30 minutes of silence. Nothing else
  ends it.
- **Total pageviews** — one per page load, plus one per client-side route change.
- **Events** — everything that isn't a pageview: your own custom events, outbound clicks, downloads,
  form submissions.
- **Views per visit** — pageviews divided by visits.
- **Bounce rate** — the share of visits with exactly one pageview and no other interaction. An
  engagement measurement isn't an interaction; an outbound click is.
- **Visit duration** — last activity minus first activity within a visit. A single-page visit has a
  duration only if the tab reported time on page.
- **Time on page** — accumulated by the script only while the tab is both visible *and* focused, so a
  page sitting behind another window doesn't bank hours.
- **Scroll depth** — the furthest point reached, 1 to 100, as a percentage of the document height at
  the moment it was measured. Never below 1, so "never reported" and "didn't scroll" stay
  distinguishable.
- **Exit rate** — the share of visits that ended on a page, out of the visits that included it.
- **Conversion rate** — converting visitors divided by all visitors in the period. See
  [goals](/docs/goals-funnels/) for what changes that denominator.
- **Group conversion rate** — the same idea across a set of goals rather than one.
- **Total revenue**, **average revenue** and **revenue per visitor** — for goals that carry money.

Six of these are on the dashboard tiles. All fifteen are available through
[the query API](/docs/api/).

## Days, weeks and time zones

Buckets are cut in **your site's** time zone, not ours and not the reader's, and a week starts on
Monday.

When you compare against a period that's still running, we compare the same amount of *elapsed* time
— at four in the afternoon, "vs yesterday" compares sixteen hours against sixteen hours rather than
sixteen against twenty-four.

## Four things that are not bugs

### Visitors aren't additive, and aren't quite what you think

Unique visitors counts distinct **daily visitor identifiers**. There's no cookie and no durable id:
the identifier is recomputed each day from a salt that rotates at midnight UTC and is then deleted,
which is a large part of why [most sites don't need a consent banner](/docs/privacy/) for this.

Two consequences follow, and they point in opposite directions.

**Within a day, hours don't add up.** The same person keeps one identifier all day, so they appear in
every hour they were active:

| Hour | Who was here | Unique visitors |
|---|---|---|
| 09:00 | Ana, Ben | 2 |
| 14:00 | Ana | 1 |
| 21:00 | Ana, Cara | 2 |
| **The whole day** | Ana, Ben, Cara | **3** |

Five, if you add the hours. Three, which is the answer. Don't sum a visitors column.

**Across days, a returning person is counted again.** Because the identifier is rebuilt every day,
Ana coming back on Tuesday is a different identifier from Ana on Monday:

| Day | Who was here | Unique visitors |
|---|---|---|
| Monday | Ana, Ben | 2 |
| Tuesday | Ana, Cara | 2 |
| **Monday–Tuesday** | three people, four identifiers | **4** |

So a month's figure is close to the sum of its days, and it is *not* the number of different human
beings who saw your site. It overstates that by however often people come back. Read it as "daily
unique visitors, totalled".

If you want unduplicated humans over a long window, no cookieless product can give you that, and one
that claims to is either keeping an identifier for longer than a day or estimating.

The two figures differ by a handful either way for visitors whose identifier straddles one of your
local day boundaries — the salt rotates at UTC midnight and your days probably don't. We subtract
those rather than counting them twice, so the summarized and the raw answer agree.

### Unique visitors can exceed pageviews

Every metric is computed over the events the current filter selects, and not every event is a
pageview. Filter to a custom event and you get a report with visitors and no pageviews at all:

| Filter | Unique visitors | Total pageviews |
|---|---|---|
| none | 4,180 | 11,902 |
| `Event name is Signup` | 126 | 0 |
| `Event name is Outbound Link: Click` | 402 | 0 |

That's arithmetic, not an error. 126 people fired a `Signup` event; no `Signup` event is a pageview,
so the pageview count under that filter is zero. The same thing on a smaller scale is what produces a
segment with more visitors than views.

### Attribution is frozen at the start of a visit

The referrer, source, channel, campaign, country, device and browser are decided by the **first
pageview of a visit** and stamped onto every event in it.

Worked example. One visitor, one visit:

1. 10:02 — arrives on `/pricing` from a search engine.
2. 10:06 — opens your newsletter in another tab and clicks through to
   `/pricing?utm_source=newsletter`.
3. 10:09 — buys.

The whole visit, including the purchase, is attributed to **Organic Search**. The
`utm_source=newsletter` on the second pageview is discarded.

This is what makes a report add up. If attribution changed mid-visit, that one visit would appear
under two sources, and every total on the page would be larger than the traffic that actually
happened. If you need the newsletter credited, it has to be the visit's first pageview — which in
practice means the visitor arriving after the previous visit timed out.

One refinement worth knowing: the freeze is by the event's own timestamp, not by the order events
reached us. An event that arrives late but happened earlier takes over the attribution, and every
already-stored row of that visit is corrected. A number that changes slightly minutes after the fact
is that, working.

### Goals don't backfill

A goal starts counting from the moment you create it. It isn't a retroactive query over what you
already collected — the historic events were never evaluated against a rule that didn't exist.

Worked example. You ran a campaign 1–14 March. On 20 March you create a goal for `/thanks`:

| Period | Pageviews of /thanks | Goal conversions |
|---|---|---|
| 1–14 March | 318 | 0 |
| 20–31 March | 44 | 44 |

The 318 pageviews are still in your data and still visible in Top Pages. They just aren't conversions
of a goal that didn't exist. Any report over a range that starts before the goal does says so, rather
than quietly showing you a smaller number.

Create the goal before the campaign, not after it.

## What isn't counted toward your bill

Pageviews and your own custom events count.

**Engagement measurements never do.** They're the script telling us how long a page you already paid
for was read for, and billing them would be charging you twice. Neither do pageview goals, for the
same reason: a pageview goal is a saved question about pageviews you already sent.

Outbound clicks, downloads and form submissions *are* custom events, and they do count. The full
allowance is on [pricing](/pricing/).

## Core Web Vitals

If you've enabled the optional tracker mode — see [script options](/docs/script-options/) — four more
measurements arrive as numeric properties on an event called **Web Vitals**: `lcp`, `cls`, `inp` and
`ttfb`.

They're properties rather than metrics of their own, so that the same aggregation, filtering and
breakdown that works on everything else works on them. `p75(event:props:lcp)` broken down by page is
the report you want, and it's one query.

Three things to know before you quote one. Each value is measured only where the browser provides the
Performance API it needs. Final values are reported when a navigation is hidden, with supported
client-side routes and back-forward cache restorations getting their own observations. And if you set
a sample rate, the numbers describe that sample — the count of Web Vitals events beside them is how
you see how many page loads are behind the figure.

## When a number is an estimate

A query over a very large range that can't be answered from the pre-aggregated summaries — a filtered
one, or a breakdown by a custom property — may be answered from deterministic event or session row
buckets instead of every fact row.

Additive totals supported by that row grain are expanded by the inverse sample rate. Rates, averages,
minima, maxima and percentiles are calculated directly within the selected fact rows: they aren't
multiplied by the inverse rate, but they're still estimates of the full population and can differ
materially under skew. Sparse and empty samples are disclosed, and no confidence interval is implied.
Queries that need every event belonging to a visitor or session are refused at a sampled rate and
have to run exact.

Most reports never reach the sampling threshold.

When it happens, it's never quiet. The response carries a `sampling` object naming the rate, the
event and session work, the primary and comparison work, the ceiling crossed, and which metrics were
expanded or calculated directly. Every metric in the response carries a `sampled` warning, and the
dashboard puts a "Sampled" badge on the figures.

Send `"exact": true` with the query — or use the badge's own link — to refuse sampling and wait for
the exact answer instead. A sampled number that looks exact is worse than a slow one, because
somebody will make a decision on it.
