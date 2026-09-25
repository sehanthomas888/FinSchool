/* Marginal's interactive widgets. Each is a function(el) that builds its own UI inside el.
   Generic helpers (charts, controls, formats) come from the shared UI kit. */
(function () {
  'use strict';

  const { money, moneyShort, pct, clamp, niceTicks, lineChart, statTiles, controlsHTML, bind, shell, mathBox, stepRows, erf, N, randn } = window.R357.ui;

  const W = {};

  /* ---------- 1. Time value of money ---------- */
  W.tvm = function (el) {
    const specs = [
      { k: 'init', label: 'Starting amount', min: 0, max: 100000, step: 1000, value: 10000, fmt: money },
      { k: 'monthly', label: 'Added each month', min: 0, max: 3000, step: 50, value: 300, fmt: money },
      { k: 'rate', label: 'Annual return', min: 0, max: 14, step: 0.25, value: 7, fmt: v => pct(v, 2) },
      { k: 'years', label: 'Years', min: 1, max: 50, step: 1, value: 30 },
      { k: 'target', label: 'Future payment (for PV)', min: 10000, max: 5000000, step: 10000, value: 1000000, fmt: money }
    ];
    const ui = shell(el, specs);
    bind(el, specs, v => {
      const sim = rate => {
        const r = rate / 100 / 12; let bal = v.init; const pts = [[0, bal]];
        for (let y = 1; y <= v.years; y++) { for (let m = 0; m < 12; m++) bal = bal * (1 + r) + v.monthly; pts.push([y, bal]); }
        return { pts, bal };
      };
      const main = sim(v.rate), low = sim(Math.max(0, v.rate - 2));
      const contrib = v.init + v.monthly * 12 * v.years;
      const contribPts = []; for (let y = 0; y <= v.years; y++) contribPts.push([y, v.init + v.monthly * 12 * y]);
      const ymax = Math.max(main.bal, 1) * 1.05;
      ui.chart.innerHTML = lineChart({
        title: 'Investment growth over time', x: [0, v.years], y: [0, ymax], xLabel: 'Years', yFmt: moneyShort,
        series: [
          { pts: contribPts, color: 'var(--c4)', w: 2 },
          { pts: low.pts, color: 'var(--c3)', dash: true, w: 2 },
          { pts: main.pts, color: 'var(--c1)', w: 3 }
        ],
        legend: [{ color: 'var(--c1)', label: `Balance at ${pct(v.rate, 2)}` }, { color: 'var(--c3)', label: `Balance at ${pct(Math.max(0, v.rate - 2), 2)}`, dash: true }, { color: 'var(--c4)', label: 'What you put in' }]
      });
      const pv = v.target / Math.pow(1 + v.rate / 100, v.years);
      ui.stats.innerHTML = statTiles([
        ['Final balance', money(main.bal)], ['You contributed', money(contrib)],
        ['Growth from compounding', money(main.bal - contrib)], [`PV of ${moneyShort(v.target)} in ${v.years}y`, money(pv)]
      ]);
      ui.note.innerHTML = `Notice the gap between the solid and dashed lines: <b>two percentage points</b> of return changes the ending balance by ${money(main.bal - low.bal)}. The last tile is discounting: at ${pct(v.rate, 2)}, a payment of ${money(v.target)} in ${v.years} years is worth ${money(pv)} today.`;
    });
  };

  /* ---------- 2. Portfolio diversification ---------- */
  W.portfolio = function (el) {
    const A = { mu: 8, sd: 18 }, B = { mu: 3, sd: 6 }, rf = 2;
    const specs = [
      { k: 'rho', label: 'Correlation (ρ)', min: -1, max: 1, step: 0.05, value: 0.2, fmt: v => v.toFixed(2) },
      { k: 'w', label: 'Weight in stocks', min: 0, max: 100, step: 1, value: 60, fmt: v => v + '%' }
    ];
    const ui = shell(el, specs);
    const mbox = mathBox(ui, 'Show the math: where does the portfolio risk come from?');
    const port = (w, rho) => ({
      mu: w * A.mu + (1 - w) * B.mu,
      sd: Math.sqrt(Math.max(0, w * w * A.sd * A.sd + (1 - w) * (1 - w) * B.sd * B.sd + 2 * w * (1 - w) * rho * A.sd * B.sd))
    });
    bind(el, specs, v => {
      const w = v.w / 100, pts = [], flat = [];
      let best = { sd: 1e9 };
      for (let i = 0; i <= 100; i++) {
        const p = port(i / 100, v.rho); pts.push([p.sd, p.mu]);
        if (p.sd < best.sd) best = { sd: p.sd, mu: p.mu, w: i / 100 };
        const q = port(i / 100, 1); flat.push([q.sd, q.mu]);
      }
      const p = port(w, v.rho), avg = w * A.sd + (1 - w) * B.sd;
      const t1 = w * w * A.sd * A.sd, t2 = (1 - w) * (1 - w) * B.sd * B.sd, t3 = 2 * w * (1 - w) * v.rho * A.sd * B.sd;
      mbox.innerHTML = stepRows([
        [`Stocks' own risk: w²σ² = ${w.toFixed(2)}² × ${A.sd}²`, t1.toFixed(2)],
        [`Bonds' own risk: (1−w)²σ² = ${(1 - w).toFixed(2)}² × ${B.sd}²`, t2.toFixed(2)],
        [`Teamwork term: 2·w·(1−w)·ρ·σ<sub>A</sub>·σ<sub>B</sub> (ρ = ${v.rho.toFixed(2)})`, t3.toFixed(2)],
        ['Variance = sum of the three', (t1 + t2 + t3).toFixed(2)],
        ['Volatility = √variance', pct(p.sd, 2), true],
        [`For comparison, the weighted average of the two volatilities`, pct(avg, 2)]
      ]) + '<p class="wnote">The teamwork term is the only one that depends on correlation. When ρ is negative it turns negative and <em>subtracts</em> from the total.</p>';
      ui.chart.innerHTML = lineChart({
        title: 'Portfolio risk and return', x: [0, 20], y: [2, 9], xFmt: v => v + '%', yFmt: v => v + '%', xLabel: 'Risk (standard deviation)', yLabel: 'Expected return',
        series: [{ pts: flat, color: 'var(--c4)', dash: true, w: 2 }, { pts, color: 'var(--c1)', w: 3 }],
        points: [
          { x: B.sd, y: B.mu, color: 'var(--c3)', label: 'Bonds', r: 5 }, { x: A.sd, y: A.mu, color: 'var(--c3)', label: 'Stocks', r: 5 },
          { x: best.sd, y: best.mu, color: 'var(--c2)', r: 5, label: `Min-risk mix: ${Math.round(best.w * 100)}% stocks` },
          { x: p.sd, y: p.mu, color: 'var(--ink)', r: 7 }
        ],
        legend: [{ color: 'var(--c1)', label: `Possible mixes at ρ = ${v.rho.toFixed(2)}` }, { color: 'var(--c4)', label: 'If ρ = +1 (no diversification)', dash: true }]
      });
      ui.stats.innerHTML = statTiles([
        ['Expected return', pct(p.mu, 2)], ['Volatility', pct(p.sd, 2)],
        ['Risk removed by diversifying', pct(avg - p.sd, 2)], ['Sharpe ratio (rf 2%)', ((p.mu - rf) / p.sd).toFixed(2)]
      ]);
      ui.note.innerHTML = 'Stocks: 8% expected return, 18% volatility. Bonds: 3% and 6%. (Illustrative numbers.) Slide ρ toward −1 and the curve bends left: the same expected returns are available at much lower risk. At ρ = +1 it collapses onto the dashed straight line.';
    });
  };

  /* ---------- 3. Security market line ---------- */
  W.sml = function (el) {
    const specs = [
      { k: 'rf', label: 'Risk-free rate', min: 0, max: 8, step: 0.25, value: 3, fmt: v => pct(v, 2) },
      { k: 'mrp', label: 'Market risk premium', min: 2, max: 10, step: 0.25, value: 5.5, fmt: v => pct(v, 2) },
      { k: 'beta', label: 'Stock beta', min: 0, max: 2, step: 0.05, value: 1.3, fmt: v => v.toFixed(2) },
      { k: 'fc', label: 'Your forecast return', min: 0, max: 20, step: 0.25, value: 12, fmt: v => pct(v, 2) }
    ];
    const ui = shell(el, specs);
    const mbox = mathBox(ui, 'Show the math: the CAPM calculation');
    bind(el, specs, v => {
      const req = v.rf + v.beta * v.mrp, alpha = v.fc - req;
      mbox.innerHTML = stepRows([
        ['Safe return (risk-free rate)', pct(v.rf, 2)],
        [`Extra for market risk: β × market premium = ${v.beta.toFixed(2)} × ${pct(v.mrp, 2)}`, pct(v.beta * v.mrp, 2)],
        ['Required return = safe + extra', pct(req, 2), true],
        ['Alpha = your forecast − required return', (alpha >= 0 ? '+' : '') + pct(alpha, 2)]
      ]);
      ui.chart.innerHTML = lineChart({
        title: 'Security market line', x: [0, 2], y: [0, Math.max(20, v.rf + 2 * v.mrp, v.fc) * 1.05], xFmt: v => v.toFixed(1), yFmt: v => v + '%', xLabel: 'Beta', yLabel: 'Expected return',
        series: [{ pts: [[0, v.rf], [2, v.rf + 2 * v.mrp]], color: 'var(--c1)', w: 3 }],
        points: [
          { x: 1, y: v.rf + v.mrp, color: 'var(--c3)', r: 5, label: 'Market (β = 1)' },
          { x: v.beta, y: v.fc, color: alpha >= 0 ? 'var(--good)' : 'var(--bad)', r: 7, label: 'Your stock' }
        ],
        legend: [{ color: 'var(--c1)', label: 'CAPM required return' }]
      });
      ui.stats.innerHTML = statTiles([['CAPM required return', pct(req, 2)], ['Your forecast', pct(v.fc, 2)], ['Alpha', (alpha >= 0 ? '+' : '') + pct(alpha, 2)], ['Beta', v.beta.toFixed(2)]]);
      ui.note.innerHTML = Math.abs(alpha) < 0.05 ? 'The stock sits on the line: its forecast return just compensates for its market risk. No alpha.'
        : alpha > 0 ? 'The stock plots <b>above</b> the line: if your forecast were right, it offers more than its risk warrants (positive alpha), so it would look underpriced.'
          : 'The stock plots <b>below</b> the line: it offers less than its market risk warrants (negative alpha), so it would look overpriced.';
    });
  };

  /* ---------- 4. Random walk lab ---------- */
  W.randomwalk = function (el) {
    const mu = 0.07 / 252, sd = 0.16 / Math.sqrt(252);
    const specs = [{ k: 'phi', label: 'Day-to-day momentum (φ)', min: 0, max: 0.4, step: 0.02, value: 0, fmt: v => v.toFixed(2) }];
    const ui = shell(el, specs);
    ui.stats.insertAdjacentHTML('beforebegin', '<div class="btnrow"><button class="btn" data-a="paths">New random paths</button><button class="btn primary" data-a="test">Run 1,000 simulated years</button></div>');
    const gen = (n, phi) => { // AR(1) daily returns with fixed marginal volatility
      const out = []; let prev = mu; const e = sd * Math.sqrt(1 - phi * phi);
      for (let i = 0; i < n; i++) { const r = mu + phi * (prev - mu) + e * randn(); out.push(r); prev = r; }
      return out;
    };
    let phi = 0;
    function drawPaths() {
      const days = 756, series = [];
      let lo = 1e9, hi = -1e9;
      for (let k = 0; k < 8; k++) {
        const r = gen(days, phi); let p = 100; const pts = [[0, p]];
        r.forEach((x, i) => { p *= 1 + x; pts.push([(i + 1) / 252, p]); lo = Math.min(lo, p); hi = Math.max(hi, p); });
        series.push({ pts, color: k === 0 ? 'var(--c1)' : 'var(--c4)', w: k === 0 ? 3 : 1.8, op: k === 0 ? 1 : 0.7 });
      }
      ui.chart.innerHTML = lineChart({ title: 'Eight simulated price paths', x: [0, 3], y: [Math.floor(lo / 10) * 10, Math.ceil(hi / 10) * 10], xLabel: 'Years', xFmt: v => v, yFmt: v => '$' + v, series });
    }
    function runTest() {
      const trials = 1000, days = 252; let sumBH = 0, sumST = 0, wins = 0, inMkt = 0;
      for (let t = 0; t < trials; t++) {
        const r = gen(days, phi); let bh = 100, st = 100, up = false;
        for (let i = 0; i < days; i++) { bh *= 1 + r[i]; if (up) { st *= 1 + r[i]; inMkt++; } up = r[i] > 0; }
        sumBH += bh; sumST += st; if (st > bh) wins++;
      }
      ui.stats.innerHTML = statTiles([
        ['Buy & hold: average end value', '$' + (sumBH / trials).toFixed(1)], ['"Follow yesterday": average end value', '$' + (sumST / trials).toFixed(1)],
        ['Rule beat buy & hold in', (wins / trials * 100).toFixed(0) + '% of years'], ['Time invested (rule)', (inMkt / (trials * days) * 100).toFixed(0) + '%']
      ]);
      ui.note.innerHTML = phi === 0
        ? 'With no memory in returns, "buy after an up day, sit in cash after a down day" has no edge: it just spends about half its time out of the market and misses part of the average drift. Now raise φ and re-run: it takes only a little day-to-day memory for the rule to win, which is exactly why researchers test real returns for autocorrelation.'
        : `With φ = ${phi.toFixed(2)}, yesterday's return carries information about today's, so the rule beats buy & hold. The question for real markets is how large that autocorrelation actually is (in liquid modern markets it is generally found to be small) and whether any edge survives trading costs.`;
    }
    el.querySelector('[data-a=paths]').addEventListener('click', drawPaths);
    el.querySelector('[data-a=test]').addEventListener('click', runTest);
    bind(el, specs, v => { phi = v.phi; drawPaths(); ui.stats.innerHTML = ''; ui.note.innerHTML = 'All eight paths come from the same process: independent daily returns with 7% yearly drift and 16% volatility. Yet you can probably pick out "trends", "floors" and "breakouts". Click <b>New random paths</b> a few times.'; });
  };

  /* ---------- 5. Black–Scholes ---------- */
  W.bs = function (el) {
    const specs = [
      { k: 'S', label: 'Stock price (S)', min: 50, max: 150, step: 1, value: 100, fmt: v => '$' + v },
      { k: 'K', label: 'Strike (K)', min: 50, max: 150, step: 1, value: 100, fmt: v => '$' + v },
      { k: 'T', label: 'Time to expiry', min: 0.05, max: 2, step: 0.05, value: 0.5, fmt: v => v.toFixed(2) + ' yrs' },
      { k: 'sig', label: 'Volatility (σ)', min: 5, max: 80, step: 1, value: 25, fmt: v => v + '%' },
      { k: 'r', label: 'Risk-free rate', min: 0, max: 8, step: 0.25, value: 3, fmt: v => pct(v, 2) }
    ];
    let type = 'call';
    const ui = shell(el, specs);
    ui.chart.insertAdjacentHTML('beforebegin', '<div class="btnrow"><button class="btn primary" data-t="call">Call</button><button class="btn" data-t="put">Put</button></div>');
    const mbox = mathBox(ui, 'Show the math: every step of the calculation, with your numbers');
    const price = (S, K, T, sg, r) => {
      const d1 = (Math.log(S / K) + (r + sg * sg / 2) * T) / (sg * Math.sqrt(T)), d2 = d1 - sg * Math.sqrt(T), df = Math.exp(-r * T);
      return { call: S * N(d1) - K * df * N(d2), put: K * df * N(-d2) - S * N(-d1), d1, d2, df };
    };
    const upd = bind(el, specs, v => {
      const sg = v.sig / 100, r = v.r / 100, p = price(v.S, v.K, v.T, sg, r), isC = type === 'call';
      const sq = sg * Math.sqrt(v.T), pvK = v.K * p.df;
      const legs = isC
        ? [['9. Stock you would receive, weighted: S × N(d₁)', (v.S * N(p.d1)).toFixed(2)], ['10. Strike you would pay, in today\'s money, weighted: K·e<sup>−rT</sup> × N(d₂)', (pvK * N(p.d2)).toFixed(2)], ['Call value = step 9 − step 10', '$' + p.call.toFixed(2), true]]
        : [['9. Strike you would receive, weighted: K·e<sup>−rT</sup> × N(−d₂)', (pvK * N(-p.d2)).toFixed(2)], ['10. Stock you would give up, weighted: S × N(−d₁)', (v.S * N(-p.d1)).toFixed(2)], ['Put value = step 9 − step 10', '$' + p.put.toFixed(2), true]];
      mbox.innerHTML = stepRows([
        ['1. How far in or out of the money: ln(S ÷ K)', Math.log(v.S / v.K).toFixed(4)],
        ['2. How much the stock typically wobbles over the option\'s life: σ × √T', `${sg.toFixed(2)} × √${v.T.toFixed(2)} = ${sq.toFixed(4)}`],
        ['3. Expected drift over that time: (r + σ²÷2) × T', ((r + sg * sg / 2) * v.T).toFixed(4)],
        ['4. d₁ = (step 1 + step 3) ÷ step 2', p.d1.toFixed(4)],
        ['5. d₂ = d₁ − step 2', p.d2.toFixed(4)],
        ['6. N(d₁): the "delta" weight', N(p.d1).toFixed(4)],
        ['7. N(d₂): the (risk-neutral) chance the call finishes in the money', N(p.d2).toFixed(4)],
        ['8. Strike in today\'s money: K × e<sup>−rT</sup>', `${v.K} × ${p.df.toFixed(4)} = ${pvK.toFixed(2)}`]
      ].concat(legs)) + '<p class="wnote">Steps 1–5 measure "how far in the money, in units of typical wobble". Steps 6–7 turn those into probability-style weights. Steps 8–10 are just: <em>what you get</em> minus <em>what you pay</em>, each weighted and expressed in today\'s money.</p>';
      const val = isC ? p.call : p.put, intr = isC ? Math.max(v.S - v.K, 0) : Math.max(v.K - v.S, 0);
      const pts = [], pay = [], lo = v.K * 0.5, hi = v.K * 1.5;
      for (let s = lo; s <= hi + 1e-9; s += (hi - lo) / 80) { const q = price(s, v.K, v.T, sg, r); pts.push([s, isC ? q.call : q.put]); pay.push([s, isC ? Math.max(s - v.K, 0) : Math.max(v.K - s, 0)]); }
      const ymax = Math.max(...pts.map(p => p[1]), ...pay.map(p => p[1])) * 1.05;
      ui.chart.innerHTML = lineChart({
        title: 'Option value versus stock price', x: [lo, hi], y: [0, ymax], xFmt: v => '$' + Math.round(v), yFmt: v => '$' + Math.round(v), xLabel: 'Stock price', yLabel: 'Option value',
        series: [{ pts: pay, color: 'var(--c4)', dash: true, w: 2 }, { pts, color: 'var(--c1)', w: 3 }],
        points: [{ x: v.S, y: val, color: 'var(--c2)', r: 6 }],
        legend: [{ color: 'var(--c1)', label: `${isC ? 'Call' : 'Put'} value today` }, { color: 'var(--c4)', label: 'Payoff at expiry', dash: true }]
      });
      const parity = p.call - p.put, rhs = v.S - v.K * Math.exp(-r * v.T);
      ui.stats.innerHTML = statTiles([
        ['Call price', '$' + p.call.toFixed(2)], ['Put price', '$' + p.put.toFixed(2)],
        [(isC ? 'Call' : 'Put') + ' delta', (isC ? N(p.d1) : N(p.d1) - 1).toFixed(2)], ['Time value', '$' + (val - intr).toFixed(2)]
      ]);
      ui.note.innerHTML = `Put–call parity check: C − P = ${parity.toFixed(2)} and S − K·e<sup>−rT</sup> = ${rhs.toFixed(2)}. Try raising volatility: <b>both</b> prices increase. Try shortening the time to expiry: the solid curve collapses onto the dashed payoff line.`;
    });
    el.querySelectorAll('[data-t]').forEach(b => b.addEventListener('click', () => {
      type = b.dataset.t; el.querySelectorAll('[data-t]').forEach(x => x.classList.toggle('primary', x === b)); upd();
    }));
  };

  /* ---------- 6. Rates: Fisher + yield curve ---------- */
  W.rates = function (el) {
    const specs = [
      { k: 'nom', label: 'Nominal interest rate', min: 0, max: 12, step: 0.25, value: 5, fmt: v => pct(v, 2) },
      { k: 'inf', label: 'Inflation', min: 0, max: 10, step: 0.25, value: 3, fmt: v => pct(v, 2) }
    ];
    const curves = {
      normal: { name: 'Normal', y: [3.0, 3.3, 3.6, 4.0, 4.4, 4.8], txt: 'Upward sloping: investors want a term premium for lending longer, and/or expect short rates to rise. Typical in expansions.' },
      flat: { name: 'Flat', y: [4.2, 4.2, 4.2, 4.2, 4.2, 4.2], txt: 'Flat: little difference between short and long rates. Often a transition between phases of the cycle.' },
      inverted: { name: 'Inverted', y: [5.3, 5.0, 4.6, 4.2, 4.1, 4.2], txt: 'Inverted: short rates above long rates. Markets expect rate cuts, usually because they expect weaker growth. Has preceded most postwar US recessions, with false alarms.' },
      steep: { name: 'Steep', y: [1.0, 1.5, 2.2, 3.2, 4.2, 5.0], txt: 'Steep: common early in a recovery, after the central bank has cut short rates very low while long rates price in future growth and inflation.' }
    };
    const labels = ['3M', '1Y', '2Y', '5Y', '10Y', '30Y'];
    el.innerHTML = '<h3 class="wh">Nominal vs real</h3>' + controlsHTML(specs) + '<div class="statbox fisher"></div><p class="wnote fnote"></p>' +
      '<h3 class="wh">Yield curve shapes <small>(stylized, illustrative values, not market data)</small></h3><div class="btnrow ycbtns">' +
      Object.keys(curves).map((k, i) => `<button class="btn ${i ? '' : 'primary'}" data-c="${k}">${curves[k].name}</button>`).join('') + '</div><div class="chartbox"></div><p class="wnote ynote"></p>';
    bind(el, specs, v => {
      const exact = ((1 + v.nom / 100) / (1 + v.inf / 100) - 1) * 100, approx = v.nom - v.inf;
      el.querySelector('.fisher').innerHTML = statTiles([['Real rate (exact)', pct(exact, 2)], ['Real rate (nominal − inflation)', pct(approx, 2)], ['Approximation error', pct(Math.abs(exact - approx), 3)]]);
      el.querySelector('.fnote').innerHTML = exact < 0 ? 'Real rate is <b>negative</b>: savers are losing purchasing power even though the nominal rate is positive.' : 'The gap between exact and approximate grows as rates and inflation rise.';
    });
    const draw = k => {
      const c = curves[k];
      el.querySelector('.chartbox').innerHTML = lineChart({
        title: 'Yield curve', x: [0, 5], y: [0, 6], xTicks: labels.map((l, i) => ({ v: i, label: l })), yFmt: v => v + '%', xLabel: 'Maturity', yLabel: 'Yield',
        series: [{ pts: c.y.map((y, i) => [i, y]), color: 'var(--c1)', w: 3 }], points: c.y.map((y, i) => ({ x: i, y, color: 'var(--c1)', r: 4 }))
      });
      el.querySelector('.ynote').textContent = c.txt;
    };
    el.querySelectorAll('[data-c]').forEach(b => b.addEventListener('click', () => { el.querySelectorAll('[data-c]').forEach(x => x.classList.toggle('primary', x === b)); draw(b.dataset.c); }));
    draw('normal');
  };

  /* ---------- 7. Modigliani–Miller ---------- */
  W.mm = function (el) {
    const specs = [
      { k: 'r0', label: 'Cost of capital, all-equity (r₀)', min: 8, max: 14, step: 0.5, value: 10, fmt: v => pct(v) },
      { k: 'rd', label: 'Cost of debt (r_D)', min: 1, max: 6, step: 0.5, value: 5, fmt: v => pct(v) },
      { k: 'tax', label: 'Corporate tax rate (τ)', min: 0, max: 40, step: 1, value: 25, fmt: v => v + '%' },
      { k: 'd', label: 'Debt share of firm value (D/V)', min: 0, max: 80, step: 1, value: 40, fmt: v => v + '%' }
    ];
    const ui = shell(el, specs);
    bind(el, specs, v => {
      const t = v.tax / 100, calc = d => {
        const de = d / (1 - d);
        return { reNT: v.r0 + (v.r0 - v.rd) * de, re: v.r0 + (v.r0 - v.rd) * (1 - t) * de, wacc: v.r0 * (1 - t * d) };
      };
      const eq = [], wn = [], wt = [], kd = [];
      for (let i = 0; i <= 80; i++) { const d = i / 100, c = calc(d); eq.push([i, c.re]); wn.push([i, v.r0]); wt.push([i, c.wacc]); kd.push([i, v.rd * (1 - t)]); }
      const ymax = Math.max(...eq.map(p => p[1])) * 1.05, d = v.d / 100, c = calc(d);
      ui.chart.innerHTML = lineChart({
        title: 'Cost of capital versus leverage', x: [0, 80], y: [0, ymax], xFmt: v => v + '%', yFmt: v => v + '%', xLabel: 'Debt share of firm value (D/V)', yLabel: 'Cost of capital',
        series: [{ pts: kd, color: 'var(--c3)', dash: true, w: 2 }, { pts: wn, color: 'var(--c4)', dash: true, w: 2 }, { pts: eq, color: 'var(--c2)', w: 3 }, { pts: wt, color: 'var(--c1)', w: 3 }],
        points: [{ x: v.d, y: c.wacc, color: 'var(--c1)', r: 5 }, { x: v.d, y: c.re, color: 'var(--c2)', r: 5 }],
        legend: [{ color: 'var(--c2)', label: 'Cost of equity (with taxes)' }, { color: 'var(--c1)', label: 'WACC (with taxes)' }, { color: 'var(--c4)', label: 'WACC with no taxes', dash: true }, { color: 'var(--c3)', label: 'After-tax cost of debt', dash: true }]
      });
      const vl = 100 / (1 - t * d);
      ui.stats.innerHTML = statTiles([['Cost of equity', pct(c.re, 2)], ['WACC', pct(c.wacc, 2)], ['Firm value per $100 unlevered', '$' + vl.toFixed(1)], ['Value of tax shield', '$' + (vl - 100).toFixed(1)]]);
      ui.note.innerHTML = 'Set the tax rate to 0: WACC is flat (Proposition I) even as the cost of equity climbs (Proposition II). Add taxes and WACC falls with leverage as the interest tax shield adds value. <b>Caveat:</b> this model holds r<sub>D</sub> constant and ignores distress costs; in reality both bite at high leverage, which is what makes an optimal capital structure exist.';
    });
  };

  /* ---------- 8. Prospect theory ---------- */
  W.prospect = function (el) {
    const specs = [
      { k: 'a', label: 'Curvature (α)', min: 0.3, max: 1, step: 0.01, value: 0.88, fmt: v => v.toFixed(2) },
      { k: 'lam', label: 'Loss aversion (λ)', min: 1, max: 4, step: 0.05, value: 2.25, fmt: v => v.toFixed(2) },
      { k: 'g', label: 'Probability weighting (γ)', min: 0.3, max: 1, step: 0.01, value: 0.61, fmt: v => v.toFixed(2) }
    ];
    const ui = shell(el, specs);
    ui.chart.classList.add('two');
    bind(el, specs, v => {
      const val = x => x >= 0 ? Math.pow(x, v.a) : -v.lam * Math.pow(-x, v.a);
      const wt = p => Math.pow(p, v.g) / Math.pow(Math.pow(p, v.g) + Math.pow(1 - p, v.g), 1 / v.g);
      const vp = [], mir = [], wp = [], diag = [[0, 0], [1, 1]];
      for (let x = -200; x <= 200; x += 4) { vp.push([x, val(x)]); if (x < 0) mir.push([x, -Math.pow(-x, v.a)]); }
      for (let i = 0; i <= 100; i++) { const p = i / 100; wp.push([p, wt(p)]); }
      const top = Math.pow(200, v.a), bot = v.lam * top;
      const c1 = lineChart({
        title: 'Value function', h: 320, x: [-200, 200], y: [-Math.ceil(bot / 10) * 10, Math.ceil(top / 10) * 10], xFmt: v => v < 0 ? '−$' + (-v) : v > 0 ? '+$' + v : '$0', yFmt: v => Math.round(v), xLabel: 'Loss ← outcome vs reference point → Gain', yLabel: 'Felt value',
        series: [{ pts: mir, color: 'var(--c4)', dash: true, w: 2 }, { pts: vp, color: 'var(--c1)', w: 3 }],
        legend: [{ color: 'var(--c1)', label: 'Prospect-theory value' }, { color: 'var(--c4)', label: 'Losses felt like equal gains', dash: true }]
      });
      const c2 = lineChart({
        title: 'Probability weighting function', h: 320, x: [0, 1], y: [0, 1], xFmt: v => Math.round(v * 100) + '%', yFmt: v => Math.round(v * 100) + '%', xLabel: 'Actual probability', yLabel: 'Decision weight',
        series: [{ pts: diag, color: 'var(--c4)', dash: true, w: 2 }, { pts: wp, color: 'var(--c2)', w: 3 }],
        legend: [{ color: 'var(--c2)', label: 'Weight people use' }, { color: 'var(--c4)', label: 'Actual probability', dash: true }]
      });
      ui.chart.innerHTML = '<div>' + c1 + '</div><div>' + c2 + '</div>';
      const need = Math.pow(v.lam, 1 / v.a) * 100;
      ui.stats.innerHTML = statTiles([['Win needed vs a $100 loss (50/50)', money(need)], ['A 1% chance feels like', pct(wt(0.01) * 100, 1)], ['A 99% chance feels like', pct(wt(0.99) * 100, 1)]]);
      ui.note.innerHTML = 'Drag λ to 1 and α to 1: the value function becomes a straight line through the origin, which is the risk-neutral benchmark. Baseline values (0.88, 2.25, 0.61) are Tversky and Kahneman\'s 1992 estimates for gains.';
    });
  };

  /* =====================================================================
     Portfolio management widgets
     ===================================================================== */

  /* ---------- 9. Capital allocation line ---------- */
  W.cal = function (el) {
    const specs = [
      { k: 'rf', label: 'Risk-free rate', min: 0, max: 8, step: 0.25, value: 3, fmt: v => pct(v, 2) },
      { k: 'ep', label: 'Risky portfolio: expected return', min: 3, max: 15, step: 0.25, value: 8, fmt: v => pct(v, 2) },
      { k: 'sp', label: 'Risky portfolio: volatility', min: 5, max: 30, step: 0.5, value: 16, fmt: v => pct(v) },
      { k: 'A', label: 'Your risk aversion (A)', min: 1, max: 10, step: 0.5, value: 4, fmt: v => v.toFixed(1) }
    ];
    const ui = shell(el, specs);
    bind(el, specs, v => {
      const rf = v.rf / 100, ep = v.ep / 100, sp = v.sp / 100;
      const excess = Math.max(ep - rf, 0), sharpe = excess / sp;
      const y = excess / (v.A * sp * sp), ret = rf + y * excess, sd = y * sp;
      const ce = rf + excess * excess / (2 * v.A * sp * sp);
      const xmax = Math.max(40, sd * 100 * 1.1), ymax = Math.max(20, ret * 100 * 1.1, v.ep * 1.1);
      ui.chart.innerHTML = lineChart({
        title: 'Capital allocation line', x: [0, xmax], y: [0, ymax], xFmt: t => t + '%', yFmt: t => t + '%', xLabel: 'Risk (standard deviation)', yLabel: 'Expected return',
        series: [{ pts: [[0, v.rf], [xmax, v.rf + sharpe * xmax]], color: 'var(--c1)', w: 3 }],
        points: [{ x: 0, y: v.rf, color: 'var(--c3)', r: 5, label: 'Risk-free' }, { x: v.sp, y: v.ep, color: 'var(--c3)', r: 5, label: 'Risky portfolio' }, { x: sd * 100, y: ret * 100, color: 'var(--c2)', r: 8, label: 'Your optimal mix' }],
        legend: [{ color: 'var(--c1)', label: 'Capital allocation line (slope = Sharpe ratio)' }]
      });
      ui.stats.innerHTML = statTiles([['In risky portfolio', pct(y * 100, 0)], ['In risk-free asset', pct((1 - y) * 100, 0)], ['Expected return', pct(ret * 100, 2)], ['Volatility', pct(sd * 100, 2)], ['Sharpe ratio (same for every mix)', sharpe.toFixed(2)], ['Certainty-equivalent return', pct(ce * 100, 2)]]);
      ui.note.innerHTML = (y > 1 ? '<b>Above 100% means borrowing at the risk-free rate to lever up the risky portfolio.</b> ' : '') +
        'Optimal share in the risky portfolio: y* = (E[R<sub>p</sub>] − r<sub>f</sub>) ÷ (A·σ<sub>p</sub>²). Raise risk aversion and you slide down the line toward the risk-free asset; every point on the line has the same Sharpe ratio. Only the <em>risky portfolio\'s</em> Sharpe ratio, and your appetite for risk, determine where you land.';
    });
  };

  /* ---------- 10. Performance measures ---------- */
  W.perf = function (el) {
    const specs = [
      { k: 'rf', label: 'Risk-free rate', min: 0, max: 6, step: 0.25, value: 3, fmt: v => pct(v, 2) },
      { k: 'rm', label: 'Market return', min: 4, max: 14, step: 0.25, value: 8, fmt: v => pct(v, 2) },
      { k: 'sm', label: 'Market volatility', min: 10, max: 25, step: 0.5, value: 15, fmt: v => pct(v) },
      { k: 'rfund', label: 'Fund return', min: 2, max: 20, step: 0.25, value: 11, fmt: v => pct(v, 2) },
      { k: 'sf', label: 'Fund volatility', min: 5, max: 35, step: 0.5, value: 18, fmt: v => pct(v) },
      { k: 'beta', label: 'Fund beta', min: 0.3, max: 1.8, step: 0.05, value: 1.1, fmt: v => v.toFixed(2) },
      { k: 'te', label: 'Tracking error vs market', min: 1, max: 12, step: 0.5, value: 4, fmt: v => pct(v) },
      { k: 'yrs', label: 'Years of track record', min: 3, max: 30, step: 1, value: 10 }
    ];
    const ui = shell(el, specs);
    bind(el, specs, v => {
      const shF = (v.rfund - v.rf) / v.sf, shM = (v.rm - v.rf) / v.sm;
      const trF = (v.rfund - v.rf) / v.beta, trM = v.rm - v.rf;
      const alpha = v.rfund - (v.rf + v.beta * (v.rm - v.rf));
      const ir = (v.rfund - v.rm) / v.te, t = ir * Math.sqrt(v.yrs);
      ui.chart.innerHTML = lineChart({
        title: 'Fund versus the security market line', x: [0, 2], y: [0, Math.max(20, v.rf + 2 * (v.rm - v.rf), v.rfund) * 1.05], xFmt: t => t.toFixed(1), yFmt: t => t + '%', xLabel: 'Beta', yLabel: 'Return',
        series: [{ pts: [[0, v.rf], [2, v.rf + 2 * (v.rm - v.rf)]], color: 'var(--c1)', w: 3 }],
        points: [{ x: 1, y: v.rm, color: 'var(--c3)', r: 5, label: 'Market' }, { x: v.beta, y: v.rfund, color: alpha >= 0 ? 'var(--good)' : 'var(--bad)', r: 7, label: 'Fund' }],
        legend: [{ color: 'var(--c1)', label: 'Return CAPM says the fund\'s beta should earn' }]
      });
      ui.stats.innerHTML = statTiles([
        ['Sharpe: fund vs market', shF.toFixed(2) + ' vs ' + shM.toFixed(2)], ['Treynor: fund vs market', pct(trF, 1) + ' vs ' + pct(trM, 1)],
        ['Jensen\'s alpha', (alpha >= 0 ? '+' : '') + pct(alpha, 2)], ['Information ratio', ir.toFixed(2)], ['Approx. t-stat of excess return', t.toFixed(2)]
      ]);
      ui.note.innerHTML = Math.abs(t) < 2
        ? `With a t-stat of ${t.toFixed(2)}, ${v.yrs} years of results are <b>not statistically distinguishable from luck</b> (rule of thumb: |t| > 2). Try lengthening the track record or the outperformance.`
        : `A t-stat of ${t.toFixed(2)} clears the usual |t| > 2 bar. Even so, remember multiple testing: with thousands of funds, some will look this good by chance.`;
    });
  };

  /* ---------- 11. Fee drag ---------- */
  W.fees = function (el) {
    const specs = [
      { k: 'start', label: 'Starting investment', min: 1000, max: 100000, step: 1000, value: 10000, fmt: money },
      { k: 'g', label: 'Gross return before fees', min: 3, max: 12, step: 0.25, value: 7, fmt: v => pct(v, 2) },
      { k: 'yrs', label: 'Years', min: 5, max: 50, step: 1, value: 30 },
      { k: 'f1', label: 'Low-cost fund fee', min: 0, max: 0.5, step: 0.01, value: 0.05, fmt: v => pct(v, 2) },
      { k: 'f2', label: 'High-cost fund fee', min: 0, max: 2.5, step: 0.05, value: 1, fmt: v => pct(v, 2) }
    ];
    const ui = shell(el, specs);
    bind(el, specs, v => {
      const a = [], b = [];
      for (let t = 0; t <= v.yrs; t++) { a.push([t, v.start * Math.pow(1 + (v.g - v.f1) / 100, t)]); b.push([t, v.start * Math.pow(1 + (v.g - v.f2) / 100, t)]); }
      const A = a[v.yrs][1], B = b[v.yrs][1];
      ui.chart.innerHTML = lineChart({
        title: 'Growth net of fees', x: [0, v.yrs], y: [0, Math.max(A, B) * 1.05], xLabel: 'Years', yFmt: moneyShort,
        series: [{ pts: b, color: 'var(--c2)', w: 3 }, { pts: a, color: 'var(--c1)', w: 3 }],
        legend: [{ color: 'var(--c1)', label: `Low-cost (${pct(v.f1, 2)})` }, { color: 'var(--c2)', label: `High-cost (${pct(v.f2, 2)})` }]
      });
      ui.stats.innerHTML = statTiles([['Low-cost ending value', money(A)], ['High-cost ending value', money(B)], ['Lost to the fee gap', money(A - B)], ['Share of outcome lost', pct((A - B) / A * 100, 1)], ['High fee as % of gross return', pct(v.f2 / v.g * 100, 0)]]);
      ui.note.innerHTML = `Both funds earn the same ${pct(v.g, 2)} before fees here. To merely <b>break even</b>, the high-cost manager must beat the low-cost one by ${pct(v.f2 - v.f1, 2)} a year, before taxes, every year. Sharpe's "arithmetic of active management" says that, on average, they can't.`;
    });
  };

  /* ---------- 12. Value at Risk ---------- */
  W.var = function (el) {
    const specs = [
      { k: 'val', label: 'Portfolio value', min: 100000, max: 10000000, step: 100000, value: 1000000, fmt: money },
      { k: 'mu', label: 'Expected annual return', min: 0, max: 12, step: 0.5, value: 7, fmt: v => pct(v) },
      { k: 'sd', label: 'Annual volatility', min: 5, max: 40, step: 0.5, value: 15, fmt: v => pct(v) },
      { k: 'c', label: 'Confidence level', min: 90, max: 99.5, step: 0.5, value: 95, fmt: v => pct(v) },
      { k: 'h', label: 'Horizon (trading days)', min: 1, max: 20, step: 1, value: 1 }
    ];
    const invN = p => { let lo = -8, hi = 8; for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2; N(m) < p ? lo = m : hi = m; } return (lo + hi) / 2; };
    const ui = shell(el, specs);
    bind(el, specs, v => {
      const c = v.c / 100, z = invN(c), m = v.mu / 100 / 252 * v.h, s = v.sd / 100 / Math.sqrt(252) * Math.sqrt(v.h);
      const varPct = z * s - m, phi = Math.exp(-z * z / 2) / Math.sqrt(2 * Math.PI), es = s * phi / (1 - c) - m;
      const pdf = x => Math.exp(-0.5 * Math.pow((x - m) / s, 2)) / (s * Math.sqrt(2 * Math.PI));
      const pts = [], tail = [], cut = -varPct;
      for (let i = 0; i <= 160; i++) { const x = m - 4 * s + i * 8 * s / 160; pts.push([x * 100, pdf(x)]); if (x <= cut) tail.push([x * 100, pdf(x)]); }
      tail.push([cut * 100, pdf(cut)]);
      ui.chart.innerHTML = lineChart({
        title: 'Distribution of portfolio returns with the loss tail shaded', x: [(m - 4 * s) * 100, (m + 4 * s) * 100], y: [0, pdf(m) * 1.1], xFmt: t => t.toFixed(1) + '%', yFmt: () => '', xLabel: `Return over ${v.h} day${v.h > 1 ? 's' : ''}`, yLabel: 'Probability density',
        series: [{ pts, color: 'var(--c1)', w: 2.5 }, { pts: tail, color: 'var(--bad)', w: 1, fill: 'var(--bad)' }],
        points: [{ x: cut * 100, y: pdf(cut), color: 'var(--bad)', r: 5, label: `VaR cut-off ${(cut * 100).toFixed(2)}%` }],
        legend: [{ color: 'var(--bad)', label: `Worst ${(100 - v.c).toFixed(1)}% of outcomes` }]
      });
      ui.stats.innerHTML = statTiles([[`${pct(v.c, 1)} VaR (${v.h}d)`, money(v.val * varPct)], ['Expected shortfall (CVaR)', money(v.val * es)], ['Loss exceeds VaR about', '1 in ' + Math.round(1 / (1 - c)) + ' periods']]);
      ui.note.innerHTML = 'VaR is the loss you expect <em>not</em> to exceed at the chosen confidence; expected shortfall is the <em>average</em> loss in the tail beyond it. This uses the parametric (normal) method. Real returns have fatter tails than a normal distribution, so this understates extreme losses. That is the main criticism of VaR.';
    });
  };

  /* =====================================================================
     Financial statement analysis widgets
     ===================================================================== */

  /* ---------- 13. Three statements: accruals vs cash ---------- */
  W.statements = function (el) {
    const specs = [
      { k: 'rev', label: 'Revenue', min: 200, max: 3000, step: 50, value: 1000, fmt: money },
      { k: 'coll', label: 'Share of revenue collected in cash this year', min: 50, max: 100, step: 1, value: 85, fmt: v => v + '%' },
      { k: 'cc', label: 'Cash operating costs (% of revenue)', min: 40, max: 90, step: 1, value: 65, fmt: v => v + '%' },
      { k: 'dep', label: 'Depreciation', min: 0, max: 300, step: 10, value: 100, fmt: money },
      { k: 'capex', label: 'Capital expenditure', min: 0, max: 400, step: 10, value: 150, fmt: money },
      { k: 'tax', label: 'Tax rate', min: 0, max: 40, step: 1, value: 25, fmt: v => v + '%' }
    ];
    const ui = shell(el, specs);
    bind(el, specs, v => {
      const ebit = v.rev - v.rev * v.cc / 100 - v.dep, tax = Math.max(0, ebit) * v.tax / 100, ni = ebit - tax;
      const dAR = v.rev * (1 - v.coll / 100), cfo = ni + v.dep - dAR, fcf = cfo - v.capex;
      ui.stats.innerHTML = statTiles([['Net income (income statement)', money(ni)], ['+ Depreciation (non-cash)', money(v.dep)], ['− Increase in receivables', money(dAR)], ['= Operating cash flow', money(cfo)], ['− Capex → free cash flow', money(fcf)], ['Accruals (NI − CFO)', money(ni - cfo)]]);
      ui.note.innerHTML = (fcf < 0 && ni > 0 ? '<b>Profitable on paper, burning cash.</b> ' : '') + 'Under accrual accounting revenue counts when earned, not when collected, so uncollected sales lift net income but not cash. Depreciation reduces income without any cash leaving; capex does the opposite: cash leaves but only reaches the income statement gradually. Move the sliders and watch profit and cash flow diverge.';
    });
  };

  /* ---------- 14. Ratio analysis ---------- */
  W.ratios = function (el) {
    const specs = [
      { k: 'rev', label: 'Revenue ($m)', min: 600, max: 1500, step: 25, value: 1000, fmt: v => '$' + v },
      { k: 'gm', label: 'Gross margin', min: 20, max: 60, step: 1, value: 40, fmt: v => v + '%' },
      { k: 'opex', label: 'Operating expenses (% of revenue)', min: 10, max: 40, step: 1, value: 25, fmt: v => v + '%' },
      { k: 'inv', label: 'Inventory ($m)', min: 50, max: 300, step: 10, value: 150, fmt: v => '$' + v },
      { k: 'debt', label: 'Interest-bearing debt ($m)', min: 100, max: 700, step: 25, value: 400, fmt: v => '$' + v }
    ];
    const ui = shell(el, specs);
    bind(el, specs, v => {
      const cash = 100, ar = 120, cl = 250, ta = 1200, rate = 0.06, taxr = 0.25;
      const cogs = v.rev * (1 - v.gm / 100), gp = v.rev - cogs, ebit = gp - v.rev * v.opex / 100, intr = v.debt * rate;
      const ebt = ebit - intr, ni = ebt - Math.max(0, ebt) * taxr, eq = ta - cl - v.debt, ca = cash + ar + v.inv;
      const turn = cogs / v.inv, g = (t, x) => `<h4 class="rg">${t}</h4>` + statTiles(x);
      ui.stats.innerHTML =
        g('Profitability', [['Gross margin', pct(gp / v.rev * 100)], ['Operating margin', pct(ebit / v.rev * 100)], ['Net margin', pct(ni / v.rev * 100)], ['ROA', pct(ni / ta * 100)], ['ROE', pct(ni / eq * 100)]]) +
        g('Liquidity', [['Current ratio', (ca / cl).toFixed(2)], ['Quick ratio', ((cash + ar) / cl).toFixed(2)]]) +
        g('Leverage', [['Debt / equity', (v.debt / eq).toFixed(2)], ['Interest coverage (EBIT ÷ interest)', (ebit / intr).toFixed(1) + '×']]) +
        g('Efficiency', [['Inventory turnover', turn.toFixed(1) + '×'], ['Days inventory', Math.round(365 / turn) + ' days'], ['Asset turnover', (v.rev / ta).toFixed(2) + '×']]);
      ui.note.innerHTML = 'A fixed sample company: total assets $1,200m, cash $100m, receivables $120m, current liabilities $250m, 6% interest, 25% tax. Notice how one change ripples through several ratios: more inventory lowers turnover <em>and</em> lifts the current ratio; more debt raises ROE while cutting coverage.';
    });
  };

  /* ---------- 15. DuPont ---------- */
  W.dupont = function (el) {
    const specs = [
      { k: 'm', label: 'Net profit margin', min: 1, max: 25, step: 0.5, value: 8, fmt: v => pct(v) },
      { k: 't', label: 'Asset turnover (sales ÷ assets)', min: 0.2, max: 3, step: 0.05, value: 1.2, fmt: v => v.toFixed(2) + '×' },
      { k: 'em', label: 'Equity multiplier (assets ÷ equity)', min: 1, max: 6, step: 0.1, value: 2, fmt: v => v.toFixed(1) + '×' }
    ];
    const ui = shell(el, specs);
    bind(el, specs, v => {
      const roa = v.m * v.t, roe = roa * v.em;
      const a = [], b = [];
      for (let e = 1; e <= 6.001; e += 0.25) { a.push([e, v.m * v.t * e]); b.push([e, v.m * 0.75 * v.t * e]); }
      ui.chart.innerHTML = lineChart({
        title: 'ROE versus leverage', x: [1, 6], y: [0, Math.max(a[a.length - 1][1], 5) * 1.05], xFmt: t => t + '×', yFmt: t => Math.round(t) + '%', xLabel: 'Equity multiplier', yLabel: 'Return on equity',
        series: [{ pts: b, color: 'var(--c2)', dash: true, w: 2.5 }, { pts: a, color: 'var(--c1)', w: 3 }],
        points: [{ x: v.em, y: roe, color: 'var(--c1)', r: 6 }],
        legend: [{ color: 'var(--c1)', label: 'Your margin' }, { color: 'var(--c2)', label: 'Margin 25% lower', dash: true }]
      });
      ui.stats.innerHTML = statTiles([['ROE', pct(roe)], ['ROA (margin × turnover)', pct(roa)], ['ROE if margin falls 25%', pct(roe * 0.75)], ['ROE with no leverage', pct(roa)]]);
      ui.note.innerHTML = 'ROE = margin × turnover × equity multiplier. A grocer (2% margin × 4× turnover) and a luxury brand (20% × 0.4×) can earn the same 8% ROA by very different routes. Leverage then scales ROE up <em>and</em> magnifies the damage when margins fall: the gap between the lines widens as the multiplier rises.';
    });
  };

  /* ---------- 16. FIFO vs LIFO ---------- */
  W.choices = function (el) {
    const specs = [
      { k: 'inf', label: 'Cost inflation this year', min: 0, max: 25, step: 1, value: 10, fmt: v => v + '%' },
      { k: 'u', label: 'Units sold (of 200 available)', min: 20, max: 200, step: 10, value: 120 }
    ];
    const ui = shell(el, specs);
    bind(el, specs, v => {
      const nc = 10 * (1 + v.inf / 100), sp = 20 * (1 + v.inf / 100), U = v.u, avail = 1000 + 100 * nc;
      const fifo = U <= 100 ? U * 10 : 1000 + (U - 100) * nc, lifo = U <= 100 ? U * nc : 100 * nc + (U - 100) * 10;
      const rev = U * sp, gpF = rev - fifo, gpL = rev - lifo, diff = gpF - gpL;
      ui.stats.innerHTML = statTiles([['Gross profit, FIFO', money(gpF)], ['Gross profit, LIFO', money(gpL)], ['LIFO lowers profit by', money(diff)], ['Tax saved under LIFO (25%)', money(diff * 0.25)], ['Ending inventory, FIFO', money(avail - fifo)], ['Ending inventory, LIFO', money(avail - lifo)]]);
      ui.note.innerHTML = 'Same units, same prices, same cash sales: only the cost-flow assumption differs. With rising costs, LIFO expenses the newest (higher) costs first, so it reports lower profit and a lower inventory value. The <em>real</em> economic difference is the tax saving. (US GAAP allows LIFO; IFRS prohibits it.) Set inflation to 0% and the two methods agree.';
    });
  };

  /* ---------- 17. Earnings quality ---------- */
  W.quality = function (el) {
    const specs = [
      { k: 'ni', label: 'Net income', min: -50, max: 300, step: 5, value: 100, fmt: money },
      { k: 'cfo', label: 'Operating cash flow', min: -100, max: 300, step: 5, value: 60, fmt: money },
      { k: 'ta', label: 'Average total assets', min: 300, max: 3000, step: 50, value: 1000, fmt: money }
    ];
    const ui = shell(el, specs);
    bind(el, specs, v => {
      const acc = v.ni - v.cfo, ratio = acc / v.ta * 100, conv = v.ni > 0 ? v.cfo / v.ni * 100 : NaN;
      const flag = Math.abs(ratio) <= 5 ? 'Normal range' : ratio > 10 ? 'High: investigate' : ratio > 5 ? 'Elevated' : 'Cash-rich earnings';
      ui.stats.innerHTML = statTiles([['Accruals (NI − CFO)', money(acc)], ['Accruals ÷ average assets', pct(ratio, 1)], ['Cash conversion (CFO ÷ NI)', isNaN(conv) ? 'n/a' : pct(conv, 0)], ['Heuristic flag', flag]]);
      ui.note.innerHTML = 'Flag thresholds are illustrative rules of thumb, not standards. Accruals aren\'t bad in themselves (growing firms have them naturally), but Sloan (1996) found that earnings driven by accruals were less persistent than earnings backed by cash, and that the market seemed not to notice. Ask <em>why</em> accruals are high: receivables, inventory, capitalized costs, or estimates?';
    });
  };

  /* ---------- 18. DCF ---------- */
  W.dcf = function (el) {
    const specs = [
      { k: 'f0', label: 'Current free cash flow ($m)', min: 10, max: 500, step: 5, value: 100, fmt: v => '$' + v },
      { k: 'g1', label: 'Growth, years 1–5', min: 0, max: 20, step: 0.5, value: 8, fmt: v => pct(v) },
      { k: 'gt', label: 'Terminal growth (after year 5)', min: 0, max: 4.5, step: 0.25, value: 2.5, fmt: v => pct(v, 2) },
      { k: 'r', label: 'Discount rate (WACC)', min: 6, max: 14, step: 0.25, value: 9, fmt: v => pct(v, 2) },
      { k: 'nd', label: 'Net debt ($m)', min: 0, max: 2000, step: 50, value: 300, fmt: v => '$' + v },
      { k: 'sh', label: 'Shares outstanding (m)', min: 10, max: 500, step: 10, value: 100 }
    ];
    const value = (v, r, gt) => {
      let pv = 0, f = v.f0;
      for (let t = 1; t <= 5; t++) { f *= 1 + v.g1 / 100; pv += f / Math.pow(1 + r / 100, t); }
      const tv = f * (1 + gt / 100) / ((r - gt) / 100), pvtv = tv / Math.pow(1 + r / 100, 5);
      return { ev: pv + pvtv, pvtv, ps: (pv + pvtv - v.nd) / v.sh };
    };
    const ui = shell(el, specs);
    bind(el, specs, v => {
      const cur = value(v, v.r, v.gt), a = [], b = [];
      for (let r = 5.5; r <= 14.001; r += 0.5) { if (r > v.gt + 0.1) a.push([r, value(v, r, v.gt).ps]); if (r > Math.max(0, v.gt - 1) + 0.1) b.push([r, value(v, r, Math.max(0, v.gt - 1)).ps]); }
      const ymax = Math.max(...a.map(p => p[1]), 1) * 1.05;
      ui.chart.innerHTML = lineChart({
        title: 'Value per share versus discount rate', x: [5.5, 14], y: [Math.min(0, ...a.map(p => p[1]), ...b.map(p => p[1])), ymax], xFmt: t => t + '%', yFmt: t => '$' + Math.round(t), xLabel: 'Discount rate (WACC)', yLabel: 'Value per share',
        series: [{ pts: b, color: 'var(--c2)', dash: true, w: 2.5 }, { pts: a, color: 'var(--c1)', w: 3 }],
        points: [{ x: v.r, y: cur.ps, color: 'var(--c1)', r: 6 }],
        legend: [{ color: 'var(--c1)', label: `Terminal growth ${pct(v.gt, 2)}` }, { color: 'var(--c2)', label: `Terminal growth ${pct(Math.max(0, v.gt - 1), 2)}`, dash: true }]
      });
      ui.stats.innerHTML = statTiles([['Enterprise value', '$' + Math.round(cur.ev) + 'm'], ['Equity value', '$' + Math.round(cur.ev - v.nd) + 'm'], ['Value per share', '$' + cur.ps.toFixed(2)], ['Share of value from terminal value', pct(cur.pvtv / cur.ev * 100, 0)]]);
      ui.note.innerHTML = 'Most of the value usually sits in the terminal value, which is why small changes to the discount rate or terminal growth swing the answer so much. A DCF is better for asking "<em>what would I have to believe?</em>" than for producing a single number.';
    });
  };

  /* ---------- 19. Justified P/E ---------- */
  W.multiples = function (el) {
    const specs = [
      { k: 'r', label: 'Required return (r)', min: 7, max: 14, step: 0.25, value: 8, fmt: v => pct(v, 2) },
      { k: 'g', label: 'Long-run growth (g)', min: 0, max: 5.5, step: 0.25, value: 3.5, fmt: v => pct(v, 2) },
      { k: 'po', label: 'Dividend payout ratio', min: 20, max: 100, step: 5, value: 60, fmt: v => v + '%' }
    ];
    const ui = shell(el, specs);
    bind(el, specs, v => {
      const fwd = (r, g) => v.po / 100 / ((r - g) / 100), cur = fwd(v.r, v.g);
      const a = [], b = [];
      for (let g = 0; g <= 5.5001; g += 0.25) { if (g < v.r - 0.5) a.push([g, fwd(v.r, g)]); if (g < v.r + 2 - 0.5) b.push([g, fwd(v.r + 2, g)]); }
      ui.chart.innerHTML = lineChart({
        title: 'Justified forward P/E versus growth', x: [0, 5.5], y: [0, Math.max(...a.map(p => p[1])) * 1.05], xFmt: t => t + '%', yFmt: t => Math.round(t) + '×', xLabel: 'Long-run growth (g)', yLabel: 'Justified forward P/E',
        series: [{ pts: b, color: 'var(--c2)', dash: true, w: 2.5 }, { pts: a, color: 'var(--c1)', w: 3 }],
        points: [{ x: v.g, y: cur, color: 'var(--c1)', r: 6 }],
        legend: [{ color: 'var(--c1)', label: `Required return ${pct(v.r, 2)}` }, { color: 'var(--c2)', label: `Required return ${pct(v.r + 2, 2)}`, dash: true }]
      });
      ui.stats.innerHTML = statTiles([['Justified forward P/E', cur.toFixed(1) + '×'], ['Justified trailing P/E', (cur * (1 + v.g / 100)).toFixed(1) + '×'], ['Implied earnings yield', pct(100 / cur, 1)], ['P/E ÷ growth (PEG)', v.g > 0 ? (cur / v.g).toFixed(2) : 'n/a']]);
      ui.note.innerHTML = 'From the Gordon growth model, P/E<sub>1</sub> = payout ÷ (r − g). A "high" multiple isn\'t automatically expensive: it may reflect higher growth, a lower required return, or a higher payout. The curve gets very steep as g approaches r, which is why growth assumptions dominate the multiples of high-growth firms.';
    });
  };

  /* ---------- 20. Altman Z-score ---------- */
  W.altman = function (el) {
    const specs = [
      { k: 'x1', label: 'Working capital ÷ total assets', min: -0.2, max: 0.6, step: 0.01, value: 0.15, fmt: v => v.toFixed(2) },
      { k: 'x2', label: 'Retained earnings ÷ total assets', min: -0.5, max: 0.8, step: 0.01, value: 0.25, fmt: v => v.toFixed(2) },
      { k: 'x3', label: 'EBIT ÷ total assets', min: -0.15, max: 0.3, step: 0.01, value: 0.1, fmt: v => v.toFixed(2) },
      { k: 'x4', label: 'Market value of equity ÷ total liabilities', min: 0.1, max: 4, step: 0.05, value: 1.2, fmt: v => v.toFixed(2) },
      { k: 'x5', label: 'Sales ÷ total assets', min: 0.2, max: 3, step: 0.05, value: 1.1, fmt: v => v.toFixed(2) }
    ];
    const ui = shell(el, specs);
    bind(el, specs, v => {
      const c = [1.2 * v.x1, 1.4 * v.x2, 3.3 * v.x3, 0.6 * v.x4, 1.0 * v.x5], z = c.reduce((a, b) => a + b, 0);
      const zone = z > 2.99 ? 'Safe zone' : z < 1.81 ? 'Distress zone' : 'Grey zone';
      ui.stats.innerHTML = statTiles([['1.2 × X1', c[0].toFixed(2)], ['1.4 × X2', c[1].toFixed(2)], ['3.3 × X3', c[2].toFixed(2)], ['0.6 × X4', c[3].toFixed(2)], ['1.0 × X5', c[4].toFixed(2)], ['Z-score', z.toFixed(2)], ['Zone', zone]]);
      ui.note.innerHTML = 'Original 1968 model for public manufacturers: Z = 1.2X<sub>1</sub> + 1.4X<sub>2</sub> + 3.3X<sub>3</sub> + 0.6X<sub>4</sub> + 1.0X<sub>5</sub>; above 2.99 "safe", below 1.81 "distress". Profitability (X<sub>3</sub>) carries the largest weight. Later variants exist for private firms and non-manufacturers, and the cut-offs are dated, so treat this as a teaching tool, not a rating.';
    });
  };

  /* ---------- Math basics: the bell curve and N(z) ---------- */
  W.normal = function (el) {
    const specs = [
      { k: 'mu', label: 'Typical (average) yearly return', min: -5, max: 15, step: 0.5, value: 7, fmt: v => pct(v) },
      { k: 'sd', label: 'Typical swing (standard deviation)', min: 5, max: 30, step: 0.5, value: 15, fmt: v => pct(v) },
      { k: 'x', label: 'Threshold you care about', min: -40, max: 50, step: 1, value: 0, fmt: v => pct(v, 0) }
    ];
    const ui = shell(el, specs);
    const mbox = mathBox(ui, 'Show the math: turning a threshold into a probability');
    bind(el, specs, v => {
      const z = (v.x - v.mu) / v.sd, p = N(z), lo = v.mu - 4 * v.sd, hi = v.mu + 4 * v.sd;
      const pdf = t => Math.exp(-0.5 * Math.pow((t - v.mu) / v.sd, 2)) / (v.sd * Math.sqrt(2 * Math.PI));
      const pts = [], tail = [];
      for (let i = 0; i <= 160; i++) { const t = lo + i * (hi - lo) / 160; pts.push([t, pdf(t)]); if (t <= v.x) tail.push([t, pdf(t)]); }
      if (tail.length) tail.push([Math.min(v.x, hi), pdf(Math.min(v.x, hi))]);
      const series = [{ pts, color: 'var(--c1)', w: 2.5 }];
      if (tail.length > 1) series.push({ pts: tail, color: 'var(--c2)', w: 1, fill: 'var(--c2)' });
      const inRange = v.x >= lo && v.x <= hi;
      ui.chart.innerHTML = lineChart({
        title: 'Bell curve of yearly returns', x: [lo, hi], y: [0, pdf(v.mu) * 1.1], xFmt: t => Math.round(t) + '%', yFmt: () => '', xLabel: 'Yearly return', yLabel: 'How common',
        series, points: inRange ? [{ x: v.x, y: pdf(v.x), color: 'var(--c2)', r: 5, label: `threshold ${pct(v.x, 0)}` }] : [],
        legend: [{ color: 'var(--c2)', label: `Shaded area = chance the return ends up below ${pct(v.x, 0)}` }]
      });
      ui.stats.innerHTML = statTiles([['z-score (how many swings away)', z.toFixed(2)], ['N(z): chance of ending below', pct(p * 100, 1)], ['Chance of ending above', pct((1 - p) * 100, 1)], ['About 68% of years land in', `${pct(v.mu - v.sd, 0)} to ${pct(v.mu + v.sd, 0)}`]]);
      mbox.innerHTML = stepRows([
        ['1. Distance from typical: threshold − average', `${pct(v.x, 1)} − ${pct(v.mu, 1)} = ${pct(v.x - v.mu, 1)}`],
        ['2. Measure it in "typical swings": z = distance ÷ standard deviation', `${(v.x - v.mu).toFixed(1)} ÷ ${v.sd.toFixed(1)} = ${z.toFixed(2)}`],
        ['3. Look up N(z): the area to the left of z under the bell curve', pct(p * 100, 1), true]
      ]) + '<p class="wnote">This is exactly how Black–Scholes uses <b>N(d₁)</b> and <b>N(d₂)</b>: d is a z-score, N(d) turns it into a probability-style weight between 0 and 1.</p>';
      ui.note.innerHTML = 'Try threshold = 0% with the defaults: it shows the chance of a losing year, about one in three, even though the average is +7%. Move the threshold to the average and N(z) = 50%. Push it two swings above and N(z) is about 98%.';
    });
  };

  /* =====================================================================
     Fixed income widgets (US-style bonds: semiannual coupons unless noted)
     ===================================================================== */

  // Price of a bond per `face`: coupon rate, yield y, n periods, redemption value (all rates as decimals per year)
  const priceN = (cpn, y, n, red, m, face) => {
    m = m || 2; face = face == null ? 100 : face; red = red == null ? face : red;
    const c = face * cpn / m, i = y / m;
    if (Math.abs(i) < 1e-14) return c * n + red;
    return c * (1 - Math.pow(1 + i, -n)) / i + red * Math.pow(1 + i, -n);
  };
  // Yield (bond-equivalent, per year) that makes the bond's price equal P; bisection because price falls as yield rises
  const solveYield = (P, cpn, n, red) => {
    let lo = -0.2, hi = 1.5;
    for (let k = 0; k < 120; k++) { const mid = (lo + hi) / 2; if (priceN(cpn, mid, n, red) > P) lo = mid; else hi = mid; }
    return (lo + hi) / 2;
  };
  // Macaulay duration, modified duration (years) and convexity (years²) for a 100-face bond
  const durStats = (cpn, y, yrs, m) => {
    m = m || 2; const n = Math.round(yrs * m), i = y / m, c = 100 * cpn / m;
    let P = 0, sd = 0, sc = 0;
    for (let t = 1; t <= n; t++) { const pv = (c + (t === n ? 100 : 0)) / Math.pow(1 + i, t); P += pv; sd += t * pv; sc += t * (t + 1) * pv / ((1 + i) * (1 + i)); }
    const mac = sd / P / m;
    return { P, mac, mod: mac / (1 + i), cvx: sc / P / (m * m) };
  };

  /* ---------- 21. Bond pricing ---------- */
  W.bondprice = function (el) {
    const money2 = v => '$' + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const specs = [
      { k: 'cpn', label: 'Coupon rate', min: 0, max: 12, step: 0.25, value: 5, fmt: v => pct(v, 2) },
      { k: 'y', label: 'Yield to maturity', min: 0.5, max: 14, step: 0.25, value: 4, fmt: v => pct(v, 2) },
      { k: 'yrs', label: 'Years to maturity', min: 1, max: 30, step: 1, value: 10 }
    ];
    const ui = shell(el, specs);
    const mbox = mathBox(ui, 'Show the math: pricing the bond step by step');
    bind(el, specs, v => {
      const face = 1000, n = v.yrs * 2, i = v.y / 200, c = face * v.cpn / 200;
      const price = priceN(v.cpn / 100, v.y / 100, n, face, 2, face);
      const pvC = Math.abs(i) < 1e-12 ? c * n : c * (1 - Math.pow(1 + i, -n)) / i, pvF = face * Math.pow(1 + i, -n);
      const pts = []; let hiP = 0;
      for (let yy = 0; yy <= 14.001; yy += 0.25) { const p = priceN(v.cpn / 100, yy / 100, n, face, 2, face); pts.push([yy, p]); hiP = Math.max(hiP, p); }
      ui.chart.innerHTML = lineChart({
        title: 'Bond price versus yield', x: [0, 14], y: [0, Math.max(hiP, 1100) * 1.05], xFmt: t => t + '%', yFmt: t => '$' + Math.round(t), xLabel: 'Yield to maturity', yLabel: 'Price (per $1,000 face)',
        series: [{ pts: [[0, face], [14, face]], color: 'var(--c4)', dash: true, w: 2 }, { pts, color: 'var(--c1)', w: 3 }],
        points: [{ x: v.y, y: price, color: 'var(--c2)', r: 7, label: money2(price) }],
        legend: [{ color: 'var(--c1)', label: 'Price at each yield' }, { color: 'var(--c4)', label: 'Par ($1,000)', dash: true }]
      });
      const status = Math.abs(price - face) < 0.5 ? 'at par' : price > face ? 'at a premium' : 'at a discount';
      ui.stats.innerHTML = statTiles([['Price', money2(price)], ['Trades', status], ['Current yield (coupon ÷ price)', pct(c * 2 / price * 100, 2)], ['PV of the coupons', money2(pvC)], ['PV of the face value', money2(pvF)]]);
      mbox.innerHTML = stepRows([
        ['1. Number of half-year periods: n = years × 2', String(n)],
        ['2. Yield per half-year: i = yield ÷ 2', pct(v.y / 2, 3)],
        ['3. Coupon per half-year: face × coupon rate ÷ 2', money2(c)],
        ['4. PV of the coupons: C × [1 − (1 + i)<sup>−n</sup>] ÷ i', pvC.toFixed(2)],
        ['5. PV of the face value: F ÷ (1 + i)<sup>n</sup>', pvF.toFixed(2)],
        ['Price = step 4 + step 5', money2(price), true]
      ]);
      ui.note.innerHTML = 'Coupon above the yield → the bond sells above par (a <b>premium</b>); coupon below the yield → below par (a <b>discount</b>); equal → at par. Slide the yield up and the price falls along a curve, not a straight line: that curvature is <b>convexity</b> (see the duration lesson).';
    });
  };

  /* ---------- 22. Yield to maturity, yield to call, yield to worst ---------- */
  W.ytw = function (el) {
    const specs = [
      { k: 'P', label: 'Price (per 100 of face)', min: 80, max: 130, step: 0.25, value: 105, fmt: v => v.toFixed(2) },
      { k: 'cpn', label: 'Coupon rate', min: 0, max: 12, step: 0.25, value: 6, fmt: v => pct(v, 2) },
      { k: 'yrs', label: 'Years to maturity', min: 2, max: 30, step: 1, value: 10 },
      { k: 'cy', label: 'First call date (years from now)', min: 1, max: 29, step: 1, value: 5 },
      { k: 'cp', label: 'Call price', min: 100, max: 110, step: 0.5, value: 102, fmt: v => v.toFixed(1) }
    ];
    const ui = shell(el, specs);
    bind(el, specs, v => {
      const cpn = v.cpn / 100, cy = Math.min(v.cy, v.yrs - 1), nM = v.yrs * 2, nC = cy * 2;
      const ytm = solveYield(v.P, cpn, nM, 100), ytc = solveYield(v.P, cpn, nC, v.cp), ytw = Math.min(ytm, ytc);
      const a = [], b = []; let lo = 1e9, hi = -1e9;
      for (let p = 80; p <= 130.001; p += 1) { const m1 = solveYield(p, cpn, nM, 100) * 100, c1 = solveYield(p, cpn, nC, v.cp) * 100; a.push([p, m1]); b.push([p, c1]); lo = Math.min(lo, m1, c1); hi = Math.max(hi, m1, c1); }
      ui.chart.innerHTML = lineChart({
        title: 'Yield to maturity versus yield to call', x: [80, 130], y: [Math.floor(lo - 0.5), Math.ceil(hi + 0.5)], xFmt: t => t, yFmt: t => t + '%', xLabel: 'Price (per 100 of face)', yLabel: 'Yield',
        series: [{ pts: a, color: 'var(--c1)', w: 3 }, { pts: b, color: 'var(--c2)', w: 3 }],
        points: [{ x: v.P, y: ytm * 100, color: 'var(--c1)', r: 6 }, { x: v.P, y: ytc * 100, color: 'var(--c2)', r: 6 }],
        legend: [{ color: 'var(--c1)', label: 'Yield to maturity' }, { color: 'var(--c2)', label: 'Yield to call' }]
      });
      const shortcut = (v.cpn + (100 - v.P) / v.yrs) / ((100 + v.P) / 2) * 100;
      ui.stats.innerHTML = statTiles([['Current yield', pct(v.cpn / v.P * 100, 2)], ['Yield to maturity', pct(ytm * 100, 2)], ['Effective annual yield', pct(((1 + ytm / 2) * (1 + ytm / 2) - 1) * 100, 2)], ['Yield to call', pct(ytc * 100, 2)], ['Yield to worst', pct(ytw * 100, 2)], ['Quick shortcut for YTM', pct(shortcut, 2)]]);
      ui.note.innerHTML = (ytc < ytm ? '<b>Yield to worst = yield to call.</b> ' : '<b>Yield to worst = yield to maturity.</b> ') + 'When a callable bond trades above its call price, holders lose the most if it is called early, so the conservative yield to quote is the yield to call. Try lowering the price below the call price: yield to call rises above yield to maturity and the bond is unlikely to be called. The shortcut is (C + (F − P) ÷ N) ÷ ((F + P) ÷ 2): quick, but only approximate.';
    });
  };

  /* ---------- 23. Duration and convexity ---------- */
  W.durconv = function (el) {
    const specs = [
      { k: 'cpn', label: 'Coupon rate', min: 0, max: 10, step: 0.25, value: 5, fmt: v => pct(v, 2) },
      { k: 'yrs', label: 'Years to maturity', min: 1, max: 30, step: 1, value: 10 },
      { k: 'y', label: 'Starting yield', min: 0.5, max: 12, step: 0.25, value: 5, fmt: v => pct(v, 2) },
      { k: 'dy', label: 'Yield change (percentage points)', min: -3, max: 3, step: 0.25, value: 1, fmt: v => (v > 0 ? '+' : '') + v.toFixed(2) }
    ];
    const ui = shell(el, specs);
    const mbox = mathBox(ui, 'Show the math: exact change versus the duration estimates');
    bind(el, specs, v => {
      const n = v.yrs * 2, cpn = v.cpn / 100, y0 = v.y / 100, s = durStats(cpn, y0, v.yrs), P0 = s.P;
      const P1 = priceN(cpn, y0 + v.dy / 100, n, 100), dy = v.dy / 100;
      const est1 = -s.mod * dy, est2 = est1 + 0.5 * s.cvx * dy * dy, actual = P1 / P0 - 1;
      const xa = Math.max(0.25, v.y - 4), xb = v.y + 4, curve = [], tan = [], quad = [];
      for (let k = 0; k <= 80; k++) {
        const yy = xa + k * (xb - xa) / 80, d = (yy - v.y) / 100;
        curve.push([yy, priceN(cpn, yy / 100, n, 100)]); tan.push([yy, P0 * (1 - s.mod * d)]); quad.push([yy, P0 * (1 - s.mod * d + 0.5 * s.cvx * d * d)]);
      }
      const all = curve.map(p => p[1]).concat(tan.map(p => p[1]));
      ui.chart.innerHTML = lineChart({
        title: 'Price versus yield with duration approximations', x: [xa, xb], y: [Math.floor(Math.min(...all) / 10) * 10, Math.ceil(Math.max(...all) / 10) * 10], xFmt: t => t.toFixed(1) + '%', yFmt: t => Math.round(t), xLabel: 'Yield', yLabel: 'Price (per 100 of face)',
        series: [{ pts: tan, color: 'var(--c3)', dash: true, w: 2 }, { pts: quad, color: 'var(--c2)', dash: true, w: 2 }, { pts: curve, color: 'var(--c1)', w: 3 }],
        points: [{ x: v.y, y: P0, color: 'var(--ink)', r: 6 }, { x: v.y + v.dy, y: P1, color: 'var(--c1)', r: 6 }],
        legend: [{ color: 'var(--c1)', label: 'Actual price' }, { color: 'var(--c3)', label: 'Duration only (straight line)', dash: true }, { color: 'var(--c2)', label: 'Duration + convexity', dash: true }]
      });
      ui.stats.innerHTML = statTiles([['Macaulay duration', s.mac.toFixed(2) + ' yrs'], ['Modified duration', s.mod.toFixed(2)], ['Convexity', s.cvx.toFixed(1)], ['Actual price change', pct(actual * 100, 2)], ['Duration-only estimate', pct(est1 * 100, 2)], ['Duration + convexity estimate', pct(est2 * 100, 2)]]);
      mbox.innerHTML = stepRows([
        ['1. Modified duration D<sub>mod</sub>', s.mod.toFixed(3)],
        ['2. Duration effect: −D<sub>mod</sub> × Δy', `−${s.mod.toFixed(3)} × ${dy.toFixed(4)} = ${pct(est1 * 100, 3)}`],
        ['3. Convexity effect: ½ × C × (Δy)²', `½ × ${s.cvx.toFixed(1)} × ${(dy * dy).toFixed(6)} = ${pct(0.5 * s.cvx * dy * dy * 100, 3)}`],
        ['4. Estimate = step 2 + step 3', pct(est2 * 100, 3), true],
        ['Exact price change (reprice the bond)', pct(actual * 100, 3)]
      ]) + '<p class="wnote">Duration alone is a straight-line (tangent) estimate. Because the true price curve bends upward (convexity), it overstates losses when yields rise and understates gains when yields fall. The convexity term fixes most of that error.</p>';
      ui.note.innerHTML = 'Try a zero-coupon bond (coupon 0%): its Macaulay duration equals its maturity exactly. Then raise the coupon: duration falls. Lengthen the maturity: duration and convexity both rise.';
    });
  };

  /* ---------- 24. Spot and forward rates ---------- */
  W.fwd = function (el) {
    const dflt = [3, 3.5, 3.9, 4.2, 4.4];
    const specs = dflt.map((d, i) => ({ k: 's' + (i + 1), label: (i + 1) + '-year spot rate', min: 0, max: 8, step: 0.05, value: d, fmt: v => pct(v, 2) }));
    const ui = shell(el, specs);
    const mbox = mathBox(ui, 'Show the math: how each forward rate is derived');
    bind(el, specs, v => {
      const s = [v.s1, v.s2, v.s3, v.s4, v.s5].map(x => x / 100), f = [s[0]], rows = [];
      for (let n = 2; n <= 5; n++) {
        const g = Math.pow(1 + s[n - 1], n) / Math.pow(1 + s[n - 2], n - 1) - 1; f.push(g);
        rows.push([`Forward rate from year ${n - 1} to ${n}: (1 + ${pct(s[n - 1] * 100, 2)})<sup>${n}</sup> ÷ (1 + ${pct(s[n - 2] * 100, 2)})<sup>${n - 1}</sup> − 1`, pct(g * 100, 2)]);
      }
      mbox.innerHTML = stepRows(rows) + '<p class="wnote">Idea: investing for n years at the n-year spot rate must give the same result as investing for n−1 years at the (n−1)-year spot rate and then locking in the forward rate for the last year. Otherwise there would be a risk-free profit.</p>';
      const hi = Math.max(...s, ...f) * 100;
      ui.chart.innerHTML = lineChart({
        title: 'Spot rates and one-year forward rates', x: [1, 5], y: [0, Math.ceil(hi + 1)], xTicks: [1, 2, 3, 4, 5].map(t => ({ v: t, label: t + 'y' })), yFmt: t => t + '%', xLabel: 'Maturity (spot) / year of the forward period (forward)', yLabel: 'Rate',
        series: [{ pts: f.map((x, i) => [i + 1, x * 100]), color: 'var(--c2)', dash: true, w: 2.5 }, { pts: s.map((x, i) => [i + 1, x * 100]), color: 'var(--c1)', w: 3 }],
        points: s.map((x, i) => ({ x: i + 1, y: x * 100, color: 'var(--c1)', r: 4 })),
        legend: [{ color: 'var(--c1)', label: 'Spot rate for that maturity' }, { color: 'var(--c2)', label: 'One-year forward rate for that year', dash: true }]
      });
      ui.stats.innerHTML = statTiles([['Forward, year 1 → 2', pct(f[1] * 100, 2)], ['Forward, year 2 → 3', pct(f[2] * 100, 2)], ['Forward, year 3 → 4', pct(f[3] * 100, 2)], ['Forward, year 4 → 5', pct(f[4] * 100, 2)], ['Price of a 5-year zero (per 100)', (100 / Math.pow(1 + s[4], 5)).toFixed(2)]]);
      ui.note.innerHTML = 'When the spot curve slopes <b>up</b>, forward rates sit <b>above</b> the spot rates; when it slopes down, forwards sit below. A forward rate is what the curve "locks in" for a future year. Under the pure expectations theory it would equal the expected future spot rate; in practice forwards also contain risk premia.';
    });
  };

  /* ---------- 25. Credit spreads ---------- */
  W.credit = function (el) {
    const specs = [
      { k: 'rf', label: 'Risk-free rate', min: 0, max: 8, step: 0.25, value: 4, fmt: v => pct(v, 2) },
      { k: 'lam', label: 'Default intensity (per year)', min: 0, max: 15, step: 0.25, value: 2, fmt: v => pct(v, 2) },
      { k: 'R', label: 'Recovery rate (share of face recovered)', min: 0, max: 80, step: 5, value: 40, fmt: v => v + '%' },
      { k: 'T', label: 'Maturity (years)', min: 1, max: 10, step: 1, value: 5 }
    ];
    const ui = shell(el, specs);
    // zero-coupon bond, constant default intensity, recovery paid at maturity: price = e^(-rT) [ S + R(1-S) ], S = e^(-lam T)
    const spreadBp = (rf, lam, R, T) => { const S = Math.exp(-lam * T), P = Math.exp(-rf * T) * (S + R * (1 - S)); return (-Math.log(P) / T - rf) * 1e4; };
    bind(el, specs, v => {
      const rf = v.rf / 100, lam = v.lam / 100, R = v.R / 100, S = Math.exp(-lam * v.T), Pf = Math.exp(-rf * v.T), Pr = Pf * (S + R * (1 - S));
      const spr = spreadBp(rf, lam, R, v.T), apx = lam * (1 - R) * 1e4;
      const a = [], b = [];
      for (let l = 0; l <= 15.001; l += 0.5) { a.push([l, spreadBp(rf, l / 100, R, v.T)]); b.push([l, spreadBp(rf, l / 100, 0, v.T)]); }
      ui.chart.innerHTML = lineChart({
        title: 'Credit spread versus default intensity', x: [0, 15], y: [0, Math.max(...b.map(p => p[1])) * 1.05], xFmt: t => t + '%', yFmt: t => Math.round(t), xLabel: 'Default intensity (per year)', yLabel: 'Credit spread (basis points)',
        series: [{ pts: b, color: 'var(--c2)', dash: true, w: 2 }, { pts: a, color: 'var(--c1)', w: 3 }],
        points: [{ x: v.lam, y: spr, color: 'var(--ink)', r: 6 }],
        legend: [{ color: 'var(--c1)', label: `With ${v.R}% recovery` }, { color: 'var(--c2)', label: 'With zero recovery', dash: true }]
      });
      ui.stats.innerHTML = statTiles([['Risk-free bond price (per 100)', (Pf * 100).toFixed(2)], ['Risky bond price (per 100)', (Pr * 100).toFixed(2)], ['Credit spread (exact)', spr.toFixed(0) + ' bp'], ['Rule of thumb: intensity × (1 − recovery)', apx.toFixed(0) + ' bp'], ['Chance of default before maturity', pct((1 - S) * 100, 1)], ['Expected loss over the life', pct((1 - S) * (1 - R) * 100, 2)]]);
      ui.note.innerHTML = 'A zero-coupon bond, a constant default intensity and recovery paid at maturity. The spread is close to <b>intensity × loss given default</b> (1 − recovery). Real-world spreads are usually <em>larger</em> than the losses actually expected from defaults: they also pay for risk, taxes and illiquidity (see the Elton et al. paper). 1 basis point (bp) = 0.01%.';
    });
  };

  /* ---------- 26. Inflation-linked bonds: breakeven ---------- */
  W.tips = function (el) {
    const specs = [
      { k: 'n', label: 'Nominal Treasury yield', min: 0, max: 8, step: 0.05, value: 4, fmt: v => pct(v, 2) },
      { k: 'r', label: 'TIPS (real) yield', min: -1, max: 4, step: 0.05, value: 1.5, fmt: v => pct(v, 2) },
      { k: 'pi', label: 'Actual average inflation over the period', min: -2, max: 8, step: 0.25, value: 3, fmt: v => pct(v, 2) },
      { k: 'T', label: 'Years held', min: 1, max: 30, step: 1, value: 10 }
    ];
    const ui = shell(el, specs);
    bind(el, specs, v => {
      const n = v.n / 100, r = v.r / 100, pi = v.pi / 100, be = (1 + n) / (1 + r) - 1, tipsRet = (1 + r) * (1 + pi) - 1;
      const pts = []; for (let p = -2; p <= 8.001; p += 0.25) pts.push([p, ((1 + r) * (1 + p / 100) - 1) * 100]);
      const nom = 10000 * Math.pow(1 + n, v.T), tp = 10000 * Math.pow(1 + tipsRet, v.T);
      ui.chart.innerHTML = lineChart({
        title: 'Yearly return: nominal bond versus inflation-linked bond', x: [-2, 8], y: [Math.min(0, ...pts.map(p => p[1])) - 0.5, Math.max(...pts.map(p => p[1]), v.n) + 0.5], xFmt: t => t + '%', yFmt: t => t + '%', xLabel: 'Actual inflation', yLabel: 'Return per year',
        series: [{ pts: [[-2, v.n], [8, v.n]], color: 'var(--c3)', w: 3 }, { pts, color: 'var(--c1)', w: 3 }],
        points: [{ x: be * 100, y: v.n, color: 'var(--c2)', r: 6, label: `breakeven ${pct(be * 100, 2)}` }, { x: v.pi, y: tipsRet * 100, color: 'var(--ink)', r: 5 }],
        legend: [{ color: 'var(--c3)', label: 'Nominal bond (fixed return)' }, { color: 'var(--c1)', label: 'Inflation-linked bond (real yield + inflation)' }]
      });
      ui.stats.innerHTML = statTiles([['Breakeven inflation (exact)', pct(be * 100, 2)], ['Nominal yield − real yield', pct((n - r) * 100, 2)], ['Winner at this inflation', pi > be ? 'Inflation-linked' : pi < be ? 'Nominal bond' : 'Tie'], [`$10,000 in the nominal bond after ${v.T}y`, money(nom)], [`$10,000 in the inflation-linked bond`, money(tp)]]);
      ui.note.innerHTML = 'Breakeven inflation is the average inflation at which the two bonds pay the same. Above it the inflation-linked bond wins; below it the nominal bond wins. Breakeven is not a pure forecast: it also contains an inflation-risk premium and liquidity effects. (Simplified: real TIPS also pay a fixed real coupon on the inflation-adjusted principal and, at maturity, return at least the original principal.)';
    });
  };

  /* ---------- 27. Immunization ---------- */
  W.immun = function (el) {
    const specs = [
      { k: 'H', label: 'Liability due in (years)', min: 3, max: 15, step: 1, value: 8 },
      { k: 'y', label: 'Yield when you buy', min: 2, max: 10, step: 0.25, value: 5, fmt: v => pct(v, 2) },
      { k: 'cpn', label: 'Bond coupon rate (annual pay)', min: 0, max: 10, step: 0.25, value: 5, fmt: v => pct(v, 2) },
      { k: 'M', label: 'Bond maturity (years)', min: 1, max: 30, step: 1, value: 10 },
      { k: 'dy', label: 'Yield shift right after you buy', min: -3, max: 3, step: 0.25, value: 1, fmt: v => (v > 0 ? '+' : '') + v.toFixed(2) }
    ];
    const ui = shell(el, specs);
    // Annual coupons. Value at the horizon of one 100-face bond after an instant yield shift: coupons up to H are reinvested at the new
    // yield; cash flows after H are valued at the new yield (that's the price you'd sell for).
    const term = (cpn, M, H, yp) => { let T = 0; for (let t = 1; t <= M; t++) { const cf = cpn + (t === M ? 100 : 0); T += t <= H ? cf * Math.pow(1 + yp, H - t) : cf / Math.pow(1 + yp, t - H); } return T; };
    const P0f = (cpn, M, y) => { let p = 0; for (let t = 1; t <= M; t++) p += (cpn + (t === M ? 100 : 0)) / Math.pow(1 + y, t); return p; };
    bind(el, specs, v => {
      const y0 = v.y / 100, P0 = P0f(v.cpn, v.M, y0), target = P0 * Math.pow(1 + y0, v.H);
      let dNum = 0; for (let t = 1; t <= v.M; t++) dNum += t * (v.cpn + (t === v.M ? 100 : 0)) / Math.pow(1 + y0, t);
      const D = dNum / P0, pts = []; let worst = 0;
      for (let d = -3; d <= 3.001; d += 0.25) { const r = (term(v.cpn, v.M, v.H, y0 + d / 100) / target - 1) * 100; pts.push([d, r]); if (Math.abs(r) > Math.abs(worst)) worst = r; }
      const now = (term(v.cpn, v.M, v.H, y0 + v.dy / 100) / target - 1) * 100;
      const span = Math.max(1, ...pts.map(p => Math.abs(p[1]))) * 1.1;
      ui.chart.innerHTML = lineChart({
        title: 'Value at the liability date compared with the target', x: [-3, 3], y: [-span, span], xFmt: t => (t > 0 ? '+' : '') + t + '%', yFmt: t => (t > 0 ? '+' : '') + Math.round(t * 10) / 10 + '%', xLabel: 'Yield shift right after purchase', yLabel: 'Surplus (+) or shortfall (−) versus target',
        series: [{ pts: [[-3, 0], [3, 0]], color: 'var(--c4)', dash: true, w: 2 }, { pts, color: 'var(--c1)', w: 3 }],
        points: [{ x: v.dy, y: now, color: 'var(--c2)', r: 6 }],
        legend: [{ color: 'var(--c1)', label: `Your bond (maturity ${v.M}y)` }, { color: 'var(--c4)', label: 'Zero-coupon bond maturing on the liability date (no risk)', dash: true }]
      });
      ui.stats.innerHTML = statTiles([['Bond\'s Macaulay duration', D.toFixed(2) + ' yrs'], ['Liability horizon', v.H + ' yrs'], ['Result at chosen shift', (now >= 0 ? '+' : '') + pct(now, 2)], ['Largest miss across ±3 points', (worst >= 0 ? '+' : '') + pct(worst, 2)]]);
      ui.note.innerHTML = Math.abs(D - v.H) < 0.6
        ? '<b>Duration ≈ horizon, so the portfolio is nearly immunized:</b> if yields jump, the fall in the bond\'s price and the gain from reinvesting coupons at higher rates roughly cancel by the liability date (and the reverse when yields fall).'
        : 'Duration (' + D.toFixed(1) + ') is far from the horizon (' + v.H + '), so the two effects don\'t cancel: ' + (D > v.H ? 'price risk dominates (a yield rise hurts)' : 'reinvestment effects dominate (a yield rise helps)') + '. Try changing the maturity until the duration matches the horizon.';
    });
  };

  window.WIDGETS = W;
})();

