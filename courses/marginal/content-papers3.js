/* Fixed income paper breakdowns. Own-words summaries; read the originals. */
window.LESSONS = window.LESSONS || [];
window.LESSONS.push(

{
  id: 'p-fisherweil71', type: 'paper', title: 'Coping with the Risk of Interest-Rate Fluctuations: Returns to Bondholders from Naive and Optimal Strategies',
  authors: 'Lawrence Fisher and Roman L. Weil', year: 1971, journal: 'Journal of Business 44(4), 408–431',
  blurb: 'The paper that showed how to protect a bond portfolio\'s target return from interest-rate changes by matching duration to the investment horizon.',
  level: 'Moderate', min: 30, tags: ['immunization', 'duration'],
  question: 'A bondholder needs a known amount at a known future date. How should they choose bonds so that the outcome doesn\'t depend on what happens to interest rates in the meantime?',
  idea: 'The obvious approach is to buy a bond that matures on the target date, but if it pays coupons, those coupons must be reinvested at unknown future rates. Fisher and Weil show that if the portfolio\'s <b>duration</b> (the weighted-average time to receive its cash flows) equals the length of the planning period, the loss in bond prices from a rate rise is offset by the higher return on reinvested coupons. The portfolio is then <b>immunized</b>: the investor realizes at least the return expected at purchase.',
  method: 'Theory plus empirical simulation. They derive the duration that immunizes a portfolio of default-free bonds against an additive shift in the term structure (a change that adds the same amount to every forward rate), and then compare the outcomes of naive strategies with duration-matched strategies using historical bond data.',
  findings: 'A portfolio whose duration equals the investment horizon is protected against a one-time, parallel shift in the yield curve: the realized return is at least the promised return at purchase. Simple strategies such as buying a bond that matures at the horizon do not deliver the promised return reliably, because of reinvestment risk.',
  matters: 'It introduced immunization as an asset-management strategy and underpins <b>liability-driven investing</b> at pension funds and insurers. It built on the actuary F. M. Redington\'s (1952) earlier work and put the idea on firm footing for a single liability.',
  critique: 'The result holds for specific kinds of curve movement (parallel, one-time shifts), so twists and curvature changes can still produce errors; later work developed multi-factor and stochastic-process versions. The portfolio must be rebalanced as time passes and yields change, because duration drifts. It assumes default-free, non-callable bonds and ignores transaction costs.',
  lookFor: [
    'How the authors define the type of interest-rate change (the "additive shift") they protect against.',
    'Why a bond maturing at the horizon isn\'t the safe choice they call "naive".',
    'The role of the reinvestment of coupons in the argument.',
    'What assumptions would break immunization, and how the empirical tests handle them.'
  ],
  quiz: [
    { q: 'According to Fisher and Weil, a portfolio is immunized against a one-time parallel shift when its duration equals...',
      o: ['Zero', 'The length of the investment horizon', 'The average coupon rate', 'The bonds\' maturity'], a: 1, why: 'Matching duration to the horizon balances price risk and reinvestment risk.' },
    { q: 'Why can a coupon bond maturing exactly at the horizon fail to lock in the expected return?',
      o: ['Coupons must be reinvested at unknown rates', 'It has no default risk', 'Its price is fixed', 'It is not taxable'], a: 0, why: 'Reinvestment risk means the realized return depends on future rates.' },
    { q: 'Which is a limitation of immunization?',
      o: ['It works for any shape of curve movement', 'It needs periodic rebalancing and only protects against certain rate shifts', 'It removes credit risk', 'It requires zero-coupon bonds only'], a: 1, why: 'Duration drifts over time, and nonparallel moves can still cause errors.' }
  ],
  related: ['fi-immun', 'fi-duration']
},

{
  id: 'p-litterman91', type: 'paper', title: 'Common Factors Affecting Bond Returns',
  authors: 'Robert Litterman and José Scheinkman', year: 1991, journal: 'Journal of Fixed Income 1(1), 54–61',
  blurb: 'Showed that almost all movements in the Treasury yield curve can be described by three factors: level, slope and curvature.',
  level: 'Accessible', min: 20, tags: ['term structure', 'risk factors', 'principal components'],
  question: 'Treasury bonds of many maturities move around every day. How many independent sources of risk actually drive their returns?',
  idea: 'Bond returns are highly correlated across maturities, so the risk is much simpler than the number of bonds suggests. Using <b>principal component analysis</b> (a statistical method that finds the main patterns in a set of co-moving variables), they find that a few patterns account for most variation. The first, largest pattern is a parallel <b>level</b> shift of the whole curve; the second is a <b>steepness</b> (slope) change in which short and long rates move in opposite directions; the third is a <b>curvature</b> change in which the middle of the curve moves against both ends.',
  method: 'Statistical analysis of the covariance of Treasury returns across maturities. They extract the principal components and interpret their shapes, then examine how much of the total variation each accounts for and how much of a bond\'s or portfolio\'s return can be explained by them.',
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
    { q: 'Which are the three factors identified by Litterman and Scheinkman?',
      o: ['Level, steepness and curvature', 'Inflation, growth and credit', 'Coupon, maturity and price', 'Duration, convexity and yield'], a: 0, why: 'They correspond to parallel shifts, twists and butterfly movements of the yield curve.' },
    { q: 'Which factor accounts for the largest share of yield-curve movements?',
      o: ['Level', 'Steepness', 'Curvature', 'All equally'], a: 0, why: 'Parallel shifts of the whole curve dominate.' },
    { q: 'What method did they use to find the factors?',
      o: ['Principal component analysis', 'An event study', 'Options pricing', 'A survey of traders'], a: 0, why: 'It extracts the main patterns of co-movement from the covariance matrix of returns.' }
  ],
  related: ['fi-term', 'fi-duration']
},

{
  id: 'p-campbell91', type: 'paper', title: 'Yield Spreads and Interest Rate Movements: A Bird\'s Eye View',
  authors: 'John Y. Campbell and Robert J. Shiller', year: 1991, journal: 'Review of Economic Studies 58(3), 495–514',
  blurb: 'A test of the expectations theory of the term structure: a steep curve forecasts rising short rates, but also falling long yields.',
  level: 'Technical', min: 40, tags: ['term structure', 'expectations theory', 'forecasting'],
  question: 'Does the slope of the yield curve predict future interest rates in the way the expectations theory of the term structure says it should?',
  idea: 'Under the <b>expectations theory</b>, long rates are averages of expected future short rates, so a long rate that is high relative to the short rate (a large spread) signals that short rates are expected to rise. The theory also has a second implication: when the spread is high, the long bond\'s yield should be expected to <em>rise</em> over the next period, so that the long bond\'s capital loss brings its return into line with the short rate. Campbell and Shiller test both implications.',
  method: 'Regressions and vector-autoregression methods on postwar US term-structure data, for combinations of maturities from one month up to ten years. They ask whether spreads forecast (1) the change in short rates over the life of the long bond and (2) the change in the long-term yield over a short horizon.',
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
    { q: 'What does the expectations theory say a high spread between long and short rates signals?',
      o: ['That short rates are expected to rise', 'That short rates are expected to fall', 'That inflation is zero', 'That bonds are mispriced'], a: 0, why: 'Long rates are averages of expected future short rates.' },
    { q: 'What did Campbell and Shiller find about the long-term yield after a high spread?',
      o: ['It tends to rise, as the theory says', 'It tends to fall, the opposite of the theory', 'It does not change', 'It becomes negative'], a: 1, why: 'A high spread forecast a declining long yield over the short term, contradicting the theory.' },
    { q: 'What does this evidence suggest about forward rates?',
      o: ['They are perfect forecasts of future rates', 'They contain time-varying risk premia', 'They are always zero', 'They are irrelevant'], a: 1, why: 'The pure expectations theory fails, so premia must vary.' }
  ],
  related: ['fi-term', 'rates', 'p-shiller']
},

{
  id: 'p-estrella98', type: 'paper', title: 'Predicting U.S. Recessions: Financial Variables as Leading Indicators',
  authors: 'Arturo Estrella and Frederic S. Mishkin', year: 1998, journal: 'Review of Economics and Statistics 80(1), 45–61',
  blurb: 'The evidence behind the idea that an inverted yield curve warns of recession.',
  level: 'Moderate', min: 30, tags: ['yield curve', 'recessions', 'forecasting'],
  question: 'Which financial variables best predict whether the US economy will be in recession a few quarters from now?',
  idea: 'Financial markets look forward. The <b>slope of the yield curve</b> (the gap between long-term and short-term rates) reflects expectations about future monetary policy and growth, and an inverted curve (short rates above long rates) signals that markets expect policy easing because activity is slowing.',
  method: 'They estimate <b>probit models</b> (a statistical model for a yes/no outcome) that predict whether the economy will be in a recession, as dated by the NBER, one to eight quarters ahead. They compare interest rates and spreads, stock prices, monetary aggregates and standard macroeconomic indicators, individually and in combination, focusing on <b>out-of-sample</b> performance.',
  findings: 'Stock prices are useful for forecasts one to three quarters ahead, as are some macroeconomic indicators. Beyond one quarter, the slope of the yield curve is the clear best individual predictor, and it typically does better alone out of sample than combined with other variables.',
  matters: 'It made the yield-curve spread one of the most widely used recession indicators, including in published recession-probability estimates by central banks. It also gave macro forecasters a simple, transparent model.',
  critique: 'There have been only a handful of recessions in the sample, so estimates are uncertain. The relationship isn\'t a law: it can give false alarms and can weaken when policy or term premia change (for example when central banks buy long bonds or interest rates sit near zero). An inverted curve reflects expectations and policy, not a cause of recessions.',
  lookFor: [
    'How a recession is defined and how the forecast horizon is set.',
    'The difference between in-sample fit and out-of-sample performance, and why it matters.',
    'How the spread is defined (which long and short rates).',
    'The comparison of the term spread with stock prices and other indicators at different horizons.'
  ],
  quiz: [
    { q: 'Which variable performed best individually beyond a one-quarter horizon?',
      o: ['Stock prices', 'The slope of the yield curve', 'Money supply', 'Oil prices'], a: 1, why: 'The term spread was the clear individual choice at longer horizons.' },
    { q: 'What does an inverted yield curve mean?',
      o: ['Short rates are above long rates', 'Long rates are above short rates', 'All rates are equal', 'Rates are negative'], a: 0, why: 'The curve slopes downward.' },
    { q: 'Why is out-of-sample performance emphasized?',
      o: ['It shows the model works on data it was not fitted to', 'It uses more variables', 'It is easier to compute', 'It is required by the NBER'], a: 0, why: 'In-sample fit can overstate forecasting ability.' }
  ],
  related: ['rates', 'fi-term']
},

{
  id: 'p-merton74', type: 'paper', title: 'On the Pricing of Corporate Debt: The Risk Structure of Interest Rates',
  authors: 'Robert C. Merton', year: 1974, journal: 'Journal of Finance 29(2), 449–470',
  blurb: 'Applies option-pricing logic to a firm\'s debt: equity is a call option on the firm\'s assets and risky debt is safe debt minus a put.',
  level: 'Technical', min: 45, tags: ['credit risk', 'structural model', 'options'],
  question: 'How should a bond that might default be priced, and what determines the gap between its yield and the yield on a safe bond (the "risk structure of interest rates")?',
  idea: 'Treat the firm\'s assets as the underlying asset. At the debt\'s maturity, shareholders keep whatever is left after paying bondholders, but they are protected by limited liability: if assets are worth less than the debt, they walk away. So <b>equity is a call option on the firm\'s assets</b>, struck at the face value of debt. Bondholders therefore hold a risk-free bond <b>minus</b> a put option on the firm\'s assets: they lose money if assets fall below the debt.',
  method: 'Theory that extends the <a href="#/lesson/p-bs73">Black–Scholes</a> approach. For a firm with one issue of zero-coupon debt and asset value that follows a lognormal process, Merton derives the value of the debt, the yield it should offer, and how that yield depends on the debt ratio, asset volatility, the risk-free rate and the time to maturity.',
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
    { q: 'In Merton\'s model, a firm\'s equity is equivalent to...',
      o: ['A call option on the firm\'s assets', 'A put option on the firm\'s assets', 'A risk-free bond', 'A forward contract'], a: 0, why: 'Shareholders have the right to the assets' + ' above the debt, with limited liability below.' },
    { q: 'Risky corporate debt equals...',
      o: ['A risk-free bond minus a put option on the firm\'s assets', 'A risk-free bond plus a call option', 'Equity plus cash', 'A put on the risk-free rate'], a: 0, why: 'Bondholders are effectively short a put to shareholders.' },
    { q: 'In the model, what happens to the credit spread when leverage or asset volatility increases?',
      o: ['It rises', 'It falls', 'It is unchanged', 'It becomes negative'], a: 0, why: 'A higher chance that assets fall below the debt makes default more likely.' }
  ],
  related: ['fi-credit', 'options', 'p-bs73', 'fsa-credit']
},

{
  id: 'p-elton01', type: 'paper', title: 'Explaining the Rate Spread on Corporate Bonds',
  authors: 'Edwin J. Elton, Martin J. Gruber, Deepak Agrawal and Christopher Mann', year: 2001, journal: 'Journal of Finance 56(1), 247–277',
  blurb: 'Expected default losses explain only a small share of the extra yield on corporate bonds; taxes and risk premiums do much of the work.',
  level: 'Moderate', min: 30, tags: ['credit spreads', 'default', 'taxes'],
  question: 'Why do corporate bonds yield so much more than Treasuries? How much of the spread is compensation for the chance of default?',
  idea: 'Break the spread into components: (1) the loss investors <b>expect</b> from defaults, (2) the extra return required because corporate bond interest is subject to <b>state income tax</b> while Treasury interest is not, and (3) compensation for <b>systematic risk</b> in corporate bond returns, that is, the risk that correlates with the overall market and is not diversifiable.',
  method: 'They estimate expected default losses using historical default and recovery data by rating and maturity, estimate the tax effect from the tax treatment of the two types of bonds, and relate the remaining spread to the factors used to explain risk premia on stocks (such as the Fama–French factors).',
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
    { q: 'Which of these is NOT one of the three components of the corporate spread in this paper?',
      o: ['Expected default loss', 'State taxes', 'Compensation for systematic risk', 'The CEO\'s salary'], a: 3, why: 'The three components are expected default, taxes and systematic risk.' },
    { q: 'What is the surprising finding about expected default?',
      o: ['It explains only a small fraction of the spread', 'It explains all of the spread', 'It is negative', 'It is zero for junk bonds'], a: 0, why: 'Most of the spread is not compensation for expected default losses.' },
    { q: 'Why might a corporate bond need a higher yield than a Treasury for tax reasons?',
      o: ['Corporate interest is subject to state tax while Treasury interest is not', 'Treasuries pay no interest', 'Corporate bonds are tax-free', 'Treasuries are taxed twice'], a: 0, why: 'Investors need a higher pre-tax yield to compensate for state taxes.' }
  ],
  related: ['fi-credit', 'p-merton74', 'p-ff93']
}

);
