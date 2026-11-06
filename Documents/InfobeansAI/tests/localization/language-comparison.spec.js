const { test, expect } = require('@playwright/test');

test.describe('English and German localization comparison', () => {
  test('TC_LOC_0001 | Compare localized content: Homepage', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0001\",\"scenario\":\"Compare localized content for Homepage\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/de\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/ | https://infobeans.ai/de\"}" });
    await page.goto("https://infobeans.ai/", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/de", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0002 | Compare localized content: ux design', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0002\",\"scenario\":\"Compare localized content for ux design\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/ux-design\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/de/ux-design\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/ux-design | https://infobeans.ai/de/ux-design\"}" });
    await page.goto("https://infobeans.ai/ux-design", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/de/ux-design", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0003 | Compare localized content: gcc services', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0003\",\"scenario\":\"Compare localized content for gcc services\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/gcc-services\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/de/gcc-services\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/gcc-services | https://infobeans.ai/de/gcc-services\"}" });
    await page.goto("https://infobeans.ai/gcc-services", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/de/gcc-services", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0004 | Compare localized content: platform assessment', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0004\",\"scenario\":\"Compare localized content for platform assessment\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/platform-assessment\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/de/plattform-bewertung\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/platform-assessment | https://infobeans.ai/de/plattform-bewertung\"}" });
    await page.goto("https://infobeans.ai/platform-assessment", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/de/plattform-bewertung", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0005 | Compare localized content: bfsi', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0005\",\"scenario\":\"Compare localized content for bfsi\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/bfsi\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/de/bfsi\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/bfsi | https://infobeans.ai/de/bfsi\"}" });
    await page.goto("https://infobeans.ai/bfsi", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/de/bfsi", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0006 | Compare localized content: storage and virtualization', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0006\",\"scenario\":\"Compare localized content for storage and virtualization\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/storage-and-virtualization\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/de/speicher-virtualisierung\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/storage-and-virtualization | https://infobeans.ai/de/speicher-virtualisierung\"}" });
    await page.goto("https://infobeans.ai/storage-and-virtualization", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/de/speicher-virtualisierung", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0007 | Compare localized content: technology', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0007\",\"scenario\":\"Compare localized content for technology\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/technology\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/de/technology\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/technology | https://infobeans.ai/de/technology\"}" });
    await page.goto("https://infobeans.ai/technology", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/de/technology", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0008 | Compare localized content: agentic engineering', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0008\",\"scenario\":\"Compare localized content for agentic engineering\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/agentic-engineering\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/de/agentisches-engineering\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/agentic-engineering | https://infobeans.ai/de/agentisches-engineering\"}" });
    await page.goto("https://infobeans.ai/agentic-engineering", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/de/agentisches-engineering", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0009 | Compare localized content: servicenow', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0009\",\"scenario\":\"Compare localized content for servicenow\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/servicenow\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/de/servicenow\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/servicenow | https://infobeans.ai/de/servicenow\"}" });
    await page.goto("https://infobeans.ai/servicenow", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/de/servicenow", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0010 | Compare localized content: salesforce', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0010\",\"scenario\":\"Compare localized content for salesforce\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/salesforce\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/de/salesforce\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/salesforce | https://infobeans.ai/de/salesforce\"}" });
    await page.goto("https://infobeans.ai/salesforce", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/de/salesforce", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0011 | Compare localized content: WOW story 42633', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0011\",\"scenario\":\"Compare localized content for WOW story 42633\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/?wow_story=42633\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/de/?wow_story=44797\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/?wow_story=42633 | https://infobeans.ai/de/?wow_story=44797\"}" });
    await page.goto("https://infobeans.ai/?wow_story=42633", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/de/?wow_story=44797", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0012 | Compare localized content: stanza', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0012\",\"scenario\":\"Compare localized content for stanza\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/stanza\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/de/stanza\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/stanza | https://infobeans.ai/de/stanza\"}" });
    await page.goto("https://infobeans.ai/stanza", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/de/stanza", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0013 | Compare localized content: spacewarp', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0013\",\"scenario\":\"Compare localized content for spacewarp\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/spacewarp\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/de/spacewarp\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/spacewarp | https://infobeans.ai/de/spacewarp\"}" });
    await page.goto("https://infobeans.ai/spacewarp", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/de/spacewarp", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0014 | Compare localized content: beantrail', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0014\",\"scenario\":\"Compare localized content for beantrail\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/beantrail\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/de/beantrail\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/beantrail | https://infobeans.ai/de/beantrail\"}" });
    await page.goto("https://infobeans.ai/beantrail", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/de/beantrail", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0015 | Compare localized content: qava for oracle', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0015\",\"scenario\":\"Compare localized content for qava for oracle\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/qava-for-oracle\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/de/qava-fur-oracle\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/qava-for-oracle | https://infobeans.ai/de/qava-fur-oracle\"}" });
    await page.goto("https://infobeans.ai/qava-for-oracle", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/de/qava-fur-oracle", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0016 | Compare localized content: true stories accelerating production defect resolution by 30 across a 4m daily transaction platform', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0016\",\"scenario\":\"Compare localized content for true stories accelerating production defect resolution by 30 across a 4m daily transaction platform\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/true-stories/accelerating-production-defect-resolution-by-30-across-a-4m-daily-transaction-platform\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/true-stories/reduzierung-der-problemloesungszeit-in-der-produktion-um-30-mit-claude-code-fuer-eine-hochvolumige-loyalty-plattform\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/true-stories/accelerating-production-defect-resolution-by-30-across-a-4m-daily-transaction-platform | https://infobeans.ai/true-stories/reduzierung-der-problemloesungszeit-in-der-produktion-um-30-mit-claude-code-fuer-eine-hochvolumige-loyalty-plattform\"}" });
    await page.goto("https://infobeans.ai/true-stories/accelerating-production-defect-resolution-by-30-across-a-4m-daily-transaction-platform", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/true-stories/reduzierung-der-problemloesungszeit-in-der-produktion-um-30-mit-claude-code-fuer-eine-hochvolumige-loyalty-plattform", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0017 | Compare localized content: blog', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0017\",\"scenario\":\"Compare localized content for blog\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/blog\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/de/blog\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/blog | https://infobeans.ai/de/blog\"}" });
    await page.goto("https://infobeans.ai/blog", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/de/blog", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0018 | Compare localized content: podcasts', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0018\",\"scenario\":\"Compare localized content for podcasts\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/podcasts\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/de/podcasts\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/podcasts | https://infobeans.ai/de/podcasts\"}" });
    await page.goto("https://infobeans.ai/podcasts", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/de/podcasts", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0019 | Compare localized content: true stories', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0019\",\"scenario\":\"Compare localized content for true stories\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/true-stories\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/de/wahre-geschichten\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/true-stories | https://infobeans.ai/de/wahre-geschichten\"}" });
    await page.goto("https://infobeans.ai/true-stories", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/de/wahre-geschichten", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0020 | Compare localized content: podcast creating wow a leadership journey rooted in curiosity culture human connection', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0020\",\"scenario\":\"Compare localized content for podcast creating wow a leadership journey rooted in curiosity culture human connection\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/podcast/creating-wow-a-leadership-journey-rooted-in-curiosity-culture-human-connection\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/podcast/eine-fuhrungsreise-die-in-neugier-kultur-und-menschlicher-verbundenheit-wurzelt\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/podcast/creating-wow-a-leadership-journey-rooted-in-curiosity-culture-human-connection | https://infobeans.ai/podcast/eine-fuhrungsreise-die-in-neugier-kultur-und-menschlicher-verbundenheit-wurzelt\"}" });
    await page.goto("https://infobeans.ai/podcast/creating-wow-a-leadership-journey-rooted-in-curiosity-culture-human-connection", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/podcast/eine-fuhrungsreise-die-in-neugier-kultur-und-menschlicher-verbundenheit-wurzelt", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0021 | Compare localized content: leadership', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0021\",\"scenario\":\"Compare localized content for leadership\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/leadership\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/de/fuehrungsteam\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/leadership | https://infobeans.ai/de/fuehrungsteam\"}" });
    await page.goto("https://infobeans.ai/leadership", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/de/fuehrungsteam", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0022 | Compare localized content: infobeans foundation', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0022\",\"scenario\":\"Compare localized content for infobeans foundation\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/infobeans-foundation\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/de/infobeans-stiftung\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/infobeans-foundation | https://infobeans.ai/de/infobeans-stiftung\"}" });
    await page.goto("https://infobeans.ai/infobeans-foundation", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/de/infobeans-stiftung", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0023 | Compare localized content: enterprise readiness', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0023\",\"scenario\":\"Compare localized content for enterprise readiness\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/enterprise-readiness\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/de/enterprise-readiness\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/enterprise-readiness | https://infobeans.ai/de/enterprise-readiness\"}" });
    await page.goto("https://infobeans.ai/enterprise-readiness", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/de/enterprise-readiness", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0024 | Compare localized content: investors', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0024\",\"scenario\":\"Compare localized content for investors\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/investors\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/de/investoren\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/investors | https://infobeans.ai/de/investoren\"}" });
    await page.goto("https://infobeans.ai/investors", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/de/investoren", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0025 | Compare localized content: careers', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0025\",\"scenario\":\"Compare localized content for careers\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/careers\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/de/karriere\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/careers | https://infobeans.ai/de/karriere\"}" });
    await page.goto("https://infobeans.ai/careers", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/de/karriere", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0026 | Compare localized content: true stories reducing hr operational costs by 20 and accelerating case resolution for 50000 employees', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0026\",\"scenario\":\"Compare localized content for true stories reducing hr operational costs by 20 and accelerating case resolution for 50000 employees\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/true-stories/reducing-hr-operational-costs-by-20-and-accelerating-case-resolution-for-50000-employees\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/true-stories/reduzierung-der-hr-betriebskosten-um-20-prozent-und-schnellere-fallbearbeitung\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/true-stories/reducing-hr-operational-costs-by-20-and-accelerating-case-resolution-for-50000-employees | https://infobeans.ai/true-stories/reduzierung-der-hr-betriebskosten-um-20-prozent-und-schnellere-fallbearbeitung\"}" });
    await page.goto("https://infobeans.ai/true-stories/reducing-hr-operational-costs-by-20-and-accelerating-case-resolution-for-50000-employees", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/true-stories/reduzierung-der-hr-betriebskosten-um-20-prozent-und-schnellere-fallbearbeitung", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0027 | Compare localized content: true stories driving 5x customer growth and 50 faster case routing via unified salesforce agentforce', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0027\",\"scenario\":\"Compare localized content for true stories driving 5x customer growth and 50 faster case routing via unified salesforce agentforce\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/true-stories/driving-5x-customer-growth-and-50-faster-case-routing-via-unified-salesforce-agentforce\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/true-stories/5x-kundenwachstum-durch-ki-gesteuerte-automatisierung-fur-indiens-grossten-industriellen-b2b-vertriebshandler\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/true-stories/driving-5x-customer-growth-and-50-faster-case-routing-via-unified-salesforce-agentforce | https://infobeans.ai/true-stories/5x-kundenwachstum-durch-ki-gesteuerte-automatisierung-fur-indiens-grossten-industriellen-b2b-vertriebshandler\"}" });
    await page.goto("https://infobeans.ai/true-stories/driving-5x-customer-growth-and-50-faster-case-routing-via-unified-salesforce-agentforce", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/true-stories/5x-kundenwachstum-durch-ki-gesteuerte-automatisierung-fur-indiens-grossten-industriellen-b2b-vertriebshandler", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0028 | Compare localized content: true stories tags cloud', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0028\",\"scenario\":\"Compare localized content for true stories tags cloud\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/true-stories/tags/cloud\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/de/wahre-geschichten\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/true-stories/tags/cloud | https://infobeans.ai/de/wahre-geschichten\"}" });
    await page.goto("https://infobeans.ai/true-stories/tags/cloud", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/de/wahre-geschichten", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0029 | Compare localized content: true stories tags bfsi', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0029\",\"scenario\":\"Compare localized content for true stories tags bfsi\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/true-stories/tags/bfsi\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/de/wahre-geschichten\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/true-stories/tags/bfsi | https://infobeans.ai/de/wahre-geschichten\"}" });
    await page.goto("https://infobeans.ai/true-stories/tags/bfsi", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/de/wahre-geschichten", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0030 | Compare localized content: true stories tags consumer goods', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0030\",\"scenario\":\"Compare localized content for true stories tags consumer goods\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/true-stories/tags/consumer-goods\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/de/wahre-geschichten\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/true-stories/tags/consumer-goods | https://infobeans.ai/de/wahre-geschichten\"}" });
    await page.goto("https://infobeans.ai/true-stories/tags/consumer-goods", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/de/wahre-geschichten", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0031 | Compare localized content: true stories tags gcc success', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0031\",\"scenario\":\"Compare localized content for true stories tags gcc success\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/true-stories/tags/gcc-success\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/de/wahre-geschichten\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/true-stories/tags/gcc-success | https://infobeans.ai/de/wahre-geschichten\"}" });
    await page.goto("https://infobeans.ai/true-stories/tags/gcc-success", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/de/wahre-geschichten", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0032 | Compare localized content: true stories tags sdo', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0032\",\"scenario\":\"Compare localized content for true stories tags sdo\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/true-stories/tags/sdo\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/de/wahre-geschichten\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/true-stories/tags/sdo | https://infobeans.ai/de/wahre-geschichten\"}" });
    await page.goto("https://infobeans.ai/true-stories/tags/sdo", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/de/wahre-geschichten", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0033 | Compare localized content: manufacturing', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0033\",\"scenario\":\"Compare localized content for manufacturing\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/manufacturing\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/de/fertigung-produktion\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/manufacturing | https://infobeans.ai/de/fertigung-produktion\"}" });
    await page.goto("https://infobeans.ai/manufacturing", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/de/fertigung-produktion", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0034 | Compare localized content: servicenow hrsd', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0034\",\"scenario\":\"Compare localized content for servicenow hrsd\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/servicenow-hrsd\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/de/servicenow-hrsd\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/servicenow-hrsd | https://infobeans.ai/de/servicenow-hrsd\"}" });
    await page.goto("https://infobeans.ai/servicenow-hrsd", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/de/servicenow-hrsd", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0035 | Compare localized content: contact us', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0035\",\"scenario\":\"Compare localized content for contact us\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/contact-us\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/de/kontakt\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/contact-us | https://infobeans.ai/de/kontakt\"}" });
    await page.goto("https://infobeans.ai/contact-us", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/de/kontakt", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0036 | Compare localized content: true stories cut embarkation time by 5x with agentic facial recognition and a reimagined guest journey', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0036\",\"scenario\":\"Compare localized content for true stories cut embarkation time by 5x with agentic facial recognition and a reimagined guest journey\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/true-stories/cut-embarkation-time-by-5x-with-agentic-facial-recognition-and-a-reimagined-guest-journey\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/true-stories/einschiffungszeit-um-das-funffache-verkuerzt-durch-ki-gestuetzte-gesichtserkennung-und-eine-neu-gestaltete-guest-journey\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/true-stories/cut-embarkation-time-by-5x-with-agentic-facial-recognition-and-a-reimagined-guest-journey | https://infobeans.ai/true-stories/einschiffungszeit-um-das-funffache-verkuerzt-durch-ki-gestuetzte-gesichtserkennung-und-eine-neu-gestaltete-guest-journey\"}" });
    await page.goto("https://infobeans.ai/true-stories/cut-embarkation-time-by-5x-with-agentic-facial-recognition-and-a-reimagined-guest-journey", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/true-stories/einschiffungszeit-um-das-funffache-verkuerzt-durch-ki-gestuetzte-gesichtserkennung-und-eine-neu-gestaltete-guest-journey", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0037 | Compare localized content: WOW story 42632', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0037\",\"scenario\":\"Compare localized content for WOW story 42632\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/?wow_story=42632\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/de/?wow_story=44797\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/?wow_story=42632 | https://infobeans.ai/de/?wow_story=44797\"}" });
    await page.goto("https://infobeans.ai/?wow_story=42632", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/de/?wow_story=44797", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0038 | Compare localized content: true stories gcc', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0038\",\"scenario\":\"Compare localized content for true stories gcc\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/true-stories/gcc\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/true-stories/die-automatisierung-von-hr-prozessen-optimierte-die-ablaufe\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/true-stories/gcc | https://infobeans.ai/true-stories/die-automatisierung-von-hr-prozessen-optimierte-die-ablaufe\"}" });
    await page.goto("https://infobeans.ai/true-stories/gcc", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/true-stories/die-automatisierung-von-hr-prozessen-optimierte-die-ablaufe", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0039 | Compare localized content: true stories driving it asset visibility and achieving up to 30 software cost savings for a global consulting firm', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0039\",\"scenario\":\"Compare localized content for true stories driving it asset visibility and achieving up to 30 software cost savings for a global consulting firm\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/true-stories/driving-it-asset-visibility-and-achieving-up-to-30-software-cost-savings-for-a-global-consulting-firm\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/true-stories/forderung-der-it-asset-transparenz-und-erzielung-von-bis-zu-30-software-kosteneinsparungen-fur-ein-globales-beratungsunternehmen\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/true-stories/driving-it-asset-visibility-and-achieving-up-to-30-software-cost-savings-for-a-global-consulting-firm | https://infobeans.ai/true-stories/forderung-der-it-asset-transparenz-und-erzielung-von-bis-zu-30-software-kosteneinsparungen-fur-ein-globales-beratungsunternehmen\"}" });
    await page.goto("https://infobeans.ai/true-stories/driving-it-asset-visibility-and-achieving-up-to-30-software-cost-savings-for-a-global-consulting-firm", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/true-stories/forderung-der-it-asset-transparenz-und-erzielung-von-bis-zu-30-software-kosteneinsparungen-fur-ein-globales-beratungsunternehmen", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0040 | Compare localized content: true stories helping a leading us bank detect risk before it becomes reality', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0040\",\"scenario\":\"Compare localized content for true stories helping a leading us bank detect risk before it becomes reality\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/true-stories/helping-a-leading-us-bank-detect-risk-before-it-becomes-reality\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/true-stories/unterstutzung-einer-fuhrenden-us-bank-bei-der-erkennung-von-risiken-bevor-diese-eintreten\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/true-stories/helping-a-leading-us-bank-detect-risk-before-it-becomes-reality | https://infobeans.ai/true-stories/unterstutzung-einer-fuhrenden-us-bank-bei-der-erkennung-von-risiken-bevor-diese-eintreten\"}" });
    await page.goto("https://infobeans.ai/true-stories/helping-a-leading-us-bank-detect-risk-before-it-becomes-reality", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/true-stories/unterstutzung-einer-fuhrenden-us-bank-bei-der-erkennung-von-risiken-bevor-diese-eintreten", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0041 | Compare localized content: true stories modernizing enterprise risk management for a global banking leader', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0041\",\"scenario\":\"Compare localized content for true stories modernizing enterprise risk management for a global banking leader\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/true-stories/modernizing-enterprise-risk-management-for-a-global-banking-leader\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/true-stories/modernisierung-des-unternehmensweiten-risikomanagements-fur-ein-fuhrendes-globales-bankinstitut\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/true-stories/modernizing-enterprise-risk-management-for-a-global-banking-leader | https://infobeans.ai/true-stories/modernisierung-des-unternehmensweiten-risikomanagements-fur-ein-fuhrendes-globales-bankinstitut\"}" });
    await page.goto("https://infobeans.ai/true-stories/modernizing-enterprise-risk-management-for-a-global-banking-leader", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/true-stories/modernisierung-des-unternehmensweiten-risikomanagements-fur-ein-fuhrendes-globales-bankinstitut", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0042 | Compare localized content: true stories transforming the digital insurance buying experience for one of menas largest insurers', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0042\",\"scenario\":\"Compare localized content for true stories transforming the digital insurance buying experience for one of menas largest insurers\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/true-stories/transforming-the-digital-insurance-buying-experience-for-one-of-menas-largest-insurers\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/true-stories/transformation-des-digitalen-kauferlebnisses-fur-versicherungen-fur-einen-der-grossten-versicherer-der-mena-region\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/true-stories/transforming-the-digital-insurance-buying-experience-for-one-of-menas-largest-insurers | https://infobeans.ai/true-stories/transformation-des-digitalen-kauferlebnisses-fur-versicherungen-fur-einen-der-grossten-versicherer-der-mena-region\"}" });
    await page.goto("https://infobeans.ai/true-stories/transforming-the-digital-insurance-buying-experience-for-one-of-menas-largest-insurers", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/true-stories/transformation-des-digitalen-kauferlebnisses-fur-versicherungen-fur-einen-der-grossten-versicherer-der-mena-region", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0043 | Compare localized content: true stories enabling global insurers with 24x7 intelligent application support', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0043\",\"scenario\":\"Compare localized content for true stories enabling global insurers with 24x7 intelligent application support\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/true-stories/enabling-global-insurers-with-24x7-intelligent-application-support\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/true-stories/247-intelligenter-anwendungs-support-fur-globale-versicherer\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/true-stories/enabling-global-insurers-with-24x7-intelligent-application-support | https://infobeans.ai/true-stories/247-intelligenter-anwendungs-support-fur-globale-versicherer\"}" });
    await page.goto("https://infobeans.ai/true-stories/enabling-global-insurers-with-24x7-intelligent-application-support", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/true-stories/247-intelligenter-anwendungs-support-fur-globale-versicherer", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0044 | Compare localized content: true stories streamlined data protection optimized 12 connectors for fortune 500 scalability and reliability', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0044\",\"scenario\":\"Compare localized content for true stories streamlined data protection optimized 12 connectors for fortune 500 scalability and reliability\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/true-stories/streamlined-data-protection-optimized-12-connectors-for-fortune-500-scalability-and-reliability\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/true-stories/optimierter-datenschutz-12-connectors-skalierbarkeit-zuverlaessigkeit-fortune-500-unternehmen\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/true-stories/streamlined-data-protection-optimized-12-connectors-for-fortune-500-scalability-and-reliability | https://infobeans.ai/true-stories/optimierter-datenschutz-12-connectors-skalierbarkeit-zuverlaessigkeit-fortune-500-unternehmen\"}" });
    await page.goto("https://infobeans.ai/true-stories/streamlined-data-protection-optimized-12-connectors-for-fortune-500-scalability-and-reliability", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/true-stories/optimierter-datenschutz-12-connectors-skalierbarkeit-zuverlaessigkeit-fortune-500-unternehmen", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0045 | Compare localized content: true stories optimized legacy product sustenance to drive 2m annual operational savings', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0045\",\"scenario\":\"Compare localized content for true stories optimized legacy product sustenance to drive 2m annual operational savings\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/true-stories/optimized-legacy-product-sustenance-to-drive-2m-annual-operational-savings\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/true-stories/optimierte-pflege-legacy-produkte-jaehrliche-betriebseinsparungen-2-mio-dollar\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/true-stories/optimized-legacy-product-sustenance-to-drive-2m-annual-operational-savings | https://infobeans.ai/true-stories/optimierte-pflege-legacy-produkte-jaehrliche-betriebseinsparungen-2-mio-dollar\"}" });
    await page.goto("https://infobeans.ai/true-stories/optimized-legacy-product-sustenance-to-drive-2m-annual-operational-savings", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/true-stories/optimierte-pflege-legacy-produkte-jaehrliche-betriebseinsparungen-2-mio-dollar", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0046 | Compare localized content: true stories increased internet speeds for over 250000 consumers in low connectivity areas', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0046\",\"scenario\":\"Compare localized content for true stories increased internet speeds for over 250000 consumers in low connectivity areas\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/true-stories/increased-internet-speeds-for-over-250000-consumers-in-low-connectivity-areas\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/true-stories/hoehere-internetgeschwindigkeiten-fuer-ueber-250000-verbraucher-in-gebieten-mit-schlechter-netzabdeckung\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/true-stories/increased-internet-speeds-for-over-250000-consumers-in-low-connectivity-areas | https://infobeans.ai/true-stories/hoehere-internetgeschwindigkeiten-fuer-ueber-250000-verbraucher-in-gebieten-mit-schlechter-netzabdeckung\"}" });
    await page.goto("https://infobeans.ai/true-stories/increased-internet-speeds-for-over-250000-consumers-in-low-connectivity-areas", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/true-stories/hoehere-internetgeschwindigkeiten-fuer-ueber-250000-verbraucher-in-gebieten-mit-schlechter-netzabdeckung", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0047 | Compare localized content: true stories accelerated delivery velocity by 3x with claude code', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0047\",\"scenario\":\"Compare localized content for true stories accelerated delivery velocity by 3x with claude code\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/true-stories/accelerated-delivery-velocity-by-3x-with-claude-code\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/true-stories/dreifache-beschleunigung-der-liefergeschwindigkeit-mit-claude-code\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/true-stories/accelerated-delivery-velocity-by-3x-with-claude-code | https://infobeans.ai/true-stories/dreifache-beschleunigung-der-liefergeschwindigkeit-mit-claude-code\"}" });
    await page.goto("https://infobeans.ai/true-stories/accelerated-delivery-velocity-by-3x-with-claude-code", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/true-stories/dreifache-beschleunigung-der-liefergeschwindigkeit-mit-claude-code", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0048 | Compare localized content: true stories accelerating order fulfillment by 40 and driving a 65 increase in self service adoption for a leading jewelry retailer', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0048\",\"scenario\":\"Compare localized content for true stories accelerating order fulfillment by 40 and driving a 65 increase in self service adoption for a leading jewelry retailer\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/true-stories/accelerating-order-fulfillment-by-40-and-driving-a-65-increase-in-self-service-adoption-for-a-leading-jewelry-retailer\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/true-stories/beschleunigung-der-auftragsabwicklung-um-40-und-steigerung-der-self-service-adoption-um-65-bei-einem-fuhrenden-schmuckeinzelhandler\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/true-stories/accelerating-order-fulfillment-by-40-and-driving-a-65-increase-in-self-service-adoption-for-a-leading-jewelry-retailer | https://infobeans.ai/true-stories/beschleunigung-der-auftragsabwicklung-um-40-und-steigerung-der-self-service-adoption-um-65-bei-einem-fuhrenden-schmuckeinzelhandler\"}" });
    await page.goto("https://infobeans.ai/true-stories/accelerating-order-fulfillment-by-40-and-driving-a-65-increase-in-self-service-adoption-for-a-leading-jewelry-retailer", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/true-stories/beschleunigung-der-auftragsabwicklung-um-40-und-steigerung-der-self-service-adoption-um-65-bei-einem-fuhrenden-schmuckeinzelhandler", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0049 | Compare localized content: true stories scaling global hrsd csm transformation across 100 countries for 300000 employees', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0049\",\"scenario\":\"Compare localized content for true stories scaling global hrsd csm transformation across 100 countries for 300000 employees\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/true-stories/scaling-global-hrsd-csm-transformation-across-100-countries-for-300000-employees\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/true-stories/skalierung-der-globalen-hrsd-csm-transformation-uber-100-lander-fur-mehr-als-300-000-mitarbeiter\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/true-stories/scaling-global-hrsd-csm-transformation-across-100-countries-for-300000-employees | https://infobeans.ai/true-stories/skalierung-der-globalen-hrsd-csm-transformation-uber-100-lander-fur-mehr-als-300-000-mitarbeiter\"}" });
    await page.goto("https://infobeans.ai/true-stories/scaling-global-hrsd-csm-transformation-across-100-countries-for-300000-employees", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/true-stories/skalierung-der-globalen-hrsd-csm-transformation-uber-100-lander-fur-mehr-als-300-000-mitarbeiter", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0050 | Compare localized content: vops and azure', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0050\",\"scenario\":\"Compare localized content for vops and azure\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/devops-and-azure\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/de/devops-pakete\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/devops-and-azure | https://infobeans.ai/de/devops-pakete\"}" });
    await page.goto("https://infobeans.ai/devops-and-azure", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/de/devops-pakete", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0051 | Compare localized content: data mind ai storage optimizer', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0051\",\"scenario\":\"Compare localized content for data mind ai storage optimizer\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/data-mind-ai-storage-optimizer\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/de/data-mind-ai-storage-optimizer\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/data-mind-ai-storage-optimizer | https://infobeans.ai/de/data-mind-ai-storage-optimizer\"}" });
    await page.goto("https://infobeans.ai/data-mind-ai-storage-optimizer", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/de/data-mind-ai-storage-optimizer", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0052 | Compare localized content: qa automation', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0052\",\"scenario\":\"Compare localized content for qa automation\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/qa-automation\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/de/qa-automation\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/qa-automation | https://infobeans.ai/de/qa-automation\"}" });
    await page.goto("https://infobeans.ai/qa-automation", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/de/qa-automation", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0053 | Compare localized content: true stories how a consumer goods manufacturer took a three pillar fusion rollout from 8 months to 5', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0053\",\"scenario\":\"Compare localized content for true stories how a consumer goods manufacturer took a three pillar fusion rollout from 8 months to 5\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/true-stories/how-a-consumer-goods-manufacturer-took-a-three-pillar-fusion-rollout-from-8-months-to-5\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/true-stories/wie-ein-konsumgueterhersteller-eine-dreistellige-fusion-einfuehrung-von-8-monaten-auf-5-verkuerzte\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/true-stories/how-a-consumer-goods-manufacturer-took-a-three-pillar-fusion-rollout-from-8-months-to-5 | https://infobeans.ai/true-stories/wie-ein-konsumgueterhersteller-eine-dreistellige-fusion-einfuehrung-von-8-monaten-auf-5-verkuerzte\"}" });
    await page.goto("https://infobeans.ai/true-stories/how-a-consumer-goods-manufacturer-took-a-three-pillar-fusion-rollout-from-8-months-to-5", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/true-stories/wie-ein-konsumgueterhersteller-eine-dreistellige-fusion-einfuehrung-von-8-monaten-auf-5-verkuerzte", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0054 | Compare localized content: true stories how agents took over regression for a building products distributor cut the effort 60 and caught a shipping defect first', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0054\",\"scenario\":\"Compare localized content for true stories how agents took over regression for a building products distributor cut the effort 60 and caught a shipping defect first\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/true-stories/how-agents-took-over-regression-for-a-building-products-distributor-cut-the-effort-60-and-caught-a-shipping-defect-first\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/true-stories/wie-agenten-die-regression-fuer-einen-baustoffhaendler-uebernahmen-den-aufwand-um-60-reduzierten-und-einen-versandfehler-als-erstes-aufdeckten\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/true-stories/how-agents-took-over-regression-for-a-building-products-distributor-cut-the-effort-60-and-caught-a-shipping-defect-first | https://infobeans.ai/true-stories/wie-agenten-die-regression-fuer-einen-baustoffhaendler-uebernahmen-den-aufwand-um-60-reduzierten-und-einen-versandfehler-als-erstes-aufdeckten\"}" });
    await page.goto("https://infobeans.ai/true-stories/how-agents-took-over-regression-for-a-building-products-distributor-cut-the-effort-60-and-caught-a-shipping-defect-first", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/true-stories/wie-agenten-die-regression-fuer-einen-baustoffhaendler-uebernahmen-den-aufwand-um-60-reduzierten-und-einen-versandfehler-als-erstes-aufdeckten", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0055 | Compare localized content: ai is accelerating enterprise delivery reliability and assurance intelligence is the layer keeping it trustworthy', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0055\",\"scenario\":\"Compare localized content for ai is accelerating enterprise delivery reliability and assurance intelligence is the layer keeping it trustworthy\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/ai-is-accelerating-enterprise-delivery-reliability-and-assurance-intelligence-is-the-layer-keeping-it-trustworthy\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/ki-beschleunigt-die-bereitstellung-in-unternehmen-reliability-and-assurance-intelligence-ist-die-ebene-die-dafuer-sorgt-dass-sie-vertrauenswuerdig-bleibt\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/ai-is-accelerating-enterprise-delivery-reliability-and-assurance-intelligence-is-the-layer-keeping-it-trustworthy | https://infobeans.ai/ki-beschleunigt-die-bereitstellung-in-unternehmen-reliability-and-assurance-intelligence-ist-die-ebene-die-dafuer-sorgt-dass-sie-vertrauenswuerdig-bleibt\"}" });
    await page.goto("https://infobeans.ai/ai-is-accelerating-enterprise-delivery-reliability-and-assurance-intelligence-is-the-layer-keeping-it-trustworthy", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/ki-beschleunigt-die-bereitstellung-in-unternehmen-reliability-and-assurance-intelligence-ist-die-ebene-die-dafuer-sorgt-dass-sie-vertrauenswuerdig-bleibt", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0056 | Compare localized content: why salesforce teams trust beantrail and beantrail agent for complete field history confidence', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0056\",\"scenario\":\"Compare localized content for why salesforce teams trust beantrail and beantrail agent for complete field history confidence\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/why-salesforce-teams-trust-beantrail-and-beantrail-agent-for-complete-field-history-confidence\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/warum-salesforce-teams-auf-beantrail-und-den-beantrail-agenten-setzen-fuer-lueckenloses-vertrauen-in-ihre-feldhistorie\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/why-salesforce-teams-trust-beantrail-and-beantrail-agent-for-complete-field-history-confidence | https://infobeans.ai/warum-salesforce-teams-auf-beantrail-und-den-beantrail-agenten-setzen-fuer-lueckenloses-vertrauen-in-ihre-feldhistorie\"}" });
    await page.goto("https://infobeans.ai/why-salesforce-teams-trust-beantrail-and-beantrail-agent-for-complete-field-history-confidence", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/warum-salesforce-teams-auf-beantrail-und-den-beantrail-agenten-setzen-fuer-lueckenloses-vertrauen-in-ihre-feldhistorie", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0057 | Compare localized content: infobeans earns ecovadis bronze medal rated among the top 35 of companies assessed', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0057\",\"scenario\":\"Compare localized content for infobeans earns ecovadis bronze medal rated among the top 35 of companies assessed\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/infobeans-earns-ecovadis-bronze-medal-rated-among-the-top-35-of-companies-assessed\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/infobeans-erhalt-ecovadis-bronze-medaille-und-gehort-zu-den-besten-35-der-bewerteten-unternehmen\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/infobeans-earns-ecovadis-bronze-medal-rated-among-the-top-35-of-companies-assessed | https://infobeans.ai/infobeans-erhalt-ecovadis-bronze-medaille-und-gehort-zu-den-besten-35-der-bewerteten-unternehmen\"}" });
    await page.goto("https://infobeans.ai/infobeans-earns-ecovadis-bronze-medal-rated-among-the-top-35-of-companies-assessed", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/infobeans-erhalt-ecovadis-bronze-medaille-und-gehort-zu-den-besten-35-der-bewerteten-unternehmen", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0058 | Compare localized content: oracle ai world 2026', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0058\",\"scenario\":\"Compare localized content for oracle ai world 2026\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/oracle-ai-world-2026\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/treffen-sie-infobeans-auf-der-oracle-ai-world-2026\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/oracle-ai-world-2026 | https://infobeans.ai/treffen-sie-infobeans-auf-der-oracle-ai-world-2026\"}" });
    await page.goto("https://infobeans.ai/oracle-ai-world-2026", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/treffen-sie-infobeans-auf-der-oracle-ai-world-2026", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0059 | Compare localized content: podcast creating wow 33 years of fun learning fearless innovation', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0059\",\"scenario\":\"Compare localized content for podcast creating wow 33 years of fun learning fearless innovation\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/podcast/creating-wow-33-years-of-fun-learning-fearless-innovation\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/podcast/creating-wow-33-jahre-voller-spass-lernen-und-furchtloser-innovation\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/podcast/creating-wow-33-years-of-fun-learning-fearless-innovation | https://infobeans.ai/podcast/creating-wow-33-jahre-voller-spass-lernen-und-furchtloser-innovation\"}" });
    await page.goto("https://infobeans.ai/podcast/creating-wow-33-years-of-fun-learning-fearless-innovation", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/podcast/creating-wow-33-jahre-voller-spass-lernen-und-furchtloser-innovation", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0060 | Compare localized content: itep', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0060\",\"scenario\":\"Compare localized content for itep\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/itep\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/de/itep\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/itep | https://infobeans.ai/de/itep\"}" });
    await page.goto("https://infobeans.ai/itep", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/de/itep", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0061 | Compare localized content: WOW story 42631', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0061\",\"scenario\":\"Compare localized content for WOW story 42631\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/?wow_story=42631\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/de/?wow_story=44797\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/?wow_story=42631 | https://infobeans.ai/de/?wow_story=44797\"}" });
    await page.goto("https://infobeans.ai/?wow_story=42631", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/de/?wow_story=44797", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0062 | Compare localized content: WOW story 42630', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0062\",\"scenario\":\"Compare localized content for WOW story 42630\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/?wow_story=42630\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/de/?wow_story=44797\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/?wow_story=42630 | https://infobeans.ai/de/?wow_story=44797\"}" });
    await page.goto("https://infobeans.ai/?wow_story=42630", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/de/?wow_story=44797", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0063 | Compare localized content: true stories created a chatgpt 3 5 enabled solution that extracts relevant information from a company knowledge base', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0063\",\"scenario\":\"Compare localized content for true stories created a chatgpt 3 5 enabled solution that extracts relevant information from a company knowledge base\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/true-stories/created-a-chatgpt-3-5-enabled-solution-that-extracts-relevant-information-from-a-company-knowledge-base\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/true-stories/ein-gpt-gestutztes-system-optimierte-die-employee-experience\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/true-stories/created-a-chatgpt-3-5-enabled-solution-that-extracts-relevant-information-from-a-company-knowledge-base | https://infobeans.ai/true-stories/ein-gpt-gestutztes-system-optimierte-die-employee-experience\"}" });
    await page.goto("https://infobeans.ai/true-stories/created-a-chatgpt-3-5-enabled-solution-that-extracts-relevant-information-from-a-company-knowledge-base", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/true-stories/ein-gpt-gestutztes-system-optimierte-die-employee-experience", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0064 | Compare localized content: managed support', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0064\",\"scenario\":\"Compare localized content for managed support\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/managed-support\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/de/managed-support\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/managed-support | https://infobeans.ai/de/managed-support\"}" });
    await page.goto("https://infobeans.ai/managed-support", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/de/managed-support", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0065 | Compare localized content: lighthouse', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0065\",\"scenario\":\"Compare localized content for lighthouse\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/lighthouse\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/de/lighthouse\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/lighthouse | https://infobeans.ai/de/lighthouse\"}" });
    await page.goto("https://infobeans.ai/lighthouse", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/de/lighthouse", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0066 | Compare localized content: expona', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0066\",\"scenario\":\"Compare localized content for expona\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/expona\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/expona-produkt\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/expona | https://infobeans.ai/expona-produkt\"}" });
    await page.goto("https://infobeans.ai/expona", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/expona-produkt", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0067 | Compare localized content: insanesdd', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0067\",\"scenario\":\"Compare localized content for insanesdd\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/insanesdd\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/insanesdd-produkt\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/insanesdd | https://infobeans.ai/insanesdd-produkt\"}" });
    await page.goto("https://infobeans.ai/insanesdd", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/insanesdd-produkt", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0068 | Compare localized content: ibf registration', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0068\",\"scenario\":\"Compare localized content for ibf registration\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/ibf-registration\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/de/bf-registrierung\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/ibf-registration | https://infobeans.ai/de/bf-registrierung\"}" });
    await page.goto("https://infobeans.ai/ibf-registration", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/de/bf-registrierung", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0069 | Compare localized content: why is growth hard to predict for chemical manufacturers', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0069\",\"scenario\":\"Compare localized content for why is growth hard to predict for chemical manufacturers\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/why-is-growth-hard-to-predict-for-chemical-manufacturers\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/warum-ist-wachstum-fuer-chemiehersteller-so-schwer-vorherzusagen\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/why-is-growth-hard-to-predict-for-chemical-manufacturers | https://infobeans.ai/warum-ist-wachstum-fuer-chemiehersteller-so-schwer-vorherzusagen\"}" });
    await page.goto("https://infobeans.ai/why-is-growth-hard-to-predict-for-chemical-manufacturers", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/warum-ist-wachstum-fuer-chemiehersteller-so-schwer-vorherzusagen", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0070 | Compare localized content: unlocking success how salesforce nonprofit cloud can revolutionize sdos', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0070\",\"scenario\":\"Compare localized content for unlocking success how salesforce nonprofit cloud can revolutionize sdos\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/unlocking-success-how-salesforce-nonprofit-cloud-can-revolutionize-sdos\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/wie-revolutioniert-salesforce-nonprofit-cloud-sdos\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/unlocking-success-how-salesforce-nonprofit-cloud-can-revolutionize-sdos | https://infobeans.ai/wie-revolutioniert-salesforce-nonprofit-cloud-sdos\"}" });
    await page.goto("https://infobeans.ai/unlocking-success-how-salesforce-nonprofit-cloud-can-revolutionize-sdos", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/wie-revolutioniert-salesforce-nonprofit-cloud-sdos", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0071 | Compare localized content: how ai cut our user research synthesis time in half and made our insights 3x better', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0071\",\"scenario\":\"Compare localized content for how ai cut our user research synthesis time in half and made our insights 3x better\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/how-ai-cut-our-user-research-synthesis-time-in-half-and-made-our-insights-3x-better\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/der-traditionelle-research-engpass-er-bremst-den-schwung-der-innovation\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/how-ai-cut-our-user-research-synthesis-time-in-half-and-made-our-insights-3x-better | https://infobeans.ai/der-traditionelle-research-engpass-er-bremst-den-schwung-der-innovation\"}" });
    await page.goto("https://infobeans.ai/how-ai-cut-our-user-research-synthesis-time-in-half-and-made-our-insights-3x-better", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/der-traditionelle-research-engpass-er-bremst-den-schwung-der-innovation", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });

  test('TC_LOC_0072 | Compare localized content: balancing growth governance ai strategy for salesforce financial services cloud', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_LOC_0072\",\"scenario\":\"Compare localized content for balancing growth governance ai strategy for salesforce financial services cloud\",\"description\":\"Capture English and German title, main heading, and representative body text for review without failing on valid translation differences.\",\"preconditions\":\"Both locale-specific URLs are reachable.\",\"steps\":[\"Open English page https://infobeans.ai/balancing-growth-governance-ai-strategy-for-salesforce-financial-services-cloud\",\"Capture title, H1, language, and representative body text\",\"Open German page https://infobeans.ai/ki-strategie-fur-salesforce-financial-services-cloud\",\"Capture equivalent German content and verify the document language\"],\"expectedResult\":\"Both localized pages load with content and the correct language. Translation differences are recorded for review, not incorrectly failed.\",\"pageUrl\":\"https://infobeans.ai/balancing-growth-governance-ai-strategy-for-salesforce-financial-services-cloud | https://infobeans.ai/ki-strategie-fur-salesforce-financial-services-cloud\"}" });
    await page.goto("https://infobeans.ai/balancing-growth-governance-ai-strategy-for-salesforce-financial-services-cloud", { waitUntil: 'domcontentloaded' });
    const english = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    await page.goto("https://infobeans.ai/ki-strategie-fur-salesforce-financial-services-cloud", { waitUntil: 'domcontentloaded' });
    const german = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      language: document.documentElement.lang,
      heading: document.querySelector('main h1')?.innerText.trim() || '',
      headings: [...document.querySelectorAll('main h1,main h2,main h3')].map(node => node.innerText.trim()).filter(Boolean),
      bodyText: (document.querySelector('main')?.innerText || '').trim().replace(/\s+/g, ' '),
      boldText: [...document.querySelectorAll('main strong,main b')].map(node => node.innerText.trim()).filter(Boolean),
      paragraphCount: document.querySelectorAll('main p').length,
      lineBreakCount: document.querySelectorAll('main br').length,
      internalLinkCount: [...document.querySelectorAll('main a[href]')].filter(anchor => new URL(anchor.href).origin === location.origin).length,
      punctuation: ((document.querySelector('main')?.innerText || '').match(/[.!?;:]/g) || []).length,
      numberTokens: [...new Set(((document.querySelector('main')?.innerText || '').match(/\b\d+(?:[.,]\d+)*%?\b/g) || []))],
    }));
    const possibleTranslationIssues = [];
    if (english.heading && german.heading && english.heading.toLocaleLowerCase() === german.heading.toLocaleLowerCase()) {
      possibleTranslationIssues.push({
        englishText: english.heading,
        germanText: german.heading,
        issue: 'Main heading is identical in both locales; manual review is recommended (brand names may be valid).',
      });
    }
    const normalizeNumbers = values => values.map(value => value.replace(/[.,]/g, ''));
    if (JSON.stringify(normalizeNumbers(english.numberTokens)) !== JSON.stringify(normalizeNumbers(german.numberTokens))) {
      possibleTranslationIssues.push({
        englishText: english.numberTokens.join(', '),
        germanText: german.numberTokens.join(', '),
        issue: 'Numerical tokens differ; verify the values and localized formatting manually.',
      });
    }
    if (english.boldText.length !== german.boldText.length) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify(english.boldText),
        germanText: JSON.stringify(german.boldText),
        issue: 'The number of highlighted/bold text segments differs between locales.',
      });
    }
    if (english.paragraphCount !== german.paragraphCount || english.lineBreakCount !== german.lineBreakCount) {
      possibleTranslationIssues.push({
        englishText: JSON.stringify({ paragraphs: english.paragraphCount, lineBreaks: english.lineBreakCount }),
        germanText: JSON.stringify({ paragraphs: german.paragraphCount, lineBreaks: german.lineBreakCount }),
        issue: 'Paragraph or line-break counts differ; review the formatting in context.',
      });
    }
    if (english.internalLinkCount !== german.internalLinkCount) {
      possibleTranslationIssues.push({
        englishText: String(english.internalLinkCount),
        germanText: String(german.internalLinkCount),
        issue: 'The number of internal links differs; review the localized page navigation and content links.',
      });
    }
    if (english.punctuation !== german.punctuation) {
      possibleTranslationIssues.push({
        englishText: String(english.punctuation),
        germanText: String(german.punctuation),
        issue: 'Punctuation counts differ; review the text in context rather than treating grammar differences as failures.',
      });
    }
    for (const unchangedHeading of english.headings.filter(text =>
      text.length >= 20 && german.bodyText.includes(text))) {
      if (possibleTranslationIssues.some(issue => issue.englishText === unchangedHeading)) continue;
      possibleTranslationIssues.push({
        englishText: unchangedHeading,
        germanText: unchangedHeading,
        issue: 'An English heading appears verbatim in German page content; manual translation review is recommended.',
      });
    }
    testInfo.annotations.push({
      type: 'localization-comparison',
      description: JSON.stringify({ english, german, possibleTranslationIssues }),
    });
    testInfo.annotations.push({
      type: 'actual-result',
      description: JSON.stringify({ englishUrl: english.url, germanUrl: german.url, possibleTranslationIssues }),
    });

    expect(english.title).not.toBe('');
    expect(english.heading).not.toBe('');
    expect(english.language).toMatch(/^en/i);
    expect(german.title).not.toBe('');
    expect(german.heading).not.toBe('');
    expect(german.language).toMatch(/^de/i);
  });
});
