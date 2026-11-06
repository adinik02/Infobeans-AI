const { test, expect } = require('@playwright/test');
const { BasePage } = require('../../pages/BasePage');

test('TC_EN_HEADER_DROPDOWNS_0001 | Verify english header dropdown menus', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EN_HEADER_DROPDOWNS_0001\",\"scenario\":\"Verify english header dropdown menus\",\"description\":\"Open each expandable header navigation menu and verify its submenu links are exposed.\",\"preconditions\":\"The public page is reachable; no form is submitted.\",\"steps\":[\"Navigate to https://infobeans.ai/ux-design\",\"Hover each expandable navigation menu\",\"Verify every menu exposes submenu links with destinations\"],\"expectedResult\":\"Each expandable header menu opens and exposes submenu links with destinations.\",\"pageUrl\":\"https://infobeans.ai/ux-design\"}" });
  const basePage = new BasePage(page);
  await basePage.goto("https://infobeans.ai/ux-design");
  const header = page.getByRole('banner');
  await expect(header).toBeVisible();
  const dropdowns = header.locator('.nav-item.dropdown-trigger');
  const dropdownCount = await dropdowns.count();
  expect(dropdownCount).toBeGreaterThan(0);
  const menuResults = [];
  for (let index = 0; index < dropdownCount; index += 1) {
    const dropdown = dropdowns.nth(index);
    await dropdown.locator('a.nav-link').hover();
    const submenuLinks = dropdown.locator('a.submenu-link');
    const linkCount = await submenuLinks.count();
    expect(linkCount).toBeGreaterThan(0);
    await expect(submenuLinks.first()).toBeVisible();
    const destinations = await submenuLinks.evaluateAll(anchors => anchors.map(anchor => anchor.href));
    expect(destinations.every(Boolean)).toBe(true);
    menuResults.push({ index, linkCount, destinations });
  }
  testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify(menuResults) });
});
