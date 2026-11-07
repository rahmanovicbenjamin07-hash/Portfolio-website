# Pixel redesign — rules for every agent

We are rebuilding the **home page** of this existing React portfolio from an approved design.
Four agents work **at the same time** in this repo. Read this whole file before writing code.

## What you have
- `design-reference/home.html` — the approved home page (all markup + all CSS + animation logic). It is a design-tool export, not a runnable page. Read the comment at its top for how to translate its syntax to React. **Copy the CSS rules and markup as they are** — the design is final. Do not redesign, rename classes, or "improve" spacing.
- `public/pixel/*` — every image the page uses, referenced as `/pixel/<file>`. Keep `image-rendering: pixelated` wherever the reference uses it.

## How to build
1. Spend at most a few minutes checking the repo: framework (Vite / CRA / Next), router, JS or TS. Follow its conventions (use `.tsx` if the repo is TypeScript).
2. Each section is one component in `src/components/home/` with its **own plain CSS file next to it** (e.g. `Hero.jsx` + `Hero.css`), even if the repo uses another styling method. Do not convert the CSS to Tailwind or CSS-in-JS.
3. Keep the exact class names from the reference. Each section's classes are already unique.
4. Animation timers from the reference `<script>` become React hooks (`useEffect` + `setInterval`, cleared on unmount). Respect `prefers-reduced-motion` exactly as the reference does.
5. Text in `[brackets]` is placeholder content — keep it as it is.
6. Ignore anything only meant for the design canvas: the `$preview` data, `min-height: 100vh` + `display:flex` on the root wrapper, `.p-sky{flex:1 0 auto}`.

## Who owns which files (never edit a file you don't own)

| Agent | Owns |
|---|---|
| **1** | `src/styles/pixel.css` (global), `src/pages/Home.jsx`, the `/` route, `index.html` fonts and meta, `src/components/home/Contact.jsx` + `Contact.css`, `src/components/pixel/PixelArrow.jsx`, `src/data/site.js` |
| **2** | `src/components/home/Hero.jsx` + `Hero.css`, `src/components/home/Nav.jsx` + `Nav.css` |
| **3** | `src/components/home/Work.jsx` + `Work.css`, `src/components/home/Services.jsx` + `Services.css` |
| **4** | `src/components/home/Process.jsx` + `Process.css`, `src/components/home/Testimonials.jsx` + `Testimonials.css` |

If you need something from another agent's file, don't touch it. Leave a `// TODO(agent N): ...` comment in your own file and move on.

## Global CSS (Agent 1 puts these in `src/styles/pixel.css` — nobody else defines them)
From the reference: `body`, `a` / `a:hover`, `.px-label` + `.px-label i`, the whole `.btn` family (`.btn`, `:hover`, `:active`, `:focus-visible`, `svg`, `.btn-primary`, `.btn-dark`, `.btn-sm`), `.pxbox`, `.px`. Plus the Google Fonts link (Inter, Inter Tight, JetBrains Mono, Pixelify Sans) in `index.html`.
Everyone else just **uses** these class names in JSX (`<a className="btn btn-primary">`).

## Where each section lives in `design-reference/home.html`
CSS (inside `<helmet><style>`), by the `/* ---------- ... ---------- */` comments:

- **Hero (Agent 2):** `hero frame`, `live task feed`, and `copy + nav` (minus the `.btn` rules). Markup: `<section class="hero">`, including the `<header class="nav">` inside it.
- **Work (Agent 3):** `work section`. Markup: `<section id="work">`.
- **Services (Agent 3):** `services section` + its `@media (max-width:860px)` line. Markup: `<section id="services">` (it uses inline styles; keep them).
- **Process (Agent 4):** `process section` + `sky band` (minus `.pxbox` and `.px`). Markup: `<section id="process">`.
- **Testimonials (Agent 4):** `testimonials section`. Markup: `<section id="testimonials">`.
- **Contact + footer (Agent 1):** `contact + footer`. Markup: `<section id="contact">` + `<footer class="cd-banner">`.

**Responsive rules:** the `@media (max-width:1024px)`, `@media (max-width:760px)` and the last `prefers-reduced-motion` block near the end of the CSS mix rules for several sections. Copy only the lines whose selectors belong to your section into your own CSS file.

**Animation logic** (the `<script type="text/x-dc">` at the very bottom):
- `tick` timer, 2800 ms → `rows` / `phase` = the "Now working on" task feed → **Agent 2**
- `count` timer, 1500 ms → `lines`, `caption`, `show_*`, `dots` = the process dialog + live screen → **Agent 4**
- `ach` timer, 1200 ms → `achShown`, `segs`, `items` = testimonials achievements → **Agent 4**

## Shared tiny component
`src/components/pixel/PixelArrow.jsx` is owned by Agent 1. If you import it and it doesn't exist yet, create it with **exactly** this content (identical code, so it can't conflict):

```jsx
const ROWS = ["....X...", "....XX..", "XXXXXXX.", "XXXXXXXX", "XXXXXXX.", "....XX..", "....X..."];
export default function PixelArrow({ color = "currentColor", className = "" }) {
  return (
    <svg className={className} viewBox="0 0 8 7" shapeRendering="crispEdges" fill={color} aria-hidden="true">
      {ROWS.flatMap((row, y) => [...row].map((c, x) => (c === "X" ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" /> : null)))}
    </svg>
  );
}
```

## Shared site data
`src/data/site.js` is owned by Agent 1. Same rule as PixelArrow: if you need it and it doesn't exist yet, create it with **exactly** this content:

```js
const site = {
  name: "[Your Name]",
  email: "[your@email.com]",
  city: "[City]",
  letsTalkUrl: "#contact", // replace with your Upwork / Calendly / Google Meet link
  socials: { linkedin: "#linkedin", github: "#github", dribbble: "#dribbble", webflow: "#webflow" },
};
export default site;
```

## Testing — keep it short
- No test suites, no screenshot loops, no visual-diff tools.
- When your task is done, run the production build **once** (`npm run build` or the repo's equivalent) and fix errors **in your own files only**. Errors from another agent's missing file are expected while others are still working; ignore those.
- **Do not commit or push.** The owner commits.

## Round 2 (only when the owner sends the x.2 prompts)
- **Agent 1:** make sure `Home.jsx` renders all six sections in order (Hero, Work, Services, Process, Testimonials, Contact), add the page title, meta description and Open Graph tags, and use `src/data/site.js` in Contact. One final build after the other agents are done.
- **Agent 2:** use `src/data/site.js` in Nav (name + Let's talk link). Hero polish: preload `/pixel/hero-bg.png`, pause animations when the hero is off screen (IntersectionObserver), and check the 1024 px and 760 px rules. Move the task list into `src/data/hero.js`.
- **Agent 3:** move Work and Services content into `src/data/work.js` and `src/data/services.js`. Check the 760 / 860 px rules.
- **Agent 4:** move Process lines and testimonials into `src/data/process.js` and `src/data/testimonials.js`. Pause the timers when each section is off screen.
