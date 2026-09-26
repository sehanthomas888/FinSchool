// Run every check before you push:   node tools/run-checks.js
// 1) syntax of every JavaScript file  2) structural audit of each course  3) independent recomputation of the math
const { spawnSync } = require('child_process'), fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
let failed = 0;
const run = (label, args) => {
  const r = spawnSync(process.execPath, args, { cwd: ROOT, encoding: 'utf8' });
  const ok = r.status === 0; if (!ok) failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}`);
  if (!ok) console.log((r.stdout || '') + (r.stderr || ''));
};

// 1) syntax
const js = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.name.startsWith('.') || e.name === 'node_modules') continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p); else if (e.name.endsWith('.js')) js.push(p);
  }
})(ROOT);
let syntaxBad = 0;
for (const f of js) { const r = spawnSync(process.execPath, ['--check', f], { encoding: 'utf8' }); if (r.status !== 0) { syntaxBad++; console.log('  syntax error in ' + path.relative(ROOT, f) + '\n' + r.stderr); } }
if (syntaxBad) failed++;
console.log(`${syntaxBad ? 'FAIL' : 'PASS'}  syntax (${js.length} JavaScript files)`);

// 2) content audit, 3) math
run('content audit (all courses)', ['tools/audit.js']);
run('progress merge rules (accounts)', ['tools/check-progress-sync.js']);
run('math: core examples and formulas', ['tools/check-math-core.js']);
run('math: fixed income examples and formulas', ['tools/check-math-fixedincome.js']);

console.log(failed ? `\n${failed} check(s) FAILED` : '\nAll checks passed. Also run tools/stress-test.js in the browser (see README).');
process.exit(failed ? 1 : 0);
