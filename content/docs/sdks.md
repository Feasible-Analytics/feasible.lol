---
title: "SDKs and plugins"
description: "Five dependency-free server-side SDKs, an npm browser loader, a WordPress plugin, a GTM template and a Looker Studio connector."
lede: "Five server-side SDKs, an npm loader, WordPress, Tag Manager and Looker Studio."
weight: 140
---

Five server-side SDKs, a browser loader, a WordPress plugin, a Tag Manager template and a Looker
Studio connector.

The source for every one of them is in the product's
[repository](https://github.com/Feasible-Analytics/app.feasible.lol) under `ecosystem/`, each with
its own README and its own tests. If your package manager doesn't have one yet, that's where to get
it.

## The server-side SDKs

They exist for events that happen away from a browser: a payment webhook, a background job, an
offline conversion, an API-only product with no pages at all.

All five are deliberately dependency-free. Nothing in this list pulls an HTTP library into your
application.

| Language | Install |
|---|---|
| Go | `go get github.com/Feasible-Analytics/feasible-go` |
| Node | `npm install @feasible/node` |
| PHP | `composer require feasible/feasible-php` |
| Python | `pip install feasible` |
| Ruby | `gem "feasible"` |

```
// Go
client, _ := feasible.New(feasible.Options{Domain: "example.com"})
client.Pageview(ctx, feasible.FromRequest(r), "https://example.com/pricing")
client.Track(ctx, feasible.FromRequest(r), "Signup", "https://example.com/signup")
```

```
// Node
const analytics = createClient({ domain: "example.com" });
await analytics.pageview({ url: "https://example.com/pricing", ...visitorFromNodeRequest(req) });
await analytics.track("Signup", { url: "…", ...visitorFromNodeRequest(req) });
```

```
# Python
client  = Client(domain="example.com")
visitor = Visitor.from_request(headers=request.headers, remote_addr=request.remote_addr)
client.pageview(url="https://example.com/pricing", **visitor.as_kwargs())
client.event("Signup", url="…", **visitor.as_kwargs())
```

```
# Ruby
client  = Feasible.client(domain: "example.com")
visitor = Feasible::Visitor.from_request(request.env)
client.pageview(url: request.url, **visitor.to_h)
```

```
// PHP
$client  = new Client(domain: 'example.com');
$visitor = Visitor::fromRequest();
$client->pageview(...$visitor->args(), url: 'https://example.com/pricing');
```

### The visitor's address and user agent aren't optional

Every one of these makes them required arguments rather than something you can forget.

Without them, every server-side event is geolocated to your data centre and shares one visitor
identifier — one visitor, from one country, forever — and there's no way to repair that afterwards.
Making it a compile error is the point.

Each SDK has a helper that pulls both off an incoming application request. Unlike the ingest service,
an SDK helper has no trusted-proxy list; it assumes your application edge has already stripped
client-supplied forwarding headers and written its own. It takes `CF-Connecting-IP`, then the first
entry of `X-Forwarded-For`, then the socket address.

Don't use that helper on a directly exposed app that accepts those headers from clients. Build the
visitor from the socket address instead.

### Attribution

An event with no browser has no referrer, so state it. `referrer`, `utm_source`, `utm_medium`,
`utm_campaign`, `utm_content` and `utm_term` are all fields on the event. Left out, the visit is
Direct. See [the APIs](/docs/api/#stating-attribution-for-a-server-side-event).

### Shared behaviour

- **Defaults**: a five-second timeout and three attempts with exponential backoff. All of it is
  configurable in the constructor.
- **A test mode that records instead of sending.** Construct with `disabled`, or set
  `FEASIBLE_DISABLED=1`, and every event is kept in memory where your test can assert on it. An
  explicit `false` in code beats the environment variable, so a test suite can't be silenced by a
  stray variable on a build machine.
- **The drop reason comes back.** Each call returns the result, including the `x-feasible-dropped`
  header if there was one, so a job can log why an event didn't count instead of assuming it did.
- **A debug call** that returns the fully derived event without writing anything.

There are no mobile SDKs. iOS, Android and React Native are scoped and not built — post to
[the events endpoint](/docs/api/#sending-events) directly.

## @feasible/tracker — the browser loader

```
npm install @feasible/tracker
```

```
import { init, track } from "@feasible/tracker";
init({ domain: "example.com" });
await track("Signup", { props: { plan: "annual" } });
```

It loads the same script from the same host rather than bundling it, so you're never running a stale
copy.

What it adds is everything a hand-rolled tag gets wrong in a modern framework: it touches no browser
global at module scope, so importing it in a server render is safe and does nothing; it installs the
queue stub synchronously, so an event fired during hydration is replayed instead of throwing; `init`
is idempotent, so a hot reload can't double-count pageviews; and `track` always settles rather than
hanging forever when a blocker eats the request.

`enable()`, `disable()` and `isEnabled()` drive the per-browser opt-out, and tell you whether the
write actually happened.

## WordPress

The plugin serves the script and the events endpoint from your own domain on randomised paths, which
is what actually gets past ad blockers, and adds the site-search and 404 tracking a theme snippet
can't do.

Settings, proxy routes, path rotation and an embedded dashboard all live under one *feasible.lol*
menu. See [integrations](/docs/integrations/).

## Google Tag Manager

A tag template with two tag types — load the script, or send an event — and fields for the domain,
host, hash routing, manual pageviews, counting localhost, a properties table and a revenue amount and
currency.

It isn't in Google's gallery yet, so import `template.tpl` yourself under
*Templates → Tag Templates → New → Import*.

The template declares permission to inject a script from one host only. If you proxy through your own
domain, edit that permission in your own copy.

## Looker Studio

A community connector you deploy into your own Apps Script project with `clasp`, then open through a
`datasources/create?connectorId=…` link. It isn't in Google's gallery.

It authenticates with an API key carrying `stats:read` and `sites:read`. Self-hosters paste their
host and key separated by a space.

It exposes 23 dimensions and 11 metrics, and pushes equality and contains filters down to us so the
work happens here rather than in your browser. Results are cached for five minutes, thirty seconds
for realtime, and errors are never cached.

A chart with two dimensions isn't supported and says so, rather than returning a number that looks
right and isn't.
