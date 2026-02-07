import React, { useState } from 'react'

const STORAGE_KEY = 'ftm_stories'

export default function DataCollection() {
  const [form, setForm] = useState({ name: '', email: '', story: '', role: '', interested: '' })
  const [saved, setSaved] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setSaved(false)
  }

  function handleSubmit(e) {
    e.preventDefault()
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    existing.push({ ...form, date: new Date().toISOString() })
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing))
    setForm({ name: '', email: '', story: '', role: '', interested: '' })
    setSaved(true)
  }

  return (
    <section>
      <h2>Help Shape This Product</h2>
      <p>
        We're collecting feedback from <strong>parents</strong> and <strong>feeding therapy professionals</strong> to validate market fit,
        understand real-world challenges, and prioritize features. Your input directly influences the product roadmap.
      </p>
      <p style={{ marginTop: '12px', fontStyle: 'italic', color: '#666' }}>
        <strong>All data is anonymous by default.</strong> You can opt to share your name for follow-up conversations—we'll always ask first.
        We plan to publish aggregate findings publicly so the community benefits from this research.
      </p>

      <article style={{ marginTop: '24px' }}>
        <h3>Quick Survey (5 min)</h3>
        <p>Tell us about your experience and needs:</p>
        <form onSubmit={handleSubmit} className="form">
          <label>
            I am a: *
            <select 
              name="role" 
              value={form.role || ''} 
              onChange={handleChange} 
              required 
              style={{ padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', marginTop: '4px' }}
            >
              <option value="">Select...</option>
              <option value="parent">Parent / Caregiver</option>
              <option value="slp">Speech-Language Pathologist (SLP)</option>
              <option value="provider">Feeding Therapist / Clinician</option>
              <option value="other">Other Healthcare Provider</option>
              <option value="general">Interested Community Member</option>
            </select>
          </label>
          <label>
            Name (optional — for follow-up)
            <input name="name" value={form.name} onChange={handleChange} />
          </label>
          <label>
            Email (optional — for follow-up)
            <input name="email" type="email" value={form.email} onChange={handleChange} />
          </label>
          <label>
            What's your main challenge with thickening infant formula? *
            <textarea 
              name="story" 
              value={form.story} 
              onChange={handleChange} 
              required 
              placeholder="E.g., time spent mixing, consistency issues, safety concerns, recipe confusion..."
            />
          </label>
          <label>
            Would you be interested in beta testing this product?
            <select 
              name="interested" 
              value={form.interested || ''} 
              onChange={handleChange} 
              style={{ padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', marginTop: '4px' }}
            >
              <option value="">Select...</option>
              <option value="yes">Yes, absolutely</option>
              <option value="maybe">Maybe, tell me more</option>
              <option value="no">Not right now</option>
            </select>
          </label>
          <button type="submit">Submit Feedback</button>
          {saved && <p className="success">✓ Thanks! Your feedback has been saved and will help shape this product.</p>}
        </form>
      </article>

      <article style={{ marginTop: '24px' }}>
        <h3>Deeper Conversation?</h3>
        <p>
          If you'd like to dive deeper (20-min call, detailed interview, or ongoing partnership), 
          <a href="mailto:contact@example.com"> reach out directly.</a> We're especially interested in:
        </p>
        <ul>
          <li>Clinical advisors (SLPs, pediatricians, feeding therapists) interested in shaping requirements</li>
          <li>Families willing to share detailed experiences to inform the design</li>
          <li>Healthcare providers interested in early partnership discussions or case studies</li>
        </ul>
      </article>

      <article style={{ marginTop: '24px' }}>
        <h3>Submissions & Public Data</h3>
        <p>
          All submissions below are stored locally on your device and can be exported. 
          <strong> When we publish aggregate findings, we'll ensure anonymity</strong> unless you've explicitly opted in to be credited.
        </p>
        <SavedStories />
      </article>
    </section>
  )
}

function SavedStories() {
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))

  function reload() {
    setItems(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))
  }

  function clearAll() {
    localStorage.removeItem(STORAGE_KEY)
    reload()
  }

  return (
    <div>
      <button onClick={reload}>Reload</button>
      <button onClick={clearAll}>Clear All</button>
      {items.length === 0 ? (
        <p style={{ color: '#666', marginTop: '12px' }}>No submissions yet. Be the first to share!</p>
      ) : (
        <ul style={{ marginTop: '12px' }}>
          {items.map((it, i) => (
            <li key={i} style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <strong>{it.name || 'Anonymous'}</strong> 
              {it.role && ` · ${it.role}`}
              {' '}
              <span style={{ color: '#666', fontSize: '0.9rem' }}>({new Date(it.date).toLocaleDateString()})</span>
              <br />
              {it.story}
              {it.interested && <p style={{ fontSize: '0.9rem', color: '#0366d6', marginTop: '4px' }}>💡 Interested in beta testing</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
