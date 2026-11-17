# First Paycheck

A free paycheck and budget tool for formerly incarcerated individuals. It shows what a job will actually pay after taxes, helps plan the costs that come first after release, and explains every line of a paystub in plain language. It runs entirely in the browser: no account, no server, and nothing typed into it is sent anywhere or stored unless the person chooses to save it.

Try it at https://olivercrocco.com/first-paycheck/, or download `first-paycheck.html` and open it in any browser. The single file works without the internet, so it can be shared on a USB drive or used on a laptop in a classroom.

It was built for an employment skills course in a Louisiana reentry bridge program for people in their first year after release, and is a companion to the [Reentry Resume Builder](https://github.com/olivercrocco/reentry-resume-builder). The tax figures are for Louisiana; the rest applies anywhere in the United States.

## What it does

- Asks for an hourly wage, hours, optional overtime, how often the person is paid, and tax filing status, each explained in plain words.
- Shows take-home pay per paycheck and per month, with federal income tax, Social Security, Medicare, and Louisiana income tax on separate lines, and how much of each hour worked the person keeps.
- Lists monthly costs in the order they should be paid: required payments first (parole supervision fee, restitution, court costs, child support, drug test and program fees), then basics (housing, food, phone, getting to work, utilities, personal care, work clothes and tools), then other (family, debts, savings). Each can be entered per week, every two weeks, or per month.
- Compares take-home pay with costs and shows what is left over or short. When short, it shows how many hours a week would cover the costs and suggests next steps; when there is money left, it suggests an emergency fund.
- Builds a pretend paystub from the person's own numbers and explains each line, including the abbreviations real paystubs use (FIT, OASDI, FICA-MED, SIT, YTD).
- Reads each step aloud on request, using the device's own voices, which work offline.
- Prints or copies the plan, and saves work to a small file the person controls.

It sets no amounts for supervision fees, restitution, or other required payments, because these vary by person. It tells people to ask their parole officer.

## How the taxes are figured

The tool estimates a year of tax and divides it by the number of paychecks. At the wages most people start at, this is close to what payroll withholds, but it is an estimate and the tool says so.

- Federal income tax: 2026 standard deduction ($16,100 single, $24,150 head of household, $32,200 married filing jointly) and 2026 brackets, from IRS news release IR-2025-103 (Revenue Procedure 2025-32). Head of household brackets above the 12% bracket use the single thresholds, which only matters above about $105,000 a year.
- Social Security: 6.2% on wages up to $184,500. Medicare: 1.45%.
- Louisiana: the flat 3% rate in effect from 2025, after the $12,875 (single) or $25,750 (married filing jointly or head of household) deduction in the Department of Revenue's 2026 withholding formulas. Actual Louisiana withholding may differ by a few dollars a paycheck.
- Not included: credits paid at tax time (Earned Income Tax Credit, Child Tax Credit), the 2026 deductions for overtime and tips, health insurance, and other workplace deductions. The tool points people to free VITA tax help.

All the figures sit in one block, `TAX`, at the top of the first script in `first-paycheck.html`. Update them each January. Another state can swap in its own rate and deduction there.

## Files

- `first-paycheck.html`: the whole tool in one file. This is the source of truth.
- `build-web.mjs`: builds `web/`, a version for sites whose Content-Security-Policy blocks inline scripts. Run `node build-web.mjs` after editing the single file.
- `web/`: the built web version (`index.html`, `core.js`, `ui.js`, and a copy of the single file for download).

## License

MIT. See `LICENSE`.

Built for formerly incarcerated individuals and the programs that support them, by Oliver S. Crocco, Louisiana State University.
