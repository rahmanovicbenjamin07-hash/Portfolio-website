import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Lenis smooth scroll, driven by GSAP's ticker so ScrollTrigger reveals stay in sync with it.
// Same-page anchor links (#work, /#contact, ...) glide to their target instead of jumping.
// Not started under reduced motion: the browser's native scrolling is kept.
export function startSmoothScroll() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const lenis = new Lenis()
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)

  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const link = (e.target as Element).closest<HTMLAnchorElement>('a[href*="#"]')
    if (!link || link.target === '_blank') return
    const url = new URL(link.href)
    if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return
    const target = document.getElementById(decodeURIComponent(url.hash.slice(1)))
    if (!target) return
    e.preventDefault()
    history.pushState(null, '', url.hash)
    lenis.scrollTo(target, { duration: 1.2 })
  })
}
