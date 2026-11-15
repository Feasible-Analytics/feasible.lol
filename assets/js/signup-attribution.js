//
// signup-attribution.js
// Carry where a visitor came from to registration, on the sign-up link and nowhere else.
//
// Created: 2026-11-11
// Copyright (c) 2026 Cloudmanic Labs, LLC. All rights reserved.
//

// Nothing is stored in the browser and no cookie is set. The only thing this
// changes is the href of links to the app's /register page. They get the
// campaign labels on this page's address, the domain of the site that linked
// here, and this page's path. Links between our own pages stay clean, so the
// address bar never shows any of it. Search terms, click IDs and full
// referring addresses are never copied.
(function () {
  "use strict";

  var app = "https://app.feasible.lol";
  var page = new URL(window.location.href);
  var names = ["utm_source", "utm_medium", "utm_campaign"];
  var carried = new URLSearchParams();

  // Only accept one short campaign label per field. Email addresses, URLs,
  // whitespace, control characters, and long values don't belong in these tags.
  names.forEach(function (name) {
    var values = page.searchParams.getAll(name);
    if (values.length === 1 && /^[a-z0-9][a-z0-9_-]{0,79}$/i.test(values[0])) {
      carried.set(name, values[0]);
    }
  });

  // Our own sites are not a referral. Counting them would make every visitor
  // who clicked around first look self-referred.
  var site = page.hostname.replace(/^www\./, "");
  var ours = function (host) {
    host = host.replace(/^www\./, "");
    return host === site || host.slice(-site.length - 1) === "." + site ||
      host === new URL(app).hostname;
  };

  // The referring domain is the host of the page that linked here, and only
  // the host. Apps and strict browsers send nothing, and that's fine.
  var referrer = "";
  try {
    referrer = new URL(document.referrer).hostname.toLowerCase();
  } catch (_) {}
  if (/^[a-z0-9]([a-z0-9.-]{0,251}[a-z0-9])?$/.test(referrer) && !ours(referrer)) {
    carried.set("referrer", referrer);
  }

  // The landing page is the one being read, as a path. Never its query string.
  carried.set("landing", page.pathname);

  // Change the real href, so keyboard activation, copied links, and new tabs
  // work without intercepting a click or delaying registration for analytics.
  document.querySelectorAll("a[href]").forEach(function (link) {
    var destination;
    try {
      destination = new URL(link.getAttribute("href"), window.location.href);
    } catch (_) {
      return;
    }
    if (destination.origin !== app ||
        destination.pathname !== "/register" ||
        destination.username || destination.password) return;

    // A deliberately tagged destination owns its attribution. Don't combine
    // two sources or overwrite the app's alternative source parameters.
    if (names.concat(["ref", "via", "referrer", "landing"]).some(function (name) {
      return destination.searchParams.has(name);
    })) return;

    carried.forEach(function (value, name) {
      destination.searchParams.set(name, value);
    });
    link.setAttribute("href", destination.href);
  });
})();
