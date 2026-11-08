import type { Project } from '../../types/project'
import PixelArrow from '../pixel/PixelArrow'
import SectionHead from './SectionHead'
import { caseImageSize } from './caseImages'
import { liveLabel } from './liveLabel'
import './CaseResult.css'

// Result + Next project, copied from design-reference/case-study/case-study.html (#next: .res / .rbox / .next).
// The hero's "Next project" button jumps here (#next).
// A project without a result still gets the Next project card, under a "Next project" heading.
// The card is the same on every page: the next project's mockup in the hero's pixel frame, then its name + arrow.
type Props = { num: string; project: Project; next?: Project }

export default function CaseResult({ num, project, next }: Props) {
  const { result } = project
  // Same file as that project's hero mockup: /images/work/<slug>/mockup.webp.
  const nextImage = next ? next.heroImage ?? `/images/work/${next.slug}/mockup.webp` : ''
  return (
    <section className="wrap sec" id="next" aria-labelledby="res-title">
      {result ? (
        <SectionHead id="res-title" num={num} label="Result" title={result.title} accent={result.accent} />
      ) : (
        next && <SectionHead id="res-title" num={num} label="Next project" title="Up next:" accent={`${next.name}.`} />
      )}
      <div className={result ? 'res' : 'res res-solo'}>
        {result && (
          <div className="rbox">
            <p>{result.text}</p>
            {project.liveUrl && (
              <a className="btn lg" href={project.liveUrl} target="_blank" rel="noopener">
                Visit {liveLabel(project)} <PixelArrow />
              </a>
            )}
          </div>
        )}
        {next && (
          <a className="next" href={`/work/${next.slug}`}>
            {/* The next project's mockup in the hero's pixel frame. alt="": the link text below already names it. */}
            <div className="nshot">
              <img src={nextImage} alt="" {...caseImageSize(nextImage)} loading="lazy" decoding="async" />
            </div>
            <div className="nl">
              <span>
                <small>Next project</small>
                {next.name}
              </span>
              <PixelArrow />
            </div>
          </a>
        )}
      </div>
    </section>
  )
}
