# Initial Patent Landscape: Thickened Infant Formula Appliance (Basic Pass)

Date: 2025-12-18
Prepared for: Formula Thickening Machine project
Scope: Consumer/clinical devices that prepare thickened beverages (including infant formula) for dysphagia management; automated dispensing, viscosity/flow-rate control, and food-contact safety.

## Summary (First Look)
- The space includes patents on: (1) thickened beverage compositions and methods; (2) automated dispensing systems capable of adding thickener via metering pumps and inline mixers; (3) clinical workflows aligning diagnostic viscosity and therapeutic viscosity.
- One key prior patent (now expired – anticipated expiration 2024-01-31 per Google Patents): US8623323B2 (SimplyThick LLC) — "Thickened beverages for dysphagia." This covers dispensing systems using metering pumps and in-line/static mixers to deliver thickened beverages homogeneously at point-of-service.
- Adjacent IP exists on beverage dispensers, metering pumps, inline mixing, rheology/viscosity control, and clinical dysphagia diets; many are unrelated to infant formula specifically but may be relevant to components/subsystems.

## Key Reference (Fetched)
- US8623323B2 — Thickened beverages for dysphagia
  - Inventor: John L. Holahan; Current Assignee: SimplyThick LLC
  - Status: Granted 2014-01-07; Google Patents shows "Status Expired - Lifetime" with anticipated expiration 2024-01-31; maintenance events recorded through 2025 reminder
  - Core ideas noted in claims/description:
    - Dispensing machine capable of thickened or non‑thickened beverages
    - Aqueous thickener concentrate (e.g., xanthan gum) metered into fresh water via progressive cavity pump or similar
    - Inline static mixer or mixing at nozzle to achieve homogeneous thickened beverage ready-to-consume
    - Homogeneity and non‑time‑dependent thickening emphasized (no continued thickening after dispense)
  - Relevance:
    - Overlaps with automated thickening at point of dispense; less specific to infant formula, more general to beverages
    - Expired status reduces freedom-to-operate risk but family/related applications and later citations should be reviewed

## Categories To Map (for subsequent passes)
- Automated beverage thickening/dispensing systems
  - Metering pumps, inline static mixers, nozzle mixing and agitation
  - Flow rate/viscosity control systems and feedback sensors
- Infant formula preparation appliances
  - Powder dosing, water temperature control, sanitation/dishwasher-safe parts
  - IDDSI compliance workflows and flow testing
- Clinical dysphagia devices and methods
  - Standardized dysphagia diet preparation; viscosity/rheology standards; diagnostic-to-therapeutic linkage
- Consumables and concentrates
  - Thickener concentrates; food-grade soluble fiber thickeners (xanthan gum, galactomannans, CMC, etc.)

## Suggested Search Strategy (Google Patents)
- Keyword blocks (combine as needed):
  - "dysphagia" + "thickened beverage" + "dispensing" + "metering pump"
  - "inline mixer" + "beverage" + "xanthan" + "concentrate"
  - "infant formula" + "appliance" + "powder dosing" + "thickener"
  - "IDDSI" + "viscosity" + "flow rate" + "syringe test"
  - "automated" + "beverage" + "viscosity control" + "sensor"
- IPC/CPC classes (starting points):
  - A23L (Foods, foodstuffs) — preparation/preservation; infant nutrition
  - A47J (Kitchen equipment) — beverage preparation apparatus
  - G01N (Measurement/testing) — viscosity/rheology
  - B67D (Dispensing) — liquid dispensing apparatus
- Query examples (Google Patents):
  - title:(dysphagia) AND (beverage OR drink) AND (thicken* OR viscosity)
  - (infant AND formula) AND (appliance OR dispenser) AND (thicken* OR viscosity)
  - (xanthan OR guar OR "soluble fiber") AND (concentrate) AND (dispenser OR pump)

## Adjacent Art (from citations/cited-by lists)
- Beverage dispensing systems (PepsiCo, beverage formulators): automated formulation devices
- Clinical dysphagia diet prescription and measurement devices (Cheryl L. Evans, Kent Precision Foods Group) — tools for prescribing/measuring flow rates and diet consistency
- Thickener compositions/concentrates (SimplyThick LLC; CP Kelco processes; Nestlé/Danone dysphagia thickeners)

## Early Freedom-to-Operate Notes (Non‑Legal, Indicative Only)
- Point-of-dispense thickening via metering pump + inline static mixer appears in US8623323B2; with expiry, direct claim coverage is reduced, but watch for surviving family members in non‑US jurisdictions.
- Distinctive value in your concept is infant‑formula‑specific preparation, powder dosing + thickener + IDDSI workflow + home appliance sanitation; ensure any viscosity‑verification sensor or feedback control is reviewed against G01N/automated control patents.
- Use of clarified xanthan gum concentrates, progressive cavity pump metering, and nozzle mixing should be checked for later or overlapping claims post‑2014 in cited‑by records.

## Gaps & Next Actions
1. Expand query coverage to collect a list of 15–30 candidate patents (US/EU/JP) in the four categories above.
2. Extract bibliographic data (title, assignee, status, earliest priority) and short technical summaries; flag potential blocking claims.
3. Map claims against your subsystem architecture (reservoirs, dosing, mixing chamber, dispense nozzle, sensors, UI) to identify differentiation.
4. Validate expired vs active status and family coverage (Espacenet/Global Dossier).
5. Optional: Commission a professional patent search (2–5K) and preliminary FTO opinion focusing on U.S. market.

## References
- US8623323B2 — Thickened beverages for dysphagia (Google Patents)
  - Inventor: John L. Holahan; Assignee: SimplyThick LLC
  - Status: Expired – Lifetime (anticipated expiration 2024-01-31; confirm with counsel)
  - External links: USPTO, Espacenet, PatentCenter

## New Candidates (Fetched)
- US9754437B2 — Automated beverage formulation (PepsiCo)
  - Status: Active; estimated expiry ~2030-05-25
  - Core gist: Multi-ingredient dispenser with user-adjustable sweetener; apparatus auto-adjusts CO₂ and acids; sensors (e.g., temperature, viscosity, flow, pressure); adjustable orifices; recipe control
  - Relevance: Metering, feedback control, auto-compensation algorithms in beverage dispensing; potential overlap with sensor-driven viscosity control and dynamic mixing in your system
  - Link: https://patents.google.com/patent/US9754437B2/en

- US11266574B2 — Blenderized diet and/or bolus delivery manual pump (Avent/Avanos)
  - Status: Active; estimated expiry ~2038-12-04
  - Core gist: Manual enteral pump with reservoir (100–500 mL); plunger driven by compressed air (manual bulb or cartridge), metering screw variant, ratcheting plunger; ENFit (ISO 80369-3) compatibility
  - Relevance: Reservoir, pumping mechanics, connectors; adjacent to clinical interfaces and safety; informs design constraints for any enteral-compatible accessory
  - Link: https://patents.google.com/patent/US11266574B2/en

- WO2020120224A1 — Liquid concentrates for dysphagia (Nestlé)
  - Status: Published PCT with national entries
  - Core gist: Liquid thickener concentrates (beta-glucan, plant gums) targeting shear viscosity >200 mPa·s (50 s⁻¹) and CaBER relaxation >10 ms; metering pump + static inline mixer + nozzle; dosing tied to dysphagia severity
  - Relevance: Composition + system dispensing for dysphagia; maps to your concentrate metering and mixer choices; rheology targets relevant to IDDSI
  - Link: https://patents.google.com/patent/WO2020120224A1/en

- CA2459924C — Process for preparing concentrate thickener compositions (SimplyThick LLC)
  - Status: Expired – Lifetime (2012 grant; lifetime indicates 2022-08-02)
  - Core gist: Fully hydrated xanthan gum aqueous concentrates for improved stability and mixing consistency vs powders; packaging and metering processes
  - Relevance: Supports concentrate approach; reduces FTO risk due to expiry but review families/citations
  - Link: https://patents.google.com/patent/CA2459924C/en

- US11751594B2 — Food thickener composition and method (Grain Processing Corp)
  - Status: Active; estimated expiry ~2042-01-19
  - Core gist: Liquid thickener with gum (e.g., xanthan) plus hydration inhibitors (maltodextrin + calcium chloride) to keep concentrate pourable yet thicken upon dilution; synergy claims
  - Relevance: Consumable formulation constraints if using pourable concentrates; check inhibitors and ratios to avoid overlap; informs materials selection
  - Link: https://patents.google.com/patent/US11751594B2/en

## Bibliography & Summaries (v1)

### US9754437B2 — Automated beverage formulation
- Assignee: PepsiCo Inc; Inventors: Indrani Deo, Steven Jersey
- Filing: 2010-02-09; Status: Active; adjusted expiration ~2030-05-25
- Scope highlights: User input modifies sweetener; system automatically adjusts CO₂ and acids; sensors for temperature, viscosity, flow, pressure; adjustable orifices; single-head multi-ingredient nozzle; recipe storage/networking
- Subsystem relevance: `sensors`, `feedback control`, `adjustable orifices`, `multi-stream nozzle`
- Link: https://patents.google.com/patent/US9754437B2/en

### US11266574B2 — Blenderized diet and/or bolus delivery manual pump
- Assignee: Avent Inc; Inventor: Donald McMichael
- Filing: 2018-08-27; Status: Active; adjusted expiration ~2038-12-04
- Scope highlights: Manual air pump or pump bulb generates compressed air to move plunger; reservoir 100–500 mL; ENFit-compatible tip (ISO 80369-3); variants with metering screw and ratcheting plunger; dishwasher-safe plastics
- Subsystem relevance: `reservoir`, `plunger mechanics`, `enteral connectors`, `manual metering`
- Link: https://patents.google.com/patent/US11266574B2/en

### WO2020120224A1 — Liquid concentrates for dysphagia
- Assignees: Société des Produits Nestlé SA; Nestlé SA; Inventors: Adam Burbidge, Michael Jedwab, Jan Engmann
- Publication: 2020-06-18 (PCT/EP2019/083464); Status: Ceased (WO), with national phase entries in EP, AU, JP, CA, BR, CN, US
- Scope highlights: Cohesive liquids via beta‑glucan/gums; target shear viscosity at 50 s⁻¹ (e.g., 250–400 mPa·s); CaBER relaxation >10 ms; system includes metering pump, static inline mixer, nozzle; dosing tied to dysphagia severity
- Subsystem relevance: `metering pump`, `static mixer`, `nozzle`, `rheology targets (IDDSI‑like)`
- Link: https://patents.google.com/patent/WO2020120224A1/en

### CA2459924C — Process for preparing concentrate thickener compositions
- Assignee: SimplyThick LLC; Inventor: John L. Holahan
- Grant: 2009-09-15; Status: Expired – Lifetime (anticipated 2022-08-02); Family includes US7638150B2 (2009-12-29)
- Scope highlights: Fully hydrated xanthan gum concentrates (no viscosity suppressants); rapid dilution thickening; packaging; supports in‑line mixing with metering devices; clinical dysphagia use
- Subsystem relevance: `thickener concentrate`, `metering + inline mixing`, `clinical workflows`
- Link: https://patents.google.com/patent/CA2459924C/en

### US11751594B2 — Food thickener composition and method
- Assignee: Grain Processing Corp; Inventor: Jianteng Xu
- Filing: 2021-10-13; Grant: 2023-09-12; Status: Active; adjusted expiration ~2042-01-19
- Scope highlights: Pourable concentrates of swelling gums (e.g., xanthan) inhibited by salt + oligosaccharide (e.g., calcium chloride + maltodextrin); optional gellan for stability; oligosaccharide:salt ratio ~10:1–200:1; DP1–DP6 fractionation options
- Subsystem relevance: `consumable formulation`, `materials/ratios`, `stability (gellan)`
- Link: https://patents.google.com/patent/US11751594B2/en

Notes:
- Dates, statuses, and expirations reflect Google Patents entries; confirm via USPTO/Espacenet for legal diligence.
- Relevance bullets map to architecture areas to be cross‑checked in claim‑to‑subsystem mapping.

## Claim→Subsystem Mapping (v1)

Legend: reservoirs | dosing/mixing | sensors | control/UI | connectors | consumables | safety/cleanability

### US9754437B2 — Automated beverage formulation (PepsiCo)
- Claim elements (gist): Automatic adjustment of CO₂/acids in response to user sweetener input; sensors (temperature, viscosity, flow, pressure); adjustable orifices; GUI; networked recipes.
- Subsystems:
  - sensors: temperature, viscosity, flow, pressure
  - dosing/mixing: adjustable orifices; dynamic ratio control; multi-stream mixing
  - control/UI: auto‑compensation algorithms; touch UI; network recipe management
  - reservoirs: multi‑ingredient supplies
- Overlap risk: Medium for feedback‑controlled dispensing architecture; Low for CO₂‑specific claims in non‑carbonated thickening context.
- Mitigations: Prefer positive‑displacement pumps over adjustable orifices; use operator‑confirmed adjustments vs full automatic; differentiate on rheology sensing and control targets.

### US11266574B2 — Blenderized diet/bolus manual pump (Avent/Avanos)
- Claim elements (gist): Manual air bulb or compressed gas drives plunger in reservoir; reservoir volumes 100–500 mL; ENFit‑compatible tip; optional metering screw; ratcheting plunger; dishwasher‑safe plastics.
- Subsystems:
  - reservoirs: patient feed reservoir (100–500 mL)
  - dosing/mixing: manual metering screw variant
  - connectors: ENFit (ISO 80369‑3) tip/interface
  - safety/cleanability: materials and disassembly for cleaning
- Overlap risk: Low unless adopting air‑driven plunger mechanics; Moderate if closely copying manual pump architecture.
- Mitigations: Use peristaltic/gear pump for dosing; avoid air‑driven plunger; utilize standard ENFit adapters without replicating proprietary plunger designs.

### WO2020120224A1 — Liquid concentrates for dysphagia (Nestlé)
- Claim elements (gist): Liquids achieving shear viscosity ranges (e.g., 250–400 mPa·s @ 50 s⁻¹) and CaBER relaxation >10 ms; dispensing system with metering pump + static inline mixer + nozzle; dosing stratified by dysphagia severity.
- Subsystems:
  - dosing/mixing: metering pump; static inline mixer; nozzle
  - control/UI: dosing linked to severity levels
  - consumables: concentrate formulations meeting specified rheology windows
- Overlap risk: Moderate on system architecture (pump + static mixer + nozzle) and dosage mapping; variable on compositions by jurisdiction.
- Mitigations: Use dynamic (rotor‑stator) inline mixer; adopt alternative dosage algorithms; ensure formulations avoid claimed ranges/ingredients where active.

### CA2459924C — Concentrate thickener process (SimplyThick) — Expired
- Claim elements (gist): Fully hydrated xanthan concentrates; improved mixing and safety; packaged aqueous concentrate composition.
- Subsystems:
  - consumables: concentrate production and packaging
  - dosing/mixing: compatible with metering/in‑line mixing
- Overlap risk: None (expired); valuable prior art foundation.
- Notes: Use to argue obviousness or scope narrowing where relevant.

### US11751594B2 — Food thickener composition and method (GPC)
- Claim elements (gist): Pourable thickener concentrates using gum plus hydration inhibitors (salt + oligosaccharide), synergy lowering concentrate viscosity while thickening on dilution; defined ratios and methods; optional gellan.
- Subsystems:
  - consumables: inhibitor pairings/ratios; gum selection; stability agents
  - dosing/mixing: pourable concentrate approach and dilution method
- Overlap risk: High if adopting inhibitor‑based pourable concentrate strategy.
- Mitigations: Avoid claimed inhibitor ratios/pairings; use different mechanisms (e.g., shear‑thinning + precise PD pump metering); consider supplier licensing/indemnification.

---
Disclaimer: This is an initial, non‑exhaustive pass for product scoping. Not legal advice. A professional search and counsel are recommended before design freeze or investment in tooling.
