# Human-led Concept 06 / QA
31 October 2026

Chromium via Playwright; axe-core tagged WCAG 2 A/AA and 2.1 AA.

- All three pages at 1440px and 390px: zero detected tagged violations after surface-specific contrast fixes.
- No JavaScript page errors or horizontal overflow in these runs.
- Four scenario selections work; keyboard End selects the final scenario.
- Each detail page has one h1.
- The opening is static: no pinned scroll sequence or opacity-faded primary information.

During implementation, inherited light-on-dark text styles were identified on the newly pale surfaces. Active navigation, table cells/captions, list items, current process labels and service/template annotations were corrected before handoff.

Automated checking is not full accessibility conformance. Stock rights/usage checks, actual buyer validation, broader browser/assistive-tech and real-device reviews remain outstanding. The form still prepares an email draft and does not submit to a backend. No publication is claimed for this local concept.

## Additional final checks
- All three pages at 320px, 768px and 1024px: no horizontal overflow; all photographs decoded successfully (lazy-loaded images explicitly activated for this check); footer is the final visible content.
- Mobile menu and expanded implementation row: zero detected tagged violations, with normal and reduced motion.
- Escape closes menu and returns focus to trigger.
- Implementation → customer-story cross-page links work with normal and reduced motion.
- Forced WebGL failure: scenario fallback visible and selected rental-panel content remains usable at 320px.

The motion control now lives beside the optional scenario explorer. Photographic content is static and captions are preserved in the standalone preview. No new backend or publication was performed.
