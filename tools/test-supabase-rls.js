// Integration test for the Supabase security rules (Row Level Security) on the real project.
//
//   SUPABASE_URL=… SUPABASE_PUBLISHABLE_KEY=… SUPABASE_SERVICE_KEY=… node tools/test-supabase-rls.js
//
// It creates two throwaway users through the admin API (no emails are sent), checks that each can only touch their own
// progress and that the anonymous key can do nothing, then deletes both users. The service key is used ONLY here, on your
// machine, and is never part of the website. Get it with:  supabase projects api-keys --project-ref <ref>
const URL_ = process.env.SUPABASE_URL, PUB = process.env.SUPABASE_PUBLISHABLE_KEY, SVC = process.env.SUPABASE_SERVICE_KEY;
if (!URL_ || !PUB || !SVC) { console.error('Set SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY and SUPABASE_SERVICE_KEY.'); process.exit(2); }

let failed = 0;
const check = (name, ok, extra) => { if (!ok) failed++; console.log((ok ? 'PASS  ' : 'FAIL  ') + name + (ok || !extra ? '' : '  -> ' + extra)); };
const j = async r => { const t = await r.text(); try { return t ? JSON.parse(t) : null; } catch (e) { return t; } };

const admin = (path, method, body) => fetch(URL_ + '/auth/v1/admin/' + path, { method, headers: { apikey: SVC, Authorization: 'Bearer ' + SVC, 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined });
const rest = (jwt, path, method, body, prefer) => fetch(URL_ + '/rest/v1/' + path, { method: method || 'GET', headers: { apikey: PUB, Authorization: 'Bearer ' + (jwt || PUB), 'Content-Type': 'application/json', Prefer: prefer || 'return=representation' }, body: body ? JSON.stringify(body) : undefined });

async function makeUser(tag) {
  const email = `rls-test-${Date.now()}-${tag}@example.com`, password = 'T!' + Math.random().toString(36).slice(2) + 'Aa1';
  const c = await admin('users', 'POST', { email, password, email_confirm: true });
  const u = await j(c); if (!u || !u.id) throw new Error('could not create test user: ' + JSON.stringify(u));
  const s = await fetch(URL_ + '/auth/v1/token?grant_type=password', { method: 'POST', headers: { apikey: PUB, 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
  const tok = await j(s); if (!tok.access_token) throw new Error('sign-in failed: ' + JSON.stringify(tok));
  return { id: u.id, jwt: tok.access_token };
}

(async () => {
  const users = [];
  try {
    const A = await makeUser('a'), B = await makeUser('b'); users.push(A, B);
    const row = (u, extra) => Object.assign({ user_id: u.id, course_id: 'test-course', marks: { 'lesson-1': 1700000000000 }, scores: { 'lesson-1': [2, 3] }, done_count: 1, total: 10 }, extra || {});

    // anonymous (no login) can do nothing
    let r = await rest(null, 'progress?select=*'); check('anonymous cannot read progress', !r.ok, 'status ' + r.status);
    r = await rest(null, 'progress', 'POST', row(A)); check('anonymous cannot insert progress', !r.ok, 'status ' + r.status);
    r = await rest(null, 'rpc/delete_my_account', 'POST', {}); check('anonymous cannot call delete_my_account', !r.ok, 'status ' + r.status);

    // A writes and reads their own row
    r = await rest(A.jwt, 'progress', 'POST', row(A)); check('learner A can create their own row', r.status === 201, 'status ' + r.status);
    r = await rest(A.jwt, 'progress?select=*'); let rows = await j(r); check('learner A reads exactly their own row', Array.isArray(rows) && rows.length === 1 && rows[0].user_id === A.id);

    // B cannot see or touch A's data
    r = await rest(B.jwt, 'progress?select=*'); rows = await j(r); check('learner B sees none of A\'s rows', Array.isArray(rows) && rows.length === 0, JSON.stringify(rows));
    r = await rest(B.jwt, 'progress', 'POST', row(A, { course_id: 'other' })); check('learner B cannot insert a row as A', !r.ok, 'status ' + r.status);
    r = await rest(B.jwt, 'progress?user_id=eq.' + A.id, 'PATCH', { done_count: 999 }); rows = await j(r); check('learner B cannot update A\'s row', Array.isArray(rows) && rows.length === 0, JSON.stringify(rows));
    r = await rest(B.jwt, 'progress?user_id=eq.' + A.id, 'DELETE'); rows = await j(r); check('learner B cannot delete A\'s row', Array.isArray(rows) && rows.length === 0, JSON.stringify(rows));
    r = await rest(A.jwt, 'progress?select=done_count'); rows = await j(r); check('A\'s row is unchanged after B\'s attempts', rows.length === 1 && rows[0].done_count === 1, JSON.stringify(rows));

    // constraints
    r = await rest(A.jwt, 'progress', 'POST', row(A, { course_id: '' })); check('empty course_id is rejected', !r.ok, 'status ' + r.status);
    r = await rest(A.jwt, 'progress', 'POST', row(A, { course_id: 'big', marks: { x: 'y'.repeat(25000) } })); check('oversized progress is rejected', !r.ok, 'status ' + r.status);
    r = await rest(A.jwt, 'progress', 'POST', row(A, { course_id: 'neg', done_count: -1 })); check('negative counts are rejected', !r.ok, 'status ' + r.status);

    // server keeps updated_at honest
    r = await rest(A.jwt, 'progress?user_id=eq.' + A.id + '&course_id=eq.test-course', 'PATCH', { done_count: 2, updated_at: '2001-01-01T00:00:00Z' }); rows = await j(r);
    check('updated_at is set by the server, not the client', Array.isArray(rows) && rows[0] && new Date(rows[0].updated_at).getFullYear() >= 2026, JSON.stringify(rows && rows[0] && rows[0].updated_at));

    // upsert (what the site does) works for the owner
    r = await rest(A.jwt, 'progress?on_conflict=user_id,course_id', 'POST', row(A, { done_count: 3 }), 'resolution=merge-duplicates,return=representation'); rows = await j(r);
    check('owner can upsert their row', r.ok && rows[0] && rows[0].done_count === 3, 'status ' + r.status);

    // account deletion removes the user and their data
    await rest(B.jwt, 'progress', 'POST', row(B));
    r = await rest(B.jwt, 'rpc/delete_my_account', 'POST', {}); check('learner B can delete their own account', r.ok, 'status ' + r.status);
    r = await admin('users/' + B.id, 'GET'); check('B\'s user no longer exists', r.status === 404, 'status ' + r.status);
    r = await rest(A.jwt, 'progress?select=user_id'); rows = await j(r); check('B\'s deletion did not touch A\'s data', Array.isArray(rows) && rows.length >= 1 && rows.every(x => x.user_id === A.id));
  } catch (e) {
    failed++; console.log('FAIL  test run aborted: ' + e.message);
  } finally {
    for (const u of users) { try { await admin('users/' + u.id, 'DELETE'); } catch (e) { /* already gone */ } }
    console.log('cleanup: test users removed');
  }
  console.log(failed ? `\n${failed} check(s) FAILED` : '\nAll security checks passed.');
  process.exit(failed ? 1 : 0);
})();
