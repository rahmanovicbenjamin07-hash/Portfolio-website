import { JOB_TITLE, LINKEDIN, NAME, OG_IMAGE, SITE_URL, UPWORK } from './site'

// Structured data (schema.org JSON-LD). Attached to a route in routes.ts; scripts/prerender.mjs writes it
// into that page's <head> (it isn't rendered by React, so hydration never sees it).
export const HOME_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: NAME,
      url: `${SITE_URL}/`,
      jobTitle: JOB_TITLE,
      image: OG_IMAGE.url,
      knowsAbout: ['Webflow', 'Figma to Webflow', 'Webflow CMS', 'Landing pages', 'Technical SEO', 'Website maintenance'],
      // The profiles linked in the footer
      sameAs: [LINKEDIN, UPWORK],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: NAME,
      inLanguage: 'en',
      publisher: { '@id': `${SITE_URL}/#person` },
    },
  ],
}
