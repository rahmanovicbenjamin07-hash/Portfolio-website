# Case study pages: new template

Rebuild the `/work/:slug` case study page with the new template, for all three projects: `chairo`, `top-one-trader`, `wealthquest`.

## Files in this handoff (already unzipped into the repo root)
- `design-reference/case-study/chairo.html`, `top-one-trader.html`, `wealthquest.html`: static renders of the design. Copy the CSS values, spacing and markup structure from these files. They are the source of truth for the look.
- `design-reference/case-study/*-1440.png`, `chairo-768.png`, `chairo-390.png`, `chairo-390-mobile-tab.png`: screenshots at desktop, tablet and phone sizes. `chairo-390-mobile-tab.png` shows the showcase with the Mobile tab selected.
- `design-reference/case-study/CASES.json`: ALL text and image paths for the three pages. Use it exactly. Don't add or invent any text, numbers or placeholders.
- `public/images/work/<slug>/desktop.webp`, `mobile-1..3.webp`, and `chairo/mockup.webp`.
- `public/pixel/case/`: `cloud-1/2/3.png`, `bird.png` (2-frame sprite), `terrain-clean.png` (256×144 meadow), `grass.png` (4-frame sprite, 1024×30), `dissolve.png` (white pixel edge, 256×10). Same art as the Home "03 — How I work" section.

## Scope (strict file ownership)
- You may edit: the CaseStudy page, `src/components/case/*`, the project/case data in `src/data/*` and `src/types/project.ts`, plus one new stylesheet for the case page (e.g. `src/styles/case.css`).
- Reuse the site's existing Nav, Footer, button and pixel-border styles. Don't change Home, About, Privacy, Nav or Footer.
- Remove case-study components that become unused (old results, quests, chat and similar) from `src/components/case/` only.
- Verify the real file names first; the paths above are what I expect, not guaranteed.

## Page structure (top to bottom)

### 1. Hero + "How it looks" (one sky section)
- **Background:** `#C1EEF7`, with these absolutely positioned pixel layers (`image-rendering: pixelated`):
  - 3 clouds drifting left to right: `@keyframes pdrift{from{left:-220px}to{left:100%}}`, linear, infinite, at 90s, 120s and 70s, with negative delays.
  - 2 birds, flapping by `background-position` steps at .4s. Hide them at ≤1024px.
  - `terrain-clean.png` at the bottom: centred, `width:max(100%,1440px)`, `aspect-ratio:256/144`. At ≤720px use `width:max(100%,900px)`.
  - `grass.png` along the bottom: `aspect-ratio:256/30`, `background-size:400% 100%`, swaying through its 4 frames every 2.4s with `step-end`.
  - `dissolve.png` along the very bottom edge, so the meadow breaks into white pixels.
- **Nav:** the site Nav sits on the sky, with a transparent background.
- **Content, left column:**
  - "← All work" link to `/#work`
  - eyebrow (px-label style)
  - h1: `title.lead` + `<span>` with `title.accent` in #146EF5
  - intro in a white pixel box
  - buttons: primary `liveLink` (opens in a new tab), and secondary "How we built it" linking to `#how`
- **Content, right column:** "Project file" card. Each row has a dark green check box, a label and a value, with dashed separators. Tags go below the rows.
- **Showcase, below:**
  - label "How it looks"
  - h2 "On a laptop <span>and in your pocket.</span>"
  - a pixel segmented control **Desktop | Mobile**: `role="tablist"`, buttons with `aria-selected`, keyboard accessible. Desktop is the default.
  - a window with a title bar (3 dots, plus "`windowName` — desktop" or "— mobile"). Desktop mode shows `desktop.webp` at 16:10, `object-fit:cover`, top-aligned. Mobile mode shows a light grid background with the 3 phones side by side (dark bezel, radius 40, 8px padding) and the grass strip at the bottom.
  - At ≤720px, the window body uses natural height, and the three phones take a third of the width each.

### 2. How we built it (`id="how"`, white)
- Header row: label "How we built it", h2 from `how.title`, intro `how.intro`.
- **Desktop (≥1025px):** two columns.
  - **Left: a sticky window** (`position:sticky; top:96px`) showing the active step's image, with the step's `fileName` in the title bar.
    - `kind:"wide"`: the image is contained on #ECE8DF with padding.
    - `kind:"phone"`: the phone sits on the grid background with grass at the bottom, top 40px, width 250px, cropped by a 4:3 stage.
    - Under the window: "Step n / N", plus N progress bars filled yellow (#E8C547) up to the active step.
    - The image swap uses a short pop animation (`steps(3)`).
  - **Right: the step articles.**
    - Each has: pixel number badge "01…", an h3, and a paragraph.
    - Each is `min-height ~60vh`, with dashed separators between them.
    - Inactive steps have `opacity:.38`. The active step has `opacity:1` and a dark badge with yellow text.
  - **Choosing the active step:** use an IntersectionObserver on the **page scroll**, with `rootMargin:'-45% 0px -45% 0px'`. The canvas preview used an inner scroll box; don't copy that. Clicking a step also activates it.
- **≤1024px:** no sticky column. Each step shows its own image window above its text, and all steps are fully opaque.

### 3. Level complete (sky section again)
- **Background:** the same sky layers as the hero. Use `dissolve.png` flipped on the top edge, and no bottom dissolve, so the grass meets the footer.
- **Centred pixel card:**
  - badge "★ Level complete · {name}"
  - 3 pixel stars popping in one after another
  - h2 "Want something <span>like {name}?</span>"
  - buttons: primary "Let's talk →" using `site.letsTalkUrl`, and secondary "Next level: {next.name} →" linking to `next.href`
  - email `rahmanovicbenjamin07@gmail.com` as a mailto link
- At ≤720px the buttons stack at full width.

### 4. Footer
The existing site footer.

## Rules
- **Breakpoints:** 1024px and 720px. Match the reference PNGs.
- **Reduced motion** (`prefers-reduced-motion: reduce`): no drift, flap, sway or pop animations.
- **Alt text:** all images use the `alt` from CASES.json. Decorative pixel layers get `aria-hidden`.
- **Data:** keep the page data-driven (one template, three entries), so a new project only needs a new entry.
- **Finish:**
  - Run the build once and fix any errors.
  - **Don't commit.**
  - At the end, list the files you changed, added and removed.
