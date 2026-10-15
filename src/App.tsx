import Hero from './sections/Hero'
import Banner from './sections/Banner'
import Work from './sections/Work'
import Services from './sections/Services'
import Testimonials from './sections/Testimonials'
import Cta from './sections/Cta'
import Faq from './sections/Faq'
import Footer from './sections/Footer'

export default function App() {
  return (
    <div id="top">
      <Hero />
      <Banner />
      <Work />
      <Services />
      <Testimonials />
      <Cta />
      <Faq />
      <Footer />
    </div>
  )
}
