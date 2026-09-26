/* Learner accounts, backed by Supabase Auth and the `progress` table.
   window.Rosetta.auth is always present. When accounts are not configured (see shared/config.js) it reports
   `enabled: false` and everything else is a harmless no-op, so the site simply keeps saving progress on this device.

   The Supabase library (213 KB) is loaded lazily: a first-time visitor who never signs in never downloads it. */
(function () {
  'use strict';
  window.Rosetta = window.Rosetta || {};
  const cfg = window.Rosetta.config || {};
  const sb = cfg.supabase || {}, methods = Object.assign({ google: false, emailCode: false }, cfg.auth);
  const enabled = !!(sb.url && sb.key && (methods.google || methods.emailCode));
  const SDK_URL = '/shared/vendor/supabase-2.117.2.js';
  const projectRef = enabled ? new URL(sb.url).hostname.split('.')[0] : '';
  const TOKEN_KEY = 'sb-' + projectRef + '-auth-token';          // where supabase-js keeps the session

  let client = null, session = null, lastUserId = null;
  // `pending`: a saved session exists and is still being restored (slow connection), so the UI must not claim "signed out".
  // `unavailable`: a saved session exists but could not be restored right now (offline, weak signal). The session is kept
  //   and retried automatically, and progress belonging to the account is NOT wiped in the meantime.
  let pending = false, unavailable = false;
  const listeners = [];
  let resolveReady; const ready = new Promise(r => { resolveReady = r; });

  const userFrom = s => {
    if (!s || !s.user) return null;
    const m = s.user.user_metadata || {};
    return { id: s.user.id, email: s.user.email || '', name: m.full_name || m.name || '' };
  };
  const user = () => userFrom(session);

  function notify(event) {
    const uid = session && session.user ? session.user.id : null;
    // token refreshes and repeated events are not sign-ins or sign-outs: only announce real changes
    if (uid === lastUserId && event !== 'FORCE') return;
    lastUserId = uid;
    // supabase-js warns against calling its API inside its own callback, so hand off to the next tick
    setTimeout(() => listeners.forEach(fn => { try { fn(user(), event); } catch (e) { console.error(e); } }), 0);
  }

  function loadSdk() {
    return new Promise((resolve, reject) => {
      if (window.supabase && window.supabase.createClient) return resolve();
      const s = document.createElement('script');
      s.src = SDK_URL; s.onload = () => resolve(); s.onerror = () => reject(new Error('Could not load the sign-in library. Check your connection and try again.'));
      document.head.appendChild(s);
    });
  }

  async function connect() {
    if (client) return client;
    await loadSdk();
    // PKCE: after Google sign-in the browser returns with ?code=… in the query string, which does not clash with this
    // site's #/… page addresses (the older "implicit" flow would put tokens in the #fragment and confuse the router).
    client = window.supabase.createClient(sb.url, sb.key, { auth: { flowType: 'pkce', detectSessionInUrl: true, persistSession: true, autoRefreshToken: true } });
    client.auth.onAuthStateChange((event, s) => { session = s; if (s) unavailable = false; notify(event); });
    const { data } = await client.auth.getSession();
    session = data.session; lastUserId = session && session.user ? session.user.id : null;
    // no session came back, yet the saved token is still there: it could not be refreshed right now. Keep it and let the
    // library's automatic retry restore it (that fires onAuthStateChange above), rather than treating this as a sign-out.
    if (!session && hasStoredSession()) unavailable = true;
    return client;
  }

  const hasStoredSession = () => { try { return !!localStorage.getItem(TOKEN_KEY); } catch (e) { return false; } };
  const returningFromOAuth = () => { try { return new URLSearchParams(location.search).has('code') && !!localStorage.getItem(TOKEN_KEY + '-code-verifier'); } catch (e) { return false; } };

  // Progress that belongs to an account must not stay in the browser after that account signs out (shared computers).
  function forgetSignedInData() {
    try {
      for (const k of Object.keys(localStorage)) {
        if (!/^[a-z0-9-]+\.v1$/.test(k)) continue;
        let v = null; try { v = JSON.parse(localStorage.getItem(k)); } catch (e) { /* not ours */ }
        if (v && typeof v.owner === 'string') { localStorage.removeItem(k); const id = k.replace(/\.v1$/, ''); localStorage.removeItem('rosetta.summary.' + id); localStorage.removeItem('r357.summary.' + id); }
      }
    } catch (e) { /* storage unavailable */ }
  }

  async function init() {
    if (!enabled) { resolveReady(null); return; }
    pending = hasStoredSession() || returningFromOAuth();
    try {
      if (hasStoredSession() || returningFromOAuth()) {
        await connect();
        if (new URLSearchParams(location.search).has('code')) history.replaceState(null, '', location.pathname + location.hash);   // tidy the address bar
      }
    } catch (e) { console.warn('Sign-in unavailable:', e.message); unavailable = hasStoredSession(); }
    pending = false;
    resolveReady(user());
  }

  // Ask Supabase (public endpoint, no login needed) which sign-in providers are really switched on, so the dialog never
  // offers a button that would lead to an error page. Fetched once, when the dialog is first opened.
  let settingsPromise = null;
  function serverProviders() {
    if (!settingsPromise) settingsPromise = fetch(sb.url + '/auth/v1/settings', { headers: { apikey: sb.key } })
      .then(r => r.ok ? r.json() : null).then(j => (j && j.external) || null).catch(() => null);
    return settingsPromise;
  }
  async function availableMethods() {
    const ext = await serverProviders();
    return { google: !!(methods.google && ext && ext.google), emailCode: !!methods.emailCode };
  }

  const friendly = err => {
    const m = (err && err.message) || String(err || '');
    if (/provider is not enabled|unsupported provider/i.test(m)) return 'That sign-in method is not available yet.';
    if (/rate limit|too many/i.test(m)) return 'Too many attempts. Please wait a minute and try again.';
    if (/not authorized|not allowed/i.test(m)) return 'This email address cannot receive sign-in emails yet.';
    if (/expired|invalid/i.test(m) && /token|otp|code/i.test(m)) return 'That code is wrong or has expired. Check it and try again, or request a new one.';
    if (/network|fetch|load/i.test(m)) return 'Could not reach the sign-in service. Check your connection and try again.';
    return m || 'Something went wrong. Please try again.';
  };
  const run = async fn => { try { const r = await fn(); if (r && r.error) return { ok: false, error: friendly(r.error) }; return { ok: true, data: r && r.data }; } catch (e) { return { ok: false, error: friendly(e) }; } };

  window.Rosetta.auth = {
    enabled, methods, ready, availableMethods,
    get unavailable() { return unavailable; },
    get pending() { return pending; },
    user,
    onChange(fn) { listeners.push(fn); },

    signInWithGoogle: () => run(async () => {
      const c = await connect();
      return c.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: location.origin + location.pathname } });
    }),
    // Step 1 of the email-code flow: send a code to the address.
    requestEmailCode: email => run(async () => { const c = await connect(); return c.auth.signInWithOtp({ email: email.trim(), options: { shouldCreateUser: true } }); }),
    // Step 2: check the code the learner typed.
    verifyEmailCode: (email, code) => run(async () => { const c = await connect(); return c.auth.verifyOtp({ email: email.trim(), token: code.replace(/\s+/g, ''), type: 'email' }); }),

    signOut: async () => { try { if (client) await client.auth.signOut(); } catch (e) { /* signing out locally below anyway */ } session = null; forgetSignedInData(); notify('SIGNED_OUT'); },
    deleteAccount: () => run(async () => {
      const c = await connect(); const r = await c.rpc('delete_my_account');
      if (r.error) return r;
      try { await c.auth.signOut({ scope: 'local' }); } catch (e) { /* the account is already gone */ }
      session = null; forgetSignedInData(); notify('SIGNED_OUT'); return { data: true };
    }),
    forgetSignedInData,

    // progress rows (Row Level Security guarantees these only ever touch the signed-in learner's own rows)
    loadProgress: async courseId => {
      if (!client || !session) return { error: new Error('not signed in') };
      return client.from('progress').select('marks,scores,done_count,total,updated_at').eq('course_id', courseId).maybeSingle();
    },
    saveProgress: async (courseId, row) => {
      if (!client || !session) return { error: new Error('not signed in') };
      return client.from('progress').upsert(Object.assign({ user_id: session.user.id, course_id: courseId }, row), { onConflict: 'user_id,course_id' });
    },
    listProgress: async () => {
      if (!client || !session) return { data: [] };
      return client.from('progress').select('course_id,done_count,total');
    }
  };

  init();
})();
