import type { Project } from '../../types/project'
import SectionHead from './SectionHead'
import './CaseBuild.css'

// How we built it: numbered steps in a row joined by short bars. Copied from
// design-reference/case-study/case-study.html (.steps5 / .s5).
export default function CaseBuild({ num, build }: { num: string; build: NonNullable<Project['build']> }) {
  return (
    <section className="wrap sec" aria-labelledby="build-title">
      <SectionHead id="build-title" num={num} label={build.label} title={build.title} accent={build.accent} />
      <div className="steps5">
        {build.steps.map((s, i) => (
          <div key={s.title} className="s5">
            <em>Step {i + 1}</em>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
