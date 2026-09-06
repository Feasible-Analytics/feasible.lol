---
title: "Simple web analytics for people who just want the numbers"
seotitle: "Simple web analytics: one page, no menus"
description: "The website numbers you need on one screen. No reports to build. $9.99 a month."
lede: "Six numbers, one graph, and five reports. All on one page."
kicker: "SIMPLE"
weight: 40
faq:
  - q: "What is simple web analytics?"
    a: "Analytics you can read without training. Visitors, pages, sources, countries, and devices are already on one page."
  - q: "Why is Google Analytics 4 so complicated?"
    a: "It's built for analysts. That power helps if analysis is your job. For everyone else, it creates work."
  - q: "What numbers does Feasible show?"
    a: "Fifteen metrics cover traffic, engagement, conversions, and revenue. Click any top metric to graph it."
  - q: "Is there a simple analytics tool that doesn't need a cookie banner?"
    a: "Feasible sets no cookies and stores no identifier, so most sites running it won't need a banner for analytics. That isn't a legal guarantee - check what else your site loads, and check with your own lawyer if you're somewhere strict."
  - q: "How long does it take to set up?"
    a: "One script tag in your head, and data appears within seconds. Goals, funnels and traffic exclusions are optional and take about twenty minutes if you want them."
---

Open the dashboard. Your numbers are there. No report builder. No setup course.

{{< shot src="app/dashboard-light.png" alt="The Feasible dashboard: six stat tiles, a graph, and four report cards" caption="The whole product. There's no second screen." >}}

## What went wrong with the tool most people have

GA4 is built for analysts. Its Explorations let you build complex reports.
Feasible starts with the report most site owners need.

GA4 can hide low-count rows with data thresholds
([source](https://support.google.com/analytics/answer/9383630)).

It can sample reports outside BigQuery
([source](https://support.google.com/analytics/answer/13331292)).

Event-level history lasts 2 or 14 months. Large properties drop to 2 months
([source](https://support.google.com/analytics/answer/7667196)).

## The one page, annotated

Six tiles show **visitors**, **visits**, **pageviews**, **views per visit**,
**bounce rate**, and **visit duration**. Click one to graph it.

Under the graph, four cards:

- **Top sources** - channels, sources with favicons, and campaign tabs for UTM
  source, medium and campaign.
- **Top pages** - pages, entry pages, exit pages.
- **Locations** - a world map, then countries, regions and cities.
- **Devices** - browsers and versions, systems and versions, device type and
  screen size, plus languages.

The last card covers goals, custom properties, funnels, and page paths.

Click any row to filter the whole page. The filter stays in the URL, so you can
share it. Click a card title for more rows and breakdowns.

## The fifteen numbers, and what each is for

Visitors, visits, pageviews, events, bounce rate, visit duration, views per
visit, time on page, scroll depth, exit rate, conversion rate, group conversion
rate, total revenue, average revenue, revenue per visitor.

That is the complete list. Revenue is credited to the source that started the
visit, so Stripe doesn't become your best marketing channel.

## What we left out, on purpose

- **No session replay.** No watching an individual move around a page.
- **No heatmaps.**
- **No A/B testing.**
- **No cohort or retention report.**
- **No saved segments.** Filters are in the URL; a link is the segment.
- **No mobile SDKs.** Websites only.
- **No SSO or SAML.** The team settings page says so on screen.

These are product decisions, not a backlog.

## Who shouldn't use Feasible

**You need to follow one person over weeks and devices.** We don't have an
identifier that survives midnight UTC. Lifetime value and returning-visitor
cohorts aren't things we can give you.

**You run a large paid-media operation on Google Ads.** GA4's integration with
Google's own ad platform is useful and we have nothing like it. If your
job is optimizing ad spend inside Google's stack, stay where you are.

**You want session recordings or heatmaps.** Different category. Microsoft
Clarity does it free, uses cookies, and needs consent in the EU.

**You need SSO/SAML for procurement.** We don't have it today.

**You need product analytics** - event autocapture across a logged-in app, user
paths by account, or feature-adoption cohorts. That's a different tool. PostHog
and Matomo both go deeper there.

**You need EU-only data residency as a hard requirement.** We're a US company in
Oregon. [Self-hosting](/open-source-web-analytics/) solves it; our hosted service
doesn't.

If any of those describe you, choose another tool.

## What it costs

$9.99 a month or $99 a year. Unlimited sites, teammates, and properties. One
million pageviews and custom events a month. Five years of data. [See the full
price](/pricing/).

## Installing it

One tag in your `<head>`:

{{< snippet >}}

It's 3,377 bytes gzipped. It automatically counts outbound clicks, downloads,
forms, scroll depth, and single-page-app routes. The health panel tells you when
an event fails and why.

---

Next: [cookieless analytics](/cookieless-analytics/) or [other web analytics
tools](/web-analytics-tools/).
