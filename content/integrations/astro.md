---
title: "Add website analytics to Astro"
platform: "Astro"
description: "One script tag in your shared layout, with is:inline so Astro leaves it alone. Works with static output, SSR and view transitions."
lede: "src/layouts/Layout.astro, in the head, with is:inline."
---

The tag goes in the layout every page uses - usually `src/layouts/Layout.astro` - inside `<head>`, with `is:inline` on it.

```astro
<head>
  <meta charset="utf-8" />
  <title>{title}</title>
  <script is:inline defer data-domain="yourdomain.com"
          src="https://app.feasible.lol/js/script.js"></script>
</head>
```

Which is the same tag as everywhere else:

{{< snippet domain="yourdomain.com" >}}

## Why is:inline

Astro takes ownership of `<script>` tags it finds in components - bundling them, moving them, processing them through Vite. `is:inline` tells it to leave this one as written, with its `src` and its `data-domain` intact, in the place you put it.

Without it, the tag may still work, and may not survive the next build. `is:inline` is the form that's reliably still there in the output HTML.

## Steps

1. Open the layout every page wraps itself in. In a fresh Astro project that's `src/layouts/Layout.astro`.
2. Paste the tag inside `<head>`.
3. Check that every page uses that layout. Astro doesn't enforce it - a page that imports a different layout, or none, won't have the tag.
4. Build and deploy.

Content collections add one trap. If your blog posts render through `src/layouts/BlogPost.astro` and that layout doesn't wrap the base one, your posts aren't tracked and your blog reports zero traffic.

## View transitions

If you use Astro's `<ClientRouter />`, page changes happen client-side. The script listens for `pushState`, `replaceState`, `popstate` and `hashchange` and counts one pageview per change, with consecutive changes in a tick collapsing to one event.

That should be all it takes - but this is the one thing on this page worth verifying rather than trusting. Open the network tab on the deployed site, click through three pages, and count the `POST` requests to `/api/event`. One per page is right. Three per page means something is re-executing the script; none after the first means navigation isn't reaching the history API.

{{< callout title="Static or server, it doesn't matter" >}}
`output: "static"` bakes the tag into every generated HTML file. `output: "server"` renders it on each request. Islands, partial hydration, whatever else you're doing - the tag sits in the document head and is unaffected by all of it.
{{< /callout >}}

## Custom events

Anywhere client-side:

```js
window.feasible("Signup", { props: { plan: "annual" } });
```

## Check it worked

Deploy, or run `astro build` and `astro preview` on a real hostname. `localhost` is not counted, so `astro dev` shows nothing however correct the tag is.

Open the site, click through two or three pages using its own links, then open Feasible.

You should show up under Real-time visitors. If you don't, go to **Site settings → Ingestion health**. It counts every event that arrived and every one that was dropped, each with a named reason - `unknown_site` means `data-domain` doesn't match the site you registered, `hostname_not_allowed` means the page is on a hostname that isn't on your list, which is what a preview deployment URL will do.

The **send a test event** button there posts through the real public URL, so it exercises what a browser does.

A brand-new site takes about fifteen seconds before its first event is accepted. [That's expected](/help/how-long-until-i-see-data/), not a bug.

Related: [SvelteKit](/integrations/svelte/), [Hugo](/integrations/hugo/), the [install docs](/docs/installation/), and [script options](/docs/script-options/).
