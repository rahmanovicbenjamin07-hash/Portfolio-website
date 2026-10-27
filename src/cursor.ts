import './styles/cursor.css'

// Custom cursor for every page. Started once from main.tsx, like smooth scroll.
// - A 64px ring trails the mouse (0.18 smoothing per frame) and a 12px dot sits exactly on it,
//   both white with mix-blend-mode: difference, so they invert whatever is underneath.
// - Links and buttons: ring grows to 2x. Mouse down: 0.8x.
// - [data-cursor="view"]: ring hides and a solid 88px "View" circle scales in
//   (data-cursor-label="Visit" changes the word).
// - Text fields: custom cursor hides and the native text cursor shows.
// Only on mouse devices (and not at phone widths). Reduced motion: no trailing, no scale animation.
//
// The elements are appended straight to <body>: if a blending element sat inside a parent with its own
// stacking context, it would only blend with that parent and the inversion would break.

const DEVICE_QUERY = '(hover: hover) and (pointer: fine) and (min-width: 768px)'
const SMOOTHING = 0.18
const CLICKABLE = 'a[href], button, [role="button"], [role="tab"], label[for], select, summary, input[type="checkbox"], input[type="radio"], input[type="submit"], input[type="button"], input[type="range"]'
const TEXT_FIELD = 'textarea, [contenteditable=""], [contenteditable="true"], input:not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]):not([type="range"]):not([type="file"]):not([type="color"]):not([type="hidden"])'

type Mode = 'default' | 'hover' | 'view' | 'text'

export function startCursor() {
  const device = window.matchMedia(DEVICE_QUERY)
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
  let stop: (() => void) | null = null

  const sync = () => {
    if (device.matches && !stop) stop = mountCursor(reduced)
    else if (!device.matches && stop) {
      stop()
      stop = null
    }
  }
  device.addEventListener('change', sync)
  sync()
}

function mountCursor(reduced: MediaQueryList) {
  const make = (className: string) => {
    const el = document.createElement('div')
    el.className = className
    el.setAttribute('aria-hidden', 'true')
    document.body.appendChild(el)
    return el
  }
  const ring = make('cursor-ring')
  const dot = make('cursor-dot')
  const view = make('cursor-view')
  const viewLabel = document.createElement('span')
  view.appendChild(viewLabel)

  // Mouse position, trailing ring position, and current/target scales
  let mx = 0
  let my = 0
  let rx = 0
  let ry = 0
  const ringScale = { now: 1, to: 1 }
  const dotScale = { now: 1, to: 1 }
  const viewScale = { now: 0, to: 0 }
  let mode: Mode = 'default'
  let pressed = false
  let visible = false
  let seen = false
  let frame = 0

  const setVisible = (on: boolean) => {
    visible = on
    document.documentElement.classList.toggle('cursor-hidden', !on)
  }

  const applyMode = (target: Element | null) => {
    const card = target?.closest<HTMLElement>('[data-cursor="view"]')
    let next: Mode = 'default'
    if (target?.closest(TEXT_FIELD)) next = 'text'
    else if (card) next = 'view'
    else if (target?.closest(CLICKABLE)) next = 'hover'

    if (next === 'view' && card) viewLabel.textContent = card.dataset.cursorLabel || 'View'
    mode = next
    updateTargets()
  }

  const updateTargets = () => {
    const base = mode === 'hover' ? 2 : mode === 'default' ? 1 : 0
    ringScale.to = base * (pressed ? 0.8 : 1)
    dotScale.to = mode === 'default' || mode === 'hover' ? 1 : 0
    viewScale.to = mode === 'view' ? (pressed ? 0.9 : 1) : 0
    kick()
  }

  const ease = (s: { now: number; to: number }, k: number) => {
    s.now += (s.to - s.now) * k
    if (Math.abs(s.to - s.now) < 0.001) s.now = s.to
  }

  const tick = () => {
    frame = 0
    const k = reduced.matches ? 1 : SMOOTHING
    rx += (mx - rx) * k
    ry += (my - ry) * k
    if (Math.abs(mx - rx) < 0.05) rx = mx
    if (Math.abs(my - ry) < 0.05) ry = my
    ease(ringScale, k)
    ease(dotScale, k)
    ease(viewScale, k)

    // Each element is centred on its point by its CSS margins
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) scale(${ringScale.now})`
    view.style.transform = `translate3d(${rx}px, ${ry}px, 0) scale(${viewScale.now})`
    dot.style.transform = `translate3d(${mx}px, ${my}px, 0) scale(${dotScale.now})`

    const settled = rx === mx && ry === my && ringScale.now === ringScale.to && dotScale.now === dotScale.to && viewScale.now === viewScale.to
    if (!settled) kick()
  }

  const kick = () => {
    if (!frame) frame = requestAnimationFrame(tick)
  }

  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    mx = e.clientX
    my = e.clientY
    if (!seen) {
      // First move: start at the mouse instead of flying in from the corner, and only now hide the native cursor
      seen = true
      rx = mx
      ry = my
      document.documentElement.classList.add('has-cursor')
    }
    if (!visible) setVisible(true)
    kick()
  }

  // Delegated: one listener for the whole document, whatever is under the mouse
  const onOver = (e: PointerEvent) => {
    if (e.pointerType === 'mouse') applyMode(e.target as Element)
  }

  // Content can move under a still mouse (scrolling, the work accordion opening): check again
  const onScroll = () => {
    if (seen) applyMode(document.elementFromPoint(mx, my))
  }

  const onDown = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    pressed = true
    updateTargets()
  }
  const onUp = () => {
    pressed = false
    updateTargets()
  }
  const onLeave = () => setVisible(false)
  const onEnter = () => {
    if (seen) setVisible(true)
  }

  const root = document.documentElement
  document.addEventListener('pointermove', onMove, { passive: true })
  document.addEventListener('pointerover', onOver, { passive: true })
  document.addEventListener('pointerdown', onDown, { passive: true })
  document.addEventListener('pointerup', onUp, { passive: true })
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('blur', onLeave)
  root.addEventListener('mouseleave', onLeave)
  root.addEventListener('mouseenter', onEnter)
  setVisible(false)

  return () => {
    document.removeEventListener('pointermove', onMove)
    document.removeEventListener('pointerover', onOver)
    document.removeEventListener('pointerdown', onDown)
    document.removeEventListener('pointerup', onUp)
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('blur', onLeave)
    root.removeEventListener('mouseleave', onLeave)
    root.removeEventListener('mouseenter', onEnter)
    cancelAnimationFrame(frame)
    ring.remove()
    dot.remove()
    view.remove()
    root.classList.remove('has-cursor', 'cursor-hidden')
  }
}
