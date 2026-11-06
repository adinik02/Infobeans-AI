const { test, expect } = require('@playwright/test');

test.describe('External link checks: forms.gle', () => {
  test('TC_EXT_0323 | Verify external link destination: Share your 2026 execution priorities to receive a tailored AI governance roadmap', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0323\",\"scenario\":\"Verify external link destination: Share your 2026 execution priorities to receive a tailored AI governance roadmap\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://forms.gle/w1LXpVU9hzEr1H6r5\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/27th-cioleader-conference-2026\"}" });
    const response = await request.get("https://forms.gle/w1LXpVU9hzEr1H6r5", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });
});
