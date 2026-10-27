import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CERTIFICATIONS } from '../data/certifications'
import styles from './Certifications.module.css'

gsap.registerPlugin(ScrollTrigger)

const STATUS_LABEL = { passed: 'Passed', progress: 'In progress' }

export default function Certifications() {
  const root = useRef<HTMLDivElement>(null)

  // Scroll reveal: header fades up, then the cards with a stagger. Skipped under reduced motion.
  useLayoutEffect(() => {
    const el = root.current
    if (!el) return
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const from = { opacity: 0, y: 24, duration: 0.8, ease: 'power3.out' }
      gsap
        .timeline({ scrollTrigger: { trigger: el, start: 'top 80%', once: true } })
        .from(el.querySelector('header'), from)
        .from(el.querySelectorAll('article'), { ...from, stagger: 0.12 }, '-=0.5')
    })
    return () => mm.revert()
  }, [])

  return (
    <section id="certifications" aria-labelledby="cert-heading" className={styles.certifications}>
      <div ref={root} className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.intro}>
            <div className={styles.label}>[ CERTIFICATIONS ]</div>
            <h2 id="cert-heading" className={styles.heading}>
              Built the way <span className={styles.accent}>Webflow</span> builds.
            </h2>
          </div>
          <p className={styles.lead}>
            Tested by Webflow on their own standards, so your site is built to last, not just to launch.
          </p>
        </header>

        <div className={styles.grid}>
          {CERTIFICATIONS.map((c) => (
            <article key={c.title} className={styles.card}>
              <div className={styles.cardTop}>
                <img src="/images/webflow-logo.png" alt="Webflow logo" width="44" height="44" loading="lazy" className={styles.logo} />
                <span className={`${styles.pill} ${c.status === 'passed' ? styles.passed : styles.progress}`}>
                  <span aria-hidden="true" className={styles.dot} />
                  {STATUS_LABEL[c.status]}
                </span>
              </div>
              <div className={styles.text}>
                <div className={styles.eyebrow}>{c.eyebrow}</div>
                <h3 className={styles.title}>{c.title}</h3>
                <p className={styles.desc}>{c.description}</p>
              </div>
              <div className={styles.footer}>
                <span className={styles.meta}>
                  {c.footerLeft}
                  {/* Inline on desktop; its own row on phones (see Certifications.module.css) */}
                  {c.credentialId && (
                    <span className={styles.credId}>
                      <span className={styles.sep}> · </span>ID {c.credentialId}
                    </span>
                  )}
                </span>
                {c.link ? (
                  <a href={c.link.href} target="_blank" rel="noopener" aria-label={c.link.label} className={styles.link}>
                    {c.link.text}
                  </a>
                ) : (
                  <span>{c.footerRight}</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
