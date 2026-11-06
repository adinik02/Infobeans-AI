const { test, expect } = require('@playwright/test');
const { BasePage } = require('../../pages/BasePage');

test('TC_DE_HEADER_STRUCTURE_0001 | Verify german header links and destinations', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_DE_HEADER_STRUCTURE_0001\",\"scenario\":\"Verify german header links and destinations\",\"description\":\"Check the header renders links with destinations.\",\"preconditions\":\"The public page is reachable.\",\"steps\":[\"Navigate to https://infobeans.ai/de/ux-design\",\"Verify the header is visible and its links have destinations\"],\"expectedResult\":\"The header is visible and its links have destinations.\",\"pageUrl\":\"https://infobeans.ai/de/ux-design\"}" });
  const basePage = new BasePage(page);
  await basePage.goto("https://infobeans.ai/de/ux-design");
  const region = page.getByRole('banner');
  await expect(region).toBeVisible();
  await expect(region.locator('a[href]').first()).toBeVisible();
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
