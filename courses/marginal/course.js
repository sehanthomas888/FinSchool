/* Marginal: the finance and economics course of Rosetta Education.
   This file is the course's whole identity: name, home-page copy and the order of its modules.
   The shared engine (shared/engine.js) does the rest. */
window.COURSE = {
  id: 'marginal',                       // also the prefix of the visitor's saved progress
  name: 'Marginal',
  subject: 'Finance & economics',
  mark: 'M',
  disclaimer: 'A study aid, not financial advice. Summaries are simplified: read the original papers before relying on any detail.',
  primer: { id: 'math-basics', label: 'the math primer' },   // shown on the formula sheet for readers stuck on notation
  hero: {
    eyebrow: 'Economics &amp; finance, from the sources',
    title: 'Learn the ideas.<br>Then read the papers behind them.',
    lead: 'Concept lessons with interactive charts, plain-English breakdowns of landmark finance research, and quizzes to check that it stuck. Aimed at an intermediate reader who wants to understand how markets are actually modeled.'
  },
  how: [
    { title: '1. Learn the concept', text: 'Short lessons with the key equation and the intuition behind it.' },
    { title: '2. Play with it', text: 'Move the sliders and watch the model respond, so the formula becomes a shape you recognize.' },
    { title: '3. Read the source', text: 'Paper pages tell you what to look for, and what critics said afterwards, before you open the original.' }
  ],
  // Modules, in learning order. Every lesson id must appear in exactly one module (tools/audit.js checks this).
  modules: [
    { name: 'Foundations', desc: 'Discounting, risk, and the first equilibrium model of asset prices.', ids: ['reading-papers', 'math-basics', 'tvm', 'risk', 'p-markowitz', 'capm', 'p-sharpe'] },
    { name: 'Are markets efficient?', desc: 'From random walks to factors to psychology: the central debate of modern finance.', ids: ['emh', 'p-fama70', 'p-shiller', 'p-ff93', 'behav', 'p-kt79'] },
    { name: 'Portfolio management', desc: 'Allocation, performance measurement, fees, tail risk and the process of running a portfolio.', ids: ['pm-cal', 'pm-perf', 'p-jensen68', 'pm-fees', 'p-sharpe91', 'pm-risk', 'pm-ips', 'p-bhb86'] },
    { name: 'Financial statement analysis', desc: 'Read the statements, decompose returns, judge earnings quality, and value the firm.', ids: ['fsa-statements', 'fsa-ratios', 'fsa-dupont', 'fsa-choices', 'fsa-quality', 'p-ballbrown68', 'p-sloan96', 'fsa-fcf', 'fsa-multiples', 'fsa-credit', 'p-altman68'] },
    { name: 'Firms and derivatives', desc: 'How financing choices and options are valued.', ids: ['capstruct', 'p-mm58', 'options', 'p-bs73'] },
    { name: 'Rates, banks and information', desc: 'The yield curve, hidden information, and why banks are fragile.', ids: ['rates', 'p-akerlof', 'p-dd83'] },
    { name: 'Fixed income', desc: 'Bond pricing and yields, duration and convexity, the term structure, credit risk, inflation-linked bonds and immunization.', ids: ['fi-basics', 'fi-yield', 'fi-duration', 'fi-term', 'p-litterman91', 'p-campbell91', 'p-estrella98', 'fi-credit', 'p-merton74', 'p-elton01', 'fi-tips', 'fi-immun', 'p-fisherweil71'] }
  ]
  // Optional: accent: { light: { '--accent': '#…', '--accent-soft': '#…', '--c1': '#…' }, dark: { … } } to give a course its own colour.
};
