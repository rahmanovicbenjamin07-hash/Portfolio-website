const ROWS = ["....X...", "....XX..", "XXXXXXX.", "XXXXXXXX", "XXXXXXX.", "....XX..", "....X..."];

type PixelArrowProps = {
  color?: string;
  className?: string;
};

export default function PixelArrow({ color = "currentColor", className = "" }: PixelArrowProps) {
  return (
    <svg className={className} viewBox="0 0 8 7" shapeRendering="crispEdges" fill={color} aria-hidden="true">
      {ROWS.flatMap((row, y) => [...row].map((c, x) => (c === "X" ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" /> : null)))}
    </svg>
  );
}
