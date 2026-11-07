import type { AnchorHTMLAttributes } from 'react'
import PixelArrow from '../pixel/PixelArrow'
import site from '../../data/site'
import './Contact.css'
import PixelText from '../PixelText'
import Logo from '../Logo'

type Social = { label: string; href: string }

const SOCIALS: Social[] = [
  { label: 'LinkedIn', href: site.socials.linkedin },
  { label: 'GitHub', href: site.socials.github },
  { label: 'Upwork', href: site.socials.upwork },
]

// Real URLs open in a new tab; "#..." placeholders stay on the page.
const ext = (href: string): AnchorHTMLAttributes<HTMLAnchorElement> =>
  /^https?:/.test(href) ? { target: '_blank', rel: 'noopener' } : {}

export default function Contact() {
  const { name, email, letsTalkUrl } = site
  const isEmail = email.includes('@') && !email.startsWith('[')

  return (
    <>
      <section id="contact" className="cd" aria-labelledby="contact-title">
        <div className="cd-grid">
          <div>
            <p className="px-label"><i></i>05 — Contact</p>
            <h2 id="contact-title" style={{ margin: '18px 0 0', fontFamily: "'Inter Tight', Inter, sans-serif", fontSize: 'clamp(44px, 4.6vw, 68px)', lineHeight: 1.04, fontWeight: 500, letterSpacing: '-0.03em', color: '#0E1B26' }}>
              Let's build <span style={{ color: '#4A6070' }}>your next website.</span>
            </h2>
            {/* Contact also closes the project pages, so section links are absolute ("/#work"): on the home page that's
                still an in-page jump (only the #fragment changes), elsewhere it opens the home page at that section. */}
            <nav className="jump" aria-label="Jump to section">
              <span>Jump to</span>
              <a href="/#work">Work</a>
              <a href="/#services">Services</a>
              <a href="/#process">Process</a>
              <a href="/#testimonials">Testimonials</a>
            </nav>
            <div className="cols">
              <ul>
                <li><a href="/#top">Homepage</a></li>
                <li><a href="/#work">All work</a></li>
                <li><a href="/about">About me</a></li>
                {/* This section is the footer on every page it's on, so Contact stays on the current page. */}
                <li><a href="#contact">Contact</a></li>
              </ul>
              <ul>
                {SOCIALS.map((s) => (
                  <li key={s.label}><a href={s.href} {...ext(s.href)}>{s.label}</a></li>
                ))}
              </ul>
            </div>
            {isEmail ? <a className="cd-mail" href={`mailto:${email}`}>{email}</a> : <span className="cd-mail">{email}</span>}
          </div>
          <div className="cd-right">
            <div className="cd-card">
              <div className="cd-img">
                <img src="/pixel/footer-peek.jpg" alt="Pixel art of me in my blue hoodie leaning over a grassy ledge, smiling and looking down at the button" width={768} height={1376} loading="lazy" decoding="async" />
                <div className="cd-over">
                  <h3>Got a project in mind? <span>Let's build it together.</span></h3>
                  <a href={letsTalkUrl} className="btn btn-primary cd-cta" {...ext(letsTalkUrl)}>
                    <PixelText text="Let's talk" trigger="hover" /> <PixelArrow color="#ffffff" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="cd-banner">
        <Logo dark />
        <span>© 2026 {name}</span>
      </footer>
    </>
  )
}
