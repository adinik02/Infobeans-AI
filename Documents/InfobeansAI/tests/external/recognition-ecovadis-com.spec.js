const { test, expect } = require('@playwright/test');

test.describe('External link checks: recognition.ecovadis.com', () => {
  test('TC_EXT_0317 | Verify external link destination: https://recognition.ecovadis.com/tF2menefb0qKly8CLsOGBg', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0317\",\"scenario\":\"Verify external link destination: https://recognition.ecovadis.com/tF2menefb0qKly8CLsOGBg\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://recognition.ecovadis.com/tF2menefb0qKly8CLsOGBg\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/infobeans-earns-ecovadis-bronze-medal-rated-among-the-top-35-of-companies-assessed | https://infobeans.ai/infobeans-erhalt-ecovadis-bronze-medaille-und-gehort-zu-den-besten-35-der-bewerteten-unternehmen\"}" });
    const response = await request.get("https://recognition.ecovadis.com/tF2menefb0qKly8CLsOGBg", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });
});
