const { test, expect } = require('@playwright/test');

test.describe('External link checks: amazon.com', () => {
  test('TC_EXT_0324 | Verify external link destination: https://www.amazon.com/Who-Can-You-Trust-Technology/dp/1541773675', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0324\",\"scenario\":\"Verify external link destination: https://www.amazon.com/Who-Can-You-Trust-Technology/dp/1541773675\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://www.amazon.com/Who-Can-You-Trust-Technology/dp/1541773675\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/podcast/rebuilding-trust-through-design\"}" });
    const response = await request.get("https://www.amazon.com/Who-Can-You-Trust-Technology/dp/1541773675", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });
});
