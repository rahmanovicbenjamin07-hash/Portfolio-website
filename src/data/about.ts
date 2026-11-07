// About page hero (src/components/about/AboutHero.tsx): intro, photo and the three number boxes on the grass.

export const ABOUT_INTRO =
  "I've been building websites for 3 years. Today I work as a freelance web designer and developer and as a Webflow developer at MWEV Group, taking projects from the first sketch in Figma to a fast, launched site in Webflow or React. I'm based in Tešanj, Bosnia and Herzegovina, and work with clients across Europe and North America."

// Shown 4:5 (object-fit: cover, object-position: center 20%), so the face stays in frame.
export const ABOUT_PHOTO = {
  src: '/images/benjamin.jpg',
  alt: 'Benjamin Rahmanović smiling, in a white shirt, navy waistcoat and pink tie',
  width: 688,
  height: 1568,
}

export const ABOUT_STATS: { value: string; label: string }[] = [
  { value: '3+', label: 'years building websites' },
  { value: '15+', label: 'projects designed and shipped' },
  // Slovenia, USA, Canada, Switzerland, Serbia
  { value: '5', label: "countries I've worked with clients from" },
]
