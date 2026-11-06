const { test, expect } = require('@playwright/test');
const { HomePage } = require('../../pages/HomePage');

test('TC_EN_HOME_FUNCTIONAL_0001 | Verify english homepage contact CTA is available without submitting a form', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EN_HOME_FUNCTIONAL_0001\",\"scenario\":\"Verify english homepage contact CTA is available without submitting a form\",\"description\":\"Verify the Expona contact prompt is present without sending a message.\",\"preconditions\":\"The public homepage is reachable; no form is submitted.\",\"steps\":[\"Navigate to https://infobeans.ai/\",\"Verify the Expona textbox and button are visible\",\"Do not submit or send a message\"],\"expectedResult\":\"The homepage exposes its localized Expona textbox and action button; no message is sent.\",\"pageUrl\":\"https://infobeans.ai/\"}" });
  const homePage = new HomePage(page);
  await homePage.goto("https://infobeans.ai/");
  await expect(page.getByRole('textbox', { name: "Ask Expona about our services, case studies, or updates" })).toBeVisible();
  await expect(page.getByRole('button', { name: "Ask Expona" })).toBeVisible();
  testInfo.annotations.push({ type: 'actual-result', description: 'Localized Expona input and button visible; no form was submitted.' });
});
