import { useRef } from 'react'
import Seo from '../seo/Seo'
import { useScrollReveal } from '../useScrollReveal'
import Hero from '../sections/Hero'
import Banner from '../sections/Banner'
import Work from '../sections/Work'
import Services from '../sections/Services'
import Testimonials from '../sections/Testimonials'
import Certifications from '../sections/Certifications'
import Cta from '../sections/Cta'
import Faq from '../sections/Faq'
import Footer from '../sections/Footer'

export default function Home() {
  const mainRef = useRef<HTMLElement>(null)
  useScrollReveal(mainRef)

  return (
    <>
      <Seo
        title="Webflow Developer for Agencies & B2B | Benjamin Rahmanović"
        description="Webflow developer for agencies and B2B teams. Figma to Webflow builds, CMS, landing pages, SEO setup and ongoing maintenance."
        ogTitle="Benjamin Rahmanović – Webflow Developer for Agencies"
        ogDescription="Send me the Figma file and get back a fast Webflow site your team can edit. Builds, landing pages and maintenance."
        path="/"
      />
      <div id="top">
        <Hero />
        <main ref={mainRef}>
          <Banner />
          <Work />
          <Services />
          <Testimonials />
          <Certifications />
          <Cta />
          <Faq />
        </main>
        <Footer />
      </div>
    </>
  )
}
