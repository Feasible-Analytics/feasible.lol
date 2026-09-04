---
title: "Script options"
description: "Every data- attribute on the tracking script, what happens at each limit, and the gotcha that costs people an afternoon."
lede: "Every data- attribute, and what happens at each limit."
weight: 30
---

Every option is a `data-` attribute on the script tag. There's one script file and one bundle — no
build flags, no feature variants to choose between, and nothing you can forget to turn on.

## A value is required, not just the attribute

This trips people up, so it goes first. A bare attribute does nothing:

```
<script defer data-domain="example.com" data-hash src="…"></script>          <!-- ignored -->
<script defer data-domain="example.com" data-hash="true" src="…"></script>   <!-- on -->
```

Any non-empty value switches a flag on, including the string `"false"`. To turn something off, leave
the attribute out.

## The attributes

### data-domain (required)

The site this page belongs to, exactly as registered. It's the routing key for the whole system.

A page whose `data-domain` doesn't match a registered site is dropped with the reason `unknown_site`,
which comes back on the response — see
[checking what happened to an event](/docs/api/).

With no `data-domain` at all, the script installs a working but inert `window.feasible` and logs
`feasible: not tracking — no data-domain`.

### data-api

Where events are sent. Set it when you [proxy](/docs/proxying/) through your own domain. The value is
used exactly as given — nothing is appended — and a relative path works.

The default is the *origin* of the script's own `src` plus `/api/event`. Note that it's the origin
and not the directory: a script served from `/stats/js/script.js` still posts to `/api/event` by
default, which is why a path-based proxy has to set this.

### data-exclude

A comma-separated list of paths that are never counted. Matched against `pathname + hash`, anchored
at both ends.

- `*` matches within one path segment.
- `**` matches across segments, so `/admin/**` excludes a whole subtree.
- Everything else is a literal, including `?` and `.`.

An excluded page sends nothing at all — no pageview, no custom event, no outbound click. There's no
`data-include`: write the exclusion.

### data-file-types

The file extensions that count as a download. Comma-separated, **no spaces**, with or without a
leading dot, case-insensitive. Setting it *replaces* the built-in list rather than adding to it.

The built-in list is `7z avi csv dmg docx exe gz key midi mov mp3 mp4 mpeg pdf pkg pps ppt pptx rar
rtf txt wav wma wmv xlsx zip`.

### data-hash

Treat the URL fragment as part of the page, for a router that genuinely uses hashes. Off, a fragment
change isn't a new pageview; on, it is.

Set it only if your routing needs it. On an ordinary page it turns every in-page anchor into a
pageview.

### data-manual

Stop automatic pageviews and send them yourself with `feasible('pageview')`.

It suppresses the first pageview and the history listeners, and nothing else: engagement measurement,
outbound clicks, downloads and form submissions all keep working. Use it sparingly — a manual
pageview that never gets called is data nothing can recover.

### data-alias

Expose the same function under a second name on `window`, for a site that already has its own
`feasible` global or a house convention to follow.

The tracker always installs `window.plausible` as a second name for the same function, so a site
arriving with existing calls under that name keeps working without this attribute.

### data-capture-on-localhost

Count traffic on a local address. Off by default, so development traffic never reaches your real
numbers.

The older squashed spelling `data-captureOnLocalhost` is still accepted, and so is the squashed form
of every other hyphenated attribute — `data-filetypes` works exactly like `data-file-types`. New
snippets should use the hyphenated names.

{{< callout type="warn" title="Your LAN is not localhost" >}}
What counts as local is narrower than people expect: the hostnames `localhost`, `127.0.0.1`,
`0.0.0.0`, `::1`, an empty hostname, and any `file:` page.

**Private LAN addresses are not excluded.** A site opened at `192.168.1.20` or `10.0.0.5` is counted
normally, which is worth knowing before you demo a staging build to a room.
{{< /callout >}}

### data-vitals

Enable Web Vitals as an optional mode of the same tracker script. A bare attribute captures every
page; a decimal value between 0 and 1 samples that fraction of documents:

```
<script defer data-domain="example.com" data-vitals="0.1" src="https://app.feasible.lol/js/script.js"></script>
```

It reports LCP, CLS, INP and TTFB as an event called **Web Vitals**, with one numeric property per
measurement — so every one of them is a [custom property](/docs/custom-properties/) you can
aggregate, filter and break down by page like any other. Nothing in it reads layout: every number
comes from the maintained Web Vitals implementation over the browser's Performance API.

The one script tag is still the entire installation. The base tracker stays at 3,377 bytes gzipped, under its 3,584-byte build budget, and downloads the Web Vitals module only when this option is on, so sites that leave it off
don't pay for the optional collector.

It sends final values when a navigation is hidden. A supported single-page navigation starts a fresh
set of route-scoped measurements, and restoring a document from the back-forward cache starts a fresh
observation. Cumulative layout shift and interaction to next paint aren't final on load, so reporting
them earlier would produce a smaller value than the visitor experienced.

Web Vitals are a distribution rather than a total, so a tenth of your traffic estimates the curve
directly rather than being multiplied by ten. Sampling is never enabled silently: `data-vitals` means
every document and `data-vitals="0.1"` means one in ten. The earlier `data-vitals data-sample="0.1"`
spelling still works as an alias; new installs should put the rate directly on `data-vitals`.

The event counts toward your monthly volume like any other custom event, which is the other reason
it's opt-in. At a sample of one in ten, that's one extra event per ten measured navigation
lifecycles.

## Consent and Do Not Track

Set `window.__feasible = { consent: false }` before loading the script when your consent manager
denies analytics. The tracker also honors a browser Do Not Track value of `1`.

In either case it sends no pageview and no custom event, installs the callable API, and answers a
supplied callback immediately with `{ status: null }`.

Most sites don't need a consent banner for this design at all — there are no cookies and no stored
identifier. See [privacy and GDPR](/docs/privacy/) for the facts to hand your lawyer.

## Opting one browser out

To stop your own visits counting on a machine, in that browser's console:

```
localStorage.setItem("feasible_ignore", "true")
```

The value has to be exactly `"true"`. Remove the key to start counting again. This is a per-browser
setting and needs no attribute on the tag.

If you'd rather exclude a whole office or a home address, use an
[IP shield](/docs/shields/) instead.

## What the script does without being asked

These aren't options and can't be switched off, because a build flag for each is a build flag
somebody forgets:

- **Client-side route changes.** `pushState`, `replaceState`, `popstate` and `hashchange` are all
  handled. Consecutive changes in one tick collapse into a single pageview at the final URL.
- **Outbound link clicks** — event name `Outbound Link: Click`, with the destination in a `url`
  property. Middle-clicks count; right-clicks don't; nothing is ever `preventDefault`-ed, so
  modifier-clicks behave normally.
- **File downloads** — event name `File Download`, also with a `url` property. A link counts if it
  has the `download` attribute, the `data-fs-download` attribute, or an extension on the list above.
- **Form submissions** — event name `Form: Submission` unless you name it. Existing integrations
  sending `Form: Submit` stay compatible.
- **Revenue** on any custom event. There's nothing to enable.
- **Engagement** — time on page and scroll depth. There's no polling timer: a measurement is flushed
  when the tab is hidden, blurred or navigated away from, and only if it got deeper or accrued at
  least three more seconds. Time accrues only while the tab is both visible and focused, so a page
  left open behind another window doesn't bank hours.

Outbound clicks, downloads and form submissions are custom events, so they count toward your
monthly volume. Engagement pings never do.

404 tracking and site-search tracking aren't in this script. They come from the
[WordPress plugin](/docs/integrations/), which can see both server-side.

## Tagging an element without writing JavaScript

Put a class on the element. The script looks at the clicked element and up to three ancestors:

```
<a class="feasible-event-name=Signup feasible-event-plan=pro" href="/signup">Sign up</a>
```

`feasible-event-name=…` sets the event name, and any other `feasible-event-<key>=<value>` becomes a
property. A class attribute can't hold a space, so `+` decodes as one:
`feasible-event-name=Article+Saved` sends `Article Saved`.

Classes spelled `plausible-event-…` are read the same way, so a site arriving with those already in
its markup can leave them alone. Both the `=` form and the site-builder-friendly `--` separator are
accepted, including event properties and tagged forms.

## Calling it yourself

```
feasible('Signup', { props: { plan: 'yearly' } })
feasible('Purchase', { revenue: { amount: 49.00, currency: 'USD' } })
feasible('Heartbeat', { interactive: false })
feasible('pageview', { u: '/checkout/step-2' })
```

`plausible(…)` is a second name for `feasible(…)`. Queued calls made before the tracker loads are
replayed through either name.

Two details that cost people an afternoon:

- A **custom event** takes `props`. A **pageview** takes `p`. `feasible('pageview', { props: … })`
  silently sends no properties.
- A `callback` is best-effort. A response gives you `{ status: 202, dropped: null }`, and an inline
  drop such as an unknown site or an IP shield gives `{ status: 202, dropped: "shield_ip" }`. A `202`
  means the ingest process accepted the request — country, page and hostname shields run later at the
  shard and can't be seen by the browser callback. Consent denial, Do Not Track, bot detection, a
  missing domain, or a client-side path exclusion produces `{ status: null }`. The callback does
  **not** fire when the request failed or an ad blocker ate it, so gate forms with your own timeout.

## If you load the script asynchronously

Install the queue stub before the tag, and calls made before the script arrives get replayed rather
than throwing:

```
window.feasible = window.feasible || function () {
  (window.feasible.q = window.feasible.q || []).push(arguments);
};
```

## Content security policy

A strict CSP needs the analytics origin in **two** directives: `script-src` to load the file, and
`connect-src` for the request that carries the events.

Allowing only `script-src` gives you a script that loads and then sends nothing, which looks exactly
like a broken install. There's no `nonce` support — allow the origin.

[Proxying](/docs/proxying/) makes this go away entirely: once both requests are same-origin, a strict
CSP needs no analytics host at all.

## Failed requests are retried

Every event is written to the browser's local outbox before its request starts, and replayed on the
next pageview with the same permanent event id until a successful response removes it. There's no
arbitrary event-count eviction.

Current consent, Do Not Track, self-exclusion and route-exclusion rules are all applied again before
replay. If storage is unavailable, the tracker keeps an in-page queue and logs that durability is
memory-only.
