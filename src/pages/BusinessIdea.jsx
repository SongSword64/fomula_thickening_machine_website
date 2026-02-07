import React from 'react'

export default function BusinessIdea() {
  return (
    <section>
      <h2>Business Idea</h2>
      <p>
        The Formula Thickening Machine aims to help parents prepare thickened infant formula safely and consistently.
      </p>

      <h3>Features and Requirements Document: Countertop Infant Formula Thickening Appliance</h3>

      <h4>Overview</h4>
      <p>
        The appliance prepares thickened infant formula for children with dysphagia. It ensures consistency,
        accuracy, and hygiene while automating the preparation process. The system supports thickening agents
        (e.g., Gelmix), formula powder, and water to deliver a ready-to-feed, IDDSI-compliant formula.
      </p>
      <p>
        Found patent for a beverage thickening machine at <a href="https://patents.google.com/patent/US8623323B2/en" target="_blank" rel="noopener noreferrer">US8623323B2</a>, which is now expired.
      </p>

      <h4>Core Features</h4>
      <ol>
        <li>
          <strong>Inputs &amp; Reservoirs</strong>
          <ul>
            <li><strong>Water Reservoir</strong>: Dishwasher-safe container for distilled/filtered water.</li>
            <li><strong>Thickening Agent Reservoir</strong>: Gelmix (or future compatible agents).</li>
            <li><strong>Formula Reservoir</strong>: Dishwasher-safe container for powdered infant formula.</li>
            <li>All reservoirs must be removable and dishwasher-safe.</li>
          </ul>
        </li>

        <li>
          <strong>Mixing Chamber</strong>
          <ul>
            <li>Combines water, formula powder, and thickener.</li>
            <li>Must support precise mixing to ensure consistency and minimize residue buildup.</li>
            <li>Dishwasher-safe design where possible.</li>
          </ul>
        </li>

        <li>
          <strong>Dispensing System</strong>
          <ul>
            <li>Outputs ready-to-feed formula at user-selected IDDSI flow rate.</li>
            <li>Supports target flow rates: <strong>0.1–0.9 mL/s in 0.05 mL/s increments</strong>.</li>
            <li>Accuracy: <strong>±0.02 mL/s</strong>.</li>
          </ul>
        </li>

        <li>
          <strong>User Interface (UI)</strong>
          <ul>
            <li>Digital touch display or dial controls.</li>
            <li>Allow caregivers to select desired flow rate, portion size, and serving temperature.</li>
            <li>Simple visual indicators for timing, cleaning, refilling, and errors.</li>
          </ul>
        </li>

        <li>
          <strong>Safety &amp; Hygiene</strong>
          <ul>
            <li>Flow components should be easy to remove and clean (reservoirs, mixing area, dispenser).</li>
            <li>Sensors for low water, low formula, and low thickening agent.</li>
            <li>Locking mechanism to prevent accidental dispensing.</li>
          </ul>
        </li>

        <li>
          <strong>Connectivity (Future)</strong>
          <ul>
            <li>Bluetooth or Wi‑Fi for caregiver monitoring and app integration.</li>
            <li>Feed history tracking and remote notifications.</li>
          </ul>
        </li>
      </ol>

      <h4>Functional Requirements</h4>
      <ul>
        <li><strong>Reservoir Accuracy</strong>
          <ul>
            <li>Water: dispense within ±2 mL.</li>
            <li>Formula powder: dispense with ±5% variance.</li>
            <li>Thickener: dispense within ±0.02 g.</li>
          </ul>
        </li>
        <li><strong>Mixing Chamber</strong>
          <ul>
            <li>Preparation cycle: 30–90 seconds.</li>
            <li>Must prevent clumping of powder or thickener.</li>
          </ul>
        </li>
        <li><strong>Flow Rate Control</strong>
          <ul>
            <li>Pump/valve system to achieve target flow rates and pass IDDSI syringe testing.</li>
            <li>On-device re-calibration for flow rates.</li>
          </ul>
        </li>
        <li><strong>Safety Standards</strong>
          <ul>
            <li>Comply with FDA, CE, and relevant infant food safety standards.</li>
            <li>BPA-free, medical-grade materials.</li>
          </ul>
        </li>
      </ul>

      <h4>Non-Functional Requirements</h4>
      <ul>
        <li>Ease of Cleaning: Dishwasher-safe removable parts.</li>
        <li>Reliability: 5+ year lifespan under daily use.</li>
        <li>Noise Level: &lt;50 dB during operation.</li>
        <li>Power: Support 120V/60Hz and 220V/50Hz.</li>
        <li>Size: Countertop footprint &lt;14" wide.</li>
        <li>Business Model: Monthly rental (~$75/month) to reduce upfront cost barriers, enable device rotation for upgrades, and support FSA/HSA payment structures.</li>
      </ul>

      <h4>Next Steps</h4>
      <ol>
        <li>Prototype reservoir design with modular inserts.</li>
        <li>Test flow rate precision with IDDSI syringes.</li>
        <li>Validate mixing consistency with varying formula brands (see <a href="https://www.healthierthickening.com/thickening-breast-milk-formula-for-dysphagia/" target="_blank" rel="noopener noreferrer">Gelmix recipes</a>).</li>
        <li>Confirm safety compliance with regulatory standards.</li>
      </ol>

      <figure className="diagram" aria-hidden="true">
        <svg viewBox="0 0 1200 900" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mechanical layout front and side view">
          <defs>
            <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4FC3F7" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#0288D1" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="thickGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFB74D" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#F57C00" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="formulaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#AED581" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#689F38" stopOpacity="0.9" />
            </linearGradient>
            <pattern id="dishwasherPattern" patternUnits="userSpaceOnUse" width="10" height="10">
              <path d="M 0 5 L 5 0 M 5 10 L 10 5" stroke="#FF6B6B" strokeWidth="1" fill="none"/>
            </pattern>
          </defs>

          <rect x="50" y="100" width="600" height="700" rx="15" fill="#263238" stroke="#000" strokeWidth="3"/>
          
          <text x="600" y="40" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="bold" fill="#263238" textAnchor="middle">MECHANICAL LAYOUT - FRONT VIEW</text>
          <text x="600" y="70" fontFamily="Arial, sans-serif" fontSize="16" fill="#666" textAnchor="middle">Countertop Thickened Formula Appliance (Approx. 14&quot;W × 16&quot;H × 11&quot;D)</text>

          <rect x="70" y="120" width="560" height="80" rx="8" fill="#37474F" stroke="#000" strokeWidth="2"/>
          <rect x="90" y="135" width="200" height="50" rx="5" fill="#1E88E5" stroke="#0D47A1" strokeWidth="2"/>
          <text x="190" y="165" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="#fff" textAnchor="middle">Touch Display</text>
          
          <circle cx="340" cy="160" r="8" fill="#4CAF50" stroke="#2E7D32" strokeWidth="2"/>
          <text x="365" y="165" fontFamily="Arial, sans-serif" fontSize="12" fill="#fff">Ready</text>
          <circle cx="430" cy="160" r="8" fill="#FFC107" stroke="#F57F00" strokeWidth="2"/>
          <text x="455" y="165" fontFamily="Arial, sans-serif" fontSize="12" fill="#fff">Mixing</text>
          <circle cx="530" cy="160" r="8" fill="#F44336" stroke="#C62828" strokeWidth="2"/>
          <text x="555" y="165" fontFamily="Arial, sans-serif" fontSize="12" fill="#fff">Alert</text>

          <rect x="80" y="230" width="140" height="280" rx="8" fill="url(#waterGrad)" stroke="#0277BD" strokeWidth="3"/>
          <text x="150" y="250" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="#fff" textAnchor="middle">WATER</text>
          <text x="150" y="270" fontFamily="Arial, sans-serif" fontSize="12" fill="#fff" textAnchor="middle">~2L</text>
          
          <line x1="90" y1="320" x2="210" y2="320" stroke="#fff" strokeWidth="1" strokeDasharray="5,5" opacity="0.6"/>
          <line x1="90" y1="390" x2="210" y2="390" stroke="#fff" strokeWidth="1" strokeDasharray="5,5" opacity="0.6"/>
          <line x1="90" y1="460" x2="210" y2="460" stroke="#fff" strokeWidth="1" strokeDasharray="5,5" opacity="0.6"/>
          <text x="95" y="318" fontFamily="Arial, sans-serif" fontSize="10" fill="#fff">Max</text>
          <text x="95" y="388" fontFamily="Arial, sans-serif" fontSize="10" fill="#fff">Mid</text>
          <text x="95" y="458" fontFamily="Arial, sans-serif" fontSize="10" fill="#fff">Min</text>
          
          <rect x="205" y="300" width="10" height="180" fill="#1E88E5" opacity="0.7"/>
          <text x="220" y="395" fontFamily="Arial, sans-serif" fontSize="9" fill="#fff">Level</text>

          <rect x="250" y="230" width="140" height="240" rx="8" fill="url(#formulaGrad)" stroke="#558B2F" strokeWidth="3"/>
          <text x="320" y="255" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="#fff" textAnchor="middle">FORMULA</text>
          <text x="320" y="275" fontFamily="Arial, sans-serif" fontSize="12" fill="#fff" textAnchor="middle">~500g</text>
          
          <line x1="260" y1="330" x2="380" y2="330" stroke="#fff" strokeWidth="1" strokeDasharray="5,5" opacity="0.6"/>
          <line x1="260" y1="420" x2="380" y2="420" stroke="#fff" strokeWidth="1" strokeDasharray="5,5" opacity="0.6"/>
          <text x="265" y="328" fontFamily="Arial, sans-serif" fontSize="10" fill="#fff">Full</text>
          <text x="265" y="418" fontFamily="Arial, sans-serif" fontSize="10" fill="#fff">Low</text>
          
          <circle cx="320" cy="450" r="20" fill="#33691E" stroke="#000" strokeWidth="2"/>
          <path d="M 320 435 L 320 465 M 310 445 L 330 445 M 310 455 L 330 455" stroke="#fff" strokeWidth="2"/>
          <text x="325" y="485" fontFamily="Arial, sans-serif" fontSize="9" fill="#fff" textAnchor="middle">Auger</text>

          <rect x="420" y="230" width="140" height="280" rx="8" fill="url(#thickGrad)" stroke="#E65100" strokeWidth="3"/>
          <text x="490" y="250" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="#fff" textAnchor="middle">THICKENER</text>
          <text x="490" y="270" fontFamily="Arial, sans-serif" fontSize="12" fill="#fff" textAnchor="middle">Gelmix</text>
          
          <line x1="430" y1="340" x2="550" y2="340" stroke="#fff" strokeWidth="1" strokeDasharray="5,5" opacity="0.6"/>
          <line x1="430" y1="440" x2="550" y2="440" stroke="#fff" strokeWidth="1" strokeDasharray="5,5" opacity="0.6"/>
          <text x="435" y="338" fontFamily="Arial, sans-serif" fontSize="10" fill="#fff">Full</text>
          <text x="435" y="438" fontFamily="Arial, sans-serif" fontSize="10" fill="#fff">Low</text>
          
          <circle cx="490" cy="490" r="20" fill="#BF360C" stroke="#000" strokeWidth="2"/>
          <path d="M 490 475 L 490 505 M 480 485 L 500 485 M 480 495 L 500 495" stroke="#fff" strokeWidth="2"/>
          <text x="495" y="525" fontFamily="Arial, sans-serif" fontSize="9" fill="#fff" textAnchor="middle">Auger</text>

          <rect x="220" y="540" width="260" height="180" rx="10" fill="url(#dishwasherPattern)" stroke="#F44336" strokeWidth="4"/>
          <rect x="225" y="545" width="250" height="170" rx="8" fill="#B0BEC5" opacity="0.8"/>
          <text x="350" y="565" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="#263238" textAnchor="middle">MIXING CHAMBER</text>
          <text x="350" y="585" fontFamily="Arial, sans-serif" fontSize="11" fill="#263238" textAnchor="middle">Dishwasher Safe</text>
          
          <circle cx="350" cy="630" r="35" fill="#78909C" stroke="#37474F" strokeWidth="2"/>
          <line x1="350" y1="595" x2="350" y2="665" stroke="#37474F" strokeWidth="3"/>
          <line x1="320" y1="630" x2="380" y2="630" stroke="#37474F" strokeWidth="3"/>
          <circle cx="350" cy="630" r="8" fill="#263238"/>

          <path d="M 245 695 Q 265 685 285 695 T 325 695 T 365 695 T 405 695 T 445 695 T 465 695" stroke="#FF5722" strokeWidth="3" fill="none"/>
          <text x="350" y="715" fontFamily="Arial, sans-serif" fontSize="10" fill="#263238" textAnchor="middle">Heating Element</text>

          <line x1="150" y1="510" x2="150" y2="560" stroke="#0288D1" strokeWidth="6"/>
          <line x1="150" y1="560" x2="220" y2="590" stroke="#0288D1" strokeWidth="6"/>
          <rect x="135" y="530" width="30" height="25" rx="3" fill="#1E88E5" stroke="#000" strokeWidth="2"/>
          <text x="150" y="548" fontFamily="Arial, sans-serif" fontSize="9" fill="#fff" textAnchor="middle">Pump</text>
          
          <line x1="320" y1="470" x2="320" y2="560" stroke="#689F38" strokeWidth="6"/>
          <line x1="320" y1="560" x2="280" y2="590" stroke="#689F38" strokeWidth="6"/>
          <rect x="305" y="500" width="30" height="25" rx="3" fill="#7CB342" stroke="#000" strokeWidth="2"/>
          <text x="320" y="518" fontFamily="Arial, sans-serif" fontSize="8" fill="#fff" textAnchor="middle">Auger</text>

          <line x1="490" y1="510" x2="490" y2="560" stroke="#F57C00" strokeWidth="6"/>
          <line x1="490" y1="560" x2="480" y2="590" stroke="#F57C00" strokeWidth="6"/>
          <rect x="475" y="530" width="30" height="25" rx="3" fill="#FF9800" stroke="#000" strokeWidth="2"/>
          <text x="490" y="548" fontFamily="Arial, sans-serif" fontSize="8" fill="#fff" textAnchor="middle">Auger</text>

          <line x1="350" y1="720" x2="350" y2="760" stroke="#546E7A" strokeWidth="8"/>
          <rect x="330" y="735" width="40" height="30" rx="5" fill="#90A4AE" stroke="#263238" strokeWidth="2"/>
          <text x="350" y="753" fontFamily="Arial, sans-serif" fontSize="9" fill="#263238" textAnchor="middle">Valve</text>
          
          <path d="M 340 760 L 320 790 L 320 800 L 380 800 L 380 790 L 360 760 Z" fill="#78909C" stroke="#37474F" strokeWidth="2"/>
          <text x="350" y="815" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="bold" fill="#263238" textAnchor="middle">DISPENSE</text>

          <rect x="325" y="760" width="50" height="15" rx="3" fill="#9C27B0" stroke="#4A148C" strokeWidth="2"/>
          <text x="350" y="771" fontFamily="Arial, sans-serif" fontSize="8" fill="#fff" textAnchor="middle">Flow</text>

          <circle cx="410" cy="630" r="12" fill="#7B1FA2" stroke="#4A148C" strokeWidth="2"/>
          <text x="410" y="635" fontFamily="Arial, sans-serif" fontSize="9" fill="#fff" textAnchor="middle">V</text>
          <line x1="422" y1="630" x2="440" y2="630" stroke="#7B1FA2" strokeWidth="1.5"/>
          <text x="478" y="635" fontFamily="Arial, sans-serif" fontSize="9" fill="#7B1FA2">Viscosity</text>

          <circle cx="280" cy="680" r="10" fill="#E91E63" stroke="#880E4F" strokeWidth="2"/>
          <text x="280" y="685" fontFamily="Arial, sans-serif" fontSize="9" fill="#fff" textAnchor="middle">T</text>
          <line x1="270" y1="680" x2="250" y2="680" stroke="#E91E63" strokeWidth="1.5"/>
          <text x="215" y="685" fontFamily="Arial, sans-serif" fontSize="9" fill="#E91E63">Temp</text>

          <text x="875" y="140" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="bold" fill="#263238">SIDE VIEW</text>
          
          <rect x="720" y="160" width="430" height="600" rx="15" fill="#37474F" stroke="#000" strokeWidth="3"/>
          
          <text x="935" y="190" fontFamily="Arial, sans-serif" fontSize="14" fill="#fff" textAnchor="middle">~11&quot; depth</text>

          <rect x="740" y="220" width="80" height="200" fill="#0288D1" opacity="0.6" stroke="#01579B" strokeWidth="2"/>
          <text x="780" y="245" fontFamily="Arial, sans-serif" fontSize="11" fill="#fff" textAnchor="middle">Water</text>

          <rect x="840" y="220" width="80" height="180" fill="#689F38" opacity="0.6" stroke="#558B2F" strokeWidth="2"/>
          <text x="880" y="245" fontFamily="Arial, sans-serif" fontSize="11" fill="#fff" textAnchor="middle">Formula</text>

          <rect x="1040" y="220" width="80" height="200" fill="#F57C00" opacity="0.6" stroke="#E65100" strokeWidth="2"/>
          <text x="1080" y="245" fontFamily="Arial, sans-serif" fontSize="11" fill="#fff" textAnchor="middle">Thick</text>

          <rect x="740" y="440" width="180" height="100" fill="#1E88E5" opacity="0.7" stroke="#0D47A1" strokeWidth="2"/>
          <text x="830" y="465" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="bold" fill="#fff" textAnchor="middle">ELECTRONICS</text>
          <text x="830" y="485" fontFamily="Arial, sans-serif" fontSize="10" fill="#fff" textAnchor="middle">• MCU</text>
          <text x="830" y="502" fontFamily="Arial, sans-serif" fontSize="10" fill="#fff" textAnchor="middle">• Power Supply</text>
          <text x="830" y="519" fontFamily="Arial, sans-serif" fontSize="10" fill="#fff" textAnchor="middle">• WiFi Module</text>
          <text x="830" y="536" fontFamily="Arial, sans-serif" fontSize="10" fill="#fff" textAnchor="middle">• Motor Drivers</text>

          <rect x="960" y="350" width="120" height="120" fill="#B0BEC5" stroke="#263238" strokeWidth="2"/>
          <text x="1020" y="375" fontFamily="Arial, sans-serif" fontSize="11" fill="#263238" textAnchor="middle">Mixing</text>
          <text x="1020" y="390" fontFamily="Arial, sans-serif" fontSize="11" fill="#263238" textAnchor="middle">Chamber</text>
          <circle cx="1020" cy="425" r="25" fill="#78909C" opacity="0.6"/>

          <line x1="740" y1="560" x2="710" y2="560" stroke="#000" strokeWidth="6"/>
          <circle cx="710" cy="560" r="8" fill="#263238" stroke="#000" strokeWidth="2"/>
          <text x="780" y="590" fontFamily="Arial, sans-serif" fontSize="10" fill="#fff">Power Cord</text>

          <rect x="940" y="550" width="180" height="30" fill="#546E7A" stroke="#263238" strokeWidth="2"/>
          <text x="1030" y="570" fontFamily="Arial, sans-serif" fontSize="10" fill="#fff" textAnchor="middle">Drain/Clean Port</text>

          <rect x="730" y="180" width="410" height="15" fill="#263238"/>
          <line x1="750" y1="182" x2="750" y2="193" stroke="#455A64" strokeWidth="2"/>
          <line x1="780" y1="182" x2="780" y2="193" stroke="#455A64" strokeWidth="2"/>
          <line x1="810" y1="182" x2="810" y2="193" stroke="#455A64" strokeWidth="2"/>
          <line x1="840" y1="182" x2="840" y2="193" stroke="#455A64" strokeWidth="2"/>
          <line x1="870" y1="182" x2="870" y2="193" stroke="#455A64" strokeWidth="2"/>
          <line x1="900" y1="182" x2="900" y2="193" stroke="#455A64" strokeWidth="2"/>
          <text x="935" y="210" fontFamily="Arial, sans-serif" fontSize="9" fill="#fff">Ventilation Slots</text>

          <ellipse cx="760" cy="750" rx="30" ry="8" fill="#000" opacity="0.5"/>
          <ellipse cx="1110" cy="750" rx="30" ry="8" fill="#000" opacity="0.5"/>
          <text x="935" y="785" fontFamily="Arial, sans-serif" fontSize="10" fill="#fff" textAnchor="middle">Anti-slip feet</text>

          <rect x="50" y="820" width="600" height="60" rx="5" fill="#ECEFF1" stroke="#263238" strokeWidth="2"/>
          <text x="60" y="840" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="bold" fill="#263238">KEY FEATURES:</text>
          <text x="60" y="858" fontFamily="Arial, sans-serif" fontSize="10" fill="#263238">• Three-reservoir system: Water, Formula, Thickener • Removable dishwasher-safe mixing chamber</text>
          <text x="60" y="873" fontFamily="Arial, sans-serif" fontSize="10" fill="#263238">• Inline sensors for real-time validation • Countertop footprint (~14&quot;W × 16&quot;H × 11&quot;D)</text>
        </svg>
        <figcaption style={{marginTop:8,fontSize:12,color:'#555'}}>Mechanical layout (front and side views) — approximate dimensions and key components.</figcaption>
      </figure>
    </section>
  )
}
