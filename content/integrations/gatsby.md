---
title: "Add website analytics to Gatsby"
platform: "Gatsby"
description: "Add the script through onRenderBody in gatsby-ssr.js so it lands in the head of every page. Gatsby Link navigations count automatically."
lede: "gatsby-ssr.js, using onRenderBody. That's the site-wide one."
---

The tag goes in `gatsby-ssr.js`, in the project root, through `onRenderBody`. That's the API that puts something in the head of every page Gatsby builds.

{{< snippet domain="yourdomain.com" >}}

## Steps

1. Create `gatsby-ssr.js` in your project root if it isn't there already.
2. Add this:

```jsx
import React from "react";

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script
      key="feasible"
      defer
      data-domain="yourdomain.com"
      src="https://app.feasible.lol/js/script.js"
    />,
  ]);
};
```

3. Restart the dev server. Gatsby reads `gatsby-ssr.js` at startup and won't pick up an edit while it's running.
4. Build and deploy.

The `key` isn't decoration — React needs it on every element in an array, and Gatsby will warn at build time if it's missing.

## Not the Head API

Gatsby's `Head` export looks like the obvious place, and it isn't. Gatsby's own documentation is explicit: "You can only define the `Head` export inside a page (that includes templates for createPage), not in a component." So `Head` is per-page. Using it means adding the tag to every page and template you own, and forgetting one the moment somebody adds a page.

It also says data-block scripts belong there but "dynamic scripts are better loaded with the Gatsby Script Component". Neither of those is what you want for one tag on every page. `onRenderBody` is.

## Gatsby Link is already handled

Gatsby's `<Link>` navigates client-side through `pushState`. The script listens for `pushState`, `replaceState`, `popstate` and `hashchange`, and reports one pageview each. Consecutive changes inside one tick collapse to a single event at the final URL, so a redirect doesn't count twice.

So there's nothing to add to `onRouteUpdate` in `gatsby-browser.js`. If you've inherited that pattern from a Google Analytics plugin, take it out — leaving it doubles every number on the site.

{{< callout title="gatsby develop won't show you anything" >}}
`localhost` is deliberately not counted, so the dev server is the one place you can't verify this. Run `gatsby build && gatsby serve` behind a real hostname, or check the deployed site. Don't spend an hour debugging a config that's already correct.
{{< /callout >}}

## Custom events

Anywhere in the browser:

```js
window.feasible("Signup", { props: { plan: "annual" } });
```

## Check it worked

Deploy, open the site in a normal browser window, and click through two or three pages using Gatsby's own links. Watch the network tab: one `POST` to `/api/event` on load, one more per navigation.

Then open Feasible. Real-time visitors should show you. If it doesn't, go to **Site settings → Ingestion health**. It counts every event that arrived and every one that was dropped, each with a named reason — `unknown_site` means `data-domain` doesn't match the site you registered, `hostname_not_allowed` means the page is on a hostname that isn't on your list, which is what a preview deployment URL will do. The **send a test event** button there posts through the real public URL, so it exercises exactly what a browser does.

A brand-new site takes about fifteen seconds before its first event is accepted, so [wait that out](/help/how-long-until-i-see-data/) before you go looking for a cause.

Related: [React](/integrations/react/), [Next.js](/integrations/nextjs/), the [install docs](/docs/installation/), and [script options](/docs/script-options/).

Sources: [Gatsby — Gatsby Head API](https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/), checked September 3, 2026.
