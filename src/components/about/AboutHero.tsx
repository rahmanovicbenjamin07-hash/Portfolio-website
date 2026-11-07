import Nav from '../home/Nav'
import PixelArrow from '../pixel/PixelArrow'
import PixelText from '../PixelText'
import site from '../../data/site'
import { ABOUT_INTRO, ABOUT_PHOTO, ABOUT_STATS } from '../../data/about'
import './AboutHero.css'

// About page hero, copied from design-reference/about.html (section.ab-hw): meadow background, the page
// nav, the white intro panel, the photo card with the "Also me, in pixels" badge, and the three number boxes on the
// grass. .wrap and .stats / .stat come from src/styles/pages.css. Content lives in src/data/about.ts.
const external = /^https?:\/\//.test(site.letsTalkUrl)

export default function AboutHero() {
  return (
    <section className="ab-hw" aria-labelledby="ab-title">
      <div className="ab-bg" aria-hidden="true">
        <div className="ab-land"></div>
        <div className="ab-cloud abc1"></div>
        <div className="ab-cloud abc2"></div>
        <div className="ab-grass"></div>
        <div className="ab-dis"></div>
      </div>
      <div className="ab-front">
        <Nav variant="page" current="about" />
        <div className="wrap ab-hero">
          <div className="ab-card">
            <p className="px-label">
              <i></i>About me
            </p>
            <h1
              id="ab-title"
              style={{ margin: '18px 0 0', fontFamily: "'Inter Tight', Inter, sans-serif", fontSize: 'clamp(44px, 5vw, 76px)', lineHeight: 1.02, fontWeight: 500, letterSpacing: '-0.03em', color: '#0E1B26' }}
            >
              Hi, I'm Benjamin. <span style={{ color: '#4A6070' }}>I design and build websites.</span>
            </h1>
            <p className="ab-lead">{ABOUT_INTRO}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginTop: 36 }}>
              <a href="/#work" className="btn btn-primary">
                <PixelText text="See my work" trigger="hover" /> <PixelArrow color="#ffffff" />
              </a>
              {/* Same booking link as every other "Let's talk" button (the reference's #contact is a stand-in). */}
              <a href={site.letsTalkUrl} className="btn btn-dark" {...(external ? { target: '_blank', rel: 'noopener' } : {})}>
                <PixelText text="Let's talk" trigger="hover" />
              </a>
            </div>
          </div>
          <figure className="photo-card" style={{ marginBottom: 0, marginTop: 0 }}>
            <div className="photo">
              {/* Above the fold: load it first. */}
              <img src={ABOUT_PHOTO.src} alt={ABOUT_PHOTO.alt} width={ABOUT_PHOTO.width} height={ABOUT_PHOTO.height} fetchPriority="high" decoding="async" />
            </div>
            <figcaption className="pixme">
              <img src="/pixel/avatar-me.png" alt="The pixel version of me from the homepage" width={56} height={56} decoding="async" />
              <span>Also me, in pixels</span>
            </figcaption>
          </figure>
        </div>
        <div className="wrap">
          <div className="stats">
            {ABOUT_STATS.map((s) => (
              <div key={s.label} className="stat">
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
