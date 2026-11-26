---
title: "Self-hosting"
description: "Run Feasible yourself: one Go binary, one directory of SQLite files, every feature, no billing, AGPL-3.0-or-later."
lede: "One binary, one directory, every feature, no billing."
weight: 150
---

One binary and one directory. No Docker required, no external database, no queue, and no feature
that only exists in the hosted version.

The software is **AGPL-3.0-or-later**. You can run, modify and self-host it freely. If you offer it
to others as a network service, you have to make your source available to those users.

## Get the binary

Download the archive for your platform from the
[latest release](https://github.com/Feasible-Analytics/app.feasible.lol/releases/latest). There are
builds for Linux, macOS and Windows, on amd64 and arm64, and a `SHA256SUMS` file to check them
against.

```
tar -xzf feasible_*_linux_amd64.tar.gz
./feasible --version
```

Or build it from source with Go 1.26 or newer:

```
go build -o feasible ./cmd/feasible
```

If you run everything in containers, there's also [an image of the same binary](#run-it-with-docker).

## Start it

Write the configuration to a file, with your own hostname and email. The salt is generated once here
and has to stay the same afterwards, because it's part of how visitors are counted each day.

```
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
```

`FEASIBLE_INGEST_TRUSTED_PROXIES=127.0.0.1,::1` assumes a TLS proxy on the same machine, which is
what the listen address above is for. It's that machine's own address, over IPv4 and IPv6. Leave it
out and every visitor arrives from the proxy's address, which breaks countries and unique visitors.
See [behind a reverse proxy](#behind-a-reverse-proxy).

Then create the databases, make your account and start it:

```
set -a; . ./feasible.env; set +a
./feasible db migrate
./feasible account create --email you@example.com --name "Your Name"
./feasible serve
```

`account create` prints a generated password once. Sign in at your base URL, add a site, and
[install the snippet](/docs/installation/).

`serve` runs the dashboard, the API, the tracker and ingestion in one process, which is what almost
every self-hoster should run. The other commands are `ingest`, `db migrate`, `db backup`, `rollup`,
`imports`, `seed`, `api-key`, `mcp`, `billing`, `comp`, `account`, `avatar` and `mail`.
`./feasible help` describes each one.

That's enough to try it. To keep it running on a server, [use systemd](#keep-it-running-with-systemd).

## Required settings

A production install with hosted mode off needs these five. Leave out the operator email, or keep
the development salt, and the process refuses to start and names the variable.

| Variable | What it does |
|---|---|
| `FEASIBLE_ENV=production` | Production mode. It defaults to `development`, which reads `.env` and accepts the development salt. |
| `FEASIBLE_APP_HOSTED=false` | Turns hosted mode off. It defaults to `true`. [What changes](#turn-off-hosted-mode). |
| `FEASIBLE_INGEST_SALT` | At least 32 characters, and not the development default. Set it once and don't change it. |
| `FEASIBLE_OPERATOR_EMAIL` | The support address the people using your install write to. It's the only `FEASIBLE_OPERATOR_*` setting. |
| `FEASIBLE_APP_BASE_URL` | The public address people type. It goes into the snippet, every email link and the sign-in redirects, so it has to be a full URL. It defaults to `http://localhost:19300`. |

Everything else has a working default. `FEASIBLE_APP_LISTEN` is `127.0.0.1:19301` and
`FEASIBLE_APP_DATA_DIR` is `./data`. The one default to change behind a proxy is
`FEASIBLE_INGEST_TRUSTED_PROXIES`, which is empty and trusts nobody.

## How big a server

We haven't measured a minimum machine, so we don't publish one. The benchmarks we have are in
[`internal/bench/RESULTS.md`](https://github.com/Feasible-Analytics/app.feasible.lol/blob/main/internal/bench/RESULTS.md),
taken on a 10-core laptop:

- Under sustained load, one account takes about 4,700 events a second, each committed to disk before
  it's acknowledged. A site doing a million pageviews a month averages under half an event a second.
- A million pageviews, with every index and roll-up built, is about 300 MB on disk.
- A 12-month report on that data answers in 0.4 to 0.7 seconds from the roll-ups.

There's nothing to tune, no column store to size, and no cluster to keep in quorum. The operational
claim here is simplicity, not that SQLite beats a column store at anything.

Want to try it without paying for a server? Every release has a Linux arm64 build, so the binary runs
on the free Arm virtual machines some clouds offer. Dmytro Klymentiev's
[free VPS comparison](https://klymentiev.com/blog/free-vps) lists what each free tier gives you and
the catches that come with it.

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
- the app's support link points at `FEASIBLE_OPERATOR_EMAIL` instead of us.

## Creating the first account

Because public signup is off, accounts are created by the operator, from the machine holding
`system.db`:

```
./feasible account create --email owner@example.com --name "Account owner"
```

It makes a verified owner with no trial dates and prints a generated password once - generated rather
than accepted on the command line, so it's never in your shell history or the process list. Run it
again for each separate account. Teammates join by invitation from inside the app.

## Keep it running with systemd

On a Linux server, run it as a service under its own user. Here's one layout: the binary in
`/usr/local/bin`, the settings in `/etc/feasible`, the data in `/var/lib/feasible`.

Make the user and the folders, then install the binary and your settings file:

```
sudo useradd --system --home-dir /var/lib/feasible --shell /usr/sbin/nologin feasible
sudo install -d -o feasible -g feasible -m 0750 /var/lib/feasible
sudo install -m 0755 feasible /usr/local/bin/feasible
sudo install -d -m 0755 /etc/feasible
sudo install -m 0640 -g feasible feasible.env /etc/feasible/feasible.env
```

In `feasible.env`, give the data directory as a full path, so every command finds the same data
whatever folder it's run from:

```
FEASIBLE_APP_DATA_DIR=/var/lib/feasible/data
```

Save this as `/etc/systemd/system/feasible.service`:

```
[Unit]
Description=Feasible analytics
After=network-online.target
Wants=network-online.target

[Service]
User=feasible
Group=feasible
WorkingDirectory=/var/lib/feasible
EnvironmentFile=/etc/feasible/feasible.env
ExecStart=/usr/local/bin/feasible serve
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
```

Create the databases and your account as the `feasible` user, with the same settings, then start the
service:

```
sudo -u feasible sh -c 'set -a; . /etc/feasible/feasible.env; set +a; /usr/local/bin/feasible db migrate'
sudo -u feasible sh -c 'set -a; . /etc/feasible/feasible.env; set +a; /usr/local/bin/feasible account create --email you@example.com --name "Your Name"'
sudo systemctl daemon-reload
sudo systemctl enable --now feasible
```

Run every other `feasible` command the same way, as the `feasible` user. Run one as root and it can
leave files in the data directory that the service can't write to.

`Restart=on-failure` brings it back after a crash. A `systemctl stop` isn't a failure, so it stays
stopped. `journalctl -u feasible` shows the log, including why it won't start when it refuses to,
such as a database that needs `db migrate`.

If a value in `feasible.env` has spaces in it, put it in double quotes:
`FEASIBLE_APP_MAIL_FROM="Stats <stats@example.com>"`. systemd and the shell then read it the same way.

## Run it with Docker

You don't need Docker. If you run everything in containers, there's an image of the same binary on
GitHub's container registry:

```
docker pull ghcr.io/feasible-analytics/feasible:latest
```

It's built for linux/amd64 and linux/arm64. The download is 9.7 MB on amd64 and 8.9 MB on arm64,
and the binary inside is byte for byte the one in the Linux release archive. Every release gets a
tag of its release number without the `v`, such as `0.0.78`, and `latest` follows the newest. The base is
distroless static: time zone data and CA certificates, with no shell and no package manager. It
runs as a non-root user, uid 65532.

There's no database or queue container to go with it, because there's no database or queue server.
One container and one volume is the whole install.

### Start it with Compose

Put the repository's
[`compose.yaml`](https://github.com/Feasible-Analytics/app.feasible.lol/blob/main/compose.yaml) in
a folder:

```
curl -O https://raw.githubusercontent.com/Feasible-Analytics/app.feasible.lol/main/compose.yaml
```

It's one service: the image, a named volume called `feasible-data` mounted at `/data`, your settings
from `feasible.env`, and port 19301 published on `127.0.0.1` only, for a TLS proxy on the same
machine. It restarts unless you stop it.

Write `feasible.env` next to it. It's the file from [Start it](#start-it) without the listen address
and the data directory, because the image sets those:

```
cat > feasible.env <<EOF
FEASIBLE_APP_BASE_URL=https://stats.example.com
FEASIBLE_INGEST_SALT=$(openssl rand -hex 32)
FEASIBLE_INGEST_TRUSTED_PROXIES=172.16.0.0/12
FEASIBLE_OPERATOR_EMAIL=you@example.com
EOF
```

The image also sets `FEASIBLE_ENV=production` and `FEASIBLE_APP_HOSTED=false`, so two of the
[required settings](#required-settings) are already done. It listens on port 19301 on every
interface inside the container and keeps its data in `/data`. Every other setting is the same
`FEASIBLE_*` variable as the binary's, and goes in the same file. Leave a required one out and the
container stops and names it, such as
`FEASIBLE_INGEST_SALT: production cannot run with the development default`.

Then create the databases, make your account and start it:

```
docker compose run --rm feasible db migrate
docker compose run --rm feasible account create --email you@example.com --name "Your Name"
docker compose up -d
```

Every other command runs the same way. `docker compose run --rm feasible <command>` works whether
the container is running or stopped. `docker compose exec feasible feasible <command>` runs one
inside the running container: the first `feasible` is the service, the second is the program.

### The proxy

Point your TLS proxy at `127.0.0.1:19301`, the same address as the binary's. Inside the container,
though, the proxy's connections don't arrive from `127.0.0.1`. They come through Docker's network
gateway, which is usually an address in `172.16.0.0/12` (ours was `172.19.0.1`). That's
why the trusted proxy above is that range. If your Docker hands out other ranges,
`docker network inspect` shows the gateway to trust. The rest of
[behind a reverse proxy](#behind-a-reverse-proxy) applies unchanged.

### The volume

Everything is in the `feasible-data` volume, at `/data`, laid out exactly like the binary's
[data directory](#the-data-directory): the databases, `app.key`, `script.key`, `backups/` and the
rest. To use a folder on the host instead of a named volume, `chown 65532:65532` it first. The
container runs as that user and can't write to a folder it doesn't own.

### Backups in a container

```
docker compose exec feasible feasible db backup
docker compose cp feasible:/data/backups ./backups
```

The first writes a snapshot into `/data/backups`, inside the volume. The second copies them out to a
`backups` folder on the host, to send off the machine from there. With the container stopped, use
`docker compose run --rm feasible db backup` instead. The [keys](#backups) are in the volume too, so
copy `app.key` and `script.key` out once the same way and keep them with your backups.

To restore, do the file swap from [restore a backup](#restore-a-backup) inside the volume. The image
has no shell, so do it from a throwaway container that mounts the same volume and runs as the same
user. With one account, and the time stamp of the backup you're restoring:

```
docker compose stop
docker run --rm --volumes-from "$(docker compose ps -aq feasible)" --user 65532:65532 -w /data busybox sh -c '
  set -e
  mkdir -p before-restore/accounts/000001
  mv system.db* before-restore/
  mv accounts/000001/analytics.db* before-restore/accounts/000001/
  cp backups/system-20261116T171127Z.db system.db
  cp backups/account-000001-20261116T171127Z.db accounts/000001/analytics.db
'
docker compose up -d
```

If the image is newer than the backup, run `docker compose run --rm feasible db migrate` before
starting it. Once you've checked the dashboard, delete `before-restore` the same way, with
`rm -r before-restore` as the script.

### Upgrade the image

Back up with the old image, then migrate with the new one:

```
docker compose stop
docker compose run --rm feasible db backup
docker compose pull
docker compose run --rm feasible db migrate
docker compose up -d
```

`latest` moves with every release. To choose when you upgrade, swap it in `compose.yaml` for a
release number, such as `ghcr.io/feasible-analytics/feasible:0.0.78`. Rolling back works like
[rolling back](#rolling-back) the binary: put the old tag back, and if `db migrate` changed anything,
restore the backup first.

## The data directory

Everything lives under `FEASIBLE_APP_DATA_DIR`, which is `/data` in the
[container image](#run-it-with-docker):

- `system.db`, which holds users, teams and sites;
- `accounts/`, one SQLite database per account;
- `app.key` and `script.key`, made on the first start;
- `backups/`, where `db backup` writes unless you point it somewhere else;
- `favicons/`, a cache of the [source icons](#what-it-connects-to) the dashboard shows;
- `imports/` and `exports/`: an uploaded import until it's been read, and the exports people prepare;
- `geoip/` and `lists/`, if you add [geolocation](#geolocation) or [list](#bot-and-spam-lists) files.

The databases, the two keys and your settings file are the whole install. Everything else can be
made again.

## Backups

`./feasible db backup` writes a consistent snapshot of every database. It's safe to run while
Feasible is running. Each run writes one file per database into `backups/` in the data directory,
all stamped with the same time:

```
backups/system-20261116T171127Z.db
backups/account-000001-20261116T171127Z.db
```

`--out /some/other/disk` writes them somewhere else. Either way, copy them off the machine, because
a backup on the same disk as the data is lost with it. Old snapshots aren't deleted for you.

Don't `cp` the live database files. Copying a SQLite file that's being written to gives you a file
that looks fine and isn't.

`db backup` doesn't copy `app.key`, `script.key` or your settings file. The keys don't change after
the first start, so copy them once and keep them with your backups. Lose `app.key` and every enrolled
authenticator app stops working. Lose `script.key` and every site's script address changes, so the
snippets already on your sites stop loading. The settings file holds your salt.

## Restore a backup

There's no restore command. A snapshot is an ordinary SQLite database, so you restore by putting the
files back while Feasible is stopped:

1. Stop Feasible.
2. Move the live databases out of the way rather than deleting them: `system.db` and each
   `accounts/<id>/analytics.db`, each with its `-wal` and `-shm` files if they're there. Don't leave
   a `-wal` file behind. SQLite would try to apply it to the restored database, which can corrupt
   it.
3. Copy the snapshots from one backup run into place, renamed. `system-<time>.db` becomes
   `system.db`, and `account-000001-<time>.db` becomes `accounts/000001/analytics.db`, and the same
   for every other account. The files have to belong to the user Feasible runs as.
4. If the binary is newer than the backup, run `db migrate`.
5. Start Feasible.

On the systemd layout above, with one account, that's:

```
sudo systemctl stop feasible
sudo -u feasible sh -c '
  set -e
  cd /var/lib/feasible/data
  mkdir -p ../before-restore/accounts/000001
  mv system.db* ../before-restore/
  mv accounts/000001/analytics.db* ../before-restore/accounts/000001/
  cp backups/system-20261116T171127Z.db system.db
  cp backups/account-000001-20261116T171127Z.db accounts/000001/analytics.db
'
sudo systemctl start feasible
```

Anything collected after the snapshot was taken is gone. Once you've checked the dashboard, delete
`before-restore`.

On a new machine, put `app.key`, `script.key` and your settings file in place before the first start
too. Otherwise Feasible makes new keys, with the problems [above](#backups).

## Upgrade

Migrations never run on their own. Two processes racing a migration is a classic self-hosting
failure, and with one database per account the step has to be deliberate and observable. A binary
newer than its databases refuses to start and tells you to run `db migrate`. A binary older than
them refuses too.

To move to a new release:

1. Download the new archive and `SHA256SUMS` from the
   [releases page](https://github.com/Feasible-Analytics/app.feasible.lol/releases), check it with
   `sha256sum --check --ignore-missing SHA256SUMS`, and unpack it in a new folder.
2. Stop Feasible.
3. Run `db backup`. That's what you'd roll back to.
4. Put the new binary in place of the old one, and keep the old one.
5. Run `db migrate`. It visits `system.db` and every account database, and if it stops partway,
   running it again picks up where it left off.
6. Start Feasible.

On the systemd layout above, from the folder you unpacked the new release into:

```
sudo systemctl stop feasible
sudo -u feasible sh -c 'set -a; . /etc/feasible/feasible.env; set +a; /usr/local/bin/feasible db backup'
sudo cp /usr/local/bin/feasible /usr/local/bin/feasible.old
sudo install -m 0755 feasible /usr/local/bin/feasible
sudo -u feasible sh -c 'set -a; . /etc/feasible/feasible.env; set +a; /usr/local/bin/feasible db migrate'
sudo systemctl start feasible
```

**If this install imported history before v0.0.68**, run `feasible imports rename` once after
`db migrate`. It rewrites those imports into the names new visits use, so one browser or source
shows as one row. `--dry-run` prints what it would change and writes nothing. It only touches
imported rows, never collected events, and the backup from step 3 covers it:

```
sudo -u feasible sh -c 'set -a; . /etc/feasible/feasible.env; set +a; /usr/local/bin/feasible imports rename --dry-run'
sudo -u feasible sh -c 'set -a; . /etc/feasible/feasible.env; set +a; /usr/local/bin/feasible imports rename'
```

### Rolling back

If `db migrate` said every database was already current, the release didn't change the schema. Stop
Feasible, put the old binary back and start it.

If it migrated anything, the old binary won't start on the newer databases. It says the database is
at a schema version it doesn't know. Stop Feasible, put the old binary back,
[restore](#restore-a-backup) the backup from step 3, and start it. Anything collected since that
backup is lost.

## Configuration

Every variable is documented in
[`.env.sample`](https://github.com/Feasible-Analytics/app.feasible.lol/blob/main/.env.sample), with a
comment and a default. A variable that isn't in that file doesn't exist: CI fails if the source reads
one that's missing.

Values resolve from `$CONFIG_DIR/<NAME>` (for Docker and systemd secrets), then the environment, then
`.env` outside production.

## Shared ingest salt and app key

Set the same `FEASIBLE_INGEST_SALT` on every ingester. Each process combines it with the UTC date
locally, so daily visitor identifiers agree without contacting an app shard. It's a modest protection
for visitor hashes, not an encryption key and not a replacement for network security - see
[privacy](/docs/privacy/).

`FEASIBLE_APP_SECRET_KEY` encrypts two-factor secrets and signs short-lived cookies. Leave it unset
and one is generated on first run into `app.key` in the data directory with mode `0600`.

Lose the app key and every enrolled authenticator app stops working.

## Email

Set `FEASIBLE_APP_MAIL_TRANSPORT=smtp` and `FEASIBLE_SMTP_HOST` to your relay, plus
`FEASIBLE_SMTP_USERNAME` and `FEASIBLE_SMTP_PASSWORD` if it needs them. The port defaults to 587 with
STARTTLS. Or set the transport to `ses` to send through the Amazon SES API with the `FEASIBLE_AWS_*`
variables.

The default `log` transport writes rendered messages to `tmp/mail/` and sends nothing, which is what
makes local development need no mail service at all. Leave it on in production and password resets
and reports never arrive.

An unknown transport name is an error rather than a silent fallback, and so is `smtp` with no host. A
box that quietly stopped sending would look healthy while nobody could reset a password.

Set `FEASIBLE_APP_MAIL_FROM` to an address your relay is allowed to send as. A relay rejecting a From
address it doesn't own is the most common reason a self-hoster's mail silently stops arriving.

## Google

Sign-in with Google, the [GA4 import](/docs/import-export/#google-analytics-4) and
[Search Console](/docs/import-export/#google-search-console) all use one OAuth client:
`FEASIBLE_GOOGLE_CLIENT_ID` and `FEASIBLE_GOOGLE_CLIENT_SECRET`. Set both or neither. Leave them
unset and those features hide themselves.

## Geolocation

Geolocation reads [DB-IP Lite](https://db-ip.com/db/lite.php) databases, which are CC-BY-4.0 and
redistributable, from the data directory:

```
$FEASIBLE_APP_DATA_DIR/geoip/dbip-country-lite.mmdb
$FEASIBLE_APP_DATA_DIR/geoip/dbip-city-lite.mmdb
```

Put either, both or neither there. With the city file present it's used on its own, because it
carries the country too. With neither, every visitor's country is unknown - a missing database
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

A baseline of bot user-agent substrings, spam referrer domains and datacenter address ranges is
compiled into the binary. You can replace any of the three with newline files
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
update - if you want fresher lists than the binary ships with, that's a cron job and a restart on
your side.
{{< /callout >}}

All three are classifications rather than deletions: the event is stored with its reason and left out
of reports by default, so a wrongly-classified human visitor can be recovered.

## What it connects to

One outside service is on by default: source icons. When a report shows a source such as
`news.ycombinator.com`, your server asks DuckDuckGo's icon service, `icons.duckduckgo.com`, for that
hostname's icon. The request carries the hostname and nothing else from your data. Nobody's browser
makes it, because the dashboard loads the icon from your own server.

Your server only fetches an icon for a source on the app's built-in list, or for one a report has
already shown to that same dashboard view, whether that's a signed-in user, a public dashboard or a
shared link. Any other name gets a letter tile, with no fetch and nothing written to disk. Icons are
kept in `favicons/` in the data directory for 7 days, and a miss is remembered for 6 hours. The
folder is capped at 64 MB, and the oldest icons go first when it fills.

To turn it off, set `FEASIBLE_APP_SOURCE_ICONS=false`. Every source then gets its letter tile, and
your server never contacts the icon service. It defaults to on, and the switch is there from v0.0.66.

Account pictures stay on your server unless you turn Gravatar on. The app draws each person's
initials on a color. Someone who signs in with Google gets their Google profile picture instead,
which your server fetches at each Google sign-in and serves from your own address.

Everything else happens only when you set it up or someone uses it:

- **Email**, to your SMTP relay or Amazon SES, when the mail transport is `smtp` or `ses`.
- **Google**, for sign-in, the GA4 import and Search Console, once the Google client is set.
- **Gravatar**, only if you set `FEASIBLE_APP_GRAVATAR=true`. It's off on a self-hosted install.
  When it's on, an account with no Google picture is looked up when it signs in, with a hash of its
  email address. A picture found there is kept, and an address with none is asked about again at
  most once a week. `feasible avatar backfill` asks about every verified account with no picture
  and no miss in the last week, so you don't have to wait for people to sign in.
- **Slack and webhooks**, to the addresses you and your users add for reports, alerts and webhooks.
- **Your own sites**, when someone presses the button that checks a snippet is installed. The server
  loads that site's home page once.
- **Cloudflare Turnstile and Stripe**, only if you set their keys. A self-hosted install needs
  neither.

There's no update check, no usage reporting and no license check, and nothing downloads geolocation
or list files for you.

## Behind a reverse proxy

`serve` speaks plain HTTP. Put a TLS proxy such as Caddy or nginx in front of it, and set
`FEASIBLE_APP_BASE_URL` to the public `https://` address.

Set `FEASIBLE_INGEST_TRUSTED_PROXIES` to your proxy's address, comma-separated if there's more than
one. Bare addresses and CIDR blocks both work, IPv4 or IPv6, and a proxy on the same machine is
`127.0.0.1,::1`:

```
FEASIBLE_INGEST_TRUSTED_PROXIES=127.0.0.1,::1
FEASIBLE_INGEST_TRUSTED_PROXIES=127.0.0.1,::1,10.0.0.0/8
```

Leave it out and every visitor arrives as the proxy's address, which breaks countries and unique
visitors. A malformed entry stops the process at start-up rather than being skipped.

Only connections from that list may supply `X-Feasible-IP`, `CF-Connecting-IP` or `X-Forwarded-For`.
The list is empty by default, so direct clients can't forge the address used for fingerprints,
geolocation and IP shields.

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

- `GET /health` - can customers use the service. This is the small public response an external uptime
  monitor checks.
- `GET /health/live` - is this process alive. True from the moment the listener is up until it exits.
  This is what a supervisor restarts on.
- `GET /health/ready` - may this process take traffic. It goes false the instant a shutdown begins,
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
no feature held back for a paid plan - the API has no plan check in it at all. More on that on
[open source web analytics](/open-source-web-analytics/).

## API keys

Create them under *Settings → People → API keys*, or from the command line:

```
./feasible api-key create --team 1 --user 1 --name "Reporting"
```

The per-key hourly limit defaults to `FEASIBLE_API_RATE_LIMIT`, which is 10,000. `--limit` sets a
different one for a single key. It's a setting
rather than a constant precisely because a limit you can't change on your own hardware isn't a limit,
it's an inconvenience.

## Connecting an AI assistant

The sign-in setup on [the MCP page](/docs/mcp/) works on your install too. Use your own address in
place of `app.feasible.lol`. Set `FEASIBLE_APP_BASE_URL` to the address people actually reach, because
the sign-in links an assistant follows are built from it.

For an assistant that starts a local program instead of connecting to a URL, run `feasible mcp`. It
talks over stdio and reads an API key from the environment:

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
