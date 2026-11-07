import Seo from '../seo/Seo'
import { ABOUT_META } from '../seo/meta'
import AboutHero from '../components/about/AboutHero'
import Experience from '../components/about/Experience'
import Education from '../components/about/Education'
import WorkingWithMe from '../components/about/WorkingWithMe'
import Toolkit from '../components/about/Toolkit'
import Contact from '../components/home/Contact'
import PixelCursor from '../components/pixel/PixelCursor'
import '../styles/pages.css'

// About page at /about, built from design-reference/about.html. .pixel-page scopes the global pixel styles,
// as on Home and the project pages. Person JSON-LD for this route: ABOUT_JSON_LD (src/seo/jsonLd.ts, via routes.ts).
export default function About() {
  return (
    <div className="pixel-page">
      {/* Title and description live in src/seo/meta.ts. */}
      <Seo {...ABOUT_META} path="/about" />
      <AboutHero />
      <Experience />
      <Education />
      <WorkingWithMe />
      <Toolkit />
      <Contact />
      <PixelCursor />
    </div>
  )
}
