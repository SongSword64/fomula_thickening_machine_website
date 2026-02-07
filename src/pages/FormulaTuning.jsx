import React, { useState, useEffect } from 'react'

const RECIPE_CATEGORIES = {
  'Single recipe': [
    { title: 'Breast Milk', url: 'https://www.healthierthickening.com/recipes/breast-milk/' },
    { title: 'Kendamil Classic First Infant Milk Powder', url: 'https://www.healthierthickening.com/recipes/kendamil-classic-first-infant-milk-powder/' },
    { title: 'Puramino Powder', url: 'https://www.healthierthickening.com/recipes/puramino-powder/' },
    { title: 'Similac Alimentum (RTF)', url: 'https://www.healthierthickening.com/recipes/similac-alimentum-rtf/' },
    { title: 'Similac Alimentum (Powder)', url: 'https://www.healthierthickening.com/recipes/similac-alimentum-powder/' },
    { title: 'Fortini RTF', url: 'https://www.healthierthickening.com/recipes/fortini-rtf/' },
    { title: 'Similac Soy Isomil (RTF)', url: 'https://www.healthierthickening.com/recipes/similac-soy-isomil-rtf/' },
    { title: 'Nutramigen (RTF)', url: 'https://www.healthierthickening.com/recipes/nutramigen-rtf/' },
    { title: 'Nutramigen (Powder)', url: 'https://www.healthierthickening.com/recipes/nutramigen-powder/' },
    { title: 'Enfamil NeuroPro (RTF)', url: 'https://www.healthierthickening.com/recipes/enfamil-neuropro-rtf/' },
    { title: 'Enfamil NeuroPro (Powder)', url: 'https://www.healthierthickening.com/recipes/enfamil-neuropro-powder/' },
    { title: 'Similac Advance (RTF)', url: 'https://www.healthierthickening.com/recipes/similac-advance-rtf/' },
    { title: 'Similac Advance (Powder)', url: 'https://www.healthierthickening.com/recipes/similac-advance-powder/' },
    { title: 'Similac Neosure (RTF)', url: 'https://www.healthierthickening.com/recipes/similac-neosure-rtf/' }
  ],
  'By Brand': [
    { title: 'Abbott', key: 'abbott', url: 'https://www.healthierthickening.com/thickening-breast-milk-formula-for-dysphagia/?brand=abbott' },
    { title: 'Alimentum', key: 'alimentum', url: 'https://www.healthierthickening.com/thickening-breast-milk-formula-for-dysphagia/?brand=alimentum' },
    { title: 'EleCare', key: 'elecare', url: 'https://www.healthierthickening.com/thickening-breast-milk-formula-for-dysphagia/?brand=elevate' },
    { title: 'Enfamil', key: 'enfamil', url: 'https://www.healthierthickening.com/thickening-breast-milk-formula-for-dysphagia/?brand=enfamil' },
    { title: 'Gerber', key: 'gerber', url: 'https://www.healthierthickening.com/thickening-breast-milk-formula-for-dysphagia/?brand=gerber' },
    { title: 'Kendamil', key: 'kendamil', url: 'https://www.healthierthickening.com/thickening-breast-milk-formula-for-dysphagia/?brand=kendamil' },
    { title: 'Nutramigen', key: 'nutramigen', url: 'https://www.healthierthickening.com/thickening-breast-milk-formula-for-dysphagia/?brand=nutramigen' },
    { title: 'Similac', key: 'similac', url: 'https://www.healthierthickening.com/thickening-breast-milk-formula-for-dysphagia/?brand=similac' }
  ],
  'By Type': [
    { title: 'Elemental', key: 'elemental', url: 'https://www.healthierthickening.com/thickening-breast-milk-formula-for-dysphagia/?type=elemental' },
    { title: 'Hypoallergenic', key: 'hypoallergenic', url: 'https://www.healthierthickening.com/thickening-breast-milk-formula-for-dysphagia/?type=hypoallergenic' },
    { title: 'Milk Based', key: 'milk-based', url: 'https://www.healthierthickening.com/thickening-breast-milk-formula-for-dysphagia/?type=milk-based' },
    { title: 'Powder', key: 'powder', url: 'https://www.healthierthickening.com/thickening-breast-milk-formula-for-dysphagia/?type=powder' },
    { title: 'Premature', key: 'premature', url: 'https://www.healthierthickening.com/thickening-breast-milk-formula-for-dysphagia/?type=premature' },
    { title: 'RTF', key: 'rtf', url: 'https://www.healthierthickening.com/thickening-breast-milk-formula-for-dysphagia/?type=rtf' },
    { title: 'Semi-Elemental', key: 'semi-elemental', url: 'https://www.healthierthickening.com/thickening-breast-milk-formula-for-dysphagia/?type=semi-elemental' }
  ]
}

export default function FormulaTuning() {

  // Recipe preview state
  // recipes grouped by category
  const [recipesByCategory, setRecipesByCategory] = useState(RECIPE_CATEGORIES)
  const categoryKeys = Object.keys(RECIPE_CATEGORIES)
  const [selectedGroup, setSelectedGroup] = useState(categoryKeys[0])
  const [selectedUrl, setSelectedUrl] = useState(RECIPE_CATEGORIES[categoryKeys[0]][0].url)
  const [subOptions, setSubOptions] = useState([])
  const [selectedSubUrl, setSelectedSubUrl] = useState(null)
  const [fetchError, setFetchError] = useState(null)

  const SUB_RECIPE_FALLBACKS = {
    // brand fallbacks (key -> list)
    abbott: [
      { title: 'Abbott - Example Recipe 1', url: 'https://www.healthierthickening.com/recipes/abbott-example-1/' },
      { title: 'Abbott - Example Recipe 2', url: 'https://www.healthierthickening.com/recipes/abbott-example-2/' }
    ],
    similac: [
      { title: 'Similac Advance (Powder)', url: 'https://www.healthierthickening.com/recipes/similac-advance-powder/' },
      { title: 'Similac Advance (RTF)', url: 'https://www.healthierthickening.com/recipes/similac-advance-rtf/' },
      { title: 'Similac Alimentum (Powder)', url: 'https://www.healthierthickening.com/recipes/similac-alimentum-powder/' },
      { title: 'Similac Alimentum (RTF)', url: 'https://www.healthierthickening.com/recipes/similac-alimentum-rtf/' },
      { title: 'Similac Neosure (RTF)', url: 'https://www.healthierthickening.com/recipes/similac-neosure-rtf/' }
    ],
    enfamil: [
      { title: 'Enfamil NeuroPro (Powder)', url: 'https://www.healthierthickening.com/recipes/enfamil-neuropro-powder/' },
      { title: 'Enfamil NeuroPro (RTF)', url: 'https://www.healthierthickening.com/recipes/enfamil-neuropro-rtf/' }
    ],
    nutramigen: [
      { title: 'Nutramigen (Powder)', url: 'https://www.healthierthickening.com/recipes/nutramigen-powder/' },
      { title: 'Nutramigen (RTF)', url: 'https://www.healthierthickening.com/recipes/nutramigen-rtf/' }
    ],
    kendamil: [
      { title: 'Kendamil Classic First Infant Milk Powder', url: 'https://www.healthierthickening.com/recipes/kendamil-classic-first-infant-milk-powder/' }
    ],
    // type fallbacks
    rtf: [
      { title: 'Similac Advance (RTF)', url: 'https://www.healthierthickening.com/recipes/similac-advance-rtf/' },
      { title: 'Enfamil NeuroPro (RTF)', url: 'https://www.healthierthickening.com/recipes/enfamil-neuropro-rtf/' },
      { title: 'Nutramigen (RTF)', url: 'https://www.healthierthickening.com/recipes/nutramigen-rtf/' }
    ],
    'powder': [
      { title: 'Similac Advance (Powder)', url: 'https://www.healthierthickening.com/recipes/similac-advance-powder/' },
      { title: 'Enfamil NeuroPro (Powder)', url: 'https://www.healthierthickening.com/recipes/enfamil-neuropro-powder/' },
      { title: 'Nutramigen (Powder)', url: 'https://www.healthierthickening.com/recipes/nutramigen-powder/' }
    ],
    'milk-based': [
      { title: 'Breast Milk', url: 'https://www.healthierthickening.com/recipes/breast-milk/' }
    ]
  }

  const THICKNESS_OPTIONS = [
    { value: '1', label: 'Slightly Thick (IDDSI level 1)' },
    { value: '2', label: 'Mildly Thick (IDDSI level 2)' },
    { value: '3', label: 'Moderately Thick (IDDSI level 3)' }
  ]

  const [thickness, setThickness] = useState('1')
  const [volume, setVolume] = useState(4)
  const [volumeUnit, setVolumeUnit] = useState('fl. oz.')
  const [tempUnit, setTempUnit] = useState('F')

  // Defaults derived from https://www.healthierthickening.com/recipes/breast-milk/
  const BREAST_MILK_DEFAULTS = {
    temperature: { value: 100, unit: 'F' },
    shake: { value: 30, unit: 'seconds' },
    wait: { value: 10, unit: 'minutes' },
    scaling: { byLevel: { 1: 0.6, 2: 0.8, 3: 1.2 }, unit: 'fl. oz.' }
  }

  const [extractedInfo, setExtractedInfo] = useState(BREAST_MILK_DEFAULTS)
  // Gelmix concentration is derived from extractedInfo and current thickness (read-only)


  useEffect(() => {
    // Ask the server for a structured list of categories to avoid in-page DOM parsing
    let mounted = true
    fetch('/api/recipes')
      .then(res => res.json())
      .then(json => {
        if (!mounted) return
        if (json && json.categories) {
          // merge with local fallbacks but only override when the server returned non-empty lists
          setRecipesByCategory(prev => {
            const merged = { ...prev }
            for (const k of Object.keys(json.categories)) {
              if (Array.isArray(json.categories[k]) && json.categories[k].length > 0) merged[k] = json.categories[k]
            }
            return merged
          })

          // interpret counts (server provides counts when available)
          const counts = json.counts || { single: 0, brands: 0, types: 0 }
          if (counts.single + counts.brands + counts.types === 0) {
            setFetchError('No recipe links found on upstream; using local fallback lists.')
            return
          }

          // select Single recipe if available from upstream
          const single = (json.categories['Single recipe'] || [])
          if (single.length > 0) {
            setSelectedGroup('Single recipe')
            setSelectedUrl(single[0].url)
            setFetchError(null)
            return
          }

          // upstream returned some categories but no single list
          setFetchError('Upstream returned partial results; using local fallbacks where needed.')
          return
        }
        setFetchError('No recipe links found; using fallback lists.')
      })
      .catch(() => {
        setFetchError('Could not fetch recipes (proxy error); using fallback lists.')
      })
    return () => { mounted = false }
  }, [])

  // parsing utility for recipe listing page
  async function fetchAndParseRecipe(targetUrl) {
    try {
      // explicit param name to avoid accidental free-variable references to `url`
      const res = await fetch(`/api/fetch?url=${encodeURIComponent(targetUrl)}`)
      const html = await res.text()
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, 'text/html')

      // prefer parsing recipe tables when present (they contain per-level scaling)
      const tableScalings = {}
      const tables = Array.from(doc.querySelectorAll('table.recipe-table'))
      if (tables.length > 0) {
        for (const tbl of tables) {
          const rows = Array.from(tbl.querySelectorAll('tbody tr'))
          for (const r of rows) {
            const tds = Array.from(r.querySelectorAll('td'))
            if (tds.length >= 4) {
              const levelText = (tds[0].textContent || '').trim()
              const gramsText = (tds[3].textContent || '').trim()
              const level = parseInt(levelText, 10)
              const grams = parseFloat(gramsText.replace(/[^0-9\.]/g, ''))
              if (!Number.isNaN(level) && !Number.isNaN(grams)) tableScalings[level] = grams
            }
          }
        }
      }

      // Additionally, the site often presents per-level sections (Slightly/Mildly/Moderately Thick)
      // with inline scale phrases like "To scale recipe, use .6g for 1 fl. oz." — extract these directly
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

      // fallback: collect text blocks for regex searches
      // include span.recipe-scale and broader elements so we capture inline scaling phrases
      const textBlocks = Array.from(doc.querySelectorAll('p, li, td, th, h1, h2, h3, h4, span.recipe-scale, span')).map(n => (n.textContent || '').trim())

      // helper to search blocks for regex and return first capture
      const findFirst = (re) => {
        for (const t of textBlocks) {
          const m = t.match(re)
          if (m) return m
        }
        return null
      }

      // Temperature
      let tempMatch = findFirst(/(?:temperature|serve at|warm to|heat to)[:\s]*([0-9]{1,3}(?:\.[0-9]+)?)\s*°?\s*(C|F)?/i) || findFirst(/([0-9]{2,3})\s*°\s*(C|F)/i)
      let temperature = null
      if (tempMatch) {
        temperature = { value: parseFloat(tempMatch[1]), unit: (tempMatch[2] || 'F').toUpperCase() }
      }

      // Shake time — be tolerant of phrases like "Cap and shake well 30 seconds..."
      let shakeMatch = findFirst(/shake(?:\s(?:well|for))?\s*([0-9]{1,3})\s*(seconds?|secs?|s|minutes?|mins?|m)/i)
      let shake = null
      if (shakeMatch) {
        shake = { value: parseFloat(shakeMatch[1]), unit: shakeMatch[2] }
      }

      // Wait time — accept "Wait Time 10 minutes" and similar
      let waitMatch = findFirst(/wait(?:\s(?:time|for))?(?:\s|:)?\s*([0-9]{1,3})\s*(seconds?|secs?|s|minutes?|mins?|m)/i) || findFirst(/stand(?:ing)?(?:\sfor)?\s*([0-9]{1,3})\s*(seconds?|minutes?)/i)
      let wait = null
      if (waitMatch) {
        wait = { value: parseFloat(waitMatch[1]), unit: waitMatch[2] }
      }

      // Scaling: prefer table-based per-level scalings; fallback to inline phrases like "use .6g for 1 fl. oz." (allow leading ".6")
      let scaling = null
      if (Object.keys(tableScalings).length > 0) {
        scaling = { byLevel: tableScalings, unit: 'fl. oz.' }
      } else {
        // Attempt to detect inline per-level scalings by scanning nearby text blocks
        const scalingByLevel = {}
        const scaleRegex = /([0-9]*\.?[0-9]+)\s*g\s*(?:for|per)\s*(?:1\s*)?(fl\.?\s*oz|oz|ml|mL)/i
        const simpleScaleRegex = /([0-9]*\.?[0-9]+)\s*g\s*(?:per|\/|for)\s*(?:1\s*)?(fl\.?\s*oz|oz|ml|mL)/i

        for (let i = 0; i < textBlocks.length; i++) {
          const block = textBlocks[i]
          let m = block.match(scaleRegex) || block.match(simpleScaleRegex)
          if (m) {
            const grams = parseFloat(m[1])
            const unit = (m[2] || 'fl. oz.').toLowerCase()
            // search nearby blocks for level indicators
            const contextRange = [Math.max(0, i - 2), Math.min(textBlocks.length - 1, i + 2)]
            let assigned = false
            for (let j = contextRange[0]; j <= contextRange[1]; j++) {
              const ctx = (textBlocks[j] || '').toLowerCase()
              // detect numeric level
              const levelNum = (ctx.match(/level\s*([123])/i) || [])[1]
              if (levelNum) {
                scalingByLevel[parseInt(levelNum, 10)] = grams
                assigned = true
                break
              }
              // detect words
              if (ctx.match(/slight|slightly/)) { scalingByLevel[1] = grams; assigned = true; break }
              if (ctx.match(/mild|mildly/)) { scalingByLevel[2] = grams; assigned = true; break }
              if (ctx.match(/moderate|moderately/)) { scalingByLevel[3] = grams; assigned = true; break }
            }
            if (!assigned) {
              // record as default single-value scaling if no level indicator found
              if (!scaling) scaling = { grams, unit }
            }
          }
        }

        if (Object.keys(scalingByLevel).length > 0) scaling = { byLevel: scalingByLevel, unit: 'fl. oz.' }
      }

      return { temperature, shake, wait, scaling }
    } catch (err) {
      throw err
    }
  }

  // ensure selectedUrl stays in sync when group changes
  useEffect(() => {
    const list = recipesByCategory[selectedGroup]
    if (list && list.length > 0) setSelectedUrl(list[0].url)
    // clear sub-options when switching categories
    setSubOptions([])
    setSelectedSubUrl(null)
  }, [selectedGroup, recipesByCategory])

  // When the source URL changes, attempt to load a saved default from server CSV
  useEffect(() => {
    let mounted = true
    // compute source locally to avoid referencing `sourceUrl` before it's declared
    const src = (selectedGroup === 'By Brand' || selectedGroup === 'By Type') ? (selectedSubUrl || selectedUrl) : selectedUrl
    if (!src) return
    fetch(`/api/defaults?url=${encodeURIComponent(src)}`)
      .then(r => r.json())
      .then(json => {
        if (!mounted) return
        if (json && json.default) {
          setExtractedInfo(json.default)
          setFetchError(null)
        }
      })
      .catch(() => {})
    return () => { mounted = false }
  }, [selectedGroup, selectedUrl, selectedSubUrl])

  // when selecting a brand/type filter, fetch the listing and populate sub-options
  useEffect(() => {
    let mounted = true
    async function fetchSubs() {
      setFetchError(null)
      setSubOptions([])
      setSelectedSubUrl(null)
      if (selectedGroup === 'By Brand' || selectedGroup === 'By Type') {
        try {
          const res = await fetch(`/api/subrecipes?url=${encodeURIComponent(selectedUrl)}`)
          const json = await res.json()
          if (!mounted) return
          const unique = (json && json.subrecipes && json.subrecipes.length > 0) ? json.subrecipes : []
          const selectedItem = (recipesByCategory[selectedGroup] || []).find(r => r.url === selectedUrl)
          const key = selectedItem && selectedItem.key

          if (unique.length > 0) {
            setSubOptions(unique)
            setSelectedSubUrl(unique[0].url)
            setFetchError(null)
          } else if (key && SUB_RECIPE_FALLBACKS[key]) {
            // use pre-collected fallbacks for this brand/type
            setSubOptions(SUB_RECIPE_FALLBACKS[key])
            setSelectedSubUrl(SUB_RECIPE_FALLBACKS[key][0].url)
            setFetchError(null)
          } else {
            setFetchError('No sub-recipes found for this selection (page may require scripts or block fetch).')
          }
        } catch (err) {
          // parsing failed; try fallback
          const selectedItem = (recipesByCategory[selectedGroup] || []).find(r => r.url === selectedUrl)
          const key = selectedItem && selectedItem.key
          if (key && SUB_RECIPE_FALLBACKS[key]) {
            setSubOptions(SUB_RECIPE_FALLBACKS[key])
            setSelectedSubUrl(SUB_RECIPE_FALLBACKS[key][0].url)
            setFetchError(null)
          } else {
            setFetchError('Could not fetch sub-recipes (CORS or network); try opening the list in a new tab.')
          }
        }
      }
    }
    fetchSubs()
    return () => { mounted = false }
  }, [selectedGroup, selectedUrl])

  // Dynamic label for the Select dropdown to be more contextual
  const selectLabel = selectedGroup === 'By Brand' ? 'Select brand' : (selectedGroup === 'By Type' ? 'Select type' : 'Select recipe')

  // extract recipe info (temperature, shake, wait, scaling) and populate extractedInfo
  async function extractRecipeData(targetUrl) {
    try {
      console.log('Extracting recipe from', targetUrl)
      const info = await fetchAndParseRecipe(targetUrl)
      // populate info into UI
      setExtractedInfo(info)
      setFetchError(null)
    } catch (err) {
      console.error('extractRecipeData failed:', err)
      setFetchError('Failed to extract recipe data (CORS or site blocks fetch).')
    }
  }

  // derive selected concentration (g per fl oz) for current thickness
  function getSelectedGPerFlOz() {
    if (!extractedInfo || !extractedInfo.scaling) return null
    const s = extractedInfo.scaling
    if (s.byLevel) {
      const level = parseInt(thickness, 10)
      const v = s.byLevel[level]
      if (Number.isFinite(Number(v))) return Number(v)
      return null
    }
    if (Number.isFinite(Number(s.grams))) {
      let val = Number(s.grams)
      if (s.unit && String(s.unit).toLowerCase().includes('ml')) val = val * 29.5735
      return val
    }
    return null
  }

  // helper to render a switch control; variant 1/2/3 provide different visuals
  function renderSwitch({ leftLabel, rightLabel, value, onToggle, variant = 2, small = false }) {
    const width = small ? 72 : 96
    const height = small ? 22 : 28
    if (variant === 2) {
      // segmented with active background
      const leftActive = value === leftLabel
      return (
        <div style={{width, height, borderRadius:height/2, overflow:'hidden', border:'1px solid #ddd', display:'flex', fontSize: small?10:12}} onClick={onToggle}>
          <div style={{flex:1, textAlign:'center', paddingTop: small?2:4, background: leftActive ? '#4caf50' : '#f6f6f6', color: leftActive ? '#fff' : '#666'}}>{leftLabel}</div>
          <div style={{flex:1, textAlign:'center', paddingTop: small?2:4, background: !leftActive ? '#4caf50' : '#f6f6f6', color: !leftActive ? '#fff' : '#666'}}>{rightLabel}</div>
        </div>
      )
    }
    if (variant === 3) {
      // simple pill with small knob
      const leftActive = value === leftLabel
      return (
        <div style={{width, height, borderRadius:height/2, border:'1px solid #ddd', position:'relative', background:'#f6f6f6'}} onClick={onToggle}>
          <div style={{position:'absolute',left: leftActive?4:(width - height + 4),top:4,width:height-8,height:height-8,borderRadius:'50%',background:'#fff',boxShadow:'0 1px 2px rgba(0,0,0,0.08)',transition:'left .12s'}} />
          <div style={{position:'absolute',left:8,top: small?3:6,fontSize: small?10:12,color:leftActive? '#000':'#666'}}>{leftLabel}</div>
          <div style={{position:'absolute',right:8,top: small?3:6,fontSize: small?10:12,color:!leftActive? '#000':'#666'}}>{rightLabel}</div>
        </div>
      )
    }
    // default variant 1
    return (
      <button type="button" onClick={onToggle} aria-pressed={value !== leftLabel} style={{width, height, padding:0, border:'1px solid #ddd', borderRadius:height/2, background:'#f6f6f6', position:'relative', display:'flex', alignItems:'center', justifyContent:'space-between', fontSize: small?10:12}}>
        <span style={{paddingLeft:8, color: value===leftLabel? '#000' : '#666'}}>{leftLabel}</span>
        <span style={{paddingRight:8, color: value===rightLabel? '#000' : '#666'}}>{rightLabel}</span>
        <span style={{position:'absolute', top: (small?3:3), left: value===rightLabel ? width/2 + 4 : 4, width: (small?36:40), height: (small?16:22), borderRadius:(small?8:11), background:'#fff', boxShadow:'0 1px 2px rgba(0,0,0,0.08)', transition:'left .12s'}} />
      </button>
    )
  }

  function convertToFlOz(v, unit) {
    if (!v) return 0
    if (unit === 'fl. oz.') return +v
    // assume ml
    return +v / 29.5735
  }

  function calculateResults() {
    const gramsPerFlOz = getSelectedGPerFlOz()
    if (!gramsPerFlOz || !Number.isFinite(gramsPerFlOz)) return null

    const flOz = convertToFlOz(volume, volumeUnit)
    const totalGrams = gramsPerFlOz * flOz
    const scoops = totalGrams / 1.2
    return { gramsPerFlOz, totalGrams, scoops }
  }


  const sourceUrl = (selectedGroup === 'By Brand' || selectedGroup === 'By Type') ? (selectedSubUrl || selectedUrl) : selectedUrl

  const res = calculateResults()
  let tempDisplay = '—'
  if (extractedInfo.temperature) {
    const t = extractedInfo.temperature
    if (tempUnit === 'C') {
      const valC = t.unit === 'F' ? Math.round((t.value - 32) * 5 / 9) : Math.round(t.value)
      tempDisplay = `${valC} °C`
    } else {
      const valF = t.unit === 'C' ? Math.round((t.value * 9 / 5) + 32) : Math.round(t.value)
      tempDisplay = `${valF} °F`
    }
  }

  return (
    <section>
      <h2>Formula Tuning</h2>
      <p>Enter a target thickness and volume, then extract recipe guidance to calculate grams and scoops.</p>

      <div style={{display:'flex',gap:16,alignItems:'flex-start'}}>
        <div style={{flex:1}}>
          <div style={{padding:12,background:'#fafafa',border:'1px solid #eee',borderRadius:6}}>
            <h3 style={{margin:'0 0 8px 0'}}>Recipe selection</h3>
            <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
              <div style={{minWidth:240}}>
                <label style={{display:'block',fontSize:13,fontWeight:700}}>Category</label>
                <select value={selectedGroup} onChange={e => setSelectedGroup(e.target.value)} style={{width:'100%'}}>
                  {categoryKeys.map((k, i) => (
                    <option key={i} value={k}>{k}</option>
                  ))}
                </select>
              </div>

              <div style={{minWidth:240}}>
                <label style={{display:'block',fontSize:13,fontWeight:700}}>{selectLabel}</label>
                <select value={selectedUrl} onChange={e => setSelectedUrl(e.target.value)} style={{width:'100%'}}>
                  {(recipesByCategory[selectedGroup] || []).map((r, i) => (
                    <option key={i} value={r.url}>{r.title}</option>
                  ))}
                </select>
              </div>

              { (selectedGroup === 'By Brand' || selectedGroup === 'By Type') && (
                <div style={{minWidth:240}}>
                  <label style={{display:'block',fontSize:13,fontWeight:700}}>Choose recipe</label>
                  <select value={selectedSubUrl || ''} onChange={e => setSelectedSubUrl(e.target.value)} style={{width:'100%'}}>
                    <option value="">-- Select a recipe --</option>
                    {subOptions.map((s, i) => (
                      <option key={i} value={s.url}>{s.title}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div style={{marginTop:12,fontSize:13,color:'#444'}}>
              <div><strong>Source:</strong> {sourceUrl ? <a href={sourceUrl} target="_blank" rel="noopener noreferrer">{new URL(sourceUrl).hostname}</a> : '—'}</div>
              <div style={{marginTop:6,fontSize:12,color:'#666'}}>Preview removed to keep the interface focused on inputs and results.</div>
              {fetchError && <div style={{color:'orange',marginTop:8}}>{fetchError}</div>}
              {/* explicit fallback badge for discoverability */}
              {fetchError && String(fetchError).toLowerCase().includes('fallback') && (
                <div style={{marginTop:8,fontSize:12,color:'#666',background:'#fff8e1',padding:8,borderRadius:4}}>⚠️ Using fallback recipe lists — the proxy could not retrieve the upstream list.</div>
              )}

              {/* Preparation inputs moved here under recipe selection */}
              <div style={{marginTop:12,padding:12,background:'#fff',border:'1px solid #eee',borderRadius:6}}>
                <h4 style={{margin:'0 0 8px 0'}}>Preparation inputs</h4>

                <div>
                  <div style={{fontSize:13,fontWeight:700}}>Desired thickness</div>
                  <div style={{display:'flex',gap:8,marginTop:6}}>
                    {THICKNESS_OPTIONS.map(t => (
                      <label key={t.value} style={{display:'flex',alignItems:'center',gap:6}}>
                        <input type="radio" name="thickness_left" value={t.value} checked={thickness===t.value} onChange={() => setThickness(t.value)} />
                        <div style={{fontSize:13}}>{t.label}</div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Volume row (separated) */}
                <div style={{marginTop:8,display:'flex',alignItems:'center',gap:12}}>
                  <label style={{display:'flex',alignItems:'center',gap:8}}>
                    <div style={{fontSize:13,fontWeight:700}}>Desired volume</div>
                    <input type="number" min={1} step={1} value={volume} onChange={e => setVolume(Number(e.target.value))} style={{width:'5ch',padding:'4px 6px'}} />
                  </label>

                  <div style={{display:'flex',alignItems:'center',gap:8}}>
                    {/* render switch per variant */}
                    {renderSwitch({
                      leftLabel: 'fl. oz.',
                      rightLabel: 'ml',
                      value: volumeUnit === 'ml' ? 'ml' : 'fl. oz.',
                      onToggle: () => setVolumeUnit(volumeUnit === 'ml' ? 'fl. oz.' : 'ml'),
                      variant: 2
                    })}
                  </div>
                </div>

                {/* Temperature row: aligned left, below volume */}
                <div style={{marginTop:8,display:'flex',alignItems:'center',gap:12}}>
                  <div style={{fontSize:13,fontWeight:700,marginRight:8}}>Temperature unit</div>
                  {renderSwitch({
                    leftLabel: '°F',
                    rightLabel: '°C',
                    value: tempUnit === 'C' ? '°C' : '°F',
                    onToggle: () => setTempUnit(tempUnit === 'F' ? 'C' : 'F'),
                    variant: 2
                  })}
                </div>



                <div style={{marginTop:10,display:'flex',gap:8}}>
                  <button onClick={async () => {
                    // require a specific recipe when brand/type is selected
                    if ((selectedGroup === 'By Brand' || selectedGroup === 'By Type') && !selectedSubUrl) { setFetchError('Please choose a recipe for the selected brand/type.'); return }
                    const chosenUrl = (selectedGroup === 'By Brand' || selectedGroup === 'By Type') ? (selectedSubUrl || selectedUrl) : selectedUrl
                    if (!chosenUrl) { setFetchError('No recipe selected to extract from'); return }
                    setFetchError(null)
                    try {
                      console.log('Extract & Calculate clicked, chosenUrl=', chosenUrl)
                      await extractRecipeData(chosenUrl)
                    } catch (err) {
                      console.error('Error during extract:', err)
                      setFetchError(String(err))
                    }
                  }}>Extract & Calculate</button>
                  <button onClick={() => { setExtractedInfo(BREAST_MILK_DEFAULTS); setThickness('1'); setVolume(4); setVolumeUnit('fl. oz.'); setTempUnit('F'); }}>Reset to breast milk defaults</button>
                  <button onClick={async () => {
                    if (!sourceUrl) { setFetchError('No source selected to save'); return }
                    const payload = { url: sourceUrl, title: (recipesByCategory[selectedGroup] || []).find(r => r.url === sourceUrl)?.title || '', temperature: extractedInfo.temperature || null, shake: extractedInfo.shake || null, wait: extractedInfo.wait || null, scaling: extractedInfo.scaling || null }
                    try {
                      const r = await fetch('/api/defaults', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
                      if (!r.ok) throw new Error('save failed')
                      setFetchError('Saved defaults for this recipe')
                    } catch (err) {
                      setFetchError('Failed to save defaults')
                    }
                  }}>Save as default</button>
                </div>
              </div>
            </div>
          </div>

          <aside style={{width:380,background:'#fff',border:'1px solid #eee',padding:16,borderRadius:6}}>
            <h4 style={{marginTop:12}}>Results</h4>
            <div style={{fontSize:13,color:'#222'}}>
              <div>Temperature: {tempDisplay}</div>

              <div style={{marginTop:8}}>Scoops/Grams: {res ? `${res.scoops.toFixed(2)}/${res.totalGrams.toFixed(2)} g` : '—'}</div>

              <div style={{marginTop:8}}>Shake: {extractedInfo.shake ? `${extractedInfo.shake.value} ${extractedInfo.shake.unit}` : '—'}</div>

              <div style={{marginTop:8}}>Wait: {extractedInfo.wait ? `${extractedInfo.wait.value} ${extractedInfo.wait.unit}` : '—'}</div>

              {fetchError && <p className="success" style={{color:'orange'}}>{fetchError}</p>}

              <div style={{marginTop:12,fontSize:12,color:'#666'}}>
                <div><strong>Source data:</strong> HealthierThickening.com — <a href={sourceUrl} target="_blank" rel="noopener noreferrer">open recipe page</a></div>
                <div style={{marginTop:6}}>Acknowledgement: content used here for preparation guidance only; verify with original source and your care team before use.</div>
              </div>
            </div>
          </aside>
        </div>
      </div>


    </section>
  )
}
