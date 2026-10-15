import { useState } from 'react'
import styles from './Testimonials.module.css'

// Placeholders until Benjamin sends the real Upwork reviews.
const REVIEWS = [
  { quote: '[Paste your strongest Upwork review here. Keep it to 2–3 sentences.]', name: '[Client name]', role: '[Role, Company]', initials: 'C1' },
  { quote: '[Second review: ideally one about speed or communication.]', name: '[Client name]', role: '[Role, Company]', initials: 'C2' },
  { quote: '[Third review: ideally one from an agency or a repeat client.]', name: '[Client name]', role: '[Role, Company]', initials: 'C3' },
]

export default function Testimonials() {
  const [t, setT] = useState(0)
  const n = REVIEWS.length
  const review = REVIEWS[t]

  return (
    <section aria-labelledby="t-heading" className={styles.testimonials}>
      <div className={styles.grid}>
        <div className={styles.left}>
          <div className={styles.intro}>
            <div className={styles.label}>[ TESTIMONIALS ]</div>
            <h2 id="t-heading" className={styles.heading}>
              <span className={styles.line}>Results</span>
              <span className={styles.line}>speak</span>
              <span className={`${styles.line} ${styles.accent}`}>louder</span>
            </h2>
          </div>
          <div className={styles.rating}>
            <span aria-label="5 stars" className={styles.stars}>
              ★★★★★
            </span>
            4+ five-star reviews on Upwork
          </div>
        </div>

        <figure className={styles.card}>
          <div className={styles.cardTop}>
            <svg aria-hidden="true" width="56" height="44" viewBox="0 0 56 44" fill="#1E3BF0">
              <path d="M0 44V26C0 11 7 2 22 0l2 7c-8 2-12 7-12 14h10v23H0zm32 0V26c0-15 7-24 22-26l2 7c-8 2-12 7-12 14h10v23H32z" />
            </svg>
            <span className={styles.pos}>
              0{t + 1} / 0{n}
            </span>
          </div>
          <blockquote key={t} className={styles.quote}>
            {review.quote}
          </blockquote>
          <div className={styles.cardBottom}>
            <figcaption className={styles.client}>
              <span aria-hidden="true" className={styles.avatar}>
                {review.initials}
              </span>
              <span>
                <strong className={styles.name}>{review.name}</strong>
                <span className={styles.role}>{review.role}</span>
              </span>
            </figcaption>
            <div className={styles.controls}>
              <div role="tablist" aria-label="Reviews" className={styles.dots}>
                {REVIEWS.map((_, i) => (
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
                ←
              </button>
              <button aria-label="Next review" onClick={() => setT((t + 1) % n)} className={styles.next}>
                →
              </button>
            </div>
          </div>
        </figure>
      </div>
    </section>
  )
}
