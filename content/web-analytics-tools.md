---
title: "Web analytics tools, compared"
seotitle: "Web analytics tools compared on price and limits"
description: "Ten web analytics tools compared on price at 100k and 1M pageviews, site and seat limits, cookies and license. We make one of them, and we say so."
lede: "Ten tools. Real prices, real limits, and the best fit for each job."
kicker: "ROUNDUP"
weight: 60
wide: true
checked: 2026-09-03
faq:
  - q: "What is a web analytics tool?"
    a: "Software that counts visitors, pageviews, sources, and conversions. Most tools load a small script on each page."
  - q: "What are the best free web analytics tools?"
    a: "Google Analytics 4 has the most features and Google Ads integration. Cloudflare is free, cookieless, and limited. GoatCounter is free for reasonable public use. Umami and Matomo are free when you host them."
  - q: "How much do web analytics tools cost?"
    a: "At a million pageviews a month, on published annual pricing checked September 3, 2026: Feasible $99, Pirsch Standard $540, Fathom $600, Simple Analytics $600, Plausible Starter $690, Plausible Business $1,390, Matomo Cloud $2,040. Umami Cloud Pro is $20 a month with no annual discount."
  - q: "Which web analytics tools don't need a cookie banner?"
    a: "Feasible, Plausible, Fathom, Simple Analytics, Umami, Pirsch, GoatCounter and Cloudflare all avoid cookies, so most sites running them won't need a banner for analytics. It isn't a legal guarantee and the rules vary by country - check with your own lawyer if you're somewhere strict."
  - q: "Why do vendors count different things?"
    a: "Because the billing unit decides the bill. Some count pageviews, some count 'hits' that include downloads and outbound clicks, some count each stored event property as a separate billable item. The same site can land two tiers apart depending on which one you picked."
---

{{< callout title="A word about us before the table" >}}
We make one of these. Feasible is in the list on the same terms as everyone else,
and we'll flag it again when we get there. Every price below comes from the
vendor's own published pricing page, linked, and read on September 3, 2026.
{{< /callout >}}

Pick the right category first:

- **Traffic analytics** - how many people, from where, reading what. Almost
  everything below.
- **Product analytics** - event-level behavior inside a logged-in app, by user.
  PostHog, Amplitude, Mixpanel.
- **Behavior tools** - session recordings and heatmaps. Microsoft Clarity,
  Hotjar. Different job, and they need consent because they record people.

This page compares traffic analytics.

## What each costs, and what it counts

Annual pricing in USD, on annual billing where the vendor offers it. **The unit
column matters more than the price column** - read it before comparing any two
numbers.

| Tool | 100k pv/mo | 1M pv/mo | Counts | Sites | Seats | Retention | Source |
|---|---|---|---|---|---|---|---|
| **Feasible** | **$99** | **$99** | pageviews + custom events; properties free | unlimited | unlimited | 5 years | [pricing](/pricing/) |
| Plausible Starter | $190 | $690 | pageviews + custom events | 1 | owner only | 3 years | [plausible.io](https://plausible.io/#pricing) |
| Plausible Business | $390 | $1,390 | pageviews + custom events | 10 | 10 | 5 years | [plausible.io](https://plausible.io/#pricing) |
| Fathom | $150 | $600 | pageviews + custom events | 75 | not published | "forever" | [usefathom.com](https://usefathom.com/pricing) |
| Simple Analytics | $200 | $600 | datapoints - pageviews, events **and each stored property** | 10 | 1 (+$240/yr each) | 3 years | [simpleanalytics.com](https://www.simpleanalytics.com/pricing) |
| Pirsch Standard | $120 | $540 | pageviews + events + 10% of session extensions | 50 | unlimited | unlimited | [pirsch.io](https://pirsch.io/pricing) |
| Umami Cloud Pro | $240 | $240 | events - **each stored property counts** | 20 | 10 | 2 years | [umami.is](https://umami.is/pricing) |
| Matomo Cloud | $420 | $2,040 | **hits** - views, events, downloads, outbound clicks, site searches | 30 | 30 | configurable | [matomo.org](https://matomo.org/pricing/) |
| Google Analytics 4 | $0 | $0 | events | unlimited | unlimited | 2 or 14 months (event-level) | [Google](https://support.google.com/analytics/answer/11202874) |
| Cloudflare Web Analytics | $0 | $0 | pageviews | - | - | not published | [cloudflare.com](https://www.cloudflare.com/web-analytics/) |

Three billing details change the answer:

**Matomo bills hits.** Pageviews, events, downloads, outlinks, searches, and
content tracking can each count.

**Simple Analytics and Umami bill stored properties.** One event with five
properties can count as six units.

**Plausible Starter covers one site and its owner.** Business adds custom
properties, funnels, and teammates. At one million pageviews, it costs $1,390.

## The tools, one at a time

### Google Analytics 4 - free, and the only one with Google Ads in it

Use GA4 when Google Ads drives your business. The integration has no match here.
GA4 is free at any volume and offers BigQuery export.

It sets cookies. Event-level retention lasts 2 or 14 months. Reports can be
thresholded or sampled. Its `gtag.js` measured 148,451 bytes gzipped on September
3, 2026.

**Best for:** paid-media teams living inside Google's stack.

### Matomo - the deepest feature set, and the on-premise answer

Matomo has segments, custom dimensions, heatmaps, A/B testing, roll-up reports,
and ecommerce. It's GPL-3.0, hosts Cloud in Europe, and offers the core
On-Premise product free.

Cloud costs $2,040 a year at one million hits. Premium plugins cost extra.

**Best for:** organizations that need depth, EU hosting or a real on-premise
install, and have someone to run it.

### Plausible - the mature one, hosted in Germany

Plausible is a mature product hosted in Germany. Its 1,291-byte tracker is the
smallest we measured. Community Edition uses AGPL-3.0-or-later and includes the
Stats API.

Cloud Business starts at $1,390 a year for one million pageviews and adds custom
properties, funnels, revenue, and the Stats API. Scheduled raw export is an
Enterprise feature.

**Best for:** EU buyers who want a mature product from an EU company and don't
need the Business-tier features.

### Fathom - EU isolation on every plan, and a long track record

Fathom includes EU isolation and says retention is forever. The one-million
pageview plan includes 75 sites and costs $600 a year.

Plans start at 100,000 pageviews and $150 a year. The hosted product is closed
source.

**Best for:** EU data isolation without leaving a US-run product, and anyone who
values a vendor that's been around a while.

### Umami - MIT, and the most permissive license here

Umami is MIT-licensed and self-hostable. Cloud Pro costs $240 a year through one
million events.

Watch the unit - each stored event property counts as an event. And their own FAQ
says Cloud includes email reports and a streaming API that the self-hosted build
doesn't.

**Best for:** developers who want MIT, and low-to-mid-traffic sites where the
flat $20 is unbeatable.

### Pirsch - cheap, German, and unlimited seats

$540 a year at a million pageviews on Standard, unlimited team members, unlimited
retention, 50 sites. German company, closed-source product with an AGPL Go
tracking library. Standard has no funnels and no teams; those are on Plus, which
is $1,590 at a million.

**Best for:** price-sensitive buyers who want a German vendor and don't need
funnels.

### GoatCounter - small, careful, and free for reasonable use

A one-person, cookieless, self-hosted project. Hosting is free for reasonable
public use and funded by donations.

**Best for:** personal sites and small projects where the tool should be free and
stay out of the way.

### Cloudflare Web Analytics - free, cookieless, shallow

Free, explicitly cookieless, and a two-minute job if your site is already
behind Cloudflare. The limits are the point: shallow reporting, no meaningful goals or
custom events, no data export, retention not published, and no way to take your
history elsewhere.

**Best for:** a free traffic counter on a site you don't need to analyze.

### Simple Analytics - clean, and priced by datapoint

Dutch, EU-hosted, and one of the tidier dashboards in the category. $600 a year
at a million. The unit is the thing to model: pageviews, events **and each stored
event property** all count, and seats are $240 a year each beyond the first.

**Best for:** EU-hosted simplicity where one person does the looking.

### Feasible - us

Feasible costs $9.99 a month or $99 a year: unlimited
sites, unlimited team members, unlimited custom properties, and a million
pageviews and custom events a month between them, kept five years. Cookieless, AGPL-3.0-or-later,
one Go binary on SQLite that runs on 512 MB of RAM. The API, funnels, custom
properties, webhooks and raw event export are in every plan and every build.

Where we lose: no EU hosting, SSO, or SAML. No
mobile SDKs, no session replay, no heatmaps, no A/B testing, no cohort report.
Our script is 3,377 bytes gzipped against Plausible's 1,291. We're also new.

**Best for:** people running more than one site, or more than one person, who
want everything included and don't want a plan ladder.

## How to choose

**One small site, no budget.** GoatCounter's hosted tier or Cloudflare. Both
free, both cookieless, both shallow - which is fine when the question is "did
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
