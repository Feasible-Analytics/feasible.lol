---
title: "Add website analytics to SvelteKit"
platform: "SvelteKit"
description: "One script tag in src/app.html, or in a svelte:head block in the root layout. SvelteKit's client-side navigations count themselves."
lede: "src/app.html is the simplest place. The root layout works too."
---

The tag goes in `src/app.html`, inside `<head>`. That file wraps every page SvelteKit renders, server-side and client-side both.

{{< snippet domain="yourdomain.com" >}}

## Steps

1. Open `src/app.html`.
2. Paste the tag inside `<head>`, next to `%sveltekit.head%`.
3. Deploy.

```html
<head>
  <meta charset="utf-8" />
  <link rel="icon" href="%sveltekit.assets%/favicon.png" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <script defer data-domain="yourdomain.com"
          src="https://app.feasible.lol/js/script.js"></script>
  %sveltekit.head%
</head>
```

## Or the root layout

If your project keeps head material in Svelte rather than in `app.html`, use `<svelte:head>` in `src/routes/+layout.svelte`:

```svelte
<svelte:head>
  <script defer data-domain="yourdomain.com"
          src="https://app.feasible.lol/js/script.js"></script>
</svelte:head>
```

Both work. `app.html` is simpler to reason about, because there's exactly one of it.

## The nested-layout trap

SvelteKit lets you have a `+layout.svelte` at any depth. Put the tag in `src/routes/(marketing)/+layout.svelte` and you track the marketing pages and nothing else — the app section reports no visitors at all, which reads as a traffic problem rather than a tracking one.

It belongs in the root: `src/routes/+layout.svelte`, or `src/app.html`. Never in both, or every visit counts twice.

## Navigation is already handled

SvelteKit's client-side router uses `pushState`, and the script listens for `pushState`, `replaceState`, `popstate` and `hashchange`, counting one pageview each. Consecutive changes inside a tick collapse to one event at the final URL, so a `redirect()` in a load function doesn't produce two.

So there's nothing to subscribe to. No `afterNavigate`, no `$page` store effect, no `navigating` watcher. If you add one on top, every number doubles.

{{< callout title="Prerendered pages are fine" >}}
`export const prerender = true` bakes the tag into the static HTML like everything else in `app.html`. Static adapters, edge adapters, Node — same tag, no difference.
{{< /callout >}}

## Custom events

From anywhere that runs in the browser:

```js
window.feasible("Signup", { props: { plan: "annual" } });
```

Guard it with `if (browser)` from `$app/environment` if it might run during SSR.

## Check it worked

Deploy, or run `vite build` and `vite preview` on a real hostname. `localhost` is deliberately not counted, so `npm run dev` shows nothing however correct the tag is.

Open the site, click a link to a second route rather than reloading, and watch the network tab: one `POST` to `/api/event` per route. Then open Feasible.

You should show up under Real-time visitors. If you don't, go to **Site settings → Ingestion health**. It counts every event that arrived and every one that was dropped, each with a named reason — `unknown_site` means `data-domain` doesn't match the site you registered, `hostname_not_allowed` means the page is on a hostname that isn't on your list, which is what a preview deployment URL will do. The **send a test event** button there posts through the real public URL, so it exercises exactly what a browser does.

A brand-new site takes about fifteen seconds before its first event is accepted, so [wait for that](/help/how-long-until-i-see-data/) before assuming the worst.

Related: [Astro](/integrations/astro/), [React](/integrations/react/), the [install docs](/docs/installation/), and [script options](/docs/script-options/).
