class BasePage {
  constructor(page) {
    this.page = page;
    this.header = page.getByRole('banner');
    this.main = page.getByRole('main');
    this.footer = page.getByRole('contentinfo');
  }

  async goto(url) {
    const target = new URL(url);
    if (target.origin === 'https://infobeans.ai'
      && !target.pathname.endsWith('/')
      && !/\.[^/]+$/.test(target.pathname)) {
      target.pathname += '/';
    }
    const response = await this.page.goto(target.href, { waitUntil: 'domcontentloaded' });
    const consentNotice = this.page.getByRole('region', { name: /We value your privacy/ });
    if (await consentNotice.count() && await consentNotice.isVisible()) {
      await consentNotice.getByRole('button', { name: 'Close', exact: true }).click();
    }
    return response;
  }

  async getLanguage() {
    return this.page.locator('html').getAttribute('lang');
  }

  async getPageTitle() {
    return this.page.title();
  }

  async getMainHeading() {
    return this.main.getByRole('heading', { level: 1 }).first().innerText();
  }
}

module.exports = { BasePage };
