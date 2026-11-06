# InfoBeans Website QA

This project contains JavaScript Playwright tests for the English and German InfoBeans websites.

## Run the workflow

```powershell
npm run discover
npm run generate-tests
npm test
npm run generate-reports
```

`discover` uses Chromium to collect unique same-origin pages, navigation links, headings, language metadata, and image information. `generate-tests` creates independent page, header/footer link, external destination, language-switching, responsive-layout, contact-form validation, and localization comparison tests from `test-data/site-map.json`. All forms are read-only; external links are checked with GET requests and no transactions are submitted. Localization comparisons record review cues and exact English/German text without automatically failing on legitimate translation differences.

The crawl defaults to 500 URLs and one browser page at a time. Set `MAX_PAGES` to change the crawl limit; the URL inventory and final summary report whether the limit left queued URLs unvisited. The Playwright HTML report is written to `reports/html-report/`; URL, scenario, external-link, broken-link, failed-test, console-error, localization, and execution reports are written to `reports/`.

Execution summaries reflect the latest Playwright run only. Generated but unexecuted tests are not counted as passed; localization issue counts remain `null` until localization comparisons have been run.

Run a locale-specific suite with `npm run test:english`, `npm run test:german`, or run localization comparisons with `npm run test:localization`.
