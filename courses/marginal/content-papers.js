/* Landmark paper breakdowns. Summaries are written in our own words; always read the original. */
window.LESSONS = window.LESSONS || [];
window.LESSONS.push(

{
  id: 'p-markowitz', type: 'paper', title: 'Portfolio Selection',
  authors: 'Harry Markowitz', year: 1952, journal: 'Journal of Finance 7(1), 77–91',
  blurb: 'The paper that turned diversification from folk wisdom into mathematics.',
  level: 'Accessible', min: 20, tags: ['portfolio theory', 'diversification'],
  question: 'How should an investor choose among risky securities when returns are uncertain? The dominant view at the time held that you should simply maximize the discounted expected return, which would mean putting everything into the single highest-yielding asset. Yet nobody actually invests that way.',
  idea: 'Investors care about both <b>expected return</b> and <b>variance</b>. Because security returns are correlated, a portfolio\'s risk depends on how securities move <em>together</em> (covariances), not just on each one\'s own risk. Diversification works, but there is a limit: it cannot remove risk that is common to all assets. For each level of risk there is a portfolio with maximum expected return, and the set of these is the <b>efficient frontier</b>.',
  method: 'Mostly theoretical and geometric. Markowitz works through small examples with three and four securities, plotting the feasible portfolios and showing how the efficient set is traced out. There is no big dataset. He explicitly leaves the estimation of inputs to statistics and judgment and focuses on what an investor should do <em>given</em> those beliefs.',
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
    { q: 'What did Markowitz argue was wrong with simply maximizing expected return?',
      o: ['It ignores taxes', 'It implies holding a single asset, ignoring risk and diversification', 'It requires derivatives', 'It only works for bonds'], a: 1, why: 'If only expected return mattered, the highest-return asset would always win. Real investors diversify because risk matters.' },
    { q: 'A portfolio\'s risk depends primarily on...',
      o: ['Each asset\'s own return only', 'Each asset\'s risk and how the assets co-move', 'The number of trades', 'The risk-free rate only'], a: 1, why: 'Covariances between assets matter for portfolio variance.' },
    { q: 'What is a known practical problem with mean–variance optimization?',
      o: ['It ignores expected returns', 'It is very sensitive to errors in estimated inputs', 'It cannot handle two assets', 'It requires negative returns'], a: 1, why: 'Small errors in estimated expected returns can produce extreme, unstable portfolios.' }
  ],
  related: ['risk', 'p-sharpe']
},

{
  id: 'p-sharpe', type: 'paper', title: 'Capital Asset Prices: A Theory of Market Equilibrium under Conditions of Risk',
  authors: 'William F. Sharpe', year: 1964, journal: 'Journal of Finance 19(3), 425–442',
  blurb: 'If everyone behaves like a Markowitz investor, what does that imply for asset prices?',
  level: 'Moderate', min: 25, tags: ['CAPM', 'equilibrium'],
  question: 'Markowitz described what one investor should do. Sharpe asks the next question: if <em>all</em> investors behave that way, what determines the price of risk in the market, and how should an individual asset\'s expected return relate to its risk?',
  idea: 'Assume investors share the same beliefs and can borrow and lend freely at a risk-free rate. Then they all hold the same portfolio of risky assets (the market portfolio), differing only in how much they lever or de-lever it. In equilibrium, an asset\'s expected return rises linearly with its <b>beta</b>, its sensitivity to the overall market. Risk unrelated to the market is not rewarded.',
  method: 'A theoretical equilibrium model. Sharpe lays out explicit assumptions (single period, mean–variance investors, common expectations, one risk-free rate for lending and borrowing) and derives the market-wide relationship. Lintner (1965) and Mossin (1966) reached the same result independently; Treynor had an unpublished version earlier.',
  findings: 'The capital market line shows the trade-off for efficient portfolios, and the relationship for individual assets, later called the security market line, ties expected return to beta. Sharpe frames it as two prices: the <em>price of time</em> (the risk-free rate) and the <em>price of risk</em> (the extra return per unit of market exposure).',
  matters: 'CAPM became the default model for the cost of equity, for evaluating fund managers, and for the language of "beta" and "alpha". Sharpe shared the 1990 Nobel Prize with Markowitz and Miller.',
  critique: 'Roll (1977) argued the theory can\'t be truly tested because the market portfolio includes all assets and isn\'t observable. Empirically, early tests (Black, Jensen and Scholes, 1972) found a flatter line than predicted, and Fama and French (1992) found beta didn\'t explain average returns across stocks. The assumptions (common beliefs, unlimited borrowing at the risk-free rate) are strong, and Black (1972) developed a version without risk-free borrowing.',
  lookFor: [
    'The list of assumptions: which one would you relax first, and what would change?',
    'The distinction between the price of time and the price of risk.',
    'How the argument moves from the efficient portfolio to individual assets.',
    'What "risk" means for a single asset here, and why its own variance is not enough.'
  ],
  quiz: [
    { q: 'In Sharpe\'s equilibrium, why is an asset\'s own standalone variance not what determines its expected return?',
      o: ['Variance cannot be measured', 'Investors hold diversified portfolios, so only the market-related part of risk is priced', 'Prices are set by regulators', 'Variance is always constant'], a: 1, why: 'Idiosyncratic risk is diversified away, leaving beta as the relevant risk.' },
    { q: 'Sharpe describes the market as setting two prices. Which?',
      o: ['Price of labor and capital', 'Price of time and price of risk', 'Price of stocks and bonds', 'Price of inflation and growth'], a: 1, why: 'Risk-free rate is the price of time; the market risk premium per unit of beta is the price of risk.' },
    { q: 'What is Roll\'s critique of CAPM?',
      o: ['Beta is always 1', 'The true market portfolio is unobservable, so the model can\'t be properly tested', 'Investors are too rational', 'Interest rates are constant'], a: 1, why: 'Testing CAPM requires the true market portfolio, which includes every asset.' }
  ],
  related: ['capm', 'p-markowitz', 'p-ff93']
},

{
  id: 'p-fama70', type: 'paper', title: 'Efficient Capital Markets: A Review of Theory and Empirical Work',
  authors: 'Eugene F. Fama', year: 1970, journal: 'Journal of Finance 25(2), 383–417',
  blurb: 'The paper that defined market efficiency and organized decades of tests around it.',
  level: 'Accessible', min: 30, tags: ['efficiency', 'event studies'],
  question: 'Do security prices fully reflect all available information, and how would we know?',
  idea: 'Define an efficient market as one where prices "fully reflect" an information set. Then classify the tests by the information set used: <b>weak</b> (past prices), <b>semi-strong</b> (all public information) and <b>strong</b> (all information, including private). Efficiency is framed as a "fair game": after accounting for the equilibrium expected return, what\'s left is unpredictable.',
  method: 'A literature review. Fama organizes the evidence up to 1969: statistical tests of return predictability (serial correlation, runs tests, trading-rule "filters"), event studies of how quickly prices react to announcements such as stock splits and earnings, and studies of whether insiders or mutual fund managers earn abnormal returns.',
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
    { q: 'Fama classifies efficiency tests by...',
      o: ['The country tested', 'The information set used', 'The asset class', 'The trading venue'], a: 1, why: 'Weak, semi-strong and strong forms differ by which information is assumed to be in prices.' },
    { q: 'Event studies of stock splits and announcements mainly test which form?',
      o: ['Weak form', 'Semi-strong form', 'Strong form', 'None'], a: 1, why: 'They test how quickly prices adjust to public information.' },
    { q: 'What limitation does Fama acknowledge in testing efficiency?',
      o: ['No data exist', 'Tests are joint tests of efficiency and an asset-pricing model', 'Markets are closed', 'Prices are constant'], a: 1, why: 'You need a model of expected returns to define an "abnormal" return.' }
  ],
  related: ['emh', 'p-shiller']
},

{
  id: 'p-shiller', type: 'paper', title: 'Do Stock Prices Move Too Much to be Justified by Subsequent Changes in Dividends?',
  authors: 'Robert J. Shiller', year: 1981, journal: 'American Economic Review 71(3), 421–436',
  blurb: 'A simple variance comparison that launched the excess-volatility debate.',
  level: 'Moderate', min: 30, tags: ['volatility', 'valuation'],
  question: 'If stock prices reflect rational expectations of future dividends, they should be no more volatile than the dividends warrant. Are they?',
  idea: 'In an efficient market, the price today is the best forecast of the "perfect-foresight" price p*: the present value of the dividends that actually get paid afterwards. A forecast must be less variable than the thing it forecasts, because forecast errors add variance. So, if prices are rational forecasts, <b>Var(p) ≤ Var(p*)</b>.',
  method: 'Shiller constructs p* for the S&P Composite index (from 1871) and the Dow Jones Industrial Average (from 1928) using actual subsequent dividends, a constant discount rate and an assumption about the terminal value. Both series are detrended, and he compares the variance of actual prices to the variance of p*.',
  findings: 'Actual prices are far more volatile than the p* series: the variance bound is violated, and by a large margin. The ex-post rational price is smooth, while actual prices swing widely around it. Shiller\'s conclusion is that changes in dividends can\'t plausibly account for the size of price movements.',
  matters: 'Kicked off the "excess volatility" literature and provided a key motivation for behavioral finance. It also pushed researchers to consider <em>time-varying expected returns</em> (Campbell–Shiller, Cochrane) as an explanation. Shiller shared the 2013 Nobel with Fama and Hansen.',
  critique: 'Kleidon (1986) and Marsh and Merton (1986) challenged the statistics: dividends and prices aren\'t stationary around a deterministic trend, so the variance comparison may be biased; Flavin (1983) documented small-sample problems in variance-bound tests. The most important reply is conceptual: with <em>time-varying discount rates</em>, high price volatility can be consistent with rationality, which raises the joint-hypothesis problem again.',
  lookFor: [
    'The famous chart comparing the actual price with p*. What does the difference look like?',
    'The step where forecast error is shown to be uncorrelated with the forecast, which gives the variance inequality.',
    'How p* is constructed and how sensitive it is to the terminal-value assumption.',
    'Which assumptions (constant discount rate, stationarity) later critics targeted.'
  ],
  quiz: [
    { q: 'Why must the variance of a rational forecast (price) not exceed that of the outcome (p*)?',
      o: ['Forecasts are always correct', 'Forecast errors add variance to the outcome and are unrelated to the forecast', 'Dividends are constant', 'Prices are set by the Fed'], a: 1, why: 'p* = p + error, with error uncorrelated with p, so Var(p*) = Var(p) + Var(error).' },
    { q: 'What did Shiller find?',
      o: ['Prices are less volatile than p*', 'Prices are far more volatile than p*', 'Prices equal p*', 'Dividends fluctuate more than prices'], a: 1, why: 'The variance bound was violated by a wide margin.' },
    { q: 'What is a rational-markets reply to Shiller\'s result?',
      o: ['Investors ignore dividends', 'Discount rates vary over time', 'There were no dividends', 'Prices are fixed'], a: 1, why: 'If required returns change, prices can move a lot without any change in dividends.' }
  ],
  related: ['emh', 'tvm', 'p-fama70']
},

{
  id: 'p-ff93', type: 'paper', title: 'Common Risk Factors in the Returns on Stocks and Bonds',
  authors: 'Eugene F. Fama and Kenneth R. French', year: 1993, journal: 'Journal of Financial Economics 33(1), 3–56',
  blurb: 'Adds size and value to the market factor, and reshapes how returns are explained.',
  level: 'Technical', min: 40, tags: ['factors', 'asset pricing'],
  question: 'Which common risk factors explain the differences in average returns across stocks and bonds?',
  idea: 'Market beta alone isn\'t enough. Two more factors capture a lot of the common variation in returns: <b>size</b> (small stocks vs big) and <b>value</b> (high book-to-market stocks vs low). For bonds, term (maturity) and default risk matter. If these factors are priced risks, a portfolio\'s exposure to them should explain its average return.',
  method: 'Using U.S. stock data from July 1963 to December 1991, they sort stocks into portfolios by size and book-to-market and build factor-mimicking portfolios: <b>SMB</b> (small minus big) and <b>HML</b> (high minus low book-to-market). They then run time-series regressions of the returns of 25 test portfolios on the market, SMB and HML, and look at how large the leftover intercepts (alphas) are. Bond factors, TERM and DEF, are added for bond and stock–bond tests.',
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
    { q: 'What do SMB and HML stand for?',
      o: ['Size and momentum', 'Small-minus-big and high-minus-low (book-to-market)', 'Stock market bonds', 'Systematic market beta'], a: 1, why: 'SMB captures the size effect; HML the value effect.' },
    { q: 'What is the main empirical claim of the paper?',
      o: ['Beta alone explains returns', 'Size and value factors add substantial explanatory power beyond market beta', 'Bonds don\'t matter', 'Returns are random'], a: 1, why: 'The three-factor model explains most cross-sectional variation in the test portfolios.' },
    { q: 'What is a key alternative interpretation of the value premium?',
      o: ['It is a mispricing rather than compensation for risk', 'It is a tax', 'It is inflation', 'It is an accounting rule'], a: 0, why: 'Behavioral critics argue that investors overextrapolate the past, mispricing value and growth stocks.' }
  ],
  related: ['capm', 'p-sharpe', 'emh']
},

{
  id: 'p-kt79', type: 'paper', title: 'Prospect Theory: An Analysis of Decision under Risk',
  authors: 'Daniel Kahneman and Amos Tversky', year: 1979, journal: 'Econometrica 47(2), 263–291',
  blurb: 'The descriptive theory of choice that became the foundation of behavioral economics.',
  level: 'Accessible', min: 30, tags: ['behavioral', 'decision theory'],
  question: 'Expected utility theory says how rational people <em>should</em> choose under risk. How do people actually choose, and where do they systematically deviate?',
  idea: 'People evaluate outcomes as <b>gains and losses relative to a reference point</b> rather than final wealth. The value function is concave for gains, convex for losses and steeper for losses (<b>loss aversion</b>). Probabilities are replaced by <b>decision weights</b> that overweight small probabilities and underweight moderate and high ones.',
  method: 'Questionnaires with short hypothetical choice problems given to university students and faculty. Each problem is designed so the modal answer violates expected utility, isolating patterns such as the certainty effect and the reflection effect.',
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
    { q: 'What is the "reflection effect"?',
      o: ['People are risk averse for gains and risk seeking for losses', 'People always gamble', 'People reflect on past choices', 'Preferences are random'], a: 0, why: 'The pattern of risk attitudes flips when moving from gains to losses.' },
    { q: 'What is the certainty effect?',
      o: ['People overweight outcomes that are certain relative to merely probable', 'People prefer more information', 'People avoid all risk', 'People are always certain'], a: 0, why: 'A sure gain is preferred even when a gamble has a higher expected value.' },
    { q: 'Prospect theory is best described as...',
      o: ['A normative theory of what people should do', 'A descriptive theory of what people actually do', 'A theory of bond pricing', 'A theory of inflation'], a: 1, why: 'It aims to describe observed choice behavior.' }
  ],
  related: ['behav', 'emh']
},

{
  id: 'p-mm58', type: 'paper', title: 'The Cost of Capital, Corporation Finance and the Theory of Investment',
  authors: 'Franco Modigliani and Merton H. Miller', year: 1958, journal: 'American Economic Review 48(3), 261–297',
  blurb: 'Why the way a firm finances itself doesn\'t matter in a perfect market, and why that\'s useful.',
  level: 'Moderate', min: 35, tags: ['capital structure', 'corporate finance'],
  question: 'What is the cost of capital to a firm, and how does it depend on the mix of debt and equity?',
  idea: 'Under perfect-market assumptions, the value of a firm is determined by the earning power of its assets, not by how it splits its financing. If it were otherwise, investors could exploit the difference by <b>arbitrage</b> (borrowing on their own, "homemade leverage") until values were equal.',
  method: 'Theory. They group firms into "equivalent return classes" with the same business risk and prove the propositions by arbitrage arguments, then compare them with the traditional view of a U-shaped cost of capital. They also include an empirical illustration for electric utilities and oil companies.',
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
    { q: 'What mechanism enforces MM Proposition I?',
      o: ['Government regulation', 'Arbitrage by investors using homemade leverage', 'Accounting rules', 'Dividend policy'], a: 1, why: 'If two firms with equal assets had different values, investors would trade until they equalized.' },
    { q: 'MM Proposition II says the cost of equity...',
      o: ['Is constant', 'Rises with leverage', 'Falls with leverage', 'Equals the cost of debt'], a: 1, why: 'Equity becomes riskier as debt increases.' },
    { q: 'What friction did MM add in their 1963 correction?',
      o: ['Bankruptcy costs', 'Corporate taxes', 'Inflation', 'Currency risk'], a: 1, why: 'Interest tax-deductibility creates a tax shield that raises value.' }
  ],
  related: ['capstruct', 'tvm']
},

{
  id: 'p-bs73', type: 'paper', title: 'The Pricing of Options and Corporate Liabilities',
  authors: 'Fischer Black and Myron Scholes', year: 1973, journal: 'Journal of Political Economy 81(3), 637–654',
  blurb: 'A formula for pricing options that launched modern derivatives markets.',
  level: 'Technical', min: 45, tags: ['derivatives', 'volatility'],
  question: 'What is the fair value of an option, and does it depend on investors\' beliefs about where the stock is headed?',
  idea: 'Combine a long position in the stock with a short position in the option, and adjust it continuously so the combination is <em>riskless</em>. A riskless portfolio must earn the risk-free rate. That condition pins down the option price and, remarkably, removes the stock\'s expected return and investors\' risk preferences from the answer.',
  method: 'Mathematical derivation under idealized assumptions: frictionless trading, constant volatility and interest rate, lognormally distributed stock prices, no dividends. They derive a partial differential equation and solve it with the option\'s payoff at expiry as the boundary condition. They also apply the idea to corporate securities: equity as a call option on the firm\'s assets. A short empirical section compares the formula with over-the-counter option prices.',
  findings: 'A closed-form formula for European calls that depends on five inputs: the stock price, the strike, time to expiry, the risk-free rate and volatility. Volatility is the only one that can\'t be observed directly. Their data suggested option buyers systematically paid more than the formula predicted.',
  matters: 'The Chicago Board Options Exchange opened in April 1973, just before publication. The formula became the standard language for quoting options (in implied volatility) and the seed of quantitative finance. Robert Merton developed the theory in parallel, and Scholes and Merton received the 1997 Nobel Prize (Black died in 1995).',
  critique: 'Constant volatility fails in practice: implied volatility varies across strikes (the smile, more marked after the 1987 crash), and prices jump. Extensions include stochastic volatility (Heston, 1993). Transaction costs make continuous hedging impossible. Model risk can be severe: Long-Term Capital Management, which counted Scholes and Merton as partners, collapsed in 1998.',
  lookFor: [
    'The hedging argument: why is the resulting portfolio riskless, and what does that imply?',
    'Why the stock\'s expected return doesn\'t show up in the final formula.',
    'The assumptions list and which ones you\'d worry about most.',
    'The corporate liabilities application: equity as an option on the firm.'
  ],
  quiz: [
    { q: 'Which input to Black–Scholes can\'t be directly observed?',
      o: ['Stock price', 'Strike price', 'Volatility', 'Time to expiry'], a: 2, why: 'Volatility must be estimated or inferred from other option prices (implied volatility).' },
    { q: 'Why doesn\'t the stock\'s expected return appear in the formula?',
      o: ['It is always zero', 'The option can be replicated by a hedge, so the price is fixed by no-arbitrage', 'It is unobservable', 'It is the same as the interest rate'], a: 1, why: 'A riskless hedged position must earn the risk-free rate regardless of expected return.' },
    { q: 'What does the paper suggest about corporate securities?',
      o: ['Equity is like a call option on the firm\'s assets', 'Bonds are options on cash', 'Firms are riskless', 'Dividends are options'], a: 0, why: 'Shareholders hold a claim that pays only if firm value exceeds the debt.' }
  ],
  related: ['options', 'p-mm58']
},

{
  id: 'p-akerlof', type: 'paper', title: 'The Market for "Lemons": Quality Uncertainty and the Market Mechanism',
  authors: 'George A. Akerlof', year: 1970, journal: 'Quarterly Journal of Economics 84(3), 488–500',
  blurb: 'How hidden quality can make a market collapse, and what institutions arise to prevent it.',
  level: 'Accessible', min: 20, tags: ['asymmetric information', 'adverse selection'],
  question: 'What happens in a market where sellers know the quality of what they sell but buyers don\'t?',
  idea: 'If buyers can\'t tell good from bad, they will pay only the <em>average</em> value. At that price, owners of good goods don\'t sell, so the average quality of what is offered falls, so buyers lower their offers further. This <b>adverse selection</b> spiral can shrink the market drastically or cause it to disappear entirely.',
  method: 'A simple theoretical model, built around used cars: "lemons" (bad cars) and good cars are indistinguishable to buyers. In the numerical example, car quality is spread evenly across a range, each seller will part with a car of quality <i>q</i> for any price of at least <i>q</i>, and every buyer values that car at 1.5 times <i>q</i>. So every car is worth more to a buyer than to its owner and trade should always be beneficial. Yet with hidden quality, no trade happens at any positive price. The rest of the paper applies the logic to other markets.',
  findings: 'With asymmetric information, trade that would benefit both parties may not occur. The bad drives out the good. Institutions such as warranties, brand names, licensing and chain stores can partly counteract the problem by signalling or guaranteeing quality. Applications include insurance for the elderly, discrimination in hiring and credit markets in developing countries.',
  matters: 'It founded the economics of information. Akerlof shared the 2001 Nobel Prize with Michael Spence and Joseph Stiglitz. Adverse selection is now central in finance: Myers and Majluf\'s pecking order (issuing equity signals a lemon), Stiglitz and Weiss\'s credit rationing (1981), and insurance markets.',
  critique: 'The extreme unraveling is a theoretical possibility rather than the norm, and real used-car markets function thanks to inspections, warranties and reputation. Some empirical tests, such as Bond (1982) on used pickup trucks, found little evidence of a lemons discount. That doesn\'t refute the model. It suggests the counteracting institutions Akerlof described are effective. Also, the core model is stark: no signaling and no repeated interaction (Akerlof discusses institutions that counteract the problem, but they aren\'t part of the basic model).',
  lookFor: [
    'The numerical example: if the price is p, only cars with quality up to p are offered, so their average quality is p ÷ 2. Buyers value that at 1.5 × p ÷ 2 = 0.75p, which is less than p. Why does that make the market collapse?',
    'The section on "counteracting institutions": which ones do you see in financial markets?',
    'The non-car applications: credit markets and insurance.',
    'The paper was famously rejected by other journals before publication. Why might it have seemed too trivial or too strange?'
  ],
  quiz: [
    { q: 'What is adverse selection?',
      o: ['Choosing the worst asset by mistake', 'Hidden quality causes bad types to be over-represented among those who trade', 'Selling too cheaply', 'A tax rule'], a: 1, why: 'At the average price, good sellers exit and bad ones stay.' },
    { q: 'Which is an institution that counteracts the lemons problem?',
      o: ['Warranties', 'Higher taxes', 'Inflation', 'Random pricing'], a: 0, why: 'Warranties and brands credibly signal quality.' },
    { q: 'Which finance idea is closely related to Akerlof\'s logic?',
      o: ['Equity issuance signalling bad news (pecking order)', 'Put–call parity', 'The Fisher equation', 'Rule of 72'], a: 0, why: 'If managers know more than investors, issuing equity can signal an overvalued firm.' }
  ],
  related: ['capstruct', 'p-dd83']
},

{
  id: 'p-dd83', type: 'paper', title: 'Bank Runs, Deposit Insurance, and Liquidity',
  authors: 'Douglas W. Diamond and Philip H. Dybvig', year: 1983, journal: 'Journal of Political Economy 91(3), 401–419',
  blurb: 'A model showing that banks are useful, fragile, and fixable, all for the same reason.',
  level: 'Technical', min: 40, tags: ['banking', 'financial stability'],
  question: 'Why do banks exist, why are they vulnerable to runs, and what can prevent runs?',
  idea: 'People are uncertain about when they will need cash. Productive investments take time and are costly to liquidate early. A bank provides <b>liquidity insurance</b>: it pools deposits, invests in long-term assets and lets depositors withdraw on demand. That contract improves welfare, but it creates two equilibria: in the good one only those who need money withdraw; in the bad one, everyone expects others to withdraw, so everyone runs, and the bank fails even if its assets are sound.',
  method: 'A three-period game-theoretic model with a large number of identical depositors who learn privately whether they need cash early. It compares an economy without banks, an optimal risk-sharing contract and the demand-deposit contract, then analyzes the equilibria under a first-come, first-served rule ("sequential service").',
  findings: 'The demand-deposit contract can deliver the optimal risk sharing, but it admits a self-fulfilling run equilibrium. <b>Deposit insurance</b>, or a policy such as suspending convertibility, can rule out the run equilibrium; if it works, it costs nothing in equilibrium because nobody runs.',
  matters: 'It is the reference model of financial fragility, applicable to bank runs, money market fund runs and modern versions such as runs on repo and on uninsured deposits (Northern Rock in 2007; Silicon Valley Bank in 2023). Diamond and Dybvig shared the 2022 Nobel Prize with Ben Bernanke.',
  critique: 'The model doesn\'t say when a run will happen (it relies on a "sunspot" coordinator). Fundamentals-based theories (Gorton, 1988) and global-games models (Goldstein and Pauzner, 2005) make runs depend on bank health. Deposit insurance introduces moral hazard, which the model doesn\'t capture. Real runs often combine panic with genuine solvency concerns.',
  lookFor: [
    'The table or figure comparing payoffs under the two equilibria.',
    'The role of the sequential service constraint (first come, first served) in generating runs.',
    'Why deposit insurance is <em>costless</em> in the model. Where would it cost something in reality?',
    'How the run equilibrium can occur even though the bank is fundamentally solvent.'
  ],
  quiz: [
    { q: 'What service does a bank provide in the Diamond–Dybvig model?',
      o: ['Credit scoring', 'Liquidity insurance', 'Currency exchange', 'Tax planning'], a: 1, why: 'It turns illiquid investments into liquid deposits, insuring depositors against needing cash early.' },
    { q: 'Why can a run happen even if the bank\'s assets are sound?',
      o: ['Regulators force it', 'It is a self-fulfilling equilibrium: if you expect others to run, running is your best response', 'Assets are worthless', 'Deposits are illegal'], a: 1, why: 'With sequential service, the last in line may get nothing.' },
    { q: 'What can eliminate the bad equilibrium in the model?',
      o: ['Higher interest rates', 'Deposit insurance', 'Fewer depositors', 'Short-term bonds'], a: 1, why: 'A credible guarantee removes the reason to run.' }
  ],
  related: ['rates', 'p-akerlof']
}

);
