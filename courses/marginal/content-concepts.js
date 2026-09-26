/* Options and Black–Scholes; interest rates, inflation and the yield curve. */
window.LESSONS = window.LESSONS || [];
(function () {
  const QL = window.QL, N = QL.numeric, usd = QL.usd, pct = QL.pct, int = QL.int, pick = QL.pick, round = QL.round, num = QL.num;

  window.LESSONS.push(

{
  id: 'options', type: 'concept', title: 'Options and the Black–Scholes model',
  blurb: 'How to price the right, but not the obligation, to buy or sell, and why volatility is the key input.',
  level: 'Intermediate', min: 30, tags: ['derivatives', 'black-scholes'], widget: 'bs',
  los: [
    'Explain what a call and a put are, and why an option buyer\'s loss is limited to the premium.',
    'Calculate the payoff and profit of a call or put at expiry.',
    'Say how the stock price, strike, time, volatility and interest rate each affect an option\'s value.',
    'Explain the Black–Scholes call formula as "what I expect to get minus what I expect to pay".',
    'Calculate d₁, d₂ and a call price, and use put–call parity to find the put.'
  ],
  terms: [
    ['Option', 'a contract giving the right, but not the obligation, to buy or sell an asset at a fixed price'],
    ['Call / put', 'a right to buy / a right to sell'],
    ['Strike price (K)', 'the fixed price written into the contract'],
    ['Premium', 'the price you pay today to buy the option'],
    ['Expiry', 'the date the option ends'],
    ['Payoff', 'what the option is worth at expiry'],
    ['Volatility (σ)', 'how much the stock price bounces around'],
    ['Replication', 'copying an option\'s payoff with the stock plus borrowing']
  ],
  body: `
<p>If any symbol below is unfamiliar (σ, ln, e, N), see the <a href="#/lesson/math-basics">math primer</a>. We start with a story and only then reach the formula.</p>

<h2>An option is a reservation</h2>
<aside class="callout story"><b class="lab">Picture this</b>
<p>Sam wants to buy a house currently priced at $300,000, but only in three months. The seller says: "Pay me $5,000 now and I promise to sell it to you for $300,000 any time in the next three months." If prices jump to $340,000, Sam buys at $300,000 and is $35,000 ahead after the $5,000 fee (40,000 − 5,000). If prices fall to $270,000, Sam simply walks away and loses only the $5,000. Sam has bought a <b>call option</b>.</p></aside>
<p>That is all an option is: you pay a fee (the <b>premium</b>) for a <em>right</em>, not an obligation. An option gives its holder the right to trade an asset at a fixed <b>strike price</b> <i>K</i> on or before an <b>expiry</b> date. A <b>call</b> is a right to buy; a <b>put</b> is a right to sell. Because you can walk away, the most the buyer can lose is the premium.</p>

<h2>Payoffs: what an option is worth at expiry</h2>
<div class="fx"><div class="formula">Call payoff = max(S − K, 0) &nbsp;&nbsp;&nbsp; Put payoff = max(K − S, 0)</div><div class="fx-body">
<p><b class="lab">In plain English</b>"max(a, 0)" means "the bigger of <i>a</i> and zero". You have a <em>right</em>, not an obligation, so you only use the option when it helps you. A call helps if the stock ends <em>above</em> the strike; a put helps if it ends <em>below</em>. The most you can lose is the premium you paid.</p>
<dl class="syms"><dt>S</dt><dd>stock price at expiry</dd><dt>K</dt><dd>strike price: the fixed price written into the contract</dd></dl>
<p class="ex"><b class="lab">Worked example</b>Strike K = $100. If the stock ends at $120: the call pays 120 − 100 = <b>$20</b> and the put pays $0. If it ends at $90: the call pays $0 and the put pays 100 − 90 = <b>$10</b>.</p>
<p class="hook"><b class="lab">Remember it as</b>"Call: how far above the strike. Put: how far below. Never negative."</p></div></div>
<div class="example"><b class="lab">Example</b><p>You pay a premium of $4 for a call with strike $100. What is your profit if the stock ends at (a) $120, (b) $90?</p>
<b class="lab sol">Solution</b><p>(a) Payoff $20, minus the $4 premium: <b>+$16</b>.<br>(b) Payoff $0, and you still paid $4: <b>−$4</b>, your maximum possible loss.</p></div>
<details class="pause"><summary>Pause and try: a put</summary><p>You pay $3 for a put with strike $100 and the stock ends at $85. Payoff = 100 − 85 = $15. Profit = 15 − 3 = <b>+$12</b>. If the stock ended at $110, the put pays $0 and you lose the $3.</p></details>
<aside class="callout mistake"><b class="lab">Common mistake</b><p>Mixing up <em>payoff</em> and <em>profit</em>. The payoff ignores what you paid; profit subtracts the premium. An option can have a positive payoff and still lose money overall if the payoff is smaller than the premium.</p></aside>

<h2>What determines the price today?</h2>
<p>Before expiry the option's payoff is uncertain. Five things decide how valuable that uncertain payoff is:</p>
<table class="simple"><thead><tr><th>If this rises...</th><th>Call value</th><th>Put value</th><th>Why</th></tr></thead><tbody>
<tr><td>Stock price S</td><td>Up</td><td>Down</td><td>A call gains when the stock is higher</td></tr>
<tr><td>Strike K</td><td>Down</td><td>Up</td><td>A higher strike means you pay more to buy, or receive more to sell</td></tr>
<tr><td>Time to expiry T</td><td>Usually up</td><td>Usually up</td><td>More time for the stock to move your way</td></tr>
<tr><td>Volatility σ</td><td>Up</td><td>Up</td><td>Big swings help you, and hurt you only up to the premium already paid</td></tr>
<tr><td>Interest rate r</td><td>Slightly up</td><td>Slightly down</td><td>The strike you pay later is worth less today</td></tr>
</tbody></table>
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
<p><b class="lab">In plain English</b>d is a <b>z-score</b>: "how many typical swings is the stock's expected finishing point above the strike?" The top of the fraction is <em>where the stock is now relative to the strike, plus where it is drifting</em>. The bottom is <em>how much it typically wobbles over the option's life</em>. d₂ is simply d₁ pulled down by one full wobble. (Strictly, d₂ is the cleaner "z-score": it equals [ln(S÷K) + (r − σ²÷2)T] ÷ σ√T, the same expression with a minus sign on the σ²÷2 term. d₁ is the version used to weight the stock you receive.)</p>
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

<h3>Why the stock's expected return is not needed</h3>
<p>Black and Scholes noticed that you can build a copy of an option from the stock plus borrowing, adjusting the mix as the price moves (<b>replication</b>). The option must cost the same as its copy, otherwise there is a risk-free profit. The copy's cost depends on today's stock price, volatility, time, interest rate and strike, but <em>not</em> on whether people expect the stock to rise. That is the deep idea; the formula is its calculator.</p>

<h2>Limits</h2>
<p>The formulas on this page are for <b>European</b> options (exercisable only at expiry) on a stock that pays <b>no dividends</b>; extensions handle dividends and early exercise (put–call parity likewise needs those conditions). The model also assumes constant volatility and smooth price paths. In reality, implied volatility varies with strike (the "smile" or "skew", especially after the 1987 crash) and prices jump. Traders quote options in terms of <b>implied volatility</b>: the σ that makes the formula match the market price.</p>
`,
  takeaways: [
    'An option is a paid-for right, not an obligation, so the buyer\'s loss is limited to the premium.',
    'Call payoff = max(S − K, 0); put payoff = max(K − S, 0). Profit = payoff − premium.',
    'Options asymmetric payoffs mean more volatility increases their value.',
    'Black–Scholes prices options by replication and needs no view on expected returns.',
    'Put–call parity is model-free; volatility smiles show where Black–Scholes falls short.'
  ],
  quiz: [
    { k: 'calc', gen: () => { const K = pick([50, 80, 100]), prem = pick([2, 3, 4, 5]), S = K + pick([-15, -8, -3, 5, 12, 20]); const ans = Math.max(S - K, 0) - prem; return N({ q: `You buy a call with strike $${K} for a premium of $${prem}. At expiry the stock is $${S}. What is your profit (or loss) on the option?`, ans, wrong: [S - K, Math.max(S - K, 0), S - K - prem], fmt: x => usd(x, 0), alt: () => S > K ? (S - K) - prem : -prem, tol: 1e-9, fixed: true, why: S > K ? `The call pays S − K = $${S - K}. Profit = $${S - K} − $${prem} premium = ${usd(ans, 0)}.` : `The stock ended at or below the strike, so the call pays nothing. You are out the premium: ${usd(ans, 0)}. That is the most a call buyer can lose.` }); } },
    { k: 'calc', gen: () => { const K = pick([50, 80, 100]), prem = pick([2, 3, 4]), S = K + pick([-20, -10, -4, 6, 15]); const ans = Math.max(K - S, 0) - prem; return N({ q: `You buy a put with strike $${K} for a premium of $${prem}. At expiry the stock is $${S}. What is your profit (or loss)?`, ans, wrong: [K - S, Math.max(K - S, 0), S - K - prem], fmt: x => usd(x, 0), alt: () => S < K ? (K - S) - prem : -prem, tol: 1e-9, fixed: true, why: S < K ? `The put pays K − S = $${K - S}. Profit = $${K - S} − $${prem} = ${usd(ans, 0)}.` : `The stock ended at or above the strike, so the put pays nothing. You lose the premium: ${usd(ans, 0)}.` }); } },
    { k: 'calc', gen: () => { const S = pick([80, 100, 120]), K = pick([90, 100, 110]), r = pick([2, 3, 4]) / 100, s = pick([0.2, 0.25, 0.3, 0.4]), T = pick([0.25, 0.5, 1]); const b = QL.bs(S, K, r, s, T); const ans = b.call; return N({ q: `Use Black–Scholes: S = $${S}, K = $${K}, r = ${r * 100}%, σ = ${s * 100}%, T = ${T} years. What is the call price (nearest cent)?`, ans, wrong: [Math.max(S - K, 0) + 0.01, S * QL.N(b.d1), K * Math.exp(-r * T) * QL.N(b.d2)], fmt: x => usd(x, 2), alt: () => QL.binomCall(S, K, r, s, T, 700), tol: 0.04, fixed: true, why: `d₁ = ${round(b.d1, 3)}, d₂ = ${round(b.d2, 3)}. Stock part S·N(d₁) = ${round(S * QL.N(b.d1), 2)}; strike part K·e^(−rT)·N(d₂) = ${round(K * Math.exp(-r * T) * QL.N(b.d2), 2)}. Call = ${round(S * QL.N(b.d1), 2)} − ${round(K * Math.exp(-r * T) * QL.N(b.d2), 2)} = ${usd(ans, 2)}. (An independent binomial-tree calculation agrees.)` }); } },
    { k: 'calc', gen: () => { const S = pick([80, 100, 120]), K = pick([90, 100, 110]), r = pick([2, 3, 4]) / 100, s = pick([0.2, 0.25, 0.3]), T = pick([0.5, 1]); const b = QL.bs(S, K, r, s, T); const Cr = round(b.call, 2); const ans = Cr - S + K * Math.exp(-r * T); return N({ q: `A call with strike $${K} and expiry in ${T} years costs $${Cr.toFixed(2)}. The stock is $${S} and r = ${r * 100}%. Using put–call parity, what should the put with the same strike and expiry cost?`, ans, wrong: [Cr - S + K, Cr + S - K * Math.exp(-r * T), Cr], fmt: x => usd(x, 2), alt: () => b.put, tol: 0.02, fixed: true, why: `Parity: C − P = S − K·e^(−rT), so P = C − S + K·e^(−rT) = ${Cr.toFixed(2)} − ${S} + ${round(K * Math.exp(-r * T), 2)} = ${usd(ans, 2)}. (Using K instead of the discounted strike forgets the time value of money.)` }); } },
    { k: 'calc', gen: () => { const S = pick([90, 100, 110]), K = pick([95, 100, 105]), r = pick([2, 3, 4]) / 100, s = pick([0.2, 0.3, 0.4]), T = pick([0.25, 0.5, 1]); const d1 = (Math.log(S / K) + (r + s * s / 2) * T) / (s * Math.sqrt(T)); const ans = d1 - s * Math.sqrt(T); return N({ q: `In a Black–Scholes calculation d₁ = ${round(d1, 4)}, σ = ${s * 100}% and T = ${T} years. What is d₂?`, ans, wrong: [d1 - s, d1 + s * Math.sqrt(T), d1 - s * s * T], fmt: x => num(x, 3), alt: () => (Math.log(S / K) + (r - s * s / 2) * T) / (s * Math.sqrt(T)), tol: 5e-4, fixed: true, why: `d₂ = d₁ − σ√T = ${round(d1, 4)} − ${s} × √${T} = ${round(d1, 4)} − ${round(s * Math.sqrt(T), 4)} = ${num(ans, 3)}. The wobble is σ√T, not σ.` }); } },
    { k: 'concept', q: 'What happens to the value of both a call and a put when volatility rises?', o: ['Both rise', 'Both fall', 'Call rises, put falls', 'No effect'], a: 0, why: 'The holder benefits from big moves but the downside is capped at the premium.' },
    { k: 'concept', q: 'Which relationship is put–call parity?', o: ['C − P = S − K·e^(−rT)', 'C + P = S', 'C = P', 'C × P = K'], a: 0, why: 'A long call and short put replicate a forward purchase at K.' },
    { k: 'concept', q: 'In the Black–Scholes call formula, what does N(d₂) roughly represent?', o: ['The (risk-neutral) chance the call finishes in the money', 'The stock\'s expected return', 'The interest rate', 'The option\'s time value'], a: 0, why: 'd₂ is a z-score and N converts it into a probability-style number: the chance that S ends above K, so about 50% when S = K.' },
    { k: 'concept', q: 'What is the most a buyer of a call option can lose?', o: ['The premium paid', 'The strike price', 'The stock price', 'An unlimited amount'], a: 0, why: 'A buyer can simply not exercise, so the loss cannot exceed the price paid for the option.' },
    { k: 'apply', q: 'Sam pays $5,000 for the right to buy a house at $300,000. Prices jump to $340,000. Sam\'s gain after the fee is...', o: ['$35,000', '$40,000', '$45,000', '$5,000'], a: 0, why: 'Buy at $300,000 what is worth $340,000: $40,000 gain, minus the $5,000 fee = $35,000.' },
    { k: 'apply', q: 'An investor owns shares and worries the price may drop. Which option contract would act like insurance?', o: ['A put', 'A call', 'Neither helps', 'A bond'], a: 0, why: 'A put gains when the stock falls, offsetting the loss on the shares.' }
  ],
  related: ['math-basics', 'p-bs73', 'risk']
},

{
  id: 'rates', type: 'concept', title: 'Interest rates, inflation and the yield curve',
  blurb: 'Nominal vs real rates, what the shape of the yield curve says, and why bond prices move opposite to yields.',
  level: 'Intermediate', min: 18, tags: ['rates', 'yield curve', 'bonds'], widget: 'rates',
  los: [
    'Explain an interest rate as the price of borrowing money over time.',
    'Convert between nominal and real rates using the Fisher equation.',
    'Describe normal and inverted yield curves and what each suggests.',
    'Explain why bond prices move opposite to yields, and compute a bond\'s price at a new yield.',
    'Use duration to estimate the percentage price change from a small change in yield.'
  ],
  terms: [
    ['Interest rate', 'the price of borrowing money, per year, as a percentage'],
    ['Nominal rate', 'the rate as quoted, before removing inflation'],
    ['Real rate', 'the rate after removing inflation: growth in buying power'],
    ['Yield', 'the annual return a bond gives if bought at today\'s price and held to the end'],
    ['Yield curve', 'a chart of yields against maturity for bonds of similar safety'],
    ['Term premium', 'extra yield investors want for locking money up for longer'],
    ['Duration', 'a measure of how sensitive a bond\'s price is to a change in yield']
  ],
  body: `
<p>An interest rate is the price of borrowing money over time. It is one of the most important prices in the economy because it is the discount rate behind almost every valuation (see <a href="#/lesson/tvm">the time value of money</a>).</p>

<h2>Nominal vs real</h2>
<p>The <b>nominal</b> rate is what you see quoted. The <b>real</b> rate adjusts for inflation and measures the actual growth in purchasing power.</p>
<div class="fx"><div class="formula">1 + r<sub>real</sub> = (1 + r<sub>nominal</sub>) ÷ (1 + π) &nbsp;≈&nbsp; r<sub>real</sub> ≈ r<sub>nominal</sub> − π</div><div class="fx-body">
<p><b class="lab">In plain English</b>The <b>Fisher equation</b>. Your money grows by (1 + nominal rate), but prices grow by (1 + inflation), so what you can actually <em>buy</em> grows by the ratio. For small numbers, just subtract inflation from the nominal rate.</p>
<dl class="syms"><dt>r<sub>nominal</sub></dt><dd>the quoted interest rate</dd><dt>π</dt><dd>inflation rate ("pi" here, not 3.14…)</dd><dt>r<sub>real</sub></dt><dd>growth in purchasing power</dd></dl>
<p class="ex"><b class="lab">Worked example</b>Nominal 5%, inflation 3%. Exact: 1.05 ÷ 1.03 = 1.0194, so <b>1.94%</b>. Shortcut: 5 − 3 = 2%. Close enough at low rates; they drift apart when inflation is high.</p>
<p class="hook"><b class="lab">Remember it as</b>"Real rate = nominal rate minus inflation."</p></div></div>

<h2>The yield curve</h2>
<aside class="callout story"><b class="lab">Picture this</b>
<p>Lend the government money for 1 year and it might pay 3%. Lend for 10 years and it might pay 4.5%. Plot the yield for every maturity, 1 year, 2 years, 5 years and so on, and you get a line: the <b>yield curve</b>. It is a snapshot of what markets expect and demand.</p></aside>
<ul>
<li><b>Normal (upward sloping):</b> investors want extra compensation for tying up money longer (a <em>term premium</em>), and/or expect short rates to rise.</li>
<li><b>Inverted:</b> short rates above long rates. This usually means markets expect the central bank to cut rates, typically because they expect weaker growth. Inversions have preceded most postwar US recessions, with occasional false alarms.</li>
</ul>
<p>Central banks directly control the very short end (the policy rate). Long yields reflect expectations of future short rates plus the term premium.</p>

<h2>Bond prices and yields move oppositely</h2>
<p>A bond promises fixed cash flows. If market yields rise, those fixed payments are discounted more heavily, and the price falls. Let us see it with numbers.</p>
<div class="example"><b class="lab">Example</b><p>A 5-year bond has a face value of $1,000 and pays a 5% coupon ($50 a year). What is its price if the market yield is (a) 5%, (b) 6%, (c) 4%?</p>
<b class="lab sol">Solution</b>
<table class="steps"><tr><td>At 5%: same as the coupon rate</td><td>$1,000.00</td></tr><tr><td>At 6%: $50 × 4.2124 + $1,000 ÷ 1.06<sup>5</sup></td><td>$957.88</td></tr><tr><td>At 4%</td><td>$1,044.52</td></tr></table>
<p>Yields up 1 point: price down 4.2%. Yields down 1 point: price up 4.5%. Prices and yields move in opposite directions. (The bond formula is covered fully in the <a href="#/lesson/fi-basics">fixed income module</a>.)</p></div>
<p>The sensitivity is called <b>duration</b> (strictly, <em>modified</em> duration). Long-maturity bonds have longer durations and are therefore more sensitive.</p>
<div class="fx"><div class="formula">% change in bond price ≈ − Duration × Δy</div><div class="fx-body">
<p><b class="lab">In plain English</b>Multiply the bond's duration by the change in yield (in decimal form) and flip the sign: prices fall when yields rise. The related idea of <b>Macaulay duration</b> is the payment-weighted average number of years until you get your money back; <b>modified duration</b> (Macaulay ÷ (1 + yield)) is the one that gives price sensitivity. The two are close at low yields. The formula is a linear approximation that works best for small yield changes (it ignores <em>convexity</em>).</p>
<dl class="syms"><dt>Duration</dt><dd>the bond's (modified) duration, in years</dd><dt>Δy</dt><dd>change in yield (1 percentage point = 0.01)</dd></dl>
<p class="ex"><b class="lab">Worked example</b>Duration 7, yields rise from 4% to 5% (Δy = 0.01): price change ≈ −7 × 0.01 = <b>−7%</b>. If yields <em>fall</em> by 1 point, the price rises about 7%. A duration-2 bond would move only about 2%.</p>
<p class="hook"><b class="lab">Remember it as</b>"Yields up, price down; duration is the multiplier."</p></div></div>
<details class="pause"><summary>Pause and try: check it on the bond above</summary><p>The 5-year 5% bond has a modified duration of about 4.33. For a 1-point rise, the shortcut predicts −4.33%. The exact change was −4.21%. Close: the small gap is convexity.</p></details>
<aside class="callout mistake"><b class="lab">Common mistake</b><p>Thinking a rate rise is always bad for bond holders. It lowers the price of bonds you already own, but it also means new bonds pay more. If you hold to maturity, you still get every promised payment, so the price fall only matters if you have to sell early.</p></aside>
`,
  takeaways: [
    'Real rate ≈ nominal rate − inflation (exactly: divide the growth factors).',
    'The yield curve\'s slope summarizes rate expectations and risk premia; inversion has often preceded recessions.',
    'When yields rise, bond prices fall, and more so for long maturities.',
    'Price change ≈ −duration × change in yield, best for small changes.'
  ],
  quiz: [
    { k: 'calc', gen: () => { const n = pick([4, 5, 6, 8]), i = pick([1, 2, 3, 4]); const ans = ((1 + n / 100) / (1 + i / 100) - 1) * 100; return N({ q: `The nominal interest rate is ${n}% and inflation is ${i}%. What is the exact real rate?`, ans, wrong: [n - i, n / i, (n + i)], fmt: x => pct(x, 2), alt: () => (100 * (1 + n / 100) / (1 + i / 100) - 100), tol: 1e-9, fixed: true, why: `Fisher: (1 + ${n}%) ÷ (1 + ${i}%) − 1 = ${round(1 + n / 100, 2)} ÷ ${round(1 + i / 100, 2)} − 1 = ${pct(ans, 2)}. The shortcut ${n} − ${i} = ${n - i}% is close at low rates.` }); } },
    { k: 'calc', gen: () => { const c = pick([3, 4, 5, 6]), y = pick([3, 4, 5, 6, 7]), n = pick([3, 4, 5, 10]); const ans = QL.bondPrice(1000, c / 100, y / 100, n); return N({ q: `A ${n}-year bond has a face value of $1,000 and pays a ${c}% annual coupon. If the market yield is ${y}%, what is its price?`, ans, wrong: [1000, (1000 + 1000 * c / 100 * n) / (1 + y / 100), QL.bondPrice(1000, c / 100, Math.max(0.005, (2 * c - y) / 100), n)], fmt: x => usd(x, 2), alt: () => { let p = 0; for (let t = 1; t <= n; t++) p += 1000 * c / 100 / Math.pow(1 + y / 100, t); return p + 1000 / Math.pow(1 + y / 100, n); }, tol: 1e-6, fixed: true, why: `Discount each payment: $${1000 * c / 100} a year for ${n} years plus $1,000 at the end, all at ${y}%. Price = ${usd(ans, 2)}. ${y > c ? 'The market yield is above the coupon rate, so the bond sells below face value (a discount).' : y < c ? 'The market yield is below the coupon rate, so the bond sells above face value (a premium).' : 'Yield equals coupon rate, so the price equals face value.'}` }); } },
    { k: 'calc', gen: () => { const D = pick([2, 4, 5, 7, 9]), dy = pick([0.5, 1, 1.5, 2]) * pick([1, -1]); const ans = -D * dy; return N({ q: `A bond has a modified duration of ${D}. Yields ${dy > 0 ? 'rise' : 'fall'} by ${Math.abs(dy)} percentage point${Math.abs(dy) === 1 ? '' : 's'}. About how much does its price change?`, ans, wrong: [D * dy, -D * dy / 100, D / Math.abs(dy)], fmt: x => (x > 0 ? '+' : '') + pct(x, 2).replace('−', '−'), alt: () => -(D * dy / 100) * 100, tol: 1e-9, fixed: true, why: `Price change ≈ −duration × Δy = −${D} × (${dy > 0 ? '+' : '−'}${Math.abs(dy)}%) = ${ans > 0 ? '+' : '−'}${Math.abs(round(ans, 2))}%. Prices and yields move in opposite directions, so the sign flips.` }); } },
    { k: 'concept', q: 'An inverted yield curve means...', o: ['Short yields exceed long yields', 'Long yields exceed short yields', 'All yields are zero', 'Yields are equal'], a: 0, why: 'The curve slopes downward.' },
    { k: 'concept', q: 'When market yields rise, existing bond prices generally...', o: ['Fall', 'Rise', 'Stay unchanged', 'Double'], a: 0, why: 'Fixed payments are discounted at a higher rate.' },
    { k: 'concept', q: 'Why are long-maturity bonds more sensitive to yield changes than short ones?', o: ['Their fixed payments are far in the future, so a rate change compounds over more years', 'They pay higher coupons', 'They are riskier borrowers', 'They are traded less often'], a: 0, why: 'Longer duration means a bigger price response to a given change in yield.' },
    { k: 'concept', q: 'Which part of the yield curve do central banks most directly control?', o: ['The very short end (the policy rate)', 'The 30-year yield', 'Inflation expectations directly', 'All maturities equally'], a: 0, why: 'Long yields depend on expected future short rates plus a term premium.' },
    { k: 'apply', q: 'You buy a bond and hold it to maturity. Yields rise the next day, cutting the bond\'s market price. What do you still receive?', o: ['Every promised coupon and the face value, if the issuer pays', 'Only the reduced market price', 'Nothing', 'Half the coupons'], a: 0, why: 'A price fall matters only if you must sell before maturity. Held to maturity, the promised payments are unchanged.' },
    { k: 'apply', q: 'A savings account pays 2% while prices rise 4% a year. What happens to your buying power?', o: ['It shrinks: the real rate is negative', 'It grows by 2%', 'It stays the same', 'It grows by 6%'], a: 0, why: 'Real rate = 1.02 ÷ 1.04 − 1 ≈ −1.9%. Your money grew but bought less.' }
  ],
  related: ['tvm', 'p-dd83', 'fi-basics', 'fi-term']
}

  );
})();
