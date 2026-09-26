/* Site-wide configuration for learner accounts (Supabase).
   The URL and the "publishable" key are PUBLIC by design: they only identify the project. What each visitor can do
   is enforced inside the database by Row Level Security (supabase/migrations). Never put a secret/service key here. */
window.Rosetta = window.Rosetta || {};
window.Rosetta.config = {
  supabase: {
    url: 'https://aqrxgjguqazsezlsmbiw.supabase.co',
    key: 'sb_publishable_wH5_aJhywwffgg43b3Onnw_Dom9vjrw'
  },
  // Which sign-in methods to offer. With both off, the site works exactly as before (progress saved on this device only).
  //   google:    turn on after Google sign-in is enabled in Supabase (see supabase/README.md)
  //   emailCode: turn on after a custom email sender and the code template are set up (see supabase/README.md)
  auth: { google: true, emailCode: false }
};

// Developer convenience, localhost only: http://localhost:8123/marginal?auth=google,emailCode shows the sign-in UI for testing.
(function () {
  try {
    if (!/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) return;
    const q = new URLSearchParams(location.search).get('auth');
    if (q) { const on = q.split(','); window.Rosetta.config.auth = { google: on.includes('google'), emailCode: on.includes('emailCode') }; }
  } catch (e) { /* ignore */ }
})();
