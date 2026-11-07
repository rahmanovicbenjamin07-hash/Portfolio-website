import { useEffect, useRef, useState, type RefObject } from 'react'
import { TESTIMONIALS } from '../../data/testimonials'
import './Testimonials.css'

/* Pixel trophy from design-reference/home.html, stored as a grid.
   Each letter is an index into `palette` (a = 0, b = 1, ...), "." is empty.
   Rendered as the same 1x1 <rect>s, in the same order, as the reference. */
const TROPHY = {
  w: 12,
  h: 12,
  palette: ['#E8C547', '#FFF6C8', '#C49634', '#1C2B19'],
  rows: [
    '..aaaaaaaa..',
    'aaabaaaaaaaa',
    'a.abaaaaaa.a',
    'a.aaaaaaaa.a',
    '.aaaaaaaaaa.',
    '..aaaaaaaa..',
    '...aaaaaa...',
    '.....aa.....',
    '.....aa.....',
    '....cccc....',
    '...cccccc...',
    '...dddddd...',
  ],
}

function Trophy() {
  return (
    <span className="trophy" aria-hidden="true">
      <svg className="" viewBox={`0 0 ${TROPHY.w} ${TROPHY.h}`} shapeRendering="crispEdges" aria-hidden="true">
        {TROPHY.rows.flatMap((row, y) =>
          [...row].map((c, x) =>
            c === '.' ? null : (
              <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={TROPHY.palette[c.charCodeAt(0) - 97]} />
            ),
          ),
        )}
      </svg>
    </span>
  )
}

/* Real client reviews from the current site (src/data/testimonials.ts).
   The reference shows three cards; any missing slot keeps the reference placeholder. */
const PLACEHOLDERS = [
  { name: '[Client name]', role: '[Role, Company]', text: '[A short quote from a client about the result: what changed after the new website went live.]' },
  { name: '[Client name]', role: '[Role, Company]', text: '[A quote about what it was like to work together: communication, speed, the feedback loop.]' },
  { name: '[Client name]', role: '[Role, Company]', text: '[A quote about a specific win: more leads, easier editing in Webflow, a faster site.]' },
]
const ITEMS = PLACEHOLDERS.map((p, i) => {
  const t = TESTIMONIALS[i]
  return t ? { name: t.name, role: t.role, text: t.quote } : p
})

/* null until the observer reports, so the prerendered page is never frozen. */
function useInView(ref: RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState<boolean | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [ref])
  return visible
}

/* `ach` = cards shown (0..3). The reference loops 0..7 every 1200 ms; here the cards unlock once, one every
   ACH_STEP ms, the first time the section comes on screen, and then stay shown (no loop, no reset).
   Reduced motion: all three shown, no timer. */
const ACH_STEP = 400
function useAch(visible: boolean | null) {
  const [ach, setAch] = useState(0)
  const [started, setStarted] = useState(false)
  if (visible && !started) setStarted(true)
  useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setAch(3)
      return
    }
    if (!started) return
    const timer = setInterval(() => {
      setAch((v) => {
        if (v >= 2) clearInterval(timer)
        return Math.min(v + 1, 3)
      })
    }, ACH_STEP)
    return () => clearInterval(timer)
  }, [started])
  return ach
}

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null)
  const visible = useInView(ref)
  const achShown = Math.min(useAch(visible), 3)

  return (
    <section
      ref={ref}
      data-paused={visible === false ? '' : undefined}
      id="testimonials"
      aria-labelledby="testimonials-title"
      style={{
        boxSizing: 'border-box',
        width: '100%',
        padding: '96px 0',
        /* 1440px content max-width; the background stays full width */
        paddingInline: 'max(clamp(20px, 6vw, 112px), calc((100% - 1440px) / 2 + 112px))',
        background: '#ffffff',
        fontFamily: 'Inter, system-ui, sans-serif',
        color: '#1F2A2E',
      }}
    >
      <div className="c2grid">
        <div className="c2left">
          <p className="px-label">
            <i></i>04 — Kind words
          </p>
          <h2
            id="testimonials-title"
            style={{
              margin: '16px 0 0',
              maxWidth: 760,
              fontFamily: "'Inter Tight', Inter, sans-serif",
              fontSize: 'clamp(32px, 3.3vw, 48px)',
              lineHeight: 1.08,
              fontWeight: 500,
              letterSpacing: '-0.02em',
              color: '#0E1B26',
            }}
          >
            Testimonials <span style={{ color: '#4A6070' }}>— what clients say about working with me.</span>
          </h2>
          <p className="aintro">
            Every finished project unlocks something new for the client. Here's what they said when theirs went live.
          </p>
          <div className="prog">
            <Trophy />
            <span>
              <span className="plab">Achievements · {achShown}/3 unlocked</span>
              <span className="segs">
                {[0, 1, 2].map((i) => (
                  <i key={i} className={i < achShown ? 'on' : ''}></i>
                ))}
              </span>
            </span>
          </div>
        </div>
        <div className="stack">
          {ITEMS.map((a, i) => (
            <figure key={i} className={'ach' + (i < achShown ? ' on' : '')} style={{ margin: 0 }}>
              <Trophy />
              <div>
                <span className="alab">Achievement unlocked</span>
                <blockquote className="aq" style={{ margin: '8px 0 0' }}>
                  {a.text}
                </blockquote>
                <figcaption className="aby">
                  <span style={{ whiteSpace: 'nowrap' }}>{a.name} ·</span> {a.role}
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
