---
title: "Proxying"
description: "Serve the tracking script and the events endpoint from your own domain, with working Caddy and nginx configs."
lede: "Serving the script from your own domain, and the one thing to get right."
weight: 40
---

Ad blockers block analytics by hostname. Serving the script and the events endpoint from your own
domain is the only reliable way around that, and it costs you two proxy rules.

It's also better for your visitors: the request goes to a host they already trust and reuses a
connection their browser has open.

## What to proxy

- **The script** - a static file, cacheable. It's served at `/js/script.js`, or at your site's own
  `/js/fs-<token>.js`.
- **The events endpoint** - `POST /api/event`, never cached. Proxy the whole prefix rather than the
  exact path, so the no-script pixel at `/api/event/pixel.gif` is covered too.

## Caddy

```
example.com {
    handle /stats/js/* {
        uri strip_prefix /stats
        reverse_proxy https://app.feasible.lol {
            header_up Host app.feasible.lol
        }
    }
    handle /stats/api/event* {
        uri strip_prefix /stats
        reverse_proxy https://app.feasible.lol {
            header_up Host app.feasible.lol
        }
    }
}
```

Caddy sets `X-Forwarded-For` itself, which is all we need.

## nginx

```
location /stats/api/event {
    proxy_pass https://app.feasible.lol/api/event;
    proxy_set_header Host app.feasible.lol;
    proxy_set_header X-Forwarded-For $remote_addr;
}
location /stats/js/ {
    proxy_pass https://app.feasible.lol/js/;
    proxy_set_header Host app.feasible.lol;
}
```

## Then point the script at your proxy

```
<script defer data-api="/stats/api/event"
        src="/stats/js/fs-k7m2q4x5r3n6t2v5.js"></script>
```

{{< callout type="warn" title="data-api is not optional here" >}}
Left out, the script derives the endpoint from the *origin* of its own `src` - not the directory - so
a script served from `/stats/js/fs-k7m2q4x5r3n6t2v5.js` would post to
`https://example.com/api/event`, which is a path you aren't proxying.

The script loads, the requests 404, and the site looks installed.
{{< /callout >}}

## The one thing to get right

Your proxy has to pass the visitor's address on.

Without it, every visitor geolocates to your data center and shares one fingerprint - one visitor,
from one country, forever - and there's no way to repair that afterwards.

### On the hosted service

Send the visitor's address in `X-Forwarded-For`. The Caddy and nginx configs above already do.

We count the event at the nearest public address in that header, reading right to left. Private
addresses are skipped, so a load balancer between your proxy and the visitor doesn't get in the way.
If the header is missing or holds no public address, the event is counted at your server.

Two headers win over it when they're present:

1. `X-Feasible-IP`
2. `CF-Connecting-IP`

If your site sits behind a CDN that sets `CF-Connecting-IP`, your proxy passes it along and there's
nothing more to do. If your proxy can't see the visitor's address any other way, set
`X-Feasible-IP` to it yourself.

These headers are read for events only. Sign-in, the dashboard and the API ignore them.

### Self-hosting

A self-hosted install believes these headers only from an address on its trusted-proxy list,
`FEASIBLE_INGEST_TRUSTED_PROXIES`, which is empty by default. That's what stops a directly connected
visitor forging the address used for their fingerprint, geolocation or IP shields.

From a trusted address we resolve in this order:

1. `X-Feasible-IP`
2. `CF-Connecting-IP`
3. The nearest untrusted address in `X-Forwarded-For`, walking from right to left past trusted proxy
   hops.
4. The address the connection came from.

How to put a proxy on that list is on [self-hosting](/docs/self-hosting/). Every trusted proxy has to
strip or overwrite client-supplied `X-Feasible-IP` and `CF-Connecting-IP`, because those take
precedence.

## Check it once, before you leave it running

Send an event through the proxy with `X-Debug-Request: true` and look at `client_ip` and
`client_ip_source` in the reply:

```
curl -si https://example.com/stats/api/event \
  -H 'Content-Type: application/json' \
  -H 'X-Debug-Request: true' \
  -d '{"n":"pageview","d":"example.com","u":"https://example.com/"}'
```

`client_ip` should be your own address, the one you ran the command from. If it's your server's
address, the header isn't arriving. On a self-hosted install, a source of `socket` means the proxy
isn't on the trusted list.

The address itself is used for geolocation and the visitor identifier and is then discarded. It's
never written to disk and never leaves the ingestion tier - see [privacy](/docs/privacy/).

## Content security policy

Proxying makes this easier rather than harder. Once both requests are same-origin, a strict CSP needs
no analytics host in `script-src` or `connect-src` at all.
