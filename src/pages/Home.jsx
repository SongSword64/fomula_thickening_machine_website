import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section>
      <h2>Welcome to Formula Thickening Machine</h2>
      <p style={{ fontSize: '1.1rem', marginBottom: '24px' }}>
        Building a product that solves a problem families face every day: safely and consistently preparing
        thickened infant formula. We're combining engineering, lived experience, and community input to create something real.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '32px' }}>
        
        {/* The Problem */}
        <article style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', background: '#fafafa' }}>
          <h3 style={{ marginTop: 0 }}>The Problem</h3>
          <p style={{ color: '#666', marginBottom: '16px' }}>
            Families with infants who have dysphagia spend hours each day manually mixing thickened formula—
            inconsistently, unsafely, and with no reliable guidance.
          </p>
          <Link to="/problem" style={{ color: '#0366d6', textDecoration: 'none', fontWeight: 500 }}>
            Read the story →
          </Link>
        </article>

        {/* The Solution */}
        <article style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', background: '#fafafa' }}>
          <h3 style={{ marginTop: 0 }}>The Solution</h3>
          <p style={{ color: '#666', marginBottom: '16px' }}>
            A countertop appliance that prepares thickened formula automatically, consistently, and safely—
            giving families back their time and clinicians a reliable tool.
          </p>
          <Link to="/solution" style={{ color: '#0366d6', textDecoration: 'none', fontWeight: 500 }}>
            Explore the design →
          </Link>
        </article>

        {/* Get Involved */}
        <article style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', background: '#fafafa' }}>
          <h3 style={{ marginTop: 0 }}>Get Involved</h3>
          <p style={{ color: '#666', marginBottom: '16px' }}>
            Share your story, feedback, and ideas. Your input shapes the product roadmap and validates
            that we're solving a real problem.
          </p>
          <Link to="/data" style={{ color: '#0366d6', textDecoration: 'none', fontWeight: 500 }}>
            Submit feedback →
          </Link>
        </article>

        {/* For Investors */}
        <article style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', background: '#fafafa' }}>
          <h3 style={{ marginTop: 0 }}>For Investors</h3>
          <p style={{ color: '#666', marginBottom: '16px' }}>
            We're seeking $500K to take this from prototype to market. Clear roadmap, team strategy, and
            significant market opportunity.
          </p>
          <Link to="/funding" style={{ color: '#0366d6', textDecoration: 'none', fontWeight: 500 }}>
            See funding proposal →
          </Link>
        </article>

        {/* For Clinicians */}
        <article style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', background: '#fafafa' }}>
          <h3 style={{ marginTop: 0 }}>For Clinicians</h3>
          <p style={{ color: '#666', marginBottom: '16px' }}>
            A clinical-grade device is coming. We're actively seeking feedback from SLPs, pediatricians,
            and hospital systems on clinical workflows.
          </p>
          <Link to="/clinicians" style={{ color: '#0366d6', textDecoration: 'none', fontWeight: 500 }}>
            Learn more →
          </Link>
        </article>

        {/* Resources */}
        <article style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', background: '#fafafa' }}>
          <h3 style={{ marginTop: 0 }}>Learn More</h3>
          <p style={{ color: '#666', marginBottom: '16px' }}>
            External resources on infant dysphagia, IDDSI standards, and organizations supporting families
            and clinicians.
          </p>
          <Link to="/resources" style={{ color: '#0366d6', textDecoration: 'none', fontWeight: 500 }}>
            Explore resources →
          </Link>
        </article>

      </div>

      <article style={{ marginTop: '40px', padding: '20px', background: '#E8F5E9', borderRadius: '8px', border: '1px solid #4CAF50' }}>
        <h3 style={{ marginTop: 0 }}>Quick Video Introduction</h3>
        <p>
          Here's a short introduction to the project. Feel free to reach out with questions or ideas.
        </p>
        <div className="video-container" style={{ marginTop: '12px' }}>
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
      </article>

      <article style={{ marginTop: '24px', padding: '20px', background: '#F3E5F5', borderRadius: '8px', border: '1px solid #9C27B0' }}>
        <h3 style={{ marginTop: 0 }}>About the Founder</h3>
        <p>
          This project is driven by personal experience and a mission to solve a real problem.
          <a href="/founder" style={{ marginLeft: '4px', color: '#0366d6', textDecoration: 'none' }}>
            Learn more about Bryan →
          </a>
        </p>
      </article>
    </section>
  )
}
