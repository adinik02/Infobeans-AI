# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: german\header.spec.js >> TC_DE_HEADER_STRUCTURE_0001 | Verify german header links and destinations
- Location: tests\german\header.spec.js:4:1

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
```

# Page snapshot

```yaml
- generic [active] [ref=f1e1]:
  - region "We value your privacy" [ref=f1e2]:
    - generic [ref=f1e3]:
      - button "Close" [ref=f1e4] [cursor=pointer]
      - generic [ref=f1e5]:
        - heading "We value your privacy" [level=2] [ref=f1e6]
        - generic [ref=f1e7]:
          - paragraph [ref=f1e9]: We use cookies to make your website experience better. By providing your consent, you allow us to store/process information, including your IP address and browsing history, for site improvements, content measurements, and marketing purposes. You may accept or reject all cookies or choose a limited cookie preference.
          - generic [ref=f1e10]:
            - button "Customize" [ref=f1e11] [cursor=pointer]
            - button "Reject All" [ref=f1e12] [cursor=pointer]
            - button "Accept All" [ref=f1e13] [cursor=pointer]
  - banner [ref=f1e14]:
    - link "EXPONA FRAGEN" [ref=f1e18] [cursor=pointer]:
      - /url: "#"
    - generic [ref=f1e21]:
      - link "InfoBeans Startseite" [ref=f1e23] [cursor=pointer]:
        - /url: https://infobeans.ai/de/
        - img "InfoBeans Logo" [ref=f1e24]
      - navigation "Hauptnavigation" [ref=f1e25]:
        - list [ref=f1e26]:
          - listitem [ref=f1e27]:
            - link "Fachgebiete" [ref=f1e28] [cursor=pointer]:
              - /url: "#"
            - generic:
              - link "Lesen Sie die Wow-Geschichte von Ritesh Yadav Ritesh Yadav's WOW story":
                - /url: https://infobeans.ai/de/?wow_story=44804
                - generic: Lesen Sie die Wow-Geschichte von Ritesh Yadav
                - img "Ritesh Yadav's WOW story"
          - listitem [ref=f1e30]:
            - link "Innovationen" [ref=f1e31] [cursor=pointer]:
              - /url: "#"
            - generic:
              - link "Lesen Sie die Wow-Geschichte von Ritesh Yadav Ritesh Yadav's WOW story":
                - /url: https://infobeans.ai/de/?wow_story=44804
                - generic: Lesen Sie die Wow-Geschichte von Ritesh Yadav
                - img "Ritesh Yadav's WOW story"
          - listitem [ref=f1e33]:
            - link "Einblicke" [ref=f1e34] [cursor=pointer]:
              - /url: "#"
            - generic:
              - link "Lesen Sie die Wow-Geschichte von Ritesh Yadav Ritesh Yadav's WOW story":
                - /url: https://infobeans.ai/de/?wow_story=44804
                - generic: Lesen Sie die Wow-Geschichte von Ritesh Yadav
                - img "Ritesh Yadav's WOW story"
          - listitem [ref=f1e36]:
            - link "Über uns" [ref=f1e37] [cursor=pointer]:
              - /url: "#"
            - generic:
              - link "Lesen Sie die Wow-Geschichte von Ritesh Yadav Ritesh Yadav's WOW story":
                - /url: https://infobeans.ai/de/?wow_story=44804
                - generic: Lesen Sie die Wow-Geschichte von Ritesh Yadav
                - img "Ritesh Yadav's WOW story"
      - button "EN" [ref=f1e41] [cursor=pointer]
  - main [ref=f1e45]:
    - region "Modern product experiences showcase" [ref=f1e46]:
      - heading "Moderne Produkterlebnisse – entwickelt für Workflows im Zeitalter der KI." [level=2] [ref=f1e48]
      - list [ref=f1e49]:
        - listitem [ref=f1e50]:
          - img "UX-card1" [ref=f1e52]
        - listitem [ref=f1e53]:
          - img "UX-card2" [ref=f1e55]
        - listitem [ref=f1e56]:
          - img "UX-card3" [ref=f1e58]
        - listitem [ref=f1e59]:
          - img "UX-card4" [ref=f1e61]
        - listitem [ref=f1e62]:
          - img "UX-card5" [ref=f1e64]
    - generic [ref=f1e66]:
      - region "Häufige Themen" [ref=f1e68]:
        - generic [ref=f1e70]:
          - heading "Was in Gesprächen über Produkterlebnisse immer wieder auftaucht" [level=2] [ref=f1e71]
          - generic [ref=f1e72]:
            - generic [ref=f1e74]:
              - generic [ref=f1e75]: Modernisierung von Altsystemen
              - paragraph [ref=f1e76]: Unser Produkt funktioniert nach wie vor, aber behindert die Benutzererfahrung die Akzeptanz, die Effizienz oder das Wachstum?
            - generic [ref=f1e78]:
              - generic [ref=f1e79]: KI-gestütztes Design-to-Code
              - paragraph [ref=f1e80]: Wie nutzen wir KI-Agenten für schnelleres Design, Prototyping und Code-Generierung – ganz ohne Qualitäts- oder Kontrollverlust?
            - generic [ref=f1e82]:
              - generic [ref=f1e83]: Design-Systeme
              - paragraph [ref=f1e84]: Wie schaffen wir Produktkonsistenz über alle Teams hinweg, ohne das Entwicklungstempo zu drosseln?
            - generic [ref=f1e86]:
              - generic [ref=f1e87]: Workflow-Automatisierung
              - paragraph [ref=f1e88]: An welchen Stellen in der User Journey kann KI den manuellen Aufwand spürbar reduzieren?
      - region "Lassen Sie uns darüber sprechen" [ref=f1e90]:
        - generic [ref=f1e92]:
          - generic [ref=f1e93]:
            - generic [ref=f1e94]:
              - heading "Es geht längst nicht mehr nur um schönere Benutzeroberflächen." [level=2] [ref=f1e95]
              - paragraph [ref=f1e96]: Produkte funktionieren besser, wenn der Ablauf klarer strukturiert ist, der Aufwand sinkt und die richtigen Momente durch Automatisierung unterstützt werden. Wir helfen Teams zu erkennen, wo Nutzer feststecken, was durch gezieltes Design vereinfacht werden kann und wo KI Aufwände reduziert, ohne zusätzliche Komplexität zu schaffen.
              - button "Lassen Sie uns darüber sprechen" [ref=f1e97] [cursor=pointer]
            - generic [ref=f1e100]:
              - generic [ref=f1e101]: Arpit Jain
              - generic [ref=f1e102]: VP, Design
              - link "LinkedIn" [ref=f1e103] [cursor=pointer]:
                - /url: https://www.linkedin.com/in/arpit-jain-1227685/
          - img "Arpit Jain, VP, Design" [ref=f1e106]
    - region "Was InfoBeans liefert" [ref=f1e107]:
      - complementary "Abschnittsnavigation" [ref=f1e108]:
        - tablist "Inhalts-Tabs" [ref=f1e110]:
          - tab "[01] Was wir bieten" [selected] [ref=f1e111] [cursor=pointer]:
            - generic [ref=f1e112]: "[01]"
            - generic [ref=f1e113]: Was wir bieten
          - tab "[02] Wahre Geschichten" [ref=f1e114] [cursor=pointer]:
            - generic [ref=f1e115]: "[02]"
            - generic [ref=f1e116]: Wahre Geschichten
          - tab "[03] Kundenstimmen" [ref=f1e117] [cursor=pointer]:
            - generic [ref=f1e118]: "[03]"
            - generic [ref=f1e119]: Kundenstimmen
          - tab "[04] Enterprise Readiness" [ref=f1e120] [cursor=pointer]:
            - generic [ref=f1e121]: "[04]"
            - generic [ref=f1e122]: Enterprise Readiness
      - generic [ref=f1e123]:
        - tabpanel "Was wir bieten" [ref=f1e124]:
          - generic [ref=f1e125]:
            - generic [ref=f1e126]:
              - paragraph [ref=f1e127]: Mehr als nur ein Verkaufsgespräch
              - heading "Von Produktklarheit zu skalierbarer Umsetzungsstärke im Design." [level=2] [ref=f1e128]
            - list [ref=f1e129]:
              - listitem [ref=f1e130]:
                - button "VERSTEHEN & STRATEGIE ENTWICKELN" [expanded] [ref=f1e131] [cursor=pointer]
                - region [ref=f1e136]:
                  - paragraph [ref=f1e137]: Wir beginnen mit dem tiefen Verständnis für Nutzer, Workflows, Geschäftsziele und Produktlücken. Durch UX-Audits, Research, Journey Mapping, Stakeholder-Workshops und KI-gestützte Analysen identifizieren wir genau, was verändert werden muss und wo Design den größten Mehrwert schafft.
              - listitem [ref=f1e139]:
                - button "DESIGNEN & MODERNISIEREN" [ref=f1e140] [cursor=pointer]
                - region:
                  - paragraph: Wir gestalten Produkte, Portale, Workflows und digitale Erlebnisse neu – damit sie einfacher zu bedienen und mühelos zu skalieren sind. Dazu gehören das Vereinfachen der Navigation, das Optimieren zentraler User Journeys, das Erstellen von Prototypen sowie das Identifizieren von Stellen, an denen KI oder Automatisierung unnötigen Aufwand eliminieren.
              - listitem [ref=f1e146]:
                - button "SKALIEREN & UNTERSTÜTZEN" [ref=f1e147] [cursor=pointer]
                - region:
                  - paragraph: Wir begleiten Teams vom Designkonzept bis zur fertigen, produktionsreifen Umsetzung. Von Design-Systemen und responsiven Screens über Dokumentation und Design-QA bis hin zum Handoff und fortlaufendem Support stellen wir sicher, dass das Nutzererlebnis auch beim Wachstum des Produkts konsistent bleibt.
        - tabpanel "Wahre Geschichten" [ref=f1e153]:
          - generic [ref=f1e154]:
            - generic [ref=f1e155]: Geschichten mit Substanz
            - article "Fallstudie 1 von 1" [ref=f1e158]:
              - paragraph [ref=f1e160]: Royal Caribbean
              - generic [ref=f1e161]:
                - generic [ref=f1e162]:
                  - generic [ref=f1e163]: Gesichtserkennung
                  - generic [ref=f1e164]: Kreuzfahrt & Hotellerie
                  - generic [ref=f1e165]: Gäste-Innovationen
                - heading "Einschiffungszeit um das Fünffache verkürzt durch KI-gestützte Gesichtserkennung und eine neu gestaltete Guest Journey" [level=2] [ref=f1e166]
                - link "Vollständige Fallstudie lesen" [ref=f1e167] [cursor=pointer]:
                  - /url: /true-stories/einschiffungszeit-um-das-funffache-verkuerzt-durch-ki-gestuetzte-gesichtserkennung-und-eine-neu-gestaltete-guest-journey/
                  - generic [ref=f1e168]: Wahre Geschichte anzeigen
              - button "Wichtigste Ergebnisse" [ref=f1e170] [cursor=pointer]
            - generic "Kunden und Partner" [ref=f1e171]
        - tabpanel "Kundenstimmen" [ref=f1e173]:
          - article "Kundenstimme von Leiter der Anwendungsentwicklung" [ref=f1e175]:
            - generic [ref=f1e176]:
              - generic [ref=f1e177]:
                - generic [ref=f1e178]: Vertrauen, das wir uns erarbeitet haben
                - heading "Vom Workshop über neue Chancen bis hin zu konkreten geschäftlichen Auswirkungen." [level=2] [ref=f1e179]
                - paragraph [ref=f1e180]: Das Team hat hervorragende Arbeit geleistet, große Reife beim Zeit- und Umfangsmanagement bewiesen und die Gruppe effektiv durch einen strukturierten Prozess geführt. Die Sitzungen führten zu mehreren wertvollen Ideen, darunter auch einige, die sich eigenständig zu neuen Projekten entwickeln könnten.
              - generic [ref=f1e181]:
                - strong [ref=f1e182]: Leiter der Anwendungsentwicklung
                - generic [ref=f1e183]: Ein großer Anbieter von Gesundheitsdienstleistungen
        - tabpanel "Enterprise Readiness" [ref=f1e184]:
          - generic [ref=f1e185]:
            - generic [ref=f1e186]: Entwickelt für das Unternehmen
            - heading "Entwickelt für komplexe Produkte. Auf Skalierbarkeit ausgelegt." [level=2] [ref=f1e187]
            - generic [ref=f1e188]:
              - article "Sichere, Ki-gestützte Arbeitsabläufe" [ref=f1e189]:
                - generic [ref=f1e190]:
                  - generic [aria-hidden] [ref=f1e191]: "01"
                  - generic [ref=f1e192]:
                    - heading "Sichere, Ki-gestützte Arbeitsabläufe" [level=3] [ref=f1e193]
                    - paragraph [ref=f1e194]: KI beschleunigt Audits, Recherchen, die Überprüfung von Inhalten und die Designfindung, doch Datenschutz, Zugriffskontrolle und die Überprüfung durch Menschen bleiben fest in unserer Hand.
              - article "Governance-freundlicher Designprozess" [ref=f1e195]:
                - generic [ref=f1e196]:
                  - generic [aria-hidden] [ref=f1e197]: "02"
                  - generic [ref=f1e198]:
                    - heading "Governance-freundlicher Designprozess" [level=3] [ref=f1e199]
                    - paragraph [ref=f1e200]: Wir dokumentieren Entscheidungen, Abläufe und Begründungen, damit Produkt-, Geschäfts-, Compliance- und Entwicklungsteams stets nachvollziehen können, was sich geändert hat und warum.
              - article "Abstimmung Zwischen Plattform Und Technik" [ref=f1e201]:
                - generic [ref=f1e202]:
                  - generic [aria-hidden] [ref=f1e203]: "03"
                  - generic [ref=f1e204]:
                    - heading "Abstimmung Zwischen Plattform Und Technik" [level=3] [ref=f1e205]
                    - paragraph [ref=f1e206]: Wir entwerfen im Rahmen bestehender Systeme, APIs und Implementierungsbeschränkungen, damit nichts nur gut aussieht, aber nicht umgesetzt oder gewartet werden kann.
              - article "Skalierbare Designsysteme" [ref=f1e207]:
                - generic [ref=f1e208]:
                  - generic [aria-hidden] [ref=f1e209]: "04"
                  - generic [ref=f1e210]:
                    - heading "Skalierbare Designsysteme" [level=3] [ref=f1e211]
                    - paragraph [ref=f1e212]: Wiederverwendbare Komponenten, Muster und Tokens sorgen für Konsistenz über Module, Produkte und zukünftige Releases hinweg.
  - generic [ref=f1e213]:
    - generic [ref=f1e216]:
      - heading [level=2] [ref=f1e217]:
        - text: Lassen Sie uns gemeinsam
        - strong [ref=f1e218]: WOW erschaffen
      - generic [ref=f1e219]:
        - textbox "Fragen Sie Expona nach unseren Dienstleistungen, Fallstudien oder Updates" [ref=f1e220]
        - button "Expona fragen" [ref=f1e221] [cursor=pointer]
    - contentinfo [ref=f1e224]:
      - generic [ref=f1e226]:
        - generic [ref=f1e227]:
          - generic [ref=f1e228]:
            - generic [ref=f1e229]: FACHGEBIETE
            - generic [ref=f1e232]:
              - link "Design" [ref=f1e233] [cursor=pointer]:
                - /url: /de/ux-design/
              - generic [ref=f1e234]: /
              - link "GCC" [ref=f1e235] [cursor=pointer]:
                - /url: /de/gcc-services/
              - generic [ref=f1e236]: /
              - link "Plattformbewertung" [ref=f1e237] [cursor=pointer]:
                - /url: /de/plattform-bewertung/
              - generic [ref=f1e238]: /
              - link "BFSI" [ref=f1e239] [cursor=pointer]:
                - /url: /de/bfsi/
              - generic [ref=f1e240]: /
              - link "Speicher und Virtualisierung" [ref=f1e241] [cursor=pointer]:
                - /url: /de/speicher-virtualisierung/
              - generic [ref=f1e242]: /
              - link "High-Tech" [ref=f1e243] [cursor=pointer]:
                - /url: /de/technology/
              - generic [ref=f1e244]: /
              - link "Fertigung & Produktion" [ref=f1e245] [cursor=pointer]:
                - /url: /de/fertigung-produktion/
              - generic [ref=f1e246]: /
              - link "Agentisches Engineering" [ref=f1e247] [cursor=pointer]:
                - /url: /de/agentisches-engineering/
              - generic [ref=f1e248]: /
              - link "ServiceNow" [ref=f1e249] [cursor=pointer]:
                - /url: /de/servicenow/
              - generic [ref=f1e250]: /
              - link "Salesforce" [ref=f1e251] [cursor=pointer]:
                - /url: /de/salesforce/
          - generic [ref=f1e252]:
            - generic [ref=f1e253]: INNOVATIONEN
            - generic [ref=f1e256]:
              - link "Expona AI" [ref=f1e257] [cursor=pointer]:
                - /url: https://expona.io/
              - generic [ref=f1e258]: /
              - link "Insane SDD" [ref=f1e259] [cursor=pointer]:
                - /url: https://insanesdd.ai/
              - generic [ref=f1e260]: /
              - link "ServiceNow HRSD" [ref=f1e261] [cursor=pointer]:
                - /url: /de/servicenow-hrsd/
              - generic [ref=f1e262]: /
              - link "Stanza" [ref=f1e263] [cursor=pointer]:
                - /url: /de/stanza/
              - generic [ref=f1e264]: /
              - link "Spacewarp für ServiceNow" [ref=f1e265] [cursor=pointer]:
                - /url: /de/spacewarp/
              - generic [ref=f1e266]: /
              - link "BeanTrail für Salesforce" [ref=f1e267] [cursor=pointer]:
                - /url: /de/beantrail/
              - generic [ref=f1e268]: /
              - link "QAVA für Oracle" [ref=f1e269] [cursor=pointer]:
                - /url: /de/qava-fur-oracle/
          - generic [ref=f1e270]:
            - generic [ref=f1e271]: EINBLICKE
            - generic [ref=f1e274]:
              - link "Blog" [ref=f1e275] [cursor=pointer]:
                - /url: /de/blog/
              - generic [ref=f1e276]: /
              - link "WOW-Podcast" [ref=f1e277] [cursor=pointer]:
                - /url: /de/podcasts/
              - generic [ref=f1e278]: /
              - link "Wahre Geschichten" [ref=f1e279] [cursor=pointer]:
                - /url: /de/wahre-geschichten/
          - generic [ref=f1e280]:
            - generic [ref=f1e281]: ÜBER UNS
            - generic [ref=f1e284]:
              - link "Unser Team" [ref=f1e285] [cursor=pointer]:
                - /url: /de/fuehrungsteam/
              - generic [ref=f1e286]: /
              - link "InfoBeans Stiftung" [ref=f1e287] [cursor=pointer]:
                - /url: /de/infobeans-stiftung/
              - generic [ref=f1e288]: /
              - link "Enterprise Readiness" [ref=f1e289] [cursor=pointer]:
                - /url: /de/enterprise-readiness/
              - generic [ref=f1e290]: /
              - link "Investoren" [ref=f1e291] [cursor=pointer]:
                - /url: /de/investoren/
              - generic [ref=f1e292]: /
              - link "Karriere" [ref=f1e293] [cursor=pointer]:
                - /url: /de/karriere/
              - generic [ref=f1e294]: /
              - link "Kontakt" [ref=f1e295] [cursor=pointer]:
                - /url: /de/kontakt/
        - generic [ref=f1e296]:
          - generic [ref=f1e297]:
            - heading "Erhalten Sie Einblicke von InfoBeans" [level=3] [ref=f1e298]
            - generic [ref=f1e300]:
              - textbox "E-Mail Adresse" [ref=f1e301]
              - button "button" [ref=f1e302] [cursor=pointer]:
                - generic [ref=f1e303]: Abonnieren
          - generic [ref=f1e304]:
            - img "InfoBeans"
            - generic [ref=f1e305]:
              - link "LinkedIn" [ref=f1e306] [cursor=pointer]:
                - /url: https://www.linkedin.com/company/infobeans/
              - link "Twitter / X" [ref=f1e308] [cursor=pointer]:
                - /url: https://x.com/InfoBeans
              - link "Instagram" [ref=f1e310] [cursor=pointer]:
                - /url: https://www.instagram.com/InfoBeans/
              - link "Facebook" [ref=f1e312] [cursor=pointer]:
                - /url: https://www.facebook.com/InfoBeans/
        - generic [ref=f1e314]:
          - generic [ref=f1e315]: © Copyright 2026 InfoBeans
          - generic [ref=f1e316]:
            - link "DISCLAIMER" [ref=f1e317] [cursor=pointer]:
              - /url: /disclaimer/
            - link "PRIVACY POLICY" [ref=f1e318] [cursor=pointer]:
              - /url: /privacy-policy/
      - generic [ref=f1e321]:
        - generic [ref=f1e322]: InfoBeans ist ein „Select“-Partner im Bereich „Partner Network Services“ des Claude-Partnernetzwerks.
        - button "ERFAHREN SIE, WIE WIR ENTWICKELN" [ref=f1e324] [cursor=pointer]
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | const { BasePage } = require('../../pages/BasePage');
  3  | 
  4  | test('TC_DE_HEADER_STRUCTURE_0001 | Verify german header links and destinations', async ({ page }, testInfo) => {
  5  |     testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_DE_HEADER_STRUCTURE_0001\",\"scenario\":\"Verify german header links and destinations\",\"description\":\"Check the header renders links with destinations.\",\"preconditions\":\"The public page is reachable.\",\"steps\":[\"Navigate to https://infobeans.ai/de/ux-design\",\"Verify the header is visible and its links have destinations\"],\"expectedResult\":\"The header is visible and its links have destinations.\",\"pageUrl\":\"https://infobeans.ai/de/ux-design\"}" });
  6  |   const basePage = new BasePage(page);
  7  |   await basePage.goto("https://infobeans.ai/de/ux-design");
  8  |   const region = page.getByRole('banner');
  9  |   await expect(region).toBeVisible();
  10 |   await expect(region.locator('a[href]').first()).toBeVisible();
  11 |   let hrefs;
  12 |   for (let attempt = 0; attempt < 3; attempt += 1) {
  13 |     try {
  14 |       hrefs = await region.locator('a[href]').evaluateAll(anchors => anchors.map(anchor => anchor.href));
  15 |       break;
  16 |     } catch (error) {
  17 |       if (!(error instanceof Error)
  18 |         || !error.message.includes('Execution context was destroyed')
  19 |         || attempt === 2) throw error;
  20 |       await page.waitForLoadState('domcontentloaded');
  21 |     }
  22 |   }
> 23 |   expect(hrefs.length).toBeGreaterThan(0);
     |                        ^ Error: expect(received).toBeGreaterThan(expected)
  24 |   expect(hrefs.every(href => Boolean(href))).toBe(true);
  25 |   testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify({ links: hrefs.length, regionVisible: true }) });
  26 | });
  27 | 
```