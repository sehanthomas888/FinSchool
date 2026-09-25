/* Lessons live in files like this one: window.LESSONS.push({...}, {...}).
   Types: 'concept' (body + optional widget), 'guide' (like a concept, for how-to material), 'paper' (a research paper breakdown;
   see courses/marginal/content-papers.js for the extra fields a paper needs). Every lesson needs exactly 3 quiz questions. */
window.LESSONS = window.LESSONS || [];
window.LESSONS.push(

{
  id: 'welcome', type: 'concept', title: 'A sample lesson',
  blurb: 'Shows every building block a lesson can use. Replace it with real content.',
  level: 'Foundations', min: 5, tags: ['sample'], widget: 'demo',
  body: `
<p>Lesson text is plain HTML. Use <code>&lt;h2&gt;</code> for sections and <code>&lt;p&gt;</code> for paragraphs.</p>

<h2>A formula card</h2>
<p>Every formula gets the same five parts, so a reader always knows where to look: the formula, an explanation in plain English, a symbol list, a worked example and a one-line way to remember it.</p>
<div class="fx"><div class="formula">y = a × x<sup>2</sup></div><div class="fx-body">
<p><b class="lab">In plain English</b>Square <i>x</i>, then scale it by <i>a</i>.</p>
<dl class="syms"><dt>a</dt><dd>how steep the curve is</dd><dt>x</dt><dd>the input</dd></dl>
<p class="ex"><b class="lab">Worked example</b>a = 2 and x = 3 gives y = 2 × 9 = <b>18</b>.</p>
<p class="hook"><b class="lab">Remember it as</b>"Square it, then scale it."</p></div></div>

<aside class="callout"><b>A callout</b> for a definition or a caution.</aside>
`,
  takeaways: ['State the two or three things the reader should remember.', 'Keep each one to a sentence.'],
  quiz: [
    { q: 'What is a in y = a × x²?', o: ['How steep the curve is', 'The input', 'The output', 'A constant of nature'], a: 0, why: 'a scales the squared input.' },
    { q: 'a = 2 and x = 3. What is y?', o: ['6', '12', '18', '36'], a: 2, why: '2 × 3² = 2 × 9 = 18.' },
    { q: 'How many quiz questions does every lesson need?', o: ['1', '3', '5', 'Any number'], a: 1, why: 'The audit requires exactly three, so every lesson feels the same.' }
  ],
  related: []
}

);
