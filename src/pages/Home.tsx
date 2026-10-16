import Seo from '../seo/Seo'
import { GITHUB, JOB_TITLE, LINKEDIN, NAME, SITE_URL } from '../seo/site'
import Hero from '../sections/Hero'
import Banner from '../sections/Banner'
import Work from '../sections/Work'
import Services from '../sections/Services'
import Testimonials from '../sections/Testimonials'
import Cta from '../sections/Cta'
import Faq from '../sections/Faq'
import Footer from '../sections/Footer'

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: NAME,
      url: `${SITE_URL}/`,
      jobTitle: JOB_TITLE,
      image: `${SITE_URL}/images/benjamin.jpg`,
      knowsAbout: ['Webflow', 'Webflow development', 'Web design', 'Webflow CMS', 'Technical SEO'],
      sameAs: [GITHUB, LINKEDIN],
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

export default function Home() {
  return (
    <>
      <Seo
        title="Best Webflow Expert Developer for Your Website"
        description="Custom Webflow websites for companies that need more than a template: strategic design, flawless development and pages built to turn visitors into clients."
        path="/"
        jsonLd={JSON_LD}
      />
      <div id="top">
        <Hero />
        <main>
          <Banner />
          <Work />
          <Services />
          <Testimonials />
          <Cta />
          <Faq />
        </main>
        <Footer />
      </div>
    </>
  )
}
