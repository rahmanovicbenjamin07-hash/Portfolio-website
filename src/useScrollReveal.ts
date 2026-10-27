import { useLayoutEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Scroll reveal for every [data-reveal] element inside `root`: each fades up as it comes 15% into view,
// 300ms, 45ms apart when several enter together. Everything starts visible (prerendered HTML, no JS,
// reduced motion); only with motion allowed are the items hidden first.
export function useScrollReveal(root: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const el = root.current
    if (!el) return
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const items = gsap.utils.toArray<HTMLElement>('[data-reveal]', el)
      gsap.set(items, { opacity: 0, y: 16 })
      ScrollTrigger.batch(items, {
        start: 'top 85%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out', stagger: 0.045, clearProps: 'opacity,transform' }),
      })
    })
    return () => mm.revert()
  }, [root])
}
