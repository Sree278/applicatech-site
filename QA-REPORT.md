# Advanced prototype / QA record
31 October 2026

## Tested
Chromium via Playwright, software WebGL. Automated axe-core checks tagged WCAG 2 A/AA and 2.1 AA.

- Home, implementation page and case-study template at 1440px and 390px: zero detected tagged violations on final recheck.
- 390px reduced-motion home/scenario state: zero detected tagged violations.
- Scenario selection: all four panels work; exactly one selected panel; End key selects final scenario.
- Menu Escape returns focus to trigger.
- Implementation link navigates to the real implementation page; customer-template link navigates to the real template page, with and without reduced motion.
- No JavaScript page errors in the tested runs.
- No horizontal page overflow at the tested desktop/mobile widths; 320px WebGL-fallback layout also checked.
- WebGL-disabled fallback remains visible and scenario controls still work.
- All three pages have one h1, unique IDs, valid local asset references and cross-page anchor targets.

## Issues found and fixed
- A link style reused on the dark implementation page initially failed contrast. It now has a context-appropriate light text colour.
- Explorer canvas sizing initially did not track its content-sized container reliably. A ResizeObserver now updates rendering dimensions.

## Important limitations
Automated checks are not complete accessibility certification. A pause control and coarse hardware adaptation exist, but no production performance target or real mobile battery/GPU result is claimed. Cross-document transition support varies by browser; ordinary navigation is the intended fallback.

No target-customer testing, commercial validation, approved customer story, production backend, CMS build, legal review, SEO migration, analytics or comprehensive security audit has been completed.

## Visual refinement recheck
After adding conceptual imagery and revising page compositions:
- All runtime images loaded on the three pages at 1440px and 390px.
- No horizontal overflow on those pages/viewports.
- Home/scenario, implementation and case-template audits returned zero detected tagged A/AA violations at both widths.
- Scenario selection and keyboard End behaviour still functioned, with no page JavaScript errors in the audit runs.
- Image sizing was corrected to respect responsive aspect ratios rather than fixed HTML height attributes.

Automated contrast tools do not fully evaluate text over imagery. Desktop hero image masking and headline wrapping were adjusted separately to keep the primary text away from bright artwork.

## Footer cleanup
Removed the design-direction dialog and its footer trigger from all three pages, including their JavaScript bindings. The single-file detail-page preview layer is positioned before the main content, not after the footer. Closed dialogs are explicitly hidden. Design rationale remains in the separate documentation.
