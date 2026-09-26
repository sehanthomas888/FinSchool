/* Interactive widgets for this course. Each is a function(el) that builds its UI inside el.
   The shared UI kit (window.Rosetta.ui) supplies sliders, charts, stat tiles and "show the math" panels. */
(function () {
  'use strict';
  const { shell, bind, lineChart, statTiles, mathBox, stepRows } = window.Rosetta.ui;
  const W = {};

  // The pattern every widget follows: describe the sliders, build the shell, then draw in bind()'s callback.
  W.demo = function (el) {
    const specs = [
      { k: 'a', label: 'Steepness (a)', min: 0.5, max: 4, step: 0.1, value: 2, fmt: v => v.toFixed(1) },
      { k: 'x', label: 'Input (x)', min: 0, max: 5, step: 0.1, value: 3, fmt: v => v.toFixed(1) }
    ];
    const ui = shell(el, specs);                       // ui.chart, ui.stats and ui.note are ready-made containers
    const mbox = mathBox(ui, 'Show the math');
    bind(el, specs, v => {
      const y = v.a * v.x * v.x, pts = [];
      for (let t = 0; t <= 5.001; t += 0.1) pts.push([t, v.a * t * t]);
      ui.chart.innerHTML = lineChart({
        title: 'y = a·x²', x: [0, 5], y: [0, 4 * 25], xLabel: 'x', yLabel: 'y',
        series: [{ pts, color: 'var(--c1)', w: 3 }], points: [{ x: v.x, y, color: 'var(--c2)', r: 6 }]
      });
      ui.stats.innerHTML = statTiles([['y', y.toFixed(2)], ['x squared', (v.x * v.x).toFixed(2)]]);
      mbox.innerHTML = stepRows([['1. Square the input', (v.x * v.x).toFixed(2)], ['2. Multiply by a', y.toFixed(2), true]]);
      ui.note.textContent = 'Drag the sliders and watch the point move along the curve.';
    });
  };

  window.WIDGETS = W;   // the engine looks widgets up here by the name a lesson gives in `widget: '…'`
})();
