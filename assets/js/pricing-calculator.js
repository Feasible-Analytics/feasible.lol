//
// pricing-calculator.js
// The calculator on /pricing/calculator/. Works out what each vendor charges a
// year for a number of sites, monthly pageviews and teammates, from
// data/calculator.json. Where the site hasn't checked the step a reader's
// traffic lands on, it shows the checked prices either side as a range. It never
// fills the gap with a guess.
//
// The same source runs in the browser and in scripts/pricing-calculator.test.cjs,
// so the numbers the page shows are the numbers the tests check.
//
// Created: 2026-11-23
// Copyright (c) 2026 Cloudmanic Labs, LLC. All rights reserved.
//

(function (root) {
  "use strict";

  // The setup a visitor sees before they change anything: small enough that
  // every vendor has a checked price for it, so nothing opens on a range.
  var DEFAULTS = { sites: 5, pv: 100000, team: 2, funnels: false, revenue: false };

  // Upper bounds on what a URL can ask for, so a mistyped link can't hang the page.
  var MAX_SITES = 100000;
  var MAX_TEAM = 100000;

  // money formats whole dollars the way the rest of the site does: $1,390.
  function money(usd) {
    return "$" + count(usd);
  }

  // count puts thousands separators into a whole number: 300000 becomes 300,000.
  function count(n) {
    return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // short writes a traffic level the way pricing pages do: 100k, 1M, 2.5M.
  function short(n) {
    if (n >= 1000000) return String(n / 1000000) + "M";
    if (n >= 1000) return String(n / 1000) + "k";
    return String(n);
  }

  // plural picks the singular or plural form of a word for a count.
  function plural(n, one, many) {
    return n === 1 ? one : many;
  }

  // planName joins a vendor and its plan: "Plausible Business", or just "Fathom".
  function planName(vendor, plan) {
    return plan.name ? vendor.name + " " + plan.name : vendor.name;
  }

  // priceAt finds a plan's yearly price for a monthly volume. The first step is
  // the vendor's smallest plan, so anything under it pays that. A step marked
  // "gap" has unchecked steps below it, so traffic between it and the one
  // before gets both prices as a range.
  function priceAt(plan, pv) {
    var steps = plan.steps;
    for (var i = 0; i < steps.length; i++) {
      if (pv > steps[i][0]) continue;
      var prev = steps[i - 1];
      if (prev && steps[i][2] === "gap" && pv < steps[i][0] && prev[1] !== steps[i][1]) {
        return { kind: "range", lo: prev[1], hi: steps[i][1], from: prev[0], to: steps[i][0] };
      }
      return { kind: "exact", lo: steps[i][1], hi: steps[i][1] };
    }

    var last = steps[steps.length - 1];
    if (plan.above === "overage") {
      var usd = Math.round(last[1] + (pv - last[0]) * plan.overagePerEvent * 12);
      return { kind: "exact", lo: usd, hi: usd, overage: last[0] };
    }
    return { kind: plan.above, cap: last[0] };
  }

  // sitesAt reads how many sites a plan includes at a volume. Fathom's grows
  // with the plan, and past a million only "at least 75" is published.
  function sitesAt(plan, pv) {
    var s = plan.sites;
    if (s === null || s === undefined) return { n: Infinity };
    if (typeof s === "number") return { n: s };
    for (var i = 0; i < s.length; i++) {
      if (pv <= s[i][0]) return { n: s[i][1], atLeast: s[i][2] === "atLeast" };
    }
    return { n: s[s.length - 1][1], atLeast: true };
  }

  // feature turns a plan's funnels or revenue entry into a yes or no, with the
  // sentence that goes with it when there is one.
  function feature(value) {
    if (value === true) return { fits: true };
    if (value === false || value === null || value === undefined) return { fits: false };
    return { fits: Boolean(value.fits), note: value.note };
  }

  // evaluate checks one plan against a setup: whether it fits, why not, what
  // it costs, and the notes a reader needs to trust the number.
  function evaluate(vendor, plan, input) {
    var r = { vendor: vendor, plan: plan, name: planName(vendor, plan), fail: {}, notes: [] };
    var price = priceAt(plan, input.pv);
    var extra = 0;
    var maybeExtra = 0;

    if (price.kind === "cap") {
      r.fail.volume = "Stops at " + short(price.cap) + " a month";
    }

    var inc = sitesAt(plan, input.pv);
    if (input.sites > inc.n) {
      var pack = plan.sitePack;
      var packs = pack ? Math.ceil((input.sites - inc.n) / pack.sites) : 0;
      if (pack && packs <= pack.max) {
        var packCost = packs * pack.usd;
        var packText = packs + " extra " + plural(packs, "pack", "packs") + " of " + pack.sites + " sites (" + money(packCost) + ")";
        if (inc.atLeast) {
          maybeExtra += packCost;
          r.notes.push("At least " + inc.n + " sites at this size, and they don't publish how many more. The top of the range adds " + packText + ".");
        } else {
          extra += packCost;
          r.notes.push(inc.n + " sites included. Adds " + packText + ".");
        }
      } else if (pack) {
        r.fail.sites = "More than " + count(inc.n + pack.max * pack.sites) + " sites";
      } else {
        r.fail.sites = "Up to " + count(inc.n) + " " + plural(inc.n, "site", "sites");
      }
    }

    if (plan.team === "unpublished") {
      if (input.team > 0) r.notes.push("No team limit published.");
    } else if (typeof plan.team === "number" && input.team > plan.team) {
      r.fail.team = plan.team === 0 ? "No teammates, owner only" : "Up to " + plan.team + " teammates";
    }
    if (plan.teamUsd && input.team > 0) {
      var seats = input.team * plan.teamUsd;
      extra += seats;
      r.notes.push("One user included. " + input.team + " " + plural(input.team, "teammate adds", "teammates add") + " " + money(seats) + ".");
    }

    if (input.funnels) {
      var f = feature(plan.funnels);
      if (!f.fits) r.fail.funnels = f.note || "No funnels";
      else if (f.note) r.notes.push(f.note);
    }
    if (input.revenue) {
      var v = feature(plan.revenue);
      if (!v.fits) r.fail.revenue = v.note || "No revenue tracking";
      else if (v.note) r.notes.push(v.note);
    }

    if (price.kind === "range") {
      r.notes.unshift("Your traffic sits between their " + short(price.from) + " and " + short(price.to) + " steps. They sell steps in between that we haven't checked, so you see the price of both ends rather than a guess.");
    }
    if (price.overage) {
      r.notes.unshift("Includes " + short(price.overage) + " events a month, then $0.00003 for each one past that.");
    }

    r.fits = Object.keys(r.fail).length === 0;
    if (price.kind === "exact" || price.kind === "range") {
      r.lo = price.lo + extra;
      r.hi = price.hi + extra + maybeExtra;
      r.kind = r.hi > r.lo ? "range" : "exact";
      if (plan.free && r.hi === 0) r.notes.unshift(plan.free);
      if (plan.note) r.notes.unshift(plan.note);
    } else {
      r.kind = price.kind;
      if (plan.aboveNote) r.notes.unshift(plan.aboveNote);
    }
    return r;
  }

  // isPriced says whether a result has a dollar figure, exact or a range.
  function isPriced(r) {
    return r.kind === "exact" || r.kind === "range";
  }

  // byPrice orders priced results cheapest first, by the bottom of any range.
  function byPrice(a, b) {
    return a.lo - b.lo || a.hi - b.hi;
  }

  // bestFor picks the vendor's cheapest plan that fits. When none does, it
  // reports why, using the vendor's biggest plan, and says where a bigger setup
  // goes when the vendor publishes that.
  function bestFor(vendor, input) {
    var all = vendor.plans.map(function (plan) {
      return evaluate(vendor, plan, input);
    });

    var priced = all.filter(function (r) {
      return r.fits && isPriced(r);
    });
    if (priced.length) return priced.sort(byPrice)[0];

    var asked = all.filter(function (r) {
      return r.fits;
    });
    if (asked.length) return asked[0];

    var biggest = all[all.length - 1];
    var failed = Object.keys(biggest.fail);
    var beyond = vendor.beyond;
    var covered =
      beyond &&
      failed.every(function (k) {
        return beyond.covers.indexOf(k) !== -1;
      });
    var why = failed.map(function (k) {
      return biggest.fail[k];
    });

    return {
      vendor: vendor,
      plan: biggest.plan,
      name: vendor.name,
      fits: false,
      kind: covered ? beyond.kind : "none",
      why: why,
      notes: covered ? [beyond.note] : [],
    };
  }

  // label is the price column: a figure, a range, or what to do instead.
  function label(r) {
    switch (r.kind) {
      case "exact":
        return money(r.lo);
      case "range":
        return money(r.lo) + " to " + money(r.hi);
      case "talk":
        return "Talk to us";
      case "sales":
        return "Contact sales";
      case "unpriced":
        return "Not priced here";
      case "unpublished":
        return "Not published";
      default:
        return "Doesn't fit";
    }
  }

  // listNames joins names into readable English: "A", "A and B", "A, B and C".
  function listNames(names) {
    if (names.length < 2) return names.join("");
    return names.slice(0, -1).join(", ") + " and " + names[names.length - 1];
  }

  // verdict writes the plain-English answer above the table. It says so when
  // somebody else is cheaper, and it doesn't claim we're cheapest above the
  // traffic we publish a price for.
  function verdict(rows) {
    var us = rows.filter(function (r) {
      return r.vendor.us;
    })[0];
    var others = rows.filter(function (r) {
      return !r.vendor.us && isPriced(r);
    });
    var free = others.filter(function (r) {
      return r.hi === 0;
    });
    var paid = others.filter(function (r) {
      return r.hi > 0;
    });
    var lines = [];

    if (isPriced(us)) {
      var cheaper = paid.filter(function (r) {
        return r.hi < us.lo;
      });
      var maybe = paid.filter(function (r) {
        return r.lo < us.lo && r.hi >= us.lo;
      });
      var dearer = paid.filter(function (r) {
        return r.lo >= us.lo;
      });

      if (cheaper.length) {
        lines.push(
          listNames(cheaper.map(function (r) { return r.name + " (" + label(r) + ")"; })) +
            " " + plural(cheaper.length, "costs", "cost") + " less than Feasible's " + money(us.lo) +
            " for this setup. If price decides it, take " + plural(cheaper.length, "it", "one of those") + "."
        );
      } else if (maybe.length) {
        lines.push(
          listNames(maybe.map(function (r) { return r.name + " (" + label(r) + ")"; })) +
            " might cost less than Feasible's " + money(us.lo) +
            ". We haven't checked the exact step your traffic lands on, so check their page before you decide."
        );
      } else if (dearer.length) {
        lines.push(
          "Feasible is the cheapest paid plan that fits, at " + money(us.lo) + " a year. Next is " +
            dearer[0].name + " at " + label(dearer[0]) + "."
        );
      } else {
        lines.push("Feasible is " + money(us.lo) + " a year, and no other paid plan here fits this setup.");
      }
    } else {
      // A range's low end isn't a price anyone sells, so the cheapest claim
      // goes to an exact figure and any range that could undercut it is named.
      var exact = paid.filter(function (r) {
        return r.kind === "exact";
      });
      var best = exact[0];
      var under = paid.filter(function (r) {
        return r.kind === "range" && (!best || r.lo < best.lo);
      });
      var line = "We don't publish a price past a million pageviews a month, so we can't say we're cheapest here.";
      if (best) line += " Of the plans that publish a price and fit, " + best.name + " is cheapest at " + label(best) + ".";
      if (under.length) {
        line +=
          " " + listNames(under.map(function (r) { return r.name + " (" + label(r) + ")"; })) +
          " could cost " + (best ? "less" : "the least") + ". We haven't checked the step your traffic lands on there.";
      }
      if (!paid.length) line += " No other paid plan here publishes a price that fits.";
      lines.push(line);
    }

    if (free.length) {
      lines.push(
        listNames(free.map(function (r) { return r.name; })) + " " + plural(free.length, "is", "are") +
          " free for this setup. Read the notes in the table for what free costs."
      );
    }
    return lines;
  }

  // calculate runs a setup against every vendor and returns the rows, priced
  // ones first and cheapest first, with the verdict that goes above them.
  function calculate(data, input) {
    var rows = data.vendors.map(function (vendor) {
      return bestFor(vendor, input);
    });

    var order = { exact: 0, range: 0, talk: 1, sales: 1, unpublished: 2, unpriced: 2, none: 3 };
    rows.sort(function (a, b) {
      var oa = order[a.kind];
      var ob = order[b.kind];
      if (oa !== ob) return oa - ob;
      if (oa === 0) return byPrice(a, b);
      return 0;
    });

    return { rows: rows, verdict: verdict(rows) };
  }

  // readNumber pulls a whole number out of what someone typed, accepting
  // "300,000", "300k" and "2M" as well as plain digits.
  function readNumber(text) {
    var s = String(text === undefined || text === null ? "" : text).trim().toLowerCase().replace(/[\s,_]/g, "");
    var m = s.match(/^(\d+(?:\.\d+)?)([km]?)$/);
    if (!m) return NaN;
    var n = parseFloat(m[1]);
    if (m[2] === "k") n *= 1000;
    if (m[2] === "m") n *= 1000000;
    return Math.round(n);
  }

  // clamp keeps a number inside a range, using the fallback for junk.
  function clamp(n, lo, hi, fallback) {
    if (!isFinite(n)) return fallback;
    return Math.min(Math.max(n, lo), hi);
  }

  // normalise turns raw form or URL values into a setup the calculator can use.
  function normalise(raw, maxPv) {
    return {
      sites: clamp(readNumber(raw.sites), 1, MAX_SITES, DEFAULTS.sites),
      pv: clamp(readNumber(raw.pv), 1, maxPv, DEFAULTS.pv),
      team: clamp(readNumber(raw.team), 0, MAX_TEAM, DEFAULTS.team),
      funnels: raw.funnels === true || raw.funnels === "1",
      revenue: raw.revenue === true || raw.revenue === "1",
    };
  }

  // parseQuery reads a setup from a URL's query string, so a link can carry one.
  function parseQuery(search, maxPv) {
    var raw = {};
    String(search || "")
      .replace(/^\?/, "")
      .split("&")
      .forEach(function (pair) {
        if (!pair) return;
        var i = pair.indexOf("=");
        var key = decodeURIComponent(i === -1 ? pair : pair.slice(0, i));
        var value = i === -1 ? "" : decodeURIComponent(pair.slice(i + 1).replace(/\+/g, " "));
        raw[key] = value;
      });
    return normalise(raw, maxPv);
  }

  // toQuery writes a setup back into the short query string a link carries.
  function toQuery(input) {
    var q = "sites=" + input.sites + "&pv=" + input.pv + "&team=" + input.team;
    if (input.funnels) q += "&funnels=1";
    if (input.revenue) q += "&revenue=1";
    return q;
  }

  // mount wires the calculator into the page: reads the URL, fills the form,
  // and redraws the answer and the address bar on every change.
  function mount(doc, win) {
    var box = doc.getElementById("calc");
    var dataEl = doc.getElementById("calc-data");
    if (!box || !dataEl) return;

    var data = JSON.parse(dataEl.textContent);
    var form = doc.getElementById("calc-form");
    var fields = {
      sites: doc.getElementById("calc-sites"),
      pv: doc.getElementById("calc-pv"),
      team: doc.getElementById("calc-team"),
      funnels: doc.getElementById("calc-funnels"),
      revenue: doc.getElementById("calc-revenue"),
    };
    var verdictEl = doc.getElementById("calc-verdict");
    var list = doc.getElementById("calc-results");
    var rowTpl = doc.getElementById("calc-row");
    var summary = doc.getElementById("calc-summary");
    var copy = doc.getElementById("calc-copy");

    // fill puts a setup into the form, written the way a person would type it.
    function fill(input) {
      fields.sites.value = String(input.sites);
      fields.pv.value = count(input.pv);
      fields.team.value = String(input.team);
      fields.funnels.checked = input.funnels;
      fields.revenue.checked = input.revenue;
    }

    // read takes the setup from the form as it stands.
    function read() {
      return normalise(
        {
          sites: fields.sites.value,
          pv: fields.pv.value,
          team: fields.team.value,
          funnels: fields.funnels.checked,
          revenue: fields.revenue.checked,
        },
        data.maxPageviews
      );
    }

    // render draws one setup's answer and puts it in the address bar.
    function render(input) {
      var result = calculate(data, input);

      verdictEl.textContent = "";
      result.verdict.forEach(function (line) {
        var p = doc.createElement("p");
        p.textContent = line;
        verdictEl.appendChild(p);
      });

      summary.textContent =
        input.sites + " " + plural(input.sites, "site", "sites") + ", " + count(input.pv) +
        " pageviews a month, " + input.team + " " + plural(input.team, "teammate", "teammates") +
        (input.funnels ? ", funnels" : "") + (input.revenue ? ", revenue" : "");

      list.textContent = "";
      result.rows.forEach(function (r) {
        var node = rowTpl.content.firstElementChild.cloneNode(true);
        if (r.vendor.us) node.setAttribute("data-us", "");
        if (!isPriced(r)) node.setAttribute("data-unpriced", "");
        node.querySelector("[data-f=name]").textContent = r.name;
        node.querySelector("[data-f=price]").textContent = label(r);
        node.querySelector("[data-f=unit]").textContent = "Counts " + r.vendor.unit.charAt(0).toLowerCase() + r.vendor.unit.slice(1) + ".";
        var why = node.querySelector("[data-f=why]");
        if (r.why && r.why.length) why.textContent = r.why.join(". ") + ".";
        else why.remove();
        var notes = node.querySelector("[data-f=notes]");
        if (r.notes.length) notes.textContent = r.notes.join(" ");
        else notes.remove();
        list.appendChild(node);
      });

      if (win.history && win.history.replaceState) {
        win.history.replaceState(null, "", win.location.pathname + "?" + toQuery(input));
      }
    }

    var start = parseQuery(win.location.search, data.maxPageviews);
    fill(start);
    render(start);
    box.hidden = false;

    form.addEventListener("input", function () {
      render(read());
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = read();
      fill(input);
      render(input);
    });
    // Tidy a field once someone leaves it: "300k" becomes "300,000".
    form.addEventListener("change", function () {
      fill(read());
    });

    Array.prototype.forEach.call(doc.querySelectorAll("[data-calc-preset]"), function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        var input = parseQuery(a.getAttribute("href").split("?")[1], data.maxPageviews);
        fill(input);
        render(input);
      });
    });

    if (copy && win.navigator && win.navigator.clipboard) {
      copy.addEventListener("click", function () {
        win.navigator.clipboard.writeText(win.location.href).then(function () {
          var was = copy.textContent;
          copy.textContent = "Link copied";
          win.setTimeout(function () {
            copy.textContent = was;
          }, 2000);
        });
      });
    } else if (copy) {
      copy.remove();
    }
  }

  root.FeasibleCalculator = {
    calculate: calculate,
    priceAt: priceAt,
    label: label,
    parseQuery: parseQuery,
    toQuery: toQuery,
    readNumber: readNumber,
    DEFAULTS: DEFAULTS,
  };

  if (typeof document !== "undefined" && typeof window !== "undefined") {
    mount(document, window);
  }
})(this);
