// Usage: node scripts/compare.mjs <sectionIndex> [outDir]
// Screenshots section N of the dev build and of design/reference.html at 1440x900 and 390x844,
// writes side-by-side + diff PNGs, and lists elements whose box / font differ.
import { chromium } from '@playwright/test'
import { pathToFileURL } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'

const idx = Number(process.argv[2] ?? 0)
const out = process.argv[3] ?? 'test-results/compare'
fs.mkdirSync(out, { recursive: true })
const REF = pathToFileURL(path.resolve('design/reference.html')).href
const DEV = process.env.DEV_URL ?? 'http://localhost:5173/'
const SIZES = [[1440, 900], [390, 844]]
// Reference shows 15:48 (GMT+2): freeze the clock there so the hero time matches.
const FIXED = new Date('2026-10-15T13:48:00Z')

const browser = await chromium.launch()

async function capture(url, w, h) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce' })
  const page = await ctx.newPage()
  await page.clock.setFixedTime(FIXED)
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  const el = page.locator('#top > *').nth(idx)
  await el.scrollIntoViewIfNeeded()
  const shot = await el.screenshot({ animations: 'disabled' })
  const info = await el.evaluate((root) => {
    const r0 = root.getBoundingClientRect()
    return [root, ...root.querySelectorAll('*')].filter((e) => !e.closest('svg') || e.tagName === 'svg').map((e) => {
      const r = e.getBoundingClientRect(), cs = getComputedStyle(e)
      const text = [...e.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join(' ').slice(0, 30)
      return {
        tag: e.tagName.toLowerCase(), text,
        box: [r.x - r0.x, r.y - r0.y, r.width, r.height].map((v) => Math.round(v * 10) / 10),
        font: `${cs.fontFamily.split(',')[0].replace(' Variable', '').replaceAll('"', '')} ${cs.fontWeight} ${cs.fontSize}/${cs.lineHeight} ls:${cs.letterSpacing}`,
        color: cs.color, bg: cs.backgroundColor,
      }
    })
  })
  await ctx.close()
  return { shot, info }
}

for (const [w, h] of SIZES) {
  const ref = await capture(REF, w, h)
  const dev = await capture(DEV, w, h)
  const tag = `${idx}-${w}`
  fs.writeFileSync(`${out}/${tag}-ref.png`, ref.shot)
  fs.writeFileSync(`${out}/${tag}-dev.png`, dev.shot)

  // Pixel diff + side-by-side, computed in a blank page canvas.
  const ctx = await browser.newContext()
  const page = await ctx.newPage()
  const res = await page.evaluate(async ([a, b]) => {
    const load = (s) => new Promise((ok) => { const i = new Image(); i.onload = () => ok(i); i.src = 'data:image/png;base64,' + s })
    const [A, B] = await Promise.all([load(a), load(b)])
    const W = Math.max(A.width, B.width), H = Math.max(A.height, B.height)
    const get = (img) => { const c = new OffscreenCanvas(W, H), x = c.getContext('2d'); x.drawImage(img, 0, 0); return x.getImageData(0, 0, W, H).data }
    const da = get(A), db = get(B)
    const diff = new OffscreenCanvas(W, H), dx = diff.getContext('2d'), dd = dx.createImageData(W, H)
    let n = 0
    for (let i = 0; i < da.length; i += 4) {
      const d = Math.abs(da[i] - db[i]) + Math.abs(da[i + 1] - db[i + 1]) + Math.abs(da[i + 2] - db[i + 2])
      const hit = d > 30
      if (hit) n++
      const g = (da[i] + da[i + 1] + da[i + 2]) / 12
      dd.data.set(hit ? [255, 0, 80, 255] : [g, g, g, 255], i)
    }
    dx.putImageData(dd, 0, 0)
    const sbs = new OffscreenCanvas(W * 3 + 40, H), sx = sbs.getContext('2d')
    sx.fillStyle = '#f0f'; sx.fillRect(0, 0, W * 3 + 40, H)
    sx.drawImage(A, 0, 0); sx.drawImage(B, W + 20, 0); sx.drawImage(diff, W * 2 + 40, 0)
    const toB64 = async (c) => { const bl = await c.convertToBlob(); const buf = new Uint8Array(await bl.arrayBuffer()); let s = ''; for (const x of buf) s += String.fromCharCode(x); return btoa(s) }
    return { pct: (100 * n / (W * H)).toFixed(3), sizes: [[A.width, A.height], [B.width, B.height]], sbs: await toB64(sbs) }
  }, [ref.shot.toString('base64'), dev.shot.toString('base64')])
  await ctx.close()
  fs.writeFileSync(`${out}/${tag}-side-by-side.png`, Buffer.from(res.sbs, 'base64'))
  console.log(`\n=== ${w}x${h}: ref ${res.sizes[0]} vs dev ${res.sizes[1]} — ${res.pct}% pixels differ`)

  const n = Math.max(ref.info.length, dev.info.length)
  if (ref.info.length !== dev.info.length) console.log(`element count: ref ${ref.info.length} vs dev ${dev.info.length}`)
  for (let i = 0; i < n; i++) {
    const a = ref.info[i], b = dev.info[i]
    if (!a || !b) { console.log(`#${i} missing`, a?.tag ?? '', b?.tag ?? ''); continue }
    const diffs = []
    if (a.tag !== b.tag) diffs.push(`tag ${a.tag} vs ${b.tag}`)
    if (a.box.some((v, k) => Math.abs(v - b.box[k]) > 0.5)) diffs.push(`box ${a.box} vs ${b.box}`)
    for (const k of ['font', 'color', 'bg']) if (a[k] !== b[k]) diffs.push(`${k} ${a[k]} vs ${b[k]}`)
    if (diffs.length) console.log(`#${i} <${a.tag}> "${a.text}": ${diffs.join(' | ')}`)
  }
}
await browser.close()
