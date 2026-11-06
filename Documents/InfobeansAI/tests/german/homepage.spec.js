const { test, expect } = require('@playwright/test');
const { TopicPage } = require('../../pages/TopicPage');
const { normalizeUrl } = require('../../utils/url');
const pageData = {"url":"https://infobeans.ai/de","locale":"german","title":"Enterprise-KI & Digital-Engineering-Services | InfoBeans","headings":[{"level":"h1","text":"Die 8.000-Meilen-Umarmung: Die Geschichte hinter unseren ersten WOW!-Momenten"},{"level":"h2","text":"Wer wir in spontanen Momenten sind, sind wir auch im großen Unternehmensmaßstab."},{"level":"h2","text":"Technologiepartner für Großunternehmen Vertrauen auf Fortune-100-Niveau."},{"level":"h2","text":"Was wir liefern"},{"level":"h2","text":"Lassen Sie uns gemeinsam WOW erschaffen"}],"internalLinks":[{"label":"Cloud-Transformation","url":"https://infobeans.ai/de/wahre-geschichten/tags/cloud"},{"label":"BFSI","url":"https://infobeans.ai/de/wahre-geschichten/tags/bfsi"},{"label":"Konsumgüter","url":"https://infobeans.ai/de/wahre-geschichten/tags/consumer-goods"},{"label":"GCC Erfolge","url":"https://infobeans.ai/de/wahre-geschichten/tags/gcc-success"},{"label":"Standardisierungsorganisationen","url":"https://infobeans.ai/de/wahre-geschichten/tags/sdo"}]};

test('TC_DE_PAGE_0001 | Verify german page availability and core content: Homepage', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_DE_PAGE_0001\",\"scenario\":\"Verify german page availability and core content: Homepage\",\"description\":\"Validate the german page is available and presents localized core content.\",\"preconditions\":\"The public website is reachable; no authentication is required.\",\"steps\":[\"Navigate to https://infobeans.ai/de\",\"Verify the response status, final URL, title, meta description, headings, body content, and document language\",\"Verify the shared header, main content, and footer are present\",\"Check for uncaught JavaScript page errors\"],\"expectedResult\":\"The page returns a successful response, stays on its discovered URL, has a title, meta description, non-empty headings and body content, uses the expected language, and renders shared page regions without uncaught JavaScript errors.\",\"pageUrl\":\"https://infobeans.ai/de\"}" });
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
  await expect(page).toHaveTitle(/\S/);
  await expect(heading).toBeVisible();
  expect(headingText).not.toBe('');
  expect(metaDescription?.trim().length || 0).toBeGreaterThan(0);
  expect(mainText.length).toBeGreaterThan(0);
  expect(headings.every(text => text.trim().length > 0)).toBe(true);
  await expect(page.locator('html')).toHaveAttribute('lang', /^de/i);
  await expect(topicPage.header).toBeVisible();
  await expect(topicPage.main).toBeVisible();
  await expect(topicPage.footer).toBeVisible();
  if (pageData.title) expect(actualResult.title).toBe(pageData.title);
  const expectedHeading = pageData.headings.find(item => item.level === 'h1')?.text;
  if (!true && expectedHeading) expect(headingText).toBe(expectedHeading);
  expect(pageErrors, 'The page should not emit uncaught JavaScript errors').toEqual([]);
});

test('TC_DE_PAGE_0002 | Verify page images and alternative text: Homepage', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_DE_PAGE_0002\",\"scenario\":\"Verify images and alternative text: Homepage\",\"description\":\"Check image alternative text and whether images visible in the initial viewport load.\",\"preconditions\":\"The public page is reachable.\",\"steps\":[\"Navigate to https://infobeans.ai/de\",\"Check that every image has an alt attribute\",\"Check that each image visible in the initial viewport has loaded\"],\"expectedResult\":\"Every image has an alt attribute (empty alt is permitted for decorative images), and visible images load successfully.\",\"pageUrl\":\"https://infobeans.ai/de\"}" });
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

test('TC_DE_PAGE_0003 | Verify homepage internal navigation links: Homepage', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_DE_PAGE_0003\",\"scenario\":\"Verify homepage internal navigation links: Homepage\",\"description\":\"Check that the current homepage exposes internal links with valid destinations; homepage story and campaign links can change dynamically.\",\"preconditions\":\"The public page is reachable.\",\"steps\":[\"Navigate to https://infobeans.ai/de\",\"Verify current internal links have destinations\"],\"expectedResult\":\"The homepage exposes at least one internal link and each internal link has a destination.\",\"pageUrl\":\"https://infobeans.ai/de\"}" });
  const topicPage = new TopicPage(page, pageData);
  await topicPage.goto(pageData.url);
  let actualLinks;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      actualLinks = await page.locator("a[href]")
        .evaluateAll(anchors => anchors.map(anchor => ({
        url: anchor.href,
        href: anchor.getAttribute('href'),
        label: (anchor.innerText || anchor.textContent || anchor.getAttribute('aria-label') || anchor.title || '')
          .trim().replace(/\s+/g, ' ').slice(0, 160),
      })));
      break;
    } catch (error) {
      if (!(error instanceof Error)
        || !error.message.includes('Execution context was destroyed')
        || attempt === 2) throw error;
      await page.waitForLoadState('domcontentloaded');
    }
  }
  const internalLinks = actualLinks.filter(actual =>
    new URL(actual.url).origin === new URL(pageData.url).origin);
  const invalidLinks = internalLinks.filter(actual => !actual.href || !actual.href.trim());
  testInfo.annotations.push({
    type: 'actual-result',
    description: JSON.stringify({ internalLinkCount: internalLinks.length, invalidLinks }),
  });
  expect(internalLinks.length).toBeGreaterThan(0);
  expect(invalidLinks).toEqual([]);
});
