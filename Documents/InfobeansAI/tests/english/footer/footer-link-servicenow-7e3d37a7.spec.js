const { test, expect } = require('@playwright/test');
const { normalizeUrl } = require('../../../utils/url');
const sourceUrl = "https://infobeans.ai/";
const destinationUrl = "https://infobeans.ai/servicenow";
const expectedLabel = "ServiceNow";

test('TC_EN_FOOTER_0009 | Verify Footer link destination: ServiceNow', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EN_FOOTER_0009\",\"scenario\":\"Verify Footer link destination: ServiceNow\",\"description\":\"Verify this footer link points to a reachable internal page.\",\"preconditions\":\"The source page is reachable; navigation is read-only.\",\"steps\":[\"Open the source page https://infobeans.ai/\",\"Verify the footer contains a link to https://infobeans.ai/servicenow\",\"Request the destination and verify it returns a successful response\"],\"expectedResult\":\"The source link is present with the expected destination and the destination page returns a successful response.\",\"pageUrl\":\"https://infobeans.ai/servicenow\"}" });
  await page.goto(sourceUrl, { waitUntil: 'domcontentloaded' });
  const links = await page.locator('footer a[href], [role="contentinfo"] a[href]')
    .evaluateAll(anchors => anchors.map(anchor => {
      const url = new URL(anchor.href);
      url.hash = '';
      if (url.pathname !== '/') url.pathname = url.pathname.replace(/\/+$/, '');
      return {
        url: url.href,
        label: (anchor.innerText || anchor.textContent || anchor.getAttribute('aria-label') || anchor.title || '')
          .trim().replace(/\s+/g, ' ').slice(0, 160),
      };
    }));
  expect(links.some(link => link.url === destinationUrl), 'The source region should contain the discovered destination').toBe(true);
  if (expectedLabel) {
    expect(links.some(link => link.url === destinationUrl && link.label === expectedLabel), 'The source link label should match the inventory').toBe(true);
  }
  const response = await page.goto(destinationUrl, { waitUntil: 'domcontentloaded' });
  testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({
    status: response ? response.status() : null,
    destinationUrl,
    finalUrl: page.url(),
    expectedLabel,
  }) });
  expect(response, 'A response should be returned for the destination').not.toBeNull();
  expect(response.status()).toBeLessThan(400);
  expect(normalizeUrl(page.url())).toBe(normalizeUrl(destinationUrl));
});
