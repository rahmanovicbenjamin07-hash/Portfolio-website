import { createElement, type ComponentType } from 'react'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import CaseStudy from './pages/CaseStudy'
import { PROJECTS } from './data/projects'
import { HOME_JSON_LD, caseStudyJsonLd } from './seo/jsonLd'

export type Route = {
  path: string
  /** File written to dist/ by scripts/prerender.mjs. */
  file: string
  Page: ComponentType
  /** Listed in sitemap.xml. */
  sitemap: boolean
  /** Structured data written into the page's <head> by scripts/prerender.mjs. */
  jsonLd?: object
  /** Page mounts components/pixel/PixelCursor itself, so main.tsx doesn't start the old circle cursor (src/cursor.ts). */
  ownCursor?: boolean
}

// Add new pages here: each one is prerendered and (if sitemap is true) listed in sitemap.xml.
export const ROUTES: Route[] = [
  { path: '/', file: 'index.html', Page: Home, sitemap: true, jsonLd: HOME_JSON_LD, ownCursor: true },
  // Project pages, /work/:slug: one template (pages/CaseStudy.tsx), one prerendered route per entry in
  // src/data/projects.ts, each one indexed and in the sitemap. Cloudflare serves work/x.html at /work/x.
  // Old project URLs redirect to /#work (public/_redirects).
  ...PROJECTS.map((p) => ({
    path: `/work/${p.slug}`,
    file: `work/${p.slug}.html`,
    Page: () => createElement(CaseStudy, { slug: p.slug }),
    sitemap: true,
    jsonLd: caseStudyJsonLd(p),
    ownCursor: true,
  })),
]

export const NOT_FOUND: Route = { path: '/404', file: '404.html', Page: NotFound, sitemap: false, ownCursor: true }

export function resolveRoute(pathname: string): Route {
  const path = pathname.replace(/\/index\.html$/, '/').replace(/(.)\/$/, '$1')
  return ROUTES.find((r) => r.path === path) ?? NOT_FOUND
}
