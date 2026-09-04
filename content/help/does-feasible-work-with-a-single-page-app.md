---
title: "Does it work with a single-page app?"
description: "Yes, with no configuration. Route changes are tracked automatically — React, Vue, Svelte, Next, Nuxt, Astro, all of it."
category: "installing"
weight: 30
---

Yes, and there's nothing to switch on.

The script listens for `pushState`, `replaceState`, `popstate` and `hashchange`, and records a pageview when the route changes. Drop the standard tag in your app shell and client-side navigation counts the same as a full page load.

{{< snippet domain="example.com" >}}

There's no `script.spa.js` variant to choose, no router integration to install, and no `trackPageview()` you have to remember to call on every route. It works out of the box in React, Vue, Svelte, Angular, Next.js, Nuxt, SvelteKit, Astro and anything else that drives the History API.

Two behaviors worth knowing about:

**Rapid consecutive route changes collapse into one pageview at the final URL.** A router that redirects `/` → `/dashboard` → `/dashboard/overview` in a single tick records one pageview, for the page the visitor actually landed on. That kills the phantom-pageview problem that makes SPA reports untrustworthy.

**Back-forward cache restores are handled.** When somebody hits back and the browser restores the page from bfcache, that's a pageview, with the referrer corrected.

If your app uses hash routing — `/#/settings` — add `data-hash="true"` to the tag, since the fragment isn't part of the URL otherwise. Note the value: a bare `data-hash` with nothing after it does nothing at all.

If you'd rather drive it yourself, `data-manual="true"` suppresses the automatic pageview and the history listeners, and you call `feasible('pageview')` where you want it. Most people shouldn't; the automatic behavior is right far more often than hand-rolled routing hooks are.

Framework-specific instructions live in [integrations](/integrations/), and every attribute is listed in the [script options](/docs/script-options/).
