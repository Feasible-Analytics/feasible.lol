---
title: "The API, webhooks and MCP"
description: "One bearer key reads your stats, manages sites, goals and funnels, signs webhooks, and answers an AI assistant over the built-in MCP server."
lede: "One key. The stats API, the sites API, webhooks and an MCP server, all included."
weight: 110
note: |
  The default rate limit is 10,000 requests an hour per key, on a fixed window.
  That's plenty for a dashboard or a nightly job and not enough to replay your
  whole history through `POST /api/v2/query` in an afternoon. Self-hosters can
  change it; on the hosted service, it's the number.
---

Create a key, and it works everywhere: `feas_`, 32 random bytes, shown once and
stored as a hash. Optional scopes narrow it to reading stats, reading sites,
creating sites, or writing webhooks. Leave the scopes empty and it does all of
it.

Keys belong to the team they were made against, not to the person who made them.
A key reads that team's sites and no others, even if its creator belongs to five
teams, and it stops working the moment they leave.

## What you can do with it

**Read stats.** `POST /api/v2/query` is the modern endpoint and it's the same
query engine the dashboard runs on — fifteen metrics, every dimension, the same
six filter operators, up to 32 filters and five dimensions at a time. There are
also v1 endpoints for aggregate, timeseries, breakdown and realtime visitors if
you want a URL you can `curl` without a JSON body.

**Manage sites.** List, create, read, update and delete sites, and read or write
their tracker configuration. Provisioning a site per customer is a `POST`.

**Manage the analytics config.** Goals, funnels and the custom-property
allow-list are all full CRUD. So is the shared-links list, so an agency can mint
a client dashboard from its own admin tool.

**Manage access.** Team memberships and per-site guests. Worth knowing before
you write the integration: adding a member creates a **revocable invitation that
expires in 48 hours**, not a membership. It returns the same shape whether or not
the address already has an account, so your code doesn't need two paths, and
nobody gets added to your team without agreeing to it.

If your account is locked for non-payment, the API answers `402` with JSON. It
doesn't pretend to be a network error.

## Webhooks

Seven events: `goal.converted`, `import.completed`, `import.failed`,
`site.created`, `traffic.spike`, `traffic.drop`, `usage.over_limit`.

Every delivery is HMAC-signed with a secret you can rotate. Destination URLs are
validated on save and refused if they point at loopback or internal addresses.
Deliveries default to a 10-second timeout, and there's a delivery log with a
manual redelivery button — because the useful question after an outage isn't
"did it fire", it's "send that one again".

## The MCP server is built in

Feasible speaks the Model Context Protocol natively. Streamable HTTP at
`POST /mcp`, or stdio via `feasible mcp` for a local client. Authentication is
the same `feas_` key, and clients that speak OAuth 2.1 — including dynamic
client registration — can get one that way instead.

Ten tools and three prompts. The tools cover listing sites, running a query,
reading realtime visitors, comparing two periods, explaining a traffic change,
creating and updating sites, and reading goals and funnels. The prompts are the
three questions people actually ask: how did last week go, why did traffic drop,
how did that campaign do.

The important part is that it runs on the dashboard's own query engine rather
than a separate service that reimplements it. An assistant asking about last
month gets the number the dashboard shows, computed by the same code, with the
same bot exclusions and the same sampling rules. A bolt-on MCP wrapper is a
second implementation of your analytics, and second implementations drift.

## No plan check, and that's checkable

There is no plan gate in the API package. Not one that returns true for
everybody — none at all, nothing to remove later.

That's a deliberate structural choice, not a promotion. Charging extra to read
your own numbers is a strange thing to sell: the data is already yours, the
query costs us microseconds, and an API is how analytics stops being a website
you visit and becomes a number in your own dashboard. Several tools in this
category put the API on a higher tier, which is how you end up paying for a
plan you don't need to automate a report you already have.

The same key works on the [self-hosted](/open-source/) build, where there are no
plans at all.

## Two things to design around

Above roughly ten million estimated row reads, a query may be answered from a
deterministic sample. The response says so, in `meta.sampling`, with the rate —
and distinct-visitor counts are **refused rather than sampled**, returning
`sampling_requires_exact` so you can decide, instead of quietly handing you an
estimate labeled as a fact.

And the ingest side has a rule of its own: server-side events must carry the
visitor's IP and user agent. All five SDKs — Node, Go, PHP, Python and Ruby —
make them required arguments, because a call without them looks exactly like a
datacenter bot and gets classified as one. The endpoint returns a `400` naming
what's missing rather than a silent success.

Reference lives in [the API docs](/docs/api/), with
[webhooks](/docs/webhooks/) and [MCP](/docs/mcp/) on their own pages.
