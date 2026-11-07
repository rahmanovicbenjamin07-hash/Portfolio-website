import expectations from '../../data/expectations'
import PixelSprite from './PixelSprite'
import './WorkingWithMe.css'

// "03 — Working with me", copied from design-reference/about.html: four white cards with pixel icons.
// .wrap/.sec/.h2 come from src/styles/pages.css. Content: src/data/expectations.ts.
export default function WorkingWithMe() {
  return (
    <section className="wrap sec" aria-labelledby="ex-title">
      <p className="px-label">
        <i></i>03 — Working with me
      </p>
      <h2 id="ex-title" className="h2">
        What you can expect <span>on every project.</span>
      </h2>
      <div className="expect">
        {expectations.map((e) => (
          <div key={e.title} className="ex-card">
            <span className="ex-ic" aria-hidden="true">
              <PixelSprite sprite={e.icon} />
            </span>
            <h3>{e.title}</h3>
            <p>{e.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
