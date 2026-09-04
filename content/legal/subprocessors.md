---
title: "Sub-processors"
description: "Every company that touches data on the hosted Feasible service, what each one does, and where it processes."
lede: "Four companies touch your data. Here's what each one does, and where."
toc: true
nocta: true
updated: 2026-09-03
---

<!-- Source parity: the privacy policy and the DPA — both here and in the app
     binary at internal/pages/docs/legal-privacy.html and legal-dpa.html — link
     to this page by absolute URL and commit to keeping it current. If a
     sub-processor is added or removed, change it here and give the 30 days'
     notice the DPA promises. -->

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
| **DigitalOcean, LLC** | Runs the servers and the storage the service lives on | United States | Everything the service stores: your account, your sites, and the pseudonymous event data |
| **Amazon Web Services, Inc.** (Simple Email Service) | Sends the mail we send you — verification, password resets, login notices, your weekly and monthly reports, and traffic alerts | United States (us-east-1) | Your email address, your name, and whatever figures are in the report being sent |
| **Stripe, Inc.** | Takes the payment and runs the billing portal | United States | Your billing name, email, address and card details. **We never see or store a card number** — it goes to Stripe directly |
| **Sold through Link, LLC** | Merchant of record on transactions labeled "Sold through Link" — collects the payment, issues the receipt and handles indirect tax | United States | Your billing name, email, address and the transaction. Never your visitors' data |

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

**Slack.** If you point a report or an alert at a Slack webhook, we post to the
URL you gave us. You chose the destination, so Slack is your processor for that,
not ours.

**Any analytics vendor.** We use Feasible on feasible.lol. There is no third
party measuring you here.

**Any CDN, font host or tag manager.** This site serves its own fonts and its own
stylesheet. Nothing on it calls out to another company.

## Changes

If we add or replace a sub-processor, we update this page and give **30 days'
notice** before the change takes effect, as the [DPA](/dpa/) requires. You can
object during that window.

To hear about changes, email
[help@feasible.lol](mailto:help@feasible.lol) and ask to be added to the
sub-processor notice list. There's no form and no marketing list attached to it.

## Questions

Email [help@feasible.lol](mailto:help@feasible.lol). A person reads it.
