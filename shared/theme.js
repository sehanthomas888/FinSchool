/* Light/dark theme, shared by the school home and every course so the visitor's choice follows them everywhere. */
(function () {
  'use strict';
  const root = document.documentElement, KEY = 'r357.theme';
  const isDark = () => root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  function sync() {
    const b = document.getElementById('theme');
    if (b) { b.setAttribute('aria-label', isDark() ? 'Switch to light theme' : 'Switch to dark theme'); b.textContent = isDark() ? '☀' : '☾'; }
  }
  function toggle() {
    const next = isDark() ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem(KEY, next); } catch (e) { /* storage unavailable */ }
    sync();
  }
  // legacyKey: an older per-course key to fall back to (so nobody's saved choice is lost)
  function init(legacyKey) {
    try { const t = localStorage.getItem(KEY) || (legacyKey && localStorage.getItem(legacyKey)); if (t) root.dataset.theme = t; } catch (e) { /* ignore */ }
  }
  window.R357 = window.R357 || {};
  window.R357.theme = { init, toggle, sync, isDark };
  init();   // runs from <head>, so a saved choice applies before first paint (no light/dark flash)
})();
