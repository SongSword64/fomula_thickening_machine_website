#!/usr/bin/env node
// Sweep recipe pages via proxy and report extraction coverage
// Usage: node scripts/sweep_recipes.js
const proxyBase = process.env.PROXY || 'http://localhost:5174/api/fetch?url='
const listUrl = proxyBase + encodeURIComponent('https://www.healthierthickening.com/recipes')

console.log('Fetching recipe listing via proxy:', listUrl)

async function fetchText(url) {
  const r = await fetch(url)
  if (!r.ok) throw new Error(`Fetch failed: ${r.status}`)
  return await r.text()
}

function extractRecipeLinks(html) {
  const anchors = []
  const re = /<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi
  let m
  while ((m = re.exec(html)) !== null) {
    const href = m[1]
    if (href && href.includes('/recipes/') && href !== 'https://www.healthierthickening.com/recipes' && href.endsWith('/')) {
      const title = (m[2] || '').replace(/<[^>]+>/g, '').trim()
      anchors.push({ url: href, title })
    }
  }
  // dedupe
  const unique = Array.from(new Map(anchors.map(a => [a.url, a])).values())
  return unique
}

function parseRecipeHtml(html) {
  // Attempt to parse table-based scalings first
  const tableScalings = {}
  const tblRe = /<table[^>]+class=["']?recipe-table["']?[^>]*>[\s\S]*?<tbody>([\s\S]*?)<\/tbody>/gi
  let tblMatch
  while ((tblMatch = tblRe.exec(html)) !== null) {
    const tbody = tblMatch[1]
    const rowRe = /<tr>[\s\S]*?<td[^>]*>([\s\S]*?)<\/td>[\s\S]*?<td[^>]*>([\s\S]*?)<\/td>[\s\S]*?<td[^>]*>([\s\S]*?)<\/td>[\s\S]*?<td[^>]*>([\s\S]*?)<\/td>[\s\S]*?<\/tr>/gi
    let r
    while ((r = rowRe.exec(tbody)) !== null) {
      const levelText = r[1].replace(/<[^>]+>/g, '').trim()
      const gramsText = r[4].replace(/<[^>]+>/g, '').trim()
      const level = parseInt(levelText, 10)
      const grams = parseFloat(gramsText.replace(/[^0-9\.]/g, ''))
      if (!Number.isNaN(level) && !Number.isNaN(grams)) tableScalings[level] = grams
    }
  }

  // Gather text blocks (include spans which often contain inline scale phrases)
  const textBlocks = Array.from(html.matchAll(/<(p|li|td|th|h[1-4]|span)[^>]*>([\s\S]*?)<\/\1>/gi)).map(m => (m[2] || '').replace(/<[^>]+>/g, '').trim())
  const findFirst = (re) => { for (const t of textBlocks) { const m = t.match(re); if (m) return m } return null }

  // Temperature
  let tempMatch = findFirst(/(?:temperature|serve at|warm to|heat to)[:\s]*([0-9]{1,3}(?:\.[0-9]+)?)\s*°?\s*(C|F)?/i) || findFirst(/([0-9]{2,3})\s*°\s*(C|F)/i)
  let temperature = null
  if (tempMatch) temperature = { value: parseFloat(tempMatch[1]), unit: (tempMatch[2] || 'F').toUpperCase() }

  // Shake — accept "Cap and shake well 30 seconds" etc
  let shakeMatch = findFirst(/shake(?:\s(?:well|for))?\s*([0-9]{1,3})\s*(seconds?|secs?|s|minutes?|mins?|m)/i)
  let shake = null
  if (shakeMatch) shake = { value: parseFloat(shakeMatch[1]), unit: shakeMatch[2] }

  // Wait time — accept "Wait Time 10 minutes"
  let waitMatch = findFirst(/wait(?:\s(?:time|for))?(?:\s|:)?\s*([0-9]{1,3})\s*(seconds?|secs?|s|minutes?|mins?|m)/i) || findFirst(/stand(?:ing)?(?:\sfor)?\s*([0-9]{1,3})\s*(seconds?|minutes?)/i)
  let wait = null
  if (waitMatch) wait = { value: parseFloat(waitMatch[1]), unit: waitMatch[2] }

  // Detect labeled sections like Slightly/Mildly/Moderately Thick and grab their inline scales
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
  try {
    const html = await fetchText(listUrl)
    const links = extractRecipeLinks(html)
    console.log(`Found ${links.length} recipe links; sampling each...`)

    const results = []
    for (const l of links) {
      try {
        const rhtml = await fetchText(proxyBase + encodeURIComponent(l.url))
        const parsed = parseRecipeHtml(rhtml)
        results.push({ url: l.url, title: l.title || '', parsed })
        console.log(`OK: ${l.url} -> temp:${parsed.temperature?1:0} shake:${parsed.shake?1:0} wait:${parsed.wait?1:0} scaling:${parsed.scaling?1:0}`)
      } catch (err) {
        console.error(`ERR fetching ${l.url}: ${err.message}`)
        results.push({ url: l.url, title: l.title || '', error: err.message })
      }
    }

    // Summarize coverage
    const total = results.length
    const counts = { temp:0, shake:0, wait:0, scaling:0, tableScaling:0, level1:0, level2:0, level3:0 }
    for (const r of results) {
      if (r.parsed) {
        if (r.parsed.temperature) counts.temp++
        if (r.parsed.shake) counts.shake++
        if (r.parsed.wait) counts.wait++
        if (r.parsed.scaling) {
          counts.scaling++
          if (r.parsed.scaling.byLevel) {
            counts.tableScaling++
            if (r.parsed.scaling.byLevel[1]) counts.level1++
            if (r.parsed.scaling.byLevel[2]) counts.level2++
            if (r.parsed.scaling.byLevel[3]) counts.level3++
          }
        }
      }
    }

    console.log('\n--- Coverage Summary ---')
    console.log(`Pages scanned: ${total}`)
    console.log(`Temperature found: ${counts.temp} (${((counts.temp/total)*100).toFixed(1)}%)`)
    console.log(`Shake found: ${counts.shake} (${((counts.shake/total)*100).toFixed(1)}%)`)
    console.log(`Wait found: ${counts.wait} (${((counts.wait/total)*100).toFixed(1)}%)`)
    console.log(`Any scaling found: ${counts.scaling} (${((counts.scaling/total)*100).toFixed(1)}%)`)
    console.log(`Table-based scaling: ${counts.tableScaling} (level1:${counts.level1}, level2:${counts.level2}, level3:${counts.level3})`)

    // Print per-page failures for scaling if needed
    const missingScaling = results.filter(r => r.parsed && !r.parsed.scaling).map(r => r.url)
    if (missingScaling.length > 0) {
      console.log('\nPages missing scaling (sample):')
      missingScaling.slice(0,10).forEach(u => console.log(' -', u))
    }

  } catch (err) {
    console.error('Sweep failed:', err.message)
    process.exit(1)
  }
}

run()
