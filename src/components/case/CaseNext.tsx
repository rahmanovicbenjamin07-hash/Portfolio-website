import { getProject } from '../../data/projects'
import { imageSize } from '../../data/imageSizes'
import type { Pixels } from '../../data/process'
import type { Project } from '../../types/project'
import { PixelSvg } from '../home/Process'
import PixelArrow from '../pixel/PixelArrow'
import './CaseNext.css'
import PixelText from '../PixelText'

// "See it live or keep exploring" on the sunset wheat field. Markup copied from design-reference/case-study.html
// (<section class="wrap sec cs-sunset">).
// TODO(agent 1): .wrap / .sec / .h2 come from src/styles/pages.css, imported by the page (not here).

/* pixel sun */
const SUN: Pixels = {
  w: 16,
  h: 16,
  palette: ['#F7B65E', '#FFE7A3'],
  rows: [
    '......aaaa......',
    '....aaabbaaa....',
    '..aabbbbbbbbaa..',
    '..abbbbbbbbbba..',
    '.abbbbbbbbbbbba.',
    '.abbbbbbbbbbbba.',
    'aabbbbbbbbbbbbaa',
    'abbbbbbbbbbbbbba',
    'abbbbbbbbbbbbbba',
    'aabbbbbbbbbbbbaa',
    '.abbbbbbbbbbbba.',
    '.abbbbbbbbbbbba.',
    '..abbbbbbbbbba..',
    '..aabbbbbbbbaa..',
    '....aaabbaaa....',
    '......aaaa......',
  ],
}

export default function CaseNext({ project }: { project: Project }) {
  const next = project.nextSlug ? getProject(project.nextSlug) : undefined

  return (
    <section className="wrap sec cs-sunset" aria-labelledby="nx-title">
      <div className="cs-bg2" aria-hidden="true">
        <div className="cs-sunbox">
          <PixelSvg art={SUN} className="cs-sun" />
        </div>
        <div className="cs-c csn1"></div>
        <div className="cs-c csn2"></div>
        <div className="cs-bird csb1"></div>
        <div className="cs-bird csb2"></div>
        <div className="cs-wheat"></div>
        <div className="cs-dt"></div>
        <div className="cs-db"></div>
      </div>
      <div className="cs-front">
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
          <h2 id="nx-title" className="h2" style={{ margin: 0 }}>
            See it live <span>or keep exploring.</span>
          </h2>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <PixelText text="Visit live site" trigger="hover" /> <PixelArrow color="#ffffff" />
            </a>
          )}
        </div>
        {next && (
          <a href={`/work/${next.slug}`} className="next">
            <div>
              <small>Next project</small>
              <strong>{next.name}</strong>
              <span className="arrowblk">
                <PixelArrow color="#E4ECD6" />
              </span>
            </div>
            <div className="frame" style={{ boxShadow: 'none', padding: 0 }}>
              <div className="browser" aria-hidden="true">
                <i></i>
                <i></i>
                <i></i>
              </div>
              <div className="shot">
                {next.image ? (
                  <img src={next.image} alt={next.imageAlt ?? ''} {...imageSize(next.image)} loading="lazy" decoding="async" />
                ) : (
                  'Next project screenshot'
                )}
              </div>
            </div>
          </a>
        )}
      </div>
    </section>
  )
}
