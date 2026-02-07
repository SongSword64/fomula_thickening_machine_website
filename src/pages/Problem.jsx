import React from 'react'

export default function Problem() {
  return (
    <section>
      <h2>The Problem</h2>

      <article>
        <h3>A Personal Story</h3>
        <p>
          My story begins with my son, Z.
        </p>

        <p>
          From day one, feeding was hard. In the hospital, my wife tried to breastfeed but he wouldn’t latch,
          and the advice we got was basically just keep going. At home, bottle-feeding wasn't any better—one
          ounce could take an hour, and we were trapped in a two-hour loop of feeding, cleaning, and starting over.
        </p>

        <p>
          At our first pediatric visit, Z had already lost 10 oz. We were told to keep him awake at all costs
          and do whatever it takes to get him to finish a feed. We felt like we were failing him, yet the
          guidance didn’t match what we were seeing. I started researching everything about the feeding process.
        </p>

        <p>
          One breakthrough was realizing nipple flow rate mattered. We had been using nipples meant for older
          infants, which required far more suction. Switching made a big difference in intake and energy, but
          he still struggled. Eventually, we discovered tongue-tie issues and, later, a diagnosis of dysphagia.
        </p>

        <p>
          Feeding therapy introduced thickening formula to keep him safe, but that process was its own battle:
          sensitive to temperature, timing, agitation, and exact measurements. It took 20+ minutes each time,
          and if you got it wrong, you started over. This daily frustration is what pushed me to build a better
          way—a machine that could consistently deliver the right texture and remove the guesswork for families.
        </p>
      </article>

      <article style={{ marginTop: '24px' }}>
        <h3>The Broader Challenge</h3>
        <p>
          Z's story is not unique. Roughly <strong>1% of neurotypical infants</strong> and <strong>25% of medically complex infants</strong> experience
          dysphagia (swallowing difficulty) requiring thickened formula. For these families and the clinicians
          supporting them, the current process is frustrating and unsafe:
        </p>
        <ul>
          <li><strong>Manual mixing</strong> — Parents hand-mix thickening agents with formula, leading to inconsistency</li>
          <li><strong>Time burden</strong> — Every bottle takes 15–30 minutes to prepare when done correctly</li>
          <li><strong>Safety concerns</strong> — Inconsistent texture defeats the clinical purpose; incorrect ratios can harm swallowing</li>
          <li><strong>Lack of guidance</strong> — Recipe books exist, but family-friendly, easy-to-follow preparation is rare</li>
          <li><strong>Clinical inefficiency</strong> — Hospital and therapy clinics waste staff time on manual preparation</li>
        </ul>
      </article>

      <article style={{ marginTop: '24px' }}>
        <h3>Why This Matters</h3>
        <p>
          For parents like me, thickening formula is a daily battle—not a choice, but a medical necessity.
          For clinicians, it's a workflow burden that takes time away from actual patient care. No appliance
          currently exists to solve this. Thickening agents are sold separately, and pre-thickened formula is
          expensive and limited.
        </p>
        <p style={{ marginTop: '12px' }}>
          <strong>Our mission:</strong> Build a product that gives families back their time, gives clinicians
          a reliable tool, and most importantly, ensures that every child with dysphagia has consistent, safe,
          thickened formula without the guesswork.
        </p>
      </article>

      <article style={{ marginTop: '24px' }}>
        <h3>Meet the Founder</h3>
        <p>
          I'm a full-stack engineer with lived experience in this problem. I'm not building this as a market opportunity—
          I'm building it because I lived it, and I know thousands of other families are too.
          <a href="/founder"> Learn more about me</a> or see the <a href="/">home page</a> for an introduction video.
        </p>
      </article>
    </section>
  )
}
