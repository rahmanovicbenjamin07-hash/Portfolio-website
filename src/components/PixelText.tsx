import { createElement, Fragment, useEffect, useRef, useState, type ReactNode } from 'react'
import './PixelText.css'

// Pixel "block build" text.
//
// trigger "load" (hero h1): each character goes through 3 hard frames, left to right, `stagger` ms apart:
//   1. hidden (`frame` ms)  2. a solid #146EF5 block the size of the character cell (`frame` ms)  3. the real letter.
//   Spaces skip straight to frame 3. Frames are switched from requestAnimationFrame (no transitions, no easing).
//   - Server / first render: the plain text, so the prerendered HTML has the real words (SEO, LCP, no-JS).
//   - On the client each character becomes a cell: the real letter (transparent until frame 3) keeps the exact width
//     and line breaks; the block is an aria-hidden overlay. The element is labelled with the real text.
//   - Reduced motion: plain text, no animation.
//
// trigger "hover" (button labels): no letter animation. The label is a plain span (.pxt-hover); any .btn containing
//   one gets the stepped fill wipe, label colour switch and arrow nudge on hover and keyboard focus (PixelText.css).

const STAGGER = 28
const FRAME = 60

type Props = {
  text: string
  as?: 'h1' | 'h2' | 'p' | 'span'
  trigger?: 'load' | 'hover'
  /** "load": wait this long after mount before the first character starts, in ms. */
  delay?: number
  /** "load": time between two characters starting, in ms. */
  stagger?: number
  /** "load": length of the hidden frame and of the block frame, in ms. */
  frame?: number
  className?: string
}

/** Time a "load" run takes from its start (after `delay`) until the last character shows its letter, in ms. */
export function pixelTextDuration(text: string, stagger = STAGGER, frame = FRAME): number {
  return (Math.max(1, Array.from(text).length) - 1) * stagger + frame * 2
}

// Plain text, with "\n" as <br>
const plain = (text: string): ReactNode =>
  text.includes('\n')
    ? text.split('\n').map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {line}
        </Fragment>
      ))
    : text

export default function PixelText(props: Props) {
  if (props.trigger === 'hover') {
    const { text, as = 'span', className } = props
    return createElement(as, { className: className ? `pxt-hover ${className}` : 'pxt-hover' }, plain(text))
  }
  return <PixelBuild {...props} />
}

function PixelBuild({ text, as = 'span', delay = 0, stagger = STAGGER, frame = FRAME, className }: Props) {
  const [cells, setCells] = useState(false)
  const rootRef = useRef<HTMLElement>(null)
  const cellRefs = useRef<(HTMLSpanElement | null)[]>([])
  const chars = Array.from(text)

  // Client only, motion allowed: switch to cells (all hidden) and run
  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) setCells(true)
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!cells || !root) return
    const els = cellRefs.current

    // The block stands on the baseline: measure the font's descent (cell bottom - baseline) with a probe
    const first = els.find(Boolean)
    if (first) {
      const probe = document.createElement('span')
      probe.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline'
      first.appendChild(probe)
      const descent = first.getBoundingClientRect().bottom - probe.getBoundingClientRect().top
      probe.remove()
      root.style.setProperty('--pxt-desc', `${descent}px`)
    }

    let start = 0
    let raf = 0
    const tick = (now: number) => {
      if (!start) start = now
      const t = now - start
      let pending = false
      els.forEach((cell, i) => {
        if (!cell) return
        const blockAt = delay + i * stagger + frame // after its hidden frame
        const f = t < blockAt ? '' : t < blockAt + frame ? 'b' : 'l'
        if (cell.dataset.f !== f) cell.dataset.f = f
        if (f !== 'l') pending = true
      })
      if (pending) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      // Interrupted (unmount): show the real text
      els.forEach((cell) => {
        if (cell) cell.dataset.f = 'l'
      })
    }
    // text: a changed text (e.g. a hot reload while editing) gets new cells, so the build runs again for them
  }, [cells, delay, stagger, frame, text])

  const content = !cells
    ? plain(text)
    : chars.map((c, i) => {
        if (c === '\n') return <br key={i} />
        // Spaces (and non-breaking spaces) have no block frame: they stay plain text
        if (c === ' ' || c === ' ') return c
        return (
          <span
            key={i}
            className="pxt-c"
            ref={(el) => {
              cellRefs.current[i] = el
            }}
          >
            <span className="pxt-r">{c}</span>
            <span className="pxt-b" aria-hidden="true"></span>
          </span>
        )
      })

  return createElement(as, { ref: rootRef, className, 'aria-label': text.replace(/\n/g, ' ') }, content)
}
