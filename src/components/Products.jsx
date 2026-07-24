const PRODUCTS = [
  {
    tag: 'Feature Selection',
    name: 'SAGE',
    tagline: 'Picks the right clinical variables — not just statistically useful ones',
    desc: 'Standard AI models often rely on irrelevant or misleading variables (e.g. patient ID, hospital code). SAGE uses clinical expertise to guide the selection, so the model learns from what actually matters medically.',
    kpis: [
      { val: '98.4%', label: 'Accurate', context: 'at detecting malignancy' },
      { val: '3 variables', label: 'Instead of 30', context: 'without losing accuracy' },
      { val: 'Consistent', label: 'Same features', context: 'every time it runs' },
    ],
    link: 'https://sage-pi-one.vercel.app',
    linkLabel: 'Try the live tool →',
    accent: '#00A882', accentLt: '#E6F7F3', icon: '⚗️',
  },
  {
    tag: 'Cancer Screening',
    name: 'CANDetect',
    tagline: 'Breast cancer screening without a hospital',
    desc: 'In rural Sindh, most women never see a specialist. CANDetect gives community health workers a simple AI-assisted tool to identify women at high risk — on a phone, without internet, in Urdu or Sindhi.',
    kpis: [
      { val: 'No hospital', label: 'Required', context: 'works at community level' },
      { val: 'Offline-first', label: 'Design', context: 'no internet needed' },
      { val: '2 languages', label: 'Urdu + Sindhi', context: 'for local CHWs' },
    ],
    link: '#',
    linkLabel: 'Learn more →',
    accent: '#E63946', accentLt: '#FDEEF0', icon: '🔬',
  },
  {
    tag: 'Mortality Prediction',
    name: 'PICTOR',
    tagline: 'Identifies critically ill children before standard tools do',
    desc: 'The most widely used pediatric ICU scoring system (PRISM-3) is systematically miscalibrated at Aga Khan University — it underestimates mortality risk. PICTOR was built on real patient data to fix that gap.',
    kpis: [
      { val: '1,586', label: 'Patients studied', context: 'real PICU data, AKU' },
      { val: 'PRISM-3', label: 'Outperforms', context: 'across all age groups' },
      { val: 'F1 optimised', label: 'Catches more', context: 'high-risk children' },
    ],
    link: '#research',
    linkLabel: 'Read the paper →',
    accent: '#4361EE', accentLt: '#EEF1FD', icon: '🏥',
  },
]

export default function Products() {
  return (
    <section id="products" style={{ background: '#F4F7FB' }}>
      <div className="section-wrap">
        <div className="reveal">
          <span className="section-label">Our products</span>
          <h2 className="section-title">Three problems.<br/>Three tools.</h2>
          <p className="section-sub">
            Each tool targets a specific clinical AI gap in Pakistan's healthcare system —
            validated on real patient data, designed for real clinical workflows.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', gap: 18 }}>
          {PRODUCTS.map((p, i) => (
            <div
              key={p.name}
              className="reveal"
              style={{
                transitionDelay: `${i * 90}ms`,
                background: '#fff', border: '1.5px solid #E2E8F0',
                borderRadius: 16, padding: '28px 28px 24px',
                display: 'flex', flexDirection: 'column',
                transition: 'border-color 0.22s, box-shadow 0.22s, transform 0.22s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = p.accent
                e.currentTarget.style.boxShadow = `0 8px 28px ${p.accent}18`
                e.currentTarget.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#E2E8F0'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {/* Header */}
              <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom: 16 }}>
                <span style={{
                  fontFamily:"'JetBrains Mono',monospace", fontSize:11, fontWeight:500,
                  color: p.accent, background: p.accentLt,
                  border:`1px solid ${p.accent}33`, borderRadius:100, padding:'4px 12px',
                }}>{p.tag}</span>
                <span style={{ fontSize: 28 }}>{p.icon}</span>
              </div>

              <h3 style={{
                fontFamily:"'Space Grotesk',sans-serif", fontSize:21,
                fontWeight:700, letterSpacing:'-0.02em', color:'#0D1520', marginBottom:6,
              }}>{p.name}</h3>

              <p style={{
                fontSize:13, color: p.accent, fontFamily:"'Space Grotesk',sans-serif",
                fontWeight:600, marginBottom:12,
              }}>{p.tagline}</p>

              <p style={{
                fontSize:14, color:'#4A5568', lineHeight:1.7,
                fontWeight:300, marginBottom:22, flex:1,
              }}>{p.desc}</p>

              {/* KPIs with context */}
              <div style={{
                display:'grid', gridTemplateColumns:'repeat(3,1fr)',
                gap:10, padding:'16px 0', borderTop:'1px solid #EEF2F7',
                marginBottom:20,
              }}>
                {p.kpis.map(k => (
                  <div key={k.label} style={{
                    background: p.accentLt, borderRadius:8, padding:'10px 10px 8px',
                    textAlign:'center',
                  }}>
                    <div style={{
                      fontFamily:"'Space Grotesk',sans-serif", fontSize:15,
                      fontWeight:700, color: p.accent, lineHeight:1.1, marginBottom:3,
                    }}>{k.val}</div>
                    <div style={{ fontSize:11, fontWeight:600, color:'#0D1520' }}>{k.label}</div>
                    <div style={{ fontSize:10, color:'#8FA3B1', marginTop:2 }}>{k.context}</div>
                  </div>
                ))}
              </div>

              <a
                href={p.link}
                style={{
                  fontFamily:"'Space Grotesk',sans-serif", fontSize:14, fontWeight:600,
                  color: p.accent, textDecoration:'none',
                  display:'inline-flex', alignItems:'center', gap:4,
                  transition:'gap 0.18s',
                }}
                onMouseEnter={e => e.currentTarget.style.gap='8px'}
                onMouseLeave={e => e.currentTarget.style.gap='4px'}
              >{p.linkLabel}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
