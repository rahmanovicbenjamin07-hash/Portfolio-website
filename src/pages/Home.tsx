import Seo from '../seo/Seo'
import { HOME_META } from '../seo/meta'
import Hero from '../components/home/Hero'
import Work from '../components/home/Work'
import Services from '../components/home/Services'
import Process from '../components/home/Process'
import Testimonials from '../components/home/Testimonials'
import Contact from '../components/home/Contact'
import PixelCursor from '../components/pixel/PixelCursor'

// Pixel redesign home page. The previous home page is kept in ./HomeLegacy.tsx (not routed).
// .pixel-page scopes the global pixel styles (src/styles/pixel.css) to this page.
export default function Home() {
  return (
    <div className="pixel-page">
      {/* Title and description live in src/seo/meta.ts. */}
      <Seo {...HOME_META} path="/" />
      <Hero />
      <Work />
      <Services />
      <Process />
      <Testimonials />
      <Contact />
      <PixelCursor />
    </div>
  )
}
