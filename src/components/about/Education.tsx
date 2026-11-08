import certificates from '../../data/education'
import PixelSprite from './PixelSprite'
import './Education.css'

// "02 — Certificates", copied from the approved design-reference/about/about.html: two .cert cards in two columns,
// each with its own pixel medal (no brand logos). A certificate with a `url` is a link (new tab), as the reference's
// first card. .wrap/.sec/.h2 come from src/styles/pages.css. Content and medals: src/data/education.ts.
export default function Education() {
  return (
    <section className="wrap sec" aria-labelledby="edu-title">
      <p className="px-label">
        <i></i>02 — Certificates
      </p>
      <h2 id="edu-title" className="h2">
        Where I learned <span>the craft.</span>
      </h2>
      <div className="edu certs">
        {certificates.map((c) => {
          const inner = (
            <>
              <span className="medal">
                <PixelSprite sprite={c.medal} />
              </span>
              <span>
                <span className="cert-k">Certificate</span>
                <h3>{c.title}</h3>
                <span className="cert-p">{c.provider}</span>
              </span>
            </>
          )
          return c.url ? (
            <a key={c.title} className="cert" href={c.url} target="_blank" rel="noopener">
              {inner}
            </a>
          ) : (
            // data-cursor-target: the pixel cursor's corner frame also shows on a card without a link, like on the linked one.
            <div key={c.title} className="cert" data-cursor-target>
              {inner}
            </div>
          )
        })}
      </div>
    </section>
  )
}
