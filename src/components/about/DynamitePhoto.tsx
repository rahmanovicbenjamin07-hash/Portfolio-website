import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties, KeyboardEvent, PointerEvent } from 'react'
import PixelSprite from './PixelSprite'
import { DYNAMITE, SPARK } from './sprites'

// The dynamite photo reveal, ported from the <script> of the approved about.html (hit / startHold / stopHold):
// hold the button to burn the fuse, one pixel every 240 ms (7 stages); a quick press burns one. Stage 7 explodes
// and shows the photo. Releasing stops the fuse where it is. CSS: "about: dynamite photo reveal" in AboutHero.css.

const PHOTO = { src: '/images/about/me.webp', alt: 'Photo of Benjamin Rahmanović in a navy waistcoat and pink tie', width: 688, height: 860 }
// Fuse pixels from the top (unburnt end) down to the stick, in the stick's 16 × 24 grid.
const FUSE: [number, number][] = [[11, 0], [11, 1], [10, 2], [9, 3], [9, 4], [8, 5], [8, 6]]
const STAGES = 7
const STEP_MS = 240
// The stick is drawn at 176 × 264 px: 11 px per pixel (the spark's left/top).
const CELL = 11

// The blast: a Minecraft-style cloud of grey pixel smoke that fills the whole photo card (CSS: .boom / @keyframes puff
// in AboutHero.css). A 10 × 12 grid of cloud chunks covering the card + 70 small specks, generated once with a fixed
// seed so it looks the same every time. Puffs further from the stick (50%, 44%) start later, so the smoke spreads from
// the middle to the edges. x/y are percent of the card; tx/ty are px. Each pair is [main grey, checker grey]; the
// darkest pair is only used by some specks.
const GREYS = [['#FFFFFF', '#F4F4F4'], ['#F0F0F0', '#FFFFFF'], ['#E1E1E1', '#F2F2F2'], ['#CDCDCD', '#E2E2E2'], ['#B4B4B4', '#CBCBCB'], ['#979797', '#B1B1B1'], ['#6A6A6A', '#878787']]

type Puff = { x: string; y: string; tx: number; ty: number; s: number; c1: string; c2: string; sc: string; du: string; de: string }

function makeSmoke(): Puff[] {
  let seed = 23
  const r = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296
    return seed / 4294967296
  }
  const q = (v: number) => Math.round(v / 4) * 4
  const out: Puff[] = []
  const C = 10
  const R = 12 // grid of cloud chunks covering the card
  for (let j = 0; j < R; j++)
    for (let i = 0; i < C; i++) {
      const x = ((i + 0.5 + (r() - 0.5) * 0.8) / C) * 100
      const y = ((j + 0.5 + (r() - 0.5) * 0.8) / R) * 100
      const dx = x - 50
      const dy = y - 44
      const dist = Math.min(1, Math.hypot(dx, dy * 0.8) / 60)
      const gi = Math.floor(Math.pow(r(), 1.7) * 6)
      out.push({
        x: x.toFixed(1),
        y: y.toFixed(1),
        tx: q(dx * 0.9 + (r() - 0.5) * 30),
        ty: q(dy * 0.6 - 20 - r() * 30),
        s: q(36 + r() * 36),
        c1: GREYS[gi][0],
        c2: GREYS[gi][1],
        sc: (1.2 + r() * 0.5).toFixed(2),
        du: (1.1 + r() * 0.6).toFixed(2),
        de: (dist * 0.32 + r() * 0.06).toFixed(2),
      })
    }
  for (let k = 0; k < 70; k++) {
    // small specks
    const x = r() * 100
    const y = r() * 100
    const dx = x - 50
    const dy = y - 44
    const dist = Math.min(1, Math.hypot(dx, dy * 0.8) / 60)
    let gi = Math.floor(Math.pow(r(), 1.7) * 6)
    if (r() < 0.35) gi = 6
    out.push({
      x: x.toFixed(1),
      y: y.toFixed(1),
      tx: q(dx * 1.4 + (r() - 0.5) * 40),
      ty: q(dy * 1.0 - 30 - r() * 40),
      s: q(4 + r() * 8),
      c1: GREYS[gi][0],
      c2: GREYS[gi][1],
      sc: '1',
      du: (0.8 + r() * 0.5).toFixed(2),
      de: (dist * 0.32 + r() * 0.08).toFixed(2),
    })
  }
  return out
}
const SMOKE = makeSmoke()
const SMOKE_STYLES = SMOKE.map(
  (p) =>
    ({
      '--x': p.x + '%',
      '--y': p.y + '%',
      '--tx': p.tx + 'px',
      '--ty': p.ty + 'px',
      '--s': p.s + 'px',
      '--c1': p.c1,
      '--c2': p.c2,
      '--sc': p.sc,
      '--du': p.du + 's',
      '--de': p.de + 's',
    }) as CSSProperties,
)
// Reveal the photo once the card is fully covered; drop the smoke once every puff has faded (max delay + duration ≈ 2.1 s).
const REVEAL_MS = 650
const SMOKE_MS = 2100
// The "found" label's CSS animation (@keyframes found) runs 3.4 s.
const FOUND_MS = 3400

const reducedMotion = () => typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function hintFor(stage: number) {
  if (stage === 0) return 'Hold to light the fuse'
  if (stage < 4) return 'Keep holding…'
  if (stage < 6) return 'Getting hot…'
  return "It's gonna blow!"
}

export default function DynamitePhoto() {
  const [stage, setStage] = useState(0)
  const [holding, setHolding] = useState(false)
  const [open, setOpen] = useState(false)
  const [shake, setShake] = useState(false)
  const [boom, setBoom] = useState(false)
  const [found, setFound] = useState(false)

  const stageRef = useRef(0)
  const doneRef = useRef(false)
  const holdRef = useRef<number | null>(null)
  const timersRef = useRef<number[]>([])

  const later = (fn: () => void, ms: number) => {
    timersRef.current.push(window.setTimeout(fn, ms))
  }
  const clearHold = () => {
    if (holdRef.current !== null) window.clearInterval(holdRef.current)
    holdRef.current = null
  }

  const hit = useCallback(() => {
    if (doneRef.current) return
    const reduce = reducedMotion()
    const st = reduce ? STAGES : Math.min(STAGES, stageRef.current + 1)
    stageRef.current = st
    setStage(st)
    if (st < STAGES) return
    doneRef.current = true
    clearHold()
    setHolding(false)
    if (reduce) {
      // Reduced motion: no smoke, no shake, the photo just appears.
      setOpen(true)
      setFound(true)
      later(() => setFound(false), FOUND_MS)
      return
    }
    setBoom(true)
    setShake(true)
    later(() => {
      setOpen(true)
      setShake(false)
      setFound(true)
    }, REVEAL_MS)
    later(() => setBoom(false), SMOKE_MS)
    // The "found" label fades out with its 3.4 s animation; then it leaves the DOM.
    later(() => setFound(false), REVEAL_MS + FOUND_MS)
  }, [])

  const startHold = useCallback(() => {
    if (holdRef.current !== null || doneRef.current) return
    setHolding(true)
    hit()
    if (!doneRef.current) holdRef.current = window.setInterval(hit, STEP_MS)
  }, [hit])

  const stopHold = useCallback(() => {
    clearHold()
    setHolding(false)
  }, [])

  useEffect(
    () => () => {
      clearHold()
      timersRef.current.forEach((t) => window.clearTimeout(t))
      timersRef.current = []
    },
    [],
  )

  const onPointerDown = (e: PointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0) return
    e.preventDefault()
    startHold()
  }
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      startHold()
    }
  }

  const lit = (stage > 0 || holding) && !open
  const [tipX, tipY] = FUSE[Math.min(stage, STAGES - 1)]
  const lv = !(stage > 0 || holding) ? 0 : stage <= 2 ? 1 : stage <= 4 ? 2 : 3

  return (
    <div className={'photo' + (open ? ' open' : '') + (shake ? ' shake' : '')}>
      <img className="me" src={PHOTO.src} alt={PHOTO.alt} width={PHOTO.width} height={PHOTO.height} fetchPriority="high" decoding="async" />
      {!open && (
        <button
          type="button"
          className="tnt"
          aria-label="Hold to light the fuse and reveal my photo"
          // The pixel cursor keeps its hover frame here but doesn't draw its own hold-to-crack over the fuse.
          data-cursor-no-hold
          onPointerDown={onPointerDown}
          onPointerUp={stopHold}
          onPointerLeave={stopHold}
          onPointerCancel={stopHold}
          onKeyDown={onKeyDown}
          onKeyUp={stopHold}
          onBlur={stopHold}
          onContextMenu={(e) => e.preventDefault()}
        >
          <span className={'dyn' + (lv ? ' lv' + lv : '')}>
            <span className="dyn-in">
              <svg viewBox="0 0 16 24" shapeRendering="crispEdges" aria-hidden="true">
                {DYNAMITE.rows.flatMap((row, y) =>
                  [...row].map((c, x) => (c === '.' ? null : <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={DYNAMITE.palette[c]} />)),
                )}
                {FUSE.map(([x, y], k) => (
                  <rect key={`f${k}`} x={x} y={y} width="1" height="1" fill="#3B2A1A" opacity={k >= stage ? 1 : 0} />
                ))}
              </svg>
              <span className="flash"></span>
              {lit && (
                <span className="spark" style={{ left: tipX * CELL, top: tipY * CELL }}>
                  <PixelSprite sprite={SPARK} />
                </span>
              )}
            </span>
          </span>
          <span className="tnt-hint">{hintFor(stage)}</span>
        </button>
      )}
      {boom && (
        <span className="boom" aria-hidden="true">
          {SMOKE_STYLES.map((style, i) => (
            <i key={i} style={style} />
          ))}
        </span>
      )}
      {found && <span className="found">Secret found: the real me</span>}
    </div>
  )
}
