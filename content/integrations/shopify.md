---
title: "Add website analytics to Shopify"
platform: "Shopify"
description: "Paste the snippet into theme.liquid before the closing head tag. Works on every Shopify plan, with one limit around checkout."
lede: "One tag in theme.liquid. Checkout is the part worth reading about."
---

The tag goes in `layout/theme.liquid`, just before `</head>`.

{{< snippet >}}

## Steps

1. From your Shopify admin, go to **Online Store**.
2. Click the **⋯** menu next to your live theme and choose **Edit code**.
3. Under **Layout**, open `theme.liquid`.
4. Paste the tag immediately before `</head>`.
5. **Save**.

Check the result on your live storefront, not in the theme editor's preview pane.

## Checkout is a different surface

Your theme doesn't render checkout. Shopify does, on its own pages, and those pages don't include your theme's code. So checkout and post-purchase pages won't appear in your pages report, on any plan.

Below Shopify Plus, that isn't something you can change. Shopify's documentation puts checkout-page apps and the Checkout Branding API on Plus only (checked September 3, 2026); everyone else gets branding controls and nothing that injects a script.

What this costs you is less than it sounds. You still see every product page, collection and cart, every source and campaign that brought the visit, and - if you set up a [revenue goal](/docs/goals-funnels/) - the money, credited back to the source that started the visit rather than to Shopify Payments.

## What Shopify hides

**Themes are copies.** The tag lives in one theme's `theme.liquid`. Duplicate the theme, install a new one, or restore a backup, and the new theme doesn't have it. This is the single most common way a Shopify store loses tracking: someone publishes a redesign on a Friday and the numbers die quietly on Saturday.

**A theme update overwrites the file.** If you take an update to a theme like Dawn rather than a fresh install, re-check `theme.liquid` afterwards.

**Preferences has a Google Analytics box. Don't use it.** `Online Store → Preferences` has a field for a Google Analytics property. It isn't a general "paste any script here" field, and it isn't where this goes.

{{< callout title="Password-protected stores" >}}
If your store is still behind Shopify's password page, the password page isn't your theme and won't carry the tag. Nothing will arrive until the store is open. That's not a broken install.
{{< /callout >}}

## Check it worked

Open your live storefront in a normal browser window - not the theme editor - and click through two or three products. Then open Feasible.

You should show up under Real-time visitors. If you don't, go to **Site settings → Ingestion health**. It counts every event that arrived and every one that was dropped, each with a named reason - `unknown_site` means the snippet is for a site you haven't registered, `hostname_not_allowed` means the page is on a hostname that isn't on your list. That last one is worth knowing about here: `yourstore.myshopify.com` and `yourstore.com` are different hostnames, and the health panel has a one-click action to allow whichever one you're testing on.

The **send a test event** button posts through the real public URL, so it exercises what a browser does. A brand-new site takes about fifteen seconds before its first event is accepted, so [give it that](/help/how-long-until-i-see-data/).

Also on template-editing platforms: [WordPress](/integrations/wordpress/) and [Ghost](/integrations/ghost/). The general case is in the [install docs](/docs/installation/).

Sources: [Shopify - Edit theme code](https://help.shopify.com/en/manual/online-store/themes/theme-structure/extend/edit-theme-code) and [Shopify - Checkout extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility), checked September 3, 2026.
