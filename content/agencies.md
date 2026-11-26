---
# Created: 2026-11-20
# Copyright (c) 2026 Cloudmanic Labs, LLC. All rights reserved.
title: "Every client site, on one $99 bill."
seotitle: "Analytics for agencies: every client site for $99 a year"
description: "One plan for every client site: $99 a year, unlimited sites and client logins, a million pageviews a month shared across them. Clients see only their own."
lede: "Add every client. Give each one their own login. It's still $99 a year."
kicker: "FOR AGENCIES"
image: "/images/og/agencies.png"
date: 2026-11-20
lastmod: 2026-11-23
checked: 2026-11-20
toc: true
ctaLine1: "Every client site."
ctaLine2: "Free for 30 days."
faqHeading: "Questions agencies ask"
faq:
  - q: "Can I put my agency's name on it?"
    a: "No. There's no white-label option, so your clients see Feasible's name on the dashboard and in the emails."
  - q: "Do my clients need their own Feasible plan?"
    a: "No. Guest logins, shared links and email reports cost nothing. A client only needs their own plan if you hand the site over to their own account."
  - q: "What happens to a client's data when they leave?"
    a: "Your choice. Move the site to their own account with its history, or [export everything](/help/how-do-i-export-my-data/) as a ZIP, raw events included, and give them that."
  - q: "Will my clients' sites need a cookie banner?"
    a: "Feasible sets no cookies and stores no identifier, so most sites running it won't need a banner for analytics. That isn't a legal guarantee. Check what else the site loads, and check with a lawyer if the client is somewhere strict."
---

Every new client means a new GA4 property, another round of permissions, and
another consent banner to explain. Or it means one more site on a plan that
charges by the site.

Feasible is one plan for all of them.

## One plan, every client

$99 a year, or $9.99 a month. That covers:

- **Every client site.** There's no site limit. Add the ones you haven't signed yet.
- **Every teammate and every client login.** There are no seats.
- **Unlimited data retention.** Nothing gets deleted because it's old.
- **1,000,000 pageviews and custom events a month.**

That million is one allowance for the whole account, **shared across every
site**. It isn't a million per site. Twenty client sites at 5,000 pageviews a
month use a tenth of it. Forty busy ones can use all of it.

### Past a million

Collection never stops, and there's no overage charge.

1. We email you at 70%, 85% and 100% of the limit.
2. One month over costs nothing and changes nothing.
3. Two full months over in a row, and we email asking you to reply within 14 days.
4. No reply after that, and the dashboard locks. Export keeps working.

If your clients have outgrown it for good,
[email sales@feasible.lol](mailto:sales@feasible.lol). It's the same product. We
only need to price the extra volume. The details are on the
[pricing page](/pricing/#enterprise).

## The math for an agency

We sell one of these, so check our work. Prices are annual list prices before
tax, from each vendor's own pricing page, as on
[our price table](/compare/pricing/). Prices and site limits were read on
November 20, 2026.

Two agencies: one with 20 client sites and 100,000 pageviews a month between
them, and one with 40 sites and a million.

| Plan | 20 sites, 100k | 40 sites, 1M | Sites included |
|---|---:|---:|---|
| **Feasible** | **$99** | **$99** | **Unlimited** |
| [Pirsch](https://pirsch.io/pricing) - Standard | $120 | $540 | 50 |
| [Fathom](https://usefathom.com/pricing) | $150 | $600 | 50, or 75 at 1M |
| [Umami Cloud](https://umami.is/pricing) - Pro | $240 | Too many sites | 20 |
| [Plausible](https://plausible.io/#pricing) - Business | Too many sites | Too many sites | 10 |

Look at the 20-site column before you get excited. With 20 small sites, Pirsch
is $21 a year more than us. At that size, pick on features, not price.

The 40-site column is where per-site and capped plans get expensive. It's also
right at our limit, so read the section above before you sign client 41.

Your own client count will differ. Put it in the
[pricing calculator](/pricing/calculator/?sites=40&pv=1000000&team=5), with your
traffic and the people who need a login, and it runs the same math for every
vendor.

**Where we aren't cheaper.** If every client site you run adds up to less than
10,000 pageviews a month, Pirsch Standard is $60 a year for up to 50 sites.
That's less than $99, and you should take it. GA4 is free at any size. You pay
for it with a consent banner on every client site and a fresh property for each
one. And past a million pageviews a month in all, we don't publish a price.

## Each client sees their own site and nothing else

There are two ways to show a client their numbers, and neither costs a seat.

**A guest login.** Invite a client to one site as a guest viewer, who reads the
dashboard, or a guest editor, who can also change that site's goals, funnels
and settings. They sign in and see that one site. No site list, no team page,
no billing, no hint that your other clients exist.
[How guest roles work](/help/how-do-guest-roles-work/).

**A shared link.** For the client who wants the numbers and will never sign in.
It's a private URL with a token in it. Add a password if you like. Pin a filter
they can't remove, so the link shows one campaign or one part of the site.
Revoke it in one click.

**Or email it to them.** A weekly or monthly report goes out at the site's own
local midnight, to up to 25 people, and they don't need accounts.
[Reports and alerts](/features/email-reports/).

Your own staff join the team with a [role](/features/teams-and-sharing/). An
editor manages sites. A billing member sees the dashboard and the invoices, and
can't delete a site. They don't cost a seat either.

## Bringing a client in, and handing one back

**Off GA4, with their history.** On the site's Imports screen, sign in with a
Google account that can read the client's GA4 property, pick a date range, and their history shows up next to the
new traffic: daily totals and breakdowns for pages, sources, locations, devices,
browsers and landing pages. It doesn't recreate raw events, goals or audiences.
Run both for a couple of weeks and check a few dates before you remove the old
tag. [Moving off Google Analytics](/migrate/from-google-analytics/).

**Off Plausible.** Export the site from Plausible as one ZIP and upload it as it
is. There's nothing to unzip or rename.
[Importing a Plausible export](/docs/import-export/#a-plausible-export).

**Handing a client their own account.** When a client wants to own their
analytics, they open their own Feasible account and invite you as an admin. You
move the site across from its settings. The history moves with it, and the
snippet on their site doesn't change. Guest logins, shared links, reports and
alerts stay behind, because they were your grants, not theirs. Only your team's
owner can move a site.

## Setting up each client site

One script tag per site. Each site gets its own dashboard, goals and time zone.

There are [install guides](/integrations/) for 18 platforms, including
[WordPress](/integrations/wordpress/), [Webflow](/integrations/webflow/),
[Squarespace](/integrations/squarespace/), [Wix](/integrations/wix/) and
[Shopify](/integrations/shopify/). On WordPress, install
[our plugin](https://wordpress.org/plugins/feasible-analytics/) from the plugin directory and tick one box.

Past a dozen sites, put them in folders on the sites list, one per client, and
pin the few you check every morning.

## Ask which client's traffic dropped

Paste `https://app.feasible.lol/mcp` into Claude, ChatGPT, Cursor or VS Code,
sign in, and click **Allow access**. Then ask in plain words: "Which client's traffic dropped this
week, and why?" The assistant sees every site on your team, compares the weeks,
and breaks a drop down by source, page, country and device.
[Connecting an assistant](/docs/mcp/).

Everything is in the [API](/features/api-and-webhooks/) too. Create a site for a
new client with one `POST`, make a client's shared link from your own admin
tool, or pull the numbers into reports you already send.

Rather see it first?
<a href="https://app.feasible.lol/public/stopoverpayingforanalytics.com" class="feasible-event-name=demo-click feasible-event-location=agencies">The live demo</a>
is the whole dashboard on a demo site with generated traffic, so you can click everything. There's no sign-up.
