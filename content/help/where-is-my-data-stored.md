---
title: "Where is my data stored?"
description: "In the United States. Cloudmanic Labs is in Newberg, Oregon, and we don't offer an EU region. Here's how transfers are covered."
category: "privacy-and-the-law"
weight: 70
updated: 2026-09-03
---

In the United States.

Feasible is run by Cloudmanic Labs, LLC - 901 Brutscher Street, D112, Newberg, OR 97132 - and the hosted service runs on US infrastructure under Oregon law. **There's no EU region and we're not going to imply there is.** Some vendors in this category offer one; we don't, today.

If your visitors are in the EU or the UK, that's an international transfer, and it's covered the ordinary way: the [data processing addendum](/dpa/) incorporates the EU Standard Contractual Clauses (module two, controller to processor) and the UK Addendum. It's already part of the terms - [nothing to sign](/help/can-i-sign-a-dpa/).

What's transferred is worth putting next to that. There's no IP address in it, because [the raw address never reaches disk](/help/do-you-store-ip-addresses/). What crosses is a path, a referrer, a coarse location, a device string and a hash that expires nightly. That's a materially smaller transfer than a tool that ships identified user records, though it's still a transfer and we're not going to argue otherwise.

Two more things:

- **Each account gets its own database file.** Your data isn't sitting in a shared table with everyone else's, which makes both export and deletion a whole-file operation rather than a careful `DELETE`.
- **Retention is 5 years**, and [export works in every account state](/help/how-do-i-export-my-data/) - including a locked or lapsed one, on purpose, because portability shouldn't depend on a payment.

If US hosting is a hard no for you, that's a legitimate reason to [run it yourself](/help/can-i-run-feasible-myself/) on a machine in whatever country you like. It's the same software, free, with every feature.
