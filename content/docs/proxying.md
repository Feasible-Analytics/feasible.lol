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
<script defer data-domain="example.com"
        data-api="/stats/api/event"
        src="/stats/js/script.js"></script>
```

{{< callout type="warn" title="data-api is not optional here" >}}
Left out, the script derives the endpoint from the *origin* of its own `src` - not the directory - so
a script served from `/stats/js/script.js` would post to `https://example.com/api/event`, which is a
path you aren't proxying.

The script loads, the requests 404, and the site looks installed.
{{< /callout >}}

## The one thing to get right

Your proxy has to pass the visitor's address on.

Without it, every visitor geolocates to your data center and shares one fingerprint - one visitor,
from one country, forever - and there's no way to repair that afterwards.

We resolve the address in this order:

1. `X-Feasible-IP`
2. `CF-Connecting-IP`
3. The nearest untrusted address in `X-Forwarded-For`, walking from right to left past trusted proxy
   hops. This stays correct when a proxy appends to a client-supplied chain.
4. The address the connection came from.

The first three are read **only** when the connection address is on the trusted-proxy list, which is
empty by default. That's what stops a directly connected visitor forging the address used for their
fingerprint, geolocation or IP shields.

On the hosted service that list is already set to our own edge, so there's nothing for you to
configure. If you're [self-hosting](/docs/self-hosting/), set `FEASIBLE_INGEST_TRUSTED_PROXIES` to
your load balancer or edge proxy - never to a public client range. That trusted edge has to strip or
overwrite client-supplied `X-Feasible-IP` and `CF-Connecting-IP`, because those take precedence. It
may append to `X-Forwarded-For`; the right-to-left walk rejects a spoofed value placed before the
address the edge observed.

## Check it once, before you leave it running

Send an event through the proxy with `X-Debug-Request: true` and look at `client_ip` and
`client_ip_source` in the reply:

```
curl -si https://example.com/stats/api/event \
  -H 'Content-Type: application/json' \
  -H 'X-Debug-Request: true' \
  -d '{"n":"pageview","d":"example.com","u":"https://example.com/"}'
```

If the source says `socket` and the address is your server's, either the proxy isn't trusted or the
header isn't arriving.

The address itself is used for geolocation and the visitor identifier and is then discarded. It's
never written to disk and never leaves the ingestion tier - see [privacy](/docs/privacy/).

## WordPress does this for you

The WordPress plugin proxies both routes on randomized paths under your own domain, rotates those
paths on request, and forwards the visitor's address. If you run WordPress, that's less work than
either block above. See [integrations](/docs/integrations/).

## Content security policy

Proxying makes this easier rather than harder. Once both requests are same-origin, a strict CSP needs
no analytics host in `script-src` or `connect-src` at all.
