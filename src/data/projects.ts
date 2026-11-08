import type { Project, ProjectSeo } from '../types/project'
import { CASES } from './cases'

// Project (case study) pages, one template at /work/:slug (src/pages/CaseStudy.tsx); src/routes.ts prerenders one
// route per entry. Array order is the order everywhere; Nav's "Work" link opens the first one.
// Page content comes from src/data/cases.ts. The fields below aren't shown on the page: they feed the meta
// description fallback (src/seo/meta.ts) and the JSON-LD (src/seo/jsonLd.ts).

const SEO: Record<string, ProjectSeo> = {
  chairo: {
    summary:
      'Booking app for barbershops on iOS and Android. Clients book a cut in three taps, barbers stop running their week from DMs.',
    client: 'Own product',
    year: '2026',
    image: '/images/work/chairo/mockup.webp',
    partner: { name: 'Amer Talo', url: 'https://amertalo.com/' },
  },
  'top-one-trader': {
    summary: 'The main site of a prop trading firm that funds traders on its own capital.',
    client: 'Top One Trader',
    year: '2026',
    image: '/images/work/top-one-trader/mockup.webp',
  },
  wealthquest: {
    summary: "Pixel-perfect Webflow build of a membership club's site, from Figma, with custom-coded animations.",
    client: 'WealthQuest',
    year: '2026',
    image: '/images/work/wealthquest/mockup.webp',
  },
}

export const PROJECTS: Project[] = CASES.map((c) => {
  const seo = SEO[c.slug]
  if (!seo) throw new Error(`src/data/projects.ts: no SEO entry for "${c.slug}"`)
  return { ...c, ...seo, liveUrl: c.liveLink.url }
})

export function getProject(slug: string | undefined): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}
