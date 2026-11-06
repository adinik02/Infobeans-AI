const { test, expect } = require('@playwright/test');

test.describe('External link checks: tal64.com', () => {
  test('TC_EXT_0315 | Verify external link destination: The InfoBeans Story', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0315\",\"scenario\":\"Verify external link destination: The InfoBeans Story\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://www.tal64.com/p/the-infobeans-story\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://www.tal64.com/p/the-infobeans-story", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });
});
