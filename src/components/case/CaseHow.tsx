import { useEffect, useRef, useState } from 'react'
import type { CaseStep, CaseStudy } from '../../types/project'
import { caseImageSize } from './caseImages'

// One step's window: the title bar with its file name, then the image on a stage.
// wide: the image contained on beige. phone: the phone on the grid with grass, cropped by the stage.
function StepWindow({ step, className = '', lazy = false }: { step: CaseStep; className?: string; lazy?: boolean }) {
  return (
    <div className={`cs-win ${className}`}>
      <div className="cs-wbar" aria-hidden="true">
        <i></i>
        <i></i>
        <i></i>
        <b>{step.fileName}</b>
      </div>
      <div className="cs-stage">
        {step.kind === 'wide' ? (
          <div className="cs-wide">
            <img src={step.src} alt={step.alt} loading={lazy ? 'lazy' : undefined} {...caseImageSize(step.src)} />
          </div>
        ) : (
          <div className="cs-tall cs-grid">
            <div className="cs-ph">
              <img src={step.src} alt={step.alt} loading={lazy ? 'lazy' : undefined} {...caseImageSize(step.src)} />
            </div>
            <div className="cs-fgrass" aria-hidden="true" />
          </div>
        )}
      </div>
    </div>
  )
}

// "How we built it" (#how). From 1025px: a sticky window on the left shows the active step's image, and the
// steps scroll past on the right. The active step is the one crossing the middle 10% of the viewport (an
// IntersectionObserver on the page scroll); clicking a step also activates it. At 1024px and below the sticky
// column is hidden (case.css) and every step shows its own window above its text.
export default function CaseHow({ how }: { how: CaseStudy['how'] }) {
  const { title, intro, steps } = how
  const [active, setActive] = useState(0)
  const articles = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step))
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    for (const el of articles.current) if (el) io.observe(el)
    return () => io.disconnect()
  }, [steps])

  const current = steps[active] ?? steps[0]

  return (
    <section className="cs-how" id="how" aria-labelledby="cs-how-title">
      <div className="cs-hhead">
        <div>
          <p className="px-label">
            <i></i>How we built it
          </p>
          <h2 className="cs-h2" id="cs-how-title">
            {title.lead}
            <span>{title.accent}</span>
          </h2>
        </div>
        <p className="cs-lead">{intro}</p>
      </div>

      <div className="cs-scrolly">
        <div className="cs-stick">
          {/* key: a new step remounts the window body, so its pop-in animation plays */}
          <StepWindow key={active} step={current} />
          <div className="cs-sprog">
            <span>
              Step {active + 1} / {steps.length}
            </span>
            <span className="cs-pbar" aria-hidden="true">
              {steps.map((s, i) => (
                <i key={s.fileName + i} className={i <= active ? 'on' : undefined}></i>
              ))}
            </span>
          </div>
        </div>

        <div className="cs-steps">
          {steps.map((s, i) => (
            <article
              key={s.fileName + i}
              ref={(el) => {
                articles.current[i] = el
              }}
              data-step={i}
              className={i === active ? 'cs-stepx on' : 'cs-stepx'}
              onClick={() => setActive(i)}
            >
              <StepWindow step={s} lazy className={`cs-inl ${s.kind === 'wide' ? 'cs-inl-w' : 'cs-inl-t'}`} />
              <span className="cs-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
