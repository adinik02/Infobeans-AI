class HeaderPage {
  constructor(page) {
    this.page = page;
    this.header = page.getByRole('banner');
    this.languageButton = this.header.locator('button[aria-haspopup="listbox"]');
    this.navigation = this.header.getByRole('navigation');
    this.dropdowns = this.header.locator('.nav-item.dropdown-trigger');
  }

  async links() {
    return this.header.locator('a[href]').evaluateAll(anchors => anchors.map(anchor => ({
      label: (anchor.innerText || anchor.getAttribute('aria-label') || anchor.title || '')
        .trim()
        .replace(/\s+/g, ' '),
      href: anchor.href,
    })));
  }

  async switchLanguage(language) {
    await this.openLanguageSelector();
    await this.selectLanguage(language);
  }

  async openLanguageSelector() {
    await this.languageButton.click();
  }

  async selectLanguage(language) {
    const languageCode = language.toLowerCase();
    await this.header.locator(`.lang-picker__opt[data-lang="${languageCode}"]:visible`).click();
  }
}

module.exports = { HeaderPage };
