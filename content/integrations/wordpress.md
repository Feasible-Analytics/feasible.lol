---
title: "Add website analytics to WordPress"
platform: "WordPress"
description: "Paste one script tag into your WordPress header - via a header-scripts plugin, a child theme, or the Feasible plugin. No cookies, so most sites won't need a banner."
lede: "One tag in your theme header, or one plugin. Both take about a minute."
---

The tag goes in your theme's `header.php`, just before `</head>` - or, if you'd rather never think about it again, into a header-scripts plugin so a theme update can't wipe it.

{{< snippet domain="yourdomain.com" >}}

## The plugin route, which is the one we'd pick

1. Install a header-scripts plugin. WPCode is the one most people already have.
2. Open its header field - the one labeled for the `<head>` section, not the footer.
3. Paste the tag, save, and clear your cache.

This survives theme updates, theme switches, and the day someone edits the theme files by hand.

## The theme route

1. **Appearance → Theme File Editor.**
2. Pick your **child theme** in the theme selector at the top right.
3. Open **Theme Header (`header.php`)**.
4. Paste the tag just before `</head>` and click **Update File**.

Use a child theme. A snippet pasted into a parent theme is erased by the next theme update, and your traffic stops with no warning at all - no error, no email, just a flat line you notice three weeks later.

Block themes - Twenty Twenty-Four, Twenty Twenty-Five, anything built for the site editor - have no `header.php`. Use a plugin.

## The Feasible plugin

There's also a WordPress plugin, feasible.lol Analytics. Install it, open **feasible.lol → Settings**, enter your domain as you registered it, and save.

It serves the script and the events endpoint from your own domain on randomized paths, which is the part that survives ad blockers. It also adds two measurements a theme can't give you: **404 hits and site-search terms**.

{{< callout title="Those two are the plugin, not the script" >}}
404 and site-search tracking come from the WordPress plugin. They aren't in the base script tag, on WordPress or anywhere else. If you paste the snippet by hand, you get everything else - outbound clicks, file downloads, form submissions, scroll depth - but not those two.
{{< /callout >}}

## Caching plugins

This is where WordPress installs go wrong.

**Don't add the tag to a "delay JavaScript execution" or "defer JavaScript" list.** WP Rocket, LiteSpeed Cache and Autoptimize all offer one. The tag is already deferred. Delaying it a second time holds it until the first user interaction, and a visitor who reads one page and leaves never gets counted.

**Purge the cache after you paste it.** Otherwise you're testing a page that was rendered before the tag existed, and you'll spend twenty minutes debugging a file that's already correct.

If you use a minifier, exclude the tag or check the rendered source afterwards. Some minifiers strip `data-` attributes, and without `data-domain` the script loads and does nothing.

## Check it worked

Clear your cache, open your site in a normal browser window, and click through two or three pages. Then open Feasible.

You should show up under Real-time visitors. If you don't, go to **Site settings → Ingestion health**. It counts every event that arrived and every one that was dropped, each with a named reason - `unknown_site` means `data-domain` doesn't match the site you registered, `hostname_not_allowed` means the page is on a hostname that isn't on your list.

The **send a test event** button there posts through the real public URL, so it exercises what a browser does.

A brand-new site takes about fifteen seconds before its first event is accepted, so [give it a moment](/help/how-long-until-i-see-data/) before you start changing things.

Running WordPress behind something else? See [Ghost](/integrations/ghost/), [Shopify](/integrations/shopify/), or the full [install docs](/docs/installation/).
