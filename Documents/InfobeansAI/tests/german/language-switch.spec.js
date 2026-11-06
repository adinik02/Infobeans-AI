const { test, expect } = require('@playwright/test');
const { BasePage } = require('../../pages/BasePage');
const { normalizeUrl } = require('../../utils/url');
const { HeaderPage } = require('../../pages/HeaderPage');

test('TC_DE_LANGUAGE_SWITCH_0001 | Switch from german to English', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_DE_LANGUAGE_SWITCH_0001\",\"scenario\":\"Switch from german to English\",\"description\":\"Use the visible language selector to navigate to the other locale.\",\"preconditions\":\"The current locale homepage is reachable; this test does not submit any form.\",\"steps\":[\"Open the german homepage\",\"Open the language selector and choose EN\",\"Verify the destination path and document language\"],\"expectedResult\":\"The language selector navigates to the other locale, with a URL matching https://infobeans.ai/ux-design/ and the correct html lang value.\",\"pageUrl\":\"https://infobeans.ai/de/ux-design\"}" });
  const basePage = new BasePage(page);
  await basePage.goto("https://infobeans.ai/de/ux-design");
  const header = new HeaderPage(page);
  await header.openLanguageSelector();
  await expect(header.languageButton).toHaveAttribute('aria-expanded', 'true');
  await header.selectLanguage('EN');
  await expect(page.locator('html')).toHaveAttribute('lang', /^en/i);
  const actual = { url: page.url(), language: await page.locator('html').getAttribute('lang') };
  testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify(actual) });
  expect(normalizeUrl(actual.url)).toBe(normalizeUrl("https://infobeans.ai/ux-design/"));
});
