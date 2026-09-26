// Dev helper: print lessons as plain text.   node tools/dump-lesson.js risk capm      (or:  node tools/dump-lesson.js --all-titles)
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.resolve(__dirname, '..');
const win = { Rosetta: {}, QL_CHECK: true };
const ctx = vm.createContext({ window: win, console, Math, JSON, Object, Array, String, Number, Date, Set, Error });
const html = fs.readFileSync(path.join(ROOT, 'courses', 'marginal', 'index.html'), 'utf8');
for (const m of html.matchAll(/<script src="([^"]+)"><\/script>/g)) if (m[1].includes('/courses/') || m[1].endsWith('/shared/ui.js')) vm.runInContext(fs.readFileSync(path.join(ROOT, m[1].slice(1)), 'utf8'), ctx, { filename: m[1] });
const L = win.LESSONS, byId = Object.fromEntries(L.map(l => [l.id, l]));
const args = process.argv.slice(2);
if (args[0] === '--all-titles') { L.forEach(l => console.log(l.id.padEnd(16), String(l.min).padStart(3) + 'm', (l.quiz || []).length + 'q', l.title)); process.exit(0); }
for (const id of args) {
  const l = byId[id]; if (!l) { console.log('no such lesson: ' + id); continue; }
  console.log('\n===== ' + id + ' | ' + l.title + ' | ' + l.type + ' | widget: ' + l.widget + ' | min: ' + l.min + ' | level: ' + l.level + ' | related: ' + (l.related || []).join(','));
  console.log('BLURB: ' + l.blurb);
  if (l.body) console.log(l.body.replace(/\s+/g, ' '));
  else for (const k of ['question', 'idea', 'method', 'findings', 'matters', 'critique']) console.log(k.toUpperCase() + ': ' + String(l[k]).replace(/\s+/g, ' '));
  if (l.lookFor) console.log('LOOKFOR: ' + JSON.stringify(l.lookFor));
  console.log('TAKEAWAYS: ' + JSON.stringify(l.takeaways));
  console.log('QUIZ: ' + JSON.stringify((l.quiz || []).map(q => q.gen ? '[generated]' : q)));
}
