const { BasePage } = require('./BasePage');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.exponaInput = page.getByRole('textbox', {
      name: /Ask Expona about our services|Fragen Sie Expona nach unseren Dienstleistungen/i,
    });
    this.exponaButton = page.getByRole('button', { name: /Ask Expona|Expona fragen/i });
  }
}

module.exports = { HomePage };
