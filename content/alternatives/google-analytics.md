---
title: "Google Analytics alternatives, compared"
seotitle: "Google Analytics alternatives: what you give up"
description: "Nine Google Analytics alternatives compared on price, limits and privacy - Plausible, Fathom, Matomo, Umami, GoatCounter and more. We make one of them."
lede: "Nine Google Analytics alternatives. What they cost, where they win, and what you give up."
kicker: "ROUNDUP"
weight: 10
wide: true
checked: 2026-09-03
faq:
  - q: "What's the best alternative to Google Analytics?"
    a: "It depends on what you're replacing. For depth and on-premise, Matomo. For a mature EU-hosted product, Plausible. For EU data isolation with a long track record, Fathom. For an MIT license, Umami. For a free personal site, GoatCounter. For unlimited sites and users on one price, Feasible - which we make."
  - q: "Is there a free Google Analytics alternative?"
    a: "Several. Cloudflare Web Analytics is free and cookieless but shallow. GoatCounter's hosted tier is free for reasonable public use. Umami, Matomo and Feasible are all free if you run them on your own server. What you pay instead is the server, the backups and the upgrades."
  - q: "Why are people leaving GA4?"
    a: "Mostly usability, not privacy. Core reports became Explorations you build yourself, the metric names changed, reports get thresholded and can be sampled, and event-level history is capped at 14 months. The privacy and consent-banner problems are real but they're the second complaint, not the first."
  - q: "Will my numbers match Google Analytics after I switch?"
    a: "No, and no two analytics tools ever match. Bot filtering differs, ad blockers hit each tool differently, the definition of a session differs, and GA4 thresholds and can sample its own reports. Expect a gap in the tens of percent and compare trends rather than absolute numbers."
  - q: "Can I keep my Google Analytics history?"
    a: "You can. Export your GA4 reports as CSV and upload the folder into Feasible - pages, sources, locations, devices and browsers land on the same charts as your live traffic. Universal Analytics data is a different story - Google cut off access to it from the week of July 1, 2024, so if you didn't export it then, it's gone."
  - q: "Do Google Analytics alternatives need a cookie banner?"
    a: "The cookieless ones generally don't, for analytics. Feasible, Plausible, Fathom, Simple Analytics, Umami, Pirsch, GoatCounter and Cloudflare all set no cookies. That isn't a legal guarantee and the rest of your site may still need a banner - check with your own lawyer."
---

{{< callout title="A word about us before the table" >}}
We make one of these. Feasible is in the list on the same terms as everyone else,
and we'll flag it again when we get there. Every competitor price below comes
from that vendor's own published pricing page, linked, and read on September 3,
2026.
{{< /callout >}}

Most people don't leave Google Analytics over privacy. They leave because they
opened it to answer a simple question and couldn't.

## Why people leave GA4

The specific complaints, because "it's bad" isn't an argument.

**The reports you want are now yours to build.** Everything in GA4 is an event,
and the analysis most people do lives in Explorations - a canvas you
assemble from dimensions and metrics. A real capability if that's your job. A
homework assignment if you publish a newsletter.

**Rows disappear without warning.** GA4 applies thresholds when counts are low and
demographic data is in play. Google, verbatim: "Data thresholds are system
defined. You can't adjust them"
([source](https://support.google.com/analytics/answer/9383630)). The remedy Google
offers is widening the date range. The same metric can read differently in two
places on the same screen.

**Sampling is possible in standard reports.** Google's own comparison of
reporting surfaces marks sampling "Possible" for Reports, Insights and
Explorations together. Only the BigQuery export is marked "No"
([source](https://support.google.com/analytics/answer/13331292)).

**History has a ceiling.** Event-level retention on a standard property is 2 or
14 months, and Google says a property that becomes "Large" is automatically
reduced to 2 months with older event-level data permanently deleted
([source](https://support.google.com/analytics/answer/7667196)).

**Google deleted the last one.** Standard Universal Analytics properties stopped
processing hits on July 1, 2023, and Google cut off access to current and
historical UA data from the week of July 1, 2024
([source](https://support.google.com/analytics/answer/11583528)). Anyone who
didn't export in time lost a decade of history. That's the single best reason to
care where your data lives.

**And the banner.** GA4 sets cookies and needs consent in the EU and UK. Everyone
who declines is missing from your numbers, and you don't get to see how many.

One thing we're not going to tell you: that Google Analytics is illegal in the
EU. The 2022 rulings in Austria, France, Italy, Denmark and the Nordics were
real, and they were about EU-to-US transfers after *Schrems II*. The ground under
them changed on July 10, 2023, when the European Commission adopted the EU-US Data
Privacy Framework, and Google is certified under it. Pages still running that
line are stale.

## The alternatives, side by side

Annual USD, on annual billing where offered. **The "counts" column decides the
bill** - read it before comparing two prices.

| Tool | 100k pv/mo | 1M pv/mo | Counts | Sites | Seats | Cookies | Source | Retention |
|---|---|---|---|---|---|---|---|---|
| **Feasible** | **$99** | **$99** | pageviews + events | unlimited | unlimited | none | AGPL-3.0 | 5 years |
| [Plausible Starter](https://plausible.io/#pricing) | $190 | $690 | pageviews + events | 1 | owner only | none | AGPL-3.0 (CE) | 3 years |
| [Plausible Business](https://plausible.io/#pricing) | $390 | $1,390 | pageviews + events | 10 | 10 | none | AGPL-3.0 (CE) | 5 years |
| [Fathom](https://usefathom.com/pricing) | $150 | $600 | pageviews + events | 75 | not published | none | closed | forever |
| [Simple Analytics](https://www.simpleanalytics.com/pricing) | $200 | $600 | datapoints, incl. each property | 10 | 1 (+$240/yr) | none | closed | 3 years |
| [Pirsch Standard](https://pirsch.io/pricing) | $120 | $540 | pageviews + events + 10% extensions | 50 | unlimited | none | closed | unlimited |
| [Umami Cloud Pro](https://umami.is/pricing) | $240 | $240 | events, incl. each property | 20 | 10 | none | MIT | 2 years |
| [Matomo Cloud](https://matomo.org/pricing/) | $420 | $2,040 | **hits** | 30 | 30 | configurable | GPL-3.0 | configurable |
| [GoatCounter](https://www.goatcounter.com/) | $0 | n/a | pageviews | - | - | none | EUPL-1.2 | - |
| [Cloudflare](https://www.cloudflare.com/web-analytics/) | $0 | $0 | pageviews | - | - | none | closed | not published |
| [Google Analytics 4](https://support.google.com/analytics/answer/11202874) | $0 | $0 | events | unlimited | unlimited | yes | closed | 14 months |

Matomo's unit is worth repeating: a hit "can be either a tracked page view, an
event tracking, a download, an outlink, an onsite search or a content tracking
request" - their FAQ. Sites with download and outbound-link tracking often need a
tier one or two steps above their pageview count.

## Each one, and where it beats us

### Matomo

The deepest tool in the list and the oldest - shipping since 2007. Segments,
custom dimensions, heatmaps, A/B testing, roll-up reporting, ecommerce, a very large documentation library, and a real on-premise install where the core is free under GPL-3.0. Cloud
hosts in Europe.

**Where it beats us:** feature depth, and the fact that a public-sector
procurement office has heard of it. If you need on-premise with an audit trail
and a support contract, this is the answer and we're not close.

**The cost:** $2,040 a year at a million hits on Cloud, a 46,303-byte gzipped
tracker, premium plugins under a proprietary EULA, and a sizing table that goes
from 2 GB of RAM at 100,000 hits to 8 GB at a million.

### Plausible

The product that made this category mainstream, and the most polished thing in
it. Hosted in Falkenstein, Germany, with the company in Estonia. Their tracker
measured 1,291 bytes gzipped - smaller than ours. Community Edition is
AGPL-3.0-or-later with unlimited sites and seats, and it includes the Stats API.

**Where it beats us:** maturity and EU hosting, plainly. Years of production, a
big customer base, and a straightforward answer for a European buyer who wants
data in Europe. We're a US company and can't match that.

If Plausible is what you're actually weighing, [seven alternatives to it,
compared](/alternatives/plausible/) goes deeper than this entry does.

**The cost:** the ladder. Custom properties, funnels, ecommerce revenue and the
Stats API on Cloud start at Business - $1,390 a year at a million pageviews.
Scheduled raw event export is Enterprise-only, so no self-serve plan gets your
own raw events out. Community Edition ships twice a year and excludes funnels,
ecommerce revenue goals, SSO and the Sites API.

### Fathom

Running since 2018, closed source, unusually good at the unglamorous parts. EU
isolation is free on every plan: EU visitors' pageviews route to EU servers where
the IP is stripped before anything reaches US infrastructure. Retention is
"forever". 75 sites at the million-pageview tier.

**Where it beats us:** track record and EU isolation. They've been doing this for
years, they've been audited by buyers with real requirements, and the EU routing
is a thoughtful piece of engineering that we don't have.

**The cost:** $600 a year at a million, no plan below 100,000 pageviews (so a
small blog pays $150), and the product is closed - "Fathom Lite" on GitHub is MIT
but has had no code change since January 2023.

### Umami

Free, MIT since 2020, self-hostable in two containers, and $20 a month on Cloud
Pro with no annual discount - which stays $20 all the way to a million events.

**Where it beats us:** the license. MIT is more permissive than our AGPL, full
stop. If you want to embed, fork or resell without the network-source obligation,
Umami lets you and we don't.

**The cost:** the unit counts each stored event property, so property-heavy sites
multiply fast. And their FAQ says Cloud has email reports and a streaming API the
self-hosted build doesn't.

### Pirsch

$540 a year at a million on Standard, unlimited seats, unlimited retention, 50
sites, German company.

**Where it beats us:** unlimited retention and a German vendor at a low price.

**The cost:** Standard has no funnels and no teams - those start on Plus at
$1,590 at a million. Product is closed; the Go tracking library is AGPL.

### Simple Analytics

Dutch, EU-hosted, one of the tidier dashboards in the category. $600 a year at a
million.

**Where it beats us:** EU hosting and a calm interface.

**The cost:** the datapoint unit counts pageviews, events **and** each stored
event property, and extra seats are $240 a year each.

### GoatCounter

A one-person project, EUPL-1.2, hosted free "for reasonable public usage" and
funded by donations. Philosophically the closest thing here to us.

**Where it beats us:** it's free, and its GDPR page is the most careful writing on
the subject in this whole category - including "I am not a lawyer." Ours is at
[GDPR-friendly analytics](/gdpr-compliant-analytics/), hedged for the same reason.

**The cost:** it's explicitly not for millions of pageviews a day, and the feature
set is small.

### Cloudflare Web Analytics

Free, [cookieless](/cookieless-analytics/), trivial to switch on if you're already
behind Cloudflare.

**Where it beats us:** the price, and zero setup.

**The cost:** shallow reporting, no real goals or custom events, no export, and no
way to take your history anywhere.

### Feasible - us

The flag we promised. $9.99 a month or $99 a year, one plan: unlimited sites,
unlimited team members, unlimited custom properties, and a million pageviews and
custom events a month between them, kept five years. Cookieless, AGPL-3.0-or-later, one Go
binary on SQLite that runs on 512 MB of RAM. The API, funnels, custom properties,
webhooks, the MCP server and raw event export are in every plan and every build - the API package has no plan check in it at all.

**Where we lose:** no EU hosting, no SSO or SAML, no mobile SDKs, no session
replay, no heatmaps, no A/B testing, no cohort or retention report. Our script is
3,377 bytes gzipped against Plausible's 1,291. And we launched in 2026, so we
have no track record - which is a real risk and you should price it in.

## Free Google Analytics alternatives

There are several, and they're free for different reasons. Cloudflare Web
Analytics is free and cookieless, and shallow. GoatCounter's hosted tier is free
for reasonable public use, funded by donations. Umami, Matomo and Feasible are all
free if you run them on your own server - which is a server, backups, upgrades and
a pager, so it's free the way a puppy is free.

GA4 itself is the other kind of free: your visitors' behavior goes to an
advertising company, and you pay in a consent banner.

## Which to pick, by situation

**A personal blog.** GoatCounter or Cloudflare, free. If you'd rather pay for
support and want goals, $99 a year buys you every feature we have.

**You spend real money on Google Ads.** Stay on GA4 for the ad integration, and
if the interface is the problem, run something readable alongside it. Nothing in
this list replaces the Google Ads connection.

**An EU company with an EU data requirement.** Plausible, Matomo Cloud, Simple
Analytics or Fathom's EU isolation. Not us, unless you self-host in the EU.

**A freelancer or agency with a lot of client sites.** This is where per-site
pricing bites hardest. Fathom includes 75 sites; Pirsch 50 with unlimited seats;
Feasible unlimited on both. Count your sites before you read the headline price.

**A SaaS that needs funnels and custom properties.** Check which plan they're on.
Funnels and custom properties are Business-tier on Plausible ($1,390 at a
million), Plus on Pirsch ($1,590), and included at $99 here.

**A public-sector or heavily regulated buyer.** Matomo. Depth, on-premise, EU
hosting and two decades of institutional presence.

**You want MIT.** Umami.

## Moving off GA4

The blocker people name most often isn't price - it's "I'd lose all my history."

You wouldn't, mostly. Export your GA4 reports as CSV and upload the folder, and
pages, sources, locations, devices and browsers land on the same charts as your
live traffic. A direct Google connection is on the way; today it's an upload.
Universal Analytics history is a different matter: Google cut off access from the
week of July 1, 2024, so if you didn't export then, it's gone.

The whole process - install alongside GA, run both for two weeks, upload the CSVs,
verify, then remove the old tag - is written out step by step in
[moving off Google Analytics](/migrate/from-google-analytics/).

---

Prices move. If something here is out of date,
[tell us](mailto:help@feasible.lol) and we'll fix it. Also worth reading:
[the wider tool roundup](/web-analytics-tools/), our
[head-to-head with Google Analytics](/compare/google-analytics/),
[Plausible alternatives](/alternatives/plausible/), and
[what Feasible costs](/pricing/).
