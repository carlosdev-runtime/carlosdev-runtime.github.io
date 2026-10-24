import assert from 'node:assert/strict'
import { lstat, readFile, readdir, stat } from 'node:fs/promises'
import { extname, relative, resolve, sep } from 'node:path'

const root = resolve('.output/public')
const origin = 'https://carlosdev-runtime.github.io'
const files = []
let bytes = 0
let references = 0

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name)
    const info = await lstat(path)
    assert(!info.isSymbolicLink(), `Symbolic link in Pages output: ${path}`)
    assert(!entry.name.startsWith('.') || entry.name === '.nojekyll', `Hidden file in Pages output: ${path}`)
    assert(!/\.(?:map|pem|key|pfx|log)$/i.test(entry.name), `Unexpected file in Pages output: ${path}`)
    if (entry.isDirectory()) await walk(path)
    else { files.push(path); bytes += info.size }
  }
}

async function checkReference(value, source, ids) {
  if (/^(?:data:|mailto:|tel:|javascript:)/i.test(value)) return
  const sourceUrl = new URL(relative(root, source).split(sep).join('/'), `${origin}/`)
  const url = new URL(value.replaceAll('&amp;', '&'), sourceUrl)
  if (url.origin !== origin) return
  if (url.hash && url.pathname === sourceUrl.pathname && ids) {
    assert(ids.has(decodeURIComponent(url.hash.slice(1))), `Missing anchor ${value} in ${source}`)
  }
  let target = resolve(root, `.${decodeURIComponent(url.pathname)}`)
  assert(target === root || target.startsWith(root + sep), `Reference outside output: ${value}`)
  try {
    if ((await stat(target)).isDirectory()) target = resolve(target, 'index.html')
    assert((await stat(target)).isFile())
  } catch { throw new Error(`Missing static asset/route ${value} referenced by ${relative(root, source)}`) }
  references++
}

await walk(root)
assert(bytes < 50 * 1024 * 1024, 'Pages output exceeds the 50 MB project budget')
for (const name of ['index.html', '404.html', '.nojekyll', 'robots.txt', 'sitemap.xml', 'social-card.png', 'carlos-santana-nunes-curriculo.pdf']) {
  assert((await stat(resolve(root, name))).isFile(), `Missing required output: ${name}`)
}

const home = await readFile(resolve(root, 'index.html'), 'utf8')
assert(/<html[^>]*lang="pt-BR"/.test(home), 'Missing default Portuguese language')
assert(/<h1\b/.test(home) && home.includes('Da arquitetura'), 'Home page must contain prerendered content')
assert(/baseURL\s*:\s*["']\/["']/.test(home), 'Nuxt baseURL must be /')
assert(home.includes(`rel="canonical" href="${origin}/"`), 'Missing root canonical URL')
assert(home.includes(`property="og:url" content="${origin}/"`), 'Missing Open Graph URL')
assert(home.includes(`property="og:image" content="${origin}/social-card.png"`), 'Social image must use an absolute URL')
const structured = [...home.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
assert(structured.some(([, json]) => JSON.parse(json).url === `${origin}/`), 'Missing structured Person URL')
assert((await readFile(resolve(root, 'sitemap.xml'), 'utf8')).includes(`<loc>${origin}/</loc>`), 'Incorrect sitemap URL')
assert((await readFile(resolve(root, 'robots.txt'), 'utf8')).includes(`Sitemap: ${origin}/sitemap.xml`), 'Missing sitemap discovery')
const pdf = await readFile(resolve(root, 'carlos-santana-nunes-curriculo.pdf'))
assert(pdf.subarray(0, 5).toString() === '%PDF-', 'Resume is not a PDF')
const png = await readFile(resolve(root, 'social-card.png'))
assert(png.readUInt32BE(16) === 1200 && png.readUInt32BE(20) === 630, 'Social card must be 1200 by 630')

for (const file of files) {
  const extension = extname(file)
  if (!['.html', '.css', '.js', '.mjs'].includes(extension)) continue
  const text = await readFile(file, 'utf8')
  assert(!/https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?\b/.test(text), `Local URL in public output: ${relative(root, file)}`)
  if (extension === '.html') {
    const ids = new Set([...text.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]))
    for (const [, value] of text.matchAll(/\b(?:href|src)="([^"]+)"/g)) await checkReference(value, file, ids)
  }
  if (extension === '.css') {
    for (const [, value] of text.matchAll(/url\(["']?([^\s"')]+)["']?\)/g)) await checkReference(value, file)
  }
  if (['.js', '.mjs'].includes(extension)) {
    for (const [, value] of text.matchAll(/(?:\bfrom\s*|\bimport\s*\(?)["'](\.[^"']+)["']/g)) await checkReference(value, file)
  }
}

console.log(`Static validation passed: ${files.length} files, ${references} references, ${(bytes / 1024 / 1024).toFixed(2)} MB; base /, prerendered HTML, anchors, SEO, fonts, JS, CSS and PDF verified.`)
