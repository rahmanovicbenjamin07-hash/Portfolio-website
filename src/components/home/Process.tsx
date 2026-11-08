import { useEffect, useRef, useState, type RefObject } from 'react'
import { PROCESS_CAPTIONS, PROCESS_LINES, PROCESS_ORDER, LOOP_ART, STEP_ART, type Pixels, type StepKey } from '../../data/process'
import './Process.css'

/* Pixel art is stored as grids (see Pixels in src/data/process.ts) and rendered as the
   same 1x1 <rect>s, in the same order, as the reference. Also used by case/CaseProcess.tsx. */
export function PixelSvg({ art, className }: { art: Pixels; className: string }) {
  return (
    <svg className={className} viewBox={`0 0 ${art.w} ${art.h}`} shapeRendering="crispEdges" aria-hidden="true">
      {art.rows.flatMap((row, y) =>
        [...row].map((c, x) =>
          c === '.' ? null : (
            <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={art.palette[c.charCodeAt(0) - 97]} />
          ),
        ),
      )}
    </svg>
  )
}

/* the client's portrait */
const YOU: Pixels = {
  w: 16,
  h: 12,
  palette: ['#1F2A2E', '#2A2A35', '#F2C9A0', '#E0705C', '#F0A04B'],
  rows: [
    '....aaaaaaa.....',
    '...abbbbbbba....',
    '..abbbbbbbbba...',
    '..abcccccccba...',
    '..accacccacca...',
    '..accccccccca...',
    '..acccdddccca...',
    '...accccccca....',
    '....aacccaa.....',
    '..aaeeeeeeeaa...',
    '.aeeeeeeeeeeea..',
    '.aeeeeeeeeeeea..',
  ],
}

/* clockwise "replay" arrow for the button that plays the conversation again */
const REPLAY: Pixels = {
  w: 12,
  h: 12,
  palette: ['#36502F'],
  rows: [
    '......a.....',
    '......aa....',
    '..aaaaaaa...',
    '.aaaaaaaa...',
    '.aa...aa....',
    'aa....a.....',
    'aa........aa',
    'aa........aa',
    '.aa......aa.',
    '.aaa....aaa.',
    '..aaaaaaaa..',
    '...aaaaaa...',
  ],
}

const LINES = PROCESS_LINES
const CAPS = PROCESS_CAPTIONS
const ORDER = PROCESS_ORDER

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

/* pixel "pause" bars, shown over the conversation while it's paused */
const PAUSE: Pixels = {
  w: 8,
  h: 10,
  palette: ['#36502F'],
  rows: Array(10).fill('aaa..aaa'),
}

/* `count` = lines shown (0..8). The reference loops 0..11 every 1500 ms; here the conversation plays once, one
   line every STEP_MS, the first time the section comes on screen, then stays.
   - togglePause: clicking the conversation pauses it (dark overlay + pause icon) and clicking again continues
     from the same line.
   - jumpTo(n): a dot under the screen was clicked: the chat shows exactly n lines and pauses there.
   - replay: the replay button plays it from the start, unpaused.
   Reduced motion: everything shown, no timer, no pause overlay or replay button (Process.css). */
const STEP_MS = 700
function useCount(visible: boolean | null) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const [paused, setPaused] = useState(false)
  if (visible && !started) setStarted(true)
  // One timeout per line: pausing just clears the pending one, so playing again continues where it stopped.
  useEffect(() => {
    if (!started || paused || count >= LINES.length) return
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setCount(LINES.length)
      return
    }
    const timer = setTimeout(() => setCount((v) => Math.min(v + 1, LINES.length)), STEP_MS)
    return () => clearTimeout(timer)
  }, [started, paused, count])
  return {
    count,
    paused,
    togglePause: () => setPaused((p) => !p),
    replay: () => {
      setPaused(false)
      setCount(0)
    },
    jumpTo: (n: number) => {
      setPaused(true)
      setCount(n)
    },
  }
}

/* Lines shown when a step's dot is clicked: everything up to that step's last line ("concept" stops before the
   feedback lines, which belong to no dot of their own). */
function linesThrough(step: (typeof ORDER)[number]) {
  let last = -1
  LINES.forEach((ln, i) => {
    if (ln.key === step) last = i
  })
  return last + 1
}

export default function Process() {
  const ref = useRef<HTMLElement>(null)
  const visible = useInView(ref)
  const { count, paused, togglePause, replay, jumpTo } = useCount(visible)
  const shown = Math.min(count, LINES.length)
  // The screen always follows the chat: its step is the last line shown (a dot click sets the chat to that step).
  const cur: StepKey = shown > 0 ? LINES[shown - 1].key : 'discovery'
  const art = cur === 'feedback' ? 'concept' : cur
  const stepIdx = ORDER.indexOf(art)

  return (
    <section
      ref={ref}
      id="process"
      aria-labelledby="process-title"
      className="p-sky"
      data-paused={visible === false ? '' : undefined}
      style={{
        boxSizing: 'border-box',
        width: '100%',
        padding: '150px 0 260px',
        /* 1440px content max-width; the background stays full width */
        paddingInline: 'max(clamp(20px, 6vw, 112px), calc((100% - 1440px) / 2 + 112px))',
        background: '#C1EEF7',
        fontFamily: 'Inter, system-ui, sans-serif',
        color: '#1F2A2E',
      }}
    >
      <div className="p-skybg" aria-hidden="true">
        <div className="px p-cloud pc1"></div>
        <div className="px p-cloud pc2"></div>
        <div className="px p-cloud pc3"></div>
        <div className="px p-cloud pc4"></div>
        <div className="px p-bird pb1"></div>
        <div className="px p-bird pb2"></div>
        <div className="px p-land"></div>
        <div className="px p-grass"></div>
        <div className="px p-dis p-dis-t"></div>
        <div className="px p-dis p-dis-b"></div>
      </div>
      <div className="p-skyc">
        <p className="px-label">
          <i></i>03 — How I work
        </p>
        <h2
          id="process-title"
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
          Process <span style={{ color: '#146EF5' }}>— five steps from first call to launch.</span>
        </h2>
        <div className="cgrid">
          <div className="pxbox dlg" aria-label="How a project goes, as a conversation">
            {LINES.map((ln, i) => (
              <div key={i} className={'line ' + ln.k + (i < shown ? ' on' : '')}>
                <span className="pt">
                  {/* Decorative: the bubble already names the speaker ("Me · …"). */}
                  {ln.k === 'me' && <img src="/pixel/avatar-me.png" alt="" width={26} height={26} loading="lazy" decoding="async" />}
                  {ln.k !== 'me' && <PixelSvg art={YOU} className="" />}
                </span>
                <div className="bubble">
                  <span className="stp">
                    {ln.who} · {ln.step}
                  </span>
                  <span className="say">{ln.text}</span>
                </div>
              </div>
            ))}
            {/* Pause / play: a transparent button over the whole conversation while it can still play (or is paused).
                Paused: dark overlay with the pixel pause icon; clicking again continues. */}
            {(shown < LINES.length || paused) && (
              <button
                type="button"
                className={paused ? 'dlg-pause is-paused' : 'dlg-pause'}
                onClick={togglePause}
                aria-pressed={paused}
                aria-label={paused ? 'Continue the conversation' : 'Pause the conversation'}
                title={paused ? 'Continue' : 'Pause'}
              >
                {paused && (
                  <span className="dlg-paused-ic">
                    <PixelSvg art={PAUSE} className="" />
                  </span>
                )}
              </button>
            )}
            {/* Also shown while paused part-way, so it can be played again from the start (above the overlay). */}
            {(shown >= LINES.length || paused) && (
              <button type="button" className="replay" onClick={replay} aria-label="Play the conversation again" title="Play again">
                <PixelSvg art={REPLAY} className="" />
              </button>
            )}
          </div>
          <div className="pxbox screen">
            <div className="sbar" aria-hidden="true">
              <i></i>
              <i></i>
              <i></i>
            </div>
            <div className="sart">
              <PixelSvg key={art} art={STEP_ART[art]} className="art" />
              {cur === 'feedback' && <PixelSvg art={LOOP_ART} className="loopbig" />}
            </div>
            <div className="scap">
              <span>{CAPS[cur]}</span>
              <span className="dots">
                {ORDER.map((k, i) => (
                  <button
                    key={k}
                    type="button"
                    className={i <= stepIdx ? 'on' : ''}
                    onClick={() => jumpTo(linesThrough(k))}
                    aria-label={`Show ${CAPS[k]}`}
                    aria-current={k === art ? 'step' : undefined}
                  ></button>
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
