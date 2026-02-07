import React from 'react'

export default function Resources() {
  return (
    <section>
      <h2>Resources</h2>
      <p>Helpful outside sources for families, clinicians, and caregivers working with texture-modified foods.</p>

      <article>
        <h3>IDDSI (International Dysphagia Diet Standardisation Initiative)</h3>
        <p>
          IDDSI develops globally accepted standards for texture-modified foods and liquids to help
          people with swallowing difficulties. Their resources include testing methods, charts, and
          clinical guidance for safe feeding.
        </p>
        <p>
          <a href="https://iddsi.org" target="_blank" rel="noopener noreferrer">Visit IDDSI website</a>
        </p>
        <div className="video responsive-video half-height">
          <iframe
            src="https://www.youtube.com/embed/xHxntTb9Yac?rel=0&modestbranding=1"
            title="IDDSI overview video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            aria-label="IDDSI overview video"
          />
          <p className="watch-link"><a href="https://youtu.be/xHxntTb9Yac" target="_blank" rel="noopener noreferrer">Watch on YouTube</a> — If you don't hear audio in the embed, open the video on YouTube.</p>
        </div>
      </article>

      <article>
        <h3>Gelmix</h3>
        <p>
          Gelmix offers commercial thickener products and recipes for caregivers and food service to
          create consistent textures for safe feeding. Their recipes are commonly used in clinical
          and home settings.
        </p>
        <p>
          <a href="https://gelmix.com" target="_blank" rel="noopener noreferrer">Visit Gelmix website</a>
        </p>
        <div className="video responsive-video half-height">
          <iframe
            src="https://www.youtube.com/embed/iQQrlMg0SjY?rel=0&modestbranding=1"
            title="Gelmix recipe video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            aria-label="Gelmix recipe video"
          />
          <p className="watch-link"><a href="https://youtu.be/iQQrlMg0SjY" target="_blank" rel="noopener noreferrer">Watch on YouTube</a> — If you don't hear audio in the embed, open the video on YouTube.</p>
        </div>
      </article>

      <article>
        <h3>Feeding Matters</h3>
        <p>
          Feeding Matters is a nonprofit that supports families and professionals through education,
          resources, and research on pediatric feeding disorders. Their content helps connect
          caregivers with clinical guidance and community support.
        </p>
        <p>
          <a href="https://feedingmatters.org" target="_blank" rel="noopener noreferrer">Visit Feeding Matters</a>
        </p>
      </article>
    </section>
  )
}
