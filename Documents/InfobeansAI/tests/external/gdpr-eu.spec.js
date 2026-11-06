const { test, expect } = require('@playwright/test');

test.describe('External link checks: gdpr.eu', () => {
  test('TC_EXT_0334 | Verify external link destination: GDPR', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0334\",\"scenario\":\"Verify external link destination: GDPR\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://gdpr.eu/\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/ki-strategie-fur-salesforce-financial-services-cloud | https://infobeans.ai/balancing-growth-governance-ai-strategy-for-salesforce-financial-services-cloud\"}" });
    const response = await request.get("https://gdpr.eu/", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });
});
