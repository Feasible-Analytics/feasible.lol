---
title: "What are the four automatic goals?"
description: "404, Outbound Link: Click, File Download and Form: Submission — created with every site, counting from day one."
category: "goals-and-events"
weight: 30
---

Every new site gets four goals for free, created the moment you add it.

- **`Outbound Link: Click`** — somebody clicked a link to another domain. Carries the destination as a `url` property, so you can see exactly where your traffic goes.
- **`File Download`** — a PDF, a zip, an installer. Recognised by extension.
- **`Form: Submission`** — any form submitted on the page.
- **`404`** — a page-not-found.

The first three need nothing from you. The script watches for them automatically: outbound clicks including middle-clicks, downloads by file type, and form submissions. It never cancels the click or the submit, so nothing about your site's behaviour changes.

**The 404 goal is the exception, and it's worth being straight about.** The base script doesn't detect a 404 — it can't, because a 404 page is just a page as far as the browser is concerned. The goal exists and will count, but something has to send it. The WordPress plugin does this for you. Anywhere else, fire it yourself from your error template:

```js
feasible('404')
```

Because these goals are created with the site, they've been counting since day one — which makes them the one exception to [goals not backfilling](/help/why-doesnt-my-goal-show-past-conversions/).

You can rename them, delete them, or add property constraints, same as [any goal](/help/how-do-i-track-a-signup/). Two small things: you can force a link to count as a download by putting `download` on the `<a>`, and you can replace the recognised extension list with `data-file-types` on the script tag.

Conversions show up in the **Goals** tab of the Behaviour card. Click a row to filter the whole dashboard by it.
