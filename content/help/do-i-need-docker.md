---
title: "Do I need Docker?"
description: "No. It's one binary and a directory. If you run everything in containers, there's an image and a compose file with one service in it."
category: "self-hosting"
weight: 50
---

No. Feasible is a single self-contained Go binary. Copy it to a server, write a short config file, run `./feasible serve`, and the whole product is up: the dashboard, the ingest endpoint, the settings screens and the background jobs, all in one process.

If you run everything in containers anyway, there's an image of that same binary, `ghcr.io/feasible-analytics/feasible`, for linux/amd64 and linux/arm64, and a compose file to go with it. The compose file has one service in it. One container, one volume, and no database container, because there's no database server to put in one. [Run it with Docker](/docs/self-hosting/#run-it-with-docker) has the steps.

What you don't need, either way:

- **No Postgres, no MySQL.** Storage is SQLite, and the driver is pure Go, so there's no C library to link and no client to install.
- **No ClickHouse or other column store.** Reports read from pre-built roll-ups in the same database file.
- **No Redis, no Kafka, no queue.** Background jobs are rows in SQLite.
- **No extra service, except a TLS proxy.** `serve` speaks plain HTTP, and an https page won't load a script from an http address, so put Caddy or nginx in front of it. Set `FEASIBLE_INGEST_TRUSTED_PROXIES` to the proxy's address too, or every visitor arrives as the proxy.
- **No Node at runtime.** The dashboard, the CSS and the tracker are compiled at build time and embedded in the binary.

So the deployment is a binary, a data directory and [a systemd unit](/docs/self-hosting/#keep-it-running-with-systemd), or one container and one volume. Backups come from `feasible db backup`, which writes a consistent snapshot of every database while it's running. Don't copy the live database files: a SQLite file copied while it's being written looks fine and isn't. The [self-hosting docs](/docs/self-hosting/#backups) cover backups, restoring and upgrades.

Our image already has the two things the binary reads from the system: time zone data and CA certificates. If you build your own image from an empty `FROM scratch`, add both. Without time zone data you can't add a site, because no time zone loads. Without CA certificates nothing outbound works over HTTPS, so the source icons on the dashboard can't be fetched.

Everything you need is [a small VPS](/docs/self-hosting/#how-big-a-server), and the steps to start it are on [can I run Feasible myself](/help/can-i-run-feasible-myself/).
