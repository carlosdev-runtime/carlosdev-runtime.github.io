import { createServer } from 'node:http'
import { createReadStream, existsSync, statSync } from 'node:fs'
import { resolve, extname, sep } from 'node:path'

const root = resolve('.output/public')
const port = Number(process.env.PORT || 3100)
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff', '.pdf': 'application/pdf', '.png': 'image/png', '.ico': 'image/x-icon' }
if (!existsSync(resolve(root, 'index.html'))) throw new Error('Execute npm run generate antes de abrir a prévia.')

createServer((request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url || '/', 'http://localhost').pathname)
    let file = resolve(root, `.${pathname}`)
    if (file !== root && !file.startsWith(root + sep)) { response.writeHead(403).end(); return }
    if (existsSync(file) && statSync(file).isDirectory()) file = resolve(file, 'index.html')
    if (!existsSync(file) || !statSync(file).isFile()) { response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Não encontrado'); return }
    response.writeHead(200, { 'Content-Type': mime[extname(file)] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff', 'Cache-Control': 'no-cache' })
    if (request.method === 'HEAD') response.end()
    else createReadStream(file).pipe(response)
  } catch { response.writeHead(400).end('Bad request') }
}).listen(port, '127.0.0.1', () => console.log(`Local: http://127.0.0.1:${port}/`))
