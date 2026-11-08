import { useEffect, type RefObject } from 'react'

// Holographic tilt for the contact card.
// While the pointer is inside the section, the card leans toward it (rotateX/rotateY), drifts a little after it,
// and a rainbow foil + glare slide across it following the pointer. Leaving the section eases it back flat.
// A smooth glide (EASE below), no stepping.
// Everything is written as CSS custom properties on the card from one requestAnimationFrame loop (no React state).
// Only on hover-capable fine pointers with motion allowed; otherwise the card stays static.

const DEVICE_QUERY = '(hover: hover) and (pointer: fine)'
const REDUCED_QUERY = '(prefers-reduced-motion: reduce)'
const MAX_TILT = 16 // degrees
const MAX_SHIFT = 28 // px the card drifts toward the pointer
// Per-frame lerp factor (~60 fps). 0.2: follows the pointer in ~0.2 s, a soft glide without trailing behind it.
const EASE = 0.2

export default function useHoloCard(sectionRef: RefObject<HTMLElement | null>, cardRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const section = sectionRef.current
    const card = cardRef.current
    if (!section || !card) return
    const device = window.matchMedia(DEVICE_QUERY)
    const reduced = window.matchMedia(REDUCED_QUERY)

    let enabled = false
    let raf = 0
    let inside = false
    let px = 0 // last pointer position, viewport coordinates
    let py = 0
    let last = 0
    // current (c*) and target (t*) values
    let cx = 0, cy = 0, tx = 0, ty = 0 // pointer offset from card centre, -1..1
    let cmx = 0.5, cmy = 0.5, tmx = 0.5, tmy = 0.5 // pointer on the card, 0..1 (foil position)
    let ch = 0, th = 0 // foil strength 0..1
    let hue = 0

    // The card's box without its own transform (offsets ignore transforms), so the tilt never feeds back.
    const cardBox = () => {
      const parent = card.offsetParent as HTMLElement | null
      const p = parent ? parent.getBoundingClientRect() : { left: 0, top: 0 }
      return { left: p.left + card.offsetLeft, top: p.top + card.offsetTop, width: card.offsetWidth, height: card.offsetHeight }
    }

    const tick = (now: number) => {
      raf = 0
      const dt = last ? Math.min((now - last) / 16.67, 3) : 1
      last = now
      const k = 1 - Math.pow(1 - EASE, dt)

      if (inside) {
        // Re-check against the section every frame: smooth scroll can move it out from under a still pointer.
        const s = section.getBoundingClientRect()
        if (px < s.left || px > s.right || py < s.top || py > s.bottom) inside = false
      }
      if (inside) {
        const b = cardBox()
        const s = section.getBoundingClientRect()
        const halfW = Math.max(s.width / 2, 1)
        const halfH = Math.max(s.height / 2, 1)
        tx = Math.max(-1, Math.min(1, (px - (b.left + b.width / 2)) / halfW))
        ty = Math.max(-1, Math.min(1, (py - (b.top + b.height / 2)) / halfH))
        tmx = Math.max(0, Math.min(1, (px - b.left) / b.width))
        tmy = Math.max(0, Math.min(1, (py - b.top) / b.height))
        th = 1
      } else {
        tx = ty = 0
        tmx = tmy = 0.5
        th = 0
      }

      cx += (tx - cx) * k
      cy += (ty - cy) * k
      cmx += (tmx - cmx) * k
      cmy += (tmy - cmy) * k
      ch += (th - ch) * k
      // The foil keeps cycling while it is visible; faster pointer travel spins it a bit more.
      hue = (hue + dt * (0.6 + Math.abs(tx - cx) * 40 + Math.abs(ty - cy) * 40) * ch) % 360

      const st = card.style
      // Continuous values (no stepping) so the tilt glides; 2 decimals keeps the strings short.
      st.setProperty('--rx', `${(-cy * MAX_TILT).toFixed(2)}deg`)
      st.setProperty('--ry', `${(cx * MAX_TILT).toFixed(2)}deg`)
      st.setProperty('--tx', `${(cx * MAX_SHIFT).toFixed(2)}px`)
      st.setProperty('--ty', `${(cy * MAX_SHIFT).toFixed(2)}px`)
      st.setProperty('--mx', `${(cmx * 100).toFixed(2)}%`)
      st.setProperty('--my', `${(cmy * 100).toFixed(2)}%`)
      st.setProperty('--holo', ch.toFixed(3))
      st.setProperty('--hue', `${hue.toFixed(1)}deg`)

      const settled =
        !inside && Math.abs(cx) < 0.001 && Math.abs(cy) < 0.001 && ch < 0.002 &&
        Math.abs(cmx - 0.5) < 0.001 && Math.abs(cmy - 0.5) < 0.001
      if (settled) {
        reset()
        last = 0
      } else {
        raf = requestAnimationFrame(tick)
      }
    }

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return
      px = e.clientX
      py = e.clientY
      inside = true
      card.classList.add('is-holo')
      kick()
    }
    const onLeave = () => {
      inside = false
      kick()
    }
    const reset = () => {
      cx = cy = 0
      cmx = cmy = 0.5
      ch = 0
      card.classList.remove('is-holo')
      for (const p of ['--rx', '--ry', '--tx', '--ty', '--mx', '--my', '--holo', '--hue']) card.style.removeProperty(p)
    }

    const enable = () => {
      if (enabled) return
      enabled = true
      section.addEventListener('pointermove', onMove, { passive: true })
      section.addEventListener('pointerleave', onLeave)
    }
    const disable = () => {
      if (!enabled) return
      enabled = false
      section.removeEventListener('pointermove', onMove)
      section.removeEventListener('pointerleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
      raf = 0
      last = 0
      inside = false
      reset()
    }
    const sync = () => (device.matches && !reduced.matches ? enable() : disable())
    sync()
    device.addEventListener('change', sync)
    reduced.addEventListener('change', sync)
    return () => {
      device.removeEventListener('change', sync)
      reduced.removeEventListener('change', sync)
      disable()
    }
  }, [sectionRef, cardRef])
}
