---
title: "Run it yourself, or let us run it"
seotitle: "Open source and self-hosting"
description: "Feasible is AGPL-3.0-or-later. The whole product, the same build we host, on one binary and a SQLite file. Self-host it on 512 MB, or pay us $9.99 to run it."
lede: "Feasible is open source under AGPL-3.0-or-later. Not a cut-down edition — the same build we run, with every feature in it."
toc: true
checked: 2026-09-03
---

The code is at
**[github.com/Feasible-Analytics/app.feasible.lol](https://github.com/Feasible-Analytics/app.feasible.lol)**,
under the **GNU Affero General Public License, version 3 or later**.

We'll start with the part most open-source pages skip: **that is the same license
Plausible uses**, and it is *less* permissive than Umami's MIT. If you're shopping for
the freest license in this category, it isn't ours. AGPL is copyleft with a network
clause — run a modified copy as a service for other people and you owe those people
your source.

So the license isn't the argument. This is.

## What "open source" means here

### 1. There's no Community Edition

There is one build. The binary we run at app.feasible.lol is compiled from the
repository you can clone, and there is no second, smaller version of it for people who
don't pay.

That's worth stating because open core is the normal arrangement in this category, and
it's usually documented in the vendor's own repo. Plausible's repository carries an
[`extra/` directory with its own copyright notice](https://github.com/plausible/analytics/blob/master/extra/COPYING.txt)
— "no rights to use, distribute or otherwise exploit this software are granted to you"
— and their build excludes it from the Community Edition compile path. PostHog has an
[`ee/` directory](https://github.com/PostHog/posthog/blob/master/ee/LICENSE) under an
enterprise license. Matomo's premium plugins, including Funnels, are
[proprietary under InnoCraft's EULA](https://matomo.org/faq/general/matomo-analytics-licences-for-core-tracker-and-plugins/)
rather than the GPL-3.0 that covers the core.

None of that is dishonest and none of it is hidden; those companies wrote it down
themselves. It just means the code you can run is not the code they run.

**Ours has no such directory.** Checked September 3, 2026: no `ee/`, no `extra/`, no
license-key module, no build tag that turns features off. If you find one, that's a bug
report we'd want.

### 2. No feature is held back for the paid plan

Funnels, custom properties, goals, teams and roles, shared dashboards, email reports,
alerts, the full Stats API, the Sites API, webhooks and the built-in MCP server are all
in every copy. The API package contains **no plan check at all** — there is no code path
where a subscription tier decides whether a request is allowed.

**Raw event export is a button.** Not an add-on, not a tier, not a sales call. You ask
for an export and you get a ZIP with ten roll-up CSVs and your raw events in it, and
that works whether you pay us $99 a year or nothing at all. It also keeps working after
you cancel — export is available in every state an account can be in.

For comparison, and to be specific rather than vague: at Plausible, scheduled raw event
export is an Enterprise feature — there's no self-serve plan you can buy that gets your
own raw events out.

### 3. You can actually run it

This is the part that decides whether "self-hostable" means anything.

Feasible is **one Go binary and one SQLite file per account**. No Postgres, no
ClickHouse, no Redis, no queue, no Docker, no reverse proxy required. Nothing to tune,
nothing to shard, nothing that needs a second machine to be healthy.

| | Minimum | Comfortable |
|---|---|---|
| CPU | 1 core | 2 cores |
| Memory | **512 MB** | 2 GB |
| Disk | 1 GB, plus your data | SSD |
| OS | Linux, macOS or BSD — x86-64 or arm64 | |

At a million pageviews a month, a year of data is a 294 MB database. One process
accepts around 6,000 events a second.

That number matters most next to the alternative. Column-store analytics stacks are
excellent at what they do, and they're a different kind of operational commitment —
[ClickHouse's own documentation](https://clickhouse.com/docs/en/operations/tips)
recommends 32 GB of RAM for a production server, and Plausible's Community Edition
README asks for 2 GB.

To be clear about what we're not claiming: SQLite does not store bytes more
efficiently than a column store. It doesn't. The claim is operational — one file, one
process, nothing to tune, and a person with a $4 VPS and no ops team can keep it
running.

## Getting it running

Grab a release binary — Linux, macOS and Windows, on amd64 and arm64, each with a
`SHA256SUMS` file — or build from source with Go 1.26.

```bash
cp .env.sample .env
# set FEASIBLE_APP_HOSTED=false

feasible db migrate
feasible account create --email owner@example.com --name "Account owner"
feasible serve
```

That's the whole install. Four things worth knowing about it:

- **Migrations never run on their own.** `feasible db migrate` is an explicit command,
  so a restart can't rewrite your schema while you're asleep. `feasible db backup`
  writes a consistent snapshot of every database.
- **`account create` prints a generated password once.** It generates rather than
  accepts one so your password never lands in shell history or a process list.
- **Public signup is off when `FEASIBLE_APP_HOSTED=false`**, which means exposing the
  login page to the internet doesn't let strangers create accounts. You create them from
  the machine that holds the database. Invited teammates can still accept invitations,
  and existing users can still sign in and reset passwords.
- **In production, three operator values are required** —
  `FEASIBLE_OPERATOR_NAME`, `FEASIBLE_OPERATOR_ADDRESS` and
  `FEASIBLE_OPERATOR_EMAIL` — and the process refuses to start without them, listing
  what's missing. They're what the legal and privacy pages show your users, since on
  your install the operator is you, not us.

Every environment variable is documented in `.env.sample`, and `make check-env` fails
the build if one isn't.

## What the license actually asks of you

Not legal advice — read the license, and ask your own lawyer if it matters to you. But
the shape of it:

**Running it, unmodified, for yourself or your company: nothing is triggered.** Section
13 of the AGPL fires when you *modify* the program *and* other people interact with your
modified version over a network. Running the stock build isn't that.

**Modifying it and running it internally: still fine in practice.** The obligation runs
to the users of your modified version — your own staff — and they work for the entity
that already has the source.

**Modifying it and selling it to other people as a service: that's the part the license
is for.** You owe your users the corresponding source of your modified version. This is
the anti-freeloading clause and it's working as intended.

One practical note, because it comes up in procurement: some large organizations ban
AGPL software by policy. Google's published open source policy is the well-known
example, and the Apache Software Foundation and CNCF both exclude AGPL from their
allowed-license lists. If you work somewhere with a rule like that, this is a real
constraint and you should know it before you evaluate us, not after.

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

**We'd rather you used the hosted service.** That's how this gets paid for, and at $99 a
year it is almost certainly cheaper than your time. Self-hosting exists for the people
whose data can't leave their own network, the people who enjoy this sort of thing, and —
mostly — as an answer to a question every small vendor deserves to be asked.

*What if you disappear?*

Then the software doesn't. You have the source, it builds into one binary, your data is
already a SQLite file you can open with any tool that speaks SQL, and the export button
works whether we're around or not. That's the promise the license makes on our behalf.
It isn't the pitch.

## Contributing

Issues and pull requests go to
[the repository](https://github.com/Feasible-Analytics/app.feasible.lol/issues). There's
no CLA to sign. The product is deliberately small and we say no to features fairly
often, so if you're about to build something substantial, open an issue first and save
yourself the afternoon.

The tracking script, the SDKs and this website live alongside it. Bot and datacenter
lists ship inside the binary and can be replaced with your own files on disk without
rebuilding — they don't update themselves at runtime, so if you want fresher lists,
that's the hook.

[What the hosted service costs](/pricing/) · [Why we built it](/why-feasible/) ·
[Security](/security/)
