import styles from './Banner.module.css'

const BIG = 'Design — Development — CMS — SEO — Launch — Design — Development — CMS — SEO — Launch —'
const SMALL =
  'Responsive · Custom code · Integrations · Speed · Accessibility · Maintenance · Responsive · Custom code · Integrations · Speed · Accessibility · Maintenance ·'

// Copies of SMALL in the blue marquee; the track moves by half of them per loop (keep in sync with Banner.module.css).
// 4 so each half (~3600px) is wider than any screen and the loop never shows an empty edge.
const SMALL_COPIES = 4

// The dark band is static (design change); the blue band is an infinite marquee.
export default function Banner() {
  return (
    <section aria-label="What I do" className={styles.banner}>
      <div aria-hidden="true" className={`${styles.band} ${styles.bandDark}`}>
        <div className={styles.track}>
          <span className={styles.bigText}>{BIG}</span>
        </div>
      </div>
      <div aria-hidden="true" className={`${styles.band} ${styles.bandBlue}`}>
        <div className={`${styles.track} ${styles.marquee}`}>
          {Array.from({ length: SMALL_COPIES }, (_, i) => (
            <span key={i} className={styles.smallText}>
              {`${SMALL} `}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
