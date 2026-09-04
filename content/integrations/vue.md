---
title: "Add website analytics to Vue"
platform: "Vue"
description: "One script tag in index.html. Vue Router navigations count automatically — unless you use hash mode, which needs one extra attribute."
lede: "index.html, in the head. Hash-mode routers need one more attribute."
---

The tag goes in `index.html`, in `<head>` — the HTML file Vite serves, not a component.

{{< snippet domain="yourdomain.com" >}}

## Steps

1. Open `index.html` in your project root, next to `package.json`.
2. Paste the tag inside `<head>`, above the `<script type="module" src="/src/main.ts">` line.
3. Rebuild and deploy.

On a Vue CLI project the file is `public/index.html` instead. Same place inside it.

Nuxt is different — the tag goes in `nuxt.config.ts`. See [the Nuxt guide](/integrations/nuxt/).

## Hash mode is the Vue gotcha

If your router is built with `createWebHashHistory()`, every route lives in the fragment:

```
https://yourdomain.com/#/pricing
https://yourdomain.com/#/about
```

Fragments aren't part of the reported URL by default, so every one of those pages reports as `/`. Your top-pages report becomes a single row and your best-performing page is unknowable.

Fix it with one attribute:

```html
<script defer data-domain="yourdomain.com" data-hash="true"
        src="https://app.feasible.lol/js/script.js"></script>
```

A bare `data-hash` does nothing — it needs a value. Any non-empty value counts as on, including the string `"false"`, which is a trap worth knowing about. [Script options](/docs/script-options/) has the full list.

If you're on `createWebHistory()` — real paths, no `#` — ignore all of this. It just works.

## Don't add it in a component or a router guard

The script listens for `pushState`, `replaceState`, `popstate` and `hashchange` itself, and counts one pageview per route change. Two changes in the same tick collapse to one event at the final URL, so a navigation guard that redirects doesn't count twice.

So there's nothing to put in `router.afterEach()`. If you add a manual pageview call there on top of the automatic one, every number on the site doubles — and a doubled number is worse than no number, because you'll believe it.

{{< callout title="What comes for free" >}}
Outbound link clicks, file downloads and form submissions are counted automatically as goals. So is scroll depth, and time on page — accrued only while the tab is visible and focused, so a tab left open in the background doesn't inflate your engagement.
{{< /callout >}}

## Custom events

One call, from anywhere in your app:

```js
window.feasible("Signup", { props: { plan: "annual" } });
```

Properties are allow-listed per site before they show up in reports, and values that didn't carry the property land in a labeled `(none)` bucket rather than vanishing. See [custom properties](/docs/custom-properties/).

## Check it worked

Build and deploy, or run a production preview. `localhost` is deliberately not counted, so `npm run dev` shows nothing however correct your tag is.

Open the site, click a link to a second route rather than reloading, and watch the network tab for one `POST` to `/api/event` per route. Then open Feasible.

You should show up under Real-time visitors. If you don't, go to **Site settings → Ingestion health**. It counts every event that arrived and every one that was dropped, each with a named reason — `unknown_site` means `data-domain` doesn't match the site you registered, `hostname_not_allowed` means the page is on a hostname that isn't on your list.

The **send a test event** button there posts through the real public URL, so it exercises exactly what a browser does.

A brand-new site takes about fifteen seconds before its first event is accepted, so [wait that out first](/help/how-long-until-i-see-data/).

Related: [Nuxt](/integrations/nuxt/), [React](/integrations/react/), and the [install docs](/docs/installation/).
