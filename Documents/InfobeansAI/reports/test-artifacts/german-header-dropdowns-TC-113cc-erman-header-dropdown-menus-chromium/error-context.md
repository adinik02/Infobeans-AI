# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: german\header-dropdowns.spec.js >> TC_DE_HEADER_DROPDOWNS_0001 | Verify german header dropdown menus
- Location: tests\german\header-dropdowns.spec.js:4:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator:  getByRole('banner').locator('.nav-item.dropdown-trigger').first().locator('a.submenu-link').first()
Expected: visible
Received: hidden
Timeout:  5000ms

Call log:
  - Expect "toBeVisible" getByRole('banner').locator('.nav-item.dropdown-trigger').first().locator('a.submenu-link').first() with timeout 5000ms
  - waiting for getByRole('banner').locator('.nav-item.dropdown-trigger').first().locator('a.submenu-link').first()
    6 × locator resolved to <a class="submenu-link" href="/de/ux-design/">Design</a>
      - unexpected value "hidden"

```

```yaml
- region "We value your privacy":
  - button "Close"
  - heading "We value your privacy" [level=2]
  - paragraph: We use cookies to make your website experience better. By providing your consent, you allow us to store/process information, including your IP address and browsing history, for site improvements, content measurements, and marketing purposes. You may accept or reject all cookies or choose a limited cookie preference.
  - button "Customize"
  - button "Reject All"
  - button "Accept All"
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
  - button "DE"
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
      - article "Case study 1 of 1":
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
  1  | const { test, expect } = require('@playwright/test');
  2  | const { BasePage } = require('../../pages/BasePage');
  3  | 
  4  | test('TC_DE_HEADER_DROPDOWNS_0001 | Verify german header dropdown menus', async ({ page }, testInfo) => {
  5  |     testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_DE_HEADER_DROPDOWNS_0001\",\"scenario\":\"Verify german header dropdown menus\",\"description\":\"Open each expandable header navigation menu and verify its submenu links are exposed.\",\"preconditions\":\"The public page is reachable; no form is submitted.\",\"steps\":[\"Navigate to https://infobeans.ai/de/ux-design\",\"Hover each expandable navigation menu\",\"Verify every menu exposes submenu links with destinations\"],\"expectedResult\":\"Each expandable header menu opens and exposes submenu links with destinations.\",\"pageUrl\":\"https://infobeans.ai/de/ux-design\"}" });
  6  |   const basePage = new BasePage(page);
  7  |   await basePage.goto("https://infobeans.ai/de/ux-design");
  8  |   const header = page.getByRole('banner');
  9  |   await expect(header).toBeVisible();
  10 |   const dropdowns = header.locator('.nav-item.dropdown-trigger');
  11 |   const dropdownCount = await dropdowns.count();
  12 |   expect(dropdownCount).toBeGreaterThan(0);
  13 |   const menuResults = [];
  14 |   for (let index = 0; index < dropdownCount; index += 1) {
  15 |     const dropdown = dropdowns.nth(index);
  16 |     await dropdown.locator('a.nav-link').hover();
  17 |     const submenuLinks = dropdown.locator('a.submenu-link');
  18 |     const linkCount = await submenuLinks.count();
  19 |     expect(linkCount).toBeGreaterThan(0);
> 20 |     await expect(submenuLinks.first()).toBeVisible();
     |                                        ^ Error: expect(locator).toBeVisible() failed
  21 |     const destinations = await submenuLinks.evaluateAll(anchors => anchors.map(anchor => anchor.href));
  22 |     expect(destinations.every(Boolean)).toBe(true);
  23 |     menuResults.push({ index, linkCount, destinations });
  24 |   }
  25 |   testInfo.annotations.push({ type: 'actual-result', description: JSON.stringify(menuResults) });
  26 | });
  27 | 
```