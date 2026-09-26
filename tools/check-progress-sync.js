// Tests for the progress merge rules (shared/progress-sync.js). Run: node tools/check-progress-sync.js
// The important guarantees: merging is order-independent, "undo" reaches every device, guest progress is never lost,
// and nothing about a lesson is ever silently reset.
const S = require('../shared/progress-sync.js');
let failed = 0, n = 0;
const ok = (name, cond, extra) => { n++; if (!cond) { failed++; console.log('FAIL  ' + name + (extra ? '  -> ' + extra : '')); } };
const same = (a, b) => S.sameContent(a, b);
const J = x => JSON.stringify(x);

// --- formats -------------------------------------------------------------------------------------------------
let old = S.normalize({ done: { a: true, b: true }, scores: { a: [2, 3] } });
ok('older format is upgraded: lessons stay completed', old.done.a && old.done.b && old.marks.a > 0);
ok('older format keeps quiz scores', J(old.scores.a) === '[2,3]');
ok('garbage input becomes an empty progress object', J(S.normalize(null)) === J(S.empty()) && J(S.normalize('x')) === J(S.empty()));
ok('bad marks and scores are dropped', J(S.normalize({ marks: { a: 'x', b: NaN, c: 0 }, scores: { a: [1, 0], b: 'z' } }).marks) === '{}');
ok('owner survives normalizing', S.normalize({ owner: 'u1' }).owner === 'u1' && S.normalize({ owner: 5 }).owner === null);

// --- marking and undo ----------------------------------------------------------------------------------------
let s = S.empty();
S.mark(s, 'a', true, 100); ok('marking completes a lesson', s.done.a === true && s.marks.a === 100);
S.mark(s, 'a', false, 200); ok('undo removes it from done', !s.done.a && s.marks.a === -200);
S.mark(s, 'a', true, 150); ok('a mark is always newer than the previous one (fast double-click)', s.marks.a === 201 && s.done.a);
ok('count ignores undone lessons', S.doneCount(S.mark(S.mark(S.empty(), 'x', true, 5), 'x', false, 6)) === 0);

// --- undo travels between devices ---------------------------------------------------------------------------
const laptop = S.mark(S.empty(), 'l1', true, 100);                 // completed on the laptop at t=100
const phoneSynced = S.merge(S.empty(), laptop);                    // phone syncs, sees it
const phoneUndo = S.mark(phoneSynced, 'l1', false, 200);           // phone undoes at t=200
ok('undo on the phone wins over the older completion on the laptop', !S.merge(laptop, phoneUndo).done.l1 && !S.merge(phoneUndo, laptop).done.l1);
const laptopRedo = S.mark(S.merge(laptop, phoneUndo), 'l1', true, 300);
ok('a later redo wins over the earlier undo', S.merge(phoneUndo, laptopRedo).done.l1 === true);

// --- guest progress is adopted, never lost -------------------------------------------------------------------
const guest = S.normalize({ done: { g1: true, g2: true }, scores: { g1: [3, 3] } });
const cloud = S.fromCloudRow({ marks: { c1: 500 }, scores: { c1: [1, 3] } });
const joined = S.merge(guest, cloud);
ok('guest and account progress are combined', joined.done.g1 && joined.done.g2 && joined.done.c1 && Object.keys(joined.done).length === 3);
ok('quiz scores from both sides are kept', J(joined.scores.g1) === '[3,3]' && J(joined.scores.c1) === '[1,3]');

// --- scores: the better result wins -------------------------------------------------------------------------
ok('higher score wins', J(S.merge({ scores: { q: [1, 3] } }, { scores: { q: [3, 3] } }).scores.q) === '[3,3]');
ok('a worse retake never lowers the best score', J(S.merge({ scores: { q: [3, 3] } }, { scores: { q: [0, 3] } }).scores.q) === '[3,3]');
ok('score compared by ratio, not raw count', J(S.merge({ scores: { q: [2, 3] } }, { scores: { q: [3, 5] } }).scores.q) === '[2,3]');

// --- quiz length can change between versions without ever lowering a saved best --------------------------------
const B = S.betterScore;
ok('an old 3-question 3/3 is not replaced by a longer quiz scored 3/5', J(B([3, 3], [3, 5])) === '[3,3]');
ok('an old 2/3 is beaten by 4/5 (80% > 67%)', J(B([2, 3], [4, 5])) === '[4,5]');
ok('equal percentage prefers the longer quiz', J(B([3, 3], [5, 5])) === '[5,5]');
ok('no previous score: the new one is kept', J(B(undefined, [1, 5])) === '[1,5]' && J(B([1, 5], undefined)) === '[1,5]');
ok('a lower first retake of a longer quiz never overwrites 100%', J(B([3, 3], [4, 5])) === '[3,3]');

// --- algebra: order of syncing must never matter (randomised property tests) ------------------------------
let seed = 12345; const rnd = () => (seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296;
const ids = ['a', 'b', 'c', 'd', 'e'];
const gen = () => { const st = S.empty(); for (const id of ids) { if (rnd() < 0.6) st.marks[id] = (rnd() < 0.7 ? 1 : -1) * (1 + Math.floor(rnd() * 20)); if (rnd() < 0.5) st.scores[id] = [Math.floor(rnd() * 4), 3]; } return S.normalize(st); };
let comm = true, assoc = true, idem = true, cloudRound = true;
for (let i = 0; i < 2000; i++) {
  const a = gen(), b = gen(), c = gen();
  if (!same(S.merge(a, b), S.merge(b, a))) comm = false;
  if (!same(S.merge(S.merge(a, b), c), S.merge(a, S.merge(b, c)))) assoc = false;
  if (!same(S.merge(a, a), a)) idem = false;
  if (!same(S.fromCloudRow(S.toCloudRow(a, 10)), a)) cloudRound = false;
}
ok('merge is commutative (2000 random cases)', comm);
ok('merge is associative (2000 random cases)', assoc);
ok('merge is idempotent (2000 random cases)', idem);
ok('saving to and loading from the cloud row changes nothing', cloudRound);

// --- cloud row ------------------------------------------------------------------------------------------------
const row = S.toCloudRow(S.mark(S.mark(S.empty(), 'a', true, 10), 'b', true, 11), 52);
ok('cloud row carries counts', row.done_count === 2 && row.total === 52 && row.marks.a === 10);
ok('cloud row counts only completed lessons', S.toCloudRow(S.mark(S.mark(S.empty(), 'a', true, 10), 'a', false, 12), 5).done_count === 0);

console.log(failed ? `\n${failed} of ${n} checks FAILED` : `All ${n} progress-sync checks passed.`);
process.exit(failed ? 1 : 0);
