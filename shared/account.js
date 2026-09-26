/* Account interface: a "Sign in" button (or the learner's avatar menu) in the header, and the sign-in dialog.
   Renders nothing at all unless a sign-in method is switched on in shared/config.js. */
(function () {
  'use strict';
  window.Rosetta = window.Rosetta || {};
  const auth = window.Rosetta.auth;
  if (!auth || !auth.enabled) { window.Rosetta.account = { mount() {}, setStatus() {} }; return; }

  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const ICON_USER = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>';
  const ICON_G = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="#4285F4" d="M23 12.3c0-.8-.1-1.5-.2-2.2H12v4.3h6.2a5.3 5.3 0 0 1-2.3 3.5v2.9h3.7c2.2-2 3.4-5 3.4-8.5z"/><path fill="#34A853" d="M12 24c3.1 0 5.7-1 7.6-2.8l-3.7-2.9c-1 .7-2.3 1.1-3.9 1.1-3 0-5.5-2-6.4-4.7H1.8v3A11.5 11.5 0 0 0 12 24z"/><path fill="#FBBC05" d="M5.6 14.7a6.9 6.9 0 0 1 0-4.4v-3H1.8a11.5 11.5 0 0 0 0 10.4l3.8-3z"/><path fill="#EA4335" d="M12 4.8c1.7 0 3.2.6 4.4 1.7l3.3-3.3A11.5 11.5 0 0 0 1.8 7.3l3.8 3C6.5 6.8 9 4.8 12 4.8z"/></svg>';

  let holder = null, dialog = null, statusText = '';
  const STATUS = { saving: 'Saving…', saved: 'Progress saved', error: 'Could not save. Will retry.', '': '' };
  const initial = u => ((u.name || u.email || '?').trim()[0] || '?').toUpperCase();

  /* ---------- header control ---------- */
  function mount() {
    const bar = document.querySelector('.top-in'), theme = document.getElementById('theme');
    if (!bar || !theme || holder) return;
    holder = document.createElement('div'); holder.className = 'acct';
    bar.insertBefore(holder, theme);
    render();
    auth.onChange(render);
    auth.ready.then(render);
    document.addEventListener('click', e => { if (holder && !holder.contains(e.target)) closeMenu(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  }

  function render() {
    if (!holder) return;
    const u = auth.user();
    if (!u && (auth.pending || auth.unavailable)) {                       // a saved session is being restored: don't flash "Sign in"
      holder.innerHTML = '<span class="avatar ghost" role="status" aria-label="Restoring your session"></span>';
      return;
    }
    if (!u) {
      holder.innerHTML = `<button type="button" class="signin-btn" aria-label="Sign in to save your progress">${ICON_USER}<span class="signin-text">Sign in</span></button>`;
      holder.querySelector('button').addEventListener('click', () => openSignIn());
      return;
    }
    holder.innerHTML = `<button type="button" class="avatar" aria-haspopup="menu" aria-expanded="false" title="${esc(u.email)}">${esc(initial(u))}</button>
      <div class="acct-menu" role="menu" hidden>
        <div class="acct-who"><span class="acct-label">Signed in as</span><b>${esc(u.name || u.email)}</b>${u.name ? `<span>${esc(u.email)}</span>` : ''}</div>
        <div class="acct-status" id="acct-status" aria-live="polite">${esc(statusText)}</div>
        <button type="button" role="menuitem" data-act="out">Sign out</button>
        <button type="button" role="menuitem" data-act="del" class="danger">Delete my account…</button>
      </div>`;
    const btn = holder.querySelector('.avatar'), menu = holder.querySelector('.acct-menu');
    btn.addEventListener('click', () => { const open = menu.hidden; menu.hidden = !open; btn.setAttribute('aria-expanded', String(open)); });
    holder.querySelector('[data-act=out]').addEventListener('click', async () => { closeMenu(); await auth.signOut(); location.reload(); });
    holder.querySelector('[data-act=del]').addEventListener('click', () => { closeMenu(); openDelete(); });
  }
  function closeMenu() { if (!holder) return; const m = holder.querySelector('.acct-menu'), b = holder.querySelector('.avatar'); if (m) m.hidden = true; if (b) b.setAttribute('aria-expanded', 'false'); }

  function setStatus(s) {
    statusText = STATUS[s] || '';
    const el = document.getElementById('acct-status'); if (el) el.textContent = statusText;
    const b = holder && holder.querySelector('.avatar'); if (b) b.classList.toggle('err', s === 'error');
  }

  /* ---------- dialog ---------- */
  function ensureDialog() {
    if (dialog) return dialog;
    dialog = document.createElement('dialog'); dialog.className = 'acct-dialog'; dialog.setAttribute('aria-labelledby', 'acct-title');
    dialog.innerHTML = '<button type="button" class="acct-x" aria-label="Close">×</button><div class="acct-body"></div>';
    dialog.querySelector('.acct-x').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });          // click on the backdrop closes it
    document.body.appendChild(dialog);
    return dialog;
  }
  const body = () => dialog.querySelector('.acct-body');
  const show = html => { body().innerHTML = html; };
  const busy = (form, on, label) => { form.querySelectorAll('button, input').forEach(el => { el.disabled = on; }); const b = form.querySelector('[type=submit]'); if (b && label) b.textContent = on ? 'Please wait…' : label; };
  const err = (root, msg) => { const p = root.querySelector('.acct-error'); if (p) { p.textContent = msg || ''; p.hidden = !msg; } };

  async function openSignIn() {
    ensureDialog();
    show('<h2 id="acct-title">Save your progress</h2><p class="acct-lead">One moment…</p>');
    if (!dialog.open) dialog.showModal();
    viewChoose(await auth.availableMethods());
  }

  function viewChoose(m) {
    m = m || auth.methods;
    if (!m.google && !m.emailCode) {
      show('<h2 id="acct-title">Sign-in is not available yet</h2><p class="acct-lead">Your progress is still saved on this device. Please check back soon.</p>');
      return;
    }
    show(`<h2 id="acct-title">Save your progress</h2>
      <p class="acct-lead">Sign in to keep your progress on every device. It takes a few seconds and there is nothing to remember.</p>
      ${m.google ? `<button type="button" class="btn big acct-google">${ICON_G}<span>Continue with Google</span></button>` : ''}
      ${m.google && m.emailCode ? '<div class="acct-or"><span>or</span></div>' : ''}
      ${m.emailCode ? `<form class="acct-form" novalidate><label for="acct-email">Email address</label>
        <input id="acct-email" type="email" inputmode="email" autocomplete="email" placeholder="you@example.com" required>
        <button type="submit" class="btn primary big">Email me a code</button></form>` : ''}
      <p class="acct-error" role="alert" hidden></p>
      <p class="acct-fine">We store your email address and your progress, nothing else. <a href="/privacy">Privacy</a></p>`);
    const root = body();
    const g = root.querySelector('.acct-google');
    if (g) g.addEventListener('click', async () => { err(root, ''); g.disabled = true; const r = await auth.signInWithGoogle(); if (!r.ok) { g.disabled = false; err(root, r.error); } });
    const f = root.querySelector('.acct-form');
    if (f) f.addEventListener('submit', async e => {
      e.preventDefault(); err(root, '');
      const email = f.querySelector('input').value.trim();
      if (!/^\S+@\S+\.\S+$/.test(email)) return err(root, 'Please enter a valid email address.');
      busy(f, true, 'Email me a code'); const r = await auth.requestEmailCode(email); busy(f, false, 'Email me a code');
      if (!r.ok) return err(root, r.error);
      viewCode(email);
    });
    const first = root.querySelector('input, button.acct-google'); if (first) first.focus();
  }

  function viewCode(email) {
    show(`<h2 id="acct-title">Check your email</h2>
      <p class="acct-lead">We sent a sign-in code to <b>${esc(email)}</b>. It can take a minute to arrive.</p>
      <form class="acct-form" novalidate><label for="acct-code">Sign-in code</label>
        <input id="acct-code" class="acct-code" type="text" inputmode="numeric" autocomplete="one-time-code" maxlength="12" placeholder="Enter the code" required>
        <button type="submit" class="btn primary big">Sign in</button></form>
      <p class="acct-error" role="alert" hidden></p>
      <p class="acct-fine"><button type="button" class="linklike" data-a="resend">Send a new code</button> · <button type="button" class="linklike" data-a="back">Use a different email</button></p>`);
    const root = body(), f = root.querySelector('form'), input = f.querySelector('input');
    input.focus();
    f.addEventListener('submit', async e => {
      e.preventDefault(); err(root, '');
      const code = input.value.trim(); if (code.length < 6) return err(root, 'Enter the code from the email.');
      busy(f, true, 'Sign in'); const r = await auth.verifyEmailCode(email, code); busy(f, false, 'Sign in');
      if (!r.ok) { err(root, r.error); input.select(); return; }
      dialog.close();                                     // the page picks up the new session through auth.onChange
    });
    let cooling = false;
    root.querySelector('[data-a=resend]').addEventListener('click', async ev => {
      if (cooling) return; cooling = true; ev.target.textContent = 'Sending…';
      const r = await auth.requestEmailCode(email); err(root, r.ok ? '' : r.error);
      ev.target.textContent = r.ok ? 'New code sent' : 'Send a new code';
      setTimeout(() => { cooling = false; ev.target.textContent = 'Send a new code'; }, 30000);
    });
    root.querySelector('[data-a=back]').addEventListener('click', async () => viewChoose(await auth.availableMethods()));
  }

  function openDelete() {
    ensureDialog();
    show(`<h2 id="acct-title">Delete your account?</h2>
      <p class="acct-lead">This permanently deletes your account and all saved progress from our servers. It cannot be undone. Progress you have not signed in for is not affected.</p>
      <form class="acct-form" novalidate><label for="acct-del">Type <b>DELETE</b> to confirm</label>
        <input id="acct-del" type="text" autocomplete="off" required>
        <button type="submit" class="btn danger-btn big">Delete my account</button></form>
      <p class="acct-error" role="alert" hidden></p>`);
    const root = body(), f = root.querySelector('form');
    f.addEventListener('submit', async e => {
      e.preventDefault(); err(root, '');
      if (f.querySelector('input').value.trim() !== 'DELETE') return err(root, 'Type DELETE (in capitals) to confirm.');
      busy(f, true, 'Delete my account'); const r = await auth.deleteAccount();
      if (!r.ok) { busy(f, false, 'Delete my account'); return err(root, r.error); }
      show('<h2 id="acct-title">Account deleted</h2><p class="acct-lead">Your account and saved progress have been removed.</p><button type="button" class="btn primary big" id="acct-done">Close</button>');
      body().querySelector('#acct-done').addEventListener('click', () => { dialog.close(); location.reload(); });
    });
    if (!dialog.open) dialog.showModal();
    f.querySelector('input').focus();
  }

  window.Rosetta.account = { mount, setStatus, openSignIn };
})();
