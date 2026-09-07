---
title: "WordPress analytics, without the Google round trip"
seotitle: "WordPress analytics plugin: no cookies, no banner"
platform: "WordPress"
description: "Three kinds of WordPress analytics plugin exist. Here's which one you want, and how to install ours in about a minute."
lede: "Pick the kind you need first. Installing is the easy part."
---

Most people searching for a WordPress analytics plugin don't need a plugin. They need to decide what happens to the numbers.

There are three answers, and they're genuinely different products.

## The three kinds

**A plugin that puts Google Analytics in your dashboard.** MonsterInsights and [Site Kit by Google](https://wordpress.org/plugins/google-site-kit/) are the two most people land on. MonsterInsights describes itself as ["the best free Google Analytics plugin for WordPress"](https://wordpress.org/plugins/google-analytics-for-wordpress/), which is exactly what it is: a nicer window onto GA4. The data still goes to Google, you still get GA4's reports, and you still need a consent banner. Checked September 6, 2026.

**A plugin that stores the data in your own WordPress database.** [Independent Analytics](https://wordpress.org/plugins/independent-analytics/) and [Burst](https://wordpress.org/plugins/burst-statistics/) both work this way. Nothing leaves your server, which is a real advantage. The trade is that your database carries every pageview forever and your host does the counting, so the bill arrives as slower queries rather than as an invoice.

**A hosted service with a plugin in front of it.** Feasible is this. The counting happens somewhere else, your database stays the size it was, and the reports don't compete with your site for CPU.

None of these is the right answer for everyone. If you're already deep in Google Ads and you need GA4's attribution, use the Google route. If you run one small site and never want a third party involved, the database route is honest and cheap. We built the third one because we had fifty sites and wanted one bill and one dashboard.

## What ours does

No cookies, so [most sites won't need a consent banner](/help/do-i-need-a-cookie-banner/). One page of reports rather than a builder. Unlimited sites and unlimited team members on [one price](/pricing/), because we count pageviews and nothing else.

And two measurements a bare script tag can't give you on any platform: **404 hits and site-search terms**. Those come from the plugin reading WordPress itself.

## Installing it

Three routes. The plugin is the one we'd pick.

### The Feasible plugin

Install **feasible.lol Analytics**, open **feasible.lol → Settings**, enter your domain exactly as you registered it, and save.

It serves the script and the events endpoint from your own domain on randomized paths, which is the part that survives ad blockers. It's also where 404 and site-search tracking come from.

{{< callout title="Those two are the plugin, not the script" >}}
404 and site-search tracking come from the WordPress plugin. They aren't in the base script tag, on WordPress or anywhere else. Paste the snippet by hand and you get everything else - outbound clicks, file downloads, form submissions, scroll depth - but not those two.
{{< /callout >}}

### A header-scripts plugin

1. Install one. WPCode is the one most people already have.
2. Open its header field - the one labeled for the `<head>` section, not the footer.
3. Paste the tag, save, and clear your cache.

{{< snippet >}}

This survives theme updates, theme switches, and the day someone edits the theme files by hand.

### The theme file

1. **Appearance → Theme File Editor.**
2. Pick your **child theme** in the selector at the top right.
3. Open **Theme Header (`header.php`)**.
4. Paste the tag just before `</head>` and click **Update File**.

Use a child theme. A snippet pasted into a parent theme is erased by the next theme update, and your traffic stops with no warning at all - no error, no email, just a flat line you notice three weeks later.

Block themes - Twenty Twenty-Four, Twenty Twenty-Five, anything built for the site editor - have no `header.php`. Use a plugin.

## Caching plugins

This is where WordPress installs go wrong.

**Don't add the tag to a "delay JavaScript execution" or "defer JavaScript" list.** WP Rocket, LiteSpeed Cache and Autoptimize all offer one. The tag is already deferred. Delaying it a second time holds it until the first user interaction, and a visitor who reads one page and leaves never gets counted.

**Purge the cache after you paste it.** Otherwise you're testing a page rendered before the tag existed, and you'll spend twenty minutes debugging a file that's already correct.

If you use a minifier, exclude the tag or check the rendered source afterwards. Some of them rewrite or drop script tags they don't recognise, and the tag then loads nothing.

## Check it worked

Clear your cache, open your site in a normal browser window, and click through two or three pages. Then open Feasible.

You should show up under Real-time visitors. If you don't, go to **Site settings → Ingestion health**. It counts every event that arrived and every one that was dropped, each with a named reason - `unknown_site` means the snippet is for a site you haven't registered, `hostname_not_allowed` means the page is on a hostname that isn't on your list.

The **send a test event** button there posts through the real public URL, so it exercises what a browser does.

A brand-new site takes about fifteen seconds before its first event is accepted, so [give it a moment](/help/how-long-until-i-see-data/) before you start changing things.

## Moving from Google Analytics

Upload your old GA reports as CSV and their pages, sources, locations, devices and browsers appear beside the new numbers. [How that works](/migrate/from-google-analytics/). You keep the history and drop the banner.

Running WordPress behind something else? See [Ghost](/integrations/ghost/), [Shopify](/integrations/shopify/), or the full [install docs](/docs/installation/).
