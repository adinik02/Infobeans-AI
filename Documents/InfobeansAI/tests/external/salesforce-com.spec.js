const { test, expect } = require('@playwright/test');

test.describe('External link checks: salesforce.com', () => {
  test('TC_EXT_0328 | Verify external link destination: Salesforce Financial Services Cloud (FSC)', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0328\",\"scenario\":\"Verify external link destination: Salesforce Financial Services Cloud (FSC)\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://www.salesforce.com/products/financial-services\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/ki-strategie-fur-salesforce-financial-services-cloud | https://infobeans.ai/balancing-growth-governance-ai-strategy-for-salesforce-financial-services-cloud\"}" });
    const response = await request.get("https://www.salesforce.com/products/financial-services", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0329 | Verify external link destination: Einstein AI’s', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0329\",\"scenario\":\"Verify external link destination: Einstein AI’s\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://www.salesforce.com/products/einstein/overview\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/ki-strategie-fur-salesforce-financial-services-cloud | https://infobeans.ai/balancing-growth-governance-ai-strategy-for-salesforce-financial-services-cloud\"}" });
    const response = await request.get("https://www.salesforce.com/products/einstein/overview", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0330 | Verify external link destination: Charles Schwab', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0330\",\"scenario\":\"Verify external link destination: Charles Schwab\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://www.salesforce.com/customer-success-stories/charles-schwab\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/ki-strategie-fur-salesforce-financial-services-cloud | https://infobeans.ai/balancing-growth-governance-ai-strategy-for-salesforce-financial-services-cloud\"}" });
    const response = await request.get("https://www.salesforce.com/customer-success-stories/charles-schwab", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0331 | Verify external link destination: Einstein Trust Layer', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0331\",\"scenario\":\"Verify external link destination: Einstein Trust Layer\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://www.salesforce.com/products/einstein/einstein-trust-layer\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/ki-strategie-fur-salesforce-financial-services-cloud | https://infobeans.ai/balancing-growth-governance-ai-strategy-for-salesforce-financial-services-cloud\"}" });
    const response = await request.get("https://www.salesforce.com/products/einstein/einstein-trust-layer", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0332 | Verify external link destination: Fallstudien von Salesforce', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0332\",\"scenario\":\"Verify external link destination: Fallstudien von Salesforce\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://www.salesforce.com/customer-success-stories\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/ki-strategie-fur-salesforce-financial-services-cloud | https://infobeans.ai/balancing-growth-governance-ai-strategy-for-salesforce-financial-services-cloud\"}" });
    const response = await request.get("https://www.salesforce.com/customer-success-stories", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });
});
