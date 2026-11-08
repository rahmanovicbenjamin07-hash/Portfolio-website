import type { Project } from '../../types/project'
import SectionHead from './SectionHead'
import './CaseDesign.css'

// Design: colour swatches, type sample and brand line. Copied from design-reference/case-study/case-study.html
// (.dgrid / .dcard / .sws / .typ / .line).
export default function CaseDesign({ num, design }: { num: string; design: NonNullable<Project['design']> }) {
  return (
    <section className="wrap sec" aria-labelledby="design-title">
      <SectionHead id="design-title" num={num} label="Design" title={design.title} accent={design.accent} />
      <div className="dgrid">
        <div className="dcard">
          <h3>Colour</h3>
          <div className="sws">
            {design.colors.map((c) => (
              <span key={c}>
                <i style={{ background: c }}></i>
                <small>{c}</small>
              </span>
            ))}
          </div>
        </div>
        <div className="dcard typ">
          <h3>Type</h3>
          <b>{design.typeSample}</b>
          <span>{design.typeNote}</span>
        </div>
        <div className="dcard line">
          <h3>Brand line</h3>
          <b>{design.brandLine}</b>
          <span>{design.brandNote}</span>
        </div>
      </div>
    </section>
  )
}
