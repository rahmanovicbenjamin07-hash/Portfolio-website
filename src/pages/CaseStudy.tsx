import Seo from '../seo/Seo'
import { NAME } from '../seo/site'
import { getProject } from '../data/projects'
import Nav from '../components/home/Nav'
import Footer from '../components/home/Footer'
import CaseHero from '../components/case/CaseHero'
import CaseHow from '../components/case/CaseHow'
import CaseLevel from '../components/case/CaseLevel'
import PixelCursor from '../components/pixel/PixelCursor'
import NotFound from './NotFound'
import '../styles/case.css'

// Project page template at /work/:slug, built from design-reference/case-study/ (CASE-STUDY.md, *.html, *.png).
// src/routes.ts registers (and prerenders) one route per entry in src/data/projects.ts; an unknown slug renders
// the 404 page. All content comes from src/data/cases.ts. .pixel-page scopes the global pixel styles, as on Home.
export default function CaseStudy({ slug }: { slug: string }) {
  const project = getProject(slug)
  if (!project) return <NotFound />

  return (
    <div className="pixel-page cs">
      {/* "<Name> · Case study · <NAME>", described by the project's summary. */}
      <Seo title={`${project.name} · Case study · ${NAME}`} description={project.summary} path={`/work/${project.slug}`} />
      {/* The site Nav on the hero's sky. No #contact section on this page, so Contact goes to the home page's. */}
      <div className="cs-navbar">
        <Nav variant="page" current="work" hasFooter={false} />
      </div>
      <main>
        <CaseHero project={project} />
        <CaseHow how={project.how} />
        <CaseLevel name={project.name} next={project.next} />
      </main>
      <Footer />
      <PixelCursor />
    </div>
  )
}
