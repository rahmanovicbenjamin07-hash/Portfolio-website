import type { Project } from '../types/project'

// Project (case study) pages, one template at /work/:slug (src/pages/CaseStudy.tsx). Array order is the order
// everywhere: home Work cards come from src/data/work.ts (same order), Next project follows nextSlug in a loop.
// Top One Trader content comes from the old case-study page (src/pages/TopOneTraderLegacy.tsx), shortened where the
// new layout has less room, facts unchanged. Text in [square brackets] is a placeholder: keep it until the real text exists.

const TOT_IMG = '/images/top-one-trader'
const WQ_IMG = '/images/work/wealthquest'
const CHAIRO_IMG = '/images/work/chairo'

export const PROJECTS: Project[] = [
  {
    slug: 'chairo',
    name: 'Chairo',
    summary:
      'Booking app for barbershops on iOS and Android. Clients book a cut in three taps, barbers stop running their week from DMs.',
    client: 'Own product',
    year: '2026',
    role: 'Design, development and QA',
    partner: { name: 'Amer Talo', url: 'https://amertalo.com/' },
    tools: 'React Native, Expo, Supabase',
    image: `${CHAIRO_IMG}/hero.webp`,
    imageAlt: 'Chairo website hero with the client and owner app screens',
    mobileShots: [
      { image: `${CHAIRO_IMG}/mobile-1.webp`, title: 'Who with?', caption: 'Step 1: pick your barber from a photo carousel, with their next free time shown.' },
      { image: `${CHAIRO_IMG}/mobile-2.webp`, title: 'The service', caption: 'Step 2: your usual services come first, with time and price in KM.' },
      { image: `${CHAIRO_IMG}/mobile-3.webp`, title: 'The time', caption: 'Step 3: a day and time wheel with free slots only. The title fills in as you choose.' },
    ],
    challenge:
      'Barbers lose hours every day arranging appointments through DMs and calls, and clients have no way to see when their barber is free.',
    goal: "One app where clients see a shop's free times and book in three taps, and owners manage services, prices, barbers, recurring appointments and no-shows from their phone. In English and Bosnian.",
    result: 'Live on iOS and Android, with real barbershops taking bookings through it.',
    liveUrl: 'https://chairo.app',
    nextSlug: 'top-one-trader',
  },
  {
    slug: 'top-one-trader',
    name: 'Top One Trader',
    summary: 'The main site of a prop trading firm that funds traders on its own capital.',
    client: 'Top One Trader',
    year: '2026',
    role: 'Webflow developer',
    tools: 'Webflow',
    image: '/images/topone-trader.jpg',
    imageAlt: 'Top One Trader website built in Webflow',
    mobileShots: [
      { image: `${TOT_IMG}/mobile-hero.avif`, title: 'Hero', caption: 'The home page hero on mobile.' },
      // The file name has a space: "mobile-challanges (1).avif"
      { image: `${TOT_IMG}/mobile-challanges%20(1).avif`, title: 'X-DAILY offer', caption: 'The X-DAILY offer on mobile.' },
      { image: `${TOT_IMG}/mobile-pricing.avif`, title: 'Pricing', caption: 'The account pricing table on mobile.' },
    ],
    challenge:
      'A live, high-traffic site where every offer is time-sensitive. Changes have to ship quickly without breaking pricing, banners or checkout links.',
    goal: 'A site that sells as fast as the business moves: new challenge types, launches like Top One 2.0, and promo codes that change week to week.',
    // The old page has no outcome (the split test names no winner), so this stays a placeholder.
    result: '[2–3 sentences: what changed after launch, in plain words.]',
    liveUrl: 'https://toponetrader.com',
    nextSlug: 'wealthquest',
  },
  {
    slug: 'wealthquest',
    name: 'WealthQuest',
    summary: "Pixel-perfect Webflow build of a membership club's marketing site, from Figma, with custom-coded animations.",
    client: 'WealthQuest',
    year: '2026',
    role: 'Webflow developer',
    tools: 'Webflow, Figma, custom code',
    image: `${WQ_IMG}/hero.avif`,
    imageAlt: "WealthQuest homepage hero: 'One club. Every dimension of wealth.' with a gold coin",
    mobileShots: [
      { image: `${WQ_IMG}/mobile-1.webp`, title: 'Hero', caption: 'The headline, call to action and gold coin, stacked for mobile.' },
      { image: `${WQ_IMG}/mobile-2.webp`, title: 'The Crossroads', caption: 'Full-width portrait with the key stats underneath.' },
      { image: `${WQ_IMG}/mobile-3.webp`, title: 'Brand intro', caption: 'The club emblem over the globe, centred for small screens.' },
    ],
    challenge:
      "Turn a detailed, dark-and-gold Figma design into Webflow pixel-perfect on desktop, tablet and mobile, including a few animations Webflow can't do out of the box, which I custom-coded.",
    goal: 'A marketing website for WealthQuest and its brands (WealthVentures travel, GoldMind education, LiquidGold wellness) that explains the club, its membership tiers and how to join.',
    result: 'Launched on Webflow at wealthquest.com, where the team now uses it for their promotion.',
    liveUrl: 'https://www.wealthquest.com',
    nextSlug: 'chairo',
  },
]

export function getProject(slug: string | undefined): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}
