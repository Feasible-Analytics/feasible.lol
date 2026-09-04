---
title: "Data processing addendum"
description: "The processor contract for feasible.lol: sub-processors, security measures, 72-hour breach notice and the SCCs. No signature required."
lede: "The processor contract, the sub-processors, and the security measures."
toc: true
nocta: true
updated: 2026-09-03
---

<!-- Source parity: the authoritative copy of this document is
     internal/pages/docs/legal-dpa.html in the app repo, which substitutes the operator's
     identity for self-hosted installs. Change both together. -->

{{< callout title="Which service this covers" >}}
This is the data processing addendum for the hosted service at feasible.lol, where Cloudmanic Labs, LLC is the processor. If you run [your own copy of Feasible](/open-source/), you are the operator and the processor for your own customers — your install serves its own version of this addendum, naming you, and the providers you choose are yours rather than ours (see section 6).
{{< /callout >}}

This addendum forms part of the [terms of service](/terms/) and applies
whenever we process personal data on your behalf. **It needs no signature: using the service
accepts it.** If your procurement process requires a signed copy, write to
[help@feasible.lol](mailto:help@feasible.lol) and we will sign one.

**Processor:** Cloudmanic Labs, LLC\
901 Brutscher Street, D112\
Newberg, OR 97132\
United States

**Controller:** you, the account holder.

## 1. Subject matter and duration

We process visitor data on your behalf for as long as your account exists, in order to
provide web analytics. Live processing ends when the account is deleted. Storage and recovery
systems outside the application are governed by their operators' retention controls.

## 2. Nature and purpose

Collecting, deriving, storing, aggregating and displaying analytics events from the
websites you have registered, and letting you export them.

## 3. Categories of data subject

Visitors to your websites.

## 4. Categories of personal data

Pseudonymous visitor identifiers, page paths, referrer hosts and acquisition parameters,
approximate location derived from an IP address that is then discarded, device and browser
characteristics, and any custom properties you choose to send.

The IP address is used in the ingestion tier for geolocation and the visitor identifier and
is then discarded. It is never written to disk and never forwarded. Because it is never
stored, it is not retained, exported or restorable.

You must not send direct personal identifiers or special-category data as custom properties,
and you must not put identifiers such as names, email addresses, user ids or tokens in page
paths or full URLs. If prohibited data is sent, you must stop the sender and erase the
affected site data.

## 5. Our obligations

- We process only on your documented instructions, which are these terms and your use of
  the product.
- Everyone with access is under a duty of confidence.
- We keep appropriate technical and organisational measures, set out in section 8.
- We help you respond to data-subject requests, and with your impact assessments.
- We notify you without undue delay, and in any case within 72 hours, if we become aware
  of a personal data breach affecting your data.
- At the end of the service the hourly lifecycle sweep immediately removes the live account
  database and records on the published schedule. Storage and recovery systems outside the
  application are governed by their operators' retention controls and are not used to
  reactivate the account. Provider deletion is attempted in the same sweep and retried on
  every hourly sweep until it succeeds.
- We make available what you need to demonstrate compliance and to audit ours.

## 6. Sub-processors

You give a general authorisation for the legal entities on the current
[hosted-service subprocessor list](/legal/subprocessors/). That public list states
each entity, service, data category and processing region. We give notice before adding or
replacing a hosted-service subprocessor, and you may object.

Self-hosted operators choose and control their own compute, volume, object-storage, email and
payment providers. Those providers are the operator's responsibility and are not subprocessors
of Cloudmanic Labs merely because this software can be configured to use them.

## 7. International transfers

The processing region for each hosted provider is stated on the
[current subprocessor list](/legal/subprocessors/). Transfers of personal data from the EEA,
the UK or Switzerland rely on the European Commission's Standard Contractual Clauses (module
two, controller to processor), which are incorporated into this addendum by reference,
together with the UK Addendum where the UK GDPR applies.

## 8. Security measures

- For the hosted service, TLS protects public client-to-load-balancer connections. TLS
  terminates at the managed load balancer; it sends private-network HTTP to app and ingest
  backends, which are not publicly routable. Self-hosted operators control and are responsible
  for their own TLS termination and backend transport.
- Every ingester derives the visitor identifier's daily hashing value from shared deployment
  configuration and the UTC date. The shared value is not stored in an analytics or system
  database, and raw IP addresses are discarded before an event is persisted.
- One database per account, so a query for one customer cannot reach another's data.
- Encrypted storage volumes for live account databases.
- Credentials, API keys, invitation tokens and reset tokens are stored only as hashes.
- Administrative routes listen on loopback only and are not routable from any network.
- Least-privilege access, reviewed, and logged.

## 9. Liability

The limits in the [terms of service](/terms/) apply to this addendum.

## 10. Order of precedence

Where this addendum conflicts with the terms of service, this addendum wins for anything
concerning the processing of personal data.
