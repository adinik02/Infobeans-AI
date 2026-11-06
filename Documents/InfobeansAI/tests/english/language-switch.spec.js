const { test, expect } = require('@playwright/test');
const { BasePage } = require('../../pages/BasePage');
const { normalizeUrl } = require('../../utils/url');
const { HeaderPage } = require('../../pages/HeaderPage');

test('TC_EN_LANGUAGE_SWITCH_0001 | Switch from english to German', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EN_LANGUAGE_SWITCH_0001\",\"scenario\":\"Switch from english to German\",\"description\":\"Use the visible language selector to navigate to the other locale.\",\"preconditions\":\"The current locale homepage is reachable; this test does not submit any form.\",\"steps\":[\"Open the english homepage\",\"Open the language selector and choose DE\",\"Verify the destination path and document language\"],\"expectedResult\":\"The language selector navigates to the other locale, with a URL matching https://infobeans.ai/de/ux-design/ and the correct html lang value.\",\"pageUrl\":\"https://infobeans.ai/ux-design\"}" });
  const basePage = new BasePage(page);
  await basePage.goto("https://infobeans.ai/ux-design");
  const header = new HeaderPage(page);
  await header.openLanguageSelector();
  await expect(header.languageButton).toHaveAttribute('aria-expanded', 'true');
  await header.selectLanguage('DE');
  await expect(page.locator('html')).toHaveAttribute('lang', /^de/i);
  const actual = { url: page.url(), language: await page.locator('html').getAttribute('lang') };
  testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify(actual) });
  expect(normalizeUrl(actual.url)).toBe(normalizeUrl("https://infobeans.ai/de/ux-design/"));
});
