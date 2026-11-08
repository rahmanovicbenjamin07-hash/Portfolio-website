import type { Project } from '../../types/project'
import PixelArrow from '../pixel/PixelArrow'
import CaseSky from './CaseSky'
import CaseShowcase from './CaseShowcase'
import PixelIcon from './PixelIcon'

// Hero + "How it looks", one sky section (design-reference/case-study/*.html: section.sky.chero).
// The site Nav sits above it on the same sky (src/pages/CaseStudy.tsx).
export default function CaseHero({ project }: { project: Project }) {
  const { eyebrow, title, intro, liveLink, projectFile, tags } = project
  return (
    <section className="cs-sky cs-hero" aria-labelledby="cs-title">
      <CaseSky variant="hero" />
      <div className="cs-skyc">
        <div className="cs-hgrid">
          <div>
            <a className="cs-back" href="/#work">
              <PixelArrow className="cs-back-ar" />
              All work
            </a>
            <p className="px-label">
              <i></i>
              {eyebrow}
            </p>
            <h1 id="cs-title">
              {title.lead}
              <span>{title.accent}</span>
            </h1>
            <p className="cs-pxw cs-intro">{intro}</p>
            <div className="cs-hacts">
              <a className="btn btn-primary lg" href={liveLink.url} target="_blank" rel="noopener">
                {liveLink.label} <PixelArrow />
              </a>
              <a className="btn lg" href="#how">
                How we built it
              </a>
            </div>
          </div>

          <aside className="pxbox cs-pfile" aria-label="Project file">
            <p className="px-label">
              <i></i>Project file
            </p>
            <dl>
              {projectFile.map((row) => (
                <div className="cs-prow" key={row.label}>
                  {/* dt is display:contents, so the box and the label are the row's first two grid cells */}
                  <dt>
                    <span className="cs-cbx">
                      <PixelIcon name="check" className="cs-ck" />
                    </span>
                    <span>{row.label}</span>
                  </dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
            <div className="cs-tags">
              {tags.map((t) => (
                <span className="cs-tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </aside>
        </div>

        <CaseShowcase showcase={project.showcase} />
      </div>
    </section>
  )
}
