import Seo from '../seo/Seo'
import { NOT_FOUND_META } from '../seo/meta'
import Nav from '../components/home/Nav'
import PixelArrow from '../components/pixel/PixelArrow'
import PixelCursor from '../components/pixel/PixelCursor'
import './NotFound.css'
import PixelText from '../components/PixelText'

// Pixel 404 page. Prerendered to dist/404.html, which Cloudflare Pages serves with status 404 for unknown URLs;
// the project page also renders it for unknown slugs. The previous 404 styles stay in NotFound.module.css (unused).
// .pixel-page scopes the global pixel styles (src/styles/pixel.css) to this page, as on Home.
export default function NotFound() {
  return (
    <div className="pixel-page">
      {/* Title and description live in src/seo/meta.ts. */}
      <Seo {...NOT_FOUND_META} path="/404" noindex />
      <section className="nf" aria-labelledby="nf-title">
        <div className="nf-scene" aria-hidden="true">
          <img className="nf-terrain" src="/pixel/terrain-clean.png" alt="" width={256} height={144} decoding="async" />
          <span className="px nf-cloud nf-c1"></span>
          <span className="px nf-cloud nf-c2"></span>
          <span className="px nf-grass"></span>
        </div>
        <Nav variant="page" hasFooter={false} />
        <main className="nf-main">
          <div className="pxbox nf-panel">
            <p className="px-label"><i></i>404</p>
            <h1 id="nf-title" className="nf-title">Game over</h1>
            <p className="nf-text">This page wandered off the map.</p>
            <div className="nf-actions">
              <a href="/" className="btn btn-primary nf-start">
                <PixelText text="Press start" trigger="hover" /> <PixelArrow color="#ffffff" />
              </a>
              <a href="/#work" className="btn"><PixelText text="See my work" trigger="hover" /></a>
            </div>
          </div>
        </main>
      </section>
      <PixelCursor />
    </div>
  )
}
