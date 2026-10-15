import styles from './Banner.module.css'

const BIG = 'Design — Development — CMS — SEO — Launch — Design — Development — CMS — SEO — Launch —'
const SMALL =
  'Responsive · Custom code · Integrations · Speed · Accessibility · Maintenance · Responsive · Custom code · Integrations · Speed · Accessibility · Maintenance ·'

// Static bands (design change: no marquee).
export default function Banner() {
  return (
    <section aria-label="What I do" className={styles.banner}>
      <div aria-hidden="true" className={`${styles.band} ${styles.bandDark}`}>
        <div className={styles.track}>
          <span className={styles.bigText}>{BIG}</span>
        </div>
      </div>
      <div aria-hidden="true" className={`${styles.band} ${styles.bandBlue}`}>
        <div className={styles.track}>
          <span className={styles.smallText}>{SMALL}</span>
        </div>
      </div>
    </section>
  )
}
