# Project page round — rules for every agent

Same rules as `design-reference/AGENTS.md`: copy CSS and markup exactly, keep class names, plain CSS file next to each component, TypeScript, never invent facts, one build at the end, no commits. The design is `design-reference/case-study.html`.

## How the page works
One template for every project, at the route **`/work/:slug`**. The page reads the project from `src/data/projects.ts` by slug and passes it to each section as a `project` prop. The first real project is **Top One Trader** (slug `top-one-trader`), which already has an old case-study page and content in the repo: reuse that content, and keep the old page file (rename it to `...Legacy`, don't delete it).

## Shared type (identical file trick)
`src/types/project.ts` is owned by Agent 2. If you need it and it doesn't exist yet, create it with **exactly** this content:

```ts
export type MobileShot = { image?: string; title: string; caption: string };
export type Project = {
  slug: string;
  name: string;
  summary: string;
  client: string;
  year: string;
  role: string;
  tools: string;
  image?: string;
  imageAlt?: string;
  mobileShots: MobileShot[];
  challenge: string;
  goal: string;
  result: string;
  liveUrl?: string;
  nextSlug?: string;
};
```

## Who owns which files
| Agent | Owns |
|---|---|
| **2** | `src/types/project.ts`, `src/data/projects.ts`, `src/pages/CaseStudy.tsx` (page shell, `.pixel-page` wrapper, cursor mount like Home, head/meta from the project), the `/work/:slug` route, `src/components/case/CaseHero.tsx` + `.css` (meadow hero, Nav variant "page" with Work active, white panel with back link, facts row, and the lifted main screenshot) |
| **3** | `src/components/case/CaseMobile.tsx` + `.css` (01 — On mobile: three pixel phones), `src/components/case/CaseOverview.tsx` + `.css` (02 — Overview: challenge, goal, result) |
| **4** | `src/components/case/CaseProcess.tsx` + `.css` (03 — How it came together: the illustrated level map with the walking character and the vertical path on tablet/mobile), `src/components/case/CaseNext.tsx` + `.css` (the sunset wheat-field section with Visit live site and the Next project card) |
| **1** | busy with the cursor; later: the 404 page and cleanup |

Shared page classes (`.wrap`, `.sec`, `.h2`) already exist in `src/styles/pages.css` from the About round; use them. The page renders the existing home `Contact` component at the end.

## Order on the page
CaseHero → CaseMobile → CaseOverview → CaseProcess → CaseNext → Contact

## Content
- Top One Trader: name, summary, client, year, role, tools, the main screenshot (`/images/topone-trader.jpg` is already used on the home page), challenge, goal, result and live URL: take them from the old case-study page and its data. If the old page has more text than fits, shorten it without changing facts.
- Mobile shots: if the old page has mobile screenshots, use them; otherwise keep the placeholder phones.
- Anything not found stays as a `[placeholder]`.
- `nextSlug`: Top One Trader points to `project-2` (a placeholder entry); the Next project card shows that project's name and image placeholder.
