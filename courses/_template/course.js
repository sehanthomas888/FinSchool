/* COURSE TEMPLATE. Copy this folder, then edit this file first: it is the course's whole identity. */
window.COURSE = {
  id: 'template',                        // short, lowercase, no spaces. Also the prefix of the visitor's saved progress
  name: 'Course name',
  subject: 'Subject area',               // shown as a badge on the school home page
  mark: 'C',                             // one letter shown in the small square next to the name
  disclaimer: 'A study aid. Summaries are simplified: check the originals before relying on any detail.',
  // primer: { id: 'lesson-id', label: 'the primer' },   // optional: a lesson to point stuck readers to from the formula sheet
  hero: {
    eyebrow: 'One line about the approach',
    title: 'A headline that says what you will learn.',
    lead: 'Two sentences on who the course is for and what it covers.'
  },
  how: [
    { title: '1. Learn the idea', text: 'What a lesson gives the reader.' },
    { title: '2. Play with it', text: 'What the interactive tools are for.' },
    { title: '3. Go deeper', text: 'Where the reader goes next.' }
  ],
  // Optional: give the course its own accent colour (it defaults to the shared teal). Uncomment to use:
  // accent: {
  //   light: { '--accent': '#1d4ed8', '--accent-soft': '#e3ebfd', '--c1': '#1d4ed8' },
  //   dark:  { '--accent': '#8fb0ff', '--accent-soft': '#16233f', '--c1': '#8fb0ff' }
  // },
  // Modules, in learning order. Every lesson id must appear in exactly one module (tools/audit.js checks this).
  // Keep `modules` as the last entry so there is never a comma to forget.
  modules: [
    { name: 'Getting started', desc: 'A first module.', ids: ['welcome'] }
  ]
};
