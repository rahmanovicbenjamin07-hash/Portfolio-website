import { useCallback, useEffect, useRef, useState } from 'react'
import Nav from './Nav'
import site from '../../data/site'
import './Hero.css'
import PixelText, { pixelTextDuration } from '../PixelText'

// Hero h1 lines (PixelText block build). The first starts 200ms after mount.
const HERO_LINE_1 = 'I design and build websites'
const HERO_LINE_2 = 'in Webflow\nand React.'
const HERO_DELAY = 200

// "Now working on" feed: the top row is running, the two below are done. Every 2800 ms the list moves one task down.
// The full process, in order: plan → design → build → test → optimize → launch. `verb` replaces "Running" on the live row.
// Keep names ≤ 16 characters and verbs ≤ 9 so the row never overflows the 16em box.
const TASKS = [
  { name: 'Sitemap', verb: 'Planning' },
  { name: 'Wireframes', verb: 'Sketching' },
  { name: 'Homepage design', verb: 'Designing' },
  { name: 'Design system', verb: 'Designing' },
  { name: 'Mobile layouts', verb: 'Designing' },
  { name: 'Prototype', verb: 'Linking' },
  { name: 'Webflow build', verb: 'Building' },
  { name: 'CMS collections', verb: 'Building' },
  { name: 'Interactions', verb: 'Animating' },
  { name: 'React components', verb: 'Coding' },
  { name: 'API integration', verb: 'Coding' },
  { name: 'Unit tests', verb: 'Testing' },
  { name: 'Responsive QA', verb: 'Testing' },
  { name: 'Cross-browser QA', verb: 'Testing' },
  { name: 'Accessibility', verb: 'Auditing' },
  { name: 'SEO optimization', verb: 'Tuning' },
  { name: 'Meta + schema', verb: 'Tagging' },
  { name: 'Page speed 100', verb: 'Tuning' },
  { name: 'Analytics', verb: 'Tracking' },
  { name: 'Final QA', verb: 'Checking' },
  { name: 'Deploy', verb: 'Shipping' },
]

// Pixel arrow on the "Let's talk" button (same 8 × 7 grid as the reference markup).
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

// The six falling leaves already in the scene (.l1 – .l6).
const LEAVES = [1, 2, 3, 4, 5, 6]

// At most 5 leaf batches (12 leaves each) fall at the same time. A batch is cleared 3.5 s after its click: the
// slowest leaf takes 3.4 s, so it has always landed (and faded out) by then, and the slot frees up quickly.
const MAX_BATCHES = 5
const BATCH_MS = 3500

type Drop = { id: number; batch: number; x: number; y: number; img: string; duration: number }
type Pop = { id: number; x: number; y: number }

// Scene interactions (design-reference/steps/01-hero-interactions.md, v2): drop leaves from the crown, pop a falling leaf,
// wake the dog. The tree itself never moves. Positions are in scene units (hero-bg.png is 256 wide, --u = scene width / 256).
// Every timer is cleared on unmount.
function useSceneInteractions() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const timers = useRef(new Set<number>())
  const nextId = useRef(0)
  const batchesRef = useRef(0) // leaf batches currently falling
  const dogAwakeRef = useRef(false)
  const [drops, setDrops] = useState<Drop[]>([])
  const [pops, setPops] = useState<Pop[]>([])
  const [gone, setGone] = useState<ReadonlySet<number>>(new Set())
  const [dogAwake, setDogAwake] = useState(false)

  useEffect(() => {
    const pending = timers.current
    return () => {
      pending.forEach((t) => clearTimeout(t))
      pending.clear()
    }
  }, [])

  const later = useCallback((fn: () => void, ms: number) => {
    const t = window.setTimeout(() => {
      timers.current.delete(t)
      fn()
    }, ms)
    timers.current.add(t)
  }, [])

  // 12 leaves fall from the crown on every click. Up to MAX_BATCHES batches can fall at once; a click past that is
  // ignored until the oldest batch has landed and is cleared.
  const dropLeaves = useCallback(() => {
    if (batchesRef.current >= MAX_BATCHES) return
    batchesRef.current++
    const batch = nextId.current++
    const batchDrops: Drop[] = Array.from({ length: 12 }, (_, k) => ({
      id: nextId.current++,
      batch,
      x: 140 + Math.random() * 100,
      y: 14 + Math.random() * 34,
      img: `/pixel/leaf-${(k % 4) + 1}.png`,
      // All 12 start falling at once (no delay, so none waits in the air); each falls at its own speed, 2–3.4 s,
      // so every one has landed before the batch is cleared.
      duration: 2 + Math.random() * 1.4,
    }))
    setDrops((d) => [...d, ...batchDrops])
    later(() => {
      batchesRef.current--
      setDrops((d) => d.filter((drop) => drop.batch !== batch))
    }, BATCH_MS)
  }, [later])

  const popLeaf = useCallback(
    (i: number, el: HTMLElement) => {
      const scene = sceneRef.current
      if (scene) {
        const s = scene.getBoundingClientRect()
        const r = el.getBoundingClientRect()
        const pop = { id: nextId.current++, x: r.left + r.width / 2 - s.left, y: r.top + r.height / 2 - s.top }
        setPops((p) => [...p, pop])
        later(() => setPops((p) => p.filter((q) => q.id !== pop.id)), 650)
      }
      setGone((g) => new Set(g).add(i))
      later(() => setGone((g) => {
        const next = new Set(g)
        next.delete(i)
        return next
      }), 5000)
      dropLeaves()
    },
    [later, dropLeaves],
  )

  const wakeDog = useCallback(() => {
    if (dogAwakeRef.current) return
    dogAwakeRef.current = true
    setDogAwake(true)
    later(() => {
      dogAwakeRef.current = false
      setDogAwake(false)
    }, 3600)
  }, [later])

  return { sceneRef, drops, pops, gone, dogAwake, dropLeaves, popLeaf, wakeDog }
}

export default function Hero() {
  const [heroRef, onScreen] = useOnScreen<HTMLElement>()
  const { sceneRef, drops, pops, gone, dogAwake, dropLeaves, popLeaf, wakeDog } = useSceneInteractions()
  const tick = useTick(onScreen)
  const n = TASKS.length
  // p-a / p-b swap the keyframe names, so the push-in animation restarts on every tick.
  const phase = tick % 2 ? 'p-a' : 'p-b'
  const rows = [0, 1, 2].map((i) => ({ ...TASKS[(((tick - i) % n) + n) % n], running: i === 0 }))

  return (
    // hero-paused (off screen) freezes every CSS loop in the scene and the feed; see Hero.css.
    <section ref={heroRef} className={onScreen ? 'hero' : 'hero hero-paused'}>
      <div className="stage">
        <div className="scene" ref={sceneRef}>
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
          {LEAVES.map((i) => (
            <div
              key={i}
              className={`px leaf l${i}${gone.has(i) ? ' gone' : ''}`}
              aria-hidden="true"
              onClick={(e) => popLeaf(i, e.currentTarget)}
            ></div>
          ))}
          <div className="px steam" aria-hidden="true"></div>
          <div className="px bunny" aria-hidden="true"></div>
          <div className="px grass" aria-hidden="true"></div>
          <div className="px dissolve" aria-hidden="true"></div>
          {/* Interactions: hit areas, the dog's Zzz / wake-up, dropped leaves and leaf bursts. */}
          {/* data-cursor-ignore: the pixel cursor draws no frame / crack here, the click only drops leaves. */}
          <button type="button" className="tree-hit" aria-label="Drop some leaves" data-cursor-ignore onClick={dropLeaves}></button>
          <button type="button" className="trunk-hit" aria-label="Drop some leaves" data-cursor-ignore onClick={dropLeaves}></button>
          {/* data-cursor-no-hold: the corner frame stays on hover, but holding doesn't crack / break the dog. */}
          <button type="button" className="dog-hit" aria-label="Wake up the dog" data-cursor-no-hold onClick={wakeDog}></button>
          {dogAwake ? (
            <>
              <span className="dog-awake" aria-hidden="true"></span>
              <span className="dog-bang" aria-hidden="true">!</span>
              <span className="dog-woof" aria-hidden="true">Woof!</span>
            </>
          ) : (
            <span className="zzz" aria-hidden="true"><i>z</i><i>z</i><i>Z</i></span>
          )}
          {drops.map((d) => (
            <span
              key={d.id}
              className="px leaf drop"
              style={{ left: `calc(${d.x} * var(--u))`, top: `calc(${d.y} * var(--u))`, backgroundImage: `url(${d.img})`, animationDuration: `${d.duration}s` }}
            ></span>
          ))}
          {pops.map((p) => (
            <span key={p.id} className="leaf-pop" style={{ left: `${p.x}px`, top: `${p.y}px` }}>
              <i></i><i></i><i></i><i></i><i></i><i></i>
            </span>
          ))}
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
                  {row.running && <span className="tstate">{row.verb}</span>}
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
          {/* Main call to action: book a call (site.letsTalkUrl, same link as the nav's "Let's talk"). */}
          <a href={site.letsTalkUrl} className="btn btn-primary" {...(/^https?:\/\//.test(site.letsTalkUrl) ? { target: '_blank', rel: 'noopener' } : {})}>
            <PixelText text="Let's talk" trigger="hover" />{' '}
            <svg viewBox="0 0 8 7" shapeRendering="crispEdges" fill="#ffffff" aria-hidden="true">
              {ARROW.flatMap((line, y) =>
                [...line].map((c, x) => (c === 'X' ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1"></rect> : null)),
              )}
            </svg>
          </a>
          <a href="#work" className="btn"><PixelText text="See my work" trigger="hover" /></a>
        </div>
      </div>
    </section>
  )
}
