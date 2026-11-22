---
title: "The MCP server"
description: "Connect Claude, ChatGPT, Codex, Gemini CLI, Cursor, VS Code, Zed or Devin Desktop to your Feasible analytics. Paste one URL, sign in, click Allow."
lede: "Paste one URL into your assistant, sign in, and click Allow."
weight: 130
---

Feasible has a Model Context Protocol server built in. MCP is the standard way AI assistants connect
to other apps, so Claude, ChatGPT, Codex, Gemini CLI, Cursor, VS Code, Zed or Devin Desktop can read
your analytics and ask follow-up questions.

Here's the whole setup:

1. Add `https://app.feasible.lol/mcp` to your assistant.
2. It opens app.feasible.lol in your browser. Sign in, if you aren't already.
3. Click **Allow access**.

There's no key to create or copy. It's in every plan, and it runs on the same query engine as the
dashboard, so an assistant gets the numbers you'd see there.

## Setting up your app

These apps move their menus around. Each section links to the app's own guide, in case a step
doesn't match your screen.

### Claude Code

```
claude mcp add --transport http feasible https://app.feasible.lol/mcp -s user
```

`-s user` makes it available in every project, not just the folder you're in.

Restart Claude Code, type `/mcp`, pick **feasible**, and choose **Authenticate**. Your browser opens.
Click **Allow access**.

### Claude on desktop, web and mobile

1. Go to **Customize → Connectors**.
2. Click **+**, then **Add custom connector**.
3. Name it Feasible and paste `https://app.feasible.lol/mcp` as the URL. claude.ai picks
   **Sign in now** under **Authentication** and **Register automatically** under **OAuth client**,
   each marked Detected. Leave both as they are. If it ever shows **No sign-in** instead, pick
   **Sign in now**, then **Register automatically**.
4. Click **Add**. When the sign-in opens, click **Allow access**. If it doesn't open, find Feasible in
   the list and click **Connect**.

If you added Feasible before November 18, 2026 and it says it has no tools, remove it and add it
again.

Add it once and it's there on the web, the desktop app and your phone. The Free plan allows one
custom connector.

On a Team or Enterprise plan, only an Owner can add it, under **Organization settings → Connectors**.
Everyone else then finds it under **Customize → Connectors** and clicks **Connect** to sign in as
themselves.

[Anthropic's guide to custom connectors](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp)

### ChatGPT

ChatGPT adds an MCP server as an app in **Developer mode**. It works on chatgpt.com, not in the
mobile app, and it's for paid plans.

1. Turn on **Developer mode** in ChatGPT's settings. Depending on your account, it's under
   **Security and login** or **Apps → Advanced settings**.
2. Go to [chatgpt.com/plugins](https://chatgpt.com/plugins) and click **+**.
3. Name it Feasible, paste `https://app.feasible.lol/mcp` as the server URL, and choose OAuth.
4. Click **Create**. When the sign-in opens, click **Allow access**. It might open now, or the first
   time you use Feasible in a chat.
5. In a chat, type `@` and pick Feasible.

ChatGPT asks you to confirm before the assistant changes anything, like creating a goal. Reading your
numbers doesn't need that extra click.

On a Business plan, only an admin or owner can use Developer mode. They add Feasible, then publish it
under **Workspace settings → Apps** so the rest of the workspace can use it. On Enterprise and Edu, an
admin decides who gets Developer mode.

[OpenAI's guide to Developer mode](https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt)

### Cursor

Add this to `~/.cursor/mcp.json` to use it in every project, or to `.cursor/mcp.json` inside one
project:

```
{
  "mcpServers": {
    "feasible": {
      "url": "https://app.feasible.lol/mcp"
    }
  }
}
```

If the file already lists other servers, put the `feasible` entry inside the `mcpServers` you have.

Save it and restart Cursor. Open **Customize → MCPs** from the sidebar, find Feasible, and follow its
sign-in prompt. Click **Allow access** in the browser.

[Cursor's MCP guide](https://cursor.com/docs/mcp)

### VS Code

VS Code connects through GitHub Copilot's chat. On Copilot Business or Enterprise, your GitHub admin
has to turn on the **MCP servers in Copilot** policy first. It's off by default.

1. Open the Command Palette and run **MCP: Add Server**.
2. Choose **HTTP**, paste `https://app.feasible.lol/mcp` as the URL, and name it `feasible`.
3. Choose **Global** to use it in every workspace.
4. When VS Code asks if you trust the server, click **Trust**. When it asks to authenticate, click
   **Allow**, then **Allow access** in the browser.
5. In the Chat view, pick **Local**, then **Agent**. Feasible's tools are listed under
   **Configure Tools**.

Pick **Local** rather than **Copilot**. VS Code's docs say Copilot sessions can't use a server that
needs a sign-in.

On a Mac or Linux, one terminal command does steps 1 to 3:

```
code --add-mcp '{"name":"feasible","type":"http","url":"https://app.feasible.lol/mcp"}'
```

[VS Code's MCP guide](https://code.visualstudio.com/docs/agent-customization/mcp-servers)

### Codex

The Codex CLI and the Codex IDE extension share one settings file, `~/.codex/config.toml`, so adding
Feasible to one adds it to both.

In a terminal:

```
codex mcp add feasible --url https://app.feasible.lol/mcp
```

Codex sees that Feasible needs a sign-in and starts it. If your browser doesn't open, open the link
Codex prints. Click **Allow access**. Once you're signed in, `codex mcp list` shows `OAuth` under
**Auth**.

To sign in again later, run `codex mcp login feasible`.

You can also add it to `~/.codex/config.toml` by hand, then run `codex mcp login feasible`:

```
[mcp_servers.feasible]
url = "https://app.feasible.lol/mcp"
```

In the IDE extension, open the gear menu, pick **MCP servers**, then **Add server**. Name it
`feasible`, choose **Streamable HTTP**, paste `https://app.feasible.lol/mcp`, save, and click
**Restart extension**. Click **Authenticate** when the list says Feasible needs a sign-in, then
**Allow access** in the browser.

[OpenAI's MCP guide for Codex](https://learn.chatgpt.com/docs/extend/mcp?surface=cli)

### Gemini CLI

```
gemini mcp add --transport http -s user feasible https://app.feasible.lol/mcp
```

`-s user` saves it in `~/.gemini/settings.json`, so it works in every folder. Leave it out and it
goes in the current folder's `.gemini/settings.json` instead.

Start `gemini` and run `/mcp auth feasible`. Choose **Yes** when it asks to open your browser, then
click **Allow access**. `/mcp list` shows Feasible's tools once you're signed in.

Gemini CLI turns off MCP servers in a folder you haven't trusted, so say yes when it asks whether
you trust the folder.

[Google's MCP guide for Gemini CLI](https://geminicli.com/docs/tools/mcp-server/)

### Zed

Open **Settings → AI → MCP Servers**, click **Add Server**, and choose **Add Remote Server**. Or run
`zed: open settings file` from the Command Palette and add:

```
{
  "context_servers": {
    "feasible": {
      "url": "https://app.feasible.lol/mcp"
    }
  }
}
```

Don't add an `Authorization` header. Without one, Zed asks you to sign in. Click **Allow access** in
the browser. The dot next to Feasible in **MCP Servers** turns green, with "Server is active", once
it's connected.

Zed's own agent in the Agent Panel uses it. A command-line agent you run in Zed's terminal, like
Codex or Gemini CLI, reads its own settings, so set that one up from its section above.

[Zed's MCP guide](https://zed.dev/docs/ai/mcp)

### Devin Desktop (formerly Windsurf)

Windsurf became Devin Desktop on June 2, 2026, and its agent is now Devin Local. Add Feasible to
`~/.config/devin/mcp_config.json` to use it in every project, or to `.devin/mcp_config.json` inside
one:

```
{
  "mcpServers": {
    "feasible": {
      "url": "https://app.feasible.lol/mcp",
      "transport": "http"
    }
  }
}
```

To find the file from the app, open **Customize** from the Agents window, click **MCPs**, pick
**This computer**, and open the config file. Refresh the list after you save. If Feasible shows
**Needs authentication**, click **Authenticate**, then **Allow access** in the browser.

The Devin CLI uses the same file. From a terminal, this adds Feasible and signs you in:

```
devin mcp add -s user feasible https://app.feasible.lol/mcp
devin mcp login feasible
```

On an Enterprise plan, an admin decides which MCP servers are allowed, under **MCP & ACP** in team
settings.

[Devin's MCP guide](https://docs.devin.ai/desktop/cascade/mcp)

### Any other app

If it connects to MCP servers over HTTP and supports OAuth sign-in, give it the URL and it works the
same way. If it only takes a URL and a header, [use an API key instead](#using-an-api-key-instead).

## What you'll see when you connect

The page is called **Connect to Feasible**. It names the assistant, says where the access will be
sent, and lists what the assistant will be able to do:

- Read your analytics numbers.
- See your sites and their settings.
- Create and change sites, goals and custom properties.
- Create and change webhooks.

Any app can call itself anything, so check where the access goes rather than the name. If it isn't
the app you just set up, click **Cancel**.

If you're on more than one team, you'll pick which team to connect. The assistant sees that team's
sites.

Clicking **Allow access** creates an API key on that team, named after the assistant - "Claude Code
(MCP)", for example. It's listed in team settings with every other key. You never see it or copy it.

The assistant stays connected as long as you use it at least once every 30 days. You won't be asked
to sign in again day to day.

## Who can connect

Team Owners, Admins, Editors and Billing members. Viewers and guests can't, because connecting creates
an API key and those roles can't create one. Ask an admin to connect it for you, or to change your
[role](/help/what-are-the-team-roles/).

## Disconnecting

Go to *Settings → People → API keys*, find the key named after the assistant, and click **Revoke**.
The assistant loses access on its next request.

## Using an API key instead

A script, or an app that can't do the sign-in, can send an [API key](/docs/api/#api-keys) in a header
instead. Create one under *Settings → People → API keys*:

```
{
  "mcpServers": {
    "feasible": {
      "url": "https://app.feasible.lol/mcp",
      "headers": { "Authorization": "Bearer feas_…" }
    }
  }
}
```

The key's scopes and rate limit apply, the same as on the API.

## The tools

Eleven of them, all working:

- `list_sites` - the sites this credential can read, with the time zone each one's days are counted
  in.
- `query_stats` - the full query surface: [metrics, dimensions, filters](/docs/api/#reading-numbers-back),
  sorting and pagination.
- `get_realtime_visitors` - who's on the site now.
- `compare_periods` - a period and the one before it, with the change. It's its own tool because both
  windows have to be resolved against one clock; two separate calls near midnight compare the wrong
  days.

  `query_stats` and `compare_periods` both take an optional `currency`, a three-letter ISO 4217 code
  such as `"EUR"`. It's needed only when the range holds revenue in more than one currency. Without
  it that question is refused, and the refusal tells the assistant to add `"currency": "EUR"` or
  another code it found, so it can ask again by itself. Nothing is converted: each currency is
  totalled on its own, and there's no combined total. Every money figure comes back with its unit in
  `meta.metric_units` (whole hundredths, so 845000 is 8,450.00), which keeps an assistant from
  reading cents as dollars. [More on currencies](/docs/api/#currency).
- `explain_traffic_change` - breaks a movement in visitors, visits, pageviews or events down by
  source, channel, campaign, page, country, device, browser and operating system, so the answer is
  "paid social fell by a third" rather than "traffic is down".
- `list_goals`, `create_goal` - read and create [conversions](/docs/goals-funnels/), including revenue
  goals and property constraints.
- `list_funnels`, `get_funnel` - the saved funnels, and one funnel's per-step numbers.
- `create_site`, `update_site` - register a site and get its snippet; change a domain, name, time
  zone or public setting.

## Resources and prompts

Reading `feasible://site/{domain}/schema` gives an assistant the whole vocabulary for one site in a
single call: its metrics, its dimensions, the custom properties that exist on it, its goals,
the date-range presets and the filter operators.

That's what stops a model guessing a dimension name and getting a 400.

Three prompts ship with it: `weekly_traffic_review`, `why_did_traffic_drop` and
`campaign_performance`.

## What it won't do

A tool that fails returns a successful response carrying the error, so the model can read the reason
and correct itself instead of seeing a transport failure.

Unknown arguments are refused rather than ignored.

And a locked account is refused here as it is on the API, with a code the client can
recognize rather than an empty answer that reads as "you have no data".

## For developers

The endpoint is `POST /mcp`, streamable HTTP, protocol version `2025-06-18`. It takes
`Authorization: Bearer …` with either an OAuth access token or an API key.

`GET /mcp` is a deliberate 405. This server never opens a stream back to the client, and answering a
long-poll it won't use would be a socket held open for nothing.

Sign-in is OAuth 2.1. Discovery lives at `/.well-known/oauth-authorization-server` and
`/.well-known/oauth-protected-resource`, client registration is open, and PKCE is required - `S256`
only, never `plain`.

Access tokens last an hour. Refresh tokens last 30 days and are replaced every time they're used. An
authorization code is good for one minute and one use, and replaying one revokes the whole grant.

The scopes are the API key scopes: `stats:read`, `sites:read`, `sites:provision` and
`webhooks:write`. Every token stands for the key that approval created, so revoking that key ends
the connection.

Running Feasible yourself? The stdio setup is on the [self-hosting page](/docs/self-hosting/#connecting-an-ai-assistant).
