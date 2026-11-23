//
// pricing-calculator.test.cjs
// Checks the /pricing/calculator/ numbers, with no dependencies: the calculator's
// data must agree with the price ladder in data/competitors.yaml, and three real
// setups must come out the way the page promises.
//
// Created: 2026-11-23
// Copyright (c) 2026 Cloudmanic Labs, LLC. All rights reserved.
//

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const script = fs.readFileSync(path.join(root, "assets/js/pricing-calculator.js"), "utf8");
const data = JSON.parse(fs.readFileSync(path.join(root, "data/calculator.json"), "utf8"));
const yaml = fs.readFileSync(path.join(root, "data/competitors.yaml"), "utf8");

// Run the shipped source with no document, so it exports and doesn't mount.
const sandbox = {};
vm.runInNewContext(script, sandbox);
const calc = sandbox.FeasibleCalculator;

const volumes = [10000, 100000, 1000000, 5000000, 10000000];

// The ladder in competitors.yaml, read line by line. Each plan there is a
// vendor line, a plan line and a one-line tiers list, which is all this needs.
function yamlLadder() {
  const plans = [];
  let current = null;
  for (const line of yaml.split("\n")) {
    let m = line.match(/^  - vendor: "(.*)"$/);
    if (m) {
      current = { vendor: m[1], plan: "" };
      plans.push(current);
      continue;
    }
    m = line.match(/^    plan: "(.*)"$/);
    if (m && current) current.plan = m[1];
    m = line.match(/^    tiers: \[(.*)\]$/);
    if (m && current) current.tiers = m[1].match(/"[^"]*"|null/g).map((t) => t.replace(/^"|"$/g, ""));
  }
  return plans.filter((p) => p.tiers);
}

// The calculator plan that a competitors.yaml row describes. A vendor with one
// plan matches whatever the row calls it (Simple Analytics' "Simple").
function calcPlan(row) {
  const vendor = data.vendors.find((v) => v.name === row.vendor);
  assert.ok(vendor, `calculator.json has no vendor called ${row.vendor}`);
  if (vendor.plans.length === 1) return vendor.plans[0];
  const plan = vendor.plans.find((p) => p.name === row.plan);
  assert.ok(plan, `calculator.json has no ${row.vendor} plan called ${row.plan}`);
  return plan;
}

// One setup run through the calculator, keyed by vendor id for easy reading.
function run(input) {
  const result = calc.calculate(data, Object.assign({ funnels: false, revenue: false }, input));
  const byId = {};
  for (const r of result.rows) byId[r.vendor.id] = { name: r.name, price: calc.label(r), kind: r.kind, notes: r.notes };
  return { byId, verdict: result.verdict.join(" "), rows: result.rows };
}

test("every price in the calculator matches the ladder in competitors.yaml", () => {
  const rows = yamlLadder();
  assert.ok(rows.length >= 12, "expected the whole ladder to parse");
  for (const row of rows) {
    const plan = calcPlan(row);
    row.tiers.forEach((tier, i) => {
      const price = calc.priceAt(plan, volumes[i]);
      const where = `${row.vendor} ${row.plan} at ${volumes[i]}`;
      if (/^\$[\d,]+$/.test(tier)) {
        assert.equal(price.kind, "exact", where);
        assert.equal(price.lo, Number(tier.replace(/[$,]/g, "")), where);
      } else if (tier === "Talk to us") {
        assert.equal(price.kind, "talk", where);
      } else {
        assert.equal(tier, "null", where);
        assert.ok(price.kind === "cap" || price.kind === "sales", `${where} should not be priced`);
      }
    });
  }
});

test("every vendor names its source and every step climbs", () => {
  for (const vendor of data.vendors) {
    assert.ok(vendor.source, `${vendor.name} needs a source`);
    for (const plan of vendor.plans) {
      for (let i = 1; i < plan.steps.length; i++) {
        assert.ok(plan.steps[i][0] > plan.steps[i - 1][0], `${vendor.name} steps out of order`);
        assert.ok(plan.steps[i][1] >= plan.steps[i - 1][1], `${vendor.name} price falls with traffic`);
      }
    }
  }
});

test("one site at 20,000 pageviews: free options exist, and we're the cheapest paid one", () => {
  const { byId, verdict } = run({ sites: 1, pv: 20000, team: 0 });
  assert.equal(byId.feasible.price, "$99");
  assert.equal(byId.ga4.price, "$0");
  assert.equal(byId.umami.name, "Umami Cloud Hobby");
  assert.equal(byId.umami.price, "$0");
  assert.equal(byId.pirsch.price, "$120");
  assert.equal(byId.fathom.price, "$150");
  assert.equal(byId.plausible.name, "Plausible Starter");
  assert.equal(byId.plausible.price, "$190");
  assert.equal(byId["simple-analytics"].price, "$200");
  assert.equal(byId.matomo.price, "$260");
  assert.match(verdict, /Feasible is the cheapest paid plan that fits, at \$99 a year\. Next is Pirsch Standard at \$120\./);
  assert.match(verdict, /Umami Cloud Hobby and Google Analytics 4 are free for this setup/);
});

test("twelve sites at 300,000: ranges where we haven't checked the step, never a guess", () => {
  const { byId, verdict } = run({ sites: 12, pv: 300000, team: 0 });
  assert.equal(byId.feasible.price, "$99");
  assert.equal(byId.umami.name, "Umami Cloud Pro");
  assert.equal(byId.umami.price, "$240");
  assert.equal(byId.fathom.price, "$450");
  assert.equal(byId.pirsch.price, "$120 to $540");
  assert.equal(byId.matomo.price, "$420 to $1,390");
  assert.equal(byId.plausible.price, "Contact sales");
  assert.equal(byId["simple-analytics"].price, "Contact sales");
  assert.match(verdict, /Feasible is the cheapest paid plan that fits/);
});

test("forty client sites at 2M with five teammates: we don't claim a price we don't publish", () => {
  const { byId, verdict } = run({ sites: 40, pv: 2000000, team: 5 });
  assert.equal(byId.feasible.price, "Talk to us");
  assert.equal(byId.pirsch.price, "$990");
  assert.equal(byId.fathom.price, "$600 to $1,400");
  assert.equal(byId.umami.name, "Umami Cloud Business");
  assert.equal(byId.umami.price, "$2,400");
  assert.equal(byId.matomo.price, "Contact sales");
  assert.equal(byId.plausible.price, "Contact sales");
  assert.equal(byId["simple-analytics"].price, "Contact sales");
  assert.match(verdict, /can't say we're cheapest here/);
  assert.match(verdict, /Pirsch Standard is cheapest at \$990/);
  assert.match(verdict, /Fathom \(\$600 to \$1,400\) could cost less/);
});

test("somebody cheaper is named plainly", () => {
  const { verdict } = run({ sites: 1, pv: 10000, team: 0 });
  assert.match(verdict, /Pirsch Standard \(\$60\) and Plausible Starter \(\$90\) cost less than Feasible's \$99/);
});

test("seats, site packs and features change the plan or the price", () => {
  // Simple Analytics bills $200 a year for each teammate.
  assert.equal(run({ sites: 2, pv: 900000, team: 4 }).byId["simple-analytics"].price, "$1,400");
  // Fathom adds a pack of 50 sites past the 50 it includes under a million.
  assert.equal(run({ sites: 60, pv: 400000, team: 0 }).byId.fathom.price, "$550");
  // Funnels move Plausible to Business and rule Pirsch Standard and Fathom out.
  const funnels = run({ sites: 2, pv: 100000, team: 1, funnels: true }).byId;
  assert.equal(funnels.plausible.name, "Plausible Business");
  assert.equal(funnels.plausible.price, "$390");
  assert.equal(funnels.pirsch.price, "Not priced here");
  assert.equal(funnels.fathom.price, "Doesn't fit");
  // Umami Pro past its million is $0.00003 an event, as published.
  assert.equal(run({ sites: 25, pv: 5000000, team: 0 }).byId.umami.price, "$2,400");
  assert.equal(run({ sites: 5, pv: 5000000, team: 0 }).byId.umami.price, "$1,680");
});

test("a link carries a setup, and nothing else", () => {
  const input = calc.parseQuery("?sites=12&pv=300000&team=3&funnels=1", 10000000);
  assert.deepEqual(JSON.parse(JSON.stringify(input)), { sites: 12, pv: 300000, team: 3, funnels: true, revenue: false });
  assert.equal(calc.toQuery(input), "sites=12&pv=300000&team=3&funnels=1");
  assert.equal(calc.parseQuery("?pv=2M", 10000000).pv, 2000000);
  assert.equal(calc.parseQuery("?pv=300k", 10000000).pv, 300000);
  assert.equal(calc.parseQuery("?pv=99999999999", 10000000).pv, 10000000);
  assert.equal(calc.parseQuery("?sites=banana", 10000000).sites, calc.DEFAULTS.sites);
  assert.doesNotMatch(calc.toQuery(input), /utm_/);
});
