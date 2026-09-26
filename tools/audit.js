// Structural audit of every course. Run: node tools/audit.js
// For each folder in courses/ (except ones starting with "_", which are templates and are also checked with --all)
// it loads the course exactly as its index.html does, then checks the content for mistakes a reader would hit.
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.resolve(__dirname, '..'), COURSES = path.join(ROOT, 'courses');
const includeTemplates = process.argv.includes('--all');
let problems = 0;
const bad = msg => { problems++; console.log('  FAIL ' + msg); };

const TAGS = ['p', 'div', 'ul', 'ol', 'li', 'dl', 'dt', 'dd', 'b', 'i', 'em', 'sup', 'sub', 'a', 'aside', 'h2', 'h3', 'small', 'table', 'tr', 'td', 'span'];
function balanced(id, field, html) {
  if (typeof html !== 'string') return;
  for (const t of TAGS) {
    const open = (html.match(new RegExp('<' + t + '(\\s[^>]*)?>', 'g')) || []).length, close = (html.match(new RegExp('</' + t + '>', 'g')) || []).length;
    if (open !== close) bad(`${id}.${field}: <${t}> opens ${open}, closes ${close}`);
  }
}

// which scripts does the page load? (skip DOM-only ones)
function loadCourse(dir) {
  const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8').replace(/<!--[\s\S]*?-->/g, '');   // ignore commented-out scripts
  const srcs = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map(m => m[1]).filter(s => !/shared\/(theme|engine|config|auth|account)\.js$/.test(s));   // browser-only scripts
  const win = { R357: {} }; const ctx = vm.createContext({ window: win, console, Math, JSON, Object, Array, String, Number, Date });
  for (const s of srcs) {
    const file = path.join(ROOT, s.replace(/^\//, ''));
    if (!fs.existsSync(file)) { bad(`index.html references missing script ${s}`); continue; }
    try { vm.runInContext(fs.readFileSync(file, 'utf8'), ctx, { filename: s }); } catch (e) { bad(`${s} failed to run: ${e.message}`); }
  }
  return win;
}

const dirs = fs.readdirSync(COURSES, { withFileTypes: true }).filter(d => d.isDirectory() && (includeTemplates || !d.name.startsWith('_'))).map(d => d.name);
for (const name of dirs) {
  console.log('Course: ' + name);
  const w = loadCourse(path.join(COURSES, name));
  const C = w.COURSE, L = w.LESSONS || [];
  if (!C) { bad('no window.COURSE'); continue; }
  const ids = new Set();
  for (const l of L) {
    if (ids.has(l.id)) bad('duplicate lesson id ' + l.id); ids.add(l.id);
    for (const k of Object.keys(l)) if (typeof l[k] === 'string') balanced(l.id, k, l[k]);
    (l.lookFor || []).forEach((x, i) => balanced(l.id, 'lookFor' + i, x));
    (l.takeaways || []).forEach((x, i) => balanced(l.id, 'takeaway' + i, x));
    if (!Array.isArray(l.quiz) || l.quiz.length !== 3) bad(`${l.id}: needs exactly 3 quiz questions`);
    (l.quiz || []).forEach((q, i) => {
      balanced(l.id, 'q' + i, q.q); balanced(l.id, 'why' + i, q.why); q.o.forEach((o, j) => balanced(l.id, `q${i}o${j}`, o));
      if (!(q.a >= 0 && q.a < q.o.length)) bad(`${l.id} quiz ${i + 1}: answer index out of range`);
      if (new Set(q.o).size !== q.o.length) bad(`${l.id} quiz ${i + 1}: duplicate options`);
      if (!q.why) bad(`${l.id} quiz ${i + 1}: missing explanation`);
    });
    if (l.type === 'paper') for (const k of ['question', 'idea', 'method', 'findings', 'matters', 'critique', 'lookFor', 'authors', 'year', 'journal']) if (!l[k]) bad(`${l.id}: paper missing ${k}`);
    if (l.widget && !(w.WIDGETS && w.WIDGETS[l.widget])) bad(`${l.id}: widget "${l.widget}" is not defined`);
  }
  // modules must cover every lesson exactly once
  const seen = {};
  (C.modules || []).forEach(m => m.ids.forEach(id => { if (!ids.has(id)) bad(`module "${m.name}" lists unknown lesson ${id}`); seen[id] = (seen[id] || 0) + 1; }));
  L.forEach(l => { if (!seen[l.id]) bad(`lesson ${l.id} is not in any module`); else if (seen[l.id] > 1) bad(`lesson ${l.id} is in ${seen[l.id]} modules`); });
  // links
  L.forEach(l => {
    (l.related || []).forEach(r => { if (!ids.has(r)) bad(`${l.id}: related "${r}" does not exist`); });
    ((l.body || '').match(/#\/lesson\/([\w-]+)/g) || []).forEach(x => { const t = x.split('/').pop(); if (!ids.has(t)) bad(`${l.id}: link to missing lesson ${t}`); });
  });
  (w.GLOSSARY || []).forEach(g => { if (!ids.has(g[2])) bad(`glossary "${g[0]}" points to missing lesson ${g[2]}`); });
  (w.FORMULAS || []).forEach(f => { if (!ids.has(f[4])) bad(`formula "${f[1]}" points to missing lesson ${f[4]}`); });
  if (C.primer && !ids.has(C.primer.id)) bad('primer lesson ' + C.primer.id + ' does not exist');
  console.log(`  ${L.length} lessons, ${(C.modules || []).length} modules, ${(w.GLOSSARY || []).length} glossary terms, ${(w.FORMULAS || []).length} formulas`);
}

// catalog: every listed course must exist and be routable
try {
  const win = { R357: {} }; vm.runInNewContext(fs.readFileSync(path.join(COURSES, 'catalog.js'), 'utf8'), { window: win });
  const rewrites = JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8')).rewrites || [];
  console.log('Catalog: ' + win.R357.courses.length + ' course(s)');
  for (const c of win.R357.courses) {
    if (!fs.existsSync(path.join(COURSES, c.id, 'index.html'))) bad(`catalog course "${c.id}" has no courses/${c.id}/index.html`);
    if (!rewrites.some(r => r.source === c.path)) bad(`catalog course "${c.id}": vercel.json has no rewrite for ${c.path}`);
  }
} catch (e) { bad('catalog check failed: ' + e.message); }

console.log(problems ? `\n${problems} problem(s) found` : '\nAudit passed: no problems');
process.exit(problems ? 1 : 0);
