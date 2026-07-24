import { useEffect, useRef, useState } from 'react'

const STATS = [
  {
    target: 3, suffix: '', display: null,
    label: 'AI tools in development',
    context: 'Each solving a different clinical problem',
    color: '#00A882',
  },
  {
    target: 1586, suffix: '+', display: null,
    label: 'Real ICU patients studied',
    context: 'Aga Khan University PICU — not a public dataset',
    color: '#4361EE',
  },
  {
    target: 72, suffix: 'K+', display: '72K+',
    label: 'Cancer screening records',
    context: 'Used to validate our feature selection method',
    color: '#E63946',
  },
  {
    target: 2, suffix: '', display: null,
    label: 'Papers under peer review',
    context: 'EAAI and PeerJ Computer Science',
    color: '#F4A500',
  },
]

function StatItem({ stat }) {
  const [val, setVal] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setStarted(true); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); io.disconnect() } }, { threshold: 0.4 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!started || stat.display) return
    let cur = 0; const inc = stat.target / (1600 / 16)
    const t = setInterval(() => { cur = Math.min(cur + inc, stat.target); setVal(Math.floor(cur)); if (cur >= stat.target) clearInterval(t) }, 16)
    return () => clearInterval(t)
  }, [started, stat])

  const displayed = stat.display ? stat.display : (started ? val.toLocaleString() + stat.suffix : '—')

  return (
    <div ref={ref} style={{ display:'flex', flexDirection:'column', gap:6 }}>
      <div style={{
        fontFamily:"'Space Grotesk',sans-serif",
        fontSize:'clamp(32px,4vw,44px)', fontWeight:700,
        letterSpacing:'-0.04em', color: stat.color, lineHeight:1,
      }}>{displayed}</div>
      <div style={{ fontSize:15, fontWeight:600, color:'#0D1520' }}>{stat.label}</div>
      <div style={{ fontSize:13, color:'#8FA3B1', fontWeight:300 }}>{stat.context}</div>
    </div>
  )
}

export default function Stats() {
  return (
    <section style={{ background:'#fff' }}>
      <div className="section-wrap" style={{ paddingTop:0 }}>
        <div className="reveal" style={{
          background:'linear-gradient(135deg,rgba(0,168,130,0.03) 0%,rgba(67,97,238,0.03) 100%)',
          border:'1.5px solid #E2E8F0', borderRadius:18,
          padding:'44px 48px',
          display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',
          gap:'36px 32px',
        }}>
          {STATS.map(s => <StatItem key={s.label} stat={s} />)}
        </div>
      </div>
    </section>
  )
}
