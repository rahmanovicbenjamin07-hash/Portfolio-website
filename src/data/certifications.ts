export type Certification = {
  status: 'passed' | 'progress'
  eyebrow: string
  title: string
  description: string
  footerLeft: string
  link?: { text: string; href: string; label: string }
  footerRight?: string
}

export const CERTIFICATIONS: Certification[] = [
  {
    status: 'passed',
    eyebrow: 'Webflow · Knowledge exam',
    title: 'The Webflow Way',
    description: "Webflow's best practices for design systems, CMS, localization, SEO and collaboration.",
    footerLeft: 'Passed · Oct 2026 · ID 197411815',
    link: {
      text: 'View badge',
      href: 'https://www.credential.net/7faed53d-bd3b-415f-a454-3784d04776ae',
      label: 'View The Webflow Way badge (opens in new tab)',
    },
  },
  {
    status: 'progress',
    eyebrow: 'Webflow · Official certification',
    title: 'Webflow Visual Developer',
    description: 'Proctored exam for building scalable, production-ready Webflow sites.',
    footerLeft: 'Expected · 2026',
    footerRight: 'Valid for 2 years',
  },
]
