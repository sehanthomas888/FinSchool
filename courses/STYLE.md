# How to write a lesson

Every course at Rosetta Education is written for someone meeting the subject for the first time, but taught with enough precision that they can go on to professional-level work. This guide is the blueprint. It draws on how the CFA Institute curriculum states what a learner will be able to do and follows each idea with a worked example, and on how introductory finance courses at business schools (for example Wharton's Introduction to Corporate Finance and LSE's Finance course) start from intuition and real situations before formulas. It also uses findings from the science of learning: begin with a concrete example and fade towards the abstract rule, learn from worked examples, and practise retrieving what you learned, with mixed and spaced questions.

## The shape of a concept lesson

1. **Outcomes** (`los`): 3 to 5 statements, each starting with an action verb (explain, calculate, compare, interpret). They say what the reader will be able to do, not what the page covers.
2. **Words you will meet** (`terms`): every unfamiliar term the lesson uses, in plain words, before it is used.
3. **A story first.** Open the main idea with a small concrete situation (`<aside class="callout story">`) and real numbers. The formula comes after the reader has felt why it is needed.
4. **The rule, then the formula.** Put the plain-English rule in a sentence, then the formula card (`.fx`): the formula, "In plain English", a symbol list, a worked example, a way to remember it.
5. **Worked examples.** Use `<div class="example">` with an *Example* and a *Solution*. Show every step in a `steps` table. Check the numbers with a script, never by hand.
6. **Pause and try** (`<details class="pause">`): a short question the reader answers before opening the answer. Retrieval before revelation.
7. **Common mistakes** (`<aside class="callout mistake">`): the specific errors beginners make, with the reason.
8. **Interactive tool** (`widget`), then **Summary** (`takeaways`): 3 to 5 lines the reader should keep.
9. **Quiz bank** (`quiz`): see below.

Paper breakdowns add: `plain` (the paper in plain words, with an analogy), `terms`, `los`, and an optional `example` (a tiny worked illustration), then the usual question / idea / method / findings / matters / critique / what to look for.

## Voice

- Second person, short sentences, active verbs. Say "you".
- Never use a symbol or a term before it has been explained. If you must use one that is explained elsewhere, link to that lesson.
- Numbers before letters: show the example, then the formula.
- One idea per section. Headings are questions or plain statements, not jargon.
- Keep the precision. Plain does not mean vague: state assumptions, limits and what the evidence really shows.
- Say what you do not know. Summaries of research must match the source; hedge where the evidence is mixed.

## Quiz banks

A lesson's `quiz` is a **bank of at least 8 questions**. Each attempt draws 5, mixing kinds and avoiding the previous attempt's questions, so "Retake" gives a fresh set. Tag each with a kind:

- `concept`: recall and understanding.
- `calc`: a calculation. Prefer a **generated** question (below) so the numbers change every time.
- `apply`: a short realistic situation ("A bakery reports a profit but cannot pay its suppliers...").

Rules: 3 to 5 options; no "all of the above"; each wrong option should be a real mistake a beginner makes; the explanation (`why`) shows the working.

### Generated questions

```js
const QL = window.QL, N = QL.numeric;
QL.gen('calc', () => { const pv = QL.pick([500, 1000]), r = QL.pick([4, 5, 6]), n = QL.int(2, 6);
  return N({ q: `...`, ans: QL.fv(pv, r / 100, n), wrong: [ /* real mistakes */ ], fmt: x => QL.usd(x, 2),
             alt: () => /* a different way to get the same answer */, why: `...` }); });
```

`alt` is checked by the audit: if the second calculation disagrees with the answer, the audit fails, so a generated question cannot teach a wrong number. Helpers for money, bonds, options and statistics live in `courses/marginal/quiz-lib.js`, and are themselves tested in `tools/check-quiz-lib.js` against slow, obviously-correct calculations.

## Learner progress is sacred

Saved progress is keyed by **lesson id**, and quiz results are saved as a best score. Never remove or rename a lesson id: `courses/<course>/lesson-ids.json` records every id ever published and `tools/audit.js` fails if one disappears. New lessons are fine (run `node tools/audit.js --record-ids`). A best score is only ever replaced by a better *percentage*, so changing a quiz's length never lowers a learner's record.

## Before you publish

```
node tools/run-checks.js
```

then open the lesson, try the pause questions, retake the quiz twice, and read the page on a phone.
