import type { CSSProperties } from 'react'
import certificates from '../../data/education'
import PixelSprite from './PixelSprite'
import { CERTIFICATE } from './sprites'
import './Education.css'

// "02 — Certificates" (the reference's "02 — Education" section, renamed), copied from design-reference/about.html:
// pixel-icon cards. .wrap/.sec/.h2 come from src/styles/pages.css. Content: src/data/education.ts.
// The grid has as many columns as cards, up to the reference's 3 (2 certificates → 2 columns, no empty slot).
const columns = Math.min(certificates.length, 3)
export default function Education() {
  return (
    <section className="wrap sec" aria-labelledby="edu-title">
      <p className="px-label">
        <i></i>02 — Certificates
      </p>
      <h2 id="edu-title" className="h2">
        Where I learned <span>the craft.</span>
      </h2>
      <div className="edu" style={{ '--edu-cols': columns } as CSSProperties}>
        {certificates.map((c) => (
          <div key={c.title} className="edu-card">
            <span className="edu-ic" aria-hidden="true">
              <PixelSprite sprite={CERTIFICATE} />
            </span>
            {c.year && <time>{c.year}</time>}
            <h3>{c.title}</h3>
            <span>
              {c.url ? (
                <a href={c.url} target="_blank" rel="noopener">
                  {c.provider}
                </a>
              ) : (
                c.provider
              )}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
