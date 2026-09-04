---
title: "Privacy and data policy"
description: "Who controls what data, on what legal basis, and for how long. The privacy policy for the hosted analytics service at feasible.lol."
lede: "Who controls what, on what legal basis, and for how long."
toc: true
nocta: true
updated: 2026-09-03
---

<!-- Source parity: the authoritative copy of this document is
     internal/pages/docs/legal-privacy.html in the app repo, which substitutes the operator's
     identity for self-hosted installs. Change both together. -->

{{< callout title="Which service this covers" >}}
This is the privacy policy for the hosted service at feasible.lol, run by Cloudmanic Labs, LLC. If you run [your own copy of Feasible](/open-source/), you are the operator of that install — it serves its own version of this policy, with your name and address in place of ours, and this page does not govern your visitors' data.
{{< /callout >}}

## Who we are

The controller of personal data collected through the feasible.lol service, and the
processor of the analytics data you collect through it, is:

**Cloudmanic Labs, LLC**\
901 Brutscher Street, D112\
Newberg, OR 97132\
United States\
[help@feasible.lol](mailto:help@feasible.lol)

## Two different sets of data

**Your account.** We are the controller. We hold your email address, your
name if you gave one, your team and site names, the transaction identifiers and subscription
status Stripe shares with us, and the sessions and API keys you created. We hold them to run
the service, provide your subscription, and email you about your account.

**Your payment.** For transactions in jurisdictions where Managed Payments is
available and labelled "Sold through Link," Stripe Managed Payments is provided by Sold
through Link, LLC as merchant of record. Stripe and Link process the billing and transaction
details you provide at checkout for payment, fraud prevention, indirect-tax compliance where
Managed Payments supports it, receipts and transaction support under
[Stripe's privacy policy](https://stripe.com/privacy).

**Your visitors.** You are the controller and we are the processor. What we
store and what we deliberately do not is set out in full in
[the privacy documentation](https://app.feasible.lol/docs/privacy), including the honest
statement that the visitor identifier is pseudonymous rather than anonymous. The
[data processing addendum](/dpa/) is the contract that governs it.

## Legal bases

- **Contract** — running the account you signed up for, and billing it.
- **Legitimate interests** — keeping the service secure and working, and
  writing to you about your own account.
- **Legal obligation** — keeping transaction and accounting records for as
  long as the law requires.

## Email we send

Every message about your account's state — a trial ending, a payment failing, a deletion
approaching — is transactional and is sent under the contract. Each names the exact date of
the next thing that happens, carries a link to fix it, and has no dark pattern in it. Any
message that is marketing carries an unsubscribe link that works on the first click and a
postal address, as US law requires. Unsubscribing from marketing never stops the messages
that tell you your data is about to be deleted.

## Sub-processors

Named on the [current subprocessor list](/legal/subprocessors/), with what each one is for,
what data it processes and where. We give notice before adding one.

## How long we keep things

- **Analytics data** — for as long as your account exists. We do not age it
  out, and retention is not a paid upgrade.
- **The shared ingest salt** — retained as deployment configuration while the
  service operates. It is combined with the UTC date to derive a different visitor-hashing
  value each day and is not stored in the analytics or system databases.
- **Account records** — until you delete the account. At scheduled day 90 the
  hourly lifecycle sweep immediately removes them from the live service. Storage and recovery
  systems outside the application are governed by their operators' retention controls.
  Payment-provider deletion is attempted in that sweep and retried on every hourly sweep until
  it succeeds.
- **Deletion records** — the team name and contact email are kept only long enough
  to send the confirmation, then erased. A payment-provider customer identifier is kept only
  while external erasure is retrying. A minimal tombstone of internal team id, deletion and
  notification timestamps, and generic completion state remains.
- **Invoices** — as long as tax law requires, which is longer than we would
  otherwise keep anything.

## Your rights

Access, correction, erasure, portability, restriction and objection. Export works from
inside the product at any time and in any account state. For anything else, write to
[help@feasible.lol](mailto:help@feasible.lol); we will answer within 30 days.
If you are in the EEA or the UK you may also complain to your supervisory authority.

## International transfers

We are a US company; each hosting subprocessor's processing region is stated on the
[current list](/legal/subprocessors/). Transfers from the EEA or the UK rely on the Standard
Contractual Clauses, which are incorporated into the
[DPA](/dpa/).

## Children

The service is not for children, and we do not knowingly hold data about anyone under 16.

## Changes

If we change this policy in a way that matters, we will email you before it takes effect
rather than changing a date at the bottom of a page and hoping you notice.
