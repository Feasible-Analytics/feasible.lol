---
title: "Add website analytics to Django"
platform: "Django"
description: "One snippet in your base template, behind a flag you control - because Django's built-in debug template variable doesn't do what most people assume."
lede: "templates/base.html, behind a settings flag you define yourself."
---

The tag goes in your base template's `<head>` - `templates/base.html` in most projects - behind a flag that's off everywhere except production.

{{< snippet >}}

## Steps

1. Add a setting. In `settings.py`:

```python
FEASIBLE_ENABLED = not DEBUG and os.environ.get("DJANGO_ENV") == "production"
```

2. Expose it with a two-line context processor, in `yourapp/context_processors.py`:

```python
from django.conf import settings

def analytics(request):
    return {"feasible_enabled": settings.FEASIBLE_ENABLED}
```

3. Register it in `TEMPLATES` → `OPTIONS` → `context_processors`, alongside the ones already there.

4. Put the tag in `templates/base.html`, inside `<head>`:

```django
{% if feasible_enabled %}
  <script defer
          src="https://cdn.feasible.lol/js/fs-k7m2q4x5r3n6t2v5.js"></script>
{% endif %}
```

Every template that does `{% extends "base.html" %}` now carries it.

## Django's debug variable isn't the guard you want

Because `debug` isn't what it looks like.

Django's `django.template.context_processors.debug` only sets that variable when **two** things hold: `DEBUG` is `True` *and* the request's `REMOTE_ADDR` is in `INTERNAL_IPS`. Off your dev machine, or with `INTERNAL_IPS` unset - which is the default - `debug` is absent from the context entirely.

An absent variable is falsey. So `{% if not debug %}` evaluates true on your laptop, and the guard you wrote to keep development out of your numbers does nothing at all. It doesn't fail loudly; it just quietly tracks everything.

Your own flag is two lines and it means what it says.

## Staging is the real risk

`localhost` and `127.0.0.1` are never counted, with or without a guard, so `runserver` was never the problem.

The problem is a staging deployment on a real hostname with production settings copied across. That traffic lands in your live numbers and can't be unpicked afterwards. Set the environment variable properly, or register staging as [its own site](/help/can-i-track-more-than-one-website/), or exclude its hostname with a [shield](/docs/shields/).

{{< callout title="If you have more than one base template" >}}
Multi-app projects often grow a second base - `admin/base.html`, `dashboard/base.html` - that doesn't extend the first. Each one needs the tag, or one whole section of the site reports no visitors and looks like a content problem.
{{< /callout >}}

## Server-side events

The script counts page views, and it stays the right way to do that. Send an event from your server when the server is the one that knows: a form your view handles, a checkout that settles the amount, an account that only exists once the row is written.

Send it from the request the visitor made, with their address and user agent. This needs nothing outside the standard library:

```python
import json
import urllib.request


def send_event(request, name, url, revenue=None):
    forwarded = request.META.get("HTTP_X_FORWARDED_FOR")
    address = request.META["REMOTE_ADDR"]
    event = {"n": name, "d": "example.com", "u": url}
    if revenue:
        event["$"] = revenue
    req = urllib.request.Request(
        "https://app.feasible.lol/api/event",
        data=json.dumps(event).encode(),
        headers={
            "Content-Type": "application/json",
            "X-Forwarded-For": f"{forwarded}, {address}" if forwarded else address,
            "User-Agent": request.META.get("HTTP_USER_AGENT", ""),
        },
    )
    try:
        urllib.request.urlopen(req, timeout=2)
    except OSError:
        pass  # Analytics never breaks a checkout.
```

Then, in the view that handles the form or the checkout:

```python
send_event(request, "Purchase", request.build_absolute_uri(),
           {"amount": 49.00, "currency": "USD"})
```

That header is the chain your own proxy built, plus the address the request came from. We read it right to left and skip private and loopback addresses, so it resolves to the visitor whether Django sits behind nginx or faces the internet directly. If Cloudflare is in front, pass `request.META.get("HTTP_CF_CONNECTING_IP")` along as a `CF-Connecting-IP` header too. It wins over `X-Forwarded-For`.

With the visitor's own address and user agent, the event counts as the same visitor as their browser, so it joins the visit they're already in and is credited to that visit's source. For the revenue to show, [mark the goal as a revenue goal](/help/how-do-i-track-revenue/).

A payment webhook doesn't fit. It comes from your payment provider, not the visitor, so an event sent from it is counted at your server and usually filed as `datacenter_ip`. A Celery task works if you hand it the two header values from the original request. Every field is in [the API docs](/docs/api/#sending-events).

The browser script doesn't care about any of this. It talks to us directly, so a proxy in front of Django never touches its requests.

## Check it worked

Deploy, open the site in a normal browser window, and click through two or three pages. Then open Feasible.

You should show up under Real-time visitors. If you don't, go to **Site settings → Ingestion health**. It counts every event that arrived and every one that was dropped, each with a named reason - `unknown_site` means the snippet is for a site you haven't registered, `hostname_not_allowed` means the page is on a hostname that isn't on your list.

The **send a test event** button there posts through the real public URL, so it exercises what a browser does.

A brand-new site takes about fifteen seconds before its first event is accepted, so [give it that](/help/how-long-until-i-see-data/).

Related: [Laravel](/integrations/laravel/), [React](/integrations/react/), and the [install docs](/docs/installation/).

Sources: [Django - built-in template context processors](https://docs.djangoproject.com/en/stable/ref/templates/api/), checked September 3, 2026.
