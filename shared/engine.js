/* R357 Education course engine.
   Renders any course from three inputs: window.COURSE (identity + module order), window.LESSONS (content),
   and optionally window.GLOSSARY, window.FORMULAS and window.WIDGETS. Nothing here is subject-specific. */
(function () {
  'use strict';

  const SCHOOL = window.R357.school, COURSE = window.COURSE;

  /* ---------- data ---------- */
  const MODULES = COURSE.modules;
  const ORDER = [].concat.apply([], MODULES.map(m => m.ids));     // learning order = module order
  const LESSONS = window.LESSONS.slice().sort((a, b) => ORDER.indexOf(a.id) - ORDER.indexOf(b.id));
  const byId = {}; LESSONS.forEach(l => byId[l.id] = l);
  const TYPE_LABEL = Object.assign({ concept: 'Concept', paper: 'Paper', guide: 'Guide' }, COURSE.typeLabels || {});
  const HAS_FORMULAS = !!(window.FORMULAS && window.FORMULAS.length), HAS_GLOSSARY = !!(window.GLOSSARY && window.GLOSSARY.length);

  /* ---------- progress ----------
     Always saved in this browser (localStorage). When the learner is signed in it is also synced to their account:
     each sync pulls the account's copy, merges it with this device's copy (rules in shared/progress-sync.js) and pushes
     the result back, so several devices, and guest progress from before signing in, all combine without losing anything. */
  const sync = window.R357.sync, auth = window.R357.auth, account = window.R357.account;
  const KEY = COURSE.id + '.v1', SUMMARY_KEY = 'r357.summary.' + COURSE.id;
  let state = sync.empty();
  try { state = sync.normalize(JSON.parse(localStorage.getItem(KEY))); } catch (e) { /* storage unavailable or empty */ }
  const doneCount = () => LESSONS.filter(l => state.done[l.id]).length;
  // A tiny summary the school home page reads to show progress without loading the whole course.
  const writeSummary = () => { try { localStorage.setItem(SUMMARY_KEY, JSON.stringify({ total: LESSONS.length, done: doneCount(), updated: Date.now() })); } catch (e) { /* ignore */ } };
  const persist = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ } writeSummary(); };
  writeSummary();

  let syncTimer = null, retryTimer = null, syncing = false, dirty = false;
  function save() {
    persist();
    if (auth.user()) { dirty = true; clearTimeout(syncTimer); syncTimer = setTimeout(syncNow, 1200); account.setStatus('saving'); }
  }
  // Redraw after progress arrives from another device, unless the reader is part-way through a quiz.
  function refreshView() { if (!document.querySelector('.q[data-done]')) route(); }

  async function syncNow() {
    const u = auth.user();
    if (!u) return;
    if (syncing) { dirty = true; return; }
    syncing = true; dirty = false; clearTimeout(retryTimer); account.setStatus('saving');
    try {
      if (state.owner && state.owner !== u.id) state = sync.empty();               // leftovers from a different account: never mix them in
      const { data, error } = await auth.loadProgress(COURSE.id);
      if (error) throw error;
      const cloud = data ? sync.fromCloudRow(data) : sync.empty();
      const before = state, merged = sync.merge(state, cloud); merged.owner = u.id;
      const changedHere = !sync.sameContent(merged, before);
      state = merged; persist();
      if (!data || !sync.sameContent(merged, cloud) || data.total !== LESSONS.length) {
        const r = await auth.saveProgress(COURSE.id, sync.toCloudRow(state, LESSONS.length));
        if (r.error) throw r.error;
      }
      account.setStatus('saved');
      if (changedHere && !dirty) refreshView();
    } catch (e) {
      console.warn('Progress sync failed (it stays saved on this device and will retry):', e);
      account.setStatus('error'); retryTimer = setTimeout(syncNow, 15000);
    } finally {
      syncing = false;
      if (dirty) { clearTimeout(syncTimer); syncTimer = setTimeout(syncNow, 1200); }
    }
  }
  // signed out (here or in another tab): the account's progress must not linger on this device
  function forgetIfOwned() { if (state.owner) { state = sync.empty(); persist(); refreshView(); } account.setStatus(''); }

  auth.ready.then(u => {
    if (u) syncNow();
    else if (auth.enabled && !auth.unavailable) forgetIfOwned();                    // no valid session, but the saved copy belongs to an account
  });
  auth.onChange(u => { if (u) syncNow(); else forgetIfOwned(); });
  window.addEventListener('online', () => { if (auth.user() && dirty) syncNow(); });
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible' && auth.user()) syncNow(); else if (dirty) syncNow(); });

  /* ---------- theme (shared by every course on this site) ---------- */
  const theme = window.R357.theme;
  theme.init(COURSE.id + '.theme');

  // A course may give itself its own accent colour (see the comment at the bottom of a course.js).
  (function applyAccent() {
    const a = COURSE.accent; if (!a) return;
    const decl = o => Object.keys(o || {}).map(k => k + ':' + o[k]).join(';');
    const st = document.createElement('style');
    st.textContent = ':root{' + decl(a.light) + '}@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){' + decl(a.dark) + '}}:root[data-theme="dark"]{' + decl(a.dark) + '}';
    document.head.appendChild(st);
  })();

  /* ---------- page chrome: school breadcrumb, course nav, footer ---------- */
  function renderChrome() {
    const nav = [['#/', 'home', 'Path'], ['#/library', 'library', 'Library']]
      .concat(HAS_FORMULAS ? [['#/formulas', 'formulas', 'Formulas']] : [], HAS_GLOSSARY ? [['#/glossary', 'glossary', 'Glossary']] : []);
    const head = document.getElementById('site-header');
    head.className = 'top';
    head.innerHTML = `<div class="top-in">
      <a class="school" href="${SCHOOL.home}" aria-label="${SCHOOL.name} home"><span class="school-mark">${SCHOOL.short}</span><span class="school-name">Education</span></a>
      <span class="sep" aria-hidden="true">/</span>
      <a class="brand" href="#/"><span class="mark">${COURSE.mark || COURSE.name[0]}</span><span class="bt">${COURSE.name}</span></a>
      <nav class="nav" aria-label="Main">${nav.map(n => `<a href="${n[0]}" data-v="${n[1]}">${n[2]}</a>`).join('')}</nav>
      <button id="theme" class="icon-btn" type="button" aria-label="Toggle theme"></button></div>`;
    const foot = document.getElementById('site-footer');
    foot.innerHTML = `<p><b>${COURSE.name}</b> is a course from <a href="${SCHOOL.home}">${SCHOOL.name}</a>. <a href="/privacy">Privacy</a></p>${COURSE.disclaimer ? `<p>${COURSE.disclaimer}</p>` : ''}`;
    document.getElementById('theme').addEventListener('click', theme.toggle);
    account.mount();
  }

  /* ---------- small helpers ---------- */
  const app = document.getElementById('app');
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const nextUndone = () => LESSONS.find(l => !state.done[l.id]) || LESSONS[0];
  const clip = (s, n) => s.length > n ? s.slice(0, n - 2) + '…' : s;

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
    const pctDone = Math.round(n / total * 100), hero = COURSE.hero || {};
    app.innerHTML = `
    <section class="hero">
      <p class="eyebrow">${COURSE.name} · ${hero.eyebrow || COURSE.subject || ''}</p>
      <h1>${hero.title || COURSE.name}</h1>
      ${hero.lead ? `<p class="lead">${hero.lead}</p>` : ''}
      <div class="hero-cta">
        <a class="btn primary big" href="#/lesson/${nxt.id}">${started ? 'Continue: ' + esc(clip(nxt.title, 38)) : 'Start with the first lesson'}</a>
        <a class="btn big" href="#/library">Browse everything</a>
      </div>
      <div class="progress" aria-label="Progress"><div class="bar"><i style="width:${pctDone}%"></i></div><span>${n} of ${total} complete</span></div>
    </section>
    ${MODULES.map(m => `<section class="module"><div class="module-head"><h2>${m.name}</h2><p>${m.desc}</p></div><div class="grid">${m.ids.map(id => card(byId[id])).join('')}</div></section>`).join('')}
    ${COURSE.how ? `<section class="howto"><h2>How each lesson works</h2><div class="three">${COURSE.how.map(h => `<div><b>${h.title}</b><p>${h.text}</p></div>`).join('')}</div></section>` : ''}`;
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
        .map(g => `<div><dt>${g[0]}</dt><dd>${g[1]} <a href="#/lesson/${g[2]}">${esc(clip(byId[g[2]].title, 36))} →</a></dd></div>`).join('') || '<p class="empty">No terms match.</p>';
    };
    draw();
    document.getElementById('gq').addEventListener('input', e => draw(e.target.value));
  }

  function formulasView() {
    const primer = COURSE.primer && byId[COURSE.primer.id] ? ` Stuck on notation? Start with <a href="#/lesson/${COURSE.primer.id}">${COURSE.primer.label}</a>.` : '';
    app.innerHTML = `<section class="page-head"><h1>Formula sheet</h1><p class="lead">Every formula in the course with a one-line plain-English meaning. Use the link on each card to open the full explanation, symbol list and worked example.${primer}</p></section>
      <div class="toolbar"><input id="fq" type="search" placeholder="Search formulas…" aria-label="Search formulas"></div><div id="fl"></div>`;
    const fl = document.getElementById('fl');
    const draw = q => {
      q = (q || '').toLowerCase();
      const rows = window.FORMULAS.filter(f => !q || (f[0] + ' ' + f[1] + ' ' + f[3]).toLowerCase().includes(q));
      const groups = [];
      rows.forEach(r => { let g = groups.find(x => x.n === r[0]); if (!g) groups.push(g = { n: r[0], items: [] }); g.items.push(r); });
      fl.innerHTML = groups.map(g => `<h2 class="fgroup">${g.n}</h2><div class="fgrid">${g.items.map(f => `<div class="fcard"><div class="formula">${f[2]}</div><div class="fcard-b"><h3>${f[1]}</h3><p>${f[3]}</p><a href="#/lesson/${f[4]}">${byId[f[4]] ? 'Explained in: ' + esc(clip(byId[f[4]].title, 44)) : ''} →</a></div></div>`).join('')}</div>`).join('') || '<p class="empty">No formulas match.</p>';
    };
    draw();
    document.getElementById('fq').addEventListener('input', e => draw(e.target.value));
  }

  function quizHTML() {
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
      ${quizHTML()}
      <div class="complete"><button class="btn ${done ? '' : 'primary'} big" id="mark">${done ? '✓ Completed (click to undo)' : 'Mark as complete'}</button></div>
      ${related.length ? `<section class="related"><h2>Related</h2><div class="grid">${related.map(r => card(byId[r])).join('')}</div></section>` : ''}
      <nav class="pn">${prev ? `<a href="#/lesson/${prev.id}"><small>← Previous</small><span>${prev.title}</span></a>` : '<span></span>'}${next ? `<a class="r" href="#/lesson/${next.id}"><small>Next →</small><span>${next.title}</span></a>` : '<span></span>'}</nav>
    </article>`;
    mountQuiz(l);
    if (l.widget && window.WIDGETS && window.WIDGETS[l.widget]) window.WIDGETS[l.widget](document.getElementById('widget'));
    document.getElementById('mark').addEventListener('click', e => {
      sync.mark(state, l.id, !state.done[l.id], Date.now()); save();
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
    else if (view === 'glossary' && HAS_GLOSSARY) glossaryView();
    else if (view === 'formulas' && HAS_FORMULAS) formulasView();
    else homeView();
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = (view === 'lesson' && byId[parts[1]] ? byId[parts[1]].title.replace(/<[^>]+>/g, '') + ' · ' : '') + COURSE.name + ' · ' + SCHOOL.name;
  }
  window.addEventListener('hashchange', route);
  renderChrome();
  theme.sync();
  route();
})();
