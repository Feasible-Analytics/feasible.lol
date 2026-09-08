---
title: "Self-hosted analytics on one binary"
seotitle: "Self-hosted analytics - run Feasible on your own server"
description: "Self-hosted web analytics: one Go binary, one SQLite file, every feature, on a 512 MB box. AGPL-3.0-or-later, or let us host it for $9.99 a month."
lede: "The same build we run at app.feasible.lol, on a server you own. What it needs, what you type, and what you're taking on when you become the operator."
aliases:
  - "/self-hosted-analytics/"
toc: true
checked: 2026-09-03
---

Self-hosted analytics usually means a database server, a column store, a queue,
and a Docker file that assumes you already know all three. This is one Go binary
and one directory of SQLite files.

It's also the same build we run. There's no Community Edition, no license key and
no feature flag that turns the API off when you stop paying - the binary at
app.feasible.lol is compiled from the repository you can clone, at
**[github.com/Feasible-Analytics/app.feasible.lol](https://github.com/Feasible-Analytics/app.feasible.lol)**,
under the GNU Affero General Public License, version 3 or later. If that's the
part you came for, it's all on
[the license and what's in the repo](/open-source-web-analytics/).

The rest of this page is about running it.

## What it takes to run

No Postgres, no ClickHouse, no Redis, no queue, no Docker, no reverse proxy
required. Nothing to tune, nothing to shard, nothing that needs a second machine
to be healthy.

| | Minimum | Comfortable |
|---|---|---|
| CPU | 1 core | 2 cores |
| Memory | **512 MB** | 2 GB |
| Disk | 1 GB, plus your data | SSD |
| OS | Linux, macOS or BSD - x86-64 or arm64 | |

At a million pageviews a month, a year of data is about 3.5 GB. One process
accepts around 4,700 events a second for a single account, and takes about 50
milliseconds to answer - that answer means the event is committed to disk, not
queued. A stored event is about 210 bytes.

That number matters most next to the alternative. Column-store analytics stacks
are excellent at what they do, and they're a different kind of operational
commitment - [ClickHouse's own
documentation](https://clickhouse.com/docs/en/operations/tips) recommends 32 GB
of RAM for a production server, and Plausible's Community Edition README asks
for 2 GB.

To be clear about what we're not claiming: SQLite doesn't store bytes more
efficiently than a column store. It doesn't. The claim is operational - one file,
one process, nothing to tune, and a person with a $4 VPS and no ops team can keep
it running.

## Getting it running

Grab a release binary - Linux, macOS and Windows, on amd64 and arm64, each with a
`SHA256SUMS` file - or build from source with Go 1.26.

```bash
cp .env.sample .env
# set FEASIBLE_APP_HOSTED=false

feasible db migrate
feasible account create --email owner@example.com --name "Account owner"
feasible serve
```

That's the whole install. Four things worth knowing about it:

- **Migrations never run on their own.** `feasible db migrate` is an explicit
  command, so a restart can't rewrite your schema while you're asleep.
  `feasible db backup` writes a consistent snapshot of every database.
- **`account create` prints a generated password once.** It generates rather than
  accepts one so your password never lands in shell history or a process list.
- **Public signup is off when `FEASIBLE_APP_HOSTED=false`**, which means exposing
  the login page to the internet doesn't let strangers create accounts. You create
  them from the machine that holds the database. Invited teammates can still
  accept invitations, and existing users can still sign in and reset passwords.
- **In production, three operator values are required** - `FEASIBLE_OPERATOR_NAME`, `FEASIBLE_OPERATOR_ADDRESS` and
  `FEASIBLE_OPERATOR_EMAIL` - and the process refuses to start without them,
  listing what's missing. They're what the legal and privacy pages show your
  users, since on your install the operator is you, not us.

Every environment variable is documented in `.env.sample`, and `make check-env`
fails the build if one isn't. The full reference - the data directory, the shared
ingest salt, email, geolocation, reverse proxies, health probes and running the
ingest tier on its own box - is in [the self-hosting
docs](/docs/self-hosting/).

## Every feature, on your box too

Funnels, custom properties, goals, teams and roles, shared dashboards, email
reports, alerts, the full Stats API, the Sites API, webhooks and the built-in MCP
server are all in your copy. The API package contains **no plan check at all** - there's no code path where a subscription tier decides whether a request is
allowed.

Raw event export is a button, and it works whether you pay us $99 a year or
nothing. You ask for an export and you get a ZIP with ten roll-up CSVs and your
raw events in it.

Setting `FEASIBLE_APP_HOSTED=false` changes two things, and neither is a feature:
billing never starts, and public signup is off.

## Hosted or self-hosted

| | Hosted at $9.99/month | Self-hosted |
|---|---|---|
| Features | All of them | All of them |
| Monthly limit | 1,000,000 pageviews and events | Whatever your server does |
| Price | $9.99/month or $99/year | Free |
| Updates | We deploy them | You run `db migrate` |
| Backups, uptime, TLS, email delivery | Ours | Yours |
| Your data lives | Newberg, Oregon, USA | Wherever you put it |
| Support | [help@feasible.lol](mailto:help@feasible.lol) | GitHub issues, best effort |

The disk is never the expensive part. The expensive part is you: upgrades, TLS
renewals, disk alarms, the 2am one. If your answer to that is "fine, I already run
servers", self-hosting is cheap. If it's "I'd rather not",
[$9.99 a month](/pricing/) is the same software with the pager pointed at us.

**We'd rather you used the hosted service.** That's how this gets paid for, and at
$99 a year it's almost certainly cheaper than your time. Self-hosting exists for
the people whose data can't leave their own network, the people who enjoy this
sort of thing, and - mostly - as an answer to a question every small vendor
deserves to be asked.

*What if you disappear?*

Then the software doesn't. You have the source, it builds into one binary, your
data is already a SQLite file you can open with any tool that speaks SQL, and the
export button works whether we're around or not. That's the promise the license
makes on our behalf. It isn't the pitch.

## Contributing

Issues and pull requests go to
[the repository](https://github.com/Feasible-Analytics/app.feasible.lol/issues).
There's no CLA to sign. The product is small and we say no to
features fairly often, so if you're about to build something substantial, open an
issue first and save yourself the afternoon.

The tracking script, the SDKs and this website live alongside it. Bot and
datacenter lists ship inside the binary and can be replaced with your own files on
disk without rebuilding - they don't update themselves at runtime, so if you want
fresher lists, that's the hook.

[What the hosted service costs](/pricing/) ·
[open source web analytics](/open-source-web-analytics/) ·
[Why we built it](/why-feasible/) · [Security](/security/)
