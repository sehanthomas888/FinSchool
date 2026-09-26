# Rosetta Education

Repository: https://github.com/sehanthomas888/Rosetta-Education

**Rosetta Education is a school of self-paced courses.** Each course teaches one subject from its sources: plain-English lessons, interactive tools, and breakdowns of the research behind the ideas.

| Level | Name | Example |
| --- | --- | --- |
| The school | **Rosetta Education** | the home page |
| A subject | **Course** | Marginal (finance and economics) |
| A unit of a course | **Module** | Fixed income |
| A page in a module | **Lesson** or **Paper breakdown** | Duration and convexity |

Live at https://rosetta-education.vercel.app, with each course at its own path (Marginal: `/marginal`).

## Layout

```
index.html               the school home page (course catalog)
shared/                  the engine every course uses
  engine.js                router, lessons, quizzes, progress
  ui.js                    charts, sliders, "show the math" panels
  theme.css / theme.js     look and light/dark theme
  school.js                the school's name (one place)
  school-home.js, school.css   the home page
courses/
  catalog.js             the list of live courses shown on the home page
  marginal/              a course: config, content, widgets
  _template/             copy this to start a new course
tools/                   dev server and checks (not deployed)
vercel.json              public addresses, e.g. /marginal
```

Everything is static: plain HTML, CSS and JavaScript, with no build step. One Vercel project serves the whole repo, and every push to `main` redeploys it.

## Run it locally

```bash
node tools/serve.js
```

Then open http://localhost:8123 (school home) or http://localhost:8123/marginal (the course). The server applies the same rewrites as `vercel.json`.

## Check your work before pushing

```bash
node tools/run-checks.js
```

This checks JavaScript syntax; audits every course's content (question banks of at least 8, tag balance, links, that every lesson is in exactly one module, every widget exists, and that **no lesson id ever published has disappeared**); runs every generated quiz question 40 times with an independent second calculation; and independently recomputes the worked examples printed in the lessons. For the interactive tools, also open a course, paste `tools/stress-test.js` into the browser console and check it prints `STRESS TEST PASSED`.

## Writing lessons and quizzes

Lessons are written for someone meeting the subject for the first time: outcomes first, new words explained before use, a story and real numbers before the formula, worked examples, pause-and-try questions and common mistakes. Read **`courses/STYLE.md`** before writing one.

Each lesson has a **question bank** (at least 8 questions, tagged concept / calc / apply). Every attempt draws 5, mixes the kinds, and avoids the previous attempt's questions, so retaking a quiz gives a fresh set. Calculation questions are usually *generated* (new numbers each time) with helpers in `courses/marginal/quiz-lib.js`.

**Learner progress is protected.** It is saved by lesson id, so ids are never removed or renamed (`courses/<course>/lesson-ids.json` plus the audit enforce it), and a saved best quiz score is only replaced by a better percentage, never by a longer or different quiz.

## Adding a course (for example physics)

1. Copy `courses/_template` to `courses/physics` and replace `_template` with `physics` in its `index.html` script paths.
2. Edit `courses/physics/course.js`: name, subject, home-page copy, modules and (optionally) an accent color.
3. Write lessons in `content-*.js` files and interactive tools in `widgets.js`. The template shows every building block, including the formula card format.
4. Add the course to `courses/catalog.js`, and add two rewrites for it in `vercel.json` (copy the `/marginal` pair).
5. Run `node tools/run-checks.js`, then push. There is nothing to configure in Vercel.

## How a course is put together

- `course.js` is the course's identity: name, home-page copy and the order of its modules.
- `content-*.js` hold lessons (`window.LESSONS`), plus an optional glossary and formula sheet.
- `widgets.js` holds the interactive tools, built from the shared UI kit.
- The engine renders everything else, so courses look and behave alike and share one saved theme.

## Learner accounts

Progress is always saved in the visitor's own browser (`localStorage`), per course, and the school home page shows it on each course card. Learners can also **sign in** so their progress follows them between devices; this uses Supabase (see `supabase/README.md` for the full setup, including the two steps that need your own accounts: Google sign-in and a custom email sender).

- Sign-in methods are switched on in `shared/config.js` (`auth: { google, emailCode }`); both are off until set up, and with both off the site behaves exactly as before.
- Progress from several devices (and from before signing in) is merged, never overwritten, by the rules in `shared/progress-sync.js`.
- Learners can delete their account and all their data themselves from the account menu. The privacy page is `privacy.html`.
- Extra checks: `node tools/check-progress-sync.js` (part of `run-checks`) tests the merge rules, and `tools/test-supabase-rls.js` tests the database security rules against the live project.
