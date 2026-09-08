---
title: "Add website analytics to Framer"
platform: "Framer"
description: "Add the snippet through Framer's Custom Code panel in project settings, then publish. Runs on the published site, never on the canvas."
lede: "Project settings, Custom Code, add the script, publish."
---

The tag goes in **Project settings → Custom Code**, in the head, on all pages - and it only runs once you publish.

{{< snippet >}}

## Steps

1. Open **Project settings** in your Framer project.
2. Select the **Custom Code** tab in the left sidebar.
3. Click **Add Script**, or the **+** if you already have one.
4. Give it a name. "Feasible" is fine - the name is only for you.
5. Paste the tag and set the placement to the **head**.
6. Leave the page selection alone so it applies everywhere.
7. Set it to run **Once**, not on every page visit.
8. Save, then **Publish**.

## Run it once, not on every visit

Framer asks whether the code should run once or on every page visit. Pick **Once**.

Feasible's script installs its own history listeners the moment it loads - `pushState`, `replaceState`, back, forward, hash changes - and reports each route change as one pageview. Re-running the snippet on every navigation adds a second copy of the tag instead, and a second copy means two events for one visit.

## What Framer hides

**The canvas doesn't run your code.** Neither does preview. Custom code runs on the published site only. Every check below assumes a real browser tab on your published URL.

**Publishing is a separate action from saving.** Framer keeps your edits live-ish in the editor and your site static until you press Publish. Custom code follows the site, not the editor.

**You may be publishing to two hostnames.** A Framer project publishes to `yoursite.framer.website` as well as your custom domain. Register the domain you care about. Traffic on the other hostname shows up on the ingestion health panel as `hostname_not_allowed` rather than quietly mixing into your numbers, and there's a one-click action there to allow it if you want it counted.

{{< callout title="Framer navigates client-side" >}}
Framer sites move between pages without a full document load. That's handled - the script listens for history changes and counts each route once. Test by clicking the site's own links rather than pasting URLs, so you're exercising the same code path a visitor does.
{{< /callout >}}

## Framer's built-in analytics

Leave it on if you like it. Two scripts count independently. The totals won't match, because bot filtering and session rules differ between any two tools, and a number that agrees to the pageview usually means one tool is copying the other.

## Check it worked

Publish, open your published site in a normal browser window, and click through two or three pages using the site's own navigation. Then open Feasible.

You should show up under Real-time visitors. If you don't, go to **Site settings → Ingestion health**. It counts every event that arrived and every one that was dropped, each with a named reason - `unknown_site` means the snippet is for a site you haven't registered, `hostname_not_allowed` means the page is on a hostname that isn't on your list.

The **send a test event** button there posts through the real public URL, so it exercises what a browser does.

A brand-new site takes about fifteen seconds before its first event is accepted. [Wait that out](/help/how-long-until-i-see-data/) before you start changing settings.

Same shape of job on [Webflow](/integrations/webflow/) and [Squarespace](/integrations/squarespace/). The general case is in the [install docs](/docs/installation/).

Sources: [Framer - How to add custom code](https://www.framer.com/help/articles/how-to-add-custom-code/), checked September 3, 2026.
