---
title: "Add website analytics to Hugo"
platform: "Hugo"
description: "One script tag in your head partial. Override the theme's copy rather than editing it, and remember that hugo server runs on localhost."
lede: "layouts/_partials/head.html — and don't edit the file inside themes/."
---

The tag goes in your head partial: `layouts/_partials/head.html` on Hugo 0.146 and later, or `layouts/partials/head.html` on a project built before that.

{{< snippet domain="yourdomain.com" >}}

This site runs on Hugo, so this page is written from the same problem you're having.

## Steps

1. Look in `layouts/` for a head partial. If your project has one, paste the tag inside `<head>` and you're done.
2. If it lives in your theme instead — `themes/<name>/layouts/_partials/head.html` — **copy it** to the same path under your own `layouts/` first, then edit the copy.
3. Build and deploy.

Hugo looks in your project's `layouts/` before the theme's, so the copy wins. That's the supported way to change a theme's markup.

## Never edit the theme directory

If your theme is a git submodule or a Hugo module, editing files under `themes/` works exactly until the next `git submodule update` or `hugo mod get -u`, at which point your change is gone and your traffic stops. No error, no warning — just a flat line you spot a fortnight later.

Copy the partial up. It takes ten seconds and it's permanent.

## Which folder name

Hugo v0.146.0 reimplemented how templates are found, and `layouts/partials` became `layouts/_partials`. If your project predates that and hasn't been migrated, use whichever folder your project already has — the one your theme is actually reading from. Don't create the other one and wonder why nothing changed.

If there's no head partial at all, the tag goes wherever your `baseof.html` opens `<head>`.

{{< callout title="hugo server won't show you anything" >}}
The dev server runs on `localhost`, and `localhost` is deliberately not counted. That's not a broken install — it's the reason your own work never pollutes your numbers. Verify on the deployed site.
{{< /callout >}}

## Two things Hugo sites get wrong

**`baseURL` in production.** If it's still `http://localhost:1313/` when you build, your canonical URLs and everything derived from them are wrong. That's not a tracking problem — the script reports the browser's real URL either way — but you'll be reading a broken sitemap while you debug the wrong thing.

**Apex and www.** Register the hostname you actually serve. If `www.yourdomain.com` redirects to `yourdomain.com`, register the destination. Traffic arriving on the other one shows up on the ingestion health panel as `hostname_not_allowed`, with a one-click action to allow it.

## Multilingual sites

One tag, one site, one `data-domain`. Language variants are paths — `/de/pricing/` — so they show up as separate rows in your pages report, and the visitor's browser language is a dimension you can filter on. Nothing extra to configure.

## Check it worked

Deploy, open the site in a normal browser window, and click through two or three pages. Then open Feasible.

Real-time visitors should show you. If it doesn't, go to **Site settings → Ingestion health**. It counts every event that arrived and every one that was dropped, each with a named reason — `unknown_site` means `data-domain` doesn't match the site you registered, `hostname_not_allowed` means the page is on a hostname that isn't on your list. The **send a test event** button there posts through the real public URL, so it exercises exactly what a browser does.

A brand-new site takes about fifteen seconds before its first event is accepted, so [give it that](/help/how-long-until-i-see-data/) before changing anything.

Related: [Jekyll](/integrations/jekyll/), [Astro](/integrations/astro/), and the [install docs](/docs/installation/).

Sources: [Hugo — new template system overview](https://gohugo.io/templates/new-templatesystem-overview/), checked September 3, 2026.
