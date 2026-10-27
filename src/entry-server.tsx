// Server entry, used only at build time by scripts/prerender.mjs.
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import { NOT_FOUND, ROUTES } from './routes'

export { SITE_URL } from './seo/site'

export const pages = [...ROUTES, NOT_FOUND].map(({ path, file, sitemap, jsonLd }) => ({ path, file, sitemap, jsonLd }))

export function render(path: string) {
  return renderToString(
    <StrictMode>
      <App path={path} />
    </StrictMode>,
  )
}
