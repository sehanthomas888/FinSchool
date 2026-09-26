/* Foundations: time value of money, risk and diversification, how to read a paper, CAPM.
   Written for a reader who has finished the Start-here module. */
window.LESSONS = window.LESSONS || [];
(function () {
  const QL = window.QL, N = QL.numeric, usd = QL.usd, pct = QL.pct, int = QL.int, pick = QL.pick, round = QL.round, num = QL.num;

  window.LESSONS.push(

{
  id: 'tvm', type: 'concept', title: 'The time value of money',
  blurb: 'Why a dollar today beats a dollar tomorrow, and how every valuation in finance is built on that idea.',
  level: 'Foundations', min: 20, tags: ['discounting', 'valuation'], widget: 'tvm',
  los: [
    'Explain why money received sooner is worth more than the same amount received later.',
    'Calculate the future value of a single amount and the present value of a future payment.',
    'Use the Rule of 72 to estimate how long money takes to double.',
    'Calculate the net present value (NPV) of a simple project and decide whether to accept it.',
    'Value a stream of level payments: an annuity, a perpetuity and a growing perpetuity.'
  ],
  terms: [
    ['Present value (PV)', 'what a future payment is worth today'],
    ['Future value (FV)', 'what money you have today will grow to later'],
    ['Interest rate / return (r)', 'the percentage your money grows each period'],
    ['Compounding', 'earning interest on your earlier interest as well as on the original amount'],
    ['Discount rate', 'the rate used to shrink future money back to today; the return you require for waiting and for risk'],
    ['Cash flow', 'a payment in or out at a particular date'],
    ['Net present value (NPV)', 'the present value of everything you receive, minus the present value of everything you pay'],
    ['Annuity / perpetuity', 'level payments that continue for a set number of years / forever']
  ],
  body: `
<p>This is the most important idea in finance. Almost every value in this course, a bond, a share, a project, even a whole company, is the answer to one question: <em>what is a stream of future money worth today?</em></p>

<h2>Why a dollar today beats a dollar later</h2>
<aside class="callout story"><b class="lab">Picture this</b>
<p>A friend offers you $1,000 today, or $1,000 in three years. Which do you take? Almost everyone says "today", and for three good reasons: you could <b>invest</b> it and have more than $1,000 in three years; <b>prices will probably rise</b>, so $1,000 later buys less; and a promise of future money is <b>uncertain</b>, because your friend might not pay.</p></aside>
<p>So a payment that arrives later is worth <em>less</em> than the same amount today. The question is how much less. To answer it, we first go forwards in time (growing money), then backwards (shrinking it).</p>

<h2>Going forward: compounding</h2>
<div class="fx"><div class="formula">FV = PV × (1 + r)<sup>n</sup></div><div class="fx-body">
<p><b class="lab">In plain English</b>Each period your money is multiplied by (1 + r). Do that <i>n</i> times and you have multiplied by (1 + r) <i>n</i> times over. That is all the little raised <i>n</i> means. (New to exponents? See the <a href="#/lesson/math-basics">math primer</a>.)</p>
<dl class="syms"><dt>FV</dt><dd>future value: what it is worth at the end</dd><dt>PV</dt><dd>present value: what you put in today</dd><dt>r</dt><dd>return per period as a decimal (7% → 0.07)</dd><dt>n</dt><dd>number of periods</dd></dl>
<p class="ex"><b class="lab">Worked example</b>$1,000 at 7% for 3 years: 1,000 × 1.07 × 1.07 × 1.07 = <b>$1,225.04</b>. Year by year: $1,070 → $1,144.90 → $1,225.04. Each year's interest earns interest of its own.</p>
<p class="hook"><b class="lab">Remember it as</b>"Multiply by 1 + r, once per year."</p></div></div>
<details class="pause"><summary>Pause and try: $500 at 4% for 2 years</summary><p>500 × 1.04 × 1.04 = 500 × 1.0816 = <b>$540.80</b>.</p></details>
<aside class="callout mistake"><b class="lab">Common mistake</b><p>Multiplying the rate by the years (7% × 3 = 21%) instead of compounding. That gives $1,210, not $1,225.04. The gap grows fast over long periods: at 7% for 30 years, compounding turns $1,000 into about $7,612, whereas the "rate × years" shortcut gives only $3,100.</p></aside>
<aside class="callout"><b>Rule of 72.</b> Money doubles in roughly 72 ÷ r years when r is written as a percent. At 6%, about 12 years; at 9%, about 8. It is a shortcut, good for rates between about 4% and 15%.</aside>

<h2>Going backward: discounting</h2>
<p>Run compounding backwards and you get <b>discounting</b>: the value today of a payment you will receive later. The rate used this way is the <b>discount rate</b>. It is the return you require for waiting and for bearing risk. Riskier payments get a higher discount rate, so they are worth less today.</p>
<div class="fx"><div class="formula">PV = FV ÷ (1 + r)<sup>n</sup></div><div class="fx-body">
<p><b class="lab">In plain English</b>Divide by (1 + r) once for every period you have to wait. The longer the wait and the higher the rate, the less the future money is worth today.</p>
<dl class="syms"><dt>PV</dt><dd>what the future payment is worth today</dd><dt>FV</dt><dd>the amount you will receive later</dd><dt>r</dt><dd>discount rate: what you could earn elsewhere, plus a premium for risk</dd><dt>n</dt><dd>periods until you receive it</dd></dl>
<p class="ex"><b class="lab">Worked example</b>You are promised $1,225.04 in 3 years and the right discount rate is 7%. PV = 1,225.04 ÷ 1.07³ = 1,225.04 ÷ 1.225 = <b>$1,000</b>. It is the same example as above, run in reverse.</p>
<p class="hook"><b class="lab">Remember it as</b>"Waiting shrinks money: divide once per year of waiting."</p></div></div>
<details class="pause"><summary>Pause and try: $2,000 in 5 years at 8%</summary><p>PV = 2,000 ÷ 1.08<sup>5</sup> = 2,000 ÷ 1.4693 = <b>$1,361.17</b>. You would be equally happy with $1,361 today or $2,000 in five years, if 8% is the right rate for you.</p></details>

<h2>Several payments: net present value</h2>
<p>A project usually costs money now and pays back over time. To judge it, shrink every payment to today's money and add them up. Money you pay out counts as negative. The total is the <b>net present value</b>.</p>
<div class="fx"><div class="formula">NPV = Σ C<sub>t</sub> ÷ (1 + r)<sup>t</sup> &nbsp; (including the up-front cost as a negative C<sub>0</sub>)</div><div class="fx-body">
<p><b class="lab">In plain English</b>Take each cash flow, shrink it to today's money for the time you wait, and add everything up (that is what Σ means). Cash you pay out counts as negative. If the total is positive, the project earns more than your required return.</p>
<dl class="syms"><dt>C<sub>t</sub></dt><dd>cash flow in year <i>t</i> (negative if you pay, positive if you receive)</dd><dt>t</dt><dd>the year (0 = today, so no shrinking)</dd><dt>r</dt><dd>discount rate</dd></dl>
<p class="ex"><b class="lab">Worked example</b>Pay $1,000 today; receive $600 at the end of year 1 and $600 at the end of year 2; r = 10%. NPV = −1,000 + 600÷1.10 + 600÷1.21 = −1,000 + 545.45 + 495.87 = <b>+$41.32</b>. Positive, so accept.</p>
<p class="hook"><b class="lab">Remember it as</b>"Shrink every cash flow to today, add them, subtract the cost. Positive = worth doing."</p></div></div>
<p><b>The decision rule:</b> NPV &gt; 0 means the project is worth more than it costs, so do it. NPV &lt; 0 means walk away. NPV = 0 means you would earn exactly your required return.</p>

<h2>Level payments: annuities and perpetuities</h2>
<p>Loans, mortgages, pensions and bonds pay the same amount again and again. Adding up many discounted payments one by one would be slow, so there are shortcuts.</p>
<div class="fx"><div class="formula">PV of an annuity = C × [ 1 − (1 + r)<sup>−n</sup> ] ÷ r</div><div class="fx-body">
<p><b class="lab">In plain English</b>An <b>annuity</b> pays the same amount <i>C</i> at the end of each year for <i>n</i> years. The formula adds up all the discounted payments for you. The bracket is the "annuity factor": what $1 a year for <i>n</i> years is worth today.</p>
<p class="ex"><b class="lab">Worked example</b>$100 a year for 5 years at 6%: factor = [1 − 1.06<sup>−5</sup>] ÷ 0.06 = (1 − 0.7473) ÷ 0.06 = 4.2124. PV = 100 × 4.2124 = <b>$421.24</b>. (Adding the five discounted payments one at a time gives the same answer.)</p></div></div>
<div class="fx"><div class="formula">PV of a perpetuity = C ÷ r</div><div class="fx-body">
<p><b class="lab">In plain English</b>A <b>perpetuity</b> pays the same amount every year forever. Its value is the size of the pot that would earn exactly that payment as interest.</p>
<dl class="syms"><dt>C</dt><dd>the yearly payment (first one a year from now)</dd><dt>r</dt><dd>discount rate</dd></dl>
<p class="ex"><b class="lab">Worked example</b>$50 a year forever at 5%: 50 ÷ 0.05 = <b>$1,000</b>. Check: $1,000 in a 5% account earns $50 a year, forever, without touching the $1,000.</p>
<p class="hook"><b class="lab">Remember it as</b>"Payment ÷ rate."</p></div></div>
<div class="fx"><div class="formula">PV of a growing perpetuity = C ÷ (r − g)</div><div class="fx-body">
<p><b class="lab">In plain English</b>Same idea, but the payment grows by <i>g</i> each year. Growth partly cancels the discounting, so the effective rate is <i>r</i> minus <i>g</i>. This is the <b>Gordon growth model</b>, the simplest way to value a stock as the present value of its dividends. It only works if <i>g</i> is less than <i>r</i>.</p>
<p class="ex"><b class="lab">Worked example</b>Next year's dividend is $2, growing 3% a year; you require 8%. Value = 2 ÷ (0.08 − 0.03) = 2 ÷ 0.05 = <b>$40</b>.</p>
<p class="hook"><b class="lab">Remember it as</b>"Payment ÷ (rate minus growth)."</p></div></div>
<aside class="callout mistake"><b class="lab">Common mistakes</b><ul>
<li><b>Mixing units.</b> If payments are monthly, use a <em>monthly</em> rate and count months. A 12% annual rate is about 1% per month, and 5 years is 60 months.</li>
<li><b>Mixing real and nominal.</b> Use a real (after-inflation) rate with real cash flows, or a nominal rate with nominal cash flows, never one of each.</li>
<li><b>Getting the timing wrong.</b> The formulas here assume each payment arrives at the <em>end</em> of its period.</li>
</ul></aside>

<h2>Why it matters for the rest of the course</h2>
<p>When Shiller asks whether stock prices are "too volatile", he compares them to the present value of later dividends. When Modigliani and Miller talk about the "cost of capital", they mean the discount rate. Almost every debate in asset pricing is really a debate about <em>which discount rate to use and why it changes</em>.</p>
`,
  takeaways: [
    'Value = discounted future cash flows. A higher discount rate means a lower value.',
    'Compounding: FV = PV × (1 + r)ⁿ. Discounting is the reverse: PV = FV ÷ (1 + r)ⁿ.',
    'NPV = PV of what you receive minus what you pay. Accept when it is positive.',
    'Small differences in the rate compound into huge differences over decades.',
    'A stock or bond is only ever a stream of cash flows plus a discount rate.'
  ],
  quiz: [
    { k: 'calc', gen: () => { const pv = pick([500, 1000, 2500, 5000]), r = pick([4, 5, 6, 8]), n = int(2, 6); const ans = QL.fv(pv, r / 100, n); return N({ q: `You invest ${usd(pv, 0)} at ${r}% a year, compounded annually. How much do you have after ${n} years?`, ans, wrong: [pv * (1 + r * n / 100), pv * (1 + r / 100), pv * Math.pow(1 + r / 100, n + 1)], fmt: x => usd(x, 2), alt: () => { let m = pv; for (let i = 0; i < n; i++) m += m * r / 100; return m; }, tol: 1e-6, fixed: true, why: `Multiply by ${1 + r / 100}, ${n} times: ${usd(pv, 0)} × ${1 + r / 100}^${n} = ${usd(ans, 2)}. Simple interest (${usd(pv * (1 + r * n / 100), 2)}) leaves out the interest earned on earlier interest.` }); } },
    { k: 'calc', gen: () => { const fv = pick([1000, 2000, 5000, 10000]), r = pick([4, 5, 6, 8, 10]), n = int(2, 8); const ans = QL.pv(fv, r / 100, n); return N({ q: `A payment of ${usd(fv, 0)} will arrive in ${n} years. If the right discount rate is ${r}%, what is it worth today?`, ans, wrong: [fv * (1 - r * n / 100), fv / (1 + r / 100), fv * Math.pow(1 + r / 100, -n + 1)], fmt: x => usd(x, 2), alt: () => { let d = fv; for (let i = 0; i < n; i++) d /= 1 + r / 100; return d; }, tol: 1e-6, fixed: true, why: `Divide by ${1 + r / 100} once for each year of waiting: ${usd(fv, 0)} ÷ ${1 + r / 100}^${n} = ${usd(ans, 2)}. Dividing only once (${usd(fv / (1 + r / 100), 2)}) ignores most of the wait.` }); } },
    { k: 'calc', gen: () => { const c0 = pick([500, 800, 1000, 1500]), r = pick([5, 8, 10, 12]); const a = int(4, 9) * 100 + pick([0, 50]), b = int(4, 9) * 100 + pick([0, 50]); const ans = -c0 + a / (1 + r / 100) + b / Math.pow(1 + r / 100, 2); return N({ q: `A project costs ${usd(c0, 0)} today and pays ${usd(a, 0)} at the end of year 1 and ${usd(b, 0)} at the end of year 2. With a ${r}% discount rate, what is its NPV?`, ans, wrong: [a + b - c0, (a + b) / (1 + r / 100) - c0, -c0 + a / Math.pow(1 + r / 100, 2) + b / Math.pow(1 + r / 100, 3)], fmt: x => usd(x, 2), alt: () => [-c0, a, b].reduce((s, c, t) => s + c / Math.pow(1 + r / 100, t), 0), tol: 1e-6, fixed: true, why: `Shrink each payment: ${usd(a, 0)} ÷ ${1 + r / 100} = ${usd(a / (1 + r / 100), 2)} and ${usd(b, 0)} ÷ ${round(Math.pow(1 + r / 100, 2), 4)} = ${usd(b / Math.pow(1 + r / 100, 2), 2)}. NPV = ${usd(-c0, 0)} + ${usd(a / (1 + r / 100), 2)} + ${usd(b / Math.pow(1 + r / 100, 2), 2)} = ${usd(ans, 2)}. Just adding the cash flows (${usd(a + b - c0, 0)}) ignores the wait.` }); } },
    { k: 'calc', gen: () => { const c = pick([100, 200, 500, 1000]), r = pick([4, 5, 6, 8]), n = pick([3, 4, 5, 6, 8, 10]); const ans = QL.annuityPV(c, r / 100, n); return N({ q: `An annuity pays ${usd(c, 0)} at the end of each year for ${n} years. With a ${r}% discount rate, what is it worth today?`, ans, wrong: [c * n, c / (r / 100), c * n / (1 + r / 100)], fmt: x => usd(x, 2), alt: () => { let s = 0; for (let t = 1; t <= n; t++) s += c / Math.pow(1 + r / 100, t); return s; }, tol: 1e-6, fixed: true, why: `Annuity factor = [1 − ${1 + r / 100}^−${n}] ÷ ${r / 100} = ${round((1 - Math.pow(1 + r / 100, -n)) / (r / 100), 4)}. PV = ${usd(c, 0)} × ${round((1 - Math.pow(1 + r / 100, -n)) / (r / 100), 4)} = ${usd(ans, 2)}. It is less than ${usd(c * n, 0)} (the plain total) because later payments are shrunk more, and less than the perpetuity value ${usd(c / (r / 100), 0)}.` }); } },
    { k: 'calc', gen: () => { const c = pick([2, 3, 5, 10]), r = pick([8, 9, 10, 12]), g = pick([2, 3, 4]); const ans = c / ((r - g) / 100); return N({ q: `A stock will pay a dividend of $${c} next year, growing ${g}% a year forever. If you require ${r}%, what is the stock worth?`, ans, wrong: [c / (r / 100), c / ((r + g) / 100), c * (1 + g / 100) / ((r - g) / 100)], fmt: x => usd(x, 2), alt: () => { let s = 0, d = c; for (let t = 1; t <= 4000; t++) { s += d / Math.pow(1 + r / 100, t); d *= 1 + g / 100; } return s; }, tol: 0.05, fixed: true, why: `Growing perpetuity: ${usd(c, 0)} ÷ (${r / 100} − ${g / 100}) = ${usd(c, 0)} ÷ ${round((r - g) / 100, 2)} = ${usd(ans, 2)}. Using r alone (${usd(c / (r / 100), 2)}) ignores growth; the rate that matters is r minus g.` }); } },
    { k: 'calc', gen: () => { const r = pick([4, 6, 8, 9, 12]); const ans = 72 / r; return N({ q: `Using the Rule of 72, roughly how many years does it take money to double at ${r}% a year?`, ans, wrong: [100 / r, 144 / r, 36 / r], fmt: x => 'About ' + num(x, 1) + ' years', alt: () => Math.log(2) / Math.log(1 + r / 100), tol: 0.6, fixed: true, why: `72 ÷ ${r} = ${num(ans, 1)} years. (The exact answer is ${num(Math.log(2) / Math.log(1 + r / 100), 2)} years, so the shortcut is very close.)` }); } },
    { k: 'concept', q: 'Why is $1,000 today worth more than $1,000 in three years?', o: ['Today\'s money can be invested to grow, prices may rise, and future money is less certain', 'Because banks charge fees on future money', 'Because $1,000 always loses 10% a year', 'It is not: they are worth exactly the same'], a: 0, why: 'Opportunity to earn a return, inflation and uncertainty all make waiting costly. Together they define the discount rate.' },
    { k: 'apply', q: 'A project has an NPV of −$12 at your required return. What should you do?', o: ['Reject it: it earns less than your required return', 'Accept it: the cash flows are positive later', 'Accept it because NPV is close to zero', 'Double the discount rate and recompute'], a: 0, why: 'A negative NPV means the value today of what you receive is less than what you pay. Do not do it.' },
    { k: 'concept', q: 'If the discount rate rises, what happens to the present value of a fixed future payment?', o: ['It falls', 'It rises', 'It stays the same', 'It becomes negative'], a: 0, why: 'A higher discount rate shrinks future money more, so the value today is lower.' },
    { k: 'apply', q: 'You will receive payments each month for 5 years and your annual rate is 12%. Which rate and count should you use?', o: ['1% per month and 60 months', '12% per month and 5 months', '12% per month and 60 months', '1% per month and 5 months'], a: 0, why: 'Match the rate to the period: 12% a year is about 1% a month, and 5 years is 60 months.' },
    { k: 'apply', q: 'Which is worth more today: $100 in 1 year, or $100 in 5 years (same discount rate above zero)?', o: ['$100 in 1 year', '$100 in 5 years', 'They are equal', 'It depends only on inflation'], a: 0, why: 'The longer you wait, the more the payment is shrunk. Same amount, shorter wait: worth more.' },
    { k: 'concept', q: 'What must be true for the growing perpetuity formula C ÷ (r − g) to work?', o: ['g must be less than r', 'g must be greater than r', 'g must equal zero', 'The payment must be paid monthly'], a: 0, why: 'If growth were at least as large as the discount rate, the payments would grow faster than they are shrunk and the value would be infinite.' }
  ],
  related: ['math-basics', 'fin-returns', 'risk', 'rates']
},

{
  id: 'risk', type: 'concept', title: 'Risk, return and diversification',
  blurb: 'How combining assets can cut risk without cutting expected return, and where that stops working.',
  level: 'Foundations', min: 22, tags: ['risk', 'diversification', 'sharpe'], widget: 'portfolio',
  los: [
    'Explain expected return and volatility, and why two investments with the same average can feel very different.',
    'Calculate the expected return of a portfolio from its weights.',
    'Explain how correlation drives diversification, and calculate the volatility of a two-asset portfolio.',
    'Tell apart systematic and idiosyncratic risk, and say which one diversification can remove.',
    'Calculate and interpret the Sharpe ratio.'
  ],
  terms: [
    ['Expected return', 'the probability-weighted average of the possible returns'],
    ['Volatility', 'how much returns bounce around; measured by the standard deviation (σ)'],
    ['Portfolio', 'all the investments you hold together'],
    ['Weight', 'the share of your portfolio in one investment (40% → 0.40)'],
    ['Correlation (ρ)', 'a score from −1 to +1 for how closely two assets move together'],
    ['Diversification', 'spreading money across assets so that they do not all fall together'],
    ['Systematic risk', 'risk that hits the whole market at once, such as a recession'],
    ['Idiosyncratic risk', 'risk special to one company, such as a factory fire'],
    ['Risk-free rate (r<sub>f</sub>)', 'what a safe asset such as a short-term government bill pays'],
    ['Sharpe ratio', 'extra return per unit of risk']
  ],
  body: `
<p>Investing means accepting uncertainty in exchange for a higher <em>expected</em> return. This lesson answers three questions: how do we measure risk, why does mixing assets reduce it, and how do we judge whether the extra return is worth the risk?</p>

<h2>Same average, very different ride</h2>
<aside class="callout story"><b class="lab">Picture this</b>
<p>Investment A returns exactly 6% every year. Investment B returns −14%, +26%, −14%, +26% in four years. Both average 6%. But you would sleep well with A and not with B. Averages hide the bumpiness. The bumpiness is what finance calls <b>risk</b>.</p></aside>
<p>We measure it with <b>volatility</b>, the standard deviation of returns (see the <a href="#/lesson/math-basics">math primer</a>). A never strays from its average, so its volatility is 0. B is always 20 points away from its average of 6%, so its volatility is <b>20%</b>. Higher volatility, same average: B has to offer a higher expected return to be worth holding.</p>

<h2>Combining assets</h2>
<p>A <b>portfolio</b> is everything you hold together. Its expected return is simply the weighted average of the parts.</p>
<div class="example"><b class="lab">Example</b><p>You put 60% in stocks (expected return 8%) and 40% in bonds (3%). What is the portfolio's expected return?</p>
<b class="lab sol">Solution</b><p>0.60 × 8% + 0.40 × 3% = 4.8% + 1.2% = <b>6.0%</b>.</p></div>
<p>Risk does <em>not</em> combine so simply, and that is the good news.</p>

<h2>Why mixing reduces risk</h2>
<aside class="callout story"><b class="lab">Picture this</b>
<p>Two stocks, A and B, over four years. A returns +20%, −10%, +20%, −10%. B does the opposite: −10%, +20%, −10%, +20%. Each averages 5% and each is bumpy (volatility 15%). Now put half your money in each. Year 1: (20 − 10) ÷ 2 = 5%. Year 2: (−10 + 20) ÷ 2 = 5%. Every year is 5%. The ups and downs cancelled perfectly: volatility zero, expected return unchanged.</p></aside>
<p>That perfect cancelling only happens when the assets move in exact opposites (<b>correlation ρ = −1</b>). In the real world assets are somewhere between opposites and twins, so mixing reduces risk without removing it. The formula below tells you exactly how much.</p>
<div class="fx"><div class="formula">σ<sub>p</sub>² = w²σ<sub>A</sub>² + (1−w)²σ<sub>B</sub>² + 2·w·(1−w)·ρ·σ<sub>A</sub>·σ<sub>B</sub></div><div class="fx-body">
<p><b class="lab">In plain English</b>Portfolio variance has three parts: asset A's own risk, asset B's own risk, and a <b>teamwork term</b> that depends on how the two move together. The teamwork term is the one that changes with correlation ρ. The lower ρ is, the smaller that term, and the safer the portfolio. Take the square root at the end to get volatility back in percent.</p>
<dl class="syms"><dt>w</dt><dd>weight (share of the portfolio) in asset A; (1 − w) is the weight in B</dd><dt>σ<sub>A</sub>, σ<sub>B</sub></dt><dd>volatility of each asset</dd><dt>ρ</dt><dd>correlation between A and B (−1 to +1)</dd><dt>σ<sub>p</sub></dt><dd>volatility of the whole portfolio (σ<sub>p</sub>² is its variance)</dd></dl>
<p class="ex"><b class="lab">Worked example</b>60% stocks (σ = 18%), 40% bonds (σ = 6%), ρ = 0.2. Stocks' term: 0.6² × 18² = 116.6. Bonds' term: 0.4² × 6² = 5.8. Teamwork: 2 × 0.6 × 0.4 × 0.2 × 18 × 6 = 10.4. Variance = 132.8; σ<sub>p</sub> = √132.8 = <b>11.5%</b>. The simple weighted average of the volatilities would be 0.6 × 18 + 0.4 × 6 = 13.2%, so diversification saved <b>1.7 points</b> of risk for free.</p>
<p class="hook"><b class="lab">Remember it as</b>"Own risk + own risk + a teamwork term. ρ is the diversification dial."</p></div></div>
<p>Here is the same 60/40 mix as the correlation changes:</p>
<table class="simple"><thead><tr><th>Correlation ρ</th><th>Portfolio volatility</th><th>Comment</th></tr></thead><tbody>
<tr><td>+1.0</td><td>13.2%</td><td>No benefit: just the weighted average</td></tr>
<tr><td>+0.2</td><td>11.5%</td><td>The worked example</td></tr>
<tr><td>0</td><td>11.1%</td><td>Unrelated assets</td></tr>
<tr><td>−0.5</td><td>9.8%</td><td>Strong benefit</td></tr>
<tr><td>−1.0</td><td>8.4%</td><td>Maximum benefit (with other weights it could reach 0)</td></tr>
</tbody></table>
<p>Only when ρ = +1 does portfolio volatility equal the simple weighted average. For any ρ &lt; 1 it is <em>lower</em>, while expected return remains the weighted average (6% in the example). That gap is the closest thing finance has to a free lunch. The widget below has a <b>Show the math</b> panel that computes these three terms as you move the sliders.</p>
<details class="pause"><summary>Pause and try: which ρ helps most?</summary><p>The lowest one. Every step from +1 towards −1 shrinks the teamwork term, so risk falls. ρ = −1 gives the largest reduction.</p></details>

<h2>Two kinds of risk</h2>
<ul>
<li><b>Idiosyncratic (firm-specific) risk</b>: a factory fire, a failed drug trial. It is independent across companies, so diversification washes it out. A portfolio of a few dozen stocks removes most of it.</li>
<li><b>Systematic (market) risk</b>: recessions, rate shocks, pandemics. It hits everything at once and cannot be diversified away.</li>
</ul>
<p>This distinction is the whole basis of the CAPM: since idiosyncratic risk is free to remove, the market should not pay you for bearing it.</p>
<aside class="callout mistake"><b class="lab">Common mistake</b><p>Thinking diversification makes you safe from losses. It removes only the risk that is special to individual holdings. A well-diversified portfolio still falls in a market crash, and correlations often <em>rise</em> in crises (2008 is the standard example), which is when you need the protection most.</p></aside>

<h2>Sharpe ratio: reward per unit of risk</h2>
<div class="fx"><div class="formula">Sharpe ratio = (R<sub>p</sub> − r<sub>f</sub>) ÷ σ<sub>p</sub></div><div class="fx-body">
<p><b class="lab">In plain English</b>Take the return above what a safe asset pays (the <b>excess return</b>) and divide by the risk you took to get it. It answers "how much reward per unit of bumpiness?" Higher is better.</p>
<dl class="syms"><dt>R<sub>p</sub></dt><dd>portfolio return</dd><dt>r<sub>f</sub></dt><dd>risk-free rate</dd><dt>σ<sub>p</sub></dt><dd>portfolio volatility</dd></dl>
<p class="ex"><b class="lab">Worked example</b>The 60/40 mix above: return 6%, risk-free 2%, volatility 11.5%. Sharpe = (6 − 2) ÷ 11.5 = <b>0.35</b>. Stocks alone: (8 − 2) ÷ 18 = 0.33. The mix beats stocks alone per unit of risk.</p>
<p class="hook"><b class="lab">Remember it as</b>"Extra return per unit of wobble."</p></div></div>
`,
  takeaways: [
    'Two investments can share an average return but differ hugely in risk; volatility (σ) measures the bumpiness.',
    'A portfolio\'s expected return is the weighted average; its risk depends on correlations, not just on each asset\'s own risk.',
    'Diversification removes idiosyncratic risk but not systematic risk.',
    'Correlations can rise in a crisis, so the benefit is weakest when you need it most.',
    'Sharpe ratio = excess return ÷ volatility: higher means more reward per unit of risk.'
  ],
  quiz: [
    { k: 'calc', gen: () => { const w = pick([30, 40, 50, 60, 70]), ra = pick([6, 8, 10, 12]), rb = pick([2, 3, 4]); const ans = w / 100 * ra + (1 - w / 100) * rb; return N({ q: `A portfolio holds ${w}% in asset A (expected return ${ra}%) and the rest in asset B (expected return ${rb}%). What is its expected return?`, ans, wrong: [(ra + rb) / 2, w / 100 * ra, ra * w / 100 + rb * w / 100], fmt: x => pct(x, 2), alt: () => rb + w / 100 * (ra - rb), tol: 1e-9, why: `Weighted average: ${w / 100} × ${ra}% + ${round(1 - w / 100, 2)} × ${rb}% = ${round(w / 100 * ra, 2)}% + ${round((1 - w / 100) * rb, 2)}% = ${round(ans, 2)}%. Expected returns combine by weights; only risk needs the correlation.` }); } },
    { k: 'calc', gen: () => { const w = pick([0.5, 0.6, 0.7]), sa = pick([16, 18, 20, 24]), sb = pick([5, 6, 8, 10]), rho = pick([-0.5, 0, 0.2, 0.5]); const ans = Math.sqrt(w * w * sa * sa + (1 - w) * (1 - w) * sb * sb + 2 * w * (1 - w) * rho * sa * sb); return N({ q: `A portfolio has ${w * 100}% in A (volatility ${sa}%) and ${round((1 - w) * 100, 0)}% in B (volatility ${sb}%), with correlation ${rho}. What is the portfolio's volatility?`, ans, wrong: [w * sa + (1 - w) * sb, Math.sqrt(w * w * sa * sa + (1 - w) * (1 - w) * sb * sb), Math.sqrt(w * sa * sa + (1 - w) * sb * sb)], fmt: x => pct(x, 2), alt: () => { const ws = [w, 1 - w], s = [sa, sb], R = [[1, rho], [rho, 1]]; let v = 0; for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) v += ws[i] * ws[j] * s[i] * s[j] * R[i][j]; return Math.sqrt(v); }, tol: 1e-9, why: `Variance = own risk of A + own risk of B + teamwork = ${round(w * w * sa * sa, 2)} + ${round((1 - w) * (1 - w) * sb * sb, 2)} + ${round(2 * w * (1 - w) * rho * sa * sb, 2)} = ${round(ans * ans, 2)}. Square root: ${pct(ans, 2)}. The weighted average of volatilities (${pct(w * sa + (1 - w) * sb, 2)}) is only right when the correlation is +1.` }); } },
    { k: 'calc', gen: () => { const rp = pick([6, 8, 10, 12]), rf = pick([1, 2, 3]), s = pick([8, 10, 12, 15, 20]); const ans = (rp - rf) / s; return N({ q: `A fund returned ${rp}% with volatility ${s}% while the risk-free rate was ${rf}%. What is its Sharpe ratio?`, ans, wrong: [rp / s, rp - rf, (rp - rf) / (s * s)], fmt: x => num(x, 2), alt: () => (rp / 100 - rf / 100) / (s / 100), tol: 1e-9, why: `Sharpe = (return − risk-free) ÷ volatility = (${rp} − ${rf}) ÷ ${s} = ${num(ans, 2)}. Forgetting to subtract the risk-free rate (${num(rp / s, 2)}) credits the fund for what a safe asset pays anyway.` }); } },
    { k: 'calc', gen: () => { const sa = pick([20, 30, 40]), sb = pick([10, 15, 20]); const ans = sb / (sa + sb) * 100; return N({ q: `Two assets have volatilities of ${sa}% (A) and ${sb}% (B) and a correlation of exactly −1. What weight in A gives a portfolio with zero risk?`, ans, wrong: [sa / (sa + sb) * 100, 50, sb / sa * 100], fmt: x => pct(x, 1), alt: () => { let best = 0, bv = 1e9; for (let i = 0; i <= 10000; i++) { const w = i / 10000, v = Math.abs(w * sa - (1 - w) * sb); if (v < bv) { bv = v; best = w; } } return best * 100; }, tol: 0.02, why: `With ρ = −1 the risks cancel when w × ${sa} = (1 − w) × ${sb}. Solving: w = ${sb} ÷ (${sa} + ${sb}) = ${num(ans, 1)}%. The riskier asset gets the smaller weight.` }); } },
    { k: 'concept', q: 'Which correlation between two assets gives the greatest diversification benefit?', o: ['−1', '0', '+1', 'Correlation does not matter'], a: 0, why: 'With ρ = −1 the assets move in opposite directions and risk can be cancelled entirely with the right weights.' },
    { k: 'concept', q: 'What does diversification mainly eliminate?', o: ['Idiosyncratic (firm-specific) risk', 'Systematic (market) risk', 'Inflation', 'All risk'], a: 0, why: 'Firm-specific risks are independent and average out; market-wide risk remains.' },
    { k: 'concept', q: 'If two assets are perfectly correlated (ρ = +1), portfolio volatility is...', o: ['Exactly the weighted average of their volatilities', 'Lower than the weighted average', 'Higher than either asset', 'Zero'], a: 0, why: 'At ρ = +1 the teamwork term makes the variance formula collapse to (wσ_A + (1−w)σ_B)², so volatility is just the weighted average.' },
    { k: 'apply', q: 'Two funds both average 6% a year. Fund A returns 6% every year; Fund B swings between −14% and +26%. What is the main difference?', o: ['Fund B is much riskier: it has far higher volatility', 'Fund B is safer because it has higher peaks', 'They are identical', 'Fund A has higher expected return'], a: 0, why: 'The averages match, so the difference is volatility. Risk is about how far returns stray from the average.' },
    { k: 'apply', q: 'In a market crash, a portfolio of 40 different stocks still falls sharply. Why?', o: ['The crash is systematic risk, which diversification cannot remove', 'The stocks were badly chosen individually', 'Diversification only works for bonds', 'The fund charged too much'], a: 0, why: 'Diversification removes company-specific risk, not the risk that hits the whole market at once.' },
    { k: 'apply', q: 'Fund X has a Sharpe ratio of 0.60 and Fund Y has 0.40. What does that mean?', o: ['X delivered more excess return per unit of risk', 'X earned a higher raw return', 'Y is safer', 'They took the same risk'], a: 0, why: 'The Sharpe ratio measures reward per unit of risk. It does not say which fund had the higher raw return or the lower risk on its own.' }
  ],
  related: ['math-basics', 'fin-returns', 'capm', 'p-markowitz', 'pm-cal']
},

{
  id: 'reading-papers', type: 'guide', title: 'How to read a finance paper',
  blurb: 'A practical method for getting the value out of a research paper without following every proof.',
  level: 'Foundations', min: 14, tags: ['method'],
  los: [
    'Describe what a research paper is for and how nearly all finance papers are organized.',
    'Apply the three-pass reading method.',
    'Ask the six key questions of any paper.',
    'Interpret a t-statistic and judge whether a result is likely to be luck.',
    'Spot common red flags: data mining, publication decay, survivorship bias and ignored costs.'
  ],
  terms: [
    ['Paper', 'a research article, usually in an academic journal, that reports a question, the evidence, and a conclusion'],
    ['Abstract', 'the one-paragraph summary at the top of a paper'],
    ['Sample', 'the data actually used, for example "US stocks, 1963 to 1991"'],
    ['Out-of-sample', 'data that was not used to find the result, used to check whether it still holds'],
    ['Standard error', 'a measure of the noise (uncertainty) in an estimate'],
    ['t-statistic', 'an estimate divided by its standard error: how many times bigger the result is than its noise'],
    ['Alpha (α)', 'return left over after accounting for the risks in a model'],
    ['Anomaly', 'a pattern in returns that a standard model cannot explain']
  ],
  body: `
<p>Textbooks tell you what economists concluded. Papers show you <em>how</em> they concluded it, and where the conclusion could be wrong. Finance papers look intimidating, but nearly all of them follow the same skeleton, and you do not have to follow every derivation to learn a great deal from one. If the notation is what worries you, read the <a href="#/lesson/math-basics">math primer</a> first.</p>

<h2>The skeleton of a paper</h2>
<ol>
<li><b>Abstract and introduction:</b> the question, the answer, and why it matters, in plain language.</li>
<li><b>Theory or model:</b> the argument, often with equations. You can skim this on a first read.</li>
<li><b>Data:</b> what was measured, where it came from, and over which years.</li>
<li><b>Results:</b> tables and figures showing what was found. This is the evidence.</li>
<li><b>Robustness and conclusion:</b> attempts to break the result, and what the authors take from it.</li>
</ol>

<h2>The three-pass method</h2>
<ol>
<li><b>Pass 1: skim (10 minutes).</b> Read the title, abstract, introduction and conclusion, and look at every figure. Goal: write one sentence stating the question and one stating the claimed answer.</li>
<li><b>Pass 2: read (45 to 60 minutes).</b> Read the model or data section and the main tables. Skip derivations you cannot follow. Goal: know what evidence was used and what the headline result looks like <em>as a number</em>.</li>
<li><b>Pass 3: interrogate.</b> Ask what would have to be true for the result to be wrong. Read the robustness section, then search for the papers that cite this one; the critiques usually live there.</li>
</ol>

<h2>Six questions to ask every paper</h2>
<ol>
<li><b>What is the question?</b> If you cannot say it in a sentence, keep skimming.</li>
<li><b>What is the claim?</b> What would we observe in the world if it were true?</li>
<li><b>What is the evidence?</b> Which data, which years, which universe of assets? ("NYSE stocks, 1963 to 1991" is a very specific claim.)</li>
<li><b>How big is the effect in real-world terms?</b> A 0.5% monthly return is large. A 0.02% return that disappears after trading costs is not.</li>
<li><b>What else could explain it?</b> Risk? Mispricing? Data quirks? Luck?</li>
<li><b>Does it survive out of sample?</b> In later years, other countries, other asset classes?</li>
</ol>

<h2>Is it luck? The t-statistic</h2>
<div class="fx"><div class="formula">t = estimate ÷ standard error</div><div class="fx-body">
<p><b class="lab">In plain English</b>The <b>t-statistic</b> asks: "how many times bigger is the result than its own noise?" The standard error is a measure of the noise (the uncertainty in the estimate). Rule of thumb: if |t| is above about 2, the result is unlikely to be pure chance.</p>
<p class="ex"><b class="lab">Worked example</b>A strategy earned an average 0.60% a month with a standard error of 0.25%. t = 0.60 ÷ 0.25 = <b>2.4</b>, so probably not luck. If the standard error were 0.50%, t = 1.2 and you could not tell it from luck.</p>
<p class="hook"><b class="lab">Remember it as</b>"Signal divided by noise. Above 2 is interesting."</p></div></div>
<details class="pause"><summary>Pause and try: estimate 0.9, standard error 0.3</summary><p>t = 0.9 ÷ 0.3 = <b>3</b>. That is comfortably above 2, so the result is unlikely to be luck. (By itself it does not say the result is large or useful, only that it is probably not noise.)</p></details>

<h2>Finance-specific red flags</h2>
<ul>
<li><b>Data mining (the "factor zoo").</b> If hundreds of variables are tested, some will look significant by chance. Harvey, Liu and Zhu (2016) argue new factors should clear a t-statistic of about 3, not the usual 2.</li>
<li><b>Publication decay.</b> McLean and Pontiff (2016) studied 97 published return predictors and found returns were about 26% lower out of sample and about 58% lower after publication.</li>
<li><b>The joint hypothesis problem.</b> Any test of "are prices rational?" also tests a specific model of what expected returns <em>should</em> be. You cannot separate the two.</li>
<li><b>Survivorship and look-ahead bias.</b> Using only firms or funds that still exist, or using information that was not yet public at the time.</li>
<li><b>Ignoring costs.</b> Paper profits that need constant trading in tiny, illiquid stocks often vanish in practice.</li>
</ul>
<aside class="callout mistake"><b class="lab">Common mistake</b><p>Treating "statistically significant" as "important". With enough data, tiny effects become significant. Always look at the <em>size</em> of the effect, and ask whether it would survive real-world costs.</p></aside>

<h2>Other terms you will meet</h2>
<dl class="defs">
<dt>R²</dt><dd>Share of the variation in the outcome that the model explains (0% to 100%). High R² does not mean the model is causal or true.</dd>
<dt>Alpha (α)</dt><dd>Return left over after accounting for the risks in the model. "Positive alpha" means outperformance <em>relative to that model</em>.</dd>
<dt>Beta (β)</dt><dd>Sensitivity of an asset's return to a risk factor, usually the market.</dd>
<dt>Sharpe ratio</dt><dd>(Return − risk-free rate) ÷ volatility. Reward per unit of risk.</dd>
</dl>
<aside class="callout"><b>How to use this site with real papers.</b> Every paper page here opens with the paper in plain words and the terms you need, then explains the question, method and findings, then lists what to look for. Read that first, open the original with the Scholar link, and try to find each item yourself. Then come back and check the critiques section.</aside>
`,
  takeaways: [
    'Skim first: one sentence for the question, one for the claim.',
    'Always translate results into economic size, not just significance.',
    't = estimate ÷ standard error; above about 2 is unlikely to be pure chance.',
    'Ask what else could explain the result, and whether it survived after publication.'
  ],
  quiz: [
    { k: 'calc', gen: () => { const se = pick([0.2, 0.25, 0.3, 0.4, 0.5]), t = pick([1.2, 1.6, 2.0, 2.4, 3.0, 3.6]); const est = round(se * t, 2); const ans = est / se; return N({ q: `A strategy earned an average of ${est}% a month with a standard error of ${se}%. What is the t-statistic?`, ans, wrong: [est * se, se / est, est - se], fmt: x => num(x, 2), alt: () => (est * 100) / (se * 100), tol: 1e-9, why: `t = estimate ÷ standard error = ${est} ÷ ${se} = ${num(ans, 2)}. ${ans >= 2 ? 'That is above the rule-of-thumb bar of 2, so luck is an unlikely explanation.' : 'That is below 2, so you cannot rule out luck.'}` }); } },
    { k: 'concept', q: 'What is the main goal of the first (skim) pass through a paper?', o: ['State the question and the claimed answer in one sentence each', 'Verify every proof', 'Replicate the tables', 'Find the citations'], a: 0, why: 'The skim is about orienting yourself: what is asked, and what is claimed.' },
    { k: 'concept', q: 'What does McLean and Pontiff\'s finding on publication decay suggest?', o: ['Published anomaly returns shrink after publication', 'Published anomalies get stronger over time', 'Journals reject anomalies', 'Anomalies only exist outside the US'], a: 0, why: 'Post-publication returns were substantially lower, consistent with data mining and/or investors trading the anomaly away.' },
    { k: 'concept', q: 'A result is "statistically significant". Which follow-up question matters most?', o: ['How large is the effect in real-world terms, after costs?', 'How many pages is the paper?', 'Who published it?', 'Is the t-statistic printed in bold?'], a: 0, why: 'Significant does not mean important. Tiny effects become significant with enough data.' },
    { k: 'concept', q: 'What is "out-of-sample" testing?', o: ['Checking whether a result still holds on data that was not used to find it', 'Testing with fewer observations', 'Ignoring the last year of data', 'Using only recent data'], a: 0, why: 'A pattern that only works on the data used to discover it may just be luck. Out-of-sample data is the fair test.' },
    { k: 'apply', q: 'A study of "funds" uses only funds that still exist today and finds high returns. What is the likely problem?', o: ['Survivorship bias: funds that failed were left out', 'Look-ahead bias only', 'Too many funds', 'Nothing: it is a fair sample'], a: 0, why: 'Excluding funds that closed after doing badly makes the group look better than reality.' },
    { k: 'apply', q: 'Hundreds of possible predictors are tested and the best one has t = 2.1. What should you suspect?', o: ['Data mining: with so many tries, some will look significant by chance', 'A definite discovery', 'That the standard error is zero', 'That returns are risk-free'], a: 0, why: 'Test enough variables and some will pass the usual bar by luck. That is why a higher bar (about 3) is now proposed.' },
    { k: 'concept', q: 'What is the "joint hypothesis problem"?', o: ['You cannot test market efficiency without also assuming a model of expected returns', 'Two authors write a paper together', 'Two markets trade the same asset', 'Two tests are always run'], a: 0, why: 'An apparent anomaly could mean inefficiency or a wrong model of risk, and you cannot tell which.' },
    { k: 'apply', q: 'A strategy earns 0.02% a month but requires trading tiny, illiquid stocks every day. What is the best reaction?', o: ['Be skeptical: costs could wipe out the profit', 'It is risk-free, so buy it', 'Ignore costs; papers do', 'Increase the trading'], a: 0, why: 'Tiny paper profits often disappear once trading costs are counted.' }
  ],
  related: ['math-basics', 'p-markowitz', 'emh']
},

{
  id: 'capm', type: 'concept', title: 'CAPM and the security market line',
  blurb: 'The first model to say precisely how much extra return investors should demand for taking on risk.',
  level: 'Foundations', min: 20, tags: ['capm', 'beta', 'asset pricing'], widget: 'sml',
  los: [
    'Explain why only systematic risk should earn an extra return.',
    'Explain what beta measures and interpret a beta of 0.5, 1 and 1.3.',
    'Use the CAPM formula to find the required return of a stock.',
    'Compare a forecast return with the required return to find alpha.',
    'Describe what CAPM is used for and where the evidence disagrees with it.'
  ],
  terms: [
    ['Market portfolio', 'a portfolio holding every investable asset in proportion to its value; in practice a broad stock index'],
    ['Beta (β)', 'how strongly a stock moves when the market moves'],
    ['Risk-free rate (r<sub>f</sub>)', 'what a safe asset such as a government bill pays'],
    ['Market risk premium', 'how much more than the risk-free rate the whole market is expected to earn'],
    ['Required return', 'the return you should demand, given the risk'],
    ['Security market line (SML)', 'the straight line linking beta to required return'],
    ['Alpha (α)', 'the return above (or below) what CAPM says the stock should earn']
  ],
  body: `
<p>The <a href="#/lesson/risk">risk lesson</a> ended with a big idea: some risk can be removed for free by diversifying. So if you hold a diversified portfolio, which risks still matter to you, and how much extra return should you demand for them? The <b>Capital Asset Pricing Model (CAPM)</b> gives a clean answer: only the part of a stock's risk that cannot be diversified away, its exposure to the overall market, deserves a reward. That exposure is measured by <b>beta</b>.</p>

<h2>Beta: how much does it move with the market?</h2>
<aside class="callout story"><b class="lab">Picture this</b>
<p>On days the whole market rises 1%, a utility company typically rises only about 0.5%, an average company about 1%, and a fast-growing technology company maybe 1.5%. Beta puts a number on that: 0.5, 1.0 and 1.5.</p></aside>
<div class="fx"><div class="formula">β<sub>i</sub> = Cov(R<sub>i</sub>, R<sub>m</sub>) ÷ Var(R<sub>m</sub>)</div><div class="fx-body">
<p><b class="lab">In plain English</b>Beta is the stock's typical move when the market moves 1%. Covariance (Cov) measures how the stock and the market move together; dividing by the market's own variance (Var) scales the answer so the market itself has a beta of exactly 1.</p>
<dl class="syms"><dt>β<sub>i</sub></dt><dd>beta of stock <i>i</i></dd><dt>Cov(R<sub>i</sub>, R<sub>m</sub>)</dt><dd>how the stock's return and the market's return move together</dd><dt>Var(R<sub>m</sub>)</dt><dd>variance of the market's return (σ<sub>m</sub>²)</dd></dl>
<p class="ex"><b class="lab">Worked example</b>β = 1.3: when the market rises 10%, this stock tends to rise about 13%; when it falls 10%, about 13%. β = 0.5 moves about half as much as the market. β = 0 (a Treasury bill) does not move with it.</p>
<p class="hook"><b class="lab">Remember it as</b>"Beta = sensitivity to the market."</p></div></div>

<h2>The model: required return = safe return + a reward for market risk</h2>
<div class="fx"><div class="formula">E[R<sub>i</sub>] = r<sub>f</sub> + β<sub>i</sub> × (E[R<sub>m</sub>] − r<sub>f</sub>)</div><div class="fx-body">
<p><b class="lab">In plain English</b>The return you should <em>require</em> from a stock is what a safe asset pays, plus extra for the market risk you take on. The extra is your beta times the <b>market risk premium</b> (how much more than the safe rate the whole market is expected to earn).</p>
<dl class="syms"><dt>E[R<sub>i</sub>]</dt><dd>expected (required) return on stock <i>i</i></dd><dt>r<sub>f</sub></dt><dd>risk-free rate</dd><dt>β<sub>i</sub></dt><dd>the stock's beta</dd><dt>E[R<sub>m</sub>] − r<sub>f</sub></dt><dd>market risk premium</dd></dl>
<p class="ex"><b class="lab">Worked example</b>r<sub>f</sub> = 3%, market premium = 5.5%, β = 1.3. Required return = 3% + 1.3 × 5.5% = 3% + 7.15% = <b>10.15%</b>. If you forecast 12%, the stock sits 1.85 points above the line: positive <b>alpha</b>.</p>
<p class="hook"><b class="lab">Remember it as</b>"Safe rate plus beta times the market premium."</p></div></div>
<details class="pause"><summary>Pause and try: a defensive stock</summary><p>r<sub>f</sub> = 3%, market premium 5.5%, β = 0.5. Required return = 3% + 0.5 × 5.5% = 3% + 2.75% = <b>5.75%</b>. A calm stock needs to offer less than the market.</p></details>
<p>Plotted against beta this is a straight line, the <b>security market line (SML)</b>. The widget below has a <b>Show the math</b> panel with your numbers.</p>

<h2>What it is used for</h2>
<ul>
<li><b>Cost of equity.</b> Companies use it as the discount rate for projects (see <a href="#/lesson/capstruct">capital structure</a>).</li>
<li><b>Alpha.</b> An asset whose expected return sits above the line has positive alpha and looks underpriced; below the line, overpriced.</li>
<li><b>Performance evaluation.</b> Did a fund beat what its market exposure alone would have earned?</li>
</ul>
<aside class="callout mistake"><b class="lab">Common mistake</b><p>Reading beta as "how risky the stock is overall". Beta measures only <em>market</em> risk. A tiny biotech company can be hugely risky by itself (large idiosyncratic risk) and still have a modest beta. CAPM says the market pays you only for the beta part.</p></aside>

<h2>Does it work?</h2>
<p>Partly. The core insight that only systematic risk earns a premium shaped all of modern finance. But the empirical line is flatter than the theory predicts: low-beta stocks have earned more than CAPM says, and high-beta stocks less. Roll (1977) also pointed out that the true "market portfolio" includes every asset, so the model can never really be tested. Multi-factor models such as <a href="#/lesson/p-ff93">Fama–French</a> emerged to explain what beta alone misses.</p>
`,
  takeaways: [
    'CAPM prices only systematic risk: expected return = risk-free + β × market premium.',
    'Beta measures sensitivity to the market: 1 is the market itself, above 1 amplifies it, below 1 dampens it.',
    'Points above the security market line have positive alpha, and points below have negative alpha.',
    'Empirically the line is flatter than the theory predicts. That gap motivated multi-factor models.'
  ],
  quiz: [
    { k: 'calc', gen: () => { const rf = pick([2, 3, 4]), b = pick([0.5, 0.8, 1.0, 1.2, 1.5]), mrp = pick([4, 5, 5.5, 6]); const ans = rf + b * mrp; return N({ q: `The risk-free rate is ${rf}%, the market risk premium is ${mrp}% and a stock's beta is ${b}. What return does CAPM say the stock should earn?`, ans, wrong: [b * mrp, rf + mrp, b * (rf + mrp)], fmt: x => pct(x, 2), alt: () => rf * (1 - b) + b * (rf + mrp), tol: 1e-9, why: `Required return = ${rf}% + ${b} × ${mrp}% = ${rf}% + ${round(b * mrp, 2)}% = ${round(ans, 2)}%. Leaving out the risk-free rate (${round(b * mrp, 2)}%) forgets what a safe asset pays before any risk premium.` }); } },
    { k: 'calc', gen: () => { const rf = 3, b = pick([0.8, 1.0, 1.3, 1.5]), mrp = 5; const req = rf + b * mrp, f = round(req + pick([-2, -1, 1, 1.5, 2.5]), 2); const ans = f - req; return N({ q: `With r_f = ${rf}%, market premium ${mrp}% and β = ${b}, you forecast a stock will return ${f}%. What is its alpha versus CAPM?`, ans, wrong: [f - rf, req - f, f - mrp], fmt: x => pct(x, 2), alt: () => f - (rf + b * mrp), tol: 1e-9, why: `CAPM says ${rf}% + ${b} × ${mrp}% = ${round(req, 2)}%. Alpha = forecast − required = ${f}% − ${round(req, 2)}% = ${round(ans, 2)}%. ${ans > 0 ? 'Positive: it plots above the line and looks underpriced.' : 'Negative: it plots below the line and looks overpriced.'}` }); } },
    { k: 'calc', gen: () => { const sm = pick([15, 18, 20]), si = pick([20, 25, 30, 40]), rho = pick([0.4, 0.5, 0.6, 0.8]); const cov = rho * si * sm; const ans = cov / (sm * sm); return N({ q: `A stock has volatility ${si}% and correlation ${rho} with a market whose volatility is ${sm}%. (Their covariance is ${num(cov, 0)}.) What is the stock's beta?`, ans, wrong: [cov / sm, cov * sm, rho], fmt: x => num(x, 2), alt: () => rho * si / sm, tol: 1e-9, why: `β = Cov ÷ Var(market) = ${num(cov, 0)} ÷ ${sm * sm} = ${num(ans, 2)}. Equivalently β = ρ × σ_stock ÷ σ_market = ${rho} × ${si} ÷ ${sm}.` }); } },
    { k: 'calc', gen: () => { const b = pick([0.5, 0.8, 1.2, 1.5, 2.0]), m = pick([-10, -6, 4, 8, 10]); const ans = b * m; return N({ q: `A stock has a beta of ${b}. If the market moves ${m > 0 ? '+' : ''}${m}% in a period, roughly how much would you expect the stock to move (ignoring everything else)?`, ans, wrong: [m / b, m + b, m], fmt: x => pct(x, 1), alt: () => m * b, tol: 1e-9, why: `Beta is the stock's typical move per 1% move in the market: ${b} × ${m}% = ${round(ans, 1)}%. Dividing by beta (${round(m / b, 1)}%) turns it upside down.` }); } },
    { k: 'concept', q: 'According to CAPM, what expected return should a zero-beta asset have?', o: ['The risk-free rate', 'The market return', 'Zero', 'The market premium'], a: 0, why: 'With β = 0, E[R] = r_f + 0 × premium = r_f.' },
    { k: 'concept', q: 'Which type of risk does CAPM say earns a premium?', o: ['Systematic (market) risk', 'Firm-specific risk', 'Both equally', 'Neither'], a: 0, why: 'Firm-specific risk can be diversified away, so investors are not compensated for it.' },
    { k: 'concept', q: 'What is the beta of the market portfolio itself?', o: ['Exactly 1', 'Exactly 0', 'Exactly 2', 'It depends on the year'], a: 0, why: 'Cov(R_m, R_m) ÷ Var(R_m) = 1, by definition.' },
    { k: 'apply', q: 'A stock plots above the security market line. What does that suggest?', o: ['Positive alpha: it looks underpriced relative to its risk', 'Negative alpha', 'Zero beta', 'The market portfolio is wrong'], a: 0, why: 'Its expected return is higher than CAPM says its market risk deserves, so it looks cheap.' },
    { k: 'apply', q: 'A speculative biotech firm is very risky on its own but has a modest beta. What does CAPM say about its required return?', o: ['It is set by beta, so a modest beta gives a modest required return', 'It must be very high because the firm is risky', 'It equals the risk-free rate', 'It cannot be calculated'], a: 0, why: 'Most of that firm\'s risk is idiosyncratic, which can be diversified away. Only beta is rewarded.' },
    { k: 'concept', q: 'What have empirical tests found about the relationship between beta and returns?', o: ['The line is flatter than CAPM predicts: high-beta stocks earned less than expected', 'It is steeper than predicted', 'There is no relationship at all', 'It matches CAPM exactly'], a: 0, why: 'Low-beta stocks have tended to earn more, and high-beta stocks less, than the model says. That motivated multi-factor models.' }
  ],
  related: ['risk', 'p-sharpe', 'p-ff93', 'pm-perf']
}

  );
})();
