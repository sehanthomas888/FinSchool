/* Financial statement analysis concept lessons. */
window.LESSONS = window.LESSONS || [];
window.LESSONS.push(

{
  id: 'fsa-statements', type: 'concept', title: 'The three financial statements and how they connect',
  blurb: 'Income statement, balance sheet and cash flow statement: what each shows and why profit is not cash.',
  level: 'Foundations', min: 14, tags: ['financial statements', 'accruals'], widget: 'statements',
  body: `
<p>Every listed company publishes three core statements (plus notes). To analyze a business you need to know what each one says, and how they tie together.</p>

<h2>The statements</h2>
<ul>
  <li><b>Income statement</b>: performance over a period. Revenue − expenses = net income. Prepared on an <em>accrual</em> basis: revenue counts when earned, expenses when incurred, regardless of when cash moves.</li>
  <li><b>Balance sheet</b>: a snapshot at a date. <b>Assets = Liabilities + Equity.</b> It shows what the firm owns, owes, and what belongs to shareholders.</li>
  <li><b>Cash flow statement</b>: where cash came from and went, split into <b>operating</b> (CFO), <b>investing</b> (CFI: capex, acquisitions) and <b>financing</b> (CFF: debt, equity, dividends) activities.</li>
</ul>

<div class="fx"><div class="formula">Assets = Liabilities + Equity</div><div class="fx-body">
<p><b class="lab">In plain English</b>Everything the company owns was paid for either by borrowing (liabilities) or by owners' money (equity). The two sides always balance, which is why it's called a balance sheet.</p>
<dl class="syms"><dt>Assets</dt><dd>what the firm owns: cash, receivables, inventory, equipment</dd><dt>Liabilities</dt><dd>what it owes: payables, loans, bonds</dd><dt>Equity</dt><dd>what's left for owners: assets minus liabilities</dd></dl>
<p class="ex"><b class="lab">Worked example</b>Assets of $500m funded by $300m of debt and payables plus <b>$200m</b> of equity. Equity = 500 − 300 = 200.</p></div></div>

<h2>How they link</h2>
<ol>
  <li>Net income flows into <b>retained earnings</b> on the balance sheet (less dividends).</li>
  <li>The cash flow statement (indirect method) starts from net income and adjusts for non-cash items (depreciation) and changes in working capital (receivables, inventory, payables).</li>
  <li>The ending cash on the cash flow statement equals the cash line on the balance sheet.</li>
</ol>
<div class="fx"><div class="formula">CFO = Net income + Depreciation − Increase in receivables − Increase in inventory + Increase in payables</div><div class="fx-body">
<p><b class="lab">In plain English</b>Start with profit. Add back expenses that didn't use cash (depreciation). Subtract cash that is <em>tied up</em> in things the firm has built up (customers who haven't paid, inventory on shelves), and add cash the firm is <em>holding on to</em> (bills it hasn't paid yet).</p>
<dl class="syms"><dt>CFO</dt><dd>cash flow from operations</dd><dt>Depreciation</dt><dd>non-cash charge for wear on equipment</dd><dt>Increase in receivables</dt><dd>sales booked but not yet collected in cash (reduces CFO)</dd></dl>
<p class="ex"><b class="lab">Worked example (the widget's numbers)</b>Net income $187.5m + depreciation $100m − increase in receivables $150m = <b>CFO $137.5m</b>. Profit was $187.5m, but only $137.5m arrived as cash.</p>
<p class="hook"><b class="lab">Remember it as</b>"Profit, plus non-cash charges, minus cash that got stuck in the business."</p></div></div>
<div class="fx"><div class="formula">Ending retained earnings = Beginning retained earnings + Net income − Dividends</div><div class="fx-body">
<p><b class="lab">In plain English</b>This is how the income statement feeds the balance sheet: profit that isn't paid out stays in the company and adds to equity.</p>
<p class="ex"><b class="lab">Worked example</b>Retained earnings start at $400m; net income is $80m; dividends are $30m. End = 400 + 80 − 30 = <b>$450m</b>.</p></div></div>

<h2>Why profit is not cash</h2>
<p>A firm can report rising profit and still run out of cash: customers may not pay, inventory may pile up, or capex may exceed depreciation. Conversely, a firm can have poor profit but healthy cash flow for a period. Analysts therefore always read the cash flow statement next to the income statement. The gap between them is the firm's <b>accruals</b>, and the subject of the <a href="#/lesson/fsa-quality">earnings quality</a> lesson.</p>

<h2>Beyond the numbers</h2>
<p>The notes and management discussion (MD&amp;A) explain <em>accounting policies</em>, debt terms, contingencies and segment data. The auditor's opinion tells you whether the statements are presented fairly, and an <em>unqualified</em> opinion does not mean the company is healthy or the estimates are correct.</p>
`,
  takeaways: [
    'Assets = liabilities + equity; net income feeds retained earnings.',
    'Accrual profit and cash flow differ by working-capital changes, depreciation and other accruals.',
    'Read all three statements and the notes together.'
  ],
  quiz: [
    { q: 'Which statement is a snapshot at a point in time?',
      o: ['Income statement', 'Balance sheet', 'Cash flow statement', 'Statement of retained earnings only'], a: 1, why: 'The balance sheet shows financial position on a date; the others cover a period.' },
    { q: 'Receivables rise sharply while sales are flat. What is the effect on operating cash flow relative to net income?',
      o: ['CFO is higher', 'CFO is lower', 'No effect', 'CFO equals net income'], a: 1, why: 'Higher receivables mean revenue was booked but cash not yet collected.' },
    { q: 'Which is a non-cash expense added back in the indirect method?',
      o: ['Wages', 'Depreciation', 'Interest paid', 'Tax paid'], a: 1, why: 'Depreciation reduces net income but no cash leaves in that period.' }
  ],
  related: ['fsa-ratios', 'fsa-quality', 'fsa-fcf']
},

{
  id: 'fsa-ratios', type: 'concept', title: 'Ratio analysis: profitability, liquidity, leverage and efficiency',
  blurb: 'Turn raw statements into comparable numbers, then learn what each ratio can and cannot tell you.',
  level: 'Foundations', min: 16, tags: ['ratios', 'financial statements'], widget: 'ratios',
  body: `
<p>Ratios scale one statement number by another so firms of different sizes, and the same firm across years, can be compared. They don't answer questions by themselves; they tell you <em>where to look</em>.</p>

<h2>Four families</h2>
<p>Every ratio is "one number divided by another". The examples below all use the same sample company (the widget's starting numbers): sales $1,000m, cost of goods sold (COGS) $600m, operating expenses $250m, interest $24m, net income $94.5m, total assets $1,200m, equity $550m, debt $400m, current assets $370m (of which cash $100m, receivables $120m, inventory $150m), current liabilities $250m.</p>
<dl class="defs">
  <dt>Profitability: how much is earned?</dt>
  <dd><b>Gross margin</b> = (sales − COGS) ÷ sales = 400 ÷ 1,000 = <b>40%</b>. <b>Operating margin</b> = EBIT ÷ sales = 150 ÷ 1,000 = <b>15%</b>. <b>ROA</b> = net income ÷ assets = 94.5 ÷ 1,200 = <b>7.9%</b>. <b>ROE</b> = net income ÷ equity = 94.5 ÷ 550 = <b>17.2%</b>. (EBIT = earnings before interest and taxes.)</dd>
  <dt>Liquidity: can it pay this year's bills?</dt>
  <dd><b>Current ratio</b> = current assets ÷ current liabilities = 370 ÷ 250 = <b>1.48</b>. <b>Quick ratio</b> = (cash + receivables) ÷ current liabilities = 220 ÷ 250 = <b>0.88</b> (leaves out inventory, which is slow to turn into cash). Below 1 isn't automatically bad, but it means you should ask how bills will be paid.</dd>
  <dt>Leverage: how much is borrowed?</dt>
  <dd><b>Debt-to-equity</b> = 400 ÷ 550 = <b>0.73</b>. <b>Interest coverage</b> = EBIT ÷ interest = 150 ÷ 24 = <b>6.3×</b>: operating profit covers the interest bill six times over.</dd>
  <dt>Efficiency: how hard are assets working?</dt>
  <dd><b>Inventory turnover</b> = COGS ÷ inventory = 600 ÷ 150 = <b>4.0×</b> a year, so <b>days inventory</b> = 365 ÷ 4 = <b>91 days</b> of stock on hand. <b>Asset turnover</b> = sales ÷ assets = 1,000 ÷ 1,200 = <b>0.83×</b>.</dd>
</dl>
<aside class="callout"><b>Remember it as</b> "profit ÷ something": margins divide by sales, ROA by assets, ROE by equity. Liquidity compares what's due soon to what can be paid soon. Coverage compares profit to the interest bill. Turnover asks how many times an asset is "used up" per year.</aside>

<h2>Using them well</h2>
<ol>
  <li><b>Trend:</b> a ratio's direction over 5+ years says more than one value.</li>
  <li><b>Peers:</b> compare with firms in the same industry: normal current ratios or margins differ hugely across sectors.</li>
  <li><b>Decompose:</b> break big-picture ratios (ROE) into parts, as in the <a href="#/lesson/fsa-dupont">DuPont</a> lesson.</li>
  <li><b>Check consistency:</b> if inventory turnover is deteriorating while margins hold, ask why.</li>
</ol>

<h2>Limitations</h2>
<ul>
  <li>Ratios inherit the accounting choices behind the numbers (see <a href="#/lesson/fsa-choices">accounting choices</a>).</li>
  <li>Year-end balance sheets can be unrepresentative (seasonality, window dressing); average balances are often better.</li>
  <li>One-off items distort profitability ratios; adjust for them with care and consistency.</li>
  <li>A single ratio can improve for bad reasons: cutting inventory investment raises turnover but may cause stock-outs.</li>
</ul>
`,
  takeaways: [
    'Ratios in four families: profitability, liquidity, leverage, efficiency.',
    'Compare to trend and to peers, and decompose big ratios into their drivers.',
    'Ratios are only as reliable as the accounting behind them.'
  ],
  quiz: [
    { q: 'Which ratio excludes inventory because it can be slow to convert to cash?',
      o: ['Current ratio', 'Quick ratio', 'Asset turnover', 'Interest coverage'], a: 1, why: 'The quick (acid-test) ratio uses only the most liquid current assets.' },
    { q: 'Interest coverage is calculated as...',
      o: ['Net income ÷ interest', 'EBIT ÷ interest expense', 'Debt ÷ equity', 'Sales ÷ interest'], a: 1, why: 'It shows how many times operating profit covers the interest bill.' },
    { q: 'Why compare ratios against industry peers?',
      o: ['Regulators require it', 'Normal levels differ widely between industries', 'Peers always have better ratios', 'Ratios have no meaning otherwise'], a: 1, why: 'A grocer and a software firm have very different margins, turnover and leverage by design.' }
  ],
  related: ['fsa-dupont', 'fsa-statements', 'fsa-credit']
},

{
  id: 'fsa-dupont', type: 'concept', title: 'DuPont analysis: what drives return on equity',
  blurb: 'Split ROE into margin, turnover and leverage to see how a firm earns its returns, and how risky they are.',
  level: 'Intermediate', min: 12, tags: ['ROE', 'profitability'], widget: 'dupont',
  body: `
<p>Return on equity is the headline profitability figure for shareholders, but the same ROE can come from very different businesses. <b>DuPont analysis</b> splits it into three parts.</p>

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

<h2>Reading the decomposition</h2>
<ul>
  <li>Grocers earn thin margins but turn assets quickly; luxury brands earn large margins and turn assets slowly. Similar ROA, different paths and different strategic risks.</li>
  <li>If ROE rises because the <em>equity multiplier</em> rose, the business isn't better, just more leveraged. ROE rises with leverage only if ROA exceeds the after-tax cost of debt, and the extra risk is real (see <a href="#/lesson/capstruct">capital structure</a>).</li>
  <li>The <b>extended DuPont</b> further splits margin into tax burden, interest burden and operating margin, isolating tax and interest effects.</li>
</ul>

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
    { q: 'ROE equals...',
      o: ['Margin × turnover × equity multiplier', 'Margin + turnover + leverage', 'Assets ÷ sales', 'Net income ÷ assets'], a: 0, why: 'The three terms multiply and the sales and assets terms cancel.' },
    { q: 'Firm A: 2% margin, 4× turnover. Firm B: 20% margin, 0.4× turnover. Same leverage. Compare their ROE.',
      o: ['A is higher', 'B is higher', 'They are equal', 'Cannot tell'], a: 2, why: 'Both have ROA = 8%, and identical leverage gives identical ROE.' },
    { q: 'A firm\'s ROE jumped but margin and turnover are unchanged. The likeliest explanation?',
      o: ['Higher leverage', 'Lower taxes on equity', 'Higher sales only', 'Lower depreciation'], a: 0, why: 'With the first two factors unchanged, the equity multiplier must have moved.' }
  ],
  related: ['fsa-ratios', 'capstruct', 'fsa-multiples']
},

{
  id: 'fsa-choices', type: 'concept', title: 'Accounting choices: FIFO vs LIFO, depreciation and estimates',
  blurb: 'The same business can report different profits depending on accounting policy. Learn to see through it.',
  level: 'Intermediate', min: 14, tags: ['accounting policy', 'inventory'], widget: 'choices',
  body: `
<p>Accounting standards (US GAAP, IFRS) leave managers real discretion. Two identical firms can report different profits, assets and ratios purely from policy choices. An analyst's job is to know where the discretion sits and to adjust for it when comparing companies.</p>

<h2>Inventory: FIFO, LIFO, average cost</h2>
<p>When unit costs change during the year, which costs go to <b>cost of goods sold</b> and which stay in <b>inventory</b>?</p>
<ul>
  <li><b>FIFO</b> (first in, first out): oldest costs expensed first; ending inventory carries recent costs.</li>
  <li><b>LIFO</b> (last in, first out): newest costs expensed first; ending inventory carries old costs.</li>
  <li><b>Weighted average</b>: in between.</li>
</ul>
<p>In a period of <b>rising costs</b>, LIFO reports higher COGS, lower profit, and lower inventory than FIFO, but also <em>lower taxes</em> in jurisdictions where LIFO is allowed for tax purposes (the US). That tax saving is the only real cash difference. IFRS prohibits LIFO. US firms using LIFO disclose a <b>LIFO reserve</b> so analysts can convert to FIFO.</p>

<div class="fx"><div class="formula">COGS = Beginning inventory + Purchases − Ending inventory</div><div class="fx-body">
<p><b class="lab">In plain English</b>The goods the firm had available (what it started with plus what it bought), minus what's still on the shelf at year-end, must be what it sold. FIFO and LIFO differ only in <em>which unit costs</em> they treat as sold and which as left over.</p>
<p class="ex"><b class="lab">Worked example</b>Start with 100 units at $10. Buy 100 more at $11 (costs have risen 10%). Sell 120 units at $22 each = $2,640 of sales. <b>FIFO</b> sells the old units first: COGS = 100 × $10 + 20 × $11 = $1,220, gross profit <b>$1,420</b>. <b>LIFO</b> sells the newest first: COGS = 100 × $11 + 20 × $10 = $1,300, gross profit <b>$1,340</b>. Same business, $80 different profit. At a 25% tax rate LIFO saves $20 of tax.</p>
<p class="hook"><b class="lab">Remember it as</b>"FIFO expenses the oldest costs; LIFO expenses the newest. When costs are rising, LIFO shows less profit."</p></div></div>

<h2>Other important choices and estimates</h2>
<ul>
  <li><b>Depreciation:</b> straight-line vs accelerated methods; assumed useful lives and salvage values. Longer lives = higher profits now.</li>
  <li><b>Revenue recognition:</b> when to count sales, especially for long-term contracts, subscriptions and bundles.</li>
  <li><b>Capitalize vs expense:</b> costs put on the balance sheet (capitalized) boost current profit; costs expensed immediately reduce it. Development costs, software and interest are common examples.</li>
  <li><b>Estimates:</b> allowance for bad debts, warranty reserves, pension assumptions, impairment.</li>
</ul>

<h2>Discretion vs manipulation</h2>
<p>Most choices are legitimate. Problems arise when choices systematically flatter results, and especially when they change without a good reason. Watch for: policy or estimate changes, rising receivables or inventory relative to sales, shrinking reserves, and gaps between earnings and operating cash flow.</p>
`,
  takeaways: [
    'Policy choices change reported profit and balance-sheet values, not the underlying economics.',
    'In rising-cost periods LIFO gives lower profit and tax than FIFO; IFRS bans LIFO.',
    'Look for unexplained changes in policies and estimates.'
  ],
  quiz: [
    { q: 'When input costs are rising, which method typically reports the lowest profit?',
      o: ['FIFO', 'LIFO', 'They are always the same', 'Neither'], a: 1, why: 'LIFO expenses the most recent, higher costs first.' },
    { q: 'What is the real cash-flow effect of choosing LIFO (where allowed for tax)?',
      o: ['None', 'Lower tax payments in rising-cost periods', 'Higher sales', 'Lower purchases'], a: 1, why: 'Lower taxable income means lower taxes, the only real economic difference.' },
    { q: 'Which is a warning sign of aggressive accounting?',
      o: ['Stable policies', 'Receivables growing much faster than sales', 'High audit fees', 'A declining share price'], a: 1, why: 'It may indicate premature or questionable revenue recognition.' }
  ],
  related: ['fsa-quality', 'fsa-ratios', 'p-sloan96']
},

{
  id: 'fsa-quality', type: 'concept', title: 'Earnings quality and accruals',
  blurb: 'Not all profit is equally durable. Separating cash earnings from accrual earnings tells you which to trust.',
  level: 'Intermediate', min: 14, tags: ['earnings quality', 'accruals'], widget: 'quality',
  body: `
<p><b>Earnings quality</b> is how well reported earnings reflect the firm's sustainable, repeatable performance. High-quality earnings are persistent, backed by cash, and based on conservative, consistent accounting.</p>

<h2>Cash and accruals</h2>
<div class="fx"><div class="formula">Net income = Operating cash flow + Accruals</div><div class="fx-body">
<p><b class="lab">In plain English</b>Profit is made of two parts: the part that already arrived as cash, and the part that is still just an accounting entry (an accrual): sales not yet collected, costs not yet paid, estimates. Rearranged: <b>Accruals = Net income − Operating cash flow</b>.</p>
<p class="ex"><b class="lab">Worked example</b>Net income $100m, operating cash flow $60m. Accruals = 100 − 60 = <b>$40m</b>: 40% of the reported profit hasn't turned into cash yet.</p></div></div>
<p><b>Accruals</b> are the accounting adjustments between cash and profit: revenue booked but not collected, expenses deferred, depreciation, reserves. Accruals must reverse eventually: a receivable is either collected or written off. Earnings driven by large positive accruals have to be "paid for" later, which is why they tend to be less persistent than earnings supported by cash.</p>

<h2>Common measures</h2>
<ul>
  <li><b>Accrual ratio</b> = (net income − CFO) ÷ average total assets. Dividing by assets makes firms of different sizes comparable. With the example above and average assets of $1,000m: 40 ÷ 1,000 = <b>4%</b>. Sloan (1996) sorted firms on a version of this.</li>
  <li><b>Cash conversion</b> = CFO ÷ net income = 60 ÷ 100 = <b>60%</b>. Persistently well below 100% deserves an explanation.</li>
  <li><b>Beneish M-score (1999):</b> a statistical model that combines indicators such as receivables growth, margin changes and asset quality to flag possible earnings manipulation.</li>
</ul>

<h2>Red flags</h2>
<ul>
  <li>Receivables or inventory growing faster than sales.</li>
  <li>Capitalized costs increasing faster than revenue.</li>
  <li>Operating cash flow persistently below net income.</li>
  <li>Frequent "non-recurring" charges that recur every year.</li>
  <li>Changes in auditors, useful lives or revenue policies.</li>
</ul>
<p>None of these proves manipulation. They are questions for further work. The <a href="#/lesson/p-sloan96">Sloan paper</a> showed that markets seemed to miss the difference between accrual and cash components of earnings, at least in his sample.</p>
`,
  takeaways: [
    'Net income = operating cash flow + accruals; accruals eventually reverse.',
    'High accrual earnings are typically less persistent than cash-backed earnings.',
    'Red flags are prompts for investigation, not proof of manipulation.'
  ],
  quiz: [
    { q: 'Accruals are defined as...',
      o: ['Net income minus operating cash flow', 'Revenue minus cost of goods sold', 'Cash minus debt', 'Dividends minus earnings'], a: 0, why: 'Accruals are the non-cash part of earnings.' },
    { q: 'Why would high-accrual earnings tend to be less persistent?',
      o: ['They are taxed more', 'Accruals must eventually reverse into (or away from) cash', 'They are always fraudulent', 'They include dividends'], a: 1, why: 'Timing differences unwind.' },
    { q: 'Net income is $100m and CFO is $30m for years in a row. Best interpretation?',
      o: ['Perfectly normal', 'A prompt to investigate receivables, inventory and capitalized costs', 'Proof of fraud', 'Evidence of cash hoarding'], a: 1, why: 'A persistent gap is a signal to look at where the accruals are building up.' }
  ],
  related: ['fsa-statements', 'p-sloan96', 'fsa-choices']
},

{
  id: 'fsa-fcf', type: 'concept', title: 'Free cash flow and discounted cash flow valuation',
  blurb: 'Turn forecasts into a value: which cash flows to discount, at what rate, and why the terminal value dominates.',
  level: 'Intermediate', min: 16, tags: ['valuation', 'DCF'], widget: 'dcf',
  body: `
<p>Accounting profit is a useful signal, but a firm's <em>value</em> comes from the cash it can distribute to those who fund it. The <b>discounted cash flow (DCF)</b> approach applies the <a href="#/lesson/tvm">time value of money</a> to forecast cash flows.</p>

<h2>Free cash flow to the firm</h2>
<div class="fx"><div class="formula">FCFF = EBIT × (1 − tax rate) + Depreciation − Capex − Increase in working capital</div><div class="fx-body">
<p><b class="lab">In plain English</b>Start with operating profit after tax, add back depreciation (a non-cash charge), then subtract the cash the firm must put back into the business to keep and grow it: new equipment (capex) and extra working capital (more inventory and receivables). What's left is the cash available to <em>everyone</em> who funds the firm, lenders and owners alike. <b>FCFE</b> is what remains for shareholders after debt payments.</p>
<dl class="syms"><dt>EBIT</dt><dd>earnings before interest and taxes (operating profit)</dd><dt>Capex</dt><dd>capital expenditure: spending on equipment and facilities</dd><dt>Working capital</dt><dd>current assets minus current liabilities</dd></dl>
<p class="ex"><b class="lab">Worked example</b>EBIT $200m, tax rate 25% → after-tax operating profit $150m. Add depreciation $50m, subtract capex $80m and a $10m increase in working capital: FCFF = 150 + 50 − 80 − 10 = <b>$110m</b>.</p>
<p class="hook"><b class="lab">Remember it as</b>"After-tax operating profit, plus non-cash charges, minus reinvestment."</p></div></div>

<h2>Steps</h2>
<ol>
  <li><b>Forecast</b> free cash flow for an explicit period (often 5–10 years), tied to revenue growth, margins and reinvestment.</li>
  <li><b>Terminal value</b> at the end: usually a growing perpetuity, TV = FCF × (1 + g) ÷ (r − g).</li>
  <li><b>Discount</b> everything at the <b>WACC</b> (the blended cost of debt and equity; see <a href="#/lesson/capm">CAPM</a> and <a href="#/lesson/capstruct">capital structure</a>).</li>
  <li>Sum to get <b>enterprise value</b>; subtract net debt for <b>equity value</b>; divide by shares.</li>
</ol>

<div class="fx"><div class="formula">Enterprise value = Σ FCF<sub>t</sub> ÷ (1 + r)<sup>t</sup> + TV ÷ (1 + r)<sup>N</sup> &nbsp;&nbsp; TV = FCF<sub>N</sub> × (1 + g) ÷ (r − g)</div><div class="fx-body">
<p><b class="lab">In plain English</b>Shrink each forecast year's free cash flow to today's money and add them (this is the <a href="#/lesson/tvm">present value</a> idea). After the last forecast year <i>N</i>, the business keeps going, so add one lump for all the later years: the <b>terminal value (TV)</b>, computed as a growing perpetuity (payment ÷ (rate − growth)), and shrink it back too.</p>
<dl class="syms"><dt>FCF<sub>t</sub></dt><dd>free cash flow in year <i>t</i></dd><dt>r</dt><dd>discount rate (WACC)</dd><dt>g</dt><dd>long-run growth rate after year <i>N</i> (must be below <i>r</i>)</dd><dt>TV</dt><dd>terminal value at the end of year <i>N</i></dd></dl>
<p class="ex"><b class="lab">Worked example (the widget's numbers)</b>FCF starts at $100m and grows 8% for 5 years, reaching $146.9m in year 5; r = 9%, g = 2.5%. PV of years 1–5 ≈ <b>$486m</b>. TV = 146.9 × 1.025 ÷ 0.065 = $2,317m, which is worth 2,317 ÷ 1.09<sup>5</sup> = <b>$1,506m</b> today. Enterprise value ≈ $1,992m. Subtract net debt of $300m: equity ≈ $1,692m; over 100m shares, <b>$16.92 a share</b>. Notice that 76% of the value is the terminal value.</p>
<p class="hook"><b class="lab">Remember it as</b>"Add up the discounted cash flows you can see, plus one big discounted lump for everything after."</p></div></div>

<h2>The catch</h2>
<ul>
  <li><b>Terminal value dominates:</b> often 60–80% of the total, so small changes in r or g move the answer a lot (the widget shows it).</li>
  <li><b>Consistency:</b> long-run growth cannot exceed the economy's, and growth requires reinvestment. Forecasting high growth without high capex is a common mistake.</li>
  <li><b>Garbage in, garbage out.</b> The value is only as good as the forecast.</li>
</ul>
<p>A good use of DCF is <b>reverse engineering</b>: take the market price and ask what growth and margins it implies. Then judge whether those beliefs are plausible.</p>
`,
  takeaways: [
    'FCFF = after-tax operating profit + depreciation − capex − working capital investment.',
    'Enterprise value = PV of FCF at WACC; equity value = EV − net debt.',
    'Terminal value is most of the answer, so stress-test r and g.'
  ],
  quiz: [
    { q: 'What discount rate is used for free cash flow to the firm?',
      o: ['Cost of equity', 'Risk-free rate', 'WACC', 'Inflation rate'], a: 2, why: 'FCFF belongs to all capital providers, so use the blended cost of capital.' },
    { q: 'How do you go from enterprise value to equity value?',
      o: ['Add net debt', 'Subtract net debt', 'Multiply by beta', 'Subtract taxes'], a: 1, why: 'Debt holders are paid first; what\'s left belongs to shareholders.' },
    { q: 'Why is a DCF so sensitive to the terminal growth rate?',
      o: ['The terminal value is a large share of total value and depends on 1/(r − g)', 'Growth is always negative', 'Discounting is not applied', 'It is not sensitive'], a: 0, why: 'When g approaches r the denominator shrinks and the value balloons.' }
  ],
  related: ['tvm', 'fsa-multiples', 'capstruct']
},

{
  id: 'fsa-multiples', type: 'concept', title: 'Valuation multiples: P/E, EV/EBITDA and what they imply',
  blurb: 'Fast, comparable valuation ratios, and how to see the fundamentals hiding inside them.',
  level: 'Intermediate', min: 14, tags: ['valuation', 'multiples'], widget: 'multiples',
  body: `
<p>Multiples value a company relative to a metric it produces. They are quick and widely used, but they are shorthand for a full valuation model, and their differences across companies usually reflect differences in growth, risk and profitability.</p>

<h2>Common multiples</h2>
<dl class="defs">
  <dt>P/E: price ÷ earnings per share</dt><dd>The most common. Sensitive to leverage and accounting choices; unusable when earnings are negative.</dd>
  <dt>P/B: price ÷ book value per share</dt><dd>Useful for banks and asset-heavy firms. Related to ROE.</dd>
  <dt>EV/EBITDA and EV/Sales</dt><dd><b>Enterprise value</b> = market cap + net debt (+ other claims). Because it captures all providers of capital and the metric is before interest, EV multiples are neutral to capital structure and better for comparing differently financed firms.</dd>
  <dt>PEG: P/E ÷ growth</dt><dd>Attempts to adjust P/E for growth; crude but popular.</dd>
</dl>

<h2>What's inside a multiple</h2>
<p>From the Gordon growth model, the <b>justified forward P/E</b> is:</p>
<div class="fx"><div class="formula">P<sub>0</sub> ÷ E<sub>1</sub> = Payout ratio ÷ (r − g)</div><div class="fx-body">
<p><b class="lab">In plain English</b>Start from the growing-perpetuity value of a stock, P<sub>0</sub> = Dividend<sub>1</sub> ÷ (r − g) (see the <a href="#/lesson/tvm">time value of money</a>). A dividend is just the payout ratio times earnings, so dividing both sides by earnings gives the P/E. A firm deserves a <b>higher P/E</b> if it grows faster (bigger g), pays out more, or is less risky (smaller r).</p>
<dl class="syms"><dt>P<sub>0</sub></dt><dd>price today</dd><dt>E<sub>1</sub></dt><dd>next year's earnings per share</dd><dt>Payout ratio</dt><dd>share of earnings paid as dividends</dd><dt>r, g</dt><dd>required return and long-run growth</dd></dl>
<p class="ex"><b class="lab">Worked example</b>Payout 60%, r = 8%, g = 3.5%: P/E = 0.60 ÷ (0.08 − 0.035) = 0.60 ÷ 0.045 = <b>13.3×</b>. If growth were 5%: 0.60 ÷ 0.03 = 20×, so a 1.5-point change in growth moves the "fair" multiple by half.</p>
<p class="hook"><b class="lab">Remember it as</b>"Fair P/E = payout ÷ (return minus growth)."</p></div></div>
<div class="fx"><div class="formula">Enterprise value = Market cap + Net debt &nbsp;&nbsp; Net debt = Debt − Cash</div><div class="fx-body">
<p><b class="lab">In plain English</b>To buy the whole business you would pay for the shares <em>and</em> take over the debt (less the cash you'd also acquire). EV/EBITDA then compares that to the business's operating earnings before interest, taxes, depreciation and amortization.</p>
<p class="ex"><b class="lab">Worked example</b>Market cap $800m, debt $300m, cash $100m: EV = 800 + (300 − 100) = <b>$1,000m</b>. With EBITDA of $125m, EV/EBITDA = 1,000 ÷ 125 = <b>8×</b>.</p></div></div>
<p>A higher multiple is justified by <em>higher growth</em>, <em>higher payout</em> (for a given growth) or a <em>lower required return</em>. So a stock isn't cheap just because its P/E is low, or expensive just because it's high: ask what the multiple is implicitly assuming.</p>

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
`,
  takeaways: [
    'EV multiples neutralize capital structure; EV = market cap + net debt.',
    'Justified P/E = payout ÷ (r − g): growth, payout and required return drive multiples.',
    'Compare like with like, and normalize cyclical or one-off earnings.'
  ],
  quiz: [
    { q: 'Enterprise value equals...',
      o: ['Market cap + net debt', 'Market cap − net debt', 'Book equity + debt', 'Revenue × margin'], a: 0, why: 'It values the whole business: equity plus net claims of lenders.' },
    { q: 'All else equal, a higher expected growth rate g gives a justified P/E that is...',
      o: ['Lower', 'Higher', 'Unchanged', 'Negative'], a: 1, why: 'A smaller (r − g) denominator raises the multiple.' },
    { q: 'Why is EV/EBITDA better than P/E for comparing firms with different debt levels?',
      o: ['It includes debt in the numerator and is measured before interest', 'It uses sales', 'It ignores earnings', 'It is always lower'], a: 0, why: 'It is unaffected by how the firm splits financing between debt and equity.' }
  ],
  related: ['fsa-fcf', 'fsa-dupont', 'p-shiller']
},

{
  id: 'fsa-credit', type: 'concept', title: 'Credit and distress analysis: coverage, leverage and the Altman Z-score',
  blurb: 'How lenders judge whether a company can repay, and how statement ratios can predict failure.',
  level: 'Intermediate', min: 14, tags: ['credit', 'bankruptcy'], widget: 'altman',
  body: `
<p>Equity analysts ask "how much can this firm earn?" Credit analysts ask "how sure am I to get paid back?", a question dominated by downside outcomes.</p>

<h2>Key credit metrics</h2>
<ul>
  <li><b>Coverage:</b> EBIT/interest or EBITDA/interest. How many times operating earnings cover the interest bill.</li>
  <li><b>Leverage:</b> debt/EBITDA, debt/capital. How large the debt is relative to earning power.</li>
  <li><b>Cash flow to debt:</b> CFO or FCF ÷ total debt. How quickly cash flow could repay debt.</li>
  <li><b>Liquidity:</b> cash and undrawn credit lines against near-term maturities. Many failures are cash crunches, not accounting insolvency.</li>
  <li><b>Covenants:</b> loan conditions (max leverage, min coverage) whose breach can trigger default or renegotiation.</li>
</ul>

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

<h2>Modern approaches</h2>
<p>Today's models (hazard models, machine learning, and market-based measures such as Merton's <em>distance to default</em>, which treats equity as an option on the firm's assets; see <a href="#/lesson/options">options</a>) generally outperform the original Z-score, but the intuition of ratios such as profitability, leverage and liquidity remains.</p>
`,
  takeaways: [
    'Credit analysis focuses on coverage, leverage, cash flow, liquidity and covenants.',
    'Investment grade = BBB−/Baa3 or above.',
    'Altman\'s Z combines five ratios to flag distress; profitability weighs most.'
  ],
  quiz: [
    { q: 'Which is the lowest investment-grade rating (S&P scale)?',
      o: ['AAA', 'A', 'BBB−', 'BB+'], a: 2, why: 'BBB− is the last investment-grade notch; BB+ and below are high yield.' },
    { q: 'In the Altman Z-score, which ratio has the largest coefficient?',
      o: ['Working capital ÷ assets', 'EBIT ÷ assets', 'Sales ÷ assets', 'Market equity ÷ liabilities'], a: 1, why: 'EBIT/total assets is weighted 3.3.' },
    { q: 'Interest coverage of 1.2× indicates...',
      o: ['Very safe', 'Little cushion: a small earnings drop could threaten interest payments', 'No debt', 'Excess cash'], a: 1, why: 'EBIT barely exceeds interest, leaving almost no room for error.' }
  ],
  related: ['p-altman68', 'capstruct', 'fsa-ratios']
}

);
