import { useEffect, useRef, useState, type RefObject } from 'react'
import { CASE_STEPS, LOOP_ART, STEP_ART, type Pixels } from '../../data/process'
import type { Project } from '../../types/project'
import { PixelSvg } from '../home/Process'
import './CaseProcess.css'

// Section 03 — How it came together. Markup copied from design-reference/case-study.html
// (<section aria-labelledby="pm-title">). The five tile illustrations and the loop arrow are the same art
// as the home Process section (src/data/process.ts).
// TODO(agent 1): .wrap / .sec / .h2 come from src/styles/pages.css, imported by the page (not here).

/* finish flag on level 5 */
const FLAG: Pixels = {
  w: 6,
  h: 10,
  palette: ['#36502F', '#E0705C'],
  rows: ['abbbbb', 'abbbbb', 'abbbbb', 'abbbb.', 'a.....', 'a.....', 'a.....', 'a.....', 'a.....', 'a.....'],
}

/* the walking character: two frames, legs apart (f1) and together (f2) */
const WALKER_HEAD = ['...aaaaa....', '..aaaaaaa...', '..abbbbba...', '..bbcbcbb...', '..bbbbbbb...', '...bbbbb....']
const WALKER_BODY = ['..ddddddd...', '.dddededdd..', '.ddddddddd..', '.bdddddddb..', '..ddddddd...']
const WALKER_PALETTE = ['#6B4226', '#F2C9A0', '#1F2A2E', '#146EF5', '#0B4FB8', '#3A3F4A', '#5A3A22']
const WALK_1: Pixels = {
  w: 12,
  h: 15,
  palette: WALKER_PALETTE,
  rows: [...WALKER_HEAD, ...WALKER_BODY, '..fff.fff...', '..ff...ff...', '.ff.....ff..', '.gg.....gg..'],
}
const WALK_2: Pixels = {
  w: 12,
  h: 15,
  palette: WALKER_PALETTE,
  rows: [...WALKER_HEAD, ...WALKER_BODY, '...fffff....', '...ff.ff....', '...ff.ff....', '...gg.gg....'],
}

/* null until the observer reports, so the prerendered page is never frozen (same as home Process). */
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

/* `step` timer from the reference: 0..8 every 1500 ms, levels shown = min(step, 5).
   Runs only while the section is on screen and starts over from level 1 each time it comes back.
   Reduced motion: all five levels done, no timer. */
function useStep(visible: boolean | null) {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setStep(5)
      return
    }
    if (!visible) return
    setStep(0)
    const timer = setInterval(() => setStep((v) => (v >= 8 ? 0 : v + 1)), 1500)
    return () => clearInterval(timer)
  }, [visible])
  return step
}

// The steps are the same for every project; `project` is accepted so the page can pass it like the other sections.
export default function CaseProcess(_props: { project?: Project }) {
  const ref = useRef<HTMLElement>(null)
  const shown = Math.min(useStep(useInView(ref)), 5)
  const n = CASE_STEPS.length

  return (
    <section ref={ref} className="wrap sec" aria-labelledby="pm-title">
      <p className="px-label">
        <i></i>03 — How it came together
      </p>
      <h2 id="pm-title" className="h2">
        Five steps <span>from first call to launch.</span>
      </h2>
      <div className={shown === 2 ? 'map looping' : 'map'}>
        <span className="loop-label">↺ We tweak it together until we both agree</span>
        <PixelSvg art={LOOP_ART} className="loop" />
        <ol className="levels">
          {CASE_STEPS.map((s, i) => {
            const last = i === n - 1
            const lCls = 'half l' + (i === 0 ? ' off' : i < shown ? ' on' : '')
            const rCls = 'half r' + (last ? ' off' : i + 1 < shown ? ' on' : '')
            const cls = 'lv' + (i < shown ? ' done' : '') + (i === shown - 1 ? ' cur' : '')
            return (
              <li key={s.key} className={cls}>
                <div className="tile">
                  <span className="badge">{i + 1}</span>
                  <PixelSvg art={STEP_ART[s.key]} className="art" />
                  {last && <PixelSvg art={FLAG} className="flag" />}
                </div>
                <div className="road" aria-hidden="true">
                  <span className={lCls}></span>
                  <span className={rCls}></span>
                  {shown > 0 && i === shown - 1 && (
                    <span className={'walker' + (last ? ' party' : '')}>
                      <PixelSvg art={WALK_1} className="f1" />
                      <PixelSvg art={WALK_2} className="f2" />
                    </span>
                  )}
                </div>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
