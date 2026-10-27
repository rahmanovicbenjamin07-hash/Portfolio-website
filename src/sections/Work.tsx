import { useState } from 'react'
import styles from './Work.module.css'

const PROJECTS = [
  {
    name: 'Top One Launchpad',
    meta: 'Product launch page · Web Developer · 2026',
    src: '/images/topone-launchpad.jpg',
    href: '/work/top-one-launchpad',
    alt: 'Top One Launchpad website built in Webflow: a space-themed launch page',
    text: 'A space-themed launch page for limited trading accounts, with a limited-spots counter and bold, cinematic visuals.',
  },
  {
    name: 'Top One Trader',
    meta: 'Prop trading firm · Web Developer · 2026',
    src: '/images/topone-trader.jpg',
    href: '/work/top-one-trader',
    alt: 'Top One Trader website built in Webflow: a prop trading firm home page',
    text: 'The main site of a futures prop trading firm: a dark, high-contrast home page built around funded-account offers, a video hero and live promo banners.',
  },
  {
    name: 'Sabila Labs',
    meta: 'Skincare AI software · Web Developer · 2026',
    src: '/images/prism-sabila.jpg',
    href: '/work/sabila-labs',
    alt: 'Sabila Labs website built in Webflow: a skincare AI product home page',
    text: 'A product site for Prism, skin intelligence for Shopify skincare brands, with an editorial serif voice and a soft, spectrum-light hero.',
  },
]

const pad = (k: number) => (k < 10 ? '0' : '') + k

export default function Work() {
  const [active, setActive] = useState(1)
  const current = PROJECTS[active]

  return (
    <section id="work" aria-labelledby="work-heading" className={styles.work}>
      <div className={styles.head}>
        <div data-reveal className={styles.headText}>
          <div className={styles.eyebrow}>Selected work (03)</div>
          <h2 id="work-heading" className={`${styles.serif} ${styles.heading}`}>A few projects I'm proud of.</h2>
        </div>
        {/* Same number as in numCol; shown here instead when the row is too narrow for both (see Work.module.css) */}
        <div key={active} aria-hidden="true" className={`${styles.serif} ${styles.fadeIn} ${styles.big} ${styles.cornerNum}`}>
          {`${pad(active + 1)}”`}
        </div>
      </div>

      <div data-reveal className={styles.stage}>
        <div aria-hidden="true" className={`${styles.serif} ${styles.ghost}`}>Selected work</div>

        <div className={styles.row}>
          <div className={styles.numCol}>
            <div key={active} aria-hidden="true" className={`${styles.serif} ${styles.fadeIn} ${styles.big}`}>
              {`${pad(active + 1)}”`}
            </div>
          </div>

          <div className={styles.frame}>
            <div role="tablist" aria-label="Projects" className={styles.tabs}>
              {PROJECTS.map((p, k) => (
                <button
                  key={p.name}
                  type="button"
                  role="tab"
                  aria-selected={k === active}
                  aria-label={p.name}
                  data-cursor="view"
                  className={`${styles.acc} ${k === active ? styles.on : ''}`}
                  onClick={() => setActive(k)}
                >
                  <img className={styles.accImg} src={p.src} alt={p.alt} width={1600} height={971} loading="lazy" />
                  <span className={styles.accLabel}>
                    <span className={`${styles.vertical} ${styles.serif} ${styles.accName}`}>{p.name}</span>
                    <span className={`${styles.vertical} ${styles.accNum}`}>{`${pad(k + 1)}”`}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div data-reveal className={styles.descWrap}>
        <div key={active} className={`${styles.desc} ${styles.fadeIn}`}>
          <div className={styles.descTitle}>
            <span className={`${styles.serif} ${styles.descName}`}>{current.name}</span>
            <span className={styles.descMeta}>{current.meta}</span>
          </div>
          <div className={styles.descBody}>
            <p className={styles.descText}>{current.text}</p>
            <a
              href={current.href}
              aria-label={`View project: ${current.name} case study`}
              className={styles.descLink}
            >
              View project
            </a>
          </div>
        </div>
      </div>

      {/* Tablet and phone: every project as its own card, stacked (the accordion above is hidden there) */}
      <ul className={styles.list}>
        {PROJECTS.map((p, k) => (
          <li key={p.name} data-cursor="view" data-reveal className={styles.project}>
            <img
              className={styles.projectImg}
              src={p.src}
              alt={p.alt}
              width={1600}
              height={971}
              loading="lazy"
            />
            <div className={styles.projectBody}>
              <div className={styles.projectHead}>
                <h3 className={`${styles.serif} ${styles.descName} ${styles.projectName}`}>{p.name}</h3>
                <span aria-hidden="true" className={`${styles.serif} ${styles.projectNum}`}>{`${pad(k + 1)}”`}</span>
              </div>
              <span className={styles.descMeta}>{p.meta}</span>
              <p className={styles.descText}>{p.text}</p>
              <a
                href={p.href}
                aria-label={`View project: ${p.name} case study`}
                className={styles.descLink}
              >
                View project
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
