import site from '../../data/site'
import Logo from '../Logo'
import './Footer.css'

// Dark footer strip at the bottom of every page: logo, legal links and ©.
// Rendered by components/home/Contact.tsx (pages with the Contact block) and directly by pages without it (Privacy).
export default function Footer() {
  return (
    <footer className="cd-banner">
      {/* Same icon-only mark as the Nav; `dark` swaps its outline to light so it shows on the dark strip. */}
      <Logo dark iconOnly />
      <div className="cd-foot">
        <nav aria-label="Legal">
          <a href="/privacy">Privacy policy</a>
        </nav>
        <span>© 2026 {site.name}</span>
      </div>
    </footer>
  )
}
