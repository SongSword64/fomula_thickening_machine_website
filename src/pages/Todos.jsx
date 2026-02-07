import React from 'react'

export default function Todos() {
  return (
    <section>
      <h2>Project TODOs</h2>
      <p>Tracking progress on key initiatives across product development, research, and partnerships.</p>

      <article>
        <h3>Product</h3>
        <ul>
          <li>
            <strong>Getting design estimates</strong>
            <ul>
              <li>
                <strong>Design Partners</strong>
                <ul>
                  <li>$10–$12K for test fixture</li>
                  <li>$35–$45K to get production ready</li>
                </ul>
              </li>
              <li>Rocketship - Provo</li>
              <li>Mannmade - Woodcross</li>
              <li>BYU Industrial Design</li>
            </ul>
          </li>
          <li>Raising funds for design</li>
          <li>General appliance testing</li>
          <li>Infant-specific FDA testing (?)</li>
          <li>Customer version - v1</li>
        </ul>
      </article>

      <article>
        <h3>Research</h3>
        <ul>
          <li>Build data collection for parents/providers to submit feedback on provided recipes</li>
          <li>Make survey to better assess market fit (need and desire)</li>
        </ul>
      </article>

      <article>
        <h3>Partnerships</h3>
        <ul>
          <li>Determine design partner</li>
          <li>Determine medical provider partnership (Primary Children's?)</li>
          <li>Determine thickener partnership?</li>
          <li>Determine "Feeding Matters" partnership?</li>
        </ul>
      </article>
    </section>
  )
}
