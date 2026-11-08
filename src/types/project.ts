// One project (case study) page at /work/:slug. One template (src/pages/CaseStudy.tsx), one entry per project.
// Page content: src/data/cases.ts (copied from design-reference/case-study/CASES.json).
// SEO-only fields (meta description, JSON-LD): src/data/projects.ts.

/** "<lead><span>accent</span>": the accent is set in blue. */
export type CaseTitle = { lead: string; accent: string }

export type CaseImage = { src: string; alt: string }

/** One "How we built it" step. wide: a landscape image on beige. phone: a phone screenshot on the grid. */
export type CaseStep = {
  kind: 'wide' | 'phone'
  src: string
  /** Shown in the window's title bar. */
  fileName: string
  alt: string
  title: string
  text: string
}

/** Everything the case study page renders. */
export type CaseStudy = {
  slug: string
  /** Short name: "Level complete · <name>", "like <name>?". */
  name: string
  /** Small label above the h1. */
  eyebrow: string
  title: CaseTitle
  intro: string
  /** Primary hero button, opens in a new tab. */
  liveLink: { label: string; url: string }
  /** Rows of the "Project file" card. */
  projectFile: { label: string; value: string }[]
  tags: string[]
  showcase: {
    /** Title bar text: "<windowName> — desktop" / "— mobile". */
    windowName: string
    desktop: CaseImage
    /** Three phone screenshots for the Mobile tab. */
    mobile: CaseImage[]
  }
  how: { title: CaseTitle; intro: string; steps: CaseStep[] }
  /** "Next level" button. */
  next: { name: string; href: string }
}

/** Not shown on the page: meta description and JSON-LD only (src/seo/meta.ts, src/seo/jsonLd.ts). */
export type ProjectSeo = {
  summary: string
  client: string
  year: string
  image?: string
  partner?: { name: string; url: string }
}

export type Project = CaseStudy &
  ProjectSeo & {
    /** The live site (JSON-LD sameAs). Same as liveLink.url. */
    liveUrl: string
  }
