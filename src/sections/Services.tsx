import { useEffect, useRef } from 'react'
import styles from './Services.module.css'

// Tool logos in card A: 3 columns (rows at 1024px and below), each scrolling in a loop.
const LOGO_COLUMNS = [
  [['figma', 'Figma'], ['make', 'Make'], ['finsweet', 'Finsweet'], ['hubspot', 'HubSpot']],
  [['stripe', 'Stripe'], ['zapier', 'Zapier'], ['lottie', 'Lottie'], ['gsap', 'GSAP']],
  [['memberstack', 'Memberstack'], ['airtable', 'Airtable'], ['google-analytics', 'Google Analytics'], ['calendly', 'Calendly']],
]
// Copies of each list; the track moves by exactly one copy per loop (keep in sync with Services.module.css).
// 6 so a horizontal row on a ~1000px-wide card never runs out of logos; the vertical columns show only 2.
const LOGO_COPIES = 6

const CHECKS = [
  { label: 'Performance', delay: '0s' },
  { label: 'Accessibility', delay: '0.2s' },
  { label: 'Best practices', delay: '0.4s' },
  { label: 'SEO', delay: '0.6s' },
]

export default function Services() {
  const video = useRef<HTMLVideoElement>(null)

  // The video is a loop too: keep it on its first frame when the visitor asks for reduced motion.
  useEffect(() => {
    const el = video.current
    if (el && window.matchMedia('(prefers-reduced-motion: reduce)').matches) el.pause()
  }, [])

  return (
    <section id="services" aria-labelledby="services-heading" className={styles.services}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.headingGroup}>
            <div className={styles.label}>[ Services ]</div>
            <h2 id="services-heading" className={styles.heading}>
              Everything your website needs. Nothing left to do after me.
            </h2>
          </div>
          <p className={styles.intro}>One developer for the whole build, from the first design to launch and beyond.</p>
        </div>

        <div className={styles.gridWrap}>
          <div className={styles.grid}>
            <div className={`${styles.card} ${styles.glass} ${styles.web}`}>
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
                            <img
                              src={`/portfolio-logos/${file}.svg`}
                              alt={name}
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

            <div className={`${styles.card} ${styles.media} ${styles.motion}`}>
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

            <div className={`${styles.card} ${styles.media} ${styles.cms}`}>
              <img
                src="/images/cms-demo.jpg"
                alt="Journal page built on Webflow CMS: article search, category filters with Webflow selected, and a list of CMS articles"
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

            <div className={`${styles.card} ${styles.photo}`}>
              <img
                src="/images/benjamin.jpg"
                alt="Portrait of Benjamin Rahmanović, Webflow expert developer, smiling in a navy waistcoat and pink tie"
                width={688}
                height={1568}
                loading="lazy"
                className={styles.photoImg}
              />
            </div>

            <div className={`${styles.card} ${styles.glass} ${styles.seo}`}>
              <div className={styles.seoText}>
                <div>
                  <h3 className={styles.seoTitle}>SEO, speed &amp; integrations</h3>
                  <p className={styles.seoBody}>Technical SEO, fast loading, custom code, React, HubSpot and analytics.</p>
                </div>
                <div className={styles.also}>
                  <strong>Also:</strong> Ecommerce · Migrations · Maintenance &amp; care
                </div>
              </div>
              <div aria-hidden="true" className={styles.checks}>
                {CHECKS.map((ck) => (
                  <div key={ck.label} className={styles.check}>
                    <svg width="34" height="34" viewBox="0 0 34 34">
                      <circle cx="17" cy="17" r="14" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="4" />
                      <circle
                        className={styles.ring}
                        cx="17"
                        cy="17"
                        r="14"
                        fill="none"
                        strokeWidth="4"
                        strokeLinecap="round"
                        transform="rotate(-90 17 17)"
                        style={{ animationDelay: ck.delay }}
                      />
                    </svg>
                    <span className={styles.checkLabel}>{ck.label}</span>
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
