import { Link } from 'react-router-dom'
import { useEffect } from 'react'

function MiniHeader() {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(16px)',
      borderBottom: '1px solid #E2E8F0',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 48px', height: 68,
    }}>
      <Link to="/" style={{
        display: 'flex', alignItems: 'center', gap: 10,
        textDecoration: 'none', color: '#0D1520',
        fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 19, letterSpacing: '-0.02em',
      }}>
        <div style={{
          width: 34, height: 34,
          background: 'linear-gradient(135deg, #00A882, #4361EE)', borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 600, color: '#fff',
        }}>CM</div>
        Clinical Machines
      </Link>
      <Link to="/" style={{
        fontSize: 14, color: '#4A5568', textDecoration: 'none',
        display: 'inline-flex', alignItems: 'center', gap: 6,
      }}>
        ← Back to home
      </Link>
    </div>
  )
}

const PARAGRAPHS = [
  "Thank you to the IBA and Clinical Machines team for sharing SAGE—Smart Adaptive Genetic Engine. It was fascinating to see how the platform identifies a substantially smaller and more clinically meaningful set of variables while retaining reasonably comparable predictive performance to conventional algorithms that require many more features.",
  "The breast cancer recurrence analysis is particularly relevant from a clinical and health-systems perspective. In the one registry dataset, SAGE excluded non-clinical administrative variables and identified compact combinations centred on established staging and biological characteristics. The Diversity model selected only three core staging variables with high clinical relevance and strong repeatability, while the Clinical model added receptor status to produce a four-variable set. This demonstrates the potential value of combining clinical expertise with statistical feature selection rather than relying exclusively on correlations within a dataset.",
  "This approach could be especially valuable in low- and middle-income countries, where collecting a long list of variables may be expensive, time-consuming, incomplete, or operationally difficult. A validated model based on a limited number of readily available and clinically actionable features could simplify data collection, improve model interpretability, support external validation, and make recurrence-risk tools more feasible for routine practice. However, the selected features should be prospectively and externally validated across different hospitals and patient populations before clinical implementation.",
  "One suggestion concerns the four SAGE outputs—Performance, Clinical, Efficiency, and Diversity. In addition to displaying them separately, the team could consider developing an optional composite utility score that combines predictive performance, clinical relevance, feature efficiency, and selection stability or diversity. The weighting should remain transparent and adjustable according to the intended use—for example, screening, research, treatment planning, or resource-limited deployment. Presenting both the individual dimensions and a clearly defined composite score may help clinicians and non-technical users compare candidate models more easily without obscuring the trade-offs among accuracy, interpretability, feasibility, and clinical validity.",
  "Overall, SAGE represents a promising and clinically relevant step toward developing AI models that are not only statistically accurate but also interpretable, resource-conscious, and aligned with clinical reasoning. Congratulations to the team on this important and innovative work.",
]

export default function FeedbackPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <MiniHeader />

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '140px 32px 100px' }}>

        <span style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#00A882',
          letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 10,
        }}>
          Clinical feedback
        </span>

        <h1 style={{
          fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(28px,4vw,40px)',
          fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.15,
          color: '#0D1520', marginBottom: 28,
        }}>
          Feedback on the SAGE<br />Feature-Selection Platform
        </h1>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 14,
          padding: '18px 22px', background: '#F4F7FB', border: '1px solid #E2E8F0',
          borderRadius: 14, marginBottom: 40,
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, #00A882, #4361EE)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'JetBrains Mono',monospace", fontSize: 14, fontWeight: 600, color: '#fff',
          }}>
            NS
          </div>
          <div>
            <div style={{ fontSize: 14.5, fontWeight: 600, color: '#0D1520', lineHeight: 1.4 }}>
              Naveed ur Rehman Siddiqui, MBBS, FCPS (Pediatrics), FCCM, EPICdip
            </div>
            <div style={{ fontSize: 12.5, color: '#8FA3B1', lineHeight: 1.6, marginTop: 3 }}>
              Assistant Professor & Consultant Pediatric Intensivist · Section Head, Pediatric Critical Care Medicine<br />
              Program Director, Pediatric Critical Care Medicine Fellowship · Director, PICU Quality & Safety<br />
              Department of Pediatrics & Child Health, The Aga Khan University · Karachi, Pakistan
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {PARAGRAPHS.map((text, i) => (
            <p key={i} style={{
              fontSize: 16, color: '#4A5568', lineHeight: 1.85, fontWeight: 300,
            }}>
              {text}
            </p>
          ))}
        </div>

        <div style={{
          marginTop: 48, paddingTop: 28, borderTop: '1px solid #E2E8F0',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
        }}>
          <Link
            to="/#sage-results"
            style={{
              fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600,
              color: '#00A882', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 4,
            }}
          >
            ← See the case studies this feedback refers to
          </Link>
          <span style={{ fontSize: 12.5, color: '#8FA3B1' }}>
            Feedback shared with permission for publication on clinical-machines.com
          </span>
        </div>

      </div>
    </div>
  )
}
