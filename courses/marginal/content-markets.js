/* Efficient markets, behavioral finance, and capital structure. */
window.LESSONS = window.LESSONS || [];
(function () {
  const QL = window.QL, N = QL.numeric, usd = QL.usd, pct = QL.pct, int = QL.int, pick = QL.pick, round = QL.round, num = QL.num;

  window.LESSONS.push(

{
  id: 'emh', type: 'concept', title: 'Efficient markets',
  blurb: 'If prices already reflect what is known, can anyone consistently beat the market?',
  level: 'Intermediate', min: 20, tags: ['efficiency', 'random walk', 'active vs passive'], widget: 'randomwalk',
  los: [
    'State the Efficient Market Hypothesis in plain words and explain why efficient prices follow a random walk.',
    'Tell apart the weak, semi-strong and strong forms.',
    'Explain why competition tends to make markets efficient, and why perfect efficiency is impossible.',
    'Explain the joint hypothesis problem.',
    'Work out how much a small annual fee costs an investor over decades.'
  ],
  terms: [
    ['Efficient market', 'a market where prices already reflect the information available to investors'],
    ['Random walk', 'a path where each step is unpredictable from the steps before'],
    ['Technical analysis', 'trying to predict prices from past prices and trading volume (chart reading)'],
    ['Fundamental analysis', 'trying to find mispriced securities by studying company accounts and the economy'],
    ['Arbitrage', 'trading to profit from a price gap, which pushes the gap closed'],
    ['Active / passive', 'active investors try to beat the market; passive investors just hold the market (an index fund)'],
    ['Benchmark', 'the standard a manager is measured against, such as a market index']
  ],
  body: `
<p>You look up a stock and it costs $50. Will it be higher tomorrow? Thousands of analysts, at banks and funds all over the world, are asking the same question right now and using every scrap of information they can find. The <b>Efficient Market Hypothesis (EMH)</b> is the claim that they are so good at it, collectively, that today's price already contains what they know.</p>

<h2>The idea in plain words</h2>
<aside class="callout story"><b class="lab">Picture this</b>
<p>Imagine a huge crowd guessing the weight of an ox at a fair. Individually they are off, but the average of all the guesses is remarkably close. In an efficient market the price plays the role of that average: it already combines everyone's information. So what can move it tomorrow? Only <em>new</em> information, and new information, by definition, is a surprise. You cannot predict a surprise.</p></aside>
<p>This means price changes should be unpredictable: they follow something like a <b>random walk</b>. It does <em>not</em> mean prices are random nonsense. Prices are set by information. It is the <em>changes</em> that are unpredictable, because they are driven by news that nobody could have known in advance.</p>

<h2>Three forms</h2>
<table class="simple"><thead><tr><th>Form</th><th>Prices reflect...</th><th>So this cannot beat the market</th></tr></thead><tbody>
<tr><td><b>Weak</b></td><td>All past prices and trading volumes</td><td>Technical analysis (chart reading)</td></tr>
<tr><td><b>Semi-strong</b></td><td>All public information: accounts, news, announcements</td><td>Fundamental analysis of public information</td></tr>
<tr><td><b>Strong</b></td><td>All information, even private</td><td>Even insider knowledge. Almost nobody believes this fully; insider trading is illegal for a reason</td></tr>
</tbody></table>

<h2>Why it might hold: competition</h2>
<div class="example"><b class="lab">Example</b><p>Public information says a share is worth $50, but it is trading at $45. What happens?</p>
<b class="lab sol">Solution</b><p>Anyone who spots this buys at $45, expecting to profit as the price moves to $50. Their buying pushes the price up. Once it is near $50 the opportunity is gone. With thousands of traders hunting, such gaps close very quickly, which is why they are hard to profit from consistently.</p></div>
<p>Prices need not be perfect, only hard to beat consistently <em>after costs</em>. Fama and French (2010) found that the combined portfolio of actively managed US equity funds is close to the market portfolio, so the high costs of active management show up as lower returns to investors, and few funds appear to earn enough above their benchmarks to cover their costs.</p>

<h2>How small fees become big money</h2>
<div class="example"><b class="lab">Example</b><p>Suppose the market earns 8% a year. An index fund that just holds the market charges almost nothing and delivers about 8%. An active fund earns the same 8% before costs but charges 1% a year in fees and trading costs, so you get 7%. You invest $10,000 in each for 30 years. What is the difference?</p>
<b class="lab sol">Solution</b>
<table class="steps"><tr><td>Index fund: 10,000 × 1.08<sup>30</sup></td><td>$100,627</td></tr><tr><td>Active fund: 10,000 × 1.07<sup>30</sup></td><td>$76,123</td></tr><tr class="tot"><td>Difference</td><td>$24,504</td></tr></table>
<p>One percentage point a year cost about a quarter of the final wealth. (These are illustrative round numbers, not any particular fund.)</p></div>

<h2>Why it cannot be perfectly true</h2>
<p>Grossman and Stiglitz (1980) noticed a paradox: if prices already reflect all information, nobody has any incentive to pay for research, and then prices would <em>stop</em> reflecting it. So markets must be <em>efficient enough</em> that costly research barely pays. There are also <b>limits to arbitrage</b>: mispricings can persist if trading against them is risky, costly or capital-constrained.</p>
<aside class="callout mistake"><b class="lab">Common mistake</b><p>"A manager beat the market three years running, so markets are inefficient." Not necessarily. Suppose 1,000 managers each have a pure 50% chance of beating the market each year. About 1,000 × 0.5<sup>3</sup> = 125 will beat it three years in a row by luck alone. Skill is shown by results that persist, not by a lucky streak among many.</p></aside>

<h2>The joint hypothesis problem</h2>
<p>To say a return was "abnormal" you need a model of the normal return. If you find an apparent anomaly, either markets are inefficient <em>or</em> your model of risk is wrong, and you cannot tell which. That is why efficiency debates rarely end.</p>

<h2>Can a simple pattern beat noise?</h2>
<p>The widget below simulates prices that are pure randomness. Look at how much "pattern" you can see anyway, then test a "follow yesterday's move" rule. Then add some day-to-day momentum and see how strong it has to be before the rule pays.</p>
`,
  takeaways: [
    'Efficiency means prices reflect available information, so excess returns cannot be reliably predicted.',
    'Prices follow a random walk because only new (unpredictable) information moves them.',
    'Testing it always requires a model of "normal" returns: the joint hypothesis problem.',
    'Perfect efficiency is impossible (Grossman–Stiglitz), but beating the market after costs is hard, and fees compound.'
  ],
  quiz: [
    { k: 'calc', gen: () => { const p = pick([10000, 20000, 50000]), r = pick([6, 7, 8, 9]), f = pick([0.5, 1, 1.5]), n = pick([20, 25, 30, 40]); const ans = p * (Math.pow(1 + r / 100, n) - Math.pow(1 + (r - f) / 100, n)); return N({ q: `You invest ${usd(p, 0)} for ${n} years. An index fund earns ${r}% a year. An active fund earns the same ${r}% before costs but charges ${f}% a year, so you keep ${round(r - f, 1)}%. How much more does the index fund leave you with after ${n} years?`, ans, wrong: [p * n * f / 100, p * Math.pow(1 + f / 100, n) - p, ans / 2], fmt: x => usd(x, 0), alt: () => { let a = p, b = p; for (let i = 0; i < n; i++) { a *= 1 + r / 100; b *= 1 + (r - f) / 100; } return a - b; }, tol: 1e-4, fixed: true, why: `Index: ${usd(p, 0)} × ${1 + r / 100}^${n} = ${usd(p * Math.pow(1 + r / 100, n), 0)}. Active: ${usd(p, 0)} × ${round(1 + (r - f) / 100, 4)}^${n} = ${usd(p * Math.pow(1 + (r - f) / 100, n), 0)}. Difference: ${usd(ans, 0)}. The simple total of fees (${usd(p * n * f / 100, 0)}) misses that each year's fee also costs you the growth it would have earned.` }); } },
    { k: 'calc', gen: () => { const m = pick([500, 1000, 2000, 5000]), yrs = pick([3, 4, 5]); const ans = m * Math.pow(0.5, yrs); return N({ q: `${m} fund managers each have a pure 50% chance of beating the market every year, with no skill at all. About how many would you expect to beat it ${yrs} years in a row by luck alone?`, ans, wrong: [m / 2, m / yrs, m * 0.5 * yrs / 10], fmt: x => num(x, 1), alt: () => { let k = m; for (let i = 0; i < yrs; i++) k *= 0.5; return k; }, tol: 1e-9, fixed: true, why: `Each year halves the group: ${m} × 0.5^${yrs} = ${num(ans, 1)}. With enough managers, impressive streaks appear by chance, so a streak alone is weak evidence of skill.` }); } },
    { k: 'concept', q: 'Which form of market efficiency says prices reflect all public information?', o: ['Semi-strong form', 'Weak form', 'Strong form', 'Random form'], a: 0, why: 'Semi-strong efficiency covers all public information; weak covers past prices; strong includes private information.' },
    { k: 'concept', q: 'If prices follow a random walk, what does that imply about past price changes?', o: ['They cannot be used to predict future changes', 'They predict future changes', 'Prices never change', 'Prices always fall after a rise'], a: 0, why: 'Random walk means future changes are unrelated to the past.' },
    { k: 'concept', q: 'What is the "joint hypothesis problem"?', o: ['You cannot test efficiency without also assuming a model of expected returns', 'Two firms merging', 'Investors hold two assets', 'Two markets trade the same asset'], a: 0, why: 'An apparent anomaly could mean inefficiency or a wrong model of risk.' },
    { k: 'concept', q: 'Which strategy does weak-form efficiency say cannot work?', o: ['Predicting prices from past prices (technical analysis)', 'Buying an index fund', 'Diversifying', 'Reading a company\'s accounts for public information about its future'], a: 0, why: 'Weak form says past prices and volumes are already reflected in today\'s price.' },
    { k: 'concept', q: 'What is the Grossman–Stiglitz paradox?', o: ['If prices reflected all information, nobody would pay to gather it, so they could not', 'Prices are always random', 'Investors always overreact', 'Fees are always too high'], a: 0, why: 'Research must pay a little for prices to stay informative, so markets can only be efficient enough that research barely pays.' },
    { k: 'apply', q: 'A share is worth $50 on public information but trades at $45. Arbitrageurs notice. What is most likely to happen?', o: ['Their buying pushes the price up until the gap closes', 'The price falls further', 'Nothing: gaps last forever', 'Trading is halted'], a: 0, why: 'Competition for the profit moves the price towards value, and this is the mechanism behind efficiency.' },
    { k: 'apply', q: 'A fund manager charges a much higher fee than an index fund and earns the same return before fees. After fees, the investor...', o: ['Earns less, and the gap compounds over time', 'Earns more, because higher fees mean more skill', 'Earns exactly the same', 'Pays no tax'], a: 0, why: 'Fees come straight out of returns and, like returns, they compound.' },
    { k: 'apply', q: 'An analyst says: "This pattern beat the market in the past, so markets must be inefficient." What is a fair reply?', o: ['It might be luck, or it might be compensation for risk that the model missed', 'You are right; prove it in one year', 'Patterns can never appear', 'Only the strong form allows patterns'], a: 0, why: 'Past success can be luck or unmeasured risk, which is why the joint hypothesis problem is so hard to escape.' }
  ],
  related: ['p-fama70', 'p-shiller', 'behav', 'pm-fees']
},

{
  id: 'behav', type: 'concept', title: 'Behavioral finance and prospect theory',
  blurb: 'How real people evaluate gains, losses and probabilities, and why that matters for prices.',
  level: 'Intermediate', min: 18, tags: ['behavioral', 'prospect theory'], widget: 'prospect',
  los: [
    'Explain reference dependence, loss aversion and probability weighting in plain words.',
    'Compute how a gain and an equal loss feel using the prospect-theory value function.',
    'Compute the win needed to accept a 50/50 bet, given loss aversion.',
    'Describe the disposition effect, overconfidence and extrapolation.',
    'Explain why irrational traders do not always get corrected by rational ones.'
  ],
  terms: [
    ['Reference point', 'the level you compare outcomes against, such as the price you paid'],
    ['Loss aversion', 'the tendency for a loss to hurt more than an equal gain pleases'],
    ['Value function', 'a curve showing how good or bad an outcome feels'],
    ['Probability weighting', 'giving small chances more weight, and big chances less weight, than they deserve'],
    ['Disposition effect', 'selling winners too soon and holding losers too long'],
    ['Overconfidence', 'believing you know more, or predict better, than you do'],
    ['Limits to arbitrage', 'the practical reasons that rational traders cannot always correct a mispricing']
  ],
  body: `
<p>Standard theory assumes investors maximize expected utility and update their beliefs correctly. Behavioral finance asks what happens if people systematically do not. The key word is <em>systematically</em>: the deviations are not random noise but follow predictable patterns.</p>

<h2>Start with a coin flip</h2>
<aside class="callout story"><b class="lab">Picture this</b>
<p>I offer you a coin flip: heads you win $150, tails you lose $100. The expected value is positive: 0.5 × 150 − 0.5 × 100 = +$25. A purely calculating investor accepts. Yet many people refuse. It is not that they cannot do the arithmetic. A $100 loss <em>feels</em> worse than a $150 gain feels good.</p></aside>
<p>That single observation is the seed of <b>prospect theory</b>, developed by Kahneman and Tversky.</p>

<h2>Prospect theory in three ideas</h2>
<ol>
<li><b>Reference dependence.</b> People judge outcomes as gains or losses relative to a reference point (often the purchase price or the status quo), not by final wealth.</li>
<li><b>Loss aversion.</b> Losses hurt more than equal gains please. Kahneman and Tversky's 1992 estimates put the ratio (λ) at about 2.25.</li>
<li><b>Probability weighting.</b> People overweight small probabilities (lottery tickets, insurance) and underweight moderate to large ones.</li>
</ol>
<p>The value function is therefore S-shaped: concave for gains (diminishing sensitivity: the tenth $100 pleases less than the first), convex for losses, and steeper on the loss side.</p>
<div class="fx"><div class="formula">v(x) = x<sup>α</sup> &nbsp; if x ≥ 0 &nbsp;&nbsp;&nbsp; v(x) = −λ · (−x)<sup>α</sup> &nbsp; if x &lt; 0</div><div class="fx-body">
<p><b class="lab">In plain English</b><i>v</i> is how much an outcome <em>feels</em>, as opposed to how big it is in dollars. For gains, raising to a power below 1 means each extra dollar feels a bit less good than the one before. For losses, the same shrinking applies, but the result is multiplied by λ, so losses hurt roughly twice as much as equal gains please.</p>
<dl class="syms"><dt>x</dt><dd>the gain (positive) or loss (negative) relative to your reference point</dd><dt>α</dt><dd>curvature; about 0.88 in the 1992 estimates (1 would mean no diminishing sensitivity)</dd><dt>λ</dt><dd>loss aversion; about 2.25</dd></dl>
<p class="ex"><b class="lab">Worked example</b>Gain $100: v = 100<sup>0.88</sup> ≈ <b>+57.5</b>. Lose $100: v = −2.25 × 57.5 ≈ <b>−129</b>. To accept a 50/50 bet that risks $100, you need the win to feel as big as the loss: X<sup>0.88</sup> = 129, so X ≈ <b>$251</b> (this treats both 50% chances as equally weighted, a simplification of the full theory). People want about $2.50 of upside for every $1 at risk.</p>
<p class="hook"><b class="lab">Remember it as</b>"Diminishing sensitivity, and losses count about double."</p></div></div>
<details class="pause"><summary>Pause and try: the coin flip again</summary><p>To avoid the coin flip (win $150 / lose $100) you would need the win to feel as big as the loss: about $251 with these numbers. $150 falls well short, so a loss-averse person turns it down, even though it has positive expected value.</p></details>

<h2>Behaviors in markets</h2>
<ul>
<li><b>Disposition effect:</b> investors tend to sell winners too early and hold losers too long (Shefrin and Statman, 1985; Odean, 1998), because a loss that is not yet sold does not feel like a "real" loss.</li>
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
    'Loss aversion explains why people refuse bets with positive expected value.',
    'Behavioral effects matter in prices only if limits to arbitrage stop rational traders from correcting them.'
  ],
  quiz: [
    { k: 'calc', gen: () => { const w = pick([120, 150, 200, 250]), l = pick([50, 80, 100]); const ans = 0.5 * w - 0.5 * l; return N({ q: `A fair coin flip pays $${w} on heads and costs you $${l} on tails. What is the expected value of the bet?`, ans, wrong: [w - l, (w + l) / 2, 0.5 * w], fmt: x => usd(x, 0), alt: () => (w * 1 + -l * 1) / 2, tol: 1e-9, fixed: true, why: `0.5 × $${w} + 0.5 × (−$${l}) = $${0.5 * w} − $${0.5 * l} = ${usd(ans, 0)}. ${ans > 0 ? 'Positive, yet many loss-averse people would still refuse it.' : 'Not positive, so a calculating investor would refuse.'}` }); } },
    { k: 'calc', gen: () => { const lam = pick([2, 2.25, 2.5]), l = pick([50, 100, 200]); const ans = l * Math.pow(lam, 1 / 0.88); return N({ q: `Using the prospect-theory value function with α = 0.88 and λ = ${lam}, about how large a win is needed to accept a 50/50 bet that risks losing $${l}? (Treat both chances as equally weighted.)`, ans, wrong: [l * lam, l, l * lam * lam], fmt: x => usd(x, 0), alt: () => { let lo = 0, hi = 100000; for (let i = 0; i < 200; i++) { const mid = (lo + hi) / 2; if (Math.pow(mid, 0.88) < lam * Math.pow(l, 0.88)) lo = mid; else hi = mid; } return lo; }, tol: 0.5, fixed: true, why: `Set the win's feeling equal to the loss's: X^0.88 = ${lam} × ${l}^0.88, so X = ${l} × ${lam}^(1/0.88) ≈ ${usd(ans, 0)}. Multiplying by λ alone (${usd(l * lam, 0)}) ignores the diminishing sensitivity to gains.` }); } },
    { k: 'concept', q: 'What does loss aversion mean?', o: ['A loss feels worse than an equal-sized gain feels good', 'People avoid all risk', 'People prefer certain losses', 'Investors never sell at a loss'], a: 0, why: 'The value function is steeper for losses than for gains.' },
    { k: 'concept', q: 'What is the disposition effect?', o: ['Selling winners too early and holding losers too long', 'Selling losers too fast', 'Refusing to invest', 'Buying only index funds'], a: 0, why: 'Because paper losses are painful to realize, investors hold them and cash in gains sooner.' },
    { k: 'concept', q: 'What is a reference point?', o: ['The level, such as the price you paid, against which gains and losses are judged', 'The stock\'s highest ever price', 'The risk-free rate', 'An index'], a: 0, why: 'People judge results as gains or losses relative to a reference, not by final wealth alone.' },
    { k: 'concept', q: 'How do people tend to treat very small probabilities?', o: ['They overweight them, as with lottery tickets and insurance', 'They ignore them completely', 'They treat them exactly correctly', 'They round them to 50%'], a: 0, why: 'Probability weighting inflates small chances, which helps explain both gambling and insurance.' },
    { k: 'apply', q: 'An investor holds a stock that is down 30% and sells nothing, but quickly sells a stock that is up 10%. Which effect is this?', o: ['The disposition effect', 'Diversification', 'Arbitrage', 'Random walk'], a: 0, why: 'Holding losers and selling winners sooner than makes sense is the disposition effect.' },
    { k: 'apply', q: 'Rational traders see a stock priced far above value because of a fad. Why might they still not fully correct it?', o: ['Betting against it is risky and costly, and the mispricing could widen first', 'They are prevented by law', 'Behavioral traders always win', 'Prices cannot move'], a: 0, why: 'Limits to arbitrage: risk, costs and limited capital can keep rational traders from closing the gap.' },
    { k: 'concept', q: 'What did Barber and Odean find about the most active retail traders?', o: ['They earned the lowest net returns', 'They earned the highest net returns', 'They matched the market exactly', 'They never lost money'], a: 0, why: 'Overconfidence leads to excessive trading, and trading costs reduce net returns.' }
  ],
  related: ['p-kt79', 'emh', 'p-shiller']
},

{
  id: 'capstruct', type: 'concept', title: 'Capital structure and Modigliani–Miller',
  blurb: 'Does it matter whether a firm funds itself with debt or equity? First, no. Then, it depends.',
  level: 'Intermediate', min: 22, tags: ['capital structure', 'wacc', 'leverage'], widget: 'mm',
  los: [
    'Describe what a firm\'s capital structure is and why managers care about it.',
    'Explain Modigliani–Miller Proposition I ("the pizza does not get bigger") in plain words.',
    'Use Proposition II to find the cost of equity of a levered firm.',
    'Calculate WACC and the value of an interest tax shield.',
    'Name the trade-off theory and the pecking order as reasons capital structure matters in practice.'
  ],
  terms: [
    ['Capital structure', 'the mix of debt and equity a firm uses to fund itself'],
    ['Leverage', 'the use of debt; a firm with a lot of debt is "highly levered"'],
    ['Cost of debt (r<sub>D</sub>)', 'the interest rate lenders require'],
    ['Cost of equity (r<sub>E</sub>)', 'the return shareholders require'],
    ['WACC', 'weighted average cost of capital: the blended cost of all the firm\'s funding'],
    ['Tax shield', 'the tax saved because interest payments are deductible'],
    ['Financial distress', 'the trouble, and cost, of being close to bankruptcy']
  ],
  body: `
<p>A firm's <b>capital structure</b> is its mix of debt and equity. Managers spend a lot of time on it, and yet the most famous result in corporate finance says that in a perfect world <em>it does not matter</em>. Understanding why is the best way to understand when it does.</p>

<h2>Proposition I: the pizza does not get bigger</h2>
<aside class="callout story"><b class="lab">Picture this</b>
<p>A pizza is worth $100 no matter how you slice it. Cut it into two big slices or eight small ones, and the whole pizza is still worth $100. Now think of a firm as a pizza: the pizza is the cash its business will produce. Splitting that cash between lenders (debt) and owners (equity) is just slicing. It cannot make the pizza bigger.</p></aside>
<p>In perfect markets (no taxes, no bankruptcy costs, no information gaps), a firm's total value depends on the cash flows its assets generate and their risk, not on how those cash flows are split between debtholders and shareholders.</p>

<h2>Proposition II: cheap debt makes equity pricier</h2>
<p>Debt looks cheaper than equity, so why not use lots of it? Because debt makes the shareholders' slice riskier: lenders are paid first, so whatever is left for owners swings more. Owners demand a higher return to compensate, and it turns out to offset the cheapness of debt <em>exactly</em>.</p>
<div class="fx"><div class="formula">r<sub>E</sub> = r<sub>0</sub> + (r<sub>0</sub> − r<sub>D</sub>) × (D ÷ E)</div><div class="fx-body">
<p><b class="lab">In plain English</b>Shareholders' required return equals the return of the underlying business, plus a bonus for the extra risk that debt loads onto them. The bonus grows with how much debt there is relative to equity (D ÷ E) and with how much cheaper debt is than the business's own return.</p>
<dl class="syms"><dt>r<sub>E</sub></dt><dd>cost of equity: return shareholders require</dd><dt>r<sub>0</sub></dt><dd>cost of capital of an all-equity (debt-free) firm</dd><dt>r<sub>D</sub></dt><dd>cost of debt</dd><dt>D ÷ E</dt><dd>debt-to-equity ratio</dd></dl>
<p class="ex"><b class="lab">Worked example</b>r<sub>0</sub> = 10%, r<sub>D</sub> = 5%, and the firm is half debt, half equity (D ÷ E = 1). Then r<sub>E</sub> = 10% + (10% − 5%) × 1 = <b>15%</b>. Check the blend: half equity at 15% plus half debt at 5% = 7.5% + 2.5% = <b>10%</b>, exactly r<sub>0</sub>. Cheap debt was fully offset by pricier equity.</p>
<p class="hook"><b class="lab">Remember it as</b>"Debt is cheaper, but it makes equity riskier by exactly enough to cancel out."</p></div></div>
<details class="pause"><summary>Pause and try: less debt</summary><p>Now D ÷ E = 0.5 (with the same r<sub>0</sub> = 10%, r<sub>D</sub> = 5%). r<sub>E</sub> = 10% + 5% × 0.5 = <b>12.5%</b>. Less debt, less extra risk for owners, so a smaller bonus.</p></details>

<h2>Adding the real world: taxes</h2>
<p>The blended cost of capital, called the <b>WACC</b> (weighted average cost of capital), weighs each source of funds by its share of the firm's value. With corporate taxes, interest is tax-deductible, so debt is cheaper after tax.</p>
<div class="fx"><div class="formula">WACC = (E ÷ V) × r<sub>E</sub> + (D ÷ V) × r<sub>D</sub> × (1 − τ)</div><div class="fx-body">
<p><b class="lab">In plain English</b>Average the cost of equity and the after-tax cost of debt, weighted by how much of the firm each one funds.</p>
<dl class="syms"><dt>E, D</dt><dd>market value of equity and of debt</dd><dt>V</dt><dd>E + D, total firm value</dd><dt>τ</dt><dd>corporate tax rate (25% → 0.25)</dd></dl>
<p class="ex"><b class="lab">Worked example</b>Equity is 60% of value at r<sub>E</sub> = 12.5%; debt is 40% at r<sub>D</sub> = 5%; τ = 25%. WACC = 0.6 × 12.5% + 0.4 × 5% × 0.75 = 7.5% + 1.5% = <b>9.0%</b>. Without the interest tax deduction, shareholders would demand 13.3% instead of 12.5% and the blend would be back at 10%, so the tax shield lowered the firm's cost of capital by a full point.</p></div></div>
<div class="fx"><div class="formula">V<sub>levered</sub> = V<sub>unlevered</sub> + τ × D</div><div class="fx-body">
<p><b class="lab">In plain English</b>With taxes, borrowing adds value equal to the <b>tax shield</b>: the tax rate times the amount of (permanent) debt. This is the 1963 correction to Modigliani and Miller.</p>
<p class="ex"><b class="lab">Worked example</b>An all-equity firm worth $100m borrows $40m permanently at a 25% tax rate. Shield = 0.25 × 40 = $10m, so the firm is now worth <b>$110m</b>.</p></div></div>

<h2>Why it still matters: the costs of too much debt</h2>
<ul>
<li><b>Financial distress costs.</b> More debt means higher odds of bankruptcy, with direct costs (lawyers) and indirect ones (lost customers, fire-sale assets).</li>
<li><b>Agency and information problems.</b> Debt disciplines managers but can distort incentives; Myers and Majluf's "pecking order" says managers prefer internal funds first, then debt, then equity, because issuing equity signals bad news.</li>
</ul>
<p>The <b>trade-off theory</b> says firms balance the tax shield against distress costs to reach an optimal leverage. The widget below shows the tax-shield half of that story; the distress-cost half is what stops the WACC line from falling forever.</p>
<aside class="callout mistake"><b class="lab">Common mistake</b><p>Concluding "debt is cheaper, so more debt always lowers a firm's cost of capital". Cheaper debt makes the <em>equity</em> more expensive, and only the tax deduction gives a genuine benefit, which is eventually outweighed by distress costs.</p></aside>
`,
  takeaways: [
    'In perfect markets, capital structure does not affect value: the pizza does not get bigger.',
    'Leverage raises the cost of equity in proportion, keeping the overall cost of capital constant.',
    'Taxes (a benefit), distress costs and information problems (costs) are why capital structure matters in practice.',
    'WACC blends the cost of equity and the after-tax cost of debt by their shares of firm value.'
  ],
  quiz: [
    { k: 'calc', gen: () => { const r0 = pick([8, 10, 12]), rd = pick([4, 5, 6]), de = pick([0.25, 0.5, 1, 1.5]); const ans = r0 + (r0 - rd) * de; return N({ q: `An unlevered firm's cost of capital is ${r0}% and its debt costs ${rd}%. With no taxes, what is the cost of equity if debt-to-equity is ${de}?`, ans, wrong: [r0, r0 + rd * de, r0 - (r0 - rd) * de], fmt: x => pct(x, 2), alt: () => { const e = 1, d = de, v = e + d; return (r0 * v - rd * d) / e; }, tol: 1e-9, fixed: true, why: `Proposition II: ${r0}% + (${r0}% − ${rd}%) × ${de} = ${round(ans, 2)}%. Check the blend: equity share ${round(1 / (1 + de) * 100, 1)}% at ${round(ans, 2)}% plus debt share at ${rd}% gives ${r0}%, exactly r₀.` }); } },
    { k: 'calc', gen: () => { const e = pick([50, 60, 70]), re = pick([10, 11, 12, 12.5, 14]), rd = pick([4, 5, 6]), t = pick([20, 25, 30]); const d = 100 - e; const ans = e / 100 * re + d / 100 * rd * (1 - t / 100); return N({ q: `A firm is funded ${e}% by equity (cost ${re}%) and ${d}% by debt (cost ${rd}%). The tax rate is ${t}%. What is its WACC?`, ans, wrong: [e / 100 * re + d / 100 * rd, (re + rd) / 2, e / 100 * re + d / 100 * rd * t / 100], fmt: x => pct(x, 2), alt: () => (e * re + d * rd * (1 - t / 100)) / 100, tol: 1e-9, fixed: true, why: `WACC = ${e / 100} × ${re}% + ${d / 100} × ${rd}% × (1 − ${t / 100}) = ${round(e / 100 * re, 3)}% + ${round(d / 100 * rd * (1 - t / 100), 3)}% = ${round(ans, 3)}%. Interest is tax-deductible, so debt counts at its after-tax cost.` }); } },
    { k: 'calc', gen: () => { const d = pick([20, 40, 50, 80]), t = pick([20, 25, 30]); const ans = d * t / 100; return N({ q: `A firm borrows $${d} million permanently and the corporate tax rate is ${t}%. What is the value of the interest tax shield?`, ans, wrong: [d, d * (1 - t / 100), t], fmt: x => '$' + num(x, 1) + ' million', alt: () => (d + d * t / 100) - d, tol: 1e-9, fixed: true, why: `Tax shield = τ × D = ${t / 100} × $${d}m = $${num(ans, 1)}m. The debt itself is not value; only the tax saved on the interest is.` }); } },
    { k: 'concept', q: 'In a perfect Modigliani–Miller world, total firm value depends on...', o: ['The cash flows of the assets and their risk', 'The debt-to-equity ratio', 'The dividend rate', 'The number of shares'], a: 0, why: 'Value comes from the asset side; financing only splits it up.' },
    { k: 'concept', q: 'With corporate taxes, why can debt increase firm value?', o: ['Interest is tax-deductible, creating a tax shield', 'Debt has no risk', 'Equity is illegal', 'Lenders subsidize it'], a: 0, why: 'Interest reduces taxable income, so the firm keeps more cash flow.' },
    { k: 'concept', q: 'Why does the cost of equity rise when a firm takes on more debt (Proposition II)?', o: ['Lenders are paid first, so shareholders\' returns become riskier', 'Shareholders are paid first', 'Debt is always more expensive than equity', 'Taxes rise'], a: 0, why: 'More debt means owners bear a bigger share of the business risk, and they demand more return for it.' },
    { k: 'concept', q: 'What stops a firm from borrowing without limit to enjoy the tax shield?', o: ['Financial distress costs rise with debt', 'Debt is illegal above 10%', 'Equity becomes free', 'Tax rates fall'], a: 0, why: 'The trade-off theory balances the tax shield against the expected costs of bankruptcy and distress.' },
    { k: 'concept', q: 'According to the pecking order idea, which funding do managers prefer first?', o: ['Internal funds (retained profits)', 'New equity', 'A share issue at any price', 'Bank overdrafts only'], a: 0, why: 'Issuing equity can signal bad news, so managers use internal funds first, then debt, then equity.' },
    { k: 'apply', q: 'A manager says, "Debt costs 5% and equity costs 12%, so shifting funding to debt must lower our cost of capital." What does Modigliani–Miller say (no taxes)?', o: ['Not overall: equity becomes riskier and its required return rises to offset the cheaper debt', 'She is right', 'Debt costs go up by 12%', 'Nothing changes because debt has no risk'], a: 0, why: 'In a perfect world the blended cost stays at r₀. The cheap debt is exactly offset by pricier equity.' }
  ],
  related: ['p-mm58', 'capm', 'tvm', 'fsa-credit', 'fsa-dupont']
}

  );
})();
