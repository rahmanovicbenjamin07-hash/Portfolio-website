import styles from './Cta.module.css'

export default function Cta() {
  return (
    <section id="contact" aria-labelledby="cta-heading" className={styles.cta}>
      <div className={styles.box}>
        <h2 id="cta-heading" className={styles.heading}>
          Let's build it
        </h2>
        <div aria-hidden="true" className={styles.glow} />
        <div aria-hidden="true" className={styles.horizon} />

        {/* Floating </> tile with its grey edge behind */}
        <div aria-hidden="true" className={styles.object}>
          <div className={styles.edge} />
          <div className={styles.tile}>
            <svg width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="#1E3BF0" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 7l-5 5 5 5" />
              <path d="M16 7l5 5-5 5" />
              <path d="M13.5 4.5l-3 15" />
            </svg>
            <span className={styles.dots}>
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </span>
          </div>
        </div>

        <div className={styles.actions}>
          <a href="#contact" className={styles.button}>
            Book a 15-min call
          </a>
          <p className={styles.note}>Send me the design or the idea. I'll reply with how I'd build it, and when.</p>
        </div>
      </div>
    </section>
  )
}
