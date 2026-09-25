/* Foundations concept lessons: the "how to read a paper" guide, time value, risk, CAPM, efficiency, behavioral, capital structure. */
window.LESSONS = window.LESSONS || [];
window.LESSONS.push(

{
  id: 'reading-papers', type: 'guide', title: 'How to read a finance paper',
  blurb: 'A practical method for getting the value out of a research paper without following every proof.',
  level: 'Start here', min: 10, tags: ['method'],
  body: `
<p>Textbooks tell you what economists concluded. Papers show you <em>how</em> they concluded it, and where the conclusion could be wrong. Finance papers look intimidating, but nearly all of them follow the same skeleton, and you don't have to follow every derivation to learn a great deal from one. If the notation is what worries you, read the <a href="#/lesson/math-basics">math primer</a> first.</p>

<h2>The three-pass method</h2>
<ol>
  <li><b>Pass 1: skim (10 minutes).</b> Read the title, abstract, introduction, conclusion, and look at every figure. Goal: write one sentence stating the question and one stating the claimed answer.</li>
  <li><b>Pass 2: read (45–60 minutes).</b> Read the model or data section and the main tables. Skip derivations you can't follow. Goal: know what evidence was used and what the headline result looks like <em>as a number</em>.</li>
  <li><b>Pass 3: interrogate.</b> Ask what would have to be true for the result to be wrong. Read the robustness section, then search for the papers that cite this one; the critiques usually live there.</li>
</ol>

<h2>Six questions to ask every paper</h2>
<ol>
  <li><b>What is the question?</b> If you can't say it in a sentence, keep skimming.</li>
  <li><b>What is the claim?</b> What would we observe in the world if it were true?</li>
  <li><b>What is the evidence?</b> Which data, which years, which universe of assets? ("NYSE stocks, 1963–1991" is a very specific claim.)</li>
  <li><b>How big is the effect in real-world terms?</b> A 0.5% monthly return is large. A 0.02% return that disappears after trading costs is not.</li>
  <li><b>What else could explain it?</b> Risk? Mispricing? Data quirks? Luck?</li>
  <li><b>Does it survive out of sample?</b> In later years, other countries, other asset classes?</li>
</ol>

<h2>Finance-specific red flags</h2>
<ul>
  <li><b>Data mining (the "factor zoo").</b> If hundreds of variables are tested, some will look significant by chance. Harvey, Liu &amp; Zhu (2016) argue new factors should clear a t-statistic of about 3, not the usual 2.</li>
  <li><b>Publication decay.</b> McLean &amp; Pontiff (2016) studied 97 published return predictors and found returns were about 26% lower out of sample and about 58% lower after publication.</li>
  <li><b>The joint hypothesis problem.</b> Any test of "are prices rational?" also tests a specific model of what expected returns <em>should</em> be. You can't separate the two.</li>
  <li><b>Survivorship and look-ahead bias.</b> Using only firms or funds that still exist, or using information that wasn't yet public at the time.</li>
  <li><b>Ignoring costs.</b> Paper profits that need constant trading in tiny, illiquid stocks often vanish in practice.</li>
</ul>

<h2>Numbers you'll see constantly</h2>
<div class="fx"><div class="formula">t = estimate ÷ standard error</div><div class="fx-body">
<p><b class="lab">In plain English</b>The <b>t-statistic</b> asks: "how many times bigger is the result than its own noise?" The standard error is a measure of the noise (the uncertainty in the estimate). Rule of thumb: if |t| is above about 2, the result is unlikely to be pure chance.</p>
<p class="ex"><b class="lab">Worked example</b>A strategy earned an average 0.60% a month with a standard error of 0.25%. t = 0.60 ÷ 0.25 = <b>2.4</b>, so probably not luck. If the standard error were 0.50%, t = 1.2 and you couldn't tell it from luck.</p>
<p class="hook"><b class="lab">Remember it as</b>"Signal divided by noise. Above 2 is interesting."</p></div></div>
<dl class="defs">
  <dt>R²</dt><dd>Share of the variation in the outcome that the model explains (0% to 100%). High R² does not mean the model is causal or true.</dd>
  <dt>Alpha (α)</dt><dd>Return left over after accounting for the risks in the model. "Positive alpha" means outperformance <em>relative to that model</em>.</dd>
  <dt>Beta (β)</dt><dd>Sensitivity of an asset's return to a risk factor, usually the market.</dd>
  <dt>Sharpe ratio</dt><dd>(Return − risk-free rate) ÷ volatility. Reward per unit of risk.</dd>
  <dt>Significant ≠ important</dt><dd>With enough data, tiny effects become "significant". Always look at the size of the effect.</dd>
</dl>

<aside class="callout"><b>How to use this site with real papers.</b> Every paper page here has a <em>What to look for</em> list. Read that first, open the original with the Scholar link, and try to find each item yourself. Then come back and check the critiques section.</aside>
`,
  takeaways: [
    'Skim first: one sentence for the question, one for the claim.',
    'Always translate results into economic size, not just significance.',
    'Ask what else could explain the result, and whether it survived after publication.'
  ],
  quiz: [
    { q: 'What is the main goal of the first (skim) pass through a paper?',
      o: ['Verify every proof', 'State the question and the claimed answer in one sentence each', 'Replicate the tables', 'Find the citations'],
      a: 1, why: 'The skim is about orienting yourself: what is asked, and what is claimed.' },
    { q: 'An estimate is 0.9 and its standard error is 0.3. What is the t-statistic, and what does it suggest?',
      o: ['t = 0.27, clearly noise', 't = 3, unlikely to be pure chance', 't = 1.2, borderline', 't = 0.9, meaningless'],
      a: 1, why: 't = estimate ÷ standard error = 0.9 ÷ 0.3 = 3, comfortably above the rule-of-thumb bar of 2.' },
    { q: 'What does McLean & Pontiff\'s finding on publication decay suggest?',
      o: ['Published anomalies get stronger over time', 'Published anomaly returns shrink after publication', 'Journals reject anomalies', 'Anomalies only exist outside the US'],
      a: 1, why: 'Post-publication returns were substantially lower, consistent with data mining and/or investors trading the anomaly away.' }
  ],
  related: ['math-basics', 'tvm', 'emh']
},

{
  id: 'tvm', type: 'concept', title: 'The time value of money',
  blurb: 'Why a dollar today beats a dollar tomorrow, and how every valuation in finance is built on that idea.',
  level: 'Foundations', min: 14, tags: ['discounting', 'valuation'], widget: 'tvm',
  body: `
<p>A dollar today is worth more than a dollar a year from now. You could invest it and earn a return, prices may rise in the meantime, and the future payment might not arrive. This one idea underpins almost everything else in finance: stocks, bonds, projects and even the papers later in this course all compute a <b>present value</b>.</p>

<h2>Compounding: money growing forward</h2>
<div class="fx"><div class="formula">FV = PV × (1 + r)<sup>n</sup></div><div class="fx-body">
<p><b class="lab">In plain English</b>Each period your money is multiplied by (1 + r). Do that <i>n</i> times and you've multiplied by (1 + r) <i>n</i> times over. That is all the little raised <i>n</i> means. (New to exponents? See the <a href="#/lesson/math-basics">math primer</a>.)</p>
<dl class="syms"><dt>FV</dt><dd>future value: what it's worth at the end</dd><dt>PV</dt><dd>present value: what you put in today</dd><dt>r</dt><dd>return per period as a decimal (7% → 0.07)</dd><dt>n</dt><dd>number of periods</dd></dl>
<p class="ex"><b class="lab">Worked example</b>$1,000 at 7% for 3 years: 1,000 × 1.07 × 1.07 × 1.07 = <b>$1,225.04</b>. Year by year: $1,070 → $1,144.90 → $1,225.04. Each year's interest earns interest of its own.</p>
<p class="hook"><b class="lab">Remember it as</b>"Multiply by 1 + r, once per year."</p></div></div>

<h2>Discounting: future money shrunk back to today</h2>
<p>Run compounding backwards and you get <b>discounting</b>: the value today of a payment you'll receive later. The rate <i>r</i> used this way is called the <b>discount rate</b>. It is the return you require for waiting and for bearing risk. Riskier cash flows get a higher discount rate, so they are worth less today.</p>
<div class="fx"><div class="formula">PV = FV ÷ (1 + r)<sup>n</sup></div><div class="fx-body">
<p><b class="lab">In plain English</b>Divide by (1 + r) once for every period you have to wait. The longer the wait and the higher the rate, the less the future money is worth today.</p>
<dl class="syms"><dt>PV</dt><dd>what the future payment is worth today</dd><dt>FV</dt><dd>the amount you'll receive later</dd><dt>r</dt><dd>discount rate: what you could earn elsewhere, plus a premium for risk</dd><dt>n</dt><dd>periods until you receive it</dd></dl>
<p class="ex"><b class="lab">Worked example</b>You're promised $1,225.04 in 3 years and the right discount rate is 7%. PV = 1,225.04 ÷ 1.07³ = 1,225.04 ÷ 1.225 = <b>$1,000</b>. (It's the same example as above, run in reverse.)</p>
<p class="hook"><b class="lab">Remember it as</b>"Waiting shrinks money: divide once per year of waiting."</p></div></div>

<aside class="callout"><b>Rule of 72.</b> Money doubles in roughly 72 ÷ r years when r is expressed in percent. At 6%, about 12 years; at 9%, about 8. (It's a shortcut approximation, good for rates between about 4% and 15%.)</aside>

<h2>Net present value: is a project worth doing?</h2>
<div class="fx"><div class="formula">NPV = Σ C<sub>t</sub> ÷ (1 + r)<sup>t</sup> &nbsp; (including the up-front cost as a negative C<sub>0</sub>)</div><div class="fx-body">
<p><b class="lab">In plain English</b>Take each cash flow, shrink it to today's money for the time you wait, and add everything up (that's what Σ means). Cash you pay out counts as negative. If the total is positive, the project earns more than your required return.</p>
<dl class="syms"><dt>C<sub>t</sub></dt><dd>cash flow in year <i>t</i> (negative if you pay, positive if you receive)</dd><dt>t</dt><dd>the year (0 = today, so no shrinking)</dd><dt>r</dt><dd>discount rate</dd></dl>
<p class="ex"><b class="lab">Worked example</b>Pay $1,000 today; receive $600 at the end of year 1 and $600 at the end of year 2; r = 10%. NPV = −1,000 + 600÷1.10 + 600÷1.21 = −1,000 + 545.45 + 495.87 = <b>+$41.32</b>. Positive, so accept.</p>
<p class="hook"><b class="lab">Remember it as</b>"Shrink every cash flow to today, add them, subtract the cost. Positive = worth doing."</p></div></div>

<h2>Two shortcuts worth memorizing</h2>
<div class="fx"><div class="formula">PV of a perpetuity = C ÷ r</div><div class="fx-body">
<p><b class="lab">In plain English</b>A <b>perpetuity</b> pays the same amount every year forever. Its value is the size of the pot that would earn exactly that payment as interest.</p>
<dl class="syms"><dt>C</dt><dd>the yearly payment (first one a year from now)</dd><dt>r</dt><dd>discount rate</dd></dl>
<p class="ex"><b class="lab">Worked example</b>$50 a year forever at 5%: 50 ÷ 0.05 = <b>$1,000</b>. Check: $1,000 in a 5% account earns $50 a year, forever, without touching the $1,000.</p>
<p class="hook"><b class="lab">Remember it as</b>"Payment ÷ rate."</p></div></div>

<div class="fx"><div class="formula">PV of a growing perpetuity = C ÷ (r − g)</div><div class="fx-body">
<p><b class="lab">In plain English</b>Same idea, but the payment grows by <i>g</i> each year. Growth partly cancels the discounting, so the effective rate is <i>r</i> minus <i>g</i>. This is the <b>Gordon growth model</b>, the simplest way to value a stock as the present value of its dividends. It only works if <i>g</i> is less than <i>r</i>.</p>
<p class="ex"><b class="lab">Worked example</b>Next year's dividend is $2, growing 3% a year; you require 8%. Value = 2 ÷ (0.08 − 0.03) = 2 ÷ 0.05 = <b>$40</b>.</p>
<p class="hook"><b class="lab">Remember it as</b>"Payment ÷ (rate minus growth)."</p></div></div>

<h2>Why it matters for the rest of the course</h2>
<p>When Shiller asks whether stock prices are "too volatile", he compares them to the present value of later dividends. When Modigliani and Miller talk about the "cost of capital", they mean the discount rate. Almost every debate in asset pricing is really a debate about <em>which discount rate to use and why it changes</em>.</p>
`,
  takeaways: [
    'Value = discounted future cash flows. Higher discount rate → lower value.',
    'Small differences in the rate compound into huge differences over decades.',
    'A stock or bond is only ever a stream of cash flows plus a discount rate.'
  ],
  quiz: [
    { q: 'At a 6% return, roughly how long does it take money to double (Rule of 72)?',
      o: ['6 years', '12 years', '18 years', '36 years'], a: 1, why: '72 ÷ 6 = 12.' },
    { q: 'If the discount rate rises, the present value of a fixed future payment...',
      o: ['Rises', 'Falls', 'Stays the same', 'Becomes negative'], a: 1, why: 'A larger denominator means a smaller present value.' },
    { q: 'What is the value of a perpetuity paying $50 per year at a 5% discount rate?',
      o: ['$250', '$500', '$1,000', '$2,500'], a: 2, why: 'C ÷ r = 50 ÷ 0.05 = $1,000.' }
  ],
  related: ['math-basics', 'risk', 'rates']
},

{
  id: 'risk', type: 'concept', title: 'Risk, return and diversification',
  blurb: 'How combining assets can cut risk without cutting expected return, and where that stops working.',
  level: 'Foundations', min: 16, tags: ['portfolio', 'risk'], widget: 'portfolio',
  body: `
<p>Investing means accepting uncertainty in exchange for a higher <em>expected</em> return. Finance measures the reward as the <b>expected return</b> (the probability-weighted average outcome) and the risk as <b>volatility</b>, the standard deviation of returns. (Both are explained with numbers in the <a href="#/lesson/math-basics">math primer</a>.)</p>

<h2>Why combining assets reduces risk</h2>
<p>Suppose two assets don't move in lockstep. When one has a bad year, the other is often fine. Averaging them smooths the ride. How much smoothing depends on their <b>correlation</b> (ρ), which runs from −1 (perfect opposites) to +1 (identical).</p>
<div class="fx"><div class="formula">σ<sub>p</sub>² = w²σ<sub>A</sub>² + (1−w)²σ<sub>B</sub>² + 2·w·(1−w)·ρ·σ<sub>A</sub>·σ<sub>B</sub></div><div class="fx-body">
<p><b class="lab">In plain English</b>Portfolio variance has three parts: asset A's own risk, asset B's own risk, and a <b>teamwork term</b> that depends on how the two move together. The teamwork term is the one that changes with correlation ρ. The lower ρ is, the smaller that term, and the safer the portfolio. Take the square root at the end to get volatility back in percent.</p>
<dl class="syms"><dt>w</dt><dd>weight (share of the portfolio) in asset A; (1 − w) is the weight in B</dd><dt>σ<sub>A</sub>, σ<sub>B</sub></dt><dd>volatility of each asset</dd><dt>ρ</dt><dd>correlation between A and B (−1 to +1)</dd><dt>σ<sub>p</sub></dt><dd>volatility of the whole portfolio (σ<sub>p</sub>² is its variance)</dd></dl>
<p class="ex"><b class="lab">Worked example</b>60% stocks (σ = 18%), 40% bonds (σ = 6%), ρ = 0.2. Stocks' term: 0.6² × 18² = 116.6. Bonds' term: 0.4² × 6² = 5.8. Teamwork: 2 × 0.6 × 0.4 × 0.2 × 18 × 6 = 10.4. Variance = 132.8; σ<sub>p</sub> = √132.8 = <b>11.5%</b>. The simple weighted average of the volatilities would be 0.6×18 + 0.4×6 = 13.2%, so diversification saved <b>1.7 points</b> of risk for free.</p>
<p class="hook"><b class="lab">Remember it as</b>"Own risk + own risk + a teamwork term. ρ is the diversification dial."</p></div></div>
<p>Only when ρ = +1 does portfolio volatility equal the simple weighted average of the two volatilities. For any ρ &lt; 1 it is <em>lower</em>, while expected return remains the weighted average (0.6 × 8% + 0.4 × 3% = 6% in the example). That gap is the closest thing finance has to a free lunch. The widget below has a <b>Show the math</b> panel that computes these three terms as you move the sliders.</p>

<h2>Two kinds of risk</h2>
<ul>
  <li><b>Idiosyncratic (firm-specific) risk</b>: a factory fire, a failed drug trial. It's independent across companies, so diversification washes it out. A portfolio of a few dozen stocks removes most of it.</li>
  <li><b>Systematic (market) risk</b>: recessions, rate shocks, pandemics. It hits everything at once and can't be diversified away.</li>
</ul>
<p>This distinction is the whole basis of the CAPM: since idiosyncratic risk is free to remove, the market shouldn't pay you for bearing it.</p>

<h2>Where diversification falls short</h2>
<p>Correlations aren't constant. In crises, assets that looked unrelated often fall together (2008 is the standard example), which is when you need the protection most. And diversification doesn't help if everything you own shares a hidden common exposure.</p>

<h2>Sharpe ratio: reward per unit of risk</h2>
<div class="fx"><div class="formula">Sharpe ratio = (R<sub>p</sub> − r<sub>f</sub>) ÷ σ<sub>p</sub></div><div class="fx-body">
<p><b class="lab">In plain English</b>Take the return above what a safe asset pays (the <b>excess return</b>) and divide by the risk you took to get it. It answers "how much reward per unit of bumpiness?" Higher is better.</p>
<dl class="syms"><dt>R<sub>p</sub></dt><dd>portfolio return</dd><dt>r<sub>f</sub></dt><dd>risk-free rate</dd><dt>σ<sub>p</sub></dt><dd>portfolio volatility</dd></dl>
<p class="ex"><b class="lab">Worked example</b>The 60/40 mix above: return 6%, risk-free 2%, volatility 11.5%. Sharpe = (6 − 2) ÷ 11.5 = <b>0.35</b>. Stocks alone: (8 − 2) ÷ 18 = 0.33. The mix beats stocks alone per unit of risk.</p>
<p class="hook"><b class="lab">Remember it as</b>"Extra return per unit of wobble."</p></div></div>
`,
  takeaways: [
    'Portfolio risk depends on correlations, not just on each asset\'s own risk.',
    'Diversification removes idiosyncratic risk but not systematic risk.',
    'Correlations can rise in a crisis, so the benefit is weakest when you need it most.'
  ],
  quiz: [
    { q: 'Which correlation between two assets gives the greatest diversification benefit?',
      o: ['+1', '0', '−1', 'Correlation doesn\'t matter'], a: 2, why: 'With ρ = −1 the assets move in opposite directions and risk can be cancelled entirely with the right weights.' },
    { q: 'What does diversification mainly eliminate?',
      o: ['Systematic risk', 'Idiosyncratic risk', 'Inflation risk', 'All risk'], a: 1, why: 'Firm-specific risks are independent and average out; market-wide risk remains.' },
    { q: 'If two assets are perfectly correlated (ρ = +1), portfolio volatility is...',
      o: ['Lower than the weighted average', 'Equal to the weighted average', 'Higher than either asset', 'Zero'], a: 1, why: 'At ρ = +1 the teamwork term makes the variance formula collapse to (wσ_A + (1−w)σ_B)², so volatility is just the weighted average.' }
  ],
  related: ['math-basics', 'capm', 'p-markowitz', 'pm-cal']
},

{
  id: 'capm', type: 'concept', title: 'CAPM and the security market line',
  blurb: 'The first model to say precisely how much extra return investors should demand for taking on risk.',
  level: 'Foundations', min: 16, tags: ['asset pricing', 'beta'], widget: 'sml',
  body: `
<p>Diversification tells us that some risk is free to remove. So which risk should be rewarded? The <b>Capital Asset Pricing Model (CAPM)</b> answers: only the part that can't be diversified, an asset's exposure to the overall market, measured by <b>beta</b>.</p>

<h2>Beta: how much does it move with the market?</h2>
<div class="fx"><div class="formula">β<sub>i</sub> = Cov(R<sub>i</sub>, R<sub>m</sub>) ÷ Var(R<sub>m</sub>)</div><div class="fx-body">
<p><b class="lab">In plain English</b>Beta is the stock's typical move when the market moves 1%. Covariance (Cov) measures how the stock and the market move together; dividing by the market's own variance (Var) scales the answer so the market itself has a beta of exactly 1.</p>
<dl class="syms"><dt>β<sub>i</sub></dt><dd>beta of stock <i>i</i></dd><dt>Cov(R<sub>i</sub>, R<sub>m</sub>)</dt><dd>how the stock's return and the market's return move together</dd><dt>Var(R<sub>m</sub>)</dt><dd>variance of the market's return (σ<sub>m</sub>²)</dd></dl>
<p class="ex"><b class="lab">Worked example</b>β = 1.3: when the market rises 10%, this stock tends to rise about 13%; when it falls 10%, about 13%. β = 0.5 moves about half as much as the market. β = 0 (a Treasury bill) doesn't move with it.</p>
<p class="hook"><b class="lab">Remember it as</b>"Beta = sensitivity to the market."</p></div></div>

<h2>The model: required return = safe return + a reward for market risk</h2>
<div class="fx"><div class="formula">E[R<sub>i</sub>] = r<sub>f</sub> + β<sub>i</sub> × (E[R<sub>m</sub>] − r<sub>f</sub>)</div><div class="fx-body">
<p><b class="lab">In plain English</b>The return you should <em>require</em> from a stock is what a safe asset pays, plus extra for the market risk you take on. The extra is your beta times the <b>market risk premium</b> (how much more than the safe rate the whole market is expected to earn).</p>
<dl class="syms"><dt>E[R<sub>i</sub>]</dt><dd>expected (required) return on stock <i>i</i></dd><dt>r<sub>f</sub></dt><dd>risk-free rate</dd><dt>β<sub>i</sub></dt><dd>the stock's beta</dd><dt>E[R<sub>m</sub>] − r<sub>f</sub></dt><dd>market risk premium</dd></dl>
<p class="ex"><b class="lab">Worked example</b>r<sub>f</sub> = 3%, market premium = 5.5%, β = 1.3. Required return = 3% + 1.3 × 5.5% = 3% + 7.15% = <b>10.15%</b>. If you forecast 12%, the stock sits 1.85 points above the line: positive <b>alpha</b>.</p>
<p class="hook"><b class="lab">Remember it as</b>"Safe rate plus beta times the market premium."</p></div></div>
<p>Plotted against beta this is a straight line, the <b>security market line (SML)</b>. The widget below has a <b>Show the math</b> panel with your numbers.</p>

<h2>What it's used for</h2>
<ul>
  <li><b>Cost of equity.</b> Companies use it as the discount rate for projects (see <a href="#/lesson/capstruct">capital structure</a>).</li>
  <li><b>Alpha.</b> An asset whose expected return sits above the line has positive alpha and looks underpriced; below the line, overpriced.</li>
  <li><b>Performance evaluation.</b> Did a fund beat what its market exposure alone would have earned?</li>
</ul>

<h2>Does it work?</h2>
<p>Partly. The core insight that only systematic risk earns a premium shaped all of modern finance. But the empirical line is flatter than the theory predicts: low-beta stocks have earned more than CAPM says, and high-beta stocks less. Roll (1977) also pointed out that the true "market portfolio" includes every asset, so the model can't really be tested. Multi-factor models such as <a href="#/lesson/p-ff93">Fama–French</a> emerged to explain what beta alone misses.</p>
`,
  takeaways: [
    'CAPM prices only systematic risk: expected return = risk-free + β × market premium.',
    'Points above the security market line have positive alpha, and points below have negative alpha.',
    'Empirically the line is flatter than the theory predicts. That gap motivated multi-factor models.'
  ],
  quiz: [
    { q: 'According to CAPM, what expected return should a zero-beta asset have?',
      o: ['The market return', 'Zero', 'The risk-free rate', 'The market premium'], a: 2, why: 'With β = 0, E[R] = rf + 0 × premium = rf.' },
    { q: 'rf = 3%, market risk premium = 5%, β = 1.2. What is CAPM\'s expected return?',
      o: ['6%', '8%', '9%', '11%'], a: 2, why: '3% + 1.2 × 5% = 3% + 6% = 9%.' },
    { q: 'Which type of risk does CAPM say earns a premium?',
      o: ['Firm-specific risk', 'Systematic (market) risk', 'Both equally', 'Neither'], a: 1, why: 'Firm-specific risk can be diversified away, so investors aren\'t compensated for it.' }
  ],
  related: ['risk', 'p-sharpe', 'p-ff93', 'pm-perf']
},

{
  id: 'emh', type: 'concept', title: 'Efficient markets',
  blurb: 'If prices already reflect what is known, can anyone consistently beat the market?',
  level: 'Intermediate', min: 15, tags: ['market efficiency', 'random walk'], widget: 'randomwalk',
  body: `
<p>The <b>Efficient Market Hypothesis (EMH)</b> says security prices <em>fully reflect available information</em>. If so, price changes are driven by news, and news is by definition unpredictable, so prices should follow something like a <b>random walk</b> and no strategy based on known information should reliably earn excess returns.</p>

<h2>Three forms</h2>
<ul>
  <li><b>Weak form:</b> prices reflect all past price and volume data, so technical analysis (chart-reading) can't work.</li>
  <li><b>Semi-strong form:</b> prices reflect all <em>public</em> information (earnings, announcements), so fundamental analysis can't work either.</li>
  <li><b>Strong form:</b> prices reflect <em>all</em> information, even private. Almost nobody believes this fully; insider trading is illegal for a reason.</li>
</ul>

<h2>Why it might hold</h2>
<p>Competition. Thousands of well-resourced traders search for mispricings. When they find one, they trade it and the price moves until the opportunity is gone. Prices need not be perfect, just hard to beat consistently after costs. Fama and French (2010) found that the combined portfolio of actively managed US equity funds is close to the market portfolio, so the high costs of active management show up as lower returns to investors, and few funds appear to earn enough above their benchmarks to cover their costs.</p>

<h2>Why it can't be perfectly true</h2>
<p>Grossman and Stiglitz (1980) noticed a paradox: if prices already reflect all information, nobody has an incentive to pay for research, and then prices wouldn't reflect it. Markets must be <em>efficient enough</em> that costly research barely pays. There are also <b>limits to arbitrage</b>: mispricings can persist if trading against them is risky, costly or capital-constrained.</p>

<h2>The joint hypothesis problem</h2>
<p>To say a return was "abnormal" you need a model of the normal return. If you find an apparent anomaly, either markets are inefficient <em>or</em> your model of risk is wrong, and you can't tell which. That's why efficiency debates rarely end.</p>

<h2>Can a simple pattern beat noise?</h2>
<p>The widget below simulates prices that are pure randomness. Look at how much "pattern" you can see anyway, then test a "follow yesterday's move" rule. Then add some day-to-day momentum and see how strong it has to be before the rule pays.</p>
`,
  takeaways: [
    'Efficiency means prices reflect available information, so excess returns can\'t be reliably predicted.',
    'Testing it always requires a model of "normal" returns: the joint hypothesis problem.',
    'Perfect efficiency is impossible (Grossman–Stiglitz), but beating the market after costs is hard.'
  ],
  quiz: [
    { q: 'Which form of market efficiency says prices reflect all public information?',
      o: ['Weak form', 'Semi-strong form', 'Strong form', 'Random form'], a: 1, why: 'Semi-strong efficiency covers all public information; weak covers past prices; strong includes private information.' },
    { q: 'If prices follow a random walk, what does that imply about past price changes?',
      o: ['They predict future changes', 'They can\'t be used to predict future changes', 'Prices never change', 'Prices always fall after a rise'], a: 1, why: 'Random walk means future changes are unrelated to the past.' },
    { q: 'What is the "joint hypothesis problem"?',
      o: ['Two firms merging', 'You can\'t test efficiency without also assuming a model of expected returns', 'Investors hold two assets', 'Two markets trade the same asset'], a: 1, why: 'An apparent anomaly could mean inefficiency or a wrong model of risk.' }
  ],
  related: ['p-fama70', 'p-shiller', 'behav', 'pm-fees']
},

{
  id: 'behav', type: 'concept', title: 'Behavioral finance and prospect theory',
  blurb: 'How real people evaluate gains, losses and probabilities, and why that matters for prices.',
  level: 'Intermediate', min: 14, tags: ['behavioral', 'loss aversion'], widget: 'prospect',
  body: `
<p>Standard theory assumes investors maximize expected utility and update beliefs correctly. Behavioral finance asks what happens if people systematically don't. The key word is <em>systematically</em>: the deviations aren't random noise but follow predictable patterns.</p>

<h2>Prospect theory in three ideas</h2>
<ol>
  <li><b>Reference dependence.</b> People judge outcomes as gains or losses relative to a reference point (often the purchase price or the status quo), not by final wealth.</li>
  <li><b>Loss aversion.</b> Losses hurt more than equal gains please. Kahneman and Tversky's 1992 estimates put the ratio (λ) at about 2.25.</li>
  <li><b>Probability weighting.</b> People overweight small probabilities (lottery tickets, insurance) and underweight moderate to large ones.</li>
</ol>
<p>The value function is therefore S-shaped: concave for gains (diminishing sensitivity), convex for losses, and steeper on the loss side.</p>

<div class="fx"><div class="formula">v(x) = x<sup>α</sup> &nbsp; if x ≥ 0 &nbsp;&nbsp;&nbsp; v(x) = −λ · (−x)<sup>α</sup> &nbsp; if x &lt; 0</div><div class="fx-body">
<p><b class="lab">In plain English</b><i>v</i> is how much an outcome <em>feels</em>, as opposed to how big it is in dollars. For gains, raising to a power below 1 means each extra dollar feels a bit less good than the one before. For losses, the same shrinking applies, but the result is multiplied by λ, so losses hurt roughly twice as much as equal gains please.</p>
<dl class="syms"><dt>x</dt><dd>the gain (positive) or loss (negative) relative to your reference point</dd><dt>α</dt><dd>curvature; about 0.88 in the 1992 estimates (1 would mean no diminishing sensitivity)</dd><dt>λ</dt><dd>loss aversion; about 2.25</dd></dl>
<p class="ex"><b class="lab">Worked example</b>Gain $100: v = 100<sup>0.88</sup> ≈ <b>+57.5</b>. Lose $100: v = −2.25 × 57.5 ≈ <b>−129</b>. To accept a 50/50 bet that risks $100, you need the win to feel as big as the loss: X<sup>0.88</sup> = 129, so X ≈ <b>$251</b> (this treats both 50% chances as equally weighted, a simplification of the full theory). People want about $2.50 of upside for every $1 at risk.</p>
<p class="hook"><b class="lab">Remember it as</b>"Diminishing sensitivity, and losses count about double."</p></div></div>

<h2>Behaviors in markets</h2>
<ul>
  <li><b>Disposition effect:</b> investors tend to sell winners too early and hold losers too long (Shefrin and Statman, 1985; Odean, 1998).</li>
  <li><b>Overconfidence and excess trading:</b> Barber and Odean found that the most active retail traders earned the lowest net returns.</li>
  <li><b>Extrapolation and bubbles:</b> assuming recent trends continue.</li>
</ul>

<h2>Can irrational traders move prices?</h2>
<p>In an efficient market, rational arbitrageurs should trade away any mispricing caused by behavioral traders. But Shleifer and Vishny (1997) showed that arbitrage is risky and capital-constrained, so mispricing can persist and even worsen before it corrects. Behavioral finance works best as a theory of <em>where</em> and <em>when</em> limits to arbitrage let psychology matter.</p>

<aside class="callout"><b>A fair caution.</b> Loss aversion and reference dependence are well established qualitatively, but the size of λ varies a lot across settings, and some researchers argue it has been overstated. Treat 2.25 as a benchmark, not a constant of nature.</aside>
`,
  takeaways: [
    'Utility is defined over gains and losses relative to a reference point, not final wealth.',
    'Losses loom larger than gains; small probabilities are overweighted.',
    'Behavioral effects matter in prices only if limits to arbitrage stop rational traders from correcting them.'
  ],
  quiz: [
    { q: 'What does loss aversion mean?',
      o: ['People avoid all risk', 'A loss feels worse than an equal-sized gain feels good', 'People prefer certain losses', 'Investors never sell at a loss'], a: 1, why: 'The value function is steeper for losses than for gains.' },
    { q: 'What is the disposition effect?',
      o: ['Selling losers too fast', 'Selling winners too early and holding losers too long', 'Refusing to invest', 'Buying only index funds'], a: 1, why: 'Because paper losses are painful to realize, investors hold them and cash in gains sooner.' },
    { q: 'With the widget defaults (α = 0.88, λ = 2.25), about how large a win do you need to accept a 50/50 bet to lose $100?',
      o: ['About $100', 'About $150', 'About $250', 'About $500'], a: 2, why: 'λ^(1/α) × 100 = 2.25^(1/0.88) × 100 ≈ $251.' }
  ],
  related: ['p-kt79', 'emh']
},

{
  id: 'capstruct', type: 'concept', title: 'Capital structure and Modigliani–Miller',
  blurb: 'Does it matter whether a firm funds itself with debt or equity? First, no. Then, it depends.',
  level: 'Intermediate', min: 16, tags: ['corporate finance', 'leverage'], widget: 'mm',
  body: `
<p>A firm's <b>capital structure</b> is its mix of debt and equity. Managers spend a lot of time on it, and yet the most famous result in corporate finance says that in a perfect world <em>it doesn't matter</em>. Understanding why is the best way to understand when it does.</p>

<h2>Proposition I: the pizza doesn't get bigger</h2>
<p>In perfect markets (no taxes, no bankruptcy costs, no information gaps), a firm's total value depends on the cash flows its assets generate and their risk, not on how those cash flows are split between debtholders and shareholders. The intuition: it's like slicing a pizza. Cutting it into more pieces doesn't make it bigger.</p>

<h2>Proposition II: cheap debt makes equity pricier</h2>
<div class="fx"><div class="formula">r<sub>E</sub> = r<sub>0</sub> + (r<sub>0</sub> − r<sub>D</sub>) × (D ÷ E)</div><div class="fx-body">
<p><b class="lab">In plain English</b>Shareholders' required return equals the return of the underlying business, plus a bonus for the extra risk that debt loads onto them. The bonus grows with how much debt there is relative to equity (D ÷ E) and with how much cheaper debt is than the business's own return.</p>
<dl class="syms"><dt>r<sub>E</sub></dt><dd>cost of equity: return shareholders require</dd><dt>r<sub>0</sub></dt><dd>cost of capital of an all-equity (debt-free) firm</dd><dt>r<sub>D</sub></dt><dd>cost of debt</dd><dt>D ÷ E</dt><dd>debt-to-equity ratio</dd></dl>
<p class="ex"><b class="lab">Worked example</b>r<sub>0</sub> = 10%, r<sub>D</sub> = 5%, and the firm is half debt, half equity (D ÷ E = 1). Then r<sub>E</sub> = 10% + (10% − 5%) × 1 = <b>15%</b>. Check the blend: half equity at 15% plus half debt at 5% = 7.5% + 2.5% = <b>10%</b>, exactly r<sub>0</sub>. Cheap debt was fully offset by pricier equity.</p>
<p class="hook"><b class="lab">Remember it as</b>"Debt is cheaper, but it makes equity riskier by exactly enough to cancel out."</p></div></div>

<h2>Adding the real world</h2>
<p>The blended cost of capital, called the <b>WACC</b> (weighted average cost of capital), weighs each source of funds by its share of the firm's value. With corporate taxes, interest is tax-deductible, so debt is cheaper after tax.</p>
<div class="fx"><div class="formula">WACC = (E ÷ V) × r<sub>E</sub> + (D ÷ V) × r<sub>D</sub> × (1 − τ)</div><div class="fx-body">
<p><b class="lab">In plain English</b>Average the cost of equity and the after-tax cost of debt, weighted by how much of the firm each one funds.</p>
<dl class="syms"><dt>E, D</dt><dd>market value of equity and of debt</dd><dt>V</dt><dd>E + D, total firm value</dd><dt>τ</dt><dd>corporate tax rate (25% → 0.25)</dd></dl>
<p class="ex"><b class="lab">Worked example</b>Equity is 60% of value at r<sub>E</sub> = 12.5%; debt is 40% at r<sub>D</sub> = 5%; τ = 25%. WACC = 0.6 × 12.5% + 0.4 × 5% × 0.75 = 7.5% + 1.5% = <b>9.0%</b>. Without the tax break it would be 10%: the tax shield lowered the firm's cost of capital by a full point.</p></div></div>
<div class="fx"><div class="formula">V<sub>levered</sub> = V<sub>unlevered</sub> + τ × D</div><div class="fx-body">
<p><b class="lab">In plain English</b>With taxes, borrowing adds value equal to the <b>tax shield</b>: the tax rate times the amount of (permanent) debt. This is the 1963 correction to Modigliani and Miller.</p>
<p class="ex"><b class="lab">Worked example</b>An all-equity firm worth $100m borrows $40m permanently at a 25% tax rate. Shield = 0.25 × 40 = $10m, so the firm is now worth <b>$110m</b>.</p></div></div>
<ul>
  <li><b>Financial distress costs.</b> More debt means higher odds of bankruptcy, with direct costs (lawyers) and indirect ones (lost customers, fire-sale assets).</li>
  <li><b>Agency and information problems.</b> Debt disciplines managers but can distort incentives; Myers and Majluf's "pecking order" says managers prefer internal funds first, then debt, then equity, because issuing equity signals bad news.</li>
</ul>
<p>The <b>trade-off theory</b> says firms balance the tax shield against distress costs to reach an optimal leverage. The widget below shows the tax-shield half of that story; the distress-cost half is what stops the WACC line from falling forever.</p>
`,
  takeaways: [
    'In perfect markets, capital structure doesn\'t affect value: the pizza doesn\'t get bigger.',
    'Leverage raises the cost of equity in proportion, keeping the overall cost of capital constant.',
    'Taxes, distress costs and information problems are why capital structure matters in practice.'
  ],
  quiz: [
    { q: 'In a perfect Modigliani–Miller world, total firm value depends on...',
      o: ['The debt-to-equity ratio', 'The cash flows of the assets and their risk', 'The dividend rate', 'The number of shares'], a: 1, why: 'Value comes from the asset side; financing only splits it up.' },
    { q: 'r₀ = 10%, r_D = 6%, D/E = 0.5, no taxes. What is the cost of equity?',
      o: ['10%', '12%', '8%', '16%'], a: 1, why: 'r_E = 10% + (10% − 6%) × 0.5 = 12%.' },
    { q: 'With corporate taxes, why can debt increase firm value?',
      o: ['Debt has no risk', 'Interest is tax-deductible, creating a tax shield', 'Equity is illegal', 'Lenders subsidize it'], a: 1, why: 'Interest reduces taxable income, so the firm keeps more cash flow.' }
  ],
  related: ['p-mm58', 'capm', 'tvm', 'fsa-credit', 'fsa-dupont']
}

);
