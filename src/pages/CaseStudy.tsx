import Seo from '../seo/Seo'
import { caseStudyMeta } from '../seo/meta'
import { getProject } from '../data/projects'
import CaseHero from '../components/case/CaseHero'
import CaseMobile from '../components/case/CaseMobile'
import CaseOverview from '../components/case/CaseOverview'
import CaseProcess from '../components/case/CaseProcess'
import CaseNext from '../components/case/CaseNext'
import Contact from '../components/home/Contact'
import PixelCursor from '../components/pixel/PixelCursor'
import NotFound from './NotFound'
import '../styles/pages.css'

// Project page template at /work/:slug. src/routes.ts registers (and prerenders) one route per entry in
// src/data/projects.ts; an unknown slug renders the 404 page. .pixel-page scopes the global pixel styles, as on Home.
export default function CaseStudy({ slug }: { slug: string }) {
  const project = getProject(slug)
  if (!project) return <NotFound />

  return (
    <div className="pixel-page">
      <Seo {...caseStudyMeta(project)} path={`/work/${project.slug}`} />
      <CaseHero project={project} />
      <CaseMobile project={project} />
      <CaseOverview project={project} />
      <CaseProcess project={project} />
      <CaseNext project={project} />
      <Contact />
      <PixelCursor />
    </div>
  )
}
