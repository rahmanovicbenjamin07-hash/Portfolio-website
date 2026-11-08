import { useEffect, useRef, useState } from 'react'
import site from '../../data/site'
import type { CaseStudy } from '../../types/project'
import PixelArrow from '../pixel/PixelArrow'
import CaseSky from './CaseSky'
import PixelIcon from './PixelIcon'

const external = /^https?:\/\//.test(site.letsTalkUrl)

// "Level complete": the sky again, with a centred pixel card. The three stars pop in one after another
// the first time the card scrolls into view.
export default function CaseLevel({ name, next }: { name: string; next: CaseStudy['next'] }) {
  const card = useRef<HTMLDivElement>(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = card.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      setSeen(true)
      io.disconnect()
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section className="cs-sky cs-end" aria-labelledby="cs-end-title">
      <CaseSky variant="end" />
      <div className="cs-skyc">
        <div ref={card} className={seen ? 'pxbox cs-lvl in' : 'pxbox cs-lvl'}>
          <span className="cs-badge">★ Level complete · {name}</span>
          <div className="cs-stars" aria-hidden="true">
            <PixelIcon name="star" />
            <PixelIcon name="star" />
            <PixelIcon name="star" />
          </div>
          <h2 id="cs-end-title">
            Want something <span>like {name}?</span>
          </h2>
          <div className="cs-acts">
            <a className="btn btn-primary lg" href={site.letsTalkUrl} {...(external ? { target: '_blank', rel: 'noopener' } : {})}>
              Let’s talk <PixelArrow />
            </a>
            <a className="btn lg" href={next.href}>
              Next level: {next.name} <PixelArrow />
            </a>
          </div>
          <a className="cs-mail" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </div>
      </div>
    </section>
  )
}
