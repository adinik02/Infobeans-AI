const { BasePage } = require('./BasePage');

class TopicPage extends BasePage {
  constructor(page, pageData) {
    super(page);
    this.pageData = pageData;
  }
}

module.exports = { TopicPage };
