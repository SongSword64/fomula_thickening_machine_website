import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Problem from './pages/Problem'
import Solution from './pages/Solution'
import DataCollection from './pages/DataCollection'
import FormulaTuning from './pages/FormulaTuning'
import Resources from './pages/Resources'
import Todos from './pages/Todos'
import Funding from './pages/Funding'
import Clinicians from './pages/Clinicians'
import Founder from './pages/Founder'

export default function App() {
  return (
    <div className="app-container">
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/problem" element={<Problem />} />
          <Route path="/solution" element={<Solution />} />
          <Route path="/data" element={<DataCollection />} />
          <Route path="/recipes" element={<FormulaTuning />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/clinicians" element={<Clinicians />} />
          <Route path="/funding" element={<Funding />} />
          <Route path="/founder" element={<Founder />} />
          <Route path="/todos" element={<Todos />} />
          {/* Legacy routes for backward compatibility */}
          <Route path="/who" element={<Problem />} />
          <Route path="/idea" element={<Solution />} />
          <Route path="/executive" element={<Solution />} />
          <Route path="/story" element={<Problem />} />
          <Route path="/tuning" element={<FormulaTuning />} />
        </Routes>
      </main>
    </div>
  )
}
