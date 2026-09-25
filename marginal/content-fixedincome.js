/* Fixed income concept lessons. Worked examples were recomputed independently (see the audit notes in the project). */
window.LESSONS = window.LESSONS || [];
window.LESSONS.push(

{
  id: 'fi-basics', type: 'concept', title: 'Bond basics: cash flows, prices and the bond market',
  blurb: 'What a bond is, who issues them, and how a bond\'s price is just the present value of its promised payments.',
  level: 'Foundations', min: 18, tags: ['bonds', 'pricing', 'fixed income'], widget: 'bondprice',
  body: `
<p>A <b>bond</b> is a loan that can be traded. You lend money to an issuer (a government or a company). In return the issuer promises regular interest payments and to give back the borrowed amount on a fixed date. Because those payments are fixed by contract, bonds are called <b>fixed income</b> securities. This lesson builds on the <a href="#/lesson/tvm">time value of money</a>: a bond is worth the present value of what it promises.</p>

<h2>The vocabulary</h2>
<dl class="defs">
  <dt>Face value (par)</dt><dd>The amount repaid at maturity, usually $1,000 per bond. Prices are often quoted per 100 of face value: a price of 98.5 means 98.5% of face.</dd>
  <dt>Coupon rate</dt><dd>The yearly interest as a percentage of face value. In the US, coupons are usually paid twice a year, so a 5% coupon on $1,000 pays $25 every six months.</dd>
  <dt>Maturity</dt><dd>The date the face value is repaid.</dd>
  <dt>Yield to maturity (YTM)</dt><dd>The single yearly discount rate that makes the bond's promised payments worth exactly its market price. It is the bond's "market interest rate". (More in the <a href="#/lesson/fi-yield">yield lesson</a>.)</dd>
</dl>

<h2>Who issues bonds</h2>
<ul>
  <li><b>Governments.</b> US Treasury <em>bills</em> (one year or less, no coupon, sold at a discount), <em>notes</em> (2 to 10 years) and <em>bonds</em> (20 to 30 years). Treasuries are treated as having no default risk in most models.</li>
  <li><b>Agencies and government-sponsored entities</b>, mostly connected to housing finance.</li>
  <li><b>Corporations.</b> <em>Investment grade</em> (higher rated) or <em>high yield</em> (lower rated, "junk"); see the <a href="#/lesson/fi-credit">credit lesson</a>.</li>
  <li><b>Municipal bonds</b> from states and cities; interest is often exempt from federal income tax.</li>
  <li><b>Securitized bonds</b> backed by pools of mortgages or other loans (MBS, ABS), and <b>foreign and emerging-market</b> sovereign and corporate bonds.</li>
</ul>

<h2>Pricing a bond</h2>
<div class="fx"><div class="formula">Price = Σ C ÷ (1 + i)<sup>t</sup> + F ÷ (1 + i)<sup>n</sup> &nbsp;=&nbsp; C × [1 − (1 + i)<sup>−n</sup>] ÷ i + F ÷ (1 + i)<sup>n</sup></div><div class="fx-body">
<p><b class="lab">In plain English</b>A bond pays a stream of equal coupons and then the face value. Shrink each payment back to today at the market rate and add them up. The second version of the formula just uses the shortcut for adding a stream of equal payments (an <b>annuity</b>). Both give the same price.</p>
<dl class="syms"><dt>C</dt><dd>coupon paid each period</dd><dt>F</dt><dd>face value paid at maturity</dd><dt>i</dt><dd>yield <em>per period</em>: for semiannual coupons, the yearly yield ÷ 2</dd><dt>n</dt><dd>number of periods: years × 2 for semiannual coupons</dd></dl>
<p class="ex"><b class="lab">Worked example</b>$1,000 face, 5% coupon (so C = $25), 10 years (n = 20), market yield 4% (so i = 2%). Coupons: 25 × [1 − 1.02<sup>−20</sup>] ÷ 0.02 = 25 × 16.351 = <b>$408.79</b>. Face value: 1,000 ÷ 1.02<sup>20</sup> = <b>$672.97</b>. Price = 408.79 + 672.97 = <b>$1,081.76</b>.</p>
<p class="hook"><b class="lab">Remember it as</b>"Bond price = present value of the coupons + present value of the face value, discounted at the market yield."</p></div></div>

<h2>Premium, par and discount</h2>
<p>Keep the same bond (5% coupon, 10 years) and change only the market yield:</p>
<ul>
  <li>Yield 4% (below the coupon): price <b>$1,081.76</b>, a <b>premium</b>, because the bond pays more than new bonds do.</li>
  <li>Yield 5% (equal to the coupon): price exactly <b>$1,000</b>, <b>par</b>.</li>
  <li>Yield 6% (above the coupon): price <b>$925.61</b>, a <b>discount</b>.</li>
</ul>
<p>So <b>price and yield move in opposite directions</b>. This is the single most important fact about bonds (see also <a href="#/lesson/rates">interest rates and the yield curve</a>). A bond with no coupons at all, a <b>zero-coupon bond</b>, is simply Price = F ÷ (1 + i)<sup>n</sup>; a 10-year zero at 4% costs 1,000 ÷ 1.02<sup>20</sup> = $672.97.</p>

<h2>Clean and dirty prices</h2>
<div class="fx"><div class="formula">Dirty (full) price = Clean (quoted) price + Accrued interest</div><div class="fx-body">
<p><b class="lab">In plain English</b>Bonds usually change hands between coupon dates. The seller has earned interest since the last coupon, so the buyer compensates them for it. Screens quote the <b>clean price</b> (without that interest) so that prices don't jump every time a coupon is paid; the buyer actually pays the <b>dirty price</b>.</p>
<p class="ex"><b class="lab">Worked example</b>Semiannual coupon of $30. It has been 60 days of a 180-day coupon period since the last payment. Accrued interest = 30 × 60 ÷ 180 = <b>$10</b>. If the quoted (clean) price is $1,020, the buyer pays <b>$1,030</b>. Day-count rules differ by market (US corporates and munis typically use 30/360; Treasuries use actual days).</p></div></div>

<h2>The main risks</h2>
<p><b>Interest-rate risk</b> (prices fall when yields rise; see <a href="#/lesson/fi-duration">duration</a>), <b>credit risk</b> (the issuer may not pay), <b>inflation risk</b> (fixed payments buy less), <b>reinvestment risk</b> (coupons may be reinvested at lower rates), <b>call risk</b> (the issuer may repay early) and <b>liquidity risk</b> (hard to sell at a fair price). The rest of this section takes them one at a time.</p>
`,
  takeaways: [
    'Price = PV of coupons + PV of face value at the market yield.',
    'Coupon above yield → premium; equal → par; below → discount. Price and yield move in opposite directions.',
    'Quoted prices are clean; the buyer pays the clean price plus accrued interest.'
  ],
  quiz: [
    { q: 'A bond has a 6% coupon and the market yield for similar bonds is 4%. It will trade at...',
      o: ['A premium (above par)', 'Par', 'A discount (below par)', 'Zero'], a: 0, why: 'It pays more than new bonds do, so buyers pay more than face value.' },
    { q: 'About what should a 10-year zero-coupon bond with $1,000 face cost at a 4% yield (semiannual compounding)?',
      o: ['$400', '$673', '$960', '$1,000'], a: 1, why: '1,000 ÷ 1.02^20 = $672.97.' },
    { q: 'A bond\'s quoted (clean) price is $980 and accrued interest is $15. What does the buyer pay?',
      o: ['$965', '$980', '$995', '$1,000'], a: 2, why: 'Dirty price = clean price + accrued interest = 980 + 15 = $995.' }
  ],
  related: ['tvm', 'rates', 'fi-yield', 'fi-duration']
},

{
  id: 'fi-yield', type: 'concept', title: 'Yields: current yield, YTM, yield to call and yield to worst',
  blurb: 'Several different "yields" describe the same bond. Learn what each measures and what it quietly assumes.',
  level: 'Intermediate', min: 16, tags: ['yield', 'callable bonds'], widget: 'ytw',
  body: `
<p>Quoting a bond's return is harder than it looks, because the return depends on when you sell and on what you do with the coupons. Fixed-income markets use a small family of standard yields.</p>

<h2>Current yield</h2>
<div class="fx"><div class="formula">Current yield = Annual coupon ÷ Price</div><div class="fx-body">
<p><b class="lab">In plain English</b>The yearly coupon cash you receive as a percentage of what you paid. It ignores any gain or loss when the bond is repaid at face value.</p>
<p class="ex"><b class="lab">Worked example</b>A 6% coupon bond ($6 a year per 100 of face) bought at a price of 105: 6 ÷ 105 = <b>5.71%</b>.</p></div></div>

<h2>Yield to maturity (YTM)</h2>
<div class="fx"><div class="formula">Price = Σ C ÷ (1 + y÷2)<sup>t</sup> + F ÷ (1 + y÷2)<sup>n</sup> &nbsp; → solve for <i>y</i></div><div class="fx-body">
<p><b class="lab">In plain English</b>YTM is the yearly rate <i>y</i> that makes the bond's promised payments worth exactly today's price. It is the same idea as the internal rate of return on any investment. There is no tidy algebraic formula for <i>y</i>: calculators and spreadsheets find it by trial and error. The result is quoted as a <b>bond-equivalent yield</b> (twice the six-month rate).</p>
<dl class="syms"><dt>y</dt><dd>yield to maturity, per year</dd><dt>C, F, n</dt><dd>coupon per period, face value, number of periods (as in the bond-basics lesson)</dd></dl>
<p class="ex"><b class="lab">Worked example</b>Same bond (6% coupon, 10 years, price 105). Solving gives <b>y = 5.35%</b>. Because it is compounded twice a year, the <b>effective annual yield</b> is (1 + 0.0535÷2)<sup>2</sup> − 1 = <b>5.42%</b>. A back-of-the-envelope shortcut: [C + (F − P) ÷ years] ÷ [(F + P) ÷ 2] = [6 + (100 − 105) ÷ 10] ÷ 102.5 = 5.37%, close to the exact answer.</p>
<p class="hook"><b class="lab">Remember it as</b>"YTM is the bond's IRR: the one discount rate that makes the promised payments equal the price."</p></div></div>

<h3>What YTM quietly assumes</h3>
<ul>
  <li>You <b>hold to maturity</b>.</li>
  <li>The issuer <b>doesn't default</b> and makes every payment.</li>
  <li>You can <b>reinvest every coupon at the same yield</b>. This is rarely true. If rates fall, reinvested coupons earn less, and your realized return ends up below the quoted YTM. That's <b>reinvestment risk</b>.</li>
</ul>

<h2>Callable bonds: yield to call and yield to worst</h2>
<p>Many corporate bonds are <b>callable</b>: the issuer has the right to repay early at a set <b>call price</b>, which it will do when it can refinance more cheaply. If the bond is called, your holding period and cash flows change, so a second yield is computed <em>as if</em> the bond is called on the first call date.</p>
<div class="fx"><div class="formula">Yield to worst = the lowest of the yield to maturity and the yields to each possible call date</div><div class="fx-body">
<p><b class="lab">In plain English</b>Compute the yield under every way the bond could plausibly end, and quote the least favorable one. This is the conservative measure that investors use for callable bonds.</p>
<p class="ex"><b class="lab">Worked example</b>The same 6% bond priced at 105 is callable in 5 years at 102. YTM = 5.35%. Yield to call = the rate that equates price 105 with 10 coupons of 3 plus 102 received after 5 years = <b>5.21%</b>. Yield to worst = the lower one, <b>5.21%</b>. Premium bonds (price above the call price) tend to have a yield to worst equal to yield to call, because the issuer is likely to call them.</p></div></div>
<p>The widget below shows both yields across a range of prices. Notice how yield to call falls below yield to maturity for high prices and rises above it for low prices, where the bond is unlikely to be called.</p>
`,
  takeaways: [
    'Current yield ignores capital gain or loss; YTM is the IRR of the bond\'s promised cash flows.',
    'YTM assumes holding to maturity, no default and reinvestment of coupons at the YTM.',
    'For callable bonds, quote yield to worst: the lowest of YTM and the yields to each call date.'
  ],
  quiz: [
    { q: 'A bond pays a $60 annual coupon and costs $1,050. What is its current yield?',
      o: ['5.71%', '6.00%', '6.30%', '5.00%'], a: 0, why: '60 ÷ 1,050 = 5.71%.' },
    { q: 'What does yield to maturity assume about the coupons?',
      o: ['They are spent as received', 'They are reinvested at the YTM', 'They are reinvested at the risk-free rate', 'They are not paid'], a: 1, why: 'YTM is an IRR, and an IRR implicitly assumes intermediate cash flows earn the same rate.' },
    { q: 'Which yield should a cautious investor use to describe a callable bond selling above its call price?',
      o: ['Current yield', 'Yield to worst', 'Coupon rate', 'Effective annual yield'], a: 1, why: 'Yield to worst takes the least favorable outcome, usually being called early.' }
  ],
  related: ['fi-basics', 'fi-duration', 'options']
},

{
  id: 'fi-duration', type: 'concept', title: 'Interest-rate risk: duration and convexity',
  blurb: 'A single number that says how much a bond\'s price moves when yields change, and the correction that makes it accurate.',
  level: 'Intermediate', min: 20, tags: ['duration', 'convexity', 'interest-rate risk'], widget: 'durconv',
  body: `
<p>When yields rise, bond prices fall, but by how much? Long bonds move more than short bonds, and low-coupon bonds move more than high-coupon bonds. <b>Duration</b> packs all of this into one number.</p>

<h2>Macaulay and modified duration</h2>
<div class="fx"><div class="formula">Macaulay duration = Σ [ t × PV(CF<sub>t</sub>) ] ÷ Price &nbsp;&nbsp;&nbsp; Modified duration = Macaulay ÷ (1 + y÷m)</div><div class="fx-body">
<p><b class="lab">In plain English</b><b>Macaulay duration</b> is the weighted-average time until you receive the bond's cash flows, in years, where each payment's weight is its share of the bond's price. A bond that pays most of its value late has a long duration. <b>Modified duration</b> divides by (1 + yield per period), and that version directly measures price sensitivity.</p>
<dl class="syms"><dt>t</dt><dd>time of each cash flow (in years, or in periods then convert)</dd><dt>PV(CF<sub>t</sub>)</dt><dd>present value of the cash flow paid at time <i>t</i></dd><dt>y, m</dt><dd>yield, and payments per year (m = 2 for semiannual)</dd></dl>
<p class="ex"><b class="lab">Worked example</b>A 5% coupon, 10-year bond priced at par (yield 5%, semiannual coupons): Macaulay duration = <b>7.99 years</b> and modified duration = 7.99 ÷ 1.025 = <b>7.79</b>. A 10-year <em>zero</em> has a Macaulay duration of exactly <b>10</b>: it pays everything at the end.</p>
<p class="hook"><b class="lab">Remember it as</b>"Duration is the bond's average waiting time, and it doubles as its rate sensitivity."</p></div></div>

<h3>Rules of thumb</h3>
<ul>
  <li>A zero-coupon bond's Macaulay duration equals its maturity.</li>
  <li><b>Higher coupon → shorter duration</b> (you get money back sooner): the 5%/10-year bond has 7.99; an 8% coupon 10-year bond has 7.39.</li>
  <li><b>Longer maturity → longer duration</b>: a 5%/30-year bond at par has 15.84.</li>
  <li><b>Higher yield → shorter duration.</b></li>
</ul>

<h2>Using duration: estimating the price change</h2>
<div class="fx"><div class="formula">% change in price ≈ − D<sub>mod</sub> × Δy</div><div class="fx-body">
<p><b class="lab">In plain English</b>Multiply modified duration by the change in yield (as a decimal) and flip the sign. It says price falls by about D<sub>mod</sub>% for each 1-point rise in yield. Traders also quote <b>DV01</b>, the dollar change per one basis point: DV01 = D<sub>mod</sub> × Price × 0.0001.</p>
<p class="ex"><b class="lab">Worked example</b>The 5%, 10-year par bond (D<sub>mod</sub> = 7.79) if yields rise by 1 point (Δy = 0.01): estimate = −7.79 × 0.01 = <b>−7.79%</b>. Repricing the bond exactly gives <b>−7.44%</b>. For a $1,000,000 position, DV01 ≈ 7.79 × 1,000,000 × 0.0001 = <b>$779</b> per basis point.</p></div></div>

<h2>Convexity: fixing the error</h2>
<p>The estimate above is a straight line, but the true price–yield relationship is a curve that bows upward, as you saw in the pricing widget. The curvature is called <b>convexity</b>. It means duration slightly <em>overstates</em> the loss when yields rise and <em>understates</em> the gain when yields fall.</p>
<div class="fx"><div class="formula">% change in price ≈ − D<sub>mod</sub> × Δy + ½ × C × (Δy)²</div><div class="fx-body">
<p><b class="lab">In plain English</b>Add a small correction that is always positive (because (Δy)² is), so it helps you whichever way yields move. The bigger the yield move and the bigger the convexity <i>C</i>, the bigger the correction.</p>
<p class="ex"><b class="lab">Worked example</b>Same bond, C = 73.6. Yields +1 point: −7.79% + ½ × 73.6 × 0.0001 = <b>−7.43%</b> (exact: −7.44%). Yields −2 points: +15.59% + ½ × 73.6 × 0.0004 = <b>+17.06%</b> (exact: +17.17%). Duration alone was off by 1.6 points on the second move; adding convexity cut the error to 0.1.</p></div></div>
<p><b>All else equal, investors prefer more convexity</b>: the bond gains more when yields fall and loses less when they rise. <b>Callable bonds and mortgage-backed securities</b> can have <em>negative</em> convexity: when yields fall, borrowers refinance or the issuer calls, so price gains are capped. That's why they usually offer a higher yield.</p>
`,
  takeaways: [
    'Duration measures a bond\'s average waiting time and its price sensitivity: %ΔP ≈ −D_mod × Δy.',
    'Zero-coupon duration equals maturity; higher coupons shorten duration, longer maturities lengthen it.',
    'Convexity corrects duration\'s straight-line error; callable bonds and MBS can have negative convexity.'
  ],
  quiz: [
    { q: 'What is the Macaulay duration of a 7-year zero-coupon bond?',
      o: ['Less than 7 years', 'Exactly 7 years', 'More than 7 years', 'Depends on the yield'], a: 1, why: 'It pays everything at maturity, so its weighted-average waiting time is its maturity.' },
    { q: 'A bond has modified duration 6. Yields rise 1 percentage point. The price falls by about...',
      o: ['0.6%', '6%', '60%', '1%'], a: 1, why: '−D_mod × Δy = −6 × 0.01 = −6%.' },
    { q: 'Two bonds have the same duration. Bond A has higher convexity. If yields move a lot, Bond A...',
      o: ['Does worse either way', 'Does better either way, all else equal', 'Does better only if yields rise', 'Has no advantage'], a: 1, why: 'Convexity adds a positive term whichever way yields move.' }
  ],
  related: ['fi-basics', 'rates', 'fi-immun']
},

{
  id: 'fi-term', type: 'concept', title: 'The term structure: spot rates, forward rates and the yield curve',
  blurb: 'Why a five-year rate and a one-year rate differ, how to read a future rate out of today\'s curve, and what theories explain the shape.',
  level: 'Intermediate', min: 20, tags: ['term structure', 'forward rates', 'yield curve'], widget: 'fwd',
  body: `
<p>The <a href="#/lesson/rates">yield curve</a> plots yields against maturity. But yields on coupon-paying bonds mix together rates for different years. To price cash flows properly we need a rate for each maturity separately.</p>

<h2>Spot rates</h2>
<p>A <b>spot rate</b> <i>s<sub>n</sub></i> is the yearly yield on a zero-coupon bond maturing in <i>n</i> years: the return for lending money today for exactly <i>n</i> years, with nothing in between. A bond's price is then the sum of each cash flow discounted at the spot rate for <em>its</em> date. The set of spot rates for all maturities is the <b>spot curve</b> (or zero curve).</p>
<p><b>Bootstrapping</b> extracts spot rates from coupon bonds one maturity at a time. Example with annual coupons: a 1-year bond yielding 3% gives <i>s</i><sub>1</sub> = 3%. A 2-year par bond with a 4% coupon must satisfy 4 ÷ 1.03 + 104 ÷ (1 + <i>s</i><sub>2</sub>)² = 100. That gives (1 + <i>s</i><sub>2</sub>)² = 104 ÷ 96.117 = 1.0820, so <i>s</i><sub>2</sub> = <b>4.02%</b>: slightly above the 4% par yield.</p>

<h2>Forward rates</h2>
<div class="fx"><div class="formula">(1 + s<sub>n</sub>)<sup>n</sup> = (1 + s<sub>n−1</sub>)<sup>n−1</sup> × (1 + f<sub>n</sub>) &nbsp;&nbsp;⇒&nbsp;&nbsp; f<sub>n</sub> = (1 + s<sub>n</sub>)<sup>n</sup> ÷ (1 + s<sub>n−1</sub>)<sup>n−1</sup> − 1</div><div class="fx-body">
<p><b class="lab">In plain English</b>You can invest for <i>n</i> years in one step at the <i>n</i>-year spot rate, or invest for <i>n</i>−1 years and then lock in a rate for the last year. Both routes must end with the same money, otherwise there would be a risk-free profit. The <b>forward rate</b> <i>f<sub>n</sub></i> is whatever rate for year <i>n</i> makes the two routes equal.</p>
<dl class="syms"><dt>s<sub>n</sub></dt><dd>spot rate for maturity <i>n</i> years</dd><dt>f<sub>n</sub></dt><dd>the one-year forward rate that applies to year <i>n</i> (from year <i>n</i>−1 to year <i>n</i>)</dd></dl>
<p class="ex"><b class="lab">Worked example</b>1-year spot 3%, 2-year spot 4%. Forward rate for year 2: 1.04² ÷ 1.03 − 1 = 1.0816 ÷ 1.03 − 1 = <b>5.01%</b>. Check: $100 at 4% for two years → $108.16. $100 at 3% for one year → $103, then at 5.01% → $108.16. ✔</p>
<p class="hook"><b class="lab">Remember it as</b>"The forward rate is the extra return needed on the last year to make a long investment match a short one."</p></div></div>
<p>When the spot curve slopes <b>upward</b>, forward rates lie <b>above</b> the spot rates; when it slopes downward, forwards lie below. Use the widget below to see this: the "Show the math" panel derives each forward rate from your spot rates.</p>

<h2>Theories of the yield curve's shape</h2>
<ul>
  <li><b>Pure expectations:</b> forward rates equal the market's expectation of future spot rates, so an upward curve means rates are expected to rise.</li>
  <li><b>Liquidity preference:</b> long bonds are riskier, so investors demand a <b>term premium</b>; forward rates = expected future rates + a premium. This tends to make curves slope upward.</li>
  <li><b>Market segmentation and preferred habitat:</b> different investors (pension funds, banks) prefer different maturities, so supply and demand in each segment shape yields, and investors leave their habitat only if compensated.</li>
</ul>

<h2>What the evidence says</h2>
<p>Campbell and Shiller (1991) found that the pure expectations theory fits poorly: a high spread does forecast rising short rates, as the theory says, but it also forecasts <em>falling</em> long-term yields, the opposite of what the theory says. Cochrane and Piazzesi (2005) found that a combination of forward rates predicts bond excess returns, so risk premia vary over time. Litterman and Scheinkman (1991) showed that yield curve movements are mostly a combination of three shapes: a <b>level</b> shift (all yields move together), a <b>slope</b> change (steepening or flattening) and a <b>curvature</b> change (the middle moves versus the ends). And Estrella and Mishkin (1998) found that the slope of the curve is a strong predictor of US recessions. See the <a href="#/lesson/p-campbell91">Campbell–Shiller</a>, <a href="#/lesson/p-litterman91">Litterman–Scheinkman</a> and <a href="#/lesson/p-estrella98">Estrella–Mishkin</a> paper pages.</p>
`,
  takeaways: [
    'A spot rate is the yield on a zero-coupon bond; bond prices discount each cash flow at its own spot rate.',
    'Forward rate: f_n = (1 + s_n)^n ÷ (1 + s_(n−1))^(n−1) − 1. Upward-sloping curve → forwards above spots.',
    'Expectations, liquidity-preference and segmentation theories explain the shape; three factors (level, slope, curvature) explain most movements.'
  ],
  quiz: [
    { q: 'The 1-year spot rate is 3% and the 2-year spot rate is 4%. What is the implied forward rate for year 2?',
      o: ['3.5%', '4.0%', '5.0%', '7.0%'], a: 2, why: '1.04² ÷ 1.03 − 1 = 5.01%.' },
    { q: 'If the spot curve slopes upward, forward rates are...',
      o: ['Below the spot rates', 'Above the spot rates', 'Equal to spot rates', 'Always zero'], a: 1, why: 'Locking in a higher long-term rate requires a higher rate for the later years.' },
    { q: 'Which three factors explain most yield-curve movements (Litterman–Scheinkman)?',
      o: ['Inflation, growth, and unemployment', 'Level, slope and curvature', 'Duration, convexity and yield', 'Coupon, price and maturity'], a: 1, why: 'Principal-component analysis of Treasury returns found level, steepness and curvature.' }
  ],
  related: ['rates', 'p-campbell91', 'p-litterman91', 'p-estrella98']
},

{
  id: 'fi-credit', type: 'concept', title: 'Credit risk and credit spreads',
  blurb: 'How the chance of default and the recovery after default show up as the extra yield on corporate bonds.',
  level: 'Intermediate', min: 18, tags: ['credit', 'default', 'spreads'], widget: 'credit',
  body: `
<p>A Treasury bond is treated as safe; a corporate bond might not pay in full. Investors demand extra yield for that risk. The extra yield over a comparable risk-free bond is the <b>credit spread</b>, quoted in <b>basis points</b> (1 bp = 0.01%). This lesson connects to the <a href="#/lesson/fsa-credit">credit and distress analysis</a> lesson.</p>

<h2>Expected loss</h2>
<div class="fx"><div class="formula">Expected loss = PD × LGD × EAD &nbsp;&nbsp; LGD = 1 − Recovery rate</div><div class="fx-body">
<p><b class="lab">In plain English</b>To measure the cost of default risk, multiply three things: how likely default is, how much of the exposure you lose if it happens, and how much you have at risk.</p>
<dl class="syms"><dt>PD</dt><dd>probability of default over the period</dd><dt>LGD</dt><dd>loss given default: the share of the exposure not recovered</dd><dt>EAD</dt><dd>exposure at default: the amount owed when the borrower fails</dd></dl>
<p class="ex"><b class="lab">Worked example</b>PD = 3%, recovery = 40% (so LGD = 60%), exposure $1,000,000: expected loss = 0.03 × 0.60 × 1,000,000 = <b>$18,000</b>.</p></div></div>

<h2>From default risk to spread</h2>
<div class="fx"><div class="formula">Credit spread ≈ λ × (1 − R)</div><div class="fx-body">
<p><b class="lab">In plain English</b>If a bond faces a yearly default intensity <i>λ</i> (roughly the yearly chance of default) and you'd recover a share <i>R</i>, then each year you expect to lose about λ × (1 − R) of the bond's value. To break even, investors need that much extra yield.</p>
<p class="ex"><b class="lab">Worked example</b>λ = 2% a year, recovery 40%: spread ≈ 0.02 × 0.60 = 1.2% = <b>120 bp</b>. Pricing a 5-year zero-coupon bond exactly (risk-free rate 4%) gives a price of 77.20 versus 81.87 for the risk-free bond, a yield of 5.18% and a spread of <b>117.6 bp</b>, close to the rule of thumb.</p></div></div>
<p>Here <i>λ</i> is a default probability used for <em>pricing</em>, so it includes compensation for risk (the "risk-neutral" probability). It is usually higher than actual historical default frequencies.</p>

<h2>Why spreads are wider than expected losses</h2>
<p>Elton, Gruber, Agrawal and Mann (2001) found that expected default losses explain only a small part of corporate spreads. State taxes (Treasury interest is exempt from state income tax, corporate interest is not) explain a substantial part, and the rest is compensation for systematic risk. Longstaff, Mithal and Neis (2005), using credit default swaps, found that default risk explains the majority of spreads, with illiquidity the rest. The evidence differs by method and period, but everyone agrees that <b>spread ≠ expected loss</b>.</p>

<h2>What drives credit risk</h2>
<ul>
  <li><b>Leverage and cash flow coverage</b> (the ratios in the credit analysis lesson).</li>
  <li><b>Business volatility.</b> In Merton's (1974) structural model, a firm's equity is a call option on its assets and its debt is a risk-free bond minus a put option on those assets. A firm defaults when assets fall below the debt owed. Higher leverage or more volatile assets means a wider spread. See the <a href="#/lesson/p-merton74">Merton paper</a>.</li>
  <li><b>Seniority and collateral</b> raise recovery. <b>Covenants</b> restrict risky behavior.</li>
  <li><b>Ratings</b> (AAA down to D) summarize creditworthiness. BBB−/Baa3 is the lowest investment-grade rating; below is high yield.</li>
</ul>
`,
  takeaways: [
    'Expected loss = PD × LGD × EAD, where LGD = 1 − recovery.',
    'Credit spread ≈ default intensity × (1 − recovery), but observed spreads also pay for risk, taxes and illiquidity.',
    'Merton: equity is a call on the firm\'s assets; risky debt = safe debt − a put.'
  ],
  quiz: [
    { q: 'PD = 3%, LGD = 60%, exposure $1,000,000. What is the expected loss?',
      o: ['$18,000', '$30,000', '$60,000', '$1,800'], a: 0, why: '0.03 × 0.60 × 1,000,000 = $18,000.' },
    { q: 'A bond has a default intensity of 2% a year and a recovery rate of 50%. About what spread does that imply?',
      o: ['50 bp', '100 bp', '200 bp', '400 bp'], a: 1, why: 'Spread ≈ λ(1 − R) = 0.02 × 0.5 = 1% = 100 bp.' },
    { q: 'Why are corporate spreads usually wider than the losses expected from defaults?',
      o: ['Corporate bonds never default', 'They also compensate for systematic risk, taxes and illiquidity', 'Treasuries are riskier', 'Recovery is always zero'], a: 1, why: 'Elton et al. find expected default is only part of the spread.' }
  ],
  related: ['fsa-credit', 'p-merton74', 'p-elton01']
},

{
  id: 'fi-tips', type: 'concept', title: 'Inflation-linked bonds and breakeven inflation',
  blurb: 'How TIPS protect purchasing power, and how the gap between nominal and real yields reveals the market\'s inflation expectations.',
  level: 'Intermediate', min: 14, tags: ['TIPS', 'inflation', 'breakeven'], widget: 'tips',
  body: `
<p>An ordinary bond pays fixed dollars, so inflation erodes what they buy. An <b>inflation-linked bond</b> adjusts for inflation. In the US these are <b>TIPS</b> (Treasury Inflation-Protected Securities).</p>

<h2>How TIPS work</h2>
<ul>
  <li>The <b>principal is adjusted</b> for changes in the consumer price index (CPI-U, with a lag of about three months).</li>
  <li>The <b>coupon rate is fixed and real</b>, but it is applied to the adjusted principal, so coupon dollars rise with inflation.</li>
  <li>At maturity you receive the adjusted principal or the original principal, whichever is greater, so there is a floor against deflation.</li>
  <li>The yield quoted on a TIPS is a <b>real yield</b>: the return above inflation.</li>
  <li>Tax caveat: in taxable accounts the inflation adjustment is taxed as income each year even though you don't receive it until maturity.</li>
</ul>

<h2>Breakeven inflation</h2>
<div class="fx"><div class="formula">Breakeven inflation = (1 + nominal yield) ÷ (1 + real yield) − 1 &nbsp;≈&nbsp; nominal yield − real yield</div><div class="fx-body">
<p><b class="lab">In plain English</b>A nominal Treasury pays a fixed yield; a TIPS pays its real yield <em>plus</em> actual inflation. Breakeven inflation is the inflation rate at which the two pay the same. It's the Fisher equation from the <a href="#/lesson/rates">rates lesson</a>, solved for inflation.</p>
<p class="ex"><b class="lab">Worked example</b>10-year nominal yield 4%, 10-year TIPS real yield 1.5%. Breakeven = 1.04 ÷ 1.015 − 1 = <b>2.46%</b> (shortcut: 4 − 1.5 = 2.5%). If inflation averages more than 2.46% a year, the TIPS wins; if less, the nominal bond wins. At 3% inflation, TIPS return about (1.015)(1.03) − 1 = 4.55% a year versus 4%.</p>
<p class="hook"><b class="lab">Remember it as</b>"Breakeven = nominal yield minus real yield."</p></div></div>

<h2>Reading breakeven with care</h2>
<p>Breakeven isn't a pure forecast of inflation. Roughly, <b>breakeven ≈ expected inflation + inflation risk premium − TIPS liquidity premium</b>. Nominal bonds carry inflation risk, so investors want compensation (pushing breakeven up), while TIPS are less liquid, so TIPS yields include a premium (pushing breakeven down). Even so, changes in breakeven are widely watched as a market signal of shifting inflation expectations.</p>
`,
  takeaways: [
    'TIPS adjust principal for CPI; the fixed real coupon applies to the adjusted principal.',
    'Breakeven inflation = (1 + nominal) ÷ (1 + real) − 1 ≈ nominal − real.',
    'Breakeven also includes risk and liquidity premia, so it\'s not a pure inflation forecast.'
  ],
  quiz: [
    { q: 'The 10-year nominal yield is 4.2% and the 10-year TIPS real yield is 1.7%. What is the approximate breakeven inflation rate?',
      o: ['1.7%', '2.5%', '4.2%', '5.9%'], a: 1, why: '4.2% − 1.7% = 2.5%.' },
    { q: 'If realized inflation ends up higher than breakeven, which bond does better?',
      o: ['The nominal bond', 'The TIPS', 'Neither', 'They always tie'], a: 1, why: 'TIPS pay real yield plus actual inflation.' },
    { q: 'On a TIPS, what is adjusted for inflation?',
      o: ['The coupon rate', 'The principal (and so the coupon dollars)', 'The maturity date', 'The yield to maturity'], a: 1, why: 'The fixed real coupon rate is applied to the inflation-adjusted principal.' }
  ],
  related: ['rates', 'fi-basics', 'fi-term']
},

{
  id: 'fi-immun', type: 'concept', title: 'Managing bond portfolios: duration matching and immunization',
  blurb: 'How to fund a future liability so that interest-rate changes don\'t break the plan.',
  level: 'Intermediate', min: 20, tags: ['immunization', 'liability-driven investing', 'portfolio'], widget: 'immun',
  body: `
<p>Suppose you owe a fixed sum on a known date (a pension payment, a tuition bill, an insurer's claim). You want to be sure your bond portfolio will be worth enough on that date, whatever happens to interest rates. Interest rates hurt in two opposite ways:</p>
<ul>
  <li><b>Price risk:</b> if yields rise, the market value of bonds you'll sell falls.</li>
  <li><b>Reinvestment risk:</b> if yields rise, the coupons you reinvest earn <em>more</em>, and if yields fall they earn less.</li>
</ul>
<p>The two effects push in opposite directions. <b>Immunization</b> chooses the portfolio so that they cancel.</p>

<h2>The rule</h2>
<div class="fx"><div class="formula">Duration of assets = Duration of liabilities (= the horizon, for a single payment)</div><div class="fx-body">
<p><b class="lab">In plain English</b>Pick bonds whose <b>Macaulay duration</b> equals the time until the payment is due. Then, for a small once-and-for-all change in yields, the loss in price is offset by the gain in reinvested coupons (or vice versa) by the payment date. Fisher and Weil (1971) showed this; the actuary F. M. Redington (1952) had already developed the idea for insurers. Redington's full conditions are:</p>
<ol>
  <li><b>Present value of assets = present value of liabilities</b>, so you start fully funded.</li>
  <li><b>Duration of assets = duration of liabilities.</b></li>
  <li><b>Convexity of assets ≥ convexity of liabilities</b>, so that any small yield move leaves a surplus rather than a shortfall.</li>
</ol>
<p class="ex"><b class="lab">Worked example</b>You owe $1,000,000 in 8 years. You buy a 10-year, 5% annual-pay bond yielding 5%; its Macaulay duration is <b>8.1 years</b>, close to 8. Yields then jump immediately by 1 point. Value on the payment date versus target: <b>−0.06%</b>. A 3-point rise: <b>+0.06%</b>; a 3-point fall: <b>+0.67%</b>. Compare a 20-year bond (duration far above 8): a 1-point rise leaves you <b>4.5% short</b>, a 3-point rise <b>11.6% short</b>. A 3-year bond (duration far below 8) misses in the other direction. Try it in the widget.</p>
<p class="hook"><b class="lab">Remember it as</b>"Match the duration to the date, and rate changes cancel out."</p></div></div>

<h2>Portfolio duration</h2>
<p>The duration of a portfolio is the market-value-weighted average of the durations of its bonds. Half in a bond with duration 4 and half in a bond with duration 10 has a duration of 0.5 × 4 + 0.5 × 10 = <b>7</b>. That is why different combinations, a <b>bullet</b> (all near one maturity), a <b>barbell</b> (short and long bonds) or a <b>ladder</b> (evenly spread maturities), can share the same duration. For equal duration, a barbell usually has more convexity than a bullet.</p>

<h2>Limits of immunization</h2>
<ul>
  <li>It protects against <b>small, parallel</b> shifts in the curve. Twists and curvature changes (see the <a href="#/lesson/fi-term">term structure lesson</a>) can still cause errors.</li>
  <li>Duration <b>drifts</b> as time passes and yields change, so the portfolio must be <b>rebalanced</b>.</li>
  <li>It ignores <b>credit</b> and <b>call</b> risk unless you buy default-free, non-callable bonds.</li>
  <li>An alternative is <b>cash-flow matching</b> (dedication): buy bonds whose payments line up exactly with the liabilities, leaving no rate risk at all. Institutions combine these ideas in <b>liability-driven investing (LDI)</b>.</li>
</ul>
`,
  takeaways: [
    'Rate rises cut bond prices but raise reinvestment income; immunization makes the two cancel.',
    'Immunize a single liability by matching Macaulay duration to the horizon (with PV matched and convexity at least as large).',
    'It works for small parallel shifts and needs rebalancing; cash-flow matching is the risk-free alternative.'
  ],
  quiz: [
    { q: 'To immunize a single payment due in 8 years, the bond portfolio\'s Macaulay duration should be about...',
      o: ['4 years', '8 years', '16 years', 'As long as possible'], a: 1, why: 'Duration should match the horizon so price risk and reinvestment risk offset.' },
    { q: 'When yields rise, which two effects offset each other in an immunized portfolio?',
      o: ['Lower prices and higher reinvestment income', 'Higher prices and lower coupons', 'Taxes and fees', 'Inflation and growth'], a: 0, why: 'Price risk (prices fall) is offset by reinvestment gains (coupons reinvested at higher rates).' },
    { q: 'A portfolio is 50% in a bond of duration 4 and 50% in a bond of duration 10. What is the portfolio duration?',
      o: ['4', '6', '7', '14'], a: 2, why: 'Weighted average: 0.5 × 4 + 0.5 × 10 = 7.' }
  ],
  related: ['fi-duration', 'p-fisherweil71', 'pm-ips']
}

);
