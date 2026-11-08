// One project (case study) page at /work/:slug. Data lives in src/data/projects.ts, the template in
// src/pages/CaseStudy.tsx. Every section field is optional: a section renders only when its data is there,
// and the section labels are numbered (01, 02, …) in the order they actually render.

/** "With" cell in the hero facts row. With a url, the name links to it (new tab). */
export type Collaborator = { name: string; url?: string };

/** Section heading: "<title> <span>accent</span>", the accent in blue. label is the small "0N — Label" line. */
export type SectionHeading = { label: string; title: string; accent: string };

export type FlowStep = { image: string; alt: string; title: string; text: string };

/** Pixel icons drawn by src/components/case/PixelIcon.tsx. */
export type FeatureIcon = 'calendar' | 'no-show' | 'stats' | 'link';
export type Feature = { title: string; text: string; icon: FeatureIcon };

export type BuildStep = { title: string; text: string };

/** A phone screenshot for the "On mobile" row (used when a project has no flow). */
export type MobileShot = { image: string; alt: string };

export type Project = {
  slug: string;
  /** Short title: the hero h1, the breadcrumb and the Next project card. */
  name: string;
  /** One sentence. Meta description, JSON-LD description and the hero intro when there is no lead. */
  summary: string;
  /** JSON-LD only (src/seo/jsonLd.ts). */
  client: string;
  year: string;
  role: string;

  // Hero
  /** Blue one-line subtitle under the h1. */
  subtitle?: string;
  /** Hero intro paragraph. Falls back to summary. */
  lead?: string;
  with?: Collaborator;
  platform?: string;
  builtWith?: string;
  heroImage?: string;
  heroAlt?: string;
  liveUrl?: string;
  /** Text after "Visit" on the live-site buttons. Falls back to the URL's host name. */
  liveLabel?: string;

  // Sections, in page order
  overview?: { challenge: string; goal: string; result: string };
  flow?: SectionHeading & { steps: FlowStep[] };
  /** Phone screenshots without captions: rendered as the "On mobile" section when there is no flow. */
  mobileShots?: MobileShot[];
  /** "On mobile" phones get a black status bar under the camera island, and the screens take the tallest
   *  screenshot's shape (taller phones). For screenshots whose top content would sit under the island. */
  mobileStatusBar?: boolean;
  features?: SectionHeading & { items: Feature[] };
  design?: {
    /** Section heading (the label is always "Design"). */
    title: string;
    accent: string;
    /** Hex colours, e.g. "#141414". */
    colors: string[];
    typeSample: string;
    typeNote: string;
    brandLine: string;
    brandNote: string;
  };
  build?: SectionHeading & { steps: BuildStep[] };
  result?: { title: string; accent: string; text: string };
  nextSlug?: string;

  // JSON-LD only (src/seo/jsonLd.ts reads these; same values as heroImage / with above)
  image?: string;
  partner?: { name: string; url: string };
};
