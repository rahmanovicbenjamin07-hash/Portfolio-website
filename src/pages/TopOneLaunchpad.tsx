import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Seo from '../seo/Seo'
import { CALENDLY } from '../seo/site'
import Cta from '../sections/Cta'
import Footer from '../sections/Footer'
import nav from '../sections/Hero.module.css'
import styles from './TopOneLaunchpad.module.css'

gsap.registerPlugin(ScrollTrigger)

// Same links as the homepage menu, made absolute so they lead back to the homepage sections.
const MENU_LINKS = [
  { label: 'Work', href: '/#work' },
  { label: 'Services', href: '/#services' },
  { label: 'Contact', href: '/#contact' },
]

// The homepage nav, which lives inside Hero.tsx: same markup, styles (Hero.module.css) and copy.
// TODO: replace with a shared <Nav /> once it is extracted from Hero.tsx.
function SiteNav() {
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
    <nav
      ref={navRef}
      aria-label="Main"
      className={nav.nav}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) closeMenu()
      }}
    >
      <a href="/" className={`${nav.glass} ${nav.logo}`}>Benjamin R.</a>
      <button
        ref={toggleRef}
        type="button"
        aria-label="Menu"
        aria-expanded={menuOpen}
        aria-controls="site-menu"
        onClick={() => setMenuOpen((open) => !open)}
        className={`${nav.glass} ${nav.menu}`}
      >
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <path d="M5 9h14" />
          <path d="M5 15h14" />
        </svg>
      </button>
      <div id="site-menu" hidden={!menuOpen} className={nav.menuPanel}>
        <ul className={nav.menuList}>
          {MENU_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={closeMenu} className={nav.menuLink}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={CALENDLY}
          target="_blank"
          rel="noopener"
          aria-label="Book a call (opens in new tab)"
          onClick={closeMenu}
          className={nav.menuCta}
        >
          Book a call
        </a>
      </div>
      <a
        href={CALENDLY}
        target="_blank"
        rel="noopener"
        aria-label="Book a call (opens in new tab)"
        className={`${nav.glass} ${nav.navCta}`}
      >
        Book a call
      </a>
    </nav>
  )
}

function ArrowLeft() {
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5" />
      <path d="M11 6l-6 6 6 6" />
    </svg>
  )
}

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  )
}

function ArrowUpRight() {
  return (
    <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </svg>
  )
}

const OVERVIEW = [
  {
    title: 'What they needed',
    text: 'A launch page that feels like an event, explains the new account in seconds and sends traders straight to checkout.',
  },
  {
    title: 'The challenge',
    text: 'Two days. Animation, pricing logic, checkout links and a form integration, all live and tested before the launch went out.',
  },
  {
    title: 'My role',
    text: 'The full Webflow build: parallax background, pricing slider, custom loader, form integration and launch QA.',
  },
]

const STEPS = [
  { title: 'Brief', text: 'Offer and design in' },
  { title: 'Layout build', text: 'Sections and responsive layout' },
  { title: 'Space & motion', text: 'Parallax, planets and loader' },
  { title: 'Pricing & forms', text: 'Slider, checkout and Zapier' },
  { title: 'QA & live', text: 'Devices, links, publish' },
]

// Hero items (.cs-in) fade up on load in CSS, one after another: --d is the item's place in that order.
const order = (d: number) => ({ '--d': d }) as CSSProperties

// Scroll motion. Everything starts visible (prerendered HTML, no JS, reduced motion); only with motion allowed
// are [data-reveal] items hidden and faded up as they come 15% into view: 300ms, 45ms (15%) apart.
function useScrollMotion(root: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const el = root.current
    if (!el) return
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const start = 'top 85%'

      const items = gsap.utils.toArray<HTMLElement>('[data-reveal]', el)
      gsap.set(items, { opacity: 0, y: 16 })
      ScrollTrigger.batch(items, {
        start,
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out', stagger: 0.045, clearProps: 'opacity,transform' }),
      })

      // Turnaround: ~0h counts up to ~48h. The number sits over a hidden "~48h", so its width never changes.
      const count = el.querySelector<HTMLElement>('.cs-count-value')
      const steps = el.querySelector('.cs-steps')
      if (count && steps) {
        const n = { v: 0 }
        count.textContent = '~0h'
        gsap.to(n, {
          v: 48,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: { trigger: steps, start, once: true },
          onUpdate: () => {
            count.textContent = `~${Math.round(n.v)}h`
          },
        })
        // Step bars fill left to right, one after another.
        gsap.from(el.querySelectorAll('.cs-step-fill'), {
          scaleX: 0,
          duration: 0.3,
          ease: 'power1.out',
          stagger: 0.24,
          scrollTrigger: { trigger: steps, start, once: true },
        })
      }

      return () => {
        if (count) count.textContent = '~48h'
      }
    })
    return () => mm.revert()
  }, [root])
}

const IMG = '/images/top-one-launchpad'
const LIVE_URL = 'https://www.toponetrader.com/launchpad'

const PHONES = [
  { src: `${IMG}/launchpad-hero-mobile.avif`, width: 944, height: 1600, alt: 'Top One Launchpad on mobile: hero' },
  { src: `${IMG}/launchpad-pricing-mobile.avif`, width: 824, height: 1600, alt: 'Top One Launchpad on mobile: pricing slider' },
  { src: `${IMG}/launchpad-mobile-form.avif`, width: 1206, height: 2317, alt: 'Top One Launchpad on mobile: form' },
]

export default function TopOneLaunchpad() {
  const mainRef = useRef<HTMLElement>(null)
  useScrollMotion(mainRef)

  return (
    <>
      <Seo
        title="Top One Launchpad Case Study | Benjamin Rahmanović, Webflow Expert"
        description="The landing page for Launch Pad, Top One Trader's new home for testing account types: a parallax starfield, a pricing slider into checkout and a custom loader, built in Webflow in about two days."
        path="/work/top-one-launchpad"
      />
      <div id="top" className={styles.page}>
        <header>
          <SiteNav />
        </header>

        <main ref={mainRef}>
          {/* Hero */}
          <section aria-labelledby="cs-title" className="cs-hero cs-section">
            <div className="cs-container">
              <div className="cs-hero-top cs-in" style={order(0)}>
                <a href="/#work" className="cs-back">
                  <ArrowLeft />
                  All work
                </a>
                <span className="cs-eyebrow">Case study 03 / 03</span>
              </div>

              <div className="cs-hero-head">
                <p className="cs-eyebrow cs-in" style={order(1)}>
                  [ Case study ]
                </p>
                <h1 id="cs-title" className="cs-title cs-in" style={order(2)}>
                  Top One Launchpad
                </h1>
                <p className="cs-eyebrow cs-hero-tags cs-in" style={order(3)}>
                  Launch landing page · Webflow development · 2026
                </p>
                <span aria-hidden="true" className="cs-hero-num cs-in" style={order(3)}>
                  03”
                </span>
              </div>

              <div className="cs-hero-body">
                <p className="cs-lead cs-in" style={order(4)}>
                  The landing page for Launch Pad, Top One Trader's new home for testing account types. A space-themed page with a
                  parallax starfield, a pricing slider into checkout and a custom loader, built in about two days.
                </p>
                <div className="cs-hero-side cs-in" style={order(5)}>
                  <dl className="cs-meta">
                    <div>
                      <dt className="cs-meta-label">Client</dt>
                      <dd className="cs-meta-value">Top One Trader</dd>
                    </div>
                    <div>
                      <dt className="cs-meta-label">Turnaround</dt>
                      <dd className="cs-meta-value">~2 days</dd>
                    </div>
                    <div>
                      <dt className="cs-meta-label">My role</dt>
                      <dd className="cs-meta-value">Webflow development</dd>
                    </div>
                    <div>
                      <dt className="cs-meta-label">Launched</dt>
                      <dd className="cs-meta-value">September 2026</dd>
                    </div>
                  </dl>
                  <a href={LIVE_URL} target="_blank" rel="noopener" aria-label="Visit live page (opens in new tab)"
                    data-cursor="view"
                    data-cursor-label="Visit"
                    className="cs-button"
                  >
                    Visit live page <ArrowUpRight />
                  </a>
                </div>
              </div>

              <div className="cs-browser cs-in" style={order(6)}>
                <div aria-hidden="true" className="cs-browser-bar">
                  <span className="cs-browser-dots">
                    <span />
                    <span />
                    <span />
                  </span>
                  <span className="cs-browser-url">toponetrader.com/launchpad</span>
                </div>
                <div className="cs-media cs-browser-screen">
                  <img
                    src={`${IMG}/launchpad-hero-desktop.avif`}
                    width={2490}
                    height={1476}
                    alt="Top One Launchpad hero"
                    decoding="async"
                    fetchPriority="high"
                    className="cs-media-img"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Overview */}
          <section aria-labelledby="cs-overview" className="cs-section">
            <div className="cs-container cs-overview">
              <div data-reveal>
                <p className="cs-eyebrow">[ Overview ]</p>
                <h2 id="cs-overview" className="cs-h2 cs-h2-sm">
                  The launch.
                </h2>
              </div>
              <div>
                <p data-reveal className="cs-lead cs-lead-lg">
                  Top One Trader announced Launch Pad in September 2026, for its third anniversary. The first release was X-DAILY: a
                  one-step challenge from $5K to $100K with daily payouts, capped at 500 accounts. It needed its own page, and it
                  needed it fast.
                </p>
                <ol className="cs-cards">
                  {OVERVIEW.map((c, i) => (
                    <li key={c.title} data-reveal className="cs-card">
                      <span className="cs-card-num">{String(i + 1).padStart(2, '0')}</span>
                      <h3 className="cs-card-title">{c.title}</h3>
                      <p className="cs-card-text">{c.text}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          {/* Turnaround */}
          <section aria-labelledby="cs-turnaround" className="cs-section">
            <div className="cs-container">
              <div data-reveal className="cs-turnaround">
                <div className="cs-turnaround-head">
                  <div>
                    <p className="cs-eyebrow">[ Turnaround ]</p>
                    <h2 id="cs-turnaround" className="cs-h2">
                      Brief to live in <span className="cs-accent">two days</span>.
                    </h2>
                  </div>
                  <span className="cs-turnaround-time">
                    <span className="cs-sr">About 48 hours</span>
                    <span aria-hidden="true" className="cs-count-sizer">
                      ~48h
                    </span>
                    <span aria-hidden="true" className="cs-count-value">
                      ~48h
                    </span>
                  </span>
                </div>
                <ol className="cs-steps">
                  {STEPS.map((s, i) => (
                    <li key={s.title} className="cs-step">
                      <span aria-hidden="true" className="cs-step-bar">
                        <span className="cs-step-fill" />
                      </span>
                      <span className="cs-step-time">Step {String(i + 1).padStart(2, '0')}</span>
                      <span className="cs-step-title">{s.title}</span>
                      <span className="cs-step-text">{s.text}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          {/* Showcase */}
          <section aria-labelledby="cs-showcase" className="cs-section">
            <div className="cs-container">
              <p data-reveal className="cs-eyebrow">
                [ Showcase ]
              </p>
              <div data-reveal className="cs-showcase-head">
                <h2 id="cs-showcase" className="cs-h2">
                  Up close.
                </h2>
                <p className="cs-showcase-note">Offers, pricing and the mobile build.</p>
              </div>
              <div className="cs-showcase">
                <figure data-reveal className="cs-figure">
                  <div className="cs-media cs-media-box cs-showcase-shot">
                    <img
                      src={`${IMG}/launchpad-offers.avif`}
                      width={2490}
                      height={1476}
                      alt="Top One Launchpad offer cards"
                      decoding="async"
                      loading="lazy"
                      className="cs-media-img cs-media-img-center"
                    />
                  </div>
                  <figcaption className="cs-caption">Three launch cards, two still classified</figcaption>
                </figure>
                <figure data-reveal className="cs-figure">
                  <div className="cs-media cs-media-box cs-showcase-shot">
                    <img
                      src={`${IMG}/launchpad-pricing-desktop.avif`}
                      width={2490}
                      height={1476}
                      alt="X-DAILY pricing on desktop"
                      decoding="async"
                      loading="lazy"
                      className="cs-media-img cs-media-img-center"
                    />
                  </div>
                  <figcaption className="cs-caption">X-DAILY rules, price and payout days</figcaption>
                </figure>
              </div>
              <div className="cs-phones">
                {PHONES.map((p) => (
                  <div key={p.src} data-reveal className="cs-media cs-phone">
                    <img
                      src={p.src}
                      width={p.width}
                      height={p.height}
                      alt={p.alt}
                      decoding="async"
                      loading="lazy"
                      className="cs-media-img"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Next project */}
          <section aria-labelledby="cs-next" className="cs-section cs-next-section">
            <div className="cs-container">
              <div data-reveal className="cs-next-top">
                <a href="/work/sabila-labs" className="cs-back">
                  <ArrowLeft />
                  Sabila Labs
                </a>
                <span className="cs-eyebrow">[ Next project ]</span>
              </div>
              <a href="/work/top-one-trader" data-cursor="view" className="cs-next">
                <div data-reveal className="cs-next-text">
                  <p className="cs-eyebrow">01 · Prop trading firm · 2026</p>
                  <h2 id="cs-next" className="cs-next-title">
                    Top One Trader
                  </h2>
                  <span className="cs-next-link">
                    View case study
                    <span aria-hidden="true" className="cs-next-circle">
                      <ArrowRight size={18} />
                    </span>
                  </span>
                </div>
                <div data-reveal className="cs-media cs-media-box cs-next-cover">
                  <img
                    src="/images/top-one-trader/www.toponetrader.com_.avif"
                    width={2490}
                    height={1476}
                    alt="Top One Trader homepage"
                    decoding="async"
                    loading="lazy"
                    className="cs-media-img"
                  />
                </div>
              </a>
            </div>
          </section>

          <Cta />
        </main>
        <Footer />
      </div>
    </>
  )
}
