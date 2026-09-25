/* Shared UI kit for every R357 Education course: number formats, SVG line charts, slider controls,
   "show the math" panels and normal-distribution helpers. Courses import it from window.R357.ui. */
(function () {
  'use strict';

  const money = v => (v < -0.5 ? '−$' : '$') + Math.abs(Math.round(v)).toLocaleString('en-US');
  const moneyShort = v => v >= 1e6 ? '$' + (v / 1e6).toFixed(v >= 1e7 ? 0 : 1) + 'M' : v >= 1e3 ? '$' + Math.round(v / 1e3) + 'k' : '$' + Math.round(v);
  const pct = (v, d) => v.toFixed(d == null ? 1 : d) + '%';
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  function niceTicks(min, max, n) {
    const span = max - min; if (!(span > 0)) return [min];
    const step0 = span / (n || 5), mag = Math.pow(10, Math.floor(Math.log10(step0))), norm = step0 / mag;
    const step = (norm < 1.5 ? 1 : norm < 3 ? 2 : norm < 7 ? 5 : 10) * mag;
    const out = [];
    for (let v = Math.ceil(min / step - 1e-9) * step; v <= max + 1e-9; v += step) out.push(+v.toFixed(10));
    return out;
  }

  /* Line chart -> SVG string. Colors are CSS variables so light/dark both work. */
  function lineChart(o) {
    const W = 680, H = o.h || 340, m = { l: 58, r: 22, t: 14, b: 50 };
    const iw = W - m.l - m.r, ih = H - m.t - m.b;
    const [x0, x1] = o.x, [y0, y1] = o.y;
    const sx = v => m.l + (v - x0) / (x1 - x0) * iw;
    const sy = v => m.t + ih - (v - y0) / (y1 - y0) * ih;
    const xt = o.xTicks || niceTicks(x0, x1, 6).map(v => ({ v, label: (o.xFmt || String)(v) }));
    const yt = niceTicks(y0, y1, 5).map(v => ({ v, label: (o.yFmt || String)(v) }));
    const id = 'c' + Math.random().toString(36).slice(2, 8);
    let s = `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${o.title || 'Chart'}"><defs><clipPath id="${id}"><rect x="${m.l}" y="${m.t}" width="${iw}" height="${ih}"/></clipPath></defs>`;
    yt.forEach(t => { s += `<line class="gridline" x1="${m.l}" x2="${W - m.r}" y1="${sy(t.v)}" y2="${sy(t.v)}"/><text class="tick" x="${m.l - 8}" y="${sy(t.v) + 4}" text-anchor="end">${t.label}</text>`; });
    xt.forEach(t => { s += `<line class="tickmark" x1="${sx(t.v)}" x2="${sx(t.v)}" y1="${m.t + ih}" y2="${m.t + ih + 5}"/><text class="tick" x="${sx(t.v)}" y="${m.t + ih + 20}" text-anchor="middle">${t.label}</text>`; });
    if (y0 < 0 && y1 > 0) s += `<line class="zero" x1="${m.l}" x2="${W - m.r}" y1="${sy(0)}" y2="${sy(0)}"/>`;
    if (x0 < 0 && x1 > 0) s += `<line class="zero" x1="${sx(0)}" x2="${sx(0)}" y1="${m.t}" y2="${m.t + ih}"/>`;
    s += `<line class="axis" x1="${m.l}" x2="${W - m.r}" y1="${m.t + ih}" y2="${m.t + ih}"/><line class="axis" x1="${m.l}" x2="${m.l}" y1="${m.t}" y2="${m.t + ih}"/>`;
    if (o.xLabel) s += `<text class="axlabel" x="${m.l + iw / 2}" y="${H - 8}" text-anchor="middle">${o.xLabel}</text>`;
    if (o.yLabel) s += `<text class="axlabel" transform="translate(14 ${m.t + ih / 2}) rotate(-90)" text-anchor="middle">${o.yLabel}</text>`;
    (o.series || []).forEach(sr => {
      const d = sr.pts.map((p, i) => (i ? 'L' : 'M') + sx(p[0]).toFixed(1) + ' ' + sy(p[1]).toFixed(1)).join('');
      if (sr.fill) s += `<path d="${d}L${sx(sr.pts[sr.pts.length - 1][0]).toFixed(1)} ${sy(y0)}L${sx(sr.pts[0][0]).toFixed(1)} ${sy(y0)}Z" clip-path="url(#${id})" style="fill:${sr.fill};fill-opacity:.3;stroke:none"/>`;
      s += `<path d="${d}" fill="none" clip-path="url(#${id})" style="stroke:${sr.color};stroke-width:${sr.w || 2.5};stroke-opacity:${sr.op || 1}" ${sr.dash ? 'stroke-dasharray="6 5"' : ''} stroke-linejoin="round" stroke-linecap="round"/>`;
    });
    (o.points || []).forEach(p => {
      const cx = sx(p.x), cy = sy(p.y), right = cx < W - 140;
      s += `<circle cx="${cx}" cy="${cy}" r="${p.r || 6}" style="fill:${p.color};stroke:var(--surface);stroke-width:2"/>`;
      if (p.label) s += `<text class="ptlabel" x="${cx + (right ? 11 : -11)}" y="${cy - 9}" text-anchor="${right ? 'start' : 'end'}">${p.label}</text>`;
    });
    s += '</svg>';
    if (o.legend) s += '<div class="legend">' + o.legend.map(l => `<span><i style="background:${l.color};${l.dash ? 'background:repeating-linear-gradient(90deg,' + l.color + ' 0 5px,transparent 5px 9px)' : ''}"></i>${l.label}</span>`).join('') + '</div>';
    return s;
  }

  const statTiles = arr => '<div class="stats">' + arr.map(s => `<div class="stat"><span>${s[0]}</span><b>${s[1]}</b></div>`).join('') + '</div>';

  function controlsHTML(specs) {
    return '<div class="controls">' + specs.map(s =>
      `<label class="ctl"><span class="ctl-l">${s.label}</span><input type="range" data-k="${s.k}" min="${s.min}" max="${s.max}" step="${s.step}" value="${s.value}"><output data-o="${s.k}"></output></label>`).join('') + '</div>';
  }
  function bind(el, specs, render) {
    const read = () => {
      const v = {};
      specs.forEach(s => {
        v[s.k] = parseFloat(el.querySelector(`[data-k="${s.k}"]`).value);
        el.querySelector(`[data-o="${s.k}"]`).textContent = s.fmt ? s.fmt(v[s.k]) : v[s.k];
      });
      return v;
    };
    const upd = () => render(read());
    el.querySelectorAll('input[type=range]').forEach(i => i.addEventListener('input', upd));
    upd();
    return upd;
  }
  const shell = (el, specs, extra) => {
    el.innerHTML = controlsHTML(specs) + '<div class="chartbox"></div>' + (extra || '') + '<div class="statbox"></div><p class="wnote"></p>';
    return { chart: el.querySelector('.chartbox'), stats: el.querySelector('.statbox'), note: el.querySelector('.wnote') };
  };

  // Collapsible "show the math" panel that widgets fill with live numbers
  const mathBox = (ui, title) => {
    ui.note.insertAdjacentHTML('beforebegin', `<details class="math"><summary>${title || 'Show the math step by step'}</summary><div class="mbody"></div></details>`);
    return ui.note.previousElementSibling.querySelector('.mbody');
  };
  const stepRows = rows => '<table class="steps">' + rows.map(r => `<tr${r[2] ? ' class="tot"' : ''}><td>${r[0]}</td><td>${r[1]}</td></tr>`).join('') + '</table>';

  // Standard normal helpers
  function erf(x) { // Abramowitz & Stegun 7.1.26
    const s = x < 0 ? -1 : 1; x = Math.abs(x);
    const t = 1 / (1 + 0.3275911 * x);
    const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
    return s * y;
  }
  const N = x => 0.5 * (1 + erf(x / Math.SQRT2));
  const randn = () => { let u = 0, v = 0; while (!u) u = Math.random(); while (!v) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };

  window.R357 = window.R357 || {};
  window.R357.ui = { money, moneyShort, pct, clamp, niceTicks, lineChart, statTiles, controlsHTML, bind, shell, mathBox, stepRows, erf, N, randn };
})();
