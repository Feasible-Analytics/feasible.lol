---
title: "Add website analytics to Squarespace"
platform: "Squarespace"
description: "Paste one script tag into Squarespace's Code Injection header. Needs a Core, Plus or Advanced plan — check that first."
lede: "Code Injection, Header, paste, save. The catch is which plan you're on."
---

The tag goes in Squarespace's site-wide **Code Injection** panel, in the **Header** box.

{{< snippet domain="yourdomain.com" >}}

## Check your plan first

Code Injection isn't on every Squarespace plan. Squarespace's own help page lists it as available on **"Core, Plus, Advanced, and some legacy billing plans"** (checked September 3, 2026). On the entry-level plan there is no Code Injection panel to open, and no amount of clicking will find one.

If that's you, the options are to upgrade, or to run Squarespace's built-in analytics and accept what it gives you. We'd rather tell you that now than after you've read four hundred more words.

## Steps

1. In your Squarespace dashboard, open **Website → Website Tools → Code Injection**.
2. Paste the tag into the **Header** box.
3. **Save**.

That's the whole thing. The code lands in `<head>` on every page of the site.

## What Squarespace hides

**Code Injection doesn't run in the editor.** Not in the editing view, not in the preview. Check on the live site, and check it in a private window — the editor session behaves differently from a visitor's.

**There's a separate per-page injection box.** Page Settings → Advanced has its own header field. If a tag ends up in both places, that one page reports two pageviews per visit. If a single URL looks exactly twice as busy as its neighbours, look there.

**Site-wide is the point.** People sometimes paste a tracker into a Code Block on the home page because that's the box they found first. That tracks the home page and nothing else, and your top-pages report ends up with exactly one row in it.

{{< callout title="You can drop the cookie banner" >}}
If Squarespace's cookie banner is on solely because of your old analytics, you can turn it off once that tag is gone. Feasible sets no cookies and stores nothing in the browser to identify anyone. [Do I need a cookie banner?](/help/do-i-need-a-cookie-banner/) has the detail — and if you're somewhere strict, ask your own lawyer rather than us.
{{< /callout >}}

## Squarespace's own analytics

You can leave it on. Two scripts count independently and neither breaks the other. The numbers won't match, because no two analytics tools ever match — different bot filtering, different session rules. Pick one to make decisions from and treat the other as a sanity check.

## Check it worked

Open your live site in a private browser window and click through two or three pages. Then open Feasible.

Real-time visitors should show you. If it doesn't, go to **Site settings → Ingestion health**. It counts every event that arrived and every one that was dropped, each with a named reason — `unknown_site` means `data-domain` doesn't match the site you registered, `hostname_not_allowed` means the page is on a hostname that isn't on your list. The **send a test event** button there posts through the real public URL, so it exercises exactly what a browser does.

A brand-new site takes about fifteen seconds before its first event is accepted. If nothing lands immediately, [that's normal](/help/how-long-until-i-see-data/).

Same one-field job on [Wix](/integrations/wix/) and [Webflow](/integrations/webflow/). The general case is in the [install docs](/docs/installation/).

Sources: [Squarespace — Using code injection](https://support.squarespace.com/hc/en-us/articles/205815908-Using-code-injection), checked September 3, 2026.
