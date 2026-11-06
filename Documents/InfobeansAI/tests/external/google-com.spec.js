const { test, expect } = require('@playwright/test');

test.describe('External link checks: google.com', () => {
  test('TC_EXT_0318 | Verify external link destination: Get directions', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0318\",\"scenario\":\"Verify external link destination: Get directions\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://www.google.com/maps/dir/?api=1&destination=3355+Las+Vegas+Blvd+S%2C+Las+Vegas%2C+NV+89109%2C+USA\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/oracle-ai-world-2026 | https://infobeans.ai/treffen-sie-infobeans-auf-der-oracle-ai-world-2026\"}" });
    const response = await request.get("https://www.google.com/maps/dir/?api=1&destination=3355+Las+Vegas+Blvd+S%2C+Las+Vegas%2C+NV+89109%2C+USA", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0319 | Verify external link destination: Zeppola Cafe, The Venetian Resort', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0319\",\"scenario\":\"Verify external link destination: Zeppola Cafe, The Venetian Resort\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://www.google.com/maps?rlz=1C1GCEA_enIN1196IN1196&gs_lcrp=EgZjaHJvbWUqDQgBEC4YrwEYxwEYgAQyBggAEEUYOzINCAEQLhivARjHARiABDIHCAIQABiABDIHCAMQABiABDIHCAQQABiABDIHCAUQABiABDIHCAYQABiABDIHCAcQABiABDIHCAgQABiABNIBCDU0MTJqMGo3qAIIsAIB8QUOp9luB6hyWPEFDqfZbgeoclg&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KY1GxmfMxciAMeXg3SqmNV1-&daddr=3377+Las+Vegas+Blvd+S+%232390,+Las+Vegas,+NV+89109,+United+States\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/infobeans-knowledge-26\"}" });
    const response = await request.get("https://www.google.com/maps?rlz=1C1GCEA_enIN1196IN1196&gs_lcrp=EgZjaHJvbWUqDQgBEC4YrwEYxwEYgAQyBggAEEUYOzINCAEQLhivARjHARiABDIHCAIQABiABDIHCAMQABiABDIHCAQQABiABDIHCAUQABiABDIHCAYQABiABDIHCAcQABiABDIHCAgQABiABNIBCDU0MTJqMGo3qAIIsAIB8QUOp9luB6hyWPEFDqfZbgeoclg&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KY1GxmfMxciAMeXg3SqmNV1-&daddr=3377+Las+Vegas+Blvd+S+%232390,+Las+Vegas,+NV+89109,+United+States", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0320 | Verify external link destination: Open in Google Maps', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0320\",\"scenario\":\"Verify external link destination: Open in Google Maps\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://www.google.com/maps?daddr=3377+Las+Vegas+Blvd+S+%232390,+Las+Vegas,+NV+89109\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/infobeans-knowledge-26\"}" });
    const response = await request.get("https://www.google.com/maps?daddr=3377+Las+Vegas+Blvd+S+%232390,+Las+Vegas,+NV+89109", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });
});
