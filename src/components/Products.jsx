const PRODUCTS = [
  {
    tag: 'Feature Selection',
    status: 'Paper under review',
    statusColor: '#00A882',
    name: 'SAGE',
    tagline: 'Expert-guided evolutionary feature selection for tabular clinical data',
    desc: 'Standard ML models select features based purely on statistical correlation — which means they routinely pick up administrative artefacts, trial site codes, and surrogate variables that collapse when the model is deployed at a new institution. SAGE embeds clinical domain knowledge directly into the genetic algorithm search through a tunable α parameter, so the features it selects are both statistically strong and medically defensible.',
    kpis: [
      { val: '0.984', label: 'AUC', context: 'on WBCD benchmark' },
      { val: '90% fewer', label: 'Features', context: 'vs full-feature baseline' },
      { val: 'KCI 1.000', label: 'Stability', context: 'identical across all seeds' },
    ],
    stack: ['Open source · MIT', 'FHIR R4 connector', 'Gemini LLM rating'],
    link: 'https://sage.clinical-machines.com',
    linkLabel: 'Try live demo →',
    accent: '#00A882', accentLt: '#E6F7F3', icon: '⚗️',
  },
  {
    tag: 'Cancer Screening',
    status: 'Pilot planned — Mityari, Sindh',
    statusColor: '#E63946',
    name: 'CANDetect',
    tagline: 'AI-assisted breast cancer risk stratification for community health workers',
    desc: 'In rural Sindh, over 60% of breast cancer cases are diagnosed at Stage III or IV — primarily because most women never reach a specialist. CANDetect is a mobile-first screening tool designed for community health workers with no clinical training, enabling three-tier risk stratification (Low / Moderate / High) at the point of first contact, without internet access or imaging equipment.',
    kpis: [
      { val: '3-tier', label: 'Risk stratification', context: 'Low / Moderate / High' },
      { val: 'Offline-first', label: 'Architecture', context: 'zero connectivity required' },
      { val: '3 languages', label: 'UI support', context: 'Urdu, Sindhi, English' },
    ],
    stack: ['CHW-deployed', 'Gates Foundation proposal', 'AKU collaboration'],
    link: 'https://candetect.clinical-machines.com',
    linkLabel: 'Try demo →',
    accent: '#E63946', accentLt: '#FDEEF0', icon: '🔬',
  },
  {
    tag: 'Mortality Prediction',
    status: 'Paper under review — IJMI',
    statusColor: '#4361EE',
    name: 'PICTOR',
    tagline: 'A time-series framework for predicting PICU mortality in a Pakistani pediatric cohort',
    desc: 'PRISM-3, the most widely deployed pediatric severity scoring system, exhibits severe miscalibration at Aga Khan University Hospital (Hosmer-Lemeshow χ² = 272.57, p < 0.001) — systematically underestimating mortality risk in Pakistani PICU populations. PICTOR was built on a prospective cohort of 1,586 patients to replace it, optimised for F1 and AUPRC given the 12.1% mortality prevalence.',
    kpis: [
      { val: '1,586', label: 'PICU patients', context: 'prospective cohort, AKUH' },
      { val: '12.1%', label: 'Mortality rate', context: '191 deaths in cohort' },
      { val: 'HL χ²=272.57', label: 'PRISM-3 failure', context: 'p < 0.001' },
    ],
    stack: ['AKU ethics approved', 'IJMI target journal', 'SMCS / IBA research'],
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
          <h2 className="section-title">Three clinical problems.<br/>Three purpose-built tools.</h2>
          <p className="section-sub">
            Each product targets a documented gap in Pakistan's clinical AI landscape —
            validated on real patient data, grounded in peer-reviewed methodology.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {PRODUCTS.map((p, i) => (
            <div
              key={p.name}
              className="reveal"
              style={{
                transitionDelay: `${i * 80}ms`,
                background: '#fff',
                border: '1.5px solid #E2E8F0',
                borderRadius: 16,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                overflow: 'hidden',
                transition: 'border-color 0.22s, box-shadow 0.22s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = p.accent
                e.currentTarget.style.boxShadow = `0 8px 32px ${p.accent}14`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#E2E8F0'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* LEFT: main content */}
              <div style={{ padding: '32px 32px 28px', borderRight: '1px solid #EEF2F7', display: 'flex', flexDirection: 'column' }}>
                {/* Tag + Status */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 500,
                    color: p.accent, background: p.accentLt,
                    border: `1px solid ${p.accent}33`, borderRadius: 100, padding: '4px 12px',
                  }}>{p.tag}</span>
                  <span style={{
                    fontFamily: "'JetBrains Mono',monospace", fontSize: 10,
                    color: '#8FA3B1', display: 'flex', alignItems: 'center', gap: 5,
                  }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: p.statusColor, display: 'inline-block' }} />
                    {p.status}
                  </span>
                </div>

                {/* Icon + name */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
                  <span style={{ fontSize: 32 }}>{p.icon}</span>
                  <div>
                    <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: '#0D1520', lineHeight: 1 }}>{p.name}</h3>
                    <p style={{ fontSize: 12, color: p.accent, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, marginTop: 4 }}>{p.tagline}</p>
                  </div>
                </div>

                <p style={{ fontSize: 14, color: '#4A5568', lineHeight: 1.75, fontWeight: 300, marginBottom: 20, flex: 1 }}>
                  {p.desc}
                </p>

                {/* Tech stack tags */}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 22 }}>
                  {p.stack.map(s => (
                    <span key={s} style={{
                      fontSize: 11, color: '#4A5568', background: '#F4F7FB',
                      border: '1px solid #E2E8F0', borderRadius: 6,
                      padding: '3px 9px', fontFamily: "'JetBrains Mono',monospace",
                    }}>{s}</span>
                  ))}
                </div>

                <a
                  href={p.link}
                  style={{
                    fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600,
                    color: p.accent, textDecoration: 'none',
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    transition: 'gap 0.18s', alignSelf: 'flex-start',
                  }}
                  onMouseEnter={e => e.currentTarget.style.gap = '8px'}
                  onMouseLeave={e => e.currentTarget.style.gap = '4px'}
                >{p.linkLabel}</a>
              </div>

              {/* RIGHT: KPI panel */}
              <div style={{
                background: p.accentLt,
                display: 'flex', flexDirection: 'column',
                justifyContent: 'center', gap: 1,
                padding: '8px',
              }}>
                {p.kpis.map((k, ki) => (
                  <div key={k.label} style={{
                    background: '#fff',
                    borderRadius: 10,
                    padding: '20px 22px',
                    flex: 1,
                    display: 'flex', flexDirection: 'column', justifyContent: 'center',
                    marginBottom: ki < p.kpis.length - 1 ? 6 : 0,
                  }}>
                    <div style={{
                      fontFamily: "'Space Grotesk',sans-serif",
                      fontSize: 'clamp(18px,2vw,26px)',
                      fontWeight: 700, color: p.accent,
                      letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 4,
                    }}>{k.val}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#0D1520', marginBottom: 2 }}>{k.label}</div>
                    <div style={{ fontSize: 11, color: '#8FA3B1', fontWeight: 300 }}>{k.context}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #products [style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
