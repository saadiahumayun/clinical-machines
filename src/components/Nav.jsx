import { useState, useEffect } from 'react'

const styles = {
  nav: {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 48px', height: 68,
    transition: 'all 0.3s',
  },
  navScrolled: {
    background: 'rgba(255,255,255,0.92)',
    backdropFilter: 'blur(16px)',
    borderBottom: '1px solid #E2E8F0',
    boxShadow: '0 1px 8px rgba(0,0,0,0.05)',
  },
  logo: {
    display: 'flex', alignItems: 'center', gap: 10,
    textDecoration: 'none', color: '#0D1520',
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700, fontSize: 19, letterSpacing: '-0.02em',
  },
  logoIcon: {
    width: 34, height: 34,
    background: 'linear-gradient(135deg, #00A882, #4361EE)',
    borderRadius: 8,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 12, fontWeight: 600, color: '#fff',
  },
  links: { display: 'flex', alignItems: 'center', gap: 32 },
  link: {
    fontSize: 14, color: '#4A5568',
    textDecoration: 'none', fontWeight: 400,
    transition: 'color 0.15s',
  },
  cta: {
    background: '#00A882', color: '#fff',
    border: 'none', borderRadius: 8,
    padding: '9px 22px', fontSize: 14, fontWeight: 600,
    fontFamily: "'Space Grotesk', sans-serif",
    cursor: 'pointer', transition: 'all 0.2s',
  },
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{ ...styles.nav, ...(scrolled ? styles.navScrolled : {}) }}>
      <a href="#" style={styles.logo}>
        <div style={styles.logoIcon}>CM</div>
        Clinical Machines
      </a>
      <div style={styles.links}>
        {['Products', 'Research', 'About', 'Contact'].map((l) => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            style={styles.link}
            onMouseEnter={(e) => (e.target.style.color = '#0D1520')}
            onMouseLeave={(e) => (e.target.style.color = '#4A5568')}
          >
            {l}
          </a>
        ))}
        <button
          style={styles.cta}
          onMouseEnter={(e) => { e.target.style.background = '#007A5E'; e.target.style.transform = 'translateY(-1px)' }}
          onMouseLeave={(e) => { e.target.style.background = '#00A882'; e.target.style.transform = 'translateY(0)' }}
          onClick={() => window.location.href = 'mailto:team@clinical-machines.com'}
        >
          Get in touch
        </button>
      </div>
    </nav>
  )
}
