---
title: "Self-hosting"
description: "Run Feasible yourself: one Go binary, one directory of SQLite files, every feature, no billing, AGPL-3.0-or-later."
lede: "One binary, one directory, every feature, no billing."
weight: 150
---

One binary and one directory. No Docker, no external database, no queue, and no feature that only
exists in the hosted version.

The software is **AGPL-3.0-or-later**. You can run, modify and self-host it freely. If you offer it
to others as a network service, you have to make your source available to those users.

```
./feasible db migrate
./feasible serve
```

That's the whole deployment.

`serve` runs the dashboard, the API, the tracker and ingestion in one process, which is what almost
every self-hoster should run. The other commands are `ingest`, `db backup`, `rollup`, `seed`,
`api-key`, `mcp`, `billing`, `comp` and `account`.

It runs on 1 core, 512 MB of RAM and 1 GB of disk. Two cores and 2 GB is comfortable. There's nothing
to tune, no column store to size, and no cluster to keep in quorum — the operational claim here is
simplicity, not that SQLite beats a column store at anything.

## Turn off hosted mode

```
FEASIBLE_APP_HOSTED=false
```

It defaults to `true`, so a missing production setting fails in the safe direction. Set it to `false`
and:

- every feature is free and unrestricted;
- billing, usage metering, account locks and payment-driven deletion never start, even if Stripe
  variables are sitting in the environment;
- public password signup and Google signup are **disabled**, so exposing the login page to the
  internet doesn't let strangers create accounts. Invited team members can still accept, and existing
  users can sign in and reset passwords;
- the legal pages substitute your own operator identity.

In production with hosted mode off, all three `FEASIBLE_OPERATOR_*` values are required, and the
process refuses to start while any is missing, naming the ones it wants.

## Creating the first account

Because public signup is off, accounts are created by the operator, from the machine holding
`system.db`:

```
./feasible account create --email owner@example.com --name "Account owner"
```

It makes a verified owner with no trial dates and prints a generated password once — generated rather
than accepted on the command line, so it's never in your shell history or the process list. Everyone
else joins by invitation from inside the app.

## The data directory

Everything lives under `FEASIBLE_APP_DATA_DIR`: `system.db`, one SQLite database per account, the
geolocation files, the bot and spam lists, and the two keys. Back up that directory and you've backed
up the entire install.

Use `./feasible db backup` rather than copying files. It takes a proper consistent snapshot; copying
a SQLite file that's being written to gives you a file that looks fine and isn't.

## Migrations never run on boot

Two processes racing a migration is a classic self-hosting failure, and with one database per account
the operation is slow enough that it has to be deliberate and observable.

A binary newer than its databases refuses to start and tells you to run `db migrate`.

## Configuration

Every variable is documented in `.env.sample`, with a comment and a default. A variable that isn't in
that file doesn't exist — the build fails if the source reads one that's missing.

Values resolve from `$CONFIG_DIR/<NAME>` (for Docker and systemd secrets), then the environment, then
`.env` outside production.

## Shared ingest salt and app key

Set the same `FEASIBLE_INGEST_SALT` on every ingester. Each process combines it with the UTC date
locally, so daily visitor identifiers agree without contacting an app shard. It's a modest protection
for visitor hashes, not an encryption key and not a replacement for network security — see
[privacy](/docs/privacy/).

`FEASIBLE_APP_SECRET_KEY` encrypts two-factor secrets and signs short-lived cookies. Leave it unset
and one is generated on first run into `app.key` in the data directory with mode `0600`.

Lose the app key and every enrolled authenticator app stops working.

## Email

Set `FEASIBLE_APP_MAIL_TRANSPORT=smtp` and point it at a relay. The default `log` transport writes
rendered messages to `tmp/mail/` and sends nothing, which is what makes local development need no
mail service at all.

An unknown transport name is an error rather than a silent fallback. A box that quietly stopped
sending would look healthy while nobody could reset a password.

Set `FEASIBLE_APP_MAIL_FROM` to an address your relay is allowed to send as. A relay rejecting a From
address it doesn't own is the most common reason a self-hoster's mail silently stops arriving.

## Geolocation

Geolocation reads [DB-IP Lite](https://db-ip.com/db/lite.php) databases, which are CC-BY-4.0 and
redistributable, from the data directory:

```
$FEASIBLE_APP_DATA_DIR/geoip/dbip-country-lite.mmdb
$FEASIBLE_APP_DATA_DIR/geoip/dbip-city-lite.mmdb
```

Put either, both or neither there. With the city file present it's used on its own, because it
carries the country too. With neither, every visitor's country is simply unknown — a missing database
degrades the report and never fails an event or stops the process.

A file that's present but unreadable is logged as a warning at start-up and then treated as a missing
one. The process comes up and collects, and every country reads as unknown until you fix the file, so
check the first lines of the log after you drop one in.

Nothing is downloaded automatically, and no license key is read from anywhere. If you want
geolocation, fetch the files and drop them in. City-level data is never a paid feature here; it's
just a bigger file.

A lookup never makes a network call. Private, loopback and link-local addresses are skipped without
one. Traffic classified as coming from a data center isn't geolocated at all and is bucketed as
*Anonymous VPN Service*, because a commercial VPN exit would otherwise report its own country with
total confidence.

## Bot and spam lists

A baseline of bot user-agent substrings and spam referrer domains is compiled into the binary. You
can replace either, and supply the datacenter ranges that have no baseline at all, with newline files
in the data directory:

```
$FEASIBLE_APP_DATA_DIR/lists/bots.txt
$FEASIBLE_APP_DATA_DIR/lists/datacenters.txt      # CIDR blocks or bare addresses
$FEASIBLE_APP_DATA_DIR/lists/referrer-spam.txt
```

Blank lines and `#` comments are ignored. A file that's present **replaces** the built-in list rather
than adding to it.

{{< callout type="warn" title="The lists don't refresh themselves" >}}
They're read once at start-up. Change one and restart. There's no background fetcher and no automatic
update — if you want fresher lists than the binary ships with, that's a cron job and a restart on
your side.
{{< /callout >}}

All three are classifications rather than deletions: the event is stored with its reason and left out
of reports by default, so a wrongly-classified human visitor can be recovered.

## Behind a reverse proxy

Set `FEASIBLE_INGEST_TRUSTED_PROXIES` to the addresses or CIDR ranges of your load balancer and edge
proxies. Only connections from that list may supply `X-Feasible-IP`, `CF-Connecting-IP` or
`X-Forwarded-For`. The list is empty by default, so direct clients can't forge the address used for
fingerprints, geolocation and IP shields.

`X-Feasible-IP` takes precedence, followed by `CF-Connecting-IP`. An `X-Forwarded-For` chain is read
from right to left and the nearest untrusted address is the visitor. That handles proxies which
append to an existing chain without accepting a value placed at the left by a direct client.

Configure every trusted edge to strip or overwrite client-supplied `X-Feasible-IP` and
`CF-Connecting-IP`. An allow-list can't tell a header the proxy created from one it passed through
unchanged. There's more on this in [proxying](/docs/proxying/).

Each process uses one listener, and the app serves signed `/internal/*` routes beside the dashboard.
Put the app sockets on a protected service network and configure the public proxy to deny
`/internal/*`. Internal requests stay HMAC-authenticated; the firewall limits reachability but isn't
itself treated as authentication.

There's no HTTP metrics endpoint. Collect host and process measurements outside Feasible, and use the
site's ingestion health panel for per-customer accepted, dropped and truncated event counts.

## Health probes

Three on each process listener, because public monitoring, process liveness and traffic readiness
answer different questions.

- `GET /health` — can customers use the service. This is the small public response an external uptime
  monitor checks.
- `GET /health/live` — is this process alive. True from the moment the listener is up until it exits.
  This is what a supervisor restarts on.
- `GET /health/ready` — may this process take traffic. It goes false the instant a shutdown begins,
  so a load balancer drains the process before the listener closes. It answers a
  component-by-component report, and a 503 when it isn't ready, so "not ready" always says which
  part.

## Running the ingest tier separately

`FEASIBLE_APP_TRANSPORT=direct` runs ingestion inside `serve`, which is the simple self-hosted shape
and what you want unless you have a reason not to.

Hosted deployments run `feasible ingest` separately. It commits each privacy-safe event to
`FEASIBLE_INGEST_BUFFER_PATH` before answering 202, learns ownership from every URL in
`FEASIBLE_INGEST_SHARDS`, and retries delivery to the owning app until that shard acknowledges the
exact event UUID. The standalone ingester never opens `system.db` or an account database.

## Billing on a self-hosted install

There's none, and nothing is limited because of it.

With no payment provider configured the billing screens say so, the lifecycle clock never starts, and
no account is ever locked or deleted for non-payment. The account lifecycle exists to manage the
hosted service's own subscriptions, not to enforce anything on you.

Everything that's in the hosted product is in this build. There's no cut-down community edition, and
no feature held back for a paid plan — the API has no plan check in it at all. More on that on
[open source](/open-source/).

## API keys

Create them under *Settings → Team and members → API keys*, or from the command line:

```
./feasible api-key create --team 1 --user 1 --name "Reporting"
```

The per-key hourly limit defaults to `FEASIBLE_API_RATE_LIMIT`, which is 10,000. It's a setting
rather than a constant precisely because a limit you can't change on your own hardware isn't a limit,
it's an inconvenience.
