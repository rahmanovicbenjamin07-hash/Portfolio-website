import { useEffect, useRef, useState } from 'react'
import Seo from '../seo/Seo'
import { CALENDLY } from '../seo/site'
import Cta from '../sections/Cta'
import Footer from '../sections/Footer'
import nav from '../sections/Hero.module.css'
import styles from './TopOneLaunchpad.module.css'

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
    text: 'One day. Animation, pricing logic, checkout links and a form integration, all live and tested before the launch went out.',
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

// Empty card for row 01; its new content is still to come.
function FeatureCard() {
  return <div className="cs-media cs-feature-card" />
}

const SIZES = [
  { size: '$5K', payout: '$150' },
  { size: '$10K', payout: '$300' },
  { size: '$25K', payout: '$750' },
  { size: '$50K', payout: '$1,000' },
  { size: '$100K', payout: '$2,000' },
]

function PricingCard() {
  const [active, setActive] = useState(SIZES.length - 1)
  const { size, payout } = SIZES[active]

  return (
    <div className="cs-pricing">
      <div className="cs-pricing-top">
        <span className="cs-pricing-plan">X-DAILY · 1-STEP</span>
        <span className="cs-pricing-tag">Daily payouts</span>
      </div>
      <div className="cs-pricing-label">Account size</div>
      <div className="cs-pricing-size" aria-live="polite">
        {size}
      </div>
      <div aria-hidden="true" className="cs-pricing-track">
        <div className="cs-pricing-fill" style={{ width: `${(active / (SIZES.length - 1)) * 100}%` }} />
      </div>
      <div role="group" aria-label="Account size" className="cs-pricing-pills">
        {SIZES.map((s, i) => (
          <button key={s.size} type="button" aria-pressed={i === active} onClick={() => setActive(i)} className="cs-pricing-pill">
            {s.size}
          </button>
        ))}
      </div>
      <div className="cs-pricing-totals">
        <div>
          <div className="cs-pricing-label">Max payout per request</div>
          <div className="cs-pricing-value" aria-live="polite">
            {payout}
          </div>
        </div>
      </div>
      <a href={LIVE_URL} target="_blank" rel="noopener" aria-label="Get funded (opens in new tab)" className="cs-pricing-cta">
        Get funded <ArrowUpRight />
      </a>
    </div>
  )
}

function LoaderMedia() {
  return (
    <pre className="cs-code">
      <code>
        <span className="cs-code-comment">{'<!-- Code embed -->'}</span>
        {'\n'}
        <span className="cs-code-tag">{'<div'}</span>
        {' class="tl-loader">'}
        <span className="cs-code-tag">{'<span'}</span>
        {' class="tl-loader__bar">'}
        <span className="cs-code-tag">{'</span></div>'}</span>
        {'\n'}
        <span className="cs-code-tag">{'<script>'}</span>
        {"\n  window.addEventListener('load', () =>\n    document.querySelector('.tl-loader').classList.add('is-done'));\n"}
        <span className="cs-code-tag">{'</script>'}</span>
      </code>
    </pre>
  )
}

function FormFlow() {
  return (
    <div className="cs-flow">
      <div className="cs-flow-step">
        <span className="cs-flow-label">Webflow</span>
        <span className="cs-flow-value">Form</span>
      </div>
      <span aria-hidden="true" className="cs-flow-arrow">
        <ArrowRight size={20} />
      </span>
      <div className="cs-flow-step cs-flow-step-accent">
        <span className="cs-flow-label">Automation</span>
        <span className="cs-flow-value">Zapier</span>
      </div>
      <span aria-hidden="true" className="cs-flow-arrow">
        <ArrowRight size={20} />
      </span>
      <div className="cs-flow-step cs-flow-step-end">
        <span className="cs-flow-label">Destination</span>
        <span className="cs-flow-value">Team workflow</span>
      </div>
    </div>
  )
}

const FEATURES = [
  {
    title: 'Parallax starfield & planets',
    text: 'Layers of stars drift at different speeds as you scroll, with planets sitting in the background to give the page depth.',
    media: <FeatureCard />,
  },
  {
    title: 'Pricing slider to checkout',
    text: "Traders pick an account size and the price, payout cap and checkout link update with it. The button hands off to Top One's external checkout with the right product already selected. Try it on the right.",
    media: <PricingCard />,
  },
  {
    title: 'Custom loading animation',
    text: 'A branded loader written as a code embed, so the page opens like a countdown instead of a blank screen.',
    media: <LoaderMedia />,
  },
  {
    title: 'Form integration',
    text: 'The page form sends sign-ups on through Zapier, so leads land where the team already works.',
    media: <FormFlow />,
  },
]

const IMG = '/images/top-one-launchpad'
const LIVE_URL = 'https://www.toponetrader.com/launchpad'

const PHONES = [
  { src: `${IMG}/launchpad-hero-mobile.avif`, width: 944, height: 1600, alt: 'Top One Launchpad on mobile: hero' },
  { src: `${IMG}/launchpad-pricing-mobile.avif`, width: 824, height: 1600, alt: 'Top One Launchpad on mobile: pricing slider' },
  { src: `${IMG}/launchpad-mobile-form.avif`, width: 1206, height: 2317, alt: 'Top One Launchpad on mobile: form' },
]

export default function TopOneLaunchpad() {
  return (
    <>
      <Seo
        title="Top One Launchpad Case Study | Benjamin Rahmanović, Webflow Expert"
        description="The landing page for Launch Pad, Top One Trader's new home for testing account types: a parallax starfield, a pricing slider into checkout and a custom loader, built in Webflow in about a day."
        path="/work/top-one-launchpad"
      />
      <div id="top" className={styles.page}>
        <header>
          <SiteNav />
        </header>

        <main>
          {/* Hero */}
          <section aria-labelledby="cs-title" className="cs-hero cs-section">
            <div className="cs-container">
              <div className="cs-hero-top">
                <a href="/#work" className="cs-back">
                  <ArrowLeft />
                  All work
                </a>
                <span className="cs-eyebrow">Case study 03 / 03</span>
              </div>

              <div className="cs-hero-head">
                <p className="cs-eyebrow">[ Case study ]</p>
                <h1 id="cs-title" className="cs-title">
                  Top One Launchpad
                </h1>
                <p className="cs-eyebrow cs-hero-tags">Launch landing page · Webflow development · 2026</p>
                <span aria-hidden="true" className="cs-hero-num">
                  03”
                </span>
              </div>

              <div className="cs-hero-body">
                <p className="cs-lead">
                  The landing page for Launch Pad, Top One Trader's new home for testing account types. A space-themed page with a
                  parallax starfield, a pricing slider into checkout and a custom loader, built in about a day.
                </p>
                <div className="cs-hero-side">
                  <dl className="cs-meta">
                    <div>
                      <dt className="cs-meta-label">Client</dt>
                      <dd className="cs-meta-value">Top One Trader</dd>
                    </div>
                    <div>
                      <dt className="cs-meta-label">Turnaround</dt>
                      <dd className="cs-meta-value">~1 day</dd>
                    </div>
                    <div>
                      <dt className="cs-meta-label">My role</dt>
                      <dd className="cs-meta-value">Webflow development</dd>
                    </div>
                    <div>
                      <dt className="cs-meta-label">Launched</dt>
                      <dd className="cs-meta-value">October 2026</dd>
                    </div>
                  </dl>
                  <a href={LIVE_URL} target="_blank" rel="noopener" aria-label="Visit live page (opens in new tab)" className="cs-button">
                    Visit live page <ArrowUpRight />
                  </a>
                </div>
              </div>

              <div className="cs-browser">
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
              <div>
                <p className="cs-eyebrow">[ Overview ]</p>
                <h2 id="cs-overview" className="cs-h2 cs-h2-sm">
                  The launch.
                </h2>
              </div>
              <div>
                <p className="cs-lead cs-lead-lg">
                  Top One Trader announced Launch Pad on October 8, 2026, for its third anniversary. The first release was X-DAILY: a
                  one-step challenge from $5K to $100K with daily payouts, capped at 500 accounts. It needed its own page, and it
                  needed it fast.
                </p>
                <ol className="cs-cards">
                  {OVERVIEW.map((c, i) => (
                    <li key={c.title} className="cs-card">
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
              <div className="cs-turnaround">
                <div className="cs-turnaround-head">
                  <div>
                    <p className="cs-eyebrow">[ Turnaround ]</p>
                    <h2 id="cs-turnaround" className="cs-h2">
                      Brief to live in <span className="cs-accent">one day</span>.
                    </h2>
                  </div>
                  <span className="cs-turnaround-time">~24h</span>
                </div>
                <ol className="cs-steps">
                  {STEPS.map((s, i) => (
                    <li key={s.title} className="cs-step">
                      <span className="cs-step-time">Step {String(i + 1).padStart(2, '0')}</span>
                      <span className="cs-step-title">{s.title}</span>
                      <span className="cs-step-text">{s.text}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          {/* What's inside */}
          <section aria-labelledby="cs-inside" className="cs-section">
            <div className="cs-container">
              <p className="cs-eyebrow">[ What's inside ]</p>
              <h2 id="cs-inside" className="cs-h2">
                Four pieces, one launch.
              </h2>
              <div className="cs-features">
                {FEATURES.map((f, i) => (
                  <article key={f.title} className="cs-feature">
                    <div className="cs-feature-text">
                      <span className="cs-card-num cs-feature-num">{String(i + 1).padStart(2, '0')}</span>
                      <h3 className="cs-feature-title">{f.title}</h3>
                      <p className="cs-feature-body">{f.text}</p>
                    </div>
                    <div className="cs-feature-media">{f.media}</div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Showcase */}
          <section aria-labelledby="cs-showcase" className="cs-section">
            <div className="cs-container">
              <p className="cs-eyebrow">[ Showcase ]</p>
              <div className="cs-showcase-head">
                <h2 id="cs-showcase" className="cs-h2">
                  Up close.
                </h2>
                <p className="cs-showcase-note">Offers, pricing and the mobile build.</p>
              </div>
              <div className="cs-showcase">
                <figure className="cs-figure">
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
                <figure className="cs-figure">
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
                  <div key={p.src} className="cs-media cs-phone">
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
              <div className="cs-next-top">
                <a href="/work/sabila-labs" className="cs-back">
                  <ArrowLeft />
                  Sabila Labs
                </a>
                <span className="cs-eyebrow">[ Next project ]</span>
              </div>
              <a href="/work/top-one-trader" className="cs-next">
                <div className="cs-next-text">
                  <p className="cs-eyebrow">01 · Prop trading firm · 2026</p>
                  <h2 id="cs-next" className="cs-next-title">
                    Top One Trader
                  </h2>
                  <span className="cs-next-link">
                    View case study
                    <span aria-hidden="true" className="cs-next-circle">
                      <ArrowRight />
                    </span>
                  </span>
                </div>
                <div className="cs-media cs-media-box cs-next-cover">
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
