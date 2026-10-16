import { useState } from 'react'
import styles from './Work.module.css'

const PROJECTS = [
  {
    name: 'Top One Launchpad',
    meta: 'Product launch page · [Role] · [2025]',
    src: '/images/topone-launchpad.jpg',
    alt: 'Top One Launchpad website built in Webflow: a space-themed launch page for Top One Trader with planets, stars and the headline "Experimental accounts. Limited launch."',
    text: 'A space-themed launch page for limited trading accounts, with a limited-spots counter and bold, cinematic visuals.',
  },
  {
    name: 'Veracious',
    meta: 'Holding company · [Role] · [2025]',
    src: '/images/veracious.jpg',
    alt: 'Veracious website built in Webflow: a dark holding company home page with a gold fleur-de-lis emblem between shadowed columns',
    text: 'A dark, cinematic brand site for a holding company, with gold details and a classic serif voice.',
  },
  {
    name: 'WealthVentures',
    meta: 'Luxury travel club · [Role] · [2024]',
    src: '/images/wealthventures.jpg',
    alt: 'WealthVentures website built in Webflow: a luxury travel club home page with a gold winged crest over a coastal sunset photo',
    text: 'A luxury travel club site built around full-bleed photography and an elegant, editorial layout.',
  },
]

const pad = (k: number) => (k < 10 ? '0' : '') + k

export default function Work() {
  const [active, setActive] = useState(1)
  const current = PROJECTS[active]

  return (
    <section id="work" aria-labelledby="work-heading" className={styles.work}>
      <div className={styles.head}>
        <div className={styles.headText}>
          <div className={styles.eyebrow}>Selected work (03)</div>
          <h2 id="work-heading" className={`${styles.serif} ${styles.heading}`}>A few projects I'm proud of.</h2>
        </div>
      </div>

      <div className={styles.stage}>
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

      <div className={styles.descWrap}>
        <div key={active} className={`${styles.desc} ${styles.fadeIn}`}>
          <div className={styles.descTitle}>
            <span className={`${styles.serif} ${styles.descName}`}>{current.name}</span>
            <span className={styles.descMeta}>{current.meta}</span>
          </div>
          <div className={styles.descBody}>
            <p className={styles.descText}>{current.text}</p>
            <a href="#work" className={styles.descLink}>View project</a>
          </div>
        </div>
      </div>
    </section>
  )
}
