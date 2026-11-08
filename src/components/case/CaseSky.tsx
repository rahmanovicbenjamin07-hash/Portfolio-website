import type { CSSProperties } from 'react'

// The pixel sky behind the hero and the "Level complete" section (same art as Home's "03 — How I work"):
// drifting clouds, two flapping birds, the meadow, the swaying grass and the white pixel dissolve.
// Positions are the reference's inline styles (design-reference/case-study/*.html). Decorative only.
type Layer = { top: number; delay?: string; duration?: string; left?: string; right?: string }

const PRESETS: Record<'hero' | 'end', { clouds: [Layer, Layer, Layer]; birds: [Layer, Layer]; dissolve: 'top' | 'bottom' }> = {
  hero: {
    clouds: [
      { top: 96, delay: '-35s' },
      { top: 560, delay: '-80s' },
      { top: 1100, delay: '-12s' },
    ],
    birds: [
      { top: 150, left: '60%' },
      { top: 184, left: '64%', duration: '.46s', delay: '-.2s' },
    ],
    // The meadow breaks into white pixels above the white "How we built it" section.
    dissolve: 'bottom',
  },
  end: {
    clouds: [
      { top: 90, delay: '-30s' },
      { top: 260, delay: '-75s' },
      { top: 420, delay: '-5s' },
    ],
    birds: [
      { top: 96, right: '20%' },
      { top: 130, right: '16%', duration: '.46s', delay: '-.2s' },
    ],
    // Flipped on the top edge; no bottom dissolve, so the grass meets the footer.
    dissolve: 'top',
  },
}

const style = (l: Layer): CSSProperties => ({
  top: l.top,
  left: l.left,
  right: l.right,
  animationDelay: l.delay,
  animationDuration: l.duration,
})

export default function CaseSky({ variant }: { variant: 'hero' | 'end' }) {
  const { clouds, birds, dissolve } = PRESETS[variant]
  return (
    <div className="cs-skybg" aria-hidden="true">
      {clouds.map((c, i) => (
        <div key={`c${i}`} className={`px cs-cl cs-c${i + 1}`} style={style(c)} />
      ))}
      {birds.map((b, i) => (
        <div key={`b${i}`} className="px cs-bird" style={style(b)} />
      ))}
      <div className="px cs-land" />
      <div className="px cs-grass" />
      <div className={`px cs-dis ${dissolve === 'top' ? 'cs-dis-t' : 'cs-dis-b'}`} />
    </div>
  )
}
