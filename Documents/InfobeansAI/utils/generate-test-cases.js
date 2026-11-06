const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');

const root = path.resolve(__dirname, '..');
const siteMapPath = path.join(root, 'test-data', 'site-map.json');
const siteMap = JSON.parse(fs.readFileSync(siteMapPath, 'utf8'));
const reportsDir = path.join(root, 'reports');
const inventory = [];
const allCases = [];
const unmappedLocalizationPages = [];
const allSiteRecords = (siteMap.pages || []).map(page => {
  const language = (page.language || '').toLowerCase();
  const locale = language.startsWith('de')
    ? 'german'
    : language.startsWith('en')
      ? 'english'
      : new URL(page.url).pathname.startsWith('/de')
        ? 'german'
        : 'english';
  return { ...page, locale };
});
const resourcePattern = /\.(?:aac|avif|css|docx?|flac|gif|ico|jpe?g|js|m4a|m4v|mp[34]|pdf|png|pptx?|svg|wav|webp|woff2?|xlsx?|xml|zip)$/i;
function isResourceUrl(value) {
  const pathname = new URL(value).pathname;
  return resourcePattern.test(pathname) || /\/wp-content\/uploads\/.*\.html?$/i.test(pathname);
}
const resourcePages = allSiteRecords.filter(page => isResourceUrl(page.url));
const allPages = allSiteRecords.filter(page => !isResourceUrl(page.url));

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

function localeRoot(locale) {
  return locale === 'german' ? 'tests/german' : 'tests/english';
}

function localePrefix(locale) {
  return locale === 'german' ? 'DE' : 'EN';
}

function readablePath(pageUrl) {
  const parsed = new URL(pageUrl);
  const pathName = parsed.pathname.replace(/^\/de\/?/, '').replace(/^\/|\/$/g, '');
  const query = parsed.searchParams.get('wow_story');
  return query ? `WOW story ${query}` : pathName ? pathName.replace(/[-/]+/g, ' ') : 'Homepage';
}

function fileSlug(pageUrl) {
  const parsed = new URL(pageUrl);
  const pathName = parsed.pathname.replace(/^\/de\/?/, '').replace(/^\/|\/$/g, '');
  const query = [...parsed.searchParams.entries()]
    .map(([key, value]) => `${key}-${value}`)
    .join('-');
  const value = [pathName || 'homepage', query].filter(Boolean).join('-');
  const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'page';
  const suffix = createHash('sha1').update(pageUrl).digest('hex').slice(0, 8);
  return `${slug.slice(0, 80)}-${suffix}`;
}

function caseInfo({ id, locale, scenario, description, preconditions, steps, expected, pageUrl }) {
  return {
    id,
    locale,
    scenario,
    description,
    preconditions,
    steps: steps.join(' | '),
    expectedResult: expected,
    actualResult: 'Recorded in Playwright execution results after test execution.',
    status: 'Not executed',
    pageUrl,
  };
}

function annotationCode(info) {
  const annotations = {
    testCaseId: info.id,
    scenario: info.scenario,
    description: info.description,
    preconditions: info.preconditions,
    steps: info.steps.split(' | '),
    expectedResult: info.expectedResult,
    pageUrl: info.pageUrl,
  };
  return `  testInfo.annotations.push({ type: 'test-case', description: ${JSON.stringify(JSON.stringify(annotations))} });`;
}

function pageSpec(pageData, locale, caseId, isHome) {
  const expectedLocale = locale === 'german' ? 'de' : 'en';
  const normalizeLinkUrl = value => {
    const url = new URL(value);
    url.hash = '';
    if (url.pathname !== '/') url.pathname = url.pathname.replace(/\/+$/, '');
    return url.href;
  };
  const sharedLinkUrls = new Set([
    ...(pageData.headerLinks || []),
    ...(pageData.footerLinks || []),
  ].filter(link => link.internal).map(link => normalizeLinkUrl(link.url)));
  const stablePageInternalLinks = (pageData.internalLinks || []).filter(link => {
    if (!link.label.trim() || link.label.startsWith('hreflang:')) return false;
    const url = new URL(link.url);
    return !sharedLinkUrls.has(normalizeLinkUrl(link.url))
      && !url.searchParams.has('wow_story')
      && !url.pathname.startsWith('/true-stories/');
  });
  const scenario = `Verify ${locale} page availability and core content: ${readablePath(pageData.url)}`;
  const steps = [
    `Navigate to ${pageData.url}`,
    'Verify the response status, final URL, title, meta description, headings, body content, and document language',
    'Verify the shared header, main content, and footer are present',
    'Check for uncaught JavaScript page errors',
  ];
  const info = caseInfo({
    id: caseId,
    locale,
    scenario,
    description: `Validate the ${locale} page is available and presents localized core content.`,
    preconditions: 'The public website is reachable; no authentication is required.',
    steps,
    expected: 'The page returns a successful response, stays on its discovered URL, has a title, meta description, non-empty headings and body content, uses the expected language, and renders shared page regions without uncaught JavaScript errors.',
    pageUrl: pageData.url,
  });
  inventory.push(info);
  allCases.push(info);

  const imageId = caseId.replace(/(\d+)$/, (_, number) => String(Number(number) + 1).padStart(number.length, '0'));
  const imageInfo = caseInfo({
    id: imageId,
    locale,
    scenario: `Verify images and alternative text: ${readablePath(pageData.url)}`,
    description: 'Check image alternative text and whether images visible in the initial viewport load.',
    preconditions: 'The public page is reachable.',
    steps: [
      `Navigate to ${pageData.url}`,
      'Check that every image has an alt attribute',
      'Check that each image visible in the initial viewport has loaded',
    ],
    expected: 'Every image has an alt attribute (empty alt is permitted for decorative images), and visible images load successfully.',
    pageUrl: pageData.url,
  });
  inventory.push(imageInfo);
  allCases.push(imageInfo);

  const internalLinksId = caseId.replace(/(\d+)$/, (_, number) => String(Number(number) + 2).padStart(number.length, '0'));
  const internalLinksInfo = caseInfo({
    id: internalLinksId,
    locale,
    scenario: isHome
      ? `Verify homepage internal navigation links: ${readablePath(pageData.url)}`
      : `Verify internal links and labels: ${readablePath(pageData.url)}`,
    description: isHome
      ? 'Check that the current homepage exposes internal links with valid destinations; homepage story and campaign links can change dynamically.'
      : 'Check that discovered main-content links are present with their recorded label and destination; shared navigation and rotating story links are validated separately or against the current page.',
    preconditions: 'The public page is reachable.',
    steps: [
      `Navigate to ${pageData.url}`,
      isHome
        ? 'Verify current internal links have destinations'
        : 'Verify stable main-content links and current internal links have destinations',
    ],
    expected: isHome
      ? 'The homepage exposes at least one internal link and each internal link has a destination.'
      : 'Stable main-content links remain present, and current main-content links have destinations.',
    pageUrl: pageData.url,
  });
  inventory.push(internalLinksInfo);
  allCases.push(internalLinksInfo);

  const modulePrefix = isHome ? '../../' : '../../../';
  return `const { test, expect } = require('@playwright/test');
const { TopicPage } = require('${modulePrefix}pages/TopicPage');
const { normalizeUrl } = require('${modulePrefix}utils/url');
const pageData = ${JSON.stringify({
    url: pageData.url,
    locale,
    title: pageData.title,
    headings: pageData.headings,
    internalLinks: stablePageInternalLinks,
  })};

test('${caseId} | ${scenario.replace(/'/g, "\\'")}', async ({ page }, testInfo) => {
  ${annotationCode(info)}
  const pageErrors = [];
  const consoleErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  page.on('console', message => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  const topicPage = new TopicPage(page, pageData);
  const response = await topicPage.goto(pageData.url);
  const heading = page.getByRole('heading', { level: 1 }).first();
  const pageSnapshot = await page.evaluate(() => {
    const main = document.querySelector('main');
    const headingText = main?.querySelector('h1')?.innerText.trim() || '';
    return {
      title: document.title,
      metaDescription: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
      mainHeading: headingText,
      headings: [...(main?.querySelectorAll('h1,h2,h3,h4,h5,h6') || [])]
        .map(item => item.innerText.trim())
        .filter(Boolean),
      mainText: (main?.innerText || '').trim(),
      language: document.documentElement.lang,
    };
  });
  const headingText = pageSnapshot.mainHeading;
  const mainText = pageSnapshot.mainText;
  const metaDescription = pageSnapshot.metaDescription;
  const headings = pageSnapshot.headings;
  const actualResult = {
    status: response ? response.status() : null,
    finalUrl: page.url(),
    title: pageSnapshot.title,
    metaDescription,
    mainHeading: headingText,
    headingCount: headings.length,
    bodyTextLength: mainText.length,
    language: pageSnapshot.language,
    pageErrors,
    consoleErrors,
  };
  testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify(actualResult) });

  expect(response, 'A document response should be returned').not.toBeNull();
  expect(response.status(), 'The page should not return a 4xx or 5xx response').toBeLessThan(400);
  expect(normalizeUrl(page.url())).toBe(normalizeUrl(pageData.url));
  await expect(page).toHaveTitle(/\\S/);
  await expect(heading).toBeVisible();
  expect(headingText).not.toBe('');
  expect(metaDescription?.trim().length || 0).toBeGreaterThan(0);
  expect(mainText.length).toBeGreaterThan(0);
  expect(headings.every(text => text.trim().length > 0)).toBe(true);
  await expect(page.locator('html')).toHaveAttribute('lang', /^${expectedLocale}/i);
  await expect(topicPage.header).toBeVisible();
  await expect(topicPage.main).toBeVisible();
  await expect(topicPage.footer).toBeVisible();
  if (pageData.title) expect(actualResult.title).toBe(pageData.title);
  const expectedHeading = pageData.headings.find(item => item.level === 'h1')?.text;
  if (!${isHome} && expectedHeading) expect(headingText).toBe(expectedHeading);
  expect(pageErrors, 'The page should not emit uncaught JavaScript errors').toEqual([]);
});

test('${imageId} | Verify page images and alternative text: ${readablePath(pageData.url)}', async ({ page }, testInfo) => {
  ${annotationCode(imageInfo)}
  const topicPage = new TopicPage(page, pageData);
  await topicPage.goto(pageData.url);
  await page.waitForFunction(() => [...document.images].filter(image => {
    const rect = image.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0
      && rect.bottom > 0 && rect.right > 0
      && rect.top < window.innerHeight && rect.left < window.innerWidth;
  }).every(image => image.complete));
  let imageIssues;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      imageIssues = await page.locator('img').evaluateAll(images => images.flatMap(image => {
        const rect = image.getBoundingClientRect();
        const visible = rect.width > 0 && rect.height > 0
          && rect.bottom > 0 && rect.right > 0
          && rect.top < window.innerHeight && rect.left < window.innerWidth;
        const issues = [];
        if (!image.hasAttribute('alt')) issues.push('missing-alt');
        if (visible && (!image.complete || image.naturalWidth === 0)) issues.push('visible-image-not-loaded');
        return issues.length ? [{ src: image.currentSrc || image.src, issues }] : [];
      }));
      break;
    } catch (error) {
      if (!(error instanceof Error)
        || !error.message.includes('Execution context was destroyed')
        || attempt === 2) throw error;
      await page.waitForLoadState('domcontentloaded');
    }
  }
  testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ imageIssues }) });
  expect(imageIssues).toEqual([]);
});

test('${internalLinksId} | ${internalLinksInfo.scenario.replace(/'/g, "\\'")}', async ({ page }, testInfo) => {
  ${annotationCode(internalLinksInfo)}
  const topicPage = new TopicPage(page, pageData);
  await topicPage.goto(pageData.url);
  let actualLinks;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      actualLinks = await page.locator(${JSON.stringify(isHome ? 'a[href]' : 'main a[href]')})
        .evaluateAll(anchors => anchors.map(anchor => ({
        url: anchor.href,
        href: anchor.getAttribute('href'),
        label: (anchor.innerText || anchor.textContent || anchor.getAttribute('aria-label') || anchor.title || '')
          .trim().replace(/\\s+/g, ' ').slice(0, 160),
      })));
      break;
    } catch (error) {
      if (!(error instanceof Error)
        || !error.message.includes('Execution context was destroyed')
        || attempt === 2) throw error;
      await page.waitForLoadState('domcontentloaded');
    }
  }
  ${isHome ? `const internalLinks = actualLinks.filter(actual =>
    new URL(actual.url).origin === new URL(pageData.url).origin);
  const invalidLinks = internalLinks.filter(actual => !actual.href || !actual.href.trim());
  testInfo.annotations.push({
    type: 'actual-result',
    description: JSON.stringify({ internalLinkCount: internalLinks.length, invalidLinks }),
  });
  expect(internalLinks.length).toBeGreaterThan(0);
  expect(invalidLinks).toEqual([]);` : `const missingLinks = pageData.internalLinks.filter(expected => !actualLinks.some(actual =>
    normalizeUrl(actual.url) === normalizeUrl(expected.url)
      && (!expected.label || actual.label === expected.label)));
  const internalLinks = actualLinks.filter(actual =>
    new URL(actual.url).origin === new URL(pageData.url).origin);
  const invalidLinks = actualLinks.filter(actual => !actual.href || !actual.href.trim());
  testInfo.annotations.push({
    type: 'actual-result',
    description: JSON.stringify({
      expectedStableLinkCount: pageData.internalLinks.length,
      currentInternalLinkCount: internalLinks.length,
      invalidLinks,
      missingLinks,
    }),
  });
  expect(internalLinks.length).toBeGreaterThan(0);
  expect(invalidLinks).toEqual([]);
  expect(missingLinks).toEqual([]);`}
});
`;
}

function linkSpec(link, locale, caseId, area, sourceUrl) {
  const label = link.label || new URL(link.url).pathname || link.url;
  const scenario = `Verify ${area} link destination: ${label}`;
  const info = caseInfo({
    id: caseId,
    locale,
    scenario,
    description: `Verify this ${area.toLowerCase()} link points to a reachable internal page.`,
    preconditions: 'The source page is reachable; navigation is read-only.',
    steps: [
      `Open the source page ${sourceUrl}`,
      `Verify the ${area.toLowerCase()} contains a link to ${link.url}`,
      'Request the destination and verify it returns a successful response',
    ],
    expected: 'The source link is present with the expected destination and the destination page returns a successful response.',
    pageUrl: link.url,
  });
  inventory.push(info);
  allCases.push(info);

  return `const { test, expect } = require('@playwright/test');
const { normalizeUrl } = require('../../../utils/url');
const sourceUrl = ${JSON.stringify(sourceUrl)};
const destinationUrl = ${JSON.stringify(link.url)};
const expectedLabel = ${JSON.stringify(link.label)};

test('${caseId} | ${scenario.replace(/'/g, "\\'")}', async ({ page }, testInfo) => {
  ${annotationCode(info)}
  await page.goto(sourceUrl, { waitUntil: 'domcontentloaded' });
  const links = await page.locator('${area === 'Header' ? 'header a[href], [role="banner"] a[href]' : 'footer a[href], [role="contentinfo"] a[href]'}')
    .evaluateAll(anchors => anchors.map(anchor => {
      const url = new URL(anchor.href);
      url.hash = '';
      if (url.pathname !== '/') url.pathname = url.pathname.replace(/\\/+$/, '');
      return {
        url: url.href,
        label: (anchor.innerText || anchor.textContent || anchor.getAttribute('aria-label') || anchor.title || '')
          .trim().replace(/\\s+/g, ' ').slice(0, 160),
      };
    }));
  expect(links.some(link => link.url === destinationUrl), 'The source region should contain the discovered destination').toBe(true);
  if (expectedLabel) {
    expect(links.some(link => link.url === destinationUrl && link.label === expectedLabel), 'The source link label should match the inventory').toBe(true);
  }
  const response = await page.goto(destinationUrl, { waitUntil: 'domcontentloaded' });
  testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({
    status: response ? response.status() : null,
    destinationUrl,
    finalUrl: page.url(),
    expectedLabel,
  }) });
  expect(response, 'A response should be returned for the destination').not.toBeNull();
  expect(response.status()).toBeLessThan(400);
  expect(normalizeUrl(page.url())).toBe(normalizeUrl(destinationUrl));
});
`;
}

function homeFunctionalSpec(pageData, locale, caseId) {
  const scenario = `Verify ${locale} homepage contact CTA is available without submitting a form`;
  const info = caseInfo({
    id: caseId,
    locale,
    scenario,
    description: 'Verify the Expona contact prompt is present without sending a message.',
    preconditions: 'The public homepage is reachable; no form is submitted.',
    steps: [
      `Navigate to ${pageData.url}`,
      'Verify the Expona textbox and button are visible',
      'Do not submit or send a message',
    ],
    expected: 'The homepage exposes its localized Expona textbox and action button; no message is sent.',
    pageUrl: pageData.url,
  });
  inventory.push(info);
  allCases.push(info);

  const inputName = locale === 'german'
    ? 'Fragen Sie Expona nach unseren Dienstleistungen, Fallstudien oder Updates'
    : 'Ask Expona about our services, case studies, or updates';
  const buttonName = locale === 'german' ? 'Expona fragen' : 'Ask Expona';
  return `const { test, expect } = require('@playwright/test');
const { HomePage } = require('../../pages/HomePage');

test('${caseId} | ${scenario}', async ({ page }, testInfo) => {
  ${annotationCode(info)}
  const homePage = new HomePage(page);
  await homePage.goto(${JSON.stringify(pageData.url)});
  await expect(page.getByRole('textbox', { name: ${JSON.stringify(inputName)} })).toBeVisible();
  await expect(page.getByRole('button', { name: ${JSON.stringify(buttonName)} })).toBeVisible();
  testInfo.annotations.push({ type: 'actual-result', description: 'Localized Expona input and button visible; no form was submitted.' });
});
`;
}

function regionSpec(pageData, locale, area) {
  const isHeader = area === 'Header';
  const regionRole = isHeader ? 'banner' : 'contentinfo';
  const regionName = area.toLowerCase();
  const prefix = localePrefix(locale);
  const info = caseInfo({
    id: `TC_${prefix}_${area.toUpperCase()}_STRUCTURE_0001`,
    locale,
    scenario: `Verify ${locale} ${regionName} links and destinations`,
    description: `Check the ${regionName} renders links with destinations.`,
    preconditions: 'The public page is reachable.',
    steps: [
      `Navigate to ${pageData.url}`,
      `Verify the ${regionName} is visible and its links have destinations`,
    ],
    expected: `The ${regionName} is visible and its links have destinations.`,
    pageUrl: pageData.url,
  });
  inventory.push(info);
  allCases.push(info);

  return `const { test, expect } = require('@playwright/test');
const { BasePage } = require('../../pages/BasePage');

test('${info.id} | ${info.scenario}', async ({ page }, testInfo) => {
  ${annotationCode(info)}
  const basePage = new BasePage(page);
  await basePage.goto(${JSON.stringify(pageData.url)});
  const region = page.getByRole('${regionRole}');
  await expect(region).toBeVisible();
  ${isHeader ? "await expect(region.locator('a[href]').first()).toBeVisible();" : ''}
  let hrefs;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      hrefs = await region.locator('a[href]').evaluateAll(anchors => anchors.map(anchor => anchor.href));
      break;
    } catch (error) {
      if (!(error instanceof Error)
        || !error.message.includes('Execution context was destroyed')
        || attempt === 2) throw error;
      await page.waitForLoadState('domcontentloaded');
    }
  }
  expect(hrefs.length).toBeGreaterThan(0);
  expect(hrefs.every(href => Boolean(href))).toBe(true);
  testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ links: hrefs.length, regionVisible: true }) });
});
`;
}

function headerDropdownsSpec(pageData, locale) {
  const caseId = `TC_${localePrefix(locale)}_HEADER_DROPDOWNS_0001`;
  const info = caseInfo({
    id: caseId,
    locale,
    scenario: `Verify ${locale} header dropdown menus`,
    description: 'Open each expandable header navigation menu and verify its submenu links are exposed.',
    preconditions: 'The public page is reachable; no form is submitted.',
    steps: [
      `Navigate to ${pageData.url}`,
      'Hover each expandable navigation menu',
      'Verify every menu exposes submenu links with destinations',
    ],
    expected: 'Each expandable header menu opens and exposes submenu links with destinations.',
    pageUrl: pageData.url,
  });
  inventory.push(info);
  allCases.push(info);
  return `const { test, expect } = require('@playwright/test');
const { BasePage } = require('../../pages/BasePage');

test('${caseId} | ${info.scenario}', async ({ page }, testInfo) => {
  ${annotationCode(info)}
  const basePage = new BasePage(page);
  await basePage.goto(${JSON.stringify(pageData.url)});
  const header = page.getByRole('banner');
  await expect(header).toBeVisible();
  const dropdowns = header.locator('.nav-item.dropdown-trigger');
  const dropdownCount = await dropdowns.count();
  expect(dropdownCount).toBeGreaterThan(0);
  const menuResults = [];
  for (let index = 0; index < dropdownCount; index += 1) {
    const dropdown = dropdowns.nth(index);
    await dropdown.locator('a.nav-link').hover();
    const submenuLinks = dropdown.locator('a.submenu-link');
    const linkCount = await submenuLinks.count();
    expect(linkCount).toBeGreaterThan(0);
    await expect(submenuLinks.first()).toBeVisible();
    const destinations = await submenuLinks.evaluateAll(anchors => anchors.map(anchor => anchor.href));
    expect(destinations.every(Boolean)).toBe(true);
    menuResults.push({ index, linkCount, destinations });
  }
  testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify(menuResults) });
});
`;
}

function responsiveSpec(pageData, locale) {
  const caseId = `TC_${localePrefix(locale)}_RESPONSIVE_0001`;
  const info = caseInfo({
    id: caseId,
    locale,
    scenario: `Verify ${locale} homepage responsive layout`,
    description: 'Check the homepage at common mobile, tablet, and desktop viewport widths.',
    preconditions: 'The public homepage is reachable.',
    steps: [
      `Navigate to ${pageData.url}`,
      'Set viewport widths to 375, 768, and 1280 CSS pixels',
      'Check for horizontal page overflow and verify the main heading remains visible',
    ],
    expected: 'The page fits each viewport without horizontal overflow and keeps its main heading visible.',
    pageUrl: pageData.url,
  });
  inventory.push(info);
  allCases.push(info);
  return `const { test, expect } = require('@playwright/test');
const { BasePage } = require('../../pages/BasePage');

test('${caseId} | ${info.scenario}', async ({ page }, testInfo) => {
  ${annotationCode(info)}
  const basePage = new BasePage(page);
  await basePage.goto(${JSON.stringify(pageData.url)});
  const widths = [375, 768, 1280];
  const results = [];
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    await page.waitForLoadState('domcontentloaded');
    let dimensions;
    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        dimensions = await page.evaluate(() => ({
          viewportWidth: document.documentElement.clientWidth,
          contentWidth: document.documentElement.scrollWidth,
        }));
        break;
      } catch (error) {
        if (!(error instanceof Error)
          || !error.message.includes('Execution context was destroyed')
          || attempt === 2) throw error;
        await page.waitForLoadState('domcontentloaded');
      }
    }
    results.push({ width, ...dimensions });
    expect(dimensions.contentWidth).toBeLessThanOrEqual(dimensions.viewportWidth + 1);
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
  }
  testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify(results) });
});
`;
}

function languageSwitchSpec(pageData, locale) {
  const caseId = `TC_${localePrefix(locale)}_LANGUAGE_SWITCH_0001`;
  const targetLanguage = locale === 'german' ? 'EN' : 'DE';
  const expectedPrefix = locale === 'german' ? 'en' : 'de';
  const targetLocale = locale === 'german' ? 'en' : 'de';
  const expectedUrl = pageData.languageAlternates
    ?.find(alternate => alternate.language.toLowerCase().startsWith(targetLocale))
    ?.url || (locale === 'german' ? 'https://infobeans.ai/' : 'https://infobeans.ai/de/');
  const info = caseInfo({
    id: caseId,
    locale,
    scenario: `Switch from ${locale} to ${targetLanguage === 'DE' ? 'German' : 'English'}`,
    description: 'Use the visible language selector to navigate to the other locale.',
    preconditions: 'The current locale homepage is reachable; this test does not submit any form.',
    steps: [
      `Open the ${locale} homepage`,
      `Open the language selector and choose ${targetLanguage}`,
      'Verify the destination path and document language',
    ],
    expected: `The language selector navigates to the other locale, with a URL matching ${expectedUrl} and the correct html lang value.`,
    pageUrl: pageData.url,
  });
  inventory.push(info);
  allCases.push(info);
  return `const { test, expect } = require('@playwright/test');
const { BasePage } = require('../../pages/BasePage');
const { normalizeUrl } = require('../../utils/url');
const { HeaderPage } = require('../../pages/HeaderPage');

test('${caseId} | ${info.scenario}', async ({ page }, testInfo) => {
  ${annotationCode(info)}
  const basePage = new BasePage(page);
  await basePage.goto(${JSON.stringify(pageData.url)});
  const header = new HeaderPage(page);
  await header.openLanguageSelector();
  await expect(header.languageButton).toHaveAttribute('aria-expanded', 'true');
  await header.selectLanguage('${targetLanguage}');
  await expect(page.locator('html')).toHaveAttribute('lang', /^${expectedPrefix}/i);
  const actual = { url: page.url(), language: await page.locator('html').getAttribute('lang') };
  testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify(actual) });
  expect(normalizeUrl(actual.url)).toBe(normalizeUrl(${JSON.stringify(expectedUrl)}));
});
`;
}

function contactFormSpec(pageData, locale) {
  const caseId = `TC_${localePrefix(locale)}_FORM_VALIDATION_0001`;
  const info = caseInfo({
    id: caseId,
    locale,
    scenario: `Verify ${locale} contact email input validation without submitting`,
    description: 'Enter an invalid email in a contact-page email field and verify native input validation.',
    preconditions: 'The public contact page is reachable; this test does not submit any form.',
    steps: [
      `Open the contact page ${pageData.url}`,
      'Enter a malformed email address in an email input',
      'Verify the browser reports a type-mismatch validation state',
      'Do not submit the form',
    ],
    expected: 'An email field is available and marks malformed email input invalid; no data is submitted.',
    pageUrl: pageData.url,
  });
  inventory.push(info);
  allCases.push(info);
  return `const { test, expect } = require('@playwright/test');
const { ContactPage } = require('../../pages/ContactPage');

test('${caseId} | ${info.scenario}', async ({ page }, testInfo) => {
  ${annotationCode(info)}
  const contactPage = new ContactPage(page);
  await contactPage.goto(${JSON.stringify(pageData.url)});
  await expect(contactPage.emailInputs.first()).toBeVisible();
  await contactPage.emailInputs.first().fill('invalid-email');
  const typeMismatch = await contactPage.emailInputs.first().evaluate(input => input.validity.typeMismatch);
  testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ emailFieldCount: await contactPage.emailInputs.count(), typeMismatch, submitted: false }) });
  expect(typeMismatch).toBe(true);
});
`;
}

function writeLocaleTests(locale) {
  const pages = allPages.filter(page => page.locale === locale);
  const localeDir = path.join(root, localeRoot(locale));
  const pagesDir = path.join(localeDir, 'pages');
  fs.mkdirSync(pagesDir, { recursive: true });
  const homePage = pages.find(page => {
    const parsedUrl = new URL(page.url);
    return !parsedUrl.search
      && parsedUrl.pathname.replace(/\/$/, '') === (locale === 'german' ? '/de' : '');
  });
  const headerPage = pages.find(page => {
    const parsedUrl = new URL(page.url);
    return !parsedUrl.search
      && parsedUrl.pathname.replace(/\/$/, '') !== (locale === 'german' ? '/de' : '');
  }) || homePage;

  let pageCaseNumber = 1;
  for (const pageData of pages) {
    const parsedUrl = new URL(pageData.url);
    const isHome = !parsedUrl.search
      && parsedUrl.pathname.replace(/\/$/, '') === (locale === 'german' ? '/de' : '');
    const caseId = `TC_${localePrefix(locale)}_PAGE_${String(pageCaseNumber).padStart(4, '0')}`;
    const filename = isHome
      ? path.join(localeDir, 'homepage.spec.js')
      : path.join(pagesDir, `page-${fileSlug(pageData.url)}.spec.js`);
    fs.writeFileSync(filename, pageSpec(pageData, locale, caseId, isHome));
    pageCaseNumber += 3;

    if (isHome) {
      const functionalId = `TC_${localePrefix(locale)}_HOME_FUNCTIONAL_0001`;
      fs.writeFileSync(path.join(localeDir, 'homepage-functional.spec.js'), homeFunctionalSpec(pageData, locale, functionalId));
      fs.writeFileSync(path.join(localeDir, 'header.spec.js'), regionSpec(headerPage, locale, 'Header'));
      fs.writeFileSync(path.join(localeDir, 'header-dropdowns.spec.js'), headerDropdownsSpec(headerPage, locale));
      fs.writeFileSync(path.join(localeDir, 'footer.spec.js'), regionSpec(pageData, locale, 'Footer'));
      fs.writeFileSync(path.join(localeDir, 'responsive.spec.js'), responsiveSpec(pageData, locale));
      fs.writeFileSync(path.join(localeDir, 'language-switch.spec.js'), languageSwitchSpec(headerPage, locale));
    }
    if (/contact-us|\/kontakt\/?$/i.test(new URL(pageData.url).pathname)) {
      fs.writeFileSync(path.join(localeDir, 'contact-form.spec.js'), contactFormSpec(pageData, locale));
    }
  }

  if (!homePage) return;

  for (const [area, key] of [['Header', 'headerLinks'], ['Footer', 'footerLinks']]) {
    const uniqueLinks = [...new Map((homePage[key] || [])
      .filter(link => link.internal && link.url !== homePage.url)
      .map(link => [link.url, link])).values()];
    const areaDir = path.join(localeDir, area.toLowerCase());
    fs.mkdirSync(areaDir, { recursive: true });
    uniqueLinks.forEach((link, index) => {
      const caseId = `TC_${localePrefix(locale)}_${area.toUpperCase()}_${String(index + 1).padStart(4, '0')}`;
      const slug = fileSlug(link.url);
      fs.writeFileSync(
        path.join(areaDir, `${area.toLowerCase()}-link-${slug}.spec.js`),
        linkSpec(link, locale, caseId, area, homePage.url),
      );
    });

  }
}

function localizationPairs() {
  const english = allPages.filter(page => page.locale === 'english');
  const germanPages = allPages.filter(page => page.locale === 'german');
  const germanByUrl = new Map(germanPages.map(page => [page.url, page]));
  const pairs = new Map();

  for (const page of english) {
    for (const alternate of page.languageAlternates || []) {
      if (alternate.language.toLowerCase().startsWith('de')) {
        const target = germanByUrl.get(alternate.url.replace(/\/$/, '')) || germanByUrl.get(alternate.url);
        if (target) pairs.set(page.url, { english: page, german: target });
      }
    }
    const englishPath = new URL(page.url).pathname.replace(/\/$/, '');
    const assumedGermanPath = `/de${englishPath}`;
    for (const [url, germanPage] of germanByUrl) {
      if (new URL(url).pathname.replace(/\/$/, '') === assumedGermanPath) {
        pairs.set(page.url, { english: page, german: germanPage });
      }
    }
  }

  const englishHome = english.find(page => {
    const url = new URL(page.url);
    return !url.search && url.pathname === '/';
  });
  const germanHome = germanPages.find(page => {
    const url = new URL(page.url);
    return !url.search && url.pathname.replace(/\/$/, '') === '/de';
  });
  if (englishHome && germanHome) {
    pairs.set(englishHome.url, { english: englishHome, german: germanHome });
    for (const area of ['headerLinks', 'footerLinks']) {
      const englishLinks = englishHome[area] || [];
      const germanLinks = germanHome[area] || [];
      if (englishLinks.length !== germanLinks.length) {
        unmappedLocalizationPages.push({
          englishUrl: englishHome.url,
          germanUrl: germanHome.url,
          issue: `${area} link counts differ (${englishLinks.length} English, ${germanLinks.length} German); page mapping needs review.`,
        });
      }
    }
  }

  if (englishHome && germanHome) pairs.set(englishHome.url, { english: englishHome, german: germanHome });
  for (const page of english) {
    if (!pairs.has(page.url)) {
      unmappedLocalizationPages.push({
        englishUrl: page.url,
        germanUrl: '',
        issue: 'No German page was mapped through hreflang or a matching localized path; manual review is required.',
      });
    }
  }
  return [...pairs.values()];
}

function createLocalizationTests() {
  const pairs = localizationPairs();
  const localizationDir = path.join(root, 'tests', 'localization');
  fs.mkdirSync(localizationDir, { recursive: true });
  const cases = pairs.map((pair, index) => {
    const id = `TC_LOC_${String(index + 1).padStart(4, '0')}`;
    const info = caseInfo({
      id,
      locale: 'localization',
      scenario: `Compare localized content for ${readablePath(pair.english.url)}`,
      description: 'Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.',
      preconditions: 'Both locale-specific URLs are reachable.',
      steps: [
        `Open English page ${pair.english.url}`,
        'Capture title, H1, language, and representative body text',
        `Open German page ${pair.german.url}`,
        'Capture equivalent German content and verify the document language',
      ],
      expected: 'Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.',
      pageUrl: `${pair.english.url} | ${pair.german.url}`,
    });
    inventory.push(info);
    allCases.push(info);

    return `  test('${id} | Compare localized content: ${readablePath(pair.english.url).replace(/'/g, "\\'")}', async ({ page }, testInfo) => {
    ${annotationCode(info)}
    await page.goto(${JSON.stringify(pair.english.url)}, { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\\b\\d+(?:[.,]\\d+)*%?\\b/g) || []))],
    }));
    await page.goto(${JSON.stringify(pair.german.url)}, { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\\b\\d+(?:[.,]\\d+)*%?\\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });
`;
  }).join('\n');

  fs.writeFileSync(path.join(localizationDir, 'language-comparison.spec.js'), `const { test, expect } = require('@playwright/test');\n\ntest.describe('English and German localization comparison', () => {\n${cases}});\n`);
}

function createExternalLinkTests() {
  const links = new Map();
  for (const page of allSiteRecords) {
    for (const link of page.externalLinks || []) {
      if (!/^https?:/i.test(link.url)) continue;
      if (!links.has(link.url)) links.set(link.url, { ...link, sourceUrls: [] });
      links.get(link.url).sourceUrls.push(page.url);
    }
  }
  for (const resource of resourcePages) {
    links.set(resource.url, {
      label: fileSlug(resource.url),
      url: resource.url,
      sourceUrls: [resource.discoveredFrom || ''],
    });
  }

  const groupedLinks = new Map();
  for (const link of links.values()) {
    const host = new URL(link.url).hostname.replace(/^www\./, '');
    if (!groupedLinks.has(host)) groupedLinks.set(host, []);
    groupedLinks.get(host).push(link);
  }

  const externalDir = path.join(root, 'tests', 'external');
  fs.mkdirSync(externalDir, { recursive: true });
  let index = 1;
  for (const [host, hostLinks] of groupedLinks) {
    const specs = hostLinks.map(link => {
      const id = `TC_EXT_${String(index++).padStart(4, '0')}`;
      const info = caseInfo({
        id,
        locale: 'external',
        scenario: `Verify external link destination: ${link.label || link.url}`,
        description: 'Perform a read-only request to verify an external website link is reachable.',
        preconditions: 'The external link was discovered on a public InfoBeans page; no form or transaction is submitted.',
        steps: [
          `Request the external URL ${link.url}`,
          'Verify the response status is successful',
        ],
        expected: 'The external destination responds with a successful HTTP status.',
        pageUrl: link.sourceUrls.join(' | '),
      });
      inventory.push(info);
      allCases.push(info);
      return `  test('${id} | ${info.scenario.replace(/'/g, "\\'")}', async ({ request }, testInfo) => {
    ${annotationCode(info)}
    const response = await request.get(${JSON.stringify(link.url)}, { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });
`;
    }).join('\n');
    const slug = host.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    fs.writeFileSync(path.join(externalDir, `${slug}.spec.js`), `const { test, expect } = require('@playwright/test');\n\ntest.describe('External link checks: ${host}', () => {\n${specs}});\n`);
  }
}

fs.mkdirSync(reportsDir, { recursive: true });
siteMap.pages = allSiteRecords;
siteMap.summary.englishPages = allSiteRecords.filter(page => page.locale === 'english').length;
siteMap.summary.germanPages = allSiteRecords.filter(page => page.locale === 'german').length;
fs.writeFileSync(siteMapPath, `${JSON.stringify(siteMap, null, 2)}\n`);
for (const locale of ['english', 'german']) writeLocaleTests(locale);
createLocalizationTests();
createExternalLinkTests();
fs.writeFileSync(path.join(reportsDir, 'localization-page-mapping.json'), `${JSON.stringify({
  generatedAt: new Date().toISOString(),
  mappedPairs: localizationPairs().map(pair => ({
    englishUrl: pair.english.url,
    germanUrl: pair.german.url,
  })),
  unmappedPages: [...new Map(unmappedLocalizationPages.map(item => [`${item.englishUrl}|${item.issue}`, item])).values()],
  note: 'Unmapped URLs require manual review; they are not automatically declared to be missing translations.',
}, null, 2)}\n`);

writeCsv('url-inventory.csv', allSiteRecords.map(page => ({
  locale: page.locale,
  type: isResourceUrl(page.url) ? 'resource' : 'page',
  url: page.url,
  requestedUrls: (page.requestedUrls || [page.requestedUrl || page.url]).join(' | '),
  discoveredFrom: (page.discoveredFromUrls || [page.discoveredFrom]).filter(Boolean).join(' | '),
  status: page.status,
  title: page.title,
  language: page.language,
  h1: (page.headings || []).find(heading => heading.level === 'h1')?.text || '',
  internalLinkCount: (page.internalLinks || []).length,
  externalLinkCount: (page.externalLinks || []).length,
  error: page.error || '',
})), ['locale', 'type', 'url', 'requestedUrls', 'discoveredFrom', 'status', 'title', 'language', 'h1', 'internalLinkCount', 'externalLinkCount', 'error']);
writeCsv('scenario-inventory.csv', allCases, [
  'id', 'locale', 'scenario', 'description', 'preconditions', 'steps', 'expectedResult', 'actualResult', 'status', 'pageUrl',
]);

console.log(`Generated ${allCases.length} independent test cases from ${allPages.length} discovered pages.`);
console.log(`Localization pairs: ${localizationPairs().length}`);
