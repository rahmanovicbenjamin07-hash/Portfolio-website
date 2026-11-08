import type { ReactNode } from 'react'
import type { Project } from '../../types/project'
import PixelArrow from '../pixel/PixelArrow'
import { caseImageSize } from './caseImages'
import { liveLabel } from './liveLabel'
// The sky scene's classes (.p-skybg, .p-cloud, .p-land, …) live with the home Process section.
import '../home/Process.css'
import './CaseHero.css'

// Project page hero, copied from design-reference/case-study/case-study.html (section.chero): breadcrumb,
// "Case study · year", h1, blue subtitle, intro, the two buttons, the facts row (.cmeta), the sky scene from the
// home Process section (.ch-sky) and the mockup in the pixel frame (.shot). The page puts the site Nav above it (src/pages/CaseStudy.tsx).

export default function CaseHero({ project, hasNext }: { project: Project; hasNext: boolean }) {
  // Facts row: each cell only when the project has that fact.
  const facts: { label: string; value: ReactNode }[] = []
  facts.push({ label: 'Role', value: project.role })
  if (project.with) {
    const w = project.with
    facts.push({
      label: 'With',
      value: w.url ? (
        <a href={w.url} target="_blank" rel="noopener">
          {w.name}
        </a>
      ) : (
        w.name
      ),
    })
  }
  if (project.platform) facts.push({ label: 'Platform', value: project.platform })
  if (project.builtWith) facts.push({ label: 'Built with', value: project.builtWith })

  return (
    <section className="chero" aria-labelledby="cs-title">
        <p className="crumb">
          <a href="/">Home</a> / <a href="/#work">Work</a> / {project.name}
        </p>
        <div className="chead">
          <div>
            <p className="px-label">
              <i></i>Case study · {project.year}
            </p>
            <h1 id="cs-title">{project.name}</h1>
            {project.subtitle && <p className="sub">{project.subtitle}</p>}
            <p className="lead">{project.lead ?? project.summary}</p>
          </div>
          {(project.liveUrl || hasNext) && (
            <div className="cacts">
              {project.liveUrl && (
                <a className="btn btn-primary lg" href={project.liveUrl} target="_blank" rel="noopener">
                  Visit {liveLabel(project)} <PixelArrow />
                </a>
              )}
              {hasNext && (
                <a className="btn lg" href="#next">
                  Next project
                </a>
              )}
            </div>
          )}
        </div>
        {facts.length > 0 && (
          <dl className="cmeta">
            {facts.map((f) => (
              <div key={f.label} className="mcell">
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        )}
        {/* The home Process section's sky scene (owner's request): drifting clouds, the pixel landscape with
            swaying grass, and the dissolve into the white band below the shot. Same classes as Process.tsx.
            No birds here (owner's request: they didn't look good on the case study). */}
        <div className="p-skybg ch-sky" aria-hidden="true">
          <div className="px p-cloud pc1"></div>
          <div className="px p-cloud pc2"></div>
          <div className="px p-cloud pc3"></div>
          <div className="px p-cloud pc4"></div>
          <div className="px p-land"></div>
          <div className="px p-grass"></div>
          <div className="px p-dis p-dis-b"></div>
        </div>
        {project.heroImage && (
          <div className="shot">
            {/* Above the fold on most screens: load it first. */}
            <img src={project.heroImage} alt={project.heroAlt ?? ''} {...caseImageSize(project.heroImage)} fetchPriority="high" decoding="async" />
          </div>
        )}
    </section>
  )
}
