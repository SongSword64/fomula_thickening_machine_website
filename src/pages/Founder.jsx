import React from 'react'

export default function Founder() {
  return (
    <section>
      <h2>About the Founder</h2>
      <p>
        Formula Thickening Machine was born from lived experience—and the determination to solve a problem
        that shouldn't exist in the first place.
      </p>

      <article>
        <h3>Bryan Dowdy</h3>
        <div style={{ display: 'flex', gap: '24px', marginTop: '16px', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <p>
              Bryan is a full-stack engineer with a deep commitment to solving real-world problems through technology.
              His background spans software development, systems design, and product building—skills he's now channeling
              into making infant feeding safer and more accessible.
            </p>
            <p style={{ marginTop: '12px' }}>
              Beyond his day job, Bryan is a parent navigating the complexities of feeding a child with dysphagia.
              He watched firsthand how much time, effort, and anxiety go into preparing thickened formula—the manual mixing,
              the inconsistency, the lack of reliable guidance. That experience became the spark for this project.
            </p>
            <p style={{ marginTop: '12px' }}>
              <strong>Why this matters:</strong> "I'm not building this for a market. I'm building this because I lived it,
              and I know thousands of other families are too. If this product can give even one parent back an hour a day
              and one less thing to worry about, it's worth doing."
            </p>
          </div>
        </div>
      </article>

      <article>
        <h3>Background & Expertise</h3>
        <ul>
          <li><strong>Software Engineering:</strong> Full-stack development, systems design, data pipeline architecture</li>
          <li><strong>Product Building:</strong> Technical infrastructure, data collection tools, user-facing applications</li>
          <li><strong>Lived Experience:</strong> Parent of a child with feeding dysphagia; direct knowledge of the problem space</li>
          <li><strong>Motivation:</strong> Personal mission to reduce burden on families dealing with feeding challenges</li>
        </ul>
      </article>

      <article>
        <h3>What Drives This Project</h3>
        <p>
          Bryan believes that technology should serve the people who need it most. Rather than chasing a trendy market,
          he's focused on solving a specific, underserved problem—one that affects real families every single day.
        </p>
        <p style={{ marginTop: '12px' }}>
          His approach is methodical: validate the problem deeply, listen to families and clinicians, and build iteratively
          with feedback from the people who'll actually use the product. This isn't about rushing to market—it's about
          getting it right.
        </p>
      </article>

      <article>
        <h3>Get In Touch</h3>
        <p>
          Interested in connecting? Whether you're an investor, clinician, potential partner, or a parent who wants to share
          your story, <a href="mailto:contact@example.com">reach out.</a>
        </p>
        <p style={{ marginTop: '12px' }}>
          <a href="https://www.linkedin.com/in/bryan-dowdy-65344954/" target="_blank" rel="noopener noreferrer">
            Connect on LinkedIn
          </a>
        </p>
      </article>
    </section>
  )
}
