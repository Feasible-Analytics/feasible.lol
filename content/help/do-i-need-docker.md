---
title: "Do I need Docker?"
description: "No. There's no Dockerfile in the repo. It's one binary and a directory - copy it to a server and run it."
category: "self-hosting"
weight: 50
---

No. There isn't even a Dockerfile in the repository.

Feasible is a single self-contained Go binary. Copy it to a server, run `./feasible serve`, and the whole product is up - the dashboard, the ingest endpoint, the settings screens, the docs, the background jobs, all in one process.

What you also don't need:

- **No Postgres, no MySQL.** Storage is SQLite, and the driver is pure Go, so there's no C library to link and no client to install.
- **No ClickHouse or other column store.** Reports read from pre-built roll-ups in the same database file.
- **No Redis, no Kafka, no queue.** Background jobs are rows in SQLite.
- **No reverse proxy required.** Put one in front if you want TLS termination the usual way, but nothing breaks without it.
- **No Node at runtime.** The dashboard, the CSS and the tracker are compiled at build time and embedded in the binary.

So the deployment is: a binary, a data directory, and a systemd unit. Backups are file copies, and there's a `db backup` command that writes a consistent snapshot of every database while it's running.

You can absolutely put it in a container if that's how your infrastructure works - nothing stops you, and a `FROM scratch` image with one static binary in it is about as small as containers get. It just isn't a requirement, and we're not going to publish a compose file with four services in it to make a pageview counter look serious.

Everything you need is [1 core and 512 MB](/help/what-does-it-cost-to-run-feasible-yourself/), and the three commands to start are on [can I run Feasible myself](/help/can-i-run-feasible-myself/).
