// Real pixel sizes of the project images used by the case-study components (project.image, mobileShots, the Next
// project card), so every <img> gets width/height and the browser reserves its space before it loads.
// The Project type (src/types/project.ts) only carries the image path; add a line here when you add a project image.
// Sizes read from the files with ffprobe.

const IMAGE_SIZES: Record<string, { width: number; height: number }> = {
  "/images/work/chairo/hero.webp": { width: 1600, height: 1000 },
  "/images/work/chairo/mobile-1.webp": { width: 736, height: 1600 },
  "/images/work/chairo/mobile-2.webp": { width: 736, height: 1600 },
  "/images/work/chairo/mobile-3.webp": { width: 736, height: 1600 },
  "/images/topone-trader.jpg": { width: 1600, height: 971 },
  "/images/top-one-trader/mobile-hero.avif": { width: 1206, height: 2043 },
  "/images/top-one-trader/mobile-challanges%20(1).avif": { width: 826, height: 1600 },
  "/images/top-one-trader/mobile-pricing.avif": { width: 826, height: 1600 },
  "/images/work/wealthquest/hero.avif": { width: 2928, height: 1716 },
  "/images/work/wealthquest/mobile-1.webp": { width: 786, height: 1716 },
  "/images/work/wealthquest/mobile-2.webp": { width: 786, height: 1716 },
  "/images/work/wealthquest/mobile-3.webp": { width: 786, height: 1716 },
};

/** width/height props for an image path; empty when the size isn't listed (the CSS box still sets the shape). */
export function imageSize(src: string): { width?: number; height?: number } {
  return IMAGE_SIZES[src] ?? {};
}
