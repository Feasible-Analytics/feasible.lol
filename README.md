# feasible.lol

The marketing website for [Feasible](https://feasible.lol) — simple,
privacy-friendly website analytics.

Static site built with [Hugo](https://gohugo.io) and Tailwind CSS v4, deployed
to GitHub Pages on every push to `main`.

The product itself lives in
[app.feasible.lol](https://github.com/Feasible-Analytics/app.feasible.lol).

## Running it locally

You need Hugo extended and Node.

```bash
npm install
hugo server
```

Then open <http://localhost:1313>.

Hugo shells out to the Tailwind CLI from `node_modules`, so `npm install` has to
run before the first build. There is no separate CSS build step and no
`tailwind.config.js` — the design tokens live in `assets/css/main.css` under
`@theme`.

## Layout

| Path | What's in it |
|---|---|
| `content/` | Every page, as Markdown with front matter |
| `layouts/` | Templates. `_partials/` are shared, `_shortcodes/` are used inside content |
| `assets/css/main.css` | The whole design system: theme tokens and component classes |
| `assets/images/` | Images Hugo resizes into WebP srcsets |
| `data/` | Copy blocks and comparison tables kept out of templates |
| `static/` | Files copied through untouched: fonts, favicon, CNAME |

## Prices

Prices appear in `hugo.toml` under `[params.pricing]` and in the comparison
tables under `data/`. Stripe and the in-app pricing page are the real source of
truth for what a card gets charged; a static site can't read them, so when a
price changes it has to be changed here too.

Competitors' prices are their published list prices, each carrying the date it
was checked. If one is stale, fix it — an out-of-date comparison is worse than
no comparison.

## License

[MIT](LICENSE). The Feasible name and logo are trademarks of Cloudmanic Labs, LLC.
