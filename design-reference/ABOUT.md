# About page round — rules for every agent

Same rules as `design-reference/AGENTS.md` (copy CSS and markup exactly, keep class names, plain CSS file next to each component, TypeScript, never invent facts, reuse real content from the current site for your own section only, one build at the end, no commits). The design is `design-reference/about.html`.

## Page structure (route `/about`)
1. **AboutHero**: the meadow hero (terrain, clouds, swaying grass, pixel dissolve), the nav, the white intro panel, the photo card with the "Also me, in pixels" badge, and the three number boxes on the grass.
2. **Experience**: "01 — Experience", the timeline.
3. **Education**: "02 — Education", three cards.
4. **WorkingWithMe**: "03 — Working with me", four cards with pixel icons.
5. **Toolkit**: "04 — Toolkit", chips in three groups.
6. **Contact**: the existing `src/components/home/Contact` component, reused as is.

## Who owns which files
| Agent | Owns |
|---|---|
| **1** | `src/pages/About.tsx`, the `/about` route, the page's head (title, description, OG), `src/styles/pages.css` (shared page classes: `.wrap`, `.sec`, `.h2` + `.h2 span`, `.stats`, `.stat`, `.ab-two`, `.ab-side`, `.ab-last`), mounting PixelCursor + PixelClickBurst if those exist, the `.pixel-page` wrapper |
| **2** | `src/components/about/AboutHero.tsx` + `.css`, and `Nav.tsx` / `Nav.css` (add the page variant, see below) |
| **3** | `src/components/about/Experience.tsx` + `.css`, `src/components/about/Education.tsx` + `.css`, `src/data/experience.ts`, `src/data/education.ts` |
| **4** | `src/components/about/WorkingWithMe.tsx` + `.css`, `src/components/about/Toolkit.tsx` + `.css`, `src/data/expectations.ts`, `src/data/toolkit.ts` |

Use the shared classes from `pages.css` (Agent 1) in your markup; don't redefine them.

## Nav on inner pages
On the home page the nav floats over the hero (position: absolute). On the About page it sits in the normal flow at the top of the hero. Agent 2 adds a `variant` prop to Nav: `"home"` (default, current behaviour) and `"page"` (static, in flow, same look), and marks the current page's link as active (`.links a.on` from the reference).

## Where things are in about.html
- Shared classes, Agent 1: the `.wrap`, `.sec`, `.h2` rules near the top, and `.stats` / `.stat` / `.ab-two` / `.ab-side` / `.ab-last` in the `about page` block.
- AboutHero, Agent 2: `.ab-hero`, `.ab-lead`, `.photo-card`, `.photo`, `.pixme`, and everything in the `about v2: meadow hero` block starting with `.ab-hw`, `.ab-bg`, `.ab-land`, `.ab-cloud`, `.ab-grass`, `.ab-dis`, `.ab-front`, `.ab-card`. Markup: `section.ab-hw`.
- Experience, Agent 3: `.tl` rules. Education: `.edu`, `.edu-card`, `.edu-ic`. Markup: the Experience and Education sections.
- WorkingWithMe, Agent 4: `.expect`, `.ex-card`, `.ex-ic`. Toolkit: `.tools`, `.chips`, `.chip`. Markup: the "Working with me" and "Toolkit" sections.
- Responsive rules: copy the lines for your own classes from the media blocks.

## Content to look for on the current site (your own section only)
- Agent 2: a real photo of the owner (check public/images and old About/hero components), the intro/bio text, years of experience. If you find a photo, use it in the photo card (4:5, object-fit: cover).
- Agent 3: work history and education (old About page, data files, CV-like content).
- Agent 4: tools and tech stack mentioned anywhere on the current site.
Anything not found stays as the `[placeholder]`.
