---
title: "Changelog"
seotitle: "Changelog - what's shipped in Feasible"
description: "What changed in Feasible, newest first and grouped by month: what you can do now that you couldn't before."
lede: "What's changed, newest first. Each entry names the release, for anyone self-hosting."
updated: 2026-11-15
---

## November 2026

### November 15 - events from your server count the real visitor

If you serve the script from your own domain, or send events from your server, each event now
counts at the visitor you forward in `X-Forwarded-For`. Until today the hosted service counted them
at your server instead: no location, every visitor merged into one, and usually filed as
`datacenter_ip`.

The health panel's warning for a proxy that isn't forwarding the visitor now works on the hosted
service too. It looks for requests from a hosting provider's address that name no visitor.

[Proxying](/docs/proxying/) · [Sending events from your server](/docs/api/#sending-events) ·
v0.0.53 and v0.0.54

### November 15 - help getting the snippet on

New accounts get a welcome email within five minutes of verifying their address. If none of their
sites has counted an event yet, install help follows on day 1, day 3 and day 7, and stops as soon as
data arrives. Each email has a link to stop them. Hosted service only.

### November 15 - no cookie to remember where you came from

app.feasible.lol used to give visitors who hadn't signed up a 30-day cookie to remember where they
came from. It's gone. When you sign up, the link to the form carries that instead: the referring
site's domain, the campaign tags and the first page you landed on. Nothing else is kept, and no
cookie is set. v0.0.51.

### November 15 - the billing page after you've paid

Once you're paying, the billing page no longer shows Monthly and Yearly buttons that led to an error
page. Your plan, card and invoices are under **Manage card, invoices and plan**.

### November 11 - yearly billing matches the published price

The yearly plan now bills $99 before tax, the price on [our pricing page](/pricing/). Monthly is
still $9.99.

## October 2026

### October 20 - crawlers that use a new address for every page

Some crawlers load each page from a different address, so every page looked like a new visitor. A
burst of unread, direct visits from one device and place, each on a different page, is now marked as
automated and left out of your reports. v0.0.43.

## September 2026

### September 18 - the tracker loads from a cache near your visitors

The snippet the app hands out now loads the tracker from `cdn.feasible.lol`, a cache close to your
visitors, rather than from our server in Montreal. Measured from one machine, the first byte came
back in 83 ms instead of 311 ms. That matters most for visitors who leave within a second, who were
often gone before the script arrived. It's still one URL, and snippets that point at
`app.feasible.lol` keep working. Hosted service only.

### September 14 - closer counts

- Pages that Chrome and Edge prerender are counted when the visitor opens them. Many weren't counted
  at all before, which is why Edge read low.
- A visit that loads three pages and never reports reading any of them is marked as automated. If it
  reports reading a page later, it goes back to being a person.
- The outdated-browser check now covers Macs too.

v0.0.37 to v0.0.39.

### September 13 - see why traffic was marked as automated

- In the [Stats API](/docs/api/#dimensions) and the assistant connection, `event:bot_reason` breaks
  automated traffic down by the rule that caught it.
- Browsers, operating systems and cities have icons beside their names, like sources and countries
  already did.
- A page can't show more visitors than pageviews any more. A reading report whose pageview went
  missing no longer counts as a visit to that page.

v0.0.36.

### September 12 - fixes from a side-by-side audit

- Visits, visitors, bounce rate and duration in one row now always describe the same visits, even
  over a window as short as an hour.
- A script posting form submissions without loading a page is marked as automated. Someone retrying
  a form on a page they're still reading isn't.
- Browsers inside Facebook, Instagram, LinkedIn, X, TikTok and other apps show as Mobile App
  rather than as Chrome or Safari, and Edge is now named Microsoft Edge.

v0.0.35.

### September 11 - filters that stay in sight, and two more campaign tags

- Filters sit in the top bar, so you can see and remove them anywhere on the dashboard.
- Filtering by a built-in goal opens its detail: which links were clicked, which files were
  downloaded, which pages had form submissions and which pages returned a 404.
- `utm_content` and `utm_term` are full dimensions, so you can break down and filter by them like
  the other three. What was already collected carried across.

v0.0.33 and v0.0.34.

### September 10 - search terms, GA4 history and graph intervals

- Connect Google Search Console and a card shows the searches people used to find your site, with
  landing pages, countries and devices. [How](/docs/import-export/#google-search-console)
- Import your GA4 history. Pick a property and a date range, and the import runs in the background.
  [How](/docs/import-export/#google-analytics-4)
- Choose how wide the graph's buckets are from the view menu, such as months across a year.
- Scripted traffic that fires events on two pages without ever loading one is marked as automated.
- Page paths keep their trailing slash, so `/releases/` is stored as `/releases/`, and the **Merge
  trailing slashes** setting now does what it says.
- The reading-time ping no longer shows up as a row when you break down by event name.

v0.0.28 to v0.0.32.

### September 9 - forms that submit with JavaScript

Forms handled by the page's own JavaScript are counted now. Most modern forms call `preventDefault`
and post with `fetch`, and the tracker used to skip those, so they never produced a
`Form: Submission`. v0.0.27.

### September 9 - connect an assistant with a sign-in

Connecting an AI assistant used to mean making an API key, copying it, and pasting it into a form.
Now you paste `https://app.feasible.lol/mcp` into Claude, ChatGPT, Cursor or VS Code, sign in, and
click Allow.

The connection shows up as a key in team settings, and revoking it there disconnects the assistant.
Sending an API key in a header still works. Self-hosters get it in v0.0.26.

[Set up your assistant](/docs/mcp/)

### Launch

Feasible is live. The whole product shipped at once: the one-page dashboard, goals,
funnels, custom properties, teams and roles, shared dashboards, email reports and
alerts, the ingestion health panel, the API, webhooks, the MCP server, CSV import,
raw data export, and self-hosting with every feature in it.

[What's in the plan](/pricing/) · [Why we built it](/why-feasible/)

---

Every release binary and its notes go to
[GitHub releases](https://github.com/Feasible-Analytics/app.feasible.lol/releases).
Self-hosters can watch that repository to know when to run `feasible db migrate`.
