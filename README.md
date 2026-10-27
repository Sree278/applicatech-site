# ApplicaTech — static editorial preview

A self-contained static website preview built from the supplied master brief. It uses plain HTML, CSS and JavaScript so it can be opened or served without a build step. The homepage is fully designed; the hub pages, case studies, articles, careers, contact and legal routes are previewable through in-page hash routing.

## Run it

Open `index.html` directly, or run a local server:

```bash
cd /home/user/aplicatech-preview
python3 -m http.server 4173 --bind 0.0.0.0
```

Then visit `http://localhost:4173/`.

No npm install, CDN, API key or external runtime library is required. Fonts are local WOFF2 files under `assets/fonts/`.

## File structure

```text
aplicatech-preview/
├── index.html              # Homepage shell, global nav/footer, JSON-LD
├── styles.css              # Design tokens, homepage and inner-page styles
├── content.js              # Editable copy, metrics, hubs, cases, articles, roles
├── script.js               # Routing, reveal motion, forms, rail, menus, counters
├── assets/fonts/           # Local Instrument Serif / Inter Tight / IBM Plex Mono
├── CONTENT-FLAGS.md        # Every claim that needs client verification
├── DESIGN-NOTES.md         # Type, colour, grid and motion decisions
├── robots.txt
└── sitemap.xml
```

## Routing

The preview uses hash routes so it works from `file://` and from a static server:

- `#/` — homepage
- `#/platforms`, `#/services`, `#/industries`, `#/work`, `#/about`, `#/insights`, `#/careers`, `#/contact`
- `#/work/<case-slug>` — six draft case studies
- `#/insights/<article-slug>` — three working papers
- `#/careers/<role-slug>` — six role templates
- `#/privacy`, `#/terms`, plus a 404 route

Child routes not listed in `content.js` as built pages render a labelled template stub. That is intentional: the navigation and page pattern are proven without pretending the copy is approved.

## Edit content

All page copy lives in `content.js`:

- `I18N` — English and Arabic interface strings.
- `METRICS` — homepage metric band. Each item has `{ value, prefix, suffix, label, source, verified }`.
- `TESTIMONIALS` — four paraphrased client quotes.
- `HUBS` — the eight main hub pages.
- `DETAILS` — built child pages.
- `CASES` — six draft case study narratives.
- `ARTICLES` — three full working papers.
- `ROLES` — careers pages.
- `LEGAL` — privacy and terms drafts.

If you add a number, add a source line and an entry to `CONTENT-FLAGS.md`.

## Connect the form

The form is deliberately honest in preview mode: it validates input but does not send anything. In `script.js`, set:

```js
const FORM_ENDPOINT = "https://your-crm-or-webhook.example/endpoint";
```

The form sends a JSON `POST` with `source`, `submittedAt`, `name`, `email` and `message`. Add server-side validation, rate limiting, spam checks and a privacy notice before launch. The client already includes a honeypot and a 30-second browser-side rate limit.

## Motion reference

Motion constants are centralised at the top of `script.js` in `MOTION`. CSS exposes the same timing in custom properties such as `--dur-reveal`, `--stagger` and `--ease`.

- Word reveal: 0.55s, stagger 0.045s, delay capped at 0.24s.
- Body reveal: 0.45s, 12px rise.
- Counter: 1.2s, easeOutExpo.
- Page wipe: 0.4s total.
- Hover: 0.22s.
- `prefers-reduced-motion: reduce` shows final states with no transforms or opacity animation.
- Parallax is limited to the hero artwork and case diagrams; it is disabled below 768px and on touch devices.

## Imagery

There are no downloaded stock photos or scraped client logos. The hero, case visuals, node diagram, industry cards and topographic field are authored SVG/CSS. Client names are text-set wordmarks. A 4.5% SVG grain overlay is applied globally.

## Arabic / RTL

The `EN / العربية` switch changes `lang`, `dir`, grid direction, arrow direction and key interface labels. Full Arabic translation of every hub, case, article and FAQ is not included in this static preview. A production build should use translated content files and locale-based URLs.

## What I would do next

1. Replace every `[VERIFY]` item using `CONTENT-FLAGS.md`, then remove the markers.
2. Add the remaining approved child pages and replace all labelled template stubs.
3. Supply real office photography, client logo files, leadership portraits and an approved credential register.
4. Move to Next.js 15 + TypeScript when the static design is signed off; convert hash routes to real paths.
5. Connect the form endpoint, calendar link, analytics events and a privacy-approved CRM pipeline.
6. A/B test the hero CTA: `Book a 30-min systems audit` versus `See the 100-day plan`.
7. Instrument analytics for nav mega-menu use, 100-day plan completion, rail interaction, case clicks, FAQ opens and form completion.
