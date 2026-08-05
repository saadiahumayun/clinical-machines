import { useEffect, useRef, useState } from 'react'

const DATA_ITEMS = [
  { label: 'patient_1247.ehr',    type: 'EHR Record',  color: '#00A882', icon: '📋' },
  { label: 'ecg_signal.csv',      type: 'Signal Data',  color: '#4361EE', icon: '📈' },
  { label: 'lab_results.fhir',    type: 'FHIR R4',      color: '#F4A500', icon: '🧪' },
  { label: 'vitals_feed.json',    type: 'Vitals',       color: '#E63946', icon: '💓' },
  { label: 'registry_cohort.csv', type: 'Registry',     color: '#00A882', icon: '🗂️' },
]

const CODE_LINES = [
  { text: '$ sage run --mode clinical', color: '#999' },
  { text: '  Loading 569 records...', color: '#666' },
  { text: '  Preprocessing features', color: '#666' },
  { text: '  alpha = 0.65', color: '#7B9FFF' },
  { text: '  Running sub-populations', color: '#666' },
  { text: '  Clinical AUC: 0.804', color: '#00C9A7' },
  { text: '  Features selected: 3', color: '#00C9A7' },
  { text: '  Report generated', color: '#00C9A7' },
]

const OUTPUT = [
  { val: '80.4%',       label: 'Diagnostic accuracy', color: '#00A882', bg: '#E6F7F3' },
  { val: '13 variables', label: 'Instead of 30',       color: '#4361EE', bg: '#EEF1FD' },
  { val: 'High risk',   label: '12 patients flagged', color: '#E63946', bg: '#FDEEF0' },
]

function DataTag({ item, cycleOffset }) {
  const dur = 3.6
  const delay = -(cycleOffset * dur)
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 6,
      background: '#fff', border: `1.5px solid ${item.color}33`,
      borderRadius: 8, padding: '7px 11px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      animation: `tagSlide ${dur}s ease-in-out ${delay}s infinite`,
      whiteSpace: 'nowrap',
    }}>
      <span style={{ fontSize: 14 }}>{item.icon}</span>
      <div>
        <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono',monospace", color: '#0D1520', fontWeight: 500 }}>{item.label}</div>
        <div style={{ fontSize: 10, color: item.color, fontFamily: "'JetBrains Mono',monospace" }}>{item.type}</div>
      </div>
    </div>
  )
}

function Terminal() {
  const [lines, setLines] = useState([])
  const [cursor, setCursor] = useState(true)
  // Track all pending timeouts so we can cancel them all on unmount
  const timers = useRef([])
  const mounted = useRef(true)
  const idx = useRef(0)

  useEffect(() => {
    mounted.current = true

    const schedule = (fn, ms) => {
      const id = setTimeout(() => {
        if (!mounted.current) return
        fn()
      }, ms)
      timers.current.push(id)
      return id
    }

    const add = () => {
      if (!mounted.current) return
      if (idx.current >= CODE_LINES.length) {
        schedule(() => {
          idx.current = 0
          setLines([])
          schedule(add, 80)
        }, 2000)
        return
      }
      const line = CODE_LINES[idx.current]
      setLines(prev => [...prev, line])
      idx.current++
      schedule(add, 480 + Math.random() * 200)
    }

    schedule(add, 600)

    const cursorInterval = setInterval(() => {
      if (!mounted.current) return
      setCursor(c => !c)
    }, 530)

    return () => {
      mounted.current = false
      timers.current.forEach(clearTimeout)
      timers.current = []
      clearInterval(cursorInterval)
    }
  }, [])

  return (
    <div style={{ background: '#0D1520', borderRadius: '10px 10px 0 0', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 14px', background: '#1A2535', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
        {['#FF5F57','#FEBC2E','#28C840'].map(c => (
          <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c, opacity: 0.85 }} />
        ))}
        <span style={{ flex: 1, textAlign: 'center', marginRight: 28, fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>
          sage — terminal
        </span>
      </div>
      <div style={{ flex: 1, padding: '12px 16px', overflowY: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 3 }}>
        {lines.map((line, i) => (
          <div key={i} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, lineHeight: 1.5, color: line.color, animation: 'lineFadeIn 0.2s ease' }}>
            {line.text}
          </div>
        ))}
        <div style={{ width: 7, height: 13, background: cursor ? '#00C9A7' : 'transparent', transition: 'background 0.1s', marginTop: 2 }} />
      </div>
    </div>
  )
}

function OutputCard({ item, delay }) {
  const [visible, setVisible] = useState(false)
  const mounted = useRef(true)
  useEffect(() => {
    mounted.current = true
    const t = setTimeout(() => { if (mounted.current) setVisible(true) }, delay)
    return () => { mounted.current = false; clearTimeout(t) }
  }, [delay])

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 11,
      background: '#fff', border: `1.5px solid ${item.color}33`,
      borderRadius: 10, padding: '9px 14px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateX(0)' : 'translateX(18px)',
      transition: 'opacity 0.5s ease, transform 0.5s ease',
      whiteSpace: 'nowrap',
    }}>
      <div style={{ width: 32, height: 32, borderRadius: 8, background: item.bg, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 700, color: item.color }}>✓</div>
      <div>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 700, color: '#0D1520' }}>{item.val}</div>
        <div style={{ fontSize: 11, color: '#8FA3B1' }}>{item.label}</div>
      </div>
    </div>
  )
}

function HeroAnimation() {
  // Larger: 640 x 380
  const W = 640, H = 380, MID_Y = H / 2
  const COL_W = 168, LAP_W = 260

  return (
    <div style={{ position: 'relative', width: W, height: H }}>

      {/* LEFT: incoming data stream */}
      <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 8, width: COL_W }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: '#8FA3B1', marginBottom: 4, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Incoming Data</div>
        {DATA_ITEMS.map((item, i) => (
          <DataTag key={i} item={item} cycleOffset={i / DATA_ITEMS.length} />
        ))}
      </div>

      {/* Dashed lines: data → laptop */}
      <svg style={{ position: 'absolute', left: COL_W, top: 0, width: 50, height: H, overflow: 'visible', pointerEvents: 'none' }}>
        {[0.25, 0.37, 0.50, 0.63, 0.75].map((pct, i) => (
          <line key={i}
            x1="0" y1={H * pct} x2="42" y2={MID_Y}
            stroke="#E2E8F0" strokeWidth="1.2" strokeDasharray="4 3"
            style={{ animation: `dashMove ${1.4 + i * 0.18}s linear infinite` }}
          />
        ))}
      </svg>

      {/* CENTER: laptop */}
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: LAP_W }}>
        <div style={{ width: LAP_W, height: 180, borderRadius: 12, overflow: 'hidden', border: '2px solid #2A3A50', boxShadow: '0 10px 40px rgba(0,0,0,0.20)' }}>
          <Terminal />
        </div>
        <div style={{ width: LAP_W + 24, height: 12, background: 'linear-gradient(180deg,#2A3A50,#1A2535)', borderRadius: '0 0 8px 8px', margin: '0 -12px', boxShadow: '0 4px 20px rgba(0,0,0,0.22)' }} />
        <div style={{ width: LAP_W + 48, height: 6, background: '#151F2E', borderRadius: '0 0 6px 6px', margin: '0 -24px' }} />
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: 'rgba(0,0,0,0.2)', textAlign: 'center', marginTop: 8, letterSpacing: '0.08em' }}>Clinical Machines · SAGE</div>
      </div>

      {/* Dashed lines: laptop → insights */}
      <svg style={{ position: 'absolute', right: COL_W, top: 0, width: 50, height: H, overflow: 'visible', pointerEvents: 'none' }}>
        {[0.30, 0.50, 0.70].map((pct, i) => (
          <line key={i}
            x1="8" y1={MID_Y} x2="50" y2={H * pct}
            stroke={OUTPUT[i].color} strokeWidth="1.2"
            strokeDasharray="4 3" opacity="0.4"
            style={{ animation: `dashMove ${1.2 + i * 0.25}s linear infinite` }}
          />
        ))}
      </svg>

      {/* RIGHT: insight cards */}
      <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 10, width: COL_W }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: '#8FA3B1', marginBottom: 4, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Insights</div>
        {OUTPUT.map((item, i) => (
          <OutputCard key={i} item={item} delay={1000 + i * 500} />
        ))}
      </div>

      <style>{`
        @keyframes tagSlide {
          0%   { opacity: 0; transform: translateX(-18px); }
          12%  { opacity: 1; transform: translateX(0); }
          75%  { opacity: 1; transform: translateX(0); }
          90%  { opacity: 0; transform: translateX(8px); }
          100% { opacity: 0; transform: translateX(-18px); }
        }
        @keyframes lineFadeIn {
          from { opacity: 0; transform: translateY(3px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes dashMove { to { stroke-dashoffset: -14; } }
      `}</style>
    </div>
  )
}

export default function Hero() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t) }, [])

  const fi = (d) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? 'translateY(0)' : 'translateY(18px)',
    transition: `opacity 0.6s ease ${d}, transform 0.6s ease ${d}`,
  })

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '100px 32px 72px',
      position: 'relative', overflow: 'hidden',
      background: '#fff', gap: 52,
    }}>

      {/* Subtle grid */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(0,168,130,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,168,130,0.04) 1px,transparent 1px)', backgroundSize: '52px 52px', maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%,black 20%,transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%,black 20%,transparent 100%)' }} />

      {/* Text content — centered */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 900, textAlign: 'center' }}>

        <div style={{ ...fi('0.1s'), display: 'inline-flex', alignItems: 'center', gap: 8, border: '1.5px solid #E2E8F0', borderRadius: 100, padding: '6px 16px', marginBottom: 22, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: '#4A5568', background: '#fff' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00A882', animation: 'pulse 2s ease-in-out infinite' }} />
          Clinical AI research in Pakistan
        </div>

        <h1 style={{ ...fi('0.22s'), fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(34px,5vw,64px)', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.04em', color: '#0D1520', marginBottom: 18 }}>
          Healthcare AI{' '}
          <span style={{ background: 'linear-gradient(135deg,#00A882 0%,#4361EE 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>built on evidence</span>
        </h1>

        <p style={{ ...fi('0.36s'), fontSize: 'clamp(15px,1.8vw,17px)', color: '#4A5568', lineHeight: 1.75, fontWeight: 300, marginBottom: 28, maxWidth: 560, margin: '0 auto 28px' }}>
          Clinical Machines turns raw clinical data into decisions clinicians can act on and trust — grounded in peer-reviewed science, built for real healthcare settings.
        </p>

        <div style={{ ...fi('0.5s'), display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 30, justifyContent: 'center' }}>
          {[
            { name: 'SAGE', desc: 'Feature selection', color: '#00A882', bg: '#E6F7F3' },
            { name: 'CANDetect', desc: 'Cancer screening', color: '#8C2F39', bg: '#F7EBEC' },
            { name: 'PICTOR', desc: 'ICU prediction', color: '#4361EE', bg: '#EEF1FD' },
          ].map(p => (
            <span key={p.name} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: p.bg, color: p.color, border: `1.5px solid ${p.color}33`, borderRadius: 100, padding: '4px 14px', fontSize: 13, fontWeight: 500, fontFamily: "'Space Grotesk',sans-serif" }}>
              <span style={{ fontWeight: 700 }}>{p.name}</span>
              <span style={{ opacity: 0.65, fontSize: 12 }}>· {p.desc}</span>
            </span>
          ))}
        </div>

        <div style={{ ...fi('0.62s'), display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="#products" className="btn-primary">Explore our tools →</a>
          <a href="#research" className="btn-secondary">Read our research</a>
        </div>
      </div>

      {/* Animation — below text, centered */}
      <div
        style={{
          position: 'relative', zIndex: 1,
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s',
        }}
      >
        <HeroAnimation />
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.7)} }
      `}</style>
    </section>
  )
}
