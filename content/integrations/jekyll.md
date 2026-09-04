---
title: "Add website analytics to Jekyll"
platform: "Jekyll"
description: "One script tag in _includes/head.html. If your theme is a gem, copy the file into your repo first — here's the command."
lede: "_includes/head.html. On a gem-based theme you have to copy it out first."
---

The tag goes in `_includes/head.html`, inside `<head>`.

{{< snippet domain="yourdomain.com" >}}

## If the file is in your repo

1. Open `_includes/head.html`.
2. Paste the tag before `</head>`.
3. Commit and push.

Done. Every layout that includes `head.html` — which is all of them — now carries the tag.

## If you're on a gem-based theme

Minima and the other gem themes don't put their files in your repo. `_includes/` might not even exist. You override a file by creating one with the same path.

Find the theme's copy:

```
bundle info --path minima
```

That prints the gem's directory. Copy `_includes/head.html` out of it into your own `_includes/` — creating the folder if you need to — then paste the tag into your copy. Jekyll prefers your file over the gem's.

Copy the file rather than writing one from scratch. The theme's `head.html` carries the SEO tags, the stylesheet link and the feed link, and a hand-written replacement quietly drops all of them.

## GitHub Pages

Nothing special. The tag is plain HTML with no Liquid in it, so it passes through GitHub's build untouched and no plugin is involved.

If you build with an Action rather than the built-in Jekyll, also nothing special — the file is the file.

{{< callout title="jekyll serve won't show you anything" >}}
The dev server runs on `localhost`, which is deliberately not counted. That's why your own writing sessions never appear in your numbers. Check on the published site instead.
{{< /callout >}}

## Two things to get right

**The tag is in `head.html`, not in one layout.** If you paste it into `_layouts/post.html`, you track posts and nothing else, and your home page reports zero visitors. Put it in the include every layout shares.

**One copy, not two.** If a theme already offers an analytics setting in `_config.yml` and you fill that in *and* paste the tag, you get two script tags and two pageviews per visit. Pick one.

## Register the hostname you actually serve

`yourname.github.io` and `yourdomain.com` are different hostnames. Register the one visitors use. Traffic on the other appears on the ingestion health panel as `hostname_not_allowed` rather than silently mixing in, and there's a one-click action there to allow it if you want both.

## Check it worked

Push, wait for the build, then open the published site in a normal browser window and click through two or three pages. Then open Feasible.

You should show up under Real-time visitors. If you don't, go to **Site settings → Ingestion health**. It counts every event that arrived and every one that was dropped, each with a named reason — `unknown_site` means `data-domain` doesn't match the site you registered, `hostname_not_allowed` means the page is on a hostname that isn't on your list.

The **send a test event** button there posts through the real public URL, so it exercises exactly what a browser does.

A brand-new site takes about fifteen seconds before its first event is accepted. [That's normal](/help/how-long-until-i-see-data/).

Related: [Hugo](/integrations/hugo/), [Astro](/integrations/astro/), and the [install docs](/docs/installation/).
