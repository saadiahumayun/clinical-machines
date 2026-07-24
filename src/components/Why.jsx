const PILLARS = [
  {
    icon: '🤝',
    title: 'We work with your data, your clinicians, your setting',
    text: 'Clinical Machines does not build generic AI tools and ship them. We collaborate with hospitals, research centres, and health programmes — you bring the clinical problem and patient data, we build and validate the solution together. Every product we have built came from a real institutional partnership.',
  },
  {
    icon: '🔬',
    title: 'Research-grade rigour, not proof-of-concept AI',
    text: 'Every solution is validated against published clinical benchmarks, submitted for peer review, and documented to ethics board standards. We do not release a model until we can answer: who validated it, on what population, and how does it fail?',
  },
  {
    icon: '🌍',
    title: 'Built for healthcare systems that are under pressure',
    text: 'Our work is grounded in the realities of clinical practice in Pakistan and similar settings — limited specialist coverage, constrained infrastructure, mixed-quality records, and communities that need screening long before they reach a tertiary centre. Solutions designed here tend to work everywhere.',
  },
  {
    icon: '🔓',
    title: 'Transparent by default',
    text: 'Core algorithms are open source. Models are explainable before deployment. Data provenance, preprocessing decisions, and validation results are documented and available to clinical partners. If a clinician or ethics committee asks why the model made a decision, we have an answer.',
  },
]

const HOW_IT_WORKS = [
  { step: '01', title: 'You identify the clinical problem', text: 'A gap in your diagnostic workflow, a risk score that underperforms, a screening programme that cannot scale. You define the outcome.' },
  { step: '02', title: 'You provide access to patient data', text: 'Under your institution\'s ethics approval and data governance framework. We work with your IRB requirements, not around them.' },
  { step: '03', title: 'We build, validate, and document the solution', text: 'AI model development, clinical validation against existing benchmarks, and full documentation for ethics board and regulatory review.' },
  { step: '04', title: 'Joint publication and knowledge transfer', text: 'Co-authorship on peer-reviewed output. Full methodology disclosure. We train your team so the solution lives inside your institution, not just in our codebase.' },
]

export default function Why() {
  return (
    <section id="about" style={{ background: '#F4F7FB' }}>
      <div className="section-wrap">

        {/* Header */}
        <div className="reveal">
          <span className="section-label">How we work</span>
          <h2 className="section-title">We build with you,<br />not for a generic market</h2>
          <p className="section-sub">
            Clinical Machines is a research and development partner for healthcare institutions.
            If you have a clinical problem and patient data, we have the methodology to turn it into
            a validated, peer-reviewed AI solution.
          </p>
        </div>

        {/* Collaboration process */}
        <div className="reveal" style={{
          background: '#fff', border: '1.5px solid #E2E8F0',
          borderRadius: 16, padding: '32px 36px', marginBottom: 20,
        }}>
          <div style={{
            fontFamily: "'JetBrains Mono',monospace", fontSize: 11,
            color: '#00A882', letterSpacing: '0.1em', textTransform: 'uppercase',
            marginBottom: 24,
          }}>
            The collaboration model
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 24,
          }}>
            {HOW_IT_WORKS.map((h, i) => (
              <div key={h.step} className="reveal" style={{ transitionDelay: `${i * 70}ms` }}>
                <div style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: 11, color: '#CBD5E0',
                  marginBottom: 10, letterSpacing: '0.05em',
                }}>
                  {h.step}
                </div>
                <h4 style={{
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontSize: 15, fontWeight: 600,
                  color: '#0D1520', marginBottom: 8, lineHeight: 1.3,
                }}>
                  {h.title}
                </h4>
                <p style={{ fontSize: 13, color: '#4A5568', lineHeight: 1.7, fontWeight: 300 }}>
                  {h.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Principles grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 1, background: '#E2E8F0',
          border: '1.5px solid #E2E8F0',
          borderRadius: 16, overflow: 'hidden',
        }}>
          {PILLARS.map((p, i) => (
            <div
              key={p.title}
              className="reveal"
              style={{
                background: '#fff', padding: '28px 26px',
                transitionDelay: `${i * 70}ms`,
                transition: 'background 0.2s, opacity 0.6s ease, transform 0.6s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#F8FAFB'}
              onMouseLeave={e => e.currentTarget.style.background = '#fff'}
            >
              <span style={{ fontSize: 22, display: 'block', marginBottom: 12 }}>{p.icon}</span>
              <h4 style={{
                fontFamily: "'Space Grotesk',sans-serif",
                fontSize: 15, fontWeight: 600,
                color: '#0D1520', marginBottom: 8, lineHeight: 1.35,
              }}>
                {p.title}
              </h4>
              <p style={{ fontSize: 13, color: '#4A5568', lineHeight: 1.75, fontWeight: 300 }}>
                {p.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
