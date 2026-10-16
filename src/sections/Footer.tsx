import { LINKEDIN, UPWORK } from '../seo/site'
import styles from './Footer.module.css'

type FooterLink = { label: string; href: string; external?: boolean }

// Absolute paths, so the links also work from the 404 page.
const INDEX: FooterLink[] = [
  { label: 'Home', href: '/#top' },
  { label: 'Work', href: '/#work' },
  { label: 'Services', href: '/#services' },
  { label: 'Contact', href: '/#contact' },
]

const SOCIALS: FooterLink[] = [
  { label: 'LinkedIn', href: LINKEDIN, external: true },
  { label: 'Upwork', href: UPWORK, external: true },
]

function LinkList({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <nav aria-label={title}>
      <div className={styles.listTitle}>{title}</div>
      <ul className={styles.list}>
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className={styles.link}
              {...(l.external && { target: '_blank', rel: 'noopener', 'aria-label': `${l.label} (opens in new tab)` })}
            >
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
