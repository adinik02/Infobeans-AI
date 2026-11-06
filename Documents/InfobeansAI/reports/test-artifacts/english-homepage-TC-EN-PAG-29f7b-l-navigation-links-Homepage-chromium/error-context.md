# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: english\homepage.spec.js >> TC_EN_PAGE_0003 | Verify homepage internal navigation links: Homepage
- Location: tests\english\homepage.spec.js:103:1

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
```

# Page snapshot

```yaml
- generic [active] [ref=f4e1]:
  - region "We value your privacy" [ref=f4e2]:
    - generic [ref=f4e3]:
      - button "Close" [ref=f4e4] [cursor=pointer]
      - generic [ref=f4e5]:
        - heading "We value your privacy" [level=2] [ref=f4e6]
        - generic [ref=f4e7]:
          - paragraph [ref=f4e9]: We use cookies to make your website experience better. By providing your consent, you allow us to store/process information, including your IP address and browsing history, for site improvements, content measurements, and marketing purposes. You may accept or reject all cookies or choose a limited cookie preference.
          - generic [ref=f4e10]:
            - button "Customize" [ref=f4e11] [cursor=pointer]
            - button "Reject All" [ref=f4e12] [cursor=pointer]
            - button "Accept All" [ref=f4e13] [cursor=pointer]
  - banner [ref=f4e14]:
    - link "ASK EXPONA" [ref=f4e18] [cursor=pointer]:
      - /url: "#"
    - generic [ref=f4e21]:
      - link "InfoBeans Home" [ref=f4e23] [cursor=pointer]:
        - /url: https://infobeans.ai/
        - img "InfoBeans Logo" [ref=f4e24]
      - generic:
        - link "Read Ritesh Yadav's wow Story Ritesh Yadav's WOW story":
          - /url: https://infobeans.ai/?wow_story=42630
          - generic: Read Ritesh Yadav's wow Story
          - img "Ritesh Yadav's WOW story"
      - generic:
        - link "Read Ritesh Yadav's wow Story Ritesh Yadav's WOW story":
          - /url: https://infobeans.ai/?wow_story=42630
          - generic: Read Ritesh Yadav's wow Story
          - img "Ritesh Yadav's WOW story"
      - generic:
        - link "Read Ritesh Yadav's wow Story Ritesh Yadav's WOW story":
          - /url: https://infobeans.ai/?wow_story=42630
          - generic: Read Ritesh Yadav's wow Story
          - img "Ritesh Yadav's WOW story"
      - generic:
        - link "Read Ritesh Yadav's wow Story Ritesh Yadav's WOW story":
          - /url: https://infobeans.ai/?wow_story=42630
          - generic: Read Ritesh Yadav's wow Story
          - img "Ritesh Yadav's WOW story"
      - button "EN" [ref=f4e27] [cursor=pointer]
  - generic:
    - generic:
      - heading "Ritesh Yadav" [level=3]
      - paragraph: Head of Administration · 19 years at InfoBeans
      - paragraph: "\"The best teams aren't built in buildings, they're forged in moments that test who we really are\""
  - generic [ref=f4e34]:
    - main [ref=f4e35]:
      - generic [ref=f4e37]:
        - generic [ref=f4e39]:
          - heading "A few seconds, worth a lifetime" [level=1] [ref=f4e40]
          - generic [ref=f4e42]:
            - paragraph [ref=f4e43]: In 2009, two workers came to install a new signboard on the terrace. It was a small office with an open terrace on the rooftop. The metal frame of the signboard was heavy, so Ritesh asked Darshan to hold it steady while the workers bolted it in.
            - paragraph [ref=f4e44]: Everything was going like normal, people talking and checking measurements, passing tools up from below.
            - paragraph: Ritesh noticed Darshan gripping the frame, his whole body completely rigid and frozen in place. His face appeared tight and his legs were shaking. He quickly realized at that moment he had touched the live electrical line from the old signboard next to him.
            - paragraph: He grabbed a rope the workers had been using and looped it around his torso and pulled. Darshan broke contact and fell backward, and for two seconds nobody moved before someone shouted and then everything happened at once. People rushed in, and Ritesh stayed with Darshan until they reached the hospital.
            - paragraph: He was fine. The doctors said he was lucky.
            - paragraph: When Ritesh speaks about that evening now, he doesn't think about what he did. He thinks about those two seconds where everything stopped, and he has no idea if he would have known what to do if he'd had the time to think about it.
            - paragraph: That's what stays with him. Not the action itself, but the fact that he never had time to decide. In those two seconds, with no time to think, he was just someone who acted before thinking.
          - paragraph [ref=f4e45]: Scroll to read more
          - generic [ref=f4e48] [cursor=pointer]:
            - generic [ref=f4e49]: Ritesh's Story
            - generic [ref=f4e50]: •
            - generic [ref=f4e51]: "2007"
        - generic [ref=f4e52]: WHAT WE DO
      - heading "Who we are in unscripted moments is who we are at enterprise scale." [level=2] [ref=f4e60]
      - generic [ref=f4e63]:
        - generic [ref=f4e64]:
          - generic [ref=f4e65]:
            - generic [ref=f4e66]: ServiceNow
            - generic [ref=f4e67]: Salesforce
            - generic [ref=f4e68]: Agentic Engineering
          - heading "Enterprise Technology Partner Trusted at Fortune 100 Scale." [level=2] [ref=f4e69]:
            - generic [ref=f4e70]: Enterprise Technology Partner
            - generic [ref=f4e71]: Trusted at Fortune 100 Scale.
          - generic [ref=f4e72]:
            - textbox "Start with the challenge on your mind." [ref=f4e73]
            - button "Submit" [ref=f4e74] [cursor=pointer]:
              - img "challenge-button-icon" [ref=f4e75]
        - link "WOW MOMENT Select Services Partner, Claude Partner Network InfoBeans has achieved the Select Partner tier in the Claude Partner Network Services Track." [ref=f4e78] [cursor=pointer]:
          - /url: /agentic-engineering/
          - generic [ref=f4e79]:
            - generic [ref=f4e80]: WOW MOMENT
            - img "Select Services Partner, Claude Partner Network" [ref=f4e83]
            - paragraph [ref=f4e85]: InfoBeans has achieved the Select Partner tier in the Claude Partner Network Services Track.
      - generic [ref=f4e88]:
        - heading "What we ship" [level=2] [ref=f4e89]
        - generic [ref=f4e90]:
          - generic [ref=f4e91]:
            - generic [ref=f4e92]:
              - generic [ref=f4e93] [cursor=pointer]:
                - generic [ref=f4e94]: Leading private bank
                - heading "Reducing HR operational costs by 20% and accelerating case resolution for 50,000+ employees" [level=3] [ref=f4e96]
                - generic [ref=f4e97]:
                  - generic [ref=f4e98]: ServiceNow HRSD
                  - generic [ref=f4e99]: AI-Powered Search
                  - generic [ref=f4e100]: BFSI
              - generic [ref=f4e101]:
                - generic [ref=f4e102]:
                  - generic [ref=f4e103]:
                    - heading "What" [level=4] [ref=f4e104]
                    - paragraph [ref=f4e105]: Replaced a fragmented, multi-system HR landscape with a single Employee Center — unifying case management, knowledge search, and profile updates across ServiceNow and Oracle HR.
                    - paragraph [ref=f4e106]: "The outcome: faster resolutions, consistent records, and a self-service experience for 50,000+ employees."
                  - generic [ref=f4e107]:
                    - heading "Why" [level=4] [ref=f4e108]
                    - paragraph [ref=f4e109]: HR services were scattered across systems, forcing employees to juggle multiple applications for leave, payroll, benefits, and profile updates — while duplicate data entry created compliance risk and inconsistent records.
                    - paragraph [ref=f4e110]: The bank needed one connected platform to close these gaps without disrupting Oracle as the system of record.
                - generic [ref=f4e111]:
                  - generic [ref=f4e112]:
                    - heading "How" [level=4] [ref=f4e113]
                    - paragraph [ref=f4e114]: InfoBeans built a Unified Employee Center on ServiceNow HRSD, consolidating 85+ HR services into a single, standardized catalog with automated case creation and routing. AI-powered Enterprise Knowledge Search connected ServiceNow with external repositories using Zero-Copy Metadata Indexing, so employees could search everything from one place without duplicating content. A dedicated Profile Synchronization workflow, powered by FlowAPI Runner, let employees update personal details once and sync them securely to Oracle in real time.
                    - paragraph [ref=f4e115]: Together, these capabilities cut HR operational costs by 15-20%, sped up case resolution by 20-25%, and reduced manual profile-update effort by 40-50% — giving employees a consistent, always-on HR experience.
                  - link "VIEW TRUE STORY" [ref=f4e117] [cursor=pointer]:
                    - /url: /true-stories/reducing-hr-operational-costs-by-20-and-accelerating-case-resolution-for-50000-employees/
            - generic [ref=f4e120] [cursor=pointer]: See what changed
          - generic:
            - generic:
              - generic:
                - generic: Industrial B2B Distribution
                - generic:
                  - heading "Driving 5x customer growth and 50% faster case routing via unified Salesforce Agentforce" [level=3]
                - generic:
                  - generic: Salesforce Agentforce
                  - generic: Data 360
                  - generic: Marketing Cloud
              - generic:
                - generic:
                  - generic:
                    - heading "What" [level=4]
                    - paragraph: Consolidated fragmented service, sales, and marketing operations — spanning CRM, SAP Commerce Cloud, and digital platforms — into one AI-driven Salesforce ecosystem serving both customers and internal teams.
                    - paragraph: "The outcome: automated case classification, AI-generated quotes, and a unified customer view powering personalization at scale."
                  - generic:
                    - heading "Why" [level=4]
                    - paragraph: "Manual processes were slowing the business: 3,000-3,500 support emails a day sorted and routed by hand, repetitive quote generation reliant on individual product expertise, and customer data siloed across systems with no single view of the customer."
                    - paragraph: The organization needed automation to scale its engagement model and convert fragmented data into predictive, personalized action.
                - generic:
                  - generic:
                    - heading "How" [level=4]
                    - paragraph: Agentforce introduced AI-driven case classification, brand identification, and automated routing, alongside AI-assisted quote drafting and response generation. Data 360 unified Customer 360 through identity resolution across CRM, ERP, Commerce, and digital channels, while Marketing Cloud powered real-time segmentation, 25+ automated omnichannel journeys, and predictive models for next-best-action and propensity. Experience Cloud and CPQ delivered a self-service portal with guided selling and automated pricing, backed by integrations with Factwise, e-commerce, and chatbot/CTI systems.
                    - paragraph: Together, these integrations reduced case routing turnaround time by 40-50%, cut manual quote creation effort by 50-70%, and scaled the Believer Score engagement program 5x — from 2 lakh to 1 million customers.
                  - generic:
                    - link "VIEW TRUE STORY":
                      - /url: /true-stories/driving-5x-customer-growth-and-50-faster-case-routing-via-unified-salesforce-agentforce/
            - generic: See what changed
          - generic:
            - generic:
              - generic:
                - generic: US loyalty platform
                - generic:
                  - heading "Accelerating production defect resolution by 30% across a 4M+ daily transaction platform" [level=3]
                - generic:
                  - generic: Claude Code
                  - generic: AI-Assisted Engineering
                  - generic: Tech
              - generic:
                - generic:
                  - generic:
                    - heading "What" [level=4]
                    - paragraph: Integrated Claude Code into the engineering workflow of a loyalty platform processing 4 million transactions daily, embedding AI assistance directly into design, code review, and production support.
                    - paragraph: "The outcome: faster delivery, fewer defects, and quicker resolution of production issues."
                  - generic:
                    - heading "Why" [level=4]
                    - paragraph: Engineering bottlenecks were threatening delivery velocity for a platform operating at serious scale, every slowdown in design, review, or issue resolution carried outsized risk given the transaction volume running through the system daily.
                    - paragraph: The team needed to move faster without compromising code quality or platform stability.
                - generic:
                  - generic:
                    - heading "How" [level=4]
                    - paragraph: Claude Code was embedded across the engineering workflow — accelerating solution design, enabling more thorough code review, and speeding up production issue diagnosis and resolution.
                    - paragraph: This cut production issue resolution time by 30%, while measurably improving delivery speed and reducing defects across the platform.
                  - generic:
                    - link "VIEW TRUE STORY":
                      - /url: /true-stories/accelerating-production-defect-resolution-by-30-across-a-4m-daily-transaction-platform/
            - generic: See what changed
          - generic:
            - generic:
              - heading "Discover stories across industries and technology" [level=3]
              - generic:
                - link "Cloud Transformation":
                  - /url: /true-stories/tags/cloud
                - link "BFSI":
                  - /url: /true-stories/tags/bfsi
                - link "Consumer Goods":
                  - /url: /true-stories/tags/consumer-goods
                - link "GCC Success":
                  - /url: /true-stories/tags/gcc-success
                - link "Standards Development Organizations":
                  - /url: /true-stories/tags/sdo
              - link "View all True Stories":
                - /url: /true-stories/
        - generic [ref=f4e122]:
          - generic [ref=f4e123] [cursor=pointer]:
            - text: ServiceNow
            - generic [ref=f4e124]: ...
          - generic [ref=f4e125] [cursor=pointer]: Salesforce
          - generic [ref=f4e126] [cursor=pointer]: Agentic Engineering
          - generic [ref=f4e127] [cursor=pointer]
      - generic [ref=f4e134]:
        - heading "We show up for each other. build together. grow with the community. create wow!" [level=3] [ref=f4e136]:
          - generic [ref=f4e137]: We
          - generic [ref=f4e139]:
            - generic [ref=f4e140]: show up for each other.
            - generic [ref=f4e141]: build together.
            - generic [ref=f4e142]: grow with the community.
            - generic [ref=f4e143]:
              - generic [ref=f4e144]: create
              - generic [ref=f4e145]: wow!
        - generic [ref=f4e147]:
          - generic [ref=f4e149]:
            - iframe [ref=f4e150]
            - generic [aria-hidden] [ref=f4e151] [cursor=pointer]
            - button "Play video"
            - group "Video controls":
              - button "Play"
              - slider "Seek"
              - generic:
                - generic: 0:00
                - generic: /
                - generic: 0:00
              - generic:
                - button "Unmute"
                - slider "Volume": "0"
              - button "Full screen"
          - generic [ref=f4e153]:
            - iframe [ref=f4e154]
            - generic [aria-hidden] [ref=f4e155] [cursor=pointer]
            - button "Play video"
            - group "Video controls":
              - button "Play"
              - slider "Seek"
              - generic:
                - generic: 0:00
                - generic: /
                - generic: 0:00
              - button "Full screen"
          - generic [ref=f4e157]:
            - iframe [ref=f4e158]
            - generic [aria-hidden] [ref=f4e159] [cursor=pointer]
            - button "Play video"
            - group "Video controls":
              - button "Play"
              - slider "Seek"
              - generic:
                - generic: 0:00
                - generic: /
                - generic: 0:00
              - button "Full screen"
        - generic [ref=f4e162]:
          - paragraph [ref=f4e163]: It starts with noticing what others might miss.
          - paragraph [ref=f4e164]: It grows when people choose to build together.
          - paragraph [ref=f4e165]: It's part of how we grow together, in the ways that matter.
    - generic [ref=f4e166]:
      - generic [ref=f4e169]:
        - heading [level=2] [ref=f4e170]:
          - text: Let's
          - strong [ref=f4e171]: create wow
          - text: together
        - generic [ref=f4e172]:
          - textbox "Ask Expona about our services, case studies, or updates" [ref=f4e173]
          - button "Ask Expona" [ref=f4e174] [cursor=pointer]
      - contentinfo [ref=f4e177]:
        - generic [ref=f4e179]:
          - generic [ref=f4e180]:
            - generic [ref=f4e181]:
              - generic [ref=f4e182]: DISCIPLINES
              - generic [ref=f4e186]:
                - link "Design" [ref=f4e187] [cursor=pointer]:
                  - /url: /ux-design/
                - generic [ref=f4e188]: /
                - link "GCC" [ref=f4e189] [cursor=pointer]:
                  - /url: /gcc-services/
                - generic [ref=f4e190]: /
                - link "Platform Assessment" [ref=f4e191] [cursor=pointer]:
                  - /url: /platform-assessment/
                - generic [ref=f4e192]: /
                - link "BFSI" [ref=f4e193] [cursor=pointer]:
                  - /url: /bfsi/
                - generic [ref=f4e194]: /
                - link "Storage & Virtualization" [ref=f4e195] [cursor=pointer]:
                  - /url: /storage-and-virtualization/
                - generic [ref=f4e196]: /
                - link "High-Tech" [ref=f4e197] [cursor=pointer]:
                  - /url: /technology/
                - generic [ref=f4e198]: /
                - link "Manufacturing" [ref=f4e199] [cursor=pointer]:
                  - /url: /manufacturing/
                - generic [ref=f4e200]: /
                - link "Agentic Engineering" [ref=f4e201] [cursor=pointer]:
                  - /url: /agentic-engineering/
                - generic [ref=f4e202]: /
                - link "ServiceNow" [ref=f4e203] [cursor=pointer]:
                  - /url: /servicenow/
                - generic [ref=f4e204]: /
                - link "Salesforce" [ref=f4e205] [cursor=pointer]:
                  - /url: /salesforce/
            - generic [ref=f4e206]:
              - generic [ref=f4e207]: INNOVATION
              - generic [ref=f4e211]:
                - link "Expona AI" [ref=f4e212] [cursor=pointer]:
                  - /url: https://expona.io/
                - generic [ref=f4e213]: /
                - link "Insane SDD" [ref=f4e214] [cursor=pointer]:
                  - /url: https://insanesdd.ai/
                - generic [ref=f4e215]: /
                - link "ServiceNow HRSD" [ref=f4e216] [cursor=pointer]:
                  - /url: /servicenow-hrsd/
                - generic [ref=f4e217]: /
                - link "Stanza" [ref=f4e218] [cursor=pointer]:
                  - /url: /stanza/
                - generic [ref=f4e219]: /
                - link "Spacewarp for ServiceNow" [ref=f4e220] [cursor=pointer]:
                  - /url: /spacewarp/
                - generic [ref=f4e221]: /
                - link "BeanTrail for Salesforce" [ref=f4e222] [cursor=pointer]:
                  - /url: /beantrail/
                - generic [ref=f4e223]: /
                - link "QAVA for Oracle" [ref=f4e224] [cursor=pointer]:
                  - /url: /qava-for-oracle/
            - generic [ref=f4e225]:
              - generic [ref=f4e226]: INSIGHTS
              - generic [ref=f4e230]:
                - link "Blog" [ref=f4e231] [cursor=pointer]:
                  - /url: /blog/
                - generic [ref=f4e232]: /
                - link "WOW Podcast" [ref=f4e233] [cursor=pointer]:
                  - /url: /podcasts/
                - generic [ref=f4e234]: /
                - link "True Stories" [ref=f4e235] [cursor=pointer]:
                  - /url: /true-stories/
            - generic [ref=f4e236]:
              - generic [ref=f4e237]: ABOUT
              - generic [ref=f4e241]:
                - link "Our Team" [ref=f4e242] [cursor=pointer]:
                  - /url: /leadership/
                - generic [ref=f4e243]: /
                - link "Foundation" [ref=f4e244] [cursor=pointer]:
                  - /url: /infobeans-foundation/
                - generic [ref=f4e245]: /
                - link "Enterprise Readiness" [ref=f4e246] [cursor=pointer]:
                  - /url: /enterprise-readiness/
                - generic [ref=f4e247]: /
                - link "Investors" [ref=f4e248] [cursor=pointer]:
                  - /url: /investors/
                - generic [ref=f4e249]: /
                - link "Careers" [ref=f4e250] [cursor=pointer]:
                  - /url: /careers/
                - generic [ref=f4e251]: /
                - link "Contact Us" [ref=f4e252] [cursor=pointer]:
                  - /url: /contact-us/
          - generic [ref=f4e253]:
            - generic [ref=f4e254]:
              - heading "Get insights from InfoBeans" [level=3] [ref=f4e255]
              - generic [ref=f4e257]:
                - textbox "Enter Your Email" [ref=f4e258]
                - button "button" [ref=f4e259] [cursor=pointer]:
                  - generic [ref=f4e260]: SUBSCRIBE
            - generic [ref=f4e261]:
              - img "InfoBeans" [ref=f4e262]
              - generic [ref=f4e263]:
                - link "LinkedIn" [ref=f4e264] [cursor=pointer]:
                  - /url: https://www.linkedin.com/company/infobeans/
                - link "Twitter / X" [ref=f4e267] [cursor=pointer]:
                  - /url: https://x.com/InfoBeans
                - link "Instagram" [ref=f4e270] [cursor=pointer]:
                  - /url: https://www.instagram.com/InfoBeans/
                - link "Facebook" [ref=f4e273] [cursor=pointer]:
                  - /url: https://www.facebook.com/InfoBeans/
          - generic [ref=f4e276]:
            - generic [ref=f4e277]: © Copyright 2026 InfoBeans
            - generic [ref=f4e278]:
              - link "DISCLAIMER" [ref=f4e279] [cursor=pointer]:
                - /url: /disclaimer/
              - link "PRIVACY POLICY" [ref=f4e280] [cursor=pointer]:
                - /url: /privacy-policy/
        - generic [ref=f4e283]:
          - generic [ref=f4e284]: InfoBeans is a Select partner in the Claude Partner Network Services Track.
          - button "SEE HOW WE BUILD" [ref=f4e286] [cursor=pointer]
```

# Test source

```ts
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
  53  |   await expect(heading).toBeVisible();
  54  |   expect(headingText).not.toBe('');
  55  |   expect(metaDescription?.trim().length || 0).toBeGreaterThan(0);
  56  |   expect(mainText.length).toBeGreaterThan(0);
  57  |   expect(headings.every(text => text.trim().length > 0)).toBe(true);
  58  |   await expect(page.locator('html')).toHaveAttribute('lang', /^en/i);
  59  |   await expect(topicPage.header).toBeVisible();
  60  |   await expect(topicPage.main).toBeVisible();
  61  |   await expect(topicPage.footer).toBeVisible();
  62  |   if (pageData.title) expect(actualResult.title).toBe(pageData.title);
  63  |   const expectedHeading = pageData.headings.find(item => item.level === 'h1')?.text;
  64  |   if (!true && expectedHeading) expect(headingText).toBe(expectedHeading);
  65  |   expect(pageErrors, 'The page should not emit uncaught JavaScript errors').toEqual([]);
  66  | });
  67  | 
  68  | test('TC_EN_PAGE_0002 | Verify page images and alternative text: Homepage', async ({ page }, testInfo) => {
  69  |     testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EN_PAGE_0002\",\"scenario\":\"Verify images and alternative text: Homepage\",\"description\":\"Check image alternative text and whether images visible in the initial viewport load.\",\"preconditions\":\"The public page is reachable.\",\"steps\":[\"Navigate to https://infobeans.ai/\",\"Check that every image has an alt attribute\",\"Check that each image visible in the initial viewport has loaded\"],\"expectedResult\":\"Every image has an alt attribute (empty alt is permitted for decorative images), and visible images load successfully.\",\"pageUrl\":\"https://infobeans.ai/\"}" });
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
  103 | test('TC_EN_PAGE_0003 | Verify homepage internal navigation links: Homepage', async ({ page }, testInfo) => {
  104 |     testInfo.annotations.push({ type: 'test-case', description: "{\"testCaseId\":\"TC_EN_PAGE_0003\",\"scenario\":\"Verify homepage internal navigation links: Homepage\",\"description\":\"Check that the current homepage exposes internal links with valid destinations; homepage story and campaign links can change dynamically.\",\"preconditions\":\"The public page is reachable.\",\"steps\":[\"Navigate to https://infobeans.ai/\",\"Verify current internal links have destinations\"],\"expectedResult\":\"The homepage exposes at least one internal link and each internal link has a destination.\",\"pageUrl\":\"https://infobeans.ai/\"}" });
  105 |   const topicPage = new TopicPage(page, pageData);
  106 |   await topicPage.goto(pageData.url);
  107 |   let actualLinks;
  108 |   for (let attempt = 0; attempt < 3; attempt += 1) {
  109 |     try {
  110 |       actualLinks = await page.locator("a[href]")
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
  125 |   const internalLinks = actualLinks.filter(actual =>
  126 |     new URL(actual.url).origin === new URL(pageData.url).origin);
  127 |   const invalidLinks = internalLinks.filter(actual => !actual.href || !actual.href.trim());
  128 |   testInfo.annotations.push({
  129 |     type: 'actual-result',
  130 |     description: JSON.stringify({ internalLinkCount: internalLinks.length, invalidLinks }),
  131 |   });
> 132 |   expect(internalLinks.length).toBeGreaterThan(0);
      |                                ^ Error: expect(received).toBeGreaterThan(expected)
  133 |   expect(invalidLinks).toEqual([]);
  134 | });
  135 | 
```