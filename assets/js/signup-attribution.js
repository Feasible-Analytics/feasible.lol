//
// signup-attribution.js
// Carry an existing campaign to registration without storing a visitor trail.
//
// Created: 2026-11-11
// Copyright (c) 2026 Cloudmanic Labs, LLC. All rights reserved.
//

// Keep this limited to the current page and the app's registration endpoint.
// A clean URL stays clean. We don't infer a source from the referrer, persist
// anything, or copy arbitrary query strings, search terms, or click IDs.
(function () {
  "use strict";

  var source = new URL(window.location.href).searchParams;
  var names = ["utm_source", "utm_medium", "utm_campaign"];
  var campaign = new URLSearchParams();

  // Only accept one short campaign label per field. Email addresses, URLs,
  // whitespace, control characters, and long values don't belong in these tags.
  names.forEach(function (name) {
    var values = source.getAll(name);
    if (values.length === 1 && /^[a-z0-9][a-z0-9_-]{0,79}$/i.test(values[0])) {
      campaign.set(name, values[0]);
    }
  });
  if (!campaign.size) return;

  // Change the real href, so keyboard activation, copied links, and new tabs
  // work without intercepting a click or delaying registration for analytics.
  document.querySelectorAll("a[href]").forEach(function (link) {
    var destination;
    try {
      destination = new URL(link.getAttribute("href"), window.location.href);
    } catch (_) {
      return;
    }
    if (destination.origin !== "https://app.feasible.lol" ||
        destination.pathname !== "/register" ||
        destination.username || destination.password) return;

    // A deliberately tagged destination owns its attribution. Don't combine
    // two campaigns or overwrite the app's alternative source parameters.
    if (names.concat(["ref", "via"]).some(function (name) {
      return destination.searchParams.has(name);
    })) return;

    // Only the three accepted campaign labels cross to our registration page.
    campaign.forEach(function (value, name) {
      destination.searchParams.set(name, value);
    });
    link.setAttribute("href", destination.href);
  });
})();
