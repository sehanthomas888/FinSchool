/* Fixed income: bond basics, yields, duration and convexity, the term structure, credit risk, inflation-linked bonds, immunization. */
window.LESSONS = window.LESSONS || [];
(function () {
  const QL = window.QL, N = QL.numeric, usd = QL.usd, pct = QL.pct, int = QL.int, pick = QL.pick, round = QL.round, num = QL.num;

  window.LESSONS.push(

{
  id: 'fi-basics', type: 'concept', title: 'Bond basics: cash flows, prices and the bond market',
  blurb: 'What a bond is, who issues them, and how a bond\'s price is just the present value of its promised payments.',
  level: 'Foundations', min: 24, tags: ['bonds', 'pricing'], widget: 'bondprice',
  los: [
    'Describe a bond in terms of face value, coupon, maturity and yield.',
    'List the main types of bond issuer.',
    'Calculate the price of a bond as the present value of its coupons and face value.',
    'Say whether a bond trades at a premium, par or a discount from its coupon and yield.',
    'Explain clean versus dirty prices and calculate accrued interest.'
  ],
  terms: [
    ['Bond', 'a loan that can be traded, with fixed payments promised by the issuer'],
    ['Issuer', 'the government or company that borrows by selling the bond'],
    ['Face value (par)', 'the amount repaid at maturity, usually $1,000'],
    ['Coupon', 'the yearly interest, as a percentage of face value'],
    ['Maturity', 'the date the face value is repaid'],
    ['Yield to maturity (YTM)', 'the yearly return you earn if you buy at today\'s price and hold to the end; the market\'s interest rate for this bond'],
    ['Premium / par / discount', 'a price above / equal to / below face value'],
    ['Accrued interest', 'interest earned by the seller since the last coupon payment']
  ],
  body: `
<p>A <b>bond</b> is a loan that can be traded. You lend money to an issuer (a government or a company). In return the issuer promises regular interest payments and to give back the borrowed amount on a fixed date. Because those payments are fixed by contract, bonds are called <b>fixed income</b> securities. This lesson builds on the <a href="#/lesson/tvm">time value of money</a>: a bond is worth the present value of what it promises.</p>

<h2>Start with an IOU</h2>
<aside class="callout story"><b class="lab">Picture this</b>
<p>You lend a friend $1,000 for 3 years. Your friend promises to pay you $50 each year, and to return the $1,000 at the end. That written promise is an IOU. Now suppose after a year you need cash and want to sell that IOU to a stranger. How much should the stranger pay? If similar loans now pay 6% instead of 5%, your 5% IOU looks less attractive, so the stranger will pay less than $1,000. A bond is exactly this: an IOU that trades, and its price rises and falls with market interest rates.</p></aside>

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

<h2>Pricing a bond, step by step</h2>
<div class="example"><b class="lab">Example</b><p>A 3-year bond has a face value of $1,000 and pays a 5% coupon once a year. The market yield is 6%. What is the price?</p>
<b class="lab sol">Solution</b>
<table class="steps"><tr><td>Year 1 coupon: 50 ÷ 1.06</td><td>$47.17</td></tr><tr><td>Year 2 coupon: 50 ÷ 1.06²</td><td>$44.50</td></tr><tr><td>Year 3 coupon + face: 1,050 ÷ 1.06³</td><td>$881.60</td></tr><tr class="tot"><td>Price</td><td>$973.27</td></tr></table>
<p>The bond promises 5% when the market wants 6%, so it sells for <b>less</b> than face value: a <b>discount</b>. If the market yield were 5% it would sell for exactly $1,000; at 4%, for $1,027.75.</p></div>
<p>Adding up each payment one by one is slow for a long bond, so there is a shortcut for the stream of equal coupons:</p>
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
<details class="pause"><summary>Pause and try: premium or discount?</summary><p>A bond has a 6% coupon and similar bonds now yield 4%. It pays more than the market, so buyers will pay extra: it trades at a <b>premium</b>. Reverse the numbers (4% coupon, 6% market yield) and it trades at a <b>discount</b>.</p></details>

<h2>Clean and dirty prices</h2>
<div class="fx"><div class="formula">Dirty (full) price = Clean (quoted) price + Accrued interest</div><div class="fx-body">
<p><b class="lab">In plain English</b>Bonds usually change hands between coupon dates. The seller has earned interest since the last coupon, so the buyer compensates them for it. Screens quote the <b>clean price</b> (without that interest) so that prices do not jump every time a coupon is paid; the buyer actually pays the <b>dirty price</b>.</p>
<p class="ex"><b class="lab">Worked example</b>Semiannual coupon of $30. It has been 60 days of a 180-day coupon period since the last payment. Accrued interest = 30 × 60 ÷ 180 = <b>$10</b>. If the quoted (clean) price is $1,020, the buyer pays <b>$1,030</b>. Day-count rules differ by market (US corporates and munis typically use 30/360; Treasuries use actual days).</p></div></div>

<h2>The main risks</h2>
<p><b>Interest-rate risk</b> (prices fall when yields rise; see <a href="#/lesson/fi-duration">duration</a>), <b>credit risk</b> (the issuer may not pay), <b>inflation risk</b> (fixed payments buy less), <b>reinvestment risk</b> (coupons may be reinvested at lower rates), <b>call risk</b> (the issuer may repay early) and <b>liquidity risk</b> (hard to sell at a fair price). The rest of this section takes them one at a time.</p>
<aside class="callout mistake"><b class="lab">Common mistake</b><p>Thinking a bond's price is fixed at $1,000. Face value is what you get back at maturity, but until then the price moves with market yields, and it can be well above or below $1,000.</p></aside>
`,
  takeaways: [
    'Price = PV of coupons + PV of face value at the market yield.',
    'Coupon above yield → premium; equal → par; below → discount. Price and yield move in opposite directions.',
    'Quoted prices are clean; the buyer pays the clean price plus accrued interest.'
  ],
  quiz: [
    { k: 'calc', gen: () => { const c = pick([3, 4, 5, 6]), y = pick([3, 4, 5, 6, 7]), n = pick([2, 3, 5, 8, 10]); const ans = QL.bondPrice(1000, c / 100, y / 100, n, 2); return N({ q: `A ${n}-year bond has a $1,000 face value and a ${c}% coupon paid semiannually. The market yield is ${y}% (compounded semiannually). What is its price?`, ans, wrong: [1000, QL.bondPrice(1000, c / 100, y / 100, n, 1), 1000 + 1000 * (c - y) / 100 * n], fmt: x => usd(x, 2), alt: () => { let p = 0; for (let t = 1; t <= n * 2; t++) p += (1000 * c / 200 + (t === n * 2 ? 1000 : 0)) / Math.pow(1 + y / 200, t); return p; }, tol: 1e-6, fixed: true, why: `Coupon $${1000 * c / 200} every six months for ${n * 2} periods, discounted at ${y / 2}% per period, plus $1,000 at the end. Price = ${usd(ans, 2)}. ${y > c ? 'The yield is above the coupon rate, so it sells at a discount.' : y < c ? 'The yield is below the coupon rate, so it sells at a premium.' : 'The yield equals the coupon rate, so it sells at par.'}` }); } },
    { k: 'calc', gen: () => { const y = pick([3, 4, 5, 6]), n = pick([3, 5, 10]); const ans = 1000 / Math.pow(1 + y / 200, n * 2); return N({ q: `A zero-coupon bond has a $1,000 face value and matures in ${n} years. The yield is ${y}% (compounded semiannually). What is its price?`, ans, wrong: [1000 / Math.pow(1 + y / 100, n) * 1.05, 1000 * (1 - y / 100 * n), 1000 - 1000 * y / 200], fmt: x => usd(x, 2), alt: () => 1000 * Math.pow(1 + y / 200, -n * 2), tol: 1e-6, fixed: true, why: `Only one payment: $1,000 at the end. Price = 1,000 ÷ (1 + ${y / 200})^${n * 2} = ${usd(ans, 2)}. A zero-coupon bond always sells below face value when yields are positive.` }); } },
    { k: 'calc', gen: () => { const cpn = pick([20, 25, 30, 40]), d = pick([30, 45, 60, 90, 120]), clean = pick([980, 1000, 1020, 1040]); const acc = cpn * d / 180; const ans = clean + acc; return N({ q: `A bond pays a $${cpn} coupon every 180 days. It has been ${d} days since the last coupon and the quoted (clean) price is ${usd(clean, 0)}. What does the buyer pay in total?`, ans, wrong: [clean, clean - acc, clean + cpn], fmt: x => usd(x, 2), alt: () => clean + cpn * (d / 180), tol: 1e-9, fixed: true, why: `Accrued interest = $${cpn} × ${d} ÷ 180 = ${usd(acc, 2)}. Dirty price = clean + accrued = ${usd(clean, 0)} + ${usd(acc, 2)} = ${usd(ans, 2)}. The seller earned that interest, so the buyer pays for it.` }); } },
    { k: 'concept', q: 'A bond has a 6% coupon and the market yield for similar bonds is 4%. It will trade at...', o: ['A premium (above par)', 'Par', 'A discount (below par)', 'Zero'], a: 0, why: 'It pays more than new bonds do, so buyers pay more than face value.' },
    { k: 'concept', q: 'What happens to a bond\'s price when market yields rise?', o: ['It falls', 'It rises', 'It stays the same', 'It equals face value'], a: 0, why: 'Price and yield move in opposite directions because fixed payments are discounted at a higher rate.' },
    { k: 'concept', q: 'What is a zero-coupon bond?', o: ['A bond with no coupons that pays only face value at maturity, sold below face', 'A bond that never repays', 'A bond with a zero face value', 'A bond issued at no cost'], a: 0, why: 'Its whole return comes from buying at a discount and receiving face value at the end.' },
    { k: 'concept', q: 'Why are bond prices usually quoted "clean"?', o: ['So prices do not jump every time a coupon is paid', 'Because accrued interest is illegal', 'Because the buyer never pays it', 'To hide fees'], a: 0, why: 'The buyer still pays the accrued interest on top of the clean price.' },
    { k: 'apply', q: 'You hold a 5% bond. Market yields on similar bonds rise to 7%. What has happened to the value of your bond?', o: ['It has fallen below what you paid, though it still pays 5% and returns face value at maturity', 'It has risen', 'It has stayed the same', 'It has been cancelled'], a: 0, why: 'New bonds pay more than yours, so yours is worth less to buyers. Held to maturity you still receive every promised payment.' }
  ],
  related: ['tvm', 'rates', 'fi-yield', 'fi-duration']
},

{
  id: 'fi-yield', type: 'concept', title: 'Yields: current yield, YTM, yield to call and yield to worst',
  blurb: 'Several different "yields" describe the same bond. Learn what each measures and what it quietly assumes.',
  level: 'Intermediate', min: 20, tags: ['yield', 'YTM', 'callable'], widget: 'ytw',
  los: [
    'Calculate current yield and explain what it ignores.',
    'Explain yield to maturity as the bond\'s internal rate of return.',
    'State the assumptions built into YTM, including reinvestment risk.',
    'Explain callable bonds and why yield to worst is the conservative measure.'
  ],
  terms: [
    ['Current yield', 'annual coupon divided by price'],
    ['Yield to maturity (YTM)', 'the single rate that makes discounted promised payments equal the price'],
    ['Internal rate of return (IRR)', 'the discount rate that makes the present value of an investment\'s cash flows equal its cost'],
    ['Callable bond', 'a bond the issuer may repay early at a set call price'],
    ['Yield to worst', 'the lowest yield among maturity and every possible call date'],
    ['Reinvestment risk', 'the risk that coupons can only be reinvested at lower rates']
  ],
  body: `
<p>Quoting a bond's return is harder than it looks, because the return depends on when you sell and on what you do with the coupons. Fixed-income markets use a small family of standard yields.</p>

<aside class="callout story"><b class="lab">Picture this</b>
<p>You buy a bond for $1,050 that pays $60 a year and returns $1,000 in ten years. What is your return? The $60 on $1,050 is about 5.7%. But you will also lose $50 when the bond is repaid at $1,000 instead of what you paid. A single fair "yearly return" has to account for both. That is what yield to maturity does.</p></aside>

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
<details class="pause"><summary>Pause and try: which is bigger, current yield or YTM?</summary><p>For a bond bought at a <em>premium</em> (price above face), YTM is <b>lower</b> than the current yield, because you will lose the premium when it is repaid at face value. For a <em>discount</em> bond it is <b>higher</b>, because you gain when it is repaid at par. In the example: current yield 5.71%, YTM 5.35%.</p></details>

<h3>What YTM quietly assumes</h3>
<ul>
<li>You <b>hold to maturity</b>.</li>
<li>The issuer <b>does not default</b> and makes every payment.</li>
<li>You can <b>reinvest every coupon at the same yield</b>. This is rarely true. If rates fall, reinvested coupons earn less, and your realized return ends up below the quoted YTM. That is <b>reinvestment risk</b>.</li>
</ul>

<h2>Callable bonds: yield to call and yield to worst</h2>
<p>Many corporate bonds are <b>callable</b>: the issuer has the right to repay early at a set <b>call price</b>, which it will do when it can refinance more cheaply. If the bond is called, your holding period and cash flows change, so a second yield is computed <em>as if</em> the bond is called on the first call date.</p>
<div class="fx"><div class="formula">Yield to worst = the lowest of the yield to maturity and the yields to each possible call date</div><div class="fx-body">
<p><b class="lab">In plain English</b>Compute the yield under every way the bond could plausibly end, and quote the least favorable one. This is the conservative measure that investors use for callable bonds.</p>
<p class="ex"><b class="lab">Worked example</b>The same 6% bond priced at 105 is callable in 5 years at 102. YTM = 5.35%. Yield to call = the rate that equates price 105 with 10 coupons of 3 plus 102 received after 5 years = <b>5.21%</b>. Yield to worst = the lower one, <b>5.21%</b>. Premium bonds (price above the call price) tend to have a yield to worst equal to yield to call, because the issuer is likely to call them.</p></div></div>
<p>The widget below shows both yields across a range of prices. Notice how yield to call falls below yield to maturity for high prices and rises above it for low prices, where the bond is unlikely to be called.</p>
<aside class="callout mistake"><b class="lab">Common mistake</b><p>Assuming the quoted YTM is the return you will actually earn. It is a promise-based rate that also assumes reinvestment at the same yield. Your realized return will differ if you sell early, if the bond is called, or if reinvestment rates change.</p></aside>
`,
  takeaways: [
    'Current yield ignores capital gain or loss; YTM is the IRR of the bond\'s promised cash flows.',
    'YTM assumes holding to maturity, no default and reinvestment of coupons at the YTM.',
    'For callable bonds, quote yield to worst: the lowest of YTM and the yields to each call date.'
  ],
  quiz: [
    { k: 'calc', gen: () => { const c = pick([40, 50, 60, 70]), p = pick([950, 1000, 1050, 1100]); const ans = c / p * 100; return N({ q: `A bond pays a $${c} annual coupon and costs ${usd(p, 0)}. What is its current yield?`, ans, wrong: [c / 10, p / c, (c / p * 100) + 1], fmt: x => pct(x, 2), alt: () => (c * (1 / p)) * 100, tol: 1e-9, fixed: true, why: `Current yield = annual coupon ÷ price = ${c} ÷ ${p} = ${pct(ans, 2)}. It ignores any gain or loss when the bond is repaid at face value.` }); } },
    { k: 'calc', gen: () => { const cp = pick([4, 5, 6, 7]), n = pick([5, 8, 10]), y = pick([3, 4, 5, 6, 8]); const P = QL.bondPrice(100, cp / 100, y / 100, n, 2); const ans = y; return N({ q: `A ${cp}% semiannual-coupon bond with ${n} years to maturity is priced at ${num(P, 3)} per 100 of face. What is its yield to maturity (bond-equivalent)?`, ans, wrong: [cp / P * 100, cp, (cp + (100 - P) / n) / ((100 + P) / 2) * 100 + 0.6], fmt: x => pct(x, 2), alt: () => { let lo = -0.2, hi = 1; for (let k = 0; k < 100; k++) { const m = (lo + hi) / 2; let p = 0; for (let t = 1; t <= 2 * n; t++) p += (cp / 2 + (t === 2 * n ? 100 : 0)) / Math.pow(1 + m / 2, t); if (p > P) lo = m; else hi = m; } return (lo + hi) / 2 * 100; }, tol: 0.005, fixed: true, why: `Find the yearly rate that makes the discounted payments equal ${num(P, 3)}. It is ${pct(y, 2)}. ${y > cp ? 'The price is below face value (a discount), so the yield is above the coupon rate.' : y < cp ? 'The price is above face value (a premium), so the yield is below the coupon rate.' : 'The bond is priced at par, so yield equals the coupon rate.'}` }); } },
    { k: 'concept', q: 'What does yield to maturity assume about the coupons?', o: ['They are reinvested at the YTM', 'They are spent as received', 'They are reinvested at the risk-free rate', 'They are not paid'], a: 0, why: 'YTM is an IRR, and an IRR implicitly assumes intermediate cash flows earn the same rate.' },
    { k: 'concept', q: 'Which yield should a cautious investor use to describe a callable bond selling above its call price?', o: ['Yield to worst', 'Current yield', 'Coupon rate', 'Effective annual yield'], a: 0, why: 'Yield to worst takes the least favorable outcome, usually being called early.' },
    { k: 'concept', q: 'For a bond bought at a premium, how does YTM compare with current yield?', o: ['YTM is lower, because the premium is lost at maturity', 'YTM is higher', 'They are equal', 'YTM is always zero'], a: 0, why: 'You receive only face value at the end, so paying above face reduces the overall return.' },
    { k: 'concept', q: 'What is reinvestment risk?', o: ['Coupons may have to be reinvested at lower rates than the YTM assumed', 'The bond may be repaid late', 'The bond price may rise', 'The issuer may change its name'], a: 0, why: 'If market rates fall, reinvested coupons earn less and the realized return falls below the quoted YTM.' },
    { k: 'apply', q: 'A callable bond has YTM 5.35% and yield to call 5.21%. Which should you treat as the "safe" number?', o: ['5.21%: the yield to worst', '5.35%: the higher, so more accurate', 'The average of both', 'Neither: yields are not useful'], a: 0, why: 'Yield to worst is the lowest yield across possible outcomes, the conservative description.' },
    { k: 'apply', q: 'A callable bond trades far below its call price. Which yield is most likely its yield to worst?', o: ['Yield to maturity, because the bond is unlikely to be called', 'Yield to call', 'Current yield', 'The coupon rate'], a: 0, why: 'For a discount bond the yield to call is higher than the YTM (as the widget shows), so the lowest yield is the YTM.' }
  ],
  related: ['fi-basics', 'fi-duration', 'options']
},

{
  id: 'fi-duration', type: 'concept', title: 'Interest-rate risk: duration and convexity',
  blurb: 'A single number that says how much a bond\'s price moves when yields change, and the correction that makes it accurate.',
  level: 'Intermediate', min: 26, tags: ['duration', 'convexity'], widget: 'durconv',
  los: [
    'Explain duration as the weighted-average waiting time and as a measure of price sensitivity.',
    'Calculate modified duration from Macaulay duration.',
    'Estimate a bond\'s price change from a change in yield using duration, and DV01.',
    'Explain convexity and why more of it is better.',
    'State the rules of thumb linking coupon, maturity and yield to duration.'
  ],
  terms: [
    ['Macaulay duration', 'the payment-weighted average time, in years, until you receive a bond\'s cash flows'],
    ['Modified duration', 'Macaulay duration divided by (1 + yield per period); measures price sensitivity'],
    ['DV01', 'the dollar change in a position\'s value for a one basis point change in yield'],
    ['Basis point (bp)', 'one hundredth of a percentage point (0.01%)'],
    ['Convexity', 'the curvature of the price-yield relationship'],
    ['Negative convexity', 'price gains that are capped when yields fall, as in callable bonds and mortgages']
  ],
  body: `
<p>When yields rise, bond prices fall, but by how much? Long bonds move more than short bonds, and low-coupon bonds move more than high-coupon bonds. <b>Duration</b> packs all of this into one number.</p>

<aside class="callout story"><b class="lab">Picture this</b>
<p>Two friends each are owed $1,000. One will be paid tomorrow; the other in 30 years. Interest rates jump. Whose promise lost more value? The 30-year one: it is worth much less because it is shrunk over so many more years. "How long, on average, do I have to wait for my money?" is what duration measures, and the longer the wait, the more the price reacts to rates.</p></aside>

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
<details class="pause"><summary>Pause and try: a shorter bond</summary><p>A bond with modified duration 2 and yields up 1 point: price change ≈ −2 × 0.01 = <b>−2%</b>. Much smaller than the 10-year bond's −7.8%: short bonds are far less sensitive to rate changes.</p></details>

<h2>Convexity: fixing the error</h2>
<p>The estimate above is a straight line, but the true price-yield relationship is a curve that bows upward, as you saw in the pricing widget. The curvature is called <b>convexity</b>. It means duration slightly <em>overstates</em> the loss when yields rise and <em>understates</em> the gain when yields fall.</p>
<div class="fx"><div class="formula">% change in price ≈ − D<sub>mod</sub> × Δy + ½ × C × (Δy)²</div><div class="fx-body">
<p><b class="lab">In plain English</b>Add a small correction that is always positive (because (Δy)² is), so it helps you whichever way yields move. The bigger the yield move and the bigger the convexity <i>C</i>, the bigger the correction.</p>
<p class="ex"><b class="lab">Worked example</b>Same bond, C = 73.6. Yields +1 point: −7.79% + ½ × 73.6 × 0.0001 = <b>−7.43%</b> (exact: −7.44%). Yields −2 points: +15.59% + ½ × 73.6 × 0.0004 = <b>+17.06%</b> (exact: +17.17%). Duration alone was off by 1.6 points on the second move; adding convexity cut the error to 0.1.</p></div></div>
<p><b>All else equal, investors prefer more convexity</b>: the bond gains more when yields fall and loses less when they rise. <b>Callable bonds and mortgage-backed securities</b> can have <em>negative</em> convexity: when yields fall, borrowers refinance or the issuer calls, so price gains are capped. That is why they usually offer a higher yield.</p>
<aside class="callout mistake"><b class="lab">Common mistake</b><p>Using duration for large yield moves. It is a straight-line estimate of a curved relationship, accurate only for small changes. For a 2-point move, add the convexity correction or reprice the bond.</p></aside>
`,
  takeaways: [
    'Duration measures a bond\'s average waiting time and its price sensitivity: %ΔP ≈ −D_mod × Δy.',
    'Zero-coupon duration equals maturity; higher coupons shorten duration, longer maturities lengthen it.',
    'Convexity corrects duration\'s straight-line error; callable bonds and MBS can have negative convexity.'
  ],
  quiz: [
    { k: 'calc', gen: () => { const c = pick([3, 5, 6, 8]), y = pick([3, 4, 5, 6]), n = pick([5, 8, 10]); const mac = QL.macaulay(100, c / 100, y / 100, n, 2), ans = mac / (1 + y / 200); return N({ q: `A ${n}-year bond with a ${c}% semiannual coupon yields ${y}%. Its Macaulay duration is ${num(mac, 2)} years. What is its modified duration?`, ans, wrong: [mac, mac * (1 + y / 200), mac / (1 + y / 100)], fmt: x => num(x, 2), alt: () => { const P = h => QL.bondPrice(100, c / 100, y / 100 + h, n, 2), h = 1e-6; return -(P(h) - P(-h)) / (2 * h) / P(0); }, tol: 1e-4, fixed: true, why: `Modified duration = Macaulay ÷ (1 + y/2) = ${num(mac, 3)} ÷ ${round(1 + y / 200, 4)} = ${num(ans, 3)}. Dividing by (1 + yield per period) converts a waiting time into a price sensitivity.` }); } },
    { k: 'calc', gen: () => { const D = pick([3, 5, 7, 9]), dy = pick([0.25, 0.5, 1, 1.5]) * pick([1, -1]); const ans = -D * dy; return N({ q: `A bond has a modified duration of ${D}. Yields ${dy > 0 ? 'rise' : 'fall'} by ${Math.abs(dy)} percentage points. Using duration alone, about how much does its price change?`, ans, wrong: [D * dy, -D * dy / 100, D / Math.abs(dy)], fmt: x => (x > 0 ? '+' : '') + pct(x, 2), alt: () => -(D * dy / 100) * 100, tol: 1e-9, fixed: true, why: `Price change ≈ −D × Δy = −${D} × (${dy > 0 ? '+' : '−'}${Math.abs(dy)}%) = ${ans > 0 ? '+' : '−'}${Math.abs(round(ans, 2))}%.` }); } },
    { k: 'calc', gen: () => { const pos = pick([500000, 1000000, 2000000]), y = pick([4, 5, 6]), n = pick([5, 10, 20]), c = pick([4, 5, 6]); const D = QL.macaulay(100, c / 100, y / 100, n, 2) / (1 + y / 200), ans = D * pos * 0.0001; return N({ q: `You hold ${usd(pos, 0)} of a ${n}-year ${c}% semiannual bond yielding ${y}%. Its modified duration is ${num(D, 2)}. About what is its DV01, the dollar change for a one basis point move in yield?`, ans, wrong: [D * pos * 0.01, D * 0.0001, pos * 0.0001], fmt: x => usd(x, 0), alt: () => { const P = h => QL.bondPrice(100, c / 100, y / 100 + h, n, 2), P0 = P(0); return (P(-0.00005) - P(0.00005)) / P0 * pos; }, tol: pos * 0.0002, fixed: true, why: `DV01 = D_mod × position × 0.0001 = ${num(D, 2)} × ${usd(pos, 0)} × 0.0001 = ${usd(ans, 0)} per basis point. A full percentage point (100 bp) would be about ${usd(ans * 100, 0)}.` }); } },
    { k: 'calc', gen: () => { const w = pick([0.25, 0.4, 0.5, 0.6]), d1 = pick([2, 4, 5]), d2 = pick([8, 10, 12]); const ans = w * d1 + (1 - w) * d2; return N({ q: `A portfolio has ${w * 100}% in a bond of duration ${d1} and the rest in a bond of duration ${d2}. What is the portfolio duration?`, ans, wrong: [(d1 + d2) / 2, d1 * d2, w * d2 + (1 - w) * d1], fmt: x => num(x, 2), alt: () => d2 - w * (d2 - d1), tol: 1e-9, fixed: true, why: `Portfolio duration is the value-weighted average: ${w} × ${d1} + ${round(1 - w, 2)} × ${d2} = ${num(ans, 2)}.` }); } },
    { k: 'concept', q: 'What is the Macaulay duration of a 7-year zero-coupon bond?', o: ['Exactly 7 years', 'Less than 7 years', 'More than 7 years', 'Depends on the yield'], a: 0, why: 'It pays everything at maturity, so its weighted-average waiting time is its maturity.' },
    { k: 'concept', q: 'Two bonds have the same duration. Bond A has higher convexity. If yields move a lot, Bond A...', o: ['Does better either way, all else equal', 'Does worse either way', 'Does better only if yields rise', 'Has no advantage'], a: 0, why: 'Convexity adds a positive term whichever way yields move.' },
    { k: 'concept', q: 'Which change would lengthen a bond\'s duration, all else equal?', o: ['A longer maturity', 'A higher coupon', 'A higher yield', 'More frequent coupons'], a: 0, why: 'A longer maturity pushes cash flows further out; higher coupons or yields shorten duration.' },
    { k: 'apply', q: 'A mortgage-backed security has negative convexity. What happens when yields fall sharply?', o: ['Borrowers refinance, capping the price gain', 'Its price rises without limit', 'It stops paying', 'Nothing'], a: 0, why: 'Prepayments speed up when rates fall, so the price rises less than a normal bond\'s would.' },
    { k: 'apply', q: 'You expect yields to fall and want the biggest price gain. Which bond suits, all else equal?', o: ['One with long maturity and low coupon (long duration)', 'A short-term high-coupon bond', 'Cash', 'A one-month bill'], a: 0, why: 'Longer duration means a bigger price response to a fall in yields.' }
  ],
  related: ['fi-basics', 'rates', 'fi-immun']
},

{
  id: 'fi-term', type: 'concept', title: 'The term structure: spot rates, forward rates and the yield curve',
  blurb: 'Why a five-year rate and a one-year rate differ, how to read a future rate out of today\'s curve, and what theories explain the shape.',
  level: 'Intermediate', min: 24, tags: ['term structure', 'forward rates', 'spot rates'], widget: 'fwd',
  los: [
    'Explain the difference between a spot rate and a yield on a coupon bond.',
    'Extract a spot rate from a coupon bond by bootstrapping.',
    'Calculate a forward rate from two spot rates.',
    'Describe the expectations, liquidity-preference and segmentation theories.',
    'Summarize what evidence says about yield-curve movements and recessions.'
  ],
  terms: [
    ['Spot rate', 'the yearly yield on a zero-coupon bond of a given maturity'],
    ['Zero-coupon bond', 'a bond that pays only its face value at maturity'],
    ['Bootstrapping', 'working out spot rates one maturity at a time from coupon-bond prices'],
    ['Forward rate', 'the rate for a future period that is implied by today\'s spot rates'],
    ['Term premium', 'extra yield investors demand for holding longer-maturity bonds'],
    ['Level / slope / curvature', 'the three main ways the yield curve moves']
  ],
  body: `
<p>The <a href="#/lesson/rates">yield curve</a> plots yields against maturity. But yields on coupon-paying bonds mix together rates for different years. To price cash flows properly we need a rate for each maturity separately.</p>

<h2>Spot rates</h2>
<p>A <b>spot rate</b> <i>s<sub>n</sub></i> is the yearly yield on a zero-coupon bond maturing in <i>n</i> years: the return for lending money today for exactly <i>n</i> years, with nothing in between. A bond's price is then the sum of each cash flow discounted at the spot rate for <em>its</em> date. The set of spot rates for all maturities is the <b>spot curve</b> (or zero curve).</p>
<p><b>Bootstrapping</b> extracts spot rates from coupon bonds one maturity at a time. Example with annual coupons: a 1-year bond yielding 3% gives <i>s</i><sub>1</sub> = 3%. A 2-year par bond with a 4% coupon must satisfy 4 ÷ 1.03 + 104 ÷ (1 + <i>s</i><sub>2</sub>)² = 100. That gives (1 + <i>s</i><sub>2</sub>)² = 104 ÷ 96.117 = 1.0820, so <i>s</i><sub>2</sub> = <b>4.02%</b>: slightly above the 4% par yield.</p>

<h2>Forward rates</h2>
<aside class="callout story"><b class="lab">Picture this</b>
<p>You have $100 for two years. Option A: lock it up for two years at today's 2-year rate of 4% a year. Option B: lend for one year at 3%, then lend again for the second year. You do not yet know next year's rate. But for A and B to be fair to each other, next year's rate would have to be whatever makes them end up equal. That break-even rate, implied by today's curve, is the <b>forward rate</b>.</p></aside>
<div class="fx"><div class="formula">(1 + s<sub>n</sub>)<sup>n</sup> = (1 + s<sub>n−1</sub>)<sup>n−1</sup> × (1 + f<sub>n</sub>) &nbsp;&nbsp;⇒&nbsp;&nbsp; f<sub>n</sub> = (1 + s<sub>n</sub>)<sup>n</sup> ÷ (1 + s<sub>n−1</sub>)<sup>n−1</sup> − 1</div><div class="fx-body">
<p><b class="lab">In plain English</b>You can invest for <i>n</i> years in one step at the <i>n</i>-year spot rate, or invest for <i>n</i>−1 years and then lock in a rate for the last year. Both routes must end with the same money, otherwise there would be a risk-free profit. The <b>forward rate</b> <i>f<sub>n</sub></i> is whatever rate for year <i>n</i> makes the two routes equal.</p>
<dl class="syms"><dt>s<sub>n</sub></dt><dd>spot rate for maturity <i>n</i> years</dd><dt>f<sub>n</sub></dt><dd>the one-year forward rate that applies to year <i>n</i> (from year <i>n</i>−1 to year <i>n</i>)</dd></dl>
<p class="ex"><b class="lab">Worked example</b>1-year spot 3%, 2-year spot 4%. Forward rate for year 2: 1.04² ÷ 1.03 − 1 = 1.0816 ÷ 1.03 − 1 = <b>5.01%</b>. Check: $100 at 4% for two years → $108.16. $100 at 3% for one year → $103, then at 5.01% → $108.16. ✔</p>
<p class="hook"><b class="lab">Remember it as</b>"The forward rate is the extra return needed on the last year to make a long investment match a short one."</p></div></div>
<details class="pause"><summary>Pause and try: a downward curve</summary><p>1-year spot 5%, 2-year spot 4%. f<sub>2</sub> = 1.04² ÷ 1.05 − 1 = 1.0816 ÷ 1.05 − 1 = <b>3.01%</b>. The curve slopes down, so the forward rate is <em>below</em> the spot rates.</p></details>
<p>When the spot curve slopes <b>upward</b>, forward rates lie <b>above</b> the spot rates; when it slopes downward, forwards lie below. Use the widget below to see this: the "Show the math" panel derives each forward rate from your spot rates.</p>

<h2>Theories of the yield curve's shape</h2>
<ul>
<li><b>Pure expectations:</b> forward rates equal the market's expectation of future spot rates, so an upward curve means rates are expected to rise.</li>
<li><b>Liquidity preference:</b> long bonds are riskier, so investors demand a <b>term premium</b>; forward rates = expected future rates + a premium. This tends to make curves slope upward.</li>
<li><b>Market segmentation and preferred habitat:</b> different investors (pension funds, banks) prefer different maturities, so supply and demand in each segment shape yields, and investors leave their habitat only if compensated.</li>
</ul>

<h2>What the evidence says</h2>
<p>Campbell and Shiller (1991) found that the pure expectations theory fits poorly: a high spread does forecast rising short rates, as the theory says, but it also forecasts <em>falling</em> long-term yields, the opposite of what the theory says. Cochrane and Piazzesi (2005) found that a combination of forward rates predicts bond excess returns, so risk premia vary over time. Litterman and Scheinkman (1991) showed that yield curve movements are mostly a combination of three shapes: a <b>level</b> shift (all yields move together), a <b>slope</b> change (steepening or flattening) and a <b>curvature</b> change (the middle moves versus the ends). And Estrella and Mishkin (1998) found that the slope of the curve is a strong predictor of US recessions. See the <a href="#/lesson/p-campbell91">Campbell–Shiller</a>, <a href="#/lesson/p-litterman91">Litterman–Scheinkman</a> and <a href="#/lesson/p-estrella98">Estrella–Mishkin</a> paper pages.</p>
<aside class="callout mistake"><b class="lab">Common mistake</b><p>Treating forward rates as forecasts of what future rates will be. They are what today's prices <em>imply</em>, including any risk premium. The evidence shows they are not reliable predictions on their own.</p></aside>
`,
  takeaways: [
    'A spot rate is the yield on a zero-coupon bond; bond prices discount each cash flow at its own spot rate.',
    'Forward rate: f_n = (1 + s_n)^n ÷ (1 + s_(n−1))^(n−1) − 1. Upward-sloping curve → forwards above spots.',
    'Expectations, liquidity-preference and segmentation theories explain the shape; three factors (level, slope, curvature) explain most movements.'
  ],
  quiz: [
    { k: 'calc', gen: () => { const s1 = pick([2, 3, 4, 5]), s2 = s1 + pick([-1, 0.5, 1, 1.5]); const ans = (Math.pow(1 + s2 / 100, 2) / (1 + s1 / 100) - 1) * 100; return N({ q: `The 1-year spot rate is ${s1}% and the 2-year spot rate is ${s2}%. What is the implied forward rate for year 2?`, ans, wrong: [(s1 + s2) / 2, s2, 2 * s2 - s1 - 0.5], fmt: x => pct(x, 2), alt: () => { const grow2 = 100 * Math.pow(1 + s2 / 100, 2), grow1 = 100 * (1 + s1 / 100); return (grow2 / grow1 - 1) * 100; }, tol: 1e-9, fixed: true, why: `f₂ = (1 + ${s2}%)² ÷ (1 + ${s1}%) − 1 = ${round(Math.pow(1 + s2 / 100, 2), 5)} ÷ ${round(1 + s1 / 100, 4)} − 1 = ${pct(ans, 2)}. ${s2 > s1 ? 'The curve slopes up, so the forward rate is above both spot rates.' : 'The curve slopes down, so the forward rate is below the spot rates.'}` }); } },
    { k: 'calc', gen: () => { const s1 = pick([2, 3, 4]), c = pick([3, 4, 5, 6]); const ans = (Math.sqrt((100 + c) / (100 - c / (1 + s1 / 100))) - 1) * 100; return N({ q: `The 1-year spot rate is ${s1}%. A 2-year bond paying an annual ${c}% coupon trades at par (100). What is the 2-year spot rate? (Bootstrap it.)`, ans, wrong: [c, (s1 + c) / 2, c - 0.5], fmt: x => pct(x, 2), alt: () => { let lo = 0, hi = 0.3; for (let k = 0; k < 100; k++) { const m = (lo + hi) / 2; const p = c / (1 + s1 / 100) + (100 + c) / Math.pow(1 + m, 2); if (p > 100) lo = m; else hi = m; } return (lo + hi) / 2 * 100; }, tol: 1e-6, fixed: true, why: `Price = C ÷ (1 + s₁) + (100 + C) ÷ (1 + s₂)² = 100. So (1 + s₂)² = ${100 + c} ÷ (100 − ${c} ÷ ${round(1 + s1 / 100, 4)}) = ${round((100 + c) / (100 - c / (1 + s1 / 100)), 5)}, giving s₂ = ${pct(ans, 3)}.` }); } },
    { k: 'concept', q: 'If the spot curve slopes upward, forward rates are...', o: ['Above the spot rates', 'Below the spot rates', 'Equal to spot rates', 'Always zero'], a: 0, why: 'Locking in a higher long-term rate requires a higher rate for the later years.' },
    { k: 'concept', q: 'Which three factors explain most yield-curve movements (Litterman–Scheinkman)?', o: ['Level, slope and curvature', 'Inflation, growth, and unemployment', 'Duration, convexity and yield', 'Coupon, price and maturity'], a: 0, why: 'Principal-component analysis of Treasury returns found level, steepness and curvature.' },
    { k: 'concept', q: 'What is a spot rate?', o: ['The yearly yield on a zero-coupon bond of a given maturity', 'The rate for a loan starting in the future', 'The rate on a coupon bond at issue', 'A central bank policy rate'], a: 0, why: 'A spot rate is the return for lending today for exactly n years, with no payments in between.' },
    { k: 'concept', q: 'According to the liquidity-preference theory, why does the curve tend to slope upward?', o: ['Investors demand a term premium for holding longer, riskier bonds', 'Central banks always raise rates', 'Short bonds are riskier', 'Inflation is always rising'], a: 0, why: 'Forward rates equal expected future rates plus a premium for the extra risk of longer maturities.' },
    { k: 'apply', q: 'A manager says, "Forward rates tell us exactly where rates will be next year." What is the best response?', o: ['They are what today\'s prices imply, including risk premia; evidence shows they are not reliable forecasts on their own', 'She is right', 'Forward rates are always zero', 'Forward rates ignore prices'], a: 0, why: 'Campbell and Shiller found the pure expectations view fits poorly. Forward rates include risk premia.' },
    { k: 'concept', q: 'What does the market segmentation (preferred habitat) theory say?', o: ['Different investors prefer different maturities, so supply and demand in each segment shape yields', 'All rates are set by the central bank', 'Long rates are always below short rates', 'Only short bonds are traded'], a: 0, why: 'Pension funds, banks and others have preferred maturities, and leave them only if compensated.' }
  ],
  related: ['rates', 'p-campbell91', 'p-litterman91', 'p-estrella98']
},

{
  id: 'fi-credit', type: 'concept', title: 'Credit risk and credit spreads',
  blurb: 'How the chance of default and the recovery after default show up as the extra yield on corporate bonds.',
  level: 'Intermediate', min: 20, tags: ['credit', 'spreads', 'default'], widget: 'credit',
  los: [
    'Define credit spread and basis point.',
    'Calculate expected loss from probability of default, loss given default and exposure.',
    'Estimate a credit spread from default intensity and recovery.',
    'Explain why observed spreads are wider than expected losses.',
    'Describe Merton\'s idea that equity is like a call option on the firm\'s assets.'
  ],
  terms: [
    ['Credit spread', 'the extra yield a risky bond pays over a comparable risk-free bond'],
    ['Basis point (bp)', '0.01%; 100 bp = 1 percentage point'],
    ['Probability of default (PD)', 'the chance the borrower fails to pay in the period'],
    ['Loss given default (LGD)', 'the share of the exposure lost if default happens'],
    ['Recovery rate', 'the share of the exposure recovered after default (LGD = 1 minus recovery)'],
    ['Exposure at default (EAD)', 'the amount owed when the borrower fails']
  ],
  body: `
<p>A Treasury bond is treated as safe; a corporate bond might not pay in full. Investors demand extra yield for that risk. The extra yield over a comparable risk-free bond is the <b>credit spread</b>, quoted in <b>basis points</b> (1 bp = 0.01%). This lesson connects to the <a href="#/lesson/fsa-credit">credit and distress analysis</a> lesson.</p>

<aside class="callout story"><b class="lab">Picture this</b>
<p>A safe government bond yields 4%. A company bond of the same maturity yields 5.2%. The extra 1.2 percentage points (120 bp) is the credit spread. It is the market's price for the possibility that the company does not pay, plus a little more for other worries.</p></aside>

<h2>Expected loss</h2>
<div class="fx"><div class="formula">Expected loss = PD × LGD × EAD &nbsp;&nbsp; LGD = 1 − Recovery rate</div><div class="fx-body">
<p><b class="lab">In plain English</b>To measure the cost of default risk, multiply three things: how likely default is, how much of the exposure you lose if it happens, and how much you have at risk.</p>
<dl class="syms"><dt>PD</dt><dd>probability of default over the period</dd><dt>LGD</dt><dd>loss given default: the share of the exposure not recovered</dd><dt>EAD</dt><dd>exposure at default: the amount owed when the borrower fails</dd></dl>
<p class="ex"><b class="lab">Worked example</b>PD = 3%, recovery = 40% (so LGD = 60%), exposure $1,000,000: expected loss = 0.03 × 0.60 × 1,000,000 = <b>$18,000</b>.</p></div></div>

<h2>From default risk to spread</h2>
<div class="fx"><div class="formula">Credit spread ≈ λ × (1 − R)</div><div class="fx-body">
<p><b class="lab">In plain English</b>If a bond faces a yearly default intensity <i>λ</i> (roughly the yearly chance of default) and you would recover a share <i>R</i>, then each year you expect to lose about λ × (1 − R) of the bond's value. To break even, investors need that much extra yield.</p>
<p class="ex"><b class="lab">Worked example</b>λ = 2% a year, recovery 40%: spread ≈ 0.02 × 0.60 = 1.2% = <b>120 bp</b>. Pricing a 5-year zero-coupon bond exactly (risk-free rate 4%) gives a price of 77.20 versus 81.87 for the risk-free bond, a yield of 5.18% and a spread of <b>117.6 bp</b>, close to the rule of thumb.</p></div></div>
<p>Here <i>λ</i> is a default probability used for <em>pricing</em>, so it includes compensation for risk (the "risk-neutral" probability). It is usually higher than actual historical default frequencies.</p>
<details class="pause"><summary>Pause and try: a safer firm</summary><p>Default intensity 0.5% a year, recovery 50%: spread ≈ 0.005 × 0.50 = 0.25% = <b>25 bp</b>. A high-quality borrower needs only a thin spread.</p></details>

<h2>Why spreads are wider than expected losses</h2>
<p>Elton, Gruber, Agrawal and Mann (2001) found that expected default losses explain only a small part of corporate spreads. State taxes (Treasury interest is exempt from state income tax, corporate interest is not) explain a substantial part, and the rest is compensation for systematic risk. Longstaff, Mithal and Neis (2005), using credit default swaps, found that default risk explains the majority of spreads, with illiquidity the rest. The evidence differs by method and period, but everyone agrees that <b>spread ≠ expected loss</b>.</p>

<h2>What drives credit risk</h2>
<ul>
<li><b>Leverage and cash flow coverage</b> (the ratios in the credit analysis lesson).</li>
<li><b>Business volatility.</b> In Merton's (1974) structural model, a firm's equity is a call option on its assets and its debt is a risk-free bond minus a put option on those assets. A firm defaults when assets fall below the debt owed. Higher leverage or more volatile assets means a wider spread. See the <a href="#/lesson/p-merton74">Merton paper</a>.</li>
<li><b>Seniority and collateral</b> raise recovery. <b>Covenants</b> restrict risky behavior.</li>
<li><b>Ratings</b> (AAA down to D) summarize creditworthiness. BBB−/Baa3 is the lowest investment-grade rating; below is high yield.</li>
</ul>
<aside class="callout mistake"><b class="lab">Common mistake</b><p>Reading a 300 bp spread as "a 3% chance of losing everything". The spread pays for expected loss <em>after recovery</em>, plus risk, tax and liquidity premia. The default probability itself is usually smaller.</p></aside>
`,
  takeaways: [
    'Expected loss = PD × LGD × EAD, where LGD = 1 − recovery.',
    'Credit spread ≈ default intensity × (1 − recovery), but observed spreads also pay for risk, taxes and illiquidity.',
    'Merton: equity is a call on the firm\'s assets; risky debt = safe debt − a put.'
  ],
  quiz: [
    { k: 'calc', gen: () => { const pd = pick([1, 2, 3, 5]), rec = pick([20, 30, 40, 50, 60]), ead = pick([500000, 1000000, 2000000]); const ans = pd / 100 * (1 - rec / 100) * ead; return N({ q: `A loan has a ${pd}% probability of default, a recovery rate of ${rec}% and an exposure of ${usd(ead, 0)}. What is the expected loss?`, ans, wrong: [pd / 100 * ead, pd / 100 * rec / 100 * ead, (1 - rec / 100) * ead], fmt: x => usd(x, 0), alt: () => ead * pd / 100 - ead * pd / 100 * rec / 100, tol: 1e-6, fixed: true, why: `LGD = 1 − ${rec}% = ${100 - rec}%. Expected loss = PD × LGD × EAD = ${pd / 100} × ${round(1 - rec / 100, 2)} × ${usd(ead, 0)} = ${usd(ans, 0)}. Using the recovery rate instead of LGD would count what you get back as a loss.` }); } },
    { k: 'calc', gen: () => { const lam = pick([0.5, 1, 2, 3]), rec = pick([30, 40, 50]); const ans = lam * (1 - rec / 100) * 100; return N({ q: `A bond faces a default intensity of ${lam}% a year and a recovery rate of ${rec}%. Roughly what credit spread (in basis points) does that imply?`, ans, wrong: [lam * 100, lam * rec, lam * (1 + rec / 100) * 100], fmt: x => num(x, 0) + ' bp', alt: () => { const rf = 0.04, T = 5, S = Math.exp(-lam / 100 * T), P = Math.exp(-rf * T) * (S + rec / 100 * (1 - S)); return (-Math.log(P) / T - rf) * 10000; }, tol: 10, fixed: true, why: `Spread ≈ λ × (1 − R) = ${lam}% × ${round(1 - rec / 100, 2)} = ${round(ans / 100, 3)}% = ${num(ans, 0)} bp. (Pricing a 5-year zero-coupon bond exactly gives nearly the same answer.)` }); } },
    { k: 'concept', q: 'Why are corporate spreads usually wider than the losses expected from defaults?', o: ['They also compensate for systematic risk, taxes and illiquidity', 'Corporate bonds never default', 'Treasuries are riskier', 'Recovery is always zero'], a: 0, why: 'Elton et al. find expected default is only part of the spread.' },
    { k: 'concept', q: 'In Merton\'s model, a firm\'s equity is like...', o: ['A call option on the firm\'s assets', 'A put option on debt', 'A risk-free bond', 'A dividend'], a: 0, why: 'Shareholders keep whatever is left above the debt owed, which is a call payoff on the assets with the debt as strike.' },
    { k: 'concept', q: 'Loss given default (LGD) equals...', o: ['1 minus the recovery rate', 'The recovery rate', 'Probability of default', 'Exposure divided by price'], a: 0, why: 'If you recover 40%, you lose 60% of the exposure.' },
    { k: 'apply', q: 'One bond has a spread of 40 bp and another 400 bp, same maturity. What does the market think?', o: ['The second bond has a much higher perceived credit risk', 'They are equally risky', 'The first is riskier', 'Spreads say nothing'], a: 0, why: 'A wider spread is the extra yield demanded for more default risk (and related premia).' },
    { k: 'apply', q: 'A lender has a choice between a senior secured loan and an unsecured loan to the same firm. Which typically has higher recovery?', o: ['The senior secured loan', 'The unsecured loan', 'They are the same', 'Neither recovers anything'], a: 0, why: 'Seniority and collateral raise recovery in default.' },
    { k: 'concept', q: 'What is the recovery rate?', o: ['The share of the exposure recovered after a default', 'The chance of default', 'The bond\'s coupon', 'The credit rating'], a: 0, why: 'A 40% recovery rate means you get back 40 cents on the dollar, so loss given default is 60%.' }
  ],
  related: ['fsa-credit', 'p-merton74', 'p-elton01']
},

{
  id: 'fi-tips', type: 'concept', title: 'Inflation-linked bonds and breakeven inflation',
  blurb: 'How TIPS protect purchasing power, and how the gap between nominal and real yields reveals the market\'s inflation expectations.',
  level: 'Intermediate', min: 16, tags: ['TIPS', 'inflation', 'breakeven'], widget: 'tips',
  los: [
    'Explain how TIPS adjust principal and coupons for inflation.',
    'Calculate an inflation-adjusted principal and coupon.',
    'Calculate breakeven inflation from nominal and real yields.',
    'Say which bond wins when inflation turns out higher or lower than breakeven.',
    'Explain why breakeven is not a pure inflation forecast.'
  ],
  terms: [
    ['TIPS', 'Treasury Inflation-Protected Securities: US government bonds whose principal rises with inflation'],
    ['CPI', 'consumer price index, a common measure of inflation'],
    ['Real yield', 'the yield above inflation'],
    ['Nominal yield', 'the ordinary quoted yield, not adjusted for inflation'],
    ['Breakeven inflation', 'the inflation rate at which a nominal bond and a TIPS pay the same']
  ],
  body: `
<p>An ordinary bond pays fixed dollars, so inflation erodes what they buy. An <b>inflation-linked bond</b> adjusts for inflation. In the US these are <b>TIPS</b> (Treasury Inflation-Protected Securities).</p>

<aside class="callout story"><b class="lab">Picture this</b>
<p>You are promised $1,000 in 10 years. If prices double over that time, that $1,000 buys only half of what it does now. A TIPS says instead: "we will pay you the amount that keeps your buying power". If prices double, you are repaid about $2,000. The inflation risk moves from you to the government.</p></aside>

<h2>How TIPS work</h2>
<ul>
<li>The <b>principal is adjusted</b> for changes in the consumer price index (CPI-U, with a lag of about three months).</li>
<li>The <b>coupon rate is fixed and real</b>, but it is applied to the adjusted principal, so coupon dollars rise with inflation.</li>
<li>At maturity you receive the adjusted principal or the original principal, whichever is greater, so there is a floor against deflation.</li>
<li>The yield quoted on a TIPS is a <b>real yield</b>: the return above inflation.</li>
<li>Tax caveat: in taxable accounts the inflation adjustment is taxed as income each year even though you do not receive it until maturity.</li>
</ul>
<div class="example"><b class="lab">Example</b><p>A TIPS has a $1,000 principal and a 2% real coupon. Inflation runs at 3% for one year. What is the adjusted principal and the coupon paid?</p>
<b class="lab sol">Solution</b><p>Adjusted principal = 1,000 × 1.03 = <b>$1,030</b>. Coupon = 2% × 1,030 = <b>$20.60</b> (instead of $20 without inflation). Both grow with prices.</p></div>

<h2>Breakeven inflation</h2>
<div class="fx"><div class="formula">Breakeven inflation = (1 + nominal yield) ÷ (1 + real yield) − 1 &nbsp;≈&nbsp; nominal yield − real yield</div><div class="fx-body">
<p><b class="lab">In plain English</b>A nominal Treasury pays a fixed yield; a TIPS pays its real yield <em>plus</em> actual inflation. Breakeven inflation is the inflation rate at which the two pay the same. It is the Fisher equation from the <a href="#/lesson/rates">rates lesson</a>, solved for inflation.</p>
<p class="ex"><b class="lab">Worked example</b>10-year nominal yield 4%, 10-year TIPS real yield 1.5%. Breakeven = 1.04 ÷ 1.015 − 1 = <b>2.46%</b> (shortcut: 4 − 1.5 = 2.5%). If inflation averages more than 2.46% a year, the TIPS wins; if less, the nominal bond wins. At 3% inflation, TIPS return about (1.015)(1.03) − 1 = 4.55% a year versus 4%.</p>
<p class="hook"><b class="lab">Remember it as</b>"Breakeven = nominal yield minus real yield."</p></div></div>
<details class="pause"><summary>Pause and try: which bond wins?</summary><p>Breakeven is 2.5%. If inflation turns out at 1.5%, the <b>nominal</b> bond wins (its fixed 4% beats real 1.5% + inflation 1.5% = about 3%). If inflation is 4%, the <b>TIPS</b> wins (about 1.5% + 4% = 5.5%).</p></details>

<h2>Reading breakeven with care</h2>
<p>Breakeven is not a pure forecast of inflation. Roughly, <b>breakeven ≈ expected inflation + inflation risk premium − TIPS liquidity premium</b>. Nominal bonds carry inflation risk, so investors want compensation (pushing breakeven up), while TIPS are less liquid, so TIPS yields include a premium (pushing breakeven down). Even so, changes in breakeven are widely watched as a market signal of shifting inflation expectations.</p>
<aside class="callout mistake"><b class="lab">Common mistake</b><p>Thinking TIPS cannot lose money. Their <em>real</em> yield can rise, which cuts the price, and in taxable accounts the yearly inflation adjustment is taxed before you receive it. TIPS protect against inflation, not against interest-rate risk.</p></aside>
`,
  takeaways: [
    'TIPS adjust principal for CPI; the fixed real coupon applies to the adjusted principal.',
    'Breakeven inflation = (1 + nominal) ÷ (1 + real) − 1 ≈ nominal − real.',
    'Breakeven also includes risk and liquidity premia, so it is not a pure inflation forecast.'
  ],
  quiz: [
    { k: 'calc', gen: () => { const nom = pick([3.5, 4, 4.2, 5]), real = pick([0.5, 1, 1.5, 2]); const ans = ((1 + nom / 100) / (1 + real / 100) - 1) * 100; return N({ q: `The 10-year nominal yield is ${nom}% and the 10-year TIPS real yield is ${real}%. What is the (exact) breakeven inflation rate?`, ans, wrong: [nom - real, nom / real, nom + real], fmt: x => pct(x, 2), alt: () => { let lo = 0, hi = 0.2; for (let k = 0; k < 100; k++) { const m = (lo + hi) / 2; if ((1 + real / 100) * (1 + m) < 1 + nom / 100) lo = m; else hi = m; } return (lo + hi) / 2 * 100; }, tol: 1e-6, fixed: true, why: `Breakeven = (1 + ${nom}%) ÷ (1 + ${real}%) − 1 = ${round(1 + nom / 100, 4)} ÷ ${round(1 + real / 100, 4)} − 1 = ${pct(ans, 2)}. The shortcut ${nom} − ${real} = ${round(nom - real, 2)}% is close.` }); } },
    { k: 'calc', gen: () => { const P = pick([1000, 5000, 10000]), i = pick([2, 3, 4]), n = pick([2, 3, 5]); const ans = P * Math.pow(1 + i / 100, n); return N({ q: `A TIPS has an original principal of ${usd(P, 0)}. Inflation is ${i}% a year for ${n} years. What is the inflation-adjusted principal?`, ans, wrong: [P * (1 + i / 100 * n), P, P * Math.pow(1 + i / 100, n - 1)], fmt: x => usd(x, 2), alt: () => { let p = P; for (let y = 0; y < n; y++) p += p * i / 100; return p; }, tol: 1e-6, fixed: true, why: `Principal grows with the price level: ${usd(P, 0)} × ${1 + i / 100}^${n} = ${usd(ans, 2)}. Adding ${i}% × ${n} simply (${usd(P * (1 + i / 100 * n), 2)}) ignores compounding.` }); } },
    { k: 'calc', gen: () => { const P = pick([1000, 2000]), cr = pick([1, 1.5, 2, 2.5]), i = pick([2, 3, 5]); const ans = P * (1 + i / 100) * cr / 100; return N({ q: `A TIPS has a $${P} principal and a ${cr}% real coupon. After a year of ${i}% inflation, what coupon (in dollars) does it pay?`, ans, wrong: [P * cr / 100, P * cr / 100 + P * i / 100, P * (1 + i / 100)], fmt: x => usd(x, 2), alt: () => cr / 100 * (P + P * i / 100), tol: 1e-9, fixed: true, why: `The coupon rate is applied to the adjusted principal: ${cr}% × $${P * (1 + i / 100)} = ${usd(ans, 2)}. Both the principal and the coupon dollars rise with prices.` }); } },
    { k: 'concept', q: 'If realized inflation ends up higher than breakeven, which bond does better?', o: ['The TIPS', 'The nominal bond', 'Neither', 'They always tie'], a: 0, why: 'TIPS pay real yield plus actual inflation.' },
    { k: 'concept', q: 'On a TIPS, what is adjusted for inflation?', o: ['The principal (and so the coupon dollars)', 'The coupon rate', 'The maturity date', 'The yield to maturity'], a: 0, why: 'The fixed real coupon rate is applied to the inflation-adjusted principal.' },
    { k: 'concept', q: 'Why is breakeven inflation not a pure forecast of inflation?', o: ['It also includes an inflation risk premium and a liquidity premium', 'It ignores nominal yields', 'It is set by the central bank', 'It is always zero'], a: 0, why: 'Risk and liquidity premia push breakeven up and down away from pure expected inflation.' },
    { k: 'apply', q: 'The 10-year nominal yield is 4% and the TIPS real yield is 1.5% (breakeven about 2.5%). You expect inflation to average 3.5%. Which bond suits your view?', o: ['The TIPS', 'The nominal bond', 'Cash', 'Neither'], a: 0, why: 'You expect inflation above breakeven, so the TIPS should pay more than the nominal bond.' },
    { k: 'apply', q: 'Prices fall over the life of a TIPS (deflation). What protection does the principal floor give at maturity?', o: ['You receive at least the original principal', 'You receive half the principal', 'Nothing', 'Double the principal'], a: 0, why: 'At maturity you receive the adjusted principal or the original principal, whichever is greater.' }
  ],
  related: ['rates', 'fi-basics', 'fi-term']
},

{
  id: 'fi-immun', type: 'concept', title: 'Managing bond portfolios: duration matching and immunization',
  blurb: 'How to fund a future liability so that interest-rate changes don\'t break the plan.',
  level: 'Intermediate', min: 24, tags: ['immunization', 'duration', 'liabilities'], widget: 'immun',
  los: [
    'Explain price risk and reinvestment risk and why they offset.',
    'State the immunization rule for a single liability.',
    'Calculate the duration of a portfolio of bonds.',
    'Compare bullet, barbell and ladder portfolios.',
    'Describe the limits of immunization and the cash-flow-matching alternative.'
  ],
  terms: [
    ['Liability', 'a payment you owe at a known future date'],
    ['Immunization', 'structuring a bond portfolio so that interest-rate changes do not stop it meeting a liability'],
    ['Price risk / reinvestment risk', 'bond prices fall when yields rise / coupons are reinvested at lower rates when yields fall'],
    ['Cash-flow matching (dedication)', 'buying bonds whose payments line up exactly with the liabilities'],
    ['Bullet / barbell / ladder', 'portfolios concentrated near one maturity / at two extremes / spread evenly'],
    ['LDI', 'liability-driven investing: managing assets to meet liabilities']
  ],
  body: `
<p>Suppose you owe a fixed sum on a known date (a pension payment, a tuition bill, an insurer's claim). You want to be sure your bond portfolio will be worth enough on that date, whatever happens to interest rates. Interest rates hurt in two opposite ways:</p>
<ul>
<li><b>Price risk:</b> if yields rise, the market value of bonds you will sell falls.</li>
<li><b>Reinvestment risk:</b> if yields rise, the coupons you reinvest earn <em>more</em>, and if yields fall they earn less.</li>
</ul>
<p>The two effects push in opposite directions. <b>Immunization</b> chooses the portfolio so that they cancel.</p>

<aside class="callout story"><b class="lab">Picture this</b>
<p>Imagine walking on a moving walkway against the direction it moves. Push forward too hard and you overshoot; too little and you drift back. There is one speed that keeps you in place. Immunization finds the "speed" (the duration) at which rate changes push your outcome up and down by equal amounts, so it stays put.</p></aside>

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
<div class="example"><b class="lab">Example</b><p>You owe $1,000,000 in 8 years and the market yield is 5%. How much must you invest today to be fully funded (the first Redington condition)?</p>
<b class="lab sol">Solution</b><p>PV = 1,000,000 ÷ 1.05<sup>8</sup> = 1,000,000 ÷ 1.4775 = <b>$676,839</b>. Invest that in bonds whose duration is about 8 years.</p></div>
<details class="pause"><summary>Pause and try: why not just buy a bond that matures in 8 years?</summary><p>An 8-year maturity bond has a duration <em>shorter</em> than 8 (the coupons come back earlier), so it would be exposed to reinvestment risk. To get a duration of 8 you need a bond with a somewhat longer maturity (like the 10-year, 5% coupon example, whose duration is about 8.1).</p></details>

<h2>Portfolio duration</h2>
<p>The duration of a portfolio is the market-value-weighted average of the durations of its bonds. Half in a bond with duration 4 and half in a bond with duration 10 has a duration of 0.5 × 4 + 0.5 × 10 = <b>7</b>. That is why different combinations, a <b>bullet</b> (all near one maturity), a <b>barbell</b> (short and long bonds) or a <b>ladder</b> (evenly spread maturities), can share the same duration. For equal duration, a barbell usually has more convexity than a bullet.</p>

<h2>Limits of immunization</h2>
<ul>
<li>It protects against <b>small, parallel</b> shifts in the curve. Twists and curvature changes (see the <a href="#/lesson/fi-term">term structure lesson</a>) can still cause errors.</li>
<li>Duration <b>drifts</b> as time passes and yields change, so the portfolio must be <b>rebalanced</b>.</li>
<li>It ignores <b>credit</b> and <b>call</b> risk unless you buy default-free, non-callable bonds.</li>
<li>An alternative is <b>cash-flow matching</b> (dedication): buy bonds whose payments line up exactly with the liabilities, leaving no rate risk at all. Institutions combine these ideas in <b>liability-driven investing (LDI)</b>.</li>
</ul>
<aside class="callout mistake"><b class="lab">Common mistake</b><p>Setting and forgetting. Duration changes every day as time passes, so an immunized portfolio drifts out of protection unless it is rebalanced.</p></aside>
`,
  takeaways: [
    'Rate rises cut bond prices but raise reinvestment income; immunization makes the two cancel.',
    'Immunize a single liability by matching Macaulay duration to the horizon (with PV matched and convexity at least as large).',
    'It works for small parallel shifts and needs rebalancing; cash-flow matching is the risk-free alternative.'
  ],
  quiz: [
    { k: 'calc', gen: () => { const L = pick([500000, 1000000, 2000000]), y = pick([3, 4, 5, 6]), n = pick([5, 8, 10, 12]); const ans = L / Math.pow(1 + y / 100, n); return N({ q: `You owe ${usd(L, 0)} in ${n} years and the market yield is ${y}%. What present value of bonds must you hold today to be fully funded?`, ans, wrong: [L * (1 - y / 100 * n), L / (1 + y / 100), L * Math.pow(1 + y / 100, -n + 1)], fmt: x => usd(x, 0), alt: () => { let v = L; for (let t = 0; t < n; t++) v /= 1 + y / 100; return v; }, tol: 0.01, fixed: true, why: `PV = ${usd(L, 0)} ÷ ${1 + y / 100}^${n} = ${usd(ans, 0)}. This is the first condition of immunization: assets must start equal to the present value of the liability.` }); } },
    { k: 'calc', gen: () => { const w = pick([0.25, 0.4, 0.5, 0.6, 0.75]), d1 = pick([2, 3, 4, 6]), d2 = pick([9, 10, 12, 15]); const ans = w * d1 + (1 - w) * d2; return N({ q: `A bond portfolio holds ${w * 100}% in bonds of duration ${d1} and ${round((1 - w) * 100, 0)}% in bonds of duration ${d2}. What is the portfolio duration?`, ans, wrong: [(d1 + d2) / 2, d1 + d2, Math.max(d1, d2)], fmt: x => num(x, 2), alt: () => d1 + (1 - w) * (d2 - d1), tol: 1e-9, fixed: true, why: `Value-weighted average: ${w} × ${d1} + ${round(1 - w, 2)} × ${d2} = ${num(ans, 2)}. To immunize a payment due in ${num(ans, 1)} years you could use this mix.` }); } },
    { k: 'concept', q: 'To immunize a single payment due in 8 years, the bond portfolio\'s Macaulay duration should be about...', o: ['8 years', '4 years', '16 years', 'As long as possible'], a: 0, why: 'Duration should match the horizon so price risk and reinvestment risk offset.' },
    { k: 'concept', q: 'When yields rise, which two effects offset each other in an immunized portfolio?', o: ['Lower prices and higher reinvestment income', 'Higher prices and lower coupons', 'Taxes and fees', 'Inflation and growth'], a: 0, why: 'Price risk (prices fall) is offset by reinvestment gains (coupons reinvested at higher rates).' },
    { k: 'concept', q: 'Which approach removes interest-rate risk entirely for a set of known liabilities?', o: ['Cash-flow matching: bonds whose payments line up with the liabilities', 'Buying only long bonds', 'Waiting for rates to fall', 'Holding stocks'], a: 0, why: 'If each payment arrives exactly when a liability is due, no bonds need to be sold and reinvestment does not matter.' },
    { k: 'concept', q: 'Why must an immunized portfolio be rebalanced over time?', o: ['Duration drifts as time passes and yields change', 'Bonds stop paying', 'Taxes change daily', 'Liabilities shrink automatically'], a: 0, why: 'The match between asset and liability duration decays, so it must be restored.' },
    { k: 'apply', q: 'You owe a payment in 8 years but fund it with a bond whose duration is only 3 years. Which risk are you most exposed to if yields fall?', o: ['Reinvestment risk: coupons and proceeds will be reinvested at lower rates', 'Price risk', 'No risk', 'Default risk only'], a: 0, why: 'A short duration means you must reinvest for years, and falling yields shrink what that earns.' },
    { k: 'concept', q: 'Which set lists Redington\'s three conditions for immunization?', o: ['PV of assets = PV of liabilities; duration of assets = duration of liabilities; convexity of assets ≥ convexity of liabilities', 'Coupon = yield; maturity = duration; price = par', 'Assets = liabilities; rates = zero; taxes = zero', 'Only that duration is as long as possible'], a: 0, why: 'Fund the liability today, match durations, and have at least as much convexity, so small yield moves leave a surplus.' }
  ],
  related: ['fi-duration', 'p-fisherweil71', 'pm-ips']
}

  );
})();
