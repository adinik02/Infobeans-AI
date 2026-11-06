const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require('@playwright/test');

const origins = {
  english: 'https://infobeans.ai/',
  german: 'https://infobeans.ai/de/',
};
const outputFile = path.resolve(__dirname, '..', 'test-data', 'site-map.json');
const maxPages = Number(process.env.MAX_PAGES || 500);
const concurrency = Number(process.env.CRAWL_CONCURRENCY || 1);
const ignoredQueryParams = new Set([
  'fbclid',
  'gclid',
  'utm_campaign',
  'utm_content',
  'utm_medium',
  'utm_source',
  'utm_term',
]);

function normalizeUrl(value) {
  const url = new URL(value);
  url.hash = '';
  for (const key of [...url.searchParams.keys()]) {
    if (ignoredQueryParams.has(key.toLowerCase())) url.searchParams.delete(key);
  }
  return url.href.replace(/\/$/, url.pathname === '/' ? '/' : '');
}

function localeFor(url) {
  return new URL(url).pathname === '/de' || new URL(url).pathname.startsWith('/de/')
    ? 'german'
    : 'english';
}

function localeForDocument(language, url) {
  const documentLanguage = (language || '').toLowerCase();
  if (documentLanguage.startsWith('de')) return 'german';
  if (documentLanguage.startsWith('en')) return 'english';
  return localeFor(url);
}

function isPageUrl(url) {
  const parsed = new URL(url);
  if (parsed.origin !== 'https://infobeans.ai') return false;
  if (/\.(?:aac|avif|css|docx?|flac|gif|ico|jpe?g|js|m4a|m4v|mp[34]|pdf|png|pptx?|svg|wav|webp|woff2?|xlsx?|xml|zip)$/i.test(parsed.pathname)) return false;
  if (/\/wp-content\/uploads\/.*\.html?$/i.test(parsed.pathname)) return false;
  return !['mailto:', 'tel:', 'javascript:'].includes(parsed.protocol);
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ javaScriptEnabled: false });
  const queue = Object.entries(origins).map(([locale, url]) => ({
    locale,
    url: normalizeUrl(url),
    discoveredFrom: null,
  }));
  const scheduled = new Set(queue.map(item => item.url));
  const visited = new Map();
  const failures = [];
  let nextUrl = 0;

  try {
    const crawlWorker = async workerNumber => {
      const page = await context.newPage();
      await page.route('**/*', route => {
        const resourceType = route.request().resourceType();
        if (['font', 'image', 'media', 'script', 'stylesheet'].includes(resourceType)) {
          return route.abort();
        }
        return route.continue();
      });
      try {
        while (nextUrl < queue.length && visited.size < maxPages) {
          const current = queue[nextUrl++];
          if (visited.has(current.url)) continue;

          const record = {
            locale: current.locale,
            requestedUrl: current.url,
            url: current.url,
            discoveredFrom: current.discoveredFrom,
            status: null,
            title: '',
            headings: [],
            language: '',
            internalLinks: [],
            externalLinks: [],
            headerLinks: [],
            footerLinks: [],
            languageAlternates: [],
            imageCount: 0,
            brokenImages: [],
            error: null,
          };

          try {
            const response = await context.request.get(current.url, { timeout: 15000 });
            record.status = response.status();
            record.url = normalizeUrl(response.url());
            record.locale = localeFor(record.url);
            const html = await response.text();
            const baseTag = `<base href="${response.url()}">`;
            const htmlWithBase = html.replace(/<head(\s[^>]*)?>/i, match => `${match}${baseTag}`);
            await page.setContent(htmlWithBase, { waitUntil: 'commit', timeout: 15000 });
            const pageData = await page.evaluate(() => {
              const anchors = [...document.querySelectorAll('a[href]')].map(anchor => ({
                label: (anchor.innerText || anchor.textContent || anchor.getAttribute('aria-label') || anchor.title || anchor.querySelector('img')?.alt || '')
                  .trim()
                  .replace(/\s+/g, ' ')
                  .slice(0, 160),
                url: anchor.href,
              }));
              const collectLinks = root => root
                ? [...root.querySelectorAll('a[href]')].map(anchor => ({
                  label: (anchor.innerText || anchor.textContent || anchor.getAttribute('aria-label') || anchor.title || anchor.querySelector('img')?.alt || '')
                    .trim()
                    .replace(/\s+/g, ' ')
                    .slice(0, 160),
                  url: anchor.href,
                }))
                : [];
              const images = [...document.images].map(image => ({
                src: image.currentSrc || image.src,
                alt: image.getAttribute('alt'),
              }));
              return {
                title: document.title,
                language: document.documentElement.lang,
                languageAlternates: [...document.querySelectorAll('link[rel="alternate"][hreflang]')]
                  .map(link => ({ language: link.hreflang, url: link.href })),
                headings: [...document.querySelectorAll('h1,h2')].map(heading => ({
                  level: heading.tagName.toLowerCase(),
                  text: heading.innerText.trim().replace(/\s+/g, ' '),
                })).filter(heading => heading.text),
                links: anchors,
                headerLinks: collectLinks(document.querySelector('header,[role="banner"]')),
                footerLinks: collectLinks(document.querySelector('footer,[role="contentinfo"]')),
                images,
              };
            });

            record.title = pageData.title;
            record.language = pageData.language;
            record.locale = localeForDocument(pageData.language, record.url);
            record.headings = pageData.headings;
            record.languageAlternates = pageData.languageAlternates;
            record.imageCount = pageData.images.length;
            record.brokenImages = pageData.images.filter(image => image.alt === null);

            const discoveredLinks = [
              ...pageData.links,
              ...pageData.languageAlternates.map(alternate => ({
                label: `hreflang:${alternate.language}`,
                url: alternate.url,
              })),
            ];
            for (const link of discoveredLinks) {
              const linkUrl = normalizeUrl(link.url);
              const linkRecord = { label: link.label, url: linkUrl };
              if (!isPageUrl(linkUrl)) {
                if (/^https?:$/.test(new URL(linkUrl).protocol) && !record.externalLinks.some(item => item.url === linkRecord.url && item.label === linkRecord.label)) {
                  record.externalLinks.push(linkRecord);
                }
                continue;
              }
              if (!record.internalLinks.some(item => item.url === linkRecord.url && item.label === linkRecord.label)) {
                record.internalLinks.push(linkRecord);
              }
              if (!scheduled.has(linkUrl)) {
                scheduled.add(linkUrl);
                queue.push({
                  locale: localeFor(linkUrl),
                  url: linkUrl,
                  discoveredFrom: current.url,
                });
              }
            }
            record.headerLinks = pageData.headerLinks.map(link => ({
              label: link.label,
              url: normalizeUrl(link.url),
              internal: isPageUrl(link.url),
            }));
            record.footerLinks = pageData.footerLinks.map(link => ({
              label: link.label,
              url: normalizeUrl(link.url),
              internal: isPageUrl(link.url),
            }));
          } catch (error) {
            record.error = error.message;
            failures.push({ url: current.url, error: error.message });
          }

          visited.set(current.url, record);
          console.log(`${visited.size}/${maxPages} worker-${workerNumber} ${record.status || 'ERR'} ${record.url}`);
        }
      } finally {
        await page.close();
      }
    };

    await Promise.all(Array.from(
      { length: concurrency },
      (_, index) => crawlWorker(index + 1),
    ));

    const recordsByUrl = new Map();
    for (const record of visited.values()) {
      const existing = recordsByUrl.get(record.url);
      if (!existing) {
        recordsByUrl.set(record.url, {
          ...record,
          requestedUrls: [record.requestedUrl],
          discoveredFromUrls: record.discoveredFrom ? [record.discoveredFrom] : [],
        });
        continue;
      }

      existing.requestedUrls = [...new Set([...existing.requestedUrls, record.requestedUrl])];
      existing.discoveredFromUrls = [...new Set([
        ...existing.discoveredFromUrls,
        ...(record.discoveredFrom ? [record.discoveredFrom] : []),
      ])];
      for (const key of ['internalLinks', 'externalLinks', 'headerLinks', 'footerLinks', 'languageAlternates', 'brokenImages']) {
        const merged = new Map([...existing[key], ...record[key]].map(item => [JSON.stringify(item), item]));
        existing[key] = [...merged.values()];
      }
      if (!existing.title && record.title) existing.title = record.title;
      if (!existing.language && record.language) existing.language = record.language;
      if (!existing.headings.length && record.headings.length) existing.headings = record.headings;
      if (!existing.imageCount && record.imageCount) existing.imageCount = record.imageCount;
      if (!existing.error && record.error) existing.discoveryWarning = record.error;
      if (existing.error && !record.error) {
        existing.error = null;
        if (record.discoveryWarning) existing.discoveryWarning = record.discoveryWarning;
      }
    }

    const records = [...recordsByUrl.values()];
    const siteMap = {
      generatedAt: new Date().toISOString(),
      seeds: origins,
      maxPages,
      concurrency,
      crawlComplete: nextUrl >= queue.length,
      queuedUrlsNotVisited: Math.max(queue.length - nextUrl, 0),
      summary: {
        totalPages: records.length,
        uniqueUrls: new Set(records.map(record => record.url)).size,
        englishPages: records.filter(record => record.locale === 'english').length,
        germanPages: records.filter(record => record.locale === 'german').length,
        nonSuccessPages: records.filter(record => record.status === null || record.status < 200 || record.status >= 400).length,
        pagesWithErrors: records.filter(record => record.error).length,
      },
      failures,
      pages: records,
    };

    await fs.mkdir(path.dirname(outputFile), { recursive: true });
    await fs.writeFile(outputFile, `${JSON.stringify(siteMap, null, 2)}\n`);
    console.log(JSON.stringify(siteMap.summary, null, 2));
    console.log(`Crawl complete: ${siteMap.crawlComplete}; remaining URLs: ${siteMap.queuedUrlsNotVisited}`);
    console.log(`Saved ${outputFile}`);
  } finally {
    await browser.close();
  }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
