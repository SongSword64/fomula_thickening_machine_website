import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <nav className="nav">
      <h1 className="brand">Formula Thickening Machine</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/problem">The Problem</Link></li>
        <li><Link to="/solution">The Solution</Link></li>
        <li><Link to="/data">Get Involved</Link></li>
        <li><Link to="/funding">For Investors</Link></li>
        <li><Link to="/clinicians">For Clinicians</Link></li>
        <li><Link to="/resources">Learn More</Link></li>
        <li><Link to="/founder">About</Link></li>
      </ul>
    </nav>
  )
}
