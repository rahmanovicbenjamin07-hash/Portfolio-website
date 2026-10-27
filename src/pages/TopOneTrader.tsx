import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Seo from '../seo/Seo'
import { CALENDLY } from '../seo/site'
import Cta from '../sections/Cta'
import Footer from '../sections/Footer'
import nav from '../sections/Hero.module.css'
import styles from './TopOneTrader.module.css'

// Case study: Top One Trader (/work/top-one-trader).
// The cs-* class names are styled in TopOneTrader.module.css, scoped under styles.page.

gsap.registerPlugin(ScrollTrigger)

// Scroll reveals, same as the Top One Launchpad case study. Everything starts visible (prerendered HTML, no JS,
// reduced motion); only with motion allowed are [data-reveal] items hidden and faded up as they come 15% into
// view: 300ms, 45ms (15%) apart. The cards' own CSS transition is switched off while GSAP moves them.
function useScrollReveal(root: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const el = root.current
    if (!el) return
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const items = gsap.utils.toArray<HTMLElement>('[data-reveal]', el)
      gsap.set(items, { opacity: 0, y: 16, transition: 'none' })
      ScrollTrigger.batch(items, {
        start: 'top 85%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
            stagger: 0.045,
            clearProps: 'opacity,transform,transition',
          }),
      })
    })
    return () => mm.revert()
  }, [root])
}

// Hero items (.cs-in) fade up on load in CSS, one after another: --d is the item's place in that order.
const order = (d: number) => ({ '--d': d }) as CSSProperties

// Same links as the homepage menu, as absolute paths so they work from this page.
const MENU_LINKS = [
  { label: 'Work', href: '/#work' },
  { label: 'Services', href: '/#services' },
  { label: 'Contact', href: '/#contact' },
]

const META = [
  { label: 'Client', value: 'Top One Trader' },
  { label: 'Founder & CEO', value: 'Matt Morris' },
  { label: 'My role', value: 'Webflow developer' },
  { label: 'Platform', value: 'Webflow' },
]

const OVERVIEW = [
  {
    title: 'What they wanted',
    text: 'A site that sells as fast as the business moves: new challenge types, launches like Top One 2.0, and promo codes that change week to week.',
  },
  {
    title: 'The challenge',
    text: 'A live, high-traffic site where every offer is time-sensitive. Changes have to ship quickly without breaking pricing, banners or checkout links.',
  },
  {
    title: 'My role',
    text: 'Ongoing Webflow development: building new pages, reworking existing ones, running a split test and keeping content, video and fixes moving.',
  },
]

// The project name, as set in the page's main heading. The "Visit" button reuses it.
const PROJECT_NAME = 'Top One Trader'

const SHIPPED = [
  {
    title: 'New pages',
    text: 'Campaign and product pages built from scratch, including Launch Pad, the NOVA challenge, the Battle for the Belt competition and its prize-wheel and mystery-box promos.',
  },
  {
    title: 'Ongoing updates',
    text: 'Home, loyalty, affiliate and challenge pages kept current, with banners, promo codes, pricing, copy and videos updated for every new offer and launch.',
  },
  {
    title: 'Split test',
    text: 'A second version of a key page, built to test against the original with real traffic.',
  },
  {
    title: 'Fixes & QA',
    text: 'Responsive bugs, broken links and layout issues tracked down and fixed on desktop and mobile.',
  },
]

// Real pixel sizes go in width/height so the browser reserves the right box before the image loads.
// alignLeft: crop from the right only, for shots whose content starts at the left edge.
type Img = {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
  alignLeft?: boolean
}

const IMG_DIR = '/images/top-one-trader'

const VARIANTS: { name: string; role: string; accent?: boolean; img: Img }[] = [
  {
    name: 'Variant A',
    role: 'Control',
    img: {
      src: `${IMG_DIR}/split-a.avif`,
      alt: 'Variant A of the Top One Trader home page hero, with a Trustpilot rating line',
      width: 2490,
      height: 1476,
    },
  },
  {
    name: 'Variant B',
    role: 'Challenger',
    accent: true,
    img: {
      src: `${IMG_DIR}/split-b.avif`,
      alt: 'Variant B of the Top One Trader home page hero, with a Prop Firm Match badge and a Nova offer bar',
      width: 2490,
      height: 1476,
    },
  },
]

const PHONES: Img[] = [
  {
    src: `${IMG_DIR}/mobile-hero.avif`,
    alt: 'Top One Trader home page hero on mobile',
    width: 1206,
    height: 2043,
  },
  {
    // The file name has a space: "mobile-challanges (1).avif"
    src: `${IMG_DIR}/mobile-challanges%20(1).avif`,
    alt: 'X-DAILY Launchpad offer on mobile',
    width: 826,
    height: 1600,
  },
  {
    src: `${IMG_DIR}/mobile-pricing.avif`,
    alt: 'Account configuration table on mobile',
    width: 826,
    height: 1600,
  },
]

const HERO_IMG: Img = {
  src: `${IMG_DIR}/www.toponetrader.com_.avif`,
  alt: 'Top One Trader home page',
  width: 2490,
  height: 1476,
  priority: true,
}

const COVER_IMG: Img = {
  src: `${IMG_DIR}/www.sabilalabs.ai_.avif`,
  alt: 'Sabila Labs home page',
  width: 2490,
  height: 1476,
  alignLeft: true,
}

const pad = (n: number) => String(n).padStart(2, '0')

function ArrowLeft() {
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5" />
      <path d="M11 6l-6 6 6 6" />
    </svg>
  )
}

// The homepage nav (Hero.tsx), with its own styles: logo, menu toggle + dropdown, "Book a call".
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
        {/* Same link as the header button, which is hidden on mobile */}
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

function Shot({ img }: { img: Img }) {
  return (
    <img
      src={img.src}
      alt={img.alt}
      width={img.width}
      height={img.height}
      decoding="async"
      {...(img.priority ? { fetchPriority: 'high' as const } : { loading: 'lazy' as const })}
      className={`cs-img${img.alignLeft ? ' cs-img-left' : ''}`}
    />
  )
}

function Media({ img, className = '', reveal = false }: { img: Img; className?: string; reveal?: boolean }) {
  return (
    <div data-reveal={reveal || undefined} className={`cs-media ${className}`}>
      <Shot img={img} />
    </div>
  )
}

function SectionHead({ eyebrow, id, title, aside }: { eyebrow: string; id: string; title: ReactNode; aside?: string }) {
  return (
    <div data-reveal className="cs-head">
      <div>
        <p className="cs-eyebrow">{eyebrow}</p>
        <h2 id={id} className="cs-h2">
          {title}
        </h2>
      </div>
      {aside && <p className="cs-aside">{aside}</p>}
    </div>
  )
}

export default function TopOneTrader() {
  const mainRef = useRef<HTMLElement>(null)
  useScrollReveal(mainRef)

  return (
    <>
      <Seo
        title="Top One Trader Case Study | Benjamin Rahmanović, Webflow Expert"
        description="The main site of a prop trading firm that funds traders on its own capital: a dark, high-contrast home page built around funded-account offers, a video hero and live promo banners."
        path="/work/top-one-trader"
      />
      <div id="top" className={styles.page}>
        <header>
          <SiteNav />
        </header>

        <main ref={mainRef}>
          {/* Hero: title, summary, project facts, hero shot */}
          <section aria-labelledby="cs-title" className="cs-section cs-hero">
            <div className="cs-container">
              <div className="cs-topbar cs-in" style={order(0)}>
                <a href="/#work" className="cs-back">
                  <ArrowLeft />
                  All work
                </a>
                <p className="cs-eyebrow cs-count">Case study 01 / 03</p>
              </div>

              <div className="cs-intro">
                <p className="cs-eyebrow cs-intro-eyebrow cs-in" style={order(1)}>[ Case study ]</p>
                <h1 id="cs-title" className="cs-title cs-in" style={order(2)}>
                  {PROJECT_NAME}
                </h1>
                <p className="cs-eyebrow cs-intro-sub cs-in" style={order(3)}>Prop trading firm · Webflow development · 2026</p>
                <span aria-hidden="true" className="cs-bignum cs-in" style={order(3)}>
                  01”
                </span>
              </div>

              <div className="cs-summary">
                <p className="cs-lead cs-in" style={order(4)}>
                  The main site of a prop trading firm that funds traders on its own capital. A dark, high-contrast home page built
                  around funded-account offers, a video hero and live promo banners, and a site that has to keep up with every
                  launch.
                </p>
                <div className="cs-facts cs-in" style={order(5)}>
                  <dl className="cs-meta">
                    {META.map((m) => (
                      <div key={m.label}>
                        <dt className="cs-meta-label">{m.label}</dt>
                        <dd className="cs-meta-value">{m.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <a href="https://toponetrader.com" target="_blank" rel="noopener" aria-label={`Visit ${PROJECT_NAME} (opens in new tab)`} data-cursor="view" data-cursor-label="Visit" className="cs-visit">
                    Visit {PROJECT_NAME}
                    <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7" />
                      <path d="M8 7h9v9" />
                    </svg>
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
                  <span className="cs-browser-url">toponetrader.com</span>
                </div>
                <div className="cs-browser-view">
                  <Shot img={HERO_IMG} />
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
                  The client.
                </h2>
              </div>
              <div>
                <p data-reveal className="cs-overview-text">
                  Top One Trader is a proprietary trading firm founded in 2023 and led by founder and CEO Matt Morris. It gives traders
                  access to firm capital through one- and two-step challenges and instant-funding accounts, with fast payouts as the
                  headline promise.
                </p>
                <div className="cs-points">
                  {OVERVIEW.map((p, i) => (
                    <div key={p.title} data-reveal className="cs-point">
                      <span className="cs-point-num">{pad(i + 1)}</span>
                      <h3 className="cs-point-title">{p.title}</h3>
                      <p className="cs-point-text">{p.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Scope of work */}
          <section aria-labelledby="cs-shipped" className="cs-section">
            <div className="cs-container">
              <SectionHead
                eyebrow="[ Scope of work ]"
                id="cs-shipped"
                title={
                  <>
                    What I <span className="cs-accent">shipped</span>.
                  </>
                }
                aside="Not a one-off build. An ongoing stream of work on a site that never stops changing."
              />
              <ul className="cs-cards">
                {SHIPPED.map((c, i) => (
                  <li key={c.title} data-reveal className="cs-card">
                    <span aria-hidden="true" className="cs-card-num">
                      {pad(i + 1)}
                    </span>
                    <div>
                      <h3 className="cs-card-title">{c.title}</h3>
                      <p className="cs-card-text">{c.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Split test */}
          <section aria-labelledby="cs-split" className="cs-section">
            <div className="cs-container">
              <SectionHead eyebrow="[ Split test ]" id="cs-split" title="Two versions, one winner." />
              <div className="cs-variants">
                {VARIANTS.map((v) => (
                  <div key={v.name} data-reveal className="cs-variant">
                    <div className="cs-variant-head">
                      <span className={`cs-chip${v.accent ? ' cs-chip-accent' : ''}`}>{v.name}</span>
                      <span className="cs-variant-role">{v.role}</span>
                    </div>
                    <Media img={v.img} className="cs-media-split" />
                  </div>
                ))}
              </div>
              <p data-reveal className="cs-split-text">
                I built a second version of the page so the team could test it against the original with real visitors, then keep
                whichever one sold better.
              </p>
            </div>
          </section>

          {/* Showcase */}
          <section aria-labelledby="cs-showcase" className="cs-section">
            <div className="cs-container">
              <SectionHead
                eyebrow="[ Showcase ]"
                id="cs-showcase"
                title="Up close."
                aside="New pages and the details in between, desktop and mobile."
              />
              <div className="cs-phones">
                {PHONES.map((img) => (
                  <div key={img.src} data-reveal className="cs-phone">
                    <Shot img={img} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Next project */}
          <section aria-labelledby="cs-next-title" className="cs-next">
            <div className="cs-container">
              <div data-reveal className="cs-next-bar">
                <a href="/work/top-one-launchpad" className="cs-back">
                  <ArrowLeft />
                  Top One Launchpad
                </a>
                <p className="cs-eyebrow">[ Next project ]</p>
              </div>
              <a href="/work/sabila-labs" data-cursor="view" className="cs-next-card">
                <div data-reveal className="cs-next-text">
                  <p className="cs-eyebrow cs-next-eyebrow">02 · AI skincare startup · Design & Webflow</p>
                  <h2 id="cs-next-title" className="cs-next-title">
                    Sabila Labs
                  </h2>
                  <span className="cs-next-cta">
                    View case study
                    <span aria-hidden="true" className="cs-next-arrow">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </span>
                </div>
                <Media img={COVER_IMG} className="cs-media-cover" reveal />
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
