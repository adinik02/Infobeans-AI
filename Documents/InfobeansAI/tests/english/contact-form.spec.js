const { test, expect } = require('@playwright/test');
const { ContactPage } = require('../../pages/ContactPage');

test('TC_EN_FORM_VALIDATION_0001 | Verify english contact email input validation without submitting', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EN_FORM_VALIDATION_0001\",\"scenario\":\"Verify english contact email input validation without submitting\",\"description\":\"Enter an invalid email in a contact-page email field and verify native input validation.\",\"preconditions\":\"The public contact page is reachable; this test does not submit any form.\",\"steps\":[\"Open the contact page https://infobeans.ai/contact-us\",\"Enter a malformed email address in an email input\",\"Verify the browser reports a type-mismatch validation state\",\"Do not submit the form\"],\"expectedResult\":\"An email field is available and marks malformed email input invalid; no data is submitted.\",\"pageUrl\":\"https://infobeans.ai/contact-us\"}" });
  const contactPage = new ContactPage(page);
  await contactPage.goto("https://infobeans.ai/contact-us");
  await expect(contactPage.emailInputs.first()).toBeVisible();
  await contactPage.emailInputs.first().fill('invalid-email');
  const typeMismatch = await contactPage.emailInputs.first().evaluate(input => input.validity.typeMismatch);
  testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ emailFieldCount: await contactPage.emailInputs.count(), typeMismatch, submitted: false }) });
  expect(typeMismatch).toBe(true);
});
