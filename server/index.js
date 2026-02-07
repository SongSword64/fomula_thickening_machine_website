import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'

const app = express()
const PORT = process.env.PORT || 5174

// Minimal CORS and JSON parsing
app.use(cors())
app.use(express.json())

// Allowed hostnames to avoid open proxy
const ALLOWED_HOSTS = new Set([
  'www.healthierthickening.com',
  'healthierthickening.com',
  'patents.google.com',
  'patents.googleusercontent.com'
])

function allowedUrl(urlString) {
  try {
    const u = new URL(urlString)
    return ALLOWED_HOSTS.has(u.hostname)
  } catch (e) {
    return false
  }
}

// Defaults storage (migrate from CSV to JSON)
const DATA_DIR = path.join(process.cwd(), 'server', 'data')
const DEFAULTS_CSV = path.join(DATA_DIR, 'defaults.csv')
const DEFAULTS_JSON = path.join(DATA_DIR, 'defaults.json')
try { fs.mkdirSync(DATA_DIR, { recursive: true }) } catch (e) { /* ignore */ }
let defaultsMap = {}

function migrateCsvToJson() {
  if (fs.existsSync(DEFAULTS_JSON)) return
  if (!fs.existsSync(DEFAULTS_CSV)) return
  try {
    const lines = fs.readFileSync(DEFAULTS_CSV, 'utf8').split(/\r?\n/).filter(Boolean)
    const out = {}
    for (const ln of lines) {
      const idx = ln.indexOf(',')
      if (idx === -1) continue
      const url = ln.slice(0, idx)
      const json = ln.slice(idx + 1)
      try { out[url] = JSON.parse(json) } catch (err) { console.error('Skipping malformed CSV row for', url, err.message) }
    }
    fs.writeFileSync(DEFAULTS_JSON, JSON.stringify(out, null, 2), 'utf8')
    fs.renameSync(DEFAULTS_CSV, DEFAULTS_CSV + '.bak')
    console.log('Migrated defaults.csv -> defaults.json')
  } catch (err) {
    console.error('Migration failed:', err.message)
  }
}

function loadDefaults() {
  defaultsMap = {}
  if (!fs.existsSync(DEFAULTS_JSON)) return
  try {
    const json = fs.readFileSync(DEFAULTS_JSON, 'utf8')
    defaultsMap = JSON.parse(json)
  } catch (err) {
    console.error('Failed to read defaults.json:', err.message)
  }
}

function writeDefaults() {
  fs.writeFileSync(DEFAULTS_JSON, JSON.stringify(defaultsMap, null, 2), 'utf8')
}

migrateCsvToJson()
loadDefaults()

app.get('/api/fetch', async (req, res) => {
  const url = req.query.url
  if (!url) return res.status(400).json({ error: 'Missing url query parameter' })
  if (!allowedUrl(url)) return res.status(403).json({ error: 'URL not allowed' })

  try {
    const resp = await fetch(url)
    const text = await resp.text()
    if (!resp.ok) {
      console.error(`Upstream fetch ${url} returned status ${resp.status} ${resp.statusText} (length: ${text ? text.length : 0})`)
    }
    res.type('text/html').send(text)
  } catch (err) {
    console.error(`Fetch to ${url} failed: ${err.message}`)
    res.status(502).json({ error: 'Failed to fetch target URL', details: err.message })
  }
})

// Helper: extract anchors from HTML using a lightweight regex (avoid adding cheerio/jsdom deps)
function extractAnchors(html) {
  const anchors = []
  const re = /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi
  let m
  while ((m = re.exec(html)) !== null) {
    let href = m[1]
    const text = m[2].replace(/<[^>]+>/g, '').trim()
    // normalize common relative forms to absolute
    if (href && href.startsWith('//')) href = 'https:' + href
    if (href && href.startsWith('/')) href = 'https://www.healthierthickening.com' + href
    anchors.push({ title: text || href, url: href })
  }
  return anchors
}

// Return categorized recipe lists (Single recipe / By Brand / By Type)
app.get('/api/recipes', async (req, res) => {
  const listUrl = 'https://www.healthierthickening.com/recipes'
  if (!allowedUrl(listUrl)) return res.status(403).json({ error: 'URL not allowed' })
  try {
    const resp = await fetch(listUrl)
    const html = await resp.text()
    const anchors = extractAnchors(html)
    if (!Array.isArray(anchors) || anchors.length === 0) {
      console.error(`Upstream returned zero anchors for ${listUrl} (response length: ${html ? html.length : 0})`)
      return res.json({ categories: { 'Single recipe': [], 'By Brand': [], 'By Type': [] }, counts: { single:0, brands:0, types:0 } })
    }

    // single recipes: URLs that include '/recipes/' (dedupe and keep endings with '/')
    const single = Array.from(new Map(
      anchors
        .filter(a => a.url && a.url.includes('/recipes/') && a.url !== listUrl)
        .map(a => [a.url, { title: a.title, url: a.url }])
    ).values())

    // brands and types: look for links that point to the thickening listing with brand= or type=
    const brands = Array.from(new Map(
      anchors
        .filter(a => a.url && a.url.includes('/thickening-breast-milk-formula-for-dysphagia') && a.url.includes('?brand='))
        .map(a => {
          try { const u = new URL(a.url); const k = new URLSearchParams(u.search).get('brand'); return [a.url, { title: a.title || k, key: k, url: a.url }] } catch(e) { return [a.url, { title: a.title, url: a.url }] }
        })
      ).values())

    const types = Array.from(new Map(
      anchors
        .filter(a => a.url && a.url.includes('/thickening-breast-milk-formula-for-dysphagia') && a.url.includes('?type='))
        .map(a => {
          try { const u = new URL(a.url); const k = new URLSearchParams(u.search).get('type'); return [a.url, { title: a.title || k, key: k, url: a.url }] } catch(e) { return [a.url, { title: a.title, url: a.url }] }
        })
      ).values())

    const categories = { 'Single recipe': single, 'By Brand': brands, 'By Type': types }
    const counts = { single: single.length, brands: brands.length, types: types.length }
    console.log('Recipe counts:', counts)
    return res.json({ categories, counts })
  } catch (err) {
    return res.status(502).json({ error: 'Failed to fetch recipe index', details: err.message })
  }
})

// Given a listing or brand/type URL, return sub-recipes (individual recipe pages)
app.get('/api/subrecipes', async (req, res) => {
  const url = req.query.url
  if (!url) return res.status(400).json({ error: 'Missing url query parameter' })
  if (!allowedUrl(url)) return res.status(403).json({ error: 'URL not allowed' })
  try {
    const resp = await fetch(url)
    const html = await resp.text()
    const anchors = extractAnchors(html)
    if (!Array.isArray(anchors) || anchors.length === 0) {
      console.error(`Upstream returned zero anchors for ${url} (response length: ${html ? html.length : 0})`)
      return res.json({ subrecipes: [] })
    }
    const found = Array.from(new Map(
      anchors
        .filter(a => a.url && a.url.includes('/recipes/') && a.url !== url)
        .map(a => [a.url, { title: a.title, url: a.url }])
    ).values())
    return res.json({ subrecipes: found })
  } catch (err) {
    return res.status(502).json({ error: 'Failed to fetch sub-recipes', details: err.message })
  }
})

// GET existing defaults or lookup for a specific URL
app.get('/api/defaults', (req, res) => {
  const url = req.query.url
  if (url) {
    const found = defaultsMap[url]
    if (!found) return res.status(404).json({ error: 'No default found for url' })
    return res.json({ url, default: found })
  }
  return res.json({ defaults: Object.entries(defaultsMap).map(([u, obj]) => ({ url: u, ...obj })) })
})

// Save or update a default entry (body: { url, title, temperature, shake, wait, scaling })
app.post('/api/defaults', (req, res) => {
  const body = req.body
  if (!body || !body.url) return res.status(400).json({ error: 'Missing url in request body' })
  defaultsMap[body.url] = {
    title: body.title || '',
    temperature: body.temperature || null,
    shake: body.shake || null,
    wait: body.wait || null,
    scaling: body.scaling || null
  }
  try {
    writeDefaults()
    console.log('Saved default for', body.url)
    return res.json({ ok: true, url: body.url })
  } catch (err) {
    console.error('Failed to write defaults CSV:', err)
    return res.status(500).json({ error: 'Failed to write defaults' })
  }
})

async function startServer(initialPort, maxAttempts = 10) {
  let port = parseInt(initialPort, 10) || 5174
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const server = await new Promise((resolve, reject) => {
        const s = app.listen(port, () => resolve(s))
        s.on('error', reject)
      })
      console.log(`Proxy server running on http://localhost:${port}`)
      return server
    } catch (err) {
      if (err && err.code === 'EADDRINUSE') {
        console.warn(`Port ${port} is in use; trying ${port + 1}...`)
        port += 1
        continue
      }
      console.error('Failed to start server:', err)
      process.exit(1)
    }
  }
  console.error(`Could not find an available port after ${maxAttempts} attempts. Please free a port or set PORT environment variable.`)
  process.exit(1)
}

startServer(PORT) // eslint-disable-line no-unused-expressions
  .catch(err => { console.error('Startup error:', err); process.exit(1) })
