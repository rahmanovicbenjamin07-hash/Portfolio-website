import { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Services.module.css'

gsap.registerPlugin(ScrollTrigger)

// Tool logos in card A: 3 columns (rows at 1024px and below), each scrolling in a loop.
const LOGO_COLUMNS = [
  [['figma', 'Figma'], ['make', 'Make'], ['finsweet', 'Finsweet'], ['hubspot', 'HubSpot']],
  [['stripe', 'Stripe'], ['zapier', 'Zapier'], ['lottie', 'Lottie'], ['gsap', 'GSAP']],
  [['memberstack', 'Memberstack'], ['airtable', 'Airtable'], ['google-analytics', 'Google Analytics'], ['calendly', 'Calendly']],
]
// Copies of each list; the track moves by exactly one copy per loop (keep in sync with Services.module.css).
// 6 so a horizontal row on a ~1000px-wide card never runs out of logos; the vertical columns show only 2.
const LOGO_COPIES = 6

const CHECKS = ['Performance', 'Accessibility', 'Best practices', 'SEO']
const SCORE = 100

// Score rings: r = 22 in a 52 x 52 box
const RING_R = 22
const RING_LENGTH = 2 * Math.PI * RING_R

export default function Services() {
  const video = useRef<HTMLVideoElement>(null)
  const checks = useRef<HTMLDivElement>(null)

  // The video is a loop too: keep it on its first frame when the visitor asks for reduced motion.
  useEffect(() => {
    const el = video.current
    if (el && window.matchMedia('(prefers-reduced-motion: reduce)').matches) el.pause()
  }, [])

  // Score rings fill once, and their numbers count 0 -> 100, when the card scrolls into view.
  // Without JS or with reduced motion they simply show full at 100.
  useLayoutEffect(() => {
    const el = checks.current
    if (!el) return
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const rings = el.querySelectorAll<SVGCircleElement>('[data-ring]')
      const scores = el.querySelectorAll<HTMLElement>('[data-score]')
      gsap.set(rings, { strokeDashoffset: RING_LENGTH })
      scores.forEach((s) => (s.textContent = '0'))
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%', once: true } })
      rings.forEach((ring, i) => {
        const n = { v: 0 }
        const at = i * 0.15
        tl.to(ring, { strokeDashoffset: 0, duration: 1.4, ease: 'power3.out' }, at)
        tl.to(n, { v: SCORE, duration: 1.4, ease: 'power3.out', onUpdate: () => (scores[i].textContent = String(Math.round(n.v))) }, at)
      })
      return () => scores.forEach((s) => (s.textContent = String(SCORE)))
    })
    return () => mm.revert()
  }, [])

  return (
    <section id="services" aria-labelledby="services-heading" className={styles.services}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div data-reveal className={styles.headingGroup}>
            <div className={styles.label}>[ Services ]</div>
            <h2 id="services-heading" className={styles.heading}>
              Everything your website needs. Nothing left to do after me.
            </h2>
          </div>
          <p data-reveal className={styles.intro}>One developer for the whole build, from the first design to launch and beyond.</p>
        </div>

        <div className={styles.gridWrap}>
          <div className={styles.grid}>
            <div data-reveal className={`${styles.card} ${styles.glass} ${styles.web}`}>
              <span className={styles.number}>01</span>
              <div className={styles.logos}>
                {LOGO_COLUMNS.map((col, i) => (
                  <div key={i} className={styles.logoCol}>
                    <ul className={`${styles.logoTrack} ${i === 1 ? styles.logoTrackRev : styles.logoTrackFwd}`}>
                      {Array.from({ length: LOGO_COPIES }, (_, copy) =>
                        col.map(([file, name]) => (
                          <li
                            key={`${copy}-${file}`}
                            aria-hidden={copy > 0 || undefined}
                            className={`${styles.logoSlot} ${file === 'finsweet' ? styles.logoSlotWordmark : ''}`}
                          >
                            {/* Only the first copy is described; the loop copies are decorative */}
                            <img
                              src={`/portfolio-logos/${file}.svg`}
                              alt={copy === 0 ? `${name} logo` : ''}
                              width={file === 'finsweet' ? 109 : 40}
                              height={file === 'finsweet' ? 22 : 40}
                              loading="lazy"
                              className={file === 'finsweet' ? styles.logoWordmark : styles.logo}
                            />
                          </li>
                        )),
                      )}
                    </ul>
                  </div>
                ))}
              </div>
              <div className={styles.webBody}>
                <h3 className={styles.webTitle}>Web design &amp; Webflow development</h3>
                <p className={styles.webText}>Modern designs, built pixel-perfect and responsive on every device.</p>
              </div>
            </div>

            <div data-reveal className={`${styles.card} ${styles.media} ${styles.motion}`}>
              <video
                ref={video}
                src="/video/animation-demo.mp4"
                autoPlay
                muted
                loop
                playsInline
                width={840}
                height={1600}
                aria-label="Screen recording of a website animating on load, on hover and on scroll"
                className={styles.cover}
              />
              <div aria-hidden="true" className={styles.fade} />
              <div className={styles.caption}>
                <h3 className={styles.captionTitle}>Interactions &amp; animation</h3>
                <p className={styles.captionText}>
                  Load, hover and scroll effects that make a site feel alive, without slowing it down.
                </p>
              </div>
            </div>

            <div data-reveal className={`${styles.card} ${styles.media} ${styles.cms}`}>
              <img
                src="/images/cms-demo.jpg"
                alt="Webflow CMS journal page with article search and category filters"
                width={840}
                height={1600}
                loading="lazy"
                className={styles.cover}
              />
              <div aria-hidden="true" className={styles.fade} />
              <div className={styles.caption}>
                <h3 className={styles.captionTitle}>CMS setup</h3>
                <p className={`${styles.captionText} ${styles.cmsText}`}>
                  Collections, templates and filters your client can edit without breaking anything.
                </p>
              </div>
            </div>

            <div data-reveal className={`${styles.card} ${styles.photo}`}>
              <img
                src="/images/benjamin.jpg"
                alt="Portrait of Benjamin Rahmanović, Webflow developer"
                width={688}
                height={1568}
                loading="lazy"
                className={styles.photoImg}
              />
            </div>

            <div data-reveal className={`${styles.card} ${styles.glass} ${styles.seo}`}>
              <div className={styles.seoText}>
                <div>
                  <h3 className={styles.seoTitle}>SEO, speed &amp; integrations</h3>
                  <p className={styles.seoBody}>Technical SEO, fast loading, custom code, React, HubSpot and analytics.</p>
                </div>
                <div className={styles.also}>
                  <strong>Also:</strong> Ecommerce · Migrations · Maintenance &amp; care
                </div>
              </div>
              <div ref={checks} aria-hidden="true" className={styles.checks}>
                {CHECKS.map((label) => (
                  <div key={label} className={styles.check}>
                    <span className={styles.score}>
                      <svg width="52" height="52" viewBox="0 0 52 52">
                        <circle cx="26" cy="26" r={RING_R} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="4" />
                        <circle
                          data-ring
                          className={styles.ring}
                          cx="26"
                          cy="26"
                          r={RING_R}
                          fill="none"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeDasharray={RING_LENGTH}
                          transform="rotate(-90 26 26)"
                        />
                      </svg>
                      <span data-score className={styles.scoreNum}>
                        {SCORE}
                      </span>
                    </span>
                    <span className={styles.checkLabel}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
