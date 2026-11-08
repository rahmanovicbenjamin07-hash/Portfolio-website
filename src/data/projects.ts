import type { Project } from '../types/project'

// Project (case study) pages, one template at /work/:slug (src/pages/CaseStudy.tsx). Array order is the order
// everywhere; Nav's "Work" link opens the first one. Next project follows nextSlug in a loop:
// chairo → top-one-trader → wealthquest → chairo.
// A section shows only when its field is here, so leave a field out rather than filling it with made-up text.
// Text in [square brackets] is a placeholder: keep it until the real text exists.
// Chairo: copied from design-reference/case-study/case-study.html. Top One Trader and WealthQuest: the facts the
// repo already had, mapped onto the new fields.

const CHAIRO_IMG = '/images/work/chairo'
const TOT_IMG = '/images/work/top-one-trader'
const WQ_IMG = '/images/work/wealthquest'

const AMER_TALO = { name: 'Amer Talo', url: 'https://amertalo.com/' }

export const PROJECTS: Project[] = [
  {
    slug: 'chairo',
    name: 'Chairo',
    summary:
      'Booking app for barbershops on iOS and Android. Clients book a cut in three taps, barbers stop running their week from DMs.',
    client: 'Own product',
    year: '2026',
    role: 'Design, development, QA',
    subtitle: 'Barber booking in three taps.',
    lead: "A booking app for barbershops on iOS and Android. Clients see their barber's free times and book without a single DM.",
    with: AMER_TALO,
    platform: 'iOS and Android',
    builtWith: 'React Native, Expo, Supabase',
    heroImage: `${CHAIRO_IMG}/mockup.webp`,
    heroAlt: 'Chairo on a laptop and three phones',
    liveUrl: 'https://chairo.app',
    liveLabel: 'chairo.app',
    overview: {
      challenge: 'Barbers lose hours every day booking clients through DMs and calls.',
      goal: 'Clients book themselves in three taps. Owners run the week from one screen.',
      result: 'Live on iOS and Android, in English and Bosnian.',
    },
    flow: {
      label: 'The booking flow',
      title: 'Three taps',
      accent: 'from DM to done.',
      steps: [
        { image: `${CHAIRO_IMG}/mobile-1.webp`, alt: 'Step 1: who with? A barber carousel', title: 'Who with?', text: 'Pick your barber from a photo carousel, with their next free time.' },
        { image: `${CHAIRO_IMG}/mobile-2.webp`, alt: 'Step 2: the service wheel with prices in KM', title: 'The service', text: 'Your usual services come first, with time and price.' },
        { image: `${CHAIRO_IMG}/mobile-3.webp`, alt: 'Step 3: day and time wheel showing free times only', title: 'The time', text: 'Only free slots. The title fills in as you choose.' },
      ],
    },
    features: {
      label: 'For shop owners',
      title: "The barber's side",
      accent: 'of the app.',
      items: [
        { icon: 'calendar', title: 'Recurring appointments', text: 'A regular is booked on repeat. No more "same time?" texts.' },
        { icon: 'no-show', title: 'Block no-shows', text: "A client who keeps not showing up can't book you again." },
        { icon: 'stats', title: 'Statistics', text: 'Earnings, busiest day and hour, and no-shows by week, month or year.' },
        { icon: 'link', title: 'Your booking link', text: 'Clients who join through your link only ever see your shop.' },
      ],
    },
    design: {
      title: 'Dark, calm',
      accent: 'and easy to read.',
      colors: ['#141414', '#242424', '#515151', '#F2EFE6', '#FF8F6B'],
      typeSample: 'Aa 17:30',
      typeNote: 'SF Pro in the app, Inter on the web. Tabular numbers for every time and price.',
      brandLine: 'Neka telefon spava.',
      brandNote: '"Let the phone sleep." No more DMs at 3 a.m.',
    },
    build: {
      label: 'How we built it',
      title: 'Two people,',
      accent: 'doing everything together.',
      steps: [
        { title: 'Talking to barbers', text: 'Where the time goes: DMs, calls, no-shows.' },
        { title: 'Concept', text: 'Several design directions, narrowed to one.' },
        { title: 'Build', text: 'React Native and Expo on top of Supabase.' },
        { title: 'Testing', text: 'Closed testing with real barbers and clients.' },
        { title: 'Launch', text: 'Released on the App Store and Google Play.' },
      ],
    },
    result: {
      title: 'Live today,',
      accent: 'on both stores.',
      text: 'Chairo is live on iOS and Android, in English and Bosnian. Amer and I shared every part of it: design, development and QA.',
    },
    nextSlug: 'top-one-trader',
    image: `${CHAIRO_IMG}/mockup.webp`,
    partner: AMER_TALO,
  },
  {
    slug: 'top-one-trader',
    name: 'Top One Trader',
    summary: 'The main site of a prop trading firm that funds traders on its own capital.',
    client: 'Top One Trader',
    year: '2026',
    role: 'Webflow developer',
    builtWith: 'Webflow',
    heroImage: `${TOT_IMG}/mockup.webp`,
    heroAlt: 'Top One Trader site on a laptop and three phones',
    liveUrl: 'https://toponetrader.com',
    liveLabel: 'toponetrader.com',
    overview: {
      challenge:
        'A live, high-traffic site where every offer is time-sensitive. Changes have to ship quickly without breaking pricing, banners or checkout links.',
      goal: 'A site that sells as fast as the business moves: new challenge types, launches like Top One 2.0, and promo codes that change week to week.',
      // No outcome on record yet (the split test names no winner), so this stays a placeholder.
      result: '[2–3 sentences: what changed after launch, in plain words.]',
    },
    mobileShots: [
      { image: `${TOT_IMG}/mobile-1.webp`, alt: 'The home page hero on mobile' },
      { image: `${TOT_IMG}/mobile-2.webp`, alt: 'The X-DAILY offer on mobile' },
      { image: `${TOT_IMG}/mobile-3.webp`, alt: 'The account configuration and pricing table on mobile' },
    ],
    // Black bar above the screenshots so the promo bar and logo aren't under the camera island; taller phones.
    mobileStatusBar: true,
    nextSlug: 'wealthquest',
    image: `${TOT_IMG}/mockup.webp`,
  },
  {
    slug: 'wealthquest',
    name: 'WealthQuest',
    summary: "Pixel-perfect Webflow build of a membership club's site, from Figma, with custom-coded animations.",
    client: 'WealthQuest',
    year: '2026',
    role: 'Webflow developer',
    platform: 'Marketing website',
    builtWith: 'Webflow, Figma, Custom code',
    heroImage: `${WQ_IMG}/mockup.webp`,
    heroAlt: 'WealthQuest site on a laptop and three phones',
    liveUrl: 'https://www.wealthquest.com',
    liveLabel: 'wealthquest.com',
    overview: {
      challenge:
        "Turn a detailed, dark-and-gold Figma design into Webflow pixel-perfect on desktop, tablet and mobile, including a few animations Webflow can't do out of the box, which I custom-coded.",
      goal: 'A marketing website for WealthQuest and its brands (WealthVentures travel, GoldMind education, LiquidGold wellness) that explains the club, its membership tiers and how to join.',
      result: 'Launched on Webflow at wealthquest.com, where the team now uses it for their promotion.',
    },
    mobileShots: [
      { image: `${WQ_IMG}/mobile-1.webp`, alt: 'The hero on mobile: headline, call to action and gold coin' },
      { image: `${WQ_IMG}/mobile-2.webp`, alt: 'The Crossroads section on mobile: full-width portrait and a key stat' },
      { image: `${WQ_IMG}/mobile-3.webp`, alt: 'The brand intro on mobile: the club emblem over the globe' },
    ],
    nextSlug: 'chairo',
    image: `${WQ_IMG}/mockup.webp`,
  },
]

export function getProject(slug: string | undefined): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}
