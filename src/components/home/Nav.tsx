import { useEffect, useRef, useState } from 'react'
import site from '../../data/site'
import { PROJECTS } from '../../data/projects'
import './Nav.css'
import PixelText from '../PixelText'
import Logo from '../Logo'

// An external booking link (Calendly, Upwork, Meet) opens in a new tab; an in-page anchor doesn't.
const external = /^https?:\/\//.test(site.letsTalkUrl)

type LinkKey = 'work' | 'about' | 'contact'

// Work: the Selected work section on the home page, the first project everywhere else.
// About: the About page (active there: <Nav current="about" /> in components/about/AboutHero.tsx).
// Contact: always the footer (#contact, the Contact section). Pages without it (the 404) use the home page's.
function navLinks(variant: 'home' | 'page', hasFooter: boolean): { key: LinkKey; href: string; label: string }[] {
  return [
    { key: 'work', href: variant === 'home' ? '#work' : `/work/${PROJECTS[0].slug}`, label: 'Work' },
    { key: 'about', href: '/about', label: 'About' },
    { key: 'contact', href: hasFooter ? '#contact' : '/#contact', label: 'Contact' },
  ]
}

type NavProps = {
  /** home (default): absolute over the hero scene. page: static, in normal flow, same look. */
  variant?: 'home' | 'page'
  /** The current page's link gets .on and aria-current="page" (e.g. "work" on a project page). */
  current?: LinkKey
  /** The page renders the footer (components/home/Contact, id="contact"). False on the 404 page. */
  hasFooter?: boolean
}

export default function Nav({ variant = 'home', current, hasFooter = true }: NavProps) {
  const links = navLinks(variant, hasFooter)
  // Phone menu (below 760px, where .links is hidden). Nav.css hides the button and panel on wider screens.
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      buttonRef.current?.focus()
    }
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node
      if (panelRef.current?.contains(t) || buttonRef.current?.contains(t)) return
      setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  const linkState = (key: LinkKey) => (key === current ? { className: 'on', 'aria-current': 'page' as const } : {})

  return (
    <header className={variant === 'page' ? 'nav nav-page' : 'nav'}>
      <Logo iconOnly />
      <nav className="links" aria-label="Main">
        {links.map((l) => (
          <a key={l.key} href={l.href} {...linkState(l.key)}>{l.label}</a>
        ))}
      </nav>
      <div className="nav-actions">
        <a
          href={site.letsTalkUrl}
          className="btn btn-dark btn-sm"
          {...(external ? { target: '_blank', rel: 'noopener' } : {})}
        >
          <PixelText text="Let's talk" trigger="hover" />
        </a>
        <button
          ref={buttonRef}
          type="button"
          className="btn nav-menu-btn"
          aria-label="Menu"
          aria-expanded={open}
          aria-controls="nav-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {/* three pixel bars */}
          <svg viewBox="0 0 8 7" shapeRendering="crispEdges" fill="currentColor" aria-hidden="true">
            <rect x="0" y="0" width="8" height="1"></rect>
            <rect x="0" y="3" width="8" height="1"></rect>
            <rect x="0" y="6" width="8" height="1"></rect>
          </svg>
        </button>
      </div>
      <div ref={panelRef} id="nav-menu" className="nav-menu" hidden={!open}>
        <nav aria-label="Main (mobile)">
          {links.map((l) => (
            <a key={l.key} href={l.href} {...linkState(l.key)} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
        </nav>
      </div>
    </header>
  )
}
