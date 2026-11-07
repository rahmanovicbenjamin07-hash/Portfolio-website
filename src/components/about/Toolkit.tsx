import toolkit from '../../data/toolkit'
import './Toolkit.css'

// "04 — Toolkit", copied from design-reference/about.html: chips in three groups. The last section
// before the footer (.ab-last). .wrap/.sec/.h2/.ab-last come from src/styles/pages.css. Content: src/data/toolkit.ts.
export default function Toolkit() {
  return (
    <section className="wrap sec ab-last" aria-labelledby="tool-title">
      <p className="px-label">
        <i></i>04 — Toolkit
      </p>
      <h2 id="tool-title" className="h2">
        What I work with <span>every day.</span>
      </h2>
      <div className="tools">
        {toolkit.map((g) => (
          <div key={g.group}>
            <h3>{g.group}</h3>
            <div className="chips">
              {g.tools.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
