# DESIGN-NOTES.md — “Chartered Precision”

## Type system

The preview commits to a three-family system:

- **Display:** Instrument Serif. High contrast, editorial, slightly severe. Used for the hero, pull-quotes, case titles and large metric values.
- **UI/body:** Inter Tight variable. 15–16px body copy, 1.6 line-height, 68ch maximum measure on long-form pages.
- **Metadata:** IBM Plex Mono. Reserved for eyebrows, section indexes, units, source lines and technical labels.

Fluid `clamp()` sizing takes the hero from roughly 56px to 132px and section headings from roughly 32px to 64px. Headlines are split by line and word, never character. Each word sits in an overflow wrapper and rises 110% into place with a short blur. Body copy only fades and rises 12px; it is never word-split.

## Colour

- Ink `#0C0F0E`, Paper `#F4F1EA`, Slate `#1A1F1D`.
- Signal lime `#C6F24E` is the primary accent, used on small highlights, counters, focus rings and one bento tile. It stays well below 5% of total surface area.
- Burnt amber `#B8712E` is reserved for `[VERIFY]` data and risk notes. Amber therefore means “check this”, not decoration.
- Ghost blue `#7D9BB5` is used for technical chrome and diagram lines.
- Hairlines are `rgba(255,255,255,.09)` on dark sections and `rgba(12,15,14,.14)` on paper.

There are no purple-blue gradient blobs, glass cards or 3D spheres. Text never uses a gradient. Drop shadows are not used; the only blur is on the sticky header and sub-nav.

## Grid

The desktop system is a 12-column, 1440px-max grid with 24px gutters and 96–156px section rhythm. Inner pages collapse to an 8-column rhythm on tablet and a single column at 390px. Persistent numbered section labels sit in the left rail above 1280px.

The grid is deliberately broken in five places:

1. The hero uses a full-bleed data-centre SVG that bleeds off both edges behind the type.
2. The problem quote outdents into the left margin across a 5/7 split.
3. The metric band pins a 5-column headline while a 7-column data grid scrolls beside it.
4. The two case stories alternate 5/7 and 7/5 image-text splits, with parallax only on the diagram column.
5. The closing CTA uses a 7/5 split with the form floating against the oversized statement.

## Motion

Motion is built with IntersectionObserver, CSS transitions and a small `requestAnimationFrame` scroll loop. Constants live in `script.js` under `MOTION`; CSS tokens mirror the same values.

- Word reveals: 0.55s, 0.045s stagger, capped so no element starts later than 240ms.
- Body reveals: 0.45s, 12px rise.
- Counters: 1.2s easeOutExpo, once only.
- Parallax: hero artwork `-12%`, grid overlay `-6%`, case diagrams `+8%`. Disabled on touch, below 768px and under reduced motion.
- The 100-day plan uses a sticky progress panel with active-step tracking.
- The industry rail uses native horizontal scroll, snap points, a progress bar, keyboard arrows and pointer dragging.
- Page changes use a 400ms ink wipe. No scroll-jacking and no auto-playing carousel.
- Magnetic buttons move a maximum of 4px. The custom cursor expands to 58px with a label only on case visuals and disappears on touch.
- `prefers-reduced-motion: reduce` shows all final states immediately, resets parallax transforms and removes transitions.

## Imagery

The site uses authored technical imagery instead of stock photography: a perspective data-centre corridor, asset-register diagram, rental process flow, animated ERP node graph, industry grid cards, and a dotted topographic CTA field. All are monochrome or ink/lime duotone. A 4.5% SVG noise layer sits over the whole page to remove the clean-stock signal. Client names are text-set wordmarks, not scraped logos.

## Patterns adapted, not copied

From the Awwwards SOTD register, the preview takes oversized line-split type, sticky scrollytelling, a horizontal case/industry rail, index numbering, hairline grids, a footer-as-statement CTA and a short page wipe. It avoids full-page WebGL, scroll-jacking and custom cursors on mobile.

From Mobbin-style B2B flows, it takes sticky sub-navigation with active tracking, an assurance/comparison table, form microcopy and error states, breadcrumbs, progress affordances and a full-screen mobile sheet. It avoids dashboard aesthetics on a marketing site.

## Responsive and RTL

At 390px, the header shrinks to 56px, hero type drops below 48px, all multi-column grids become one column, the rail becomes an 82vw swipe surface with dots, case diagrams shorten to 400px, and the footer stacks. There is no horizontal page overflow.

The language switch sets `lang="ar"` and `dir="rtl"`, mirrors the main grids, flips arrows and section rails, right-aligns form fields, and translates key interface labels. Latin body copy keeps natural reading direction via `unicode-bidi: plaintext`. Full Arabic content is a production task listed in `CONTENT-FLAGS.md`.
