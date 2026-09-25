(function () {
  'use strict';

  /* ---------- data ---------- */
  const TRACKS = [
    { name: 'Foundations', desc: 'Discounting, risk, and the first equilibrium model of asset prices.', ids: ['reading-papers', 'math-basics', 'tvm', 'risk', 'p-markowitz', 'capm', 'p-sharpe'] },
    { name: 'Are markets efficient?', desc: 'From random walks to factors to psychology: the central debate of modern finance.', ids: ['emh', 'p-fama70', 'p-shiller', 'p-ff93', 'behav', 'p-kt79'] },
    { name: 'Portfolio management', desc: 'Allocation, performance measurement, fees, tail risk and the process of running a portfolio.', ids: ['pm-cal', 'pm-perf', 'p-jensen68', 'pm-fees', 'p-sharpe91', 'pm-risk', 'pm-ips', 'p-bhb86'] },
    { name: 'Financial statement analysis', desc: 'Read the statements, decompose returns, judge earnings quality, and value the firm.', ids: ['fsa-statements', 'fsa-ratios', 'fsa-dupont', 'fsa-choices', 'fsa-quality', 'p-ballbrown68', 'p-sloan96', 'fsa-fcf', 'fsa-multiples', 'fsa-credit', 'p-altman68'] },
    { name: 'Firms and derivatives', desc: 'How financing choices and options are valued.', ids: ['capstruct', 'p-mm58', 'options', 'p-bs73'] },
    { name: 'Rates, banks and information', desc: 'The yield curve, hidden information, and why banks are fragile.', ids: ['rates', 'p-akerlof', 'p-dd83'] },
    { name: 'Fixed income', desc: 'Bond pricing and yields, duration and convexity, the term structure, credit risk, inflation-linked bonds and immunization.', ids: ['fi-basics', 'fi-yield', 'fi-duration', 'fi-term', 'p-litterman91', 'p-campbell91', 'p-estrella98', 'fi-credit', 'p-merton74', 'p-elton01', 'fi-tips', 'fi-immun', 'p-fisherweil71'] }
  ];
  const ORDER = [].concat.apply([], TRACKS.map(t => t.ids)); // path order = track order
  const LESSONS = window.LESSONS.slice().sort((a, b) => ORDER.indexOf(a.id) - ORDER.indexOf(b.id));
  const byId = {}; LESSONS.forEach(l => byId[l.id] = l);
  const TYPE_LABEL = { concept: 'Concept', paper: 'Paper', guide: 'Guide' };

  /* ---------- progress (localStorage with in-memory fallback) ---------- */
  const KEY = 'marginal.v1';
  let state = { done: {}, scores: {} };
  try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && s.done) state = s; } catch (e) { /* storage unavailable */ }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ } };
  const doneCount = () => LESSONS.filter(l => state.done[l.id]).length;

  /* ---------- theme ---------- */
  const root = document.documentElement;
  try { const t = localStorage.getItem('marginal.theme'); if (t) root.dataset.theme = t; } catch (e) { /* ignore */ }
  const isDark = () => root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  function toggleTheme() {
    const next = isDark() ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('marginal.theme', next); } catch (e) { /* ignore */ }
    syncThemeBtn();
  }
  function syncThemeBtn() { const b = document.getElementById('theme'); if (b) { b.setAttribute('aria-label', isDark() ? 'Switch to light theme' : 'Switch to dark theme'); b.textContent = isDark() ? '☀' : '☾'; } }

  /* ---------- small helpers ---------- */
  const app = document.getElementById('app');
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const nextUndone = () => LESSONS.find(l => !state.done[l.id]) || LESSONS[0];

  function card(l) {
    const done = state.done[l.id];
    const meta = l.type === 'paper' ? `${esc(l.authors)}, ${l.year}` : l.level;
    return `<a class="card ${l.type}" href="#/lesson/${l.id}">
      <div class="card-top"><span class="badge ${l.type}">${TYPE_LABEL[l.type]}</span>${done ? '<span class="check" title="Completed">✓ Done</span>' : ''}</div>
      <h3>${l.title}</h3><p>${l.blurb}</p>
      <div class="card-meta"><span>${meta}</span><span>${l.min} min</span></div></a>`;
  }

  /* ---------- views ---------- */
  function homeView() {
    const n = doneCount(), total = LESSONS.length, nxt = nextUndone(), started = n > 0;
    const pctDone = Math.round(n / total * 100);
    app.innerHTML = `
    <section class="hero">
      <p class="eyebrow">Marginal by R357 · Economics &amp; finance, from the sources</p>
      <h1>Learn the ideas.<br>Then read the papers behind them.</h1>
      <p class="lead">Concept lessons with interactive charts, plain-English breakdowns of landmark finance research, and quizzes to check that it stuck. Aimed at an intermediate reader who wants to understand how markets are actually modeled.</p>
      <div class="hero-cta">
        <a class="btn primary big" href="#/lesson/${nxt.id}">${started ? 'Continue: ' + esc(nxt.title.length > 38 ? nxt.title.slice(0, 36) + '…' : nxt.title) : 'Start with the first lesson'}</a>
        <a class="btn big" href="#/library">Browse everything</a>
      </div>
      <div class="progress" aria-label="Progress"><div class="bar"><i style="width:${pctDone}%"></i></div><span>${n} of ${total} complete</span></div>
    </section>
    ${TRACKS.map(t => `<section class="track"><div class="track-head"><h2>${t.name}</h2><p>${t.desc}</p></div><div class="grid">${t.ids.map(id => card(byId[id])).join('')}</div></section>`).join('')}
    <section class="howto"><h2>How each lesson works</h2><div class="three">
      <div><b>1. Learn the concept</b><p>Short lessons with the key equation and the intuition behind it.</p></div>
      <div><b>2. Play with it</b><p>Move the sliders and watch the model respond, so the formula becomes a shape you recognize.</p></div>
      <div><b>3. Read the source</b><p>Paper pages tell you what to look for, and what critics said afterwards, before you open the original.</p></div></div></section>`;
  }

  let libFilter = 'all', libQuery = '';
  function libraryView() {
    app.innerHTML = `<section class="page-head"><h1>Library</h1><p class="lead">${LESSONS.length} lessons and paper breakdowns.</p></section>
      <div class="toolbar"><div class="chips" role="tablist">${[['all', 'All'], ['concept', 'Concepts'], ['paper', 'Papers']].map(([k, n]) => `<button class="chip ${libFilter === k ? 'on' : ''}" data-f="${k}">${n}</button>`).join('')}</div>
      <input id="q" type="search" placeholder="Search titles, authors, topics…" value="${esc(libQuery)}" aria-label="Search"></div><div class="grid" id="libgrid"></div>`;
    const grid = document.getElementById('libgrid');
    const draw = () => {
      const q = libQuery.trim().toLowerCase();
      const list = LESSONS.filter(l => (libFilter === 'all' || l.type === libFilter || (libFilter === 'concept' && l.type === 'guide')) &&
        (!q || [l.title, l.blurb, l.authors || '', (l.tags || []).join(' ')].join(' ').toLowerCase().includes(q)));
      grid.innerHTML = list.length ? list.map(card).join('') : '<p class="empty">Nothing matches that search.</p>';
    };
    draw();
    app.querySelectorAll('.chip').forEach(c => c.addEventListener('click', () => { libFilter = c.dataset.f; app.querySelectorAll('.chip').forEach(x => x.classList.toggle('on', x === c)); draw(); }));
    document.getElementById('q').addEventListener('input', e => { libQuery = e.target.value; draw(); });
  }

  function glossaryView() {
    app.innerHTML = `<section class="page-head"><h1>Glossary</h1><p class="lead">Terms used across the lessons. Each links to where it's explained.</p></section>
      <div class="toolbar"><input id="gq" type="search" placeholder="Filter terms…" aria-label="Filter terms"></div><dl class="gloss" id="gl"></dl>`;
    const gl = document.getElementById('gl');
    const draw = q => {
      q = (q || '').toLowerCase();
      gl.innerHTML = window.GLOSSARY.filter(g => !q || (g[0] + ' ' + g[1]).toLowerCase().includes(q))
        .map(g => `<div><dt>${g[0]}</dt><dd>${g[1]} <a href="#/lesson/${g[2]}">${esc(byId[g[2]].title.length > 36 ? byId[g[2]].title.slice(0, 34) + '…' : byId[g[2]].title)} →</a></dd></div>`).join('') || '<p class="empty">No terms match.</p>';
    };
    draw();
    document.getElementById('gq').addEventListener('input', e => draw(e.target.value));
  }

  function formulasView() {
    app.innerHTML = `<section class="page-head"><h1>Formula sheet</h1><p class="lead">Every formula in the course with a one-line plain-English meaning. Use the link on each card to open the full explanation, symbol list and worked example. Stuck on notation? Start with <a href="#/lesson/math-basics">the math primer</a>.</p></section>
      <div class="toolbar"><input id="fq" type="search" placeholder="Search formulas…" aria-label="Search formulas"></div><div id="fl"></div>`;
    const fl = document.getElementById('fl');
    const draw = q => {
      q = (q || '').toLowerCase();
      const rows = window.FORMULAS.filter(f => !q || (f[0] + ' ' + f[1] + ' ' + f[3]).toLowerCase().includes(q));
      const groups = [];
      rows.forEach(r => { let g = groups.find(x => x.n === r[0]); if (!g) groups.push(g = { n: r[0], items: [] }); g.items.push(r); });
      fl.innerHTML = groups.map(g => `<h2 class="fgroup">${g.n}</h2><div class="fgrid">${g.items.map(f => `<div class="fcard"><div class="formula">${f[2]}</div><div class="fcard-b"><h3>${f[1]}</h3><p>${f[3]}</p><a href="#/lesson/${f[4]}">${byId[f[4]] ? 'Explained in: ' + esc(byId[f[4]].title.length > 44 ? byId[f[4]].title.slice(0, 42) + '…' : byId[f[4]].title) : ''} →</a></div></div>`).join('')}</div>`).join('') || '<p class="empty">No formulas match.</p>';
    };
    draw();
    document.getElementById('fq').addEventListener('input', e => draw(e.target.value));
  }

  function quizHTML(l) {
    return `<section class="quiz" id="quiz"><h2>Check your understanding</h2><div id="qbody"></div></section>`;
  }
  function mountQuiz(l) {
    const body = document.getElementById('qbody');
    const prev = state.scores[l.id];
    function start() {
      let answered = 0, correct = 0;
      const qs = l.quiz.map(q => { const idx = shuffle(q.o.map((t, i) => i)); return { q, idx }; });
      body.innerHTML = (prev ? `<p class="best">Best score so far: ${prev[0]}/${prev[1]}</p>` : '') + qs.map((it, qi) =>
        `<div class="q" data-q="${qi}"><p class="qtext"><b>${qi + 1}.</b> ${it.q.q}</p><div class="opts">${it.idx.map(oi => `<button class="opt" data-o="${oi}">${it.q.o[oi]}</button>`).join('')}</div><p class="why" hidden></p></div>`).join('') + '<div class="result" hidden></div>';
      body.querySelectorAll('.q').forEach(qel => {
        const it = qs[+qel.dataset.q];
        qel.querySelectorAll('.opt').forEach(btn => btn.addEventListener('click', () => {
          if (qel.dataset.done) return; qel.dataset.done = 1; answered++;
          const ok = +btn.dataset.o === it.q.a; if (ok) correct++;
          qel.querySelectorAll('.opt').forEach(b => { b.disabled = true; if (+b.dataset.o === it.q.a) b.classList.add('right'); });
          if (!ok) btn.classList.add('wrong');
          const why = qel.querySelector('.why'); why.hidden = false; why.innerHTML = (ok ? '<b>Correct.</b> ' : '<b>Not quite.</b> ') + it.q.why;
          if (answered === qs.length) {
            const best = state.scores[l.id];
            if (!best || correct >= best[0]) state.scores[l.id] = [correct, qs.length];
            save();
            const res = body.querySelector('.result'); res.hidden = false;
            res.innerHTML = `<b>You scored ${correct}/${qs.length}.</b> ${correct === qs.length ? 'Nicely done.' : 'Re-read the sections above and try again.'} <button class="btn" id="retry">Retake quiz</button>`;
            document.getElementById('retry').addEventListener('click', start);
          }
        }));
      });
    }
    start();
  }

  function lessonView(id) {
    const l = byId[id];
    if (!l) { app.innerHTML = '<p class="empty">Lesson not found. <a href="#/library">Back to library</a></p>'; return; }
    const i = LESSONS.indexOf(l), prev = LESSONS[i - 1], next = LESSONS[i + 1], done = !!state.done[l.id];
    const related = (l.related || []).filter(r => byId[r]);
    let inner;
    if (l.type === 'paper') {
      const q = encodeURIComponent(l.title.replace(/[“”"]/g, '') + ' ' + l.authors.split(' and ')[0]);
      inner = `
      <div class="cite"><div><b>${esc(l.authors)}</b> (${l.year})</div><div class="cite-j">${esc(l.journal)}</div>
        <div class="cite-row"><span class="tag">Reading difficulty: ${l.level}</span><a class="btn small" target="_blank" rel="noopener" href="https://scholar.google.com/scholar?q=${q}">Find the original ↗</a></div></div>
      <div class="prose paper">
        <h2>The question</h2><p>${l.question}</p>
        <h2>The big idea</h2><p>${l.idea}</p>
        <h2>How they did it</h2><p>${l.method}</p>
        <h2>What they found</h2><p>${l.findings}</p>
        <h2>Why it mattered</h2><p>${l.matters}</p>
        <h2>Critiques and what came after</h2><p>${l.critique}</p>
        <aside class="callout lookfor"><b>What to look for when you read the original</b><ul>${l.lookFor.map(x => `<li>${x}</li>`).join('')}</ul></aside>
        <p class="disclaimer">This summary is written in our own words and simplified. Details and numbers can be subtle, so check them against the original before relying on them.</p>
      </div>`;
    } else {
      inner = `<div class="prose">${l.body}</div>
        ${l.widget ? `<section class="widget"><h2>Try it</h2><div id="widget"></div></section>` : ''}
        ${l.takeaways ? `<section class="takeaways"><h2>Key takeaways</h2><ul>${l.takeaways.map(t => `<li>${t}</li>`).join('')}</ul></section>` : ''}`;
    }
    app.innerHTML = `<article class="lesson">
      <a class="crumb" href="#/library">← Library</a>
      <div class="lh"><span class="badge ${l.type}">${TYPE_LABEL[l.type]}</span><span class="lmeta">${l.min} min · ${l.type === 'paper' ? 'Paper breakdown' : l.level}</span></div>
      <h1>${l.title}</h1><p class="dek">${l.blurb}</p>
      ${inner}
      ${quizHTML(l)}
      <div class="complete"><button class="btn ${done ? '' : 'primary'} big" id="mark">${done ? '✓ Completed (click to undo)' : 'Mark as complete'}</button></div>
      ${related.length ? `<section class="related"><h2>Related</h2><div class="grid">${related.map(r => card(byId[r])).join('')}</div></section>` : ''}
      <nav class="pn">${prev ? `<a href="#/lesson/${prev.id}"><small>← Previous</small><span>${prev.title}</span></a>` : '<span></span>'}${next ? `<a class="r" href="#/lesson/${next.id}"><small>Next →</small><span>${next.title}</span></a>` : '<span></span>'}</nav>
    </article>`;
    mountQuiz(l);
    if (l.widget && window.WIDGETS[l.widget]) window.WIDGETS[l.widget](document.getElementById('widget'));
    document.getElementById('mark').addEventListener('click', e => {
      state.done[l.id] = !state.done[l.id]; if (!state.done[l.id]) delete state.done[l.id]; save();
      const d = !!state.done[l.id]; e.target.classList.toggle('primary', !d); e.target.textContent = d ? '✓ Completed (click to undo)' : 'Mark as complete';
    });
  }

  /* ---------- router ---------- */
  function route() {
    const parts = location.hash.replace(/^#\/?/, '').split('/');
    const view = parts[0] || 'home';
    document.querySelectorAll('.nav a').forEach(a => a.classList.toggle('on', a.dataset.v === (view === 'lesson' ? 'library' : view)));
    if (view === 'lesson') lessonView(parts[1]);
    else if (view === 'library') libraryView();
    else if (view === 'glossary') glossaryView();
    else if (view === 'formulas') formulasView();
    else homeView();
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = (view === 'lesson' && byId[parts[1]] ? byId[parts[1]].title.replace(/<[^>]+>/g, '') + ' · ' : '') + 'Marginal by R357';
  }
  window.addEventListener('hashchange', route);
  document.getElementById('theme').addEventListener('click', toggleTheme);
  syncThemeBtn();
  route();
})();
