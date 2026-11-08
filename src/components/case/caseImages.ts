// Real pixel sizes of the case study images (src/data/cases.ts), so every <img> gets width/height and the
// browser reserves its space before it loads. Read from the image files; add a line when you add an image.

const SIZES: Record<string, { width: number; height: number }> = {
  '/images/work/chairo/desktop.webp': { width: 1600, height: 1000 },
  '/images/work/chairo/mockup.webp': { width: 1600, height: 1000 },
  '/images/work/chairo/mobile-1.webp': { width: 736, height: 1600 },
  '/images/work/chairo/mobile-2.webp': { width: 736, height: 1600 },
  '/images/work/chairo/mobile-3.webp': { width: 736, height: 1600 },
  '/images/work/top-one-trader/desktop.webp': { width: 1600, height: 971 },
  '/images/work/top-one-trader/mobile-1.webp': { width: 1206, height: 2043 },
  '/images/work/top-one-trader/mobile-2.webp': { width: 826, height: 1600 },
  '/images/work/top-one-trader/mobile-3.webp': { width: 826, height: 1600 },
  '/images/work/wealthquest/hero.avif': { width: 2928, height: 1716 },
  '/images/work/wealthquest/mobile-1.webp': { width: 786, height: 1716 },
  '/images/work/wealthquest/mobile-2.webp': { width: 786, height: 1716 },
  '/images/work/wealthquest/mobile-3.webp': { width: 786, height: 1716 },
}

/** width/height props for an image path; empty when the size isn't listed. */
export function caseImageSize(src: string): { width?: number; height?: number } {
  return SIZES[src] ?? {}
}
