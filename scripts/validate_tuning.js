#!/usr/bin/env node
// Simple validation script for FormulaTuning extraction heuristics
// Usage: node scripts/validate_tuning.js <recipe-url>
const urlArg = process.argv[2] || 'https://www.healthierthickening.com/recipes/similac-advance-powder/'
const proxyBase = process.env.PROXY || 'http://localhost:5174/api/fetch?url='
const fetchUrl = proxyBase + encodeURIComponent(urlArg)

console.log('Fetching via proxy:', fetchUrl)

async function main() {
  const res = await fetch(fetchUrl)
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`)
  const html = await res.text()

  // extract text blocks from common tags (p, li, td, th, h1-h4) and spans (including recipe-scale)
  const blocks = []
  const re = /<(p|li|td|th|h[1-4]|span)[^>]*>([\s\S]*?)<\/\1>/gi
  let m
  while ((m = re.exec(html)) !== null) {
    const text = m[2].replace(/<[^>]+>/g, '').trim()
    if (text) blocks.push(text)
  }

  const findFirst = (r) => { for (const t of blocks) { const mm = t.match(r); if (mm) return mm } return null }

  // Temperature
  let tempMatch = findFirst(/(?:temperature|serve at|warm to|heat to)[:\s]*([0-9]{1,3}(?:\.[0-9]+)?)\s*°?\s*(C|F)?/i) || findFirst(/([0-9]{2,3})\s*°\s*(C|F)/i)
  let temperature = null
  if (tempMatch) temperature = { value: parseFloat(tempMatch[1]), unit: (tempMatch[2] || 'F').toUpperCase() }

  // Shake time
  let shakeMatch = findFirst(/shake(?:\sfor)?\s*([0-9]{1,3})\s*(seconds?|secs?|s|minutes?|mins?|m)/i)
  let shake = null
  if (shakeMatch) shake = { value: parseFloat(shakeMatch[1]), unit: shakeMatch[2] }

  // Wait time (accept "Wait Time" and similar)
  let waitMatch = findFirst(/wait(?:\s(?:time|for))?(?:\s|:)?\s*([0-9]{1,3})\s*(seconds?|secs?|s|minutes?|mins?|m)/i) || findFirst(/stand(?:ing)?(?:\sfor)?\s*([0-9]{1,3})\s*(seconds?|minutes?)/i)
  let wait = null
  if (waitMatch) wait = { value: parseFloat(waitMatch[1]), unit: waitMatch[2] }

  // Scaling grams per unit — allow leading decimal like .6 and prefer parsing tables when possible
  // Try to detect table-based scalings first
  const tableScalings = {}
  const tblRe = /<table[^>]+class="recipe-table"[\s\S]*?<tbody>([\s\S]*?)<\/tbody>/gi
  let tblMatch
  while ((tblMatch = tblRe.exec(html)) !== null) {
    const tbody = tblMatch[1]
    // match rows and capture 1st and 4th td contents
    const rowRe = /<tr>([\s\S]*?)<\/tr>/gi
    let r
    while ((r = rowRe.exec(tbody)) !== null) {
      const tds = Array.from(r[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)).map(mm => (mm[1] || '').replace(/<[^>]+>/g, '').trim())
      if (tds.length >= 4) {
        const level = parseInt(tds[0], 10)
        const grams = parseFloat((tds[3] || '').replace(/[^0-9\.]/g, ''))
        if (!Number.isNaN(level) && !Number.isNaN(grams)) tableScalings[level] = grams
      }
    }
  }

  // Try to detect per-level scalings from table or from labeled sections like "Slightly Thick"
  // (Slightly/Mildly/Moderately Thick sections often include "To scale recipe, use Xg for 1 fl. oz.")
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
  if (Object.keys(tableScalings).length > 0) {
    scaling = { byLevel: tableScalings, unit: 'fl. oz.' }
  } else {
    // Try to detect inline per-level scalings by scanning nearby blocks
    const scalingByLevel = {}
    const scaleRegex = /([0-9]*\.?[0-9]+)\s*g\s*(?:for|per)\s*(?:1\s*)?(fl\.?\s*oz|oz|ml|mL)/i
    const simpleScaleRegex = /([0-9]*\.?[0-9]+)\s*g\s*(?:per|\/|for)\s*(?:1\s*)?(fl\.?\s*oz|oz|ml|mL)/i
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i]
      let mm = block.match(scaleRegex) || block.match(simpleScaleRegex)
      if (mm) {
        const grams = parseFloat(mm[1])
        const unit = (mm[2] || 'fl. oz.').toLowerCase()
        const rangeStart = Math.max(0, i - 2)
        const rangeEnd = Math.min(blocks.length - 1, i + 2)
        let assigned = false
        for (let j = rangeStart; j <= rangeEnd; j++) {
          const ctx = (blocks[j] || '').toLowerCase()
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

  const result = { temperature, shake, wait, scaling }
  console.log('Parsed result:')
  console.log(JSON.stringify(result, null, 2))

  // Do a sample calculation if scaling is present
  if (scaling) {
    const flOz = 4
    if (scaling.byLevel) {
      console.log('\nPer-level sample calculations (4 fl oz):')
      for (const lvl of [1,2,3]) {
        if (scaling.byLevel[lvl]) {
          const gramsPerFlOz = scaling.byLevel[lvl]
          const totalGrams = gramsPerFlOz * flOz
          const scoops = totalGrams / 1.2
          console.log(`Level ${lvl}: ${gramsPerFlOz.toFixed(3)} g/fl oz -> total ${totalGrams.toFixed(3)} g -> ${scoops.toFixed(3)} scoops`)
        } else {
          console.log(`Level ${lvl}: not available`)
        }
      }
    } else {
      let gramsPerFlOz = scaling.grams
      if (scaling.unit && scaling.unit.match(/ml/i)) gramsPerFlOz = gramsPerFlOz * 29.5735
      const totalGrams = gramsPerFlOz * flOz
      const scoops = totalGrams / 1.2
      console.log('\nSample calculation (4 fl oz):')
      console.log(`gramsPerFlOz: ${gramsPerFlOz.toFixed(3)} g/fl oz`)
      console.log(`totalGrams: ${totalGrams.toFixed(3)} g`)
      console.log(`scoops (1.2g each): ${scoops.toFixed(3)}`)
    }
  } else {
    console.log('No scaling found; cannot calculate.')
  }
}

main().catch(e => { console.error('Error:', e.message); process.exit(1) })
