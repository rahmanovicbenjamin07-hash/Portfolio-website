import type { Project } from '../../types/project'
import SectionHead from './SectionHead'
import './CaseOverview.css'

// Overview: three short cards (Challenge, Goal, Result). Copied from design-reference/case-study/case-study.html
// (.ov / .ovc, the Result card .rz in blue).
export default function CaseOverview({ num, overview }: { num: string; overview: NonNullable<Project['overview']> }) {
  return (
    <section className="wrap sec" aria-labelledby="ov-title">
      <SectionHead id="ov-title" num={num} label="Overview" title="The short version" accent="in three lines." />
      <div className="ov">
        <div className="ovc">
          <b>Challenge</b>
          <p>{overview.challenge}</p>
        </div>
        <div className="ovc">
          <b>Goal</b>
          <p>{overview.goal}</p>
        </div>
        <div className="ovc rz">
          <b>Result</b>
          <p>{overview.result}</p>
        </div>
      </div>
    </section>
  )
}
