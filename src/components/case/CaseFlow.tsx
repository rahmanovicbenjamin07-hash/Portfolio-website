import type { CSSProperties } from 'react'
import type { FlowStep, MobileShot } from '../../types/project'
import SectionHead from './SectionHead'
import { caseImageSize } from './caseImages'
import './CaseFlow.css'

// The phone row, copied from design-reference/case-study/case-study.html (.flow / .step / .phone .in .s + .isl).
// Two uses:
// - Flow: each phone with its number, title and line (project.flow).
// - On mobile: a project with phone screenshots but no flow; same row, no numbers or captions.
// Every phone in a row has the same screen shape, so the phones are all the same height: the widest screenshot's
// shape (caseImages.ts). It shows uncropped; a taller one fills the screen from the top and loses only a strip at
// the bottom, never the sides or the top. Without known sizes each screen keeps its own screenshot's shape.

// className + style for a .flow row: "same" and --screen (width / height) when every image's size is known.
// tallest (rows with the status bar): the narrowest screenshot's shape instead, so the phones are taller and every
// screenshot shows its full height; a wider one loses a thin strip at each side instead.
function rowScreen(images: string[], tallest = false): { className: string; style?: CSSProperties } {
  const sizes = images.map(caseImageSize)
  if (sizes.length === 0 || sizes.some((s) => !s.width || !s.height)) return { className: 'flow' }
  const pick = sizes.reduce((a, b) => {
    const wider = b.width! / b.height! > a.width! / a.height!
    return tallest ? (wider ? a : b) : wider ? b : a
  })
  return { className: 'flow same', style: { '--screen': `${pick.width} / ${pick.height}` } as CSSProperties }
}

// statusBar: a black bar at the top of the screen, under the camera island, with the screenshot below it.
function Phone({ image, alt, statusBar = false }: { image: string; alt: string; statusBar?: boolean }) {
  return (
    <div className="phone">
      <div className="in">
        <div className="s">
          {statusBar && <span className="stbar" aria-hidden="true"></span>}
          <img src={image} alt={alt} {...caseImageSize(image)} loading="lazy" decoding="async" />
          <span className="isl"></span>
        </div>
      </div>
    </div>
  )
}

type FlowProps = { num: string; label: string; title: string; accent: string; steps: FlowStep[] }

export default function CaseFlow({ num, label, title, accent, steps }: FlowProps) {
  return (
    <section className="wrap sec" aria-labelledby="flow-title">
      <SectionHead id="flow-title" num={num} label={label} title={title} accent={accent} />
      <div {...rowScreen(steps.map((s) => s.image))}>
        {steps.map((s, i) => (
          <div key={s.image} className="step">
            <Phone image={s.image} alt={s.alt} />
            <span className="n">{i + 1}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function CaseOnMobile({ num, shots, statusBar = false }: { num: string; shots: MobileShot[]; statusBar?: boolean }) {
  const row = rowScreen(shots.map((s) => s.image), statusBar)
  return (
    <section className="wrap sec" aria-labelledby="mobile-title">
      <SectionHead id="mobile-title" num={num} label="On mobile" title="How it looks" accent="on a phone." />
      <div {...row} className={statusBar ? `${row.className} has-bar` : row.className}>
        {shots.map((s) => (
          <div key={s.image} className="step">
            <Phone image={s.image} alt={s.alt} statusBar={statusBar} />
          </div>
        ))}
      </div>
    </section>
  )
}
