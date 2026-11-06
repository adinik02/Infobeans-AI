const { test, expect } = require('@playwright/test');

test.describe('External link checks: drive.google.com', () => {
  test('TC_EXT_0325 | Verify external link destination: View Link', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0325\",\"scenario\":\"Verify external link destination: View Link\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://drive.google.com/file/d/1R3iUiHoJLIDR7tBeUByLIpwR6sefevp5/view?usp=sharing\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/careers/Senior-AIL-2026-10-2432\"}" });
    const response = await request.get("https://drive.google.com/file/d/1R3iUiHoJLIDR7tBeUByLIpwR6sefevp5/view?usp=sharing", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });
});
