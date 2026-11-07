// About page, "01 — Experience" timeline (src/components/about/Experience.tsx), newest first.
// `now` marks a role that's still current: its timeline dot is blue.

export type ExperienceItem = { time: string; role: string; where: string; text: string; now?: boolean }

const experience: ExperienceItem[] = [
  {
    time: 'Aug 2026 — Now',
    role: 'Webflow Developer',
    where: 'MWEV Group',
    text: "Building and maintaining Webflow websites for the group's brands, from Figma designs to launch.",
    now: true,
  },
  {
    time: 'Dec 2024 — Now',
    role: 'Freelance web designer & developer',
    where: 'Upwork / direct clients',
    text: 'Websites and apps for clients in Europe and North America, in Webflow, React and React Native.',
    now: true,
  },
  {
    time: '2023 — 2024',
    role: 'Where it started',
    where: 'First projects',
    text: 'Learning Webflow and React by building my first websites, then taking on paid work.',
  },
]

export default experience
