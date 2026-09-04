---
title: "Web analytics tools, compared"
seotitle: "Web analytics tools compared on price and limits"
description: "Ten web analytics tools compared on price at 100k and 1M pageviews, site and seat limits, cookies and license. We make one of them, and we say so."
lede: "What each one costs at real traffic, what it counts, and which situation each is genuinely the right answer for."
kicker: "ROUNDUP"
weight: 60
wide: true
checked: 2026-09-03
faq:
  - q: "What is a web analytics tool?"
    a: "Software that measures who visits a website and what they do there — pageviews, visitors, where they came from, which pages they read, and whether they did the thing you wanted. Most work by loading a small script on each page; a few read server logs instead."
  - q: "What are the best free web analytics tools?"
    a: "Google Analytics 4 is the most capable free option and the one with real ad-platform integration. Cloudflare Web Analytics is free and cookieless but shallow. GoatCounter's hosted service is free for reasonable public use. Umami and Matomo are free if you run them on your own server. Free always costs something — usually a consent banner, a cap, or your visitors' data."
  - q: "How much do web analytics tools cost?"
    a: "At a million pageviews a month, on published annual pricing checked September 3, 2026: Feasible $99, Pirsch Standard $540, Fathom $600, Simple Analytics $600, Plausible Starter $690, Plausible Business $1,390, Matomo Cloud $2,040. Umami Cloud Pro is $20 a month with no annual discount."
  - q: "Which web analytics tools don't need a cookie banner?"
    a: "Feasible, Plausible, Fathom, Simple Analytics, Umami, Pirsch, GoatCounter and Cloudflare all avoid cookies, so most sites running them won't need a banner for analytics. It isn't a legal guarantee and the rules vary by country — check with your own lawyer if you're somewhere strict."
  - q: "Why do vendors count different things?"
    a: "Because the billing unit decides the bill. Some count pageviews, some count 'hits' that include downloads and outbound clicks, some count each stored event property as a separate billable item. The same site can land two tiers apart depending on which one you picked."
---

{{< callout title="A word about us before the table" >}}
We make one of these. Feasible is in the list on the same terms as everyone else,
and we'll flag it again when we get there. Every price below comes from the
vendor's own published pricing page, linked, and read on September 3, 2026.
{{< /callout >}}

A web analytics tool measures who visits a website and what they do there:
pageviews, visitors, where they came from, which pages they read, and whether
they did the thing you wanted. Most do it with a small script on each page. A few
read server logs instead.

The category splits three ways, and picking the wrong lane is the expensive
mistake:

- **Traffic analytics** — how many people, from where, reading what. Almost
  everything below.
- **Product analytics** — event-level behavior inside a logged-in app, by user.
  PostHog, Amplitude, Mixpanel.
- **Behavior tools** — session recordings and heatmaps. Microsoft Clarity,
  Hotjar. Different job, and they need consent because they record people.

This page is about the first one.

## What each costs, and what it counts

Annual pricing in USD, on annual billing where the vendor offers it. **The unit
column matters more than the price column** — read it before comparing any two
numbers.

| Tool | 100k pv/mo | 1M pv/mo | Counts | Sites | Seats | Retention | Source |
|---|---|---|---|---|---|---|---|
| **Feasible** | **$99** | **$99** | pageviews + custom events; properties free | unlimited | unlimited | 5 years | [pricing](/pricing/) |
| Plausible Starter | $190 | $690 | pageviews + custom events | 1 | owner only | 3 years | [plausible.io](https://plausible.io/#pricing) |
| Plausible Business | $390 | $1,390 | pageviews + custom events | 10 | 10 | 5 years | [plausible.io](https://plausible.io/#pricing) |
| Fathom | $150 | $600 | pageviews + custom events | 75 | not published | "forever" | [usefathom.com](https://usefathom.com/pricing) |
| Simple Analytics | $200 | $600 | datapoints — pageviews, events **and each stored property** | 10 | 1 (+$240/yr each) | 3 years | [simpleanalytics.com](https://www.simpleanalytics.com/pricing) |
| Pirsch Standard | $120 | $540 | pageviews + events + 10% of session extensions | 50 | unlimited | unlimited | [pirsch.io](https://pirsch.io/pricing) |
| Umami Cloud Pro | $240 | $240 | events — **each stored property counts** | 20 | 10 | 2 years | [umami.is](https://umami.is/pricing) |
| Matomo Cloud | $420 | $2,040 | **hits** — views, events, downloads, outbound clicks, site searches | 30 | 30 | configurable | [matomo.org](https://matomo.org/pricing/) |
| Google Analytics 4 | $0 | $0 | events | unlimited | unlimited | 2 or 14 months (event-level) | [Google](https://support.google.com/analytics/answer/11202874) |
| Cloudflare Web Analytics | $0 | $0 | pageviews | — | — | not published | [cloudflare.com](https://www.cloudflare.com/web-analytics/) |

Three traps in that table, all of them the vendor's own published definition:

**Matomo bills hits, not pageviews.** Their own FAQ: a hit "can be either a
tracked page view, an event tracking, a download, an outlink, an onsite search or
a content tracking request." Turn on download and outbound-link tracking and one
pageview can produce two or three hits. A "million pageview" site routinely needs
the 2M or 5M tier.

**Simple Analytics and Umami bill stored properties.** One pageview carrying five
properties can bill as six units. If you use custom properties seriously, model
your real volume before you pick a tier.

**Plausible's cheap plan is one site and no teammates.** The $690 figure everyone
quotes for a million pageviews is the Starter plan: one site, owner only, no
custom properties, no funnels. The plan with those is Business, at $1,390.

## The tools, one at a time

### Google Analytics 4 — free, and the only one with Google Ads in it

Still the default, and for one situation still the right answer: if you're
running meaningful spend inside Google Ads, the integration between GA4 and the
ad platform is real and nothing here replaces it. It's also free at any volume,
with BigQuery export available for people who want the raw rows.

The costs are elsewhere. It sets cookies and needs a consent banner in the EU and
UK. Event-level retention is 2 or 14 months, and Google says a property
reclassified as "Large" drops automatically to 2 months with older event-level
data permanently deleted. Reports get thresholded — "Data thresholds are system
defined. You can't adjust them" — and Google's own table marks sampling
"Possible" for Reports, Insights and Explorations, with only the BigQuery export
marked "No". And its `gtag.js` measured 148,451 bytes gzipped on September 3, 2026.

**Best for:** paid-media teams living inside Google's stack.

### Matomo — the deepest feature set, and the on-premise answer

If you want the full analyst toolkit — segments, custom dimensions, heatmaps,
A/B testing, roll-up reporting, ecommerce — Matomo has more of it than anyone
else here, and it has been shipping since 2007. It's GPL-3.0, hosts Cloud in
Europe, and On-Premise is genuinely free for the core.

The cost is weight and billing unit. Cloud at a million hits is $2,040 a year,
its tracker measured 46,303 bytes gzipped, and its own sizing table asks for 2 GB
of RAM at 100,000 hits rising to 8 GB at a million. The premium plugins — funnels
among them — are proprietary under InnoCraft's EULA.

**Best for:** organizations that need depth, EU hosting or a real on-premise
install, and have someone to run it.

### Plausible — the mature one, hosted in Germany

The most polished product in the privacy-friendly group and the one that made the
category mainstream. Hosted in Falkenstein, Germany, with the company in Estonia,
which is a straightforward answer for EU buyers. The tracker is the smallest we
measured: 1,291 bytes gzipped, smaller than ours. Community Edition is
AGPL-3.0-or-later, unlimited sites and seats, and includes the Stats API.

Where it costs you is the plan ladder. Custom properties, funnels, ecommerce
revenue and the Stats API on Cloud all start at Business — $1,390 a year at a
million pageviews. Scheduled raw event export is Enterprise-only, so there's no
self-serve price that gets your own raw events out. Community Edition ships
twice a year and doesn't include funnels, ecommerce revenue goals, SSO or the
Sites API.

**Best for:** EU buyers who want a mature product from an EU company and don't
need the Business-tier features.

### Fathom — EU isolation on every plan, and a long track record

Running since 2018, closed source, and unusually good at the boring parts. EU
isolation is included free on every plan: EU visitors' pageviews route to EU
servers where the IP is stripped before anything reaches US infrastructure.
Retention is "forever". 75 sites at the million-pageview tier, and $600 a year
there.

Two things to know. There's no plan below 100,000 pageviews, so a 5,000-pageview
blog pays $150 a year. And the product is closed — "Fathom Lite" on GitHub is
MIT but has had no code change since January 2023.

**Best for:** EU data isolation without leaving a US-run product, and anyone who
values a vendor that's been around a while.

### Umami — MIT, and the most permissive license here

Free, MIT-licensed since 2020, self-hostable with two services. That license is
genuinely more permissive than our AGPL, and if permissiveness is your first
criterion Umami wins on it outright. Cloud Pro is $20 a month with no annual
discount, which works out at $240 a year and stays $240 all the way to a million
events.

Watch the unit — each stored event property counts as an event. And their own FAQ
says Cloud includes email reports and a streaming API that the self-hosted build
doesn't.

**Best for:** developers who want MIT, and low-to-mid-traffic sites where the
flat $20 is unbeatable.

### Pirsch — cheap, German, and unlimited seats

$540 a year at a million pageviews on Standard, unlimited team members, unlimited
retention, 50 sites. German company, closed-source product with an AGPL Go
tracking library. Standard has no funnels and no teams; those are on Plus, which
is $1,590 at a million.

**Best for:** price-sensitive buyers who want a German vendor and don't need
funnels.

### GoatCounter — small, careful, and free for reasonable use

A one-person project with a philosophy close to ours: tiny, no cookies,
self-hostable, and honest about what it does. The hosted service is free "for
reasonable public usage" — explicitly not for millions of pageviews a day — and
runs on donations. The GDPR page is the most careful writing on the subject in
this category, including the author's own "I am not a lawyer."

**Best for:** personal sites and small projects where the tool should be free and
stay out of the way.

### Cloudflare Web Analytics — free, cookieless, shallow

Free, explicitly cookieless, and a two-minute job if your site is already
behind Cloudflare. The limits are the point: shallow reporting, no meaningful goals or
custom events, no data export, retention not published, and no way to take your
history elsewhere.

**Best for:** a free traffic counter on a site you don't need to analyze.

### Simple Analytics — clean, and priced by datapoint

Dutch, EU-hosted, and one of the tidier dashboards in the category. $600 a year
at a million. The unit is the thing to model: pageviews, events **and each stored
event property** all count, and seats are $240 a year each beyond the first.

**Best for:** EU-hosted simplicity where one person does the looking.

### Feasible — us

Here's the flag we promised. $9.99 a month or $99 a year, one plan: unlimited
sites, unlimited team members, unlimited custom properties, and a million
pageviews and custom events a month between them, kept five years. Cookieless, AGPL-3.0-or-later,
one Go binary on SQLite that runs on 512 MB of RAM. The API, funnels, custom
properties, webhooks and raw event export are in every plan and every build.

Where we lose: no EU hosting — we're a US company in Oregon. No SSO or SAML. No
mobile SDKs, no session replay, no heatmaps, no A/B testing, no cohort report.
Our script is 3,377 bytes gzipped against Plausible's 1,291 — theirs is smaller
and we're not going to pretend otherwise. And we're new, which is a real risk
you're entitled to price in.

**Best for:** people running more than one site, or more than one person, who
want everything included and don't want a plan ladder.

## The free ones, honestly

"Free" in this category means one of four things, and it's worth knowing which
you're buying.

- **Free because you're the product** — GA4. Your visitors' behavior goes to an
  advertising company, and you pay in a consent banner.
- **Free because it's limited** — Cloudflare Web Analytics, Umami's Hobby tier
  (100,000 events, one site, six-month retention), Vercel's Hobby tier (50,000
  events, then collection pauses).
- **Free because someone is donating their time** — GoatCounter,
  Counter.dev.
- **Free because you're running it** — Matomo On-Premise, Umami self-hosted,
  Plausible Community Edition, Feasible self-hosted. That's a server, backups,
  upgrades and a pager, which is a real cost even when the software isn't.

There's no fifth option where a company with employees serves your traffic
forever for nothing.

## How to choose

**One small site, no budget.** GoatCounter's hosted tier or Cloudflare. Both
free, both cookieless, both shallow — which is fine when the question is "did
anyone read it".

**Running Google Ads seriously.** GA4. Nothing here replaces the ad integration,
and swapping it out to save $99 would be a bad trade.

**One site, EU company, want a mature product.** Plausible. Germany-hosted,
polished, and the entry plan is $190 a year at 100k.

**Several sites, or several people.** This is where per-site and per-seat pricing
stops being trivial. Fathom includes 75 sites; Pirsch has unlimited seats;
Feasible has both unlimited. Count your sites and your teammates before you look
at the headline price.

**You need depth, or on-premise, or EU public-sector procurement.** Matomo. It's
the deepest tool here and the one with the longest institutional track record.

**You want MIT.** Umami.

**You want everything included for one price and you'll take a US vendor.**
Feasible, which is us, and we'd say that.

---

Prices move. If a number here is wrong,
[tell us](mailto:help@feasible.lol) and we'll fix it. More detail on
[Google Analytics alternatives](/alternatives/google-analytics/),
[our pricing](/pricing/), and
[the head-to-head comparisons](/compare/).
