import type { ReactNode } from 'react'
import type { Project } from '../../types/project'
import Nav from '../home/Nav'
import PixelArrow from '../pixel/PixelArrow'
import { imageSize } from '../../data/imageSizes'
import './CaseHero.css'

// Project page hero, copied from design-reference/case-study.html (section.cs-hero + the .shot-lift frame below it):
// meadow background, the page nav with Work active, the white panel with the facts row, then the main screenshot in
// the pixel browser frame, lifted over the bottom of the meadow. .wrap comes from src/styles/pages.css.
export default function CaseHero({ project }: { project: Project }) {
  const facts: { label: string; value: ReactNode }[] = [
    { label: 'Client', value: project.client },
    { label: 'Year', value: project.year },
    { label: 'My role', value: project.role },
    { label: 'Tools', value: project.tools },
  ]
  // Optional: who the project was made with, as a fifth fact ("With" / name linked to their site).
  if (project.partner) {
    facts.push({
      label: 'With',
      value: (
        <a href={project.partner.url} target="_blank" rel="noopener">
          {project.partner.name}
        </a>
      ),
    })
  }

  return (
    <>
      <section className="cs-hero" aria-labelledby="cs-title">
        <div className="cs-bg" aria-hidden="true">
          <div className="cs-land"></div>
          <div className="cs-cloud csc1"></div>
          <div className="cs-cloud csc2"></div>
          <div className="cs-grass"></div>
          <div className="cs-dis"></div>
        </div>
        <div className="cs-content">
          <Nav variant="page" current="work" />
          <div className="wrap" style={{ paddingTop: 40 }}>
            <div className="cs-card">
              <a href="/#work" className="back">
                <PixelArrow color="#4A5E44" /> All work
              </a>
              <p className="px-label" style={{ marginTop: 36 }}>
                <i></i>Case study
              </p>
              <h1
                id="cs-title"
                style={{ margin: '16px 0 0', maxWidth: 900, fontFamily: "'Inter Tight', Inter, sans-serif", fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: 1.02, fontWeight: 500, letterSpacing: '-0.03em', color: '#0E1B26' }}
              >
                {project.name} <span style={{ color: '#4A6070' }}>— {project.summary}</span>
              </h1>
              <dl className={facts.length > 4 ? 'facts facts-5' : 'facts'} style={{ marginBottom: 0 }}>
                {facts.map((f) => (
                  <div key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>
      <div className="wrap">
        <div className="frame shot-lift">
          <div className="browser" aria-hidden="true">
            <i></i>
            <i></i>
            <i></i>
          </div>
          <div className="shot">
            {project.image ? (
              // Above the fold on most screens: load it first.
              <img className="cs-shot-img" src={project.image} alt={project.imageAlt ?? ''} {...imageSize(project.image)} fetchPriority="high" decoding="async" />
            ) : (
              'Hero screenshot · 1600 × 900'
            )}
          </div>
        </div>
      </div>
    </>
  )
}
