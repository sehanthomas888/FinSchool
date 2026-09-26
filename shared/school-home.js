/* R357 Education home page: the course catalog, with the visitor's own progress in each course.
   Progress comes from the account (when signed in) or from the small summary each course keeps in this browser
   (see shared/engine.js). */
(function () {
  'use strict';
  const S = window.R357.school, courses = window.R357.courses || [], theme = window.R357.theme, auth = window.R357.auth, account = window.R357.account;
  const cloud = {};                                              // course id -> { done_count, total } from the signed-in account

  const localSummary = id => { try { return JSON.parse(localStorage.getItem('r357.summary.' + id)); } catch (e) { return null; } };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  // the account is the source of truth when signed in; otherwise this browser's copy
  const progressFor = id => {
    const c = auth.user() && cloud[id], l = localSummary(id);
    if (c && c.total) return { done: c.done_count, total: c.total };
    return l ? { done: l.done, total: l.total } : null;
  };

  function courseCard(c) {
    const s = progressFor(c.id), started = s && s.done > 0, pct = s && s.total ? Math.round(s.done / s.total * 100) : 0;
    const progress = s
      ? `<div class="progress" aria-label="Your progress"><div class="bar"><i style="width:${pct}%"></i></div><span>${s.done} of ${s.total} lessons complete</span></div>`
      : '<div class="progress"><span>Not started</span></div>';
    return `<a class="course" href="${c.path}">
      <div class="course-top"><span class="mark">${esc(c.mark || c.name[0])}</span><span class="badge">${esc(c.subject)}</span></div>
      <h3>${esc(c.name)}</h3>
      <p>${esc(c.blurb)}</p>
      ${progress}
      <span class="go">${started ? 'Continue' : 'Start the course'} →</span></a>`;
  }

  function drawCourses() {
    const nudge = auth.enabled && !auth.user() ? '<p class="more">Sign in to keep your progress on every device.</p>' : '';
    document.getElementById('course-grid').innerHTML = courses.map(courseCard).join('');
    document.getElementById('course-note').innerHTML = nudge || "New courses are added as they're ready.";
  }

  document.getElementById('app').innerHTML = `
    <section class="hero">
      <p class="eyebrow">${S.name}</p>
      <h1>${S.tagline}</h1>
      <p class="lead">${S.name} is a school of self-paced courses. Each one teaches a subject the way its practitioners think: plain-English lessons, interactive tools you can play with, and breakdowns of the research behind the ideas.</p>
    </section>
    <section class="courses">
      <h2 class="section-label">Courses</h2>
      <div class="course-grid" id="course-grid"></div>
      <div id="course-note" class="more"></div>
    </section>
    <section class="howto">
      <h2>How every course works</h2>
      <div class="three">
        <div><b>Learn the idea</b><p>Short lessons that start with the intuition, then give the exact statement, with worked examples.</p></div>
        <div><b>Play with it</b><p>Interactive tools let you change the inputs and watch the result move, so the idea becomes something you can feel.</p></div>
        <div><b>Read the source</b><p>Breakdowns of the landmark papers tell you what to look for, and what critics said afterwards, before you open the original.</p></div>
      </div>
    </section>`;
  drawCourses();

  document.getElementById('site-footer').innerHTML = `<p><b>${S.name}</b>. Study aids, not professional advice. <a href="/privacy">Privacy</a></p>`;
  document.getElementById('theme').addEventListener('click', theme.toggle);
  theme.sync();
  account.mount();

  async function loadCloud() {
    if (!auth.user()) { drawCourses(); return; }
    const { data } = await auth.listProgress();
    (data || []).forEach(r => { cloud[r.course_id] = r; });
    drawCourses();
  }
  auth.ready.then(loadCloud);
  auth.onChange(u => { if (!u) Object.keys(cloud).forEach(k => delete cloud[k]); loadCloud(); });
})();
