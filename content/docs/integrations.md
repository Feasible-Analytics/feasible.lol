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

Paste the snippet with a header-scripts plugin such as WPCode (*Code Snippets → Header & Footer*,
the **Header** box), or into your child theme's `header.php` before `</head>`.
[Step by step](/integrations/wordpress/). Our own plugin isn't in the WordPress directory yet.

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

## npm

Our npm loader, `@feasible/tracker`, isn't published yet. You don't need it: every framework above
takes the script tag in its root layout, and the script follows client-side navigation itself.

To send an event from your own code, call `window.feasible()` in the browser. The snippet's first
line is a queue stub, so a call made before the script has loaded is kept and replayed rather than
throwing:

```
window.feasible("Signup", { props: { plan: "annual" } });
```

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

A Custom HTML tag with the plain snippet on an *All Pages* trigger works. Use the `data-domain`
form there rather than the per-site path - tag managers rewrite opaque paths.

There's also a tag template, with one tag type that loads the script and one that sends an event. It
isn't in Google's gallery yet, so you import the file yourself.
[How](/docs/sdks/#google-tag-manager).

We'd still rather you didn't. A tag manager is itself among the most-blocked scripts on the web, so
loading us through it turns one blockable request into two, and the one you added is the one more
likely to be blocked.

## Looker Studio

There's a community connector that reads the query API. You deploy it into your own Apps Script
project from `ecosystem/looker-studio-connector/` in
[the repository](https://github.com/Feasible-Analytics/app.feasible.lol) - it isn't in Google's
gallery - and connect it with an API key carrying `stats:read` and `sites:read`.

It exposes 23 dimensions and 11 metrics, pushes equality and contains filters down to us, and caches
for five minutes. A chart with two dimensions isn't supported and says so, rather than returning a
number that looks right and isn't. Details on [SDKs and plugins](/docs/sdks/).

## Anything without a browser

Mobile apps, background jobs, offline conversions: post to the [events endpoint](/docs/api/#sending-events).
In Go, use the [Go SDK](/docs/sdks/#go). Our other server-side SDKs aren't published yet.

There are no mobile SDKs yet - iOS, Android and React Native are scoped and not built. Post to the
endpoint directly in the meantime.

## Visitors with JavaScript disabled

A no-script pixel is available and runs through the identical pipeline. The snippet and its two
limitations are on the [installation](/docs/installation/) page.
