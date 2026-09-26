/* Paper breakdowns, part 3: fixed income. Immunization, yield-curve factors, the expectations theory, recession prediction, structural credit models and credit spreads. */
window.LESSONS = window.LESSONS || [];
(function () {
  const QL = window.QL, N = QL.numeric, usd = QL.usd, pct = QL.pct, int = QL.int, pick = QL.pick, round = QL.round, num = QL.num;

  window.LESSONS.push(

{
  id: 'p-fisherweil71', type: 'paper', title: 'Coping with the Risk of Interest-Rate Fluctuations: Returns to Bondholders from Naive and Optimal Strategies', authors: 'Lawrence Fisher and Roman L. Weil', year: 1971, journal: 'Journal of Business 44(4), 408–431',
  blurb: 'The paper that showed how to protect a bond portfolio\'s target return from interest-rate changes by matching duration to the investment horizon.',
  level: 'Moderate', min: 30, tags: ['immunization', 'duration'],
  plain: 'Suppose you need a fixed sum on a known date and want to be sure you will have it whatever happens to interest rates. The obvious plan is to buy a bond that matures on that date. Fisher and Weil showed it is not safe, because the coupons you receive along the way must be reinvested at unknown rates. Their fix: choose bonds whose <em>duration</em> equals the time until the money is needed, so that rate changes push in opposite directions and cancel.',
  los: [
    'Explain why buying a bond that matures on the target date is not risk-free.',
    'State the immunization rule and why price and reinvestment effects offset.',
    'Say which curve movements the result protects against, and what limits it.'
  ],
  terms: [
    ['Immunization', 'structuring a bond portfolio so that interest-rate changes do not stop it reaching a target value'],
    ['Duration', 'the weighted-average time until a portfolio\'s cash flows are received'],
    ['Reinvestment risk', 'the risk that coupons can only be reinvested at lower rates'],
    ['Term structure', 'the pattern of interest rates across maturities'],
    ['Additive shift', 'a change that adds the same amount to every forward rate']
  ],
  question: 'A bondholder needs a known amount at a known future date. How should they choose bonds so that the outcome does not depend on what happens to interest rates in the meantime?',
  idea: 'The obvious approach is to buy a bond that matures on the target date, but if it pays coupons, those coupons must be reinvested at unknown future rates. Fisher and Weil show that if the portfolio\'s <b>duration</b> (the weighted-average time to receive its cash flows) equals the length of the planning period, the loss in bond prices from a rate rise is offset by the higher return on reinvested coupons. The portfolio is then <b>immunized</b>: the investor realizes at least the return expected at purchase.',
  method: 'Theory plus empirical simulation. They derive the duration that immunizes a portfolio of default-free bonds against an additive shift in the term structure (a change that adds the same amount to every forward rate), and then compare the outcomes of naive strategies with duration-matched strategies using historical bond data.',
  example: '<p>You owe $1,000,000 in 8 years. A bond maturing in 8 years pays coupons in years 1 to 7 that you must reinvest, so your final value depends on the rates you can get. If rates fall, reinvested coupons earn less and you end up short. A bond with a somewhat longer maturity, chosen so that its duration is <em>exactly</em> 8 years, behaves differently: if rates rise, its price falls but reinvested coupons earn more, and the two effects cancel. For a 10-year, 5% annual-coupon bond at a 5% yield, the Macaulay duration is about 8.1 years, so a jump of 1 point in yields changes the final value by only about −0.06%.</p>',
  findings: 'A portfolio whose duration equals the investment horizon is protected against a one-time, parallel shift in the yield curve: the realized return is at least the promised return at purchase. Simple strategies such as buying a bond that matures at the horizon do not deliver the promised return reliably, because of reinvestment risk.',
  matters: 'It introduced immunization as an asset-management strategy and underpins <b>liability-driven investing</b> at pension funds and insurers. It built on the actuary F. M. Redington\'s (1952) earlier work and put the idea on firm footing for a single liability.',
  critique: 'The result holds for specific kinds of curve movement (parallel, one-time shifts), so twists and curvature changes can still produce errors; later work developed multi-factor and stochastic-process versions. The portfolio must be rebalanced as time passes and yields change, because duration drifts. It assumes default-free, non-callable bonds and ignores transaction costs.',
  lookFor: [
    'How the authors define the type of interest-rate change (the "additive shift") they protect against.',
    'Why a bond maturing at the horizon is not the safe choice they call "naive".',
    'The role of the reinvestment of coupons in the argument.',
    'What assumptions would break immunization, and how the empirical tests handle them.'
  ],
  quiz: [
    { k: 'calc', gen: () => { const c = pick([[4, 12, 8], [2, 10, 4], [3, 11, 5], [5, 15, 8]]); const [d1, d2, H] = c; const ans = (d2 - H) / (d2 - d1) * 100; return N({ q: `You want a bond portfolio with a duration of ${H} years. You can hold a bond of duration ${d1} and a bond of duration ${d2}. What percentage should go into the shorter one?`, ans, wrong: [(H - d1) / (d2 - d1) * 100, 50, H / (d1 + d2) * 100], fmt: x => pct(x, 1), alt: () => { let best = 0, bv = 1e9; for (let i = 0; i <= 10000; i++) { const w = i / 10000, v = Math.abs(w * d1 + (1 - w) * d2 - H); if (v < bv) { bv = v; best = w; } } return best * 100; }, tol: 0.02, fixed: true, why: `Solve w × ${d1} + (1 − w) × ${d2} = ${H}: w = (${d2} − ${H}) ÷ (${d2} − ${d1}) = ${pct(ans, 1)}. That mix has the duration you need to immunize a payment due in ${H} years.` }); } },
    { k: 'calc', gen: () => { const L = pick([500000, 1000000]), y = pick([4, 5, 6]), n = pick([6, 8, 10]); const ans = L / Math.pow(1 + y / 100, n); return N({ q: `You owe ${usd(L, 0)} in ${n} years and the yield is ${y}%. How much must you invest today (present value) to be fully funded?`, ans, wrong: [L / (1 + y / 100), L * (1 - y / 100 * n), L], fmt: x => usd(x, 0), alt: () => { let v = L; for (let t = 0; t < n; t++) v /= 1 + y / 100; return v; }, tol: 0.01, fixed: true, why: `PV = ${usd(L, 0)} ÷ ${1 + y / 100}^${n} = ${usd(ans, 0)}. Immunization needs this as a starting point, plus a duration equal to ${n} years.` }); } },
    { k: 'concept', q: 'Why is buying a bond that matures at the horizon not necessarily safe?', o: ['Coupons must be reinvested at unknown rates (reinvestment risk)', 'The bond may not be repaid', 'The price never changes', 'Taxes vary'], a: 0, why: 'The realized return depends on the rates at which coupons are reinvested.' },
    { k: 'concept', q: 'What must be true for a portfolio to be immunized (single liability)?', o: ['Its duration equals the length of the planning period', 'It holds only zero-coupon bonds', 'Its duration is as long as possible', 'It holds only short bonds'], a: 0, why: 'Then price risk and reinvestment risk offset for a one-time parallel shift.' },
    { k: 'concept', q: 'Which curve movement does the result protect against?', o: ['A one-time parallel (additive) shift', 'Any change at all', 'A twist in the curve', 'Default'], a: 0, why: 'Twists, curvature changes and default are not covered.' },
    { k: 'concept', q: 'Who developed immunization ideas earlier for insurers?', o: ['F. M. Redington (1952)', 'Harry Markowitz', 'Fischer Black', 'William Sharpe'], a: 0, why: 'Fisher and Weil built on Redington\'s earlier actuarial work.' },
    { k: 'apply', q: 'Yields rise right after you buy an immunized portfolio. What happens?', o: ['Bond prices fall but reinvested coupons earn more, so the two roughly cancel by the horizon', 'You lose everything', 'Nothing changes at all', 'You gain a lot'], a: 0, why: 'That is exactly the offsetting effect duration matching is designed to create.' },
    { k: 'apply', q: 'Why must an immunized portfolio be rebalanced over time?', o: ['Duration drifts as time passes and yields change', 'Bonds expire daily', 'Regulations require it', 'Coupons vanish'], a: 0, why: 'The duration match decays, so it needs restoring.' }
  ],
  related: ['fi-immun', 'fi-duration']
},

{
  id: 'p-litterman91', type: 'paper', title: 'Common Factors Affecting Bond Returns', authors: 'Robert Litterman and José Scheinkman', year: 1991, journal: 'Journal of Fixed Income 1(1), 54–61',
  blurb: 'Showed that almost all movements in the Treasury yield curve can be described by three factors: level, slope and curvature.',
  level: 'Accessible', min: 20, tags: ['term structure', 'risk factors', 'principal components'],
  plain: 'There are Treasury bonds of dozens of maturities, and it looks as if each has its own source of risk. Litterman and Scheinkman showed that almost all their movements can be described by just three simple shapes: the whole curve shifting up or down (level), short and long rates moving in opposite directions (slope), and the middle moving against the ends (curvature). A handful of numbers describes what the curve did each day.',
  los: [
    'Describe the level, slope and curvature factors in plain words.',
    'Explain what principal component analysis does.',
    'Say why duration alone misses part of yield-curve risk.'
  ],
  terms: [
    ['Principal component analysis', 'a statistical method that finds the main patterns in a set of variables that move together'],
    ['Level', 'all yields moving up or down together'],
    ['Slope (steepness)', 'short and long yields moving in opposite directions'],
    ['Curvature', 'the middle of the curve moving against both ends'],
    ['Hedge', 'a position that offsets another position\'s risk']
  ],
  question: 'Treasury bonds of many maturities move around every day. How many independent sources of risk actually drive their returns?',
  idea: 'Bond returns are highly correlated across maturities, so the risk is much simpler than the number of bonds suggests. Using <b>principal component analysis</b> (a statistical method that finds the main patterns in a set of co-moving variables), they find that a few patterns account for most variation. The first, largest pattern is a parallel <b>level</b> shift of the whole curve; the second is a <b>steepness</b> (slope) change in which short and long rates move in opposite directions; the third is a <b>curvature</b> change in which the middle of the curve moves against both ends.',
  method: 'Statistical analysis of the covariance of Treasury returns across maturities. They extract the principal components and interpret their shapes, then examine how much of the total variation each accounts for and how much of a bond\'s or portfolio\'s return can be explained by them.',
  example: '<p>Picture a curve with 2-year, 5-year and 10-year yields at 3%, 3.5% and 4%. A <b>level</b> move: all three rise 0.5 points to 3.5%, 4%, 4.5%. A <b>slope</b> move (steepening): the 2-year falls 0.3 and the 10-year rises 0.3, giving 2.7%, 3.5%, 4.3%. A <b>curvature</b> move: the 5-year rises while the 2-year and 10-year fall, giving something like 2.9%, 3.8%, 3.9%. Almost any day\'s change in the curve is a mix of these three shapes.</p>',
  findings: 'Three factors (level, steepness, curvature) explain the large majority of the variation in Treasury returns, with level by far the most important. They also show that bond returns can be hedged and risk measured with exposures to these few factors instead of to every individual yield.',
  matters: 'The level–slope–curvature framework is the standard language of yield-curve risk management, used for hedging, scenario analysis and relative-value trades. It shows the limits of duration-only thinking: duration captures only exposure to the level factor.',
  critique: 'Principal components are statistical, not economic, and the factors and their weights can vary across sample periods. They describe historical co-movement rather than causes. With interest rates near zero or with unusual central-bank policy, the shapes can behave differently. Other work, such as Cochrane and Piazzesi (2005), finds that some information relevant for bond returns is not spanned by level, slope and curvature.',
  lookFor: [
    'The figures showing the shape of each factor across maturities: can you see "parallel shift", "twist" and "butterfly"?',
    'How much of the variation each factor explains (check the exact figures in the paper).',
    'How the authors use the factors to hedge a bond portfolio.',
    'Why a duration-matched portfolio can still lose money on a curve twist.'
  ],
  quiz: [
    { k: 'calc', gen: () => { const D = pick([3, 5, 7, 9]), dy = pick([0.25, 0.5, 1]) * pick([1, -1]); const ans = -D * dy; return N({ q: `A bond has modified duration ${D}. In a pure "level" move, all yields ${dy > 0 ? 'rise' : 'fall'} by ${Math.abs(dy)} percentage points. About how much does its price change?`, ans, wrong: [D * dy, -D * dy / 100, D + dy], fmt: x => (x > 0 ? '+' : '') + pct(x, 2), alt: () => -(D * dy / 100) * 100, tol: 1e-9, fixed: true, why: `A level move is the case duration is built for: −${D} × ${dy}% = ${round(ans, 2)}%. Duration measures only the level factor, so it says nothing about slope or curvature moves.` }); } },
    { k: 'concept', q: 'Which three factors explain most Treasury yield-curve movements?', o: ['Level, slope (steepness) and curvature', 'Inflation, growth and unemployment', 'Duration, convexity and yield', 'Coupon, price and maturity'], a: 0, why: 'Principal-component analysis of Treasury returns found these three shapes.' },
    { k: 'concept', q: 'What is the "level" factor?', o: ['The whole curve moving up or down in parallel', 'The short end moving alone', 'The middle moving against the ends', 'Only 30-year bonds'], a: 0, why: 'It is the largest factor by far.' },
    { k: 'concept', q: 'What does the "slope" factor describe?', o: ['Short and long rates moving in opposite directions', 'All rates rising', 'The middle of the curve moving', 'Credit spreads'], a: 0, why: 'It is a steepening or flattening of the curve.' },
    { k: 'concept', q: 'What is principal component analysis?', o: ['A statistical method that finds the main patterns in a set of co-moving variables', 'A way to value stocks', 'An accounting rule', 'A trading strategy'], a: 0, why: 'It compresses many correlated series into a few underlying patterns.' },
    { k: 'concept', q: 'Why is duration-only thinking incomplete?', o: ['Duration captures only exposure to the level factor', 'Duration is always wrong', 'Duration measures credit risk', 'Duration ignores maturity'], a: 0, why: 'Slope and curvature moves can still hurt a duration-matched portfolio.' },
    { k: 'apply', q: 'Two portfolios have the same duration, but one is a barbell (short and long bonds) and the other a bullet (middle bonds). A twist changes the curve\'s slope. What happens?', o: ['They can perform very differently, because duration misses the slope factor', 'They perform identically', 'Neither is affected', 'Only the bullet is affected'], a: 0, why: 'Same duration means the same level exposure, but different slope and curvature exposures.' },
    { k: 'apply', q: 'The middle of the yield curve rises while the short and long ends fall. Which factor is this?', o: ['Curvature', 'Level', 'Slope', 'Credit'], a: 0, why: 'The middle moving against both ends is the curvature factor.' }
  ],
  related: ['fi-term', 'fi-duration']
},

{
  id: 'p-campbell91', type: 'paper', title: 'Yield Spreads and Interest Rate Movements: A Bird\'s Eye View', authors: 'John Y. Campbell and Robert J. Shiller', year: 1991, journal: 'Review of Economic Studies 58(3), 495–514',
  blurb: 'A test of the expectations theory of the term structure: a steep curve forecasts rising short rates, but also falling long yields.',
  level: 'Technical', min: 40, tags: ['term structure', 'expectations theory', 'forecasting'],
  plain: 'The expectations theory says a long-term interest rate is just an average of the short-term rates people expect in the future. That has two testable consequences. Campbell and Shiller tested both. One held: when long rates are high relative to short rates, short rates do tend to rise later. The other failed badly: the same high spread should have predicted long rates <em>rising</em>, but they tended to <em>fall</em>. So the pure expectations theory does not hold.',
  los: [
    'State the two predictions of the expectations theory.',
    'Say which the data supported and which they contradicted.',
    'Explain why this suggests time-varying risk premia.'
  ],
  terms: [
    ['Expectations theory', 'long rates equal the average of expected future short rates'],
    ['Yield spread', 'the difference between a long-term and a short-term rate'],
    ['Risk premium', 'extra return for bearing risk, which may change over time'],
    ['Regression', 'a statistical way to see how well one variable predicts another'],
    ['Overlapping observations', 'data where each period\'s measurement shares time with the next, which can overstate significance']
  ],
  question: 'Does the slope of the yield curve predict future interest rates in the way the expectations theory of the term structure says it should?',
  idea: 'Under the <b>expectations theory</b>, long rates are averages of expected future short rates, so a long rate that is high relative to the short rate (a large spread) signals that short rates are expected to rise. The theory also has a second implication: when the spread is high, the long bond\'s yield should be expected to <em>rise</em> over the next period, so that the long bond\'s capital loss brings its return into line with the short rate. Campbell and Shiller test both implications.',
  method: 'Regressions and vector-autoregression methods on postwar US term-structure data, for combinations of maturities from one month up to ten years. They ask whether spreads forecast (1) the change in short rates over the life of the long bond and (2) the change in the long-term yield over a short horizon.',
  example: '<p>Under the pure theory, if the 1-year rate is 4% and the market expects the 1-year rate next year to be 6%, then the 2-year rate should be about the average: √(1.04 × 1.06) − 1 ≈ <b>5.0%</b>. The spread of 1 point (5% − 4%) tells you short rates are expected to rise. Now the second implication: with a high spread, the long bond\'s yield should be expected to <em>rise</em>, so that a holder of the long bond suffers a capital loss that cancels its higher yield and leaves its return equal to the short rate. In the data, the opposite happened: after high spreads, long yields tended to <em>fall</em>. That means long bonds earned a higher return than short ones, a time-varying premium.</p>',
  findings: 'A high yield spread does forecast rising short-term rates over the long term, as the expectations theory says. But it forecasts a <em>declining</em> long-term yield over the short term, the opposite of the theory. The pattern is inconsistent with the pure expectations theory but consistent with a model in which the spread is proportional to the value the expectations theory would imply.',
  matters: 'It is a foundational study of predictability in bond markets and a major reason the pure expectations theory is considered rejected: forward rates and spreads contain time-varying risk premia. Later work such as Cochrane and Piazzesi (2005) built on this, showing that forward rates predict bond excess returns. Shiller shared the 2013 Nobel Prize.',
  critique: 'Long-horizon regressions with overlapping data can suffer from small-sample bias and overstated significance, so statistical inference needs care. The interpretation (risk premia, over-reaction, or something else) is not settled by the regressions alone. Results depend on the sample period and monetary regime.',
  lookFor: [
    'The two predictions of the expectations theory, and which one the data support.',
    'How the maturities are combined (short rate and long rate pairs) and how large the effects are.',
    'The authors\' interpretation of the pattern.',
    'How overlapping observations are handled in the tests.'
  ],
  quiz: [
    { k: 'calc', gen: () => { const s1 = pick([2, 3, 4, 5]), s2e = s1 + pick([1, 2, 3]); const ans = (Math.sqrt((1 + s1 / 100) * (1 + s2e / 100)) - 1) * 100; return N({ q: `The 1-year rate today is ${s1}% and the market expects the 1-year rate next year to be ${s2e}%. Under the pure expectations theory, what is the 2-year yield today?`, ans, wrong: [s2e, s1, s1 + s2e], fmt: x => pct(x, 3), alt: () => (Math.exp((Math.log(1 + s1 / 100) + Math.log(1 + s2e / 100)) / 2) - 1) * 100, tol: 1e-9, fixed: true, why: `The 2-year yield is the geometric average of the two 1-year rates: √(${1 + s1 / 100} × ${1 + s2e / 100}) − 1 = ${pct(ans, 3)}. A rising path of short rates gives an upward-sloping curve.` }); } },
    { k: 'concept', q: 'What does the expectations theory say a high yield spread signals?', o: ['That short rates are expected to rise', 'That short rates will fall', 'That bonds are illegal', 'That inflation is zero'], a: 0, why: 'A long rate above the short rate means the average expected future short rate is higher.' },
    { k: 'concept', q: 'Which prediction did Campbell and Shiller find the data contradicted?', o: ['That a high spread predicts rising long-term yields over a short horizon', 'That spreads predict short rates', 'That yields exist', 'That bonds pay coupons'], a: 0, why: 'In the data, a high spread was followed by falling long yields, the opposite of the theory.' },
    { k: 'concept', q: 'What do the results suggest about risk premia?', o: ['They vary over time', 'They are always zero', 'They are constant', 'They do not exist'], a: 0, why: 'Predictable excess returns on long bonds imply time-varying risk premia.' },
    { k: 'concept', q: 'What is a statistical concern with the long-horizon regressions?', o: ['Overlapping data can overstate significance', 'There is no data', 'They use too few years', 'Rates are unobservable'], a: 0, why: 'Overlapping observations are not independent, so standard errors may be too small.' },
    { k: 'apply', q: 'A spread is very high. According to the pure expectations theory, what should happen to the long bond\'s yield over the next month?', o: ['It should rise, so the long bond\'s return matches the short rate', 'It should fall', 'It should not change', 'It should reach zero'], a: 0, why: 'A rising yield means a capital loss on the long bond that offsets its higher yield.' },
    { k: 'apply', q: 'After a very steep curve, long yields tended to fall. What does this imply for holders of long bonds?', o: ['They earned higher returns than the theory predicts, suggesting a time-varying risk premium', 'They lost money', 'They earned the short rate exactly', 'Nothing can be said'], a: 0, why: 'Falling yields mean price gains on top of the high yield.' },
    { k: 'concept', q: 'Which later work built on Campbell and Shiller by showing that forward rates predict bond excess returns?', o: ['Cochrane and Piazzesi (2005)', 'Merton (1974)', 'Akerlof (1970)', 'Markowitz (1952)'], a: 0, why: 'Cochrane and Piazzesi found that a combination of forward rates predicts excess returns, so risk premia vary over time.' }
  ],
  related: ['fi-term', 'rates', 'p-shiller']
},

{
  id: 'p-estrella98', type: 'paper', title: 'Predicting U.S. Recessions: Financial Variables as Leading Indicators', authors: 'Arturo Estrella and Frederic S. Mishkin', year: 1998, journal: 'Review of Economics and Statistics 80(1), 45–61',
  blurb: 'The evidence behind the idea that an inverted yield curve warns of recession.',
  level: 'Moderate', min: 30, tags: ['yield curve', 'recessions', 'forecasting'],
  plain: 'When short-term interest rates are higher than long-term ones (an "inverted" yield curve), people say a recession may be coming. Estrella and Mishkin tested that claim against other indicators such as stock prices and economic data. For forecasts more than a quarter ahead, the gap between long and short interest rates was the single best predictor of US recessions, and it worked better alone than mixed with the others.',
  los: [
    'Explain why the slope of the yield curve might predict recessions.',
    'Describe the probit approach and why out-of-sample testing matters.',
    'Say when other variables (stock prices) are useful and what the main caveats are.'
  ],
  terms: [
    ['Yield curve slope (term spread)', 'the long-term rate minus the short-term rate'],
    ['Inverted curve', 'short rates above long rates'],
    ['Recession', 'here, a period dated as a recession by the NBER'],
    ['Probit model', 'a statistical model for a yes/no outcome, giving a probability'],
    ['Out-of-sample', 'tested on data not used to build the model']
  ],
  question: 'Which financial variables best predict whether the US economy will be in recession a few quarters from now?',
  idea: 'Financial markets look forward. The <b>slope of the yield curve</b> (the gap between long-term and short-term rates) reflects expectations about future monetary policy and growth, and an inverted curve (short rates above long rates) signals that markets expect policy easing because activity is slowing.',
  method: 'They estimate <b>probit models</b> (a statistical model for a yes/no outcome) that predict whether the economy will be in a recession, as dated by the NBER, one to eight quarters ahead. They compare interest rates and spreads, stock prices, monetary aggregates and standard macroeconomic indicators, individually and in combination, focusing on <b>out-of-sample</b> performance.',
  example: '<p>The spread is simple to compute. If the 10-year Treasury yields 3.6% and the 3-month bill yields 4.4%, the spread is 3.6% − 4.4% = <b>−0.8 points</b>: the curve is inverted. Normally the long rate is higher than the short rate because lenders want compensation for locking money up. An inversion says markets expect short rates to fall later, usually because they expect a weaker economy. The model converts the spread into a probability of a recession several quarters ahead.</p>',
  findings: 'Stock prices are useful for forecasts one to three quarters ahead, as are some macroeconomic indicators. Beyond one quarter, the slope of the yield curve is the clear best individual predictor, and it typically does better alone out of sample than combined with other variables.',
  matters: 'It made the yield-curve spread one of the most widely used recession indicators, including in published recession-probability estimates by central banks. It also gave macro forecasters a simple, transparent model.',
  critique: 'There have been only a handful of recessions in the sample, so estimates are uncertain. The relationship is not a law: it can give false alarms and can weaken when policy or term premia change (for example when central banks buy long bonds or interest rates sit near zero). An inverted curve reflects expectations and policy, not a cause of recessions.',
  lookFor: [
    'How a recession is defined and how the forecast horizon is set.',
    'The difference between in-sample fit and out-of-sample performance, and why it matters.',
    'How the spread is defined (which long and short rates).',
    'The comparison of the term spread with stock prices and other indicators at different horizons.'
  ],
  quiz: [
    { k: 'calc', gen: () => { const L = pick([3.2, 3.6, 4.0, 4.5]), S = pick([2.5, 3.5, 4.4, 5.0]); const ans = L - S; return N({ q: `The 10-year yield is ${L}% and the 3-month bill yields ${S}%. What is the term spread (long minus short)?`, ans, wrong: [S - L, L + S, L / S], fmt: x => num(x, 2) + ' pts', alt: () => -(S - L), tol: 1e-9, fixed: true, why: `Term spread = long − short = ${L} − ${S} = ${num(ans, 2)} points. ${ans < 0 ? 'Negative: the curve is inverted, historically a recession warning.' : 'Positive: a normal upward-sloping curve.'}` }); } },
    { k: 'concept', q: 'What is an inverted yield curve?', o: ['Short-term rates above long-term rates', 'Long rates above short rates', 'All rates equal', 'Rates of zero'], a: 0, why: 'The curve slopes downward.' },
    { k: 'concept', q: 'What did the paper find about the yield-curve slope as a recession predictor beyond one quarter?', o: ['It was the clear best individual predictor', 'It was useless', 'Stock prices were always better', 'Only monetary aggregates mattered'], a: 0, why: 'At longer horizons, the term spread beat the other individual variables.' },
    { k: 'concept', q: 'Which variables did the paper find useful over one to three quarters?', o: ['Stock prices and some macro indicators', 'Only the yield curve', 'Only exchange rates', 'Nothing'], a: 0, why: 'Stock prices help at short horizons; the curve wins at longer ones.' },
    { k: 'concept', q: 'What is out-of-sample testing?', o: ['Testing on data not used to build the model', 'Testing with fewer variables', 'Using older data only', 'Ignoring recessions'], a: 0, why: 'It is a fairer test because the model was not fitted to those data.' },
    { k: 'concept', q: 'What is a key caveat about the yield-curve indicator?', o: ['It has given false alarms and can weaken when policy or term premia change', 'It is perfect', 'It causes recessions', 'It is illegal to use'], a: 0, why: 'There are few recessions in the sample, and an inverted curve reflects expectations and policy, not causation.' },
    { k: 'apply', q: 'The yield curve inverts. What does that most likely reflect?', o: ['Markets expect policy easing because activity is slowing', 'Markets expect faster growth', 'Inflation is zero', 'Banks are closed'], a: 0, why: 'The curve reflects expectations about future short rates and growth.' },
    { k: 'apply', q: 'A forecaster says: "An inverted curve causes recessions." What is the best reply?', o: ['It is a signal of market expectations, not a cause', 'You are right', 'Recessions cause nothing', 'Curves are random'], a: 0, why: 'The paper\'s critiques stress that the curve reflects expectations and policy, not a cause.' }
  ],
  related: ['rates', 'fi-term']
},

{
  id: 'p-merton74', type: 'paper', title: 'On the Pricing of Corporate Debt: The Risk Structure of Interest Rates', authors: 'Robert C. Merton', year: 1974, journal: 'Journal of Finance 29(2), 449–470',
  blurb: 'Applies option-pricing logic to a firm\'s debt: equity is a call option on the firm\'s assets and risky debt is safe debt minus a put.',
  level: 'Technical', min: 45, tags: ['credit risk', 'structural model', 'options'],
  plain: 'Merton had a striking idea: a company\'s shares behave like a call option on the company\'s assets. When the debt is due, shareholders keep whatever is left after paying lenders, and if the assets are worth less than the debt they can simply walk away (limited liability). That means lenders effectively hold a safe bond <em>minus</em> a put option, and risky debt can be priced with options theory. The riskier or more indebted the firm, the wider the credit spread.',
  los: [
    'Explain why equity is like a call option on a firm\'s assets.',
    'Describe the payoffs to shareholders and bondholders at maturity.',
    'Say what drives the credit spread in the model, and name its main limitations.'
  ],
  terms: [
    ['Limited liability', 'shareholders can lose no more than they invested'],
    ['Call / put option', 'a right to buy / a right to sell at a fixed price'],
    ['Structural model', 'a credit model where default depends on the firm\'s asset value versus its debt'],
    ['Credit spread', 'the extra yield on risky debt over safe debt'],
    ['Distance to default', 'how far the firm\'s asset value is above its debt, in units of volatility']
  ],
  question: 'How should a bond that might default be priced, and what determines the gap between its yield and the yield on a safe bond (the "risk structure of interest rates")?',
  idea: 'Treat the firm\'s assets as the underlying asset. At the debt\'s maturity, shareholders keep whatever is left after paying bondholders, but they are protected by limited liability: if assets are worth less than the debt, they walk away. So <b>equity is a call option on the firm\'s assets</b>, struck at the face value of debt. Bondholders therefore hold a risk-free bond <b>minus</b> a put option on the firm\'s assets: they lose money if assets fall below the debt.',
  method: 'Theory that extends the <a href="#/lesson/p-bs73">Black–Scholes</a> approach. For a firm with one issue of zero-coupon debt and asset value that follows a lognormal process, Merton derives the value of the debt, the yield it should offer, and how that yield depends on the debt ratio, asset volatility, the risk-free rate and the time to maturity.',
  example: '<p>A firm owes $100 at maturity. If its assets are worth <b>$130</b>: bondholders get their $100 and shareholders keep $30 (equity payoff = max(130 − 100, 0)). If assets are worth <b>$70</b>: the firm cannot pay in full, shareholders get $0 and walk away, and bondholders take all $70 (a loss of $30). The bondholders\' payoff is min(assets, $100). That is exactly a risk-free $100 bond minus a put option worth max(100 − assets, 0). Shareholders\' payoff, zero below $100 and rising one-for-one above, is a call option\'s shape.</p>',
  findings: 'A closed-form price for risky debt. The credit spread rises with the firm\'s <b>leverage</b> (debt relative to asset value) and with the volatility of its assets, and its dependence on maturity varies with the firm\'s leverage and risk. This shows that credit risk and option value are two sides of the same coin.',
  matters: 'It founded <b>structural credit models</b>, in which default is driven by the firm\'s asset value versus its debt, and it underlies practical tools such as <b>distance-to-default</b> measures used by credit analysts and vendors. It also gave a unified view of equity and debt, tying corporate finance to <a href="#/lesson/options">options</a>. Merton shared the 1997 Nobel Prize with Myron Scholes.',
  critique: 'The simple model allows default only at maturity, assumes a single zero-coupon debt issue, and requires the unobservable value and volatility of the firm\'s assets. Empirical work, such as Eom, Helwege and Huang (2004), finds that structural models mis-price bonds and that the original Merton model tends to underpredict spreads for some firms. Later models let default occur earlier (for example Black and Cox, 1976) and add more realistic capital structures.',
  lookFor: [
    'The payoff to bondholders and to shareholders at maturity: draw them and see the put and call shapes.',
    'How the debt\'s yield is expressed in terms of the debt ratio and asset volatility.',
    'The assumptions that make the Black–Scholes logic applicable to a firm.',
    'How the paper describes the "risk structure of interest rates" as distinct from the term structure.'
  ],
  quiz: [
    { k: 'calc', gen: () => { const D = pick([80, 100, 150]), V = pick([50, 90, 110, 130, 180]); const ans = Math.max(V - D, 0); return N({ q: `A firm owes $${D} at maturity and its assets are worth $${V}. What do the shareholders receive?`, ans, wrong: [V, D, Math.abs(V - D) + 5], fmt: x => usd(x, 0), alt: () => V - Math.min(V, D), tol: 1e-9, fixed: true, why: V > D ? `Bondholders are paid $${D} first; shareholders keep $${V} − $${D} = $${V - D}. That is a call payoff: max(V − D, 0).` : `Assets ($${V}) are below the debt ($${D}). Bondholders take everything and shareholders walk away with $0. Limited liability means the payoff cannot be negative.` }); } },
    { k: 'calc', gen: () => { const D = pick([80, 100, 150]), V = pick([50, 90, 110, 130, 180]); const ans = Math.min(V, D); return N({ q: `A firm owes $${D} at maturity and its assets are worth $${V}. What do the bondholders receive?`, ans, wrong: [V - D, D + V, Math.max(V, D)], fmt: x => usd(x, 0), alt: () => D - Math.max(D - V, 0), tol: 1e-9, fixed: true, why: `Bondholders receive the smaller of the assets and the debt owed: min($${V}, $${D}) = $${ans}. Equivalently: a risk-free $${D} bond minus a put worth max($${D} − $${V}, 0) = $${Math.max(D - V, 0)}.` }); } },
    { k: 'concept', q: 'In Merton\'s model, a firm\'s equity is like...', o: ['A call option on the firm\'s assets', 'A put option on debt', 'A risk-free bond', 'A dividend'], a: 0, why: 'Shareholders keep what is left above the debt owed, which is a call payoff with the debt as the strike.' },
    { k: 'concept', q: 'What do bondholders effectively hold?', o: ['A risk-free bond minus a put option on the firm\'s assets', 'A call option', 'A share of profits', 'Nothing'], a: 0, why: 'They lose if assets fall below the debt, like being short a put.' },
    { k: 'concept', q: 'How does the credit spread depend on leverage and asset volatility in the model?', o: ['It rises with both', 'It falls with both', 'It is unaffected', 'It depends only on the coupon'], a: 0, why: 'More debt relative to assets, or more volatile assets, raises the chance assets fall below the debt.' },
    { k: 'concept', q: 'What practical tool grew out of Merton\'s model?', o: ['Distance-to-default measures', 'Beta', 'The Sharpe ratio', 'Coupon rates'], a: 0, why: 'They measure how far assets are above debt in units of volatility.' },
    { k: 'apply', q: 'A firm\'s asset value is only slightly above its debt and its assets are very volatile. What does the model say about its credit spread?', o: ['It is wide: default is likely', 'It is narrow', 'It is zero', 'It cannot be computed'], a: 0, why: 'High leverage and high asset volatility both widen the spread.' },
    { k: 'apply', q: 'Why might the original Merton model underpredict spreads for some firms?', o: ['Default is allowed only at maturity, there is a single debt issue, and the assets\' value and volatility must be estimated', 'It ignores all debt', 'It uses no data', 'It assumes zero risk'], a: 0, why: 'The critiques point to these simplifications, and later models relax them.' }
  ],
  related: ['fi-credit', 'options', 'p-bs73', 'fsa-credit']
},

{
  id: 'p-elton01', type: 'paper', title: 'Explaining the Rate Spread on Corporate Bonds', authors: 'Edwin J. Elton, Martin J. Gruber, Deepak Agrawal and Christopher Mann', year: 2001, journal: 'Journal of Finance 56(1), 247–277',
  blurb: 'Expected default losses explain only a small share of the extra yield on corporate bonds; taxes and risk premiums do much of the work.',
  level: 'Moderate', min: 30, tags: ['credit spreads', 'default', 'taxes'],
  plain: 'Corporate bonds yield more than government bonds. The obvious explanation is that companies sometimes fail to pay. Elton and his co-authors added up how much money investors <em>actually expect to lose</em> from defaults and found it explains only a small part of the extra yield. Much of the rest comes from a tax difference (government bond interest is exempt from state income tax) and the rest looks like a reward for risk that moves with the market, just as for stocks.',
  los: [
    'List the three components Elton et al. use to explain the spread.',
    'Say which component turned out to be surprisingly small.',
    'Explain why "spread" and "expected loss" are different things.'
  ],
  terms: [
    ['Credit spread', 'the extra yield on a corporate bond over a comparable Treasury'],
    ['Expected default loss', 'the average loss from defaults after allowing for recoveries'],
    ['Systematic risk', 'risk that moves with the overall market and cannot be diversified away'],
    ['Credit default swap', 'a contract that pays if a borrower defaults; its price gives a measure of default risk'],
    ['Illiquidity', 'difficulty selling without a price concession']
  ],
  question: 'Why do corporate bonds yield so much more than Treasuries? How much of the spread is compensation for the chance of default?',
  idea: 'Break the spread into components: (1) the loss investors <b>expect</b> from defaults, (2) the extra return required because corporate bond interest is subject to <b>state income tax</b> while Treasury interest is not, and (3) compensation for <b>systematic risk</b> in corporate bond returns, that is, the risk that correlates with the overall market and is not diversifiable.',
  method: 'They estimate expected default losses using historical default and recovery data by rating and maturity, estimate the tax effect from the tax treatment of the two types of bonds, and relate the remaining spread to the factors used to explain risk premia on stocks (such as the Fama–French factors).',
  example: '<p>Here is an <em>illustrative</em> breakdown (these numbers are made up to show the idea, not taken from the paper). Suppose a corporate bond yields 150 basis points more than a Treasury. If expected default losses account for 25 bp and the state-tax effect for 60 bp, the remaining <b>65 bp</b> (150 − 25 − 60) is compensation for risk that co-moves with the market. The surprise in the paper is how small the first piece is compared with the total spread.</p>',
  findings: 'Expected default accounts for a surprisingly small fraction of the premium in corporate rates over Treasuries. State taxes explain a substantial portion. The rest of the spread is closely related to the factors that commonly explain risk premiums in stock returns.',
  matters: 'It is a cornerstone of the "credit spread puzzle" literature and a warning that spread is not the same as expected loss. It links bond pricing to the asset-pricing factors in <a href="#/lesson/p-ff93">Fama–French</a>.',
  critique: 'The findings depend on the measurement of expected default and of the risk-free benchmark. Longstaff, Mithal and Neis (2005), using credit default swap prices, conclude that the majority of the spread is due to default risk, with the remainder related to illiquidity. Huang and Huang (2012) find credit risk explains a larger share of spreads for lower-rated bonds. The split therefore varies with method, rating and period.',
  lookFor: [
    'The three components of the spread and how each is measured.',
    'How the authors estimate expected default losses and recovery.',
    'How the tax argument works, and how large it is at different maturities and ratings.',
    'Which risk factors explain the remaining spread.'
  ],
  quiz: [
    { k: 'calc', gen: () => { const S = pick([120, 150, 200, 260]), E = pick([20, 30, 40]), T = pick([40, 60, 80]); const ans = S - E - T; return N({ q: `(Illustrative numbers.) A corporate bond's spread over a Treasury is ${S} bp. Expected default losses account for ${E} bp and the state-tax effect for ${T} bp. How much is left as compensation for systematic risk?`, ans, wrong: [E + T, S - E, S - T], fmt: x => num(x, 0) + ' bp', alt: () => S - (E + T), tol: 1e-9, fixed: true, why: `${S} − ${E} − ${T} = ${ans} bp remains, to be explained by risk premia. In the actual paper expected default was a surprisingly small piece.` }); } },
    { k: 'concept', q: 'What was surprising about the size of expected default losses?', o: ['They explained only a small fraction of the corporate spread', 'They explained all of it', 'They were negative', 'They were bigger than the whole spread'], a: 0, why: 'The paper finds expected default accounts for a small share of the premium over Treasuries.' },
    { k: 'concept', q: 'Why do state taxes affect the spread?', o: ['Treasury interest is exempt from state income tax, but corporate interest is not', 'Corporate bonds are tax-free', 'Treasuries are taxed more', 'Taxes do not apply to bonds'], a: 0, why: 'A taxable corporate bond must yield more to give the same after-tax return.' },
    { k: 'concept', q: 'Which stock-market factors help explain the rest of the spread?', o: ['The Fama–French-type risk factors', 'Dividends', 'Splits', 'Coupons'], a: 0, why: 'The remaining spread is related to the factors that explain risk premia in stocks.' },
    { k: 'concept', q: 'What do Longstaff, Mithal and Neis (2005) conclude using credit default swaps?', o: ['Default risk explains most of the spread, with illiquidity the rest', 'Default risk explains none of it', 'Taxes explain all', 'Spreads are random'], a: 0, why: 'Their method produced a different split, showing it depends on method and period.' },
    { k: 'concept', q: 'Is spread the same as expected loss?', o: ['No: spread also pays for risk, taxes and illiquidity', 'Yes, always', 'Only for junk bonds', 'Only for Treasuries'], a: 0, why: 'Everyone agrees that spread does not equal expected loss.' },
    { k: 'apply', q: 'A bond has a 200 bp spread and an expected default loss of 50 bp. What can you say?', o: ['The rest is compensation for other things: risk, taxes, illiquidity', 'The bond will lose 200 bp', 'The bond is riskless', 'The spread is a mistake'], a: 0, why: 'The gap between spread and expected loss is what the paper sets out to explain.' },
    { k: 'apply', q: 'Huang and Huang (2012) find credit risk explains a larger share of spreads for which bonds?', o: ['Lower-rated bonds', 'Treasuries', 'AAA bonds only', 'None'], a: 0, why: 'The default share of the spread varies with rating, method and period.' }
  ],
  related: ['fi-credit', 'p-merton74', 'p-ff93']
}

  );
})();
