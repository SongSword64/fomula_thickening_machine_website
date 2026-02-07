import React from 'react'

export default function WhoIAm() {
  return (
    <section>
      <h2>Who I Am</h2>
      <p>Here's a short introduction — feel free to replace the video with your own YouTube link.</p>
      <div className="video-container">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </section>
  )
}
