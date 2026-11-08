import type { Project } from '../../types/project'
import SectionHead from './SectionHead'
import PixelIcon from './PixelIcon'
import './CaseFeatures.css'

// Features: white cards with a pixel icon, title and line. Copied from design-reference/case-study/case-study.html
// (.feats / .feat / .ic).
export default function CaseFeatures({ num, features }: { num: string; features: NonNullable<Project['features']> }) {
  return (
    <section className="wrap sec" aria-labelledby="feats-title">
      <SectionHead id="feats-title" num={num} label={features.label} title={features.title} accent={features.accent} />
      <div className="feats">
        {features.items.map((f) => (
          <div key={f.title} className="feat">
            <span className="ic">
              <PixelIcon name={f.icon} />
            </span>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
