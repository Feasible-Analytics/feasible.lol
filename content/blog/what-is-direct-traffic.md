---
# Created: 2026-11-17
# Copyright (c) 2026 Cloudmanic Labs, LLC. All rights reserved.
title: "Direct traffic isn't people typing your address"
seotitle: "What is direct traffic? Mostly not people typing your URL"
slug: "what-is-direct-traffic"
description: "Direct means the browser sent no referrer and the link carried no tag. We clicked one link 13 ways in three browsers to see when that happens."
lede: "Direct is the label for \"the browser didn't say.\" We measured when it doesn't."
date: 2026-11-17
checked: 2026-11-17
image: "/images/og/what-is-direct-traffic.png"
---

Someone asked us this week why their visits from ChatGPT were showing up as Direct. People were clearly clicking through from ChatGPT. Their analytics said those people had typed the address in.

They hadn't. Direct doesn't mean typed. It means the browser didn't say where the visitor came from, and the link didn't carry a tag that says it instead. It's the bucket for "we don't know," with a confident name.

## Two clues, and Direct has neither

An analytics tool gets two clues about where a visit came from.

The first is the referrer: the address of the page the visitor was on. The browser hands it over in the `Referer` header, misspelled in the HTTP spec since 1996, and in `document.referrer`. The second is anything written into the link itself, like `?utm_source=newsletter`.

No referrer and no tag is Direct. That's the rule in Feasible, and it's the rule in [GA4's channel definitions](https://support.google.com/analytics/answer/9756891): source `(direct)`, medium `(none)` or `(not set)`.

So the useful question is when a browser stays quiet.

## We clicked one link 13 ways

We put three small test sites on a laptop: a news site with a link on it, the shop it pointed to, and a link shortener. Then we clicked the link 13 different ways in Chromium 145, Firefox 142 and WebKit 26.0, and logged what the shop received.

The three browsers agreed on 12 of the 13 clicks, and we'll come back to the odd one.

| How the visitor got there | What the shop saw |
|---|---|
| Typed the address, or a bookmark | Nothing |
| A plain link | The news site, not the page |
| A link that opens a new tab | The news site, not the page |
| A link with `rel="noreferrer"` | Nothing |
| News page sends `Referrer-Policy: no-referrer` | Nothing |
| News page sends `Referrer-Policy: unsafe-url` | The full address, except in WebKit |
| From HTTPS to a site with no HTTPS | Nothing |
| A shortener that redirects with a 302 | The news site |
| The same, with `no-referrer` on the redirect | Nothing |
| A shortener that redirects with a page | The shortener |
| From one shop page to another | The full shop address |

The two policy rows came out the same whether the news page set the policy as a header or a meta tag, and a shortener's page did the same thing whether it used a meta refresh or JavaScript. That's how 11 rows hold 13 clicks.

The odd one is `unsafe-url`, a news site asking for its full address to be sent. Chromium and Firefox sent it, query string and all. WebKit, the engine under Safari, sent the full address in the `Referer` header but gave `document.referrer` only the site. That matters because `document.referrer` is what a tracking script reads. In every other row, the header and `document.referrer` matched, so a script and your server logs see the same thing.

Six of the 13 arrived with nothing at all. Every one of those is Direct. Two more gave the credit to the shortener instead of the site that carried the link.

## What that means for your numbers

**"Typed" covers far more than typing.** A link opened from anything that isn't a web page reaches the browser with no page behind it: a mail app, a chat app, a PDF, a QR code. We didn't tap a link inside a mail app for this test, but the browser's position is the same as the bookmark row. It's handed a bare address. Webmail in a browser tab is a web page, so it can send a referrer. The mail app on your phone isn't.

**You get the site, not the page.** By default the browser sends the linking site's address and drops the rest. You can see that a forum sent the visit. You can't see which thread unless that forum chooses to send more, and even then WebKit gives a script only the site.

**Your shortener decides.** One that redirects with a 302 gets out of the way, and the credit lands where it should. One that serves a page in between takes the credit itself. One that strips the referrer turns every click into Direct. If you use one, send a click through it and look at what arrives.

**A site still on plain HTTP loses its referrers.** Every link from an HTTPS page, which is most of the web, arrives with nothing.

**An old tab counts too.** In Feasible, [a visit ends](/help/what-is-a-visit-and-when-does-it-end/) after 30 minutes with no activity. Come back to a tab you left open, click through to another of your pages, and that's a new visit whose referrer is your own site. Your own site isn't a source, so the visit is Direct.

## So, ChatGPT

ChatGPT adds `utm_source=chatgpt.com` to many of the links it shows. [OpenAI documents it](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq) for its search results.

That tag does nearly all the work. On feasible.lol, 33 of the 34 visits ChatGPT has sent us carried it, and 27 of those came with no referrer at all. Without the tag, those 27 would be Direct.

So if your tool reads `utm_source` and ChatGPT visits still land in Direct, they came through links without the tag, opened somewhere that sent no referrer. There's nothing left in the visit to recover them from.

## What you can do

Tag every link you send out yourself: the newsletter, the link in your social bio, PDFs, QR codes, slides, the welcome email. `?utm_source=newsletter&utm_medium=email` covers most of them. A tag rides in the address itself, so it survives every row in that table. There's more on [UTM parameters](/help/what-are-utm-parameters/) if you haven't used them.

Don't tag links between your own pages. They don't need it, and in some tools the tag replaces the source that actually brought the visitor in.

Then read what's left in Direct for what it is: visits nobody labeled. It isn't a measure of brand loyalty. Watch its trend instead. When Direct jumps and nothing else moves, look for a newsletter that went out untagged, or a link somewhere that started sending people without saying so.

Feasible uses the rule above as written: no referrer and no tag is Direct. Besides `utm_source`, it reads `?source=` and `?ref=`, so `?ref=newsletter` is enough. A `chatgpt.com` tag goes to the AI Assistants channel whether or not a referrer came with it. The whole classifier is [one Go package](https://github.com/Feasible-Analytics/app.feasible.lol/tree/main/internal/referrer) if you'd like to read it.
