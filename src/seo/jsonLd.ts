import type { Project } from '../types/project'
import { GITHUB, JOB_TITLE, LINKEDIN, NAME, OG_IMAGE, SITE_URL, UPWORK } from './site'

// Structured data (schema.org JSON-LD). Attached to a route in routes.ts; scripts/prerender.mjs writes it
// into that page's <head> (it isn't rendered by React, so hydration never sees it).

const PERSON_ID = `${SITE_URL}/#person`

const PERSON = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: NAME,
  url: `${SITE_URL}/`,
  jobTitle: JOB_TITLE,
  worksFor: { '@type': 'Organization', name: 'MWEV Group' },
  address: { '@type': 'PostalAddress', addressLocality: 'Tešanj', addressCountry: 'BA' },
  image: OG_IMAGE.url,
  knowsAbout: ['Web design', 'Webflow', 'React', 'Figma to Webflow', 'Webflow CMS', 'Landing pages', 'Technical SEO', 'Website maintenance'],
  sameAs: [LINKEDIN, GITHUB, UPWORK],
}

export const HOME_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    PERSON,
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: NAME,
      inLanguage: 'en',
      publisher: { '@id': PERSON_ID },
    },
  ],
}

// The /about route: the Person, on a ProfilePage about them.
export const ABOUT_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    PERSON,
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}/about#page`,
      url: `${SITE_URL}/about`,
      name: `About ${NAME}`,
      inLanguage: 'en',
      mainEntity: { '@id': PERSON_ID },
    },
  ],
}

// A case study page: the project as a CreativeWork made by the Person. Only real facts from src/data/projects.ts.
export function caseStudyJsonLd(project: Project) {
  const url = `${SITE_URL}/work/${project.slug}`
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${url}#work`,
    url,
    mainEntityOfPage: url,
    name: project.name,
    description: project.summary,
    ...(project.image ? { image: SITE_URL + project.image } : {}),
    dateCreated: project.year,
    inLanguage: 'en',
    creator: { '@type': 'Person', '@id': PERSON_ID, name: NAME, url: `${SITE_URL}/` },
    ...(project.client ? { sourceOrganization: { '@type': 'Organization', name: project.client } } : {}),
    // Who it was made with (project.partner)
    ...(project.partner ? { contributor: { '@type': 'Person', name: project.partner.name, url: project.partner.url } } : {}),
    // The live site the case study is about
    ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
  }
}
