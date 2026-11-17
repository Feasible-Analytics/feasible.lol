---
title: "Sub-processors"
description: "Every company that touches data on the hosted Feasible service, what each one does, and where it processes."
lede: "Ten companies touch your data. Here's what each one does, and where."
toc: true
nocta: true
updated: 2026-11-16
---

<!-- The privacy policy and the DPA link to this page and commit to keeping it
     current. The app binary no longer carries copies of the legal pages (they
     left in v0.0.20), so this is the only copy. If a sub-processor is added or
     removed, change it here and give the 30 days' notice the DPA promises. -->

This is the current list of sub-processors for the **hosted service at
feasible.lol**, kept here because the [privacy policy](/privacy/) and the
[data processing addendum](/dpa/) both point at it and promise it stays
accurate.

If you run [your own copy of Feasible](/open-source/), none of this applies to
you. You choose your own hosting and your own email provider, and they are your
sub-processors, not ours.

## The list

| Sub-processor | What it does | Where it processes | Data it can reach |
|---|---|---|---|
| **Rica Web Services Inc.** (Servarica) | Runs the servers and the databases the service lives on | Canada (Montreal) | Everything the service stores: your account, your sites, and the pseudonymous event data |
| **Amazon Web Services, Inc.** (CloudFront) | Serves the tracker script from `cdn.feasible.lol` and passes your visitors' events on to our servers | Amazon's edge locations, nearest each visitor | Your visitors' requests for the script and their events: IP address, user agent, and what each event carries, such as the page address, the referrer and any properties you send |
| **Amazon Web Services, Inc.** (Simple Email Service) | Sends the mail we send you — verification, password resets, login notices, your weekly and monthly reports, and traffic alerts | United States (us-east-1) | Your email address, your name, and whatever figures are in the report being sent |
| **Stripe, Inc.** | Takes the payment and runs the billing portal | United States | Your billing name, email, address and card details. **We never see or store a card number** — it goes to Stripe directly |
| **Sold through Link, LLC** | Merchant of record on transactions labeled "Sold through Link" — collects the payment, issues the receipt and handles indirect tax | United States | Your billing name, email, address and the transaction. Never your visitors' data |
| **Cloudflare, Inc.** (Turnstile) | The human check on the sign-up form | Cloudflare's network, nearest the person signing up | The IP address and browser details of the person signing up, and whether the check passed. Never your visitors' data |
| **Slack Technologies, LLC** | Carries our own notices to our team when an account is created, changes plan or closes | United States | For a new account: your name, email, team, how you signed up and where you came from. For a plan change: your billing email. For a closed account: your name and email |
| **DuckDuckGo, Inc.** | Supplies the icon shown next to each traffic source in your reports. Our server asks for it, only for sources a report has shown, and keeps it for a week | Not published. The company is in the United States | Only the source's hostname, such as `news.ycombinator.com`. Never anything about a visitor or an account |
| **Automattic Inc.** (Gravatar) | Supplies a picture for an account with no Google picture. Our server looks it up at sign-in. A picture found there is kept, and an address with none is asked about again at most once a week | United States | A hash of that account's email address |
| **PostHog, Inc.** | Our own product analytics: the account events we act on, such as a sign-up, a new site or a plan changing. It also keeps a copy of the service's log lines | United States (PostHog US Cloud) | Events filed under the account holder's email address. A sign-up carries your email, name, team, how you signed up and where you came from: the referring domain, campaign tags and landing page. A plan change carries the plan, the reason a plan ended and the billing email. A new site carries its domain. Log lines at info level and above, which can carry account holders' names and email addresses (every email we send is logged with its recipient and subject), the IP address of someone signing up, team names, your sites' domains, webhook addresses, request paths and error messages. Not your visitors' IP addresses or the pages they view |
| **Backblaze, Inc.** (B2 Cloud Storage) | Holds the backups. Every database is streamed there: changes each minute and a full copy daily, kept 30 days | United States (us-west-001) | A copy of everything the service stores: your account, your sites, and the pseudonymous event data |

That's the whole list.

This marketing site is served by **GitHub, Inc.** (GitHub Pages). It has no
accounts, no forms and no database, so nothing of yours passes through it — which
is why GitHub isn't a sub-processor of your data.

## What isn't on it, and why

**Google.** You can connect a Google account to sign in, to import your Google
Analytics 4 history, or to import Search Console data. Every one of those is
something you start, and you can disconnect it at any time. Google isn't
processing your visitors' data on our behalf, so it isn't a sub-processor — it's
a source you chose to read from.

**Slack, for your reports.** Slack is on the list for our own notices. If you
point a report or an alert at a Slack webhook, we post to the URL you gave us.
You chose that destination, so Slack is your processor for it, not ours.

**An analytics script in your browser.** We use Feasible on feasible.lol, and
neither this site nor the app loads another company's analytics script.
PostHog, above, gets account events and log lines from our servers, never from
your browser.

**A font host or tag manager.** This site serves its own fonts and its own
stylesheet. Its analytics script comes from `cdn.feasible.lol`, which is the
CloudFront row above. Nothing else on it calls out to another company.

## Changes

If we add or replace a sub-processor, we update this page and give **30 days'
notice** before the change takes effect, as the [DPA](/dpa/) requires. You can
object during that window.

To hear about changes, email
[help@feasible.lol](mailto:help@feasible.lol) and ask to be added to the
sub-processor notice list. There's no form and no marketing list attached to it.

## Questions

Email [help@feasible.lol](mailto:help@feasible.lol). A person reads it.
