/* Paper breakdowns: portfolio management and financial statement analysis. Own-words summaries; read the originals. */
window.LESSONS = window.LESSONS || [];
window.LESSONS.push(

{
  id: 'p-jensen68', type: 'paper', title: 'The Performance of Mutual Funds in the Period 1945–1964',
  authors: 'Michael C. Jensen', year: 1968, journal: 'Journal of Finance 23(2), 389–416',
  blurb: 'The first rigorous test of whether fund managers beat the market after adjusting for risk. It introduced "Jensen\'s alpha".',
  level: 'Moderate', min: 30, tags: ['mutual funds', 'alpha', 'performance'],
  question: 'Can mutual fund managers forecast security prices well enough to earn returns above what their risk exposure alone would predict?',
  idea: 'Raw returns can\'t answer this because a fund may simply have taken more market risk. Jensen uses the CAPM framework to compute, for each fund, the return that its beta predicts, and defines the fund\'s <b>alpha</b> as the difference: the intercept from regressing the fund\'s excess returns on the market\'s excess returns.',
  method: 'A sample of 115 open-end mutual funds over 1945–1964. For each fund he regresses excess returns on market excess returns and estimates the intercept (alpha) and its statistical significance. He does this both net of expenses (what investors received) and gross of expenses (adding back what the fund spent), to separate forecasting ability from costs.',
  findings: 'On average, funds had <b>negative alpha</b> after expenses (on the order of a percentage point a year), and even before expenses there was no evidence of average outperformance. Only a small number of individual funds showed significantly positive alpha, about as many as chance alone would produce. There was little evidence that any individual fund had unusual skill.',
  matters: 'Jensen\'s alpha became the standard risk-adjusted performance measure, and the paper set the template for decades of studies of managers. It is often cited as early support for the view that beating the market is hard.',
  critique: 'The result depends on the benchmark: Roll (1978) argued that any single-index CAPM performance test is sensitive to the choice of market proxy. Later multi-factor tests (Carhart, 1997) reinterpret alpha after controlling for size, value and momentum. The sample covers one era and excludes funds that had already disappeared (survivorship considerations came to matter greatly in later work). Using net-of-expense returns judges investor experience, not manager skill.',
  lookFor: [
    'How alpha is defined and estimated, and which regression it comes from.',
    'The distribution of estimated alphas across funds. Is it centered near zero, or below?',
    'The difference between the gross-of-expenses and net-of-expenses results.',
    'What the author says about turnover and fund size, and whether they matter.'
  ],
  quiz: [
    { q: 'How does Jensen define a fund\'s alpha?',
      o: ['Raw return minus the market return', 'The intercept from regressing fund excess returns on market excess returns', 'The fund\'s beta', 'Return divided by volatility'], a: 1, why: 'Alpha is the return unexplained by the fund\'s market exposure.' },
    { q: 'What did Jensen find on average across funds?',
      o: ['Large positive alpha', 'Slightly negative alpha after expenses', 'Alpha exactly equal to fees', 'Positive alpha before expenses only'], a: 1, why: 'Average alpha was negative net of expenses, with no evidence of skill even gross.' },
    { q: 'Why might a single-index alpha be misleading?',
      o: ['Because market proxies can be wrong or omit other risk factors', 'Because alpha is always zero', 'Because funds are too small', 'Because beta is constant'], a: 0, why: 'Alpha is measured relative to a model and a benchmark; changing either changes the result.' }
  ],
  related: ['pm-perf', 'pm-fees', 'capm']
},

{
  id: 'p-sharpe91', type: 'paper', title: 'The Arithmetic of Active Management',
  authors: 'William F. Sharpe', year: 1991, journal: 'Financial Analysts Journal 47(1), 7–9',
  blurb: 'A three-page argument that, before looking at any data, the average active dollar must underperform the average passive dollar after costs.',
  level: 'Accessible', min: 10, tags: ['active management', 'costs'],
  question: 'Can active management, as a group, outperform passive management?',
  idea: 'Divide all investors in a market into two groups: <b>passive</b> investors, who hold every security in proportion to its market weight, and <b>active</b> investors, who hold everything else. In aggregate, all investors must hold the whole market. So if the passive group holds the market portfolio, the active group\'s combined holdings must <em>also</em> be the market portfolio, and hence they earn the same <em>gross</em> return before costs. Active management costs more, so after costs it must earn less.',
  method: 'Pure logic and arithmetic. There is no data, model or regression. The argument rests on a simple accounting identity plus the observation that active investors incur research and trading costs while passive investors incur very little.',
  findings: 'Before costs, the return on the average actively managed dollar equals the return on the average passively managed dollar. After costs, it is lower by the additional costs of being active. This holds in <em>any</em> period, for <em>any</em> market. Any active manager who beats the market does so at the expense of another active manager, and it applies no matter how skilled or unskilled investors are, including in inefficient markets.',
  matters: 'It provides a clean conceptual foundation for indexing and for scrutinizing fees, and is one of the most cited short pieces in investment practice. It reframes the debate: the question isn\'t whether markets are efficient, but whether <em>you</em> can identify the above-average active managers in advance.',
  critique: 'The result holds for the market as a whole under the stated definitions; it says nothing about a particular investor, a particular sub-market, or a particular period. "Passive" is defined by market-weighted holdings of the whole investable universe, which can\'t be perfectly replicated in practice. Investors may differ in taxes, horizons and objectives, so "average" returns aren\'t the only relevant outcome. Also, active investors may be doing something valuable at the aggregate level (price discovery), which Grossman and Stiglitz (1980) discuss.',
  lookFor: [
    'How "active" and "passive" are defined, and why the definition matters.',
    'The step that shows the two groups earn the same before-cost return.',
    'What Sharpe says about whether skill or luck plays any role.',
    'Any assumption you\'d challenge for real-world markets (taxes, segments, non-market-weight indexes).'
  ],
  quiz: [
    { q: 'In Sharpe\'s argument, what is a "passive" investor?',
      o: ['Someone who trades rarely', 'Someone who holds all securities in market-weight proportions', 'Someone who holds only bonds', 'Someone who never sells'], a: 1, why: 'Passive means holding the market portfolio.' },
    { q: 'Why must the average active dollar earn less than the average passive dollar after costs?',
      o: ['Active managers are less skilled', 'Together they earn the same gross return, and active costs more', 'Passive returns are higher before costs', 'Active investors ignore risk'], a: 1, why: 'Same gross average return; higher cost for active means lower net.' },
    { q: 'Does the argument depend on markets being informationally efficient?',
      o: ['Yes, entirely', 'No, it is an accounting identity that holds regardless', 'Only for bonds', 'Only in bear markets'], a: 1, why: 'It is arithmetic about averages, not a claim about prices.' }
  ],
  related: ['pm-fees', 'emh', 'p-jensen68']
},

{
  id: 'p-bhb86', type: 'paper', title: 'Determinants of Portfolio Performance',
  authors: 'Gary P. Brinson, L. Randolph Hood and Gilbert L. Beebower', year: 1986, journal: 'Financial Analysts Journal 42(4), 39–44',
  blurb: 'The source of the famous "asset allocation explains 90% of performance" claim, and why that claim is widely misread.',
  level: 'Accessible', min: 15, tags: ['asset allocation', 'pension funds'],
  question: 'How much of a portfolio\'s performance is due to the long-term asset allocation policy, and how much to market timing and security selection?',
  idea: 'Compare each plan\'s actual returns to a hypothetical <b>policy portfolio</b>: passive index returns weighted by the plan\'s long-term target allocation. Then separate the plan\'s actual return into the policy return, the effect of timing (changing allocations), and the effect of security selection.',
  method: 'They studied 91 large US corporate pension plans using quarterly returns for 1974–1983. For each plan they computed actual return, policy return, and combinations that isolate timing and selection. They then regressed actual quarterly returns on policy returns and examined how much of the variation the policy explained.',
  findings: 'On average, the policy return explained about 94% of the <em>variation in quarterly returns</em> across time. Active management (timing and selection) reduced average returns relative to the policy portfolio by roughly 1 percentage point a year, though costs partly account for this. The authors concluded that investment policy dominates the pattern of portfolio returns.',
  matters: 'It provided empirical support for the primacy of the asset allocation decision, and it shaped how advisers and pension consultants organize their work around policy allocation. It has also been one of the most frequently mis-stated statistics in investing.',
  critique: 'The 94% figure is about how well the policy explains a plan\'s <em>time-series variability</em> (returns go up and down with the market), not about how much of a plan\'s <em>level of return</em> or the <em>differences between plans</em> is due to allocation. Ibbotson and Kaplan (2000) show that the answer is about 90% for time-series variation, about 40% for differences among funds, and about 100% for the level of return. The paper also examines large institutional plans in one decade with limited asset classes.',
  lookFor: [
    'How the policy portfolio is constructed, and why it is a fair benchmark.',
    'What exactly the "93.6%"-type figure measures: what is the dependent variable?',
    'The average contribution of timing and selection, and how they relate to costs.',
    'How you would explain the result to someone who says "asset allocation explains 90% of my returns".'
  ],
  quiz: [
    { q: 'What does the headline ~94% figure describe?',
      o: ['The share of a plan\'s return level due to allocation', 'The share of the variation in a plan\'s returns over time explained by the policy portfolio', 'The share of managers who beat the market', 'The share of assets in equities'], a: 1, why: 'It is the time-series R² of actual returns on policy returns.' },
    { q: 'What did the authors find about active management on average?',
      o: ['It added about 1% a year', 'It reduced returns relative to the policy portfolio', 'It had no effect', 'It doubled risk'], a: 1, why: 'Timing and selection were negative on average, partly reflecting costs.' },
    { q: 'According to Ibbotson and Kaplan (2000), how much of the <em>difference in returns between funds</em> does allocation policy explain?',
      o: ['About 100%', 'About 90%', 'About 40%', 'About 5%'], a: 2, why: 'Cross-sectional variation is far less explained by policy than time-series variation.' }
  ],
  related: ['pm-ips', 'pm-cal', 'pm-fees']
},

{
  id: 'p-ballbrown68', type: 'paper', title: 'An Empirical Evaluation of Accounting Income Numbers',
  authors: 'Ray Ball and Philip Brown', year: 1968, journal: 'Journal of Accounting Research 6(2), 159–178',
  blurb: 'The first big evidence that earnings announcements carry information that moves stock prices, and that most of it is already in prices beforehand.',
  level: 'Moderate', min: 30, tags: ['earnings', 'event study', 'accounting'],
  question: 'Do accounting earnings numbers contain information that is useful to investors, or are they just noise?',
  idea: 'If annual earnings convey new information, stock prices should move in the direction of the "surprise" (actual earnings relative to what the market expected) around the announcement. And if markets are efficient, prices should adjust quickly, with little drift afterwards.',
  method: 'For a sample of 261 US firms over 1957–1965, they classify each year as "good news" or "bad news" depending on whether earnings came in above or below a mechanically generated expectation (two simple models: last year\'s earnings, or a prediction based on each firm\'s past relation to overall market earnings). They then track the <b>abnormal returns</b> (returns unexplained by market movements) of the two groups in the months before and after the report.',
  findings: 'Firms with good-news earnings had positive abnormal returns and bad-news firms had negative ones, so earnings do carry information. Most of the price reaction had already occurred <em>before</em> the announcement: the authors estimated that the large majority of the information (roughly 85–90%) was captured earlier by other sources. There was also a small drift in the direction of the surprise after the announcement.',
  matters: 'It is often considered the birth of the modern event study and of empirical capital-markets accounting research. It showed that accounting numbers matter for prices, and that markets are quick to react. The post-announcement drift it noted became a famous anomaly ("post-earnings-announcement drift", later documented by Bernard and Thomas, 1989).',
  critique: 'The expectation model is crude by modern standards; better expectation measures (analyst forecasts) and more careful risk adjustment are now standard. The abnormal-return methodology has been refined (market-model event studies, control for size and value). The finding that most information is impounded before the annual report reflects the fact that firms release many other signals during the year, so it says less about "earnings don\'t matter" than about timing.',
  lookFor: [
    'How "good news" and "bad news" firms are defined without using analysts\' forecasts.',
    'The famous chart of cumulative abnormal returns by month, before and after the announcement.',
    'What the authors conclude about how much information the annual report itself adds.',
    'The small drift after the announcement, and how they interpret it.'
  ],
  quiz: [
    { q: 'What is an "abnormal return" in this study?',
      o: ['A negative return', 'The part of a stock\'s return not explained by market movements', 'The dividend yield', 'A return above 10%'], a: 1, why: 'It isolates firm-specific reaction from general market movement.' },
    { q: 'What did Ball and Brown find about the timing of the price reaction?',
      o: ['It happens only after the announcement', 'Most of it occurs before the annual report is released', 'There is no reaction', 'It happens a year later'], a: 1, why: 'Other information sources had already conveyed most of the news.' },
    { q: 'What later anomaly grew out of the small post-announcement drift they observed?',
      o: ['The size effect', 'Post-earnings-announcement drift', 'The January effect', 'The equity premium puzzle'], a: 1, why: 'Bernard and Thomas (1989) documented that prices keep drifting in the surprise\'s direction.' }
  ],
  related: ['emh', 'p-fama70', 'fsa-quality']
},

{
  id: 'p-sloan96', type: 'paper', title: 'Do Stock Prices Fully Reflect Information in Accruals and Cash Flows about Future Earnings?',
  authors: 'Richard G. Sloan', year: 1996, journal: 'The Accounting Review 71(3), 289–315',
  blurb: 'Earnings made of accruals are less persistent than earnings made of cash, and investors seem to miss the difference.',
  level: 'Moderate', min: 30, tags: ['accruals', 'earnings quality', 'anomaly'],
  question: 'Do the two components of earnings, cash flow and accruals, have different implications for future earnings, and do stock prices reflect the difference?',
  idea: 'Accruals are timing adjustments, more subjective and more likely to reverse than cash flows, so earnings driven by accruals should be less persistent. If investors "fixate" on the bottom-line earnings number without distinguishing where it came from, they will overprice firms with high accruals and underprice firms with low accruals, and be surprised later.',
  method: 'Using US industrial firms on the NYSE and AMEX over roughly 1962–1991, Sloan splits earnings into an accrual component (measured from balance-sheet changes) and a cash-flow component. He first estimates how well each predicts next year\'s earnings. He then examines whether stock returns behave as if prices treat the components as equally persistent, and tests a trading strategy: buying low-accrual firms and shorting high-accrual firms, with size and risk adjustments.',
  findings: 'The accrual component of earnings was <b>less persistent</b> than the cash flow component. Yet prices behaved as if investors did not fully anticipate this: the strategy of going long low-accrual and short high-accrual firms earned large abnormal returns: about 10.4% in the year after portfolio formation for the lowest versus highest accrual deciles over 1962–1991, with a noticeable part of the excess return arriving around subsequent earnings announcements.',
  matters: 'It launched a large literature on the "accrual anomaly", earnings quality and investor fixation, and gave practitioners a direct use for the cash flow statement. It is a good example of accounting information helping to predict returns.',
  critique: 'Later work questioned whether the finding reflects mispricing, risk, or measurement issues: Richardson et al. (2005) argue reliability of accruals matters; Mashruwala et al. (2006) point to arbitrage costs; and Green, Hand and Soliman (2011) document that the anomaly has weakened dramatically in recent decades, consistent with post-publication decay. Balance-sheet measures of accruals are noisy, particularly around mergers and divestitures. As with other anomalies, transaction costs and data-mining concerns apply.',
  lookFor: [
    'How accruals are computed from balance sheet changes.',
    'The persistence regressions: which coefficient is larger, and by how much?',
    'The table of returns by accrual decile, and the hedge portfolio\'s return.',
    'Where the excess returns appear: around earnings announcements or throughout the year?'
  ],
  quiz: [
    { q: 'What is the paper\'s central persistence finding?',
      o: ['Accruals are more persistent than cash flows', 'The accrual component of earnings is less persistent than the cash flow component', 'Both are equally persistent', 'Neither predicts future earnings'], a: 1, why: 'Accruals reverse more, so earnings from them are less durable.' },
    { q: 'What did the trading strategy involve?',
      o: ['Long high-accrual and short low-accrual', 'Long low-accrual and short high-accrual', 'Long only', 'Short only'], a: 1, why: 'Low-accrual firms were underpriced relative to their earnings persistence.' },
    { q: 'What later evidence suggests caution about trading this today?',
      o: ['The anomaly has weakened substantially in later periods', 'It became larger', 'It applies only to banks', 'It was disproved in 1996'], a: 0, why: 'Post-publication decay, consistent with arbitrage or data mining.' }
  ],
  related: ['fsa-quality', 'emh', 'fsa-statements']
},

{
  id: 'p-altman68', type: 'paper', title: 'Financial Ratios, Discriminant Analysis and the Prediction of Corporate Bankruptcy',
  authors: 'Edward I. Altman', year: 1968, journal: 'Journal of Finance 23(4), 589–609',
  blurb: 'Combining five financial ratios into one score that separated failing from healthy firms, better than any single ratio.',
  level: 'Moderate', min: 30, tags: ['bankruptcy', 'credit', 'ratios'],
  question: 'Can financial ratios be combined in a systematic way to predict which firms will go bankrupt?',
  idea: 'Earlier studies compared one ratio at a time. Altman uses <b>multiple discriminant analysis</b>, a statistical technique that finds the linear combination of several ratios that best separates two groups (bankrupt vs non-bankrupt firms), so that profitability, leverage, liquidity, solvency and activity can be weighed together.',
  method: 'A matched sample of 33 manufacturing firms that filed for bankruptcy between 1946 and 1965, and 33 non-bankrupt firms of similar size and industry. He starts with 22 candidate ratios, and selects five that together discriminate best. The resulting <b>Z-score</b> is tested on the original sample and then on hold-out samples of other firms.',
  findings: 'The five ratios (working capital/assets, retained earnings/assets, EBIT/assets, market value of equity/liabilities, sales/assets) produced a Z-score that classified about 95% of firms correctly one year before bankruptcy, with accuracy falling substantially two years before (about 72%) and lower beyond. Cut-offs of about 1.81 and 2.99 defined distress, grey and safe zones. EBIT/assets was the most discriminating variable.',
  matters: 'The Z-score became one of the most widely used credit-screening tools in practice and academia, and helped set the agenda for distress prediction. Its simplicity made it a model of how to turn a statement analysis into a decision aid.',
  critique: 'A small sample of manufacturers from a specific era, evaluated partly in-sample, tends to overstate accuracy. Firms in other industries, later periods and private firms need different coefficients (Altman produced several variants). The cut-offs are not calibrated to a stable probability of default. Later hazard-rate models (Shumway, 2001) and market-based models (Campbell, Hilscher and Szilagyi, 2008; Merton\'s distance to default) generally outperform it, partly by using more information and better statistical methods.',
  lookFor: [
    'How the sample of failed and non-failed firms is matched, and why.',
    'How the five ratios were chosen from the original list.',
    'The accuracy table: how quickly does it fall as the horizon lengthens?',
    'The difference between Type I and Type II errors, and their different costs to a lender.'
  ],
  quiz: [
    { q: 'What statistical technique did Altman use?',
      o: ['Multiple discriminant analysis', 'Event study', 'Monte Carlo simulation', 'Difference-in-differences'], a: 0, why: 'It finds the weighted combination of ratios that best separates two groups.' },
    { q: 'How does predictive accuracy change as the horizon before bankruptcy lengthens?',
      o: ['It rises', 'It falls', 'It is constant', 'It is random'], a: 1, why: 'Accuracy was highest one year out and fell notably at two years and beyond.' },
    { q: 'Why is a small matched sample of manufacturers a limitation?',
      o: ['It may not generalize to other industries and periods and can overstate accuracy', 'It makes ratios negative', 'It removes leverage', 'It invalidates all statistics'], a: 0, why: 'In-sample fit on limited data doesn\'t guarantee out-of-sample performance.' }
  ],
  related: ['fsa-credit', 'fsa-ratios', 'capstruct']
}

);
