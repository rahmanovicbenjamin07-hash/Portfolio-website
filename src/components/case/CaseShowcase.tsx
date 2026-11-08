import { useRef, useState, type KeyboardEvent } from 'react'
import type { CaseStudy } from '../../types/project'
import PixelIcon from './PixelIcon'
import { caseImageSize } from './caseImages'

type Mode = 'desktop' | 'mobile'
const MODES: { key: Mode; label: string }[] = [
  { key: 'desktop', label: 'Desktop' },
  { key: 'mobile', label: 'Mobile' },
]

// "How it looks": a Desktop | Mobile pixel segmented control (tabs) over a window showing the site on a laptop
// (desktop.webp, 16:10, cropped from the top) or as three phones on the grid with grass. Desktop is the default.
// Keyboard: Left/Right (and Home/End) move between the tabs, as in the WAI-ARIA tabs pattern.
export default function CaseShowcase({ showcase }: { showcase: CaseStudy['showcase'] }) {
  const [mode, setMode] = useState<Mode>('desktop')
  const tabs = useRef<(HTMLButtonElement | null)[]>([])

  const select = (i: number) => {
    const next = (i + MODES.length) % MODES.length
    setMode(MODES[next].key)
    tabs.current[next]?.focus()
  }
  const onKeyDown = (e: KeyboardEvent, i: number) => {
    const move = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: MODES.length - 1 }[e.key]
    if (move === undefined) return
    e.preventDefault()
    select(move)
  }

  return (
    <div className="cs-show">
      <div className="cs-shead">
        <div>
          <p className="px-label">
            <i></i>How it looks
          </p>
          <h2>
            On a laptop <span>and in your pocket.</span>
          </h2>
        </div>
        <div className="cs-seg" role="tablist" aria-label="Device">
          {MODES.map((m, i) => (
            <button
              key={m.key}
              ref={(el) => {
                tabs.current[i] = el
              }}
              type="button"
              role="tab"
              id={`cs-tab-${m.key}`}
              aria-selected={mode === m.key}
              aria-controls="cs-showpanel"
              tabIndex={mode === m.key ? 0 : -1}
              onClick={() => setMode(m.key)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              <PixelIcon name={m.key} />
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="cs-win" id="cs-showpanel" role="tabpanel" aria-labelledby={`cs-tab-${mode}`}>
        <div className="cs-wbar" aria-hidden="true">
          <i></i>
          <i></i>
          <i></i>
          <b>
            {showcase.windowName} — {mode}
          </b>
        </div>
        {/* key: the new view remounts, so its pop-in animation plays on every switch */}
        <div className="cs-sbody" key={mode}>
          {mode === 'desktop' ? (
            <img src={showcase.desktop.src} alt={showcase.desktop.alt} {...caseImageSize(showcase.desktop.src)} />
          ) : (
            <div className="cs-grid cs-mgrid">
              <div className="cs-phones">
                {showcase.mobile.map((m) => (
                  <div className="cs-ph" key={m.src}>
                    <img src={m.src} alt={m.alt} {...caseImageSize(m.src)} />
                  </div>
                ))}
              </div>
              <div className="cs-fgrass" aria-hidden="true" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
