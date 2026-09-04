---
title: "Add website analytics to React"
platform: "React"
description: "One script tag in index.html. React Router navigations are counted automatically — no hook, no effect, no provider component."
lede: "It goes in index.html, not in a component. Here's why that matters."
---

The tag goes in `index.html` — the real HTML file your bundler serves — inside `<head>`.

{{< snippet domain="yourdomain.com" >}}

## Steps

**Vite:** `index.html` sits in the project root, next to `package.json`. Paste the tag into `<head>`, above the `<script type="module" src="/src/main.tsx">` line.

**Create React App:** the file is `public/index.html`. Same place, inside `<head>`.

**Anything else:** find the one HTML file your build tool uses as a template. There's always exactly one, and it's the file with `<div id="root"></div>` in it.

Rebuild and deploy. That's the installation.

## Don't do it in a component

The tempting version is a `useEffect` that appends a `<script>` to the head. Don't.

React 18's Strict Mode mounts every component twice in development, so the effect runs twice and you get two script tags. Hot reload runs it again. And a component that only some routes render loads the script only on those routes, so the rest of your site reports zero visitors — which looks like a traffic problem rather than a tracking one.

The HTML file loads once, before React exists, and stays loaded. That's what you want.

## React Router is already handled

The script hooks `pushState`, `replaceState`, `popstate` and `hashchange` when it loads, and reports a pageview on each. Two changes in the same tick collapse into one event at the final URL, so a redirect doesn't count twice.

So there is no `<Analytics />` component to add, no `useLocation()` effect to write, and no listener to register. If you're porting a Google Analytics setup that had one, delete it — leaving it in doubles every number on the site.

{{< callout title="Hash routers need one attribute" >}}
If you're using `createHashRouter` or `HashRouter`, your routes live in the fragment — `/#/settings` — and fragments aren't part of the URL by default. Add `data-hash="true"` to the script tag or every route reports as `/`. Bare `data-hash` with no value does nothing; it needs the value. See [script options](/docs/script-options/).
{{< /callout >}}

## What you get without writing any code

Outbound link clicks, file downloads and form submissions are counted automatically, as goals named `Outbound Link: Click`, `File Download` and `Form: Submission`. Scroll depth and time on page come along too, measured only while the tab is actually visible and focused.

Custom events are one function call when you want them:

```js
window.feasible("Signup", { props: { plan: "annual" } });
```

## Check it worked

Build and deploy, or run a production preview — `localhost` is deliberately not counted, so `npm run dev` will show you nothing no matter how correct the tag is. Open the site, then click a link to a second route rather than reloading. In the network tab you should see one `POST` to `/api/event` per route.

Then open Feasible. Real-time visitors should show you. If it doesn't, go to **Site settings → Ingestion health**. It counts every event that arrived and every one that was dropped, each with a named reason — `unknown_site` means `data-domain` doesn't match the site you registered, `hostname_not_allowed` means the page is on a hostname that isn't on your list, which is what a preview deployment URL will do. The **send a test event** button there posts through the real public URL, so it exercises exactly what a browser does.

A brand-new site takes about fifteen seconds before its first event is accepted. [That's expected](/help/how-long-until-i-see-data/).

Same file, different framework: [Vue](/integrations/vue/) and [SvelteKit](/integrations/svelte/). Server-rendered React is [Next.js](/integrations/nextjs/). The general case is in the [install docs](/docs/installation/).
