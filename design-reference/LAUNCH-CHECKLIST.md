# Launch checklist: content still needed

Audited 2026-11-07 from the built pages (`dist/`) and the source. Sizes are measured in the browser at 1440 px and 390 px wide.
Most important items are first in each group: ⬆ = visible above the fold.

## Blocking (affects every page)

- [x] **Apple touch icon:** `public/apple-touch-icon.png` (180 × 180, the BR monogram centred on its navy), linked in `index.html`. Done 2026-11-07. To use a different mark, replace the file under a new name and update the link.
- [ ] *(Optional)* **Share image.** `public/images/open-graph-1200x630.png` (1200 × 630) is a cover crop of the old-design BR monogram. If you want a share card in the new pixel style, make a 1200 × 630 PNG and update `OG_IMAGE` in [src/seo/site.ts:13](../src/seo/site.ts#L13). Use a new file name, because `/images` is cached for a year.

## `/` home

Nothing needed. Everything on `/` is real: the testimonials (Ryan Stevens, Mohamed ElQadi, Hasan A.), your email, and the LinkedIn, GitHub, Upwork and Calendly links.

## `/work/top-one-trader`

### Text
- [ ] **02 — Overview → "The result":** `[2–3 sentences: what changed after launch, in plain words.]` ([projects.ts:53](../src/data/projects.ts#L53)). The old case study gave no outcome (the split test never named a winner), so this needs your real result: what changed after the work went live.
- [ ] *(Review)* **01 — On mobile captions** ([projects.ts:44–47](../src/data/projects.ts#L44)): "The home page hero on mobile.", "The X-DAILY offer on mobile.", "The account pricing table on mobile." These were written from the old page's alt text. Replace them with one line each about how the layout adapts, if you want something stronger.

Real and in place: the hero screenshot, the three mobile screenshots, client, year, role, tools, challenge, goal and the live URL.

## `/404`

Nothing needed. All text is final, and the page is `noindex`.
