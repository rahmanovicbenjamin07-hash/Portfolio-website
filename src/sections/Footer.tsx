import { LINKEDIN } from '../seo/site'
import styles from './Footer.module.css'

// Absolute paths, so the links also work from the 404 page.
const INDEX = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/#work' },
  { label: 'Services', href: '/#services' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
]

// The other social links point to #contact until Benjamin provides the real URLs.
const SOCIALS = [
  { label: 'LinkedIn', href: LINKEDIN },
  { label: 'Upwork', href: '/#contact' },
  { label: 'Contra', href: '/#contact' },
  { label: 'Email', href: '/#contact' },
]

function LinkList({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <nav aria-label={title}>
      <div className={styles.listTitle}>{title}</div>
      <ul className={styles.list}>
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} className={styles.link}>
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.credits}>
          <div>Designed &amp; built by Benjamin Rahmanović</div>
          <div>Built in Webflow</div>
          <div>© 2026</div>
        </div>
        <div className={styles.lists}>
          <LinkList title="Index" links={INDEX} />
          <LinkList title="Socials" links={SOCIALS} />
        </div>
      </div>

      <div className={styles.divider}>
        <div className={styles.line} />
        <a href="#top" aria-label="Back to top" className={styles.backToTop}>
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5" />
            <path d="M5 12l7-7 7 7" />
          </svg>
        </a>
      </div>

      <div className={styles.marquee}>
        <div className={styles.track}>
          <span className={styles.name}>BENJAMIN RAHMANOVIĆ ·</span>
          <span aria-hidden="true" className={styles.name}>
            BENJAMIN RAHMANOVIĆ ·
          </span>
        </div>
      </div>
    </footer>
  )
}
