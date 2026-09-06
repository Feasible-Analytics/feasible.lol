---
title: "Add website analytics to Nuxt"
platform: "Nuxt"
description: "Add the script once in nuxt.config.ts under app.head.script. Server-rendered into the initial HTML, and route changes count themselves."
lede: "nuxt.config.ts, under app.head.script. One place, every page."
---

The tag goes in `nuxt.config.ts`, under `app.head.script`. Nuxt renders the head on the server, so it's in the HTML the browser receives first.

```ts
export default defineNuxtConfig({
  app: {
    head: {
      script: [
        {
          src: "https://app.feasible.lol/js/fs-k7m2q4x5r3n6t2v5.js",
          defer: true,
        },
      ],
    },
  },
});
```

Which produces this:

{{< snippet >}}

## Steps

1. Open `nuxt.config.ts`.
2. Add the `app.head.script` entry above, with your own script filename.
3. Restart the dev server so the config reloads, then deploy.

The filename is the one your setup screen shows, and it carries the domain inside the file. A snippet for a site you haven't registered is dropped with the reason `unknown_site`, which the ingestion health panel names for you.

## Don't also add it with useHead

This is the Nuxt one.

`useHead()` in a page or layout appends to the head at runtime, on top of what `nuxt.config.ts` already put there. Two tags, two scripts, two pageviews per visit. Every number on the site doubles.

Pick the config. It's declared once, it's server-rendered, and it can't accidentally end up scoped to one layout.

## Route changes are already counted

Vue Router's client-side navigations fire `pushState`, and the script listens for that - along with `replaceState`, `popstate` and `hashchange` - and counts one pageview each. Two changes in one tick collapse to a single event at the final URL, so a middleware redirect doesn't count twice.

So there's nothing to write in a `router.afterEach()` or a `page:finish` hook. Adding one doubles your numbers.

{{< callout title="SSR and the first pageview" >}}
Because the tag is in the server-rendered HTML, it's present before hydration and the first pageview fires without waiting for your bundle. That's the reason to prefer the config over any runtime approach - a visitor who reads one page and leaves still gets counted.
{{< /callout >}}

## Custom events

Anywhere in a client-side context:

```js
window.feasible("Signup", { props: { plan: "annual" } });
```

Wrap it in `if (import.meta.client)` or call it from an event handler. On the server `window` doesn't exist, and Nuxt will tell you so at build time.

## Check it worked

Deploy, or run `nuxt build` and `nuxt preview` on a real hostname. `localhost` is not counted, so `nuxt dev` shows nothing no matter how correct the config is.

Open the site, click a link to a second route rather than reloading, and watch the network tab: one `POST` to `/api/event` on load, one more per navigation. Then open Feasible.

You should show up under Real-time visitors. If you don't, go to **Site settings → Ingestion health**. It counts every event that arrived and every one that was dropped, each with a named reason - `unknown_site` means the snippet is for a site you haven't registered, `hostname_not_allowed` means the page is on a hostname that isn't on your list, which is what a preview deployment URL will do.

The **send a test event** button there posts through the real public URL, so it exercises what a browser does.

A brand-new site takes about fifteen seconds before its first event is accepted. [Give it that](/help/how-long-until-i-see-data/) before you change anything.

Related: [Vue](/integrations/vue/), [Next.js](/integrations/nextjs/), the [install docs](/docs/installation/), and [script options](/docs/script-options/) for every attribute the tag understands.
