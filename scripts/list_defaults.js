#!/usr/bin/env node
// Print defaults saved locally (ES module)
import fs from 'fs'
import path from 'path'
const file = path.join(process.cwd(), 'server', 'data', 'defaults.json')
if (!fs.existsSync(file)) { console.log('No defaults.json present'); process.exit(0) }
const json = JSON.parse(fs.readFileSync(file, 'utf8'))
console.log(JSON.stringify(json, null, 2))
