#!/usr/bin/env node
const url = process.argv[2] || 'https://www.healthierthickening.com/recipes/similac-advance-powder/'
const proxy = process.env.PROXY || 'http://localhost:5174/api/fetch?url='
;(async ()=>{
  const r = await fetch(proxy + encodeURIComponent(url))
  const html = await r.text()
  const re = /<(p|li|td|th|h[1-4]|span)[^>]*>([\s\S]*?)<\/\1>/gi
  const blocks = []
  let m
  while ((m = re.exec(html)) !== null) {
    const txt = (m[2] || '').replace(/<[^>]+>/g,'').trim()
    if (txt) blocks.push(txt)
  }
  console.log('Total blocks:', blocks.length)
  const scaleRegex = /([0-9]*\.?[0-9]+)\s*g\s*(?:for|per)\s*(?:1\s*)?(fl\.?\s*oz|oz|ml|mL)/i
  blocks.forEach((b,i)=>{
    const sm = b.match(scaleRegex)
    if (sm) {
      console.log('\nFOUND scale at block', i, ':', b)
      const ctxStart = Math.max(0, i-4), ctxEnd = Math.min(blocks.length-1, i+4)
      for (let j=ctxStart;j<=ctxEnd;j++) console.log(j, '>>', blocks[j])
    }
  })
})().catch(e=>{ console.error(e); process.exit(1) })