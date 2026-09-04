---
title: "Simple web analytics for people who just want the numbers"
seotitle: "Simple web analytics — one page, no menus"
description: "Every number you need on one screen. No reports to build, no explore tab, nothing to learn. Simple website analytics for $9.99 a month."
lede: "One page. Six numbers across the top, a graph, four cards. That's the whole product, and leaving things out was the hard part."
kicker: "SIMPLE"
weight: 40
faq:
  - q: "What is simple web analytics?"
    a: "Analytics you can read without training. One page that already shows visitors, pageviews, top pages, sources, countries and devices — no report to build, no query to write, no menu tree to learn first."
  - q: "Why is Google Analytics 4 so complicated?"
    a: "Because it's built for analysts. Everything in GA4 is an event, and the analysis most people want lives in Explorations — a canvas you assemble yourself out of dimensions and metrics. That's a real capability if analysis is your job, and a homework assignment if it isn't."
  - q: "What numbers does Feasible show?"
    a: "Fifteen metrics: visitors, visits, pageviews, events, bounce rate, visit duration, views per visit, time on page, scroll depth, exit rate, conversion rate, group conversion rate, total revenue, average revenue and revenue per visitor. Six of them sit across the top of the dashboard and all six are graphable with a click."
  - q: "Is there a simple analytics tool that doesn't need a cookie banner?"
    a: "Feasible sets no cookies and stores no identifier, so most sites running it won't need a banner for analytics. That isn't a legal guarantee — check what else your site loads, and check with your own lawyer if you're somewhere strict."
  - q: "How long does it take to set up?"
    a: "One script tag in your head, and data appears within seconds. Goals, funnels and traffic exclusions are optional and take about twenty minutes if you want them."
---

You open one page and the numbers are already there. No report to build. No
exploration to configure. No menu tree to learn before you can answer "how many
people read the thing I published yesterday".

That used to be normal. Then it stopped.

{{< shot src="app/dashboard-light.png" alt="The Feasible dashboard: six stat tiles, a graph, and four report cards" caption="The whole product. There's no second screen." >}}

## What went wrong with the tool most people have

We're going to name the specific things rather than call GA4 a bad word, because
the specific things are the argument.

**Everything is an event, and the core reports are yours to build.** In GA4 the
reporting you'd actually do lives in Explorations, which is a canvas you assemble
out of dimensions and metrics. That's a real capability if you're an analyst. If
you publish a newsletter, it's a homework assignment.

**Rows disappear.** GA4 applies thresholds when counts are low and demographic
data is in play. Google, verbatim: "Data thresholds are system defined. You can't
adjust them"
([source](https://support.google.com/analytics/answer/9383630)). The only remedy
Google offers is widening the date range. Same metric, three places, three
answers is a normal Tuesday.

**Sampling is on the table.** Google's own comparison of reporting surfaces marks
sampling "Possible" for Reports, Insights and Explorations together. Only the
BigQuery export is marked "No"
([source](https://support.google.com/analytics/answer/13331292)).

**History has a ceiling.** Event-level retention on a standard property is 2 or
14 months, and a property that Google reclassifies as "Large" is automatically
reduced to 2 months, with older event-level data permanently deleted
([source](https://support.google.com/analytics/answer/7667196)).

None of that is a complaint about power. It's a mismatch. The tool is built for
analysts, and most people running a website aren't analysts and don't want to
become one.

## The one page, annotated

Six tiles across the top: **unique visitors**, **total visits**, **total
pageviews**, **views per visit**, **bounce rate**, **visit duration**. Click any
tile and the graph below redraws for that metric. All six are graphable, which
means there's no "how do I chart this" question.

Under the graph, four cards:

- **Top sources** — channels, sources with favicons, and campaign tabs for UTM
  source, medium and campaign.
- **Top pages** — pages, entry pages, exit pages.
- **Locations** — a world map, then countries, regions and cities.
- **Devices** — browsers and versions, systems and versions, device type and
  screen size, plus languages.

Then one full-width card called **behavior analysis**, with four tabs: goals,
custom properties, funnels, and explore — the journey report showing where people
went before and after a page.

Click any row in any card and it becomes a filter. Filters live in the URL as
readable parameters, so a filtered view is a link you can send someone. Escape
clears them all.

Want more than a card shows? Click its title and a drawer slides in from the
right with a hundred rows a page, a search box, sortable columns for visitors,
visits, views, bounce rate and average visit, and a **break down by** menu — top
pages by country, sources by device, that sort of thing. It's the one place the
product goes deeper, and it's one click from where you already were rather than a
report you have to construct.

Six filter operators exist and that's the whole set: is, is not, contains, does
not contain, matches regex, does not match regex. Repeated filters combine with
AND; multiple values inside one filter combine with OR. There's nothing else to
learn.

That's the product. Thirteen date-range presets with single-key shortcuts, a
comparison toggle for previous period or year over year, light and dark themes,
and a realtime view. Everything else you might want is a click on something
already on screen.

## The fifteen numbers, and what each is for

Visitors, visits, pageviews, events, bounce rate, visit duration, views per
visit, time on page, scroll depth, exit rate, conversion rate, group conversion
rate, total revenue, average revenue, revenue per visitor.

That's the complete list. Not fifteen out of two hundred — fifteen, full stop.
Each one exists because somebody has to make a decision with it: what to write
next, which page is leaking, which channel to spend on, what a visitor is worth.

Revenue is worth a note. If you send a revenue goal, the money is credited to the
**source that started the visit**, so Stripe never turns up as your best
marketing channel. That's a small thing that saves an argument in every marketing
meeting.

## What we left out, on purpose

- **No session replay.** No watching an individual move around a page.
- **No heatmaps.**
- **No A/B testing.**
- **No cohort or retention report.**
- **No saved segments.** Filters are in the URL; a link is the segment.
- **No mobile SDKs.** Websites only.
- **No SSO or SAML.** The team settings page says so on screen.

Leaving things out was the hard part. Every one of these has a customer who wants
it, and shipping all of them is how you end up with the product people are
leaving.

## Who shouldn't use Feasible

An honest disqualifier list, because you'll find this out in week two anyway.

**You need to follow one person over weeks and devices.** We don't have an
identifier that survives midnight UTC. Lifetime value and returning-visitor
cohorts aren't things we can give you.

**You run a large paid-media operation on Google Ads.** GA4's integration with
Google's own ad platform is genuinely useful and we have nothing like it. If your
job is optimizing ad spend inside Google's stack, stay where you are.

**You want session recordings or heatmaps.** Different category. Microsoft
Clarity does it free, uses cookies, and needs consent in the EU.

**You need SSO/SAML for procurement.** We don't have it today.

**You need product analytics** — event autocapture across a logged-in app, user
paths by account, feature adoption cohorts. That's a different tool. PostHog and
Matomo both go deeper there.

**You need EU-only data residency as a hard requirement.** We're a US company in
Oregon. [Self-hosting](/open-source-web-analytics/) solves it; our hosted service
doesn't.

If none of those describe you, the product is probably a good fit — and if it
isn't, we'd rather you found out from this page than from an invoice.

## What it costs

$9.99 a month, or $99 a year. Unlimited sites, unlimited team members, unlimited
custom properties, and a million pageviews and custom events a month between
them, kept five years. One plan, no tiers to compare, nothing held back for a bigger
one.

For contrast, at a million pageviews a month on published pricing checked
September 3, 2026: Plausible Business is $1,390 a year, Matomo Cloud is $2,040, Fathom is
$600, Simple Analytics is $600. The
[whole ladder is on the pricing page](/pricing/), with every number linked to the
vendor's own page.

## Installing it

One tag in your `<head>`:

{{< snippet domain="yourdomain.com" >}}

3,377 bytes gzipped. Outbound link clicks, file downloads, form submissions,
scroll depth and single-page-app route changes are all counted with no extra
configuration and no second script file to choose between.

Then there's a health panel that tells you whether the data is actually arriving —
every dropped event counted with a named reason, a warning if your proxy isn't
forwarding visitor addresses, and a button that sends a real test event through
the real public URL. It's the most boring feature we have and the one we're
proudest of, because the alternative is a dashboard quietly showing you zero.

---

Leaving things out was the hard part, and it's the only part that doesn't show
up in a feature list. Next: [cookieless analytics](/cookieless-analytics/), or
[the rest of the tools in this category](/web-analytics-tools/).
