import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Seo from '../seo/Seo'
import { CALENDLY } from '../seo/site'
import Cta from '../sections/Cta'
import Footer from '../sections/Footer'
import nav from '../sections/Hero.module.css'
import s from './SabilaLabs.module.css'

// Case-study classes (cs-*) are in the DOM as written, plus their scoped CSS Module class for the styles.
const cs = (name: string) => `${name} ${s[name]}`

gsap.registerPlugin(ScrollTrigger)

// Hero items (.cs-in) fade up on load in CSS, one after another: --d is the item's place in that order.
const order = (d: number) => ({ '--d': d }) as CSSProperties

// Scroll reveals, same as the other case studies. Everything starts visible (prerendered HTML, no JS, reduced
// motion); only with motion allowed are [data-reveal] items hidden and faded up as they come 15% into view:
// 300ms, 45ms (15%) apart. The cards' own CSS transition is switched off while GSAP moves them.
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

// Same links as the homepage menu, as absolute paths so they lead back to the homepage sections.
const MENU_LINKS = [
  { label: 'Work', href: '/#work' },
  { label: 'Services', href: '/#services' },
  { label: 'Contact', href: '/#contact' },
]

const META = [
  { label: 'Client', value: 'Sabila Labs' },
  { label: 'Product', value: 'Prism, powered by Gladys' },
  { label: 'My role', value: 'Design & development' },
  { label: 'Based in', value: 'Palo Alto, CA' },
]

// The project name, as set in the page's main heading. The "Visit" button reuses it.
const PROJECT_NAME = 'Sabila Labs'

const BRIEF = [
  {
    title: 'What they needed',
    text: 'A brand and a site from zero: something that explains an AI product to skincare teams in seconds and turns visits into booked demos.',
  },
  {
    title: 'The challenge',
    text: 'Make a technical product feel premium and beauty-native, clear without sounding clinical, and never drifting into medical claims.',
  },
  {
    title: 'My role',
    text: 'End to end: logo, Figma design, Webflow build, animations, optimization, SEO, QA and ongoing updates.',
  },
]

// The process, in order.
const PROCESS = [
  {
    title: 'Client briefing',
    text: 'Talking with the team about what they needed and wanted: their goals, their audience and the references they liked.',
  },
  {
    title: 'Design in Figma',
    text: 'The brief turned into the design: layouts for every page and breakpoint, and a clear visual direction.',
  },
  {
    title: 'Webflow development',
    text: 'Built in Webflow, responsive across all devices, with the CMS and interactions set up.',
  },
  {
    title: 'QA, optimization & launch',
    text: 'Testing, performance optimization, SEO and a final polish on the animations, then live.',
  },
]

// Sabila Labs' own fonts and brand colors, from the live site's CSS (sabilalabs.ai: Webflow WebFont.load + :root variables).
// Only the "Aa" glyphs are loaded, for the type specimens.
const SPECIMEN_FONTS = 'https://fonts.googleapis.com/css2?family=Bodoni+Moda&family=DM+Sans:wght@700&text=Aa&display=swap'
const PALETTE = ['#2BD2BD', '#091628', '#5A6B7F', '#FFFFFF']

const IMG = '/images/sabila-labs'

type Img = { src: string; width: number; height: number; alt: string }

const HERO_IMG: Img = { src: '/images/prism-sabila.jpg', width: 1600, height: 971, alt: 'Sabila Labs home page' }
const LOGO_LIGHT: Img = { src: `${IMG}/logo-black-white.svg`, width: 2520, height: 2488, alt: 'Sabila Labs logo on light background' }
const LOGO_DARK: Img = { src: `${IMG}/logo-teal-black.svg`, width: 2522, height: 2488, alt: 'Sabila Labs logo on dark background' }
const PLATFORM_IMG: Img = { src: `${IMG}/platform-desktop.avif`, width: 2490, height: 1476, alt: 'Sabila Labs Platform section on desktop' }
const NEXT_IMG: Img = { src: '/images/top-one-launchpad/launchpad-hero-desktop.avif', width: 2490, height: 1476, alt: 'Top One Launchpad home page' }

const PHONES: Img[] = [
  { src: `${IMG}/sabila-labs-hero.avif`, width: 948, height: 1600, alt: 'Sabila Labs on mobile: hero' },
  { src: `${IMG}/sabila-labs-platform.avif`, width: 830, height: 1600, alt: 'Sabila Labs on mobile: how it works' },
  { src: `${IMG}/sabila-labs-cta.avif`, width: 830, height: 1600, alt: 'Sabila Labs on mobile: book a demo' },
]

const SCORES = [
  { label: 'Performance', score: 99 },
  { label: 'Accessibility', score: 96 },
  { label: 'Best practices', score: 100 },
  { label: 'SEO', score: 100 },
]

const pad = (k: number) => (k < 10 ? '0' : '') + k

// Ring: r 46 in a 104 box, 5px stroke; the accent arc covers score% of the circle, from 12 o'clock.
const RING_R = 46
const RING_C = 2 * Math.PI * RING_R
const ringOffset = (value: number) => (RING_C * (100 - value)) / 100

/**
 * PageSpeed rings. The HTML always holds the final scores, so they show as-is without JavaScript or with
 * reduced motion. Otherwise the rings are set to 0 and count up (number + arc together) once, when the list
 * comes into view: same trigger and easing as the ~48h count on the Top One Launchpad case study, with a
 * slight stagger between rings.
 */
function ScoreRings() {
  const listRef = useRef<HTMLUListElement>(null)
  const numRefs = useRef<(HTMLSpanElement | null)[]>([])
  const arcRefs = useRef<(SVGCircleElement | null)[]>([])

  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return

    const set = (k: number, value: number) => {
      const num = numRefs.current[k]
      const arc = arcRefs.current[k]
      if (num) num.textContent = String(Math.round(value))
      if (arc) arc.style.strokeDashoffset = String(ringOffset(value))
    }

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const values = SCORES.map(() => ({ v: 0 }))
      values.forEach((_, k) => set(k, 0))
      gsap.to(values, {
        v: (k: number) => SCORES[k].score,
        duration: 1.7,
        ease: 'power2.out',
        stagger: 0.12,
        scrollTrigger: { trigger: list, start: 'top 85%', once: true },
        onUpdate: () => values.forEach((n, k) => set(k, n.v)),
      })
      return () => SCORES.forEach((r, k) => set(k, r.score))
    })
    return () => mm.revert()
  }, [])

  return (
    <ul ref={listRef} className={s.rings}>
      {SCORES.map((r, k) => (
        <li key={r.label} className={s.ring}>
          <span className={s.ringDial}>
            <svg aria-hidden="true" width="104" height="104" viewBox="0 0 104 104" fill="none">
              <circle cx="52" cy="52" r={RING_R} stroke="#262626" strokeWidth="5" />
              <circle
                ref={(el) => {
                  arcRefs.current[k] = el
                }}
                cx="52"
                cy="52"
                r={RING_R}
                stroke="#2a45f5"
                strokeWidth="5"
                strokeDasharray={RING_C}
                strokeDashoffset={ringOffset(r.score)}
                transform="rotate(-90 52 52)"
              />
            </svg>
            {/* The counting digits are hidden from screen readers; they read the final score instead */}
            <span
              ref={(el) => {
                numRefs.current[k] = el
              }}
              aria-hidden="true"
              className={s.ringScore}
            >
              {r.score}
            </span>
            <span className="sr-only">{r.score}</span>
          </span>
          <span className={s.ringLabel}>{r.label}</span>
        </li>
      ))}
    </ul>
  )
}

/** The homepage header nav (src/sections/Hero.tsx): same markup, classes and menu behaviour. */
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

/** Lazy, async-decoded image; `priority` (the hero) loads eagerly with high fetch priority instead. */
function Pic({ img, className, priority = false }: { img: Img; className: string; priority?: boolean }) {
  return (
    <img
      src={img.src}
      width={img.width}
      height={img.height}
      alt={img.alt}
      decoding="async"
      {...(priority ? { fetchPriority: 'high' as const } : { loading: 'lazy' as const })}
      className={className}
    />
  )
}

/** Media slot: a framed box holding one image. `reveal` fades it up on scroll. */
function Media({ className = '', reveal = false, children }: { className?: string; reveal?: boolean; children: ReactNode }) {
  return (
    <div data-reveal={reveal || undefined} className={`${cs('cs-media')} ${className}`}>
      {children}
    </div>
  )
}

function SectionHead({ eyebrow, id, title, side, className = '' }: { eyebrow: string; id: string; title: ReactNode; side?: string; className?: string }) {
  return (
    <div data-reveal className={`${s.head} ${className}`}>
      <div>
        <div className={cs('cs-eyebrow')}>{eyebrow}</div>
        <h2 id={id} className={cs('cs-h2')}>
          {title}
        </h2>
      </div>
      {side && <p className={s.side}>{side}</p>}
    </div>
  )
}

export default function SabilaLabs() {
  const mainRef = useRef<HTMLElement>(null)
  useScrollReveal(mainRef)

  return (
    <>
      <Seo
        title="Sabila Labs Case Study | Benjamin Rahmanović, Webflow Expert"
        description="The launch site for Prism, Sabila Labs' skin-intelligence layer for Shopify skincare brands. Logo, Figma design, Webflow build, animation and SEO: one person, from a blank file to live."
        path="/work/sabila-labs"
      />
      <div id="top" className={s.page}>
        <header>
          <SiteNav />
        </header>

        <main ref={mainRef}>
          {/* Hero */}
          <section aria-labelledby="cs-title" className={`${cs('cs-hero')} ${cs('cs-section')}`}>
            <div className={s.wrap}>
              <div className={`${s.topRow} ${cs('cs-in')}`} style={order(0)}>
                <a href="/#work" className={s.back}>
                  <ArrowLeft />
                  All work
                </a>
                <span className={s.counter}>Case study 02 / 03</span>
              </div>

              <div className={s.titleRow}>
                <div>
                  <div className={`${cs('cs-eyebrow')} ${cs('cs-in')}`} style={order(1)}>
                    [ Case study ]
                  </div>
                  <h1 id="cs-title" className={`${cs('cs-title')} ${cs('cs-in')}`} style={order(2)}>
                    {PROJECT_NAME}
                  </h1>
                  <div className={`${s.kicker} ${cs('cs-in')}`} style={order(3)}>
                    AI skincare startup · Design, brand &amp; Webflow
                  </div>
                </div>
                <div aria-hidden="true" className={`${s.bigNum} ${cs('cs-in')}`} style={order(3)}>
                  02”
                </div>
              </div>

              <div className={s.intro}>
                <p className={`${cs('cs-lead')} ${cs('cs-in')}`} style={order(4)}>
                  The launch site for Prism, Sabila Labs' skin-intelligence layer for Shopify skincare brands. Logo, Figma design, Webflow build,
                  animation and SEO: one person, from a blank file to live.
                </p>
                <div className={cs('cs-in')} style={order(5)}>
                  <dl className={cs('cs-meta')}>
                    {META.map((m) => (
                      <div key={m.label}>
                        <dt className={cs('cs-meta-label')}>{m.label}</dt>
                        <dd className={cs('cs-meta-value')}>{m.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <a href="https://www.sabilalabs.ai" target="_blank" rel="noopener" aria-label={`Visit ${PROJECT_NAME} (opens in new tab)`} data-cursor="view" data-cursor-label="Visit" className={s.visit}>
                    Visit {PROJECT_NAME}
                    <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7" />
                      <path d="M8 7h9v9" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className={`${cs('cs-browser')} ${cs('cs-in')}`} style={order(6)}>
                <div className={s.browserBar}>
                  <span aria-hidden="true" className={s.dots}>
                    <span />
                    <span />
                    <span />
                  </span>
                  <span className={s.url}>sabilalabs.ai</span>
                </div>
                <Media className={s.browserBody}>
                  <Pic img={HERO_IMG} className={s.shotImg} priority />
                </Media>
              </div>
            </div>
          </section>

          {/* Overview */}
          <section aria-labelledby="cs-overview" className={cs('cs-section')}>
            <div className={`${s.wrap} ${s.overview}`}>
              <div data-reveal>
                <div className={cs('cs-eyebrow')}>[ Overview ]</div>
                <h2 id="cs-overview" className={`${cs('cs-h2')} ${s.h2Small}`}>
                  The client.
                </h2>
              </div>
              <div>
                <p data-reveal className={s.overviewText}>
                  Sabila Labs is a Palo Alto startup founded in 2025. Its product, Prism, drops into a Shopify storefront as one embed and turns a
                  brand's own catalog into personalized, non-diagnostic skincare guidance, then hands the brand customer insight after checkout.
                </p>
                <div className={s.brief}>
                  {BRIEF.map((b, k) => (
                    <div key={b.title} data-reveal className={s.briefItem}>
                      <div className={s.briefNum}>{pad(k + 1)}</div>
                      <h3 className={s.briefTitle}>{b.title}</h3>
                      <p className={s.briefText}>{b.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Scope of work */}
          <section aria-labelledby="cs-scope" className={cs('cs-section')}>
            <div className={s.wrap}>
              <SectionHead
                eyebrow="[ Process ]"
                id="cs-scope"
                title={
                  <>
                    From blank file to <span className={s.accent}>live site</span>.
                  </>
                }
                side="No agency, no handoff. Every step designed and built by me."
              />
              <ol className={s.scope}>
                {PROCESS.map((c, k) => (
                  <li key={c.title} data-reveal className={`${cs('cs-card')} ${s.scopeCard}`}>
                    <span className={cs('cs-card-num')}>{pad(k + 1)}</span>
                    <div>
                      <h3 className={s.scopeTitle}>{c.title}</h3>
                      <p className={s.scopeText}>{c.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Identity */}
          <section aria-labelledby="cs-identity" className={cs('cs-section')}>
            <div className={s.wrap}>
              <SectionHead eyebrow="[ Identity ]" id="cs-identity" title="A mark, a palette, a voice." className={s.headIdentity} />
              <div className={s.identity}>
                <div className={s.identityCol}>
                  <Media className={`${s.logo} ${s.logoLight}`} reveal>
                    <Pic img={LOGO_LIGHT} className={s.logoImg} />
                  </Media>
                  <Media className={`${s.logo} ${s.logoDark}`} reveal>
                    <Pic img={LOGO_DARK} className={s.logoImg} />
                  </Media>
                </div>
                <div className={s.identityCol}>
                  <div data-reveal className={`${cs('cs-card')} ${s.typo}`}>
                    <link rel="stylesheet" href={SPECIMEN_FONTS} precedence="default" />
                    <div className={s.cardLabel}>Typography</div>
                    <div className={s.typoRow}>
                      <div>
                        <div aria-hidden="true" className={s.typoSerif}>
                          Aa
                        </div>
                        <div className={s.typoName}>Bodoni Moda</div>
                      </div>
                      <div>
                        <div aria-hidden="true" className={s.typoSans}>
                          Aa
                        </div>
                        <div className={s.typoName}>DM Sans</div>
                      </div>
                    </div>
                  </div>
                  <div data-reveal className={`${cs('cs-card')} ${s.palette}`}>
                    <div className={s.cardLabel}>Palette</div>
                    <ul className={s.swatches}>
                      {PALETTE.map((hex) => (
                        <li key={hex}>
                          <span aria-hidden="true" className={s.swatch} style={{ background: hex }} />
                          <span className={s.hex}>{hex}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Showcase */}
          <section aria-labelledby="cs-showcase" className={cs('cs-section')}>
            <div className={s.wrap}>
              <SectionHead
                eyebrow="[ Showcase ]"
                id="cs-showcase"
                title="Up close."
                side="Key sections and the mobile build."
                className={s.headShowcase}
              />
              <figure data-reveal className={s.shot}>
                <Media className={s.shotMedia}>
                  <Pic img={PLATFORM_IMG} className={s.shotImg} />
                </Media>
                <figcaption className={s.caption}>Platform section on desktop, with pixel-art icons</figcaption>
              </figure>
              <div className={s.phones}>
                {PHONES.map((p) => (
                  <div key={p.src} data-reveal className={cs('cs-phone')}>
                    <Pic img={p} className={s.shotImg} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Performance */}
          <section aria-labelledby="cs-performance" className={cs('cs-section')}>
            <div className={s.wrap}>
              <div data-reveal className={s.perf}>
                <div>
                  <div className={cs('cs-eyebrow')}>[ Performance ]</div>
                  <h2 id="cs-performance" className={`${cs('cs-h2')} ${s.perfH2}`}>
                    Fast, <span className={s.accent}>without trying</span>.
                  </h2>
                  <p className={s.perfNote}>Google PageSpeed Insights, measured on the live site.</p>
                </div>
                <ScoreRings />
              </div>
            </div>
          </section>

          {/* Next project */}
          <section aria-labelledby="cs-next-title" className={`${cs('cs-next')} ${cs('cs-section')}`}>
            <div className={s.wrap}>
              <div data-reveal className={s.nextBar}>
                <a href="/work/top-one-trader" className={s.back}>
                  <ArrowLeft />
                  Top One Trader
                </a>
                <span className={cs('cs-eyebrow')}>[ Next project ]</span>
              </div>
              <a href="/work/top-one-launchpad" data-cursor="view" className={s.nextLink}>
                <div data-reveal>
                  <div className={s.kicker}>03 · Launch landing page · 2026</div>
                  <h2 id="cs-next-title" className={s.nextTitle}>
                    Top One Launchpad
                  </h2>
                  <span className={s.nextCta}>
                    View case study
                    <span aria-hidden="true" className={s.nextArrow}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </span>
                </div>
                <Media className={s.wide} reveal>
                  <Pic img={NEXT_IMG} className={s.shotImg} />
                </Media>
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
