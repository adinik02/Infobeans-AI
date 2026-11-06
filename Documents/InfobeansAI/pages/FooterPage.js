class FooterPage {
  constructor(page) {
    this.footer = page.getByRole('contentinfo');
  }

  async links() {
    return this.footer.locator('a[href]').evaluateAll(anchors => anchors.map(anchor => ({
      label: (anchor.innerText || anchor.getAttribute('aria-label') || anchor.title || '')
        .trim()
        .replace(/\s+/g, ' '),
      href: anchor.href,
    })));
  }
}

module.exports = { FooterPage };
