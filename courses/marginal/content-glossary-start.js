/* Glossary and formula-sheet additions for the Start-here module and the ratio and returns formulas added with the rookie-first rewrite.
   Loaded after content-glossary.js and content-formulas.js. The engine sorts the glossary alphabetically. */
(function () {
  window.GLOSSARY = window.GLOSSARY || [];
  window.GLOSSARY.push(
    ['Asset', 'Anything you own that has value or will pay you money in the future.', 'fin-map'],
    ['Intermediary', 'A middleman, such as a bank or fund, that stands between savers and borrowers, pooling money and spreading risk.', 'fin-map'],
    ['Valuation', 'Working out what something is worth today, usually by discounting the cash it will pay in the future.', 'fin-map'],
    ['Bond', 'A loan that can be traded: the issuer promises fixed interest payments and to repay the face value on a set date.', 'fin-instruments'],
    ['Stock (share)', 'A small piece of ownership in a company. Shareholders are paid after lenders if the company fails.', 'fin-instruments'],
    ['Dividend', 'A payment a company makes to its shareholders out of its profits.', 'fin-instruments'],
    ['Index and index fund', 'An index is a published list of securities used to measure a market. An index fund or ETF holds the same securities so you can invest in it.', 'fin-instruments'],
    ['Expense ratio', 'The yearly fee a fund charges, as a percentage of the money invested.', 'fin-instruments'],
    ['Bid, ask and spread', 'The bid is what buyers will pay now, the ask is what sellers want now, and the gap between them (the spread) is the cost of trading immediately.', 'fin-instruments'],
    ['Liquidity', 'How easily and cheaply you can buy or sell without moving the price.', 'fin-instruments'],
    ['Primary and secondary market', 'In the primary market a company sells new securities and receives the money. In the secondary market investors trade existing securities with each other.', 'fin-instruments'],
    ['Percent, decimal and growth factor', 'Divide a percentage by 100 to get a decimal (7% = 0.07). Add 1 to get the growth factor you multiply by (1.07).', 'math-basics'],
    ['Expected value', 'The probability-weighted average of the possible outcomes.', 'math-basics'],
    ['Standard deviation', 'A measure of how far values typically stray from their average; the usual measure of volatility.', 'math-basics'],
    ['Return', 'What you gain from an investment compared with what you put in, usually shown as a percentage.', 'fin-returns'],
    ['Holding-period return', 'The total return over the time you held an investment: (end value − start value + income) ÷ start value.', 'fin-returns'],
    ['Geometric average (annualized return)', 'The constant yearly growth rate that reproduces your actual final result. It describes what happened to your money; the arithmetic average overstates it.', 'fin-returns'],
    ['Nominal and real return', 'Nominal is measured in plain money; real removes inflation, so it measures growth in buying power.', 'fin-returns'],
    ['Compounding', 'Earning interest on your earlier interest as well as on the original amount.', 'tvm'],
    ['Present value and future value', 'Present value is what a future payment is worth today; future value is what money today will grow to later.', 'tvm'],
    ['Annuity and perpetuity', 'An annuity is a level payment for a set number of years; a perpetuity is a level payment forever.', 'tvm'],
    ['Diversification', 'Spreading money across assets that do not all fall together, which removes company-specific risk but not market risk.', 'risk'],
    ['Portfolio', 'Everything you hold, considered together.', 'risk'],
    ['Risk-free rate', 'What a safe asset, such as a short-term government bill, pays.', 'risk'],
    ['Call and put options', 'A call is a right to buy at a fixed strike price; a put is a right to sell. The buyer pays a premium and can lose no more than that.', 'options'],
    ['Straight-line depreciation', 'Spreading (cost − salvage value) equally over an asset\'s useful life.', 'fsa-choices'],
    ['Cash conversion', 'Operating cash flow divided by net income: how much of reported profit arrived as cash.', 'fsa-quality'],
    ['Gross margin', 'Sales minus cost of goods sold, divided by sales.', 'fsa-ratios'],
    ['Paper (research paper)', 'A research article that reports a question, the evidence, and a conclusion. Every paper page starts with the paper in plain words.', 'reading-papers']
  );

  // Formulas added later: inserted right after the "Building blocks" group so they appear near the top of the sheet.
  const add = [
    ['Returns', 'Holding-period return', 'Return = (End − Start + Income) ÷ Start', 'Everything you gained, divided by what you put in.', 'fin-returns'],
    ['Returns', 'Chaining returns', '(1 + r<sub>1</sub>) × (1 + r<sub>2</sub>) − 1', 'Returns multiply: +10% then +20% is +32%, not +30%.', 'fin-returns'],
    ['Returns', 'Annualized (geometric) return', '(End ÷ Start)<sup>1/years</sup> − 1', 'The constant yearly growth that gives the same final result.', 'fin-returns'],
    ['Returns', 'Real return', '1 + real = (1 + nominal) ÷ (1 + inflation)', 'Growth in buying power after removing inflation.', 'fin-returns'],
    ['Returns', 'Fund fee cost', 'Fee = Balance × expense ratio', 'A yearly percentage of your whole balance, whether the fund rises or falls.', 'fin-instruments'],
    ['Financial statements', 'Gross margin', '(Sales − COGS) ÷ Sales', 'The share of each sales dollar left after the direct costs of what was sold.', 'fsa-ratios'],
    ['Financial statements', 'Current ratio', 'Current assets ÷ Current liabilities', 'Can the firm pay this year\'s bills from what it will turn into cash this year?', 'fsa-ratios'],
    ['Financial statements', 'Quick ratio', '(Cash + Receivables) ÷ Current liabilities', 'A stricter liquidity test that leaves out slow-to-sell inventory.', 'fsa-ratios'],
    ['Financial statements', 'Days of inventory', '365 ÷ (COGS ÷ Inventory)', 'How many days of stock the firm holds.', 'fsa-ratios'],
    ['Financial statements', 'Straight-line depreciation', '(Cost − Salvage value) ÷ Useful life', 'The equal yearly charge for wear on equipment.', 'fsa-choices'],
    ['Financial statements', 'Cash conversion', 'CFO ÷ Net income', 'How much of reported profit arrived as cash.', 'fsa-quality'],
    ['Risk, return & asset pricing', 'Three-factor model', 'E[R] = r<sub>f</sub> + β·MKT + s·SMB + h·HML', 'CAPM plus a size premium and a value premium.', 'p-ff93']
  ];
  window.FORMULAS = window.FORMULAS || [];
  const early = add.filter(f => f[0] === 'Returns'), late = add.filter(f => f[0] !== 'Returns');
  const i = window.FORMULAS.findIndex(f => f[0] !== 'Building blocks');
  window.FORMULAS.splice(i < 0 ? window.FORMULAS.length : i, 0, ...early);   // the new "Returns" group sits right after "Building blocks"
  window.FORMULAS.push(...late);                                                // the rest join their existing groups
})();
