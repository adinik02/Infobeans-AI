const { test, expect } = require('@playwright/test');
const { BasePage } = require('../../pages/BasePage');

test('TC_EN_RESPONSIVE_0001 | Verify english homepage responsive layout', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EN_RESPONSIVE_0001\",\"scenario\":\"Verify english homepage responsive layout\",\"description\":\"Check the homepage at common mobile, tablet, and desktop viewport widths.\",\"preconditions\":\"The public homepage is reachable.\",\"steps\":[\"Navigate to https://infobeans.ai/\",\"Set viewport widths to 375, 768, and 1280 CSS pixels\",\"Check for horizontal page overflow and verify the main heading remains visible\"],\"expectedResult\":\"The page fits each viewport without horizontal overflow and keeps its main heading visible.\",\"pageUrl\":\"https://infobeans.ai/\"}" });
  const basePage = new BasePage(page);
  await basePage.goto("https://infobeans.ai/");
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
