import type { Project } from '../types/project'
import { NAME } from './site'

// Title + meta description for each page, in one place (imported by src/pages/*.tsx — in use, don't delete).
// Descriptions are 150–160 characters; scripts/prerender.mjs warns at build time when an indexed page is outside that.

export type PageMeta = { title: string; description: string; ogTitle?: string; ogDescription?: string }

export const HOME_META: PageMeta = {
  title: `Webflow Developer for Agencies & B2B | ${NAME}`,
  description: `${NAME} is a web designer and Webflow & React developer for agencies and teams. From the first sketch to a fast, launched site your team can edit.`,
  ogTitle: `${NAME} – Webflow Developer for Agencies`,
}

// The About page (src/pages/About.tsx).
export const ABOUT_META: PageMeta = {
  title: `About ${NAME} — Web Designer & Developer`,
  description: `About ${NAME}, a web designer and Webflow & React developer who works with agencies and teams, from the first sketch to a fast, launched site.`,
}

export const NOT_FOUND_META: PageMeta = {
  title: `Page not found — ${NAME}`,
  description: `This page has wandered off the map. Head back to the home page to see the Webflow and React work and case studies of ${NAME}, web designer.`,
}

// Case study descriptions by slug, written from the project's facts (src/data/projects.ts).
// A project without one falls back to its summary.
const CASE_STUDY_DESCRIPTIONS: Record<string, string> = {
  chairo: `Chairo case study: a barber booking app for iOS and Android. Clients book a cut in three taps, owners run services, prices and barbers from their phone.`,
  'top-one-trader': `Top One Trader case study: the main site of a prop trading firm that funds traders on its own capital, built and kept current in Webflow by ${NAME}.`,
  wealthquest: `WealthQuest case study: a pixel-perfect Webflow build of a membership club's dark-and-gold Figma design, with custom-coded animations, by ${NAME}.`,
}

// Title overrides by slug (60 characters max). Without one, the page uses "<name> — Case study — <NAME>".
const CASE_STUDY_TITLES: Record<string, string> = {
  chairo: `Chairo: barber booking app | ${NAME}`,
  wealthquest: `WealthQuest: Webflow build | ${NAME}`,
}

export function caseStudyMeta(project: Project): PageMeta {
  return {
    title: CASE_STUDY_TITLES[project.slug] ?? `${project.name} — Case study — ${NAME}`,
    description: CASE_STUDY_DESCRIPTIONS[project.slug] ?? project.summary,
  }
}
