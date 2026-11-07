# Content still to fill in

Everything in `[square brackets]` on the live site is a placeholder. Replace the text in the file and line listed, then run `npm run build`. Line numbers are from 7 Nov 2026 and may shift a little after edits.

Images go in `public/images/…`. Whenever you add a project image, also add its size (width × height in pixels) to `src/data/imageSizes.ts`. That stops the page from jumping while the image loads.

## 1. Top One Trader: result (project page `/work/top-one-trader`)
- [ ] **The result**: `src/data/projects.ts:53`. 2–3 sentences on what changed after launch. Real numbers are best (conversion, speed, time saved on edits). The old case study doesn't give an outcome, so this is empty.

## 2. Project 2 (home page card + `/work/project-2`)
The home card and the project page come from two files, so fill in both.

- [ ] **Name**:
  - `src/data/work.ts:34` (home card)
  - `src/data/projects.ts:18` (project page)
- [ ] **Page address**: when the project has a real name, change the slug in `src/data/projects.ts` (e.g. `project-2` → `client-name`) and the card's `href` in `src/data/work.ts:35` to match.
- [ ] **Main screenshot**, about 1600 × 1000:
  - Home card: replace `placeholder` with `image: { src, alt, width, height }` in `src/data/work.ts:36`. Copy the Top One Trader entry above it.
  - Project page: add `image` and `imageAlt` to the project in `src/data/projects.ts`.
- [ ] **One-line summary**: `src/data/projects.ts:19`
- [ ] **Client**: `src/data/projects.ts:20`
- [ ] **Year**: `src/data/projects.ts:21`
- [ ] **Your role** (e.g. Design · Webflow): `src/data/projects.ts:22`
- [ ] **Tools** (e.g. Figma, Webflow): `src/data/projects.ts:23`
- [ ] **The challenge** (2–3 sentences): `src/data/projects.ts:25`
- [ ] **The goal** (2–3 sentences): `src/data/projects.ts:26`
- [ ] **The result** (2–3 sentences): `src/data/projects.ts:27`
- [ ] **3 mobile screenshots** (390 × 844 crops: hero, a key section, menu or footer), each with a short title and a one-line caption: `src/data/projects.ts:10–12`. To give one project its own shots, replace `mobileShots: PLACEHOLDER_SHOTS` with its own list, like Top One Trader at lines 43–48.
- [ ] **Live site link** (optional): add `liveUrl` to the project. The "Visit live site" button only shows when it's set.

Projects 2 and 3 currently share the `placeholder()` function at `src/data/projects.ts:15–30`. Once one is real, write it out as a full entry like Top One Trader.

## 3. Project 3 (home page card + `/work/project-3`)
- [ ] Same list as Project 2, with the home card at `src/data/work.ts:39–41`.

## 4. Contact
- [ ] **City**: `src/data/site.ts:7` (`[City]`). Nothing shows it yet, so it isn't visible on the site, but fill it in for later.
- Email is done: `rahmanovicbenjamin07@gmail.com` (`src/data/site.ts:6`).
- Calendly, LinkedIn, GitHub and Upwork are done: `src/seo/site.ts`.

## 5. About page (`/about`): not built yet
The nav, the hero's "About me" button and the footer all link to `/about`. Until the page exists, that link shows the 404 page. When the about-kit (`ABOUT.md` + `about.html`) is added, it will need:

- [ ] **Photo** of you
- [ ] **Numbers** (e.g. years of experience, sites launched)
- [ ] **Experience**: each job or freelance period with role, company or client, start and end dates and one line on what you did. Nothing like this exists on the site yet.
- [ ] **Education**: school, degree, years. Nothing on the site yet. Your two Webflow certifications already exist in `src/data/certifications.ts`:
  - The Webflow Way: passed Oct 2026
  - Webflow Visual Developer: expected 2026

## Already real (nothing to do)
- **Testimonials:** 4 real reviews in `src/data/testimonials.ts`, so the `[Client name]` cards in `src/components/home/Testimonials.tsx:47–49` don't show. They only appear if fewer than 3 reviews are left.
- **Top One Trader:** name, summary, client, year, role, tools, screenshot, mobile screenshots, challenge, goal and live link.
