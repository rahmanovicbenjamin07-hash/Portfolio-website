import { useEffect, useRef, useState } from 'react'
import Nav from './Nav'
import './Hero.css'
import PixelText, { pixelTextDuration } from '../PixelText'

// Hero h1 lines (PixelText block build). The first starts 200ms after mount.
const HERO_LINE_1 = 'I design and build websites'
const HERO_LINE_2 = 'in Webflow\nand React.'
const HERO_DELAY = 200

// "Now working on" feed: the top row is running, the two below are done. Every 2800 ms the list moves one task down.
const TASKS = [
  'Wireframes',
  'Homepage design',
  'Design system',
  'Webflow build',
  'CMS collections',
  'Interactions',
  'React components',
  'API integration',
  'SEO optimization',
  'Page speed 100',
  'Responsive QA',
  'Deploy',
]

// Pixel arrow on the "See my work" button (same 8 × 7 grid as the reference markup).
const ARROW = ['....X...', '....XX..', 'XXXXXXX.', 'XXXXXXXX', 'XXXXXXX.', '....XX..', '....X...']

// The timer only runs while the hero is on screen.
function useTick(active: boolean) {
  const [tick, setTick] = useState(3)
  useEffect(() => {
    if (!active) return
    // Reduced motion: the feed stays on its first frame, like the reference.
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = setInterval(() => setTick((t) => t + 1), 2800)
    return () => clearInterval(timer)
  }, [active])
  return tick
}

// False while the element is scrolled out of view (always true where IntersectionObserver is missing).
function useOnScreen<T extends Element>() {
  const ref = useRef<T>(null)
  const [onScreen, setOnScreen] = useState(true)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, onScreen] as const
}

export default function Hero() {
  const [heroRef, onScreen] = useOnScreen<HTMLElement>()
  const tick = useTick(onScreen)
  const n = TASKS.length
  // p-a / p-b swap the keyframe names, so the push-in animation restarts on every tick.
  const phase = tick % 2 ? 'p-a' : 'p-b'
  const rows = [0, 1, 2].map((i) => ({ name: TASKS[(((tick - i) % n) + n) % n], running: i === 0 }))

  return (
    // hero-paused (off screen) freezes every CSS loop in the scene and the feed; see Hero.css.
    <section ref={heroRef} className={onScreen ? 'hero' : 'hero hero-paused'}>
      <div className="stage">
        <div className="scene">
          {/* Above the fold: no lazy loading. 256 × 144 is the file's pixel size (scaled up, image-rendering: pixelated). */}
          <img
            className="layer"
            width={256}
            height={144}
            src="/pixel/hero-bg.png"
            alt="Pixel art: me in a blue hoodie, working on a laptop under an oak tree in a sunny meadow, a puppy asleep beside me and a small city on the horizon"
          />
          <div className="px cloud c1" aria-hidden="true"></div>
          <div className="px cloud c2" aria-hidden="true"></div>
          <div className="px cloud c3" aria-hidden="true"></div>
          <img className="layer" src="/pixel/canopy.png" alt="" aria-hidden="true" width={256} height={144} />
          <div className="px bird b1" aria-hidden="true"></div>
          <div className="px bird b2" aria-hidden="true"></div>
          <div className="px leaf l1" aria-hidden="true"></div>
          <div className="px leaf l2" aria-hidden="true"></div>
          <div className="px leaf l3" aria-hidden="true"></div>
          <div className="px leaf l4" aria-hidden="true"></div>
          <div className="px leaf l5" aria-hidden="true"></div>
          <div className="px leaf l6" aria-hidden="true"></div>
          <div className="px steam" aria-hidden="true"></div>
          <div className="px bunny" aria-hidden="true"></div>
          <div className="px grass" aria-hidden="true"></div>
          <div className="px dissolve" aria-hidden="true"></div>
          <div className="tasks" aria-label="What I am working on">
            <div className="feed-head">
              <span className="live"></span>
              <span>Now working on</span>
            </div>
            <svg className="tail" viewBox="0 0 7 4" shapeRendering="crispEdges" aria-hidden="true">
              <rect x="0" y="0" width="1" height="1" fill="#36502F"></rect>
              <rect x="1" y="0" width="5" height="1" fill="#E4ECD6"></rect>
              <rect x="6" y="0" width="1" height="1" fill="#36502F"></rect>
              <rect x="1" y="1" width="1" height="1" fill="#36502F"></rect>
              <rect x="2" y="1" width="3" height="1" fill="#E4ECD6"></rect>
              <rect x="5" y="1" width="1" height="1" fill="#36502F"></rect>
              <rect x="2" y="2" width="1" height="1" fill="#36502F"></rect>
              <rect x="3" y="2" width="1" height="1" fill="#E4ECD6"></rect>
              <rect x="4" y="2" width="1" height="1" fill="#36502F"></rect>
              <rect x="3" y="3" width="1" height="1" fill="#36502F"></rect>
            </svg>
            <div className={`rows ${phase}`}>
              {rows.map((row, i) => (
                // Index keys on purpose: the rows stay in place and the phase class replays their animation.
                <div key={i} className={`row r${i}`}>
                  {row.running ? (
                    <svg className="ic ld" viewBox="0 0 11 11" shapeRendering="crispEdges" aria-hidden="true">
                      <rect x="0" y="4" width="3" height="3"></rect>
                      <rect x="4" y="4" width="3" height="3"></rect>
                      <rect x="8" y="4" width="3" height="3"></rect>
                    </svg>
                  ) : (
                    <svg className="ic" viewBox="0 0 8 8" shapeRendering="crispEdges" aria-hidden="true">
                      <rect x="0" y="0" width="8" height="8" fill="#2E9E4F"></rect>
                      <rect x="1" y="3" width="1" height="1" fill="#ffffff"></rect>
                      <rect x="2" y="4" width="1" height="1" fill="#ffffff"></rect>
                      <rect x="3" y="5" width="1" height="1" fill="#ffffff"></rect>
                      <rect x="4" y="4" width="1" height="1" fill="#ffffff"></rect>
                      <rect x="5" y="3" width="1" height="1" fill="#ffffff"></rect>
                      <rect x="6" y="2" width="1" height="1" fill="#ffffff"></rect>
                      <rect x="1" y="4" width="1" height="1" fill="#ffffff"></rect>
                      <rect x="2" y="5" width="1" height="1" fill="#ffffff"></rect>
                      <rect x="3" y="6" width="1" height="1" fill="#ffffff"></rect>
                      <rect x="4" y="5" width="1" height="1" fill="#ffffff"></rect>
                      <rect x="5" y="4" width="1" height="1" fill="#ffffff"></rect>
                      <rect x="6" y="3" width="1" height="1" fill="#ffffff"></rect>
                    </svg>
                  )}
                  <span className="tname">{row.name}</span>
                  {row.running && <span className="tstate">Running</span>}
                  {row.running && <span className="bar"></span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Nav />

      <div className="copy">
        <p style={{ margin: '0 0 18px', fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 12, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#3D5361' }}>
          Web design · Webflow · React
        </p>
        <h1 style={{ margin: 0, fontFamily: "'Inter Tight', Inter, sans-serif", fontSize: 'clamp(36px, 3.7vw, 56px)', lineHeight: 1.05, fontWeight: 500, letterSpacing: '-0.025em', color: '#0E1B26' }}>
          {/* Block build on load (PixelText): the prerendered HTML has the real text. The second line starts when the first is ~70% built. */}
          <PixelText text={HERO_LINE_1} trigger="load" delay={HERO_DELAY} />{' '}
          <span style={{ color: '#146EF5' }}><PixelText text={HERO_LINE_2} trigger="load" delay={HERO_DELAY + 0.7 * pixelTextDuration(HERO_LINE_1)} /></span>
        </h1>
        {/* px-panel (pixel.css): pixel box behind this line. maxWidth = the old 460px text width + 32px padding. */}
        <p className="hero-sub px-panel" style={{ margin: '20px 0 0', maxWidth: 492, fontSize: 17, lineHeight: 1.55 }}>
          Webflow and React developer for agencies and teams. From the first sketch to a fast, launched site.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginTop: 32 }}>
          <a href="#work" className="btn btn-primary">
            <PixelText text="See my work" trigger="hover" />{' '}
            <svg viewBox="0 0 8 7" shapeRendering="crispEdges" fill="#ffffff" aria-hidden="true">
              {ARROW.flatMap((line, y) =>
                [...line].map((c, x) => (c === 'X' ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1"></rect> : null)),
              )}
            </svg>
          </a>
          <a href="/about" className="btn"><PixelText text="About me" trigger="hover" /></a>
        </div>
      </div>
    </section>
  )
}
