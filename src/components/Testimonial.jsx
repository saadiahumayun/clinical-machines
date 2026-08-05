import { Link } from 'react-router-dom'

export default function Testimonial() {
  return (
    <section style={{ background: '#fff' }}>
      <div className="section-wrap" style={{ paddingTop: 80 }}>
        <div className="reveal" style={{
          background: 'linear-gradient(135deg,rgba(0,168,130,0.04) 0%,rgba(67,97,238,0.04) 100%)',
          border: '1.5px solid #E2E8F0', borderRadius: 18,
          padding: '38px 42px',
          display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 28,
          alignItems: 'flex-start',
        }}>
          <div style={{
            width: 46, height: 46, borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, #00A882, #4361EE)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'JetBrains Mono',monospace", fontSize: 15, fontWeight: 600, color: '#fff',
          }}>
            NS
          </div>

          <div>
            <span style={{
              fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: '#00A882',
              letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: 12,
            }}>
              Clinical feedback
            </span>

            <p style={{
              fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(17px,2vw,20px)',
              fontWeight: 600, color: '#0D1520', lineHeight: 1.5, letterSpacing: '-0.01em',
              marginBottom: 18, maxWidth: 760,
            }}>
              "SAGE represents a promising and clinically relevant step toward developing AI models that
              are not only statistically accurate but also interpretable, resource-conscious, and aligned
              with clinical reasoning."
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#0D1520' }}>
                  Naveed ur Rehman Siddiqui, MBBS, FCPS, FCCM
                </div>
                <div style={{ fontSize: 12.5, color: '#8FA3B1', marginTop: 2 }}>
                  Section Head, Pediatric Critical Care Medicine · The Aga Khan University
                </div>
              </div>

              <Link
                to="/feedback/naveed"
                style={{
                  fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600,
                  color: '#00A882', textDecoration: 'none',
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  transition: 'gap 0.18s', flexShrink: 0,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.gap = '8px')}
                onMouseLeave={(e) => (e.currentTarget.style.gap = '4px')}
              >
                Read full feedback →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
