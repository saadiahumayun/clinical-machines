export default function CTA() {
  return (
    <section style={{ background:'#fff' }}>
      <div className="section-wrap">
        <div className="reveal" style={{
          background:'linear-gradient(135deg,rgba(0,168,130,0.05) 0%,rgba(67,97,238,0.05) 100%)',
          border:'1.5px solid #E2E8F0', borderRadius:20,
          padding:'56px 48px', textAlign:'center', position:'relative', overflow:'hidden',
        }}>
          <div style={{ position:'absolute',top:0,right:0,width:400,height:300, background:'radial-gradient(circle at top right,rgba(0,168,130,0.07) 0%,transparent 65%)', pointerEvents:'none' }} />
          <div style={{ position:'absolute',bottom:0,left:0,width:350,height:250, background:'radial-gradient(circle at bottom left,rgba(67,97,238,0.06) 0%,transparent 65%)', pointerEvents:'none' }} />
          <div style={{ position:'relative' }}>
            <span className="section-label" style={{ display:'block', marginBottom:14 }}>Work with us</span>
            <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'clamp(24px,3vw,38px)', fontWeight:700, letterSpacing:'-0.03em', color:'#0D1520', marginBottom:14, lineHeight:1.1 }}>
              Building clinical AI that<br/>
              <span style={{ background:'linear-gradient(135deg,#00A882,#4361EE)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>stands up to scrutiny</span>
            </h2>
            <p style={{ fontSize:16, color:'#4A5568', margin:'0 auto 32px', maxWidth:440, lineHeight:1.7, fontWeight:300 }}>
              Research partnerships, clinical validation studies, or custom data science projects — we welcome collaborations with institutions that share our values.
            </p>
            <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
              <a href="mailto:team@clinical-machines.com" className="btn-primary">Get in touch</a>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
