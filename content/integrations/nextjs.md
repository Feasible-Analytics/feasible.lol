---
title: "Add website analytics to Next.js"
platform: "Next.js"
description: "One snippet in the App Router's root layout, or pages/_document.tsx on the Pages Router. Client-side route changes are counted automatically."
lede: "app/layout.tsx on the App Router. pages/_document.tsx on the Pages Router."
---

The tag goes in your root layout - `app/layout.tsx` - so it loads once for every route in the application.

{{< snippet >}}

## App Router

Use `next/script` in the root layout:

```tsx
import Script from "next/script";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
      <Script src="https://app.feasible.lol/js/fs-k7m2q4x5r3n6t2v5.js" />
    </html>
  );
}
```

There's no `defer` attribute because `next/script` handles that for you. The default `strategy` is `afterInteractive`, which is what you want. Next.js loads the script once and keeps it loaded across client-side navigations, which is the behavior our route tracking depends on.

## Pages Router

`pages/_document.tsx`, inside `<Head>`:

```tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script defer src="https://app.feasible.lol/js/fs-k7m2q4x5r3n6t2v5.js" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

## Don't put it in a page component

This is the Next.js mistake, and it's a quiet one.

A `<Script>` inside a page, or inside a client component that only some routes render, loads only on the routes that render it. Every other page reports zero traffic. The report doesn't say "not tracked" - it says "no visitors", which reads as a content problem and sends you off optimizing a page that was fine.

Root layout. Once.

## Don't fire your own pageview on route change

The script listens for `pushState`, `replaceState`, `popstate` and `hashchange` itself, and consecutive changes within a tick collapse to one pageview at the final URL.

So a `useEffect` on `usePathname()` that calls `feasible("pageview")` doesn't fix anything. It doubles everything. If you've inherited that pattern from a Google Analytics setup, delete it.

{{< callout title="Ad blockers and Next.js" >}}
Next.js audiences skew technical, which means they skew blocked. If that matters to you, [serve the script from your own domain](/docs/proxying/) with a rewrite in `next.config.js` and point `data-api` at the same path. It's about six lines and it's the thing that works.
{{< /callout >}}

## Check it worked

Deploy - or run a production build locally, because `localhost` is not counted. Open the site, then click a link to a second route rather than reloading. Watch the network tab: you should see one `POST` to `/api/event` on load and one more per navigation.

Then open Feasible. You should show up under Real-time visitors. If you don't, go to **Site settings → Ingestion health**. It counts every event that arrived and every one that was dropped, each with a named reason - `unknown_site` means the snippet is for a site you haven't registered, `hostname_not_allowed` means the page is on a hostname that isn't on your list, which is what a Vercel preview URL will do.

The **send a test event** button there posts through the real public URL, so it exercises what a browser does.

A brand-new site takes about fifteen seconds before its first event is accepted, so [give it that](/help/how-long-until-i-see-data/).

Same story on [React](/integrations/react/) and [Astro](/integrations/astro/). The general case is in the [install docs](/docs/installation/), and every `data-` attribute is in [script options](/docs/script-options/).
