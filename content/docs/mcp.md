---
title: "The MCP server"
description: "A built-in Model Context Protocol server so an AI assistant can read your analytics, over streamable HTTP or stdio."
lede: "Letting an assistant read your analytics, over HTTP or stdio."
weight: 130
---

There's a Model Context Protocol server built in, so an AI assistant can read your analytics and ask
follow-up questions without anybody writing an integration.

It's the same query engine the dashboard uses, behind the same [API keys](/docs/api/#api-keys) and
the same rate limits. It's in every plan and every build, hosted or self-hosted.

## Connecting over HTTP

The endpoint is `POST /mcp`, streamable HTTP, protocol version `2025-06-18`. Authenticate with
`Authorization: Bearer …`, carrying either an API key or an OAuth access token.

```
{
  "mcpServers": {
    "feasible": {
      "url": "https://app.feasible.lol/mcp",
      "headers": { "Authorization": "Bearer feas_…" }
    }
  }
}
```

`GET /mcp` is a deliberate 405. This server never opens a stream back to the client, and answering a
long-poll it won't use would be a socket held open for nothing.

## Connecting a client that speaks OAuth

Discovery lives at `/.well-known/oauth-authorization-server` and
`/.well-known/oauth-protected-resource`, client registration is open, and PKCE is required — `S256`
only, never `plain`.

Access tokens last an hour, refresh tokens thirty days, and an authorization code is good for one
minute and one use. Replaying one revokes the whole grant.

The consent screen asks for an API key rather than your password, so authorizing an assistant never
puts your account credentials in front of it.

## Connecting over stdio

For a desktop assistant that launches a binary itself:

```
{
  "mcpServers": {
    "feasible": {
      "command": "feasible",
      "args": ["mcp"],
      "env": { "FEASIBLE_MCP_API_KEY": "feas_…" }
    }
  }
}
```

The key is an environment variable rather than a flag, because a secret on a command line is visible
in the process list to everyone on the machine.

## The tools

Eleven of them, all working:

- `list_sites` — the sites this credential can read, with the time zone each one's days are counted
  in.
- `query_stats` — the full query surface: [metrics, dimensions, filters](/docs/api/#reading-numbers-back),
  sorting and pagination.
- `get_realtime_visitors` — who's on the site now.
- `compare_periods` — a period and the one before it, with the change. It's its own tool because both
  windows have to be resolved against one clock; two separate calls near midnight compare the wrong
  days.
- `explain_traffic_change` — breaks a movement in visitors, visits, pageviews or events down by
  source, channel, campaign, page, country, device, browser and operating system, so the answer is
  "paid social fell by a third" rather than "traffic is down".
- `list_goals`, `create_goal` — read and create [conversions](/docs/goals-funnels/), including revenue
  goals and property constraints.
- `list_funnels`, `get_funnel` — the saved funnels, and one funnel's per-step numbers.
- `create_site`, `update_site` — register a site and get its snippet; change a domain, name, time
  zone or public setting.

## Resources and prompts

Reading `feasible://site/{domain}/schema` gives an assistant the whole vocabulary for one site in a
single call: its metrics, its dimensions, the custom properties that actually exist on it, its goals,
the date-range presets and the filter operators.

That's what stops a model guessing a dimension name and getting a 400.

Three prompts ship with it: `weekly_traffic_review`, `why_did_traffic_drop` and
`campaign_performance`.

## What it won't do

A tool that fails returns a successful response carrying the error, so the model can read the reason
and correct itself instead of seeing a transport failure.

Unknown arguments are refused rather than ignored.

And a locked account is refused here exactly as it is on the API, with a code the client can
recognize rather than an empty answer that reads as "you have no data".
