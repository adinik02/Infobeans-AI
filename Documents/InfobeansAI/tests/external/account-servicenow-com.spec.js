const { test, expect } = require('@playwright/test');

test.describe('External link checks: account.servicenow.com', () => {
  test('TC_EXT_0321 | Verify external link destination: Register for World Forum', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0321\",\"scenario\":\"Verify external link destination: Register for World Forum\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://account.servicenow.com/sign-in?source_id=events&eventId=wfmumbai26&client_id=0oand1oldeZcj3flj0x7&redirect_uri=https%3A%2F%2Fevents.rainfocus.com%2Foauth%2Fservicenow%2F1638975544110001zS57&response_type=code&state=sso%3A%2F%2F7xhgnYUDfSjfHJyY85kv\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/infobeans-at-servicenow-world-forum-mumbai-2026\"}" });
    const response = await request.get("https://account.servicenow.com/sign-in?source_id=events&eventId=wfmumbai26&client_id=0oand1oldeZcj3flj0x7&redirect_uri=https%3A%2F%2Fevents.rainfocus.com%2Foauth%2Fservicenow%2F1638975544110001zS57&response_type=code&state=sso%3A%2F%2F7xhgnYUDfSjfHJyY85kv", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });
});
