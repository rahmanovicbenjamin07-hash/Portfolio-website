# Benjamin Rahmanović — portfolio website

Build this site so it matches the design **pixel for pixel**, with all animations.
Hosting: Cloudflare Pages (static build, custom domain).

## The design (source of truth)
- `design/reference.html` — the full page, open it in a browser. This is what the site must look like at 1440 px wide.
- `design/source.dc.html` — the same page as source. Copy exact values from here: sizes, spacing, colors, fonts, keyframes, timings, and the interaction logic in the `<script>` at the bottom (`renderVals()`).
- If the reference and your build differ, the reference wins. Never "improve" the design on your own.

## Stack
- Vite + React + TypeScript, static output to `dist/`.
- Styling: CSS Modules (one `.module.css` per section) plus a global `tokens.css`. No UI kit.
- Animation: CSS keyframes for loops (marquees, hero rows, float, stars/waves); GSAP + ScrollTrigger for scroll reveals; Lenis for smooth scroll.
- Fonts self-hosted with Fontsource: Plus Jakarta Sans (site-wide), Newsreader + Instrument Sans (Selected work section only).
- Assets live in `public/images` and `public/video`. Use them as-is.

## Design rules (do not break)
- Colors: background `#0B0B0C`, surface `#141416`, surface 2 `#1C1C1F`, text `#F2F2F0`, muted text `rgba(255,255,255,0.62)`, borders `rgba(255,255,255,0.08–0.14)`, accent `#1E3BF0`, CTA blue `#2F5BFF`.
- Corners: 8 px max on cards, images, inputs and filters (smaller for tags). Only the hero/CTA buttons are full pills, exactly as in the reference.
- No box shadows. No decorative gradients. Allowed: the dark text-legibility fades and the CTA horizon glow that are already in the reference.
- Respect `prefers-reduced-motion`: stop all loops and reveals.
- Every section must also work at 390 px wide (phone). Follow the media queries in the source.

## Sections, in order
1. **Hero** — tilted 3D wall of project screenshots: 5 rows scrolling sideways, alternating left/right (110 s loop). Glass nav pills, badge, headline with Webflow logo and blue check icon, two buttons, bottom row.
2. **Banner** — two straight marquee bands (black large text, blue small text, opposite directions).
3. **Selected work** — accordion of 3 projects (Top One Launchpad, Veracious, WealthVentures). Open panel shows the screenshot; closed panels are narrow strips with vertical name + number. Click to open (width animates 0.9 s). Big italic "02”" number bottom-left, faint "Selected work" text behind, prev/next peeks at the edges, description row below that changes with the active project.
4. **Services** — "pinwheel" grid (6 cols × 4 rows): wide card top-left, tall video card right (`animation-demo.mp4`, autoplay muted loop), tall CMS card left (`cms-demo.jpg`), photo in the middle, wide SEO card bottom-right with check rings.
5. **Testimonials** — "RESULTS SPEAK LOUDER" on the left, one review card on the right with dots + arrows (3 reviews).
6. **CTA** — rounded box, huge blue "Let's build it", floating `</>` icon, blue horizon, white "Book a 15-min call" button.
7. **FAQ** — accordion, one open at a time.
8. **Footer** — links + giant scrolling "BENJAMIN RAHMANOVIĆ" marquee.

## How to work
1. Set up the project, tokens, fonts and assets first.
2. Build **one section at a time**, top to bottom. Static layout first, animation after.
3. After each section, use Playwright to screenshot your page and `design/reference.html` at 1440 × 900 and 390 × 844, compare them side by side, and fix every difference before moving on.
4. Keep components small: `src/sections/Hero.tsx`, `Banner.tsx`, `Work.tsx`, `Services.tsx`, `Testimonials.tsx`, `Cta.tsx`, `Faq.tsx`, `Footer.tsx`.

## Placeholders still to fill
Text in `[square brackets]` is a placeholder (reviews, years, roles, email, social links, month). Keep it visible until Benjamin provides the real text — never invent it.

## Deploy (Cloudflare Pages)
- Build command: `npm run build` — output directory: `dist`.
- Add `public/_headers` with long cache for `/images/*` and `/video/*`.
