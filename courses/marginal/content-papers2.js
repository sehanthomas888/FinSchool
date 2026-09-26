/* Paper breakdowns, part 2: fund performance, active management, asset allocation, earnings and bankruptcy. */
window.LESSONS = window.LESSONS || [];
(function () {
  const QL = window.QL, N = QL.numeric, usd = QL.usd, pct = QL.pct, int = QL.int, pick = QL.pick, round = QL.round, num = QL.num;

  window.LESSONS.push(

{
  id: 'p-jensen68', type: 'paper', title: 'The Performance of Mutual Funds in the Period 1945–1964', authors: 'Michael C. Jensen', year: 1968, journal: 'Journal of Finance 23(2), 389–416',
  blurb: 'The first rigorous test of whether fund managers beat the market after adjusting for risk. It introduced "Jensen\'s alpha".',
  level: 'Moderate', min: 30, tags: ['mutual funds', 'alpha', 'performance'],
  plain: 'A fund manager who earns 12% in a year when the market earned 15% has lost to the market, and one who earns 12% when the market earned 5% has won. But what if the fund took extra risk? Jensen built a fair scorecard: work out what return the fund\'s market risk (its beta) <em>should</em> have earned, and call any difference the fund\'s "alpha". Across 115 funds, alpha was on average slightly negative after costs, and almost none showed real skill.',
  los: [
    'Explain how Jensen\'s alpha is defined and estimated.',
    'Explain why he looked at returns both before and after expenses.',
    'Summarize the main finding and name two critiques.'
  ],
  terms: [
    ['Alpha', 'the return above (or below) what the fund\'s market risk predicts'],
    ['Beta', 'the fund\'s sensitivity to the market'],
    ['Excess return', 'return above the risk-free rate'],
    ['Regression', 'a statistical way to fit a line through data and read off its slope and intercept'],
    ['Net / gross of expenses', 'after / before the fund\'s costs are deducted']
  ],
  question: 'Can mutual fund managers forecast security prices well enough to earn returns above what their risk exposure alone would predict?',
  idea: 'Raw returns cannot answer this because a fund may simply have taken more market risk. Jensen uses the CAPM framework to compute, for each fund, the return that its beta predicts, and defines the fund\'s <b>alpha</b> as the difference: the intercept from regressing the fund\'s excess returns on the market\'s excess returns.',
  method: 'A sample of 115 open-end mutual funds over 1945–1964. For each fund he regresses excess returns on market excess returns and estimates the intercept (alpha) and its statistical significance. He does this both net of expenses (what investors received) and gross of expenses (adding back what the fund spent), to separate forecasting ability from costs.',
  example: '<p>Say the risk-free rate is 3%, the market returned 10% and a fund has a beta of 1.2. CAPM says the fund should have earned 3% + 1.2 × (10% − 3%) = 11.4%. If it actually earned 10.4%, its alpha is 10.4% − 11.4% = <b>−1.0%</b>. It earned less than the market risk it carried. That is roughly what Jensen found on average.</p>',
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
    { k: 'calc', gen: () => { const rf = pick([2, 3, 4]), b = pick([0.8, 1.0, 1.2, 1.4]), rm = pick([8, 10, 12]), rp = pick([8, 10, 11, 13]); const ans = rp - (rf + b * (rm - rf)); return N({ q: `The risk-free rate is ${rf}%, the market returned ${rm}%, and a fund with beta ${b} returned ${rp}%. What is Jensen's alpha?`, ans, wrong: [rp - rm, rp - rf, rp - b * rm], fmt: x => pct(x, 2), alt: () => (rp - rf) - b * (rm - rf), tol: 1e-9, fixed: true, why: `The return its risk predicts is ${rf}% + ${b} × ${rm - rf}% = ${round(rf + b * (rm - rf), 2)}%. Alpha = ${rp}% − ${round(rf + b * (rm - rf), 2)}% = ${round(ans, 2)}%.` }); } },
    { k: 'concept', q: 'How does Jensen define a fund\'s alpha?', o: ['The intercept from regressing the fund\'s excess returns on the market\'s excess returns', 'The fund\'s total return', 'Its expense ratio', 'Its beta'], a: 0, why: 'Alpha is the return left after accounting for the fund\'s market exposure.' },
    { k: 'concept', q: 'What did Jensen find about average fund performance?', o: ['Negative alpha after expenses, and no evidence of outperformance even before expenses', 'Strong positive alpha', 'Exactly zero alpha for every fund', 'Higher returns for large funds'], a: 0, why: 'Funds on average underperformed after costs, and gross alpha was not positive either.' },
    { k: 'concept', q: 'Why did Jensen study returns both gross and net of expenses?', o: ['To separate forecasting ability from costs', 'To hide costs', 'Because funds do not pay expenses', 'To reduce risk'], a: 0, why: 'Gross tells you about skill; net tells you about what investors received.' },
    { k: 'concept', q: 'Roll\'s (1978) critique of performance tests is that...', o: ['Results are sensitive to the choice of market proxy', 'Alpha cannot be negative', 'Funds hold no stocks', 'CAPM has no beta'], a: 0, why: 'A different market benchmark can change the measured alpha.' },
    { k: 'concept', q: 'How many funds showed significantly positive alpha, relative to chance?', o: ['About as many as chance alone would produce', 'Nearly all of them', 'None at all under any test', 'Exactly half'], a: 0, why: 'A few winners are expected by luck among 115 funds.' },
    { k: 'apply', q: 'A fund returned 14% when the market returned 12%, but its beta is 1.5. What should you suspect?', o: ['It took extra market risk, so its alpha may be small or negative', 'It has great skill for certain', 'It has no risk', 'The market is wrong'], a: 0, why: 'A high beta means it should have beaten the market in a rising year. Alpha adjusts for that.' },
    { k: 'apply', q: 'Later research (Carhart, 1997) reinterprets alpha. How?', o: ['By controlling for size, value and momentum as well as market risk', 'By ignoring beta', 'By removing funds', 'By using only bonds'], a: 0, why: 'Multi-factor models attribute some of what looked like alpha to exposure to other factors.' }
  ],
  related: ['pm-perf', 'pm-fees', 'capm']
},

{
  id: 'p-sharpe91', type: 'paper', title: 'The Arithmetic of Active Management', authors: 'William F. Sharpe', year: 1991, journal: 'Financial Analysts Journal 47(1), 7–9',
  blurb: 'A three-page argument that, before looking at any data, the average active dollar must underperform the average passive dollar after costs.',
  level: 'Accessible', min: 10, tags: ['active management', 'costs'],
  plain: 'Imagine everyone who owns shares. Some simply hold the whole market (passive). The rest trade among themselves trying to do better (active). Together they must own the whole market, so if the passive group earns the market return, the active group must <em>also</em> earn it on average, before costs. But active investors pay more for research and trading. So, on average, after costs, active investors must do worse. No data needed, just arithmetic.',
  los: [
    'Explain how Sharpe defines "active" and "passive" investors.',
    'Follow the argument that they earn the same gross return on average.',
    'Say what the result does and does not imply.'
  ],
  terms: [
    ['Passive investor', 'holds every security in proportion to its market weight'],
    ['Active investor', 'holds anything else'],
    ['Gross / net return', 'before / after costs'],
    ['Market portfolio', 'all securities held in proportion to their value']
  ],
  question: 'Can active management, as a group, outperform passive management?',
  idea: 'Divide all investors in a market into two groups: <b>passive</b> investors, who hold every security in proportion to its market weight, and <b>active</b> investors, who hold everything else. In aggregate, all investors must hold the whole market. So if the passive group holds the market portfolio, the active group\'s combined holdings must <em>also</em> be the market portfolio, and hence they earn the same <em>gross</em> return before costs. Active management costs more, so after costs it must earn less.',
  method: 'Pure logic and arithmetic. There is no data, model or regression. The argument rests on a simple accounting identity plus the observation that active investors incur research and trading costs while passive investors incur very little.',
  example: '<p>Suppose the market returns 8% in a year. Passive investors (60% of the market) hold everything and earn 8% before costs. Then the active investors (40% of the market) must, in total, also earn 8% before costs: 0.6 × 8% + 0.4 × 8% = 8%. If passive investors pay 0.1% in costs and active investors pay 1.2%, then after costs passive investors earn 7.9% and the average active investor earns 6.8%, a gap of <b>1.1 points</b> that has nothing to do with skill or luck.</p>',
  findings: 'Before costs, the return on the average actively managed dollar equals the return on the average passively managed dollar. After costs, it is lower by the additional costs of being active. This holds in <em>any</em> period, for <em>any</em> market. Any active manager who beats the market does so at the expense of another active manager, and it applies no matter how skilled or unskilled investors are, including in inefficient markets.',
  matters: 'It provides a clean conceptual foundation for indexing and for scrutinizing fees, and is one of the most cited short pieces in investment practice. It reframes the debate: the question is not whether markets are efficient, but whether <em>you</em> can identify the above-average active managers in advance.',
  critique: 'The result holds for the market as a whole under the stated definitions; it says nothing about a particular investor, a particular sub-market, or a particular period. "Passive" is defined by market-weighted holdings of the whole investable universe, which cannot be perfectly replicated in practice. Investors may differ in taxes, horizons and objectives, so "average" returns are not the only relevant outcome. Also, active investors may be doing something valuable at the aggregate level (price discovery), which Grossman and Stiglitz (1980) discuss.',
  lookFor: [
    'How "active" and "passive" are defined, and why the definition matters.',
    'The step that shows the two groups earn the same before-cost return.',
    'What Sharpe says about whether skill or luck plays any role.',
    'Any assumption you would challenge for real-world markets (taxes, segments, non-market-weight indexes).'
  ],
  quiz: [
    { k: 'calc', gen: () => { const R = pick([6, 8, 10]), cp = pick([0.05, 0.1, 0.2]), ca = pick([0.8, 1.0, 1.2]); const ans = ca - cp; return N({ q: `The market returns ${R}%. Passive investors pay ${cp}% in costs and active investors pay ${ca}%. By Sharpe's arithmetic, how much less does the average active dollar earn after costs than the average passive dollar?`, ans, wrong: [ca, ca + cp, R - ca], fmt: x => pct(x, 2), alt: () => (R - cp) - (R - ca), tol: 1e-9, fixed: true, why: `Both groups earn ${R}% before costs. After costs passive earns ${round(R - cp, 2)}% and active earns ${round(R - ca, 2)}%, a gap of ${round(ans, 2)} points: exactly the difference in costs.` }); } },
    { k: 'calc', gen: () => { const R = pick([6, 8, 10]), pw = pick([0.5, 0.6, 0.7]); const ans = R; return N({ q: `The whole market returns ${R}%. Passive investors hold ${pw * 100}% of the market and earn the market return before costs. What must the active investors, holding the other ${round((1 - pw) * 100, 0)}%, earn on average before costs?`, ans, wrong: [R * pw, R * (1 - pw), R + 2], fmt: x => pct(x, 2), alt: () => (R - pw * R) / (1 - pw), tol: 1e-9, fixed: true, why: `The market return is the weighted average of the two groups: ${R} = ${pw} × ${R} + ${round(1 - pw, 2)} × R_active. Solving gives R_active = ${R}%. Whatever one active investor gains, another loses.` }); } },
    { k: 'concept', q: 'What is the core of Sharpe\'s argument?', o: ['Active and passive together hold the market, so before costs the averages must match', 'Active managers are less intelligent', 'Passive funds have higher returns before costs', 'Fees are tax-deductible'], a: 0, why: 'The average active and average passive dollar earn the same gross return; costs make active lower.' },
    { k: 'concept', q: 'Does the arithmetic imply that no active manager can beat the market?', o: ['No, some can, but only at the expense of other active investors', 'Yes, none can', 'Only in bull markets', 'Only with leverage'], a: 0, why: 'It is a statement about averages.' },
    { k: 'concept', q: 'Does the argument depend on markets being efficient?', o: ['No, it holds in any market, efficient or not', 'Yes, only in efficient markets', 'Only in bear markets', 'Only for bonds'], a: 0, why: 'It is an accounting identity, independent of how prices are set.' },
    { k: 'concept', q: 'How does Sharpe define a passive investor?', o: ['One who holds every security in proportion to its market weight', 'One who never trades', 'One who owns only bonds', 'One who holds cash'], a: 0, why: 'Passive means holding the market portfolio.' },
    { k: 'apply', q: 'What question does Sharpe say matters most, given his result?', o: ['Whether you can identify above-average active managers in advance', 'Whether markets are efficient', 'Whether fees are legal', 'Whether prices are random'], a: 0, why: 'The arithmetic says the average active dollar loses after costs, so picking winners in advance is the real challenge.' },
    { k: 'apply', q: 'A critic says: "Active investors add value by discovering prices." Which idea in the paper\'s critiques does this reflect?', o: ['Grossman and Stiglitz (1980): active investors do valuable price discovery', 'Roll (1977)', 'Fama (1970)', 'Merton (1974)'], a: 0, why: 'The critiques note that active investors may contribute something valuable, such as price discovery.' }
  ],
  related: ['pm-fees', 'emh', 'p-jensen68']
},

{
  id: 'p-bhb86', type: 'paper', title: 'Determinants of Portfolio Performance', authors: 'Gary P. Brinson, L. Randolph Hood and Gilbert L. Beebower', year: 1986, journal: 'Financial Analysts Journal 42(4), 39–44',
  blurb: 'The source of the famous "asset allocation explains 90% of performance" claim, and why that claim is widely misread.',
  level: 'Accessible', min: 15, tags: ['asset allocation', 'pension funds'],
  plain: 'You often hear "asset allocation explains 90% of your returns". This paper is where that comes from. The authors compared 91 large pension plans with a simple benchmark that just followed each plan\'s long-term stock/bond/cash mix. The benchmark tracked how each plan\'s return moved up and down over time almost perfectly. But that does <em>not</em> mean asset allocation explains 90% of how much money you make. It means plans moved mostly with the markets they were invested in.',
  los: [
    'Describe the policy-portfolio method used to separate policy, timing and selection.',
    'State what the roughly 94% figure actually measures.',
    'Explain why the claim is widely misread, and what the follow-up work found.'
  ],
  terms: [
    ['Policy portfolio', 'a passive benchmark that follows a plan\'s long-term target mix using index returns'],
    ['Market timing', 'changing allocations in the short term based on a market view'],
    ['Security selection', 'picking individual securities within an asset class'],
    ['Time-series variation', 'how a plan\'s return goes up and down from one quarter to the next'],
    ['R² (variance explained)', 'the share of the ups and downs in one series that another series accounts for']
  ],
  question: 'How much of a portfolio\'s performance is due to the long-term asset allocation policy, and how much to market timing and security selection?',
  idea: 'Compare each plan\'s actual returns to a hypothetical <b>policy portfolio</b>: passive index returns weighted by the plan\'s long-term target allocation. Then separate the plan\'s actual return into the policy return, the effect of timing (changing allocations), and the effect of security selection.',
  method: 'They studied 91 large US corporate pension plans using quarterly returns for 1974–1983. For each plan they computed actual return, policy return, and combinations that isolate timing and selection. They then regressed actual quarterly returns on policy returns and examined how much of the variation the policy explained.',
  example: '<p>Imagine a plan with a 60% stock / 40% bond policy. In a quarter when stocks rose 5% and bonds rose 2%, the policy portfolio returned 0.6 × 5% + 0.4 × 2% = <b>3.8%</b>. The plan\'s actual return might be 3.5%. The difference of −0.3 points is what timing and selection (and costs) contributed. Over many quarters, the plan\'s return went up and down almost exactly with the policy portfolio, because both mostly just followed the stock and bond markets. That close tracking is the "94%".</p>',
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
    { k: 'calc', gen: () => { const ws = pick([0.5, 0.6, 0.7]), rs = pick([3, 5, 8, -4]), rb = pick([1, 2, 3]); const ans = ws * rs + (1 - ws) * rb; return N({ q: `A plan's policy mix is ${ws * 100}% stocks and ${round((1 - ws) * 100, 0)}% bonds. In a quarter stocks returned ${rs}% and bonds ${rb}%. What is the policy portfolio's return?`, ans, wrong: [(rs + rb) / 2, rs, ws * rs], fmt: x => pct(x, 2), alt: () => rb + ws * (rs - rb), tol: 1e-9, why: `Policy return = ${ws} × ${rs}% + ${round(1 - ws, 2)} × ${rb}% = ${round(ans, 2)}%. It is what a passive investor following the plan's long-term mix would have earned.` }); } },
    { k: 'calc', gen: () => { const act = pick([2.8, 3.5, 4.0, 5.2]), pol = pick([3.0, 3.8, 4.5, 5.0]); const ans = act - pol; return N({ q: `A plan's actual quarterly return was ${act}% while its policy portfolio returned ${pol}%. What did timing and selection (including costs) contribute?`, ans, wrong: [act + pol, pol - act, act], fmt: x => pct(x, 2), alt: () => -(pol - act), tol: 1e-9, fixed: true, why: `Active contribution = actual − policy = ${act}% − ${pol}% = ${round(ans, 2)}%. On average BHB found this was negative, about 1 point a year.` }); } },
    { k: 'concept', q: 'What exactly does the ~94% figure measure?', o: ['How much of the variation in a plan\'s quarterly returns over time is explained by the policy return', 'How much of a plan\'s total return comes from stocks', 'How much of the differences between plans is due to allocation', 'The share of pension assets in stocks'], a: 0, why: 'It is about time-series variability: returns rise and fall with the markets the policy holds.' },
    { k: 'concept', q: 'What did BHB find about active management (timing and selection)?', o: ['It reduced returns by about 1 percentage point a year on average, partly because of costs', 'It added about 5 points', 'It had no effect at all', 'It doubled returns'], a: 0, why: 'Active management on average slightly lowered returns relative to the policy portfolio.' },
    { k: 'concept', q: 'How does Ibbotson and Kaplan\'s (2000) follow-up split the "how much does allocation explain?" question?', o: ['About 90% for time-series variation, about 40% for differences among funds, about 100% for the level of return', '90% for all three', '10% for all three', '50% for everything'], a: 0, why: 'The answer depends on which question you ask, which is why the popular statistic is so often misread.' },
    { k: 'concept', q: 'What is a policy portfolio?', o: ['A passive benchmark that follows the plan\'s long-term target mix using index returns', 'A list of company rules', 'The riskiest portfolio', 'An insurance policy'], a: 0, why: 'It is the "what if we just held the plan\'s target allocation" comparison.' },
    { k: 'apply', q: 'Someone says, "Asset allocation explains 90% of my returns, so choosing funds does not matter." What is wrong?', o: ['The 90% describes how much returns vary with the market over time, not how much of the level or of differences between funds allocation explains', 'Nothing is wrong', 'Funds cannot differ', 'Asset allocation is irrelevant'], a: 0, why: 'The statistic is about time-series variability, so it does not mean fund choice or fees are unimportant.' },
    { k: 'apply', q: 'Two pension plans both hold 60% stocks and 40% bonds using index funds. Their quarterly returns will most likely...', o: ['Move up and down almost together, since the policy mix is the same', 'Be completely unrelated', 'Move in opposite directions', 'Be identical every year'], a: 0, why: 'That closeness is what the 94% reflects: the mix drives how returns move with the markets.' }
  ],
  related: ['pm-ips', 'pm-cal', 'pm-fees']
},

{
  id: 'p-ballbrown68', type: 'paper', title: 'An Empirical Evaluation of Accounting Income Numbers', authors: 'Ray Ball and Philip Brown', year: 1968, journal: 'Journal of Accounting Research 6(2), 159–178',
  blurb: 'The first big evidence that earnings announcements carry information that moves stock prices, and that most of it is already in prices beforehand.',
  level: 'Moderate', min: 30, tags: ['earnings', 'event study', 'accounting'],
  plain: 'Do the profit numbers companies publish actually matter to investors, or are they just paperwork? Ball and Brown checked. For firms whose earnings came in better than expected, share prices had risen; for worse-than-expected, they had fallen. So earnings do carry information. But most of the price move had already happened <em>before</em> the announcement, because investors learn about a firm\'s performance from many other sources during the year.',
  los: [
    'Explain how Ball and Brown defined "good news" and "bad news" earnings.',
    'Describe an event study and what an abnormal return is.',
    'Say what the paper found about when the information reaches prices.'
  ],
  terms: [
    ['Earnings surprise', 'actual earnings minus what was expected'],
    ['Abnormal return', 'return not explained by movements in the overall market'],
    ['Event study', 'measuring average abnormal returns around an event, such as an announcement'],
    ['Market model', 'a simple relation that predicts a stock\'s return from the market\'s return'],
    ['Post-announcement drift', 'a continuing price move in the direction of the surprise after the news']
  ],
  question: 'Do accounting earnings numbers contain information that is useful to investors, or are they just noise?',
  idea: 'If annual earnings convey new information, stock prices should move in the direction of the "surprise" (actual earnings relative to what the market expected) around the announcement. And if markets are efficient, prices should adjust quickly, with little drift afterwards.',
  method: 'For a sample of 261 US firms over 1957–1965, they classify each year as "good news" or "bad news" depending on whether earnings came in above or below a mechanically generated expectation (two simple models: last year\'s earnings, or a prediction based on each firm\'s past relation to overall market earnings). They then track the <b>abnormal returns</b> (returns unexplained by market movements) of the two groups in the months before and after the report.',
  example: '<p>Suppose the market rose 2% in a month and a stock usually moves 1.2 times the market, so its expected return was 2.4%. If the stock actually rose 5.4%, its abnormal return is 5.4% − 2.4% = <b>+3.0%</b>. Ball and Brown averaged such abnormal returns over many firms, separately for good-news and bad-news firms, month by month around the announcement, and plotted the running total. The good-news line climbed and the bad-news line fell, mostly <em>before</em> the announcement date.</p>',
  findings: 'Firms with good-news earnings had positive abnormal returns and bad-news firms had negative ones, so earnings do carry information. Most of the price reaction had already occurred <em>before</em> the announcement: the authors estimated that the large majority of the information (roughly 85–90%) was captured earlier by other sources. There was also a small drift in the direction of the surprise after the announcement.',
  matters: 'It is often considered the birth of the modern event study and of empirical capital-markets accounting research. It showed that accounting numbers matter for prices, and that markets are quick to react. The post-announcement drift it noted became a famous anomaly ("post-earnings-announcement drift", later documented by Bernard and Thomas, 1989).',
  critique: 'The expectation model is crude by modern standards; better expectation measures (analyst forecasts) and more careful risk adjustment are now standard. The abnormal-return methodology has been refined (market-model event studies, control for size and value). The finding that most information is impounded before the annual report reflects the fact that firms release many other signals during the year, so it says less about "earnings do not matter" than about timing.',
  lookFor: [
    'How "good news" and "bad news" firms are defined without using analysts\' forecasts.',
    'The famous chart of cumulative abnormal returns by month, before and after the announcement.',
    'What the authors conclude about how much information the annual report itself adds.',
    'The small drift after the announcement, and how they interpret it.'
  ],
  quiz: [
    { k: 'calc', gen: () => { const a = pick([0, 0.5, 1]), b = pick([0.8, 1.0, 1.2, 1.5]), m = pick([1, 2, 3, -2]), r = pick([-3, 1.5, 4.5, 6]); const exp = a + b * m; const ans = r - exp; return N({ q: `A stock's normal relation to the market is: expected return = ${a}% + ${b} × market return. The market returned ${m}% and the stock returned ${r}%. What was its abnormal return?`, ans, wrong: [r - m, r, exp], fmt: x => pct(x, 2), alt: () => r - a - b * m, tol: 1e-9, fixed: true, why: `Expected return = ${a}% + ${b} × ${m}% = ${round(exp, 2)}%. Abnormal return = actual − expected = ${r}% − ${round(exp, 2)}% = ${round(ans, 2)}%.` }); } },
    { k: 'concept', q: 'How did Ball and Brown define "good news" earnings?', o: ['Earnings above a mechanically generated expectation', 'Earnings above the industry average', 'Earnings above analysts\' forecasts', 'Any positive earnings'], a: 0, why: 'They compared actual earnings to simple model-based expectations, without analysts\' forecasts.' },
    { k: 'concept', q: 'What did they find about when the information reaches prices?', o: ['Most of it (roughly 85–90%) was in prices before the announcement', 'None until the announcement', 'All of it after the announcement', 'It never reached prices'], a: 0, why: 'Other sources of information during the year reveal most of what earnings later confirm.' },
    { k: 'concept', q: 'What is an abnormal return?', o: ['A return not explained by movements in the overall market', 'A very large return', 'A negative return', 'A dividend'], a: 0, why: 'It strips out the market\'s effect so the reaction to firm-specific news shows up.' },
    { k: 'concept', q: 'What did Ball and Brown find about earnings and prices?', o: ['Good-news firms had positive abnormal returns and bad-news firms had negative ones', 'Earnings are noise', 'Prices never react', 'Only bad news matters'], a: 0, why: 'Earnings carry information that moves prices in the direction of the surprise.' },
    { k: 'concept', q: 'What later became of the small drift after announcements?', o: ['It became a famous anomaly: post-earnings-announcement drift (Bernard and Thomas, 1989)', 'It vanished forever', 'It was proven to be an error', 'It became a tax rule'], a: 0, why: 'Prices continue to move in the direction of the surprise after the announcement.' },
    { k: 'apply', q: 'Someone says: "Ball and Brown found that earnings do not matter because prices had already moved." What is wrong with that?', o: ['It confuses timing with importance: earnings confirm information the market learned during the year from other sources', 'Nothing', 'Prices never move', 'Earnings are the only information source'], a: 0, why: 'The result says information arrives earlier, not that earnings are irrelevant.' },
    { k: 'apply', q: 'Today\'s event studies usually use analyst forecasts rather than last year\'s earnings to define a "surprise". Why?', o: ['They are a better measure of what the market expected', 'Last year\'s earnings are illegal to use', 'Analyst forecasts are always right', 'They make the study shorter'], a: 0, why: 'Better expectation measures produce a cleaner measure of the surprise, as the critique notes.' }
  ],
  related: ['emh', 'p-fama70', 'fsa-quality']
},

{
  id: 'p-sloan96', type: 'paper', title: 'Do Stock Prices Fully Reflect Information in Accruals and Cash Flows about Future Earnings?', authors: 'Richard G. Sloan', year: 1996, journal: 'The Accounting Review 71(3), 289–315',
  blurb: 'Earnings made of accruals are less persistent than earnings made of cash, and investors seem to miss the difference.',
  level: 'Moderate', min: 30, tags: ['accruals', 'earnings quality', 'anomaly'],
  plain: 'A company\'s profit has two parts: cash it has actually received, and accounting entries (accruals) that may or may not turn into cash. Sloan found that the accrual part tends to fade quickly, while the cash part lasts. Yet share prices acted as if investors treated all profit alike, so firms with lots of accrual profit were overpriced and later disappointed. Betting against high-accrual firms and for low-accrual firms earned large abnormal returns.',
  los: [
    'Explain the difference between the cash and accrual components of earnings.',
    'Say why accrual earnings should be less persistent.',
    'Describe the trading strategy and the size of the abnormal return found.',
    'Summarize the main critiques, including the anomaly\'s decline.'
  ],
  terms: [
    ['Accruals', 'the part of earnings that is an accounting entry rather than cash'],
    ['Persistence', 'how much of this year\'s earnings repeats next year'],
    ['Fixation', 'focusing on the bottom-line number without asking where it came from'],
    ['Decile', 'one of ten equal-sized groups, ranked from lowest to highest'],
    ['Hedge portfolio', 'long some stocks and short others to isolate an effect']
  ],
  question: 'Do the two components of earnings, cash flow and accruals, have different implications for future earnings, and do stock prices reflect the difference?',
  idea: 'Accruals are timing adjustments, more subjective and more likely to reverse than cash flows, so earnings driven by accruals should be less persistent. If investors "fixate" on the bottom-line earnings number without distinguishing where it came from, they will overprice firms with high accruals and underprice firms with low accruals, and be surprised later.',
  method: 'Using US industrial firms on the NYSE and AMEX over roughly 1962–1991, Sloan splits earnings into an accrual component (measured from balance-sheet changes) and a cash-flow component. He first estimates how well each predicts next year\'s earnings. He then examines whether stock returns behave as if prices treat the components as equally persistent, and tests a trading strategy: buying low-accrual firms and shorting high-accrual firms, with size and risk adjustments.',
  example: '<p>Two companies each report $100m of profit. Company A collected $95m of it in cash (accruals of only $5m). Company B collected $40m (accruals of $60m). Sloan\'s point is that next year Company A\'s profit is likely to stay near $100m, while Company B\'s is more likely to slip, because its accounting entries have to reverse or be collected. If investors pay the same price for a dollar of profit at both companies, B is overpriced. Over 1962–1991 the strategy of buying the lowest-accrual tenth and shorting the highest-accrual tenth earned about 10.4% in the following year.</p>',
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
    { k: 'calc', gen: () => { const lo = pick([4, 6, 8, 10]), hi = pick([-6, -3, 0, 2]); const ans = lo - hi; return N({ q: `In a hedge strategy you buy low-accrual firms (which returned ${lo}% next year) and short high-accrual firms (which returned ${hi}%). What is the strategy's return?`, ans, wrong: [lo + hi, lo, hi], fmt: x => pct(x, 1), alt: () => lo * 1 + (-hi) * 1, tol: 1e-9, fixed: true, why: `Long return + short return: ${lo}% − (${hi}%) = ${round(ans, 1)}%. You gain on the long side and gain when the shorted stocks do worse. Sloan's version earned about 10.4%.` }); } },
    { k: 'calc', gen: () => { const ni = pick([80, 100, 120]), cfo = pick([30, 50, 70]); const ans = ni - cfo; return N({ q: `A firm reports net income of $${ni}m and operating cash flow of $${cfo}m. What are its accruals?`, ans, wrong: [cfo - ni, ni + cfo, cfo], fmt: x => '$' + num(x, 0) + 'm', alt: () => ni - cfo, tol: 1e-9, fixed: true, why: `Accruals = net income − operating cash flow = ${ni} − ${cfo} = $${ans}m. Sloan found firms with high accruals like this tended to disappoint later.` }); } },
    { k: 'concept', q: 'Why should accrual-based earnings be less persistent than cash-based earnings?', o: ['Accruals are timing adjustments that tend to reverse', 'They are taxed differently', 'They are illegal', 'They are always smaller'], a: 0, why: 'Receivables must be collected or written off; timing differences unwind.' },
    { k: 'concept', q: 'What is "fixation" in Sloan\'s hypothesis?', o: ['Investors focus on bottom-line earnings without distinguishing cash from accruals', 'Investors ignore all news', 'Firms fix their accounts', 'Prices are fixed'], a: 0, why: 'If investors treat both components as equally persistent, they misprice high- and low-accrual firms.' },
    { k: 'concept', q: 'What did Sloan\'s strategy do?', o: ['Long low-accrual firms, short high-accrual firms', 'Long high-accrual firms only', 'Long bonds, short stocks', 'Buy only dividend payers'], a: 0, why: 'It bets against the overpriced high-accrual firms and for the underpriced low-accrual ones.' },
    { k: 'concept', q: 'What has happened to the accrual anomaly in recent decades?', o: ['It has weakened dramatically (Green, Hand and Soliman, 2011), consistent with post-publication decay', 'It has grown stronger', 'It never existed', 'It became a law'], a: 0, why: 'Like many anomalies, it has faded, which fits the data-mining and publication-decay concerns.' },
    { k: 'apply', q: 'Firm X has net income $100m and CFO $95m. Firm Y has net income $100m and CFO $40m. Which does Sloan\'s work suggest is more likely to see profit fall next year?', o: ['Firm Y, whose earnings are mostly accruals', 'Firm X', 'Neither', 'Both equally'], a: 0, why: 'Accrual-heavy earnings are less persistent.' },
    { k: 'apply', q: 'Someone finds that a high-accrual firm\'s share price fell around its next earnings announcement. How does this fit Sloan\'s story?', o: ['Investors were surprised when the earnings turned out to be less persistent than they assumed', 'It contradicts it', 'It is random', 'It shows accruals are irrelevant'], a: 0, why: 'A noticeable part of the excess return arrives around subsequent earnings announcements.' }
  ],
  related: ['fsa-quality', 'emh', 'fsa-statements']
},

{
  id: 'p-altman68', type: 'paper', title: 'Financial Ratios, Discriminant Analysis and the Prediction of Corporate Bankruptcy', authors: 'Edward I. Altman', year: 1968, journal: 'Journal of Finance 23(4), 589–609',
  blurb: 'Combining five financial ratios into one score that separated failing from healthy firms, better than any single ratio.',
  level: 'Moderate', min: 30, tags: ['bankruptcy', 'credit', 'ratios'],
  plain: 'Before this paper, people looked at one ratio at a time to judge whether a company might fail. Altman asked a better question: which <em>combination</em> of ratios best separates failing companies from healthy ones? He found five ratios, gave each a weight, and added them into a single "Z-score". A low score signalled danger. One year before bankruptcy the score was right about 95% of the time on his sample.',
  los: [
    'Explain the idea of combining ratios with discriminant analysis.',
    'Name the five ratios in the Z-score and calculate a score.',
    'Describe the accuracy results and the main limitations.'
  ],
  terms: [
    ['Discriminant analysis', 'a statistical method that finds the combination of variables that best separates two groups'],
    ['Z-score', 'Altman\'s single number combining five ratios'],
    ['Matched sample', 'a comparison group chosen to be similar (size, industry) to the group studied'],
    ['Hold-out sample', 'data not used to build the model, used to test it'],
    ['Type I / Type II error', 'missing a failing firm / wrongly flagging a healthy one']
  ],
  question: 'Can financial ratios be combined in a systematic way to predict which firms will go bankrupt?',
  idea: 'Earlier studies compared one ratio at a time. Altman uses <b>multiple discriminant analysis</b>, a statistical technique that finds the linear combination of several ratios that best separates two groups (bankrupt vs non-bankrupt firms), so that profitability, leverage, liquidity, solvency and activity can be weighed together.',
  method: 'A matched sample of 33 manufacturing firms that filed for bankruptcy between 1946 and 1965, and 33 non-bankrupt firms of similar size and industry. He starts with 22 candidate ratios, and selects five that together discriminate best. The resulting <b>Z-score</b> is tested on the original sample and then on hold-out samples of other firms.',
  example: '<p>Take a firm with working capital/assets = 0.10, retained earnings/assets = 0.20, EBIT/assets = 0.05, market equity/liabilities = 0.60 and sales/assets = 1.0. Z = 1.2×0.10 + 1.4×0.20 + 3.3×0.05 + 0.6×0.60 + 1.0×1.0 = 0.12 + 0.28 + 0.165 + 0.36 + 1.0 = <b>1.925</b>. That is above 1.81 but below 2.99: the grey zone. Altman\'s cut-offs were about 1.81 (below is distress) and 2.99 (above is safe).</p>',
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
    { k: 'calc', gen: () => { const x1 = pick([0.05, 0.1, 0.15]), x2 = pick([0.1, 0.2, 0.3]), x3 = pick([0.02, 0.05, 0.1]), x4 = pick([0.4, 0.8, 1.2]), x5 = pick([0.8, 1.0, 1.3]); const ans = 1.2 * x1 + 1.4 * x2 + 3.3 * x3 + 0.6 * x4 + 1.0 * x5; return N({ q: `A firm has X₁ = ${x1}, X₂ = ${x2}, X₃ = ${x3}, X₄ = ${x4}, X₅ = ${x5}. What is its Altman Z-score (weights 1.2, 1.4, 3.3, 0.6, 1.0)?`, ans, wrong: [x1 + x2 + x3 + x4 + x5, 3.3 * x1 + 1.4 * x2 + 1.2 * x3 + 0.6 * x4 + x5, 1.2 * x1 + 1.4 * x2 + 3.3 * x3 + 0.6 * x4], fmt: x => num(x, 3), alt: () => [[1.2, x1], [1.4, x2], [3.3, x3], [0.6, x4], [1.0, x5]].reduce((s, [w, x]) => s + w * x, 0), tol: 1e-9, fixed: true, why: `Weighted sum: ${round(1.2 * x1, 3)} + ${round(1.4 * x2, 3)} + ${round(3.3 * x3, 3)} + ${round(0.6 * x4, 3)} + ${round(x5, 3)} = ${num(ans, 3)}. ${ans > 2.99 ? 'Above 2.99: the safe zone.' : ans < 1.81 ? 'Below 1.81: the distress zone.' : 'Between 1.81 and 2.99: the grey zone.'}` }); } },
    { k: 'concept', q: 'What does multiple discriminant analysis do here?', o: ['Finds the combination of ratios that best separates bankrupt from non-bankrupt firms', 'Ranks firms by size', 'Predicts stock prices', 'Sets interest rates'], a: 0, why: 'It turns several ratios into a single score that best separates the two groups.' },
    { k: 'concept', q: 'Which ratio was the most discriminating in Altman\'s Z-score?', o: ['EBIT ÷ total assets', 'Sales ÷ assets', 'Working capital ÷ assets', 'Retained earnings ÷ assets'], a: 0, why: 'EBIT/assets had the largest weight and discriminating power.' },
    { k: 'concept', q: 'About how accurate was the Z-score one year before bankruptcy?', o: ['About 95%', 'About 50%', 'About 72%', 'About 100% in every case'], a: 0, why: 'Accuracy was about 95% one year before, falling to about 72% two years before.' },
    { k: 'concept', q: 'Which is a limitation of the original Z-score?', o: ['A small sample of manufacturers from one era, so other firms need different coefficients', 'It uses too many ratios', 'It ignores profitability', 'It predicts share prices'], a: 0, why: 'The model was built on 33 bankrupt manufacturers; other industries and later periods need variants.' },
    { k: 'concept', q: 'What is a Type II error in this setting?', o: ['Flagging a healthy firm as likely to fail', 'Missing a firm that fails', 'Computing the wrong ratio', 'Using the wrong year'], a: 0, why: 'Type I is missing a failing firm; Type II wrongly flags a healthy one.' },
    { k: 'apply', q: 'A lender sees Z = 1.5 for a manufacturing borrower. What is the best reading?', o: ['Elevated risk: in the distress zone, so investigate further', 'Certain default', 'Perfect health', 'The score is meaningless'], a: 0, why: 'Below 1.81 flags distress risk, but it is a screen, not a verdict.' },
    { k: 'apply', q: 'A modern analyst wants a better distress predictor than the 1968 Z-score. What do later studies suggest?', o: ['Hazard-rate and market-based models generally outperform it', 'Nothing beats the Z-score', 'Use only one ratio', 'Ignore market data'], a: 0, why: 'Later models use more information and better statistics, as the critique notes.' }
  ],
  related: ['fsa-credit', 'fsa-ratios', 'capstruct']
}

  );
})();
