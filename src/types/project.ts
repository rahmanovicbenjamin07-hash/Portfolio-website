export type MobileShot = { image?: string; title: string; caption: string };
export type Project = {
  slug: string;
  name: string;
  summary: string;
  client: string;
  year: string;
  role: string;
  /** Who the project was made with; shown in the case-study hero facts row as "With <name>" (a link). */
  partner?: { name: string; url: string };
  tools: string;
  image?: string;
  imageAlt?: string;
  mobileShots: MobileShot[];
  challenge: string;
  goal: string;
  result: string;
  liveUrl?: string;
  nextSlug?: string;
};
