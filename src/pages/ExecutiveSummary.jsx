import React from 'react'

export default function ExecutiveSummary() {
  return (
    <section>
      <h2>Executive Summary</h2>
      <p>
        We are creating an appliance that prepares thickened infant formula for children with dysphagia. The
        system automates preparation to ensure consistency, accuracy, and hygiene while supporting
        common components: thickening agents (e.g., Gelmix), formula powder, and water. The appliance
        delivers a ready-to-feed, IDDSI-compliant formula to improve feeding safety and reduce caregiver burden.
      </p>
      <p>
        The device will be available through a <strong>monthly rental model</strong> (~$75/month) to reduce upfront costs,
        enable temporary use for short-term dysphagia cases, and allow ongoing device improvements through machine rotation.
        We are pursuing <strong>FSA/HSA eligibility</strong> and working toward eventual <strong>insurance coverage</strong> to
        maximize accessibility for families.
      </p>
      <p>
        Key product goals:
      </p>
      <ul>
        <li>Precise dosing of thickener and formula powder</li>
        <li>Controlled temperature and mixing to avoid lumps and ensure repeatable texture</li>
        <li>Sanitation workflows for hygiene between preparations</li>
        <li>Simple UI for caregivers and care teams with compliance tracking (IDDSI levels)</li>
        <li>Data collection to refine recipes and improve reliability over time</li>
      </ul>
    </section>
  )
}
