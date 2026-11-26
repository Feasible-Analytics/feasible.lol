---
title: "SDKs and plugins"
description: "The Go SDK and the WordPress plugin are published. Which add-ons aren't yet, and what to use today: the script tag, a Custom HTML tag, and the source."
lede: "What's published, what isn't yet, and what to use today."
weight: 140
---

The [Go SDK](#go) and the [WordPress plugin](#wordpress) are published. Checked November 26, 2026:
the rest - the npm browser loader `@feasible/tracker`, and the server-side SDKs for Node, PHP, Python
and Ruby - are written, and their source is in the product's
[repository](https://github.com/Feasible-Analytics/app.feasible.lol) under `ecosystem/`, but none of
them can be installed with a package manager yet. They're on the way.

Here's what to use instead:

| Add-on | What works today |
|---|---|
| WordPress plugin | Published: [Feasible Analytics](https://wordpress.org/plugins/feasible-analytics/) - [below](#wordpress) |
| npm loader | The script tag in your root layout - [installation](/docs/installation/) |
| Go SDK | Published: `go get github.com/Feasible-Analytics/feasible-go` - [below](#go) |
| Node, PHP, Python and Ruby SDKs | The [events API](/docs/api/#sending-events) they wrap |
| Google Tag Manager template | A Custom HTML tag, or [import the template](#google-tag-manager) yourself |
| Looker Studio connector | [Deploy it](#looker-studio) from the repository |

## Go

[`feasible-go`](https://github.com/Feasible-Analytics/feasible-go) is published, at v0.1.0. It uses
the standard library only, it's MIT licensed, and it needs Go 1.23 or newer.

```
go get github.com/Feasible-Analytics/feasible-go
```

Send the event from the handler serving the visitor, such as the one for a checkout or a form:

```go
client, err := feasible.New(feasible.Options{Domain: "example.com"})
if err != nil {
	log.Fatal(err)
}

// In the handler:
event := feasible.NewEvent("Purchase", "https://example.com/checkout", feasible.FromRequest(r))
event.Revenue = &feasible.Revenue{Amount: 99.50, Currency: "USD"}

result, err := client.Send(r.Context(), event)
```

The visitor isn't optional. `NewEvent` takes one, and a visitor missing an address or a user agent
is refused before anything is sent. `FromRequest` reads `CF-Connecting-IP`, then the first entry of
`X-Forwarded-For`, then the connection, so use it only behind a proxy that writes those headers
itself. If your app faces the internet directly, a visitor could put anything in them, so build the
visitor from the connection instead:

```go
host, _, _ := net.SplitHostPort(r.RemoteAddr)
visitor := feasible.NewVisitor(host, r.UserAgent())
```

The client sends the visitor's address in `X-Forwarded-For`, which the hosted service counts as the
visitor. On a self-hosted install, forwarded addresses follow the
[trusted-proxy rules](/docs/proxying/#self-hosting).

`result.DropReason` says why an event wasn't counted, and `client.Debug` shows what the server
would derive without writing anything. Set `Options.Disabled` in tests and the client records
events instead of sending them. The
[README](https://github.com/Feasible-Analytics/feasible-go#readme) has the rest.

## WordPress

[Feasible Analytics](https://wordpress.org/plugins/feasible-analytics/) is in the WordPress plugin directory, at 1.0.2.
It needs WordPress 5.9 or later and PHP 7.4 or later.

Install it from **Plugins → Add New Plugin** by searching for **Feasible Analytics**, then tick
**Turn on tracking** under **Feasible → Settings**. It serves the script from your own domain and
counts site searches and 404s with no theme edit. [Setup and what it counts](/integrations/wordpress/).

## Google Tag Manager

A **Custom HTML** tag on an *All Pages* trigger works today. Use the `data-domain` form of the
snippet there rather than the per-site path, because tag managers rewrite opaque paths:

```
<script>window.feasible=window.feasible||function(){(window.feasible.q=window.feasible.q||[]).push(arguments)};</script>
<script defer data-domain="example.com" src="https://cdn.feasible.lol/js/script.js"></script>
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

- **The npm loader.** Every framework takes the script tag in its root layout, and the script
  follows client-side navigation itself. `window.feasible()` works from your own code as soon as the
  snippet's first line has run.
- **The other server-side SDKs.** Dependency-free clients for Node, PHP, Python and Ruby. Like the
  Go one, each makes the visitor's IP address and user agent required arguments, because a
  server-side event without them looks like a datacenter bot.

There are no mobile SDKs. iOS, Android and React Native are scoped and not built.
