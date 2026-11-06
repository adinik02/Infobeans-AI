const { test, expect } = require('@playwright/test');

test.describe('External link checks: startmotionmedia.com', () => {
  test('TC_EXT_0337 | Verify external link destination: Source', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0337\",\"scenario\":\"Verify external link destination: Source\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://www.startmotionmedia.com/seven-servicenow-tactics-obliterating-it-bottlenecksand-saving-millions\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/optimizing-enterprise-workflows-ai-powered-automation-on-servicenow\"}" });
    const response = await request.get("https://www.startmotionmedia.com/seven-servicenow-tactics-obliterating-it-bottlenecksand-saving-millions", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });
});
