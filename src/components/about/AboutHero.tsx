import { useEffect, useRef, useState } from 'react'
import Nav from '../home/Nav'
import PixelArrow from '../pixel/PixelArrow'
import PixelText from '../PixelText'
import DynamitePhoto from './DynamitePhoto'
import site from '../../data/site'
import { ABOUT_INTRO, ABOUT_STATS } from '../../data/about'
import './AboutHero.css'

// About page hero, copied from the approved design-reference about.html (section.ab-hw): meadow background, the page
// nav, the white intro panel with the "Currently:" role rotator, the dynamite photo reveal (DynamitePhoto.tsx) with the
// "Also me, in pixels" badge, and the three number boxes on the grass, which count up once they scroll into view.
// .wrap and .stats / .stat come from src/styles/pages.css. Intro and stats live in src/data/about.ts.
const external = /^https?:\/\//.test(site.letsTalkUrl)

const ROLES = ['Webflow developer at MWEV Group', 'Freelance web designer & developer', 'React & React Native developer']
const ROLE_MS = 2600
// Count-up: 20 steps of 60 ms (the reference's componentDidMount).
const COUNT_STEPS = 20
const COUNT_MS = 60

const reducedMotion = () => typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// "3+" → 3 and "+": the number counts, the suffix stays.
const STATS = ABOUT_STATS.map((s) => {
  const m = /^(\d+)(.*)$/.exec(s.value)
  return { label: s.label, n: m ? Number(m[1]) : 0, suffix: m ? m[2] : s.value }
})

function useRoleRotator() {
  const [ri, setRi] = useState(0)
  useEffect(() => {
    // As in the reference: no rotation under reduced motion (the first role stays).
    if (reducedMotion()) return
    const t = window.setInterval(() => setRi((i) => (i + 1) % ROLES.length), ROLE_MS)
    return () => window.clearInterval(t)
  }, [])
  return ri
}

// 0 → 1 progress of the count-up. Starts at 1 (final numbers in the prerendered HTML and under reduced motion),
// drops to 0 on mount and counts up once the stats are in view.
function useCountUp() {
  const ref = useRef<HTMLDivElement>(null)
  const [c, setC] = useState(1)
  useEffect(() => {
    const el = ref.current
    if (!el || reducedMotion() || typeof IntersectionObserver === 'undefined') return
    setC(0)
    let timer: number | undefined
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      let k = 0
      timer = window.setInterval(() => {
        k += 1
        setC(Math.min(1, k / COUNT_STEPS))
        if (k >= COUNT_STEPS) window.clearInterval(timer)
      }, COUNT_MS)
    })
    io.observe(el)
    return () => {
      io.disconnect()
      window.clearInterval(timer)
    }
  }, [])
  return { ref, c }
}

export default function AboutHero() {
  const ri = useRoleRotator()
  const { ref: statsRef, c } = useCountUp()
  return (
    <section className="ab-hw" aria-labelledby="ab-title">
      <div className="ab-bg" aria-hidden="true">
        <div className="ab-land"></div>
        <div className="ab-cloud abc1"></div>
        <div className="ab-cloud abc2"></div>
        <div className="ab-grass"></div>
        <div className="ab-dis"></div>
      </div>
      <div className="ab-front">
        <Nav variant="page" current="about" />
        <div className="wrap ab-hero">
          <div className="ab-card">
            <p className="px-label">
              <i></i>About me
            </p>
            {/* ra / rb alternate so the wipe animation restarts on every change. */}
            <p className="role">
              Currently: <span className={ri % 2 ? 'rb' : 'ra'}>{ROLES[ri]}</span>
            </p>
            <h1
              id="ab-title"
              style={{ margin: '18px 0 0', fontFamily: "'Inter Tight', Inter, sans-serif", fontSize: 'clamp(44px, 5vw, 76px)', lineHeight: 1.02, fontWeight: 500, letterSpacing: '-0.03em', color: '#0E1B26' }}
            >
              Hi, I'm Benjamin. <span style={{ color: '#146EF5' }}>I turn ideas into websites and apps.</span>
            </h1>
            <p className="ab-lead">{ABOUT_INTRO}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginTop: 36 }}>
              <a href="/#work" className="btn btn-primary">
                <PixelText text="See my work" trigger="hover" /> <PixelArrow color="#ffffff" />
              </a>
              {/* Same booking link as every other "Let's talk" button (the reference's #calendly is a stand-in). */}
              <a href={site.letsTalkUrl} className="btn btn-dark" {...(external ? { target: '_blank', rel: 'noopener' } : {})}>
                <PixelText text="Let's talk" trigger="hover" />
              </a>
            </div>
          </div>
          <figure className="photo-card" style={{ marginBottom: 0, marginTop: 0 }}>
            <DynamitePhoto />
            <figcaption className="pixme">
              <img src="/pixel/avatar-me.png" alt="The pixel version of me from the homepage" width={56} height={56} decoding="async" />
              <span>Also me, in pixels</span>
            </figcaption>
          </figure>
        </div>
        <div className="wrap">
          <div className="stats" ref={statsRef}>
            {STATS.map((s) => (
              <div key={s.label} className="stat">
                <b>
                  {Math.round(s.n * c)}
                  {s.suffix}
                </b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
