// Home page "Selected work" section (src/components/home/Work.tsx): header copy and the three project cards, in order.
// Top One Trader and WealthQuest facts come from src/data/projects.ts. Leave a field out rather than inventing it.

export const WORK_HEADER = {
  label: "01 — Selected work",
  title: "Websites and apps",
  accent: "I designed and built.",
  intro: "Three recent projects, from a booking app to marketing sites. Every one designed, built and launched.",
  button: "Start a project",
};

export type WorkCard = {
  slug: string;
  name: string;
  /** File name shown in the card's window bar. */
  file: string;
  /** "App" gets the blue badge; "Website" the dark one. */
  badge: "App" | "Website";
  /** "Type · year". Left out when the type isn't on record. */
  meta?: string;
  summary: string;
  role: string;
  tags: string[];
};

const work: WorkCard[] = [
  {
    slug: "chairo",
    name: "Chairo",
    file: "chairo.png",
    badge: "App",
    meta: "iOS & Android app · 2026",
    summary: "Booking app for barbershops. Clients book a cut in three taps, barbers stop running their week from DMs.",
    role: "Design, development, QA",
    // Tags name the kind of work, not the tools (owner's wording).
    tags: ["Front-end", "Back-end", "Web design"],
  },
  {
    slug: "top-one-trader",
    name: "Top One Trader",
    file: "top-one-trader.png",
    badge: "Website",
    // No project type on record (projects.ts has year 2026 but no platform), so no meta line yet.
    summary: "The main site of a prop trading firm that funds traders on its own capital.",
    role: "Webflow developer",
    tags: ["Webflow development", "Custom code", "Figma"],
  },
  {
    slug: "wealthquest",
    name: "WealthQuest",
    file: "wealthquest.png",
    badge: "Website",
    meta: "Marketing website · 2026",
    summary: "Pixel-perfect Webflow build of a membership club's site, from Figma, with custom-coded animations.",
    role: "Webflow developer",
    tags: ["Webflow development", "Custom code", "Figma"],
  },
];

export default work;
