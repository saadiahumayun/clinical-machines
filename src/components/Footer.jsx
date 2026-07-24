const NAV = ['SAGE', 'CANDetect', 'PICTOR', 'Research']

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid #E2E8F0',
      background: '#fff',
      padding: '36px 48px',
    }}>
      <div style={{
        maxWidth: 1160, margin: '0 auto',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 16,
      }}>
        {/* Logo */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700, fontSize: 16, color: '#0D1520',
        }}>
          <div style={{
            width: 28, height: 28,
            background: 'linear-gradient(135deg, #00A882, #4361EE)',
            borderRadius: 7,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11, fontWeight: 600, color: '#fff',
          }}>
            CM
          </div>
          Clinical Machines
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: 24 }}>
          {NAV.map((l) => (
            <a
              key={l}
              href="#"
              style={{
                fontSize: 13, color: '#8FA3B1',
                textDecoration: 'none', transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#4A5568')}
              onMouseLeave={(e) => (e.target.style.color = '#8FA3B1')}
            >
              {l}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div style={{
          fontSize: 12, color: '#8FA3B1',
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          © 2026 Clinical Machines · IBA Karachi
        </div>
      </div>
    </footer>
  )
}
