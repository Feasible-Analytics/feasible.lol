---
title: "Getting help"
seotitle: "Support - how to get help with Feasible"
description: "Email help@feasible.lol and a person reads it. What to include so we can fix it fast, how long we take to reply, and where the docs and help articles live."
lede: "Email [help@feasible.lol](mailto:help@feasible.lol). A person reads it - usually the person who wrote the code."
---

There's no ticket portal, no phone tree and no chatbot in the corner of the screen.
One address, read by someone who can change the software.

## Before you email

Two things answer most questions faster than we can.

**[The help articles](/help/)** are the short answers - billing, the trial, cookie
banners, why your numbers don't match Google's. **[The docs](/docs/)** are the long
ones: installing the script, events and goals, the API, webhooks, self-hosting.

And if the problem is *"my numbers look wrong"*, open the **ingestion health panel**
for the site first. It counts every event we dropped and gives each one a reason - bot, datacenter address, a shield you set, a hostname you haven't allowed yet, a
proxy that isn't forwarding the visitor's address.

There's a "send a test event" button on the same page that goes through the real
public URL, so you can see the whole path work end to end. Most "it isn't
tracking" emails are answered by that screen in about a minute.

## What to put in a bug report

You don't have to write any of this formally. It just saves a round trip, and a round
trip costs a day.

- **The site's domain**, as it's set up in Feasible.
- **What you expected to happen**, and **what happened instead**. Both, even when the
  second one seems obvious.
- **The URL** of the page in the app where you saw it, and the **date range** if it's
  a report.
- **When it happened**, with a timezone. Our clocks are UTC underneath and your site
  has its own timezone setting, so "yesterday afternoon" is ambiguous.
- **Browser and operating system**, if it's something visual or something that only
  breaks on one machine.
- **A screenshot.** Best single thing you can include.
- **Whether it's every page or one page**, every site or one site, always or
  sometimes. That one line usually tells us where to look.

If you got an error message, paste the whole thing. If you're using the API, include
the request you sent - minus your key, which we never need and never want.

## How long we take

We're a small company in Newberg, Oregon, working US Pacific hours.

**Most email gets a real answer in a day or two on weekdays.** Not an
acknowledgement - an answer, or a question that moves it forward. Something that
lands Friday evening may wait until Monday. If your account is broken and collection
has stopped, say so in the subject line and it jumps the queue.

We're not going to claim 24/7 coverage, because we don't have it, and finding that
out during an outage is a bad way to learn it. What we do have is a support address
that reaches the person who can deploy the fix. [More on what small means, in both
directions](/about/).

## The other addresses

**[sales@feasible.lol](mailto:sales@feasible.lol)** - more than a million pageviews a
month, or data kept longer than five years. Tell us roughly how much traffic you have
and we'll go from there. [What's in the plan first](/pricing/).

**[Bug reports on GitHub](https://github.com/Feasible-Analytics/app.feasible.lol/issues)**
- if you'd rather file it in the open, or you've found something reproducible and
want to track the fix. Feature requests are welcome there too. Don't put account
details, API keys or anything private in a public issue; that's what the email is
for.

**Security problems** go to [help@feasible.lol](mailto:help@feasible.lol) as well - not to a public issue, please. [How we handle them, and what we don't have](/security/).

## Feature requests

Send them. We read all of them and we say no to a lot of them, usually with a reason.

Feasible is a small product - one page, the numbers most people look at, and not much else. Some of the things people ask for are things we've decided
not to build, and you'll get told that straight rather than "it's on the roadmap."
When something does ship, it goes on [the changelog](/changelog/).
