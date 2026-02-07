import React from 'react'

export default function Funding() {
  return (
    <section>
      <h2>Funding & Investor Overview</h2>
      <p>
        We're building a product that solves a real, underserved problem: making infant formula thickening
        safer, faster, and more accessible for families and clinicians.
      </p>

      <article>
        <h3>The Ask</h3>
        <p>
          We're seeking <strong>$500,000 USD</strong> to take this product from concept to first production run.
          This is a realistic estimate based on similar hardware development projects and regulatory requirements.
        </p>
        <table style={{ borderCollapse: 'collapse', marginTop: '12px', marginBottom: '12px', width: '100%' }}>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '8px', fontWeight: 'bold', minWidth: '200px' }}>Design & Prototyping</td>
              <td style={{ padding: '8px' }}>$140,000</td>
              <td style={{ padding: '8px', color: '#666' }}>Mechanical design partner ($50K), electronics/firmware ($30K), alpha prototype builds ($30K), beta unit production—20-50 units via CNC/3D printing ($30K)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '8px', fontWeight: 'bold' }}>Testing & Certifications</td>
              <td style={{ padding: '8px' }}>$180,000</td>
              <td style={{ padding: '8px', color: '#666' }}>FDA regulatory consultant ($40K), safety/performance testing ($50K), IDDSI validation studies ($30K), electrical/EMC certification ($30K), quality system setup ($30K)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '8px', fontWeight: 'bold' }}>Initial Rental Fleet</td>
              <td style={{ padding: '8px' }}>$80,000</td>
              <td style={{ padding: '8px', color: '#666' }}>Low-volume manufacturing for 50-100 rental units via CNC machining and assembly partners ($60K), logistics/fulfillment setup ($20K). <em>Expensive injection mold tooling ($60K+) deferred to Phase 2 after design validation.</em></td>
            </tr>
            <tr>
              <td style={{ padding: '8px', fontWeight: 'bold' }}>Operations & Team</td>
              <td style={{ padding: '8px' }}>$100,000</td>
              <td style={{ padding: '8px', color: '#666' }}>Part-time mechanical engineer (12 mo @ $5K/mo), legal/IP ($15K), early marketing/branding ($10K), logistics & ops ($15K)</td>
            </tr>
          </tbody>
        </table>

        <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '12px', fontStyle: 'italic' }}>
          <strong>Note:</strong> These estimates are informed by industry benchmarks for consumer medical devices. Actual costs may vary ±20% based on design complexity and regulatory pathway.
        </p>

        <h4 style={{ marginTop: '18px' }}>Phased Manufacturing Strategy</h4>
        <p>
          <strong>Phase 1 (Months 0-18):</strong> Low-volume production using CNC machining and 3D printing for initial rental fleet (50-100 units).
          This allows us to gather real-world customer feedback and iterate on the physical design without being locked into expensive tooling.
          Higher per-unit cost (~$800-1200/unit) but critical flexibility for design improvements.
        </p>
        <p style={{ marginTop: '12px' }}>
          <strong>Phase 2 (Months 18-24):</strong> Once design is validated through customer feedback, invest in injection mold tooling ($60-80K)
          for scaled manufacturing. Rental model supports this perfectly—we can rotate Phase 1 machines with improved Phase 2 units,
          continuously improving the customer experience while scaling the fleet.
        </p>
        <p style={{ marginTop: '12px', fontSize: '0.9rem', color: '#0366d6' }}>
          <strong>Why this approach?</strong> Rental model + iterative design = better product. We prioritize customer feedback over premature manufacturing scale,
          reducing risk of expensive tooling changes and ensuring the final product truly meets user needs.
        </p>

        <h4 style={{ marginTop: '18px' }}>Investment Options</h4>
        <p>We're exploring both:</p>
        <ul>
          <li><strong>Institutional investment (angel/seed)</strong> — For investors interested in equity or convertible notes. Typical seed round structure.</li>
          <li><strong>Crowdfunding (Kickstarter/Indiegogo)</strong> — For community validation and pre-orders. Lower dilution, but requires working prototype first.</li>
        </ul>
        <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '12px' }}>
          Most likely path: Seed funding ($300–500K) → prototype → crowdfunding campaign ($200–400K in pre-orders) → manufacturing scale-up.
        </p>
      </article>

      <article>
        <h3>Market Opportunity</h3>
        <p>
          Infant dysphagia (swallowing difficulty) requires formula thickening in:
        </p>
        <ul>
          <li><strong>~1% of neurotypical infants</strong> (reflux, cleft palate, prematurity) — ~40,000 births/year in the U.S.</li>
          <li><strong>~25% of medically complex infants</strong> (cerebral palsy, genetic conditions, developmental delays) — additional ~10,000+ cases/year</li>
        </ul>
        <p style={{ marginTop: '12px' }}>
          <strong>Market sizing (monthly rental model):</strong>
        </p>
        <ul>
          <li><strong>TAM (Total Addressable Market):</strong> ~50,000 U.S. families/year × $75/month × 12 months average use = $45M annual recurring revenue opportunity (U.S. consumer market)</li>
          <li><strong>SAM (Serviceable Addressable Market):</strong> ~20% adoption rate in first 5 years = $9M/year ARR potential</li>
          <li><strong>SOM (Serviceable Obtainable Market):</strong> Conservative 5% market share Year 1 = $450K ARR, scaling to $2.5M+ ARR by Year 3</li>
        </ul>
        <p style={{ marginTop: '12px' }}>
          <strong>Rental model advantages:</strong> Lower barrier to entry for families (no $800+ upfront cost), predictable recurring revenue,
          ability to rotate machines for upgrades/maintenance, reduced manufacturing capital requirements, and compatibility with FSA/HSA monthly payment structures.
        </p>
        <p style={{ marginTop: '12px' }}>
          <strong>Clinical market (Phase 2):</strong> 500+ feeding therapy clinics and 3,000+ NICUs in the U.S. represent an additional $20M+ B2B opportunity.
          Monthly rental or lease-to-own programs ($150–250/month), with potential for bulk institutional pricing.
        </p>
        <p style={{ marginTop: '12px', fontSize: '0.9rem', color: '#666' }}>
          No direct competitors exist for this specific appliance. Adjacent markets (manual thickening agents, pre-thickened formula) validate demand but don't solve the workflow problem.
        </p>
      </article>

      <article>
        <h3>Two-Product Strategy</h3>
        <p>
          <strong>Phase 1: Consumer Home Device (Monthly Rental)</strong> — Faster to market, lower regulatory burden.
          Families rent machines on a month-to-month basis (~$75/month), eliminating upfront cost barriers and enabling
          us to maintain/upgrade units over time. This model reduces manufacturing capital requirements and creates predictable recurring revenue.
        </p>
        <p style={{ marginTop: '12px' }}>
          <strong>Phase 2: Clinical Device (Institutional Rental/Lease)</strong> — For feeding therapy clinics, hospitals, and NICU programs.
          Higher regulatory requirements, but larger monthly contract values ($150–250/month) and long-term institutional relationships.
        </p>
        <p style={{ marginTop: '12px' }}>
          <strong>Benefits of rental model:</strong> Lower barrier to entry for temporary needs (e.g., 6-12 month dysphagia cases),
          reduced business risk from lower manufacturing volume requirements, ability to improve product over time with device rotations,
          and better alignment with FSA/HSA monthly payment structures.
        </p>
      </article>

      <article>
        <h3>Regulatory & Compliance</h3>
        <p>
          <strong>Home Device (FDA):</strong> Likely Class I or II medical device (non-invasive food preparation appliance).
          Minimal burden compared to invasive devices—registration, labeling, good manufacturing practices. No pre-market approval needed
          in most cases.
        </p>
        <p style={{ marginTop: '12px' }}>
          <strong>Clinical Device (FDA + international):</strong> May require clinical evidence, 510(k) submission, or PMA depending on claims.
          CE marking for EU markets. Higher cost but enables healthcare provider and hospital sales channels.
        </p>
        <p style={{ marginTop: '12px' }}>
          <strong>FSA/HSA Eligibility & Insurance Coverage:</strong> We are pursuing approval for FSA/HSA eligible expenses through proper medical device classification
          and documentation of medical necessity for dysphagia treatment. Long-term goal includes working with insurance providers to achieve coverage
          for prescribed use cases, which would significantly reduce out-of-pocket costs for families and expand market accessibility.
        </p>
        <p style={{ marginTop: '12px', color: '#0366d6' }} className="success">
          We're actively researching regulatory pathways and engaging with regulatory consultants to minimize burden and cost while maximizing
          reimbursement eligibility.
        </p>
      </article>

      <article>
        <h3>Milestones & Timeline</h3>
        <p>
          Realistic timeline for a hardware medical device (18–30 months from funding to market):
        </p>
        <ul>
          <li><strong>Months 0–3 (Pre-funding):</strong> Market validation, user interviews, design partner selection, regulatory pathway research</li>
          <li><strong>Months 3–9:</strong> Mechanical design & CAD, electronics/firmware development, alpha prototype builds (3–5 iterations)</li>
          <li><strong>Months 9–15:</strong> Beta prototype testing with 10–20 families, safety/performance testing, IDDSI validation, regulatory submissions (FDA registration, UL/CE cert)</li>
          <li><strong>Months 15–21:</strong> Tooling & manufacturing setup, pilot production run (200–500 units), beta user feedback integration</li>
          <li><strong>Months 21–24:</strong> Final QA/QC, crowdfunding campaign launch (if applicable), first commercial shipments</li>
          <li><strong>Months 24–30:</strong> Scale manufacturing, clinical device development (Phase 2 kickoff)</li>
        </ul>
        <p style={{ marginTop: '12px', fontSize: '0.9rem', color: '#666' }}>
          <strong>Critical path risks:</strong> Regulatory delays (add 3–6 months), tooling iterations (add 2–4 months), supply chain disruptions (add 1–3 months).
          Buffer of 6–12 months recommended for contingency.
        </p>
        <p style={{ marginTop: '12px', fontSize: '0.9rem', color: '#0366d6' }}>
          <strong>We're not rushing.</strong> This is a side project driven by mission, not VC pressure. Timeline flexibility allows us to build thoughtfully and avoid costly mistakes.
        </p>
      </article>

      <article>
        <h3>Team & Founder</h3>
        <p>
          <strong>Solo founder:</strong> Built the technical infrastructure for this site, run data collection systems,
          and have direct lived experience with the problem (personal motivation, not detachment).
        </p>
        <p style={{ marginTop: '12px' }}>
          <strong>Hiring strategy:</strong> Early-stage capital will fund a mechanical engineer, regulatory specialist,
          and business operations lead. Open to co-founder partnerships with the right fit (regulatory, manufacturing, clinical).
        </p>
      </article>

      <article>
        <h3>How to Get Involved</h3>
        <p style={{ background: '#FFF3CD', padding: '12px', borderRadius: '6px', border: '1px solid #FFC107', marginBottom: '16px' }}>
          <strong>📧 Contact info coming soon.</strong> We're setting up dedicated channels for investor inquiries.
          For now, you can reach out via the <a href="/data">feedback form</a> and indicate you're interested in investment discussions.
        </p>
        <p>
          <strong>Investors:</strong> We're seeking partners who understand hardware, healthcare, or consumer products.
          Ideal fit: angel investors with medical device experience or seed funds focused on health tech.
        </p>
        <p style={{ marginTop: '12px' }}>
          <strong>Early supporters:</strong> Participate in our <a href="/data">data collection</a> and feedback program.
          Your input validates market fit and shapes the product roadmap. Early supporters may receive priority access to crowdfunding or beta units.
        </p>
        <p style={{ marginTop: '12px' }}>
          <strong>Advisors/partners:</strong> We're open to conversations with:
        </p>
        <ul>
          <li>Regulatory consultants (FDA/CE medical device experience)</li>
          <li>Manufacturing partners (injection molding, electronics assembly)</li>
          <li>Clinical advisors (SLPs, pediatricians, feeding therapists)</li>
          <li>Distribution/retail partners (baby products, medical supplies)</li>
        </ul>
      </article>
    </section>
  )
}
