---
title: "Moving off Google Analytics"
seotitle: "Google Analytics 4 migration - move to Feasible"
description: "Move from GA4 to Feasible: add the tracker, import a historical date range from your Google property, check your data, then remove the old tag."
lede: "Seven steps, with two weeks of side-by-side data before you remove the old tag. Including what imports and why the numbers differ."
kicker: "MIGRATING"
weight: 10
faq:
  - q: "How long does the migration take?"
    a: "Allow time to connect your property and check the imported reports, plus two weeks running both trackers. Installing the script is one line. The waiting is deliberate - you run both tools side by side long enough to trust the new numbers before you remove the old tag."
  - q: "Can I import my Google Analytics history?"
    a: "Yes. Connect your GA4 property in Site settings → Imports and select historical dates before Feasible started collecting traffic. A raw GA4 CSV download may need conversion before the separate CSV importer can read it. Universal Analytics history is a different matter: Google cut off access to it from the week of July 1, 2024."
  - q: "What data comes across from GA4?"
    a: "Daily totals and breakdowns for pages, sources, locations, devices, browsers, operating systems and landing pages. What doesn't come across: GA4's own goals and conversions, audiences, Explorations, and any report data Google withholds."
  - q: "Why don't the numbers match Google Analytics?"
    a: "Four reasons, all structural: the two tools filter bots differently, ad blockers hit them differently, they define a session differently, and GA4 thresholds and can sample its own reports. Expect a gap in the tens of percent and compare trends, not absolute numbers."
  - q: "Can I remove my cookie banner after switching?"
    a: "If Google Analytics was the only thing on your site needing consent, most sites can. Feasible sets no cookies, so there's nothing to consent to. Check what else your site loads first - embedded video, chat widgets, ad pixels and fonts often need one on their own. Not legal advice."
  - q: "Should I keep Google Analytics running as well?"
    a: "You can. The two scripts don't conflict, and some people keep GA4 purely for the Google Ads integration while doing their day-to-day reading elsewhere. If you keep GA4, you keep its consent banner."
---

A Google Analytics 4 migration is seven steps here. Run both tools side by side
for two weeks, and check the imported history before you remove the old tag.

Before you start, the one thing worth knowing: **GA4 history can come across from a
connected property. Universal Analytics history probably can't.** Google cut off access to current
and historical Universal Analytics data from the week of July 1, 2024
([Google's own page](https://support.google.com/analytics/answer/11583528)). If
you didn't export it then, it isn't there to import. Nobody can get it back for
you, and any vendor who says they can is wrong.

## 1. Create the account

[Sign up](https://app.feasible.lol/register). Email and a password, or Google
sign-in. Thirty days free, no credit card, and the trial has every feature in it
rather than a reduced set.

## 2. Add the site

Enter the domain - `example.com`, no `https://`, no trailing slash. Subdomains
share visitors with the registrable domain by design, so `app.example.com` and
`example.com` belong to the same site.

You'll land on an onboarding screen that shows the snippet and waits for the
first event.

## 3. Install the script next to Google Analytics

One snippet in your `<head>`. Leave the GA4 tag where it is.

{{< snippet >}}

3,569 bytes gzipped. There's no second script file to choose between and no
plugin variants - outbound link clicks, file downloads, form submissions, scroll
depth, time on page and single-page-app route changes are all counted with no
extra configuration.

If you use a tag manager, you can add it there, though a tag in the template is
one fewer thing between you and your data. If your site is behind a CSP, allow
`app.feasible.lol` in both `script-src` and `connect-src`.

{{< callout title="Run both for a fortnight" >}}
This is the step people skip, and it's the one that saves the argument later.
Two weeks of parallel data lets you see the shape of the difference between the
two tools on **your** traffic, rather than guessing at it after you've already
turned one off.
{{< /callout >}}

## 4. Check it's working

Go to the site's health panel. It's a 24-hour view of what arrived and what
didn't.

Every dropped event is counted with a named reason - bot, datacenter IP, referrer
spam, outdated browser, automation, hostname not allowed, rate limited, and so on
- so "why is my traffic low" has an answer instead of a shrug.

The panel also shows which client address was resolved for the last request and
which header it came from, and warns you if your proxy isn't forwarding visitor addresses, which
is the failure that collapses every visitor into one and geolocates your whole
audience to a data center.

There's a **send a test event** button. It posts to the real public endpoint over
the real network, not to an internal function, so it exercises your proxy and
headers as a browser would.

{{< shot src="app/health.png" alt="The ingestion health panel showing accepted and dropped events with reasons" caption="Never fail silently. Every dropped event gets a reason." >}}

## 5. Import your GA4 history {#5-bring-your-ga4-history-across-as-csv}

In Feasible, open **Site settings → Imports → Google Analytics**. Connect the
Google account with access to the property, choose that property, then select a
historical date range and press **Import Analytics history**.

The last day must be before today and before Feasible started collecting traffic
for this site. Dates must not overlap earlier traffic imports. This keeps the
same period from being counted twice. Follow the job's progress on Imports.

The imported daily totals and breakdowns appear beside your new traffic. They
aren't raw events. Visitor totals across several days are summed daily counts,
not a deduplicated count of people across the whole period.

**A GA4 CSV download isn't a ready-made Feasible import.** The separate CSV
uploader requires [supported column names, a date column and daily totals](/help/can-i-import-a-csv/).
Rates and averages need proper conversion, not a new header. Use the direct
connection when available. For a prepared CSV, test a small range first.

Check several dates and reports before calling the migration finished. The
[GA4 import guide](/help/can-i-import-my-google-analytics-history/) covers the
steps and limits.

**What doesn't come across**, so nothing is a surprise later:

- **GA4 goals and conversions.** Recreate them here. Ours are page patterns,
  custom events or scroll depth, and four are created automatically with every
  site: 404, outbound link click, file download and form submission.
- **Audiences, Explorations and saved reports.** They don't have an equivalent.
- **Anything GA4 thresholded away.** If Google hid a row from you, it isn't in
  imported reports either.

Imported history is stored as roll-up rows that also record **which dimensions
the source reported**. So a filter on a dimension the imported data has
narrows it like live traffic, and a filter on a dimension it lacks shows
up as a labeled gap rather than silently reading zero. That's the sort of thing
you only appreciate the first time a chart lies to you.

## 6. Set up the things that don't import

Twenty minutes, once.

- **Goals.** Page pattern, custom event or scroll depth. Note that goals don't
  backfill - conversions count from the moment you create the goal, so make them
  early.
- **Funnels**, if you use them. Two to eight steps, with detours between them allowed or not.
- **Exclude your own traffic.** Shields take an IP or CIDR, a country, a page
  pattern, or a hostname allow-list. Rules take effect within 15 seconds. Or set
  the self-exclusion flag in your own browser.
- **Path cleaning**, if your URLs carry IDs. A regex rule merges
  `/users/<uuid>` into `/users/:id`, with a preview before you save.
- **Email reports and alerts.** Weekly or monthly, sent at your site's own local
  midnight. Alerts for traffic spikes and drops, checked every 10 minutes.

## 7. Remove the Google Analytics tag - and maybe the banner

Once the two weeks are up and you trust what you're seeing, delete the GA4 tag.
That's it; nothing else needs undoing.

**The consent banner is a separate question.** If GA4 was the only thing on your
site that needed consent, most sites can drop the banner: Feasible sets no
cookies and stores no identifier, so there's nothing to consent to. Check what
else you load first - embedded video, chat widgets, ad pixels, hosted fonts and
A/B testing tools all commonly need one on their own.

We're not lawyers and this isn't legal advice. The reasoning is on the
[GDPR-friendly analytics page](/gdpr-compliant-analytics/), including the two
conditions attached to the UK's statutory analytics exemption.

## Your numbers won't match. Here's why

They never do, between any two analytics tools, and anyone promising otherwise is
selling something. Four structural reasons:

**Bot filtering is different.** We classify bots five ways in order - user agent
against about 70 tokens, browser-side automation signals, a datacenter IP check
across 11,842 merged CIDR ranges, an outdated-browser test, and referrer spam - and we count what we dropped and tell you why. GA4 filters differently and shows
you far less about what it removed. Filter harder and your numbers go down. That
isn't losing traffic; it's counting fewer robots.

**Ad blockers hit each tool differently.** Some blocklists carry Google's
endpoints and not ours; some carry both. Blocking rates vary enormously by
audience - under 10% on a mainstream consumer site, much higher on a
developer audience. Whichever way it falls, it moves one tool and not the other.

**A "session" isn't the same thing.** Ours stays open for 30 minutes of
inactivity and is tied to the daily visitor hash, which resets at midnight UTC.
GA4's session logic has its own rules, its own timeout, and its own campaign
re-attribution behavior. Two definitions, two answers.

**GA4 thresholds and can sample.** Rows vanish when counts are low and demographic
data is on, and "Data thresholds are system defined. You can't adjust them"
([source](https://support.google.com/analytics/answer/9383630)). Sampling is
marked "Possible" for Reports, Insights and Explorations in Google's own table;
only the BigQuery export is marked "No"
([source](https://support.google.com/analytics/answer/13331292)).

**What to do about it.** Compare the shape, not the number. If both tools show
the same weekly pattern, the same top five pages and the same top sources, the
migration worked. Pick one tool as the number you report and stop reconciling - reconciling two definitions of a session is a job with no end.

One more, less structural: **we count differently on purpose.** Unique visitors
here are a daily figure, because the key that makes the visitor hash changes every
UTC day. Someone who reads you Monday and Thursday is two visitors. Over a
28-day window, our "unique visitors" will run higher than a cookie-based tool's,
and that's the design, not a bug.

## If you'd rather not switch yet

Nothing stops you running both indefinitely. The scripts don't conflict, and
plenty of people keep GA4 purely for the Google Ads integration while doing their
day-to-day reading somewhere calmer. Just remember that keeping GA4 means keeping
its consent banner.

---

Two weeks of running both is the whole cost of finding out. If you'd rather read
first: the [comparison with Google Analytics](/compare/google-analytics/),
[the wider list of alternatives](/alternatives/google-analytics/), and
[the wider web analytics tools comparison](/web-analytics-tools/) if you haven't
settled on where you're going yet.
