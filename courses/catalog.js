/* The catalog of live courses, shown on the Rosetta Education home page.
   To list a new course: add one entry here. `path` is the public address, `id` matches the course's own config
   (window.COURSE.id) so the home page can show the visitor's progress. */
window.Rosetta = window.Rosetta || {};
window.Rosetta.courses = [
  {
    id: 'marginal',
    name: 'Marginal',
    subject: 'Finance & economics',
    path: '/marginal',
    mark: 'M',
    blurb: 'Finance from zero: what money, risk and returns are, then portfolio theory, financial statements, options and bonds, with worked examples, fresh-every-time quizzes and 20+ landmark papers explained in plain words.'
  }
];
