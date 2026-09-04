---
title: "What license is Feasible under?"
description: "AGPL-3.0-or-later. Run it, change it, host it. Offer it to others as a service and you share your source with them."
category: "self-hosting"
weight: 30
checked: 2026-09-03
---

**AGPL-3.0-or-later** — the GNU Affero General Public License, version 3 or later.

In practice: you can run it, modify it, and self-host it however you like. The one condition is the network clause. If you offer it to other people as a service, you have to make your source available to those users. Running it for your own sites, your company's sites, or your clients' sites is not that, and needs nothing from you.

It's the same license family the other open-source analytics projects use: [Plausible](https://github.com/plausible/analytics) is AGPL-3.0 and [Matomo](https://github.com/matomo-org/matomo) is GPL-3.0. **We're not claiming ours is freer than theirs, because it isn't.** [Umami](https://github.com/umami-software/umami) is MIT, which is genuinely more permissive than ours. If license permissiveness is your deciding factor, that's a real answer and we'd rather you had it than not.

What *is* different here is what's inside the licensed thing:

**There's no cut-down edition.** The build you can compile is the build we host. No Community Edition with the interesting parts removed.

**No feature is held back for the paid plan.** The API, funnels, custom properties, webhooks, the MCP server, raw event export, teams — every one of them in every copy. There's no plan check in the API package at all.

**There's no directory in the repo you're not allowed to compile.** No `ee/`, no `extra/`, nothing carved out under a second license.

The source is at [github.com/Feasible-Analytics/app.feasible.lol](https://github.com/Feasible-Analytics/app.feasible.lol), and the full license text is in the repository.

We're selling the hosted service, not the source. The code being public is a promise about what happens if we disappear — you keep running. [More on that](/open-source/).
