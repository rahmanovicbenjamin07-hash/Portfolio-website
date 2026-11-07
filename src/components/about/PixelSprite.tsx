import type { Sprite } from './sprites'

// Draws a pixel icon from sprites.ts as one 1×1 <rect> per pixel, like the reference SVGs. Size it with CSS.
export default function PixelSprite({ sprite }: { sprite: Sprite }) {
  return (
    <svg viewBox={`0 0 ${sprite.width} ${sprite.height}`} shapeRendering="crispEdges" aria-hidden="true">
      {sprite.rows.flatMap((row, y) =>
        [...row].map((c, x) => (c === '.' ? null : <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={sprite.palette[c]} />)),
      )}
    </svg>
  )
}
