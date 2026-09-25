/* Options and interest-rate concept lessons. */
window.LESSONS = window.LESSONS || [];
window.LESSONS.push(

{
  id: 'options', type: 'concept', title: 'Options and the Black–Scholes model',
  blurb: 'How to price the right, but not the obligation, to buy or sell, and why volatility is the key input.',
  level: 'Intermediate', min: 20, tags: ['derivatives', 'volatility'], widget: 'bs',
  body: `
<p>An <b>option</b> gives its holder the right, but not the obligation, to trade an asset at a fixed <b>strike price</b> <i>K</i> on or before an expiry date. A <b>call</b> is a right to buy; a <b>put</b> is a right to sell. If any symbol below is unfamiliar (σ, ln, e, N), see the <a href="#/lesson/math-basics">math primer</a>.</p>

<h2>Payoffs: what an option is worth at expiry</h2>
<div class="fx"><div class="formula">Call payoff = max(S − K, 0) &nbsp;&nbsp;&nbsp; Put payoff = max(K − S, 0)</div><div class="fx-body">
<p><b class="lab">In plain English</b>"max(a, 0)" means "the bigger of <i>a</i> and zero". You have a <em>right</em>, not an obligation, so you only use the option when it helps you. A call helps if the stock ends <em>above</em> the strike; a put helps if it ends <em>below</em>. The most you can lose is the premium you paid.</p>
<dl class="syms"><dt>S</dt><dd>stock price at expiry</dd><dt>K</dt><dd>strike price: the fixed price written into the contract</dd></dl>
<p class="ex"><b class="lab">Worked example</b>Strike K = $100. If the stock ends at $120: the call pays 120 − 100 = <b>$20</b> and the put pays $0. If it ends at $90: the call pays $0 and the put pays 100 − 90 = <b>$10</b>.</p>
<p class="hook"><b class="lab">Remember it as</b>"Call: how far above the strike. Put: how far below. Never negative."</p></div></div>

<h2>What determines the price today?</h2>
<p>Before expiry the option's payoff is uncertain. Five things decide how valuable that uncertain payoff is:</p>
<ul>
  <li><b>Stock price S ↑:</b> call gets more valuable, put less.</li>
  <li><b>Strike K ↑:</b> call less valuable (you pay more to buy), put more.</li>
  <li><b>Time to expiry T ↑:</b> more time for the stock to move in your favor, so usually both are worth more.</li>
  <li><b>Volatility σ ↑:</b> both calls and puts are worth more. Big swings help you (large upside) but hurt you only up to the premium you already paid.</li>
  <li><b>Interest rate r ↑:</b> a small effect: calls up slightly, puts down slightly, because the strike you'll pay later is worth less today.</li>
</ul>
<p>Notice what is <em>not</em> on the list: the stock's expected return. That surprising fact comes from replication (below).</p>

<h2>The Black–Scholes formula: the story first</h2>
<p>Read the formula like a shopping receipt: <b>call price = what you expect to get − what you expect to pay</b>. If you exercise, you <em>get</em> the stock and <em>pay</em> the strike. Both only happen if the option finishes in the money, so each is weighted by a probability-like number, and both are converted into today's money.</p>

<div class="fx"><div class="formula">C = S · N(d<sub>1</sub>) − K · e<sup>−rT</sup> · N(d<sub>2</sub>)</div><div class="fx-body">
<p><b class="lab">In plain English</b>Call value = (the stock you'd receive, weighted) − (the strike you'd pay, shrunk to today's money and weighted).</p>
<dl class="syms">
  <dt>C</dt><dd>price (value) of the call option today</dd>
  <dt>S</dt><dd>current stock price</dd>
  <dt>K</dt><dd>strike price</dd>
  <dt>T</dt><dd>time to expiry, in years (6 months = 0.5)</dd>
  <dt>r</dt><dd>risk-free interest rate, as a decimal (3% = 0.03)</dd>
  <dt>σ</dt><dd>volatility of the stock, as a decimal (25% = 0.25); it hides inside d₁ and d₂</dd>
  <dt>e<sup>−rT</sup></dt><dd>discount factor: today's value of $1 paid at expiry (see the <a href="#/lesson/math-basics">math primer</a>)</dd>
  <dt>N(·)</dt><dd>bell-curve probability function: gives a number between 0 and 1</dd>
</dl>
<p><b class="lab">The four pieces</b></p>
<dl class="syms">
  <dt>K·e<sup>−rT</sup></dt><dd>the strike, expressed in today's money</dd>
  <dt>N(d₂)</dt><dd>the chance the call finishes in the money, in a simplified "risk-neutral" world where the stock is assumed to grow at the risk-free rate. It is a pricing weight, close to but not the same as the real-world probability.</dd>
  <dt>K·e<sup>−rT</sup>·N(d₂)</dt><dd>the strike you <em>expect to pay</em> (only paid if you exercise), in today's money</dd>
  <dt>S·N(d₁)</dt><dd>the stock you <em>expect to receive</em>. It is weighted a bit more heavily than N(d₂) because when you do exercise, the stock tends to be well above the strike. N(d₁) is also the option's <b>delta</b>: how many dollars the call gains per $1 rise in the stock.</dd>
</dl>
<p class="ex"><b class="lab">Worked example (the widget's starting numbers)</b>S = $100, K = $100, T = 0.5 years, σ = 25%, r = 3%. Stock part: 100 × 0.5688 = 56.88. Strike part: 100 × 0.9851 × 0.4986 = 49.12. Call = 56.88 − 49.12 = <b>$7.76</b>.</p>
<p class="hook"><b class="lab">Remember it as</b>"Call = (stock I get × weight) − (strike I pay × probability), all in today's money."</p></div></div>

<h3>Where do d₁ and d₂ come from?</h3>
<div class="fx"><div class="formula">d<sub>1</sub> = [ ln(S ÷ K) + (r + σ²÷2) × T ] ÷ ( σ × √T ) &nbsp;&nbsp;&nbsp; d<sub>2</sub> = d<sub>1</sub> − σ√T</div><div class="fx-body">
<p><b class="lab">In plain English</b>d is a <b>z-score</b>: "how many typical swings is the stock's expected finishing point above the strike?" The top of the fraction is <em>where the stock is now relative to the strike, plus where it's drifting</em>. The bottom is <em>how much it typically wobbles over the option's life</em>. d₂ is simply d₁ pulled down by one full wobble. (Strictly, d₂ is the cleaner "z-score": it equals [ln(S÷K) + (r − σ²÷2)T] ÷ σ√T, the same expression with a minus sign on the σ²÷2 term. d₁ is the version used to weight the stock you receive.)</p>
<dl class="syms">
  <dt>ln(S÷K)</dt><dd>how far above or below the strike the stock is now, in percent terms (0 when S = K)</dd>
  <dt>(r + σ²÷2) × T</dt><dd>expected drift over the option's life; the σ²÷2 is a small technical adjustment for how percentage returns compound</dd>
  <dt>σ√T</dt><dd>the typical wobble over the life of the option (volatility grows with the <em>square root</em> of time)</dd>
</dl>
<p class="ex"><b class="lab">Worked example</b>ln(100÷100) = 0. Drift: (0.03 + 0.25²÷2) × 0.5 = (0.03 + 0.03125) × 0.5 = 0.030625. Wobble: 0.25 × √0.5 = 0.25 × 0.7071 = 0.1768. So d₁ = (0 + 0.030625) ÷ 0.1768 = <b>0.173</b>, and d₂ = 0.173 − 0.177 = <b>−0.004</b>.</p>
<p class="hook"><b class="lab">Remember it as</b>"d₁ = (distance + drift) ÷ wobble. d₂ = d₁ minus one wobble."</p></div></div>

<h3>And N(d)?</h3>
<p>N turns a z-score into a probability-style number: N(0) = 0.50, N(1) = 0.84, N(−1) = 0.16, N(2) = 0.98. In our example N(0.173) = 0.569 and N(−0.004) = 0.499. When the strike equals the stock price, the call is roughly a coin flip to end up in the money (in the risk-neutral sense), which is why N(d₂) is close to 0.5. (The bell-curve widget in the <a href="#/lesson/math-basics">math primer</a> lets you play with N.)</p>

<h3>The whole calculation in ten lines</h3>
<table class="steps">
  <tr><td>1. ln(S ÷ K)</td><td>ln(1) = 0</td></tr>
  <tr><td>2. Wobble: σ√T</td><td>0.25 × 0.7071 = 0.1768</td></tr>
  <tr><td>3. Drift: (r + σ²÷2) × T</td><td>0.030625</td></tr>
  <tr><td>4. d₁ = (step 1 + step 3) ÷ step 2</td><td>0.1732</td></tr>
  <tr><td>5. d₂ = d₁ − step 2</td><td>−0.0035</td></tr>
  <tr><td>6. N(d₁)</td><td>0.5688</td></tr>
  <tr><td>7. N(d₂)</td><td>0.4986</td></tr>
  <tr><td>8. Strike in today's money: K·e<sup>−rT</sup></td><td>100 × 0.9851 = 98.51</td></tr>
  <tr><td>9. Stock you'd get: S × N(d₁)</td><td>56.88</td></tr>
  <tr><td>10. Strike you'd pay: 98.51 × N(d₂)</td><td>49.12</td></tr>
  <tr class="tot"><td>Call = step 9 − step 10</td><td>$7.76</td></tr>
</table>
<p>The widget below has a <b>Show the math</b> panel that fills in exactly these steps with whatever numbers you choose.</p>

<h3>The put, and put–call parity</h3>
<div class="fx"><div class="formula">P = K · e<sup>−rT</sup> · N(−d<sub>2</sub>) − S · N(−d<sub>1</sub>) &nbsp;&nbsp;&nbsp; C − P = S − K · e<sup>−rT</sup></div><div class="fx-body">
<p><b class="lab">In plain English</b>The put is the mirror image: you <em>receive</em> the strike and <em>give up</em> the stock. <b>Put–call parity</b> says that buying a call and selling a put (same strike, same expiry) is the same as agreeing today to buy the stock at K later. So the call-minus-put price gap must equal today's stock price minus the strike in today's money. If not, someone could profit risk-free.</p>
<p class="ex"><b class="lab">Worked example</b>C = 7.76 and P = 6.27, so C − P = <b>1.49</b>. And S − K·e<sup>−rT</sup> = 100 − 98.51 = <b>1.49</b>. ✔</p>
<p class="hook"><b class="lab">Remember it as</b>"Call minus put = stock minus discounted strike."</p></div></div>

<h3>Why the stock's expected return isn't needed</h3>
<p>Black and Scholes noticed that you can build a copy of an option from the stock plus borrowing, adjusting the mix as the price moves (<b>replication</b>). The option must cost the same as its copy, otherwise there is a risk-free profit. The copy's cost depends on today's stock price, volatility, time, interest rate and strike, but <em>not</em> on whether people expect the stock to rise. That's the deep idea; the formula is its calculator.</p>

<h2>Limits</h2>
<p>The formulas on this page are for <b>European</b> options (exercisable only at expiry) on a stock that pays <b>no dividends</b>; extensions handle dividends and early exercise (put–call parity likewise needs those conditions). The model also assumes constant volatility and smooth price paths. In reality, implied volatility varies with strike (the "smile" or "skew", especially after the 1987 crash) and prices jump. Traders quote options in terms of <b>implied volatility</b>: the σ that makes the formula match the market price.</p>
`,
  takeaways: [
    'Options give asymmetric payoffs, so more volatility increases their value.',
    'Black–Scholes prices options by replication and needs no view on expected returns.',
    'Put–call parity is model-free; volatility smiles show where Black–Scholes falls short.'
  ],
  quiz: [
    { q: 'What happens to the value of both a call and a put when volatility rises?',
      o: ['Both fall', 'Both rise', 'Call rises, put falls', 'No effect'], a: 1, why: 'The holder benefits from big moves but the downside is capped at the premium.' },
    { q: 'Which relationship is put–call parity?',
      o: ['C + P = S', 'C − P = S − K·e^(−rT)', 'C = P', 'C × P = K'], a: 1, why: 'A long call and short put replicate a forward purchase at K.' },
    { q: 'In the Black–Scholes call formula, what does N(d₂) roughly represent?',
      o: ['The stock\'s expected return', 'The chance the call finishes in the money', 'The interest rate', 'The option\'s time value'], a: 1, why: 'd₂ is a z-score and N converts it into a probability-style number: the (risk-neutral) chance that S ends above K, so about 50% when S = K.' }
  ],
  related: ['math-basics', 'p-bs73', 'risk']
},

{
  id: 'rates', type: 'concept', title: 'Interest rates, inflation and the yield curve',
  blurb: 'Nominal vs real rates, what the shape of the yield curve says, and why bond prices move opposite to yields.',
  level: 'Intermediate', min: 12, tags: ['macro', 'bonds'], widget: 'rates',
  body: `
<p>An interest rate is the price of borrowing money over time. It's one of the most important prices in the economy because it's the discount rate behind almost every valuation.</p>

<h2>Nominal vs real</h2>
<p>The <b>nominal</b> rate is what you see quoted. The <b>real</b> rate adjusts for inflation and measures the actual growth in purchasing power.</p>
<div class="fx"><div class="formula">1 + r<sub>real</sub> = (1 + r<sub>nominal</sub>) ÷ (1 + π) &nbsp;≈&nbsp; r<sub>real</sub> ≈ r<sub>nominal</sub> − π</div><div class="fx-body">
<p><b class="lab">In plain English</b>The <b>Fisher equation</b>. Your money grows by (1 + nominal rate), but prices grow by (1 + inflation), so what you can actually <em>buy</em> grows by the ratio. For small numbers, just subtract inflation from the nominal rate.</p>
<dl class="syms"><dt>r<sub>nominal</sub></dt><dd>the quoted interest rate</dd><dt>π</dt><dd>inflation rate ("pi" here, not 3.14…)</dd><dt>r<sub>real</sub></dt><dd>growth in purchasing power</dd></dl>
<p class="ex"><b class="lab">Worked example</b>Nominal 5%, inflation 3%. Exact: 1.05 ÷ 1.03 = 1.0194, so <b>1.94%</b>. Shortcut: 5 − 3 = 2%. Close enough at low rates; they drift apart when inflation is high.</p>
<p class="hook"><b class="lab">Remember it as</b>"Real rate = nominal rate minus inflation."</p></div></div>

<h2>The yield curve</h2>
<p>The <b>yield curve</b> plots government bond yields against maturity. Its shape is a compact summary of what markets expect:</p>
<ul>
  <li><b>Normal (upward sloping):</b> investors want extra compensation for tying up money longer (a <em>term premium</em>), and/or expect short rates to rise.</li>
  <li><b>Inverted:</b> short rates above long rates. This usually means markets expect the central bank to cut rates, typically because they expect weaker growth. Inversions have preceded most postwar US recessions, with occasional false alarms.</li>
</ul>
<p>Central banks directly control the very short end (the policy rate). Long yields reflect expectations of future short rates plus the term premium.</p>

<h2>Bond prices and yields move oppositely</h2>
<p>A bond promises fixed cash flows. If market yields rise, those fixed payments are discounted more heavily, and the price falls. The sensitivity is called <b>duration</b> (strictly, <em>modified</em> duration). Long-maturity bonds have longer durations and are therefore more sensitive.</p>
<div class="fx"><div class="formula">% change in bond price ≈ − Duration × Δy</div><div class="fx-body">
<p><b class="lab">In plain English</b>Multiply the bond's duration by the change in yield (in decimal form) and flip the sign: prices fall when yields rise. The related idea of <b>Macaulay duration</b> is the payment-weighted average number of years until you get your money back; <b>modified duration</b> (Macaulay ÷ (1 + yield)) is the one that gives price sensitivity. The two are close at low yields. The formula is a linear approximation that works best for small yield changes (it ignores <em>convexity</em>).</p>
<dl class="syms"><dt>Duration</dt><dd>the bond's (modified) duration, in years</dd><dt>Δy</dt><dd>change in yield (1 percentage point = 0.01)</dd></dl>
<p class="ex"><b class="lab">Worked example</b>Duration 7, yields rise from 4% to 5% (Δy = 0.01): price change ≈ −7 × 0.01 = <b>−7%</b>. If yields <em>fall</em> by 1 point, the price rises about 7%. A duration-2 bond would move only about 2%.</p>
<p class="hook"><b class="lab">Remember it as</b>"Yields up, price down; duration is the multiplier."</p></div></div>
`,
  takeaways: [
    'Real rate ≈ nominal rate − inflation.',
    'The yield curve\'s slope summarizes rate expectations and risk premia; inversion has often preceded recessions.',
    'When yields rise, bond prices fall, and more so for long maturities.'
  ],
  quiz: [
    { q: 'If the nominal rate is 5% and inflation is 3%, the approximate real rate is...',
      o: ['8%', '2%', '15%', '−2%'], a: 1, why: 'r_real ≈ 5% − 3% = 2%.' },
    { q: 'An inverted yield curve means...',
      o: ['Long yields exceed short yields', 'Short yields exceed long yields', 'All yields are zero', 'Yields are equal'], a: 1, why: 'The curve slopes downward.' },
    { q: 'When market yields rise, existing bond prices generally...',
      o: ['Rise', 'Fall', 'Stay unchanged', 'Double'], a: 1, why: 'Fixed payments are discounted at a higher rate.' }
  ],
  related: ['tvm', 'p-dd83', 'fi-basics', 'fi-term']
}

);
