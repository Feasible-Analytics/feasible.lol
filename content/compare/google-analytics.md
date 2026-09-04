---
title: "Feasible vs Google Analytics"
seotitle: "Feasible vs Google Analytics 4 — Side by Side"
description: "Google Analytics is free, 148 KB of script, and needs a consent banner. Feasible is $99 a year, 3,377 bytes, and no banner for most sites."
lede: "Google Analytics costs nothing and takes everything. Here's the trade, itemized, with Google's own documentation as the source."
versus: "Google Analytics 4"
checked: 2026-09-03
weight: 10
verdict: |
  If you spend money on Google Ads, or you need BigQuery to join web data to
  everything else you own, stay on GA4. Nothing here replaces that, and it's
  free. If you mostly want to know which pages people read, where they came
  from and whether they did the thing you wanted, GA4 makes you work absurdly
  hard for it — and Feasible answers all three on one page for $99 a year.
---

Google Analytics 4 is free. That part is true and it's the only reason most
people are still on it.

Here's what the free costs, item by item. Every number below comes from
Google's own documentation or from a file you can download yourself, and every
one is dated.

## The script

We measured both on September 3, 2026, with `gzip -9`:

| | Raw bytes | Gzipped |
|---|---:|---:|
| Feasible — `app.feasible.lol/js/script.js` | 7,099 | **3,377** |
| Google Analytics 4 — `gtag.js` | 427,563 | **148,451** |

That's about 43 times bigger. Reproduce it yourself:

```
curl -H 'Accept-Encoding: identity' <url> | gzip -9 | wc -c
```

And `gtag.js` is only the first request. It fetches more after it loads, so the
real page cost is higher than the number above. On a phone on a bad connection,
that is the difference between a page that renders and a page that waits.

## The consent banner

GA4 sets cookies and reads them back. In the EU and UK that's the thing consent
rules are about, which is why almost every European site running GA4 has a
banner in front of it. Since 2024, Consent Mode v2 has been required for EEA
advertisers using Google tags —
[Google's own page](https://support.google.com/google-ads/answer/13695607) says
that without it "Google won't be able to verify user consent choices and this
may lead to loss in data."

Feasible sets no cookie on your visitors, ever. It doesn't fingerprint them
either — the identifier is a SipHash of user agent, address and domain, keyed to
a salt that changes every UTC day and is then unrecoverable. Nothing is stored
that can be turned back into a person.

**Most sites won't need a consent banner for Feasible.** That's a design
consequence, not a legal opinion, and the rules vary by country — the details
and the caveats are on
[do I need a cookie banner](/help/do-i-need-a-cookie-banner/). We're not going
to tell you you're compliant. Ask your own lawyer if you're somewhere strict.

## Your history, on a 14-month clock

Google's [data retention page](https://support.google.com/analytics/answer/7667196)
gives standard properties two options for event-level data: **2 months or 14
months.** The 26-, 38- and 50-month options are marked "360 only."

Read the scope carefully, because Google is precise about it: "The data
retention setting does not affect standard aggregated reports... The data
retention setting only affects explorations and funnel reports." So your basic
traffic charts survive. Explorations and funnels — the analysis you'd actually
sit down to do — hit the wall.

Feasible keeps five years on the $99 plan, and you can export the raw events to
CSV whenever you want.

## The numbers don't always agree with each other

GA4 withholds rows when the underlying counts are small. Google calls it data
thresholding and states the position flatly:

> "Data thresholds are system defined. You can't adjust them."

The remedy Google offers is to widen your date range. That's it.

What that looks like in practice: a user on r/GoogleAnalytics found the same
event over the same twelve months reading
[1,519 in one report and 779 in another](https://www.reddit.com/r/GoogleAnalytics/comments/192rqel/how_can_ga4_be_this_terrible/),
with a third widget showing 1,519 again — "despite the widgets providing the
exact same information."

Sampling is the other half. Google's
[sampling documentation](https://support.google.com/analytics/answer/13331292)
puts the event-level query quota at "10 million events for standard Google
Analytics properties and up to 1 billion events for Google Analytics 360
properties." And the common belief that standard reports are never sampled
isn't what Google's own reporting-surfaces table says — it lists sampling as
possible for Reports, Insights and Explorations alike. Only the BigQuery export
is marked as never sampled.

Feasible's approach is the opposite of quiet. The health screen counts every
event we dropped and gives each one a named reason — bot, datacenter address, a
shield you set, a hostname you haven't allowed yet — plus a warning if your
proxy isn't forwarding visitor addresses, and a button that sends a real test
event through the public URL. Analytics that silently loses part of your traffic
is worse than analytics that tells you.

## Google deleted people's history, and said so

Universal Analytics stopped processing hits on July 1, 2023. A year later,
[Google's sunset page](https://support.google.com/analytics/answer/11583528)
says this about the week of July 1, 2024:

> "You will not have access to any current or historical Universal Analytics
> data and most users will lose access to the interface and the API on this
> date."

And on the same page, about exporting first: "your data will be permanently
deleted by Google and won't be recoverable."

Anyone who didn't export in time lost years of history. That's not a
hypothetical about vendor risk — it already happened, to a lot of people, at the
largest analytics vendor there is.

## The European rulings, accurately

You'll see a lot of pages claiming Google Analytics is illegal in Europe. It
isn't, and that matters more than the cheap line.

What actually happened: between 2021 and 2023, a run of data protection
authorities ruled that sending EU visitor data to Google in the US breached
Chapter V of the GDPR. Austria's DSB decided first, on December 22, 2021
([decision](https://noyb.eu/en/austrian-dsb-eu-us-data-transfers-google-analytics-illegal)).
France's CNIL issued formal notices from February 10, 2022
([redacted decision](https://www.edpb.europa.eu/system/files/2022-08/fr_2022-03_decisionpublic_redacted.pdf)).
Italy's Garante warned Caffeina Media on June 9, 2022
([doc-web 9782890](https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/9782890)).
Sweden's IMY went further and
[fined Tele2 SEK 12 million](https://www.imy.se/en/news/four-companies-must-stop-using-google-analytics/)
in June 2023, a fine the appeal court upheld in October 2025.

Then the ground moved. On July 10, 2023 the European Commission adopted the
EU-US Data Privacy Framework adequacy decision. Google LLC is certified under
it, which removes the specific transfer ground every one of those decisions
rested on. The General Court dismissed a challenge to the framework in September
2025; an appeal is pending at the Court of Justice and undecided.

So: the rulings happened, they're worth knowing about, and they are not a live
prohibition today. What's also true is that the framework's two predecessors
were both struck down, and a tool that doesn't send data to an advertising
company has no exposure to any of it either way.

## Side by side

| | Feasible | Google Analytics 4 |
|---|---|---|
| Price | $9.99/mo, $99/yr | Free |
| Tracking script (gzipped) | 3,377 bytes | 148,451 bytes |
| Cookies on your visitors | None | Yes |
| Consent banner | Not needed for most sites | Yes, in the EU/UK |
| Event-level retention | 5 years | 2 or 14 months (standard properties) |
| Report thresholding | None | System defined, can't be turned off |
| Sampling | Disclosed and labelled when it happens | Possible in Reports and Explorations |
| Raw data export | ZIP of raw events, any plan | BigQuery export |
| Dropped events | Counted, with a named reason | Not surfaced |
| Data goes to | Us, and nobody else | Google |
| Google Ads / DV360 integration | No | Yes |
| Search Console keyword report | No | Yes |
| Audience building for remarketing | No | Yes |
| Session replay, heatmaps, A/B testing | No | No |
| Cohort / retention analysis | No | Yes |
| Mobile app SDKs | No | Yes |
| SSO | No | Yes |

## Where Google Analytics is genuinely better

It's free, and free is a real feature.

It's wired into Google's ad stack. If you buy Google Ads, GA4 conversions feed
back into bidding, Search Ads 360 and Display & Video 360 in a way nothing else
can replicate. If you spend meaningful money on Google traffic, GA4 is part of
your ad tooling, not just your reporting.

BigQuery export gives you every raw event, unsampled, for free, and lets you
join web behaviour to your own warehouse. That is more than we offer.

It has cohort and retention analysis, mobile SDKs, audience building and
cross-device modelling. We have none of those, and no plans we're announcing.
Search Console is properly integrated in GA4 with a real keyword report; we
import Search Console data but nothing reads it back yet, so we don't have that
report at all.

And every agency and consultant already knows it. Hiring for GA4 skill is easy.
Hiring for ours is a five-minute conversation, but there's no ecosystem behind
it.

## What we're actually claiming

We're not claiming GA4 is missing data because of ad blockers. Blocking rates
vary enormously — under 10% on a mainstream consumer audience, far higher on a
developer one — and the widely quoted 58% figure came from one vendor's study on
a single page that trended on Hacker News. We're not going to build an argument
on it, and neither should you.

The claim is narrower and easier to check. GA4 asks you to load 148 KB, show a
banner, accept a 14-month wall on the analysis you care about, live with rows
you can't see and can't unhide, and send your visitors' behaviour to a company
whose business is advertising. Feasible asks for 3,377 bytes and $99 a year.

If you're moving, we import GA4 over OAuth so your history comes with you — see
[moving off Google Analytics](/migrate/from-google-analytics/). The
[feature list](/features/) is the honest inventory of what you'd get, including
what's missing.
