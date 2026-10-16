export type Testimonial = {
  quote: string
  name: string
  role: string
  initials: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Benjamin is committed to getting the job done correctly, super responsive and timely when it comes to feedback.',
    name: 'Ryan Stevens',
    role: 'Founder, Digital Reference',
    initials: 'RS',
  },
  {
    quote:
      'Benjamin showed excellent communication and delivered exactly as requested. He was fast, responsive, and maintained high quality throughout. Highly recommended.',
    name: 'Mohamed ElQadi',
    role: 'QodeBites',
    initials: 'ME',
  },
  {
    quote:
      "Benjamin ensured the application was properly tested across different scenarios and devices. He was very detail-oriented when it came to catching bugs, handling edge cases, and improving overall stability. It's clear he cares about delivering a polished, production-ready product.",
    name: 'Hasan A.',
    role: 'Software Developer, MWEV Group · Web application, Apr 2026',
    initials: 'HA',
  },
]
