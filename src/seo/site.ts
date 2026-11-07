// Site-wide facts used in meta tags, canonical URLs, JSON-LD and the sitemap.
export const SITE_URL = 'https://benjaminrahmanovic.com'
export const NAME = 'Benjamin Rahmanović'
export const JOB_TITLE = 'Web designer and Webflow & React developer'
export const GITHUB = 'https://github.com/rahmanovicbenjamin07-hash'
export const LINKEDIN = 'https://www.linkedin.com/in/benjamin-rahmanovi%C4%87-73692b382/'
export const UPWORK = 'https://www.upwork.com/freelancers/~01cb8d644d875c5c69'
// Booking page behind every "Book a call" button (opens in a new tab).
export const CALENDLY = 'https://calendly.com/rahmanovicbenjamin07/30min'

// Share image for Open Graph / Twitter cards on every page: 1200 × 630 (public/images/og/og-default.png).
// /images is cached for a year (_headers): give a replaced image a new file name.
export const OG_IMAGE = {
  url: `${SITE_URL}/images/og/og-default.png`,
  width: 1200,
  height: 630,
  alt: 'Benjamin Rahmanović: I design and build websites',
}
