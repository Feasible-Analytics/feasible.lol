---
title: "Installation"
description: "One script tag on every page you want counted, and four ways to tell whether it's working."
lede: "One script tag, and how to tell whether it's working."
weight: 10
---

One script tag, on every page you want counted. No build step, no consent gate to wire up first.

{{< snippet domain="example.com" >}}

That's 3,377 bytes gzipped, and it's deferred, so it never blocks rendering.

There are no cookies and nothing stored in the browser to identify anyone, which is why most sites
won't need a consent banner for it. [Privacy and GDPR](/docs/privacy/) has the facts to hand your
lawyer - and if you're somewhere strict, ask them rather than us.

`data-domain` has to match the site as you registered it. It's how an event gets routed to
your account, and an event for a domain we don't hold is dropped with the reason `unknown_site`.

## The per-site script path

Every site also gets its own script URL, which is what the setup screen hands you:

```
<script defer src="https://app.feasible.lol/js/fs-k7m2q4x5r3n6t2v5.js"></script>
```

It carries your domain inside the file, so there's no attribute to get wrong, and the filename is
different for every site. That last part matters. Blocklists name files one at a time, so a shared
filename that gets listed costs everybody their traffic, while a per-site one costs one site.

Both forms behave identically. Use the attribute form if you're migrating an existing install and
would rather change one hostname than every tag, or if a tag manager is going to mangle an opaque
path.

{{< callout title="Not an ad-blocker escape" >}}
Randomized paths raise the cost of blocking us. They don't end the game. If blockers are your real
problem, [proxy the script through your own domain](/docs/proxying/) - that's the thing that works.
{{< /callout >}}

## Where to put it

Anywhere in `<head>` or `<body>`.

Which field that is depends on the platform. On a hosted site it's a
code-injection box: [WordPress](/integrations/wordpress/),
[Shopify](/integrations/shopify/), [Webflow](/integrations/webflow/),
[Squarespace](/integrations/squarespace/), [Ghost](/integrations/ghost/),
[Wix](/integrations/wix/) and [Framer](/integrations/framer/). On a framework it's
a template or a head component: [Next.js](/integrations/nextjs/),
[Nuxt](/integrations/nuxt/), [Astro](/integrations/astro/),
[React](/integrations/react/), [Vue](/integrations/vue/),
[Svelte](/integrations/svelte/), [Gatsby](/integrations/gatsby/),
[Hugo](/integrations/hugo/), [Jekyll](/integrations/jekyll/),
[Django](/integrations/django/) and [Laravel](/integrations/laravel/). Each guide
names the exact field and the one thing that platform hides.

If your site is a single-page app, the script picks up route changes on its own - `pushState`,
`replaceState`, back and forward, and hash changes. So don't also fire a pageview on navigation, or
every route change gets counted twice.

## A new site takes a few seconds to start collecting

Ingestion learns which domains exist by polling, so a site you registered a moment ago can take up to
about fifteen seconds before its first event is accepted.

If you paste the snippet, reload immediately and see nothing, wait a quarter of a minute before
concluding anything is wrong. The setup screen waits for you and says when the first event lands.

{{< shot src="app/install.png" alt="The Feasible install screen, waiting for a first event" >}}

## Checking it works

The setup screen has an install check that fetches one of your pages and tells you which of the four
real failures you have: the snippet isn't there, it names a different site, it's there but your
content security policy won't let the browser load it, or the page didn't load at all.

To check by hand, send one event and read the response:

```
curl -si https://app.feasible.lol/api/event \
  -H 'Content-Type: application/json' \
  -d '{"n":"pageview","d":"example.com","u":"https://example.com/"}' \
  | grep -i x-feasible-dropped
```

The endpoint always answers `202`. A beacon can't act on an error code, so a rejection would only
produce a retry that fails the same way. The reason an event wasn't counted travels in the
`x-feasible-dropped` response header instead, and nothing is ever dropped without one.

For the whole picture, add `X-Debug-Request: true` and the response is the fully derived event
instead: which address we resolved and where from, the visitor identifier, the geolocation, the
channel, and every field we'd have stored. Nothing is written, so it's safe to run against
production. See [the APIs](/docs/api/).

Once traffic is flowing, the ingestion health panel at
`/settings/sites/<your domain>/health` counts every accepted event and every dropped one, with a
named reason for each drop.

{{< shot src="app/health.png" alt="The ingestion health panel, showing accepted and dropped events by reason" >}}

## Multiple domains

Give each site its own snippet with its own `data-domain`.

A staging copy pointed at your production domain mixes staging traffic into your real numbers, and
there's no way to unpick it afterwards. Register a separate site, or
[exclude the hostname](/docs/shields/).

Subdomains are a different case. `app.example.com` and `example.com` share a visitor identifier by
design, so a person moving between them is one visitor rather than two.

## Visitors with JavaScript disabled

A no-script pixel goes through the identical pipeline - same derivation, same session rules, same
storage:

```
<noscript>
  <img src="https://app.feasible.lol/api/event/pixel.gif?d=example.com" alt="" width="1" height="1">
</noscript>
```

It takes the page URL from the browser's own `Referer` header, which is what makes it a one-liner you
can paste into a template. The consequence is that the real referrer is unknowable - a no-script
visitor is Direct unless you add `&r=…` yourself. It also can't measure time on page or scroll depth,
because nothing is running to measure them.

## Server-side events

Anything that happens away from a browser - a webhook, a background job, an offline conversion - can
be posted straight to the events endpoint, or sent with one of the
[server-side SDKs](/docs/sdks/).

See [the APIs](/docs/api/) for the payload, including how to state the attribution for an event that
has no referrer of its own.

## If nothing arrives at all

- A `data-domain` that doesn't match a registered site.
- An ad blocker. See [proxying](/docs/proxying/).
- A content security policy that allows our origin in `script-src` but not in `connect-src`. The
  script loads and then silently sends nothing, which is the hardest version of this to spot.
- You're on `localhost`. That's deliberate; see [script options](/docs/script-options/).
- A [shield](/docs/shields/) of your own is excluding the traffic - your address, your country, that
  page, or a hostname allow-list that doesn't include this one.
