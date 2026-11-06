const { test, expect } = require('@playwright/test');

test.describe('External link checks: infobeans.ai', () => {
  test('TC_EXT_0172 | Verify external link destination: Financials', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0172\",\"scenario\":\"Verify external link destination: Financials\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2026/10/RESULTS.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2026/10/RESULTS.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0173 | Verify external link destination: TV', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0173\",\"scenario\":\"Verify external link destination: TV\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2026/10/Investors-Presentation-Sep-2026.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2026/10/Investors-Presentation-Sep-2026.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0174 | Verify external link destination: PDF', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0174\",\"scenario\":\"Verify external link destination: PDF\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2026/10/Transcript-Q2-FY27.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2026/10/Transcript-Q2-FY27.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0175 | Verify external link destination: Play', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0175\",\"scenario\":\"Verify external link destination: Play\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2026/10/Earning-call-recording_Q2-26-27.mp3\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2026/10/Earning-call-recording_Q2-26-27.mp3", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0176 | Verify external link destination: SHP', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0176\",\"scenario\":\"Verify external link destination: SHP\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2026/10/SHP_REPORT.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2026/10/SHP_REPORT.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0177 | Verify external link destination: Financials', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0177\",\"scenario\":\"Verify external link destination: Financials\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2026/07/RESULTS.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2026/07/RESULTS.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0178 | Verify external link destination: TV', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0178\",\"scenario\":\"Verify external link destination: TV\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2026/07/Investors-Presentation-Jun-2026.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2026/07/Investors-Presentation-Jun-2026.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0179 | Verify external link destination: PDF', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0179\",\"scenario\":\"Verify external link destination: PDF\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2026/07/Transcript-Jun-2026.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2026/07/Transcript-Jun-2026.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0180 | Verify external link destination: Play', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0180\",\"scenario\":\"Verify external link destination: Play\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2026/07/Q1-Earnings-Call-Jun-26.m4a\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2026/07/Q1-Earnings-Call-Jun-26.m4a", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0181 | Verify external link destination: SHP', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0181\",\"scenario\":\"Verify external link destination: SHP\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2026/07/SHP.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2026/07/SHP.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0182 | Verify external link destination: Financials', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0182\",\"scenario\":\"Verify external link destination: Financials\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2026/04/Financials-q4.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2026/04/Financials-q4.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0183 | Verify external link destination: TV', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0183\",\"scenario\":\"Verify external link destination: TV\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2026/04/Investors-Presentation-Mar-2026.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2026/04/Investors-Presentation-Mar-2026.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0184 | Verify external link destination: PDF', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0184\",\"scenario\":\"Verify external link destination: PDF\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2026/04/transcript-mar-2026.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2026/04/transcript-mar-2026.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0185 | Verify external link destination: Play', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0185\",\"scenario\":\"Verify external link destination: Play\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2026/04/earnings-call-mar-2026.mp3\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2026/04/earnings-call-mar-2026.mp3", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0186 | Verify external link destination: SHP', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0186\",\"scenario\":\"Verify external link destination: SHP\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2026/04/SHP_REPORT-1.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2026/04/SHP_REPORT-1.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0187 | Verify external link destination: FY-2025-26', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0187\",\"scenario\":\"Verify external link destination: FY-2025-26\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2026/07/Infobeans-AR26.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2026/07/Infobeans-AR26.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0188 | Verify external link destination: FY-2024-25', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0188\",\"scenario\":\"Verify external link destination: FY-2024-25\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2025/07/Annual-Report-2024-25.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2025/07/Annual-Report-2024-25.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0189 | Verify external link destination: FY-2023-24', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0189\",\"scenario\":\"Verify external link destination: FY-2023-24\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2024/07/InfoBeans-Annual-Report-2023-2024.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2024/07/InfoBeans-Annual-Report-2023-2024.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0190 | Verify external link destination: FY 2025-26', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0190\",\"scenario\":\"Verify external link destination: FY 2025-26\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2026/06/Annual-Secretarial-Compliance-Report-2026.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2026/06/Annual-Secretarial-Compliance-Report-2026.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0191 | Verify external link destination: FY 2024-25', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0191\",\"scenario\":\"Verify external link destination: FY 2024-25\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2026/05/Secretarial-Compliance-Report-2025-Infobeans-1.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2026/05/Secretarial-Compliance-Report-2025-Infobeans-1.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0192 | Verify external link destination: FY 2023-24', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0192\",\"scenario\":\"Verify external link destination: FY 2023-24\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2024/05/FY-2023-24.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2024/05/FY-2023-24.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0193 | Verify external link destination: FY 2022-23', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0193\",\"scenario\":\"Verify external link destination: FY 2022-23\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2023/07/Infobeans_BRSR.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2023/07/Infobeans_BRSR.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0194 | Verify external link destination: FY 2023-24', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0194\",\"scenario\":\"Verify external link destination: FY 2023-24\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2024/07/BRSR.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2024/07/BRSR.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0195 | Verify external link destination: FY 2024-25', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0195\",\"scenario\":\"Verify external link destination: FY 2024-25\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2026/01/Infobeans-AR2025-BRSR.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2026/01/Infobeans-AR2025-BRSR.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0196 | Verify external link destination: FY 2025-26', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0196\",\"scenario\":\"Verify external link destination: FY 2025-26\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2026/07/InfobeansAR26BRSR.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2026/07/InfobeansAR26BRSR.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0197 | Verify external link destination: FY 2022-23', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0197\",\"scenario\":\"Verify external link destination: FY 2022-23\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2023/07/Infobeans_ESG.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2023/07/Infobeans_ESG.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0198 | Verify external link destination: FY 2023-24', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0198\",\"scenario\":\"Verify external link destination: FY 2023-24\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2024/07/InfoBeans-AR2024_ESG.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2024/07/InfoBeans-AR2024_ESG.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0199 | Verify external link destination: FY 2024-25', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0199\",\"scenario\":\"Verify external link destination: FY 2024-25\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2026/01/Infobeans-AR2025-ESG.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2026/01/Infobeans-AR2025-ESG.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0200 | Verify external link destination: FY 2025-26', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0200\",\"scenario\":\"Verify external link destination: FY 2025-26\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2026/07/Infobeans-AR26_ESG_15.07.26.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2026/07/Infobeans-AR26_ESG_15.07.26.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0201 | Verify external link destination: Public Announcement for Buy Back_19-05-2025', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0201\",\"scenario\":\"Verify external link destination: Public Announcement for Buy Back_19-05-2025\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2025/05/BS-_-Mumbai-_-19-05-2025-_-INFOBEANS-TECHNOLOGIES-LIMITED.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2025/05/BS-_-Mumbai-_-19-05-2025-_-INFOBEANS-TECHNOLOGIES-LIMITED.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0202 | Verify external link destination: Public Announcement for Buy Back_28-04-2021', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0202\",\"scenario\":\"Verify external link destination: Public Announcement for Buy Back_28-04-2021\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2021/05/News-Paper-English-2.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2021/05/News-Paper-English-2.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0203 | Verify external link destination: Notice of Postal Ballot_28062026', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0203\",\"scenario\":\"Verify external link destination: Notice of Postal Ballot_28062026\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2026/11/Postal-Ballot-Notice_28062026.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2026/11/Postal-Ballot-Notice_28062026.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0204 | Verify external link destination: Outcome of the Board Meeting_28102026', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0204\",\"scenario\":\"Verify external link destination: Outcome of the Board Meeting_28102026\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2026/10/Outcome28102026.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2026/10/Outcome28102026.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0205 | Verify external link destination: Disclosure under regulation 30', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0205\",\"scenario\":\"Verify external link destination: Disclosure under regulation 30\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2026/10/Disclosure-under-regulation-30.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2026/10/Disclosure-under-regulation-30.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0206 | Verify external link destination: Ecoplex Infra Private Limited', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0206\",\"scenario\":\"Verify external link destination: Ecoplex Infra Private Limited\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2026/07/Ecoplex-Financial-25-26_0001.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2026/07/Ecoplex-Financial-25-26_0001.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0207 | Verify external link destination: InfoBeans CloudTech Ltd', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0207\",\"scenario\":\"Verify external link destination: InfoBeans CloudTech Ltd\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2026/07/ICL-Balance-Sheet-as-at-March-31st-2026-08-May-2026-_0001-1.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2026/07/ICL-Balance-Sheet-as-at-March-31st-2026-08-May-2026-_0001-1.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0208 | Verify external link destination: InfoBeans CloudTech Ltd', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0208\",\"scenario\":\"Verify external link destination: InfoBeans CloudTech Ltd\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2026/04/V.01_Signed_ICL-Standalone-Financials-FY-24-25_Final-2.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2026/04/V.01_Signed_ICL-Standalone-Financials-FY-24-25_Final-2.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0209 | Verify external link destination: InfoBeans Technologies DMCC', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0209\",\"scenario\":\"Verify external link destination: InfoBeans Technologies DMCC\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2026/04/Infobeans-Technologies-DMCC-Audit-Report-2024-Final.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2026/04/Infobeans-Technologies-DMCC-Audit-Report-2024-Final.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0210 | Verify external link destination: InfoBeans CloudTech Ltd', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0210\",\"scenario\":\"Verify external link destination: InfoBeans CloudTech Ltd\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2025/06/ICL-Financials-2023-24.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2025/06/ICL-Financials-2023-24.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0211 | Verify external link destination: InfoBeans INC', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0211\",\"scenario\":\"Verify external link destination: InfoBeans INC\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2024/08/INC-FY-2023-24.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2024/08/INC-FY-2023-24.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0212 | Verify external link destination: InfoBeans CloudTech Ltd', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0212\",\"scenario\":\"Verify external link destination: InfoBeans CloudTech Ltd\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2025/12/Financials-ICL-2022-23.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2025/12/Financials-ICL-2022-23.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0213 | Verify external link destination: InfoBeans Technologies Europe GmBH', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0213\",\"scenario\":\"Verify external link destination: InfoBeans Technologies Europe GmBH\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2025/06/InfoBeans-GmbH-Financials-2022-23.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2025/06/InfoBeans-GmbH-Financials-2022-23.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0214 | Verify external link destination: InfoBeans Technologies DMCC', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0214\",\"scenario\":\"Verify external link destination: InfoBeans Technologies DMCC\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2023/09/InfoBeans-Technologies-DMCC.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2023/09/InfoBeans-Technologies-DMCC.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0215 | Verify external link destination: InfoBeans INC', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0215\",\"scenario\":\"Verify external link destination: InfoBeans INC\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2023/09/InfoBeans-INC.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2023/09/InfoBeans-INC.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0216 | Verify external link destination: InfoBeans Technologies DMCC', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0216\",\"scenario\":\"Verify external link destination: InfoBeans Technologies DMCC\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2023/04/InfoBeans-Technologies-DMCC.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2023/04/InfoBeans-Technologies-DMCC.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0217 | Verify external link destination: InfoBeans Technologies Europe GmBH', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0217\",\"scenario\":\"Verify external link destination: InfoBeans Technologies Europe GmBH\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2023/04/InfoBeans-Technologies-Europe-GmBH.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2023/04/InfoBeans-Technologies-Europe-GmBH.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0218 | Verify external link destination: InfoBeans INC', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0218\",\"scenario\":\"Verify external link destination: InfoBeans INC\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2023/04/InfoBeans-INC.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2023/04/InfoBeans-INC.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0219 | Verify external link destination: CG REPORT 31-12-2024', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0219\",\"scenario\":\"Verify external link destination: CG REPORT 31-12-2024\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2025/02/CGREPORT.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2025/02/CGREPORT.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0220 | Verify external link destination: CG REPORT 30-09-2024', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0220\",\"scenario\":\"Verify external link destination: CG REPORT 30-09-2024\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2024/10/16102024140030_iXBRL.html\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2024/10/16102024140030_iXBRL.html", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0221 | Verify external link destination: CG REPORT 30-06-2024', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0221\",\"scenario\":\"Verify external link destination: CG REPORT 30-06-2024\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2024/07/CG-REPORT-1.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2024/07/CG-REPORT-1.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0222 | Verify external link destination: CG REPORT 31-03-2024', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0222\",\"scenario\":\"Verify external link destination: CG REPORT 31-03-2024\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2024/04/CG-REPORT-31-03-2024.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2024/04/CG-REPORT-31-03-2024.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0223 | Verify external link destination: CG REPORT 31-12-2023', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0223\",\"scenario\":\"Verify external link destination: CG REPORT 31-12-2023\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2024/01/Corporate_Governance_Report-31st-Dec-2023.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2024/01/Corporate_Governance_Report-31st-Dec-2023.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0224 | Verify external link destination: CG REPORT 30-09-2023', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0224\",\"scenario\":\"Verify external link destination: CG REPORT 30-09-2023\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2024/01/Corporate_Governance_Report-30th-Sep-2023.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2024/01/Corporate_Governance_Report-30th-Sep-2023.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0225 | Verify external link destination: CG REPORT 30-06-2023', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0225\",\"scenario\":\"Verify external link destination: CG REPORT 30-06-2023\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2023/07/CG-Report-as-on-30-Jun-2023.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2023/07/CG-Report-as-on-30-Jun-2023.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0226 | Verify external link destination: CG REPORT 31-03-2023', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0226\",\"scenario\":\"Verify external link destination: CG REPORT 31-03-2023\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2023/04/CG-Report-March-2023.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2023/04/CG-Report-March-2023.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0227 | Verify external link destination: CG REPORT 31-12-2022', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0227\",\"scenario\":\"Verify external link destination: CG REPORT 31-12-2022\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2023/01/CG-Report-31-12-2022.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2023/01/CG-Report-31-12-2022.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0228 | Verify external link destination: CG REPORT 30-09-2022', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0228\",\"scenario\":\"Verify external link destination: CG REPORT 30-09-2022\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2022/11/CG-Report-30-09-2022.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2022/11/CG-Report-30-09-2022.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0229 | Verify external link destination: CG REPORT 30-06-2022', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0229\",\"scenario\":\"Verify external link destination: CG REPORT 30-06-2022\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2022/08/CG_REPORT_30-06-2022.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2022/08/CG_REPORT_30-06-2022.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0230 | Verify external link destination: CG REPORT 31-12-2021', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0230\",\"scenario\":\"Verify external link destination: CG REPORT 31-12-2021\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2022/04/Corporate_Governance_Report_31122021.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2022/04/Corporate_Governance_Report_31122021.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0231 | Verify external link destination: CG REPORT 30-09-2021', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0231\",\"scenario\":\"Verify external link destination: CG REPORT 30-09-2021\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2021/12/Corporate_Governance_Report-30th-September-2021.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2021/12/Corporate_Governance_Report-30th-September-2021.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0232 | Verify external link destination: CG REPORT 30-06-2021', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0232\",\"scenario\":\"Verify external link destination: CG REPORT 30-06-2021\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2021/12/Corporate_Governance_Report-30th-June-2021.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2021/12/Corporate_Governance_Report-30th-June-2021.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0233 | Verify external link destination: CG REPORT 31-03-2021', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0233\",\"scenario\":\"Verify external link destination: CG REPORT 31-03-2021\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2021/12/Corporate_Governance_Report-31st-March-2021.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2021/12/Corporate_Governance_Report-31st-March-2021.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0234 | Verify external link destination: CG REPORT 31-12-2020', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0234\",\"scenario\":\"Verify external link destination: CG REPORT 31-12-2020\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2021/12/Corporate_Governance_Report-30th-December-2020.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2021/12/Corporate_Governance_Report-30th-December-2020.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0235 | Verify external link destination: CG REPORT 30-09-2020', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0235\",\"scenario\":\"Verify external link destination: CG REPORT 30-09-2020\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2021/12/Corporate_Governance_Report-30th-Sep-2020.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2021/12/Corporate_Governance_Report-30th-Sep-2020.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0236 | Verify external link destination: CG REPORT 30-06-2020', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0236\",\"scenario\":\"Verify external link destination: CG REPORT 30-06-2020\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2021/12/Corporate_Governance_Report-30th-June-2020.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2021/12/Corporate_Governance_Report-30th-June-2020.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0237 | Verify external link destination: CG REPORT 31-03-2020', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0237\",\"scenario\":\"Verify external link destination: CG REPORT 31-03-2020\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2021/12/Corporate_Governance_Report-31st-March-2020.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2021/12/Corporate_Governance_Report-31st-March-2020.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0238 | Verify external link destination: CG REPORT 31-12-2019', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0238\",\"scenario\":\"Verify external link destination: CG REPORT 31-12-2019\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2021/12/Corporate_Governance_Report-30th-December-2019.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2021/12/Corporate_Governance_Report-30th-December-2019.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0239 | Verify external link destination: Policy on Material Subsidiary', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0239\",\"scenario\":\"Verify external link destination: Policy on Material Subsidiary\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2024/09/Policy-on-material-subsidiary.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren | https://infobeans.ai/regulation-46\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2024/09/Policy-on-material-subsidiary.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0240 | Verify external link destination: Preservation of Documents Archival Policy', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0240\",\"scenario\":\"Verify external link destination: Preservation of Documents Archival Policy\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2024/09/Preservation-of-Documents-Archival-Policy.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2024/09/Preservation-of-Documents-Archival-Policy.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0241 | Verify external link destination: Related Party Transaction Policy', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0241\",\"scenario\":\"Verify external link destination: Related Party Transaction Policy\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2024/09/Updated-Related-Party-Transaction-Policy.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2024/09/Updated-Related-Party-Transaction-Policy.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0242 | Verify external link destination: Code of Conduct InfoBeans Technologies Ltd', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0242\",\"scenario\":\"Verify external link destination: Code of Conduct InfoBeans Technologies Ltd\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2024/06/Code-of-Conduct-InfoBeans-Technologies-Ltd.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2024/06/Code-of-Conduct-InfoBeans-Technologies-Ltd.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0243 | Verify external link destination: Whistle Blower Policy', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0243\",\"scenario\":\"Verify external link destination: Whistle Blower Policy\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2024/04/Updated-Whistle-Blower-Policy.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren | https://infobeans.ai/regulation-46\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2024/04/Updated-Whistle-Blower-Policy.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0244 | Verify external link destination: Details of InfoBeans Familiarization Programme for Independent Directors', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0244\",\"scenario\":\"Verify external link destination: Details of InfoBeans Familiarization Programme for Independent Directors\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2023/12/InfoBeans-Familiarization-Programme-Details.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren | https://infobeans.ai/regulation-46\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2023/12/InfoBeans-Familiarization-Programme-Details.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0245 | Verify external link destination: Policy for Determining Materiality of events', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0245\",\"scenario\":\"Verify external link destination: Policy for Determining Materiality of events\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2023/09/Policy-for-Determining-Materiality-of-events.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren | https://infobeans.ai/regulation-46\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2023/09/Policy-for-Determining-Materiality-of-events.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0246 | Verify external link destination: Anti-Bribery and Anti-Corruption Policy', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0246\",\"scenario\":\"Verify external link destination: Anti-Bribery and Anti-Corruption Policy\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2023/06/Anti-Bribery-and-Anti-Corruption-Policy-.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2023/06/Anti-Bribery-and-Anti-Corruption-Policy-.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0247 | Verify external link destination: ESG Policy', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0247\",\"scenario\":\"Verify external link destination: ESG Policy\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2023/06/ESG-Policy.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2023/06/ESG-Policy.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0248 | Verify external link destination: Anti Money Laundering Policy', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0248\",\"scenario\":\"Verify external link destination: Anti Money Laundering Policy\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2023/06/Anti-Money-Laundering-Policy.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2023/06/Anti-Money-Laundering-Policy.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0249 | Verify external link destination: Supplier Code of Conduct', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0249\",\"scenario\":\"Verify external link destination: Supplier Code of Conduct\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2023/06/Supplier-Code-of-Conduct.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2023/06/Supplier-Code-of-Conduct.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0250 | Verify external link destination: Human Rights policy', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0250\",\"scenario\":\"Verify external link destination: Human Rights policy\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2023/06/Human-Rights-policy.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2023/06/Human-Rights-policy.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0251 | Verify external link destination: Criteria for making payment to ID\'s', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0251\",\"scenario\":\"Verify external link destination: Criteria for making payment to ID's\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2021/04/Criteria-for-making-payment-to-IDs.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren | https://infobeans.ai/regulation-46\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2021/04/Criteria-for-making-payment-to-IDs.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0252 | Verify external link destination: Prevention of Sexual Harassment Policy', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0252\",\"scenario\":\"Verify external link destination: Prevention of Sexual Harassment Policy\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2020/07/Prevention-of-Sexual-Harassment-Policy-1.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2020/07/Prevention-of-Sexual-Harassment-Policy-1.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0253 | Verify external link destination: Dividend Distribution Policy', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0253\",\"scenario\":\"Verify external link destination: Dividend Distribution Policy\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2022/05/Dividend-Policy.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren | https://infobeans.ai/regulation-46\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2022/05/Dividend-Policy.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0254 | Verify external link destination: Risk Management Policy', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0254\",\"scenario\":\"Verify external link destination: Risk Management Policy\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2026/07/Risk-Management-Policy.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2026/07/Risk-Management-Policy.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0255 | Verify external link destination: Insider Trading Code of Conduct', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0255\",\"scenario\":\"Verify external link destination: Insider Trading Code of Conduct\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2019/07/Code-of-conduct-Insider-Trading-1.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2019/07/Code-of-conduct-Insider-Trading-1.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0256 | Verify external link destination: Fair Disclosure Policy', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0256\",\"scenario\":\"Verify external link destination: Fair Disclosure Policy\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2019/06/Draft-fair-disclosure-policy.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2019/06/Draft-fair-disclosure-policy.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0257 | Verify external link destination: Code of Conduct Directors and Senior Managerial Personnel', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0257\",\"scenario\":\"Verify external link destination: Code of Conduct Directors and Senior Managerial Personnel\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2023/06/CODE-OF-CONDUCT.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren | https://infobeans.ai/regulation-46\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2023/06/CODE-OF-CONDUCT.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0258 | Verify external link destination: Policy on obligations of Directors and Senior Management Personnel', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0258\",\"scenario\":\"Verify external link destination: Policy on obligations of Directors and Senior Management Personnel\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2019/06/Draft-policy-on-obligations-of-directors.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2019/06/Draft-policy-on-obligations-of-directors.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0259 | Verify external link destination: Policy on orderly succession for appointment to the Board and Senior Management', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0259\",\"scenario\":\"Verify external link destination: Policy on orderly succession for appointment to the Board and Senior Management\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2019/06/Draft-Policy-on-orderly-succession-for-appointment-of-directors.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2019/06/Draft-Policy-on-orderly-succession-for-appointment-of-directors.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0260 | Verify external link destination: Appointment letter of Independent Director', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0260\",\"scenario\":\"Verify external link destination: Appointment letter of Independent Director\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2015/12/Terms-Conditions-of-Independent-Directors-2.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren | https://infobeans.ai/regulation-46\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2015/12/Terms-Conditions-of-Independent-Directors-2.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0261 | Verify external link destination: Code of conduct Insider Trading', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0261\",\"scenario\":\"Verify external link destination: Code of conduct Insider Trading\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2019/06/Code-of-conduct-Insider-Trading.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2019/06/Code-of-conduct-Insider-Trading.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0262 | Verify external link destination: Code of Practise For Fair Disclosure of UPSI', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0262\",\"scenario\":\"Verify external link destination: Code of Practise For Fair Disclosure of UPSI\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2015/12/Code-of-Practise-For-Fair-Disclosure-of-UPSI.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2015/12/Code-of-Practise-For-Fair-Disclosure-of-UPSI.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0263 | Verify external link destination: Corporate Social Responsibility Policy', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0263\",\"scenario\":\"Verify external link destination: Corporate Social Responsibility Policy\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2015/12/Corporate-Soical-Responsibility-Policy.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2015/12/Corporate-Soical-Responsibility-Policy.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0264 | Verify external link destination: Familiarization-Programme of Independent Director', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0264\",\"scenario\":\"Verify external link destination: Familiarization-Programme of Independent Director\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2015/12/Familiarization-Programme-of-Independent-Director.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2015/12/Familiarization-Programme-of-Independent-Director.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0265 | Verify external link destination: Nomination Remuneration Policy', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0265\",\"scenario\":\"Verify external link destination: Nomination Remuneration Policy\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2015/12/Nomination-Remuneration-Policy.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2015/12/Nomination-Remuneration-Policy.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0266 | Verify external link destination: Press Release_InfoBeans Story', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0266\",\"scenario\":\"Verify external link destination: Press Release_InfoBeans Story\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2026/01/Press-Release.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2026/01/Press-Release.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0267 | Verify external link destination: Press Release October 2025', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0267\",\"scenario\":\"Verify external link destination: Press Release October 2025\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2025/10/Press_Release_October_2025.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2025/10/Press_Release_October_2025.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0268 | Verify external link destination: Press Release July 2025', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0268\",\"scenario\":\"Verify external link destination: Press Release July 2025\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2025/07/Press-release_July-2025.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2025/07/Press-release_July-2025.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0269 | Verify external link destination: FY 2023-24', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0269\",\"scenario\":\"Verify external link destination: FY 2023-24\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2024/08/CSR-2024.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2024/08/CSR-2024.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0270 | Verify external link destination: FY 2022-23', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0270\",\"scenario\":\"Verify external link destination: FY 2022-23\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2023/06/CSR-Updated-2022-2023.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2023/06/CSR-Updated-2022-2023.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0271 | Verify external link destination: FY 2021-22', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0271\",\"scenario\":\"Verify external link destination: FY 2021-22\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2022/05/CSR-Update-2021-2022.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2022/05/CSR-Update-2021-2022.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0272 | Verify external link destination: Prospectus', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0272\",\"scenario\":\"Verify external link destination: Prospectus\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2017/04/ITL_Prospectus.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2017/04/ITL_Prospectus.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0273 | Verify external link destination: Q4 Mar 2026', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0273\",\"scenario\":\"Verify external link destination: Q4 Mar 2026\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2026/05/Q4-Mar-2026.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2026/05/Q4-Mar-2026.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0274 | Verify external link destination: Q3 Dec 2025', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0274\",\"scenario\":\"Verify external link destination: Q3 Dec 2025\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2026/05/Q3-Dec-2025.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2026/05/Q3-Dec-2025.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0275 | Verify external link destination: Q2 Sep 2025', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0275\",\"scenario\":\"Verify external link destination: Q2 Sep 2025\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2026/05/Q2-Sep-2025.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2026/05/Q2-Sep-2025.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0276 | Verify external link destination: Q1 Jul 2025', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0276\",\"scenario\":\"Verify external link destination: Q1 Jul 2025\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2026/05/Q1-Jul-2025.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2026/05/Q1-Jul-2025.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0277 | Verify external link destination: Q4 Mar 2025', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0277\",\"scenario\":\"Verify external link destination: Q4 Mar 2025\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2026/05/Q4-Mar-2025.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2026/05/Q4-Mar-2025.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0278 | Verify external link destination: Q3-Dec-2024', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0278\",\"scenario\":\"Verify external link destination: Q3-Dec-2024\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2025/01/Q3-Dec-2024.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2025/01/Q3-Dec-2024.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0279 | Verify external link destination: Q2-Sep-2024', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0279\",\"scenario\":\"Verify external link destination: Q2-Sep-2024\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2024/10/Intimationoffinancialadvertisement.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2024/10/Intimationoffinancialadvertisement.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0280 | Verify external link destination: Q1-Jun-2024', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0280\",\"scenario\":\"Verify external link destination: Q1-Jun-2024\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2024/07/Intimationoffinancialadvertisement.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2024/07/Intimationoffinancialadvertisement.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0281 | Verify external link destination: Q4-Mar-2024', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0281\",\"scenario\":\"Verify external link destination: Q4-Mar-2024\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2024/05/IntimationofCopyofNewspaperPublication.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2024/05/IntimationofCopyofNewspaperPublication.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0282 | Verify external link destination: Q3-Dec-2023', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0282\",\"scenario\":\"Verify external link destination: Q3-Dec-2023\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2024/01/Q3-Dec-2023.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2024/01/Q3-Dec-2023.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0283 | Verify external link destination: Q2-Sep-2023', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0283\",\"scenario\":\"Verify external link destination: Q2-Sep-2023\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2024/01/Q2-Sep-2023.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2024/01/Q2-Sep-2023.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0284 | Verify external link destination: Q1-Jun-2023', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0284\",\"scenario\":\"Verify external link destination: Q1-Jun-2023\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2024/01/Q1-Jun-2023.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2024/01/Q1-Jun-2023.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0285 | Verify external link destination: Q4-Mar-2023', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0285\",\"scenario\":\"Verify external link destination: Q4-Mar-2023\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2023/05/Q4-Mar-2023.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2023/05/Q4-Mar-2023.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0286 | Verify external link destination: Q3-Dec-2022', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0286\",\"scenario\":\"Verify external link destination: Q3-Dec-2022\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2023/01/Q3-Dec-2022.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2023/01/Q3-Dec-2022.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0287 | Verify external link destination: Q2-Sept 2022', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0287\",\"scenario\":\"Verify external link destination: Q2-Sept 2022\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2022/11/Q2-Sept-2022-1.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2022/11/Q2-Sept-2022-1.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0288 | Verify external link destination: Q1-June-2022', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0288\",\"scenario\":\"Verify external link destination: Q1-June-2022\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2022/08/Q1-June-2022.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2022/08/Q1-June-2022.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0289 | Verify external link destination: Q4-Mar-2022', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0289\",\"scenario\":\"Verify external link destination: Q4-Mar-2022\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2022/05/Q4-Mar-2022-Financials-in-Newspaper.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2022/05/Q4-Mar-2022-Financials-in-Newspaper.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0290 | Verify external link destination: Q3-Dec-2021', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0290\",\"scenario\":\"Verify external link destination: Q3-Dec-2021\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2022/05/Q3-Dec-2021.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2022/05/Q3-Dec-2021.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0291 | Verify external link destination: Q1- Jun-2021', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0291\",\"scenario\":\"Verify external link destination: Q1- Jun-2021\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2022/05/Q1-Jun-2021.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2022/05/Q1-Jun-2021.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0292 | Verify external link destination: Q4-Mar-2021', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0292\",\"scenario\":\"Verify external link destination: Q4-Mar-2021\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2022/05/Q4-Mar-2021.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2022/05/Q4-Mar-2021.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0293 | Verify external link destination: Q3-Dec-2020', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0293\",\"scenario\":\"Verify external link destination: Q3-Dec-2020\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2022/05/Q3-Dec-2020.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2022/05/Q3-Dec-2020.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0294 | Verify external link destination: Q2-Sep-2020', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0294\",\"scenario\":\"Verify external link destination: Q2-Sep-2020\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2022/05/Q2-Sep-2020.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2022/05/Q2-Sep-2020.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0295 | Verify external link destination: Q1- Jun-2020', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0295\",\"scenario\":\"Verify external link destination: Q1- Jun-2020\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2022/05/Q1-Jun-2020.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2022/05/Q1-Jun-2020.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0296 | Verify external link destination: Q4-Mar-2020', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0296\",\"scenario\":\"Verify external link destination: Q4-Mar-2020\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2022/05/Q4-Mar-2020.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2022/05/Q4-Mar-2020.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0297 | Verify external link destination: Notice of Board Meeting_09-07-2025', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0297\",\"scenario\":\"Verify external link destination: Notice of Board Meeting_09-07-2025\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2025/07/Intimation-of-BM.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2025/07/Intimation-of-BM.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0298 | Verify external link destination: AGM Notice 07.08.2024', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0298\",\"scenario\":\"Verify external link destination: AGM Notice 07.08.2024\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2024/07/NewspaperPublicationIntimation_573d13.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2024/07/NewspaperPublicationIntimation_573d13.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0299 | Verify external link destination: AGM Notice 28.07.2023', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0299\",\"scenario\":\"Verify external link destination: AGM Notice 28.07.2023\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2023/07/AGM-Notice-28.07.2023.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2023/07/AGM-Notice-28.07.2023.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0300 | Verify external link destination: AGM Notice 22.07.2022', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0300\",\"scenario\":\"Verify external link destination: AGM Notice 22.07.2022\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2022/08/AGM-Notice_22.07.2022.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2022/08/AGM-Notice_22.07.2022.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0301 | Verify external link destination: Q1-Jun-2022', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0301\",\"scenario\":\"Verify external link destination: Q1-Jun-2022\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2022/08/Q1_Jun_2022.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2022/08/Q1_Jun_2022.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0302 | Verify external link destination: Q3-Dec-2021', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0302\",\"scenario\":\"Verify external link destination: Q3-Dec-2021\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2022/08/Q3_Dec_2021.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2022/08/Q3_Dec_2021.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0303 | Verify external link destination: Q2-Sep-2021', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0303\",\"scenario\":\"Verify external link destination: Q2-Sep-2021\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2022/05/Board-Meeting-Notice-for-the-Quarter-ended-on-30th-Sep-2021.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2022/05/Board-Meeting-Notice-for-the-Quarter-ended-on-30th-Sep-2021.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0304 | Verify external link destination: Q4-Mar-2021', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0304\",\"scenario\":\"Verify external link destination: Q4-Mar-2021\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2023/08/Board-Meeting-Notice-for-the-Quarter-ended-on-31st-Mar-2021.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2023/08/Board-Meeting-Notice-for-the-Quarter-ended-on-31st-Mar-2021.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0305 | Verify external link destination: Q1-Jun-2021', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0305\",\"scenario\":\"Verify external link destination: Q1-Jun-2021\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2022/05/Board-Meeting-Notice-for-the-Quarter-ended-on-30th-Jun-2021.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2022/05/Board-Meeting-Notice-for-the-Quarter-ended-on-30th-Jun-2021.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0306 | Verify external link destination: Q3-Dec-2020', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0306\",\"scenario\":\"Verify external link destination: Q3-Dec-2020\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2022/05/Board-Meeting-Notice-for-the-Quarter-ended-on-31st-Dec-2020.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2022/05/Board-Meeting-Notice-for-the-Quarter-ended-on-31st-Dec-2020.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0307 | Verify external link destination: Q2-Sep-2020', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0307\",\"scenario\":\"Verify external link destination: Q2-Sep-2020\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2022/05/Board-Meeting-Notice-for-the-Quarter-ended-on-30th-Sep-2020.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2022/05/Board-Meeting-Notice-for-the-Quarter-ended-on-30th-Sep-2020.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0308 | Verify external link destination: Q1-Jun-2020', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0308\",\"scenario\":\"Verify external link destination: Q1-Jun-2020\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2022/05/Board-Meeting-Notice-for-the-Quarter-ended-on-30th-Jun-2021-2.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2022/05/Board-Meeting-Notice-for-the-Quarter-ended-on-30th-Jun-2021-2.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0309 | Verify external link destination: Q4-Mar-2020', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0309\",\"scenario\":\"Verify external link destination: Q4-Mar-2020\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2022/05/Board-Meeting-Notice-for-the-Quarter-ended-on-31st-Mar-2020.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2022/05/Board-Meeting-Notice-for-the-Quarter-ended-on-31st-Mar-2020.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0310 | Verify external link destination: https://infobeans.ai/wp-content/uploads/2015/12/Draft-Related-Party-Transactions-1-7-1.pdf', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0310\",\"scenario\":\"Verify external link destination: https://infobeans.ai/wp-content/uploads/2015/12/Draft-Related-Party-Transactions-1-7-1.pdf\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2015/12/Draft-Related-Party-Transactions-1-7-1.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/regulation-46\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2015/12/Draft-Related-Party-Transactions-1-7-1.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0311 | Verify external link destination: https://infobeans.ai/wp-content/uploads/2024/04/Details-of-KMP.pdf', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0311\",\"scenario\":\"Verify external link destination: https://infobeans.ai/wp-content/uploads/2024/04/Details-of-KMP.pdf\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2024/04/Details-of-KMP.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/regulation-46\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2024/04/Details-of-KMP.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0312 | Verify external link destination: https://infobeans.ai/wp-content/uploads/2026/07/Annual-Return_MGT-7-2025-26.pdf', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0312\",\"scenario\":\"Verify external link destination: https://infobeans.ai/wp-content/uploads/2026/07/Annual-Return_MGT-7-2025-26.pdf\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2026/07/Annual-Return_MGT-7-2025-26.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/regulation-46\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2026/07/Annual-Return_MGT-7-2025-26.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0313 | Verify external link destination: https://infobeans.ai/wp-content/uploads/2026/05/MOAAOA-ITL.pdf', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0313\",\"scenario\":\"Verify external link destination: https://infobeans.ai/wp-content/uploads/2026/05/MOAAOA-ITL.pdf\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2026/05/MOAAOA-ITL.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/regulation-46\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2026/05/MOAAOA-ITL.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });

  test('TC_EXT_0314 | Verify external link destination: https://infobeans.ai/wp-content/uploads/2026/05/ESOP-SCHEME-Amended-2025.pdf', async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EXT_0314\",\"scenario\":\"Verify external link destination: https://infobeans.ai/wp-content/uploads/2026/05/ESOP-SCHEME-Amended-2025.pdf\",\"description\":\"Perform a read-only request to verify an external website link is reachable.\",\"preconditions\":\"The external link was discovered on a public InfoBeans page; no form or transaction is submitted.\",\"steps\":[\"Request the external URL https://infobeans.ai/wp-content/uploads/2026/05/ESOP-SCHEME-Amended-2025.pdf\",\"Verify the response status is successful\"],\"expectedResult\":\"The external destination responds with a successful HTTP status.\",\"pageUrl\":\"https://infobeans.ai/regulation-46\"}" });
    const response = await request.get("https://infobeans.ai/wp-content/uploads/2026/05/ESOP-SCHEME-Amended-2025.pdf", { timeout: 10000 });
    testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ status: response.status(), url: response.url() }) });
    expect(response.status()).toBeLessThan(400);
  });
});
