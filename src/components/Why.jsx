const PILLARS = [
  { icon:'🎯', title:'Results a clinician can explain', text:'High accuracy on a test dataset means nothing if the model selects administrative variables or statistical flukes. We build domain knowledge into the search itself — not just the explanation layer.' },
  { icon:'📋', title:'Works on structured records', text:'No imaging, no genomics. We use the tabular data healthcare already produces: patient records, lab results, registry entries, FHIR server exports. The format 90% of clinical institutions actually have.' },
  { icon:'🌍', title:'Designed for Pakistan', text:'Every tool is validated in Pakistani clinical settings — AKUH, IBA, community health programmes in rural Sindh. Not adapted for Pakistan after the fact: designed for it from day one.' },
  { icon:'🔓', title:'Open and reproducible', text:'All core algorithms are open source and peer-reviewed before the product ships. You can inspect how the model was built, what data it used, and why it made each decision.' },
]

export default function Why() {
  return (
    <section id="about" style={{ background:'#F4F7FB' }}>
      <div className="section-wrap">
        <div className="reveal">
          <span className="section-label">Our approach</span>
          <h2 className="section-title">Built differently</h2>
          <p className="section-sub">Most clinical AI fails not because the algorithm is wrong, but because it was built for the wrong setting. We start from the clinical reality.</p>
        </div>
        <div style={{
          display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',
          gap:1, background:'#E2E8F0', border:'1.5px solid #E2E8F0',
          borderRadius:16, overflow:'hidden',
        }}>
          {PILLARS.map((p, i) => (
            <div
              key={p.title}
              className="reveal"
              style={{
                background:'#fff', padding:'30px 26px',
                transitionDelay:`${i*70}ms`,
                transition:'background 0.2s, opacity 0.6s ease, transform 0.6s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.background='#F8FAFB'}
              onMouseLeave={e => e.currentTarget.style.background='#fff'}
            >
              <span style={{ fontSize:24, display:'block', marginBottom:12 }}>{p.icon}</span>
              <h4 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:16, fontWeight:600, color:'#0D1520', marginBottom:8 }}>{p.title}</h4>
              <p style={{ fontSize:14, color:'#4A5568', lineHeight:1.7, fontWeight:300 }}>{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
