import type { FeatureIcon } from '../../types/project'

// The 12 × 12 pixel icons of the Features cards, copied pixel for pixel from the reference's <svg> rects
// (design-reference/case-study/case-study.html). One letter per pixel, "." is empty.
const COLORS: Record<string, string> = {
  k: '#1C2B19', // outline
  b: '#146EF5', // blue
  l: '#E4ECD6', // light sage
  r: '#E55B4D', // red
  g: '#2E9E4F', // green
}

const ICONS: Record<FeatureIcon, string[]> = {
  calendar: [
    '..kkkkkkkk..',
    '.kbbbbbbbbk.',
    'kbkkbbbbkkbk',
    'kbbbbbbbbbbk',
    'kllllllllllk',
    'klklklklkllk',
    'kllllllllllk',
    'klklkbbklllk',
    'klllllbblllk',
    'klklklklkllk',
    'kllllllllllk',
    'kkkkkkkkkkkk',
  ],
  'no-show': [
    '...kkkkkk...',
    '..krrrrrrk..',
    '.krrlllllrk.',
    'krrlllllrrrk',
    'krllllllrrlk',
    'krlllllrrllk',
    'krllllrrrllk',
    'krlllrrllllk',
    'krrlrrllllrk',
    '.krrrrrrrrk.',
    '..krrrrrrk..',
    '...kkkkkk...',
  ],
  stats: [
    '............',
    '........kkk.',
    '........kgk.',
    '....kkk.kgk.',
    '....kgk.kgk.',
    'kkk.kgk.kgk.',
    'kgk.kgk.kgk.',
    'kgk.kgk.kgk.',
    'kgk.kgk.kgk.',
    'kgk.kgk.kgk.',
    'kkkkkkkkkkkk',
    '............',
  ],
  link: [
    '............',
    '..kkkk......',
    '.kbbbbk.....',
    'kbk..kbk....',
    'kbk..kbbkk..',
    '.kbbkbbbbbk.',
    '..kbbbbkbbk.',
    '....kkbk..kb',
    '....kbk..kbk',
    '.....kbbbbk.',
    '......kkkk..',
    '............',
  ],
}

export default function PixelIcon({ name }: { name: FeatureIcon }) {
  return (
    <svg viewBox="0 0 12 12" shapeRendering="crispEdges" aria-hidden="true">
      {ICONS[name].flatMap((row, y) =>
        [...row].map((c, x) => (c === '.' ? null : <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={COLORS[c]} />)),
      )}
    </svg>
  )
}
