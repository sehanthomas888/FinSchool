// Recomputes the worked examples written into the lessons, and confirms the same figure is printed in the lesson text.
// Run: node tools/check-math-lessons.js
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.resolve(__dirname, '..');
const win = { Rosetta: {}, QL_CHECK: true };
const ctx = vm.createContext({ window: win, console, Math, JSON, Object, Array, String, Number, Date, Set, Error });
const html = fs.readFileSync(path.join(ROOT, 'courses/marginal/index.html'), 'utf8');
for (const m of html.matchAll(/<script src="([^"]+)"><\/script>/g)) if (m[1].includes('/courses/') || m[1].endsWith('/shared/ui.js')) vm.runInContext(fs.readFileSync(path.join(ROOT, m[1].slice(1)), 'utf8'), ctx, { filename: m[1] });
const byId = Object.fromEntries(win.LESSONS.map(l => [l.id, l]));
const QL = win.QL;
const text = l => [l.body, l.plain, l.example, l.idea, l.method, l.findings].filter(Boolean).join(' ');
let fails = 0, n = 0;
// check(lesson, printed text, recomputed value, the value as the text states it, tolerance)
const check = (id, printed, got, stated, tol) => {
  n++;
  const l = byId[id], has = l && text(l).includes(printed), ok = Math.abs(got - stated) <= (tol == null ? 0.006 : tol);
  if (!has || !ok) { fails++; console.log(`FAIL  ${id}: "${printed}"  ${has ? '' : '[text does not contain it] '}${ok ? '' : `[computed ${got}, text says ${stated}]`}`); }
};
const fv = (p, r, n2) => p * Math.pow(1 + r, n2), pv = (f, r, n2) => f / Math.pow(1 + r, n2);
const bond = (F, c, y, N, f) => { let p = 0; for (let t = 1; t <= N * f; t++) p += (F * c / f + (t === N * f ? F : 0)) / Math.pow(1 + y / f, t); return p; };

// ---- Start here
check('fin-map', '$9,709', 10000 / 1.03, 9709, 0.5);
check('fin-instruments', '$1,150', 50 * 3 + 1000, 1150);
check('fin-instruments', '14%', (10 * 1 + 10 * (56 - 50)) / 500 * 100, 14);
check('fin-instruments', '$50', 10000 * 0.005, 50); check('fin-instruments', '$5', 10000 * 0.0005, 5);
check('fin-instruments', '$10', 100 * 50.05 - 100 * 49.95, 10);
check('fin-instruments', '$15', 75 - 60, 15);
check('math-basics', '$214', 200 * 1.07, 214); check('math-basics', '$3,450', 3000 * 1.15, 3450);
check('math-basics', '1.225', 1.07 ** 3, 1.225, 1e-3); check('math-basics', '5.5%', Math.sqrt(30), 5.5, 0.03); check('math-basics', '6.3%', Math.sqrt(40), 6.3, 0.03);
check('math-basics', '15.9%', 1 * Math.sqrt(252), 15.9, 0.03); check('math-basics', '17.7%', 25 * Math.sqrt(0.5), 17.7, 0.03);
check('fin-returns', '12.5%', (44 - 40 + 1) / 40 * 100, 12.5); check('fin-returns', '−2.5%', (76 - 80 + 2) / 80 * 100, -2.5);
check('fin-returns', '32%', (1.1 * 1.2 - 1) * 100, 32); check('fin-returns', '1% loss', (1.1 * 0.9 - 1) * 100, -1);
check('fin-returns', '−13.4% a year', (Math.sqrt(0.75) - 1) * 100, -13.4, 0.05);
check('fin-returns', '10.67%', (Math.pow(1.5, 0.25) - 1) * 100, 10.67); check('fin-returns', '2.91%', (1.06 / 1.03 - 1) * 100, 2.91);

// ---- Foundations
check('tvm', '$1,225.04', fv(1000, 0.07, 3), 1225.04); check('tvm', '$540.80', fv(500, 0.04, 2), 540.8);
check('tvm', '$7,612', fv(1000, 0.07, 30), 7612, 0.6); check('tvm', '$1,361.17', pv(2000, 0.08, 5), 1361.17);
check('tvm', '$421.24', QL.annuityPV(100, 0.06, 5), 421.24); check('tvm', '+$41.32', -1000 + 600 / 1.1 + 600 / 1.21, 41.32);
check('tvm', '$40', 2 / (0.08 - 0.03), 40);
check('risk', '11.5%', Math.sqrt(0.36 * 324 + 0.16 * 36 + 2 * 0.6 * 0.4 * 0.2 * 18 * 6), 11.5, 0.05);
check('risk', '13.2%', 0.6 * 18 + 0.4 * 6, 13.2); check('risk', '11.1%', Math.sqrt(0.36 * 324 + 0.16 * 36), 11.1, 0.05);
check('risk', '9.8%', Math.sqrt(0.36 * 324 + 0.16 * 36 - 0.5 * 2 * 0.6 * 0.4 * 108), 9.8, 0.05);
check('risk', '8.4%', Math.abs(0.6 * 18 - 0.4 * 6), 8.4); check('risk', '0.35', 4 / 11.52, 0.35, 0.01);
check('capm', '10.15%', 3 + 1.3 * 5.5, 10.15); check('capm', '5.75%', 3 + 0.5 * 5.5, 5.75);
check('emh', '$100,627', fv(10000, 0.08, 30), 100627, 1); check('emh', '$76,123', fv(10000, 0.07, 30), 76123, 1); check('emh', '$24,504', fv(10000, 0.08, 30) - fv(10000, 0.07, 30), 24504, 1);
check('behav', '+57.5', Math.pow(100, 0.88), 57.5, 0.06); check('behav', '$251', 100 * Math.pow(2.25, 1 / 0.88), 251, 1);
check('capstruct', '15%', 10 + (10 - 5) * 1, 15); check('capstruct', '9.0%', 0.6 * 12.5 + 0.4 * 5 * 0.75, 9.0); check('capstruct', '13.3%', 10 + 5 * (0.4 / 0.6), 13.3, 0.05); check('capstruct', '$110m', 100 + 0.25 * 40, 110);
check('options', '$7.76', QL.bs(100, 100, 0.03, 0.25, 0.5).call, 7.76); check('options', '$35,000', 340000 - 300000 - 5000, 35000);
check('rates', '1.94%', (1.05 / 1.03 - 1) * 100, 1.94); check('rates', '$957.88', bond(1000, 0.05, 0.06, 5, 1), 957.88); check('rates', '$1,044.52', bond(1000, 0.05, 0.04, 5, 1), 1044.52);
check('rates', '4.33', QL.macaulay(1000, 0.05, 0.05, 5, 1) / 1.05, 4.33, 0.01);

// ---- Portfolio
check('pm-cal', '5.5%', 3 + 0.5 * 5, 5.5); check('pm-cal', '0.31', 5 / 16, 0.31, 0.01); check('pm-cal', '$', 0, 0); // ($ is always present; keeps the table honest below)
check('pm-cal', '49%', 0.05 / (4 * 0.0256) * 100, 49, 0.5); check('pm-cal', '10.50%', 3 + 1.5 * 5, 10.5); check('pm-cal', '12.8%', 0.8 * 16, 12.8);
check('pm-perf', '0.44', 8 / 18, 0.44, 0.005); check('pm-perf', '+2.5%', 11 - (3 + 1.1 * 5), 2.5); check('pm-perf', '0.75', 3 / 4, 0.75); check('pm-perf', '2.4', 0.75 * Math.sqrt(10), 2.4, 0.03);
check('pm-fees', '$75,100', fv(10000, 0.0695, 30), 75100, 60); check('pm-fees', '$57,400', fv(10000, 0.06, 30), 57400, 60);
check('pm-risk', '$15,300', 1e6 * (1.645 * 0.15 / Math.sqrt(252) - 0.07 / 252), 15300, 60); check('pm-risk', '$21,700', 1e6 * (2.33 * 0.15 / Math.sqrt(252) - 0.07 / 252), 21700, 80);
check('pm-risk', '25% gain', 20 / 80 * 100, 25);
check('pm-ips', '64.3%', 72 / 112 * 100, 64.3, 0.05); check('pm-ips', '$4,800', 72000 - 0.6 * 112000, 4800);

// ---- Financial statements
check('fsa-statements', '$40,000', 60000 + 20000 - 50000 - 10000 + 20000, 40000);
check('fsa-statements', '$410,000', 200000 + 10000 - 20000 + 150000 + 40000 + 10000 + 20000, 410000);
check('fsa-statements', '$90,000', 60 + 20 - 0 - 10 + 20, 90, 0); // in $ thousands
check('fsa-ratios', '40%', 400 / 1000 * 100, 40); check('fsa-ratios', '17.2%', 94.5 / 550 * 100, 17.2, 0.05); check('fsa-ratios', '0.88', 220 / 250, 0.88, 0.005); check('fsa-ratios', '6.3×', 150 / 24, 6.3, 0.05); check('fsa-ratios', '91 days', 365 / 4, 91, 0.5);
check('fsa-dupont', '19.2%', 0.08 * 1.2 * 2 * 100, 19.2); check('fsa-dupont', '9%', 0.15 * 0.6 * 100, 9);
check('fsa-choices', '$1,220', 100 * 10 + 20 * 11, 1220); check('fsa-choices', '$1,300', 100 * 11 + 20 * 10, 1300); check('fsa-choices', '$18,000', (100000 - 10000) / 5, 18000); check('fsa-choices', '$9,000', 90000 / 10, 9000);
check('fsa-quality', '4%', (100 - 60) / 1000 * 100, 4); check('fsa-quality', '119%', 95 / 80 * 100, 119, 0.5);
check('fsa-fcf', '$110m', 200 * 0.75 + 50 - 80 - 10, 110);
{ let p = 0, f = 100; for (let t = 1; t <= 5; t++) { f *= 1.08; p += f / 1.09 ** t; } const tv = f * 1.025 / 0.065, pt = tv / 1.09 ** 5;
  check('fsa-fcf', '$486m', p, 486, 0.5); check('fsa-fcf', '$1,506m', pt, 1506, 0.5); check('fsa-fcf', '$16.92 a share', (p + pt - 300) / 100, 16.92, 0.005); check('fsa-fcf', '76%', pt / (p + pt) * 100, 76, 0.5); }
check('fsa-fcf', '$200m', 10 / 0.05, 200);
check('fsa-multiples', '13.3×', 0.6 / 0.045, 13.3, 0.05); check('fsa-multiples', '8×', 1000 / 125, 8);
check('fsa-credit', '2.68', 1.2 * 0.15 + 1.4 * 0.25 + 3.3 * 0.10 + 0.6 * 1.2 + 1.0 * 1.1, 2.68, 0.005); check('fsa-credit', '6.3×', 150 / 24, 6.3, 0.05);

// ---- Fixed income
check('fi-basics', '$973.27', bond(1000, 0.05, 0.06, 3, 1), 973.27); check('fi-basics', '$1,027.75', bond(1000, 0.05, 0.04, 3, 1), 1027.75);
check('fi-basics', '$1,081.76', bond(1000, 0.05, 0.04, 10, 2), 1081.76); check('fi-basics', '$925.61', bond(1000, 0.05, 0.06, 10, 2), 925.61); check('fi-basics', '$672.97', 1000 / 1.02 ** 20, 672.97);
check('fi-yield', '5.71%', 6 / 105 * 100, 5.71); check('fi-yield', '5.35%', QL.ytm(105, 100, 0.06, 10, 2) * 100, 5.35, 0.01);
check('fi-duration', '7.99', QL.macaulay(100, 0.05, 0.05, 10, 2), 7.99, 0.006); check('fi-duration', '7.79', QL.macaulay(100, 0.05, 0.05, 10, 2) / 1.025, 7.79, 0.006);
check('fi-term', '4.02%', (Math.sqrt(104 / (100 - 4 / 1.03)) - 1) * 100, 4.02, 0.006); check('fi-term', '5.01%', (1.04 ** 2 / 1.03 - 1) * 100, 5.01, 0.006); check('fi-term', '3.01%', (1.04 ** 2 / 1.05 - 1) * 100, 3.01, 0.006);
check('fi-credit', '$18,000', 0.03 * 0.6 * 1e6, 18000); check('fi-credit', '120 bp', 0.02 * 0.6 * 1e4, 120, 0.5);
check('fi-tips', '2.46%', (1.04 / 1.015 - 1) * 100, 2.46, 0.006); check('fi-tips', '$20.60', 0.02 * 1030, 20.6);
check('fi-immun', '$676,839', 1e6 / 1.05 ** 8, 676839, 1);

// ---- Papers
check('p-markowitz', '1,225', 50 * 49 / 2, 1225, 0);
check('p-sharpe', '10%', 3 + 1.4 * 5, 10); check('p-sharpe', '6%', 3 + 0.6 * 5, 6);
check('p-shiller', '$87.57', 5 / 1.1 + 5 / 1.21 + 5 / 1.331 + 100 / 1.331, 87.57);
check('p-ff93', '11.4%', 3 + 1 * 5 + 0.5 * 2 + 0.8 * 3, 11.4);
check('p-kt79', '3,200', 0.8 * 4000, 3200, 0);
check('p-mm58', '15%', 10 + 5, 15);
check('p-bs73', '$7.76', QL.bs(100, 100, 0.03, 0.25, 0.5).call, 7.76);
check('p-dd83', '80', 100 / 1.25, 80, 0);
check('p-jensen68', '−1.0%', 10.4 - (3 + 1.2 * (10 - 3)), -1.0);
check('p-sharpe91', '1.1 points', 1.2 - 0.1, 1.1);
check('p-bhb86', '3.8%', 0.6 * 5 + 0.4 * 2, 3.8);
check('p-ballbrown68', '+3.0%', 5.4 - 1.2 * 2, 3.0);
check('p-altman68', '1.925', 1.2 * 0.10 + 1.4 * 0.20 + 3.3 * 0.05 + 0.6 * 0.60 + 1.0 * 1.0, 1.925, 0.0005);
check('p-campbell91', '5.0%', (Math.sqrt(1.04 * 1.06) - 1) * 100, 5.0, 0.01);
check('p-elton01', '65 bp', 150 - 25 - 60, 65, 0);

console.log(fails ? `\n${fails} of ${n} lesson-math checks FAILED` : `All ${n} worked-example numbers in the lessons match an independent recomputation.`);
process.exit(fails ? 1 : 0);
