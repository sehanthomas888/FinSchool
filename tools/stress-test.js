/* Browser stress test for a course page.
   How to run: start the dev server (node tools/serve.js), open a course (e.g. http://localhost:8123/marginal),
   open the browser's developer console, paste this whole file and press Enter.
   It opens every lesson, and for each interactive widget drags every slider to its minimum, its maximum and 10 random
   positions, failing on any "NaN", "Infinity", "undefined" or broken chart path. It also visits the library,
   glossary and formula pages. The final line of output is the verdict. */
(async () => {
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const errors = [], problems = [];
  window.addEventListener('error', e => errors.push(e.message));
  const bad = t => /NaN|Infinity|undefined/.test(t);
  const setv = (el, v) => { el.value = v; el.dispatchEvent(new Event('input')); };
  const ids = window.LESSONS.map(l => l.id);
  for (const id of ids) {
    location.hash = '#/lesson/' + id; await wait(40);
    const page = document.getElementById('app'); if (bad(page.textContent)) problems.push('page ' + id);
    const lesson = window.LESSONS.find(l => l.id === id), w = document.getElementById('widget');
    if (!lesson.widget) continue;
    if (!w || !w.children.length) { problems.push('widget missing on ' + id); continue; }
    const ins = [...w.querySelectorAll('input[type=range]')], orig = ins.map(i => i.defaultValue);
    const check = tag => {
      const paths = [...w.querySelectorAll('svg path')].map(p => p.getAttribute('d')).join('');
      const dots = [...w.querySelectorAll('svg circle')].map(c => c.getAttribute('cx') + c.getAttribute('cy')).join('');
      if (bad(w.textContent) || /NaN|Infinity/.test(paths + dots)) problems.push(id + ' @ ' + tag);
    };
    ins.forEach(i => setv(i, i.min)); check('all min'); ins.forEach(i => setv(i, i.max)); check('all max');
    for (let k = 0; k < ins.length; k++) { ins.forEach((i, j) => setv(i, orig[j])); setv(ins[k], ins[k].min); check('min ' + ins[k].dataset.k); setv(ins[k], ins[k].max); check('max ' + ins[k].dataset.k); }
    for (let n = 0; n < 10; n++) { ins.forEach(i => { const lo = +i.min, hi = +i.max, st = +i.step; setv(i, lo + Math.round(Math.random() * (hi - lo) / st) * st); }); check('random'); }
  }
  for (const v of ['formulas', 'glossary', 'library', '']) { location.hash = '#/' + v; await wait(60); if (bad(document.getElementById('app').textContent)) problems.push('view ' + (v || 'home')); }
  const verdict = `${ids.length} lessons | problems: ${JSON.stringify([...new Set(problems)])} | script errors: ${JSON.stringify(errors)}`;
  console.log(problems.length || errors.length ? 'STRESS TEST FAILED: ' + verdict : 'STRESS TEST PASSED: ' + verdict);
})();
