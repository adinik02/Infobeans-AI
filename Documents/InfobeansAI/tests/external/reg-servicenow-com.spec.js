const { test, expect } = require('@playwright/test');

test.describe('External link checks: reg.servicenow.com', () => {
  test('TC_EXT_0322 | Verify external link destination: Forum page', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0322\",\"scenario\":\"Verify external link destination: Forum page\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://reg.servicenow.com/flow/servicenow/wfmumbai26/registration\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/infobeans-at-servicenow-world-forum-mumbai-2026\"}" });
    const response = await request.get("https://reg.servicenow.com/flow/servicenow/wfmumbai26/registration", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });
});
