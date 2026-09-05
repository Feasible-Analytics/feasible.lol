---
title: "Add website analytics to Ghost"
platform: "Ghost"
description: "Paste one script tag into Ghost's Site Header code injection field. Works on every theme, survives theme changes, and sets no cookies."
lede: "Settings, Advanced, Code injection, Site Header. Paste and save."
---

The tag goes in Ghost's site-wide code injection field, under **Site Header**. Nothing in your theme has to change.

{{< snippet domain="yourdomain.com" >}}

## Steps

1. Open Ghost admin and go to **Settings**.
2. Open **Advanced → Code injection**.
3. Paste the tag into **Site Header**.
4. **Save**.

That's it. Code injected here lands inside `<head>` on every page of the site, so it keeps working when you switch themes, and it isn't touched when you update one.

## What Ghost hides

**The editor preview doesn't run it.** Code injection applies to your published site. If you're checking from inside the admin, you're looking at a page that never loaded the script. Open the live URL in a normal tab instead.

**Portal and checkout render on a different origin.** Ghost's members overlay - sign-up, sign-in, Stripe checkout - is served separately, so it isn't covered by anything you inject into your site header. Signups will show up in your numbers as the page the visitor was on when they clicked, not as a separate portal pageview. That's usually what you wanted anyway.

**Per-post code injection is a separate box.** Every post and page has its own injection fields in the editor sidebar. If a tag ends up in both places, that page reports two pageviews for one visit. If your numbers look doubled on one URL, check there first.

**Ghost 6 ships its own analytics.** Running both is fine - they're separate scripts counting separately, and neither interferes with the other. Your two dashboards won't agree exactly, because no two analytics tools ever do; they filter bots differently and count sessions differently. Pick one to make decisions from.

{{< callout title="One tag, not two" >}}
If you're moving off another analytics tool, take its tag out of **Site Header** at the same time you paste ours in. Two trackers on a Ghost site is the most common cause of a page that feels slower after an "analytics switch" that was supposed to make it faster.
{{< /callout >}}

## Self-hosted Ghost

Identical. Code injection is a core Ghost feature, not a Ghost(Pro) one, so the same four steps work on your own box.

If you're running Ghost behind a reverse proxy and want the script served from your own domain to get past ad blockers, that's [proxying](/docs/proxying/) - one location block in nginx.

## Check it worked

Open your live site in a normal browser window - not the admin preview - and click through two or three posts. Then open Feasible.

You should show up under Real-time visitors. If you don't, go to **Site settings → Ingestion health**. It counts every event that arrived and every one that was dropped, each with a named reason - `unknown_site` means `data-domain` doesn't match the site you registered, `hostname_not_allowed` means the page is on a hostname that isn't on your list.

The **send a test event** button there posts through the real public URL, so it exercises what a browser does.

A brand-new site takes about fifteen seconds before its first event is accepted. If nothing shows up straight away, [that's why](/help/how-long-until-i-see-data/).

Other one-field platforms: [Webflow](/integrations/webflow/), [Squarespace](/integrations/squarespace/), [Framer](/integrations/framer/). The general case is in the [install docs](/docs/installation/).
