//
// signup-attribution.test.cjs
// Regression checks for the browser's campaign handoff, with no dependencies.
//
// Created: 2026-11-11
// Copyright (c) 2026 Cloudmanic Labs, LLC. All rights reserved.
//

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const script = fs.readFileSync(path.join(__dirname, "../assets/js/signup-attribution.js"), "utf8");
const signup = "https://app.feasible.lol/register";
const taggedPage = "https://feasible.lol/compare/plausible/?utm_source=newsletter&utm_medium=email&utm_campaign=fall_2026";

// Run the shipped source against links with browser-shaped href access. The
// harness makes any storage, referrer, or network access fail the test.
function page(url, hrefs = [signup]) {
  const links = hrefs.map((href) => ({
    href,
    // Match the attribute API used by the browser script.
    getAttribute(name) {
      assert.equal(name, "href");
      return this.href;
    },
    // Attribute mutation must be confined to the signup destination.
    setAttribute(name, value) {
      assert.equal(name, "href");
      this.href = value;
    },
  }));
  const document = {
    // The script may inspect links, but it must not listen for or block clicks.
    querySelectorAll(selector) {
      assert.equal(selector, "a[href]");
      return links;
    },
  };
  const window = { location: { href: url } };
  for (const [object, fields] of [[document, ["cookie", "referrer"]], [window, ["localStorage", "sessionStorage", "fetch", "navigator"]]]) {
    for (const field of fields) {
      Object.defineProperty(object, field, {
        // Reject collection outside the explicit campaign URL.
        get() { throw new Error("Unexpected access: " + field); },
        // Reject persistence outside the current link attributes.
        set() { throw new Error("Unexpected write: " + field); },
      });
    }
  }
  const context = vm.createContext({ window, document, URL, URLSearchParams });
  vm.runInContext(script, context);
  return {
    links,
    // Re-running must not append duplicate values or change an explicit tag.
    repeat() { vm.runInContext(script, context); },
  };
}

// The ordinary campaign path must preserve all three labels on every CTA.
test("carries existing campaigns to every signup CTA", () => {
  const result = page(taggedPage, [signup, signup, signup]);
  for (const link of result.links) {
    assert.equal(link.href, signup + "?utm_source=newsletter&utm_medium=email&utm_campaign=fall_2026");
  }
});

// A clean Reddit link, direct visit, or unrelated query must remain untagged.
test("leaves clean links and unrelated query parameters alone", () => {
  for (const suffix of ["", "?q=analytics", "?ref=reddit", "?via=reddit", "?utm_content=footer&utm_term=private+search&gclid=123"]) {
    assert.equal(page("https://feasible.lol/" + suffix).links[0].href, signup);
  }
});

// Authentication destinations and all other domains stay outside this change.
test("only changes the exact HTTPS app registration destination", () => {
  const ignored = [
    "/pricing/", "#main", "/register", "/help/?utm_source=docs",
    "https://app.feasible.lol/login", "https://app.feasible.lol/register/other",
    "https://app.feasible.lol/register/", "https://example.com/register",
    "https://app.feasible.lol.example.com/register", "http://app.feasible.lol/register",
    "https://app.feasible.lol:444/register", "https://user:secret@app.feasible.lol/register",
    "mailto:help@feasible.lol", "javascript:void(0)", "https://[invalid",
  ];
  const result = page(taggedPage, ignored);
  assert.deepEqual(result.links.map((link) => link.href), ignored);
});

// Existing signup options and fragments must survive the URL edit.
test("preserves signup options and fragments", () => {
  const link = page(taggedPage, [signup + "?next=%2Fsites%2Fnew#form"]).links[0];
  const destination = new URL(link.href);
  assert.equal(destination.searchParams.get("next"), "/sites/new");
  assert.equal(destination.hash, "#form");
  assert.equal(destination.searchParams.get("utm_campaign"), "fall_2026");
});

// Never splice a landing-page campaign into a deliberately tagged CTA.
test("does not overwrite or mix destination attribution", () => {
  for (const name of ["utm_source", "utm_medium", "utm_campaign", "ref", "via"]) {
    for (const value of ["specific", ""]) {
      const href = signup + "?" + name + "=" + value;
      assert.equal(page(taggedPage, [href]).links[0].href, href);
    }
  }
});

// Campaign values should be simple labels, not a way to pass arbitrary data.
test("rejects email addresses, URLs, whitespace, controls, and long values", () => {
  const invalid = ["", "hello@example.com", "https://example.com/", "two words", "line\nbreak", "tab\tvalue", "query&key=value", "<script>", "x".repeat(81), "étiquette", "-first"];
  for (const name of ["utm_source", "utm_medium", "utm_campaign"]) {
    for (const value of invalid) {
      assert.equal(page("https://feasible.lol/?" + name + "=" + encodeURIComponent(value)).links[0].href, signup, name + ": " + JSON.stringify(value));
    }
  }
});

// Allow the documented boundary without silently truncating a campaign label.
test("accepts documented label lengths and preserves case", () => {
  for (const value of ["a", "0", "Newsletter_2026-11", "x".repeat(80)]) {
    const link = page("https://feasible.lol/?utm_source=" + value).links[0];
    assert.equal(new URL(link.href).searchParams.get("utm_source"), value);
  }
});

// A repeated parameter is ambiguous and must not pick an arbitrary winner.
test("ignores duplicated fields while keeping independent valid fields", () => {
  const link = page("https://feasible.lol/?utm_source=one&utm_source=two&utm_medium=email").links[0];
  assert.equal(link.href, signup + "?utm_medium=email");
});

// One invalid field must not cause unrelated query values to leak through.
test("copies only accepted fields from a mixed query", () => {
  const link = page("https://feasible.lol/?utm_source=newsletter&utm_medium=bad%20value&utm_campaign=fall&email=person%40example.com&utm_content=person&utm_term=private&gclid=tracking").links[0];
  assert.equal(link.href, signup + "?utm_source=newsletter&utm_campaign=fall");
});

// Tags in a fragment are neither a campaign query nor something to collect.
test("ignores the fragment", () => {
  assert.equal(page("https://feasible.lol/#utm_source=reddit").links[0].href, signup);
});

// Back/forward restores and repeated evaluation must not duplicate tags.
test("is idempotent and does not carry attribution to another page", () => {
  const result = page(taggedPage);
  const first = result.links[0].href;
  result.repeat();
  assert.equal(result.links[0].href, first);
  assert.equal(page("https://feasible.lol/pricing/").links[0].href, signup);
});

// A future config change must update the intentionally narrow destination gate.
test("matches the configured signup URL and is included by the page shell", () => {
  const config = fs.readFileSync(path.join(__dirname, "../hugo.toml"), "utf8");
  assert.match(config, /signupURL\s*=\s*"https:\/\/app\.feasible\.lol\/register"/);
  const partial = fs.readFileSync(path.join(__dirname, "../layouts/_partials/scripts.html"), "utf8");
  assert.match(partial, /resources\.Get "js\/signup-attribution\.js"/);
});
