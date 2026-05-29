#!/usr/bin/env node
/**
 * Локальный preview для верстальщика: статика + заглушки API.
 * Запуск: node preview-server.mjs
 */
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.dirname(fileURLToPath(import.meta.url))
const PORT = Number(process.env.PORT) || 8765
const HOST = process.env.HOST || '127.0.0.1'

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
}

const mockExchangeRate = {
  ok: true,
  buyRate: 81,
  sellRate: 80.5,
  aedRate: 22.39,
  kztRate: 0.17,
  eurRate: 98.65,
  tryRate: 1.79,
  min_exchange_usdt: 2000,
}

function mockApi(pathname, method) {
  if (pathname === '/api/exchange-rate' && method === 'GET') {
    return mockExchangeRate
  }
  if (pathname === '/api/leads/list' && method === 'POST') {
    return { ok: true, leads: [] }
  }
  if (pathname.startsWith('/api/')) {
    return { ok: true }
  }
  return null
}

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0])
  const rel = decoded === '/' ? '/index.html' : decoded
  const normalized = path.normalize(rel).replace(/^(\.\.(\/|\\|$))+/, '')
  const file = path.join(ROOT, normalized)
  if (!file.startsWith(ROOT)) return null
  return file
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host}`)
  const mock = mockApi(url.pathname, req.method || 'GET')
  if (mock !== null) {
    res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' })
    res.end(JSON.stringify(mock))
    return
  }

  const file = safePath(url.pathname)
  if (!file) {
    res.writeHead(403).end('Forbidden')
    return
  }

  fs.readFile(file, (err, data) => {
    if (err) {
      if (url.pathname !== '/' && !path.extname(url.pathname)) {
        const index = safePath('/index.html')
        if (index) {
          fs.readFile(index, (e2, d2) => {
            if (e2) {
              res.writeHead(404).end('Not found')
              return
            }
            res.writeHead(200, { 'Content-Type': MIME['.html'], 'Cache-Control': 'no-store' })
            res.end(d2)
          })
          return
        }
      }
      res.writeHead(404).end('Not found')
      return
    }
    const ext = path.extname(file).toLowerCase()
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Cache-Control': ext === '.html' || ext === '.js' || ext === '.css' ? 'no-store' : 'public, max-age=3600',
    })
    res.end(data)
  })
})

server.listen(PORT, HOST, () => {
  console.log(`PAYMEX layout preview: http://${HOST}:${PORT}/`)
  console.log('Ctrl+C to stop')
})
