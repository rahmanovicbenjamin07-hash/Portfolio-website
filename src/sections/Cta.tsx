import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CALENDLY } from '../seo/site'
import styles from './Cta.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function Cta() {
  const section = useRef<HTMLElement>(null)

  // The panel scrolls in at 80% (rounded, like a card further back). When it reaches the top of the screen it
  // locks in place (pinned) and grows with the scroll until it fills the screen, then stays full screen for a
  // while before the page moves on to what follows. Reduced motion: no pin, just the full-screen resting state.
  useLayoutEffect(() => {
    const sec = section.current
    if (!sec) return
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // The box's top is the section's top + its top padding (measured on the section, not the scaled box)
      const boxTop = () => parseFloat(getComputedStyle(sec).paddingTop)
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sec,
            start: () => `top+=${boxTop()} top`,
            end: () => `+=${window.innerHeight * 1.5}`, // 1.5 screens of scrolling while pinned
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .fromTo(sec, { '--p': 0 }, { '--p': 1, ease: 'none', duration: 0.6 }) // grow: first 60%
        .to({}, { duration: 0.4 }) // hold full screen: last 40%
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={section} id="contact" aria-labelledby="cta-heading" className={styles.cta}>
      <div className={styles.box}>
        <h2 id="cta-heading" className={styles.heading}>
          Let's build it
        </h2>
        <div aria-hidden="true" className={styles.glow} />
        <div aria-hidden="true" className={styles.horizon} />

        {/* Floating </> tile with its grey edge behind */}
        <div aria-hidden="true" className={styles.object}>
          <div className={styles.edge} />
          <div className={styles.tile}>
            <svg width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="#1E3BF0" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 7l-5 5 5 5" />
              <path d="M16 7l5 5-5 5" />
              <path d="M13.5 4.5l-3 15" />
            </svg>
            <span className={styles.dots}>
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </span>
          </div>
        </div>

        <div className={styles.actions}>
          <a href={CALENDLY} target="_blank" rel="noopener" aria-label="Book a 15-min call (opens in new tab)" className={styles.button}>
            Book a 15-min call
          </a>
          <p className={styles.note}>Send me the design or the idea. I'll reply with how I'd build it, and when.</p>
        </div>
      </div>
    </section>
  )
}
