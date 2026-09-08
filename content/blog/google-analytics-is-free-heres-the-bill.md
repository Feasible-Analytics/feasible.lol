---
title: "Google Analytics is free. Here's the bill"
slug: "google-analytics-is-free-heres-the-bill"
description: "GA4 costs $0. It also costs a consent banner, a 148 KB script, thresholded rows you can't unhide, and the history Google deleted in 2024."
lede: "Nothing on the invoice, plenty on the bill. Here's each line item, with Google's own documentation next to it."
date: 2026-08-25
checked: 2026-09-03
---

Google Analytics 4 costs nothing. That part is true, and it's why roughly everyone uses it.

The bill arrives somewhere other than the invoice. Here are the line items we can source.

## The consent banner

GA4 sets cookies. Cookies are storage on the visitor's device, which puts the tag squarely inside Article 5(3) of the ePrivacy Directive, and in the EU and UK that means a consent request before the tag runs.

Every visitor who declines is a visitor missing from your numbers.

How many? We're not going to give you a percentage, because the confident ones circulating don't have a study behind them. The same goes for ad blocking: it varies enormously by audience - a mainstream consumer site might lose under 10%, a developer-heavy audience can lose more than half - and anybody quoting you a single number measured it on their traffic, not yours.

What's certain is the direction. Your GA4 total is smaller than your real total, by an amount nobody can tell you.

There's a second-order cost too. Since early March 2024, EEA advertisers have had to implement Consent Mode v2 to keep measurement working, and Google is explicit about the reach of that: "The requirements also apply if you are using Google Analytics data in Google Ads, Search Ads 360, or Display & Video 360" ([support.google.com/google-ads/answer/13695607](https://support.google.com/google-ads/answer/13695607), checked September 3, 2026). Not implementing it "may lead to loss in data" - their phrasing.

## Missing rows

This is the one that costs you trust with whoever you report to.

GA4 applies **data thresholding**: when a report includes demographic data, or search query information, or just a narrow date range with low counts, it removes rows rather than showing them. Google's own page is blunt about your options - "Data thresholds are system defined. You can't adjust them" ([support.google.com/analytics/answer/9383630](https://support.google.com/analytics/answer/9383630), checked September 3, 2026). The remedy Google offers is to widen your date range.

Whole rows. Not noised, not estimated. Gone, with a small icon.

Then **sampling**. The event-level query quota is "10 million events for standard Google Analytics properties and up to 1 billion events for Google Analytics 360 properties" ([support.google.com/analytics/answer/13331292](https://support.google.com/analytics/answer/13331292), checked September 3, 2026). You'll read in a lot of places that standard reports are never sampled. Google's own comparison of reporting surfaces groups Reports, Insights and Explorations together and marks sampling as **possible** for all three. Only the BigQuery export is marked as never sampled.

And **cardinality**. A dimension with more than 500 unique values in a day is high-cardinality, and GA4 has a cardinality limit of 50,000 values ([support.google.com/analytics/answer/12226705](https://support.google.com/analytics/answer/12226705), checked September 3, 2026). Past that, values collapse into a row called `(other)`. If you have a lot of URLs, some of your URLs are now `(other)`.

Three separate mechanisms, all on by default, none of which you can switch off, and the escape hatch for all three is an export into a data warehouse.

## Fourteen months

You can set GA4's retention for user-level data to 2 months or 14 months. That's the whole list ([support.google.com/analytics/answer/7667196](https://support.google.com/analytics/answer/7667196), checked September 3, 2026). 26, 38 and 50 months exist only on 360.

Get the scope right, because a lot of posts don't: the setting "does not affect standard aggregated reports." Your headline pageview chart survives. What hits the wall at 14 months is Explorations and funnel reports - the analysis you'd sit down to do. And Google notes that when a standard property becomes Large, the event-level retention setting is "automatically reduced to 2 months" and older data is "permanently deleted."

For comparison, since we're a vendor and you should hear it from us plainly: Feasible keeps five years on the $99 plan, and Plausible's Business plan keeps five ([plausible.io](https://plausible.io/#pricing), checked September 3, 2026).

## The history that's already gone

This is Google's sentence, not ours.

From the Universal Analytics sunset page, last updated July 16, 2025: "Starting the week of July 1, 2024: You will not have access to any current or historical Universal Analytics data." The same page says the data would be "permanently deleted by Google and won't be recoverable" ([support.google.com/analytics/answer/11583528](https://support.google.com/analytics/answer/11583528), checked September 3, 2026).

Standard UA properties had already stopped processing hits on July 1, 2023. Nothing migrated into GA4 - not goals, not configuration, not history. Anyone who didn't export in that window lost a decade of numbers. [Migrating off Google Analytics](/migrate/from-google-analytics/) to anything has the same shape: export first, switch second.

You can't price that line. You can only notice that it happened, and ask what your current tool would do to you.

## A 148 KB script

Measured on September 8, 2026, with `curl -H 'Accept-Encoding: identity' <url> | gzip -9 | wc -c`:

| Script | Raw | gzip -9 |
|---|---|---|
| Google `gtag.js` | 427,812 B | 148,590 B |
| Feasible | 7,490 B | 3,569 B |

Over the wire on the day we measured, `gtag.js` came in at 147,171 bytes against our roughly 3.5 KB. About 42 times. And `gtag.js` is only the first request - it pulls more payloads once it loads, so the real figure is worse than the table.

Reproduce it yourself. Scripts change; that's why we date ours.

While we're being straight about measurements: our script isn't the smallest in the category. Plausible's is 1,285 bytes gzipped, comfortably under half of ours. The 42× is against Google, and that's the only script comparison we'll make.

## Your visitors' behavior funds advertising

Google's revenue is advertising. GA4 data flows into Google Ads, Search Ads 360 and Display & Video 360 - that's not an accusation, it's the reason the Consent Mode v2 requirement above is written the way it is.

Now the part where we correct a claim that would help us.

**Google Analytics isn't illegal in the EU.** Between 2021 and 2023, data protection authorities in Austria, France, Italy, Denmark, Finland, Norway and Sweden all found against GA in specific cases - most with reprimands and no fine, though Sweden's IMY fined Tele2 SEK 12 million in June 2023, upheld on appeal in October 2025 ([imy.se](https://www.imy.se/en/news/four-companies-must-stop-using-google-analytics/), checked September 3, 2026). Every one of those decisions turned on EU-to-US transfers after *Schrems II*.

That ground moved on July 10, 2023, when the European Commission adopted the EU-US Data Privacy Framework adequacy decision. Google is certified under it, which removes the transfer basis every one of those decisions rested on. The General Court dismissed a challenge to the framework in September 2025, and an appeal is pending at the CJEU as Case C-703/25 P with no ruling yet.

So the version: those rulings happened, they're worth knowing about, and they aren't a live prohibition today. Anyone still telling you GA4 is banned in Europe is running a page they haven't updated since 2023.

The durable objection isn't legal. It's that the analysis you can do is capped, the rows you can see are edited, the history has a shelf life, and the counterparty's business is advertising.

## The time cost

The last line item is the one nobody puts on a slide. From r/GoogleAnalytics, March 12, 2026:

> "Google Analytics 4 boggles my mind. It's overly complicated and some of the most useful data points are harder to find or missing altogether."
> - u/NowExciting, [thread](https://www.reddit.com/r/GoogleAnalytics/comments/1rs072x/i_had_no_idea_analytics_had_gotten_so_bad/)

You can find a thousand of those. What they have in common isn't privacy - it's that a small business owner wanting to know how many people read a page has to know which of several similar-looking metrics answers that question, and where the report lives.

That's what [a one-page dashboard](/features/dashboard/) is for, and why we built ours the way we did.

## What $99 buys instead

No banner for most sites. No thresholding, ever - if a row exists we show it. Five years of retention. A 3,569-byte script. Raw event export as a button, not a plan tier. Unlimited sites and unlimited teammates. A [health panel](/features/) that names every dropped event and why, because failing silently is the actual sin here.

And a company whose revenue is your subscription, which is a shorter sentence than any privacy policy.

If you're weighing it up, [the head-to-head is here](/compare/google-analytics/) and [the price is here](/pricing/). If you're staying on GA4 - plenty of people should, and the BigQuery export is good - export your data on a schedule anyway. July 2024 is the argument for that, and Google made it.
