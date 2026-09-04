---
title: "Add website analytics to Laravel"
platform: "Laravel"
description: "One script tag in your Blade layout, wrapped in @production so local and staging never reach your numbers."
lede: "resources/views/layouts/app.blade.php, wrapped in @production."
---

The tag goes in your Blade layout's `<head>` — usually `resources/views/layouts/app.blade.php` — wrapped in `@production` so only the real site reports.

```blade
<head>
    <meta charset="utf-8">
    <title>{{ config('app.name') }}</title>

    @production
        <script defer data-domain="yourdomain.com"
                src="https://app.feasible.lol/js/script.js"></script>
    @endproduction
</head>
```

Unwrapped, it's the same tag as everywhere else:

{{< snippet domain="yourdomain.com" >}}

## Steps

1. Open your main layout. On a fresh Breeze or Jetstream install it's `resources/views/layouts/app.blade.php`.
2. Paste the block above into `<head>`.
3. Check whether you have more than one layout — see below.
4. Deploy, then run `php artisan view:clear` so the compiled views pick it up.

## You probably have more than one layout

Breeze ships `layouts/app.blade.php` and `layouts/guest.blade.php`. The guest one wraps login, registration and password reset — often the highest-traffic pages you own, and the ones you most want in a funnel.

Add the tag to both, or better, pull it into `resources/views/partials/analytics.blade.php` and `@include('partials.analytics')` from each layout. One file to change when you change anything.

Using Inertia? The layout is `resources/views/app.blade.php`. Same rule.

## @production reads APP_ENV, so set it

`@production` is true when `APP_ENV=production`. That's the whole test.

Which means a staging server deployed with `APP_ENV=production` in its `.env` — a genuinely common mistake, because it's what makes the error pages behave — reports straight into your live numbers. Staging traffic mixed into production numbers can't be unpicked afterwards. There's no filter that separates them later.

Set `APP_ENV=staging` on staging. If you can't, register staging as [its own site](/help/can-i-track-more-than-one-website/), or exclude its hostname with a [shield](/docs/shields/).

{{< callout title="Local is already excluded" >}}
`localhost` and `127.0.0.1` are never counted, with or without the `@production` wrapper. The wrapper is there for the machines that *do* have real hostnames — staging, review apps, that demo box someone spun up in March.
{{< /callout >}}

## Server-side events

Anything that happens away from a browser — a Stripe webhook, a queued job, an offline conversion — can be sent with the PHP SDK. It takes the visitor's IP and user agent as required arguments, because a server-side call without them looks like a datacenter bot and gets classified as one.

## Livewire and Turbo

Both navigate without a full page load. The script listens for `pushState`, `replaceState`, `popstate` and `hashchange` and counts one pageview per change, so there's nothing to hook. Verify it on the deployed site by clicking through and counting `POST` requests to `/api/event` in the network tab: one per page.

## Check it worked

Deploy, open the site in a normal browser window, and click through two or three pages. Then open Feasible.

Real-time visitors should show you. If it doesn't, go to **Site settings → Ingestion health**. It counts every event that arrived and every one that was dropped, each with a named reason — `unknown_site` means `data-domain` doesn't match the site you registered, `hostname_not_allowed` means the page is on a hostname that isn't on your list. The **send a test event** button there posts through the real public URL, so it exercises exactly what a browser does.

If you're behind a load balancer, that panel also warns when your proxy isn't forwarding visitor addresses — otherwise every visitor collapses into one and geolocates to your datacenter.

A brand-new site takes about fifteen seconds before its first event is accepted, so [wait for it](/help/how-long-until-i-see-data/).

Related: [Django](/integrations/django/), [WordPress](/integrations/wordpress/), and the [install docs](/docs/installation/).
