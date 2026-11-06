const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const reportsDir = path.join(root, 'reports');
const siteMap = JSON.parse(fs.readFileSync(path.join(root, 'test-data', 'site-map.json'), 'utf8'));
const resultsFile = path.join(reportsDir, 'playwright-results.json');
const scenarioInventoryFile = path.join(reportsDir, 'scenario-inventory.csv');
const resourcePattern = /\.(?:aac|avif|css|docx?|flac|gif|ico|jpe?g|js|m4a|m4v|mp[34]|pdf|png|pptx?|svg|wav|webp|woff2?|xlsx?|xml|zip)$/i;
function isResourceUrl(value) {
  const pathname = new URL(value).pathname;
  return resourcePattern.test(pathname) || /\/wp-content\/uploads\/.*\.html?$/i.test(pathname);
}

function csvEscape(value) {
  return `"${String(value ?? '').replace(/"/g, '""')}"`;
}

function writeCsv(fileName, rows, columns) {
  const contents = [
    columns.map(csvEscape).join(','),
    ...rows.map(row => columns.map(column => csvEscape(row[column])).join(',')),
  ].join('\r\n');
  fs.writeFileSync(path.join(reportsDir, fileName), `${contents}\r\n`);
}

function walkSuites(suites, records = []) {
  for (const suite of suites || []) {
    for (const spec of suite.specs || []) {
      for (const test of spec.tests || []) {
        const result = (test.results || []).at(-1);
        const annotations = [...(spec.annotations || []), ...(test.annotations || []), ...(result?.annotations || [])];
        const annotationData = {};
        for (const annotation of annotations) {
          if (!['test-case', 'actual-result', 'localization-comparison'].includes(annotation.type)) continue;
          try {
            annotationData[annotation.type] = JSON.parse(annotation.description);
          } catch {
            annotationData[annotation.type] = annotation.description;
          }
        }
        records.push({
          title: spec.title,
          file: spec.file,
          project: test.projectName,
          status: result?.status || test.status || 'unknown',
          duration: result?.duration ?? 0,
          error: result?.error?.message || result?.errors?.map(item => item.message).join('\n') || '',
          annotations: annotationData,
        });
      }
    }
    walkSuites(suite.suites, records);
  }
  return records;
}

function resultLocale(record) {
  const id = record.annotations['test-case']?.testCaseId || record.title;
  if (id.startsWith('TC_EN_')) return 'english';
  if (id.startsWith('TC_DE_')) return 'german';
  if (id.startsWith('TC_LOC_')) return 'localization';
  if (id.startsWith('TC_EXT_')) return 'external';
  return 'other';
}

function testCaseId(record) {
  return record.annotations['test-case']?.testCaseId || record.title.split(' | ')[0];
}

function writeExecutionReport(fileName, locale, records) {
  const localeRecords = records.filter(record => resultLocale(record) === locale);
  const counts = {
    total: localeRecords.length,
    passed: localeRecords.filter(record => record.status === 'passed').length,
    failed: localeRecords.filter(record => ['failed', 'timedOut', 'interrupted'].includes(record.status)).length,
    skipped: localeRecords.filter(record => record.status === 'skipped').length,
  };
  fs.writeFileSync(path.join(reportsDir, fileName), `${JSON.stringify({
    generatedAt: new Date().toISOString(),
    locale,
    counts,
    tests: localeRecords.map(record => ({
      id: testCaseId(record),
      title: record.title,
      file: record.file,
      status: record.status,
      actualResult: record.annotations['actual-result'] || null,
      error: record.error,
    })),
  }, null, 2)}\n`);
}

fs.mkdirSync(reportsDir, { recursive: true });

const testRecords = fs.existsSync(resultsFile)
  ? walkSuites(JSON.parse(fs.readFileSync(resultsFile, 'utf8')).suites)
  : [];
const resultById = new Map(testRecords.map(record => [testCaseId(record), record]));
const failedTests = testRecords.filter(record => ['failed', 'timedOut', 'interrupted'].includes(record.status));
const executedTests = testRecords.filter(record => !['skipped', 'unknown'].includes(record.status));
const confirmedBrokenPages = siteMap.pages.filter(page =>
  !isResourceUrl(page.url) &&
  Number.isInteger(page.status) && (page.status < 200 || page.status >= 400));
const destinationStatus = new Map(siteMap.pages.map(page => [page.url, page.status]));
const confirmedBrokenLinks = [];

for (const page of siteMap.pages) {
  for (const link of page.internalLinks || []) {
    const status = destinationStatus.get(link.url);
    if (Number.isInteger(status) && (status < 200 || status >= 400)) {
      confirmedBrokenLinks.push({
        sourceUrl: page.url,
        label: link.label,
        destinationUrl: link.url,
        status,
        issue: `Destination returned HTTP ${status}`,
      });
    }
  }
}

for (const record of testRecords.filter(item => resultLocale(item) === 'external')) {
  const actual = record.annotations['actual-result'];
  const status = actual?.status;
  if (Number.isInteger(status) && (status < 200 || status >= 400)) {
    confirmedBrokenLinks.push({
      sourceUrl: record.annotations['test-case']?.pageUrl || '',
      label: record.title,
      destinationUrl: actual.url || '',
      status,
      issue: `External destination returned HTTP ${status}`,
    });
  } else if (record.status !== 'passed' && record.error) {
    confirmedBrokenLinks.push({
      sourceUrl: record.annotations['test-case']?.pageUrl || '',
      label: record.title,
      destinationUrl: '',
      status: '',
      issue: `External request failed and could not confirm the destination: ${record.error}`,
    });
  }
}

writeCsv('broken-link-report.csv', confirmedBrokenLinks, [
  'sourceUrl', 'label', 'destinationUrl', 'status', 'issue',
]);
writeCsv('external-link-inventory.csv', [...new Map(siteMap.pages
  .flatMap(page => (page.externalLinks || []).map(link => [link.url, link]))
  .filter(([url]) => /^https?:/i.test(url))).values()].map(link => ({
  label: link.label,
  url: link.url,
  validation: 'Read-only HTTP request test generated; see external-link-execution.json.',
})), ['label', 'url', 'validation']);
writeCsv('failed-test-cases.csv', failedTests.map(record => ({
  id: testCaseId(record),
  locale: resultLocale(record),
  title: record.title,
  file: record.file,
  status: record.status,
  pageUrl: record.annotations['test-case']?.pageUrl || '',
  error: record.error,
})), ['id', 'locale', 'title', 'file', 'status', 'pageUrl', 'error']);

const consoleErrorRecords = testRecords.flatMap(record => {
  const actual = record.annotations['actual-result'];
  return Array.isArray(actual?.consoleErrors)
    ? actual.consoleErrors.map(message => ({
      id: testCaseId(record),
      locale: resultLocale(record),
      pageUrl: record.annotations['test-case']?.pageUrl || '',
      message,
    }))
    : [];
});
writeCsv('console-error-report.csv', consoleErrorRecords, ['id', 'locale', 'pageUrl', 'message']);

for (const [fileName, locale] of [
  ['english-execution.json', 'english'],
  ['german-execution.json', 'german'],
  ['localization-execution.json', 'localization'],
  ['external-link-execution.json', 'external'],
]) {
  writeExecutionReport(fileName, locale, testRecords);
}

const localizationTests = testRecords
  .filter(record => resultLocale(record) === 'localization')
  .map(record => record.annotations['localization-comparison'])
  .filter(Boolean);
const localizationIssues = localizationTests.flatMap(test => test.possibleTranslationIssues || []);
fs.writeFileSync(path.join(reportsDir, 'localization-comparison.json'), `${JSON.stringify({
  generatedAt: new Date().toISOString(),
  executionStatus: localizationTests.length ? 'executed' : 'not-executed',
  comparisonCount: localizationTests.length,
  comparisons: localizationTests,
  possibleIssues: localizationIssues,
  note: 'Possible translation issues are review cues only; legitimate German grammar, formatting, and brand terms are not automatically failed.',
}, null, 2)}\n`);

if (fs.existsSync(scenarioInventoryFile)) {
  const lines = fs.readFileSync(scenarioInventoryFile, 'utf8').trimEnd().split(/\r?\n/);
  const headers = lines.shift().split(',').map(value => value.slice(1, -1).replace(/""/g, '"'));
  const parseCsvRow = line => {
    const values = [];
    let value = '';
    let quoted = false;
    for (let index = 0; index < line.length; index += 1) {
      const character = line[index];
      if (character === '"' && line[index + 1] === '"' && quoted) {
        value += '"';
        index += 1;
      } else if (character === '"') {
        quoted = !quoted;
      } else if (character === ',' && !quoted) {
        values.push(value);
        value = '';
      } else {
        value += character;
      }
    }
    values.push(value);
    return Object.fromEntries(headers.map((header, index) => [header, values[index]]));
  };
  const rows = lines.map(parseCsvRow);
  for (const row of rows) {
    const record = resultById.get(row.id);
    if (record) {
      row.status = record.status;
      row.actualResult = JSON.stringify(record.annotations['actual-result'] || record.error || record.status);
    }
  }
  writeCsv('scenario-inventory.csv', rows, headers);
}

const pageErrors = siteMap.failures || [];
const scenarioCount = fs.existsSync(scenarioInventoryFile)
  ? fs.readFileSync(scenarioInventoryFile, 'utf8').trimEnd().split(/\r?\n/).length - 1
  : 0;
const summary = {
  generatedAt: new Date().toISOString(),
  totalPagesDiscovered: siteMap.pages.filter(page => !isResourceUrl(page.url)).length,
  totalResourcesDiscovered: siteMap.pages.filter(page => isResourceUrl(page.url)).length,
  totalUniqueUrls: siteMap.summary.uniqueUrls,
  crawlComplete: siteMap.crawlComplete,
  urlsNotVisited: siteMap.queuedUrlsNotVisited,
  totalScenariosIdentified: scenarioCount,
  totalTestCasesGenerated: scenarioCount,
  totalTestsExecuted: executedTests.length,
  passedTests: testRecords.filter(record => record.status === 'passed').length,
  failedTests: failedTests.length,
  skippedTests: testRecords.filter(record => record.status === 'skipped').length,
  confirmedBrokenLinks: confirmedBrokenLinks.length,
  confirmedBrokenPages: confirmedBrokenPages.length,
  localizationTestsExecuted: localizationTests.length,
  localizationComparisonStatus: localizationTests.length ? 'executed' : 'not-executed',
  englishLocalizationIssues: localizationTests.length ? 0 : null,
  germanLocalizationIssues: localizationTests.length ? localizationIssues.length : null,
  automationIssues: pageErrors.length + failedTests.filter(record => /Timeout|Target closed|net::/i.test(record.error)).length,
  consoleErrors: consoleErrorRecords.length,
  discoveryFailures: pageErrors.map(failure => ({ url: failure.url, error: failure.error })),
  failedTestIds: failedTests.map(testCaseId),
  externalLinkTests: testRecords.filter(record => resultLocale(record) === 'external').length,
  failedExternalLinkTests: testRecords.filter(record => resultLocale(record) === 'external' && record.status !== 'passed').length,
  externalLinksAreInventoryOnly: false,
};
fs.writeFileSync(path.join(reportsDir, 'final-summary.json'), `${JSON.stringify(summary, null, 2)}\n`);
console.log(JSON.stringify(summary, null, 2));
