const { test, expect } = require('@playwright/test');

test.describe('External link checks: eur-lex.europa.eu', () => {
  test('TC_EXT_0336 | Verify external link destination: EU AI Act', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0336\",\"scenario\":\"Verify external link destination: EU AI Act\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A52021PC0206\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/ki-strategie-fur-salesforce-financial-services-cloud | https://infobeans.ai/balancing-growth-governance-ai-strategy-for-salesforce-financial-services-cloud\"}" });
    const response = await request.get("https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A52021PC0206", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });
});
