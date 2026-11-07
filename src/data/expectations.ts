import { CHAT, CMS, ROCKET, TROPHY, type Sprite } from '../components/about/sprites'

// About page, "03 — Working with me" cards (src/components/about/WorkingWithMe.tsx). Text from design-reference/about.html.

export type Expectation = { icon: Sprite; title: string; text: string }

const expectations: Expectation[] = [
  { icon: CHAT, title: 'Clear communication', text: "You always know what I'm working on and what comes next. No disappearing for weeks." },
  { icon: ROCKET, title: 'Fast, modern sites', text: 'Clean code and Webflow builds that load quickly and score well on Lighthouse.' },
  { icon: CMS, title: 'Easy to edit', text: 'Sites set up so your team can update text, images and blog posts without me.' },
  { icon: TROPHY, title: 'Care after launch', text: 'I stay around after the site goes live for fixes, tweaks and new pages.' },
]

export default expectations
