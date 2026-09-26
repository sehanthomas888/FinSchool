/* Learner progress: the data format and the rules for merging it between devices. No browser or network code here,
   so it can be tested on its own (tools/check-progress-sync.js).

   A progress object looks like:
     { owner: null | "<user id>",            who this browser copy belongs to (null = a guest who has not signed in)
       marks:  { "<lessonId>": <signed ms> } positive = completed at that time, negative = un-completed at that time
       scores: { "<lessonId>": [correct, total] }   best quiz result per lesson
       done:   { "<lessonId>": true }        derived from marks, kept for convenient reading }

   Merge rule: for each lesson the most recent action wins (so "undo" on one device reaches the others);
   for quiz scores the better result wins. merge() is commutative, associative and idempotent, so the order in which
   devices sync never matters. */
(function () {
  'use strict';

  const abs = Math.abs;

  function empty() { return { owner: null, marks: {}, scores: {}, done: {} }; }

  // Accepts anything (including the older { done, scores } format from before accounts) and returns a clean object.
  function normalize(s) {
    const out = empty();
    if (!s || typeof s !== 'object') return out;
    out.owner = typeof s.owner === 'string' ? s.owner : null;
    const marks = s.marks && typeof s.marks === 'object' ? s.marks : {};
    for (const id of Object.keys(marks)) if (Number.isFinite(marks[id]) && marks[id] !== 0) out.marks[id] = marks[id];
    // older format: done = { id: true } with no timestamps. Treat those as completed "long ago" (time 1).
    if (s.done && typeof s.done === 'object') for (const id of Object.keys(s.done)) if (s.done[id] && !(id in out.marks)) out.marks[id] = 1;
    const scores = s.scores && typeof s.scores === 'object' ? s.scores : {};
    for (const id of Object.keys(scores)) {
      const v = scores[id];
      if (Array.isArray(v) && v.length === 2 && Number.isFinite(v[0]) && Number.isFinite(v[1]) && v[1] > 0) out.scores[id] = [v[0], v[1]];
    }
    return withDone(out);
  }

  function withDone(s) {
    s.done = {};
    for (const id of Object.keys(s.marks)) if (s.marks[id] > 0) s.done[id] = true;
    return s;
  }

  // Record that a lesson was completed (isDone = true) or un-completed (false) at time `now` (milliseconds).
  // The new mark is always strictly newer than the previous one, so a fast double-click can never be ignored.
  function mark(state, id, isDone, now) {
    const prev = state.marks[id] ? abs(state.marks[id]) : 0;
    const t = Math.max(now, prev + 1);
    state.marks[id] = isDone ? t : -t;
    return withDone(state);
  }

  const ratio = v => v[0] / v[1];
  function betterScore(a, b) {
    if (!a) return b; if (!b) return a;
    if (ratio(a) !== ratio(b)) return ratio(a) > ratio(b) ? a : b;
    if (a[1] !== b[1]) return a[1] > b[1] ? a : b;      // same ratio: prefer the longer quiz
    return a;
  }

  // Combine two progress objects. `owner` of the result is a.owner (the caller decides ownership).
  function merge(a, b) {
    a = normalize(a); b = normalize(b);
    const out = empty(); out.owner = a.owner || b.owner;
    for (const id of new Set(Object.keys(a.marks).concat(Object.keys(b.marks)))) {
      const x = a.marks[id], y = b.marks[id];
      if (x === undefined) out.marks[id] = y;
      else if (y === undefined) out.marks[id] = x;
      else if (abs(x) !== abs(y)) out.marks[id] = abs(x) > abs(y) ? x : y;
      else out.marks[id] = Math.max(x, y);               // identical time: completed wins
    }
    for (const id of new Set(Object.keys(a.scores).concat(Object.keys(b.scores)))) out.scores[id] = betterScore(a.scores[id], b.scores[id]);
    return withDone(out);
  }

  const doneCount = s => Object.keys(normalize(s).done).length;

  // Same progress content (ignoring who owns it)?
  function sameContent(a, b) {
    a = normalize(a); b = normalize(b);
    return JSON.stringify([sortObj(a.marks), sortObj(a.scores)]) === JSON.stringify([sortObj(b.marks), sortObj(b.scores)]);
  }
  function sortObj(o) { return Object.keys(o).sort().map(k => [k, o[k]]); }

  // The columns stored in the cloud `progress` table for one course.
  function toCloudRow(state, total) {
    const s = normalize(state);
    return { marks: s.marks, scores: s.scores, done_count: doneCount(s), total: total || 0 };
  }
  function fromCloudRow(row) { return normalize({ marks: row && row.marks, scores: row && row.scores }); }

  const api = { empty, normalize, mark, merge, doneCount, sameContent, toCloudRow, fromCloudRow };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (typeof window !== 'undefined') { window.R357 = window.R357 || {}; window.R357.sync = api; }
})();
