# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: english\header-dropdowns.spec.js >> TC_EN_HEADER_DROPDOWNS_0001 | Verify english header dropdown menus
- Location: tests\english\header-dropdowns.spec.js:4:1

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
    - waiting for "https://infobeans.ai/ux-design/" navigation to finish...
    - navigated to "https://infobeans.ai/ux-design/"
    2 × locator resolved to <a href="/ux-design/" class="submenu-link">Design</a>
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
  - link "ASK EXPONA":
    - /url: "#"
  - link "InfoBeans Home":
    - /url: https://infobeans.ai/
    - img "InfoBeans Logo"
  - navigation "Main Navigation":
    - list:
      - listitem:
        - link "Disciplines":
          - /url: "#"
      - listitem:
        - link "Innovation":
          - /url: "#"
      - listitem:
        - link "Insights":
          - /url: "#"
      - listitem:
        - link "About":
          - /url: "#"
  - button "EN"
- main:
  - region "Modern product experiences showcase":
    - heading "Modern product experiences, designed for AI-era workflows." [level=2]
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
  - region "Common conversations":
    - heading "What keeps coming up in product experience conversations" [level=2]
    - text: Legacy Modernization
    - paragraph: Our product still works. But is the experience holding back adoption, efficiency, or growth?
    - text: AI Design-to-Code
    - paragraph: Using AI agents to design, prototype, and generate code faster without losing quality or control?
    - text: Design Systems
    - paragraph: How do we create consistency across products without slowing every team down?
    - text: Workflow Automation
    - paragraph: Where can AI reduce manual effort inside the user journey?
  - region "Let's talk":
    - heading "It is not just about better screens anymore." [level=2]
    - paragraph: Products work better when the journey is clearer, the effort is lower, and the right moments are supported by automation. We help teams see where users are getting stuck, what can be simplified through design, and where AI can reduce effort without adding complexity.
    - button "Let's Talk"
    - text: Arpit Jain VP, Design
    - link "LinkedIn":
      - /url: https://www.linkedin.com/in/arpit-jain-1227685/
    - img "Arpit Jain, VP, Design"
  - region "What InfoBeans delivers":
    - complementary "Section navigation":
      - tablist "Content tabs":
        - tab "[01] What we deliver" [selected]
        - tab "[02] True Stories"
        - tab "[03] Trustimonials"
        - tab "[04] Enterprise Readiness"
    - tabpanel "What we deliver":
      - paragraph: Beyond the Pitch
      - heading "From product clarity to scalable design execution." [level=2]
      - list:
        - listitem:
          - button "Understand & Strategize" [expanded]
          - region:
            - paragraph: We start by understanding users, workflows, business goals, and product gaps. Through UX audits, research, journey mapping, stakeholder workshops, and AI-assisted analysis, we identify what needs to change and where design can create the most value.
        - listitem:
          - button "Design & Modernize"
          - region:
            - paragraph: We redesign products, portals, workflows, and digital experiences so they feel easier to use and easier to scale. This includes simplifying navigation, improving key journeys, creating prototypes, and identifying where AI or automation can remove unnecessary effort.
        - listitem:
          - button "Scale & Support"
          - region:
            - paragraph: We help teams move from design direction to production-ready execution. From design systems and responsive screens to documentation, handoff, design QA, and ongoing support, we make sure the experience stays consistent as the product grows.
    - tabpanel "True Stories":
      - text: Stories With Substance
      - article "Case study 1 of 1":
        - paragraph: Royal Caribbean
        - text: Facial Recognition Cruise & Hospitality Guest Innovation
        - heading "Cut embarkation time by 5x with Agentic facial recognition and a reimagined guest journey" [level=2]
        - link "Read the full case study":
          - /url: /true-stories/cut-embarkation-time-by-5x-with-agentic-facial-recognition-and-a-reimagined-guest-journey/
          - text: View True Story
        - button "Key Impacts"
    - tabpanel "Trustimonials":
      - article "Testimonial from Head of Applications,":
        - text: The trust we've earned
        - heading "From Workshop to Opportunities to Real Business Impact." [level=2]
        - paragraph: The team did an outstanding job, demonstrating great maturity in managing time and scope, and effectively guiding the group through a structured process. The sessions resulted in several valuable ideas, including some that could evolve into new projects on their own.
        - strong: Head of Applications,
        - text: A large healthcare services provider
    - tabpanel "Enterprise Readiness":
      - text: Engineered for the Enterprise
      - heading "Built for product complexity. Designed to scale." [level=2]
      - article "Secure Ai-assisted Workflows":
        - heading "Secure Ai-assisted Workflows" [level=3]
        - paragraph: AI accelerates audits, research, content review, and design exploration, but data privacy, access control, and human validation stay firmly in our control.
      - article "Governance-friendly Design Process":
        - heading "Governance-friendly Design Process" [level=3]
        - paragraph: We document decisions, flows, and rationale so product, business, compliance, and engineering teams always understand what changed and why.
      - article "Platform & Engineering Alignment":
        - heading "Platform & Engineering Alignment" [level=3]
        - paragraph: We design within existing systems, APIs, and implementation constraints, so nothing looks great but can't be built or maintained.
      - article "Scalable Design Systems":
        - heading "Scalable Design Systems" [level=3]
        - paragraph: Reusable components, patterns, and tokens keep consistency across modules, products, and future releases.
- heading "Let's create wow together" [level=2]:
  - text: Let's
  - strong: create wow
  - text: together
- textbox "Ask Expona about our services, case studies, or updates"
- button "Ask Expona"
- contentinfo:
  - text: DISCIPLINES
  - link "Design":
    - /url: /ux-design/
  - text: /
  - link "GCC":
    - /url: /gcc-services/
  - text: /
  - link "Platform Assessment":
    - /url: /platform-assessment/
  - text: /
  - link "BFSI":
    - /url: /bfsi/
  - text: /
  - link "Storage & Virtualization":
    - /url: /storage-and-virtualization/
  - text: /
  - link "High-Tech":
    - /url: /technology/
  - text: /
  - link "Manufacturing":
    - /url: /manufacturing/
  - text: /
  - link "Agentic Engineering":
    - /url: /agentic-engineering/
  - text: /
  - link "ServiceNow":
    - /url: /servicenow/
  - text: /
  - link "Salesforce":
    - /url: /salesforce/
  - text: INNOVATION
  - link "Expona AI":
    - /url: https://expona.io/
  - text: /
  - link "Insane SDD":
    - /url: https://insanesdd.ai/
  - text: /
  - link "ServiceNow HRSD":
    - /url: /servicenow-hrsd/
  - text: /
  - link "Stanza":
    - /url: /stanza/
  - text: /
  - link "Spacewarp for ServiceNow":
    - /url: /spacewarp/
  - text: /
  - link "BeanTrail for Salesforce":
    - /url: /beantrail/
  - text: /
  - link "QAVA for Oracle":
    - /url: /qava-for-oracle/
  - text: INSIGHTS
  - link "Blog":
    - /url: /blog/
  - text: /
  - link "WOW Podcast":
    - /url: /podcasts/
  - text: /
  - link "True Stories":
    - /url: /true-stories/
  - text: ABOUT
  - link "Our Team":
    - /url: /leadership/
  - text: /
  - link "Foundation":
    - /url: /infobeans-foundation/
  - text: /
  - link "Enterprise Readiness":
    - /url: /enterprise-readiness/
  - text: /
  - link "Investors":
    - /url: /investors/
  - text: /
  - link "Careers":
    - /url: /careers/
  - text: /
  - link "Contact Us":
    - /url: /contact-us/
  - heading "Get insights from InfoBeans" [level=3]
  - textbox "Enter Your Email"
  - button "button": SUBSCRIBE
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
  - text: InfoBeans is a Select partner in the Claude Partner Network Services Track.
  - button "SEE HOW WE BUILD"
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | const { BasePage } = require('../../pages/BasePage');
  3  | 
  4  | test('TC_EN_HEADER_DROPDOWNS_0001 | Verify english header dropdown menus', async ({ page }, testInfo) => {
  5  |     testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EN_HEADER_DROPDOWNS_0001\",\"scenario\":\"Verify english header dropdown menus\",\"description\":\"Open each expandable header navigation menu and verify its submenu links are exposed.\",\"preconditions\":\"The public page is reachable; no form is submitted.\",\"steps\":[\"Navigate to https://infobeans.ai/ux-design\",\"Hover each expandable navigation menu\",\"Verify every menu exposes submenu links with destinations\"],\"expectedResult\":\"Each expandable header menu opens and exposes submenu links with destinations.\",\"pageUrl\":\"https://infobeans.ai/ux-design\"}" });
  6  |   const basePage = new BasePage(page);
  7  |   await basePage.goto("https://infobeans.ai/ux-design");
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