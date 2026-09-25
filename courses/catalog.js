/* The catalog of live courses, shown on the R357 Education home page.
   To list a new course: add one entry here. `path` is the public address, `id` matches the course's own config
   (window.COURSE.id) so the home page can show the visitor's progress. */
window.R357 = window.R357 || {};
window.R357.courses = [
  {
    id: 'marginal',
    name: 'Marginal',
    subject: 'Finance & economics',
    path: '/marginal',
    mark: 'M',
    blurb: 'Portfolio theory, asset pricing, financial statement analysis, corporate finance, options and fixed income, with worked examples, calculators and 20+ landmark papers explained.'
  }
];
