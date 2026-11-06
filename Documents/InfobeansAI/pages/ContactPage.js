const { BasePage } = require('./BasePage');

class ContactPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailInputs = page.locator('form input[type="email"]');
  }
}

module.exports = { ContactPage };
