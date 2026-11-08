// Pixel glyphs of the case study page, copied pixel for pixel from the <svg> rects in
// design-reference/case-study/chairo.html. One character per pixel: "." is empty, a digit picks a colour.
// The arrow is the site's own components/pixel/PixelArrow.
type Glyph = { rows: string[]; colors: string[] }

const GLYPHS = {
  // Project file check mark (in the dark green box)
  check: {
    rows: ['........', '.......0', '......00', '0....00.', '00..00..', '.0000...', '..00....', '........'],
    colors: ['#F1F5E8'],
  },
  // Desktop | Mobile segmented control
  desktop: {
    rows: ['000000000', '0.......0', '0.......0', '0.......0', '000000000', '...000...', '..00000..'],
    colors: ['currentColor'],
  },
  mobile: {
    rows: ['00000', '0...0', '0...0', '0...0', '0...0', '00000', '00.00'],
    colors: ['currentColor'],
  },
  // Level complete stars
  star: {
    rows: [
      '.....0.....',
      '....010....',
      '....010....',
      '00001110000',
      '.011111110.',
      '..0111110..',
      '..0110110..',
      '.0110.0110.',
      '.010...010.',
      '000.....000',
    ],
    colors: ['#1C2B19', '#E8C547'],
  },
} satisfies Record<string, Glyph>

export type PixelIconName = keyof typeof GLYPHS

export default function PixelIcon({ name, className }: { name: PixelIconName; className?: string }) {
  const { rows, colors }: Glyph = GLYPHS[name]
  return (
    <svg className={className} viewBox={`0 0 ${rows[0].length} ${rows.length}`} shapeRendering="crispEdges" aria-hidden="true">
      {rows.flatMap((row, y) =>
        [...row].map((c, x) =>
          c === '.' ? null : <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={colors[Number(c)]} />,
        ),
      )}
    </svg>
  )
}
