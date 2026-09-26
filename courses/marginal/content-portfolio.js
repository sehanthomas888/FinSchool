/* Portfolio management: asset allocation, performance measurement, fees, downside risk, and the portfolio process. */
window.LESSONS = window.LESSONS || [];
(function () {
  const QL = window.QL, N = QL.numeric, usd = QL.usd, pct = QL.pct, int = QL.int, pick = QL.pick, round = QL.round, num = QL.num;

  window.LESSONS.push(

{
  id: 'pm-cal', type: 'concept', title: 'Asset allocation and the capital allocation line',
  blurb: 'How much should go in the risky portfolio and how much in safe assets, and what decides it?',
  level: 'Intermediate', min: 20, tags: ['asset allocation', 'CAL'], widget: 'cal',
  los: [
    'Explain what asset allocation is and why it matters more than picking individual securities.',
    'Calculate the expected return and risk of a mix of a risky portfolio and a risk-free asset.',
    'Explain what the capital allocation line is and that its slope is the Sharpe ratio.',
    'Calculate the optimal share in the risky portfolio for a given level of risk aversion.',
    'Explain why willingness and ability to take risk can differ.'
  ],
  terms: [
    ['Asset allocation', 'deciding how to split your money between broad groups such as stocks, bonds and cash'],
    ['Risky portfolio', 'a diversified basket of risky assets, such as a stock index fund'],
    ['Risk-free asset', 'an asset with a certain return over your horizon, such as a short-term government bill'],
    ['Capital allocation line (CAL)', 'the line showing every risk and return you can get by mixing the two'],
    ['Risk aversion (A)', 'how much you dislike risk; a higher number means you dislike it more'],
    ['Leverage', 'borrowing to invest more than you own']
  ],
  body: `
<p>Portfolio management splits into two questions. First: <em>which</em> risky assets to hold? (Diversification and factor models address that.) Second: <em>how much</em> to put in risky assets at all versus safe ones? The second decision, <b>asset allocation</b>, usually matters more for an investor's outcome than any individual security choice.</p>

<h2>The dial from safe to risky</h2>
<aside class="callout story"><b class="lab">Picture this</b>
<p>You have $100,000. You can use a savings account paying 3% with no risk, and a diversified stock fund that has an expected return of 8% and volatility of 16%. You do not have to choose one or the other. You can turn a dial: 0% in the fund (all safe), 50% (half and half), 100% (all fund). Even 150%, if you borrow at 3% to buy extra fund. The dial setting is your <b>asset allocation</b>.</p></aside>

<h2>The capital allocation line</h2>
<p>If you put a fraction <i>y</i> in the risky portfolio <i>P</i> and the rest in the risk-free asset, your combined portfolio has:</p>
<div class="fx"><div class="formula">E[R<sub>c</sub>] = r<sub>f</sub> + y × (E[R<sub>p</sub>] − r<sub>f</sub>) &nbsp;&nbsp; σ<sub>c</sub> = y × σ<sub>p</sub></div><div class="fx-body">
<p><b class="lab">In plain English</b>You earn the safe rate on everything, plus a slice <i>y</i> of the risky portfolio's <em>extra</em> return. Your risk is the same slice <i>y</i> of the risky portfolio's risk. Reward and risk both scale with how much you put in the risky portfolio.</p>
<dl class="syms"><dt>y</dt><dd>fraction of your money in the risky portfolio (0.5 = half)</dd><dt>E[R<sub>c</sub>]</dt><dd>expected return of your combined portfolio</dd><dt>E[R<sub>p</sub>], σ<sub>p</sub></dt><dd>expected return and volatility of the risky portfolio</dd><dt>r<sub>f</sub></dt><dd>risk-free rate</dd></dl>
<p class="ex"><b class="lab">Worked example</b>r<sub>f</sub> = 3%; risky portfolio returns 8% with 16% volatility; you put y = 50% in it. Return = 3% + 0.5 × (8% − 3%) = <b>5.5%</b>. Risk = 0.5 × 16% = <b>8%</b>.</p></div></div>
<table class="simple"><thead><tr><th>Share in the fund (y)</th><th>Expected return</th><th>Volatility</th></tr></thead><tbody>
<tr><td>0%</td><td>3.00%</td><td>0%</td></tr>
<tr><td>25%</td><td>4.25%</td><td>4%</td></tr>
<tr><td>50%</td><td>5.50%</td><td>8%</td></tr>
<tr><td>75%</td><td>6.75%</td><td>12%</td></tr>
<tr><td>100%</td><td>8.00%</td><td>16%</td></tr>
<tr><td>150% (borrowing)</td><td>10.50%</td><td>24%</td></tr>
</tbody></table>
<p>Plot every value of <i>y</i> and you get a straight line, the <b>capital allocation line (CAL)</b>, starting at the risk-free rate. Its slope is the risky portfolio's <b>Sharpe ratio</b>: (8% − 3%) ÷ 16% = 0.31. Every extra 1% of risk you accept earns you about 0.31% of extra return. Values of <i>y</i> above 100% mean borrowing to buy more of <i>P</i>.</p>
<details class="pause"><summary>Pause and try: y = 80%</summary><p>Return = 3% + 0.8 × 5% = <b>7%</b>. Volatility = 0.8 × 16% = <b>12.8%</b>.</p></details>

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
<li>The lower of the two should bind. Someone who could endure a 40% drop financially but would panic-sell should not hold as much equity as their spreadsheet says.</li>
<li>The formula's inputs, especially E[R<sub>p</sub>], are estimated with a lot of error, so treat the output as a starting point.</li>
</ul>
<aside class="callout mistake"><b class="lab">Common mistake</b><p>Thinking your risky share should be whatever gives the highest expected return. The highest expected return is always the most aggressive setting; the point of the formula is to balance return against how much you <em>dislike</em> the bumpiness.</p></aside>
`,
  takeaways: [
    'Asset allocation is the choice between a risky portfolio and safe assets; the CAL\'s slope is the Sharpe ratio.',
    'Combined return = r_f + y × excess return; combined risk = y × σ_p.',
    'Optimal risky share = excess return ÷ (risk aversion × variance).',
    'Everyone holds the same risky portfolio; only the mix with the risk-free asset differs.'
  ],
  quiz: [
    { k: 'calc', gen: () => { const y = pick([0.25, 0.5, 0.75, 1.5]), rf = pick([2, 3, 4]), ep = pick([7, 8, 9, 10]); const ans = rf + y * (ep - rf); return N({ q: `The risk-free rate is ${rf}% and a risky portfolio is expected to return ${ep}%. You put ${y * 100}% of your money in the risky portfolio (the rest in the risk-free asset${y > 1 ? ', borrowing at the risk-free rate' : ''}). What is your expected return?`, ans, wrong: [y * ep, ep, rf + y * ep], fmt: x => pct(x, 2), alt: () => y * ep + (1 - y) * rf, tol: 1e-9, fixed: true, why: `E[R] = r_f + y × (E[R_p] − r_f) = ${rf}% + ${y} × ${ep - rf}% = ${round(ans, 2)}%. Check by weights: ${y} × ${ep}% + ${round(1 - y, 2)} × ${rf}% = ${round(ans, 2)}%.` }); } },
    { k: 'calc', gen: () => { const y = pick([0.25, 0.4, 0.5, 0.75, 1.5]), sp = pick([12, 16, 20]); const ans = y * sp; return N({ q: `A risky portfolio has volatility ${sp}%. You hold ${y * 100}% of your money in it and the rest in a risk-free asset. What is your portfolio's volatility?`, ans, wrong: [sp, y * sp * sp / 100, sp / y], fmt: x => pct(x, 2), alt: () => Math.sqrt(y * y * sp * sp), tol: 1e-9, fixed: true, why: `The risk-free part has no volatility and no co-movement, so σ = y × σ_p = ${y} × ${sp}% = ${round(ans, 2)}%. Risk scales in direct proportion to the risky share.` }); } },
    { k: 'calc', gen: () => { const A = pick([2, 3, 4, 5, 8]), rf = 3, ep = pick([7, 8, 9]), sp = pick([14, 16, 18, 20]); const ans = (ep - rf) / 100 / (A * Math.pow(sp / 100, 2)) * 100; return N({ q: `A risky portfolio has expected return ${ep}% and volatility ${sp}%; the risk-free rate is ${rf}%. For an investor with risk aversion A = ${A}, what is the optimal share in the risky portfolio?`, ans, wrong: [(ep - rf) / (A * sp) * 100, (ep - rf) / A, ep / (A * sp * sp / 100)], fmt: x => pct(x, 1), alt: () => { let best = 0, bu = -1e9; for (let i = 0; i <= 30000; i++) { const y = i / 10000, u = (rf + y * (ep - rf)) / 100 - 0.5 * A * Math.pow(y * sp / 100, 2); if (u > bu) { bu = u; best = y; } } return best * 100; }, tol: 0.02, fixed: true, why: `y* = (E[R_p] − r_f) ÷ (A × σ_p²) = ${(ep - rf) / 100} ÷ (${A} × ${round(Math.pow(sp / 100, 2), 4)}) = ${pct(ans, 1)}. Use decimals: the volatility must be squared as a decimal (${sp / 100}² = ${round(Math.pow(sp / 100, 2), 4)}).` }); } },
    { k: 'calc', gen: () => { const rf = pick([2, 3, 4]), ep = pick([8, 9, 10]), sp = pick([12, 15, 18]); const ans = (ep - rf) / sp; return N({ q: `The risk-free rate is ${rf}% and a risky portfolio returns ${ep}% with volatility ${sp}%. What is the slope of the capital allocation line?`, ans, wrong: [ep / sp, ep - rf, (ep - rf) / (sp * sp)], fmt: x => num(x, 3), alt: () => ((rf + 1 * (ep - rf)) - (rf + 0 * (ep - rf))) / (1 * sp - 0 * sp), tol: 1e-9, why: `Slope = extra return per unit of extra risk = (${ep} − ${rf}) ÷ ${sp} = ${num(ans, 3)}. That is the risky portfolio's Sharpe ratio.` }); } },
    { k: 'concept', q: 'What is the slope of the capital allocation line?', o: ['The Sharpe ratio of the risky portfolio', 'The risk-free rate', 'Beta', 'The market risk premium'], a: 0, why: 'Extra expected return per unit of extra risk, which is the Sharpe ratio.' },
    { k: 'concept', q: 'If an investor becomes more risk-averse (A rises), what happens to the optimal risky share?', o: ['It falls', 'It rises', 'It is unchanged', 'It becomes negative'], a: 0, why: 'y* = excess return ÷ (A·σ²): a larger A gives a smaller y*.' },
    { k: 'concept', q: 'What does an optimal risky share above 100% imply?', o: ['Borrowing at the risk-free rate to hold more of the risky portfolio', 'Selling short the risky portfolio', 'Holding only cash', 'An error in the model'], a: 0, why: 'The extra money above 100% has to come from borrowing.' },
    { k: 'apply', q: 'Two investors, one cautious and one aggressive, both use the same risky portfolio. What differs?', o: ['How much each puts in it versus the risk-free asset', 'The risky portfolio itself', 'The risk-free rate', 'The portfolio\'s Sharpe ratio'], a: 0, why: 'Separation: the risky portfolio is the same for everyone. Risk aversion only moves you along the line.' },
    { k: 'apply', q: 'An investor could financially survive a 40% loss but would panic and sell after a 15% loss. What should guide her allocation?', o: ['The lower tolerance: her willingness, since she would panic', 'Only her ability, since it is larger', 'Whatever earns the most', 'Neither'], a: 0, why: 'The binding constraint is the lower of willingness and ability. Panic-selling locks in losses.' }
  ],
  related: ['risk', 'capm', 'pm-ips']
},

{
  id: 'pm-perf', type: 'concept', title: 'Measuring performance: Sharpe, Treynor, alpha and information ratio',
  blurb: 'How to tell skill from luck and risk-taking when you evaluate a fund or a manager.',
  level: 'Intermediate', min: 22, tags: ['performance', 'sharpe', 'alpha'], widget: 'perf',
  los: [
    'Explain why a raw return says little about a fund\'s quality.',
    'Calculate the Sharpe ratio, Treynor ratio, Jensen\'s alpha and information ratio.',
    'Choose which measure fits which situation (whole portfolio versus one slice; benchmark-relative).',
    'Estimate how many years of results are needed before skill can be told from luck.',
    'Name common pitfalls: benchmark choice, survivorship bias and false persistence.'
  ],
  terms: [
    ['Excess return', 'return above the risk-free rate'],
    ['Beta', 'sensitivity to the market'],
    ['Alpha', 'return above what a risk model says the fund should have earned'],
    ['Benchmark', 'a fair comparison portfolio, such as a matching market index'],
    ['Tracking error', 'the volatility of the difference between a fund\'s return and its benchmark\'s'],
    ['Drawdown', 'a fall from a previous peak to a later low']
  ],
  body: `
<p>A fund returned 11%. Is that good? Not until you know what risk it took, what a passive alternative would have earned, and how long the record is. Performance measurement adjusts returns for risk in several ways, each answering a slightly different question.</p>

<h2>Why raw returns mislead</h2>
<aside class="callout story"><b class="lab">Picture this</b>
<p>Two students both score 90%. One took an easy test and the other a very hard one. Same score, different achievement. Funds are the same: an 11% return means one thing in a year the market rose 20% and something else in a year it fell 5%. We need to adjust for the difficulty (the risk taken and the market's move).</p></aside>

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
<p class="ex"><b class="lab">Example</b>IR = (11 − 8) ÷ 4 = <b>0.75</b>. Over 10 years: t ≈ 0.75 × √10 = <b>2.4</b>, which clears the usual bar of 2. Over 3 years: t ≈ 1.3, which you cannot tell from luck.</p>
<p class="hook"><b class="lab">Remember it as</b>"Excess return over the benchmark, per unit of deviation. Need years of it to trust it."</p></div></div>
<details class="pause"><summary>Pause and try: which measure for which job?</summary><p>You are judging a fund that will be <em>your entire portfolio</em>: use the <b>Sharpe ratio</b> (total risk). A fund that will be one small holding among many: <b>Treynor or alpha</b> (market risk). A manager judged against an index: the <b>information ratio</b>.</p></details>
<p><b>Maximum drawdown</b> (largest peak-to-trough fall) is not a ratio, but it is what investors actually live through.</p>

<h2>Pitfalls</h2>
<ul>
<li><b>Benchmark choice.</b> A small-cap fund measured against the S&amp;P 500 will look good or bad for the wrong reasons. Use a benchmark that matches the strategy, or a factor model (see <a href="#/lesson/p-ff93">Fama–French</a>).</li>
<li><b>Luck.</b> Volatile returns make skill hard to detect. With an information ratio of 0.5 you need many years for a statistically meaningful <em>t</em>-stat: roughly IR × √years. The widget shows this.</li>
<li><b>Survivorship bias.</b> Databases that drop closed funds overstate average performance.</li>
<li><b>Persistence.</b> Past winners rarely stay winners: Carhart (1997) found that most of the persistence in fund returns was explained by common factors (such as momentum) and by expenses and trading costs rather than skill, apart from persistent underperformance among the worst funds.</li>
</ul>
<aside class="callout mistake"><b class="lab">Common mistake</b><p>Picking the fund with the best 1-year return. A single year mostly reflects luck. Use a long record, a fair benchmark, and risk-adjusted measures.</p></aside>
<p>Jensen (1968) applied alpha to mutual funds for the first time; see the <a href="#/lesson/p-jensen68">paper breakdown</a>.</p>
`,
  takeaways: [
    'Sharpe uses total risk, Treynor and alpha use beta, and the information ratio uses tracking error.',
    'A short track record cannot separate skill from luck: t ≈ IR × √years.',
    'Benchmark choice and survivorship bias can change the verdict.'
  ],
  quiz: [
    { k: 'calc', gen: () => { const r = pick([9, 11, 12, 14]), rf = pick([2, 3]), s = pick([12, 15, 18, 20]); const ans = (r - rf) / s; return N({ q: `A fund returned ${r}% with volatility ${s}% while the risk-free rate was ${rf}%. What is its Sharpe ratio?`, ans, wrong: [r / s, (r - rf), (r - rf) / (s / 100)], fmt: x => num(x, 2), alt: () => (r / 100 - rf / 100) / (s / 100), tol: 1e-9, why: `Sharpe = (${r} − ${rf}) ÷ ${s} = ${num(ans, 2)}. Extra return per unit of total volatility.` }); } },
    { k: 'calc', gen: () => { const r = pick([9, 11, 12, 14]), rf = pick([2, 3]), b = pick([0.8, 1.1, 1.2, 1.4]); const ans = (r - rf) / b; return N({ q: `A fund returned ${r}% with a beta of ${b}; the risk-free rate is ${rf}%. What is its Treynor ratio (in percent per unit of beta)?`, ans, wrong: [(r - rf) * b, r / b, (r - rf)], fmt: x => num(x, 2) + '%', alt: () => (r - rf) * (1 / b), tol: 1e-9, why: `Treynor = (${r} − ${rf}) ÷ ${b} = ${num(ans, 2)}% per unit of beta. Dividing by beta measures reward per unit of <em>market</em> risk.` }); } },
    { k: 'calc', gen: () => { const r = pick([10, 12, 14]), rf = pick([2, 3]), b = pick([0.8, 1.0, 1.2, 1.5]), rm = pick([8, 9, 10]); const ans = r - (rf + b * (rm - rf)); return N({ q: `A fund returned ${r}% with beta ${b}. The risk-free rate is ${rf}% and the market returned ${rm}%. What is Jensen's alpha?`, ans, wrong: [r - rm, r - rf, r - b * rm], fmt: x => pct(x, 2), alt: () => r - rf * (1 - b) - b * rm, tol: 1e-9, fixed: true, why: `CAPM return = ${rf} + ${b} × (${rm} − ${rf}) = ${round(rf + b * (rm - rf), 2)}%. Alpha = ${r} − ${round(rf + b * (rm - rf), 2)} = ${round(ans, 2)}%. Comparing only with the market's return (${r - rm}%) ignores that the fund took ${b > 1 ? 'more' : b < 1 ? 'less' : 'the same'} market risk.` }); } },
    { k: 'calc', gen: () => { const r = pick([9, 10, 11, 12]), bm = pick([6, 7, 8]), te = pick([2, 3, 4, 5]); const ans = (r - bm) / te; return N({ q: `A manager returned ${r}% against a benchmark's ${bm}%, with a tracking error of ${te}%. What is the information ratio?`, ans, wrong: [(r - bm), r / te, (r - bm) / (te * te)], fmt: x => num(x, 2), alt: () => ((r - bm) / 100) / (te / 100), tol: 1e-9, why: `IR = (${r} − ${bm}) ÷ ${te} = ${num(ans, 2)}. It rewards the extra return per unit of deviation from the benchmark.` }); } },
    { k: 'calc', gen: () => { const ir = pick([0.4, 0.5, 0.75, 1.0]), yrs = pick([4, 9, 16, 25]); const ans = ir * Math.sqrt(yrs); return N({ q: `A manager has an information ratio of ${ir}. About what t-statistic does ${yrs} years of that record give? (t ≈ IR × √years)`, ans, wrong: [ir * yrs, ir / Math.sqrt(yrs), ir + Math.sqrt(yrs)], fmt: x => num(x, 2), alt: () => Math.sqrt(ir * ir * yrs), tol: 1e-9, fixed: true, why: `t ≈ ${ir} × √${yrs} = ${ir} × ${round(Math.sqrt(yrs), 3)} = ${num(ans, 2)}. ${ans >= 2 ? 'That clears the usual bar of about 2.' : 'That is below 2, so luck cannot be ruled out yet.'} Skill takes years to prove because t grows only with the square root of time.` }); } },
    { k: 'concept', q: 'When is the Treynor ratio more appropriate than the Sharpe ratio?', o: ['When the fund is one part of a well-diversified portfolio', 'When the fund is the investor\'s entire portfolio', 'When returns are negative', 'When beta is zero'], a: 0, why: 'Diversified investors care about systematic risk, which is what beta measures.' },
    { k: 'concept', q: 'What is tracking error?', o: ['The volatility of the difference between a fund\'s return and its benchmark\'s', 'The fund\'s fees', 'The fund\'s beta', 'The number of trades made'], a: 0, why: 'It measures how far a manager strays from the benchmark, and is the denominator of the information ratio.' },
    { k: 'apply', q: 'A small-company fund is judged against a large-company index and looks brilliant. What is the likely problem?', o: ['The benchmark is a poor match, so the comparison is unfair', 'The fund has no risk', 'Alpha cannot be negative', 'Sharpe ratios are always high'], a: 0, why: 'Style differences can look like skill. Use a benchmark that matches the strategy.' },
    { k: 'apply', q: 'A database only includes funds that still exist. What bias does this create?', o: ['Survivorship bias: average performance looks better than it was', 'Look-ahead bias only', 'No bias', 'It lowers average returns'], a: 0, why: 'Funds that closed after poor results are missing, which flatters the average.' }
  ],
  related: ['capm', 'p-jensen68', 'pm-fees']
},

{
  id: 'pm-fees', type: 'concept', title: 'Active vs passive management and the cost of fees',
  blurb: 'Why the average active dollar must lose to the average passive dollar, and how fees compound.',
  level: 'Intermediate', min: 16, tags: ['fees', 'active', 'passive'], widget: 'fees',
  los: [
    'Explain the difference between active and passive management.',
    'Explain Sharpe\'s "arithmetic of active management".',
    'Calculate how much a difference in annual fees costs over many years.',
    'Say where active management can still make sense.'
  ],
  terms: [
    ['Passive management', 'holding the market or an index at very low cost'],
    ['Active management', 'trying to beat the market by choosing securities or timing, at higher cost'],
    ['Expense ratio', 'the yearly fee, as a percentage of the money invested'],
    ['Gross / net return', 'return before / after fees and costs']
  ],
  body: `
<p><b>Passive</b> managers hold the market (or an index) at very low cost. <b>Active</b> managers try to beat it by picking securities or timing markets, and charge more for it.</p>

<h2>The arithmetic of active management</h2>
<aside class="callout story"><b class="lab">Picture this</b>
<p>Imagine a village where every farmer's crop together <em>is</em> the whole harvest. Some farmers just take an equal share (passive). The rest (active) trade amongst themselves trying to get a better share. Whatever one active farmer gains, another active farmer loses, so on average the active farmers get exactly the same as the passive ones, <em>before</em> paying for their fancier methods. Once they pay for those methods, they end up with less.</p></aside>
<p>Sharpe (1991) noticed this as a simple accounting identity. Split all investors into those who hold the market portfolio (passive) and everyone else (active). Together they must hold the market, so the average active dollar earns <em>the same gross return</em> as the average passive dollar. Active management costs more (research, trading, fees), so <b>after costs, the average active dollar must underperform the average passive dollar</b>. It is true before looking at any data, and it holds in any market.</p>
<p>It does not say <em>every</em> active manager loses. Some win, but only at the expense of other active managers, and picking winners in advance is hard.</p>

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
<details class="pause"><summary>Pause and try: fee as a share of return</summary><p>A 1% fee on a 7% gross return takes 1 ÷ 7 = about <b>14%</b> of your return every single year, before you have even beaten anything.</p></details>
<aside class="callout mistake"><b class="lab">Common mistake</b><p>"A 1% fee is only 1%." It is 1% of your <em>whole balance</em>, every year, whether the fund goes up or down, and it also removes the growth those fees would have earned. Compare it to the return it comes out of, not to 100.</p></aside>

<h2>Where active management can still make sense</h2>
<p>Less efficient corners (small companies, some emerging markets, private assets), tax management, and cases where the manager provides something else (risk control, liability matching). Even so, the hurdle is real: the manager has to beat the fee <em>every year</em>, after tax.</p>
`,
  takeaways: [
    'Before costs, the average active dollar earns the same as the average passive dollar; after costs, it earns less.',
    'Fees compound: a 1% fee gap can consume a fifth or more of your final wealth over decades.',
    'Some managers win, but identifying them in advance is the hard part.'
  ],
  quiz: [
    { k: 'calc', gen: () => { const p = pick([10000, 20000, 50000]), g = pick([6, 7, 8]), f1 = pick([0.05, 0.1, 0.2]), f2 = pick([0.75, 1, 1.25]), n = pick([20, 25, 30, 35]); const a = p * Math.pow(1 + (g - f1) / 100, n), b = p * Math.pow(1 + (g - f2) / 100, n); const ans = a - b; return N({ q: `You invest ${usd(p, 0)} for ${n} years at a ${g}% gross return. Fund L charges ${f1}% a year and Fund H charges ${f2}%. How much more do you end with in Fund L?`, ans, wrong: [p * n * (f2 - f1) / 100, p * (f2 - f1) / 100, ans / 2], fmt: x => usd(x, 0), alt: () => { let x = p, y = p; for (let i = 0; i < n; i++) { x *= 1 + (g - f1) / 100; y *= 1 + (g - f2) / 100; } return x - y; }, tol: 1e-4, fixed: true, why: `Fund L: ${usd(p, 0)} × ${round(1 + (g - f1) / 100, 5)}^${n} = ${usd(a, 0)}. Fund H: ${usd(p, 0)} × ${round(1 + (g - f2) / 100, 5)}^${n} = ${usd(b, 0)}. Difference: ${usd(ans, 0)}, more than the simple fee total of ${usd(p * n * (f2 - f1) / 100, 0)} because lost growth compounds too.` }); } },
    { k: 'calc', gen: () => { const g = pick([5, 6, 7, 8]), f = pick([0.5, 1, 1.5]); const ans = f / g * 100; return N({ q: `A fund earns a ${g}% gross return and charges a ${f}% annual fee. Roughly what share of the gross return does the fee take?`, ans, wrong: [f, g / f, f * g], fmt: x => pct(x, 1), alt: () => (g - (g - f)) / g * 100, tol: 1e-9, fixed: true, why: `The fee takes ${f} out of every ${g} of return: ${f} ÷ ${g} = ${round(f / g, 3)}, about ${pct(ans, 1)} of the return, every year.` }); } },
    { k: 'concept', q: 'What is the core of Sharpe\'s "arithmetic of active management"?', o: ['Active and passive together hold the market, so before costs the averages must match', 'Active managers are less intelligent', 'Passive funds have higher returns before costs', 'Fees are tax-deductible'], a: 0, why: 'The average active and average passive dollar earn the same gross return; costs make active lower.' },
    { k: 'concept', q: 'Does the arithmetic imply that no active manager can beat the market?', o: ['No, some can, but only at the expense of other active investors', 'Yes, none can', 'Only in bull markets', 'Only with leverage'], a: 0, why: 'It is a statement about averages.' },
    { k: 'concept', q: 'Why does a 1% fee matter so much over long horizons?', o: ['It compounds every year on a growing balance', 'It is charged once', 'It only applies to gains', 'It is refunded'], a: 0, why: 'Reduced returns each year mean reduced growth on everything that follows.' },
    { k: 'apply', q: 'Two funds hold identical investments. Fund A charges 0.10% and Fund B 0.90%. Before any market moves, which is expected to leave you with more after 20 years?', o: ['Fund A, by the compounding of the fee gap', 'Fund B, because it costs more', 'They are exactly equal', 'It depends only on the manager\'s name'], a: 0, why: 'Same investments means the same gross return, so the lower fee wins, and the gap compounds.' },
    { k: 'apply', q: 'A manager says, "We beat the market this year, so active management works." What is the fair response?', o: ['One year is mostly luck; ask about many years, net of fees', 'That proves it beyond doubt', 'Active managers cannot ever beat the market', 'Fees do not matter'], a: 0, why: 'Short records mix skill and luck; only long, net-of-fee records say much.' }
  ],
  related: ['emh', 'p-sharpe91', 'pm-perf']
},

{
  id: 'pm-risk', type: 'concept', title: 'Downside risk: VaR, expected shortfall and drawdowns',
  blurb: 'Volatility treats good and bad surprises alike; risk managers care about how bad the bad tail can get.',
  level: 'Intermediate', min: 20, tags: ['VaR', 'tail risk', 'drawdown'], widget: 'var',
  los: [
    'Explain why standard deviation is an incomplete measure of risk.',
    'Interpret a Value at Risk (VaR) figure.',
    'Calculate a one-day parametric VaR.',
    'Explain expected shortfall and how it differs from VaR.',
    'Calculate the gain needed to recover from a drawdown, and describe the limits of VaR.'
  ],
  terms: [
    ['Value at Risk (VaR)', 'a loss level that is not expected to be exceeded at a stated confidence over a stated time'],
    ['Confidence level', 'how sure the statement is, such as 95% or 99%'],
    ['Expected shortfall (CVaR)', 'the average loss on the days when the loss is worse than VaR'],
    ['Drawdown', 'a fall from a previous peak to a later low'],
    ['Fat tails', 'extreme outcomes happen more often than a normal bell curve says'],
    ['Stress test', 'asking what would happen to the portfolio in a specific bad scenario']
  ],
  body: `
<p>Standard deviation is symmetrical: it counts a surprise gain the same as a surprise loss. Investors and regulators tend to care about the loss side. Several measures focus on it.</p>

<h2>Value at Risk (VaR)</h2>
<aside class="callout story"><b class="lab">Picture this</b>
<p>A risk manager is asked: "What is the most we could lose tomorrow?" The honest answer is "everything". Not useful. So she asks a better question: "What loss would we <em>not</em> expect to exceed on 19 out of 20 days?" The answer to that is the <b>95% one-day VaR</b>.</p></aside>
<p>The <b>α% VaR over a horizon</b> is the loss that is not expected to be exceeded with α% confidence. A one-day 95% VaR of $15,000 means: on 95% of days, losses should be smaller; on about 1 day in 20, they will be larger.</p>
<p>Three ways to estimate it:</p>
<ul>
<li><b>Parametric:</b> assume returns are normal and compute VaR from the formula below. Fast, but relies on normality.</li>
<li><b>Historical simulation:</b> take the actual past returns and read off the appropriate percentile. No distribution assumption, but only as good as the sample.</li>
<li><b>Monte Carlo:</b> simulate many scenarios from a model. Flexible for complicated portfolios; slower.</li>
</ul>
<div class="fx"><div class="formula">VaR = Portfolio value × ( z × σ<sub>h</sub> − μ<sub>h</sub> )</div><div class="fx-body">
<p><b class="lab">In plain English</b>Find how many "typical swings" (<i>z</i>) cover the confidence level you want, multiply by the portfolio's typical swing over the horizon (σ<sub>h</sub>), subtract the small average gain (μ<sub>h</sub>), and multiply by how much money is at stake.</p>
<dl class="syms"><dt>z</dt><dd>from the bell curve: 1.28 for 90% confidence, 1.645 for 95%, 2.33 for 99%</dd><dt>σ<sub>h</sub></dt><dd>volatility over the horizon: annual σ × √(days ÷ 252)</dd><dt>μ<sub>h</sub></dt><dd>expected return over the horizon (usually tiny for a day)</dd></dl>
<p class="ex"><b class="lab">Worked example</b>$1,000,000 portfolio, 15% annual volatility, one day, 95% confidence. Daily σ = 15% ÷ √252 = 0.945%. Expected daily return = 7% ÷ 252 = 0.028%. VaR = 1,000,000 × (1.645 × 0.945% − 0.028%) ≈ <b>$15,300</b>. On about 1 day in 20 you would expect to lose more than that.</p>
<p class="hook"><b class="lab">Remember it as</b>"z × typical swing × money at stake."</p></div></div>
<details class="pause"><summary>Pause and try: a higher confidence level</summary><p>At 99%, z = 2.33 instead of 1.645, so VaR = 1,000,000 × (2.33 × 0.945% − 0.028%) ≈ <b>$21,700</b>. Asking for more confidence means asking for a bigger loss threshold.</p></details>

<h2>Expected shortfall (CVaR)</h2>
<p>VaR says nothing about <em>how bad</em> losses are beyond the cut-off. <b>Expected shortfall</b> is the average loss given that the loss exceeds VaR. It also has better mathematical properties (it rewards diversification, which VaR does not always do). Bank regulators moved from VaR toward expected shortfall in the Basel market-risk reforms for that reason.</p>

<h2>Drawdowns and stress tests</h2>
<ul>
<li><b>Maximum drawdown:</b> largest peak-to-trough decline. A 50% drawdown requires a 100% gain to recover.</li>
<li><b>Stress tests / scenario analysis:</b> ask "what happens to this portfolio if 2008 happens again?" They do not depend on a probability model at all.</li>
</ul>
<div class="example"><b class="lab">Example</b><p>A portfolio falls 20%. What gain is needed to get back to where it started?</p>
<b class="lab sol">Solution</b><p>After the fall you hold 0.80 of your money. To get back to 1.00 you need 1.00 ÷ 0.80 = 1.25, a <b>25% gain</b>. In general: gain needed = loss ÷ (1 − loss). At −50%: 0.50 ÷ 0.50 = 100%.</p></div>

<h2>Limitations</h2>
<p>Real returns have <b>fat tails</b> and volatility that clusters, so normal-based VaR tends to understate extreme losses. VaR estimated in calm periods will also look reassuringly small right before a crisis. Use it as one lens, alongside stress tests and judgment.</p>
<aside class="callout mistake"><b class="lab">Common mistake</b><p>Reading a 95% VaR of $15,000 as "the most I can lose". It is the loss you expect to <em>beat</em> on about one day in twenty, and VaR does not say how much worse those days can be.</p></aside>
`,
  takeaways: [
    'VaR is a loss threshold at a confidence level; expected shortfall is the average loss beyond it.',
    'Normal-based VaR understates tail risk when returns have fat tails.',
    'Losses are harder to recover from than they look: a 50% fall needs a 100% gain.',
    'Pair statistical measures with drawdowns and stress tests.'
  ],
  quiz: [
    { k: 'calc', gen: () => { const V = pick([500000, 1000000, 2000000]), s = pick([10, 12, 15, 20]), cl = pick([[95, 1.645], [99, 2.326]]); const sh = s / 100 / Math.sqrt(252); const ans = V * cl[1] * sh; return N({ q: `A ${usd(V, 0)} portfolio has annual volatility ${s}%. Using 252 trading days and ignoring the tiny expected return, what is the one-day ${cl[0]}% parametric VaR? (Use z = ${cl[1]}.)`, ans, wrong: [V * cl[1] * s / 100, V * s / 100 / Math.sqrt(252), V * cl[1] * sh * Math.sqrt(252)], fmt: x => usd(x, 0), alt: () => { let lo = 0, hi = 10; for (let i = 0; i < 100; i++) { const m = (lo + hi) / 2; if (QL.N(m) < cl[0] / 100) lo = m; else hi = m; } return V * lo * sh; }, tol: V * 0.004, fixed: true, why: `Daily σ = ${s}% ÷ √252 = ${round(sh * 100, 3)}%. VaR = ${usd(V, 0)} × ${cl[1]} × ${round(sh * 100, 3)}% = ${usd(ans, 0)}. Using the annual σ directly (${usd(V * cl[1] * s / 100, 0)}) would be a one-year VaR, not one-day.` }); } },
    { k: 'calc', gen: () => { const L = pick([10, 20, 25, 30, 40, 50]); const ans = L / (100 - L) * 100; return N({ q: `A portfolio falls ${L}%. What percentage gain is needed just to get back to where it started?`, ans, wrong: [L, L * 1.5, 100 - L], fmt: x => pct(x, 1), alt: () => (1 / (1 - L / 100) - 1) * 100, tol: 1e-9, fixed: true, why: `After a ${L}% fall you hold ${(100 - L) / 100} of your money. To return to 1 you need 1 ÷ ${(100 - L) / 100} = ${round(1 / ((100 - L) / 100), 4)}, a gain of ${pct(ans, 1)}. The bigger the fall, the disproportionately bigger the climb back.` }); } },
    { k: 'concept', q: 'A 1-day 99% VaR of $50,000 means...', o: ['A loss above $50,000 is expected about 1 day in 100', 'The loss will be exactly $50,000', 'The maximum possible loss is $50,000', 'Gains will be $50,000'], a: 0, why: 'It is a threshold that losses should exceed only about 1% of the time.' },
    { k: 'concept', q: 'What does expected shortfall measure?', o: ['The average loss in the worst tail, beyond VaR', 'The probability of loss', 'The maximum loss ever', 'The volatility'], a: 0, why: 'It conditions on being past the VaR cut-off.' },
    { k: 'concept', q: 'Why can normal-distribution VaR be misleading?', o: ['Returns have fat tails, so extreme losses are more likely than the normal predicts', 'Normal returns are too volatile', 'It ignores time', 'It requires no data'], a: 0, why: 'Extreme moves happen more often than a normal curve implies.' },
    { k: 'concept', q: 'Which estimation method uses actual past returns without assuming a distribution?', o: ['Historical simulation', 'Parametric VaR', 'A stress test', 'Beta estimation'], a: 0, why: 'Historical simulation reads the percentile directly from past outcomes.' },
    { k: 'apply', q: 'Your risk report shows a 95% one-day VaR of $15,000. On roughly how many trading days in a year (252) should you expect to lose more than that?', o: ['About 13 days', 'About 1 day', 'About 50 days', 'Never'], a: 0, why: '5% of 252 days is about 12.6, so roughly 13 days.' },
    { k: 'apply', q: 'A manager says, "Our 95% VaR is $15,000, so we can never lose more than that." What is wrong?', o: ['VaR is exceeded about 1 day in 20 and says nothing about how much worse those days are', 'VaR is always wrong', 'The portfolio must be riskier', 'VaR is only for banks'], a: 0, why: 'VaR is a threshold that is expected to be beaten sometimes. Expected shortfall describes how bad the exceedances are.' }
  ],
  related: ['risk', 'pm-ips']
},

{
  id: 'pm-ips', type: 'concept', title: 'Building a portfolio: policy, allocation and rebalancing',
  blurb: 'The process that turns theory into an actual, disciplined portfolio.',
  level: 'Intermediate', min: 16, tags: ['IPS', 'rebalancing', 'allocation'],
  los: [
    'Describe what an investment policy statement (IPS) contains and why it is written first.',
    'Distinguish strategic from tactical asset allocation.',
    'Calculate how portfolio weights drift and how much to trade to rebalance.',
    'Compare calendar, threshold and cash-flow rebalancing, and say what rebalancing is really for.'
  ],
  terms: [
    ['Investment policy statement (IPS)', 'a written plan fixing objectives, constraints and rules before you invest'],
    ['Strategic allocation', 'the long-term target mix, such as 60% stocks and 40% bonds'],
    ['Tactical allocation', 'deliberate, temporary tilts away from the strategic mix'],
    ['Rebalancing', 'trading back to the target weights after they drift'],
    ['Drift', 'the change in weights caused by different assets earning different returns']
  ],
  body: `
<p>Portfolio theory tells you what an optimal portfolio looks like. Portfolio management is the process of getting there and staying there, with real investors, real constraints and imperfect estimates.</p>

<h2>1. The investment policy statement (IPS)</h2>
<p>A written document that fixes the rules <em>before</em> markets move. It is like a flight plan: you agree the route when the sky is clear so that you do not improvise in a storm. It typically covers:</p>
<ul>
<li><b>Objectives:</b> the return required and the risk that can be tolerated (see <a href="#/lesson/pm-cal">asset allocation</a>).</li>
<li><b>Constraints:</b> time horizon, liquidity needs, taxes, legal or regulatory limits, and unique circumstances (ethical exclusions, concentrated holdings).</li>
<li><b>Benchmark and rebalancing rules,</b> so performance and discipline can be judged against something agreed in advance.</li>
</ul>

<h2>2. Strategic and tactical allocation</h2>
<p><b>Strategic asset allocation</b> is the long-term target mix (say 60% equities, 40% bonds), set from the IPS and long-run expectations. <b>Tactical allocation</b> is deliberate, temporary tilts away from that mix based on views about valuation or the cycle. Tactical tilts are a form of active management and face the same hurdle: costs and skill.</p>
<p>Brinson, Hood and Beebower (1986) found that the strategic policy mix explained most of the <em>variation over time</em> in pension plans' returns; see the <a href="#/lesson/p-bhb86">paper breakdown</a> for what it does and does not imply.</p>

<h2>3. Rebalancing</h2>
<p>Because assets return differently, weights drift. After a strong equity run, a 60/40 portfolio may be 70/30 and carry more risk than intended. <b>Rebalancing</b> trades back to target.</p>
<div class="example"><b class="lab">Example</b><p>You start with $100,000 split 60% stocks / 40% bonds. Over a year stocks gain 20% and bonds gain 0%. What are the new weights, and how much must you sell to get back to 60/40?</p>
<b class="lab sol">Solution</b>
<table class="steps"><tr><td>Stocks: 60,000 × 1.20</td><td>$72,000</td></tr><tr><td>Bonds: 40,000 × 1.00</td><td>$40,000</td></tr><tr><td>Total</td><td>$112,000</td></tr><tr><td>New stock weight: 72,000 ÷ 112,000</td><td>64.3%</td></tr><tr><td>Target stocks: 60% × 112,000</td><td>$67,200</td></tr><tr class="tot"><td>Sell stocks, buy bonds</td><td>$4,800</td></tr></table>
<p>The portfolio drifted from 60% to 64.3% stocks. Selling $4,800 of stocks and buying bonds restores the intended risk.</p></div>
<ul>
<li><b>Calendar:</b> annually or quarterly. Simple.</li>
<li><b>Threshold:</b> whenever a weight drifts more than, say, 5 percentage points. Reacts to large moves.</li>
<li><b>Using cash flows:</b> direct new contributions and withdrawals to the underweight asset, avoiding trades and taxes.</li>
</ul>
<p>Rebalancing's main job is <b>risk control</b>, not return enhancement. Any "rebalancing bonus" depends on assets mean-reverting and on trading costs and taxes staying low. In a persistent trend, rebalancing can hurt.</p>
<details class="pause"><summary>Pause and try: which rebalancing method is cheapest?</summary><p>Using new cash flows: you buy the underweight asset with money you were investing anyway, so you sell nothing and trigger no capital-gains tax.</p></details>

<h2>4. Monitoring</h2>
<p>Review the IPS when <em>the investor's circumstances</em> change (job, retirement, inheritance), not each time markets move.</p>
<aside class="callout mistake"><b class="lab">Common mistake</b><p>Abandoning the plan after a market drop. The IPS exists precisely for the moment when fear says to sell. Changing it in a panic defeats its purpose.</p></aside>
`,
  takeaways: [
    'Write the rules down first: objectives, constraints and rebalancing policy.',
    'Strategic allocation is the long-term target; tactical tilts are active bets.',
    'Weights drift; rebalancing restores the intended risk. Do not count on it to boost returns.'
  ],
  quiz: [
    { k: 'calc', gen: () => { const w = pick([50, 60, 70]), re = pick([10, 15, 20, 25]), rb = pick([0, 2, 4]); const e = w * (1 + re / 100), b = (100 - w) * (1 + rb / 100); const ans = e / (e + b) * 100; return N({ q: `A $100,000 portfolio starts ${w}% stocks / ${100 - w}% bonds. Over a year stocks return ${re}% and bonds ${rb}%. What is the stock weight at the end?`, ans, wrong: [w + re, w * (1 + re / 100), w + (re - rb) / 2], fmt: x => pct(x, 1), alt: () => { const es = 1000 * w * (1 + re / 100), bs = 1000 * (100 - w) * (1 + rb / 100); return es / (es + bs) * 100; }, tol: 1e-9, fixed: true, why: `Stocks: ${w} × ${1 + re / 100} = ${round(e, 2)}; bonds: ${100 - w} × ${1 + rb / 100} = ${round(b, 2)}. Weight = ${round(e, 2)} ÷ ${round(e + b, 2)} = ${pct(ans, 1)}. The winner's weight grows, so the portfolio drifts to more risk.` }); } },
    { k: 'calc', gen: () => { const V = pick([100000, 200000, 500000]), cur = pick([64, 66, 68, 70, 72]), tgt = pick([60, 65]); const ans = V * (cur - tgt) / 100; return N({ q: `A ${usd(V, 0)} portfolio is now ${cur}% stocks but the target is ${tgt}%. How much should you sell in stocks to rebalance (and put into bonds)?`, ans, wrong: [V * cur / 100, V * (cur + tgt) / 100 / 10, V * (cur - tgt) / 200], fmt: x => usd(x, 0), alt: () => V * cur / 100 - V * tgt / 100, tol: 1e-6, fixed: true, why: `Stocks are worth ${usd(V * cur / 100, 0)} but should be ${usd(V * tgt / 100, 0)}. The excess is ${usd(ans, 0)}: sell that much and buy bonds.` }); } },
    { k: 'concept', q: 'What is the main purpose of an investment policy statement?', o: ['To fix objectives, constraints and rules in advance', 'To predict returns', 'To pick individual stocks', 'To reduce taxes'], a: 0, why: 'It commits the investor to a disciplined process before emotions get involved.' },
    { k: 'concept', q: 'What is the primary purpose of rebalancing?', o: ['Keeping risk in line with the target allocation', 'Maximizing return', 'Avoiding all taxes', 'Timing the market'], a: 0, why: 'Drift changes the portfolio\'s risk; rebalancing restores it.' },
    { k: 'concept', q: 'Which is a tactical (rather than strategic) allocation decision?', o: ['Temporarily overweighting equities because you think they are cheap', 'Setting a 60/40 long-term target', 'Writing the IPS', 'Choosing a benchmark'], a: 0, why: 'Tactical decisions deviate from the long-term policy on a short-term view.' },
    { k: 'concept', q: 'When should an IPS normally be reviewed?', o: ['When the investor\'s circumstances change', 'Every time the market moves 2%', 'Never', 'Only after a loss'], a: 0, why: 'Life changes (job, retirement) justify revisiting the plan; market noise does not.' },
    { k: 'apply', q: 'A long bull market has pushed your stock share from 60% to 75%. What does that mean for your risk?', o: ['You now carry more risk than you intended', 'You now carry less risk', 'Nothing changed', 'Your bonds became riskier'], a: 0, why: 'A higher stock weight means a more volatile portfolio than the plan called for.' },
    { k: 'apply', q: 'You receive a bonus to invest. Your stocks are overweight. What is a low-cost way to rebalance?', o: ['Put the new money into bonds instead of selling stocks', 'Sell all stocks', 'Do nothing forever', 'Put it all in stocks'], a: 0, why: 'Directing new cash to the underweight asset rebalances without selling or paying tax.' }
  ],
  related: ['pm-cal', 'p-bhb86', 'pm-risk']
}

  );
})();
