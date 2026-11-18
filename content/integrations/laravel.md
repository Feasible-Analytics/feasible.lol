---
title: "Add website analytics to Laravel"
platform: "Laravel"
description: "One snippet in your Blade layout, wrapped in @production so local and staging never reach your numbers."
lede: "resources/views/layouts/app.blade.php, wrapped in @production."
---

The tag goes in your Blade layout's `<head>` - usually `resources/views/layouts/app.blade.php` - wrapped in `@production` so only the real site reports.

```blade
<head>
    <meta charset="utf-8">
    <title>{{ config('app.name') }}</title>

    @production
        <script defer
                src="https://cdn.feasible.lol/js/fs-k7m2q4x5r3n6t2v5.js"></script>
    @endproduction
</head>
```

Unwrapped, it's the same tag as everywhere else:

{{< snippet >}}

## Steps

1. Open your main layout. On a fresh Breeze or Jetstream install it's `resources/views/layouts/app.blade.php`.
2. Paste the block above into `<head>`.
3. Check whether you have more than one layout - see below.
4. Deploy, then run `php artisan view:clear` so the compiled views pick it up.

## You probably have more than one layout

Breeze ships `layouts/app.blade.php` and `layouts/guest.blade.php`. The guest one wraps login, registration and password reset - often the highest-traffic pages you own, and the ones you most want in a funnel.

Add the tag to both, or better, pull it into `resources/views/partials/analytics.blade.php` and `@include('partials.analytics')` from each layout. One file to change when you change anything.

Using Inertia? The layout is `resources/views/app.blade.php`. Same rule.

## @production reads APP_ENV, so set it

`@production` is true when `APP_ENV=production`. That's the whole test.

Which means a staging server deployed with `APP_ENV=production` in its `.env` - a common mistake, because it's what makes the error pages behave - reports straight into your live numbers. Staging traffic mixed into production numbers can't be unpicked afterwards. There's no filter that separates them later.

Set `APP_ENV=staging` on staging. If you can't, register staging as [its own site](/help/can-i-track-more-than-one-website/). A staging host outside your domain is refused already, as `hostname_not_allowed`. One on a subdomain, like `staging.example.com`, counts as your site, and a hostname [shield](/docs/shields/#allowed-hostnames) can't keep it out.

{{< callout title="Local is already excluded" >}}
`localhost` and `127.0.0.1` are never counted, with or without the `@production` wrapper. The wrapper is there for the machines that *do* have real hostnames - staging, review apps, that demo box someone spun up in March.
{{< /callout >}}

## Server-side events

The script counts page views, and it stays the right way to do that. Send an event from your server when the server is the one that knows: a form your controller handles, a checkout that settles the amount, an account that only exists once the row is written.

Send it from the request the visitor made, with their address and user agent:

```php
use Illuminate\Support\Facades\Http;

// In the controller that handles the form or the checkout.
$chain = array_filter([$request->header('X-Forwarded-For'), $request->server('REMOTE_ADDR')]);

rescue(fn () => Http::timeout(2)
    ->withHeaders([
        'X-Forwarded-For' => implode(', ', $chain),
        'User-Agent' => (string) $request->userAgent(),
    ])
    ->post('https://app.feasible.lol/api/event', [
        'n' => 'Purchase',
        'd' => 'example.com',
        'u' => $request->url(),
        '$' => ['amount' => 49.00, 'currency' => 'USD'],
    ]));
```

That header is the chain your own proxy built, plus the address the request came from. We read it right to left and skip private and loopback addresses, so it resolves to the visitor whether Laravel sits behind nginx or faces the internet directly. If Cloudflare is in front, pass its `CF-Connecting-IP` header along too. It wins over `X-Forwarded-For`.

With the visitor's own address and user agent, the event counts as the same visitor as their browser, so it joins the visit they're already in and is credited to that visit's source. `rescue()` and the two-second timeout mean a slow network can't break the checkout. For the revenue to show, [mark the goal as a revenue goal](/help/how-do-i-track-revenue/).

A Stripe webhook doesn't fit. It comes from Stripe, not the visitor, so an event sent from it is counted at your server and usually filed as `datacenter_ip`. A queued job works if you hand it the two header values from the original request. Every field is in [the API docs](/docs/api/#sending-events).

## Livewire and Turbo

Both navigate without a full page load. The script listens for `pushState`, `replaceState`, `popstate` and `hashchange` and counts one pageview per change, so there's nothing to hook. Verify it on the deployed site by clicking through and counting `POST` requests to `/api/event` in the network tab: one per page.

## Check it worked

Deploy, open the site in a normal browser window, and click through two or three pages. Then open Feasible.

You should show up under Real-time visitors. If you don't, go to **Site settings → Ingestion health**. It counts every event that arrived and every one that was dropped, each with a named reason - `unknown_site` means the snippet is for a site you haven't registered, `hostname_not_allowed` means the page is on a hostname that isn't on your list.

The **send a test event** button there posts through the real public URL, so it exercises what a browser does.

If you're behind a load balancer, that panel also warns when your proxy isn't forwarding visitor addresses - otherwise every visitor collapses into one and geolocates to your datacenter.

A brand-new site takes about fifteen seconds before its first event is accepted, so [wait for it](/help/how-long-until-i-see-data/).

Related: [Django](/integrations/django/), [WordPress](/integrations/wordpress/), and the [install docs](/docs/installation/).
