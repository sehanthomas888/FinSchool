/* Financial statement analysis: reading statements, ratios, DuPont, accounting choices, earnings quality, free cash flow and DCF,
   multiples, and credit analysis. A small bakery is the running example in the first lesson. */
window.LESSONS = window.LESSONS || [];
(function () {
  const QL = window.QL, N = QL.numeric, usd = QL.usd, pct = QL.pct, int = QL.int, pick = QL.pick, round = QL.round, num = QL.num;

  window.LESSONS.push(

{
  id: 'fsa-statements', type: 'concept', title: 'The three financial statements and how they connect',
  blurb: 'Income statement, balance sheet and cash flow statement: what each shows and why profit is not cash.',
  level: 'Foundations', min: 20, tags: ['statements', 'accounting basics'], widget: 'statements',
  los: [
    'Say what the income statement, balance sheet and cash flow statement each show.',
    'Use Assets = Liabilities + Equity to find a missing figure.',
    'Explain why a profitable company can still run short of cash.',
    'Calculate operating cash flow from net income using the indirect method.',
    'Show how net income links to retained earnings on the balance sheet.'
  ],
  terms: [
    ['Revenue (sales)', 'money earned from customers for goods or services'],
    ['Expense', 'a cost of running the business during the period'],
    ['Net income (profit)', 'revenue minus all expenses, including interest and tax'],
    ['Asset / liability', 'something the company owns / something it owes'],
    ['Equity', 'what is left for the owners after subtracting liabilities from assets'],
    ['Accrual accounting', 'counting revenue when it is earned and costs when they are incurred, not when cash moves'],
    ['Receivable', 'money customers owe the company for sales already made'],
    ['Depreciation', 'a yearly charge that spreads the cost of equipment over its useful life; no cash leaves that year']
  ],
  body: `
<p>Every listed company publishes three core statements (plus notes). To analyze a business you need to know what each one says, and how they tie together. We will follow one tiny business through all three.</p>

<h2>Meet Sunny Bakery</h2>
<aside class="callout story"><b class="lab">Picture this</b>
<p>Sunny Bakery has finished its first year. It sold $500,000 of bread and cakes. But $50,000 of those sales were to cafés that have not paid yet. It bought $10,000 of extra flour that is still on the shelf, and it has $20,000 of unpaid supplier bills. It also bought an oven that loses value over time. How well did it do? That depends on which statement you look at.</p></aside>

<h2>Statement 1: the income statement (performance over a period)</h2>
<p>Revenue minus expenses equals net income. It uses <b>accrual</b> accounting: a sale counts when it is earned, and an expense when it is incurred, regardless of when cash moves.</p>
<table class="steps"><tr><td>Sales</td><td>$500,000</td></tr><tr><td>Ingredients (cost of goods sold)</td><td>−$200,000</td></tr><tr><td>Wages</td><td>−$150,000</td></tr><tr><td>Rent</td><td>−$40,000</td></tr><tr><td>Depreciation on the oven</td><td>−$20,000</td></tr><tr><td>Operating profit (EBIT)</td><td>$90,000</td></tr><tr><td>Interest on the bank loan</td><td>−$10,000</td></tr><tr><td>Tax at 25% on $80,000</td><td>−$20,000</td></tr><tr class="tot"><td>Net income</td><td>$60,000</td></tr></table>

<h2>Statement 2: the balance sheet (a snapshot on one date)</h2>
<div class="fx"><div class="formula">Assets = Liabilities + Equity</div><div class="fx-body">
<p><b class="lab">In plain English</b>Everything the company owns was paid for either by borrowing (liabilities) or by owners' money (equity). The two sides always balance, which is why it is called a balance sheet.</p>
<dl class="syms"><dt>Assets</dt><dd>what the firm owns: cash, receivables, inventory, equipment</dd><dt>Liabilities</dt><dd>what it owes: payables, loans, bonds</dd><dt>Equity</dt><dd>what is left for owners: assets minus liabilities</dd></dl>
<p class="ex"><b class="lab">Worked example</b>Assets of $500m funded by $300m of debt and payables plus <b>$200m</b> of equity. Equity = 500 − 300 = 200.</p></div></div>
<p>Sunny Bakery on 31 December:</p>
<table class="steps"><tr><td>Cash</td><td>$40,000</td></tr><tr><td>Receivables (cafés owe us)</td><td>$50,000</td></tr><tr><td>Inventory (flour)</td><td>$10,000</td></tr><tr><td>Oven and equipment (after depreciation)</td><td>$100,000</td></tr><tr class="tot"><td>Total assets</td><td>$200,000</td></tr><tr><td>Supplier bills unpaid (payables)</td><td>$20,000</td></tr><tr><td>Bank loan</td><td>$80,000</td></tr><tr><td>Owners' money put in</td><td>$40,000</td></tr><tr><td>Retained earnings (profit kept in the business)</td><td>$60,000</td></tr><tr class="tot"><td>Liabilities + equity</td><td>$200,000</td></tr></table>
<p>Both sides equal $200,000. (We skip the opening figures to keep the example short.)</p>

<h2>Statement 3: the cash flow statement (where cash came from and went)</h2>
<p>It splits cash movements into <b>operating</b> (CFO: the day-to-day business), <b>investing</b> (CFI: buying equipment, acquisitions) and <b>financing</b> (CFF: loans, share issues, dividends).</p>
<p>The income statement says Sunny earned $60,000. But how much <em>cash</em> did the business itself generate? The indirect method starts from profit and adjusts:</p>
<div class="fx"><div class="formula">CFO = Net income + Depreciation − Increase in receivables − Increase in inventory + Increase in payables</div><div class="fx-body">
<p><b class="lab">In plain English</b>Start with profit. Add back expenses that did not use cash (depreciation). Subtract cash that is <em>tied up</em> in things the firm has built up (customers who have not paid, inventory on shelves), and add cash the firm is <em>holding on to</em> (bills it has not paid yet).</p>
<dl class="syms"><dt>CFO</dt><dd>cash flow from operations</dd><dt>Depreciation</dt><dd>non-cash charge for wear on equipment</dd><dt>Increase in receivables</dt><dd>sales booked but not yet collected in cash (reduces CFO)</dd></dl>
<p class="ex"><b class="lab">Worked example (the widget's numbers)</b>Net income $187.5m + depreciation $100m − increase in receivables $150m = <b>CFO $137.5m</b>. Profit was $187.5m, but only $137.5m arrived as cash.</p>
<p class="hook"><b class="lab">Remember it as</b>"Profit, plus non-cash charges, minus cash that got stuck in the business."</p></div></div>
<div class="example"><b class="lab">Example</b><p>Sunny Bakery: net income $60,000; depreciation $20,000; receivables up $50,000; inventory up $10,000; payables up $20,000. What is operating cash flow?</p>
<b class="lab sol">Solution</b>
<table class="steps"><tr><td>Net income</td><td>$60,000</td></tr><tr><td>+ Depreciation (no cash left)</td><td>+$20,000</td></tr><tr><td>− Receivables up (cafés have not paid)</td><td>−$50,000</td></tr><tr><td>− Inventory up (cash spent on flour)</td><td>−$10,000</td></tr><tr><td>+ Payables up (bills not yet paid)</td><td>+$20,000</td></tr><tr class="tot"><td>Operating cash flow</td><td>$40,000</td></tr></table>
<p>Profit was $60,000, but only $40,000 of real cash came from operating the business. Check the other way: cash collected from customers ($500,000 − $50,000 = $450,000) minus cash paid out for ingredients, wages, rent, interest and tax ($200,000 + $10,000 − $20,000 + $150,000 + $40,000 + $10,000 + $20,000 = $410,000) = $40,000. ✓</p></div>
<details class="pause"><summary>Pause and try: if the cafés paid everything</summary><p>If receivables had not risen at all, CFO would be 60 + 20 − 0 − 10 + 20 = <b>$90,000</b>. The $50,000 of unpaid sales is the whole difference between $40,000 and $90,000.</p></details>

<h2>How the statements link</h2>
<ol>
<li>Net income flows into <b>retained earnings</b> on the balance sheet (less dividends).</li>
<li>The cash flow statement starts from net income and adjusts for non-cash items and changes in working capital.</li>
<li>The ending cash on the cash flow statement equals the cash line on the balance sheet.</li>
</ol>
<div class="fx"><div class="formula">Ending retained earnings = Beginning retained earnings + Net income − Dividends</div><div class="fx-body">
<p><b class="lab">In plain English</b>This is how the income statement feeds the balance sheet: profit that is not paid out stays in the company and adds to equity.</p>
<p class="ex"><b class="lab">Worked example</b>Retained earnings start at $400m; net income is $80m; dividends are $30m. End = 400 + 80 − 30 = <b>$450m</b>.</p></div></div>
<p>Sunny Bakery started with no retained earnings, earned $60,000 and paid no dividends, so it ends with $60,000: exactly the retained earnings on its balance sheet.</p>

<h2>Why profit is not cash</h2>
<p>A firm can report rising profit and still run out of cash: customers may not pay, inventory may pile up, or capex may exceed depreciation. Conversely, a firm can have poor profit but healthy cash flow for a period. Analysts therefore always read the cash flow statement next to the income statement. The gap between them is the firm's <b>accruals</b>, and the subject of the <a href="#/lesson/fsa-quality">earnings quality</a> lesson.</p>
<aside class="callout mistake"><b class="lab">Common mistake</b><p>Assuming "profit" means "money in the bank". Profit is an accounting measure. A business can be profitable on paper and still fail because it cannot pay its bills when they fall due.</p></aside>

<h2>Beyond the numbers</h2>
<p>The notes and management discussion (MD&amp;A) explain <em>accounting policies</em>, debt terms, contingencies and segment data. The auditor's opinion tells you whether the statements are presented fairly, and an <em>unqualified</em> opinion does not mean the company is healthy or the estimates are correct.</p>
`,
  takeaways: [
    'Assets = liabilities + equity; net income feeds retained earnings.',
    'Accrual profit and cash flow differ by working-capital changes, depreciation and other accruals.',
    'A company can be profitable and still short of cash.',
    'Read all three statements and the notes together.'
  ],
  quiz: [
    { k: 'calc', gen: () => { const A = pick([300, 400, 500, 750, 900]), L = pick([100, 150, 200, 300]); const ans = A - L; return N({ q: `A company has total assets of $${A}m and total liabilities of $${L}m. What is its equity?`, ans, wrong: [A + L, L - A, A / L], fmt: x => '$' + num(x, 0) + 'm', alt: () => { let e = 0; while (e + L < A) e += 1; return e; }, tol: 1e-9, fixed: true, why: `Assets = liabilities + equity, so equity = ${A} − ${L} = $${ans}m.` }); } },
    { k: 'calc', gen: () => { const S = pick([400, 500, 600]) * 1000, C = pick([150, 200, 250]) * 1000, op = pick([120, 150, 180]) * 1000, dep = pick([10, 20, 30]) * 1000, tax = pick([10, 15, 20]) * 1000; const dAR = pick([20, 30, 50]) * 1000, dInv = pick([0, 10, 20]) * 1000, dAP = pick([0, 10, 20]) * 1000; const NI = S - C - op - dep - tax; const ans = NI + dep - dAR - dInv + dAP; return N({ q: `A company reports net income of ${usd(NI, 0)} and depreciation of ${usd(dep, 0)}. During the year receivables rose ${usd(dAR, 0)}, inventory rose ${usd(dInv, 0)} and payables rose ${usd(dAP, 0)}. What is its operating cash flow?`, ans, wrong: [NI, NI + dep, NI + dep + dAR + dInv - dAP], fmt: x => usd(x, 0), alt: () => (S - dAR) - (C + dInv - dAP) - op - tax, tol: 1e-6, fixed: true, why: `Indirect method: ${usd(NI, 0)} + ${usd(dep, 0)} − ${usd(dAR, 0)} − ${usd(dInv, 0)} + ${usd(dAP, 0)} = ${usd(ans, 0)}. Depreciation is added back (no cash left); rising receivables and inventory tie cash up; rising payables mean cash was kept.` }); } },
    { k: 'calc', gen: () => { const b = pick([200, 400, 500]), ni = pick([40, 60, 80, 120]), d = pick([0, 10, 30, 50]); const ans = b + ni - d; return N({ q: `Retained earnings start the year at $${b}m. The company earns $${ni}m and pays dividends of $${d}m. What are retained earnings at the end?`, ans, wrong: [b + ni, b + ni + d, b - ni + d], fmt: x => '$' + num(x, 0) + 'm', alt: () => (b + ni) - d, tol: 1e-9, fixed: true, why: `End = beginning + net income − dividends = ${b} + ${ni} − ${d} = $${ans}m. Profit that is not paid out stays in the business.` }); } },
    { k: 'concept', q: 'Which statement is a snapshot at a point in time?', o: ['Balance sheet', 'Income statement', 'Cash flow statement', 'Statement of retained earnings only'], a: 0, why: 'The balance sheet shows financial position on a date; the others cover a period.' },
    { k: 'concept', q: 'Receivables rise sharply while sales are flat. What is the effect on operating cash flow relative to net income?', o: ['CFO is lower', 'CFO is higher', 'No effect', 'CFO equals net income'], a: 0, why: 'Higher receivables mean revenue was booked but cash not yet collected.' },
    { k: 'concept', q: 'Which is a non-cash expense added back in the indirect method?', o: ['Depreciation', 'Wages', 'Interest paid', 'Tax paid'], a: 0, why: 'Depreciation reduces net income but no cash leaves in that period.' },
    { k: 'apply', q: 'A bakery reports a good profit but is struggling to pay its suppliers. What is the most likely explanation?', o: ['Customers owe it a lot of money that has not yet been collected', 'Profit is negative', 'The balance sheet does not balance', 'Depreciation is too small'], a: 0, why: 'Profit counts sales when earned, not when collected. Unpaid receivables tie up cash.' },
    { k: 'concept', q: 'Which of these is a liability?', o: ['A bank loan the company owes', 'Cash in the bank', 'Inventory', 'Money customers owe the company'], a: 0, why: 'Liabilities are what the company owes. The others are assets.' }
  ],
  related: ['fsa-ratios', 'fsa-quality', 'fsa-fcf']
},

{
  id: 'fsa-ratios', type: 'concept', title: 'Ratio analysis: profitability, liquidity, leverage and efficiency',
  blurb: 'Turn raw statements into comparable numbers, then learn what each ratio can and cannot tell you.',
  level: 'Foundations', min: 22, tags: ['ratios'], widget: 'ratios',
  los: [
    'Explain why analysts use ratios instead of raw statement numbers.',
    'Calculate margins, ROA and ROE, and interpret them.',
    'Calculate the current ratio, quick ratio, debt-to-equity and interest coverage.',
    'Calculate inventory turnover, days of inventory and asset turnover.',
    'Use trends and peer comparisons, and recognize the limits of ratios.'
  ],
  terms: [
    ['Ratio', 'one statement number divided by another'],
    ['Margin', 'a profit measure divided by sales'],
    ['ROA / ROE', 'net income divided by total assets / by equity'],
    ['Current assets / liabilities', 'assets that turn into cash within a year / bills due within a year'],
    ['EBIT', 'earnings before interest and taxes (operating profit)'],
    ['Turnover', 'how many times per year an asset is "used up" and replaced, measured against sales or cost of goods sold']
  ],
  body: `
<p>Ratios scale one statement number by another so firms of different sizes, and the same firm across years, can be compared. A $2m profit is great for a corner shop and dreadful for a giant. A ratio such as profit divided by sales removes the size. Ratios do not answer questions by themselves; they tell you <em>where to look</em>.</p>

<h2>Four families</h2>
<p>Every ratio is "one number divided by another". The examples below all use the same sample company (the widget's starting numbers): sales $1,000m, cost of goods sold (COGS) $600m, operating expenses $250m, interest $24m, net income $94.5m, total assets $1,200m, equity $550m, debt $400m, current assets $370m (of which cash $100m, receivables $120m, inventory $150m), current liabilities $250m.</p>
<dl class="defs">
<dt>Profitability: how much is earned?</dt>
<dd><b>Gross margin</b> = (sales − COGS) ÷ sales = 400 ÷ 1,000 = <b>40%</b>. <b>Operating margin</b> = EBIT ÷ sales = 150 ÷ 1,000 = <b>15%</b>. <b>ROA</b> = net income ÷ assets = 94.5 ÷ 1,200 = <b>7.9%</b>. <b>ROE</b> = net income ÷ equity = 94.5 ÷ 550 = <b>17.2%</b>. (EBIT = earnings before interest and taxes.)</dd>
<dt>Liquidity: can it pay this year's bills?</dt>
<dd><b>Current ratio</b> = current assets ÷ current liabilities = 370 ÷ 250 = <b>1.48</b>. <b>Quick ratio</b> = (cash + receivables) ÷ current liabilities = 220 ÷ 250 = <b>0.88</b> (leaves out inventory, which is slow to turn into cash). Below 1 is not automatically bad, but it means you should ask how bills will be paid.</dd>
<dt>Leverage: how much is borrowed?</dt>
<dd><b>Debt-to-equity</b> = 400 ÷ 550 = <b>0.73</b>. <b>Interest coverage</b> = EBIT ÷ interest = 150 ÷ 24 = <b>6.3×</b>: operating profit covers the interest bill six times over.</dd>
<dt>Efficiency: how hard are assets working?</dt>
<dd><b>Inventory turnover</b> = COGS ÷ inventory = 600 ÷ 150 = <b>4.0×</b> a year, so <b>days inventory</b> = 365 ÷ 4 = <b>91 days</b> of stock on hand. <b>Asset turnover</b> = sales ÷ assets = 1,000 ÷ 1,200 = <b>0.83×</b>.</dd>
</dl>
<aside class="callout"><b>Remember it as</b> "profit ÷ something": margins divide by sales, ROA by assets, ROE by equity. Liquidity compares what is due soon to what can be paid soon. Coverage compares profit to the interest bill. Turnover asks how many times an asset is "used up" per year.</aside>
<details class="pause"><summary>Pause and try: read this company's story</summary><p>A 40% gross margin but only a 15% operating margin means operating costs eat 25 points of sales. A quick ratio below 1 (0.88) means it could not pay all its bills from cash and receivables alone, so it leans on selling inventory or on credit. Coverage of 6.3× means interest is not a worry.</p></details>

<h2>Using them well</h2>
<ol>
<li><b>Trend:</b> a ratio's direction over 5+ years says more than one value.</li>
<li><b>Peers:</b> compare with firms in the same industry: normal current ratios or margins differ hugely across sectors.</li>
<li><b>Decompose:</b> break big-picture ratios (ROE) into parts, as in the <a href="#/lesson/fsa-dupont">DuPont</a> lesson.</li>
<li><b>Check consistency:</b> if inventory turnover is deteriorating while margins hold, ask why.</li>
</ol>
<aside class="callout mistake"><b class="lab">Common mistake</b><p>Judging a ratio in isolation ("a current ratio of 1.5 is good"). "Good" depends on the industry and the trend. A supermarket lives happily on a low current ratio; a shipbuilder does not.</p></aside>

<h2>Limitations</h2>
<ul>
<li>Ratios inherit the accounting choices behind the numbers (see <a href="#/lesson/fsa-choices">accounting choices</a>).</li>
<li>Year-end balance sheets can be unrepresentative (seasonality, window dressing); average balances are often better.</li>
<li>One-off items distort profitability ratios; adjust for them with care and consistency.</li>
<li>A single ratio can improve for bad reasons: cutting inventory investment raises turnover but may cause stock-outs.</li>
</ul>
`,
  takeaways: [
    'Ratios come in four families: profitability, liquidity, leverage, efficiency.',
    'Compare to trend and to peers, and decompose big ratios into their drivers.',
    'Ratios are only as reliable as the accounting behind them.'
  ],
  quiz: [
    { k: 'calc', gen: () => { const S = pick([800, 1000, 1500, 2000]), C = round(S * pick([0.5, 0.6, 0.65, 0.7]), 0); const ans = (S - C) / S * 100; return N({ q: `A company has sales of $${S}m and cost of goods sold of $${C}m. What is its gross margin?`, ans, wrong: [C / S * 100, (S - C), (S - C) / C * 100], fmt: x => pct(x, 1), alt: () => 100 - C / S * 100, tol: 1e-9, fixed: true, why: `Gross margin = (sales − COGS) ÷ sales = (${S} − ${C}) ÷ ${S} = ${pct(ans, 1)}. Dividing by COGS instead gives a mark-up, not a margin.` }); } },
    { k: 'calc', gen: () => { const CA = pick([300, 400, 500]), CL = pick([200, 250, 300]); const ans = CA / CL; return N({ q: `A firm has current assets of $${CA}m and current liabilities of $${CL}m. What is its current ratio?`, ans, wrong: [CL / CA, CA - CL, CA / (CA + CL)], fmt: x => num(x, 2), alt: () => 1 / (CL / CA), tol: 1e-9, fixed: true, why: `Current ratio = current assets ÷ current liabilities = ${CA} ÷ ${CL} = ${num(ans, 2)}. Above 1 means assets due to turn into cash within a year exceed bills due within a year.` }); } },
    { k: 'calc', gen: () => { const cash = pick([50, 100]), rec = pick([80, 120, 150]), inv = pick([100, 150, 200]), CL = pick([200, 250, 300]); const ans = (cash + rec) / CL; return N({ q: `A firm has cash $${cash}m, receivables $${rec}m, inventory $${inv}m and current liabilities $${CL}m. What is its quick ratio?`, ans, wrong: [(cash + rec + inv) / CL, cash / CL, (rec + inv) / CL], fmt: x => num(x, 2), alt: () => (cash + rec + inv - inv) / CL, tol: 1e-9, fixed: true, why: `Quick ratio leaves out inventory: (${cash} + ${rec}) ÷ ${CL} = ${num(ans, 2)}. Including inventory would give the (higher) current ratio ${num((cash + rec + inv) / CL, 2)}.` }); } },
    { k: 'calc', gen: () => { const ebit = pick([120, 150, 180, 240]), i = pick([20, 24, 30, 60]); const ans = ebit / i; return N({ q: `A firm's EBIT is $${ebit}m and its interest expense is $${i}m. What is its interest coverage?`, ans, wrong: [i / ebit, ebit - i, (ebit - i) / i * 2], fmt: x => num(x, 1) + '×', alt: () => 1 / (i / ebit), tol: 1e-9, fixed: true, why: `Coverage = EBIT ÷ interest = ${ebit} ÷ ${i} = ${num(ans, 1)}×. Operating profit covers the interest bill ${num(ans, 1)} times over.` }); } },
    { k: 'calc', gen: () => { const C = pick([400, 600, 900]), inv = pick([50, 100, 150, 200]); const ans = 365 / (C / inv); return N({ q: `A firm has cost of goods sold of $${C}m and average inventory of $${inv}m. Roughly how many days of inventory does it hold?`, ans, wrong: [C / inv, inv / C * 365 * 2, 365 * C / inv / 10], fmt: x => num(x, 0) + ' days', alt: () => inv / C * 365, tol: 1e-9, fixed: true, why: `Turnover = COGS ÷ inventory = ${C} ÷ ${inv} = ${num(C / inv, 1)} times a year. Days = 365 ÷ ${num(C / inv, 1)} = ${num(ans, 0)} days.` }); } },
    { k: 'concept', q: 'Which ratio excludes inventory because it can be slow to convert to cash?', o: ['Quick ratio', 'Current ratio', 'Asset turnover', 'Interest coverage'], a: 0, why: 'The quick (acid-test) ratio uses only the most liquid current assets.' },
    { k: 'concept', q: 'Why compare ratios against industry peers?', o: ['Normal levels differ widely between industries', 'Regulators require it', 'Peers always have better ratios', 'Ratios have no meaning otherwise'], a: 0, why: 'A grocer and a software firm have very different margins, turnover and leverage by design.' },
    { k: 'apply', q: 'A firm\'s inventory turnover has fallen from 6× to 4× while margins are steady. What is a sensible first question?', o: ['Is unsold stock building up, and why?', 'Are taxes lower?', 'Is the CEO new?', 'Nothing: turnover does not matter'], a: 0, why: 'Slower turnover means stock is sitting longer, which can signal weak demand or over-buying.' },
    { k: 'apply', q: 'Company A has a quick ratio of 0.5 and Company B has 1.6. Both are in the same industry. What do you conclude?', o: ['A may struggle to pay near-term bills from liquid assets; worth investigating', 'A is safer', 'They are identical', 'B has too much debt'], a: 0, why: 'A low quick ratio versus peers suggests thinner liquidity, though the full picture needs more information.' }
  ],
  related: ['fsa-dupont', 'fsa-statements', 'fsa-credit']
},

{
  id: 'fsa-dupont', type: 'concept', title: 'DuPont analysis: what drives return on equity',
  blurb: 'Split ROE into margin, turnover and leverage to see how a firm earns its returns, and how risky they are.',
  level: 'Intermediate', min: 16, tags: ['ROE', 'DuPont'], widget: 'dupont',
  los: [
    'Explain what ROE measures and why the same ROE can hide very different businesses.',
    'Split ROE into net margin, asset turnover and the equity multiplier, and calculate each.',
    'Tell whether a rise in ROE came from better business performance or just more leverage.',
    'Calculate a firm\'s sustainable growth rate.'
  ],
  terms: [
    ['ROE', 'net income divided by equity: the return on the owners\' money'],
    ['Net margin', 'net income divided by sales'],
    ['Asset turnover', 'sales divided by total assets'],
    ['Equity multiplier', 'total assets divided by equity; a measure of leverage'],
    ['Retention ratio', 'the share of profit kept in the business (1 minus the payout ratio)'],
    ['Sustainable growth rate', 'the growth a firm can fund from its own profits without new equity or extra leverage']
  ],
  body: `
<p>Return on equity is the headline profitability figure for shareholders, but the same ROE can come from very different businesses. <b>DuPont analysis</b> splits it into three parts, so you can see <em>how</em> the return is earned.</p>

<aside class="callout story"><b class="lab">Picture this</b>
<p>A supermarket and a jeweller both earn an ROE of 15%. The supermarket makes a tiny profit on each sale but sells huge volumes with the same shop. The jeweller sells rarely but makes a large profit on each sale. Same result, opposite strategies. DuPont shows the difference.</p></aside>

<div class="fx"><div class="formula">ROE = (Net income ÷ Sales) × (Sales ÷ Assets) × (Assets ÷ Equity)</div><div class="fx-body">
<p><b class="lab">In plain English</b>Multiply three ratios in a chain. "Sales" cancels top and bottom, and "Assets" cancels top and bottom, leaving Net income ÷ Equity, which is ROE. The trick is that each piece tells a different story: <b>profit per dollar of sales</b> (net margin), <b>sales per dollar of assets</b> (asset turnover), and <b>assets per dollar of owners' money</b> (equity multiplier, i.e. leverage).</p>
<dl class="syms"><dt>Net margin</dt><dd>net income ÷ sales</dd><dt>Asset turnover</dt><dd>sales ÷ total assets</dd><dt>Equity multiplier</dt><dd>total assets ÷ equity (2 means half the assets are funded by debt)</dd></dl>
<p class="ex"><b class="lab">Worked example</b>Margin 8%, turnover 1.2×, equity multiplier 2×: ROE = 0.08 × 1.2 × 2 = <b>19.2%</b>. The first two multiply to ROA = 9.6%; leverage doubles it.</p>
<p class="hook"><b class="lab">Remember it as</b>"Profit per sale × sales per asset × assets per owner-dollar."</p></div></div>
<ul>
<li><b>Net margin</b>: how much profit each dollar of sales yields (pricing power, cost control).</li>
<li><b>Asset turnover</b>: how much sales each dollar of assets generates (efficiency, capital intensity).</li>
<li><b>Equity multiplier</b>: financial leverage.</li>
</ul>
<p>The first two multiply to <b>ROA</b>, the return on the operating business before the financing decision. The third scales ROA up (or down) according to how much of the balance sheet is funded by debt.</p>
<details class="pause"><summary>Pause and try: two businesses, same ROA</summary><p>Firm A: margin 2%, turnover 4× → ROA = 8%. Firm B: margin 20%, turnover 0.4× → ROA = 8%. Same ROA, and with the same leverage the same ROE. A is a volume business; B is a high-margin, slow-turning business.</p></details>

<h2>Reading the decomposition</h2>
<ul>
<li>Grocers earn thin margins but turn assets quickly; luxury brands earn large margins and turn assets slowly. Similar ROA, different paths and different strategic risks.</li>
<li>If ROE rises because the <em>equity multiplier</em> rose, the business is not better, just more leveraged. ROE rises with leverage only if ROA exceeds the after-tax cost of debt, and the extra risk is real (see <a href="#/lesson/capstruct">capital structure</a>).</li>
<li>The <b>extended DuPont</b> further splits margin into tax burden, interest burden and operating margin, isolating tax and interest effects.</li>
</ul>
<aside class="callout mistake"><b class="lab">Common mistake</b><p>Celebrating a rising ROE without asking why. If margin and turnover are unchanged and ROE jumped, the company simply borrowed more, which raises risk as well as return.</p></aside>

<h2>Growth link</h2>
<p>A firm's <b>sustainable growth rate</b> is the growth it can fund without issuing new equity or changing its leverage. It connects statement analysis to the growth term in valuation (<a href="#/lesson/fsa-multiples">multiples</a>).</p>
<div class="fx"><div class="formula">g = ROE × b &nbsp;&nbsp; (b = retention ratio = 1 − payout ratio)</div><div class="fx-body">
<p><b class="lab">In plain English</b>The profit a firm keeps (<i>b</i> of it) is reinvested and earns ROE, so equity grows at ROE × <i>b</i>.</p>
<p class="ex"><b class="lab">Worked example</b>ROE 15%, and the firm pays out 40% of profit as dividends, so it retains 60%. g = 0.15 × 0.60 = <b>9%</b> a year.</p></div></div>
`,
  takeaways: [
    'ROE = margin × asset turnover × leverage.',
    'Leverage lifts ROE but also its downside; check what actually drove a change.',
    'Sustainable growth ≈ ROE × retention ratio.'
  ],
  quiz: [
    { k: 'calc', gen: () => { const m = pick([4, 5, 8, 10]), t = pick([0.8, 1.0, 1.2, 1.5, 2.0]), e = pick([1.5, 2, 2.5, 3]); const ans = m * t * e; return N({ q: `A firm has a net margin of ${m}%, asset turnover of ${t}× and an equity multiplier of ${e}×. What is its ROE?`, ans, wrong: [m * t, m + t + e, m * t / e], fmt: x => pct(x, 2), alt: () => { const S = 1000, NI = S * m / 100, A = S / t, E = A / e; return NI / E * 100; }, tol: 1e-9, fixed: true, why: `ROE = margin × turnover × multiplier = ${m}% × ${t} × ${e} = ${round(ans, 2)}%. The first two give ROA (${round(m * t, 2)}%); leverage scales it by ${e}.` }); } },
    { k: 'calc', gen: () => { const roe = pick([10, 12, 15, 20]), pay = pick([20, 30, 40, 60]); const ans = roe * (100 - pay) / 100; return N({ q: `A firm earns an ROE of ${roe}% and pays out ${pay}% of its profit as dividends. What is its sustainable growth rate?`, ans, wrong: [roe * pay / 100, roe, roe - pay], fmt: x => pct(x, 2), alt: () => roe / 100 * (1 - pay / 100) * 100, tol: 1e-9, fixed: true, why: `Retention = 1 − ${pay / 100} = ${round(1 - pay / 100, 2)}. g = ROE × retention = ${roe}% × ${round(1 - pay / 100, 2)} = ${round(ans, 2)}%. Multiplying by the payout ratio instead would count the profit that leaves the firm.` }); } },
    { k: 'calc', gen: () => { const m = pick([3, 5, 8]), t = pick([1.0, 1.5, 2.0, 2.5]); const ans = m * t; return N({ q: `A firm has a net margin of ${m}% and asset turnover of ${t}×. What is its return on assets (ROA)?`, ans, wrong: [m + t, m / t, m * t * 2], fmt: x => pct(x, 2), alt: () => { const S = 200, NI = S * m / 100, A = S / t; return NI / A * 100; }, tol: 1e-9, fixed: true, why: `ROA = margin × turnover = ${m}% × ${t} = ${round(ans, 2)}%. That is the return of the operating business before the effect of borrowing.` }); } },
    { k: 'concept', q: 'ROE equals...', o: ['Margin × turnover × equity multiplier', 'Margin + turnover + leverage', 'Assets ÷ sales', 'Net income ÷ assets'], a: 0, why: 'The three terms multiply and the sales and assets terms cancel.' },
    { k: 'concept', q: 'Firm A: 2% margin, 4× turnover. Firm B: 20% margin, 0.4× turnover. Same leverage. Compare their ROE.', o: ['They are equal', 'A is higher', 'B is higher', 'Cannot tell'], a: 0, why: 'Both have ROA = 8%, and identical leverage gives identical ROE.' },
    { k: 'apply', q: 'A firm\'s ROE jumped but margin and turnover are unchanged. The likeliest explanation?', o: ['Higher leverage', 'Lower taxes on equity', 'Higher sales only', 'Lower depreciation'], a: 0, why: 'With the first two factors unchanged, the equity multiplier must have moved.' },
    { k: 'apply', q: 'A supermarket and a jeweller have the same ROE. What does DuPont analysis let you see?', o: ['They may get there by opposite routes: thin margin and fast turnover versus fat margin and slow turnover', 'They have the same strategy', 'Only the supermarket is profitable', 'Neither uses assets'], a: 0, why: 'The three-part split reveals the business model behind the same headline number.' }
  ],
  related: ['fsa-ratios', 'capstruct', 'fsa-multiples']
},

{
  id: 'fsa-choices', type: 'concept', title: 'Accounting choices: FIFO vs LIFO, depreciation and estimates',
  blurb: 'The same business can report different profits depending on accounting policy. Learn to see through it.',
  level: 'Intermediate', min: 18, tags: ['accounting', 'FIFO', 'LIFO'], widget: 'choices',
  los: [
    'Explain why two identical businesses can report different profits.',
    'Calculate cost of goods sold and gross profit under FIFO and LIFO when costs are rising.',
    'Calculate straight-line depreciation and see how longer lives raise profit.',
    'Describe other areas of discretion: revenue recognition, capitalizing costs and estimates.',
    'List warning signs that choices may be aggressive.'
  ],
  terms: [
    ['GAAP / IFRS', 'the two main sets of accounting rules (US / most of the rest of the world)'],
    ['Inventory', 'goods held for sale'],
    ['FIFO / LIFO', 'first in, first out / last in, first out: rules for which unit costs count as sold'],
    ['Straight-line depreciation', 'spreading (cost − salvage value) equally over the asset\'s life'],
    ['Capitalize vs expense', 'record a cost as an asset to spread over time, vs deduct it fully now'],
    ['LIFO reserve', 'a disclosed figure that lets analysts convert LIFO numbers to FIFO']
  ],
  body: `
<p>Accounting standards (US GAAP, IFRS) leave managers real discretion. Two identical firms can report different profits, assets and ratios purely from policy choices. An analyst's job is to know where the discretion sits and to adjust for it when comparing companies.</p>

<h2>Inventory: FIFO, LIFO, average cost</h2>
<aside class="callout story"><b class="lab">Picture this</b>
<p>A shop buys tins of paint. Early in the year they cost $10 each; later the price rises to $11. You sell some tins. Which tins did you sell, the cheap ones or the dear ones? The tins are identical, so the accountant just has to <em>choose</em>. The choice changes the profit.</p></aside>
<p>When unit costs change during the year, which costs go to <b>cost of goods sold</b> and which stay in <b>inventory</b>?</p>
<ul>
<li><b>FIFO</b> (first in, first out): oldest costs expensed first; ending inventory carries recent costs.</li>
<li><b>LIFO</b> (last in, first out): newest costs expensed first; ending inventory carries old costs.</li>
<li><b>Weighted average</b>: in between.</li>
</ul>
<p>In a period of <b>rising costs</b>, LIFO reports higher COGS, lower profit, and lower inventory than FIFO, but also <em>lower taxes</em> in jurisdictions where LIFO is allowed for tax purposes (the US). That tax saving is the only real cash difference. IFRS prohibits LIFO. US firms using LIFO disclose a <b>LIFO reserve</b> so analysts can convert to FIFO.</p>
<div class="fx"><div class="formula">COGS = Beginning inventory + Purchases − Ending inventory</div><div class="fx-body">
<p><b class="lab">In plain English</b>The goods the firm had available (what it started with plus what it bought), minus what is still on the shelf at year-end, must be what it sold. FIFO and LIFO differ only in <em>which unit costs</em> they treat as sold and which as left over.</p>
<p class="ex"><b class="lab">Worked example</b>Start with 100 units at $10. Buy 100 more at $11 (costs have risen 10%). Sell 120 units at $22 each = $2,640 of sales. <b>FIFO</b> sells the old units first: COGS = 100 × $10 + 20 × $11 = $1,220, gross profit <b>$1,420</b>. <b>LIFO</b> sells the newest first: COGS = 100 × $11 + 20 × $10 = $1,300, gross profit <b>$1,340</b>. Same business, $80 different profit. At a 25% tax rate LIFO saves $20 of tax.</p>
<p class="hook"><b class="lab">Remember it as</b>"FIFO expenses the oldest costs; LIFO expenses the newest. When costs are rising, LIFO shows less profit."</p></div></div>
<details class="pause"><summary>Pause and try: what if costs were falling?</summary><p>The reverse. If units cost $11 first and $10 later, FIFO expenses the dearer $11 units first (higher COGS, lower profit) and LIFO expenses the cheaper $10 ones. So whichever method shows lower profit depends on which way costs are moving.</p></details>

<h2>Depreciation</h2>
<p>Equipment wears out, so its cost is spread over its useful life as <b>depreciation</b>. With straight-line depreciation: yearly charge = (cost − salvage value) ÷ useful life.</p>
<div class="example"><b class="lab">Example</b><p>An oven costs $100,000 and is expected to be worth $10,000 at the end of its life. What is the yearly depreciation over 5 years? Over 10 years?</p>
<b class="lab sol">Solution</b><p>(100,000 − 10,000) ÷ 5 = <b>$18,000</b> a year. Over 10 years: 90,000 ÷ 10 = <b>$9,000</b> a year. A longer assumed life lowers the yearly expense and therefore <em>raises reported profit</em> by $9,000 a year, with no change in the real business.</p></div>

<h2>Other important choices and estimates</h2>
<ul>
<li><b>Revenue recognition:</b> when to count sales, especially for long-term contracts, subscriptions and bundles.</li>
<li><b>Capitalize vs expense:</b> costs put on the balance sheet (capitalized) boost current profit; costs expensed immediately reduce it. Development costs, software and interest are common examples.</li>
<li><b>Estimates:</b> allowance for bad debts, warranty reserves, pension assumptions, impairment.</li>
</ul>

<h2>Discretion vs manipulation</h2>
<p>Most choices are legitimate. Problems arise when choices systematically flatter results, and especially when they change without a good reason. Watch for: policy or estimate changes, rising receivables or inventory relative to sales, shrinking reserves, and gaps between earnings and operating cash flow.</p>
<aside class="callout mistake"><b class="lab">Common mistake</b><p>Concluding that a company with higher profit is better. The higher number may come only from a more flattering policy. Compare companies after adjusting for accounting differences, or focus on cash flow, which is harder to flatter.</p></aside>
`,
  takeaways: [
    'Policy choices change reported profit and balance-sheet values, not the underlying economics.',
    'In rising-cost periods LIFO gives lower profit and tax than FIFO; IFRS bans LIFO.',
    'Longer depreciation lives raise reported profit without changing cash.',
    'Look for unexplained changes in policies and estimates.'
  ],
  quiz: [
    { k: 'calc', gen: () => { const u0 = pick([100, 200]), p0 = pick([10, 12, 20]), u1 = pick([100, 200]), p1 = p0 + pick([1, 2, 3]), s = pick([120, 150, 180, 250]).valueOf(); const sold = Math.min(s, u0 + u1); const method = pick(['FIFO', 'LIFO']); const cogsFIFO = () => { let left = sold, c = 0; for (const [u, p] of [[u0, p0], [u1, p1]]) { const t = Math.min(left, u); c += t * p; left -= t; } return c; }; const cogsLIFO = () => { let left = sold, c = 0; for (const [u, p] of [[u1, p1], [u0, p0]]) { const t = Math.min(left, u); c += t * p; left -= t; } return c; }; const ans = method === 'FIFO' ? cogsFIFO() : cogsLIFO(); const other = method === 'FIFO' ? cogsLIFO() : cogsFIFO(); return N({ q: `A firm starts with ${u0} units at $${p0} and buys ${u1} more at $${p1}. It sells ${sold} units. What is cost of goods sold under ${method}?`, ans, wrong: [other, sold * (p0 + p1) / 2, sold * p1 + 100], fmt: x => usd(x, 0), alt: () => { const layers = method === 'FIFO' ? [[u0, p0], [u1, p1]] : [[u1, p1], [u0, p0]]; let need = sold, tot = 0; for (const [u, p] of layers) { const t = Math.min(need, u); tot += t * p; need -= t; if (!need) break; } return tot; }, tol: 1e-9, fixed: true, why: `${method} expenses the ${method === 'FIFO' ? 'oldest' : 'newest'} costs first. ${method === 'FIFO' ? `First ${Math.min(sold, u0)} units at $${p0}, then the rest at $${p1}` : `First ${Math.min(sold, u1)} units at $${p1}, then the rest at $${p0}`} gives ${usd(ans, 0)}. The other method gives ${usd(other, 0)}; costs are rising, so LIFO shows the higher COGS and lower profit.` }); } },
    { k: 'calc', gen: () => { const cost = pick([60000, 100000, 150000, 200000]), salv = pick([0, 10000, 20000]), life = pick([4, 5, 8, 10]); const ans = (cost - salv) / life; return N({ q: `A machine costs ${usd(cost, 0)}, has an expected salvage value of ${usd(salv, 0)} and a useful life of ${life} years. What is the yearly straight-line depreciation?`, ans, wrong: [cost / life, (cost - salv), (cost + salv) / life], fmt: x => usd(x, 0), alt: () => { let book = cost, n = 0, d = (cost - salv) / life; while (n < life) { book -= d; n++; } return (cost - book - salv) === 0 ? d : d; }, tol: 1e-6, fixed: true, why: `(cost − salvage) ÷ life = (${usd(cost, 0)} − ${usd(salv, 0)}) ÷ ${life} = ${usd(ans, 0)} a year. Salvage value is what the machine is expected to be worth at the end, so only the difference is expensed.` }); } },
    { k: 'concept', q: 'When input costs are rising, which method typically reports the lowest profit?', o: ['LIFO', 'FIFO', 'They are always the same', 'Neither'], a: 0, why: 'LIFO expenses the most recent, higher costs first.' },
    { k: 'concept', q: 'What is the real cash-flow effect of choosing LIFO (where allowed for tax)?', o: ['Lower tax payments in rising-cost periods', 'None', 'Higher sales', 'Lower purchases'], a: 0, why: 'Lower taxable income means lower taxes, the only real economic difference.' },
    { k: 'concept', q: 'Which is a warning sign of aggressive accounting?', o: ['Receivables growing much faster than sales', 'Stable policies', 'High audit fees', 'A declining share price'], a: 0, why: 'It may indicate premature or questionable revenue recognition.' },
    { k: 'apply', q: 'A company extends the assumed life of its equipment from 5 to 10 years. What happens to reported profit and to cash?', o: ['Profit rises; cash is unchanged', 'Profit falls; cash rises', 'Both rise', 'Neither changes'], a: 0, why: 'Depreciation is non-cash. A longer life lowers the yearly charge and lifts reported profit, but no cash moves.' },
    { k: 'apply', q: 'Two identical bakeries use different accounting methods and report different profits. What should an analyst do?', o: ['Adjust for the policy difference, or compare cash flow', 'Buy whichever reports more', 'Ignore both', 'Assume fraud'], a: 0, why: 'Most differences are legitimate policy choices. Adjusting for them, or looking at cash flow, allows a fair comparison.' }
  ],
  related: ['fsa-quality', 'fsa-ratios', 'p-sloan96']
},

{
  id: 'fsa-quality', type: 'concept', title: 'Earnings quality and accruals',
  blurb: 'Not all profit is equally durable. Separating cash earnings from accrual earnings tells you which to trust.',
  level: 'Intermediate', min: 16, tags: ['earnings quality', 'accruals'], widget: 'quality',
  los: [
    'Define earnings quality and say why cash-backed earnings are usually more reliable.',
    'Calculate accruals, the accrual ratio and cash conversion.',
    'Explain why accruals must reverse.',
    'List common red flags and say what they do and do not prove.'
  ],
  terms: [
    ['Earnings quality', 'how well reported profit reflects sustainable, repeatable performance'],
    ['Accruals', 'the difference between net income and operating cash flow'],
    ['Accrual ratio', 'accruals divided by average total assets'],
    ['Cash conversion', 'operating cash flow divided by net income'],
    ['Persistence', 'how likely an amount of profit is to repeat next year']
  ],
  body: `
<p><b>Earnings quality</b> is how well reported earnings reflect the firm's sustainable, repeatable performance. High-quality earnings are persistent, backed by cash, and based on conservative, consistent accounting.</p>

<h2>Cash and accruals</h2>
<aside class="callout story"><b class="lab">Picture this</b>
<p>Two shops each report $100,000 profit. Shop A collected almost all of it in cash. Shop B's profit is mostly "customers promise to pay next quarter". Which profit would you trust more? Shop A's. Shop B's may or may not turn into cash. That difference is what accrual analysis measures.</p></aside>
<div class="fx"><div class="formula">Net income = Operating cash flow + Accruals</div><div class="fx-body">
<p><b class="lab">In plain English</b>Profit is made of two parts: the part that already arrived as cash, and the part that is still just an accounting entry (an accrual): sales not yet collected, costs not yet paid, estimates. Rearranged: <b>Accruals = Net income − Operating cash flow</b>.</p>
<p class="ex"><b class="lab">Worked example</b>Net income $100m, operating cash flow $60m. Accruals = 100 − 60 = <b>$40m</b>: 40% of the reported profit has not turned into cash yet.</p></div></div>
<p><b>Accruals</b> are the accounting adjustments between cash and profit: revenue booked but not collected, expenses deferred, depreciation, reserves. Accruals must reverse eventually: a receivable is either collected or written off. Earnings driven by large positive accruals have to be "paid for" later, which is why they tend to be less persistent than earnings supported by cash.</p>

<h2>Common measures</h2>
<ul>
<li><b>Accrual ratio</b> = (net income − CFO) ÷ average total assets. Dividing by assets makes firms of different sizes comparable. With the example above and average assets of $1,000m: 40 ÷ 1,000 = <b>4%</b>. Sloan (1996) sorted firms on a version of this.</li>
<li><b>Cash conversion</b> = CFO ÷ net income = 60 ÷ 100 = <b>60%</b>. Persistently well below 100% deserves an explanation.</li>
<li><b>Beneish M-score (1999):</b> a statistical model that combines indicators such as receivables growth, margin changes and asset quality to flag possible earnings manipulation.</li>
</ul>
<details class="pause"><summary>Pause and try: a healthy pattern</summary><p>Net income $80m and CFO $95m: accruals = 80 − 95 = <b>−$15m</b>, cash conversion = 95 ÷ 80 = <b>119%</b>. Cash exceeding profit is generally a good sign (though check whether it comes from one-offs such as delaying payments to suppliers).</p></details>

<h2>Red flags</h2>
<ul>
<li>Receivables or inventory growing faster than sales.</li>
<li>Capitalized costs increasing faster than revenue.</li>
<li>Operating cash flow persistently below net income.</li>
<li>Frequent "non-recurring" charges that recur every year.</li>
<li>Changes in auditors, useful lives or revenue policies.</li>
</ul>
<aside class="callout mistake"><b class="lab">Common mistake</b><p>Treating a red flag as proof of fraud. None of these proves manipulation. There is often an innocent explanation (fast growth ties up cash in receivables and inventory). They are questions for further work.</p></aside>
<p>The <a href="#/lesson/p-sloan96">Sloan paper</a> showed that markets seemed to miss the difference between accrual and cash components of earnings, at least in his sample.</p>
`,
  takeaways: [
    'Net income = operating cash flow + accruals; accruals eventually reverse.',
    'High accrual earnings are typically less persistent than cash-backed earnings.',
    'Red flags are prompts for investigation, not proof of manipulation.'
  ],
  quiz: [
    { k: 'calc', gen: () => { const ni = pick([50, 80, 100, 150]), cfo = pick([30, 60, 90, 130]); const ans = ni - cfo; return N({ q: `A company reports net income of $${ni}m and operating cash flow of $${cfo}m. What are its accruals?`, ans, wrong: [cfo - ni, ni + cfo, cfo / ni * 100], fmt: x => '$' + num(x, 0) + 'm', alt: () => -(cfo - ni), tol: 1e-9, fixed: true, why: `Accruals = net income − operating cash flow = ${ni} − ${cfo} = $${ans}m. ${ans > 0 ? 'Positive: some profit is not yet cash.' : 'Negative: cash exceeded reported profit.'}` }); } },
    { k: 'calc', gen: () => { const ni = pick([80, 100, 120]), cfo = pick([40, 60, 80]), a = pick([800, 1000, 1200]); const ans = (ni - cfo) / a * 100; return N({ q: `Net income is $${ni}m, operating cash flow $${cfo}m and average total assets $${a}m. What is the accrual ratio?`, ans, wrong: [(ni - cfo), cfo / ni * 100, (ni - cfo) / ni * 100], fmt: x => pct(x, 2), alt: () => ((ni / a) - (cfo / a)) * 100, tol: 1e-9, fixed: true, why: `Accrual ratio = (${ni} − ${cfo}) ÷ ${a} = ${pct(ans, 2)}. Dividing by assets makes firms of different sizes comparable.` }); } },
    { k: 'calc', gen: () => { const ni = pick([80, 100, 125, 200]), cfo = pick([40, 60, 75, 100]); const ans = cfo / ni * 100; return N({ q: `Net income is $${ni}m and operating cash flow is $${cfo}m. What is the cash conversion (CFO ÷ net income)?`, ans, wrong: [ni / cfo * 100, (ni - cfo) / ni * 100, cfo - ni], fmt: x => pct(x, 1), alt: () => (1 - (ni - cfo) / ni) * 100, tol: 1e-9, fixed: true, why: `Cash conversion = ${cfo} ÷ ${ni} = ${pct(ans, 1)}. Persistently well below 100% deserves an explanation.` }); } },
    { k: 'concept', q: 'Accruals are defined as...', o: ['Net income minus operating cash flow', 'Revenue minus cost of goods sold', 'Cash minus debt', 'Dividends minus earnings'], a: 0, why: 'Accruals are the non-cash part of earnings.' },
    { k: 'concept', q: 'Why would high-accrual earnings tend to be less persistent?', o: ['Accruals must eventually reverse into (or away from) cash', 'They are taxed more', 'They are always fraudulent', 'They include dividends'], a: 0, why: 'Timing differences unwind.' },
    { k: 'apply', q: 'Net income is $100m and CFO is $30m for years in a row. Best interpretation?', o: ['A prompt to investigate receivables, inventory and capitalized costs', 'Perfectly normal', 'Proof of fraud', 'Evidence of cash hoarding'], a: 0, why: 'A persistent gap is a signal to look at where the accruals are building up.' },
    { k: 'apply', q: 'A fast-growing firm has receivables rising quickly. Is that automatically a sign of manipulation?', o: ['No: growth can tie up cash in receivables; it is a question to investigate', 'Yes, always', 'Only if profits fall', 'Only for small firms'], a: 0, why: 'Red flags are prompts for investigation, not proof.' },
    { k: 'concept', q: 'Which statement about the Beneish M-score is correct?', o: ['It combines indicators to flag possible earnings manipulation', 'It measures a company\'s beta', 'It calculates fair value', 'It is a credit rating'], a: 0, why: 'It is a statistical screen built from ratios such as receivables growth and margin changes.' }
  ],
  related: ['fsa-statements', 'p-sloan96', 'fsa-choices']
},

{
  id: 'fsa-fcf', type: 'concept', title: 'Free cash flow and discounted cash flow valuation',
  blurb: 'Turn forecasts into a value: which cash flows to discount, at what rate, and why the terminal value dominates.',
  level: 'Intermediate', min: 22, tags: ['DCF', 'valuation', 'free cash flow'], widget: 'dcf',
  los: [
    'Explain why a company\'s value comes from cash it can distribute, not accounting profit.',
    'Calculate free cash flow to the firm (FCFF).',
    'Describe the steps of a DCF valuation: forecast, terminal value, discount, subtract net debt.',
    'Calculate terminal value, enterprise value and value per share for a simple case.',
    'Explain why terminal value dominates and why small changes in r or g matter.'
  ],
  terms: [
    ['Free cash flow to the firm (FCFF)', 'cash generated by the business that is available to all providers of capital'],
    ['Capex', 'spending on equipment and facilities'],
    ['Working capital', 'money tied up in day-to-day operations: current assets minus current liabilities'],
    ['WACC', 'the blended cost of a firm\'s debt and equity, used as the discount rate'],
    ['Terminal value (TV)', 'the value, at the end of the forecast, of all the cash flows after that point'],
    ['Enterprise value (EV)', 'the value of the whole business to debt and equity holders together'],
    ['Net debt', 'debt minus cash']
  ],
  body: `
<p>Accounting profit is a useful signal, but a firm's <em>value</em> comes from the cash it can distribute to those who fund it. The <b>discounted cash flow (DCF)</b> approach applies the <a href="#/lesson/tvm">time value of money</a> to forecast cash flows.</p>

<h2>Free cash flow to the firm</h2>
<aside class="callout story"><b class="lab">Picture this</b>
<p>You are thinking of buying a small bakery. What do you care about? Not the paper profit, but the cash the bakery will hand you each year <em>after</em> it has bought the new ovens and stock it needs to keep going. That leftover cash is "free" cash flow. The bakery is worth what all those future free cash flows are worth today.</p></aside>
<div class="fx"><div class="formula">FCFF = EBIT × (1 − tax rate) + Depreciation − Capex − Increase in working capital</div><div class="fx-body">
<p><b class="lab">In plain English</b>Start with operating profit after tax, add back depreciation (a non-cash charge), then subtract the cash the firm must put back into the business to keep and grow it: new equipment (capex) and extra working capital (more inventory and receivables). What is left is the cash available to <em>everyone</em> who funds the firm, lenders and owners alike. <b>FCFE</b> is what remains for shareholders after debt payments.</p>
<dl class="syms"><dt>EBIT</dt><dd>earnings before interest and taxes (operating profit)</dd><dt>Capex</dt><dd>capital expenditure: spending on equipment and facilities</dd><dt>Working capital</dt><dd>current assets minus current liabilities</dd></dl>
<p class="ex"><b class="lab">Worked example</b>EBIT $200m, tax rate 25% → after-tax operating profit $150m. Add depreciation $50m, subtract capex $80m and a $10m increase in working capital: FCFF = 150 + 50 − 80 − 10 = <b>$110m</b>.</p>
<p class="hook"><b class="lab">Remember it as</b>"After-tax operating profit, plus non-cash charges, minus reinvestment."</p></div></div>

<h2>Steps</h2>
<ol>
<li><b>Forecast</b> free cash flow for an explicit period (often 5 to 10 years), tied to revenue growth, margins and reinvestment.</li>
<li><b>Terminal value</b> at the end: usually a growing perpetuity, TV = FCF × (1 + g) ÷ (r − g).</li>
<li><b>Discount</b> everything at the <b>WACC</b> (the blended cost of debt and equity; see <a href="#/lesson/capm">CAPM</a> and <a href="#/lesson/capstruct">capital structure</a>).</li>
<li>Sum to get <b>enterprise value</b>; subtract net debt for <b>equity value</b>; divide by shares.</li>
</ol>
<div class="fx"><div class="formula">Enterprise value = Σ FCF<sub>t</sub> ÷ (1 + r)<sup>t</sup> + TV ÷ (1 + r)<sup>N</sup> &nbsp;&nbsp; TV = FCF<sub>N</sub> × (1 + g) ÷ (r − g)</div><div class="fx-body">
<p><b class="lab">In plain English</b>Shrink each forecast year's free cash flow to today's money and add them (this is the <a href="#/lesson/tvm">present value</a> idea). After the last forecast year <i>N</i>, the business keeps going, so add one lump for all the later years: the <b>terminal value (TV)</b>, computed as a growing perpetuity (payment ÷ (rate − growth)), and shrink it back too.</p>
<dl class="syms"><dt>FCF<sub>t</sub></dt><dd>free cash flow in year <i>t</i></dd><dt>r</dt><dd>discount rate (WACC)</dd><dt>g</dt><dd>long-run growth rate after year <i>N</i> (must be below <i>r</i>)</dd><dt>TV</dt><dd>terminal value at the end of year <i>N</i></dd></dl>
<p class="ex"><b class="lab">Worked example (the widget's numbers)</b>FCF starts at $100m and grows 8% for 5 years, reaching $146.9m in year 5; r = 9%, g = 2.5%. PV of years 1 to 5 ≈ <b>$486m</b>. TV = 146.9 × 1.025 ÷ 0.065 = $2,317m, which is worth 2,317 ÷ 1.09<sup>5</sup> = <b>$1,506m</b> today. Enterprise value ≈ $1,992m. Subtract net debt of $300m: equity ≈ $1,692m; over 100m shares, <b>$16.92 a share</b>. Notice that 76% of the value is the terminal value.</p>
<p class="hook"><b class="lab">Remember it as</b>"Add up the discounted cash flows you can see, plus one big discounted lump for everything after."</p></div></div>
<details class="pause"><summary>Pause and try: a very simple firm</summary><p>A firm will pay you $10m next year, growing 3% a year forever, and the discount rate is 8%. Value = 10 ÷ (0.08 − 0.03) = 10 ÷ 0.05 = <b>$200m</b>. That is the whole idea: a growing perpetuity.</p></details>

<h2>The catch</h2>
<ul>
<li><b>Terminal value dominates:</b> often 60 to 80% of the total, so small changes in r or g move the answer a lot (the widget shows it).</li>
<li><b>Consistency:</b> long-run growth cannot exceed the economy's, and growth requires reinvestment. Forecasting high growth without high capex is a common mistake.</li>
<li><b>Garbage in, garbage out.</b> The value is only as good as the forecast.</li>
</ul>
<aside class="callout mistake"><b class="lab">Common mistake</b><p>Discounting cash flows to the firm at the <em>cost of equity</em>. FCFF belongs to all funders, so it is discounted at the blended cost, the WACC. Mixing the cash flow type and the discount rate is one of the most common valuation errors.</p></aside>
<p>A good use of DCF is <b>reverse engineering</b>: take the market price and ask what growth and margins it implies. Then judge whether those beliefs are plausible.</p>
`,
  takeaways: [
    'FCFF = after-tax operating profit + depreciation − capex − working capital investment.',
    'Enterprise value = PV of FCF at WACC; equity value = EV − net debt.',
    'Terminal value is most of the answer, so stress-test r and g.'
  ],
  quiz: [
    { k: 'calc', gen: () => { const ebit = pick([100, 150, 200, 300]), t = pick([20, 25, 30]), dep = pick([20, 30, 50]), cap = pick([40, 60, 80]), wc = pick([5, 10, 15]); const ans = ebit * (1 - t / 100) + dep - cap - wc; return N({ q: `EBIT is $${ebit}m, the tax rate ${t}%, depreciation $${dep}m, capex $${cap}m and working capital rises by $${wc}m. What is free cash flow to the firm?`, ans, wrong: [ebit * (1 - t / 100), ebit * (1 - t / 100) + dep, ebit + dep - cap - wc], fmt: x => '$' + num(x, 1) + 'm', alt: () => (ebit - ebit * t / 100) + (dep - cap) - wc, tol: 1e-9, fixed: true, why: `After-tax operating profit = ${ebit} × ${1 - t / 100} = ${round(ebit * (1 - t / 100), 1)}. Add depreciation ${dep}, subtract capex ${cap} and the ${wc} rise in working capital: ${num(ans, 1)}. Taxes are on EBIT, so use ${ebit} × (1 − ${t}%), and reinvestment must be subtracted.` }); } },
    { k: 'calc', gen: () => { const F = pick([10, 20, 50, 100]), r = pick([8, 9, 10, 12]), g = pick([2, 3, 4]); const ans = F / ((r - g) / 100); return N({ q: `A business will produce free cash flow of $${F}m next year, growing ${g}% a year forever. With a ${r}% discount rate, what is its enterprise value?`, ans, wrong: [F / (r / 100), F / ((r + g) / 100), F * (1 + g / 100) / ((r - g) / 100)], fmt: x => '$' + num(x, 0) + 'm', alt: () => { let s = 0, d = F; for (let t = 1; t <= 3000; t++) { s += d / Math.pow(1 + r / 100, t); d *= 1 + g / 100; } return s; }, tol: 0.5, fixed: true, why: `Growing perpetuity: ${F} ÷ (${r / 100} − ${g / 100}) = ${F} ÷ ${round((r - g) / 100, 2)} = $${num(ans, 0)}m. The effective rate is r − g.` }); } },
    { k: 'calc', gen: () => { const ev = pick([800, 1000, 1500, 2000]), nd = pick([100, 200, 300]), sh = pick([50, 100, 200]); const ans = (ev - nd) / sh; return N({ q: `A company's enterprise value is $${ev}m, its net debt is $${nd}m and it has ${sh}m shares. What is the equity value per share?`, ans, wrong: [(ev + nd) / sh, ev / sh, (ev - nd)], fmt: x => usd(x, 2), alt: () => ev / sh - nd / sh, tol: 1e-9, fixed: true, why: `Equity value = EV − net debt = ${ev} − ${nd} = $${ev - nd}m. Per share: ${ev - nd} ÷ ${sh} = ${usd(ans, 2)}. Lenders are paid first, so their claim is subtracted.` }); } },
    { k: 'concept', q: 'What discount rate is used for free cash flow to the firm?', o: ['WACC', 'Cost of equity', 'Risk-free rate', 'Inflation rate'], a: 0, why: 'FCFF belongs to all capital providers, so use the blended cost of capital.' },
    { k: 'concept', q: 'How do you go from enterprise value to equity value?', o: ['Subtract net debt', 'Add net debt', 'Multiply by beta', 'Subtract taxes'], a: 0, why: 'Debt holders are paid first; what is left belongs to shareholders.' },
    { k: 'concept', q: 'Why is a DCF so sensitive to the terminal growth rate?', o: ['The terminal value is a large share of total value and depends on 1/(r − g)', 'Growth is always negative', 'Discounting is not applied', 'It is not sensitive'], a: 0, why: 'When g approaches r the denominator shrinks and the value balloons.' },
    { k: 'apply', q: 'An analyst assumes 15% growth forever with a 9% discount rate. What is wrong?', o: ['Growth above the discount rate breaks the perpetuity formula and cannot last forever', 'Nothing', 'The discount rate is too low to matter', 'Growth must be negative'], a: 0, why: 'The growing perpetuity needs g below r, and no firm can outgrow the economy forever.' },
    { k: 'apply', q: 'You value a firm by discounting its free cash flow to the firm at its cost of equity. What is the likely error?', o: ['Using the wrong rate: FCFF should be discounted at WACC', 'None', 'Cash flows should be undiscounted', 'FCFF ignores depreciation'], a: 0, why: 'Match the cash flow to the discount rate: FCFF goes with WACC.' }
  ],
  related: ['tvm', 'fsa-multiples', 'capstruct']
},

{
  id: 'fsa-multiples', type: 'concept', title: 'Valuation multiples: P/E, EV/EBITDA and what they imply',
  blurb: 'Fast, comparable valuation ratios, and how to see the fundamentals hiding inside them.',
  level: 'Intermediate', min: 18, tags: ['multiples', 'P/E', 'EV/EBITDA'], widget: 'multiples',
  los: [
    'Explain what a valuation multiple is and why multiples differ across companies.',
    'Calculate P/E, enterprise value and EV/EBITDA.',
    'Derive and apply the justified P/E from payout, required return and growth.',
    'Describe the comparables method and its pitfalls.'
  ],
  terms: [
    ['Multiple', 'a price or value divided by a financial metric, such as earnings'],
    ['P/E', 'share price divided by earnings per share'],
    ['EBITDA', 'earnings before interest, taxes, depreciation and amortization'],
    ['Market cap', 'share price times the number of shares'],
    ['Enterprise value (EV)', 'market cap plus net debt'],
    ['Payout ratio', 'the share of earnings paid out as dividends']
  ],
  body: `
<p>Multiples value a company relative to a metric it produces. They are quick and widely used, but they are shorthand for a full valuation model, and their differences across companies usually reflect differences in growth, risk and profitability.</p>

<aside class="callout story"><b class="lab">Picture this</b>
<p>You are buying a bakery. Another bakery just sold for $300,000 and earns $30,000 a year. It sold for 10 times its earnings. Yours earns $40,000, so a first guess at a fair price is 10 × $40,000 = $400,000. That is the multiples method in one paragraph. It is fast and easy, and it is only as good as the comparison.</p></aside>

<h2>Common multiples</h2>
<dl class="defs">
<dt>P/E: price ÷ earnings per share</dt><dd>The most common. Sensitive to leverage and accounting choices; unusable when earnings are negative.</dd>
<dt>P/B: price ÷ book value per share</dt><dd>Useful for banks and asset-heavy firms. Related to ROE.</dd>
<dt>EV/EBITDA and EV/Sales</dt><dd><b>Enterprise value</b> = market cap + net debt (+ other claims). Because it captures all providers of capital and the metric is before interest, EV multiples are neutral to capital structure and better for comparing differently financed firms.</dd>
<dt>PEG: P/E ÷ growth</dt><dd>Attempts to adjust P/E for growth; crude but popular.</dd>
</dl>

<h2>What is inside a multiple</h2>
<p>From the Gordon growth model, the <b>justified forward P/E</b> is:</p>
<div class="fx"><div class="formula">P<sub>0</sub> ÷ E<sub>1</sub> = Payout ratio ÷ (r − g)</div><div class="fx-body">
<p><b class="lab">In plain English</b>Start from the growing-perpetuity value of a stock, P<sub>0</sub> = Dividend<sub>1</sub> ÷ (r − g) (see the <a href="#/lesson/tvm">time value of money</a>). A dividend is just the payout ratio times earnings, so dividing both sides by earnings gives the P/E. A firm deserves a <b>higher P/E</b> if it grows faster (bigger g), pays out more, or is less risky (smaller r).</p>
<dl class="syms"><dt>P<sub>0</sub></dt><dd>price today</dd><dt>E<sub>1</sub></dt><dd>next year's earnings per share</dd><dt>Payout ratio</dt><dd>share of earnings paid as dividends</dd><dt>r, g</dt><dd>required return and long-run growth</dd></dl>
<p class="ex"><b class="lab">Worked example</b>Payout 60%, r = 8%, g = 3.5%: P/E = 0.60 ÷ (0.08 − 0.035) = 0.60 ÷ 0.045 = <b>13.3×</b>. If growth were 5%: 0.60 ÷ 0.03 = 20×, so a 1.5-point change in growth moves the "fair" multiple by half.</p>
<p class="hook"><b class="lab">Remember it as</b>"Fair P/E = payout ÷ (return minus growth)."</p></div></div>
<div class="fx"><div class="formula">Enterprise value = Market cap + Net debt &nbsp;&nbsp; Net debt = Debt − Cash</div><div class="fx-body">
<p><b class="lab">In plain English</b>To buy the whole business you would pay for the shares <em>and</em> take over the debt (less the cash you would also acquire). EV/EBITDA then compares that to the business's operating earnings before interest, taxes, depreciation and amortization.</p>
<p class="ex"><b class="lab">Worked example</b>Market cap $800m, debt $300m, cash $100m: EV = 800 + (300 − 100) = <b>$1,000m</b>. With EBITDA of $125m, EV/EBITDA = 1,000 ÷ 125 = <b>8×</b>.</p></div></div>
<details class="pause"><summary>Pause and try: is a low P/E always cheap?</summary><p>No. A firm at 8× earnings with shrinking profits can be more expensive than one at 25× with fast growth. A multiple is only "cheap" or "dear" relative to the growth, payout and risk it is supposed to reflect.</p></details>
<p>A higher multiple is justified by <em>higher growth</em>, <em>higher payout</em> (for a given growth) or a <em>lower required return</em>. So a stock is not cheap just because its P/E is low, or expensive just because it is high: ask what the multiple is implicitly assuming.</p>

<h2>The comparables method</h2>
<ol>
<li>Pick genuinely comparable firms (same industry, growth, risk, and size).</li>
<li>Compute their multiples on consistent, comparable earnings.</li>
<li>Apply a peer multiple (median, or an adjusted one) to the target's metric.</li>
</ol>

<h2>Pitfalls</h2>
<ul>
<li><b>Cyclical earnings:</b> P/E looks highest at the trough and lowest at the peak. Use normalized earnings.</li>
<li><b>Accounting differences</b> (see <a href="#/lesson/fsa-choices">accounting choices</a>) and one-off items.</li>
<li><b>Peer sets that are themselves mispriced:</b> a relative valuation can be right about relative and wrong about absolute.</li>
</ul>
<aside class="callout mistake"><b class="lab">Common mistake</b><p>Comparing the P/E of a company with lots of debt to one with none. Debt changes earnings per share and the risk of the equity. EV-based multiples remove that distortion.</p></aside>
`,
  takeaways: [
    'EV multiples neutralize capital structure; EV = market cap + net debt.',
    'Justified P/E = payout ÷ (r − g): growth, payout and required return drive multiples.',
    'Compare like with like, and normalize cyclical or one-off earnings.'
  ],
  quiz: [
    { k: 'calc', gen: () => { const po = pick([40, 50, 60, 70]), r = pick([8, 9, 10]), g = pick([2, 3, 4, 5]); const ans = po / 100 / ((r - g) / 100); return N({ q: `A stock has a payout ratio of ${po}%, a required return of ${r}% and long-run growth of ${g}%. What is its justified forward P/E?`, ans, wrong: [po / 100 / (r / 100), 1 / ((r - g) / 100), po / 100 / ((r + g) / 100)], fmt: x => num(x, 1) + '×', alt: () => { const E1 = 1, D1 = E1 * po / 100; return (D1 / ((r - g) / 100)) / E1; }, tol: 1e-9, fixed: true, why: `P/E = payout ÷ (r − g) = ${po / 100} ÷ (${r / 100} − ${g / 100}) = ${po / 100} ÷ ${round((r - g) / 100, 2)} = ${num(ans, 1)}×. A bigger g or a smaller r would raise it.` }); } },
    { k: 'calc', gen: () => { const mc = pick([600, 800, 1200]), d = pick([200, 300, 400]), c = pick([50, 100, 150]), e = pick([100, 125, 150]); const ev = mc + d - c; const ans = ev / e; return N({ q: `A company has a market cap of $${mc}m, debt of $${d}m, cash of $${c}m and EBITDA of $${e}m. What is EV/EBITDA?`, ans, wrong: [mc / e, (mc + d) / e, (mc - d + c) / e], fmt: x => num(x, 2) + '×', alt: () => ((mc + (d - c)) / e), tol: 1e-9, fixed: true, why: `EV = market cap + net debt = ${mc} + (${d} − ${c}) = $${ev}m. EV/EBITDA = ${ev} ÷ ${e} = ${num(ans, 2)}×. Cash reduces the price you effectively pay for the operating business.` }); } },
    { k: 'calc', gen: () => { const p = pick([30, 45, 60, 90]), eps = pick([2, 3, 4, 5]); const ans = p / eps; return N({ q: `A share trades at $${p} and earned $${eps} per share over the last year. What is its P/E?`, ans, wrong: [eps / p, p - eps, p * eps], fmt: x => num(x, 1) + '×', alt: () => 1 / (eps / p), tol: 1e-9, fixed: true, why: `P/E = price ÷ earnings per share = ${p} ÷ ${eps} = ${num(ans, 1)}×.` }); } },
    { k: 'concept', q: 'Enterprise value equals...', o: ['Market cap + net debt', 'Market cap − net debt', 'Book equity + debt', 'Revenue × margin'], a: 0, why: 'It values the whole business: equity plus net claims of lenders.' },
    { k: 'concept', q: 'All else equal, a higher expected growth rate g gives a justified P/E that is...', o: ['Higher', 'Lower', 'Unchanged', 'Negative'], a: 0, why: 'A smaller (r − g) denominator raises the multiple.' },
    { k: 'concept', q: 'Why is EV/EBITDA better than P/E for comparing firms with different debt levels?', o: ['It includes debt in the numerator and is measured before interest', 'It uses sales', 'It ignores earnings', 'It is always lower'], a: 0, why: 'It is unaffected by how the firm splits financing between debt and equity.' },
    { k: 'apply', q: 'A cyclical firm\'s P/E looks very low at the top of the cycle. What is the risk in concluding it is cheap?', o: ['Peak earnings may fall, so the "true" P/E on normal earnings is higher', 'None', 'P/E cannot be low', 'Earnings never change'], a: 0, why: 'At the peak, earnings are unusually high, making P/E look low. Use normalized earnings.' },
    { k: 'apply', q: 'Firm A trades at 10× earnings and Firm B at 25×. Which statement is best?', o: ['B may be justified if it has much higher growth or lower risk; investigate before calling either cheap', 'A is definitely cheaper', 'B is definitely overvalued', 'They must be equally valued'], a: 0, why: 'Multiples reflect expected growth, payout and risk. A gap does not by itself mean mispricing.' }
  ],
  related: ['fsa-fcf', 'fsa-dupont', 'p-shiller']
},

{
  id: 'fsa-credit', type: 'concept', title: 'Credit and distress analysis: coverage, leverage and the Altman Z-score',
  blurb: 'How lenders judge whether a company can repay, and how statement ratios can predict failure.',
  level: 'Intermediate', min: 18, tags: ['credit', 'Altman', 'distress'], widget: 'altman',
  los: [
    'Explain how a lender\'s question differs from an equity investor\'s.',
    'Calculate coverage and leverage ratios and interpret them.',
    'Describe credit ratings and the investment-grade boundary.',
    'Calculate an Altman Z-score and place it in a zone.',
    'Describe what modern approaches add.'
  ],
  terms: [
    ['Credit risk', 'the risk that a borrower does not repay in full and on time'],
    ['Coverage', 'how many times earnings cover the interest bill'],
    ['Covenant', 'a condition in a loan, such as a maximum debt level'],
    ['Investment grade', 'a rating of BBB− / Baa3 or above'],
    ['High yield ("junk")', 'a rating below investment grade'],
    ['Z-score', 'Altman\'s single number that combines five ratios to flag distress']
  ],
  body: `
<p>Equity analysts ask "how much can this firm earn?" Credit analysts ask "how sure am I to get paid back?", a question dominated by downside outcomes.</p>

<aside class="callout story"><b class="lab">Picture this</b>
<p>A bank considers lending $100,000 to a bakery. If the bakery does brilliantly, the bank still only gets its interest and its money back. If it fails, the bank can lose a lot. So the bank cares far more about <em>not losing</em> than about the upside. That is the credit analyst's mindset, and it produces different questions.</p></aside>

<h2>Key credit metrics</h2>
<ul>
<li><b>Coverage:</b> EBIT/interest or EBITDA/interest. How many times operating earnings cover the interest bill.</li>
<li><b>Leverage:</b> debt/EBITDA, debt/capital. How large the debt is relative to earning power.</li>
<li><b>Cash flow to debt:</b> CFO or FCF ÷ total debt. How quickly cash flow could repay debt.</li>
<li><b>Liquidity:</b> cash and undrawn credit lines against near-term maturities. Many failures are cash crunches, not accounting insolvency.</li>
<li><b>Covenants:</b> loan conditions (max leverage, min coverage) whose breach can trigger default or renegotiation.</li>
</ul>
<details class="pause"><summary>Pause and try: read the numbers</summary><p>Debt $400m, EBITDA $100m: debt/EBITDA = <b>4.0×</b>. It would take four years of EBITDA to pay back the debt (before interest, tax and reinvestment). EBIT $150m and interest $24m: coverage = <b>6.3×</b>, comfortable.</p></details>

<h2>Credit ratings</h2>
<p>Agencies grade borrowers from AAA (or Aaa) down to D. <b>Investment grade</b> is BBB−/Baa3 or above; below that is "high yield" or "junk". Ratings summarize the analysis above plus business risk, but agencies can be slow to react, and higher-rated bonds still default occasionally.</p>

<h2>The Altman Z-score</h2>
<p>Altman (1968) used statistics to combine five ratios into one score for predicting bankruptcy in public manufacturing firms:</p>
<div class="fx"><div class="formula">Z = 1.2·X<sub>1</sub> + 1.4·X<sub>2</sub> + 3.3·X<sub>3</sub> + 0.6·X<sub>4</sub> + 1.0·X<sub>5</sub></div><div class="fx-body">
<p><b class="lab">In plain English</b>Compute five ratios, multiply each by its weight (bigger weight = more important for predicting failure), and add. The score is a single health reading: higher is safer.</p>
<dl class="syms"><dt>X<sub>1</sub></dt><dd>working capital ÷ total assets: liquidity cushion</dd><dt>X<sub>2</sub></dt><dd>retained earnings ÷ total assets: cumulative profitability (young firms score low)</dd><dt>X<sub>3</sub></dt><dd>EBIT ÷ total assets: how productive the assets are right now (largest weight)</dd><dt>X<sub>4</sub></dt><dd>market value of equity ÷ total liabilities: how far the stock price could fall before debt exceeds assets</dd><dt>X<sub>5</sub></dt><dd>sales ÷ total assets: asset turnover</dd></dl>
<p class="ex"><b class="lab">Worked example</b>X<sub>1</sub> = 0.15, X<sub>2</sub> = 0.25, X<sub>3</sub> = 0.10, X<sub>4</sub> = 1.2, X<sub>5</sub> = 1.1. Z = 1.2×0.15 + 1.4×0.25 + 3.3×0.10 + 0.6×1.2 + 1.0×1.1 = 0.18 + 0.35 + 0.33 + 0.72 + 1.10 = <b>2.68</b>, in the grey zone (between 1.81 and 2.99).</p>
<p class="hook"><b class="lab">Remember it as</b>"Five health ratios, weighted; profitability (X<sub>3</sub>) counts most."</p></div></div>
<p>A high Z (above about 2.99) suggests safety, a low Z (below about 1.81) suggests distress, and in between lies a grey zone. It shows how liquidity, cumulative profitability, current profitability, market-implied cushion and asset efficiency together point to trouble. See the <a href="#/lesson/p-altman68">paper breakdown</a>.</p>
<aside class="callout mistake"><b class="lab">Common mistake</b><p>Reading a low Z-score as a prediction that the firm will fail. It flags <em>elevated risk</em> based on a statistical pattern, and it was built for one kind of company (public manufacturers) in one era. It is a prompt for further work, not a verdict.</p></aside>

<h2>Modern approaches</h2>
<p>Today's models (hazard models, machine learning, and market-based measures such as Merton's <em>distance to default</em>, which treats equity as an option on the firm's assets; see <a href="#/lesson/options">options</a>) generally outperform the original Z-score, but the intuition of ratios such as profitability, leverage and liquidity remains.</p>
`,
  takeaways: [
    'Credit analysis focuses on coverage, leverage, cash flow, liquidity and covenants.',
    'Investment grade = BBB−/Baa3 or above.',
    'Altman\'s Z combines five ratios to flag distress; profitability weighs most.'
  ],
  quiz: [
    { k: 'calc', gen: () => { const x1 = pick([0.05, 0.1, 0.15, 0.2]), x2 = pick([0.1, 0.2, 0.3]), x3 = pick([0.02, 0.06, 0.1, 0.15]), x4 = pick([0.5, 0.8, 1.2, 1.6]), x5 = pick([0.8, 1.0, 1.4]); const ans = 1.2 * x1 + 1.4 * x2 + 3.3 * x3 + 0.6 * x4 + 1.0 * x5; return N({ q: `A firm has X₁ = ${x1}, X₂ = ${x2}, X₃ = ${x3}, X₄ = ${x4} and X₅ = ${x5}. What is its Altman Z-score (Z = 1.2X₁ + 1.4X₂ + 3.3X₃ + 0.6X₄ + 1.0X₅)?`, ans, wrong: [x1 + x2 + x3 + x4 + x5, 1.2 * x1 + 1.4 * x2 + 3.3 * x3 + 0.6 * x4, 3.3 * x1 + 1.4 * x2 + 1.2 * x3 + 0.6 * x4 + x5], fmt: x => num(x, 3), alt: () => [[1.2, x1], [1.4, x2], [3.3, x3], [0.6, x4], [1.0, x5]].reduce((s, [w, x]) => s + w * x, 0), tol: 1e-9, fixed: true, why: `Multiply each ratio by its weight and add: ${round(1.2 * x1, 3)} + ${round(1.4 * x2, 3)} + ${round(3.3 * x3, 3)} + ${round(0.6 * x4, 3)} + ${round(x5, 3)} = ${num(ans, 3)}. ${ans > 2.99 ? 'Above 2.99: the safe zone.' : ans < 1.81 ? 'Below 1.81: the distress zone.' : 'Between 1.81 and 2.99: the grey zone.'}` }); } },
    { k: 'calc', gen: () => { const d = pick([200, 300, 400, 600]), e = pick([50, 75, 100, 150]); const ans = d / e; return N({ q: `A firm has debt of $${d}m and EBITDA of $${e}m. What is its debt/EBITDA?`, ans, wrong: [e / d, d - e, d / (e * 2)], fmt: x => num(x, 1) + '×', alt: () => 1 / (e / d), tol: 1e-9, fixed: true, why: `Debt/EBITDA = ${d} ÷ ${e} = ${num(ans, 1)}×. It is roughly how many years of EBITDA would be needed to repay the debt.` }); } },
    { k: 'calc', gen: () => { const ebit = pick([30, 60, 90, 120]), i = pick([25, 40, 50, 80]); const ans = ebit / i; return N({ q: `A firm earns EBIT of $${ebit}m and pays interest of $${i}m. What is its interest coverage?`, ans, wrong: [i / ebit, ebit - i, ebit * i / 100], fmt: x => num(x, 2) + '×', alt: () => 1 / (i / ebit), tol: 1e-9, fixed: true, why: `Coverage = ${ebit} ÷ ${i} = ${num(ans, 2)}×. ${ans < 1.5 ? 'That is thin: a small drop in earnings could threaten interest payments.' : 'That gives a reasonable cushion.'}` }); } },
    { k: 'concept', q: 'Which is the lowest investment-grade rating (S&P scale)?', o: ['BBB−', 'AAA', 'A', 'BB+'], a: 0, why: 'BBB− is the last investment-grade notch; BB+ and below are high yield.' },
    { k: 'concept', q: 'In the Altman Z-score, which ratio has the largest coefficient?', o: ['EBIT ÷ assets', 'Working capital ÷ assets', 'Sales ÷ assets', 'Market equity ÷ liabilities'], a: 0, why: 'EBIT/total assets is weighted 3.3.' },
    { k: 'concept', q: 'Why do credit analysts focus more on downside outcomes than equity analysts do?', o: ['Lenders receive a fixed amount if things go well but can lose a lot if they go badly', 'Lenders own the company', 'Downside is more fun', 'Equity never falls'], a: 0, why: 'A lender\'s upside is capped, so avoiding loss dominates the analysis.' },
    { k: 'apply', q: 'Interest coverage is 1.2×. What does that indicate?', o: ['Little cushion: a small earnings drop could threaten interest payments', 'Very safe', 'No debt', 'Excess cash'], a: 0, why: 'EBIT barely exceeds interest, leaving almost no room for error.' },
    { k: 'apply', q: 'A firm scores Z = 1.5 on the Altman model. What is the best interpretation?', o: ['Elevated risk of distress: investigate further, not a certainty of failure', 'Certain bankruptcy', 'Perfect health', 'The model is broken'], a: 0, why: 'Below 1.81 is the distress zone, which flags risk based on a statistical pattern.' }
  ],
  related: ['p-altman68', 'capstruct', 'fsa-ratios']
}

  );
})();
