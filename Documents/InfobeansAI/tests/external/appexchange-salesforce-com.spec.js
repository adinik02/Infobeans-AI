const { test, expect } = require('@playwright/test');

test.describe('External link checks: appexchange.salesforce.com', () => {
  test('TC_EXT_0171 | Verify external link destination: See BeanTrail in Action', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0171\",\"scenario\":\"Verify external link destination: See BeanTrail in Action\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://appexchange.salesforce.com/appxListingDetail?listingId=a0N3A00000DrzkrUAB\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/beantrail | https://infobeans.ai/de/beantrail\"}" });
    const response = await request.get("https://appexchange.salesforce.com/appxListingDetail?listingId=a0N3A00000DrzkrUAB", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });
});
