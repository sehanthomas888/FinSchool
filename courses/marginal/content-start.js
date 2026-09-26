/* Start here: the language of money. Written for someone who has never studied finance.
   fin-map, fin-instruments and fin-returns are new; math-basics is the rewritten primer. */
window.LESSONS = window.LESSONS || [];
(function () {
  const QL = window.QL, N = QL.numeric, usd = QL.usd, pct = QL.pct, int = QL.int, pick = QL.pick, round = QL.round;

  window.LESSONS.push(

{
  id: 'fin-map', type: 'guide', title: 'What finance is about',
  blurb: 'Start here. Money, time and risk, told through one small story, plus a map of the whole course.',
  level: 'Start here', min: 9, tags: ['overview', 'basics'],
  los: [
    'Say in one sentence what finance is about.',
    'Explain why the same amount of money is worth different amounts at different times.',
    'Describe what savers, borrowers, intermediaries and markets each do.',
    'Name the two questions that almost every finance idea is trying to answer.'
  ],
  terms: [
    ['Asset', 'anything you own that has value or will pay you money in the future'],
    ['Risk', 'the chance that things turn out worse than you hoped'],
    ['Return', 'what you gain from an investment, compared with what you put in'],
    ['Intermediary', 'a middleman, such as a bank, that stands between people with money and people who need it'],
    ['Market', 'a place (often just a computer network) where buyers and sellers agree on prices'],
    ['Valuation', 'working out what something is worth today']
  ],
  body: `
<p>You do not need any finance background for this course. Every unfamiliar word is explained the first time it appears, and every formula comes with a plain-English translation. We start with a story, because the whole subject is already inside it.</p>

<h2>A small story to start</h2>
<aside class="callout story"><b class="lab">Picture this</b>
<p>Maya has saved $10,000. Her friend Dev wants to open a bakery and needs exactly $10,000 for an oven and a shop. Maya has three choices for the next year:</p>
<ol>
<li><b>Keep the cash at home.</b> Nothing can go wrong with the bakery. But if prices rise 3% during the year, her $10,000 buys only what about $9,709 buys today. She did nothing, and her money quietly shrank.</li>
<li><b>Put it in an insured bank deposit paying 3%.</b> After a year she has $10,300. The risk is close to zero.</li>
<li><b>Lend it to Dev.</b> He promises $10,600 in a year (6%). If the bakery does well, Maya gets it. If it fails, she may get back only part of it, or nothing.</li>
</ol></aside>
<p>Should Maya pick option 3? Only if the extra 3 percentage points (6% instead of 3%) are enough to pay her for the chance of losing money. That one trade-off, <b>being paid for waiting and for taking risk</b>, is the beating heart of finance.</p>

<details class="pause"><summary>Pause and try: what if Dev offered only 3%?</summary>
<p>The bank already pays 3% with almost no risk. Lending to Dev at the same 3% would give Maya the same reward for much more risk, so a sensible Maya says no. Risk has to be paid for. That is why riskier things have to offer higher <em>expected</em> returns to attract anyone.</p></details>

<h2>Three ideas hidden in that story</h2>
<ul>
<li><b>Time.</b> $10,000 today and $10,000 next year are not the same thing. Today's money can earn interest, and prices tend to rise. So a payment that arrives later is worth less. (The lesson on <a href="#/lesson/tvm">the time value of money</a> turns this into numbers.)</li>
<li><b>Risk.</b> The future is uncertain. Two choices can promise the same <em>average</em> outcome yet feel very different, because one has a real chance of ending badly. (See <a href="#/lesson/risk">risk and return</a>.)</li>
<li><b>Information and trust.</b> Maya cannot easily tell whether Dev is honest or whether the bakery will work. A lot of finance exists to deal with this: contracts, credit checks, company accounts, and banks that do the checking for you.</li>
</ul>

<h2>Who does what: the financial system</h2>
<p>Maya and Dev are a tiny version of something enormous. Some people have more money than they need right now. Others need money now and can repay it from future income. The <b>financial system</b> connects them.</p>
<table class="simple"><thead><tr><th>Player</th><th>What they do</th><th>Example</th></tr></thead><tbody>
<tr><td><b>Savers</b></td><td>Have money they do not need today and want it to grow, safely if possible</td><td>Maya; a family saving for retirement</td></tr>
<tr><td><b>Borrowers</b></td><td>Need money now and will pay it back from future income or profits</td><td>Dev's bakery; a company building a factory; a government building a road</td></tr>
<tr><td><b>Intermediaries</b></td><td>Stand in between: gather many savers' money, lend it to many borrowers, and spread the risk</td><td>Banks, pension funds, mutual funds, insurers</td></tr>
<tr><td><b>Markets</b></td><td>Places where shares and bonds are bought and sold every day, so prices keep updating</td><td>A stock exchange; the bond market</td></tr>
</tbody></table>
<p>Why do intermediaries matter? Imagine a bank taking $10,000 from each of 1,000 savers: $10 million. It lends that out to hundreds of different borrowers. A few of them will fail to repay, but no single saver is ruined, because the loss is spread thin. That is far safer than each saver making one big loan to one stranger, the way Maya did.</p>

<h2>The two questions finance keeps asking</h2>
<ol>
<li><b>What is it worth?</b> How much is a stream of future payments worth today? This is <b>valuation</b>, and it needs the idea of time.</li>
<li><b>How risky is it, and am I paid enough for the risk?</b> This is <b>risk and return</b>, and it needs ways of measuring risk.</li>
</ol>
<p>Almost every lesson in this course answers a version of one of these. When a formula looks scary, ask yourself which question it is helping with. A bond price formula answers question 1. Beta and standard deviation answer question 2. Reading a company's accounts helps with both.</p>

<h2>Prices are opinions about the future</h2>
<p>A share price is not a fact about what a company owns today. It is the market's combined best guess about all the cash the company will hand to its owners in the future, shrunk for waiting and adjusted for risk. That is why a price can jump the moment news arrives, even though nothing physical inside the company changed. Everyone updated their guess.</p>

<aside class="callout mistake"><b class="lab">Common mistake</b>
<p>"Finance is about picking stocks that will go up." Some of it is, but most of finance is about something quieter: putting a price on time and risk, and deciding how much of each you can live with. You will see plenty of evidence in this course that even professionals rarely beat the market by predicting prices.</p></aside>

<h2>How this course works</h2>
<p>The lessons are grouped into modules. You can go in order, and that is the gentlest path, but each lesson stands on its own and links back to anything it depends on.</p>
<ul>
<li><b>Start here</b> (you are in it): the language of money, the math you need, and how returns are measured.</li>
<li><b>Foundations:</b> time value, risk, and the first model of how assets are priced.</li>
<li><b>Are markets efficient?</b> The great debate about whether prices can be beaten.</li>
<li><b>Portfolio management, financial statement analysis, firms and derivatives, rates and banks, fixed income:</b> the tools people use in the working world.</li>
</ul>
<p>Every lesson opens with what you will be able to do, explains new words, walks through examples with real numbers, and ends with a quiz that draws a <b>fresh set of questions every time you retake it</b>. The <b>paper breakdowns</b> take a famous piece of research and explain it in plain words before you meet the original.</p>
`,
  takeaways: [
    'Finance is about how people move money through time and deal with risk.',
    'Money now is worth more than the same money later, and riskier promises must offer more to be worth taking.',
    'Savers, borrowers, intermediaries and markets form a system that passes money from those who have it to those who can use it.',
    'Two questions run through everything: what is it worth, and how risky is it?'
  ],
  quiz: [
    { k: 'concept', q: 'Which sentence best describes what finance studies?', o: ['How people and organizations use money over time when the future is uncertain', 'How to predict tomorrow\'s stock prices', 'How to avoid paying taxes', 'How companies keep their accounting records'], a: 0, why: 'Finance is about money, time and risk. Predicting prices and accounting are small parts of it at most.' },
    { k: 'apply', q: 'Maya can earn 3% in an insured bank deposit, or lend to Dev\'s bakery at 6%. What are the extra 3 percentage points mainly for?', o: ['Paying her for the risk that Dev does not repay in full', 'Paying her for the bank\'s fees', 'A tax refund', 'Nothing: 6% is always better than 3%'], a: 0, why: 'The deposit is almost risk-free. Lending to Dev can go wrong, so the extra return is the price of taking that risk.' },
    { k: 'concept', q: 'What is the main job of a bank as an intermediary?', o: ['Gather many savers\' money and lend it to many borrowers, spreading the risk', 'Guarantee that every investment makes a profit', 'Set the price of every share', 'Print money'], a: 0, why: 'Pooling and spreading risk is the point of intermediation: no single saver has to trust one stranger with everything.' },
    { k: 'concept', q: 'Which pair of questions does almost every finance idea try to answer?', o: ['What is it worth, and how risky is it?', 'Who is the owner, and who is the manager?', 'What is the tax, and what is the fee?', 'How fast is it, and how big is it?'], a: 0, why: 'Valuation (worth) and risk-and-return (how risky, and am I paid for it) run through the whole subject.' },
    { k: 'calc', gen: () => { const i = int(2, 8), a = 10000; return N({ q: `You hide $10,000 in cash for a year, and prices rise ${i}% over that year. About how much of today's buying power does the $10,000 have at the end?`, ans: a / (1 + i / 100), wrong: [a * (1 - i / 100), a * (1 + i / 100), a], fmt: x => usd(x, 0), alt: () => a * (1 / (1 + i / 100)), fixed: true, why: `Prices are ${1 + i / 100} times higher, so your money buys 1 ÷ ${1 + i / 100} = ${round(1 / (1 + i / 100), 4)} of what it did: about ${usd(a / (1 + i / 100), 0)}. Subtracting ${i}% (${usd(a * (1 - i / 100), 0)}) is close but slightly wrong: you divide by 1 + ${i}%, you do not subtract ${i}%.` }); } },
    { k: 'concept', q: 'When a company announces surprisingly good news, its share price often jumps at once. Why?', o: ['Investors update their guess about the company\'s future cash payouts', 'The company receives money from the exchange', 'Shares are printed with a new value', 'Banks are forced to buy the shares'], a: 0, why: 'A price is the market\'s opinion about the future, so new information changes the opinion, and the price, immediately.' },
    { k: 'apply', q: 'A friend says, "Finance is basically just picking stocks that will go up." What is the best reply?', o: ['Some is, but much of finance is about pricing time and risk and choosing how much risk to take', 'That is exactly right', 'Finance is only about accounting', 'Finance is only about banks'], a: 0, why: 'Stock picking is a small slice. The core of finance is valuation, and risk and return.' },
    { k: 'concept', q: 'Which of these is an intermediary?', o: ['A bank that lends out savers\' deposits', 'A bakery that borrows to buy an oven', 'A saver with spare cash', 'A road built with a government loan'], a: 0, why: 'Intermediaries sit between savers and borrowers. The bakery and the government are borrowers; the saver is a saver.' },
    { k: 'apply', q: 'A company sells new shares to investors to raise money for a factory. In the language of this lesson, the company is acting as...', o: ['A borrower or user of money, with investors as savers', 'An intermediary', 'A market', 'A saver'], a: 0, why: 'The company needs money now and will repay it, as an owner\'s share, from future profits. The investors are the savers.' }
  ],
  related: ['fin-instruments', 'tvm', 'risk']
},

{
  id: 'fin-instruments', type: 'concept', title: 'Stocks, bonds and funds: what you can own',
  blurb: 'The main things people invest in, who gets paid first when things go wrong, and how a trade actually happens.',
  level: 'Start here', min: 14, tags: ['basics', 'markets'],
  los: [
    'Tell apart cash, bonds, stocks, funds and derivatives, and say what you own with each.',
    'Explain who is paid first if a company fails, and why stocks are riskier than bonds.',
    'Work out the cash flows of a simple bond and the total return on a simple stock purchase.',
    'Explain what an index fund or ETF is, and what an annual fee costs you.',
    'Read a bid and ask quote, and explain the difference between the primary and secondary markets.'
  ],
  terms: [
    ['Security', 'a tradable financial claim, such as a share or a bond'],
    ['Bond', 'a loan you make to a company or government, in return for regular interest and your money back later'],
    ['Face value (par)', 'the amount a bond promises to repay at the end, usually $1,000'],
    ['Coupon', 'the yearly interest a bond pays, as a percentage of its face value'],
    ['Maturity', 'the date the bond ends and the face value is repaid'],
    ['Stock (share)', 'a small slice of ownership in a company'],
    ['Dividend', 'a payment a company makes to its shareholders out of its profits'],
    ['Fund', 'one product that holds a basket of many securities for many investors'],
    ['Index', 'a list of securities used to measure a market, such as the 500 largest US companies'],
    ['Bid / ask', 'the highest price a buyer will pay now / the lowest price a seller will accept now'],
    ['Liquidity', 'how easily and cheaply you can buy or sell without moving the price']
  ],
  body: `
<p>Everything you can invest in is, at bottom, a <b>claim</b>: a legal right to some future cash, or to some asset. The different products differ in two ways: <em>what</em> you are promised, and <em>where you stand in line</em> when there is not enough to go around.</p>

<h2>The main things you can own</h2>
<table class="simple"><thead><tr><th>Product</th><th>What you own</th><th>What you get</th><th>Main risk</th></tr></thead><tbody>
<tr><td><b>Cash and deposits</b></td><td>Money in a bank, or very short-term government IOUs</td><td>Small, steady interest</td><td>Inflation slowly eats it</td></tr>
<tr><td><b>Bond</b></td><td>A loan you made to a government or company</td><td>Fixed interest, then your money back on a set date</td><td>The borrower fails to repay; rising interest rates push the bond's price down</td></tr>
<tr><td><b>Stock (share)</b></td><td>A small piece of a company</td><td>A share of profits (dividends, if paid) and any rise in the price</td><td>The price can fall a lot; you are last in line if the company fails</td></tr>
<tr><td><b>Fund</b></td><td>A slice of a basket of many securities</td><td>What the basket earns, minus a fee</td><td>Same risks as the basket</td></tr>
<tr><td><b>Derivative</b></td><td>A contract whose value depends on something else, such as a share price</td><td>A payoff that depends on that other price</td><td>Can lose everything quickly; hard to understand</td></tr>
</tbody></table>

<h2>Bonds: lending, in one example</h2>
<div class="example"><b class="lab">Example</b>
<p>A company sells you a bond with a <b>face value</b> of $1,000, a <b>coupon</b> of 5%, and <b>maturity</b> in 3 years. What cash do you receive, and when?</p>
<b class="lab sol">Solution</b>
<table class="steps"><tr><td>Yearly coupon: 5% × $1,000</td><td>$50</td></tr><tr><td>End of year 1</td><td>$50</td></tr><tr><td>End of year 2</td><td>$50</td></tr><tr><td>End of year 3: coupon plus face value</td><td>$50 + $1,000 = $1,050</td></tr><tr class="tot"><td>Total cash back</td><td>$1,150</td></tr></table>
<p>The amounts are fixed in advance. That is why bonds are called <b>fixed income</b>. The risk is that the company cannot pay.</p></div>

<h2>Stocks: owning a piece</h2>
<div class="example"><b class="lab">Example</b>
<p>You buy 10 shares at $50 each. During the year the company pays a $1 dividend per share, and at the end the price is $56. What did you earn?</p>
<b class="lab sol">Solution</b>
<table class="steps"><tr><td>Money you put in: 10 × $50</td><td>$500</td></tr><tr><td>Dividends received: 10 × $1</td><td>$10</td></tr><tr><td>Price gain: 10 × ($56 − $50)</td><td>$60</td></tr><tr class="tot"><td>Total gain: $70 on $500</td><td>14%</td></tr></table></div>
<p>Unlike a bond, nothing here is promised. The dividend could be cut and the price could just as easily have ended at $40.</p>

<h2>Who gets paid first?</h2>
<p>When a company fails and its assets are sold, the money is paid out in a fixed order. Lenders (bondholders) come <b>before</b> owners (shareholders). Owners get whatever is left, which may be nothing.</p>
<div class="example"><b class="lab">Example</b>
<p>A company owes bondholders $60. Its assets are sold. How much do shareholders get if the sale raises (a) $100, (b) $50?</p>
<b class="lab sol">Solution</b>
<p>(a) Bondholders take their $60 first. Shareholders get $100 − $60 = <b>$40</b>.<br>(b) Only $50 is available, all of which goes to bondholders (who are still owed $10). Shareholders get <b>$0</b>.</p></div>
<p>Because shareholders stand behind the lenders, stocks are riskier than bonds of the same company. Riskier things must offer higher <em>expected</em> returns, or nobody would hold them. That link between risk and reward comes back in every module.</p>
<details class="pause"><summary>Pause and try: sale for $75</summary>
<p>The same company, owing $60, is sold for $75. Shareholders get $75 − $60 = <b>$15</b>. Bondholders are fully repaid.</p></details>

<h2>Funds and ETFs: buy the basket</h2>
<p>Instead of choosing individual companies, you can buy one product that holds a whole basket. That is a <b>fund</b>. Many funds simply copy an <b>index</b>, which is a published list of securities used to measure a market. For example, a well-known index is made up of 500 of the largest US companies. An <b>index fund</b> holds all of them in the same proportions.</p>
<ul>
<li>A <b>mutual fund</b> is bought and sold at one price per day.</li>
<li>An <b>ETF</b> (exchange-traded fund) holds a basket too, but trades all day on an exchange like a single share.</li>
</ul>
<p>Funds charge a yearly fee, the <b>expense ratio</b>, taken from your money automatically. It looks small but it never stops.</p>
<div class="example"><b class="lab">Example</b><p>You hold $10,000 in a fund with an expense ratio of 0.50%. What does it cost you in a year? What if the ratio were 0.05%?</p>
<b class="lab sol">Solution</b><p>0.50% of $10,000 = 0.005 × 10,000 = <b>$50</b> a year. At 0.05%: 0.0005 × 10,000 = <b>$5</b>. Same basket, ten times the fee.</p></div>
<aside class="callout mistake"><b class="lab">Common mistake</b><p>"I can buy the index." An index is only a list; you cannot buy a list. You buy a <em>fund</em> that copies it.</p></aside>

<h2>Markets: where trading happens</h2>
<ul>
<li>In the <b>primary market</b> a company sells <em>new</em> securities to investors, for example when a company first sells shares to the public (an IPO). The company receives the money.</li>
<li>In the <b>secondary market</b> investors trade <em>existing</em> securities with each other. When you buy shares of a large company on an exchange, the company does <b>not</b> receive your money; the seller does.</li>
</ul>
<p>Secondary markets still matter to companies: because investors know they can sell easily later, they are more willing to buy new securities in the first place.</p>

<h2>Reading a price quote</h2>
<p>A quote shows two prices. The <b>bid</b> is what buyers will pay now; the <b>ask</b> is what sellers want now. The ask is always higher, and the gap is the <b>spread</b>. You buy at the ask and sell at the bid.</p>
<div class="example"><b class="lab">Example</b><p>A stock is quoted bid $49.95, ask $50.05. You buy 100 shares and, changing your mind, sell them straight away. What did that round trip cost?</p>
<b class="lab sol">Solution</b><p>You paid the ask: 100 × $50.05 = $5,005. You received the bid: 100 × $49.95 = $4,995. Loss: <b>$10</b>, which is the spread of $0.10 times 100 shares. This is the price of trading, and it is bigger for less-traded ("illiquid") securities.</p></div>

<h2>How a trade actually happens</h2>
<ol>
<li>You send an order to a <b>broker</b> (an app or company that has access to the market).</li>
<li>The broker sends it to an exchange or trading venue, where it is matched with someone on the other side.</li>
<li>The trade is <b>settled</b>: ownership and money change hands, usually within a day or two.</li>
</ol>
<p>Two common order types: a <b>market order</b> means "buy or sell now at the best available price". A <b>limit order</b> means "only at this price or better". With the quote above, a limit order to buy at $49.90 will not fill until a seller accepts $49.90 or less, and it may never fill.</p>
<p>You will also hear about <b>derivatives</b>, such as options, contracts whose value comes from another price. They get their own lesson (<a href="#/lesson/options">options</a>) once you have the basics.</p>
`,
  takeaways: [
    'Everything you can invest in is a claim on future cash; the products differ in what is promised and who is paid first.',
    'Bondholders are paid before shareholders, so stocks are riskier than bonds and must offer higher expected returns.',
    'An index is a list; you invest through a fund or ETF that copies it. Annual fees add up quietly.',
    'Secondary-market trades pass money between investors, not to the company. You buy at the ask and sell at the bid.'
  ],
  quiz: [
    { k: 'concept', q: 'What do you own when you buy a bond?', o: ['A loan you made to the issuer, with a promise of interest and repayment', 'A small piece of the company', 'A contract whose value depends on a share price', 'A list of companies'], a: 0, why: 'A bond is a loan. Owning a piece of the company is a stock.' },
    { k: 'concept', q: 'A company fails and its assets are sold. Who is paid first?', o: ['Bondholders (lenders), then shareholders with whatever is left', 'Shareholders, then bondholders', 'Everyone gets the same share', 'The stock exchange'], a: 0, why: 'Lenders stand ahead of owners in line, which is exactly why stocks are riskier than the same company\'s bonds.' },
    { k: 'calc', gen: () => { const d = pick([40, 50, 60, 70, 80]), s = int(20, 120, 10); const ans = Math.max(0, s - d); return N({ q: `A company owes bondholders $${d}. Its assets are sold for $${s}. How much do shareholders receive?`, ans, wrong: [s, d, Math.abs(s - d) + 10], fmt: x => usd(x, 0), alt: () => s > d ? s - d : 0, fixed: true, why: s > d ? `Bondholders are paid first: $${d}. Shareholders get what is left, $${s} − $${d} = $${s - d}.` : `Everything ($${s}) goes to bondholders, who are still owed $${d - s}. Shareholders get $0. Owners can never receive less than zero.` }); } },
    { k: 'calc', gen: () => { const amt = pick([5000, 10000, 20000, 25000, 40000]), r = pick([0.05, 0.10, 0.20, 0.50, 0.75, 1.0]); const ans = amt * r / 100; return N({ q: `You hold ${usd(amt, 0)} in a fund with an annual expense ratio of ${r.toFixed(2)}%. What does the fee cost you over one year?`, ans, wrong: [amt * r, ans * 10, ans / 10], fmt: x => usd(x, x < 10 ? 2 : 0), alt: () => (amt / 1000) * (r * 10), fixed: true, why: `${r.toFixed(2)}% means ${r}/100 = ${r / 100}. Then ${usd(amt, 0)} × ${r / 100} = ${usd(ans, ans < 10 ? 2 : 0)}. (A common slip is to multiply by ${r} instead of ${r / 100}.)` }); } },
    { k: 'calc', gen: () => { const sh = pick([100, 200, 500, 1000]), sp = pick([0.02, 0.05, 0.10, 0.20]), bid = pick([24.98, 49.95, 99.90]); const ask = round(bid + sp, 2); const ans = round(sh * sp, 2); return N({ q: `A stock is quoted bid $${bid.toFixed(2)}, ask $${ask.toFixed(2)}. You buy ${sh} shares and immediately sell them. Ignoring fees, how much do you lose?`, ans, wrong: [sp, sh * ask, ans * 2], fmt: x => usd(x, 2), alt: () => sh * ask - sh * bid, tol: 1e-6, fixed: true, why: `You pay the ask and receive the bid: ${sh} × ($${ask.toFixed(2)} − $${bid.toFixed(2)}) = ${sh} × $${sp.toFixed(2)} = ${usd(ans, 2)}. That is the spread, the price of trading.` }); } },
    { k: 'calc', gen: () => { const face = pick([500, 1000]), c = int(3, 8), n = int(2, 5); const ans = face * c / 100 * n + face; return N({ q: `A bond has a face value of $${face}, a ${c}% annual coupon and matures in ${n} years. How much cash in total will you receive if you hold it to maturity and the issuer pays in full?`, ans, wrong: [face * c / 100 * n, face * Math.pow(1 + c / 100, n), face + face * c / 100], fmt: x => usd(x, 0), alt: () => { let t = 0; for (let y = 1; y <= n; y++) t += face * c / 100 + (y === n ? face : 0); return t; }, fixed: true, why: `Each year pays the coupon: ${c}% × $${face} = $${face * c / 100}. That happens ${n} times = $${face * c / 100 * n}. Add the face value repaid at the end: $${ans}. (Bond interest is paid on the face value, not compounded.)` }); } },
    { k: 'concept', q: 'When you buy shares of a large company from another investor on an exchange, who receives your money?', o: ['The investor who sold you the shares', 'The company', 'The exchange keeps it', 'The government'], a: 0, why: 'That is a secondary-market trade between investors. Only in the primary market (new securities) does the company receive the money.' },
    { k: 'concept', q: 'What is an index?', o: ['A published list of securities used to measure a market', 'A type of bond', 'A brand of mutual fund', 'A fee charged by brokers'], a: 0, why: 'You cannot buy an index directly; you buy a fund or ETF that holds the same securities.' },
    { k: 'apply', q: 'You place a limit order to buy a stock at $49.90 when the ask is $50.05. What happens?', o: ['It waits and fills only if a seller accepts $49.90 or less, so it may never fill', 'It fills instantly at $50.05', 'It fills instantly at $49.90', 'It is cancelled automatically'], a: 0, why: 'A limit order sets the worst price you will accept. If the market does not come to you, nothing happens.' },
    { k: 'concept', q: 'Why is a company\'s stock riskier than its bonds?', o: ['Shareholders are paid only after lenders, and nothing is promised to them', 'Stocks are illegal to sell', 'Bonds pay dividends and stocks pay coupons', 'Stocks always lose money'], a: 0, why: 'Standing behind the lenders and having no fixed promise makes returns to owners far less certain.' },
    { k: 'apply', q: 'Two funds hold exactly the same basket. One charges 0.05% a year and the other 0.75%. Before markets move, which statement is true?', o: ['The cheaper fund keeps more of your money every year', 'The costlier fund is safer', 'The fees are refunded at the end', 'They must earn different returns before fees'], a: 0, why: 'Same basket means the same return before fees. The fee difference comes straight out of what you keep.' }
  ],
  related: ['fin-map', 'fin-returns', 'fi-basics']
},

{
  id: 'math-basics', type: 'guide', title: 'The math you need, in plain English',
  blurb: 'Percentages, exponents, Σ, averages, standard deviation, e, ln and the bell curve: every symbol used in this course, explained with numbers.',
  level: 'Start here', min: 20, tags: ['math', 'notation'], widget: 'normal',
  los: [
    'Turn a percentage into a decimal and a growth factor, and use them to grow or shrink a number.',
    'Read and compute exponents, sums (Σ) and expected values.',
    'Calculate a standard deviation for a short list and say what it means.',
    'Describe correlation from −1 to +1, and use a z-score with the bell curve.',
    'Recognize the symbols e, ln, Δ, β and α when you meet them later.'
  ],
  terms: [
    ['Decimal', 'a percentage written as a plain number: 7% = 0.07'],
    ['Growth factor', 'the number you multiply by to grow money: 1.07 for 7% growth'],
    ['Exponent', 'a small raised number that says how many times to multiply'],
    ['Average (mean)', 'add the values up, then divide by how many there are'],
    ['Standard deviation', 'a measure of how far values typically stray from their average'],
    ['Correlation', 'a score from −1 to +1 for how closely two things move together'],
    ['z-score', 'how many standard deviations a value sits above or below the average']
  ],
  body: `
<p>Finance formulas look intimidating mostly because of the notation. Underneath, they use about ten ideas, and each one is arithmetic with a name. This page explains all of them once. If a formula later in the course looks scary, come back here or check the <a href="#/formulas">formula sheet</a>. <b>You do not need to memorize any of this now.</b> Read sections 1 to 5 carefully. Sections 6 to 8 can wait until a lesson asks for them.</p>

<h2>1. Percent, decimal and growth factor</h2>
<p>Formulas want <b>decimals</b>, not percentages. Divide the percentage by 100.</p>
<div class="fx"><div class="formula">7% = 0.07 &nbsp;→&nbsp; growth factor = 1 + 0.07 = 1.07</div><div class="fx-body">
<p><b class="lab">In plain English</b>To grow money by 7%, multiply it by 1.07. To shrink it by 7%, multiply by 0.93. The "1" is your original money; the 0.07 is the extra.</p>
<p class="ex"><b class="lab">Worked example</b>$200 growing 7% → 200 × 1.07 = <b>$214</b>. A stock that falls 20% is multiplied by 0.80.</p>
<p class="hook"><b class="lab">Remember it as</b>"Percent ÷ 100, then add 1 if you want the multiplier."</p></div></div>
<details class="pause"><summary>Pause and try: a 15% raise</summary><p>Your pay is $3,000 a month and rises 15%. The growth factor is 1.15, so the new pay is 3,000 × 1.15 = <b>$3,450</b>.</p></details>

<h2>2. Exponents: repeat the multiplication</h2>
<div class="fx"><div class="formula">(1 + r)<sup>n</sup> = (1 + r) × (1 + r) × … (n times)</div><div class="fx-body">
<p><b class="lab">In plain English</b>The small raised number just counts how many times to multiply. A <b>negative</b> exponent means "divide instead": (1 + r)<sup>−n</sup> = 1 ÷ (1 + r)<sup>n</sup>. That is how we shrink future money back to today.</p>
<p class="ex"><b class="lab">Worked example</b>1.07<sup>3</sup> = 1.07 × 1.07 × 1.07 = 1.225. So 7% a year for 3 years grows money by 22.5%, not 21%, because you earn interest on your interest.</p>
<p class="hook"><b class="lab">Remember it as</b>"The little number says how many times."</p></div></div>
<aside class="callout mistake"><b class="lab">Common mistake</b><p>Three years at 7% is <em>not</em> 3 × 7% = 21%. Growth compounds: each year's interest earns interest of its own, so the true total is 22.5%.</p></aside>

<h2>3. Σ (sigma): "add these up"</h2>
<div class="fx"><div class="formula">Σ C<sub>t</sub> &nbsp;=&nbsp; C<sub>1</sub> + C<sub>2</sub> + C<sub>3</sub> + …</div><div class="fx-body">
<p><b class="lab">In plain English</b>Σ is the Greek capital S, for "sum". The little <i>t</i> is a counter (year 1, year 2, …). Σ tells you to work out the thing for every value of the counter, then add the results.</p>
<p class="ex"><b class="lab">Worked example</b>Cash flows of $100, $100, $100 in years 1, 2, 3: Σ C<sub>t</sub> = 100 + 100 + 100 = <b>$300</b>.</p></div></div>

<h2>4. Average and expected value</h2>
<p>An <b>average</b> is the sum divided by the count: returns of 4%, 12%, −2% and 10% add to 24%, and 24% ÷ 4 = 6%. When outcomes are not equally likely, we weight each outcome by its chance. That is the <b>expected value</b>.</p>
<div class="fx"><div class="formula">E[R] = Σ (probability × outcome)</div><div class="fx-body">
<p><b class="lab">In plain English</b>If you could repeat a gamble many times, E[R] is the average result. Multiply each outcome by its chance and add them up. The square brackets just mean "the expected value of".</p>
<p class="ex"><b class="lab">Worked example</b>50% chance of +20%, 50% chance of −10%: E[R] = 0.5 × 20% + 0.5 × (−10%) = <b>+5%</b>. You will never actually earn 5% in a single year; it is the long-run average.</p></div></div>

<h2>5. Variance and standard deviation: how bumpy is it?</h2>
<p>Two investments can both average 6% a year. One earns 6% every year; the other swings between −20% and +30%. The averages match, but the experience does not. We need a number for the bumpiness.</p>
<div class="fx"><div class="formula">σ = √( average of (return − average return)² )</div><div class="fx-body">
<p><b class="lab">In plain English</b>Standard deviation (σ, "sigma") measures how far returns typically stray from their average. Bigger σ = bumpier ride. <b>Variance</b> is σ² (the average squared distance, before taking the square root). We square so that ups and downs do not cancel out.</p>
<dl class="syms"><dt>σ</dt><dd>standard deviation, the typical swing, in the same units as the returns (%)</dd><dt>σ²</dt><dd>variance</dd></dl>
<p class="ex"><b class="lab">Worked example</b>Yearly returns 4%, 12%, −2%, 10%. Average = 6%. Distances from average: −2, +6, −8, +4. Squared: 4, 36, 64, 16, whose average is 30. σ = √30 ≈ <b>5.5%</b>. (Statisticians often divide by n − 1 = 3 instead of 4, giving 6.3%; the idea is identical.)</p>
<p class="hook"><b class="lab">Remember it as</b>"σ is the typical wobble. About 68% of outcomes land within one σ of the average, and about 95% within two."</p></div></div>
<h3>Volatility scales with the square root of time</h3>
<div class="fx"><div class="formula">σ<sub>year</sub> = σ<sub>day</sub> × √252 &nbsp;&nbsp;&nbsp; σ<sub>T</sub> = σ<sub>year</sub> × √T</div><div class="fx-body">
<p><b class="lab">In plain English</b>Random ups and downs partly cancel over time, so risk grows more slowly than time itself. There are about 252 trading days in a year.</p>
<p class="ex"><b class="lab">Worked example</b>Daily σ of 1% → yearly σ ≈ 1% × √252 ≈ <b>15.9%</b>. For an option lasting half a year, σ√T = 25% × √0.5 = <b>17.7%</b>. That is the number that appears in Black–Scholes.</p></div></div>

<h2>6. Covariance and correlation: do two things move together?</h2>
<div class="fx"><div class="formula">ρ = Cov(A, B) ÷ (σ<sub>A</sub> × σ<sub>B</sub>)</div><div class="fx-body">
<p><b class="lab">In plain English</b>Covariance says whether two assets tend to be above their averages at the same time. It is hard to read because its size depends on the units. Dividing by both σ's squeezes it into a clean scale from <b>−1</b> to <b>+1</b>, called <b>correlation</b> (ρ, "rho").</p>
<dl class="syms"><dt>ρ = +1</dt><dd>move in perfect lockstep (no diversification)</dd><dt>ρ = 0</dt><dd>unrelated</dd><dt>ρ = −1</dt><dd>perfect opposites (can cancel risk completely)</dd></dl></div></div>

<h2>7. e and ln: continuous growth and its undo button</h2>
<div class="fx"><div class="formula">e ≈ 2.718 &nbsp;&nbsp; e<sup>x</sup> &nbsp;&nbsp; ln(e<sup>x</sup>) = x</div><div class="fx-body">
<p><b class="lab">In plain English</b><b>e</b> is a special number (≈ 2.718) that appears when growth happens continuously rather than once a year. e<sup>rT</sup> is the growth factor for earning rate <i>r</i> continuously for <i>T</i> years. Its mirror, <b>e<sup>−rT</sup></b>, is the <b>discount factor</b>: what $1 received at time <i>T</i> is worth today. <b>ln</b> ("natural log") is the undo button for e<sup>x</sup>, and it turns ratios into percentage differences.</p>
<dl class="syms"><dt>e<sup>rT</sup></dt><dd>continuous growth factor</dd><dt>e<sup>−rT</sup></dt><dd>discount factor (always between 0 and 1 for positive r)</dd><dt>ln(a ÷ b)</dt><dd>≈ how many percent bigger a is than b (as a decimal)</dd></dl>
<p class="ex"><b class="lab">Worked example</b>$100 at 5% compounded continuously for a year → 100 × e<sup>0.05</sup> = $105.13 (versus $105 with once-a-year compounding). Discounting: 3% for half a year → e<sup>−0.015</sup> = <b>0.985</b>, so $100 due in six months is worth $98.51 today. And ln(110 ÷ 100) = 0.0953, close to "10% bigger".</p>
<p class="hook"><b class="lab">Remember it as</b>"e<sup>−rT</sup> is the 'shrink back to today' multiplier. ln(S ÷ K) is 'how far apart, in percent'."</p></div></div>

<h2>8. The bell curve and N(z)</h2>
<div class="fx"><div class="formula">z = (value − average) ÷ σ &nbsp;&nbsp;&nbsp; N(z) = chance of being below z</div><div class="fx-body">
<p><b class="lab">In plain English</b>Many random quantities follow a bell-shaped curve. A <b>z-score</b> re-expresses any value as "how many typical swings above or below average". <b>N(z)</b> then gives the probability of landing <em>below</em> that point (the area under the curve to its left). It always lies between 0 and 1.</p>
<dl class="syms"><dt>N(0)</dt><dd>0.50: exactly half the outcomes are below average</dd><dt>N(1)</dt><dd>0.84 &nbsp;(one swing above average)</dd><dt>N(−1)</dt><dd>0.16 &nbsp;(one swing below). Always N(−z) = 1 − N(z)</dd><dt>N(2)</dt><dd>0.98</dd></dl>
<p class="ex"><b class="lab">Worked example</b>Stocks average +7% a year with σ = 15%. Chance of a losing year (below 0%)? z = (0 − 7) ÷ 15 = −0.47, N(−0.47) ≈ <b>32%</b>. Try it below.</p></div></div>

<h2>9. Notation cheat sheet</h2>
<dl class="defs">
<dt>E[ ]</dt><dd>"expected value of" whatever is inside.</dd>
<dt>r, r<sub>f</sub></dt><dd>a rate of return; r<sub>f</sub> is the risk-free rate (what a government bill pays).</dd>
<dt>R<sub>i</sub>, R<sub>m</sub></dt><dd>return on asset <i>i</i>; return on the market. The little letter below is a label, not a number.</dd>
<dt>β (beta)</dt><dd>sensitivity to the market.</dd>
<dt>α (alpha)</dt><dd>return beyond what risk explains. (In prospect theory α means something else: curvature. Context tells you which.)</dd>
<dt>Δ (delta)</dt><dd>"change in", for example Δy = change in yield.</dd>
<dt>×, ÷, ·</dt><dd>×, · and side-by-side letters (like <i>wσ</i>) all mean multiply; a fraction bar or ÷ means divide.</dd>
<dt>≈</dt><dd>"approximately equal".</dd>
</dl>
`,
  takeaways: [
    'Convert percentages to decimals; a growth factor is 1 + r. Growth compounds, so 7% for 3 years is 22.5%, not 21%.',
    'An expected value weights outcomes by their chances; a standard deviation (σ) measures the typical wobble around the average.',
    'Correlation (ρ, from −1 to +1) says how two assets move together.',
    'e^(−rT) shrinks future money to today; N(z) turns a z-score into a probability.'
  ],
  quiz: [
    { k: 'calc', gen: () => { const p = int(3, 15), a = pick([200, 500, 800, 1200]); return N({ q: `You earn ${p}% on ${usd(a, 0)}. How much do you have after one year?`, ans: a * (1 + p / 100), wrong: [a * p / 100, a + p, a * (1 - p / 100)], fmt: x => usd(x, x % 1 ? 2 : 0), alt: () => a + a * p / 100, fixed: true, why: `The growth factor is 1 + ${p}/100 = ${1 + p / 100}. Then ${usd(a, 0)} × ${1 + p / 100} = ${usd(a * (1 + p / 100), 2)}. (${usd(a * p / 100, 2)} is only the interest, not the total.)` }); } },
    { k: 'calc', gen: () => { const r = pick([5, 6, 8, 10]), n = int(2, 4); const g = Math.pow(1 + r / 100, n); return N({ q: `Money grows ${r}% a year for ${n} years. By what percentage has it grown in total?`, ans: (g - 1) * 100, wrong: [r * n, r * n + 1, (g - 1) * 100 + 3], fmt: x => pct(x, 1), alt: () => { let m = 1; for (let i = 0; i < n; i++) m *= 1 + r / 100; return (m - 1) * 100; }, tol: 1e-6, fixed: true, why: `Compound it: ${1 + r / 100}^${n} = ${round(g, 4)}, so total growth is ${pct((g - 1) * 100, 1)}. Adding ${r}% ${n} times (${r * n}%) misses the interest earned on interest.` }); } },
    { k: 'calc', gen: () => { const x = [int(-4, 4), int(2, 14), int(-6, 2), int(4, 12)]; const m = QL.mean(x); const v = x.reduce((s, y) => s + (y - m) * (y - m), 0) / x.length; return N({ q: `Yearly returns were ${x.map(y => y + '%').join(', ')}. What is the average return?`, ans: m, wrong: [x.reduce((a, b) => a + b, 0), Math.max.apply(null, x), m + 2], fmt: x2 => pct(x2, 2), alt: () => (x[0] + x[1] + x[2] + x[3]) / 4, why: `Add them: ${x.join(' + ')} = ${x.reduce((a, b) => a + b, 0)}, then divide by 4: ${round(m, 2)}%. (For the record, the standard deviation of these four numbers is ${round(Math.sqrt(v), 2)}%.)` }); } },
    { k: 'calc', gen: () => { const up = pick([10, 20, 30, 40]), pu = pick([0.25, 0.5, 0.75]), dn = pick([-5, -10, -20]); const ans = pu * up + (1 - pu) * dn; return N({ q: `A bet pays ${up}% with probability ${pu * 100}% and ${dn}% otherwise. What is the expected return?`, ans, wrong: [(up + dn) / 2, up * pu, up + dn], fmt: x => pct(x, 2), alt: () => up * pu + dn * (1 - pu), why: `Weight each outcome by its chance: ${pu} × ${up}% + ${round(1 - pu, 2)} × (${dn}%) = ${round(pu * up, 2)}% + (${round((1 - pu) * dn, 2)}%) = ${round(ans, 2)}%. A simple average of the two outcomes ignores the different chances.` }); } },
    { k: 'concept', q: 'A discount factor e^(−rT) equals 0.95. What does it mean?', o: ['$1 received at time T is worth $0.95 today', '$1 today is worth $0.95 at time T', 'The interest rate is 95%', 'The bond will default 5% of the time'], a: 0, why: 'Discount factors shrink future money back to its present value.' },
    { k: 'concept', q: 'Two assets have a correlation of −1. What does that tell you?', o: ['They move in exact opposite directions, so they can cancel each other\'s risk', 'They move in lockstep', 'They are unrelated', 'Both must lose money'], a: 0, why: '−1 means perfect opposites. +1 is lockstep and 0 is unrelated.' },
    { k: 'concept', q: 'A stock\'s return is 1 standard deviation below average (z = −1). About what chance is there of doing worse than that?', o: ['About 16%', 'About 50%', 'About 84%', 'About 2%'], a: 0, why: 'N(−1) ≈ 0.16, so around one year in six is worse.' },
    { k: 'calc', gen: () => { const mu = pick([6, 7, 8, 10]), s = pick([10, 15, 20]), x = pick([-10, -5, 0, 5]); const z = (x - mu) / s; return N({ q: `A stock returns ${mu}% a year on average with a standard deviation of ${s}%. What is the z-score of a year in which it returns ${x}%?`, ans: z, wrong: [(mu - x) / s, (x - mu) * s, (x - mu) / (s * s)], fmt: v => QL.num(v, 2), alt: () => (x - mu) * (1 / s), why: `z = (value − average) ÷ σ = (${x} − ${mu}) ÷ ${s} = ${round(z, 2)}. Negative means below average; the size says how many "typical swings" away.` }); } },
    { k: 'concept', q: 'Why do we square the distances from the average when computing standard deviation?', o: ['So that ups and downs do not cancel each other out', 'To make the number bigger', 'Because returns are always negative', 'To convert to dollars'], a: 0, why: 'Without squaring, positive and negative distances would sum to zero.' },
    { k: 'apply', q: 'Daily returns on a stock have a standard deviation of 2%. About what is the yearly standard deviation (252 trading days)?', o: ['About 32%', 'About 2%', 'About 504%', 'About 8%'], a: 0, why: 'Volatility scales with the square root of time: 2% × √252 ≈ 2% × 15.87 ≈ 31.7%.' }
  ],
  related: ['tvm', 'risk', 'fin-returns']
},

{
  id: 'fin-returns', type: 'concept', title: 'Returns: measuring what you earned',
  blurb: 'Dollar and percent returns, price return plus income, why averages of returns mislead, annualizing, and stripping out inflation.',
  level: 'Start here', min: 14, tags: ['returns', 'basics'],
  los: [
    'Calculate a holding-period return, including dividends or interest received.',
    'Split a total return into a price return and an income return.',
    'Explain why returns multiply rather than add, and why +50% then −50% leaves you behind.',
    'Convert a multi-year result into a yearly (annualized) return using the geometric average.',
    'Turn a nominal return into a real return by removing inflation.'
  ],
  terms: [
    ['Return', 'the gain or loss on an investment, usually shown as a percentage of what you put in'],
    ['Holding-period return (HPR)', 'the total return over however long you held the investment'],
    ['Dividend yield', 'yearly dividends divided by the price'],
    ['Total return', 'price change plus any income, all divided by the starting price'],
    ['Arithmetic average', 'the ordinary average: add and divide'],
    ['Geometric average', 'the average yearly growth rate that reproduces your actual final result (also called compound annual growth rate, CAGR)'],
    ['Nominal / real', 'nominal = measured in plain money; real = measured in what the money can actually buy, after inflation'],
    ['Inflation', 'the general rise in prices over time']
  ],
  body: `
<p>A <b>return</b> answers one question: <em>for what I put in, how much did I get out?</em> It sounds simple, and it is, but there are four traps that catch nearly every beginner. This lesson walks through them slowly.</p>

<h2>Dollar returns and percent returns</h2>
<p>Suppose you make $50. Is that good? It depends on what you put in. $50 on $100 is a 50% return and extraordinary. $50 on $10,000 is 0.5% and disappointing. That is why finance uses <b>percent</b> returns: they let you compare investments of any size.</p>
<div class="fx"><div class="formula">Return = (End value − Start value + Income) ÷ Start value</div><div class="fx-body">
<p><b class="lab">In plain English</b>Work out everything you gained (the change in price plus any dividends or interest received), then divide by what you started with.</p>
<dl class="syms"><dt>End value</dt><dd>what the investment is worth at the end</dd><dt>Start value</dt><dd>what you paid at the start</dd><dt>Income</dt><dd>dividends or interest received along the way</dd></dl>
<p class="ex"><b class="lab">Worked example</b>You buy a share at $40, receive a $1 dividend, and sell at $44. Return = (44 − 40 + 1) ÷ 40 = 5 ÷ 40 = <b>12.5%</b>.</p>
<p class="hook"><b class="lab">Remember it as</b>"Gain divided by what you put in."</p></div></div>
<details class="pause"><summary>Pause and try: a share that fell</summary><p>You buy at $80, get a $2 dividend, and the price falls to $76. Gain = 76 − 80 + 2 = −2. Return = −2 ÷ 80 = <b>−2.5%</b>. The dividend softened the loss.</p></details>

<h2>Price return plus income return</h2>
<p>The 12.5% above has two parts: the price rose by 4 on 40, which is a <b>price return</b> of 10%, and the dividend was 1 on 40, an <b>income return</b> (dividend yield) of 2.5%. Together they make the <b>total return</b>: 10% + 2.5% = 12.5%. Always ask whether a quoted return includes the income or only the price change.</p>

<h2>Trap 1: returns multiply, they do not add</h2>
<p>Money grows by factors. A 10% gain is a factor of 1.10. Two years in a row multiply: 1.10 × 1.20 = 1.32, so +10% then +20% is a 32% total gain, not 30%.</p>
<div class="example"><b class="lab">Example</b><p>An investment gains 10% in year 1 and loses 10% in year 2. Are you back where you started?</p>
<b class="lab sol">Solution</b><p>Multiply the factors: 1.10 × 0.90 = 0.99. You are at 99% of your start: a <b>1% loss</b>. The gain came on a smaller base than the loss.</p></div>

<h2>Trap 2: the average of returns hides losses</h2>
<p>A stock rises 50% in year 1 and falls 50% in year 2. The ordinary (<b>arithmetic</b>) average return is (+50% − 50%) ÷ 2 = 0%. So you broke even? No:</p>
<table class="steps"><tr><td>Start</td><td>$100</td></tr><tr><td>After +50%: 100 × 1.5</td><td>$150</td></tr><tr><td>After −50%: 150 × 0.5</td><td>$75</td></tr><tr class="tot"><td>Result</td><td>−25%</td></tr></table>
<p>The average said 0%, yet you lost a quarter of your money. The number that matches reality is the <b>geometric average</b>: the constant yearly growth that would give the same final result. Here it is √(1.5 × 0.5) − 1 = √0.75 − 1 = 0.866 − 1 = <b>−13.4% a year</b>. Check: $100 × 0.866 × 0.866 = $75. ✓.</p>
<aside class="callout mistake"><b class="lab">Common mistake</b><p>Quoting the arithmetic average as if it were what you earned each year. The more the returns bounce around, the bigger the gap between the arithmetic and geometric averages. Rule: to describe <em>what actually happened to your money</em>, use the geometric average.</p></aside>

<h2>Annualizing: turning a total into a yearly rate</h2>
<div class="fx"><div class="formula">Annualized return = (End ÷ Start)<sup>1/years</sup> − 1</div><div class="fx-body">
<p><b class="lab">In plain English</b>Find the total growth factor (end ÷ start). Then take the "years-th root" of it, which undoes the compounding, to find the yearly factor. Subtract 1 to get a percent.</p>
<dl class="syms"><dt>End ÷ Start</dt><dd>the total growth factor over the whole period</dd><dt>1/years</dt><dd>an exponent that takes the root: for 2 years, the square root; for 4 years, the fourth root</dd></dl>
<p class="ex"><b class="lab">Worked example</b>$10,000 grows to $15,000 in 4 years. Total factor = 1.5. Yearly factor = 1.5<sup>1/4</sup> = 1.1067. Annualized return ≈ <b>10.67%</b>. Check: 1.1067<sup>4</sup> ≈ 1.5. ✓</p>
<p class="hook"><b class="lab">Remember it as</b>"Total growth, then the root for the number of years."</p></div></div>
<p>Annualizing lets you compare fairly. A 5% gain in one month is far better than a 5% gain in one year, and only converting both to a yearly rate shows it.</p>

<h2>Trap 3: money is not the same as buying power</h2>
<p>Suppose your investment earns 6% but prices rise 3% over the same year. You have 6% more money, but each unit of money buys 3% less. The <b>nominal</b> return (in plain money) is 6%. The <b>real</b> return (in buying power) is lower.</p>
<div class="fx"><div class="formula">1 + real return = (1 + nominal return) ÷ (1 + inflation)</div><div class="fx-body">
<p><b class="lab">In plain English</b>Divide your growth factor by the inflation factor. What remains is how much more you can actually buy.</p>
<p class="ex"><b class="lab">Worked example</b>Nominal 6%, inflation 3%: 1.06 ÷ 1.03 = 1.0291. Real return ≈ <b>2.91%</b>. The quick shortcut "nominal minus inflation" gives 3%, which is close when rates are small.</p>
<p class="hook"><b class="lab">Remember it as</b>"Nominal is what the account says. Real is what it buys."</p></div></div>
`,
  takeaways: [
    'A return is gain ÷ amount invested, where the gain includes income as well as the price change.',
    'Returns multiply: +10% then +20% is +32%. A 50% gain followed by a 50% loss leaves you 25% down.',
    'The geometric average (annualized return) describes what happened to your money; the arithmetic average overstates it.',
    'Real return = (1 + nominal) ÷ (1 + inflation) − 1.'
  ],
  quiz: [
    { k: 'calc', gen: () => { const s = pick([20, 40, 50, 80]), e = round(s * (1 + int(-15, 25) / 100), 2), d = pick([0, 0.5, 1, 2]); const ans = (e - s + d) / s * 100; return N({ q: `You buy a share at $${s.toFixed(2)}, receive $${d.toFixed(2)} in dividends, and sell at $${e.toFixed(2)}. What is your total return?`, ans, wrong: [(e - s) / s * 100, (e - s + d) / e * 100, ((e - s) / s * 100) + d], fmt: x => pct(x, 2), alt: () => ((e - s) / s + d / s) * 100, tol: 1e-6, why: `Gain = ${e.toFixed(2)} − ${s.toFixed(2)} + ${d.toFixed(2)} = ${round(e - s + d, 2)}. Return = ${round(e - s + d, 2)} ÷ ${s} = ${pct(ans, 2)}. Divide by what you paid at the start, not the end value, and count the dividend as part of the gain.` }); } },
    { k: 'calc', gen: () => { const a = pick([10, 15, 20, 25, 30]), b = pick([10, 20, 30, 40]); const ans = ((1 + a / 100) * (1 + b / 100) - 1) * 100; return N({ q: `An investment gains ${a}% in year 1 and ${b}% in year 2. What is the total gain over the two years?`, ans, wrong: [a + b, (a + b) / 2, a * b / 100], fmt: x => pct(x, 2), alt: () => { let m = 100; m *= 1 + a / 100; m *= 1 + b / 100; return m - 100; }, tol: 1e-6, fixed: true, why: `Multiply the growth factors: ${1 + a / 100} × ${1 + b / 100} = ${round((1 + a / 100) * (1 + b / 100), 4)}, so the total gain is ${pct(ans, 2)}. Adding the percentages (${a + b}%) ignores the interest earned on year 1's gain.` }); } },
    { k: 'calc', gen: () => { const g = pick([20, 30, 40, 50]); const f1 = 1 + g / 100, f2 = 1 - g / 100; const ans = (f1 * f2 - 1) * 100; return N({ q: `A stock rises ${g}% in year 1, then falls ${g}% in year 2. What is your total result over the two years?`, ans, wrong: [0, g, -g], fmt: x => pct(x, 1), alt: () => (100 * (1 + g / 100) * (1 - g / 100) - 100), tol: 1e-6, fixed: true, why: `Multiply: ${f1} × ${round(f2, 2)} = ${round(f1 * f2, 4)}, a total change of ${pct(ans, 1)}. Equal gains and losses do not cancel because the loss applies to a bigger amount.` }); } },
    { k: 'calc', gen: () => { const s = pick([5000, 10000, 20000]), yrs = pick([2, 3, 4, 5]), r = pick([6, 8, 10, 12]); const e = s * Math.pow(1 + r / 100, yrs); return N({ q: `${usd(s, 0)} grows to ${usd(e, 2)} in ${yrs} years. What is the annualized (compound) return?`, ans: r, wrong: [(e / s - 1) * 100 / yrs, (e / s - 1) * 100, r + 2], fmt: x => pct(x, 2), alt: () => (Math.exp(Math.log(e / s) / yrs) - 1) * 100, tol: 1e-6, fixed: true, why: `Total factor = ${usd(e, 2)} ÷ ${usd(s, 0)} = ${round(e / s, 4)}. Take the ${yrs}th root: ${round(e / s, 4)}^(1/${yrs}) = ${1 + r / 100}, so ${pct(r, 2)} a year. Dividing the total gain by ${yrs} would overstate it because it ignores compounding.` }); } },
    { k: 'calc', gen: () => { const n = pick([5, 6, 8, 10]), i = pick([2, 3, 4, 5]); const ans = ((1 + n / 100) / (1 + i / 100) - 1) * 100; return N({ q: `An investment earns ${n}% while inflation is ${i}%. What is the real return, to two decimal places?`, ans, wrong: [n - i, n / i, (n - i) / (1 + n / 100) ], fmt: x => pct(x, 2), alt: () => ((100 * (1 + n / 100)) / (1 + i / 100) - 100), tol: 1e-6, fixed: true, why: `Real = (1 + ${n}%) ÷ (1 + ${i}%) − 1 = ${round(1 + n / 100, 2)} ÷ ${round(1 + i / 100, 2)} − 1 = ${pct(ans, 2)}. "Nominal minus inflation" (${n - i}%) is a quick approximation, but the exact answer divides.` }); } },
    { k: 'concept', q: 'A stock rises 50% one year and falls 50% the next. Its arithmetic average return is 0%. What actually happened to your money?', o: ['It shrank by 25%', 'It stayed the same', 'It grew by 25%', 'It shrank by 50%'], a: 0, why: '1.5 × 0.5 = 0.75. The average of the percentages hides the fact that the loss applied to a larger amount.' },
    { k: 'concept', q: 'Which average best describes what actually happened to your money over several years?', o: ['The geometric average', 'The arithmetic average', 'The largest yearly return', 'The most recent yearly return'], a: 0, why: 'The geometric average is the constant yearly growth that reproduces your actual final result.' },
    { k: 'concept', q: 'A share price rises from $50 to $55 and the company pays a $1 dividend. Which statement is correct?', o: ['The price return is 10% and the total return is 12%', 'The price return is 12%', 'The total return is 10%', 'The dividend does not count as return'], a: 0, why: 'Price return = 5 ÷ 50 = 10%. The dividend adds 1 ÷ 50 = 2%. Total = 12%.' },
    { k: 'apply', q: 'Fund A returned 5% in one month. Fund B returned 5% in one year. Which comparison is fair?', o: ['Turn both into annual returns first; A\'s is far higher', 'They are equal', 'B is better because a year is longer', 'You cannot compare them'], a: 0, why: 'Returns over different lengths must be annualized before comparing. 5% a month compounds to about 80% a year.' },
    { k: 'concept', q: 'Your account grows 4% in a year in which prices rise 6%. Your real return is...', o: ['Negative: you can buy less than before', 'Positive, because 4% is a gain', 'Exactly 4%', 'Exactly 10%'], a: 0, why: 'Real return = 1.04 ÷ 1.06 − 1 ≈ −1.9%. The money grew but its buying power fell.' }
  ],
  related: ['tvm', 'risk', 'fin-instruments']
}

  );
})();
