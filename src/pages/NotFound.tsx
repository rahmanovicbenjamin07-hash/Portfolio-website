import Seo from '../seo/Seo'
import Footer from '../sections/Footer'
import styles from './NotFound.module.css'

// Prerendered to dist/404.html, which Cloudflare Pages serves with status 404 for unknown URLs.
export default function NotFound() {
  return (
    <>
      <Seo
        title="Page Not Found | Benjamin Rahmanović, Webflow Expert"
        description="This page doesn't exist, but your next custom Webflow website can. Meet the Webflow expert developer behind premium sites for ambitious companies."
        noindex
      />
      <div id="top">
        <header className={styles.header}>
          <nav aria-label="Main">
            <a href="/" className={styles.logo}>
              Benjamin R.
            </a>
          </nav>
        </header>
        <main className={styles.main}>
          <div className={styles.label}>[ 404 ]</div>
          <h1 className={styles.heading}>This page doesn't exist.</h1>
          <p className={styles.text}>The link may be broken, or the page may have moved.</p>
          <a href="/" className={styles.button}>
            Back to the homepage
          </a>
        </main>
        <Footer />
      </div>
    </>
  )
}
