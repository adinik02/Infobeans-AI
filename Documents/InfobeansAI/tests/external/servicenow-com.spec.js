const { test, expect } = require('@playwright/test');

test.describe('External link checks: servicenow.com', () => {
  test('TC_EXT_0316 | Verify external link destination: Learn more about HRSD >', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0316\",\"scenario\":\"Verify external link destination: Learn more about HRSD >\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://www.servicenow.com/products/hr-service-delivery.html\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/servicenow-hrsd | https://infobeans.ai/de/servicenow-hrsd\"}" });
    const response = await request.get("https://www.servicenow.com/products/hr-service-delivery.html", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });
});
