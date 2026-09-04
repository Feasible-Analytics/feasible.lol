---
title: "Webhooks"
description: "HMAC-signed webhook deliveries with a rotatable secret, a delivery log and manual redelivery. Seven event types."
lede: "Being called when something happens, and verifying it was us."
weight: 120
---

A webhook is us calling you when something happens, so you don't have to poll for it. They're managed
under `/api/v1/webhooks` with a key carrying the `webhooks:write` scope.

```
POST /api/v1/webhooks
Authorization: Bearer feas_…

{
  "url": "https://example.com/hooks/feasible",
  "event_types": ["site.created", "traffic.spike"]
}
```

The response carries the signing secret — `whsec_` followed by 43 characters — and that's the only
time you'll see it. Listing or fetching a webhook never returns it. An empty `event_types` means
every type.

The URL has to be `https`. Plain `http` is allowed only for `localhost`, so you can develop against
it.

## The event types

- `site.created`
- `goal.converted`
- `traffic.spike`
- `traffic.drop`
- `usage.over_limit`
- `import.completed`
- `import.failed`

{{< callout type="warn" title="Only site.created fires today" >}}
The other six are subscribable and their shapes are settled, but nothing publishes them yet.

We'd rather tell you that than let you wire up an alert that stays quiet for a reason you can't see.
For traffic spikes and drops today, use [email and Slack alerts](/features/) instead.
{{< /callout >}}

## What we send

```
POST /your/endpoint
Content-Type: application/json
User-Agent: feasible-webhooks/1
Feasible-Signature: t=1772236800,v1=9f86d081…
Feasible-Event: site.created
Feasible-Event-Id: 6f1b…            <- stable across retries
Feasible-Delivery: 1842             <- decimal int64, stable across automatic retries

{
  "id": "6f1b…",
  "type": "site.created",
  "created_at": 1772236800,
  "site_id": 42,
  "data": { "domain": "example.com", "timezone": "Etc/UTC", "…": "…" }
}
```

`Feasible-Delivery` is the delivery row's positive decimal signed 64-bit integer id. It's stable for
every automatic retry of one queued delivery, so it's the idempotency key when a manual replay should
be processed as a new attempt. Pressing manual redeliver creates a new delivery row and a new id.

`Feasible-Event-Id` stays the same across both automatic retries and manual redeliveries. Use that
one instead when even an intentional manual replay has to be collapsed.

## Verifying the signature

`Feasible-Signature` is `t=<unix seconds>,v1=<hex>`. The MAC is HMAC-SHA256 over the byte string
`<timestamp> + "." + <raw body>`, keyed with your secret. The timestamp is inside the MAC, so a
captured delivery can't be given a fresh one.

```
import hashlib, hmac, time

def verify(secret, header, body, tolerance=300):
    parts = dict(p.split("=", 1) for p in header.split(","))
    if abs(time.time() - int(parts["t"])) > tolerance:
        return False
    expected = hmac.new(secret.encode(), f'{parts["t"]}.'.encode() + body,
                        hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, parts["v1"])
```

Verify against the **raw** body, before any JSON parsing — re-serializing changes the bytes and the
MAC with them. Reject anything more than five minutes old. Compare in constant time.

Rotating a secret keeps the old one valid for an hour, so you have a window to deploy the new one
without dropping a delivery. The rotate response tells you exactly how long is left.

## Retries

Anything in the 2xx range is success. Anything else is retried up to **12 times**, backing off from
30 seconds by a factor of three to a ceiling of six hours — more than a day of attempts in total.
Each attempt has ten seconds to answer and reuses the same `Feasible-Delivery` value.

Redirects are refused rather than followed. A 302 would send a payload signed for you to somewhere
you didn't register.

After **5** consecutive failures we tell you the endpoint looks broken. After **15** we stop sending
to it, and re-enabling it clears the count. That isn't a punishment — an endpoint that has failed
fifteen times in a row is a queue that will never drain.

Every attempt is logged with its status and the first 2 KB of your response, readable at
`GET /api/v1/webhooks/{id}/deliveries`, and you can force one with
`POST /api/v1/webhooks/deliveries/{delivery_id}/redeliver`.

## Two deliberate limits

**Delivery never happens on a request path.** Publishing writes a row and returns; a worker does the
calling. An endpoint of yours that takes thirty seconds costs a worker thirty seconds and costs event
collection nothing.

**A locked account's webhooks are withheld** rather than queued. When the account is back, new events
flow again; the ones from the locked period aren't replayed. See
[the APIs](/docs/api/#a-locked-account).
