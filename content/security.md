---
title: "Security"
seotitle: "Security - what Feasible does"
description: "Two-factor authentication, session revocation, per-account databases, and an IP address that never reaches disk. What we do, and what we don't have."
lede: "What we protect, how we protect it, and what we do not have."
---

Security pages are usually a wall of certification logos. We don't have any, so this
is a list of mechanisms instead. Everything below is in the software today. The
[list of things we don't have](#what-we-dont-have) is at the bottom, and it's a real
list.

## Signing in

**Two-factor authentication** uses TOTP - any authenticator app works. Turning it on
generates **10 single-use recovery codes**. The TOTP secret itself is **encrypted at
rest**; the key is generated on first run if you don't supply one, so this is true by
default rather than true if you configure it.

An account owner can **require 2FA for the entire team**, and people who haven't set
it up get walked through it at their next sign-in.

**You can see and kill your own sessions.** The account settings page lists every
active session and revokes any one of them, so a laptop you left at a conference is a
two-click problem.

**We email you when there's a new sign-in**, and again when a password changes. If
that email is a surprise, it's the fastest signal you'll get.

Also, less visibly:

- **CSRF tokens on every form** in the app.
- **PKCE** on the Google OAuth flow.
- **Re-authentication before sensitive actions** - changing a password, disabling
  2FA, deleting an account. Owning a live session isn't enough.
- **Rate limiting on the authentication endpoints**, so password guessing gets slow
  quickly.
- Password resets use single-use tokens, and expired sessions and tokens are pruned
  hourly.

## Your visitors' data

**The raw IP address never reaches disk.** Geolocation and the visitor hash are both
computed in the ingest tier, and the address is discarded before anything is written.
The durable event record has nowhere to put one - this is a shape in the code, not a
policy someone has to remember to follow.

The visitor identifier is a **daily-rotating SipHash** of user agent, IP and domain.
The salt derives from the UTC day number and is never stored in a database, so
yesterday's salts can't be recovered and the identifier can't be reversed or linked
across days. It's **pseudonymous, not anonymous** - we won't call it anonymous,
because it isn't.

**One SQLite database per account.** Your data isn't a row with a `team_id` on it in a
shared table; it's a separate file. A query that forgot its filter has nothing to
leak.

Geolocation is a local database file on our own disks - no network call to a third
party per pageview, ever. Source favicons in the dashboard are proxied through our
own origin, so a referring site never learns you were reading about it.

Where the data lives: **Newberg, Oregon, United States.** There's no EU region - we
won't claim one. Everyone we rely on to run the service is named on the
[sub-processors list](/legal/subprocessors/).

## Shared dashboards

A public dashboard is public on purpose, and that's a decision you make per site.

If you put a **password** on a shared link, it's stored with **PBKDF2-SHA256 at
200,000 iterations** with a per-link salt - not a hash someone can run through a
wordlist over lunch. Guessing is budgeted too: six attempts per source per link and
sixty across all sources, in a fifteen-minute window.

A password-protected dashboard **can't be embedded** in an iframe. An
embedded password prompt is a phishing lesson we'd rather not teach.

## API keys and webhooks

API keys are 32 random bytes with a `feas_` prefix. **We store only a SHA-256 of the
key** and show you the real thing once - if you lose it, we can't recover it,
we can only issue a new one. Keys can carry narrowed scopes, and the default rate
limit is 10,000 requests an hour.

**Webhook deliveries are HMAC-signed** with a secret you can rotate, and every
delivery is logged so you can verify and replay one.

**Webhook and Slack destinations are SSRF-guarded.** URLs are validated when you save
them and re-checked at connect time, and loopback and internal addresses are refused.
Otherwise a webhook field is a request forgery tool pointed at our own network.

## Deleting your account

Deletion needs a **confirmation code emailed to you**, then it runs as a durable purge
across the system database and your account database - it can't half-finish, and a
crashed worker resumes it rather than leaving your data in limbo.

Export works in every account state, including after you've stopped paying, so you can
take your data out first. That's on purpose.

## What we don't have {#what-we-dont-have}

Read this part. It's the reason the page exists.

- **No SOC 2 report. No ISO 27001 certificate. No third-party penetration test.** Not
  "in progress" - we don't have them. If your procurement process requires one, we
  won't pass it, and you should know that now rather than in week six.
- **No bug bounty program.** We don't pay for reports. We do read every one and we'll
  credit you if you want the credit.
- **No SSO or SAML.** It isn't built. When it is, it'll be in the one plan like
  everything else, not sold as an enterprise tier.
- **No uptime guarantee.** There's no SLA on this plan and the terms say so. We
  monitor the service and we'd rather it be boring than promise a number we can't
  underwrite at $99 a year.
- **We're a small company.** [What that buys you and what it costs you](/about/) is
  written out plainly.

## Reporting a vulnerability

Email **[help@feasible.lol](mailto:help@feasible.lol)** with what you found and how to
reproduce it. Put "security" in the subject line and it gets read first.

Please don't open a public GitHub issue for a vulnerability, and please don't test
against other people's accounts or the live ingest endpoint at volume - set up
[your own copy](/open-source/) and break that one instead. The whole product runs on a
laptop.

We'll confirm we got it, tell you what we think, and tell you when it's fixed. If we
disagree that it's a problem, we'll say why rather than going quiet.

---

[The privacy policy](/privacy/) covers what we collect and on what basis.
[The DPA](/dpa/) is the processor contract, and it needs no signature.
