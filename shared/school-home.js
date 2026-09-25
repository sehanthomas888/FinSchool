/* R357 Education home page: the course catalog, with the visitor's own progress in each course.
   Progress comes from the small summary each course writes to localStorage (see shared/engine.js). */
(function () {
  'use strict';
  const S = window.R357.school, courses = window.R357.courses || [], theme = window.R357.theme;

  const summary = id => { try { return JSON.parse(localStorage.getItem('r357.summary.' + id)); } catch (e) { return null; } };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function courseCard(c) {
    const s = summary(c.id), started = s && s.done > 0, pct = s && s.total ? Math.round(s.done / s.total * 100) : 0;
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

  document.getElementById('app').innerHTML = `
    <section class="hero">
      <p class="eyebrow">${S.name}</p>
      <h1>${S.tagline}</h1>
      <p class="lead">${S.name} is a school of self-paced courses. Each one teaches a subject the way its practitioners think: plain-English lessons, interactive tools you can play with, and breakdowns of the research behind the ideas.</p>
    </section>
    <section class="courses">
      <h2 class="section-label">Courses</h2>
      <div class="course-grid">${courses.map(courseCard).join('')}</div>
      <p class="more">New courses are added as they're ready.</p>
    </section>
    <section class="howto">
      <h2>How every course works</h2>
      <div class="three">
        <div><b>Learn the idea</b><p>Short lessons that start with the intuition, then give the exact statement, with worked examples.</p></div>
        <div><b>Play with it</b><p>Interactive tools let you change the inputs and watch the result move, so the idea becomes something you can feel.</p></div>
        <div><b>Read the source</b><p>Breakdowns of the landmark papers tell you what to look for, and what critics said afterwards, before you open the original.</p></div>
      </div>
    </section>`;

  document.getElementById('site-footer').innerHTML = `<p><b>${S.name}</b>. Study aids, not professional advice.</p>`;
  document.getElementById('theme').addEventListener('click', theme.toggle);
  theme.sync();
})();
