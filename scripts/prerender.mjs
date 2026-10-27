// Runs at the end of `npm run build`, after the client build (dist/) and the SSR build (dist-ssr/).
// Renders every route to static HTML so content and meta tags are in the initial HTML, then writes sitemap.xml.
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const DIST = path.resolve('dist')
const SSR = path.resolve('dist-ssr')
const { render, pages, SITE_URL } = await import(pathToFileURL(path.join(SSR, 'entry-server.js')).href)

const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8')
for (const mark of ['<!--app-head-->', '<!--app-html-->']) {
  if (!template.includes(mark)) throw new Error(`index.html is missing the ${mark} placeholder`)
}

// React 19 puts hoisted <title>, <meta> and <link> tags at the front of its output: move them into <head>.
// It also adds <link rel="preload" as="image"> for every <img> (below the fold too): drop those, so they
// don't compete with the CSS. The <img> tags are in the HTML anyway.
const HOISTED = /^(?:<title\b[^>]*>[\s\S]*?<\/title>|<(?:meta|link)\b[^>]*>)/
const IMAGE_PRELOAD = /^<link rel="preload" as="image"/
function splitHead(html) {
  const head = []
  let m
  while ((m = html.match(HOISTED))) {
    if (!IMAGE_PRELOAD.test(m[0])) head.push(m[0])
    html = html.slice(m[0].length)
  }
  return { head: head.join('\n    '), body: html }
}

for (const page of pages) {
  const { head, body } = splitHead(render(page.path))
  if (!/<title>[^<]+<\/title>/.test(head)) throw new Error(`${page.path}: no <title> was rendered`)
  // Function replacers, so "$" in the page content is never read as a replacement pattern.
  const html = template.replace('<!--app-head-->', () => head).replace('<!--app-html-->', () => body)
  const out = path.join(DIST, page.file)
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, html)
  console.log(`prerendered ${page.path} -> dist/${page.file}`)
}

// lastmod: date of the last commit (Cloudflare Pages builds from a git checkout), else today.
let lastmod = ''
try {
  lastmod = execSync('git log -1 --format=%cs', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim()
} catch {
  // not a git checkout
}
if (!/^\d{4}-\d{2}-\d{2}$/.test(lastmod)) lastmod = new Date().toISOString().slice(0, 10)

const urls = pages
  .filter((p) => p.sitemap)
  .map((p) => `  <url>\n    <loc>${SITE_URL}${p.path}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap)
console.log(`wrote dist/sitemap.xml (${urls.length} url${urls.length === 1 ? '' : 's'})`)

fs.rmSync(SSR, { recursive: true, force: true })
