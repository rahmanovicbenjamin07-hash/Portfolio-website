import { useEffect, useRef, useState } from 'react'
import { CALENDLY } from '../seo/site'
import styles from './Hero.module.css'

const MENU_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

const SHOTS = [
  '/images/topone-trader.jpg',
  '/images/wealthventures.jpg',
  '/images/spayc.jpg',
  '/images/veracious.jpg',
  '/images/wayne-nugent.jpg',
  '/images/view-from-the-edge.jpg',
  '/images/prism-sabila.jpg',
  '/images/topone-launchpad.jpg',
  '/images/benjamin-old.jpg',
]

// 5 rows, each starting 4 images further along the list, duplicated for a seamless -50% loop.
const ROWS = [0, 1, 2, 3, 4].map((r) => {
  const row = SHOTS.map((_, k) => SHOTS[(r * 4 + k) % SHOTS.length])
  return { left: r % 2 === 0, shots: row.concat(row) }
})

function sarajevoTime(now: number | null) {
  let time = '--:--'
  let zone = 'GMT+2'
  if (now === null) return { time, zone }
  try {
    const d = new Date(now)
    time = d.toLocaleTimeString('en-GB', { timeZone: 'Europe/Sarajevo', hour: '2-digit', minute: '2-digit' })
    const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Sarajevo', timeZoneName: 'shortOffset' }).formatToParts(d)
    const z = parts.find((x) => x.type === 'timeZoneName')
    if (z) zone = z.value
  } catch {
    // keep fallbacks
  }
  return { time, zone }
}

export default function Hero() {
  // No time in the prerendered HTML (it would be the build time): it is set as soon as the page hydrates.
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    setNow(Date.now())
    const timer = setInterval(() => setNow(Date.now()), 30000)
    return () => clearInterval(timer)
  }, [])

  const { time, zone } = sarajevoTime(now)

  // Menu: closes on Escape (focus back on the toggle), on a click outside the nav, and when focus leaves it.
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setMenuOpen(false)
      toggleRef.current?.focus()
    }
    const onPointer = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    // The page header (banner landmark, outside <main>): holds the nav and the page's only h1.
    <header className={styles.hero}>
      <div aria-hidden="true" className={styles.wallViewport}>
        <div className={styles.wall}>
          {ROWS.map((row, r) => (
            <div key={r} className={`${styles.row} ${row.left ? styles.rowLeft : styles.rowRight}`}>
              {row.shots.map((src, i) => (
                <img key={i} src={src} alt="" width={1600} height={971} className={styles.shot} decoding="async" />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div aria-hidden="true" className={styles.vignette} />
      <div aria-hidden="true" className={styles.bottomFade} />

      <nav
        ref={navRef}
        aria-label="Main"
        className={styles.nav}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) closeMenu()
        }}
      >
        <a href="#top" className={`${styles.glass} ${styles.logo}`}>Benjamin R.</a>
        <button
          ref={toggleRef}
          type="button"
          aria-label="Menu"
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={() => setMenuOpen((open) => !open)}
          className={`${styles.glass} ${styles.menu}`}
        >
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M5 9h14" />
            <path d="M5 15h14" />
          </svg>
        </button>
        <div id="site-menu" hidden={!menuOpen} className={styles.menuPanel}>
          <ul className={styles.menuList}>
            {MENU_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={closeMenu} className={styles.menuLink}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          {/* Same link as the header button, which is hidden on mobile */}
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener"
            aria-label="Book a call (opens in new tab)"
            onClick={closeMenu}
            className={styles.menuCta}
          >
            Book a call
          </a>
        </div>
        <a
          href={CALENDLY}
          target="_blank"
          rel="noopener"
          aria-label="Book a call (opens in new tab)"
          className={`${styles.glass} ${styles.navCta}`}
        >
          Book a call
        </a>
      </nav>

      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles.badge}>
            <span aria-hidden="true" className={styles.badgeDot} />
            Your idea. My execution.
          </div>
          <h1 className={styles.title}>
            {/* Not shown (the design's headline stays as is), but part of the h1 for crawlers and screen readers. */}
            <span className="sr-only">Webflow Expert Developer: </span>
            <span className={styles.line}>Hand me the design.</span>
            <span className={styles.line}>
              {/* Decorative: the h1 text already says "Webflow", an alt would only repeat it. */}
              <img src="/images/webflow-logo.png" alt="" width={186} height={187} className={styles.webflow} />
              Get back a
            </span>
            <span className={styles.line}>
              finished{' '}
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={styles.check}>
                <circle cx="12" cy="12" r="11" fill="var(--color-accent)" />
                <path d="M7 12.5l3.2 3.2L17 9" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>{' '}
              website.
            </span>
          </h1>
          <p className={styles.subline}>Expert Webflow developer for agencies and teams. Everything your website needs, handled.</p>
          <div className={styles.buttons}>
            <a href={CALENDLY} target="_blank" rel="noopener" aria-label="Book a 15-min call (opens in new tab)" className={styles.btnPrimary}>
              Book a 15-min call
            </a>
            <a href="#work" className={styles.btnSecondary}>See the work</a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.muted}>
          <strong className={styles.strong}>{time}</strong> ({zone})
        </div>
        <p className={styles.intro}>
          <strong className={styles.strong}>Benjamin</strong> builds Webflow websites for agencies and teams, from first design to launch.
        </p>
        <div className={styles.scroll}>
          <span className={styles.scrollLabel}>Scroll for more</span>
          <span aria-hidden="true" className={styles.scrollLine} />
        </div>
      </div>
    </header>
  )
}
