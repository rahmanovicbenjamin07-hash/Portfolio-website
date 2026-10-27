import { useState } from 'react'
import { TESTIMONIALS } from '../data/testimonials'
import styles from './Testimonials.module.css'

// Up arrow; rotated -90deg for Previous and 90deg for Next.
function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 17V7M12 7L8 11M12 7L16 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Testimonials() {
  const [t, setT] = useState(0)
  const n = TESTIMONIALS.length

  return (
    <section aria-labelledby="t-heading" className={styles.testimonials}>
      <div className={styles.grid}>
        <div className={styles.left}>
          <div data-reveal className={styles.intro}>
            <div className={styles.label}>[ TESTIMONIALS ]</div>
            <h2 id="t-heading" className={styles.heading}>
              <span className={styles.line}>Results</span>
              <span className={styles.line}>speak</span>
              <span className={`${styles.line} ${styles.accent}`}>louder</span>
            </h2>
          </div>
          <div data-reveal className={styles.rating}>
            <span aria-label="5 stars" className={styles.stars}>
              ★★★★★
            </span>
            Only 5 star reviews with 100% JSS on Upwork
          </div>
        </div>

        <figure data-reveal className={styles.card}>
          <div className={styles.cardTop}>
            <svg aria-hidden="true" width="56" height="44" viewBox="0 0 56 44" fill="#1E3BF0">
              <path d="M0 44V26C0 11 7 2 22 0l2 7c-8 2-12 7-12 14h10v23H0zm32 0V26c0-15 7-24 22-26l2 7c-8 2-12 7-12 14h10v23H32z" />
            </svg>
            <span className={styles.pos}>
              0{t + 1} / 0{n}
            </span>
          </div>
          {/* All reviews share one grid cell (only the active one is visible), so the card
              is always as tall as the longest review and never jumps when switching. */}
          <div className={styles.stack}>
            {TESTIMONIALS.map((r, i) => (
              <blockquote key={i} className={`${styles.quote} ${i === t ? styles.active : ''}`}>
                {r.quote}
              </blockquote>
            ))}
          </div>
          <div className={styles.cardBottom}>
            <figcaption className={styles.stack}>
              {TESTIMONIALS.map((r, i) => (
                <span key={i} className={`${styles.client} ${i === t ? styles.active : ''}`}>
                  <span aria-hidden="true" className={styles.avatar}>
                    {r.initials}
                  </span>
                  <span>
                    <strong className={styles.name}>{r.name}</strong>
                    <span className={styles.role}>{r.role}</span>
                  </span>
                </span>
              ))}
            </figcaption>
            <div className={styles.controls}>
              <div role="tablist" aria-label="Reviews" className={styles.dots}>
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={i === t}
                    aria-label={`Review ${i + 1}`}
                    onClick={() => setT(i)}
                    className={`${styles.dot} ${i === t ? styles.dotActive : ''}`}
                  />
                ))}
              </div>
              <button aria-label="Previous review" onClick={() => setT((t + n - 1) % n)} className={styles.prev}>
                <ArrowIcon className={styles.iconPrev} />
              </button>
              <button aria-label="Next review" onClick={() => setT((t + 1) % n)} className={styles.next}>
                <ArrowIcon className={styles.iconNext} />
              </button>
            </div>
          </div>
        </figure>
      </div>
    </section>
  )
}
