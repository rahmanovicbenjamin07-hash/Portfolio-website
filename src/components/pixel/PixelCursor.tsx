import { useEffect, useRef, useState } from 'react'
import './PixelCursor.css'

// Minecraft-style cursor from design-reference/cursor-demo.html, page-wide on the pixel home page.
// - Crosshair follows the pointer.
// - Selection frame: four corners 10px outside the hovered (or keyboard-focused) target.
// - Burst of particles on every left mousedown.
// - Hold on a target: 7 crack stages every 120 ms, frame shake, a mini burst per stage, a big burst at the end.
// Crosshair and frame are written in one requestAnimationFrame (at most one per frame, no React state per move).
// Scrolling hides the frame at once (on the wheel input itself, before smooth scroll moves the page, and on any
// scroll event); it comes back around whatever is under the pointer 150 ms after the last one. While it is visible,
// every frame re-checks the target's box before paint, so the corners never sit off the target (keyboard scrolling,
// hover lifts, the target resizing).
// Only on hover-capable fine pointers with motion allowed; otherwise it renders nothing and the normal cursor stays.
// Never calls preventDefault: clicks, links and text selection behave as before.

const TARGET = 'a, button, [role="button"], [data-cursor-target]'
const DEVICE_QUERY = '(hover: hover) and (pointer: fine)'
const REDUCED_QUERY = '(prefers-reduced-motion: reduce)'
const PAD = 10
const STAGE_MS = 120
const STAGES = 7
const BURST_MS = 750
const SCROLL_IDLE_MS = 150
const ROOT_CLASS = 'px-cursor-on'

type BurstKind = '' | 'mini' | 'big'

export default function PixelCursor() {
  const [active, setActive] = useState(false)
  const layerRef = useRef<HTMLDivElement>(null)
  const posRef = useRef<HTMLSpanElement>(null)
  const frameRef = useRef<HTMLSpanElement>(null)
  const crackRef = useRef<HTMLSpanElement>(null)
  const crossRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const device = window.matchMedia(DEVICE_QUERY)
    const reduced = window.matchMedia(REDUCED_QUERY)
    const sync = () => setActive(device.matches && !reduced.matches)
    sync()
    device.addEventListener('change', sync)
    reduced.addEventListener('change', sync)
    return () => {
      device.removeEventListener('change', sync)
      reduced.removeEventListener('change', sync)
    }
  }, [])

  useEffect(() => {
    const layer = layerRef.current
    const pos = posRef.current
    const frame = frameRef.current
    const crack = crackRef.current
    const cross = crossRef.current
    if (!active || !layer || !pos || !frame || !crack || !cross) return
    const root = layer.closest<HTMLElement>('.pixel-page')
    if (!root) return
    root.classList.add(ROOT_CLASS)

    // Last pointer position (viewport coordinates)
    let x = 0
    let y = 0
    let inside = false
    let hover: Element | null = null // target under the pointer
    let focused: Element | null = null // keyboard-focused target
    let source: 'pointer' | 'focus' = 'pointer' // whichever moved last wins the frame
    let drawn: Element | null = null // target the frame is currently drawn around
    // Box the frame was last written for, to spot the target moving or resizing
    let lastLeft = 0
    let lastTop = 0
    let lastWidth = 0
    let lastHeight = 0

    // One requestAnimationFrame for everything; these flags say what it has to do
    let raf = 0
    let crossDirty = false
    let frameDirty = false
    let resolveHover = false // look up the target under the still pointer again (content moved)
    let snap = false // the next frame write is the pointer moving to another target: allow the steps() snap

    let scrolling = false // frame (hover and focus) hidden until scrolling stops
    let scrollTimer = 0
    let holdTarget: Element | null = null
    let holdRect: DOMRect | null = null
    let holdTimer = 0
    let stage = 0
    const burstTimers = new Set<number>()

    const targetOf = (el: EventTarget | null): Element | null => {
      if (!(el instanceof Element)) return null
      const t = el.closest(TARGET)
      return t && root.contains(t) ? t : null
    }

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const requestFrame = (pointerMove: boolean) => {
      frameDirty = true
      if (pointerMove) snap = true
      schedule()
    }

    // --- selection frame (viewport coordinates) ---
    const writeFrame = () => {
      const t = scrolling ? null : source === 'focus' ? (focused ?? hover) : (hover ?? focused)
      drawn = t
      if (!t) {
        snap = false
        pos.hidden = true // the next show replays the cxin appear animation
        return
      }
      place(t.getBoundingClientRect())
      // Coming back from display:none replays the cxin appear animation
      pos.hidden = false
    }

    const place = (r: DOMRect) => {
      // Inline "none" for re-measures, "" (the CSS steps() transition) only for pointer moves between targets.
      // Transitions read the after-change style, so this takes effect for this very write.
      pos.style.transition = snap ? '' : 'none'
      snap = false
      lastLeft = r.left
      lastTop = r.top
      lastWidth = r.width
      lastHeight = r.height
      pos.style.transform = `translate3d(${r.left - PAD}px, ${r.top - PAD}px, 0)`
      pos.style.width = `${r.width + PAD * 2}px`
      pos.style.height = `${r.height + PAD * 2}px`
    }

    // Target moved or resized since the last write (by more than half a pixel)?
    const drifted = (r: DOMRect) =>
      Math.abs(r.left - lastLeft) > 0.5 ||
      Math.abs(r.top - lastTop) > 0.5 ||
      Math.abs(r.width - lastWidth) > 0.5 ||
      Math.abs(r.height - lastHeight) > 0.5

    const tick = () => {
      raf = 0
      if (crossDirty) {
        crossDirty = false
        cross.style.transform = `translate3d(${x}px, ${y}px, 0)`
      }
      if (resolveHover) {
        resolveHover = false
        if (inside) {
          const t = targetOf(document.elementFromPoint(x, y))
          if (t !== hover) {
            if (holdTarget && holdTarget !== t) stopHold()
            hover = t
          }
        }
      }
      if (frameDirty) {
        frameDirty = false
        writeFrame()
      } else if (drawn && !pos.hidden) {
        // Nothing asked for a redraw, but the target may have moved on its own: follow it before this paint
        const r = drawn.getBoundingClientRect()
        if (drifted(r)) place(r)
      }
      // Keep checking every frame while the frame is on screen
      if (drawn && !pos.hidden) schedule()
    }

    // --- particles ---
    const burst = (bx: number, by: number, kind: BurstKind) => {
      const b = document.createElement('span')
      b.className = kind ? `cx-burst ${kind}` : 'cx-burst'
      b.style.left = `${bx}px`
      b.style.top = `${by}px`
      b.innerHTML = '<i></i>'.repeat(12)
      layer.appendChild(b)
      const id = window.setTimeout(() => {
        b.remove()
        burstTimers.delete(id)
      }, BURST_MS)
      burstTimers.add(id)
    }

    // --- hold to break ---
    const stopHold = () => {
      window.clearInterval(holdTimer)
      holdTimer = 0
      if (!holdTarget) return
      holdTarget = null
      holdRect = null
      crack.hidden = true
      // As in the demo, the frame plays cxin again when the shake stops
      frame.classList.remove('holding')
    }

    const startHold = (t: Element) => {
      stopHold()
      const r = t.getBoundingClientRect()
      holdTarget = t
      holdRect = r
      stage = 1
      crack.className = 'cx-crack s1'
      crack.style.left = `${r.left}px`
      crack.style.top = `${r.top}px`
      crack.style.width = `${r.width}px`
      crack.style.height = `${r.height}px`
      crack.hidden = false
      frame.classList.add('holding')
      holdTimer = window.setInterval(() => {
        if (stage >= STAGES) {
          const box = holdRect!
          stopHold()
          burst(box.left + box.width / 2, box.top + box.height / 2, 'big')
          return
        }
        stage += 1
        crack.className = `cx-crack s${stage}`
        burst(x, y, 'mini')
      }, STAGE_MS)
    }

    const setHover = (t: Element | null) => {
      if (t === hover) return
      if (holdTarget && holdTarget !== t) stopHold()
      hover = t
      source = 'pointer'
      requestFrame(true)
    }

    // --- events ---
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      x = e.clientX
      y = e.clientY
      if (!inside) {
        inside = true
        cross.hidden = false
      }
      crossDirty = true
      schedule()
    }

    const onOver = (e: PointerEvent) => {
      if (e.pointerType !== 'touch') setHover(targetOf(e.target))
    }

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch' || e.button !== 0) return
      x = e.clientX
      y = e.clientY
      burst(x, y, '')
      const t = targetOf(e.target)
      if (t) startHold(t)
    }

    const onLeaveWindow = () => {
      inside = false
      cross.hidden = true
      stopHold()
      hover = null
      requestFrame(false)
    }

    // Scrolling: hide the frame right away (no waiting for a frame, so not one frame is painted off target) and
    // cancel a hold. Called on wheel input, before smooth scroll moves the page, and on every scroll event (page or
    // any nested container). 150 ms after the last one, find the target under the still pointer and show the frame
    // there again, with its appear animation.
    const onScroll = () => {
      stopHold()
      scrolling = true
      pos.hidden = true
      window.clearTimeout(scrollTimer)
      scrollTimer = window.setTimeout(() => {
        scrolling = false
        resolveHover = true
        requestFrame(false)
      }, SCROLL_IDLE_MS)
    }

    // Window resized: content moved under a still pointer, so look up the target again and re-measure.
    const onResize = () => {
      stopHold()
      resolveHover = true
      requestFrame(false)
    }

    const onFocusIn = (e: FocusEvent) => {
      const el = e.target
      if (!(el instanceof Element)) return
      let keyboard = false
      try {
        keyboard = el.matches(':focus-visible')
      } catch {
        keyboard = false
      }
      focused = keyboard && el.matches(TARGET) && root.contains(el) ? el : null
      if (focused) source = 'focus'
      requestFrame(false)
    }
    const onFocusOut = () => {
      focused = null
      requestFrame(false)
    }

    const html = document.documentElement
    const passive = { passive: true } as const
    const scrollOpts = { passive: true, capture: true } as const
    document.addEventListener('pointermove', onMove, passive)
    document.addEventListener('pointerover', onOver, passive)
    document.addEventListener('pointerdown', onDown, passive)
    document.addEventListener('pointerup', stopHold, passive)
    document.addEventListener('pointercancel', stopHold, passive)
    document.addEventListener('dragstart', stopHold, passive)
    document.addEventListener('focusin', onFocusIn)
    document.addEventListener('focusout', onFocusOut)
    window.addEventListener('wheel', onScroll, scrollOpts)
    window.addEventListener('scroll', onScroll, scrollOpts)
    window.addEventListener('resize', onResize, passive)
    window.addEventListener('blur', onLeaveWindow)
    html.addEventListener('mouseleave', onLeaveWindow)

    return () => {
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('pointerup', stopHold)
      document.removeEventListener('pointercancel', stopHold)
      document.removeEventListener('dragstart', stopHold)
      document.removeEventListener('focusin', onFocusIn)
      document.removeEventListener('focusout', onFocusOut)
      window.removeEventListener('wheel', onScroll, scrollOpts)
      window.removeEventListener('scroll', onScroll, scrollOpts)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('blur', onLeaveWindow)
      html.removeEventListener('mouseleave', onLeaveWindow)
      stopHold()
      cancelAnimationFrame(raf)
      window.clearTimeout(scrollTimer)
      burstTimers.forEach((id) => window.clearTimeout(id))
      layer.querySelectorAll('.cx-burst').forEach((b) => b.remove())
      root.classList.remove(ROOT_CLASS)
    }
  }, [active])

  if (!active) return null

  return (
    <>
      <div ref={layerRef} className="cx-layer" aria-hidden="true">
        <span ref={crackRef} className="cx-crack s1" hidden />
        <span ref={posRef} className="cx-frame-pos" hidden>
          <span ref={frameRef} className="cx-frame">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </span>
        </span>
      </div>
      <span ref={crossRef} className="cx-cross" aria-hidden="true" hidden />
    </>
  )
}
