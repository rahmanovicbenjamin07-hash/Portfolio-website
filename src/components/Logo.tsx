import { NAME } from '../seo/site'
import './Logo.css'

type LogoProps = {
  /** Dark backgrounds (the footer strip): the dark icon and light text. */
  dark?: boolean
  /** Just the pixel initials icon, no name (the Nav). The aria-label still names the link. */
  iconOnly?: boolean
}

// Pixel icon + name, linking home. Used in the Nav (every page, icon only) and the footer (components/home/Contact.tsx).
export default function Logo({ dark = false, iconOnly = false }: LogoProps) {
  // Icon only: 4× the 16px pixel grid, so the drawn mark is as tall as the other nav items (Logo.css).
  const size = iconOnly ? 64 : 32
  const className = ['logo', dark && 'logo-dark', iconOnly && 'logo-icon-only'].filter(Boolean).join(' ')
  return (
    <a href="/" className={className} aria-label={`${NAME}, home`}>
      <img
        src={dark ? '/brand/logo-icon-dark.svg' : '/brand/logo-icon.svg'}
        width={size}
        height={size}
        alt=""
        style={{ imageRendering: 'pixelated' }}
      />
      {!iconOnly && <span>{NAME}</span>}
    </a>
  )
}
