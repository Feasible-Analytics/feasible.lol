---
# Created: 2026-11-25
# Copyright (c) 2026 Cloudmanic Labs, LLC. All rights reserved.
title: "Google Analytics MCP: what Google's own server takes"
seotitle: "Google Analytics MCP server: setup, limits and a one-URL option"
description: "How to set up Google's own Google Analytics MCP server for Claude, Cursor or Antigravity, what it can't reach, and the one-URL option if you'd rather not."
lede: "It's free, it's Google's, and it runs on your own computer. Here's the whole setup, what it reaches, and where it stops."
kicker: "MCP"
weight: 65
checked: 2026-11-25
faq:
  - q: "Is there an official Google Analytics MCP server?"
    a: "Yes. Google publishes one as the `analytics-mcp` package on PyPI, with its source on GitHub under the Apache 2.0 license. It runs on your own computer and reads your GA4 properties through Google's Admin and Data APIs."
  - q: "Is the Google Analytics MCP server free?"
    a: "Yes. The server is free, and the APIs it calls are free within Google's quotas. A standard GA4 property gets 200,000 Data API tokens a day, which is far more than one person asking questions will use."
  - q: "Can I use the Google Analytics MCP server with ChatGPT?"
    a: "Not the local one. ChatGPT connects to MCP servers by URL, and Google's server runs as a program on your computer. Google also answers MCP requests at a URL of its own, but its MCP page doesn't document that yet, and its sign-in needs an OAuth client you create in Google Cloud."
  - q: "Does the Google Analytics MCP server work with Claude?"
    a: "In Claude Desktop and Claude Code, yes. Google's setup page has a config for each. Claude on the web and on your phone connect by URL, so the local server can't reach them."
  - q: "Can the Google Analytics MCP server change my GA4 settings?"
    a: "Not unless you turn that on. Google's page says it's read-only. The GitHub README lists three tools that write, for annotations, custom dimensions and key events, and they only appear when you start the server with `--allow-write` and sign in with the `analytics.edit` scope."
  - q: "Can it read my Universal Analytics data?"
    a: "No. Google cut off access to Universal Analytics data from the week of July 1, 2024, so no MCP server, Google's or anyone else's, can read it now."
---

Google publishes an official MCP server for Google Analytics. It's free and open
source, and it lets Claude, Cursor or Google's own agents read your GA4 reports and
answer questions about them.

Getting it running takes a Google Cloud project, two APIs, the gcloud command line
and Python. Each step is ordinary. There are a lot of them, and most live in Google
Cloud rather than in Analytics.

{{< callout title="A word about us first" >}}
We make Feasible, which has its own MCP server, and it comes up near the end.
Everything about Google's server comes from Google's own pages and GitHub
repository, read on November 25, 2026, and each section links back to them.
{{< /callout >}}

## What Google's server is

It's a Python program called `analytics-mcp`. It's on
[PyPI](https://pypi.org/project/analytics-mcp/), at version 1.1.0 since November 6,
2026, and on [GitHub](https://github.com/googleanalytics/google-analytics-mcp) under
the Apache 2.0 license.

Your assistant starts it on your own computer and talks to it there. That decides
where it works.

- **It works in apps that run local servers.** Google's
  [setup page](https://developers.google.com/analytics/devguides/MCP) gives configs
  for Claude Desktop, Claude Code, Cursor and Google's Antigravity.
- **It doesn't work in Claude on the web or your phone, or in ChatGPT.** Those
  connect to a server by URL, and a program on your laptop doesn't have one.

It reads. Google's page says it "can't create, modify, or delete your Google
Analytics configuration or settings." The GitHub README has since added three tools
that write, for annotations, custom dimensions and key events. They stay off unless
you start the server with `--allow-write` and sign in with an extra scope.

The README lists ten tools that read:

- **`get_account_summaries` and `get_property_details`**: the accounts and properties
  you can see, and how each one is set up.
- **`list_google_ads_links`, `list_property_annotations` and `list_key_events`.**
- **`get_custom_dimensions_and_metrics`**: the custom fields on a property.
- **`run_report`, `run_realtime_report`, `run_funnel_report` and
  `run_conversions_report`**: the reports themselves.

## Setting it up

These are Google's steps, shortened.
[Google's guide](https://developers.google.com/analytics/devguides/MCP) has every
option.

1. **Install Python 3.10 or newer, plus pipx or uv.** They run the server in its own
   environment.
2. **Create a Google Cloud project** and turn on two APIs in it, the Google Analytics
   Admin API and the Google Analytics Data API:

   ```
   gcloud services enable analyticsadmin.googleapis.com \
     analyticsdata.googleapis.com --project=YOUR_PROJECT_ID
   ```

3. **Give your Google account at least Viewer access** to the GA4 property, in
   Analytics' own admin screens.
4. **Install the gcloud CLI and sign in** with the read-only Analytics scope:

   ```
   gcloud auth application-default login \
     --scopes="https://www.googleapis.com/auth/analytics.readonly,https://www.googleapis.com/auth/cloud-platform"
   ```

   Google's page also shows this command with `--client-id-file`, which signs in
   through an OAuth client you create in Google Cloud first. The README's example
   uses that version. A service account works too. When the command finishes, it
   prints the path of a credentials file. Copy it.

5. **Tell your assistant how to start the server.** In Claude Code:

   ```
   claude mcp add analytics-mcp --scope user \
     -e "GOOGLE_APPLICATION_CREDENTIALS=PATH_TO_CREDENTIALS_JSON" \
     -e "GOOGLE_CLOUD_PROJECT=YOUR_PROJECT_ID" \
     -- pipx run analytics-mcp
   ```

   Claude Desktop and Cursor take the same two values in a JSON file.

### Where it goes wrong

Google's troubleshooting section lists the usual failures. They're worth knowing
before you start.

- **403 PERMISSION_DENIED.** One of the two APIs isn't on, your account doesn't have
  Viewer on the property, or the sign-in missed a scope.
- **A missing quota project.** Set `GOOGLE_CLOUD_PROJECT`, or run
  `gcloud auth application-default set-quota-project`.
- **Credentials file not found.** Write the full path. Many apps don't expand `~` or
  `$HOME` inside their config files.
- **`spawn pipx ENOENT`.** Desktop apps like Claude Desktop and Cursor often don't see
  your shell's PATH. Give the full path to `pipx` or `uvx` instead.
- **An expired sign-in.** Run the `gcloud auth application-default login` command
  again.

## Google's hosted endpoint

Google also answers MCP requests at `https://analyticsdata.googleapis.com/mcp/v1`.
Because it's a URL, it's the version that could work in Claude on the web or in
ChatGPT.

We checked it on November 25, 2026. It lists four tools: `run_report`,
`run_realtime_report`, `get_metadata` and `check_compatibility`. None of them lists
your accounts, so you'd give the assistant your property ID yourself. It signs in
through Google with the same read-only Analytics scope.

Two things stop us recommending it yet. Google's MCP page doesn't mention it, and the
reference page search engines still list for it returned a 404 when we checked. And
Google's sign-in doesn't let an app register itself, so an assistant that expects
to, like Claude's custom connectors, needs an OAuth client you create in Google Cloud
and paste in. We haven't tested that path end to end.

Wait for Google to document it before you build on it.

## What it can't do

Whichever version you use, the assistant reads GA4. It gets the numbers GA4's
reports would give you, with the same gaps.

- **Withheld and sampled rows come along.** GA4 can hold back small rows to protect
  identity, and it can sample large reports. The Data API
  [marks a report](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/ResponseMetaData)
  when either happened. The assistant can tell you, but it can't fill the gap.
- **History stops at GA4.** Google cut off access to Universal Analytics data from the
  week of July 1, 2024
  ([Google's page](https://support.google.com/analytics/answer/11583528)). If your
  site is older than its GA4 property, the assistant can't see the years before.
- **The tag stays on your site.** The server reads what GA4 collected, so GA4's script
  keeps running, and so does the consent banner that usually comes with it.

## The shorter route

This is the part about us.

Feasible has an MCP server built in. Add `https://app.feasible.lol/mcp` to your
assistant, sign in, and click **Allow access**. There's no Cloud project, no Python
and no key to copy.

Because it's a URL, it works in Claude on the web, desktop and phone, in ChatGPT's
developer mode, and in Claude Code, Cursor, VS Code, Codex, Gemini CLI, Zed and Devin
Desktop. [The setup for each](/docs/mcp/) is a few lines.

There are [eleven tools](/docs/mcp/#the-tools). Most do what Google's do: list your
sites, run a report, see who's on the site now, read goals and funnels. One answers
the question people actually ask. `explain_traffic_change` breaks a rise or a fall
down by source, channel, campaign, page, country and device, so the answer is "paid
social fell by a third" rather than a chart to squint at.

**Your GA4 history comes with you.** Connect your property and Feasible reads it
straight from Google:
daily totals and breakdowns for pages, sources, locations, devices, browsers,
operating systems and landing pages. Ask the assistant to include imported data, and
the same questions reach back past the day you switched. It doesn't bring GA4's goals
and conversions, audiences or Explorations.
[The migration guide](/migrate/from-google-analytics/) has the details.

It isn't free. Feasible costs $9.99 a month or $99 a year for unlimited sites, with a
30-day trial and no card to start. Or run it yourself for nothing: the self-hosted
build has the [same MCP server](/docs/self-hosting/#connecting-an-ai-assistant).

## Which one to use

- **You're staying on GA4 and use Claude Desktop, Claude Code or Cursor.** Use
  Google's server. It's free, it's Google's own, and the setup is a one-time job.
- **You want it on your phone or in ChatGPT.** Google's local server can't go there.
  Its hosted endpoint might, once Google documents it.
- **You're leaving GA4 anyway.** Bring the history into Feasible and connect one URL.

Whichever you pick, ask it something you already know the answer to first. It's the
fastest check there is.
