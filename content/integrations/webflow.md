---
title: "Add website analytics to Webflow"
platform: "Webflow"
description: "Paste one script tag into Webflow's Head code field in Site settings, then publish. Works on any Webflow site with an active Site plan."
lede: "Site settings, Custom code, Head code. Then publish — that last part matters."
---

The tag goes in **Site settings → Custom code → Head code**, and it does nothing at all until you publish.

{{< snippet domain="yourdomain.com" >}}

## Steps

1. Open your project and go to **Site settings**.
2. Open the **Custom code** tab.
3. Paste the tag into **Head code**. It's inserted before the closing `</head>` tag on every page.
4. **Save changes**.
5. **Publish** the site.

The Head code field holds up to 50,000 characters, so there's room alongside whatever else you have in there.

## What Webflow hides

**Publishing is the step people forget.** Webflow's own documentation puts it plainly: "The effects of custom code appear in preview mode, but they won't go live until your site is published." Saving is not publishing. If you saved yesterday and published last week, your live site has no tag.

**Custom code is gated on a plan.** Webflow's help centre says custom code is available "if you have a Core, Growth, Agency, or Freelancer Workspace, or if your site has an active Site plan" (checked September 3, 2026). On a workspace and site with neither, the field is not usable — so check this before you spend an afternoon on it.

**You probably publish to two hostnames.** Webflow publishes to your custom domain *and* to `yoursite.webflow.io`. Register the domain you actually care about, and expect the staging hostname's traffic to be dropped with the reason `hostname_not_allowed` on the ingestion health panel. That's correct behaviour — it's keeping your own click-throughs out of the numbers. If you want the staging site counted too, the health panel has a one-click action to allow that hostname.

{{< callout title="Webflow interactions and the pages report" >}}
Webflow sites are ordinary multi-page HTML — every link is a real page load — so route tracking is nothing you have to think about. If you've built a single-page site with tabs or sliders, each tab is not a pageview, and no analytics tool will pretend otherwise. Use a [goal](/docs/goals-funnels/) on a click instead.
{{< /callout >}}

## Ecommerce

Webflow Ecommerce checkout pages are ordinary pages in your project, so the Head code applies to them the same as anything else. Revenue can be attributed with a [revenue goal](/docs/goals-funnels/), credited back to the source that started the visit — so Stripe never shows up as your best marketing channel.

## Check it worked

Publish, then open your live site in a normal browser window and click through two or three pages. Then open Feasible.

Real-time visitors should show you. If it doesn't, go to **Site settings → Ingestion health**. It counts every event that arrived and every one that was dropped, each with a named reason — `unknown_site` means `data-domain` doesn't match the site you registered, `hostname_not_allowed` means the page is on a hostname that isn't on your list. The **send a test event** button there posts through the real public URL, so it exercises exactly what a browser does.

A brand-new site takes about fifteen seconds before its first event is accepted, so [wait a moment](/help/how-long-until-i-see-data/) before assuming it's broken.

Same shape of job on [Framer](/integrations/framer/) and [Squarespace](/integrations/squarespace/). The general case is in the [install docs](/docs/installation/).

Sources: [Webflow — Custom code in head and body tags](https://help.webflow.com/hc/en-us/articles/33961357265299), checked September 3, 2026.
