---
title: "SDKs and plugins"
description: "Which add-ons are published, which aren't yet, and what to use today: the script tag, WPCode, a Custom HTML tag, and two you can set up from the source."
lede: "What's published, what isn't yet, and what to use today."
weight: 140
---

None of our add-ons is in a package registry or the WordPress directory yet. Checked November 15,
2026: the WordPress plugin, the npm browser loader `@feasible/tracker`, and the server-side SDKs for
Go, Node, PHP, Python and Ruby are all written, and their source is in the product's
[repository](https://github.com/Feasible-Analytics/app.feasible.lol) under `ecosystem/`, but none of
them can be installed with a package manager today. They're on the way.

Here's what to use instead:

| Add-on | What works today |
|---|---|
| WordPress plugin | WPCode or your theme's header - [WordPress](/integrations/wordpress/) |
| npm loader | The script tag in your root layout - [installation](/docs/installation/) |
| Server-side SDKs | The [events API](/docs/api/#sending-events) they wrap |
| Google Tag Manager template | A Custom HTML tag, or [import the template](#google-tag-manager) yourself |
| Looker Studio connector | [Deploy it](#looker-studio) from the repository |

## Google Tag Manager

A **Custom HTML** tag on an *All Pages* trigger works today. Use the `data-domain` form of the
snippet there rather than the per-site path, because tag managers rewrite opaque paths:

```
<script>window.feasible=window.feasible||function(){(window.feasible.q=window.feasible.q||[]).push(arguments)};</script>
<script defer data-domain="example.com" src="https://app.feasible.lol/js/script.js"></script>
```

There's also a tag template. It isn't in Google's Community Template Gallery yet, so you import it
yourself:

1. Download
   [`template.tpl`](https://raw.githubusercontent.com/Feasible-Analytics/app.feasible.lol/main/ecosystem/gtm-template/template.tpl)
   from the repository.
2. In Tag Manager, open *Templates → Tag Templates → New*.
3. In the template editor's ⋮ menu, choose *Import* and pick the file, then save.

It gives you two tag types - load the script, or send an event - with fields for the domain, host,
hash routing, manual pageviews, counting localhost, a properties table and a revenue amount and
currency. The template declares permission to inject a script from one host only. If you proxy
through your own domain, edit that permission in your own copy.

## Looker Studio

A community connector you deploy into your own Apps Script project with `clasp`, from
[`ecosystem/looker-studio-connector/`](https://github.com/Feasible-Analytics/app.feasible.lol/tree/main/ecosystem/looker-studio-connector)
in the repository. Its README has the exact steps. You then open it through a
`datasources/create?connectorId=…` link. It isn't in Google's gallery.

It authenticates with an API key carrying `stats:read` and `sites:read`. Self-hosters paste their
host and key separated by a space.

It exposes 23 dimensions and 11 metrics, and pushes equality and contains filters down to us so the
work happens here rather than in your browser. Results are cached for five minutes, thirty seconds
for realtime, and errors are never cached.

A chart with two dimensions isn't supported and says so, rather than returning a number that looks
right and isn't.

## On the way

- **The WordPress plugin.** Until it's in the directory, paste the snippet with WPCode or into a
  child theme. [The steps](/integrations/wordpress/).
- **The npm loader.** Every framework takes the script tag in its root layout, and the script
  follows client-side navigation itself. `window.feasible()` works from your own code as soon as the
  snippet's first line has run.
- **The server-side SDKs.** Dependency-free clients for Go, Node, PHP, Python and Ruby. Each makes
  the visitor's IP address and user agent required arguments, because a server-side event without
  them looks like a datacenter bot.

There are no mobile SDKs. iOS, Android and React Native are scoped and not built.
