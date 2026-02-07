#!/usr/bin/env node
// Update defaults CSV by fetching and parsing recipe pages via local proxy
// Usage: node scripts/update_defaults.js <url1> <url2> ...
const args = process.argv.slice(2)
const proxyBase = process.env.PROXY || 'http://localhost:5174/api/fetch?url='
if (!args || args.length === 0) {
  console.error('Usage: node scripts/update_defaults.js <url1> <url2> ...')
  process.exit(1)
}

async function fetchText(url) {
  const r = await fetch(proxyBase + encodeURIComponent(url))
  if (!r.ok) throw new Error(`Fetch failed: ${r.status}`)
  return await r.text()
}

function parseRecipeHtml(html) {
  // Lightweight parse: prefer table-based per-level scalings, fallback to inline phrases
  const tableScalings = {}
  const tblRe = /<table[^>]+class=["']?recipe-table["']?[^>]*>[\s\S]*?<tbody>([\s\S]*?)<\/tbody>/gi
  let tblMatch
  while ((tblMatch = tblRe.exec(html)) !== null) {
    const tbody = tblMatch[1]
    const rowRe = /<tr>[\s\S]*?<td[^>]*>([\s\S]*?)<\/td>[\s\S]*?<td[^>]*>([\s\S]*?)<\/td>[\s\S]*?<td[^>]*>([\s\S]*?)<\/td>[\s\S]*?<td[^>]*>([\s\S]*?)<\/td>[\s\S]*?<\/tr>/gi
    let r
    while ((r = rowRe.exec(tbody)) !== null) {
      const levelText = (r[1] || '').replace(/<[^>]+>/g, '').trim()
      const gramsText = (r[4] || '').replace(/<[^>]+>/g, '').trim()
      const level = parseInt(levelText, 10)
      const grams = parseFloat(gramsText.replace(/[^0-9\.]/g, ''))
      if (!Number.isNaN(level) && !Number.isNaN(grams)) tableScalings[level] = grams
    }
  }

  // per-level inline phrases
  const perLevelRegex = /(slightly thick|mildly thick|moderately thick)[\s\S]{0,300}?use\s*([0-9]*\.?[0-9]+)\s*g/ig
  let perMatch
  while ((perMatch = perLevelRegex.exec(html)) !== null) {
    const label = perMatch[1].toLowerCase()
    const grams = parseFloat(perMatch[2])
    if (!Number.isNaN(grams)) {
      if (label.includes('slight')) tableScalings[1] = grams
      else if (label.includes('mild')) tableScalings[2] = grams
      else if (label.includes('moderate')) tableScalings[3] = grams
    }
  }

  // text blocks
  const textBlocks = Array.from(html.matchAll(/<(p|li|td|th|h[1-4]|span)[^>]*>([\s\S]*?)<\/\1>/gi)).map(m => (m[2] || '').replace(/<[^>]+>/g, '').trim())
  const findFirst = (re) => { for (const t of textBlocks) { const m = t.match(re); if (m) return m } return null }

  let tempMatch = findFirst(/(?:temperature|serve at|warm to|heat to)[:\s]*([0-9]{1,3}(?:\.[0-9]+)?)\s*°?\s*(C|F)?/i) || findFirst(/([0-9]{2,3})\s*°\s*(C|F)/i)
  let temperature = null
  if (tempMatch) temperature = { value: parseFloat(tempMatch[1]), unit: (tempMatch[2] || 'F').toUpperCase() }

  let shakeMatch = findFirst(/shake(?:\s(?:well|for))?\s*([0-9]{1,3})\s*(seconds?|secs?|s|minutes?|mins?|m)/i)
  let shake = null
  if (shakeMatch) shake = { value: parseFloat(shakeMatch[1]), unit: shakeMatch[2] }

  let waitMatch = findFirst(/wait(?:\s(?:time|for))?(?:\s|:)?\s*([0-9]{1,3})\s*(seconds?|secs?|s|minutes?|mins?|m)/i) || findFirst(/stand(?:ing)?(?:\sfor)?\s*([0-9]{1,3})\s*(seconds?|minutes?)/i)
  let wait = null
  if (waitMatch) wait = { value: parseFloat(waitMatch[1]), unit: waitMatch[2] }

  let scaling = null
  if (Object.keys(tableScalings).length > 0) scaling = { byLevel: tableScalings, unit: 'fl. oz.' }
  else {
    const scalingByLevel = {}
    const scaleRegex = /([0-9]*\.?[0-9]+)\s*g\s*(?:for|per)\s*(?:1\s*)?(fl\.?\s*oz|oz|ml|mL)/i
    const simpleScaleRegex = /([0-9]*\.?[0-9]+)\s*g\s*(?:per|\/|for)\s*(?:1\s*)?(fl\.?\s*oz|oz|ml|mL)/i
    for (let i = 0; i < textBlocks.length; i++) {
      const block = textBlocks[i]
      let m = block.match(scaleRegex) || block.match(simpleScaleRegex)
      if (m) {
        const grams = parseFloat(m[1])
        const unit = (m[2] || 'fl. oz.').toLowerCase()
        const rangeStart = Math.max(0, i - 2)
        const rangeEnd = Math.min(textBlocks.length - 1, i + 2)
        let assigned = false
        for (let j = rangeStart; j <= rangeEnd; j++) {
          const ctx = (textBlocks[j] || '').toLowerCase()
          const levelNum = (ctx.match(/level\s*([123])/i) || [])[1]
          if (levelNum) { scalingByLevel[parseInt(levelNum, 10)] = grams; assigned = true; break }
          if (ctx.match(/slight|slightly/)) { scalingByLevel[1] = grams; assigned = true; break }
          if (ctx.match(/mild|mildly/)) { scalingByLevel[2] = grams; assigned = true; break }
          if (ctx.match(/moderate|moderately/)) { scalingByLevel[3] = grams; assigned = true; break }
        }
        if (!assigned && !scaling) scaling = { grams, unit }
      }
    }
    if (Object.keys(scalingByLevel).length > 0) scaling = { byLevel: scalingByLevel, unit: 'fl. oz.' }
  }

  return { temperature, shake, wait, scaling }
}

async function run() {
  for (const url of args) {
    try {
      console.log('Fetching', url)
      const html = await fetchText(url)
      const parsed = parseRecipeHtml(html)
      console.log('Parsed:', url, JSON.stringify(parsed, null, 2))
      // send to server to save
      const saveRes = await fetch('http://localhost:5174/api/defaults', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url, title: '', ...parsed }) })
      if (!saveRes.ok) {
        console.error('Failed to save default for', url, await saveRes.text())
      } else {
        console.log('Saved default for', url)
      }
    } catch (err) {
      console.error('ERR for', url, err.message)
    }
  }
}

run().catch(e => { console.error('Fatal:', e.message); process.exit(1) })
