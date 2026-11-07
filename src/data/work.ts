// Home page "Selected work" cards (src/components/home/Work.tsx).
// Cards appear in this order: the featured card across the full width (first row), then the others two per row.
// Text in [brackets] is placeholder content.

export type WorkImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type WorkProject = {
  name: string;
  href: string;
  /** Screenshot shown on the card. Leave out to show the placeholder box. */
  image?: WorkImage;
  /** Text shown in the placeholder box when there is no image yet. */
  placeholder?: string;
  /** Full-width card with a 16:9 screenshot (Work.css .featured). */
  featured?: boolean;
};

const work: WorkProject[] = [
  {
    name: "Chairo",
    href: "/work/chairo",
    image: {
      src: "/images/work/chairo/hero.webp",
      alt: "Chairo website hero with the client and owner app screens",
      width: 1600,
      height: 1000,
    },
    featured: true,
  },
  {
    name: "Top One Trader",
    href: "/work/top-one-trader",
    image: {
      src: "/images/topone-trader.jpg",
      alt: "Top One Trader website built in Webflow: a prop trading firm home page",
      width: 1600,
      height: 971,
    },
  },
  {
    name: "WealthQuest",
    href: "/work/wealthquest",
    image: {
      src: "/images/work/wealthquest/hero.avif",
      alt: "WealthQuest homepage hero: 'One club. Every dimension of wealth.' with a gold coin",
      width: 2928,
      height: 1716,
    },
  },
];

export default work;
