---
title: "Add website analytics to Django"
platform: "Django"
description: "One script tag in your base template, behind a flag you control — because Django's built-in debug template variable doesn't do what most people assume."
lede: "templates/base.html, behind a settings flag you define yourself."
---

The tag goes in your base template's `<head>` — `templates/base.html` in most projects — behind a flag that's off everywhere except production.

{{< snippet domain="yourdomain.com" >}}

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
  <script defer data-domain="yourdomain.com"
          src="https://app.feasible.lol/js/script.js"></script>
{% endif %}
```

Every template that does `{% extends "base.html" %}` now carries it.

## Django's debug variable isn't the guard you want

Because `debug` isn't what it looks like.

Django's `django.template.context_processors.debug` only sets that variable when **two** things hold: `DEBUG` is `True` *and* the request's `REMOTE_ADDR` is in `INTERNAL_IPS`. Off your dev machine, or with `INTERNAL_IPS` unset — which is the default — `debug` is absent from the context entirely.

An absent variable is falsey. So `{% if not debug %}` evaluates true on your laptop, and the guard you wrote to keep development out of your numbers does nothing at all. It doesn't fail loudly; it just quietly tracks everything.

Your own flag is two lines and it means what it says.

## Staging is the real risk

`localhost` and `127.0.0.1` are never counted, with or without a guard, so `runserver` was never the problem.

The problem is a staging deployment on a real hostname with production settings copied across. That traffic lands in your live numbers and can't be unpicked afterwards. Set the environment variable properly, or register staging as [its own site](/help/can-i-track-more-than-one-website/), or exclude its hostname with a [shield](/docs/shields/).

{{< callout title="If you have more than one base template" >}}
Multi-app projects often grow a second base — `admin/base.html`, `dashboard/base.html` — that doesn't extend the first. Each one needs the tag, or one whole section of the site reports no visitors and looks like a content problem.
{{< /callout >}}

## Behind a proxy

If Django runs behind nginx, a load balancer or Cloudflare, make sure the visitor's address is being forwarded. The ingestion health panel warns you when it isn't — otherwise every visitor collapses into one and geolocates to your datacenter.

Server-side events — a webhook, a Celery task, an offline conversion — go through the Python SDK, which takes the visitor's IP and user agent as required arguments, because a call without them looks like a datacenter bot.

## Check it worked

Deploy, open the site in a normal browser window, and click through two or three pages. Then open Feasible.

You should show up under Real-time visitors. If you don't, go to **Site settings → Ingestion health**. It counts every event that arrived and every one that was dropped, each with a named reason — `unknown_site` means `data-domain` doesn't match the site you registered, `hostname_not_allowed` means the page is on a hostname that isn't on your list.

The **send a test event** button there posts through the real public URL, so it exercises exactly what a browser does.

A brand-new site takes about fifteen seconds before its first event is accepted, so [give it that](/help/how-long-until-i-see-data/).

Related: [Laravel](/integrations/laravel/), [React](/integrations/react/), and the [install docs](/docs/installation/).

Sources: [Django — built-in template context processors](https://docs.djangoproject.com/en/stable/ref/templates/api/), checked September 3, 2026.
