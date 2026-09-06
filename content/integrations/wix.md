---
title: "Add website analytics to Wix"
platform: "Wix"
description: "Add one script tag through Wix's Custom Code panel, set to Head on all pages. Your site needs to be published with a connected domain."
lede: "Settings, Custom Code, Head, all pages. The requirement is a connected domain."
---

The tag goes in **Settings → Custom Code**, placed in the **Head** on **All pages**.

{{< snippet >}}

## Check this first

Wix's own instructions open with a requirement: **"Make sure that your site is published and has a connected domain."** A site still on a `wixsite.com` address can't run custom code, which in practice means custom code needs a paid Wix plan, because that's what a connected domain needs.

## Steps

1. Go to **Settings** in your site's dashboard.
2. Under **Development & integrations**, click **Custom Code**.
3. Click **+ Add Custom Code** at the top right.
4. Paste the tag into the code box.
5. Give it a name - "Feasible" does fine. It's only for you.
6. Under **Add Code to Pages**, choose **All pages**.
7. Under **Place Code in**, choose **Head**.
8. Click **Apply**.

## What Wix hides

**Changing your domain deletes your snippets.** Wix says so directly: assign a different domain to the site and your code snippets are removed. If you migrate a domain and your numbers go flat the same week, this is the first thing to check, not the last.

**Wix routes the big trackers elsewhere.** Its help page notes that "tracking scripts such as Google Analytics, Google Tag Manager, and Facebook & TikTok pixels do not work through custom code" - those have their own dedicated slots in the Wix dashboard. Feasible isn't one of those, so Custom Code is the right place for it. Wix has also tightened what custom code is allowed to do, so don't assume it's live because you clicked Apply. Verify it, below.

**Wix pages navigate client-side.** Moving between pages on a Wix site often doesn't reload the document. Our script watches history changes itself and counts each route once, so there's nothing to configure - but it does mean you should test by *clicking links*, not by typing three URLs into the address bar.

{{< callout title="Test on the live site, in a private window" >}}
Custom code doesn't run in the Wix editor or in preview. It runs on the published site. Every check below assumes a real browser tab on your real domain.
{{< /callout >}}

## Check it worked

Publish, open your live site in a private browser window, and click through two or three pages using the site's own navigation. Then open Feasible.

You should show up under Real-time visitors. If you don't, go to **Site settings → Ingestion health**. It counts every event that arrived and every one that was dropped, each with a named reason - `unknown_site` means the snippet is for a site you haven't registered, `hostname_not_allowed` means the page is on a hostname that isn't on your list.

The **send a test event** button there posts through the real public URL, so it exercises what a browser does.

If the health panel shows nothing arriving at all - not accepted, not dropped - the script isn't loading, and on Wix that means the snippet isn't published or isn't being served. View source on the live page and search for `feasible`. If it isn't in the HTML, the problem is on the Wix side of the fence.

A brand-new site also takes about fifteen seconds before its first event is accepted, so [wait a moment first](/help/how-long-until-i-see-data/).

Same job, fewer surprises, on [Squarespace](/integrations/squarespace/) and [Webflow](/integrations/webflow/). The general case is in the [install docs](/docs/installation/).

Sources: [Wix - Embedding custom code on your site](https://support.wix.com/en/article/embedding-custom-code-on-your-site), checked September 3, 2026.
