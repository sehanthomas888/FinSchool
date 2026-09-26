/* Paper breakdowns, part 1: portfolio theory, asset pricing, efficiency, behavioral finance, corporate finance, options, information and banking.
   Each page opens with the paper in plain words and the words you need, then walks through the question, method and findings. */
window.LESSONS = window.LESSONS || [];
(function () {
  const QL = window.QL, N = QL.numeric, usd = QL.usd, pct = QL.pct, int = QL.int, pick = QL.pick, round = QL.round, num = QL.num;

  window.LESSONS.push(

{
  id: 'p-markowitz', type: 'paper', title: 'Portfolio Selection', authors: 'Harry Markowitz', year: 1952, journal: 'Journal of Finance 7(1), 77–91',
  blurb: 'The paper that turned diversification from folk wisdom into mathematics.',
  level: 'Accessible', min: 20, tags: ['portfolio theory', 'diversification'],
  plain: 'Before this paper, "don\'t put all your eggs in one basket" was just a saying. Markowitz showed that the right question is not "which single investment is best?" but "which <em>combination</em> is best?", because how investments move <em>together</em> matters as much as how each one does alone. He turned that into a method, and it is the starting point of modern investing theory.',
  los: [
    'Explain why maximizing expected return alone leads to putting everything in one asset.',
    'Say why a portfolio\'s risk depends on how its assets move together, not just on each asset\'s own risk.',
    'Describe the efficient frontier and the main practical problem with the method.'
  ],
  terms: [
    ['Expected return', 'the average outcome you would expect'],
    ['Variance', 'a measure of how much returns vary around their average (standard deviation squared)'],
    ['Covariance', 'how two assets\' returns move together'],
    ['Efficient frontier', 'the set of portfolios with the highest expected return for each level of risk'],
    ['Law of large numbers', 'the idea that random ups and downs average out when you have many independent bets']
  ],
  question: 'How should an investor choose among risky securities when returns are uncertain? The dominant view at the time held that you should simply maximize the discounted expected return, which would mean putting everything into the single highest-yielding asset. Yet nobody actually invests that way.',
  idea: 'Investors care about both <b>expected return</b> and <b>risk (variance)</b>. Because security returns move together to some degree, a portfolio\'s risk depends on how securities move <em>with each other</em> (covariances), not just on each one\'s own risk. Diversification works, but only up to a point: it cannot remove risk that is common to all assets. For each level of risk there is a portfolio with the maximum expected return, and the set of these is the <b>efficient frontier</b>.',
  method: 'Mostly theoretical and geometric. Markowitz works through small examples with three and four securities, plotting the feasible portfolios and showing how the efficient set is traced out. There is no big dataset. He explicitly leaves the estimation of inputs to statistics and judgment and focuses on what an investor should do <em>given</em> those beliefs.',
  example: '<p>Suppose you have two stocks with the same expected return. Stock A and Stock B each swing a lot on their own. If they tend to rise and fall <em>together</em>, mixing them barely helps. If one tends to rise when the other falls, mixing them cancels much of the swing, so you get the same expected return with much less risk. That is the whole insight: it is the relationship between the two, the covariance, that matters. (The <a href="#/lesson/risk">risk lesson</a> works through the numbers.)</p><p>The practical burden is also visible here: to apply the method to <i>n</i> securities you need <i>n</i> variances and <i>n</i>(<i>n</i> − 1) ÷ 2 covariances. For 50 securities that is 1,225 covariances to estimate.</p>',
  findings: 'A rational investor should not maximize expected return alone. Portfolios can be ranked by an expected return–variance trade-off, and diversification lowers variance without reducing the expected return. The law of large numbers alone does not eliminate portfolio variance, because securities\' returns are positively correlated.',
  matters: 'Founding paper of modern portfolio theory. It moved the unit of analysis from the security to the portfolio, and it is the direct foundation for CAPM (see Sharpe, 1964). Markowitz shared the 1990 Nobel Prize in Economics.',
  critique: 'Estimation error is the practical Achilles heel: optimizers treat noisy expected-return estimates as truth and load up on assets with overestimated returns (Michaud called this "error maximization"). DeMiguel, Garlappi and Uppal (2009) found the naive 1/N portfolio often beats optimized portfolios out of sample. Variance also treats upside and downside surprises symmetrically, and it assumes a single period.',
  lookFor: [
    'Where does Markowitz argue the law of large numbers fails as a justification for diversification, and why?',
    'The three-security diagrams: can you see why the efficient set is a curve, not a point?',
    'How he separates the <em>formation of beliefs</em> from the <em>choice of portfolio</em>, and which one the paper covers.',
    'How short the paper is compared with its influence.'
  ],
  quiz: [
    { k: 'calc', gen: () => { const n = pick([10, 20, 30, 50, 100]); const ans = n * (n - 1) / 2; return N({ q: `To apply Markowitz's method to ${n} securities you must estimate the covariance between every pair. How many different pairs (covariances) are there?`, ans, wrong: [n, n * n, n * (n + 1) / 2], fmt: x => num(x, 0), alt: () => { let c = 0; for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) c++; return c; }, tol: 1e-9, fixed: true, why: `Each pair counts once: ${n} × ${n - 1} ÷ 2 = ${num(ans, 0)}. The number of inputs grows very quickly with the number of securities, one reason estimation error is a practical problem.` }); } },
    { k: 'calc', gen: () => { const w = pick([0.5, 0.6, 0.7]), sa = pick([16, 20, 24]), sb = pick([6, 8, 10]), rho = pick([-0.3, 0, 0.3, 0.6]); const ans = Math.sqrt(w * w * sa * sa + (1 - w) * (1 - w) * sb * sb + 2 * w * (1 - w) * rho * sa * sb); return N({ q: `Two assets have volatilities ${sa}% and ${sb}% and correlation ${rho}. A portfolio puts ${w * 100}% in the first and the rest in the second. What is the portfolio's volatility?`, ans, wrong: [w * sa + (1 - w) * sb, Math.sqrt(w * w * sa * sa + (1 - w) * (1 - w) * sb * sb), sa], fmt: x => pct(x, 2), alt: () => { const ws = [w, 1 - w], s = [sa, sb], R = [[1, rho], [rho, 1]]; let v = 0; for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) v += ws[i] * ws[j] * s[i] * s[j] * R[i][j]; return Math.sqrt(v); }, tol: 1e-9, fixed: true, why: `Variance = own risks + covariance term = ${round(w * w * sa * sa, 2)} + ${round((1 - w) * (1 - w) * sb * sb, 2)} + ${round(2 * w * (1 - w) * rho * sa * sb, 2)} = ${round(ans * ans, 2)}. Volatility = ${pct(ans, 2)}, lower than the weighted average ${pct(w * sa + (1 - w) * sb, 2)} whenever the correlation is below 1.` }); } },
    { k: 'concept', q: 'What did Markowitz argue was wrong with simply maximizing expected return?', o: ['It implies holding a single asset, ignoring risk and diversification', 'It ignores taxes', 'It requires derivatives', 'It only works for bonds'], a: 0, why: 'If only expected return mattered, the highest-return asset would always win. Real investors diversify because risk matters.' },
    { k: 'concept', q: 'A portfolio\'s risk depends primarily on...', o: ['Each asset\'s risk and how the assets co-move', 'Each asset\'s own return only', 'The number of trades', 'The risk-free rate only'], a: 0, why: 'Covariances between assets matter for portfolio variance.' },
    { k: 'concept', q: 'What is a known practical problem with mean–variance optimization?', o: ['It is very sensitive to errors in estimated inputs', 'It ignores expected returns', 'It cannot handle two assets', 'It requires negative returns'], a: 0, why: 'Small errors in estimated expected returns can produce extreme, unstable portfolios.' },
    { k: 'concept', q: 'What is the efficient frontier?', o: ['The portfolios with the highest expected return for each level of risk', 'The single best stock', 'The lowest-cost funds', 'The portfolios with zero risk'], a: 0, why: 'For every level of risk it picks the portfolio with the highest expected return.' },
    { k: 'apply', q: 'Why does the law of large numbers not remove all portfolio risk, according to Markowitz?', o: ['Securities\' returns are positively correlated, so risk common to all assets remains', 'Averages never settle', 'Investors are irrational', 'Fees offset it'], a: 0, why: 'The law of large numbers needs independent bets. Positively correlated assets share a common risk that diversification cannot remove.' },
    { k: 'apply', q: 'An "optimized" portfolio built from noisy return forecasts performs worse than an equal-weighted 1/N portfolio out of sample. Which finding does this echo?', o: ['DeMiguel, Garlappi and Uppal (2009)', 'Markowitz (1952)', 'Sharpe (1964)', 'Fama (1970)'], a: 0, why: 'They found the naive 1/N rule often beats optimized portfolios out of sample because of estimation error.' }
  ],
  related: ['risk', 'p-sharpe']
},

{
  id: 'p-sharpe', type: 'paper', title: 'Capital Asset Prices: A Theory of Market Equilibrium under Conditions of Risk', authors: 'William F. Sharpe', year: 1964, journal: 'Journal of Finance 19(3), 425–442',
  blurb: 'If everyone behaves like a Markowitz investor, what does that imply for asset prices?',
  level: 'Moderate', min: 25, tags: ['CAPM', 'equilibrium'],
  plain: 'Markowitz told one investor how to build a portfolio. Sharpe asked: if <em>everyone</em> does that, what happens to prices? His answer: everyone ends up holding the same basket of risky assets (the whole market), and the extra return an asset offers depends only on how much it moves with the market, its beta. Risk that has nothing to do with the market is not rewarded, because you can diversify it away for free.',
  los: [
    'Explain the main assumptions Sharpe uses and what they imply for how investors behave.',
    'State the CAPM result: expected return rises linearly with beta.',
    'Describe the "price of time" and the "price of risk".',
    'Summarize the main criticisms (Roll, and the flat empirical line).'
  ],
  terms: [
    ['Equilibrium', 'a state where prices have settled so that supply equals demand'],
    ['Market portfolio', 'all risky assets held in proportion to their value'],
    ['Beta', 'an asset\'s sensitivity to the market'],
    ['Risk-free rate', 'the return on an asset with no risk, at which everyone can borrow and lend'],
    ['Capital market line', 'the line of best combinations of the risk-free asset and the market portfolio']
  ],
  question: 'Markowitz described what one investor should do. Sharpe asks the next question: if <em>all</em> investors behave that way, what determines the price of risk in the market, and how should an individual asset\'s expected return relate to its risk?',
  idea: 'Assume investors share the same beliefs and can borrow and lend freely at a risk-free rate. Then they all hold the same portfolio of risky assets (the market portfolio), differing only in how much they lever or de-lever it. In equilibrium, an asset\'s expected return rises linearly with its <b>beta</b>, its sensitivity to the overall market. Risk unrelated to the market is not rewarded.',
  method: 'A theoretical equilibrium model. Sharpe lays out explicit assumptions (single period, mean–variance investors, common expectations, one risk-free rate for lending and borrowing) and derives the market-wide relationship. Lintner (1965) and Mossin (1966) reached the same result independently; Treynor had an unpublished version earlier.',
  example: '<p>Take a risk-free rate of 3%, a market premium of 5% and a stock with beta 1.4. The model says its expected return should be 3% + 1.4 × 5% = <b>10%</b>. A stock with beta 0.6 should offer 3% + 0.6 × 5% = <b>6%</b>. A stock that is very risky on its own but has a beta of 0.6 still only needs to offer 6%, because the market does not pay for the part of the risk you can diversify away.</p>',
  findings: 'The capital market line shows the trade-off for efficient portfolios, and the relationship for individual assets, later called the security market line, ties expected return to beta. Sharpe frames it as two prices: the <em>price of time</em> (the risk-free rate) and the <em>price of risk</em> (the extra return per unit of market exposure).',
  matters: 'CAPM became the default model for the cost of equity, for evaluating fund managers, and for the language of "beta" and "alpha". Sharpe shared the 1990 Nobel Prize with Markowitz and Miller.',
  critique: 'Roll (1977) argued the theory cannot be truly tested because the market portfolio includes all assets and is not observable. Empirically, early tests (Black, Jensen and Scholes, 1972) found a flatter line than predicted, and Fama and French (1992) found beta did not explain average returns across stocks. The assumptions (common beliefs, unlimited borrowing at the risk-free rate) are strong, and Black (1972) developed a version without risk-free borrowing.',
  lookFor: [
    'The list of assumptions: which one would you relax first, and what would change?',
    'The distinction between the price of time and the price of risk.',
    'How the argument moves from the efficient portfolio to individual assets.',
    'What "risk" means for a single asset here, and why its own variance is not enough.'
  ],
  quiz: [
    { k: 'calc', gen: () => { const rf = pick([2, 3, 4]), b = pick([0.6, 0.9, 1.2, 1.4]), mrp = pick([4, 5, 6]); const ans = rf + b * mrp; return N({ q: `The risk-free rate is ${rf}%, the market risk premium is ${mrp}% and a stock's beta is ${b}. What expected return does Sharpe's model imply?`, ans, wrong: [b * mrp, rf + mrp, b * (rf + mrp)], fmt: x => pct(x, 2), alt: () => rf * (1 - b) + b * (rf + mrp), tol: 1e-9, fixed: true, why: `E[R] = ${rf}% + ${b} × ${mrp}% = ${round(ans, 2)}%. Only the beta part earns the premium.` }); } },
    { k: 'concept', q: 'In Sharpe\'s equilibrium, why is an asset\'s own standalone variance not what determines its expected return?', o: ['Investors hold diversified portfolios, so only the market-related part of risk is priced', 'Variance cannot be measured', 'Prices are set by regulators', 'Variance is always constant'], a: 0, why: 'Idiosyncratic risk is diversified away, leaving beta as the relevant risk.' },
    { k: 'concept', q: 'Sharpe describes the market as setting two prices. Which?', o: ['Price of time and price of risk', 'Price of labor and capital', 'Price of stocks and bonds', 'Price of inflation and growth'], a: 0, why: 'The risk-free rate is the price of time; the market risk premium per unit of beta is the price of risk.' },
    { k: 'concept', q: 'What is Roll\'s critique of CAPM?', o: ['The true market portfolio is unobservable, so the model cannot be properly tested', 'Beta is always 1', 'Investors are too rational', 'Interest rates are constant'], a: 0, why: 'Testing CAPM requires the true market portfolio, which includes every asset.' },
    { k: 'concept', q: 'What do all investors hold in Sharpe\'s equilibrium (apart from the risk-free asset)?', o: ['The same portfolio of risky assets: the market portfolio', 'Different portfolios depending on taste', 'Only bonds', 'Only one stock'], a: 0, why: 'With common beliefs, everyone picks the same best risky portfolio and differs only in how much to lend or borrow.' },
    { k: 'concept', q: 'Which assumption is among Sharpe\'s strong assumptions?', o: ['Investors can borrow and lend unlimited amounts at one risk-free rate', 'Markets are closed', 'There is only one stock', 'Returns are guaranteed'], a: 0, why: 'This and common beliefs are strong assumptions; Black (1972) developed a version without risk-free borrowing.' },
    { k: 'apply', q: 'A very risky biotech stock has a beta of 0.6. What does CAPM say it needs to offer relative to the market?', o: ['Less than the market\'s expected return, because only beta is rewarded', 'A very high return because it is risky', 'The risk-free rate exactly', 'Nothing can be said'], a: 0, why: 'Most of its risk is diversifiable, so it earns a premium only for its beta of 0.6.' },
    { k: 'apply', q: 'Early empirical tests found the security market line was flatter than predicted. What does that mean?', o: ['High-beta stocks earned less, and low-beta stocks more, than the theory says', 'Beta explains everything perfectly', 'Returns are random', 'The risk-free rate is zero'], a: 0, why: 'This mismatch is one reason later multi-factor models were developed.' }
  ],
  related: ['capm', 'p-markowitz', 'p-ff93']
},

{
  id: 'p-fama70', type: 'paper', title: 'Efficient Capital Markets: A Review of Theory and Empirical Work', authors: 'Eugene F. Fama', year: 1970, journal: 'Journal of Finance 25(2), 383–417',
  blurb: 'The paper that defined market efficiency and organized decades of tests around it.',
  level: 'Accessible', min: 30, tags: ['efficiency', 'event studies'],
  plain: 'Can you beat the market by studying prices and news? Fama gave the question a precise form. A market is "efficient" if prices already reflect the information available. He then sorted every test of that idea into three levels depending on what information is in prices: past prices, public news, or everything including secrets. His review of the evidence up to 1969 found that markets looked quite efficient at the first two levels.',
  los: [
    'Define an efficient market and the "fair game" idea.',
    'Tell apart weak, semi-strong and strong form tests and give an example of each.',
    'Summarize what the evidence up to 1970 found.',
    'Explain the joint hypothesis problem.'
  ],
  terms: [
    ['Efficient market', 'prices fully reflect the relevant information'],
    ['Fair game', 'a bet with no expected profit or loss, after allowing for normal returns'],
    ['Event study', 'measuring how prices react around an announcement'],
    ['Information set', 'the collection of facts a test assumes is already in prices'],
    ['Abnormal return', 'return above or below what a model says is normal']
  ],
  question: 'Do security prices fully reflect all available information, and how would we know?',
  idea: 'Define an efficient market as one where prices "fully reflect" an information set. Then classify the tests by the information set used: <b>weak</b> (past prices), <b>semi-strong</b> (all public information) and <b>strong</b> (all information, including private). Efficiency is framed as a "fair game": after accounting for the equilibrium expected return, what is left is unpredictable.',
  method: 'A literature review. Fama organizes the evidence up to 1969: statistical tests of return predictability (serial correlation, runs tests, trading-rule "filters"), event studies of how quickly prices react to announcements such as stock splits and earnings, and studies of whether insiders or mutual fund managers earn abnormal returns.',
  example: '<p>Think of the three forms as three sets of clues. <b>Weak form</b>: only yesterday\'s prices. Can charts predict tomorrow\'s move? Tests said mostly no. <b>Semi-strong</b>: everything published, such as earnings and split announcements. Can you profit by trading after the news? Prices adjusted almost immediately. <b>Strong</b>: even secrets. Insiders and specialists may profit, but there was little evidence that outsiders, including mutual funds, could.</p>',
  findings: 'Weak-form evidence is strongly supportive: past returns say little about future returns. Semi-strong evidence, such as fast adjustment to public announcements, is also largely supportive. For strong form, insiders and specialists may earn abnormal profits, but there is little evidence that other investors, including mutual funds, can. Fama concludes the evidence for efficiency is extensive and contradictory evidence sparse (as of 1970).',
  matters: 'It set the vocabulary of the field, gave researchers a structure for testing, and shaped the rise of index funds. Fama shared the 2013 Nobel Prize with Robert Shiller and Lars Peter Hansen, a pairing that itself shows how contested the topic remains.',
  critique: 'The <b>joint hypothesis problem</b> is acknowledged in the paper: every test also tests an asset-pricing model. Later anomalies (momentum, post-earnings-announcement drift, value) tested the conclusion; Shiller\'s volatility tests challenged it; Grossman and Stiglitz (1980) showed that perfect efficiency is self-contradictory. Fama himself revisited the topic in 1991 and 1998, defending it while adjusting the framework.',
  lookFor: [
    'The formal definitions of a "fair game" and how expected returns enter the definition.',
    'How each of the three sections maps to one of the three information sets.',
    'Which tests are <em>direct</em> tests of efficiency and which need a model of expected returns.',
    'How much of the evidence relies on data from the 1960s, and what that implies for today.'
  ],
  quiz: [
    { k: 'calc', gen: () => { const r = pick([12, 15, 20, 25]), e = pick([8, 10, 12]); const ans = r - e; return N({ q: `A stock returned ${r}% around an announcement, while a model of normal returns says it should have earned ${e}%. What was the abnormal return?`, ans, wrong: [r + e, r, e - r], fmt: x => pct(x, 1), alt: () => -(e - r), tol: 1e-9, fixed: true, why: `Abnormal return = actual − expected = ${r}% − ${e}% = ${round(ans, 1)}%. Event studies look for abnormal returns around news, since only what is unexpected should move a price in an efficient market.` }); } },
    { k: 'concept', q: 'Fama classifies efficiency tests by...', o: ['The information set used', 'The country tested', 'The asset class', 'The trading venue'], a: 0, why: 'Weak, semi-strong and strong forms differ by which information is assumed to be in prices.' },
    { k: 'concept', q: 'Event studies of stock splits and announcements mainly test which form?', o: ['Semi-strong form', 'Weak form', 'Strong form', 'None'], a: 0, why: 'They test how quickly prices adjust to public information.' },
    { k: 'concept', q: 'What limitation does Fama acknowledge in testing efficiency?', o: ['Tests are joint tests of efficiency and an asset-pricing model', 'No data exist', 'Markets are closed', 'Prices are constant'], a: 0, why: 'You need a model of expected returns to define an "abnormal" return.' },
    { k: 'concept', q: 'What does "fair game" mean here?', o: ['After allowing for normal expected returns, what is left is unpredictable', 'Everyone earns the same', 'Prices never change', 'Traders always win'], a: 0, why: 'A fair game has no predictable excess profit.' },
    { k: 'concept', q: 'What did the evidence on the strong form suggest?', o: ['Insiders and specialists may earn abnormal profits, but there was little evidence that others can', 'Everyone earns abnormal profits', 'Nobody has private information', 'Insider trading is legal and profitable for all'], a: 0, why: 'Fama found little evidence of abnormal profits for outsiders, such as mutual funds.' },
    { k: 'apply', q: 'A stock jumps the moment good earnings are announced and then does not drift. Which form of efficiency is this evidence for?', o: ['Semi-strong: prices adjusted quickly to public information', 'Weak only', 'Strong only', 'None'], a: 0, why: 'Rapid, complete adjustment to a public announcement is what semi-strong efficiency predicts.' },
    { k: 'apply', q: 'Someone finds a chart pattern that predicted returns in 1965 but not since. What is the best interpretation?', o: ['It may have been chance or a wrong model of normal returns, which is why tests are joint tests', 'Markets became inefficient overnight', 'Charts always work', 'The data must be wrong'], a: 0, why: 'A pattern in one sample proves little. Joint hypothesis and luck are always possible explanations.' }
  ],
  related: ['emh', 'p-shiller']
},

{
  id: 'p-shiller', type: 'paper', title: 'Do Stock Prices Move Too Much to be Justified by Subsequent Changes in Dividends?', authors: 'Robert J. Shiller', year: 1981, journal: 'American Economic Review 71(3), 421–436',
  blurb: 'A simple variance comparison that launched the excess-volatility debate.',
  level: 'Moderate', min: 30, tags: ['volatility', 'valuation'],
  plain: 'A stock\'s price is supposed to be the market\'s best forecast of the dividends the company will actually pay. Shiller pointed out that a forecast should be <em>calmer</em> than the thing it forecasts. He built the "perfect-foresight price" using the dividends that were actually paid later, and found that real stock prices swung around <em>far more</em> than that. His conclusion: changing dividend news cannot explain how much prices move.',
  los: [
    'Explain why a rational price (a forecast) should be less variable than the price with perfect foresight.',
    'Say how Shiller built the perfect-foresight price and what he found.',
    'Describe the rational reply (time-varying discount rates) and the statistical critiques.'
  ],
  terms: [
    ['Perfect-foresight price (p*)', 'the present value of the dividends that actually get paid afterwards'],
    ['Variance', 'a measure of how much a series moves around its average'],
    ['Forecast error', 'the gap between a forecast and what actually happens'],
    ['Discount rate', 'the rate used to shrink future dividends to today\'s value'],
    ['Detrending', 'removing a long-run growth path so that fluctuations can be compared']
  ],
  question: 'If stock prices reflect rational expectations of future dividends, they should be no more volatile than the dividends warrant. Are they?',
  idea: 'In an efficient market, the price today is the best forecast of the "perfect-foresight" price p*: the present value of the dividends that actually get paid afterwards. A forecast must be less variable than the thing it forecasts, because forecast errors add variance. So, if prices are rational forecasts, <b>Var(p) ≤ Var(p*)</b>.',
  method: 'Shiller constructs p* for the S&amp;P Composite index (from 1871) and the Dow Jones Industrial Average (from 1928) using actual subsequent dividends, a constant discount rate and an assumption about the terminal value. Both series are detrended, and he compares the variance of actual prices to the variance of p*.',
  example: '<p>Imagine a share that will actually pay $5 a year for three years, and then be worth $100, with a 10% discount rate. Its perfect-foresight price at the start is 5 ÷ 1.10 + 5 ÷ 1.10² + 5 ÷ 1.10³ + 100 ÷ 1.10³ = 4.55 + 4.13 + 3.76 + 75.13 = <b>$87.57</b>. That is what the price "should" have been with hindsight. A real price in the market is a <em>forecast</em> made without knowing the future, so it has forecast errors that make p* wiggle around it. The forecast should be the smoother of the two. Shiller found the opposite.</p>',
  findings: 'Actual prices are far more volatile than the p* series: the variance bound is violated, and by a large margin. The ex-post rational price is smooth, while actual prices swing widely around it. Shiller\'s conclusion is that changes in dividends cannot plausibly account for the size of price movements.',
  matters: 'Kicked off the "excess volatility" literature and provided a key motivation for behavioral finance. It also pushed researchers to consider <em>time-varying expected returns</em> (Campbell–Shiller, Cochrane) as an explanation. Shiller shared the 2013 Nobel with Fama and Hansen.',
  critique: 'Kleidon (1986) and Marsh and Merton (1986) challenged the statistics: dividends and prices are not stationary around a deterministic trend, so the variance comparison may be biased; Flavin (1983) documented small-sample problems in variance-bound tests. The most important reply is conceptual: with <em>time-varying discount rates</em>, high price volatility can be consistent with rationality, which raises the joint-hypothesis problem again.',
  lookFor: [
    'The famous chart comparing the actual price with p*. What does the difference look like?',
    'The step where forecast error is shown to be uncorrelated with the forecast, which gives the variance inequality.',
    'How p* is constructed and how sensitive it is to the terminal-value assumption.',
    'Which assumptions (constant discount rate, stationarity) later critics targeted.'
  ],
  quiz: [
    { k: 'calc', gen: () => { const d = pick([3, 4, 5, 6]), r = pick([8, 10, 12]), tv = pick([80, 100, 120]); let ans = 0; for (let t = 1; t <= 3; t++) ans += d / Math.pow(1 + r / 100, t); ans += tv / Math.pow(1 + r / 100, 3); return N({ q: `A share will pay $${d} in each of the next 3 years and then be worth $${tv}. With a ${r}% discount rate, what is its perfect-foresight price today?`, ans, wrong: [3 * d + tv, (3 * d + tv) / (1 + r / 100), d / (r / 100) + tv], fmt: x => usd(x, 2), alt: () => { const flows = [d, d, d + tv]; return flows.reduce((s, c, i) => s + c / Math.pow(1 + r / 100, i + 1), 0); }, tol: 1e-6, fixed: true, why: `Shrink each payment to today's money: ${d}/${round(1 + r / 100, 2)} + ${d}/${round(Math.pow(1 + r / 100, 2), 4)} + (${d} + ${tv})/${round(Math.pow(1 + r / 100, 3), 4)} = ${usd(ans, 2)}. That is p*: the present value of what was actually paid.` }); } },
    { k: 'calc', gen: () => { const vp = pick([100, 150, 200, 400]), ve = pick([50, 100, 300]); const ans = vp + ve; return N({ q: `If prices are rational forecasts, then p* = p + forecast error, where the error is unrelated to p. If Var(p) = ${vp} and Var(error) = ${ve}, what is Var(p*)?`, ans, wrong: [vp - ve, Math.max(vp, ve), vp * ve], fmt: x => num(x, 0), alt: () => Math.sqrt(vp * vp + 2 * vp * ve + ve * ve), tol: 1e-6, fixed: true, why: `Variances of unrelated terms add: Var(p*) = ${vp} + ${ve} = ${ans}. So Var(p*) is at least as large as Var(p). Shiller found the reverse: Var(p) was much larger.` }); } },
    { k: 'concept', q: 'Why must the variance of a rational forecast (price) not exceed that of the outcome (p*)?', o: ['Forecast errors add variance to the outcome and are unrelated to the forecast', 'Forecasts are always correct', 'Dividends are constant', 'Prices are set by the Fed'], a: 0, why: 'p* = p + error, with error uncorrelated with p, so Var(p*) = Var(p) + Var(error).' },
    { k: 'concept', q: 'What did Shiller find?', o: ['Prices are far more volatile than p*', 'Prices are less volatile than p*', 'Prices equal p*', 'Dividends fluctuate more than prices'], a: 0, why: 'The variance bound was violated by a wide margin.' },
    { k: 'concept', q: 'What is a rational-markets reply to Shiller\'s result?', o: ['Discount rates vary over time', 'Investors ignore dividends', 'There were no dividends', 'Prices are fixed'], a: 0, why: 'If required returns change, prices can move a lot without any change in dividends.' },
    { k: 'concept', q: 'What is p*, in Shiller\'s paper?', o: ['The present value of the dividends that actually get paid afterwards', 'Today\'s price', 'A forecast of prices', 'The book value'], a: 0, why: 'It is the price a person with perfect foresight of dividends would have set.' },
    { k: 'apply', q: 'Critics like Kleidon argued the variance comparison might be biased. What was their concern?', o: ['Dividends and prices are not stationary around a fixed trend, which distorts the comparison', 'The data were forged', 'Stocks pay no dividends', 'Variance cannot be computed'], a: 0, why: 'If the series wander in ways the detrending misses, the variance comparison can mislead.' },
    { k: 'apply', q: 'Shiller\'s result is often used to motivate which field?', o: ['Behavioral finance', 'Accounting standards', 'Options pricing', 'Bank regulation'], a: 0, why: 'Excess volatility suggested prices react to more than fundamentals, and it inspired behavioral explanations (alongside time-varying discount rates).' }
  ],
  related: ['emh', 'tvm', 'p-fama70']
},

{
  id: 'p-ff93', type: 'paper', title: 'Common Risk Factors in the Returns on Stocks and Bonds', authors: 'Eugene F. Fama and Kenneth R. French', year: 1993, journal: 'Journal of Financial Economics 33(1), 3–56',
  blurb: 'Adds size and value to the market factor, and reshapes how returns are explained.',
  level: 'Technical', min: 40, tags: ['factors', 'asset pricing'],
  plain: 'CAPM says only beta matters. Fama and French found that beta alone leaves a lot unexplained. Two other things also line up with average returns: the size of a company (small firms have earned more) and how cheap it is relative to its book value (cheap "value" firms have earned more than expensive "growth" firms). Adding those two "factors" to the market explains most of the differences in returns among the portfolios they tested.',
  los: [
    'Describe the three stock factors: market, size (SMB) and value (HML).',
    'Explain how the factors are built and how the tests were run.',
    'State the main finding and the main competing interpretations of the value premium.'
  ],
  terms: [
    ['Factor', 'a common source of risk or return that many assets share'],
    ['Book-to-market', 'accounting equity divided by market value; high = "value", low = "growth"'],
    ['SMB / HML', 'small minus big / high minus low book-to-market: the returns of factor-mimicking portfolios'],
    ['Alpha (intercept)', 'the part of a return the factors do not explain'],
    ['Factor zoo', 'the large number of proposed factors, many of which may be data-mined']
  ],
  question: 'Which common risk factors explain the differences in average returns across stocks and bonds?',
  idea: 'Market beta alone is not enough. Two more factors capture a lot of the common variation in returns: <b>size</b> (small stocks vs big) and <b>value</b> (high book-to-market stocks vs low). For bonds, term (maturity) and default risk matter. If these factors are priced risks, a portfolio\'s exposure to them should explain its average return.',
  method: 'Using U.S. stock data from July 1963 to December 1991, they sort stocks into portfolios by size and book-to-market and build factor-mimicking portfolios: <b>SMB</b> (small minus big) and <b>HML</b> (high minus low book-to-market). They then run time-series regressions of the returns of 25 test portfolios on the market, SMB and HML, and look at how large the leftover intercepts (alphas) are. Bond factors, TERM and DEF, are added for bond and stock–bond tests.',
  example: '<p>The model says a portfolio\'s expected return is r<sub>f</sub> + β × (market premium) + s × (SMB premium) + h × (HML premium). Suppose r<sub>f</sub> = 3%, the market premium is 5%, SMB is 2% and HML is 3%. A portfolio with β = 1, s = 0.5 and h = 0.8 should earn 3 + 1×5 + 0.5×2 + 0.8×3 = <b>11.4%</b>. CAPM alone would say 8%, so the two extra factors add 3.4 points of expected return for that tilt to small, value-like stocks.</p>',
  findings: 'The three stock factors explain most of the variation in returns for the test portfolios, and the alphas are typically small. Market beta alone leaves large differences in average returns unexplained, but adding size and value largely captures them. Stocks and bonds are linked through the shared term and default factors.',
  matters: 'The three-factor model became a workhorse for evaluating funds and estimating the cost of equity, and inspired later extensions including the five-factor model (Fama and French, 2015) and Carhart\'s (1997) momentum factor.',
  critique: 'Fama and French interpret size and value as proxies for risk; others argue they reflect mispricing (Lakonishok, Shleifer and Vishny, 1994) or that <em>characteristics</em> rather than factor covariances explain returns (Daniel and Titman, 1997). Momentum is unexplained by the model. The model struggles with small growth stocks. Factor premia have weakened, in part after publication, and value performed poorly through much of the 2010s. Broader worries about data mining ("factor zoo") apply.',
  lookFor: [
    'The 25-portfolio table: which cells have the biggest and smallest average returns?',
    'The regression intercepts and their t-statistics. Are they near zero?',
    'How SMB and HML are built, and why they use sorted portfolios.',
    'R² values with and without the extra factors.'
  ],
  quiz: [
    { k: 'calc', gen: () => { const rf = pick([2, 3, 4]), mkt = pick([4, 5, 6]), smb = pick([1, 2, 3]), hml = pick([2, 3, 4]), b = pick([0.8, 1, 1.2]), s = pick([0, 0.5, 1]), h = pick([-0.5, 0.3, 0.8, 1]); const ans = rf + b * mkt + s * smb + h * hml; return N({ q: `Using the three-factor model: r_f = ${rf}%, market premium ${mkt}%, SMB premium ${smb}%, HML premium ${hml}%. A portfolio has loadings β = ${b}, s = ${s}, h = ${h}. What is its expected return?`, ans, wrong: [rf + b * mkt, b * mkt + s * smb + h * hml, rf + mkt + smb + hml], fmt: x => pct(x, 2), alt: () => [[b, mkt], [s, smb], [h, hml]].reduce((t, [l, p]) => t + l * p, rf), tol: 1e-9, fixed: true, why: `E[R] = ${rf}% + ${b}×${mkt}% + ${s}×${smb}% + ${h}×${hml}% = ${round(ans, 2)}%. Without the size and value terms (CAPM only) it would be ${round(rf + b * mkt, 2)}%.` }); } },
    { k: 'concept', q: 'What do SMB and HML stand for?', o: ['Small-minus-big and high-minus-low (book-to-market)', 'Size and momentum', 'Stock market bonds', 'Systematic market beta'], a: 0, why: 'SMB captures the size effect; HML the value effect.' },
    { k: 'concept', q: 'What is the main empirical claim of the paper?', o: ['Size and value factors add substantial explanatory power beyond market beta', 'Beta alone explains returns', 'Bonds do not matter', 'Returns are random'], a: 0, why: 'The three-factor model explains most cross-sectional variation in the test portfolios.' },
    { k: 'concept', q: 'What is a key alternative interpretation of the value premium?', o: ['It is a mispricing rather than compensation for risk', 'It is a tax', 'It is a data error only', 'It is a regulation'], a: 0, why: 'Lakonishok, Shleifer and Vishny (1994) argued investors misprice value stocks.' },
    { k: 'concept', q: 'Which bond factors did the paper add for tests involving bonds?', o: ['TERM and DEF', 'SMB and HML', 'MKT and MOM', 'UP and DOWN'], a: 0, why: 'TERM (maturity) and DEF (default risk) link bonds and stocks.' },
    { k: 'concept', q: 'What did Fama and French\'s 25 test portfolios come from?', o: ['Sorting stocks by size and book-to-market', 'Sorting bonds by rating', 'Random selection', 'Country of listing'], a: 0, why: 'A 5×5 sort on size and book-to-market produced the 25 portfolios.' },
    { k: 'apply', q: 'A fund tilts heavily to small, cheap (high book-to-market) stocks. Compared with a CAPM benchmark, what does the three-factor model imply?', o: ['It should be expected to earn more, reflecting its size and value exposures', 'It should earn exactly the market return', 'It must have zero risk', 'It must have negative alpha'], a: 0, why: 'Positive loadings on SMB and HML raise the model\'s expected return.' },
    { k: 'apply', q: 'Value stocks underperformed for much of the 2010s. What does that suggest about factor premia?', o: ['They can weaken, sometimes for long stretches or after publication', 'They never change', 'They are guaranteed', 'They only exist in bonds'], a: 0, why: 'Factor premia are not constants; the paper\'s critiques include weakening premia and data-mining worries.' }
  ],
  related: ['capm', 'p-sharpe', 'emh']
},

{
  id: 'p-kt79', type: 'paper', title: 'Prospect Theory: An Analysis of Decision under Risk', authors: 'Daniel Kahneman and Amos Tversky', year: 1979, journal: 'Econometrica 47(2), 263–291',
  blurb: 'The descriptive theory of choice that became the foundation of behavioral economics.',
  level: 'Accessible', min: 30, tags: ['behavioral', 'decision theory'],
  plain: 'Standard theory says how rational people <em>should</em> choose between risky options. Kahneman and Tversky simply asked people, and found consistent, predictable departures. People treat a sure thing as more special than it should be, hate losses more than they like equal gains, and take gambles to avoid a sure loss. Their "prospect theory" describes how real people actually choose.',
  los: [
    'Explain the certainty effect, the reflection effect and the isolation effect.',
    'Describe the key features of the value function and decision weights.',
    'Say why the theory is descriptive rather than a recommendation, and name its main critiques.'
  ],
  terms: [
    ['Expected utility theory', 'the standard theory of how a rational person chooses between risky options'],
    ['Reference point', 'the level against which gains and losses are judged'],
    ['Loss aversion', 'losses hurt more than equal gains please'],
    ['Decision weight', 'the weight a person effectively gives a probability when choosing'],
    ['Descriptive vs normative', 'describing what people do vs saying what they should do']
  ],
  question: 'Expected utility theory says how rational people <em>should</em> choose under risk. How do people actually choose, and where do they systematically deviate?',
  idea: 'People evaluate outcomes as <b>gains and losses relative to a reference point</b> rather than final wealth. The value function is concave for gains, convex for losses and steeper for losses (<b>loss aversion</b>). Probabilities are replaced by <b>decision weights</b> that overweight small probabilities and underweight moderate and high ones.',
  method: 'Questionnaires with short hypothetical choice problems given to university students and faculty. Each problem is designed so the modal answer violates expected utility, isolating patterns such as the certainty effect and the reflection effect.',
  example: '<p>Try this yourself. <b>Choice 1:</b> a sure 3,000, or an 80% chance of 4,000 (and 20% of nothing)? The gamble is worth 0.8 × 4,000 = 3,200 on average, more than the sure 3,000, but most people take the sure thing. <b>Choice 2:</b> a sure loss of 3,000, or an 80% chance of losing 4,000? Now most people take the gamble, even though it loses more on average (3,200). The same people are cautious with gains and daring with losses. That flip is the reflection effect.</p>',
  findings: 'The <b>certainty effect</b>: outcomes that are certain get too much weight (about 80% of 95 respondents preferred a sure 3,000 to an 80% chance of 4,000, even though the gamble has a higher expected value; the amounts were in Israeli pounds, roughly a month\'s income). The <b>reflection effect</b>: risk aversion in gains becomes risk seeking in losses (92% of the same respondents preferred an 80% chance of losing 4,000 to a sure loss of 3,000). The <b>isolation effect</b>: people simplify choices by ignoring shared components, so how a problem is framed changes the answer.',
  matters: 'It is one of the most cited papers in economics and set the agenda for behavioral finance: the disposition effect, the equity premium puzzle via myopic loss aversion, and others. Kahneman received the 2002 Nobel Prize (Tversky died in 1996).',
  critique: 'The stakes were hypothetical and small. The original weighting scheme could violate stochastic dominance, which Tversky and Kahneman fixed in the 1992 cumulative version. The reference point is not pinned down by the theory. Some researchers argue loss aversion is smaller or more context-dependent than usually claimed (for example Gal and Rucker, 2018), and field evidence is mixed.',
  lookFor: [
    'The numbered choice problems: try them yourself before reading the answers.',
    'The S-shaped value function figure and the probability weighting figure.',
    'The difference between the <em>editing</em> phase and the <em>evaluation</em> phase of choice.',
    'Where the authors say the model is descriptive, not normative.'
  ],
  quiz: [
    { k: 'calc', gen: () => { const p = pick([0.8, 0.9, 0.5, 0.25]), X = pick([2000, 3000, 4000, 5000]); const ans = p * X; return N({ q: `A gamble gives a ${p * 100}% chance of ${usd(X, 0)} and otherwise nothing. What is its expected value?`, ans, wrong: [X, X * (1 - p), p + X], fmt: x => usd(x, 0), alt: () => X * p + 0 * (1 - p), tol: 1e-9, fixed: true, why: `Expected value = ${p} × ${usd(X, 0)} = ${usd(ans, 0)}. The certainty effect is that many people prefer a sure amount somewhat below this expected value to the gamble.` }); } },
    { k: 'concept', q: 'What is the "reflection effect"?', o: ['People are risk averse for gains and risk seeking for losses', 'People always gamble', 'People reflect on past choices', 'Preferences are random'], a: 0, why: 'The pattern of risk attitudes flips when moving from gains to losses.' },
    { k: 'concept', q: 'What is the certainty effect?', o: ['People overweight outcomes that are certain relative to merely probable', 'People prefer more information', 'People avoid all risk', 'People are always certain'], a: 0, why: 'A sure gain is preferred even when a gamble has a higher expected value.' },
    { k: 'concept', q: 'Prospect theory is best described as...', o: ['A descriptive theory of what people actually do', 'A normative theory of what people should do', 'A theory of prices', 'A theory of taxation'], a: 0, why: 'The authors say it describes actual choices rather than recommending them.' },
    { k: 'concept', q: 'What is the value function like, in prospect theory?', o: ['Concave for gains, convex for losses, and steeper for losses', 'A straight line', 'Concave everywhere', 'Flat'], a: 0, why: 'This gives diminishing sensitivity and loss aversion.' },
    { k: 'concept', q: 'What is the isolation effect?', o: ['People simplify choices by ignoring shared components, so framing changes answers', 'People isolate themselves from risk', 'People pick only one option', 'People ignore losses'], a: 0, why: 'Ignoring parts that options share can make the same choice look different under different framings.' },
    { k: 'apply', q: 'A person turns down a sure $3,000 for an 80% chance at $4,000, but chooses an 80% chance of losing $4,000 over a sure loss of $3,000. Which two effects are shown?', o: ['Certainty effect and reflection effect', 'Isolation and disposition effects', 'Momentum and value', 'Arbitrage and efficiency'], a: 0, why: 'Preferring the sure gain shows the certainty effect; taking the gamble in the loss domain shows the reflection effect.' },
    { k: 'apply', q: 'Which is a fair criticism of the original 1979 study?', o: ['The stakes were hypothetical and small, and the reference point is not pinned down', 'It used no people', 'It had no examples', 'It ignored probabilities'], a: 0, why: 'Later work used cumulative prospect theory (1992) and asked whether results hold with real stakes.' }
  ],
  related: ['behav', 'emh']
},

{
  id: 'p-mm58', type: 'paper', title: 'The Cost of Capital, Corporation Finance and the Theory of Investment', authors: 'Franco Modigliani and Merton H. Miller', year: 1958, journal: 'American Economic Review 48(3), 261–297',
  blurb: 'Why the way a firm finances itself does not matter in a perfect market, and why that is useful.',
  level: 'Moderate', min: 35, tags: ['capital structure', 'corporate finance'],
  plain: 'Should a company borrow more or issue more shares? Modigliani and Miller showed that, in a perfect world, it does not matter: a company is worth what its business earns, however that value is sliced between lenders and owners, like a pizza that is the same size however you cut it. The result is useful precisely because it tells you what to look for when it <em>does</em> matter: taxes, bankruptcy costs and information gaps.',
  los: [
    'State Propositions I, II and III in plain words.',
    'Explain the arbitrage argument ("homemade leverage") behind Proposition I.',
    'Say why the result is a benchmark, and name the 1963 correction.'
  ],
  terms: [
    ['Capital structure', 'the mix of debt and equity funding a firm'],
    ['Arbitrage', 'profiting from a price gap; it pushes gaps closed'],
    ['Homemade leverage', 'an investor borrowing personally to copy what a levered firm does'],
    ['Cost of capital', 'the return investors require on the firm\'s funding'],
    ['Perfect market', 'no taxes, no bankruptcy costs and no information gaps']
  ],
  question: 'What is the cost of capital to a firm, and how does it depend on the mix of debt and equity?',
  idea: 'Under perfect-market assumptions, the value of a firm is determined by the earning power of its assets, not by how it splits its financing. If it were otherwise, investors could exploit the difference by <b>arbitrage</b> (borrowing on their own, "homemade leverage") until values were equal.',
  method: 'Theory. They group firms into "equivalent return classes" with the same business risk and prove the propositions by arbitrage arguments, then compare them with the traditional view of a U-shaped cost of capital. They also include an empirical illustration for electric utilities and oil companies.',
  example: '<p>Suppose an investor prefers a levered company but only an unlevered one exists. She can borrow herself and buy the shares with extra borrowed money. Now suppose a levered company were worth <em>more</em> than an identical unlevered one. Investors could sell the levered shares, borrow on their own, and buy the unlevered ones, copying the levered payoff for less money. That trading pushes the two values together. So leverage by the firm cannot add value that investors could make themselves.</p><p>And Proposition II, with r<sub>0</sub> = 10%, r<sub>D</sub> = 5% and D/E = 1: cost of equity = 10% + (10% − 5%) × 1 = <b>15%</b>. The blend of half equity at 15% and half debt at 5% is 10%, the same as the unlevered firm.</p>',
  findings: '<b>Proposition I:</b> firm value is independent of leverage. <b>Proposition II:</b> the cost of equity rises linearly with the debt–equity ratio, exactly offsetting the cheaper debt. <b>Proposition III:</b> the cut-off rate for investment is the same regardless of how it is financed.',
  matters: 'The irrelevance result sets the benchmark: if capital structure matters, it must be because of some friction (taxes, bankruptcy costs, information problems), and that reframed the whole field. Modigliani won the Nobel Prize in 1985 and Miller in 1990.',
  critique: 'The 1958 paper leaves out corporate taxes; the 1963 correction shows that the interest tax shield gives debt a value advantage. Empirically, firms\' leverage varies systematically with profitability, asset type and size, which frictions-based theories (trade-off, pecking order) try to explain. The empirical section has been criticized on methodology.',
  lookFor: [
    'The arbitrage argument for Proposition I: what does the investor do in the "homemade leverage" case?',
    'Which assumptions define a perfect market?',
    'How the paper contrasts itself with the "traditional" view of the cost of capital.',
    'Which propositions concern financing and which concern investment.'
  ],
  quiz: [
    { k: 'calc', gen: () => { const r0 = pick([8, 10, 12]), rd = pick([4, 5, 6]), de = pick([0.5, 1, 1.5, 2]); const ans = r0 + (r0 - rd) * de; return N({ q: `An all-equity firm's cost of capital is ${r0}% and its debt costs ${rd}%. Using MM Proposition II (no taxes), what is the cost of equity at a debt-to-equity ratio of ${de}?`, ans, wrong: [r0, r0 + rd * de, r0 - (r0 - rd) * de], fmt: x => pct(x, 2), alt: () => { const e = 1, d = de; return (r0 * (e + d) - rd * d) / e; }, tol: 1e-9, fixed: true, why: `r_E = ${r0}% + (${r0}% − ${rd}%) × ${de} = ${round(ans, 2)}%. The blend of equity and debt returns to exactly ${r0}%, so financing did not change the firm's overall cost.` }); } },
    { k: 'concept', q: 'What mechanism enforces MM Proposition I?', o: ['Arbitrage by investors using homemade leverage', 'Government regulation', 'Accounting rules', 'Dividend policy'], a: 0, why: 'If two firms with equal assets had different values, investors would trade until they equalized.' },
    { k: 'concept', q: 'MM Proposition II says the cost of equity...', o: ['Rises with leverage', 'Is constant', 'Falls with leverage', 'Equals the cost of debt'], a: 0, why: 'Equity becomes riskier as debt increases.' },
    { k: 'concept', q: 'What friction did MM add in their 1963 correction?', o: ['Corporate taxes', 'Bankruptcy costs', 'Inflation', 'Currency risk'], a: 0, why: 'Interest tax-deductibility creates a tax shield that raises value.' },
    { k: 'concept', q: 'What does Proposition III say?', o: ['The cut-off rate for investment is the same regardless of how it is financed', 'Firms should never invest', 'Debt is always better', 'Dividends drive value'], a: 0, why: 'A firm should accept projects that earn at least the cost of capital, however they are financed.' },
    { k: 'concept', q: 'Why is an "irrelevance" result useful?', o: ['It shows that if financing matters, some friction must be responsible', 'It proves financing never matters', 'It is a tax rule', 'It is an accounting rule'], a: 0, why: 'It gives a benchmark: any deviation must come from taxes, bankruptcy costs or information problems.' },
    { k: 'apply', q: 'Firm A has no debt and Firm B has debt but identical assets. In a perfect market, what does MM say about their total values?', o: ['They are equal', 'B is worth more because debt is cheap', 'A is worth more', 'It depends on dividends'], a: 0, why: 'Value is set by the assets\' cash flows, not their financing.' },
    { k: 'apply', q: 'A manager argues, "Debt is cheaper than equity, so borrowing more must lower our overall cost of capital." What does MM (no taxes) say?', o: ['Cheaper debt makes equity riskier, and the effects offset', 'She is right', 'Debt is always dearer', 'Equity costs nothing'], a: 0, why: 'Proposition II shows the equity cost rises exactly enough to offset the cheap debt.' }
  ],
  related: ['capstruct', 'tvm']
},

{
  id: 'p-bs73', type: 'paper', title: 'The Pricing of Options and Corporate Liabilities', authors: 'Fischer Black and Myron Scholes', year: 1973, journal: 'Journal of Political Economy 81(3), 637–654',
  blurb: 'A formula for pricing options that launched modern derivatives markets.',
  level: 'Technical', min: 45, tags: ['derivatives', 'volatility'],
  plain: 'How much should an option cost? Black and Scholes noticed that you can build a portfolio of the stock and the option whose overall risk cancels out. A risk-free portfolio must earn the risk-free rate, and that single fact pins down the option\'s price. Surprisingly, the price does not depend on whether people expect the stock to rise or fall, only on how much it wobbles. The result launched modern derivatives markets.',
  los: [
    'Explain the hedging argument: why a stock-plus-option portfolio can be riskless.',
    'Say why the stock\'s expected return does not appear in the formula.',
    'List the five inputs and say which one cannot be observed directly.',
    'Describe the main limitations, including the volatility smile.'
  ],
  terms: [
    ['Option', 'a right, not an obligation, to buy or sell at a fixed price'],
    ['Hedge', 'a position that offsets another position\'s risk'],
    ['Riskless portfolio', 'a portfolio whose value does not change with small stock moves'],
    ['Volatility', 'how much the stock price bounces around'],
    ['Implied volatility', 'the volatility that makes the formula match a market price'],
    ['Delta', 'how much the option price changes per $1 change in the stock']
  ],
  question: 'What is the fair value of an option, and does it depend on investors\' beliefs about where the stock is headed?',
  idea: 'Combine a long position in the stock with a short position in the option, and adjust it continuously so the combination is <em>riskless</em>. A riskless portfolio must earn the risk-free rate. That condition pins down the option price and, remarkably, removes the stock\'s expected return and investors\' risk preferences from the answer.',
  method: 'Mathematical derivation under idealized assumptions: frictionless trading, constant volatility and interest rate, lognormally distributed stock prices, no dividends. They derive a partial differential equation and solve it with the option\'s payoff at expiry as the boundary condition. They also apply the idea to corporate securities: equity as a call option on the firm\'s assets. A short empirical section compares the formula with over-the-counter option prices.',
  example: '<p>Imagine a call option whose price moves about 55 cents for every $1 move in the stock (its "delta" is 0.55). If you own 55 shares for every 100 options you have sold, then when the stock rises $1, your shares gain $55 and your 100 short options lose about $55: the two cancel. As the stock moves, the delta changes, so you adjust the mix continuously. Because the position is (almost) riskless, it must earn the ordinary risk-free rate, which is what fixes the option\'s price. For a call with S = K = $100, r = 3%, σ = 25% and half a year to expiry, the result is about <b>$7.76</b>.</p>',
  findings: 'A closed-form formula for European calls that depends on five inputs: the stock price, the strike, time to expiry, the risk-free rate and volatility. Volatility is the only one that cannot be observed directly. Their data suggested option buyers systematically paid more than the formula predicted.',
  matters: 'The Chicago Board Options Exchange opened in April 1973, just before publication. The formula became the standard language for quoting options (in implied volatility) and the seed of quantitative finance. Robert Merton developed the theory in parallel, and Scholes and Merton received the 1997 Nobel Prize (Black died in 1995).',
  critique: 'Constant volatility fails in practice: implied volatility varies across strikes (the smile, more marked after the 1987 crash), and prices jump. Extensions include stochastic volatility (Heston, 1993). Transaction costs make continuous hedging impossible. Model risk can be severe: Long-Term Capital Management, which counted Scholes and Merton as partners, collapsed in 1998.',
  lookFor: [
    'The hedging argument: why is the resulting portfolio riskless, and what does that imply?',
    'Why the stock\'s expected return does not show up in the final formula.',
    'The assumptions list and which ones you would worry about most.',
    'The corporate liabilities application: equity as an option on the firm.'
  ],
  quiz: [
    { k: 'calc', gen: () => { const S = pick([80, 100, 120]), K = pick([90, 100, 110]), r = pick([2, 3, 4]) / 100, s = pick([0.2, 0.25, 0.3]), T = pick([0.5, 1]); const b = QL.bs(S, K, r, s, T); return N({ q: `Black–Scholes: S = $${S}, K = $${K}, r = ${r * 100}%, σ = ${s * 100}%, T = ${T} years. What is the value of the call?`, ans: b.call, wrong: [Math.max(S - K, 0) + 0.02, S * QL.N(b.d1), K * Math.exp(-r * T) * QL.N(b.d2)], fmt: x => usd(x, 2), alt: () => QL.binomCall(S, K, r, s, T, 700), tol: 0.04, fixed: true, why: `d₁ = ${round(b.d1, 3)}, d₂ = ${round(b.d2, 3)}; C = S·N(d₁) − K·e^(−rT)·N(d₂) = ${round(S * QL.N(b.d1), 2)} − ${round(K * Math.exp(-r * T) * QL.N(b.d2), 2)} = ${usd(b.call, 2)}. Note the stock's expected return is not an input.` }); } },
    { k: 'calc', gen: () => { const S = pick([90, 100, 110]), K = 100, r = 0.03, s = pick([0.2, 0.3]), T = 0.5; const b = QL.bs(S, K, r, s, T); const ans = QL.N(b.d1); return N({ q: `In a Black–Scholes call with d₁ = ${round(b.d1, 3)}, the hedge ratio (delta) is N(d₁). What is it?`, ans, wrong: [1 - ans, ans / 2, b.d1], fmt: x => num(x, 3), alt: () => { const h = 0.01; return (QL.bs(S + h, K, r, s, T).call - QL.bs(S - h, K, r, s, T).call) / (2 * h); }, tol: 2e-3, fixed: true, why: `Delta = N(d₁) = ${num(ans, 3)}: the call gains about $${num(ans, 2)} for each $1 rise in the stock. That is the number of shares in the hedge for each option.` }); } },
    { k: 'concept', q: 'Which input to Black–Scholes cannot be directly observed?', o: ['Volatility', 'Stock price', 'Strike price', 'Time to expiry'], a: 0, why: 'Volatility must be estimated or inferred from other option prices (implied volatility).' },
    { k: 'concept', q: 'Why does the stock\'s expected return not appear in the formula?', o: ['The option can be replicated by a hedge, so the price is fixed by no-arbitrage', 'It is always zero', 'It is unobservable', 'It is the same as the interest rate'], a: 0, why: 'A riskless hedged position must earn the risk-free rate regardless of expected return.' },
    { k: 'concept', q: 'What does the paper suggest about corporate securities?', o: ['Equity is like a call option on the firm\'s assets', 'Bonds are options on the stock price', 'Debt has no risk', 'Equity is a put on debt'], a: 0, why: 'Shareholders hold a claim on what is left above the debt owed, like a call struck at the debt.' },
    { k: 'concept', q: 'What is the volatility smile?', o: ['Implied volatility varies with the strike price, contradicting constant volatility', 'A chart of prices over time', 'An option strategy', 'A tax effect'], a: 0, why: 'The constant-volatility assumption fails: implied volatility differs across strikes.' },
    { k: 'apply', q: 'Two investors disagree strongly about whether a stock will rise. Both want to price a call. According to Black–Scholes, what do they need to agree on?', o: ['Volatility (and the other observable inputs), not the expected return', 'The expected return of the stock', 'The stock\'s future price', 'Nothing'], a: 0, why: 'The price is set by hedging (no-arbitrage), so beliefs about the stock\'s direction drop out.' },
    { k: 'apply', q: 'Long-Term Capital Management collapsed in 1998. What broader lesson is drawn?', o: ['Model risk can be severe: the assumptions may fail exactly when you need them', 'Options are illegal', 'Formulas are always right', 'Volatility is constant'], a: 0, why: 'The critique notes that reliance on the model\'s assumptions, such as smooth prices, can fail badly in a crisis.' }
  ],
  related: ['options', 'p-mm58']
},

{
  id: 'p-akerlof', type: 'paper', title: 'The Market for "Lemons": Quality Uncertainty and the Market Mechanism', authors: 'George A. Akerlof', year: 1970, journal: 'Quarterly Journal of Economics 84(3), 488–500',
  blurb: 'How hidden quality can make a market collapse, and what institutions arise to prevent it.',
  level: 'Accessible', min: 20, tags: ['asymmetric information', 'adverse selection'],
  plain: 'When you buy a used car, the seller knows more about it than you do. Because you cannot tell a good one from a bad one (a "lemon"), you will only pay an average price. But at an average price, owners of good cars refuse to sell, so the cars left for sale are worse than average, so buyers offer even less, and so on. The market can shrink dramatically or vanish, even though everyone would gain from trade.',
  los: [
    'Explain adverse selection using the used-car example.',
    'Work through the numerical example and see why the market collapses.',
    'Name institutions that counteract the problem and where the idea shows up in finance.'
  ],
  terms: [
    ['Asymmetric information', 'one side of a trade knows more than the other'],
    ['Adverse selection', 'the bad types are over-represented among those who trade'],
    ['Lemon', 'a bad-quality item (from used-car slang)'],
    ['Signal', 'something a seller does to credibly show quality, such as a warranty'],
    ['Unraveling', 'a market shrinking step by step until it collapses']
  ],
  question: 'What happens in a market where sellers know the quality of what they sell but buyers do not?',
  idea: 'If buyers cannot tell good from bad, they will pay only the <em>average</em> value. At that price, owners of good goods do not sell, so the average quality of what is offered falls, so buyers lower their offers further. This <b>adverse selection</b> spiral can shrink the market drastically or cause it to disappear entirely.',
  method: 'A simple theoretical model, built around used cars: "lemons" (bad cars) and good cars are indistinguishable to buyers. In the numerical example, car quality is spread evenly across a range, each seller will part with a car of quality <i>q</i> for any price of at least <i>q</i>, and every buyer values that car at 1.5 times <i>q</i>. So every car is worth more to a buyer than to its owner and trade should always be beneficial. Yet with hidden quality, no trade happens at any positive price. The rest of the paper applies the logic to other markets.',
  example: '<p>Follow the numbers. Suppose the price is $1,000. Only owners whose cars are worth $1,000 <em>or less</em> to them will sell, so the cars offered range from worthless up to $1,000, and their average value to owners is about $500. Buyers value a car at 1.5 times its quality, so an average car offered is worth 1.5 × $500 = $750 to a buyer, which is <em>less than</em> the $1,000 price. Buyers will not pay it. Try $800: the average car offered is worth $400 to its owner, or $600 to a buyer: still below the price. At any price p, the buyer\'s value of the average car offered is 0.75 × p, always below p. So no price works, and the market disappears.</p>',
  findings: 'With asymmetric information, trade that would benefit both parties may not occur. The bad drives out the good. Institutions such as warranties, brand names, licensing and chain stores can partly counteract the problem by signalling or guaranteeing quality. Applications include insurance for the elderly, discrimination in hiring and credit markets in developing countries.',
  matters: 'It founded the economics of information. Akerlof shared the 2001 Nobel Prize with Michael Spence and Joseph Stiglitz. Adverse selection is now central in finance: Myers and Majluf\'s pecking order (issuing equity signals a lemon), Stiglitz and Weiss\'s credit rationing (1981), and insurance markets.',
  critique: 'The extreme unraveling is a theoretical possibility rather than the norm, and real used-car markets function thanks to inspections, warranties and reputation. Some empirical tests, such as Bond (1982) on used pickup trucks, found little evidence of a lemons discount. That does not refute the model. It suggests the counteracting institutions Akerlof described are effective. Also, the core model is stark: no signaling and no repeated interaction (Akerlof discusses institutions that counteract the problem, but they are not part of the basic model).',
  lookFor: [
    'The numerical example: if the price is p, only cars with quality up to p are offered, so their average quality is p ÷ 2. Buyers value that at 1.5 × p ÷ 2 = 0.75p, which is less than p. Why does that make the market collapse?',
    'The section on "counteracting institutions": which ones do you see in financial markets?',
    'The non-car applications: credit markets and insurance.',
    'The paper was famously rejected by other journals before publication. Why might it have seemed too trivial or too strange?'
  ],
  quiz: [
    { k: 'calc', gen: () => { const p = pick([400, 600, 800, 1000, 1200]); const ans = 1.5 * (p / 2); return N({ q: `In Akerlof's example, quality is spread evenly from 0 upward and owners sell a car of quality q only if the price is at least q. At a price of ${usd(p, 0)}, what is a buyer's value (1.5 × quality) of the average car actually offered?`, ans, wrong: [1.5 * p, p / 2, 1.5 * p / 4], fmt: x => usd(x, 0), alt: () => { let sum = 0, cnt = 0; for (let q = 0; q <= p; q += 1) { sum += q; cnt++; } return 1.5 * (sum / cnt); }, tol: 1, fixed: true, why: `Only cars with quality up to ${usd(p, 0)} are offered, so their average quality is ${usd(p, 0)} ÷ 2 = ${usd(p / 2, 0)}. Buyers value that at 1.5 × ${usd(p / 2, 0)} = ${usd(ans, 0)}, which is less than the price ${usd(p, 0)}, so buyers will not pay it. That is the unraveling.` }); } },
    { k: 'concept', q: 'What is adverse selection in the used-car market?', o: ['At the average price, owners of good cars withhold them, so the cars offered are worse than average', 'Buyers choose bad cars on purpose', 'Sellers lie about mileage only', 'Prices rise with quality'], a: 0, why: 'The average price is too low for good cars, so they leave the market, lowering average quality.' },
    { k: 'concept', q: 'Which of these is a "counteracting institution" Akerlof mentions?', o: ['Warranties and brand names', 'Higher taxes', 'Secret pricing', 'Fewer buyers'], a: 0, why: 'Warranties, brand names, licensing and chain stores guarantee or signal quality.' },
    { k: 'concept', q: 'What information problem does the model rest on?', o: ['Sellers know quality but buyers do not (asymmetric information)', 'Nobody knows quality', 'Buyers know more than sellers', 'Quality is illegal to disclose'], a: 0, why: 'Hidden quality, known only to the seller, drives the result.' },
    { k: 'concept', q: 'Where does adverse selection reappear in finance?', o: ['Issuing equity signals that the shares may be overpriced (pecking order)', 'Setting interest rates', 'Computing depreciation', 'Choosing an index'], a: 0, why: 'Myers and Majluf: managers know more than investors, so issuing equity can be read as bad news.' },
    { k: 'concept', q: 'Why does real used-car trading exist despite the model?', o: ['Inspections, warranties and reputation reduce the information gap', 'Adverse selection is impossible', 'Cars are all identical', 'Buyers ignore quality'], a: 0, why: 'The counteracting institutions Akerlof described are effective.' },
    { k: 'apply', q: 'A company\'s shares fall when it announces a new share issue. Which idea from the paper helps explain this?', o: ['Investors fear managers issue shares when they think the stock is overpriced (a lemon)', 'Shares are illegal to issue', 'The market is closed', 'Interest rates rose'], a: 0, why: 'Buyers cannot tell good from bad issues and mark prices down, like buyers of a used car.' },
    { k: 'apply', q: 'A seller offers a long, no-questions-asked warranty on a used car. What does this do in Akerlof\'s framework?', o: ['Signals quality and helps the market function', 'Makes the car worthless', 'Raises adverse selection', 'Has no effect'], a: 0, why: 'A warranty is costly for a seller of a bad car, so it credibly signals a good one.' }
  ],
  related: ['capstruct', 'p-dd83']
},

{
  id: 'p-dd83', type: 'paper', title: 'Bank Runs, Deposit Insurance, and Liquidity', authors: 'Douglas W. Diamond and Philip H. Dybvig', year: 1983, journal: 'Journal of Political Economy 91(3), 401–419',
  blurb: 'A model showing that banks are useful, fragile, and fixable, all for the same reason.',
  level: 'Technical', min: 40, tags: ['banking', 'financial stability'],
  plain: 'Banks take deposits that you can withdraw any time and lend the money out for long periods. That is useful: you get access to your cash and the economy gets long-term investment. But it makes banks fragile. If you think everyone else will rush to withdraw, you will rush too, and the bank fails even though it was perfectly sound. The model also shows the fix: deposit insurance removes the reason to panic.',
  los: [
    'Explain why banks provide "liquidity insurance" and why that makes them useful.',
    'Explain how a bank run can be self-fulfilling even for a sound bank.',
    'Say how deposit insurance prevents runs, and what the model leaves out.'
  ],
  terms: [
    ['Liquidity', 'how quickly you can turn something into cash without losing value'],
    ['Demand deposit', 'money you can withdraw whenever you like'],
    ['Bank run', 'many depositors withdrawing at once because they fear others will'],
    ['Deposit insurance', 'a guarantee that depositors will be repaid'],
    ['Sequential service', 'first come, first served: the bank pays whoever arrives first until money runs out'],
    ['Equilibrium', 'a situation where nobody wants to change what they do, given what others do']
  ],
  question: 'Why do banks exist, why are they vulnerable to runs, and what can prevent runs?',
  idea: 'People are uncertain about when they will need cash. Productive investments take time and are costly to liquidate early. A bank provides <b>liquidity insurance</b>: it pools deposits, invests in long-term assets and lets depositors withdraw on demand. That contract improves welfare, but it creates two equilibria: in the good one only those who need money withdraw; in the bad one, everyone expects others to withdraw, so everyone runs, and the bank fails even if its assets are sound.',
  method: 'A three-period game-theoretic model with a large number of identical depositors who learn privately whether they need cash early. It compares an economy without banks, an optimal risk-sharing contract and the demand-deposit contract, then analyzes the equilibria under a first-come, first-served rule ("sequential service").',
  example: '<p>A tiny version. 100 depositors each put in $1, so the bank has $100 invested in a long-term project. Cashing out the project early only returns what was put in ($1 per $1). The bank promises early withdrawers a bit more than $1, say $1.25, because it expects only some of them to withdraw early. If it must pay $1.25 to each early withdrawer, then after 100 ÷ 1.25 = <b>80</b> depositors have been paid, the bank has no money left. Anyone at position 81 or later gets nothing. Knowing this, everyone wants to be in the first 80, so everyone runs at once. The run is a self-fulfilling prophecy, even though the project was sound.</p>',
  findings: 'The demand-deposit contract can deliver the optimal risk sharing, but it admits a self-fulfilling run equilibrium. <b>Deposit insurance</b>, or a policy such as suspending convertibility, can rule out the run equilibrium; if it works, it costs nothing in equilibrium because nobody runs.',
  matters: 'It is the reference model of financial fragility, applicable to bank runs, money market fund runs and modern versions such as runs on repo and on uninsured deposits (Northern Rock in 2007; Silicon Valley Bank in 2023). Diamond and Dybvig shared the 2022 Nobel Prize with Ben Bernanke.',
  critique: 'The model does not say when a run will happen (it relies on a "sunspot" coordinator). Fundamentals-based theories (Gorton, 1988) and global-games models (Goldstein and Pauzner, 2005) make runs depend on bank health. Deposit insurance introduces moral hazard, which the model does not capture. Real runs often combine panic with genuine solvency concerns.',
  lookFor: [
    'The table or figure comparing payoffs under the two equilibria.',
    'The role of the sequential service constraint (first come, first served) in generating runs.',
    'Why deposit insurance is <em>costless</em> in the model. Where would it cost something in reality?',
    'How the run equilibrium can occur even though the bank is fundamentally solvent.'
  ],
  quiz: [
    { k: 'calc', gen: () => { const r1 = pick([1.25, 2, 2.5, 4]); const ans = 100 / r1; return N({ q: `A bank has $100 of deposits (100 depositors at $1 each), invested so that early liquidation returns only $1 per $1. It promises $${r1} to anyone who withdraws early. How many early withdrawers can it pay in full before it runs out?`, ans, wrong: [100, 100 * r1, 100 / (r1 * r1)], fmt: x => num(x, 0) + ' depositors', alt: () => { let cash = 100, n = 0; while (cash >= r1 - 1e-9) { cash -= r1; n++; } return n; }, tol: 1e-9, fixed: true, why: `Each early withdrawal uses up $${r1} of assets: 100 ÷ ${r1} = ${num(ans, 0)} depositors. Everyone after them gets nothing, which is what makes it rational to run.` }); } },
    { k: 'concept', q: 'Why do banks exist, according to Diamond and Dybvig?', o: ['To provide liquidity insurance by pooling deposits and investing long-term', 'To print money', 'To avoid taxes', 'To set interest rates'], a: 0, why: 'They let depositors withdraw on demand while the bank invests in long-term projects.' },
    { k: 'concept', q: 'What makes a bank run self-fulfilling?', o: ['Each depositor runs because they expect others to', 'The bank is insolvent', 'Interest rates rise', 'The bank has no assets'], a: 0, why: 'If you expect others to withdraw, withdrawing early is the best response, even for a sound bank.' },
    { k: 'concept', q: 'How can deposit insurance prevent runs?', o: ['It removes the reason to run, since depositors are repaid anyway', 'It stops withdrawals forever', 'It raises interest rates', 'It closes the bank'], a: 0, why: 'If everyone is sure to be repaid, nobody has a reason to rush.' },
    { k: 'concept', q: 'What important effect does the model not capture?', o: ['Moral hazard from deposit insurance', 'Liquidity', 'Time', 'Deposits'], a: 0, why: 'Insurance can encourage banks to take more risk; the model leaves this out.' },
    { k: 'concept', q: 'What does the "sequential service" rule mean?', o: ['First come, first served: the bank pays whoever arrives first until the money runs out', 'Everyone is paid equally', 'Depositors queue by size', 'The bank pays after a month'], a: 0, why: 'It creates the incentive to be first in line, generating runs.' },
    { k: 'apply', q: 'A sound bank suddenly faces long queues after a rumor. Which idea from the paper explains it?', o: ['A bad equilibrium: depositors run because they fear others will', 'The bank\'s loans all failed', 'Interest rates are too low', 'Deposits are illegal'], a: 0, why: 'Runs can be driven by expectations, not by the bank\'s fundamental health.' },
    { k: 'apply', q: 'The 2023 failure of Silicon Valley Bank was a modern example of which model?', o: ['A run on uninsured deposits', 'A stock split', 'Options pricing', 'Portfolio optimization'], a: 0, why: 'The paper\'s framework applies to runs on uninsured deposits, such as SVB in 2023.' }
  ],
  related: ['rates', 'p-akerlof']
}

  );
})();
