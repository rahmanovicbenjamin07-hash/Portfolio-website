import { MEDAL_BLUE, MEDAL_GREEN, type Sprite } from '../components/about/sprites'

// About page, "02 — Certificates" cards (src/components/about/Education.tsx). Text and medals from the approved
// design-reference/about/about.html. `url` makes the card a link to the provider (new tab).

export type Certificate = { title: string; provider: string; medal: Sprite; url?: string }

const certificates: Certificate[] = [
  { title: 'Webflow Specialization', provider: 'Cysecor', medal: MEDAL_BLUE, url: 'https://cysecor.com/' },
  { title: 'The Webflow Way', provider: 'Webflow', medal: MEDAL_GREEN },
]

export default certificates
