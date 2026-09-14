---
title: "Changelog"
seotitle: "Changelog - what's shipped in Feasible"
description: "What changed in Feasible, newest first. We just launched, so the list is short."
lede: "What's changed, newest first. There isn't much here yet, and inventing a back catalog would be a strange way to start."
updated: 2026-09-13
---

## September 9, 2026 - connect an assistant with a sign-in

Connecting an AI assistant used to mean making an API key, copying it, and pasting it into a form.
Now you paste `https://app.feasible.lol/mcp` into Claude, ChatGPT, Cursor or VS Code, sign in, and
click Allow.

The connection shows up as a key in team settings, and revoking it there disconnects the assistant.
Sending an API key in a header still works. Self-hosters get it in v0.0.26.

[Set up your assistant](/docs/mcp/)

## September 2026 - launch

Feasible is live. The whole product shipped at once: the one-page dashboard, goals,
funnels, custom properties, teams and roles, shared dashboards, email reports and
alerts, the ingestion health panel, the API, webhooks, the MCP server, CSV import,
raw data export, and self-hosting with every feature in it.

[What's in the plan](/pricing/) · [Why we built it](/why-feasible/)

---

Updates get posted here as they ship, and every release binary and its notes go to
[GitHub releases](https://github.com/Feasible-Analytics/app.feasible.lol/releases).
Self-hosters can watch that repository to know when to run `feasible db migrate`.
