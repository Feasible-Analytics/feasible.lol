---
title: "Terms of service"
description: "What we sell, what happens if payment stops, and what we will never do with your data. The terms for the hosted service at feasible.lol."
lede: "What we sell, what happens if payment stops, and what we will never do with your data."
toc: true
nocta: true
updated: 2026-09-03
---

<!-- Source parity: the authoritative copy of this document is
     internal/pages/docs/legal-terms.html in the app repo, which substitutes the operator's
     identity for self-hosted installs. Change both together. -->

{{< callout title="Which service this covers" >}}
These are the terms for the hosted service at feasible.lol, run by Cloudmanic Labs, LLC. If you run [your own copy of Feasible](/open-source/), you are the operator of that install and set your own terms for it — the AGPL-3.0-or-later license, not this page, is what governs the software you run.
{{< /callout >}}

These terms govern the hosted service at feasible.lol. The software itself is separately
licensed under AGPL-3.0-or-later, and nothing here restricts what that license grants you.

**Cloudmanic Labs, LLC**\
901 Brutscher Street, D112\
Newberg, OR 97132\
United States

## 1. The service

We provide web analytics. Every account gets every feature — there is no tier that
withholds one — and the plan includes 1,000,000 pageviews and custom events per calendar
month, unlimited sites, unlimited team members and unlimited retention while the account exists.

## 2. Your account

You are responsible for what happens under your account and for keeping your credentials
safe. You must not use the service to collect data you have no right to collect, and you must
not put personal data into a custom property or a page path where it does not belong — the
[documentation](https://app.feasible.lol/docs/custom-properties) says which fields those are.

## 3. Payment

$9.99 per month or $99 per year, exclusive of tax. Tax is calculated at checkout from
your billing address. For a transaction in a jurisdiction where Managed Payments is available
and labeled "Sold through Link," Stripe Managed Payments is provided by Sold through Link,
LLC, which is the merchant of record. It calculates, collects, reports and remits indirect tax
in the countries and transactions Managed Payments supports. Cloudmanic Labs, LLC remains the
seller of the feasible.lol service and is responsible for domestic or other seller taxes where
Managed Payments does not handle them. Link provides receipts and transaction support.
Subscriptions renew automatically until canceled, and you can cancel at any time from your
own billing portal without asking us.

Switching monthly to yearly prorates immediately. Switching yearly to monthly takes effect
at renewal.

## 4. Refunds

Under our refund policy, yearly plans are refunded pro rata within 30 days of purchase, on
request, with no retention flow and no form. Monthly plans are not refunded under our policy,
because canceling stops the next one and there is at most a month at stake.

For a transaction labeled "Sold through Link," you may also request a refund through
[Link support](https://support.link.com/topics/sold-through-link). Sold through
Link, LLC's refund policy controls where it gives you broader rights than ours, and it may
issue refunds in circumstances covered by that policy. Nothing in this section limits rights
you have under applicable law.

## 5. Going over the included volume

Nothing is throttled and nothing is dropped. We email at 70%, 85% and 100% of the monthly
allowance. One month over has no consequence. After two consecutive months over we will ask
you to reply within two weeks so we can find a plan that fits; if nobody replies, the
dashboard is locked until somebody does. Even then we keep collecting your data, and your
settings and exports stay open.

## 6. What happens if payment stops

The timetable is fixed, published on the [pricing page](/pricing/), and identical
whether a trial ended or a card failed. Day 0 is the first failed charge. The dashboard locks
at day 30. Collection stops at day 60. At day 90 the hourly lifecycle sweep immediately
removes the account and its analytics from live systems. You are emailed nine times before
that happens and once to confirm it, each message naming the exact date of the next step.
Paying at any point before day 90 restores everything.

At day 90 we remove the live account database and account records in that hourly sweep.
Storage and recovery systems operated outside this application have their own retention and
deletion controls and are not used to reactivate a deleted account. If deletion of the
payment-provider customer fails, we retain only its provider identifier and retry on every
hourly lifecycle sweep until it succeeds. The confirmation is sent after that external
deletion succeeds.

## 7. Export

Your data is yours and export works in every account state, including a locked or dormant
one and including the day before a scheduled deletion. It includes every raw event, not a
summary. We will not withhold your data to collect a debt.

## 8. Availability

We work hard to keep the service up and we do not promise a specific uptime percentage on
this plan. If we have an outage we will say so plainly, and we will not describe a failure as
a "degraded experience".

## 9. Suspension

We may suspend an account that is attacking the service, sending traffic that is not
genuine analytics, or breaking the law. We will tell you why, and we will not delete your
data as a punishment.

## 10. Liability

To the extent the law allows, our total liability is limited to what you paid us in the
twelve months before the claim. We are not liable for indirect or consequential loss. Nothing
here limits liability that cannot be limited.

## 11. Changes

We will email you before a change to these terms that materially affects you takes effect.
Continuing to use the service afterwards means you accept it; if you would rather not, cancel
and we will refund the unused part of a yearly plan.

## 12. Governing law

The laws of the State of Oregon, United States, without regard to conflict-of-law rules.

## 13. Contact

[help@feasible.lol](mailto:help@feasible.lol) reaches a person.
