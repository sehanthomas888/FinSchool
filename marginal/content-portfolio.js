/* Portfolio management concept lessons. */
window.LESSONS = window.LESSONS || [];
window.LESSONS.push(

{
  id: 'pm-cal', type: 'concept', title: 'Asset allocation and the capital allocation line',
  blurb: 'How much should go in the risky portfolio and how much in safe assets, and what decides it?',
  level: 'Intermediate', min: 14, tags: ['portfolio management', 'asset allocation'], widget: 'cal',
  body: `
<p>Portfolio management splits into two questions. First: <em>which</em> risky assets to hold? (Diversification and factor models address that.) Second: <em>how much</em> to put in risky assets at all versus safe ones? The second decision, <b>asset allocation</b>, usually matters more for an investor's outcome than any individual security choice.</p>

<h2>The capital allocation line</h2>
<p>Suppose you hold a risky portfolio <i>P</i> and a risk-free asset. If you put a fraction <i>y</i> in <i>P</i>, your portfolio has:</p>
<div class="fx"><div class="formula">E[R<sub>c</sub>] = r<sub>f</sub> + y × (E[R<sub>p</sub>] − r<sub>f</sub>) &nbsp;&nbsp; σ<sub>c</sub> = y × σ<sub>p</sub></div><div class="fx-body">
<p><b class="lab">In plain English</b>You earn the safe rate on everything, plus a slice <i>y</i> of the risky portfolio's <em>extra</em> return. Your risk is the same slice <i>y</i> of the risky portfolio's risk. Reward and risk both scale with how much you put in the risky portfolio.</p>
<dl class="syms"><dt>y</dt><dd>fraction of your money in the risky portfolio (0.5 = half)</dd><dt>E[R<sub>c</sub>]</dt><dd>expected return of your combined portfolio</dd><dt>E[R<sub>p</sub>], σ<sub>p</sub></dt><dd>expected return and volatility of the risky portfolio</dd><dt>r<sub>f</sub></dt><dd>risk-free rate</dd></dl>
<p class="ex"><b class="lab">Worked example</b>r<sub>f</sub> = 3%; risky portfolio returns 8% with 16% volatility; you put y = 50% in it. Return = 3% + 0.5 × (8% − 3%) = <b>5.5%</b>. Risk = 0.5 × 16% = <b>8%</b>.</p></div></div>
<p>Plot every value of <i>y</i> and you get a straight line, the <b>capital allocation line (CAL)</b>, starting at the risk-free rate. Its slope is the risky portfolio's <b>Sharpe ratio</b>. Values of <i>y</i> above 100% mean borrowing to buy more of <i>P</i>.</p>

<h2>Choosing a point on the line</h2>
<p>Where you sit depends on how much you dislike risk. With a mean–variance utility <i>U</i> = E[R] − ½·A·σ², where <i>A</i> is <b>risk aversion</b>, the optimal share in the risky portfolio is:</p>
<div class="fx"><div class="formula">y* = (E[R<sub>p</sub>] − r<sub>f</sub>) ÷ (A × σ<sub>p</sub>²)</div><div class="fx-body">
<p><b class="lab">In plain English</b>Optimal risky share = <b>reward for taking risk</b> ÷ <b>(how much you dislike risk × how much risk there is)</b>. The top is the risky portfolio's excess return. The bottom multiplies your risk aversion <i>A</i> by the portfolio's variance. Use decimals (8% = 0.08).</p>
<dl class="syms"><dt>y*</dt><dd>the best fraction to hold in the risky portfolio</dd><dt>A</dt><dd>risk aversion, a personal parameter with no official scale. Rough illustration: about 2 for an aggressive investor, 4 for a moderate one, 8 or more for a very cautious one</dd><dt>σ<sub>p</sub>²</dt><dd>variance of the risky portfolio (volatility squared)</dd></dl>
<p class="ex"><b class="lab">Worked example</b>Excess return = 8% − 3% = 0.05. Variance = 0.16² = 0.0256. With A = 4: y* = 0.05 ÷ (4 × 0.0256) = 0.05 ÷ 0.1024 = <b>0.49, i.e. 49%</b> in the risky portfolio and 51% in the safe asset. With A = 2 it becomes 98%; with A = 8, 24%.</p>
<p class="hook"><b class="lab">Remember it as</b>"Reward over (fear × variance)."</p></div></div>
<p>Higher expected excess return pushes you toward risk; higher volatility or higher risk aversion pushes you away. Two investors with different <i>A</i> hold the <em>same</em> risky portfolio and differ only in how much cash they hold. This is the <b>separation</b> idea behind CAPM.</p>

<h2>Risk tolerance in practice</h2>
<ul>
  <li><b>Willingness</b> to take risk (psychology) is different from <b>ability</b> (finances, time horizon, other income).</li>
  <li>The lower of the two should bind. Someone who could endure a 40% drop financially but would panic-sell shouldn't hold as much equity as their spreadsheet says.</li>
  <li>The formula's inputs, especially E[R<sub>p</sub>], are estimated with a lot of error, so treat the output as a starting point.</li>
</ul>
`,
  takeaways: [
    'Asset allocation is the choice between a risky portfolio and safe assets; the CAL\'s slope is the Sharpe ratio.',
    'Optimal risky share = excess return ÷ (risk aversion × variance).',
    'Everyone holds the same risky portfolio; only the mix with the risk-free asset differs.'
  ],
  quiz: [
    { q: 'What is the slope of the capital allocation line?',
      o: ['The risk-free rate', 'The Sharpe ratio of the risky portfolio', 'Beta', 'The market risk premium'], a: 1, why: 'Extra expected return per unit of extra risk, which is the Sharpe ratio.' },
    { q: 'If an investor becomes more risk-averse (A rises), what happens to the optimal risky share?',
      o: ['It rises', 'It falls', 'It is unchanged', 'It becomes negative'], a: 1, why: 'y* = excess return ÷ (A·σ²): a larger A gives a smaller y*.' },
    { q: 'What does an optimal risky share above 100% imply?',
      o: ['Selling short the risky portfolio', 'Borrowing at the risk-free rate to hold more of the risky portfolio', 'Holding only cash', 'An error in the model'], a: 1, why: 'The rest of the money comes from borrowing.' }
  ],
  related: ['risk', 'capm', 'pm-ips']
},

{
  id: 'pm-perf', type: 'concept', title: 'Measuring performance: Sharpe, Treynor, alpha and information ratio',
  blurb: 'How to tell skill from luck and risk-taking when you evaluate a fund or a manager.',
  level: 'Intermediate', min: 16, tags: ['performance', 'alpha'], widget: 'perf',
  body: `
<p>A fund returned 11%. Is that good? Not until you know what risk it took, what a passive alternative would have earned, and how long the record is. Performance measurement adjusts returns for risk in several ways, each answering a slightly different question.</p>

<h2>The main measures</h2>
<p>All four use the same running example: a <b>fund</b> that returned <b>11%</b> with <b>18%</b> volatility and a beta of <b>1.1</b>; the risk-free rate is <b>3%</b>; the market returned <b>8%</b> (volatility 15%); the fund's tracking error against the market was <b>4%</b>. (These are the widget's starting numbers.)</p>

<div class="fx"><div class="formula">Sharpe ratio = (R − r<sub>f</sub>) ÷ σ</div><div class="fx-body">
<p><b class="lab">In plain English</b>Return above the safe rate, per unit of <em>total</em> volatility. Best for judging a portfolio that is someone's whole investment.</p>
<p class="ex"><b class="lab">Example</b>Fund: (11 − 3) ÷ 18 = <b>0.44</b>. Market: (8 − 3) ÷ 15 = 0.33. The fund earned more reward per unit of risk.</p>
<p class="hook"><b class="lab">Remember it as</b>"Extra return per unit of total wobble."</p></div></div>

<div class="fx"><div class="formula">Treynor ratio = (R − r<sub>f</sub>) ÷ β</div><div class="fx-body">
<p><b class="lab">In plain English</b>Same idea, but the risk is <em>market</em> risk only (beta). Better when the fund is one slice of a larger diversified portfolio, where its own quirks wash out.</p>
<p class="ex"><b class="lab">Example</b>Fund: (11 − 3) ÷ 1.1 = <b>7.3%</b> per unit of beta. Market: 8 − 3 = 5.0% (its beta is 1).</p>
<p class="hook"><b class="lab">Remember it as</b>"Extra return per unit of market risk."</p></div></div>

<div class="fx"><div class="formula">Jensen's alpha = R − [ r<sub>f</sub> + β × (R<sub>m</sub> − r<sub>f</sub>) ]</div><div class="fx-body">
<p><b class="lab">In plain English</b>What the fund earned minus what CAPM says its market exposure <em>should</em> have earned (the bracket). Positive means it did better than its risk explains.</p>
<p class="ex"><b class="lab">Example</b>CAPM return = 3 + 1.1 × (8 − 3) = 8.5%. Alpha = 11 − 8.5 = <b>+2.5%</b> per year.</p>
<p class="hook"><b class="lab">Remember it as</b>"Actual minus what beta predicts."</p></div></div>

<div class="fx"><div class="formula">Information ratio = (R − R<sub>benchmark</sub>) ÷ tracking error &nbsp;&nbsp; t ≈ IR × √(years)</div><div class="fx-body">
<p><b class="lab">In plain English</b>How much the manager beat the benchmark, per unit of the extra risk taken by deviating from it (<b>tracking error</b> = volatility of the return difference). Multiply by the square root of the number of years to estimate a <em>t</em>-statistic (see <a href="#/lesson/reading-papers">how to read a paper</a>).</p>
<p class="ex"><b class="lab">Example</b>IR = (11 − 8) ÷ 4 = <b>0.75</b>. Over 10 years: t ≈ 0.75 × √10 = <b>2.4</b>, which clears the usual bar of 2. Over 3 years: t ≈ 1.3, which you can't tell from luck.</p>
<p class="hook"><b class="lab">Remember it as</b>"Excess return over the benchmark, per unit of deviation. Need years of it to trust it."</p></div></div>

<p><b>Maximum drawdown</b> (largest peak-to-trough fall) isn't a ratio, but it's what investors actually live through.</p>

<h2>Pitfalls</h2>
<ul>
  <li><b>Benchmark choice.</b> A small-cap fund measured against the S&amp;P 500 will look good or bad for the wrong reasons. Use a benchmark that matches the strategy, or a factor model (see <a href="#/lesson/p-ff93">Fama–French</a>).</li>
  <li><b>Luck.</b> Volatile returns make skill hard to detect. With an information ratio of 0.5 you need many years for a statistically meaningful <em>t</em>-stat: roughly IR × √years. The widget shows this.</li>
  <li><b>Survivorship bias.</b> Databases that drop closed funds overstate average performance.</li>
  <li><b>Persistence.</b> Past winners rarely stay winners: Carhart (1997) found that most of the persistence in fund returns was explained by common factors (such as momentum) and by expenses and trading costs rather than skill, apart from persistent underperformance among the worst funds.</li>
</ul>
<p>Jensen (1968) applied alpha to mutual funds for the first time; see the <a href="#/lesson/p-jensen68">paper breakdown</a>.</p>
`,
  takeaways: [
    'Sharpe uses total risk, Treynor and alpha use beta, and the information ratio uses tracking error.',
    'A short track record can\'t separate skill from luck: t ≈ IR × √years.',
    'Benchmark choice and survivorship bias can change the verdict.'
  ],
  quiz: [
    { q: 'When is the Treynor ratio more appropriate than the Sharpe ratio?',
      o: ['When the fund is the investor\'s entire portfolio', 'When the fund is one part of a well-diversified portfolio', 'When returns are negative', 'When beta is zero'], a: 1, why: 'Diversified investors care about systematic risk, which is what beta measures.' },
    { q: 'A fund has beta 1.2, return 12%, risk-free 3%, market 9%. What is Jensen\'s alpha?',
      o: ['0%', '+1.8%', '+3%', '−1.2%'], a: 1, why: 'CAPM return = 3 + 1.2×6 = 10.2%; alpha = 12 − 10.2 = 1.8%.' },
    { q: 'An information ratio of 0.5 over 4 years gives roughly what t-stat?',
      o: ['0.5', '1.0', '2.0', '4.0'], a: 1, why: 't ≈ IR × √years = 0.5 × 2 = 1.0, well short of the conventional 2.' }
  ],
  related: ['capm', 'p-jensen68', 'pm-fees']
},

{
  id: 'pm-fees', type: 'concept', title: 'Active vs passive management and the cost of fees',
  blurb: 'Why the average active dollar must lose to the average passive dollar, and how fees compound.',
  level: 'Intermediate', min: 12, tags: ['active management', 'costs'], widget: 'fees',
  body: `
<p><b>Passive</b> managers hold the market (or an index) at very low cost. <b>Active</b> managers try to beat it by picking securities or timing markets, and charge more for it.</p>

<h2>The arithmetic of active management</h2>
<p>Sharpe (1991) noticed a simple accounting identity. Split all investors into those who hold the market portfolio (passive) and everyone else (active). Together they must hold the market, so the average active dollar earns <em>the same gross return</em> as the average passive dollar. Active management costs more (research, trading, fees), so <b>after costs, the average active dollar must underperform the average passive dollar</b>. It is true before looking at any data, and it holds in any market.</p>
<p>It doesn't say <em>every</em> active manager loses. Some win, but only at the expense of other active managers, and picking winners in advance is hard.</p>

<h2>Evidence</h2>
<ul>
  <li>Jensen (1968), Carhart (1997) and Fama and French (2010) all found that the average fund underperforms after costs.</li>
  <li>S&amp;P's regular SPIVA scorecards have repeatedly found that most actively managed US equity funds trail their benchmarks over long horizons.</li>
  <li>Fund expense ratios are one of the better predictors of future net performance: lower cost tends to mean better outcomes for the investor.</li>
</ul>

<h2>Why a small fee is a big deal</h2>
<p>Fees are charged every year on the whole balance, so they compound like negative returns. A 1% fee on a 7% gross return takes about one-seventh of the return each year, and after 30 years a much larger share of the final wealth, because the money never grew. Try the widget.</p>
<div class="fx"><div class="formula">Ending value ≈ Start × (1 + gross return − fee)<sup>years</sup></div><div class="fx-body">
<p><b class="lab">In plain English</b>The fee is simply subtracted from the return every year, and the result compounds like any other rate (see the <a href="#/lesson/tvm">time value of money</a>).</p>
<dl class="syms"><dt>Start</dt><dd>amount invested today</dd><dt>gross return</dt><dd>yearly return before fees</dd><dt>fee</dt><dd>yearly expense ratio, as a decimal (1% = 0.01)</dd></dl>
<p class="ex"><b class="lab">Worked example</b>$10,000 for 30 years at a 7% gross return. Low-cost fund (0.05% fee): 10,000 × 1.0695<sup>30</sup> ≈ <b>$75,100</b>. High-cost fund (1% fee): 10,000 × 1.06<sup>30</sup> ≈ <b>$57,400</b>. The 0.95-point fee gap cost about <b>$17,600</b>, nearly a quarter of the outcome.</p>
<p class="hook"><b class="lab">Remember it as</b>"A small percentage taken every year is a big percentage taken over decades."</p></div></div>

<h2>Where active management can still make sense</h2>
<p>Less efficient corners (small companies, some emerging markets, private assets), tax management, and cases where the manager provides something else (risk control, liability matching). Even so, the hurdle is real: the manager has to beat the fee <em>every year</em>, after tax.</p>
`,
  takeaways: [
    'Before costs, the average active dollar earns the same as the average passive dollar; after costs, it earns less.',
    'Fees compound: a 1% fee gap can consume a fifth or more of your final wealth over decades.',
    'Some managers win, but identifying them in advance is the hard part.'
  ],
  quiz: [
    { q: 'What is the core of Sharpe\'s "arithmetic of active management"?',
      o: ['Active managers are less intelligent', 'Active and passive together hold the market, so before costs the averages must match', 'Passive funds have higher returns before costs', 'Fees are tax-deductible'], a: 1, why: 'The average active and average passive dollar earn the same gross return; costs make active lower.' },
    { q: 'Does the arithmetic imply that no active manager can beat the market?',
      o: ['Yes, none can', 'No, some can, but only at the expense of other active investors', 'Only in bull markets', 'Only with leverage'], a: 1, why: 'It is a statement about averages.' },
    { q: 'Why does a 1% fee matter so much over long horizons?',
      o: ['It compounds every year on a growing balance', 'It is charged once', 'It only applies to gains', 'It is refunded'], a: 0, why: 'Reduced returns each year mean reduced growth on everything that follows.' }
  ],
  related: ['emh', 'p-sharpe91', 'pm-perf']
},

{
  id: 'pm-risk', type: 'concept', title: 'Downside risk: VaR, expected shortfall and drawdowns',
  blurb: 'Volatility treats good and bad surprises alike; risk managers care about how bad the bad tail can get.',
  level: 'Intermediate', min: 14, tags: ['risk management', 'tail risk'], widget: 'var',
  body: `
<p>Standard deviation is symmetrical: it counts a surprise gain the same as a surprise loss. Investors and regulators tend to care about the loss side. Several measures focus on it.</p>

<h2>Value at Risk (VaR)</h2>
<p>The <b>α% VaR over a horizon</b> is the loss that is not expected to be exceeded with α% confidence. A one-day 95% VaR of $15,000 means: on 95% of days, losses should be smaller; on about 1 day in 20, they'll be larger.</p>
<p>Three ways to estimate it:</p>
<ul>
  <li><b>Parametric:</b> assume returns are normal and compute VaR from the formula below. Fast, but relies on normality.</li>
  <li><b>Historical simulation:</b> take the actual past returns and read off the appropriate percentile. No distribution assumption, but only as good as the sample.</li>
  <li><b>Monte Carlo:</b> simulate many scenarios from a model. Flexible for complicated portfolios; slower.</li>
</ul>

<div class="fx"><div class="formula">VaR = Portfolio value × ( z × σ<sub>h</sub> − μ<sub>h</sub> )</div><div class="fx-body">
<p><b class="lab">In plain English</b>Find how many "typical swings" (<i>z</i>) cover the confidence level you want, multiply by the portfolio's typical swing over the horizon (σ<sub>h</sub>), subtract the small average gain (μ<sub>h</sub>), and multiply by how much money is at stake.</p>
<dl class="syms"><dt>z</dt><dd>from the bell curve: 1.28 for 90% confidence, 1.645 for 95%, 2.33 for 99%</dd><dt>σ<sub>h</sub></dt><dd>volatility over the horizon: annual σ × √(days ÷ 252)</dd><dt>μ<sub>h</sub></dt><dd>expected return over the horizon (usually tiny for a day)</dd></dl>
<p class="ex"><b class="lab">Worked example</b>$1,000,000 portfolio, 15% annual volatility, one day, 95% confidence. Daily σ = 15% ÷ √252 = 0.945%. Expected daily return = 7% ÷ 252 = 0.028%. VaR = 1,000,000 × (1.645 × 0.945% − 0.028%) ≈ <b>$15,300</b>. On about 1 day in 20 you'd expect to lose more than that.</p>
<p class="hook"><b class="lab">Remember it as</b>"z × typical swing × money at stake."</p></div></div>

<h2>Expected shortfall (CVaR)</h2>
<p>VaR says nothing about <em>how bad</em> losses are beyond the cut-off. <b>Expected shortfall</b> is the average loss given that the loss exceeds VaR. It also has better mathematical properties (it rewards diversification, which VaR doesn't always do). Bank regulators moved from VaR toward expected shortfall in the Basel market-risk reforms for that reason.</p>

<h2>Drawdowns and stress tests</h2>
<ul>
  <li><b>Maximum drawdown:</b> largest peak-to-trough decline. A 50% drawdown requires a 100% gain to recover.</li>
  <li><b>Stress tests / scenario analysis:</b> ask "what happens to this portfolio if 2008 happens again?" They don't depend on a probability model at all.</li>
</ul>

<h2>Limitations</h2>
<p>Real returns have <b>fat tails</b> and volatility that clusters, so normal-based VaR tends to understate extreme losses. VaR estimated in calm periods will also look reassuringly small right before a crisis. Use it as one lens, alongside stress tests and judgment.</p>
`,
  takeaways: [
    'VaR is a loss threshold at a confidence level; expected shortfall is the average loss beyond it.',
    'Normal-based VaR understates tail risk when returns have fat tails.',
    'Pair statistical measures with drawdowns and stress tests.'
  ],
  quiz: [
    { q: 'A 1-day 99% VaR of $50,000 means...',
      o: ['The loss will be exactly $50,000', 'A loss above $50,000 is expected about 1 day in 100', 'The maximum possible loss is $50,000', 'Gains will be $50,000'], a: 1, why: 'It is a threshold that losses should exceed only about 1% of the time.' },
    { q: 'What does expected shortfall measure?',
      o: ['The probability of loss', 'The average loss in the worst tail, beyond VaR', 'The maximum loss ever', 'The volatility'], a: 1, why: 'It conditions on being past the VaR cut-off.' },
    { q: 'Why can normal-distribution VaR be misleading?',
      o: ['Returns have fat tails, so extreme losses are more likely than the normal predicts', 'Normal returns are too volatile', 'It ignores time', 'It requires no data'], a: 0, why: 'Extreme moves happen more often than a normal curve implies.' }
  ],
  related: ['risk', 'pm-ips']
},

{
  id: 'pm-ips', type: 'concept', title: 'Building a portfolio: policy, allocation and rebalancing',
  blurb: 'The process that turns theory into an actual, disciplined portfolio.',
  level: 'Intermediate', min: 12, tags: ['portfolio construction', 'rebalancing'],
  body: `
<p>Portfolio theory tells you what an optimal portfolio looks like. Portfolio management is the process of getting there and staying there, with real investors, real constraints and imperfect estimates.</p>

<h2>1. The investment policy statement (IPS)</h2>
<p>A written document that fixes the rules <em>before</em> markets move. It typically covers:</p>
<ul>
  <li><b>Objectives:</b> the return required and the risk that can be tolerated (see <a href="#/lesson/pm-cal">asset allocation</a>).</li>
  <li><b>Constraints:</b> time horizon, liquidity needs, taxes, legal or regulatory limits, and unique circumstances (ethical exclusions, concentrated holdings).</li>
  <li><b>Benchmark and rebalancing rules,</b> so performance and discipline can be judged against something agreed in advance.</li>
</ul>

<h2>2. Strategic and tactical allocation</h2>
<p><b>Strategic asset allocation</b> is the long-term target mix (say 60% equities, 40% bonds), set from the IPS and long-run expectations. <b>Tactical allocation</b> is deliberate, temporary tilts away from that mix based on views about valuation or the cycle. Tactical tilts are a form of active management and face the same hurdle: costs and skill.</p>
<p>Brinson, Hood and Beebower (1986) found that the strategic policy mix explained most of the <em>variation over time</em> in pension plans' returns; see the <a href="#/lesson/p-bhb86">paper breakdown</a> for what it does and doesn't imply.</p>

<h2>3. Rebalancing</h2>
<p>Because assets return differently, weights drift. After a strong equity run, a 60/40 portfolio may be 70/30 and carry more risk than intended. <b>Rebalancing</b> trades back to target:</p>
<ul>
  <li><b>Calendar:</b> annually or quarterly. Simple.</li>
  <li><b>Threshold:</b> whenever a weight drifts more than, say, 5 percentage points. Reacts to large moves.</li>
  <li><b>Using cash flows:</b> direct new contributions and withdrawals to the underweight asset, avoiding trades and taxes.</li>
</ul>
<p>Rebalancing's main job is <b>risk control</b>, not return enhancement. Any "rebalancing bonus" depends on assets mean-reverting and on trading costs and taxes staying low. In a persistent trend, rebalancing can hurt.</p>

<h2>4. Monitoring</h2>
<p>Review the IPS when <em>the investor's circumstances</em> change (job, retirement, inheritance), not each time markets move.</p>
`,
  takeaways: [
    'Write the rules down first: objectives, constraints and rebalancing policy.',
    'Strategic allocation is the long-term target; tactical tilts are active bets.',
    'Rebalancing controls risk; do not count on it to boost returns.'
  ],
  quiz: [
    { q: 'What is the main purpose of an investment policy statement?',
      o: ['To predict returns', 'To fix objectives, constraints and rules in advance', 'To pick individual stocks', 'To reduce taxes'], a: 1, why: 'It commits the investor to a disciplined process before emotions get involved.' },
    { q: 'What is the primary purpose of rebalancing?',
      o: ['Maximizing return', 'Keeping risk in line with the target allocation', 'Avoiding all taxes', 'Timing the market'], a: 1, why: 'Drift changes the portfolio\'s risk; rebalancing restores it.' },
    { q: 'Which is a tactical (rather than strategic) allocation decision?',
      o: ['Setting a 60/40 long-term target', 'Temporarily overweighting equities because you think they\'re cheap', 'Writing the IPS', 'Choosing a benchmark'], a: 1, why: 'Tactical decisions deviate from the long-term policy on a short-term view.' }
  ],
  related: ['pm-cal', 'p-bhb86', 'pm-risk']
}

);
