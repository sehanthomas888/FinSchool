/* Math primer for newcomers: every symbol used later, with numbers. */
window.LESSONS = window.LESSONS || [];
window.LESSONS.push(

{
  id: 'math-basics', type: 'guide', title: 'The math you need, in plain English',
  blurb: 'Percentages, exponents, Σ, standard deviation, e, ln and the bell curve: every symbol used in this course, explained with numbers.',
  level: 'Start here', min: 18, tags: ['math', 'notation', 'basics'], widget: 'normal',
  body: `
<p>Finance formulas look intimidating mostly because of the notation. Underneath, they use about ten ideas, each of which is just arithmetic with a name. This page explains all of them once. If a formula later in the course looks scary, come back here or check the <a href="#/formulas">formula sheet</a>.</p>

<h2>1. Percent, decimal and growth factor</h2>
<p>Formulas want <b>decimals</b>, not percentages. Divide the percentage by 100.</p>
<div class="fx"><div class="formula">7% = 0.07 &nbsp;→&nbsp; growth factor = 1 + 0.07 = 1.07</div><div class="fx-body">
<p><b class="lab">In plain English</b>To grow money by 7%, multiply it by 1.07. To shrink it by 7%, multiply by 0.93. The "1" is your original money; the 0.07 is the extra.</p>
<p class="ex"><b class="lab">Worked example</b>$200 growing 7% → 200 × 1.07 = <b>$214</b>. A stock that falls 20% is multiplied by 0.80.</p>
<p class="hook"><b class="lab">Remember it as</b>"Percent ÷ 100, then add 1 if you want the multiplier."</p></div></div>

<h2>2. Exponents: repeat the multiplication</h2>
<div class="fx"><div class="formula">(1 + r)<sup>n</sup> = (1 + r) × (1 + r) × … (n times)</div><div class="fx-body">
<p><b class="lab">In plain English</b>The small raised number just counts how many times to multiply. A <b>negative</b> exponent means "divide instead": (1 + r)<sup>−n</sup> = 1 ÷ (1 + r)<sup>n</sup>. That's how we shrink future money back to today.</p>
<p class="ex"><b class="lab">Worked example</b>1.07<sup>3</sup> = 1.07 × 1.07 × 1.07 = 1.225. So 7% a year for 3 years grows money by 22.5%, not 21%, because you earn interest on your interest.</p>
<p class="hook"><b class="lab">Remember it as</b>"The little number says how many times."</p></div></div>

<h2>3. Σ (sigma): "add these up"</h2>
<div class="fx"><div class="formula">Σ C<sub>t</sub> &nbsp;=&nbsp; C<sub>1</sub> + C<sub>2</sub> + C<sub>3</sub> + …</div><div class="fx-body">
<p><b class="lab">In plain English</b>Σ is the Greek capital S, for "sum". The little <i>t</i> is a counter (year 1, year 2, …). Σ tells you to compute the thing for every value of the counter, then add the results.</p>
<p class="ex"><b class="lab">Worked example</b>Cash flows of $100, $100, $100 in years 1, 2, 3: Σ C<sub>t</sub> = 100 + 100 + 100 = <b>$300</b>.</p></div></div>

<h2>4. Expected value: the probability-weighted average</h2>
<div class="fx"><div class="formula">E[R] = Σ (probability × outcome)</div><div class="fx-body">
<p><b class="lab">In plain English</b>If you could repeat a gamble many times, E[R] is the average result. Multiply each outcome by its chance, add them up. The square brackets just mean "the expected value of".</p>
<p class="ex"><b class="lab">Worked example</b>50% chance of +20%, 50% chance of −10%: E[R] = 0.5 × 20% + 0.5 × (−10%) = <b>+5%</b>. You'll never actually earn 5% in a single year; it's the long-run average.</p></div></div>

<h2>5. Variance and standard deviation: how bumpy is it?</h2>
<div class="fx"><div class="formula">σ = √( average of (return − average return)² )</div><div class="fx-body">
<p><b class="lab">In plain English</b>Standard deviation (σ, "sigma") measures how far returns typically stray from their average. Bigger σ = bumpier ride. <b>Variance</b> is σ² (the average squared distance before taking the square root). We square so that ups and downs don't cancel out.</p>
<dl class="syms"><dt>σ</dt><dd>standard deviation, the typical swing, in the same units as the returns (%)</dd><dt>σ²</dt><dd>variance</dd></dl>
<p class="ex"><b class="lab">Worked example</b>Yearly returns 4%, 12%, −2%, 10%. Average = 6%. Distances from average: −2, +6, −8, +4. Squared: 4, 36, 64, 16, average = 30. σ = √30 ≈ <b>5.5%</b>. (Statisticians often divide by n−1 = 3 instead of 4, giving 6.3%; the idea is identical.)</p>
<p class="hook"><b class="lab">Remember it as</b>"σ is the typical wobble. About 68% of outcomes land within one σ of the average, and about 95% within two."</p></div></div>

<h3>Volatility scales with the square root of time</h3>
<div class="fx"><div class="formula">σ<sub>year</sub> = σ<sub>day</sub> × √252 &nbsp;&nbsp;&nbsp; σ<sub>T</sub> = σ<sub>year</sub> × √T</div><div class="fx-body">
<p><b class="lab">In plain English</b>Random ups and downs partly cancel over time, so risk grows more slowly than time itself. There are about 252 trading days in a year.</p>
<p class="ex"><b class="lab">Worked example</b>Daily σ of 1% → yearly σ ≈ 1% × √252 ≈ <b>15.9%</b>. For an option lasting half a year, σ√T = 25% × √0.5 = <b>17.7%</b>. That's the number that appears in Black–Scholes.</p></div></div>

<h2>6. Covariance and correlation: do two things move together?</h2>
<div class="fx"><div class="formula">ρ = Cov(A, B) ÷ (σ<sub>A</sub> × σ<sub>B</sub>)</div><div class="fx-body">
<p><b class="lab">In plain English</b>Covariance says whether two assets tend to be above their averages at the same time. It's hard to read because its size depends on the units. Dividing by both σ's squeezes it into a clean scale from <b>−1</b> to <b>+1</b>, called <b>correlation</b> (ρ, "rho").</p>
<dl class="syms"><dt>ρ = +1</dt><dd>move in perfect lockstep (no diversification)</dd><dt>ρ = 0</dt><dd>unrelated</dd><dt>ρ = −1</dt><dd>perfect opposites (can cancel risk completely)</dd></dl></div></div>

<h2>7. e and ln: continuous growth and its undo button</h2>
<div class="fx"><div class="formula">e ≈ 2.718 &nbsp;&nbsp; e<sup>x</sup> &nbsp;&nbsp; ln(e<sup>x</sup>) = x</div><div class="fx-body">
<p><b class="lab">In plain English</b><b>e</b> is a special number (≈ 2.718) that appears when growth happens continuously rather than once a year. e<sup>rT</sup> is the growth factor for earning rate <i>r</i> continuously for <i>T</i> years. Its mirror, <b>e<sup>−rT</sup></b>, is the <b>discount factor</b>: what $1 received at time <i>T</i> is worth today. <b>ln</b> ("natural log") is the undo button for e<sup>x</sup>, and it turns ratios into percentage differences.</p>
<dl class="syms"><dt>e<sup>rT</sup></dt><dd>continuous growth factor</dd><dt>e<sup>−rT</sup></dt><dd>discount factor (always between 0 and 1 for positive r)</dd><dt>ln(a ÷ b)</dt><dd>≈ how many percent bigger a is than b (as a decimal)</dd></dl>
<p class="ex"><b class="lab">Worked example</b>$100 at 5% compounded continuously for a year → 100 × e<sup>0.05</sup> = $105.13 (vs $105 with once-a-year compounding). Discounting: 3% for half a year → e<sup>−0.015</sup> = <b>0.985</b>, so $100 due in six months is worth $98.51 today. And ln(110 ÷ 100) = 0.0953, close to "10% bigger".</p>
<p class="hook"><b class="lab">Remember it as</b>"e<sup>−rT</sup> is the 'shrink back to today' multiplier. ln(S ÷ K) is 'how far apart, in percent'."</p></div></div>

<h2>8. The bell curve and N(z)</h2>
<div class="fx"><div class="formula">z = (value − average) ÷ σ &nbsp;&nbsp;&nbsp; N(z) = chance of being below z</div><div class="fx-body">
<p><b class="lab">In plain English</b>Many random quantities follow a bell-shaped curve. A <b>z-score</b> re-expresses any value as "how many typical swings above or below average". <b>N(z)</b> then gives the probability of landing <em>below</em> that point (the area under the curve to its left). It always lies between 0 and 1.</p>
<dl class="syms"><dt>N(0)</dt><dd>0.50: exactly half the outcomes are below average</dd><dt>N(1)</dt><dd>0.84 &nbsp;(one swing above average)</dd><dt>N(−1)</dt><dd>0.16 &nbsp;(one swing below). Always N(−z) = 1 − N(z)</dd><dt>N(2)</dt><dd>0.98</dd></dl>
<p class="ex"><b class="lab">Worked example</b>Stocks average +7% a year with σ = 15%. Chance of a losing year (below 0%)? z = (0 − 7) ÷ 15 = −0.47, N(−0.47) ≈ <b>32%</b>. Try it below.</p></div></div>

<h2>9. Notation cheat sheet</h2>
<dl class="defs">
  <dt>E[ ]</dt><dd>"expected value of" whatever is inside.</dd>
  <dt>r, r<sub>f</sub></dt><dd>a rate of return; r<sub>f</sub> is the risk-free rate (what a government bill pays).</dd>
  <dt>R<sub>i</sub>, R<sub>m</sub></dt><dd>return on asset <i>i</i>; return on the market. The little letter below is a label, not a number.</dd>
  <dt>β (beta)</dt><dd>sensitivity to the market.</dd>
  <dt>α (alpha)</dt><dd>return beyond what risk explains. (In prospect theory α means something else: curvature. Context tells you which.)</dd>
  <dt>Δ (delta)</dt><dd>"change in", e.g. Δy = change in yield.</dd>
  <dt>×, ÷, ·</dt><dd>×, · and side-by-side letters (like <i>wσ</i>) all mean multiply; a fraction bar or ÷ means divide.</dd>
  <dt>≈</dt><dd>"approximately equal".</dd>
</dl>
`,
  takeaways: [
    'Convert percentages to decimals; a growth factor is 1 + r.',
    'σ is the typical wobble; ρ (−1 to +1) says how two assets move together.',
    'e^(−rT) shrinks future money to today; N(z) turns a z-score into a probability.'
  ],
  quiz: [
    { q: 'You earn 8% in a year. What number do you multiply your money by?',
      o: ['0.08', '1.08', '8', '0.92'], a: 1, why: 'Growth factor = 1 + 0.08 = 1.08.' },
    { q: 'A discount factor e^(−rT) equals 0.95. What does it mean?',
      o: ['$1 received at time T is worth $0.95 today', '$1 today is worth $0.95 at time T', 'The interest rate is 95%', 'The bond will default 5% of the time'], a: 0, why: 'Discount factors shrink future money back to its present value.' },
    { q: 'A stock\'s return is 1 standard deviation below average (z = −1). About what chance is there of doing worse than that?',
      o: ['About 16%', 'About 50%', 'About 84%', 'About 2%'], a: 0, why: 'N(−1) ≈ 0.16, so around one year in six is worse.' }
  ],
  related: ['tvm', 'risk', 'options']
}

);
