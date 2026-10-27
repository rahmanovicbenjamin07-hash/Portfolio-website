import type { ComponentType } from 'react'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import SabilaLabs from './pages/SabilaLabs'
import TopOneLaunchpad from './pages/TopOneLaunchpad'
import TopOneTrader from './pages/TopOneTrader'

export type Route = {
  path: string
  /** File written to dist/ by scripts/prerender.mjs. */
  file: string
  Page: ComponentType
  /** Listed in sitemap.xml. */
  sitemap: boolean
}

// Add new pages here: each one is prerendered and (if sitemap is true) listed in sitemap.xml.
export const ROUTES: Route[] = [
  { path: '/', file: 'index.html', Page: Home, sitemap: true },
  // Case studies. Cloudflare Pages serves work/x.html at /work/x.
  { path: '/work/top-one-launchpad', file: 'work/top-one-launchpad.html', Page: TopOneLaunchpad, sitemap: true },
  { path: '/work/top-one-trader', file: 'work/top-one-trader.html', Page: TopOneTrader, sitemap: true },
  { path: '/work/sabila-labs', file: 'work/sabila-labs.html', Page: SabilaLabs, sitemap: true },
]

export const NOT_FOUND: Route = { path: '/404', file: '404.html', Page: NotFound, sitemap: false }

export function resolveRoute(pathname: string): Route {
  const path = pathname.replace(/\/index\.html$/, '/').replace(/(.)\/$/, '$1')
  return ROUTES.find((r) => r.path === path) ?? NOT_FOUND
}
