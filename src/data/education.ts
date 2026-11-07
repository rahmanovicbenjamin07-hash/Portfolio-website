// About page, "02 — Certificates" cards (src/components/about/Education.tsx).
// `year` is optional: a card without one has no year line. `url` links the provider (new tab).

export type Certificate = { title: string; provider: string; url?: string; year?: string }

const certificates: Certificate[] = [
  { title: 'Webflow Specialization', provider: 'Cysecor', url: 'https://cysecor.com/' },
  { title: 'The Webflow Way', provider: 'Webflow' },
]

export default certificates
