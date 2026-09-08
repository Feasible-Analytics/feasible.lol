---
title: "Integrations"
description: "WordPress, Shopify, Next.js, Nuxt, Astro, Webflow, Squarespace and Tag Manager - plus the one step each platform hides."
lede: "WordPress, Shopify, the frameworks, and why we'd rather you didn't use a tag manager."
weight: 20
---

The tracker is a script tag, so anything that lets you add one is supported. What follows is the list
people ask about, and the one step each platform hides. The setup screen inside the product carries
the same instructions with your own snippet already filled in.

## WordPress

There's a plugin, **feasible.lol Analytics**. It does more than paste the snippet: it serves the
script and the events endpoint from your own domain on randomized paths, which is the part that
survives ad blockers, and it adds the two measurements a theme can't give you - site-search
terms and 404s.

Install it, then *feasible.lol → Settings*, enter your domain as registered, and save.
Everything else has a working default.

Without the plugin, paste the snippet into your theme's `header.php` before `</head>`, or into any
header-scripts plugin.

{{< callout title="Use a child theme" >}}
A snippet pasted into a parent theme is erased by the next theme update, and the traffic stops with
no warning. Use a child theme or a plugin.

Don't add the tag to a caching plugin's "defer JavaScript" list either. It's already deferred, and
deferring it twice can lose the first pageview of a session.
{{< /callout >}}

## Shopify

*Online Store → Themes → ⋯ → Edit code*, open `layout/theme.liquid` and paste the snippet before
`</head>`. Check on the live storefront, not the editor.

On most plans the checkout is a separate surface that won't include your theme's code, so checkout
pages won't appear in your pages report.

## Next.js

App router: the tag goes in `app/layout.tsx`, inside `<head>`. Pages router: `pages/_document.tsx`,
inside `<Head>`. `next/script` with `strategy="afterInteractive"` works too.

What doesn't work is a client component that only renders on some routes. You lose every page it
doesn't render on, and the report looks like those pages have no traffic rather than no tracking.

## Nuxt

`nuxt.config.ts`, under `app.head.script`, with `defer: true`.

Nuxt renders the head on the server, so the tag is already in the initial HTML. Don't *also* add it
with `useHead` on a page, or every pageview gets counted twice.

## Astro

The layout every page uses, usually `src/layouts/Layout.astro`, inside `<head>`.

Astro processes `<script>` tags it decides to own. Keeping the `src` attribute and adding `is:inline`
is the form that reliably survives a build.

## React, Vue, SvelteKit and other single-page apps

One snippet in the root document. The script listens for history changes itself, so there's nothing to
call on navigation.

## npm, for a framework that hates raw script tags

Install `@feasible/tracker` and call `init` once:

```
import { init, track } from "@feasible/tracker";

init({ domain: "example.com" });
await track("Signup", { props: { plan: "annual" } });
```

It doesn't bundle the tracker - it loads the same file from the same host. What it adds is the things
a hand-rolled tag gets wrong in a modern app: it's safe to import in a server render and does nothing
there, it installs the queue stub synchronously so an event fired during hydration is replayed rather
than throwing, `init` is idempotent so a hot reload can't double-count, and `track` always settles
rather than hanging forever when a blocker eats the request.

## Webflow, Squarespace, Framer, Ghost

Each has a custom-code or code-injection field in site settings; the head section is the right one.
Three things to know:

- **Webflow** custom code needs a paid site plan. On a free `.webflow.io` site the field saves and
  nothing is ever published.
- **Squarespace** code injection needs a Core, Plus or Advanced plan (or some legacy billing plans) and doesn't run in the editor. Check
  in a private window on the live site.
- **Framer** and **Ghost** custom code runs only on the published site, never in the canvas or
  preview. Ghost's own portal and checkout overlays render on a different origin and aren't covered.

## Google Tag Manager

There's a tag template. It isn't in Google's gallery yet, so you import the file:
*Templates → Tag Templates → New → Import*, and pick `template.tpl` from
[the repository](https://github.com/Feasible-Analytics/app.feasible.lol) under `ecosystem/`.

It gives you two tag types. One loads the script, with fields for the domain, the host, hash routing,
manual pageviews and counting localhost. The other sends an event, with a table for properties and
fields for a revenue amount and currency.

A Custom HTML tag with the plain snippet on an *All Pages* trigger also works. Use the `data-domain`
form there rather than the per-site path - tag managers rewrite opaque paths.

We'd still rather you didn't. A tag manager is itself among the most-blocked scripts on the web, so
loading us through it turns one blockable request into two, and the one you added is the one more
likely to be blocked.

## Looker Studio

There's a community connector that reads the query API. You deploy it into your own Apps Script
project - it isn't in Google's gallery - and connect it with an API key carrying `stats:read` and
`sites:read`.

It exposes 23 dimensions and 11 metrics, pushes equality and contains filters down to us, and caches
for five minutes. A chart with two dimensions isn't supported and says so, rather than returning a
number that looks right and isn't. Details on [SDKs and plugins](/docs/sdks/).

## Anything without a browser

Mobile apps, background jobs, offline conversions: post to the events endpoint, or use one of the
five server-side SDKs. See [SDKs and plugins](/docs/sdks/).

There are no mobile SDKs yet - iOS, Android and React Native are scoped and not built. Post to the
endpoint directly in the meantime.

## Visitors with JavaScript disabled

A no-script pixel is available and runs through the identical pipeline. The snippet and its two
limitations are on the [installation](/docs/installation/) page.
