const { test, expect } = require('@playwright/test');
const { normalizeUrl } = require('../../../utils/url');
const sourceUrl = "https://infobeans.ai/";
const destinationUrl = "https://infobeans.ai/agentic-engineering";
const expectedLabel = "Agentic EngineeringSelect Services Partner, Claude Partner Network";

test('TC_EN_HEADER_0007 | Verify Header link destination: Agentic EngineeringSelect Services Partner, Claude Partner Network', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EN_HEADER_0007\",\"scenario\":\"Verify Header link destination: Agentic EngineeringSelect Services Partner, Claude Partner Network\",\"description\":\"Verify this header link points to a reachable internal page.\",\"preconditions\":\"The source page is reachable; navigation is read-only.\",\"steps\":[\"Open the source page https://infobeans.ai/\",\"Verify the header contains a link to https://infobeans.ai/agentic-engineering\",\"Request the destination and verify it returns a successful response\"],\"expectedResult\":\"The source link is present with the expected destination and the destination page returns a successful response.\",\"pageUrl\":\"https://infobeans.ai/agentic-engineering\"}" });
  await page.goto(sourceUrl, { waitUntil: 'domcontentloaded' });
  const links = await page.locator('header a[href], [role="banner"] a[href]')
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
