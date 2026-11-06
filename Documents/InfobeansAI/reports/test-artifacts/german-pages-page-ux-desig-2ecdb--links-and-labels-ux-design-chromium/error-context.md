# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: german\pages\page-ux-design-27bf785d.spec.js >> TC_DE_PAGE_0006 | Verify internal links and labels: ux design
- Location: tests\german\pages\page-ux-design-27bf785d.spec.js:103:1

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
```

# Page snapshot

```yaml
- generic [active] [ref=f1e1]:
  - banner [ref=f1e2]:
    - link "EXPONA FRAGEN" [ref=f1e6] [cursor=pointer]:
      - /url: "#"
    - generic [ref=f1e9]:
      - link "InfoBeans Startseite" [ref=f1e11] [cursor=pointer]:
        - /url: https://infobeans.ai/de/
        - img "InfoBeans Logo" [ref=f1e12]
      - navigation "Hauptnavigation" [ref=f1e13]:
        - list [ref=f1e14]:
          - listitem [ref=f1e15]:
            - link "Fachgebiete" [ref=f1e16] [cursor=pointer]:
              - /url: "#"
            - generic:
              - link "Lesen Sie die Wow-Geschichte von Ritesh Yadav Ritesh Yadav's WOW story":
                - /url: https://infobeans.ai/de/?wow_story=44804
                - generic: Lesen Sie die Wow-Geschichte von Ritesh Yadav
                - img "Ritesh Yadav's WOW story"
          - listitem [ref=f1e18]:
            - link "Innovationen" [ref=f1e19] [cursor=pointer]:
              - /url: "#"
            - generic:
              - link "Lesen Sie die Wow-Geschichte von Ritesh Yadav Ritesh Yadav's WOW story":
                - /url: https://infobeans.ai/de/?wow_story=44804
                - generic: Lesen Sie die Wow-Geschichte von Ritesh Yadav
                - img "Ritesh Yadav's WOW story"
          - listitem [ref=f1e21]:
            - link "Einblicke" [ref=f1e22] [cursor=pointer]:
              - /url: "#"
            - generic:
              - link "Lesen Sie die Wow-Geschichte von Ritesh Yadav Ritesh Yadav's WOW story":
                - /url: https://infobeans.ai/de/?wow_story=44804
                - generic: Lesen Sie die Wow-Geschichte von Ritesh Yadav
                - img "Ritesh Yadav's WOW story"
          - listitem [ref=f1e24]:
            - link "Über uns" [ref=f1e25] [cursor=pointer]:
              - /url: "#"
            - generic:
              - link "Lesen Sie die Wow-Geschichte von Ritesh Yadav Ritesh Yadav's WOW story":
                - /url: https://infobeans.ai/de/?wow_story=44804
                - generic: Lesen Sie die Wow-Geschichte von Ritesh Yadav
                - img "Ritesh Yadav's WOW story"
      - button "EN" [ref=f1e29] [cursor=pointer]
  - main [ref=f1e33]:
    - region "Modern product experiences showcase" [ref=f1e34]:
      - heading "Moderne Produkterlebnisse – entwickelt für Workflows im Zeitalter der KI." [level=2] [ref=f1e36]
      - list [ref=f1e37]:
        - listitem [ref=f1e38]:
          - img "UX-card1" [ref=f1e40]
        - listitem [ref=f1e41]:
          - img "UX-card2" [ref=f1e43]
        - listitem [ref=f1e44]:
          - img "UX-card3" [ref=f1e46]
        - listitem [ref=f1e47]:
          - img "UX-card4" [ref=f1e49]
        - listitem [ref=f1e50]:
          - img "UX-card5" [ref=f1e52]
    - generic [ref=f1e54]:
      - region "Häufige Themen" [ref=f1e56]:
        - generic [ref=f1e58]:
          - heading "Was in Gesprächen über Produkterlebnisse immer wieder auftaucht" [level=2] [ref=f1e59]
          - generic [ref=f1e60]:
            - generic [ref=f1e62]:
              - generic [ref=f1e63]: Modernisierung von Altsystemen
              - paragraph [ref=f1e64]: Unser Produkt funktioniert nach wie vor, aber behindert die Benutzererfahrung die Akzeptanz, die Effizienz oder das Wachstum?
            - generic [ref=f1e66]:
              - generic [ref=f1e67]: KI-gestütztes Design-to-Code
              - paragraph [ref=f1e68]: Wie nutzen wir KI-Agenten für schnelleres Design, Prototyping und Code-Generierung – ganz ohne Qualitäts- oder Kontrollverlust?
            - generic [ref=f1e70]:
              - generic [ref=f1e71]: Design-Systeme
              - paragraph [ref=f1e72]: Wie schaffen wir Produktkonsistenz über alle Teams hinweg, ohne das Entwicklungstempo zu drosseln?
            - generic [ref=f1e74]:
              - generic [ref=f1e75]: Workflow-Automatisierung
              - paragraph [ref=f1e76]: An welchen Stellen in der User Journey kann KI den manuellen Aufwand spürbar reduzieren?
      - region "Lassen Sie uns darüber sprechen" [ref=f1e78]:
        - generic [ref=f1e80]:
          - generic [ref=f1e81]:
            - generic [ref=f1e82]:
              - heading "Es geht längst nicht mehr nur um schönere Benutzeroberflächen." [level=2] [ref=f1e83]
              - paragraph [ref=f1e84]: Produkte funktionieren besser, wenn der Ablauf klarer strukturiert ist, der Aufwand sinkt und die richtigen Momente durch Automatisierung unterstützt werden. Wir helfen Teams zu erkennen, wo Nutzer feststecken, was durch gezieltes Design vereinfacht werden kann und wo KI Aufwände reduziert, ohne zusätzliche Komplexität zu schaffen.
              - button "Lassen Sie uns darüber sprechen" [ref=f1e85] [cursor=pointer]
            - generic [ref=f1e88]:
              - generic [ref=f1e89]: Arpit Jain
              - generic [ref=f1e90]: VP, Design
              - link "LinkedIn" [ref=f1e91] [cursor=pointer]:
                - /url: https://www.linkedin.com/in/arpit-jain-1227685/
          - img "Arpit Jain, VP, Design" [ref=f1e94]
    - region "Was InfoBeans liefert" [ref=f1e95]:
      - complementary "Abschnittsnavigation" [ref=f1e96]:
        - tablist "Inhalts-Tabs" [ref=f1e98]:
          - tab "[01] Was wir bieten" [selected] [ref=f1e99] [cursor=pointer]:
            - generic [ref=f1e100]: "[01]"
            - generic [ref=f1e101]: Was wir bieten
          - tab "[02] Wahre Geschichten" [ref=f1e102] [cursor=pointer]:
            - generic [ref=f1e103]: "[02]"
            - generic [ref=f1e104]: Wahre Geschichten
          - tab "[03] Kundenstimmen" [ref=f1e105] [cursor=pointer]:
            - generic [ref=f1e106]: "[03]"
            - generic [ref=f1e107]: Kundenstimmen
          - tab "[04] Enterprise Readiness" [ref=f1e108] [cursor=pointer]:
            - generic [ref=f1e109]: "[04]"
            - generic [ref=f1e110]: Enterprise Readiness
      - generic [ref=f1e111]:
        - tabpanel "Was wir bieten" [ref=f1e112]:
          - generic [ref=f1e113]:
            - generic [ref=f1e114]:
              - paragraph [ref=f1e115]: Mehr als nur ein Verkaufsgespräch
              - heading "Von Produktklarheit zu skalierbarer Umsetzungsstärke im Design." [level=2] [ref=f1e116]
            - list [ref=f1e117]:
              - listitem [ref=f1e118]:
                - button "VERSTEHEN & STRATEGIE ENTWICKELN" [expanded] [ref=f1e119] [cursor=pointer]
                - region [ref=f1e124]:
                  - paragraph [ref=f1e125]: Wir beginnen mit dem tiefen Verständnis für Nutzer, Workflows, Geschäftsziele und Produktlücken. Durch UX-Audits, Research, Journey Mapping, Stakeholder-Workshops und KI-gestützte Analysen identifizieren wir genau, was verändert werden muss und wo Design den größten Mehrwert schafft.
              - listitem [ref=f1e127]:
                - button "DESIGNEN & MODERNISIEREN" [ref=f1e128] [cursor=pointer]
                - region:
                  - paragraph: Wir gestalten Produkte, Portale, Workflows und digitale Erlebnisse neu – damit sie einfacher zu bedienen und mühelos zu skalieren sind. Dazu gehören das Vereinfachen der Navigation, das Optimieren zentraler User Journeys, das Erstellen von Prototypen sowie das Identifizieren von Stellen, an denen KI oder Automatisierung unnötigen Aufwand eliminieren.
              - listitem [ref=f1e134]:
                - button "SKALIEREN & UNTERSTÜTZEN" [ref=f1e135] [cursor=pointer]
                - region:
                  - paragraph: Wir begleiten Teams vom Designkonzept bis zur fertigen, produktionsreifen Umsetzung. Von Design-Systemen und responsiven Screens über Dokumentation und Design-QA bis hin zum Handoff und fortlaufendem Support stellen wir sicher, dass das Nutzererlebnis auch beim Wachstum des Produkts konsistent bleibt.
        - tabpanel "Wahre Geschichten" [ref=f1e141]:
          - generic [ref=f1e142]:
            - generic [ref=f1e143]: Geschichten mit Substanz
            - article "Fallstudie 1 von 1" [ref=f1e146]:
              - paragraph [ref=f1e148]: Royal Caribbean
              - generic [ref=f1e149]:
                - generic [ref=f1e150]:
                  - generic [ref=f1e151]: Gesichtserkennung
                  - generic [ref=f1e152]: Kreuzfahrt & Hotellerie
                  - generic [ref=f1e153]: Gäste-Innovationen
                - heading "Einschiffungszeit um das Fünffache verkürzt durch KI-gestützte Gesichtserkennung und eine neu gestaltete Guest Journey" [level=2] [ref=f1e154]
                - link "Vollständige Fallstudie lesen" [ref=f1e155] [cursor=pointer]:
                  - /url: /true-stories/einschiffungszeit-um-das-funffache-verkuerzt-durch-ki-gestuetzte-gesichtserkennung-und-eine-neu-gestaltete-guest-journey/
                  - generic [ref=f1e156]: Wahre Geschichte anzeigen
              - button "Wichtigste Ergebnisse" [ref=f1e158] [cursor=pointer]
            - generic "Kunden und Partner" [ref=f1e159]
        - tabpanel "Kundenstimmen" [ref=f1e161]:
          - article "Kundenstimme von Leiter der Anwendungsentwicklung" [ref=f1e163]:
            - generic [ref=f1e164]:
              - generic [ref=f1e165]:
                - generic [ref=f1e166]: Vertrauen, das wir uns erarbeitet haben
                - heading "Vom Workshop über neue Chancen bis hin zu konkreten geschäftlichen Auswirkungen." [level=2] [ref=f1e167]
                - paragraph [ref=f1e168]: Das Team hat hervorragende Arbeit geleistet, große Reife beim Zeit- und Umfangsmanagement bewiesen und die Gruppe effektiv durch einen strukturierten Prozess geführt. Die Sitzungen führten zu mehreren wertvollen Ideen, darunter auch einige, die sich eigenständig zu neuen Projekten entwickeln könnten.
              - generic [ref=f1e169]:
                - strong [ref=f1e170]: Leiter der Anwendungsentwicklung
                - generic [ref=f1e171]: Ein großer Anbieter von Gesundheitsdienstleistungen
        - tabpanel "Enterprise Readiness" [ref=f1e172]:
          - generic [ref=f1e173]:
            - generic [ref=f1e174]: Entwickelt für das Unternehmen
            - heading "Entwickelt für komplexe Produkte. Auf Skalierbarkeit ausgelegt." [level=2] [ref=f1e175]
            - generic [ref=f1e176]:
              - article "Sichere, Ki-gestützte Arbeitsabläufe" [ref=f1e177]:
                - generic [ref=f1e178]:
                  - generic [aria-hidden] [ref=f1e179]: "01"
                  - generic [ref=f1e180]:
                    - heading "Sichere, Ki-gestützte Arbeitsabläufe" [level=3] [ref=f1e181]
                    - paragraph [ref=f1e182]: KI beschleunigt Audits, Recherchen, die Überprüfung von Inhalten und die Designfindung, doch Datenschutz, Zugriffskontrolle und die Überprüfung durch Menschen bleiben fest in unserer Hand.
              - article "Governance-freundlicher Designprozess" [ref=f1e183]:
                - generic [ref=f1e184]:
                  - generic [aria-hidden] [ref=f1e185]: "02"
                  - generic [ref=f1e186]:
                    - heading "Governance-freundlicher Designprozess" [level=3] [ref=f1e187]
                    - paragraph [ref=f1e188]: Wir dokumentieren Entscheidungen, Abläufe und Begründungen, damit Produkt-, Geschäfts-, Compliance- und Entwicklungsteams stets nachvollziehen können, was sich geändert hat und warum.
              - article "Abstimmung Zwischen Plattform Und Technik" [ref=f1e189]:
                - generic [ref=f1e190]:
                  - generic [aria-hidden] [ref=f1e191]: "03"
                  - generic [ref=f1e192]:
                    - heading "Abstimmung Zwischen Plattform Und Technik" [level=3] [ref=f1e193]
                    - paragraph [ref=f1e194]: Wir entwerfen im Rahmen bestehender Systeme, APIs und Implementierungsbeschränkungen, damit nichts nur gut aussieht, aber nicht umgesetzt oder gewartet werden kann.
              - article "Skalierbare Designsysteme" [ref=f1e195]:
                - generic [ref=f1e196]:
                  - generic [aria-hidden] [ref=f1e197]: "04"
                  - generic [ref=f1e198]:
                    - heading "Skalierbare Designsysteme" [level=3] [ref=f1e199]
                    - paragraph [ref=f1e200]: Wiederverwendbare Komponenten, Muster und Tokens sorgen für Konsistenz über Module, Produkte und zukünftige Releases hinweg.
  - generic [ref=f1e201]:
    - generic [ref=f1e204]:
      - heading [level=2] [ref=f1e205]:
        - text: Lassen Sie uns gemeinsam
        - strong [ref=f1e206]: WOW erschaffen
      - generic [ref=f1e207]:
        - textbox "Fragen Sie Expona nach unseren Dienstleistungen, Fallstudien oder Updates" [ref=f1e208]
        - button "Expona fragen" [ref=f1e209] [cursor=pointer]
    - contentinfo [ref=f1e212]:
      - generic [ref=f1e214]:
        - generic [ref=f1e215]:
          - generic [ref=f1e216]:
            - generic [ref=f1e217]: FACHGEBIETE
            - generic [ref=f1e220]:
              - link "Design" [ref=f1e221] [cursor=pointer]:
                - /url: /de/ux-design/
              - generic [ref=f1e222]: /
              - link "GCC" [ref=f1e223] [cursor=pointer]:
                - /url: /de/gcc-services/
              - generic [ref=f1e224]: /
              - link "Plattformbewertung" [ref=f1e225] [cursor=pointer]:
                - /url: /de/plattform-bewertung/
              - generic [ref=f1e226]: /
              - link "BFSI" [ref=f1e227] [cursor=pointer]:
                - /url: /de/bfsi/
              - generic [ref=f1e228]: /
              - link "Speicher und Virtualisierung" [ref=f1e229] [cursor=pointer]:
                - /url: /de/speicher-virtualisierung/
              - generic [ref=f1e230]: /
              - link "High-Tech" [ref=f1e231] [cursor=pointer]:
                - /url: /de/technology/
              - generic [ref=f1e232]: /
              - link "Fertigung & Produktion" [ref=f1e233] [cursor=pointer]:
                - /url: /de/fertigung-produktion/
              - generic [ref=f1e234]: /
              - link "Agentisches Engineering" [ref=f1e235] [cursor=pointer]:
                - /url: /de/agentisches-engineering/
              - generic [ref=f1e236]: /
              - link "ServiceNow" [ref=f1e237] [cursor=pointer]:
                - /url: /de/servicenow/
              - generic [ref=f1e238]: /
              - link "Salesforce" [ref=f1e239] [cursor=pointer]:
                - /url: /de/salesforce/
          - generic [ref=f1e240]:
            - generic [ref=f1e241]: INNOVATIONEN
            - generic [ref=f1e244]:
              - link "Expona AI" [ref=f1e245] [cursor=pointer]:
                - /url: https://expona.io/
              - generic [ref=f1e246]: /
              - link "Insane SDD" [ref=f1e247] [cursor=pointer]:
                - /url: https://insanesdd.ai/
              - generic [ref=f1e248]: /
              - link "ServiceNow HRSD" [ref=f1e249] [cursor=pointer]:
                - /url: /de/servicenow-hrsd/
              - generic [ref=f1e250]: /
              - link "Stanza" [ref=f1e251] [cursor=pointer]:
                - /url: /de/stanza/
              - generic [ref=f1e252]: /
              - link "Spacewarp für ServiceNow" [ref=f1e253] [cursor=pointer]:
                - /url: /de/spacewarp/
              - generic [ref=f1e254]: /
              - link "BeanTrail für Salesforce" [ref=f1e255] [cursor=pointer]:
                - /url: /de/beantrail/
              - generic [ref=f1e256]: /
              - link "QAVA für Oracle" [ref=f1e257] [cursor=pointer]:
                - /url: /de/qava-fur-oracle/
          - generic [ref=f1e258]:
            - generic [ref=f1e259]: EINBLICKE
            - generic [ref=f1e262]:
              - link "Blog" [ref=f1e263] [cursor=pointer]:
                - /url: /de/blog/
              - generic [ref=f1e264]: /
              - link "WOW-Podcast" [ref=f1e265] [cursor=pointer]:
                - /url: /de/podcasts/
              - generic [ref=f1e266]: /
              - link "Wahre Geschichten" [ref=f1e267] [cursor=pointer]:
                - /url: /de/wahre-geschichten/
          - generic [ref=f1e268]:
            - generic [ref=f1e269]: ÜBER UNS
            - generic [ref=f1e272]:
              - link "Unser Team" [ref=f1e273] [cursor=pointer]:
                - /url: /de/fuehrungsteam/
              - generic [ref=f1e274]: /
              - link "InfoBeans Stiftung" [ref=f1e275] [cursor=pointer]:
                - /url: /de/infobeans-stiftung/
              - generic [ref=f1e276]: /
              - link "Enterprise Readiness" [ref=f1e277] [cursor=pointer]:
                - /url: /de/enterprise-readiness/
              - generic [ref=f1e278]: /
              - link "Investoren" [ref=f1e279] [cursor=pointer]:
                - /url: /de/investoren/
              - generic [ref=f1e280]: /
              - link "Karriere" [ref=f1e281] [cursor=pointer]:
                - /url: /de/karriere/
              - generic [ref=f1e282]: /
              - link "Kontakt" [ref=f1e283] [cursor=pointer]:
                - /url: /de/kontakt/
        - generic [ref=f1e284]:
          - generic [ref=f1e285]:
            - heading "Erhalten Sie Einblicke von InfoBeans" [level=3] [ref=f1e286]
            - generic [ref=f1e288]:
              - textbox "E-Mail Adresse" [ref=f1e289]
              - button "button" [ref=f1e290] [cursor=pointer]:
                - generic [ref=f1e291]: Abonnieren
          - generic [ref=f1e292]:
            - img "InfoBeans"
            - generic [ref=f1e293]:
              - link "LinkedIn" [ref=f1e294] [cursor=pointer]:
                - /url: https://www.linkedin.com/company/infobeans/
              - link "Twitter / X" [ref=f1e296] [cursor=pointer]:
                - /url: https://x.com/InfoBeans
              - link "Instagram" [ref=f1e298] [cursor=pointer]:
                - /url: https://www.instagram.com/InfoBeans/
              - link "Facebook" [ref=f1e300] [cursor=pointer]:
                - /url: https://www.facebook.com/InfoBeans/
        - generic [ref=f1e302]:
          - generic [ref=f1e303]: © Copyright 2026 InfoBeans
          - generic [ref=f1e304]:
            - link "DISCLAIMER" [ref=f1e305] [cursor=pointer]:
              - /url: /disclaimer/
            - link "PRIVACY POLICY" [ref=f1e306] [cursor=pointer]:
              - /url: /privacy-policy/
      - generic [ref=f1e309]:
        - generic [ref=f1e310]: InfoBeans ist ein „Select“-Partner im Bereich „Partner Network Services“ des Claude-Partnernetzwerks.
        - button "ERFAHREN SIE, WIE WIR ENTWICKELN" [ref=f1e312] [cursor=pointer]
```

# Test source

```ts
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
  53  |   await expect(heading).toBeVisible();
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
> 140 |   expect(internalLinks.length).toBeGreaterThan(0);
      |                                ^ Error: expect(received).toBeGreaterThan(expected)
  141 |   expect(invalidLinks).toEqual([]);
  142 |   expect(missingLinks).toEqual([]);
  143 | });
  144 | 
```