/* Lessons live in files like this one: window.LESSONS.push({...}, {...}).
   Types: 'concept' (body + optional widget), 'guide' (like a concept, for how-to material), 'paper' (a research paper breakdown;
   see courses/marginal/content-papers.js for the extra fields a paper needs).
   Read courses/STYLE.md first: it explains the shape every lesson follows and how the quiz banks work.
   Every lesson needs `los`, `terms` (optional but recommended) and a quiz bank of at least 8 questions. */
window.LESSONS = window.LESSONS || [];
window.LESSONS.push(

{
  id: 'welcome', type: 'concept', title: 'A sample lesson',
  blurb: 'Shows every building block a lesson can use. Replace it with real content.',
  level: 'Foundations', min: 5, tags: ['sample'], widget: 'demo',
  los: ['Explain what each part of this sample lesson is for.', 'Calculate y = a × x² for a given a and x.'],
  terms: [['Formula card', 'a boxed formula with a plain-English explanation, its symbols, a worked example and a memory hook'], ['Quiz bank', 'a pool of questions; each attempt draws a fresh set']],
  body: `
<p>Lesson text is plain HTML. Use <code>&lt;h2&gt;</code> for sections and <code>&lt;p&gt;</code> for paragraphs. Begin with a story, then the rule, then the formula.</p>

<aside class="callout story"><b class="lab">Picture this</b><p>A story or a small concrete situation with real numbers goes first, so the reader feels why the idea is needed.</p></aside>

<h2>A formula card</h2>
<p>Every formula gets the same five parts, so a reader always knows where to look: the formula, an explanation in plain English, a symbol list, a worked example and a one-line way to remember it.</p>
<div class="fx"><div class="formula">y = a × x<sup>2</sup></div><div class="fx-body">
<p><b class="lab">In plain English</b>Square <i>x</i>, then scale it by <i>a</i>.</p>
<dl class="syms"><dt>a</dt><dd>how steep the curve is</dd><dt>x</dt><dd>the input</dd></dl>
<p class="ex"><b class="lab">Worked example</b>a = 2 and x = 3 gives y = 2 × 9 = <b>18</b>.</p>
<p class="hook"><b class="lab">Remember it as</b>"Square it, then scale it."</p></div></div>

<div class="example"><b class="lab">Example</b><p>If a = 5 and x = 2, what is y?</p><b class="lab sol">Solution</b><p>y = 5 × 2² = 5 × 4 = <b>20</b>.</p></div>

<details class="pause"><summary>Pause and try: a = 3, x = 4</summary><p>y = 3 × 16 = <b>48</b>.</p></details>

<aside class="callout mistake"><b class="lab">Common mistake</b><p>Multiplying before squaring: (a × x)² is not the same as a × x².</p></aside>
`,
  takeaways: ['State the two or three things the reader should remember.', 'Keep each one to a sentence.'],
  quiz: [
    { k: 'concept', q: 'What is a in y = a × x²?', o: ['How steep the curve is', 'The input', 'The output', 'A constant of nature'], a: 0, why: 'a scales the squared input.' },
    { k: 'calc', q: 'a = 2 and x = 3. What is y?', o: ['6', '12', '18', '36'], a: 2, why: '2 × 3² = 2 × 9 = 18.' },
    { k: 'calc', q: 'a = 5 and x = 2. What is y?', o: ['20', '100', '14', '10'], a: 0, why: '5 × 2² = 5 × 4 = 20.' },
    { k: 'calc', q: 'a = 3 and x = 4. What is y?', o: ['48', '144', '24', '12'], a: 0, why: '3 × 4² = 3 × 16 = 48.' },
    { k: 'concept', q: 'What does the "Common mistake" box show?', o: ['A specific error beginners make, and why it is wrong', 'The answer', 'The summary', 'The glossary'], a: 0, why: 'It names the slip so readers can avoid it.' },
    { k: 'apply', q: 'A lesson starts with a formula and no story. What does the style guide recommend?', o: ['Open with a small concrete story and real numbers first', 'Nothing', 'Add more formulas', 'Remove the quiz'], a: 0, why: 'Concrete first, then the abstract rule.' },
    { k: 'concept', q: 'How many questions must a quiz bank have at least?', o: ['8', '3', '20', '1'], a: 0, why: 'Each attempt draws 5, so a bank of 8 or more gives a fresh mix.' },
    { k: 'apply', q: 'Why should a wrong option in a quiz be a real beginner mistake?', o: ['So that a wrong answer teaches something and the explanation can address it', 'To make it harder', 'To save space', 'It does not matter'], a: 0, why: 'Good distractors diagnose misunderstandings.' }
  ],
  related: []
}

);
