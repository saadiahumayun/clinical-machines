const PAPERS = [
  {
    status: 'Under review',
    journal: 'Engineering Applications of Artificial Intelligence',
    accent: '#00A882',
    title: 'KGEN: A Knowledge-Guided Evolutionary Framework for Feature Selection in Breast Cancer Risk Assessment',
    authors: 'Humayun S, Mahmood T, Moosajee M, Shamsi U',
    linkLabel: 'Preprint →',
    link: '#',
  },
  {
    status: 'Under review',
    journal: 'PeerJ Computer Science',
    accent: '#4361EE',
    title: 'SAGE: A Smart Adaptive Genetic Engine for Knowledge-Guided Feature Selection in Tabular Clinical Data',
    authors: 'Humayun S, Mahmood T',
    linkLabel: 'Live demo →',
    link: 'https://sage-pi-one.vercel.app',
  },
  {
    status: 'In preparation',
    journal: 'International Journal of Medical Informatics',
    accent: '#F4A500',
    title: 'PICTOR: Reframing Pediatric ICU Mortality Prediction Around PRISM-3 Miscalibration at Aga Khan University',
    authors: 'Humayun S, Mahmood T',
    linkLabel: 'Coming soon',
    link: '#',
  },
]

export default function Research() {
  return (
    <section id="research" style={{ background: '#fff' }}>
      <div className="section-wrap">
        <div className="reveal">
          <span className="section-label">Publications</span>
          <h2 className="section-title">Peer-reviewed research</h2>
          <p className="section-sub">
            Our products are grounded in published, peer-reviewed methodology —
            not demo datasets or proprietary benchmarks.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {PAPERS.map((p, i) => (
            <div
              key={i}
              className="reveal"
              style={{
                transitionDelay: `${i * 80}ms`,
                background: '#fff',
                border: '1.5px solid #E2E8F0',
                borderRadius: 14,
                padding: '26px 30px',
                display: 'flex', alignItems: 'flex-start',
                justifyContent: 'space-between', gap: 24,
                flexWrap: 'wrap',
                transition: 'border-color 0.2s, box-shadow 0.2s, opacity 0.65s ease, transform 0.65s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = p.accent
                e.currentTarget.style.boxShadow = `0 4px 16px ${p.accent}12`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E2E8F0'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8,
                }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11, color: p.accent,
                    letterSpacing: '0.05em',
                  }}>
                    {p.status}
                  </span>
                  <span style={{ color: '#E2E8F0' }}>·</span>
                  <span style={{ fontSize: 12, color: '#8FA3B1' }}>{p.journal}</span>
                </div>
                <h4 style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 16, fontWeight: 600,
                  color: '#0D1520', marginBottom: 6, lineHeight: 1.45,
                }}>
                  {p.title}
                </h4>
                <p style={{ fontSize: 13, color: '#8FA3B1' }}>{p.authors}</p>
              </div>
              <a
                href={p.link}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 13, fontWeight: 600,
                  color: p.accent, textDecoration: 'none',
                  whiteSpace: 'nowrap', alignSelf: 'center',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => (e.target.style.opacity = '0.7')}
                onMouseLeave={(e) => (e.target.style.opacity = '1')}
              >
                {p.linkLabel}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
