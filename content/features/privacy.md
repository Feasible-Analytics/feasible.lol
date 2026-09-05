---
title: "No cookies, and no banner for most sites"
description: "Feasible sets no cookies and the raw IP address never reaches disk. Most sites won't need a consent banner to run it. Here's what we store."
lede: "No cookie. No device ID. No IP address on disk."
weight: 20
note: |
  The visitor identifier is pseudonymous, not anonymous, and our own privacy doc
  says so - somebody holding the shared salt and the stored hashes could
  brute-force candidates. We're also in Oregon, not the EU. There's no EU region
  to pick, and international transfers run on standard contractual clauses
  through the DPA.
---

Feasible sets no cookies on the sites it measures.

The tracker writes two things into
`localStorage`, and neither identifies anybody: `feasible_ignore`, which you set
yourself to stop counting your own visits, and `feasible_outbox`, the retry
queue that holds an event for a moment if the network drops it.

## What never touches disk

The visitor's IP address.

That isn't a policy, it's the shape of the pipeline. Geolocation and the visitor
hash both happen in the ingest tier - the only place the address exists - and
the address is discarded before anything is written. The durable event type has
nowhere to put one.

Geolocation is a DB-IP Lite database read from local disk. Country, first- and
second-level region, English city name, and nothing finer. There's no network
call per pageview, ever, so no third party learns that your reader exists. A
missing database degrades to "unknown" rather than failing. Commercial VPN exits
are bucketed as `Anonymous VPN Service` instead of being dropped or labeled
with the datacenter's country.

The same instinct runs through the app. Source favicons on the dashboard are
proxied through our own origin, so opening your reports never makes your browser
contact the sites that linked to you. Avatars are fetched once, re-encoded, and
served from us. Gravatar is off unless an operator turns it on.

## The identifier
Every visit gets a 64-bit number, derived like this:

```
user_id = SipHash-2-4(key = daily_salt,
                      msg = user_agent + client_ip + site_domain + root_domain)
```

The salt is the key, not a prefix. Each ingester derives the day's salt locally
as an HMAC-SHA256 of a shared secret and the UTC day number. **No salt is ever
written to a database.** Today's and yesterday's are held in memory - yesterday's
only so a visit that started at 23:58 doesn't split in two - and when the day
rolls over, the old one is gone and unrecoverable.

So a returning visitor is a new person tomorrow. That's the trade: we can't
build a profile across days because we've thrown away the only thing that would
let us. It's also why Feasible has no user-level report, no cross-site
identity and no cohort analysis. Those need a durable identifier, and there
isn't one.

Because the derivation uses the registrable domain, `app.example.com` and
`example.com` share visitors on purpose.

## So do you need a cookie banner?

Most sites won't. The consent rules - PECR in the UK, the ePrivacy Directive
across the EU - turn on storing or reading information on a visitor's device for
purposes that aren't strictly necessary. Feasible sets no cookie and stores no
identifier. The only two things it can write are a retry queue that empties
itself and an opt-out flag you set on purpose.

That isn't the same as us telling you you're covered, and we won't. Regulators
read the technical scope of that rule more broadly than the vendor slogan does.
The UK is the one place with a real statutory analytics exemption - PECR
Schedule A1, paragraph 5, in force since February 5, 2026 - and even that asks
for clear information and a simple, free opt-out. If you're somewhere strict,
check with your own lawyer.

What we'll say plainly: Feasible is GDPR-, CCPA- and PECR-friendly, and most
sites run it without a banner. The long version is on
[GDPR-friendly analytics](/gdpr-compliant-analytics/). We're never going to tell
you that *you* are compliant. That depends on everything else on your page, and we're not your
lawyer.

What we can hand you is the paperwork. The [data processing
addendum](/dpa/) is 10 numbered sections, forms part of the terms, and needs no
signature. It names the sub-processors, commits to a 72-hour breach notice, and
covers transfers with standard contractual clauses plus the UK addendum. It also
says plainly that you must not send us direct identifiers - don't put an email
address in a [custom property](/features/custom-properties/).

## Bot traffic gets labeled, not deleted

When Feasible decides a hit came from a crawler, a datacenter, an automated
browser or a known referrer-spam domain, the event is still stored with the
reason attached and kept out of your reports.

That matters more than it sounds. A tool that silently discards what it doesn't
like can never show you what it discarded, so when your traffic halves you have
no way to tell a real drop from a filter that got too enthusiastic. Every
classification and every drop is counted, named and shown to you on the
[data health panel](/features/data-health/).

to the end: the identifier is pseudonymous, not anonymous. Our technical
[privacy doc](/docs/privacy/) explains why, and the legal one covers who
controls what. Both are public, and neither requires an account to read.

The whole product is [open source web analytics](/open-source-web-analytics/)
under the AGPL, so none of the above is a claim you have to take on faith.
