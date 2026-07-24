const ITEMS = [
  { text: 'Knowledge-guided feature selection', dot: '#00A882' },
  { text: 'Breast cancer screening for community health workers', dot: '#E63946' },
  { text: 'Pediatric ICU mortality prediction', dot: '#4361EE' },
  { text: 'Direct FHIR R4 server connection', dot: '#00A882' },
  { text: 'LLM-assisted clinical AI', dot: '#F4A500' },
  { text: 'Offline-first tools for rural settings', dot: '#E63946' },
  { text: 'Expert-guided evolutionary search', dot: '#00A882' },
  { text: 'Validated on real patient cohorts', dot: '#4361EE' },
  { text: 'Open-source and peer-reviewed', dot: '#F4A500' },
  { text: 'Built for low-resource clinical environments', dot: '#00A882' },
]

const allItems = [...ITEMS, ...ITEMS]

export default function Ticker() {
  return (
    <div style={{
      borderTop: '1px solid #E2E8F0',
      borderBottom: '1px solid #E2E8F0',
      background: '#F8FAFB',
      padding: '13px 0',
      overflow: 'hidden',
    }}>
      <div
        style={{
          display: 'flex',
          animation: 'ticker 36s linear infinite',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = 'paused')}
        onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = 'running')}
      >
        {allItems.map((item, i) => (
          <span key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '0 28px',
            fontFamily: "'Inter', sans-serif",
            fontSize: 13, color: '#4A5568', fontWeight: 400,
          }}>
            <span style={{
              width: 5, height: 5, borderRadius: '50%',
              background: item.dot, flexShrink: 0,
            }} />
            {item.text}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes ticker { 0%, 100% { transform: translateX(0); } }
        }
      `}</style>
    </div>
  )
}
