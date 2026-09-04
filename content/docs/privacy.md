---
title: "Privacy and GDPR"
description: "No cookies, no IP written to disk, and a daily-rotating visitor hash — plus why we call it pseudonymous rather than anonymous."
lede: "What we store, what we never store, and why pseudonymous isn't the same as anonymous."
weight: 160
---

The short version: no cookies, no persistent identifier, no cross-site tracking, no data sold or used
for advertising, and no IP address ever written to disk.

This is the technical page. The legal one is the [privacy and data policy](/legal/privacy/), and the
processor contract is the [data processing addendum](/legal/dpa/).

## The visitor identifier is pseudonymous, not anonymous

To tell a returning visitor from a new one within a single day, we compute one number:

```
visitor = SipHash-2-4(
    key = today's secret salt,
    message = user agent + IP address + site domain + registrable domain
)
```

There's no cookie, nothing in local storage, and nothing written into the page. The number is derived
fresh on our side from what every HTTP request already carries.

Three consequences are worth stating outright:

- **The salt changes every day at 00:00 UTC.** The same person on the same device is a different
  number tomorrow, and reporting doesn't join those identifiers across days. That's also why
  [visitors aren't additive across days](/docs/metrics/#visitors-arent-additive-and-arent-quite-what-you-think).
- **The site's domain is in the message.** The same person on two of your sites is two unrelated
  numbers, and there's nothing to join across customers. The registrable domain is in there too,
  which is why `app.example.com` and `example.com` are the same visitor — subdomains share a visitor
  by design.
- **Two day values are derived in memory.** Today's computes identifiers; yesterday's exists solely
  so a visit that began before midnight can still be matched to its own session. They're derived from
  one deployment setting and the UTC date, and never stored as database rows.

### Why we call it pseudonymous

That design is a genuinely strong one, and it's still *pseudonymous* under the GDPR rather than
anonymous.

The identifier is derived from personal data. An IP address is personal data, and a user agent is
close enough that arguing about it isn't worth your time.

Somebody holding the shared deployment salt and the stored hashes could brute-force candidate inputs.
There are only about four billion IPv4 addresses and a few thousand common user-agent strings, so the
search space is small enough to walk.

The shared salt is a modest protection against an analytics-database disclosure. It isn't a claim
that the identifier is irreversible, and we won't call it anonymous.

## What we store

- The page path, with every query parameter except seven acquisition ones stripped.
- The referrer's host, the source, the campaign tags and the channel.
- Country, and region or city where the data allows.
- Device type, browser, operating system and their versions.
- Screen size bucket, and the browser's primary language.
- Time on page and scroll depth, when the script measured them.
- Any [custom properties](/docs/custom-properties/) you chose to send.

That's about 210 bytes an event.

## What we never store

- **The IP address.** It's used for geolocation and for the visitor number, then discarded in the
  ingestion tier before anything is written or forwarded. The type that crosses that boundary has
  nowhere to put one.
- **The raw user agent string.** It's parsed into a browser, an operating system and a device type,
  and the string itself is dropped.
- **Click identifiers.** We record that `gclid` or `msclkid` was *present* — which is how a paid
  click is told from an organic one when somebody forgot their campaign tags — and never its value,
  because a click id identifies one click by one person.
- Anything in a query string other than the seven acquisition parameters.

Geolocation is a local file lookup against DB-IP Lite. There's no network call per pageview, so no
third party learns your visitor's address either.

## Cookies

The tracking script sets none and reads none, and uses no local storage for identification.

Most sites won't need a consent banner for this design. But "no banner required" is a vendor's legal
position rather than a regulator's holding, and rules differ by country and keep moving — the UK now
has a statutory analytics exemption with its own conditions attached, and the EDPB reads the
underlying rule more broadly than the slogan does.

So: here are the facts, and we're not your lawyers. If you're somewhere strict, hand this page to
somebody who is.

## Bot traffic is labelled, not deleted

When we decide a request is a bot, a datacentre address or a known spam referrer, the event is still
stored, with the reason attached, and excluded from your reports by default. You can turn it back on,
and every drop is counted by reason on the ingestion health panel.

Deleting suspected bot traffic before storing it is the more common choice in this market, and it
means a wrongly-classified human visitor is gone with no way to get them back.

The lists themselves ship inside the binary and can be replaced on disk. They don't refresh
themselves at runtime — see [self-hosting](/docs/self-hosting/#bot-and-spam-lists).

## Who processes your data

For the hosted service, Cloudmanic Labs, LLC is the processor and you're the controller.

Our infrastructure sub-processors receive or store encrypted visitor analytics for compute, live
storage and disaster recovery. Their categories and responsibilities are listed in the
[data processing addendum](/legal/dpa/).

We don't sell or rent visitor data, disclose it to billing or email providers, or use it for
advertising.

Cloudmanic Labs is in Oregon, USA. International transfers are handled by standard contractual
clauses incorporated through the DPA. If you [run it yourself](/docs/self-hosting/), the data is
wherever you put it and none of our providers are involved.

## Requests from a data subject

The standard analytics fields carry no direct account identity. But arbitrary custom properties and
page URLs can identify a person if your site sends names, email addresses, user ids or tokens.

Sending those values is prohibited. If it happens, stop the sender and use the site's reset control
or account deletion to erase the affected analytics data, and write to us for help with an access or
erasure request.

A pseudonymous fingerprint on its own usually gives no reliable way to match a named requester to one
stored row — which is the flip side of the design working.

## Deleting an account

At day 90 the hourly lifecycle sweep removes the live analytics database and the account records.
Storage and recovery systems operated outside this application have their own retention and deletion
controls, and aren't used to reactivate a deleted account.

We also ask the payment provider to remove its customer record. If that external request fails, we
keep only the provider identifier needed to retry it on every hourly sweep until it succeeds, and
send the deletion confirmation after it does. Once the mail relay's acceptance is recorded, the
destination email and team name are erased from the deletion record.

A minimal tombstone — internal id, timestamps, generic state — plus invoices retained for tax
obligations, is what remains. The timetable is on the [pricing page](/pricing/).

## Where the data lives

For the hosted service, in one SQLite database per account on encrypted volumes supplied by our
compute host. Infrastructure providers are sub-processors and are named with their data and region on
the [current sub-processor list](https://feasible.lol/legal/subprocessors).

There's no third-party data warehouse, and no analytics on our analytics.
