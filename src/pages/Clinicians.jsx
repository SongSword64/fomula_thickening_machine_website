import React from 'react'

export default function Clinicians() {
  return (
    <section>
      <h2>For Clinicians & Hospitals</h2>
      <p>
        This page is for speech-language pathologists (SLPs), pediatric feeding therapists, hospital nutritionists,
        NICU teams, and other healthcare providers working with infants requiring thickened formula.
      </p>

      <article>
        <h3>The Clinical Problem</h3>
        <p>
          Preparing safe, consistent texture-modified formula is time-intensive, error-prone, and lacks standardization:
        </p>
        <ul>
          <li>Manual mixing by hand or spoon leads to inconsistent ratios and variability between preparations</li>
          <li>Staff burden during busy clinics or NICU rounds reduces time for patient care</li>
          <li>Families struggle to replicate clinical protocols at home, leading to inconsistent swallowing performance</li>
          <li>No standardized measurement tool for IDDSI compliance verification in many settings</li>
        </ul>
        <p style={{ marginTop: '12px' }}>
          Result: Clinical outcomes are harder to predict, assess, and replicate across care settings.
        </p>
      </article>

      <article>
        <h3>What We're Building for Clinicians</h3>
        <p>
          <strong>A clinical-grade formula thickening device</strong> that will:
        </p>
        <ul>
          <li>Consistently dispense formula and thickener in precise ratios (standardized to IDDSI levels)</li>
          <li>Reduce staff preparation time per patient (target: &lt;1 min setup)</li>
          <li>Provide data logging for clinical records and outcomes tracking</li>
          <li>Support multiple texture levels and feeding methods (bottle, cup, spoon feeds)</li>
          <li>Integrate with clinical workflows (NICU rounds, feeding clinics, outpatient therapy)</li>
        </ul>
      </article>

      <article>
        <h3>Clinical Standards & Compliance</h3>
        <p>
          Our device will be designed to comply with:
        </p>
        <ul>
          <li><strong>IDDSI Dysphagia Diet Standards</strong> — Standardized texture/viscosity levels (Levels 0–4)</li>
          <li><strong>FDA regulations</strong> — Class I or II medical device for food preparation</li>
          <li><strong>HACCP principles</strong> — Safe food preparation and sanitation protocols</li>
          <li><strong>Clinical documentation</strong> — Support for EMR/EHR integration (future roadmap)</li>
        </ul>
        <p style={{ marginTop: '12px', fontSize: '0.9rem', color: '#666' }}>
          We're engaging with regulatory consultants and clinical advisors to ensure the product meets all safety and efficacy standards.
        </p>
      </article>

      <article>
        <h3>Research & Validation</h3>
        <p>
          We're actively seeking clinician input to validate:
        </p>
        <ul>
          <li>How the device fits into your current feeding clinic or NICU workflow</li>
          <li>What data you need to track for patient outcomes</li>
          <li>Texture/viscosity accuracy and IDDSI compliance verification methods</li>
          <li>Safety, cleaning, and maintenance requirements</li>
        </ul>
        <p style={{ marginTop: '12px' }}>
          <strong>Interested in participating?</strong> Join our <a href="/data">data collection program</a> and share
          feedback on clinical needs, or <a href="mailto:contact@example.com">contact us directly</a> to discuss potential partnerships.
        </p>
      </article>

      <article>
        <h3>Partnership Opportunities</h3>
        <p>
          We're exploring partnerships with:
        </p>
        <ul>
          <li><strong>Hospital systems & NICUs</strong> — Beta testing, product feedback, potential early adoption</li>
          <li><strong>Pediatric feeding therapy clinics</strong> — Clinical validation and case studies</li>
          <li><strong>Medical institutions</strong> (e.g., Primary Children's) — Clinical advisory board, outcome studies</li>
          <li><strong>Thickener manufacturers</strong> — Co-marketing, bundled offerings, data sharing</li>
          <li><strong>Feeding Matters & professional organizations</strong> — Education, advocacy, clinical guidelines</li>
        </ul>
        <p style={{ marginTop: '12px' }}>
          If your institution is interested in collaboration or early access, <a href="mailto:contact@example.com">let's talk.</a>
        </p>
      </article>

      <article>
        <h3>Timeline for Clinical Device</h3>
        <p>
          The clinical device will launch <strong>after</strong> the consumer home device achieves market traction and regulatory clearance.
          This allows us to:
        </p>
        <ul>
          <li>Prove safety and efficacy in the lower-risk consumer setting first</li>
          <li>Gather real-world performance data</li>
          <li>Engage with clinical advisors to refine the clinical product requirements</li>
          <li>Secure funding/partnerships specifically for clinical-grade certifications</li>
        </ul>
        <p style={{ marginTop: '12px', fontSize: '0.9rem', color: '#666' }}>
          Estimated timeline: 18–24 months post-consumer launch. Exact timing depends on funding and clinical advisory input.
        </p>
      </article>

      <article>
        <h3>Get Started</h3>
        <p>
          Ways to engage:
        </p>
        <ul>
          <li><strong>Feedback survey:</strong> 5-min feedback on your clinical workflow and product needs</li>
          <li><strong>Interview:</strong> 20-min conversation to dive deeper into your specific challenges and ideas</li>
          <li><strong>Advisory board:</strong> Ongoing guidance and collaboration as we develop the clinical device</li>
        </ul>
        <p style={{ marginTop: '12px' }}>
          <a href="/data">Start here</a> or <a href="mailto:contact@example.com">email us directly.</a>
        </p>
      </article>
    </section>
  )
}
