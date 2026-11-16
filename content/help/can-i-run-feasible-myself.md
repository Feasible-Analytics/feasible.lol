---
title: "Can I run Feasible myself?"
description: "Yes. Same binary we run, every feature, no license key, no charge. A config file and three commands and it's up."
category: "self-hosting"
weight: 10
---

Yes. It's the [same build we run](/docs/self-hosting/), with everything switched on. The full walkthrough is on [self-hosted analytics](/open-source/).

```bash
cat > feasible.env <<EOF
FEASIBLE_ENV=production
FEASIBLE_APP_HOSTED=false
FEASIBLE_APP_BASE_URL=https://stats.example.com
FEASIBLE_APP_LISTEN=127.0.0.1:19301
FEASIBLE_APP_DATA_DIR=./data
FEASIBLE_INGEST_SALT=$(openssl rand -hex 32)
FEASIBLE_INGEST_TRUSTED_PROXIES=127.0.0.1,::1
FEASIBLE_OPERATOR_EMAIL=you@example.com
EOF

set -a; . ./feasible.env; set +a
./feasible db migrate
./feasible account create --email you@example.com --name "Your name"
./feasible serve
```

The salt is generated once and has to stay the same afterwards. `FEASIBLE_INGEST_TRUSTED_PROXIES` assumes a TLS proxy on the same machine; leave it out and every visitor arrives as the proxy, which breaks countries and unique visitors. Every setting is explained in [the self-hosting docs](/docs/self-hosting/#required-settings).

`account create` prints a generated password once - generated rather than typed, so it never lands in your shell history or a process list.

**There's no cut-down edition.** No Community build with the good parts removed, no license key, no feature flag that turns off the API or funnels or raw export. [The API has no plan check in it at all](/docs/api/) - not one you could switch on, none written. Goals, funnels, custom properties, webhooks, the MCP server, teams, sharing, exports: all of it, free.

Setting `FEASIBLE_APP_HOSTED=false` changes two categories of thing, and neither is a feature:

- **Billing never starts.** No usage metering, no lifecycle sweeper, no account locks, even if payment credentials are sitting in the environment.
- **Public signup is off.** You create accounts from the machine with the database, so exposing the login page to the internet doesn't let strangers in. Invited team members still accept invitations normally.

It defaults to `true`, so a missing setting fails in the safe direction rather than the embarrassing one.

Two things to know about. Migrations never run automatically - `db migrate` is a command you type, on purpose, because a binary that migrates your database on boot will eventually do it at the worst moment. And you're the operator now: backups, TLS, upgrades and the pager are yours.

[What it costs to run](/help/what-does-it-cost-to-run-feasible-yourself/) · [the license](/help/what-license-is-feasible-under/) · [hosted versus self-hosted](/help/whats-the-difference-between-hosted-and-self-hosted/)
