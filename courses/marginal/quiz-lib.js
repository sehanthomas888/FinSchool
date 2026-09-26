/* Helpers for writing quiz questions whose numbers change every attempt.

   A generated question is { k: 'calc', gen: () => QL.numeric({...}) }. Every time a learner retakes a quiz the generator
   runs again with new numbers. QL.numeric builds the four options (the right answer plus wrong answers that each match a
   real, common mistake), and, when the audit runs (window.QL_CHECK), it also runs the optional `alt()` function, a second
   and independent way of getting the same answer, and refuses to continue if the two disagree. So a generated question
   can never quietly teach a wrong number. */
(function () {
  'use strict';
  const QL = window.QL = {};

  QL.int = (a, b, step) => { step = step || 1; return a + step * Math.floor(Math.random() * ((b - a) / step + 1)); };
  QL.pick = arr => arr[Math.floor(Math.random() * arr.length)];
  QL.round = (x, dp) => { const m = Math.pow(10, dp == null ? 2 : dp); return Math.round(x * m + (x >= 0 ? 1e-9 : -1e-9)) / m; };
  QL.num = (x, dp) => QL.round(x, dp == null ? 2 : dp).toLocaleString('en-US', { minimumFractionDigits: dp == null ? 2 : dp, maximumFractionDigits: dp == null ? 2 : dp }).replace('-', '−');
  QL.usd = (x, dp) => (x < 0 ? '−' : '') + '$' + Math.abs(QL.round(x, dp == null ? 2 : dp)).toLocaleString('en-US', { minimumFractionDigits: dp == null ? 2 : dp, maximumFractionDigits: dp == null ? 2 : dp });
  QL.pct = (x, dp) => QL.num(x, dp == null ? 1 : dp) + '%';          // x is already in percent units: pct(7.25, 2) → "7.25%"

  // Finance helpers used by several lessons (each is cross-checked against brute force in tools/check-quiz-lib.js)
  QL.fv = (pv, r, n) => pv * Math.pow(1 + r, n);
  QL.pv = (fv, r, n) => fv / Math.pow(1 + r, n);
  QL.annuityPV = (c, r, n) => c * (1 - Math.pow(1 + r, -n)) / r;
  QL.annuityFV = (c, r, n) => c * (Math.pow(1 + r, n) - 1) / r;
  QL.bondPrice = (face, cpnRate, y, n, freq) => { freq = freq || 1; const c = face * cpnRate / freq, i = y / freq, N = n * freq; return c * (1 - Math.pow(1 + i, -N)) / i + face / Math.pow(1 + i, N); };
  QL.geoMean = rs => Math.pow(rs.reduce((p, r) => p * (1 + r), 1), 1 / rs.length) - 1;
  QL.mean = xs => xs.reduce((a, b) => a + b, 0) / xs.length;
  QL.sd = (xs, sample) => { const m = QL.mean(xs); return Math.sqrt(xs.reduce((a, x) => a + (x - m) * (x - m), 0) / (xs.length - (sample ? 1 : 0))); };
  QL.erf = x => { const s = x < 0 ? -1 : 1; x = Math.abs(x); const t = 1 / (1 + 0.3275911 * x); const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x); return s * y; };
  QL.N = z => 0.5 * (1 + QL.erf(z / Math.SQRT2));

  // Build a numeric multiple-choice question.
  //   q      question text            ans    the right answer (a number)
  //   wrong  wrong answers (numbers), each a real mistake a beginner makes; up to 3 are used
  //   fmt    number → text            why    the explanation shown afterwards (show the working)
  //   alt    optional: a different way to compute `ans`, checked by the audit      tol   allowed difference
  //   fixed  true to keep the options in ascending order instead of shuffling
  QL.numeric = p => {
    const fmt = p.fmt || (x => String(x));
    if (window.QL_CHECK && p.alt) {
      const b = p.alt(), tol = p.tol != null ? p.tol : 1e-6 * Math.max(1, Math.abs(p.ans));
      if (!(Math.abs(b - p.ans) <= tol)) throw new Error('quiz cross-check failed: "' + p.q.slice(0, 70) + '" → ' + p.ans + ' vs ' + b);
    }
    if (!Number.isFinite(p.ans)) throw new Error('quiz answer is not a finite number: ' + p.q.slice(0, 70));
    const good = fmt(p.ans), seen = new Set([good]), opts = [];
    for (const w of p.wrong) { if (!Number.isFinite(w)) continue; const s = fmt(w); if (!seen.has(s)) { seen.add(s); opts.push({ s, v: w }); } }
    const base = Math.abs(p.ans) || 1;
    for (let k = 1; opts.length < 3 && k < 40; k++) for (const v of [p.ans + 0.1 * k * base, p.ans - 0.1 * k * base, p.ans + 0.25 * k * base]) {
      const s = fmt(v); if (opts.length < 3 && Number.isFinite(v) && !seen.has(s)) { seen.add(s); opts.push({ s, v }); }
    }
    const all = [{ s: good, v: p.ans }].concat(opts.slice(0, 3));
    if (p.fixed) all.sort((a, b) => a.v - b.v);
    return { q: p.q, o: all.map(x => x.s), a: all.findIndex(x => x.s === good), why: p.why, fixed: !!p.fixed };
  };

  // A generated entry for a quiz bank.
  QL.gen = (k, make) => ({ k: k || 'calc', gen: make });
})();
