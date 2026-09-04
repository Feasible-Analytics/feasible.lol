---
title: "Can I sign a DPA?"
description: "There's nothing to sign. The data processing addendum is already part of the terms you accepted, in full, on a public page."
category: "privacy-and-the-law"
weight: 80
---

There's nothing to sign. You already have one.

The [data processing addendum](/dpa/) forms part of the terms of service, so it's in force from the moment you have an account. No form, no sales call, no enterprise tier, no waiting on a countersignature. Print it if procurement needs a PDF.

It runs to ten numbered sections and covers what you'd expect a DPA to cover:

- **Who's who.** Cloudmanic Labs, LLC is the processor for your visitors' data; you're the controller.
- **Subject matter, duration, nature and purpose** of the processing.
- **Categories of data subject** — your visitors — and **categories of personal data**: the pseudonymous visitor hash, paths, referrers, approximate geolocation derived from an address that was discarded, device and browser strings, and any custom properties you send.
- **An explicit prohibition on sending direct identifiers.** Don't put an email address in a custom property. It's in the contract, not just the docs.
- **72-hour breach notification.**
- **Sub-processors** by general authorisation, against a public list you can check.
- **The EU Standard Contractual Clauses, module two, plus the UK Addendum**, which is how [US hosting](/help/where-is-my-data-stored/) is handled.
- **Security measures**: TLS, a hashing value derived fresh each day, one database per account, encrypted volumes, hashed credentials, least privilege.

One carve-out worth knowing if you [self-host](/help/can-i-run-feasible-myself/): your own hosting providers are not our sub-processors, and the DPA says so. On a self-hosted install the legal pages substitute your organisation's details for ours, because in that arrangement we aren't processing anything.

If your legal team needs a change to the text, [email us](mailto:help@feasible.lol) and we'll read it. We're a small company, so we can actually answer.
