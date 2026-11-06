# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: german\pages\page-ux-design-27bf785d.spec.js >> TC_DE_PAGE_0004 | Verify german page availability and core content: ux design
- Location: tests\german\pages\page-ux-design-27bf785d.spec.js:6:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { level: 1 }).first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('heading', { level: 1 }).first() with timeout 5000ms
  - waiting for getByRole('heading', { level: 1 }).first()
    - waiting for "https://infobeans.ai/de/ux-design/" navigation to finish...
    - navigated to "https://infobeans.ai/de/ux-design/"

```

```yaml
- banner:
  - link "EXPONA FRAGEN":
    - /url: "#"
  - link "InfoBeans Startseite":
    - /url: https://infobeans.ai/de/
    - img "InfoBeans Logo"
  - navigation "Hauptnavigation":
    - list:
      - listitem:
        - link "Fachgebiete":
          - /url: "#"
      - listitem:
        - link "Innovationen":
          - /url: "#"
      - listitem:
        - link "Einblicke":
          - /url: "#"
      - listitem:
        - link "Über uns":
          - /url: "#"
  - button "EN"
- main:
  - region "Modern product experiences showcase":
    - heading "Moderne Produkterlebnisse – entwickelt für Workflows im Zeitalter der KI." [level=2]
    - list:
      - listitem:
        - img "UX-card1"
      - listitem:
        - img "UX-card2"
      - listitem:
        - img "UX-card3"
      - listitem:
        - img "UX-card4"
      - listitem:
        - img "UX-card5"
  - region "Häufige Themen":
    - heading "Was in Gesprächen über Produkterlebnisse immer wieder auftaucht" [level=2]
    - text: Modernisierung von Altsystemen
    - paragraph: Unser Produkt funktioniert nach wie vor, aber behindert die Benutzererfahrung die Akzeptanz, die Effizienz oder das Wachstum?
    - text: KI-gestütztes Design-to-Code
    - paragraph: Wie nutzen wir KI-Agenten für schnelleres Design, Prototyping und Code-Generierung – ganz ohne Qualitäts- oder Kontrollverlust?
    - text: Design-Systeme
    - paragraph: Wie schaffen wir Produktkonsistenz über alle Teams hinweg, ohne das Entwicklungstempo zu drosseln?
    - text: Workflow-Automatisierung
    - paragraph: An welchen Stellen in der User Journey kann KI den manuellen Aufwand spürbar reduzieren?
  - region "Lassen Sie uns darüber sprechen":
    - heading "Es geht längst nicht mehr nur um schönere Benutzeroberflächen." [level=2]
    - paragraph: Produkte funktionieren besser, wenn der Ablauf klarer strukturiert ist, der Aufwand sinkt und die richtigen Momente durch Automatisierung unterstützt werden. Wir helfen Teams zu erkennen, wo Nutzer feststecken, was durch gezieltes Design vereinfacht werden kann und wo KI Aufwände reduziert, ohne zusätzliche Komplexität zu schaffen.
    - button "Lassen Sie uns darüber sprechen"
    - text: Arpit Jain VP, Design
    - link "LinkedIn":
      - /url: https://www.linkedin.com/in/arpit-jain-1227685/
    - img "Arpit Jain, VP, Design"
  - region "Was InfoBeans liefert":
    - complementary "Abschnittsnavigation":
      - tablist "Inhalts-Tabs":
        - tab "[01] Was wir bieten" [selected]
        - tab "[02] Wahre Geschichten"
        - tab "[03] Kundenstimmen"
        - tab "[04] Enterprise Readiness"
    - tabpanel "Was wir bieten":
      - paragraph: Mehr als nur ein Verkaufsgespräch
      - heading "Von Produktklarheit zu skalierbarer Umsetzungsstärke im Design." [level=2]
      - list:
        - listitem:
          - button "VERSTEHEN & STRATEGIE ENTWICKELN" [expanded]
          - region:
            - paragraph: Wir beginnen mit dem tiefen Verständnis für Nutzer, Workflows, Geschäftsziele und Produktlücken. Durch UX-Audits, Research, Journey Mapping, Stakeholder-Workshops und KI-gestützte Analysen identifizieren wir genau, was verändert werden muss und wo Design den größten Mehrwert schafft.
        - listitem:
          - button "DESIGNEN & MODERNISIEREN"
          - region:
            - paragraph: Wir gestalten Produkte, Portale, Workflows und digitale Erlebnisse neu – damit sie einfacher zu bedienen und mühelos zu skalieren sind. Dazu gehören das Vereinfachen der Navigation, das Optimieren zentraler User Journeys, das Erstellen von Prototypen sowie das Identifizieren von Stellen, an denen KI oder Automatisierung unnötigen Aufwand eliminieren.
        - listitem:
          - button "SKALIEREN & UNTERSTÜTZEN"
          - region:
            - paragraph: Wir begleiten Teams vom Designkonzept bis zur fertigen, produktionsreifen Umsetzung. Von Design-Systemen und responsiven Screens über Dokumentation und Design-QA bis hin zum Handoff und fortlaufendem Support stellen wir sicher, dass das Nutzererlebnis auch beim Wachstum des Produkts konsistent bleibt.
    - tabpanel "Wahre Geschichten":
      - text: Geschichten mit Substanz
      - article "Fallstudie 1 von 1":
        - paragraph: Royal Caribbean
        - text: Gesichtserkennung Kreuzfahrt & Hotellerie Gäste-Innovationen
        - heading "Einschiffungszeit um das Fünffache verkürzt durch KI-gestützte Gesichtserkennung und eine neu gestaltete Guest Journey" [level=2]
        - link "Vollständige Fallstudie lesen":
          - /url: /true-stories/einschiffungszeit-um-das-funffache-verkuerzt-durch-ki-gestuetzte-gesichtserkennung-und-eine-neu-gestaltete-guest-journey/
          - text: Wahre Geschichte anzeigen
        - button "Wichtigste Ergebnisse"
    - tabpanel "Kundenstimmen":
      - article "Kundenstimme von Leiter der Anwendungsentwicklung":
        - text: Vertrauen, das wir uns erarbeitet haben
        - heading "Vom Workshop über neue Chancen bis hin zu konkreten geschäftlichen Auswirkungen." [level=2]
        - paragraph: Das Team hat hervorragende Arbeit geleistet, große Reife beim Zeit- und Umfangsmanagement bewiesen und die Gruppe effektiv durch einen strukturierten Prozess geführt. Die Sitzungen führten zu mehreren wertvollen Ideen, darunter auch einige, die sich eigenständig zu neuen Projekten entwickeln könnten.
        - strong: Leiter der Anwendungsentwicklung
        - text: Ein großer Anbieter von Gesundheitsdienstleistungen
    - tabpanel "Enterprise Readiness":
      - text: Entwickelt für das Unternehmen
      - heading "Entwickelt für komplexe Produkte. Auf Skalierbarkeit ausgelegt." [level=2]
      - article "Sichere, Ki-gestützte Arbeitsabläufe":
        - heading "Sichere, Ki-gestützte Arbeitsabläufe" [level=3]
        - paragraph: KI beschleunigt Audits, Recherchen, die Überprüfung von Inhalten und die Designfindung, doch Datenschutz, Zugriffskontrolle und die Überprüfung durch Menschen bleiben fest in unserer Hand.
      - article "Governance-freundlicher Designprozess":
        - heading "Governance-freundlicher Designprozess" [level=3]
        - paragraph: Wir dokumentieren Entscheidungen, Abläufe und Begründungen, damit Produkt-, Geschäfts-, Compliance- und Entwicklungsteams stets nachvollziehen können, was sich geändert hat und warum.
      - article "Abstimmung Zwischen Plattform Und Technik":
        - heading "Abstimmung Zwischen Plattform Und Technik" [level=3]
        - paragraph: Wir entwerfen im Rahmen bestehender Systeme, APIs und Implementierungsbeschränkungen, damit nichts nur gut aussieht, aber nicht umgesetzt oder gewartet werden kann.
      - article "Skalierbare Designsysteme":
        - heading "Skalierbare Designsysteme" [level=3]
        - paragraph: Wiederverwendbare Komponenten, Muster und Tokens sorgen für Konsistenz über Module, Produkte und zukünftige Releases hinweg.
- heading "Lassen Sie uns gemeinsam WOW erschaffen" [level=2]:
  - text: Lassen Sie uns gemeinsam
  - strong: WOW erschaffen
- textbox "Fragen Sie Expona nach unseren Dienstleistungen, Fallstudien oder Updates"
- button "Expona fragen"
- contentinfo:
  - text: FACHGEBIETE
  - link "Design":
    - /url: /de/ux-design/
  - text: /
  - link "GCC":
    - /url: /de/gcc-services/
  - text: /
  - link "Plattformbewertung":
    - /url: /de/plattform-bewertung/
  - text: /
  - link "BFSI":
    - /url: /de/bfsi/
  - text: /
  - link "Speicher und Virtualisierung":
    - /url: /de/speicher-virtualisierung/
  - text: /
  - link "High-Tech":
    - /url: /de/technology/
  - text: /
  - link "Fertigung & Produktion":
    - /url: /de/fertigung-produktion/
  - text: /
  - link "Agentisches Engineering":
    - /url: /de/agentisches-engineering/
  - text: /
  - link "ServiceNow":
    - /url: /de/servicenow/
  - text: /
  - link "Salesforce":
    - /url: /de/salesforce/
  - text: INNOVATIONEN
  - link "Expona AI":
    - /url: https://expona.io/
  - text: /
  - link "Insane SDD":
    - /url: https://insanesdd.ai/
  - text: /
  - link "ServiceNow HRSD":
    - /url: /de/servicenow-hrsd/
  - text: /
  - link "Stanza":
    - /url: /de/stanza/
  - text: /
  - link "Spacewarp für ServiceNow":
    - /url: /de/spacewarp/
  - text: /
  - link "BeanTrail für Salesforce":
    - /url: /de/beantrail/
  - text: /
  - link "QAVA für Oracle":
    - /url: /de/qava-fur-oracle/
  - text: EINBLICKE
  - link "Blog":
    - /url: /de/blog/
  - text: /
  - link "WOW-Podcast":
    - /url: /de/podcasts/
  - text: /
  - link "Wahre Geschichten":
    - /url: /de/wahre-geschichten/
  - text: ÜBER UNS
  - link "Unser Team":
    - /url: /de/fuehrungsteam/
  - text: /
  - link "InfoBeans Stiftung":
    - /url: /de/infobeans-stiftung/
  - text: /
  - link "Enterprise Readiness":
    - /url: /de/enterprise-readiness/
  - text: /
  - link "Investoren":
    - /url: /de/investoren/
  - text: /
  - link "Karriere":
    - /url: /de/karriere/
  - text: /
  - link "Kontakt":
    - /url: /de/kontakt/
  - heading "Erhalten Sie Einblicke von InfoBeans" [level=3]
  - textbox "E-Mail Adresse"
  - button "button": Abonnieren
  - img "InfoBeans"
  - link "LinkedIn":
    - /url: https://www.linkedin.com/company/infobeans/
  - link "Twitter / X":
    - /url: https://x.com/InfoBeans
  - link "Instagram":
    - /url: https://www.instagram.com/InfoBeans/
  - link "Facebook":
    - /url: https://www.facebook.com/InfoBeans/
  - text: © Copyright 2026 InfoBeans
  - link "DISCLAIMER":
    - /url: /disclaimer/
  - link "PRIVACY POLICY":
    - /url: /privacy-policy/
  - text: InfoBeans ist ein „Select“-Partner im Bereich „Partner Network Services“ des Claude-Partnernetzwerks.
  - button "ERFAHREN SIE, WIE WIR ENTWICKELN"
```

# Test source

```ts
  1   | const { test, expect } = require('@playwright/test');
  2   | const { TopicPage } = require('../../../pages/TopicPage');
  3   | const { normalizeUrl } = require('../../../utils/url');
  4   | const pageData = {"url":"https://infobeans.ai/de/ux-design","locale":"german","title":"UX/UI-Design und -Entwicklung | InfoBeans","headings":[{"level":"h2","text":"Moderne Produkterlebnisse – entwickelt für Workflows im Zeitalter der KI."},{"level":"h2","text":"Was in Gesprächen über Produkterlebnisse immer wieder auftaucht"},{"level":"h2","text":"Es geht längst nicht mehr nur um schönere Benutzeroberflächen."},{"level":"h2","text":"Es geht längst nicht mehr nur um schönere Benutzeroberflächen."},{"level":"h2","text":"Von Produktklarheit zu skalierbarer Umsetzungsstärke im Design."},{"level":"h2","text":"Einschiffungszeit um das Fünffache verkürzt durch KI-gestützte Gesichtserkennung und eine neu gestaltete Guest Journey"},{"level":"h2","text":"Vom Workshop über neue Chancen bis hin zu konkreten geschäftlichen Auswirkungen."},{"level":"h2","text":"Entwickelt für komplexe Produkte. Auf Skalierbarkeit ausgelegt."},{"level":"h2","text":"Lassen Sie uns gemeinsam WOW erschaffen"}],"internalLinks":[]};
  5   | 
  6   | test('TC_DE_PAGE_0004 | Verify german page availability and core content: ux design', async ({ page }, testInfo) => {
  7   |     testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_DE_PAGE_0004\",\"scenario\":\"Verify german page availability and core content: ux design\",\"description\":\"Validate the german page is available and presents localized core content.\",\"preconditions\":\"The public website is reachable; no authentication is required.\",\"steps\":[\"Navigate to https://infobeans.ai/de/ux-design\",\"Verify the response status, final URL, title, meta description, headings, body content, and document language\",\"Verify the shared header, main content, and footer are present\",\"Check for uncaught JavaScript page errors\"],\"expectedResult\":\"The page returns a successful response, stays on its discovered URL, has a title, meta description, non-empty headings and body content, uses the expected language, and renders shared page regions without uncaught JavaScript errors.\",\"pageUrl\":\"https://infobeans.ai/de/ux-design\"}" });
  8   |   const pageErrors = [];
  9   |   const consoleErrors = [];
  10  |   page.on('pageerror', error => pageErrors.push(error.message));
  11  |   page.on('console', message => {
  12  |     if (message.type() === 'error') consoleErrors.push(message.text());
  13  |   });
  14  |   const topicPage = new TopicPage(page, pageData);
  15  |   const response = await topicPage.goto(pageData.url);
  16  |   const heading = page.getByRole('heading', { level: 1 }).first();
  17  |   const pageSnapshot = await page.evaluate(() => {
  18  |     const main = document.querySelector('main');
  19  |     const headingText = main?.querySelector('h1')?.innerText.trim() || '';
  20  |     return {
  21  |       title: document.title,
  22  |       metaDescription: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
  23  |       mainHeading: headingText,
  24  |       headings: [...(main?.querySelectorAll('h1,h2,h3,h4,h5,h6') || [])]
  25  |         .map(item => item.innerText.trim())
  26  |         .filter(Boolean),
  27  |       mainText: (main?.innerText || '').trim(),
  28  |       language: document.documentElement.lang,
  29  |     };
  30  |   });
  31  |   const headingText = pageSnapshot.mainHeading;
  32  |   const mainText = pageSnapshot.mainText;
  33  |   const metaDescription = pageSnapshot.metaDescription;
  34  |   const headings = pageSnapshot.headings;
  35  |   const actualResult = {
  36  |     status: response ? response.status() : null,
  37  |     finalUrl: page.url(),
  38  |     title: pageSnapshot.title,
  39  |     metaDescription,
  40  |     mainHeading: headingText,
  41  |     headingCount: headings.length,
  42  |     bodyTextLength: mainText.length,
  43  |     language: pageSnapshot.language,
  44  |     pageErrors,
  45  |     consoleErrors,
  46  |   };
  47  |   testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify(actualResult) });
  48  | 
  49  |   expect(response, 'A document response should be returned').not.toBeNull();
  50  |   expect(response.status(), 'The page should not return a 4xx or 5xx response').toBeLessThan(400);
  51  |   expect(normalizeUrl(page.url())).toBe(normalizeUrl(pageData.url));
  52  |   await expect(page).toHaveTitle(/\S/);
> 53  |   await expect(heading).toBeVisible();
      |                         ^ Error: expect(locator).toBeVisible() failed
  54  |   expect(headingText).not.toBe('');
  55  |   expect(metaDescription?.trim().length || 0).toBeGreaterThan(0);
  56  |   expect(mainText.length).toBeGreaterThan(0);
  57  |   expect(headings.every(text => text.trim().length > 0)).toBe(true);
  58  |   await expect(page.locator('html')).toHaveAttribute('lang', /^de/i);
  59  |   await expect(topicPage.header).toBeVisible();
  60  |   await expect(topicPage.main).toBeVisible();
  61  |   await expect(topicPage.footer).toBeVisible();
  62  |   if (pageData.title) expect(actualResult.title).toBe(pageData.title);
  63  |   const expectedHeading = pageData.headings.find(item => item.level === 'h1')?.text;
  64  |   if (!false && expectedHeading) expect(headingText).toBe(expectedHeading);
  65  |   expect(pageErrors, 'The page should not emit uncaught JavaScript errors').toEqual([]);
  66  | });
  67  | 
  68  | test('TC_DE_PAGE_0005 | Verify page images and alternative text: ux design', async ({ page }, testInfo) => {
  69  |     testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_DE_PAGE_0005\",\"scenario\":\"Verify images and alternative text: ux design\",\"description\":\"Check image alternative text and whether images visible in the initial viewport load.\",\"preconditions\":\"The public page is reachable.\",\"steps\":[\"Navigate to https://infobeans.ai/de/ux-design\",\"Check that every image has an alt attribute\",\"Check that each image visible in the initial viewport has loaded\"],\"expectedResult\":\"Every image has an alt attribute (empty alt is permitted for decorative images), and visible images load successfully.\",\"pageUrl\":\"https://infobeans.ai/de/ux-design\"}" });
  70  |   const topicPage = new TopicPage(page, pageData);
  71  |   await topicPage.goto(pageData.url);
  72  |   await page.waitForFunction(() => [...document.images].filter(image => {
  73  |     const rect = image.getBoundingClientRect();
  74  |     return rect.width > 0 && rect.height > 0
  75  |       && rect.bottom > 0 && rect.right > 0
  76  |       && rect.top < window.innerHeight && rect.left < window.innerWidth;
  77  |   }).every(image => image.complete));
  78  |   let imageIssues;
  79  |   for (let attempt = 0; attempt < 3; attempt += 1) {
  80  |     try {
  81  |       imageIssues = await page.locator('img').evaluateAll(images => images.flatMap(image => {
  82  |         const rect = image.getBoundingClientRect();
  83  |         const visible = rect.width > 0 && rect.height > 0
  84  |           && rect.bottom > 0 && rect.right > 0
  85  |           && rect.top < window.innerHeight && rect.left < window.innerWidth;
  86  |         const issues = [];
  87  |         if (!image.hasAttribute('alt')) issues.push('missing-alt');
  88  |         if (visible && (!image.complete || image.naturalWidth === 0)) issues.push('visible-image-not-loaded');
  89  |         return issues.length ? [{ src: image.currentSrc || image.src, issues }] : [];
  90  |       }));
  91  |       break;
  92  |     } catch (error) {
  93  |       if (!(error instanceof Error)
  94  |         || !error.message.includes('Execution context was destroyed')
  95  |         || attempt === 2) throw error;
  96  |       await page.waitForLoadState('domcontentloaded');
  97  |     }
  98  |   }
  99  |   testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ imageIssues }) });
  100 |   expect(imageIssues).toEqual([]);
  101 | });
  102 | 
  103 | test('TC_DE_PAGE_0006 | Verify internal links and labels: ux design', async ({ page }, testInfo) => {
  104 |     testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_DE_PAGE_0006\",\"scenario\":\"Verify internal links and labels: ux design\",\"description\":\"Check that discovered main-content links are present with their recorded label and destination; shared navigation and rotating story links are validated separately or against the current page.\",\"preconditions\":\"The public page is reachable.\",\"steps\":[\"Navigate to https://infobeans.ai/de/ux-design\",\"Verify stable main-content links and current internal links have destinations\"],\"expectedResult\":\"Stable main-content links remain present, and current main-content links have destinations.\",\"pageUrl\":\"https://infobeans.ai/de/ux-design\"}" });
  105 |   const topicPage = new TopicPage(page, pageData);
  106 |   await topicPage.goto(pageData.url);
  107 |   let actualLinks;
  108 |   for (let attempt = 0; attempt < 3; attempt += 1) {
  109 |     try {
  110 |       actualLinks = await page.locator("main a[href]")
  111 |         .evaluateAll(anchors => anchors.map(anchor => ({
  112 |         url: anchor.href,
  113 |         href: anchor.getAttribute('href'),
  114 |         label: (anchor.innerText || anchor.textContent || anchor.getAttribute('aria-label') || anchor.title || '')
  115 |           .trim().replace(/\s+/g, ' ').slice(0, 160),
  116 |       })));
  117 |       break;
  118 |     } catch (error) {
  119 |       if (!(error instanceof Error)
  120 |         || !error.message.includes('Execution context was destroyed')
  121 |         || attempt === 2) throw error;
  122 |       await page.waitForLoadState('domcontentloaded');
  123 |     }
  124 |   }
  125 |   const missingLinks = pageData.internalLinks.filter(expected => !actualLinks.some(actual =>
  126 |     normalizeUrl(actual.url) === normalizeUrl(expected.url)
  127 |       && (!expected.label || actual.label === expected.label)));
  128 |   const internalLinks = actualLinks.filter(actual =>
  129 |     new URL(actual.url).origin === new URL(pageData.url).origin);
  130 |   const invalidLinks = actualLinks.filter(actual => !actual.href || !actual.href.trim());
  131 |   testInfo.annotations.push({
  132 |     type: 'actual-result',
  133 |     description: JSON.stringify({
  134 |       expectedStableLinkCount: pageData.internalLinks.length,
  135 |       currentInternalLinkCount: internalLinks.length,
  136 |       invalidLinks,
  137 |       missingLinks,
  138 |     }),
  139 |   });
  140 |   expect(internalLinks.length).toBeGreaterThan(0);
  141 |   expect(invalidLinks).toEqual([]);
  142 |   expect(missingLinks).toEqual([]);
  143 | });
  144 | 
```