import { Fragment, type ReactNode } from 'react'
import Seo from '../seo/Seo'
import { NAME } from '../seo/site'
import { getProject } from '../data/projects'
import Nav from '../components/home/Nav'
import CaseHero from '../components/case/CaseHero'
import CaseOverview from '../components/case/CaseOverview'
import CaseFlow, { CaseOnMobile } from '../components/case/CaseFlow'
import CaseFeatures from '../components/case/CaseFeatures'
import CaseDesign from '../components/case/CaseDesign'
import CaseBuild from '../components/case/CaseBuild'
import CaseResult from '../components/case/CaseResult'
import Contact from '../components/home/Contact'
import PixelCursor from '../components/pixel/PixelCursor'
import NotFound from './NotFound'
import '../styles/pages.css'
import './CaseStudy.css'

// Project page template at /work/:slug, built from design-reference/case-study/case-study.html. src/routes.ts
// registers (and prerenders) one route per entry in src/data/projects.ts; an unknown slug renders the 404 page.
// Every section after the hero renders only when the project has data for it, and the section labels are
// numbered (01, 02, …) in the order they actually render. .pixel-page scopes the global pixel styles, as on Home.
export default function CaseStudy({ slug }: { slug: string }) {
  const project = getProject(slug)
  if (!project) return <NotFound />

  const next = project.nextSlug ? getProject(project.nextSlug) : undefined
  const { overview, flow, mobileShots, features, design, build, result } = project

  // Page order. Each entry renders with its number ("01", "02", …).
  const sections: { key: string; render: (num: string) => ReactNode }[] = []
  if (overview) sections.push({ key: 'overview', render: (n) => <CaseOverview num={n} overview={overview} /> })
  if (flow) {
    sections.push({ key: 'flow', render: (n) => <CaseFlow num={n} {...flow} /> })
  } else if (mobileShots && mobileShots.length > 0) {
    sections.push({ key: 'mobile', render: (n) => <CaseOnMobile num={n} shots={mobileShots} statusBar={project.mobileStatusBar} /> })
  }
  if (features) sections.push({ key: 'features', render: (n) => <CaseFeatures num={n} features={features} /> })
  if (design) sections.push({ key: 'design', render: (n) => <CaseDesign num={n} design={design} /> })
  if (build) sections.push({ key: 'build', render: (n) => <CaseBuild num={n} build={build} /> })
  if (result || next) sections.push({ key: 'result', render: (n) => <CaseResult num={n} project={project} next={next} /> })

  return (
    <div className="pixel-page cpage">
      {/* "<Name> · Case study · <NAME>", described by the project's summary. */}
      <Seo title={`${project.name} · Case study · ${NAME}`} description={project.summary} path={`/work/${project.slug}`} />
      {/* The site Nav (inner-page variant, Work active) in place of the reference's .nav, on its sky blue. */}
      <div className="cnav">
        <Nav variant="page" current="work" />
      </div>
      <main className="cmain">
        <CaseHero project={project} hasNext={Boolean(next)} />
        {sections.map((s, i) => (
          <Fragment key={s.key}>{s.render(String(i + 1).padStart(2, '0'))}</Fragment>
        ))}
      </main>
      <Contact />
      <PixelCursor />
    </div>
  )
}
