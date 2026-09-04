---
title: "What's the difference between hosted and self-hosted?"
description: "Who runs the server. Same binary, same features, no cut-down edition — one has a bill and a pager, the other has you."
category: "self-hosting"
weight: 40
---

Who runs the server. That's genuinely the whole difference.

It's the same binary. Not a stripped Community build — the thing we host is the thing you can compile.

**Identical in both:** every metric and dimension, goals, funnels, custom properties, revenue tracking, shields, path cleaning, the ingestion health panel, teams and roles, public dashboards and shared links, email reports and alerts, annotations, imports, raw event export, the full API, webhooks, the MCP server, two-factor. No licence key, no feature flag, no plan check.

**Only on hosted:** the bill, and the parts that exist to support it — usage metering, the account lifecycle, public signup, the pricing and billing screens.

**Only on self-hosted:** you're the operator. You create accounts from the CLI rather than a signup form, because public registration is off by default so exposing the login page doesn't let strangers in.

| | Hosted | Self-hosted |
|---|---|---|
| Price | $9.99/month, $99/year | Free |
| Pageview limit | 1,000,000 a month | Whatever your box does |
| Where the data lives | [Oregon, USA](/help/where-is-my-data-stored/) | Wherever you put it |
| Backups, TLS, upgrades | Ours | Yours |
| When it breaks at 2am | Ours | Yours |

Pick hosted if you'd rather not carry a pager for a pageview counter. That's most people, and it's why we can charge for it.

Pick self-hosted if you already run servers, or if the data genuinely can't leave your jurisdiction, or if you just want to. [What it costs to run](/help/what-does-it-cost-to-run-feasible-yourself/) is a small VPS.

You're not locked into either. [The export](/help/how-do-i-export-my-data/) is raw events, and [the importer](/help/can-i-import-a-csv/) reads the same files, so moving between them is a download and an upload.
