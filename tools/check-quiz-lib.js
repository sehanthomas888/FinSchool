// Tests for the quiz helper library (courses/marginal/quiz-lib.js): every finance helper is compared with a slow,
// obviously-correct way of getting the same number, and with textbook values. Run: node tools/check-quiz-lib.js
const fs = require('fs'), path = require('path'), vm = require('vm');
const win = { QL_CHECK: true };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', 'courses', 'marginal', 'quiz-lib.js'), 'utf8'), { window: win, Math, Number, Set, Error, String });
const QL = win.QL;
let failed = 0, n = 0;
const ok = (name, cond, extra) => { n++; if (!cond) { failed++; console.log('FAIL  ' + name + (extra ? '  -> ' + extra : '')); } };
const near = (a, b, tol) => Math.abs(a - b) <= (tol == null ? 1e-9 * Math.max(1, Math.abs(b)) : tol);

// future / present value against repeated multiplication and division
for (const [pv, r, n2] of [[1000, 0.07, 3], [250, 0.045, 10], [5000, 0.12, 7]]) {
  let m = pv; for (let i = 0; i < n2; i++) m *= 1 + r;
  ok(`fv(${pv}, ${r}, ${n2})`, near(QL.fv(pv, r, n2), m));
  let d = m; for (let i = 0; i < n2; i++) d /= 1 + r;
  ok(`pv undoes fv (${pv}, ${r}, ${n2})`, near(QL.pv(m, r, n2), pv) && near(d, pv));
}
// annuities against summing every payment
for (const [c, r, n2] of [[100, 0.05, 10], [1200, 0.08, 30], [50, 0.03, 4]]) {
  let pv = 0, fv = 0; for (let t = 1; t <= n2; t++) { pv += c / Math.pow(1 + r, t); fv += c * Math.pow(1 + r, n2 - t); }
  ok(`annuityPV(${c}, ${r}, ${n2}) equals the sum of discounted payments`, near(QL.annuityPV(c, r, n2), pv, 1e-7));
  ok(`annuityFV(${c}, ${r}, ${n2}) equals the sum of grown payments`, near(QL.annuityFV(c, r, n2), fv, 1e-7));
}
// bond price against discounting every cash flow, plus known anchor values
for (const [face, cpn, y, n2, f] of [[1000, 0.05, 0.05, 3, 1], [1000, 0.06, 0.04, 10, 2], [1000, 0.03, 0.07, 5, 2], [100, 0.08, 0.06, 20, 1]]) {
  let p = 0; const per = n2 * f; for (let t = 1; t <= per; t++) p += (face * cpn / f) / Math.pow(1 + y / f, t); p += face / Math.pow(1 + y / f, per);
  ok(`bondPrice(${face}, ${cpn}, ${y}, ${n2}, ${f})`, near(QL.bondPrice(face, cpn, y, n2, f), p, 1e-7));
}
ok('a bond priced at its own coupon rate is worth its face value', near(QL.bondPrice(1000, 0.05, 0.05, 3, 1), 1000, 1e-9));
ok('known value: 3-year 5% annual bond at 6% yield is 973.27', near(QL.bondPrice(1000, 0.05, 0.06, 3, 1), 973.2699, 1e-3));
// means, geometric mean, standard deviation
ok('mean', near(QL.mean([4, 12, -2, 10]), 6));
ok('population sd of 4, 12, -2, 10 is sqrt(30)', near(QL.sd([4, 12, -2, 10]), Math.sqrt(30)));
ok('sample sd of 4, 12, -2, 10 is sqrt(40)', near(QL.sd([4, 12, -2, 10], true), Math.sqrt(40)));
ok('geometric mean of +50% and -50% is sqrt(0.75) - 1', near(QL.geoMean([0.5, -0.5]), Math.sqrt(0.75) - 1));
ok('geometric mean of constant returns is that return', near(QL.geoMean([0.1, 0.1, 0.1]), 0.1, 1e-12));
// normal distribution against textbook values
for (const [z, want] of [[0, 0.5], [1, 0.8413], [-1, 0.1587], [1.96, 0.975], [2, 0.9772], [-0.47, 0.3192]]) ok(`N(${z}) is about ${want}`, near(QL.N(z), want, 5e-4), String(QL.N(z)));
ok('N(-z) = 1 - N(z)', near(QL.N(-0.83), 1 - QL.N(0.83), 1e-9));
// formatting
ok('usd formats thousands and negatives', QL.usd(1225.04) === '$1,225.04' && QL.usd(-50, 0) === '−$50' && QL.usd(10000, 0) === '$10,000');
ok('pct formats with the sign', QL.pct(12.5, 1) === '12.5%' && QL.pct(-2.5, 2) === '−2.50%');
ok('round handles halves the way people expect', QL.round(1.005, 2) === 1.01 && QL.round(-1.005, 2) === -1.01);
// numeric(): options are distinct, the answer index is right, and a failed cross-check throws
const q = QL.numeric({ q: 'x', ans: 12.5, wrong: [12.5, 10, 10, 2.5, 5], fmt: x => QL.pct(x, 1), why: 'w' });
ok('numeric(): no duplicate options, right answer present', new Set(q.o).size === q.o.length && q.o[q.a] === '12.5%' && q.o.length === 4);
const q2 = QL.numeric({ q: 'x', ans: 5, wrong: [5.001, 5.002, 5.003], fmt: x => QL.num(x, 0), why: 'w' });
ok('numeric(): distractors that print the same as the answer are replaced', new Set(q2.o).size === q2.o.length && q2.o.length === 4);
const q3 = QL.numeric({ q: 'x', ans: 0, wrong: [], fmt: x => QL.num(x, 1), why: 'w' });
ok('numeric(): an answer of zero still gets three distinct wrong options', new Set(q3.o).size === 4);
const q4 = QL.numeric({ q: 'x', ans: 30, wrong: [10, 20, 40], fixed: true, fmt: String, why: 'w' });
ok('numeric(): fixed keeps ascending order and the right index', q4.o.join() === '10,20,30,40' && q4.a === 2);
let threw = false; try { QL.numeric({ q: 'bad', ans: 5, alt: () => 6, wrong: [1, 2, 3], why: 'w' }); } catch (e) { threw = true; }
ok('numeric(): a disagreeing alt() cross-check throws', threw);
threw = false; try { QL.numeric({ q: 'bad', ans: NaN, wrong: [1, 2, 3], why: 'w' }); } catch (e) { threw = true; }
ok('numeric(): a non-finite answer throws', threw);

console.log(failed ? `\n${failed} of ${n} quiz-library checks FAILED` : `All ${n} quiz-library checks passed.`);
process.exit(failed ? 1 : 0);
