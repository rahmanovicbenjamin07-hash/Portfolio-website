import { useEffect, useRef, useState } from 'react'
import experience from '../../data/experience'
import './Experience.css'

// "01 — Experience", copied from design-reference/about.html: intro on the left, the dotted timeline on
// the right. .wrap/.sec/.h2/.ab-two/.ab-side come from src/styles/pages.css. Content: src/data/experience.ts.
// The timeline draws in (line, then the entries one by one; current roles pulse): CSS in Experience.css. While the
// list is below the fold it gets .wait (held on the first frame) until it scrolls into view.
export default function Experience() {
  const ref = useRef<HTMLOListElement>(null)
  const [wait, setWait] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (el.getBoundingClientRect().top < window.innerHeight) return
    setWait(true)
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        setWait(false)
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section className="wrap sec ab-two" aria-labelledby="exp-title">
      <div>
        <p className="px-label">
          <i></i>01 — Experience
        </p>
        <h2 id="exp-title" className="h2">
          What I've done <span>so far.</span>
        </h2>
        <p className="ab-side">The short version of my path: where I worked, what I learned and what I do now.</p>
      </div>
      <ol ref={ref} className={wait ? 'tl wait' : 'tl'}>
        {experience.map((item) => (
          <li key={`${item.time}-${item.role}`} className={item.now ? 'now' : undefined}>
            <time>{item.time}</time>
            <h3>{item.role}</h3>
            <span className="where">{item.where}</span>
            <p>{item.text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
