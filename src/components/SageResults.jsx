import { useState, useMemo } from 'react'

/* ============================================================
   DATA — condensed from SAGE_Results_and_Inference.docx
   ============================================================ */

const METHOD_META = {
  fullrf:   { name: 'Full-RF',         short: 'All variables',   isSage: false, color: '#8FA3B1' },
  lasso:    { name: 'LASSO-RF',        short: 'Standard method', isSage: false, color: '#F4A500' },
  randomga: { name: 'Random-GA',       short: 'No expert input', isSage: false, color: '#8FA3B1' },
  perf:     { name: 'SAGE Performance',short: 'Max accuracy',    isSage: true,  color: '#4361EE' },
  clinical: { name: 'SAGE Clinical',   short: 'Max sensibility', isSage: true,  color: '#00A882' },
  eff:      { name: 'SAGE Efficiency', short: 'Fewest variables',isSage: true,  color: '#E63946' },
  div:      { name: 'SAGE Diversity',  short: 'Balanced blend',  isSage: true,  color: '#9B59B6' },
}

const DATASETS = [
  {
    id: 'wbcd',
    tab: 'Breast Cell Measurements',
    source: 'Wisconsin Diagnostic (WBCD) · public dataset',
    patients: '569 patients',
    predicting: 'Malignant vs. benign tumour',
    intro: "All 30 measurements here are already legitimate biological data — nothing administrative to filter out. So any SAGE advantage comes from favouring the most clinically established measurements, not from spotting obviously irrelevant data.",
    methods: [
      { key: 'fullrf', auc: 0.988, cr: 0.533, features: 30, kci: null,
        note: 'Uses every one of the 30 measurements — the baseline everything else is judged against.', top: [] },
      { key: 'lasso', auc: 0.990, cr: 0.696, features: 8, kci: null,
        note: 'Improves on using everything, but still keeps a couple of measurements (smoothness_worst, symmetry_worst) with no clear medical grounding.',
        top: [{ n: 'concave points_worst', r: 1.0 }, { n: 'radius_worst', r: 0.857 }, { n: 'smoothness_worst', r: 0.429 }] },
      { key: 'randomga', auc: 0.988, cr: 0.607, features: 8, kci: 0.233,
        note: "SAGE's search with clinical input switched off. Matches Full-RF's accuracy but pulls in pure measurement-noise terms (texture_se, compactness_se) with no diagnostic meaning.",
        top: [{ n: 'radius_worst', r: 0.857 }, { n: 'texture_se', r: 0.286 }, { n: 'compactness_se', r: 0.429 }] },
      { key: 'perf', auc: 0.987, cr: 0.750, features: 4, kci: 0.420,
        note: 'Prioritises accuracy — still fairly clinically sensible here, but not the top priority.',
        top: [{ n: 'concave points_mean', r: 0.857 }, { n: 'area_worst', r: 0.857 }, { n: 'texture_worst', r: 0.571 }] },
      { key: 'clinical', auc: 0.984, cr: 0.905, features: 3, kci: 0.776,
        note: 'Landed on 3 measurements that map directly onto grading systems doctors already use — for a negligible 0.4-point accuracy cost.',
        top: [{ n: 'concave points_worst', r: 1.0 }, { n: 'concave points_mean', r: 0.857 }, { n: 'area_worst', r: 0.857 }] },
      { key: 'eff', auc: 0.977, cr: 0.857, features: 2, kci: 0.309,
        note: 'Just 2 measurements retain 98% of the predictive value of using all 30.',
        top: [{ n: 'concave points_mean', r: 0.857 }, { n: 'area_worst', r: 0.857 }] },
      { key: 'div', auc: 0.984, cr: 0.905, features: 3, kci: 0.679,
        note: 'Independently converged on the exact same 3 measurements as SAGE Clinical — a reassuring agreement.',
        top: [{ n: 'concave points_worst', r: 1.0 }, { n: 'concave points_mean', r: 0.857 }, { n: 'area_worst', r: 0.857 }] },
    ],
    findings: [
      'SAGE Clinical picked just 3 variables and still reached 0.984 accuracy — a big gain in clinical sensibility over using all 30, for almost no accuracy cost.',
      'SAGE Clinical and Diversity independently agreed on the same 3 variables — all map directly onto grading systems doctors already use.',
      'Without clinical input, the search reached the same accuracy but pulled in measurement-noise terms with no diagnostic meaning.',
      'The standard alternative (LASSO-RF) also kept variables with no clear clinical basis — its score is well below SAGE Clinical\u2019s.',
      'SAGE Clinical was far more consistent across repeated runs than the un-guided search (0.78 vs 0.23) — easier to trust and validate.',
    ],
  },
  {
    id: 'lung',
    tab: 'Lung Cancer Symptoms',
    source: 'Symptom survey · public dataset',
    patients: '309 patients',
    predicting: 'Presence of lung cancer',
    intro: "15 yes/no symptom and lifestyle questions. A small dataset where statistical noise is high relative to real signal — a good stress test for the expert-guidance mechanism.",
    methods: [
      { key: 'fullrf', auc: 0.882, cr: 0.547, features: 15, kci: null, note: 'Uses all 15 symptom variables.', top: [] },
      { key: 'lasso', auc: 0.886, cr: 0.546, features: 13, kci: null,
        note: 'Barely changes anything — keeps ANXIETY and PEER_PRESSURE, neither with any clinical backing.',
        top: [{ n: 'SMOKING', r: 1.0 }, { n: 'ANXIETY', r: 0.1 }, { n: 'PEER_PRESSURE', r: 0.1 }] },
      { key: 'randomga', auc: 0.902, cr: 0.450, features: 4, kci: 0.773,
        note: 'Misses SMOKING entirely — the strongest known cause of lung cancer — in favour of 4 variables that only happened to correlate in this small sample.',
        top: [{ n: 'ALLERGY', r: 0.5 }, { n: 'YELLOW_FINGERS', r: 0.4 }, { n: 'FATIGUE', r: 0.5 }] },
      { key: 'perf', auc: 0.905, cr: 0.460, features: 5, kci: 0.250,
        note: 'Still includes ANXIETY and PEER_PRESSURE — a reminder this setting optimises for accuracy only.',
        top: [{ n: 'SMOKING', r: 1.0 }, { n: 'ANXIETY', r: 0.1 }, { n: 'PEER_PRESSURE', r: 0.1 }] },
      { key: 'clinical', auc: 0.543, cr: 1.0, features: 1, kci: 0.286,
        note: 'Picks SMOKING alone — maximally sensible, but one variable isn\u2019t enough to be accurate on its own here.',
        top: [{ n: 'SMOKING', r: 1.0 }] },
      { key: 'eff', auc: 0.902, cr: 0.450, features: 4, kci: 0.773,
        note: 'Matched the un-guided search exactly on this dataset — a sign that on small datasets, Clinical or Diversity are the safer choices.',
        top: [{ n: 'ALLERGY', r: 0.5 }, { n: 'YELLOW_FINGERS', r: 0.4 }, { n: 'FATIGUE', r: 0.5 }] },
      { key: 'div', auc: 0.836, cr: 0.733, features: 3, kci: 0.255,
        note: 'The best practical trade-off on this dataset: recovers SMOKING + WHEEZING, reasonably accurate and clinically grounded.',
        top: [{ n: 'SMOKING', r: 1.0 }, { n: 'WHEEZING', r: 0.7 }, { n: 'ALLERGY', r: 0.5 }] },
    ],
    findings: [
      'Without clinical input, the search missed SMOKING entirely — the strongest known cause of lung cancer — in favour of variables that only happened to correlate in this small sample.',
      'SAGE Efficiency matched the un-guided search exactly here — on small datasets, Clinical or Diversity are the safer settings to rely on.',
      'SAGE Diversity (smoking + wheezing + allergy) offers the best real-world trade-off: reasonably accurate and clinically grounded.',
      'SAGE Clinical (smoking alone) shows the maximum-sensibility endpoint but isn\u2019t accurate enough to use by itself here.',
      'The standard alternative (LASSO-RF) left in clinically questionable variables and barely improved on using everything.',
    ],
  },
  {
    id: 'akuh',
    tab: 'AKUH Breast Cancer Registry',
    source: 'Aga Khan University Hospital · institutional data',
    patients: '4,400 patients',
    predicting: 'Cancer recurrence after treatment',
    intro: 'The first SAGE run on real hospital records — 31 variables spanning staging, biology, treatment, and administrative fields like marital status and province. The strongest test yet of whether SAGE filters out things it shouldn\u2019t use.',
    methods: [
      { key: 'fullrf', auc: 0.880, cr: 0.569, features: 31, kci: null, note: 'Uses all 31 variables — including marital status, occupation, and province.', top: [] },
      { key: 'lasso', auc: 0.881, cr: 0.558, features: 28, kci: null,
        note: 'Kept marital status, occupation, and province while dropping grade and HER2 status — two of the most established recurrence predictors in breast cancer.',
        top: [{ n: 'is_married', r: 0.0 }, { n: 'occupation', r: 0.0 }, { n: 'province', r: 0.0 }] },
      { key: 'randomga', auc: 0.877, cr: 0.563, features: 6, kci: 0.566,
        note: 'Falls slightly below the "use everything" baseline on clinical sensibility — the third dataset in a row where this happens without guidance.',
        top: [{ n: 'stage_0_4', r: 1.0 }, { n: 'surgery_axilla_type', r: 0.125 }, { n: 'hormone_done', r: 0.25 }] },
      { key: 'perf', auc: 0.870, cr: 0.625, features: 7, kci: 0.446,
        note: 'Includes surgery_axilla_type — high statistical importance, but it\u2019s a consequence of staging, not an independent predictor.',
        top: [{ n: 'm_category', r: 1.0 }, { n: 'surgery_axilla_type', r: 0.125 }, { n: 'chemo_done', r: 0.25 }] },
      { key: 'clinical', auc: 0.798, cr: 1.0, features: 4, kci: 0.428,
        note: 'TNM staging + oestrogen receptor status — close to the minimum an oncologist would want for recurrence risk and treatment planning.',
        top: [{ n: 'm_category', r: 1.0 }, { n: 'n_category', r: 1.0 }, { n: 't_category', r: 1.0 }, { n: 'er_positive', r: 1.0 }] },
      { key: 'eff', auc: 0.823, cr: 0.950, features: 5, kci: 0.417,
        note: 'Stage group, node sampling quality, PR status, margin status, and TNBC subtype — 4 of 5 rated at the maximum.',
        top: [{ n: 'stage_0_4', r: 1.0 }, { n: 'pr_positive', r: 1.0 }, { n: 'tnbc', r: 1.0 }] },
      { key: 'div', auc: 0.797, cr: 1.0, features: 3, kci: 0.868,
        note: 'Selected only the 3 core TNM staging variables in nearly every repeated run — effectively rediscovering the clinical staging standard from data alone.',
        top: [{ n: 'm_category', r: 1.0 }, { n: 'n_category', r: 1.0 }, { n: 't_category', r: 1.0 }] },
    ],
    findings: [
      'The standard alternative (LASSO-RF) kept marital status, occupation, and province — while dropping grade and HER2 status, two of the most established recurrence predictors.',
      'SAGE Diversity selected only the 3 core staging variables, with the highest run-to-run consistency of any dataset (0.868) — essentially rediscovering the clinical staging standard from the data.',
      'One variable (type of lymph node surgery) had the 2nd-highest statistical importance in the whole dataset but a low clinical rating — it\u2019s a consequence of staging, not an independent predictor.',
      'SAGE Clinical, Diversity, and Efficiency all avoided treatment variables that wouldn\u2019t actually be available at the point of care — a real safety advantage for deployment.',
      'The un-guided search fell slightly below the "use everything" baseline on clinical sensibility — the third dataset in a row where this happened.',
    ],
  },
]

const CROSS_DATASET = [
  { label: 'Breast Cell Measurements', n: '569', gap: '+0.298' },
  { label: 'Lung Cancer Symptoms', n: '309', gap: '+0.550' },
  { label: 'AKUH Registry', n: '4,400', gap: '+0.437' },
]

const GLOSSARY = [
  {
    title: 'Full-RF', color: '#8FA3B1', icon: '\u{1F4E6}',
    text: 'Uses every single variable available, with no selection at all. The "kitchen sink" baseline everything else is measured against.',
  },
  {
    title: 'LASSO-RF', color: '#F4A500', icon: '\u{1F4CA}',
    text: 'A standard, widely-used statistical method \u2014 not built by us. It narrows down variables purely by the numbers. It has no medical knowledge, so it can\u2019t tell "genuinely causal" apart from "coincidentally correlated".',
  },
  {
    title: 'Random-GA', color: '#8FA3B1', icon: '\u{1F576}\uFE0F',
    text: 'SAGE\u2019s own search process, but with clinical input switched off \u2014 "SAGE with a blindfold on". Comparing this to SAGE isolates exactly how much value clinical guidance adds.',
  },
  {
    title: 'The 4 SAGE settings', color: '#00A882', icon: '\u{1F39B}\uFE0F',
    text: 'Performance (max accuracy), Clinical (max medical sensibility), Efficiency (fewest variables), Diversity (a balanced blend). Four dials on the same underlying search.',
  },
]

const METRIC_TIPS = [
  { k: 'AUC', v: 'How well the model tells patients apart. 0.5 = coin flip, 1.0 = perfect.' },
  { k: 'CR', v: 'Clinical Relevance \u2014 how medically sensible the chosen variables are, 0 to 1.' },
  { k: '\u0394CR', v: 'CR compared to Full-RF (using everything). Positive = more sensible than using everything.' },
  { k: 'Features', v: 'How many variables the final model actually uses.' },
  { k: 'Stability', v: 'Would repeated runs pick the same variables? Near 1.0 = yes, consistently.' },
]

/* ============================================================
   CHART — click-to-explore CR vs AUC scatter, plain SVG
   ============================================================ */

function niceDomain(values, pad = 0.12, step = 0.05) {
  const lo0 = Math.min(...values), hi0 = Math.max(...values)
  const range = Math.max(hi0 - lo0, 0.03)
  let lo = Math.floor((lo0 - range * pad) / step) * step
  let hi = Math.ceil((hi0 + range * pad) / step) * step
  lo = Math.max(0, lo); hi = Math.min(1, hi)
  if (hi - lo < step * 2) { lo = Math.max(0, lo - step); hi = Math.min(1, hi + step) }
  return [lo, hi]
}

function ScatterChart({ methods, activeKey, onSelect }) {
  const W = 560, H = 300, PAD = { l: 46, r: 20, t: 16, b: 40 }
  const plotW = W - PAD.l - PAD.r, plotH = H - PAD.t - PAD.b

  const [crLo, crHi] = useMemo(() => niceDomain(methods.map(m => m.cr)), [methods])
  const [aucLo, aucHi] = useMemo(() => niceDomain(methods.map(m => m.auc), 0.15, 0.02), [methods])

  const x = (cr) => PAD.l + ((cr - crLo) / (crHi - crLo)) * plotW
  const y = (auc) => PAD.t + plotH - ((auc - aucLo) / (aucHi - aucLo)) * plotH

  const xTicks = Array.from({ length: 5 }, (_, i) => crLo + (i * (crHi - crLo)) / 4)
  const yTicks = Array.from({ length: 5 }, (_, i) => aucLo + (i * (aucHi - aucLo)) / 4)

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
      {yTicks.map((t, i) => (
        <line key={`gy${i}`} x1={PAD.l} x2={W - PAD.r} y1={y(t)} y2={y(t)} stroke="#EEF2F7" strokeWidth="1" />
      ))}
      {xTicks.map((t, i) => (
        <line key={`gx${i}`} x1={x(t)} x2={x(t)} y1={PAD.t} y2={H - PAD.b} stroke="#EEF2F7" strokeWidth="1" />
      ))}
      <line x1={PAD.l} x2={W - PAD.r} y1={H - PAD.b} y2={H - PAD.b} stroke="#CBD5E0" strokeWidth="1" />
      <line x1={PAD.l} x2={PAD.l} y1={PAD.t} y2={H - PAD.b} stroke="#CBD5E0" strokeWidth="1" />
      {xTicks.map((t, i) => (
        <text key={`xl${i}`} x={x(t)} y={H - PAD.b + 16} textAnchor="middle" fontSize="9" fontFamily="'JetBrains Mono',monospace" fill="#8FA3B1">{t.toFixed(2)}</text>
      ))}
      {yTicks.map((t, i) => (
        <text key={`yl${i}`} x={PAD.l - 8} y={y(t) + 3} textAnchor="end" fontSize="9" fontFamily="'JetBrains Mono',monospace" fill="#8FA3B1">{t.toFixed(2)}</text>
      ))}
      <text x={(PAD.l + W - PAD.r) / 2} y={H - 4} textAnchor="middle" fontSize="10" fill="#4A5568" fontFamily="Inter, sans-serif">Clinical Relevance (CR) &#8594;</text>
      <text x={12} y={(PAD.t + H - PAD.b) / 2} textAnchor="middle" fontSize="10" fill="#4A5568" fontFamily="Inter, sans-serif" transform={`rotate(-90, 12, ${(PAD.t + H - PAD.b) / 2})`}>AUC &#8594;</text>

      {methods.map((m) => {
        const meta = METHOD_META[m.key]
        const active = activeKey === m.key
        return (
          <g key={m.key} onClick={() => onSelect(m.key)} style={{ cursor: 'pointer' }}>
            <circle
              cx={x(m.cr)} cy={y(m.auc)}
              r={active ? 9 : 6.5}
              fill={meta.color}
              fillOpacity={active ? 1 : 0.55}
              stroke={active ? '#0D1520' : meta.color}
              strokeWidth={active ? 1.5 : 0}
            />
            <text
              x={x(m.cr)} y={y(m.auc) - (active ? 15 : 11)}
              textAnchor="middle" fontSize={active ? 10 : 9}
              fontWeight={active ? 700 : 400}
              fontFamily="'Space Grotesk',sans-serif"
              fill={active ? '#0D1520' : '#8FA3B1'}
            >
              {meta.name}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

/* ============================================================
   SUB-COMPONENTS
   ============================================================ */

function MetricCard({ label, value }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, padding: '12px 14px', flex: 1, minWidth: 90 }}>
      <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 19, fontWeight: 700, color: '#0D1520' }}>{value}</div>
      <div style={{ fontSize: 11, color: '#8FA3B1', marginTop: 2 }}>{label}</div>
    </div>
  )
}

function MethodDetail({ method }) {
  const meta = METHOD_META[method.key]
  return (
    <div style={{
      background: meta.isSage ? `${meta.color}08` : '#F8FAFB',
      border: `1.5px solid ${meta.isSage ? meta.color + '40' : '#E2E8F0'}`,
      borderRadius: 14, padding: '20px 22px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: meta.color, flexShrink: 0 }} />
        <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 17, fontWeight: 700, color: '#0D1520' }}>{meta.name}</h4>
        {meta.isSage && (
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: meta.color, background: `${meta.color}15`, border: `1px solid ${meta.color}33`, borderRadius: 100, padding: '2px 9px' }}>SAGE</span>
        )}
        <span style={{ fontSize: 12, color: '#8FA3B1' }}>{meta.short}</span>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
        <MetricCard label="AUC" value={method.auc.toFixed(3)} />
        <MetricCard label="CR" value={method.cr.toFixed(3)} />
        <MetricCard label="Variables" value={method.features} />
        {method.kci != null && <MetricCard label="Stability" value={method.kci.toFixed(3)} />}
      </div>

      <p style={{ fontSize: 13.5, color: '#4A5568', lineHeight: 1.65, fontWeight: 300, marginBottom: method.top.length ? 14 : 0 }}>
        {method.note}
      </p>

      {method.top.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {method.top.map((f) => (
            <span key={f.n} style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              background: '#fff', border: '1px solid #E2E8F0', borderRadius: 7,
              padding: '4px 9px', fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, color: '#0D1520',
            }}>
              {f.n}
              <span style={{ color: f.r >= 0.7 ? '#00A882' : f.r > 0 ? '#F4A500' : '#E63946' }}>&#9733;{f.r.toFixed(2)}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

function MetricTip({ k, v }) {
  const [hover, setHover] = useState(false)
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5,
        background: hover ? '#EEF1FD' : '#fff',
        border: `1px solid ${hover ? '#4361EE' : '#E2E8F0'}`, borderRadius: 100,
        padding: '5px 12px', color: '#0D1520', cursor: 'help',
        transition: 'all 0.15s',
      }}>
        <strong>{k}</strong>
        <span style={{ color: '#8FA3B1', fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: 11 }}>?</span>
      </div>
      {hover && (
        <div style={{
          position: 'absolute', bottom: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)',
          background: '#0D1520', color: '#fff', fontSize: 12, fontWeight: 300,
          fontFamily: 'Inter, sans-serif', lineHeight: 1.5, borderRadius: 8,
          padding: '9px 12px', width: 220, zIndex: 20,
          boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
        }}>
          {v}
          <div style={{
            position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
            width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent',
            borderTop: '6px solid #0D1520',
          }} />
        </div>
      )}
    </div>
  )
}

function Accordion({ title, subtitle, color = '#00A882', open, onToggle, children }) {
  return (
    <div style={{ background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 14, overflow: 'hidden' }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%', border: 'none', background: open ? `${color}08` : '#fff',
          padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          cursor: 'pointer', textAlign: 'left', gap: 12,
        }}
      >
        <div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 700, color: '#0D1520' }}>{title}</div>
          {subtitle && <div style={{ fontSize: 12, color: '#8FA3B1', marginTop: 2 }}>{subtitle}</div>}
        </div>
        <span style={{
          fontFamily: "'JetBrains Mono',monospace", fontSize: 16, color,
          transform: open ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0,
        }}>+</span>
      </button>
      {open && <div style={{ padding: '4px 20px 20px' }}>{children}</div>}
    </div>
  )
}

/* ============================================================
   MAIN COMPONENT
   ============================================================ */

export default function SageResults() {
  const [activeDs, setActiveDs] = useState(0)
  const [activeMethod, setActiveMethod] = useState('clinical')
  const [showGlossary, setShowGlossary] = useState(false)
  const [showFindings, setShowFindings] = useState(false)

  const dataset = DATASETS[activeDs]
  const method = dataset.methods.find((m) => m.key === activeMethod) || dataset.methods[dataset.methods.length - 1]

  function selectDataset(i) {
    setActiveDs(i)
    setActiveMethod('clinical')
  }

  return (
    <section id="sage-results" style={{ background: '#F4F7FB' }}>
      <div className="section-wrap">

        <div className="reveal">
          <span className="section-label">Case studies</span>
          <h2 className="section-title">Does SAGE actually pick<br />variables that make sense?</h2>
          <p className="section-sub">
            Explore SAGE&#8217;s results across three datasets, compared against standard alternatives.
            Click a dataset, then click a method on the chart to see what it selected and why.
          </p>
        </div>

        <div className="reveal" style={{ marginBottom: 20 }}>
          <Accordion
            title="What are we comparing?"
            subtitle={showGlossary ? undefined : 'Full-RF, LASSO-RF, Random-GA, and the 4 SAGE settings — click to expand'}
            color="#4361EE"
            open={showGlossary}
            onToggle={() => setShowGlossary((v) => !v)}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: 14, marginBottom: 16 }}>
              {GLOSSARY.map((g) => (
                <div key={g.title} style={{ background: '#F8FAFB', border: '1px solid #E2E8F0', borderRadius: 10, padding: '14px 16px' }}>
                  <div style={{ fontSize: 20, marginBottom: 6 }}>{g.icon}</div>
                  <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 13.5, color: g.color, marginBottom: 4 }}>{g.title}</div>
                  <div style={{ fontSize: 12.5, color: '#4A5568', lineHeight: 1.6, fontWeight: 300 }}>{g.text}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {METRIC_TIPS.map((m) => (
                <MetricTip key={m.k} k={m.k} v={m.v} />
              ))}
            </div>
          </Accordion>
        </div>

        <div className="reveal" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
          {DATASETS.map((d, i) => (
            <button
              key={d.id}
              onClick={() => selectDataset(i)}
              style={{
                fontFamily: "'Space Grotesk',sans-serif", fontSize: 13.5, fontWeight: 600,
                padding: '10px 18px', borderRadius: 100, cursor: 'pointer',
                border: activeDs === i ? '1.5px solid #00A882' : '1.5px solid #E2E8F0',
                background: activeDs === i ? '#00A882' : '#fff',
                color: activeDs === i ? '#fff' : '#4A5568',
                transition: 'all 0.18s',
              }}
            >
              {d.tab}
            </button>
          ))}
        </div>

        <div className="reveal" style={{
          background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 18,
          padding: '28px 30px', marginBottom: 20,
        }}>
          <div style={{ marginBottom: 6 }}>
            <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 700, color: '#0D1520' }}>{dataset.tab}</h3>
            <p style={{ fontSize: 12.5, color: '#8FA3B1', marginTop: 2 }}>{dataset.source} &middot; {dataset.patients} &middot; predicting: {dataset.predicting}</p>
          </div>
          <p style={{ fontSize: 13.5, color: '#4A5568', lineHeight: 1.7, fontWeight: 300, marginBottom: 22, maxWidth: 720 }}>
            {dataset.intro}
          </p>

          <div className="results-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,1fr)', gap: 26 }}>
            <div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                {dataset.methods.map((m) => {
                  const meta = METHOD_META[m.key]
                  const active = activeMethod === m.key
                  return (
                    <button
                      key={m.key}
                      onClick={() => setActiveMethod(m.key)}
                      style={{
                        fontFamily: "'JetBrains Mono',monospace", fontSize: 11,
                        padding: '5px 11px', borderRadius: 100, cursor: 'pointer',
                        border: `1.5px solid ${active ? meta.color : '#E2E8F0'}`,
                        background: active ? `${meta.color}15` : '#fff',
                        color: active ? meta.color : '#8FA3B1',
                        display: 'inline-flex', alignItems: 'center', gap: 5,
                        transition: 'all 0.15s',
                      }}
                    >
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: meta.color }} />
                      {meta.name}
                    </button>
                  )
                })}
              </div>
              <ScatterChart methods={dataset.methods} activeKey={activeMethod} onSelect={setActiveMethod} />
            </div>

            <MethodDetail method={method} />
          </div>
        </div>

        <div className="reveal" style={{ marginBottom: 20 }}>
          <Accordion
            title={`Key takeaways — ${dataset.tab}`}
            subtitle={showFindings ? undefined : 'Click to expand the summary'}
            color="#00A882"
            open={showFindings}
            onToggle={() => setShowFindings((v) => !v)}
          >
            <ol style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {dataset.findings.map((f, i) => (
                <li key={i} style={{ fontSize: 13.5, color: '#4A5568', lineHeight: 1.65, fontWeight: 300 }}>{f}</li>
              ))}
            </ol>
          </Accordion>
        </div>

        <div className="reveal" style={{
          background: 'linear-gradient(135deg,rgba(0,168,130,0.04) 0%,rgba(67,97,238,0.04) 100%)',
          border: '1.5px solid #E2E8F0', borderRadius: 16, padding: '22px 26px',
        }}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: '#00A882', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>
            Across all three datasets
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16 }}>
            {CROSS_DATASET.map((c) => (
              <div key={c.label} style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12, padding: '16px 18px' }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: '#0D1520', marginBottom: 10 }}>{c.label} <span style={{ color: '#8FA3B1', fontWeight: 400 }}>(n={c.n})</span></div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 700, color: '#00A882' }}>{c.gap}</span>
                  <span style={{ fontSize: 11.5, color: '#8FA3B1' }}>CR gap vs. no clinical input</span>
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12.5, color: '#4A5568', lineHeight: 1.6, fontWeight: 300, marginTop: 16, marginBottom: 0 }}>
            Across a public benchmark, a public symptom survey, and a real hospital registry, turning off clinical guidance
            consistently produced a less medically sensible variable set &mdash; by a margin of +0.30 to +0.55. This is what
            gives us confidence the advantage isn&#8217;t a fluke of any one dataset.
          </p>
        </div>

      </div>

      <style>{`
        @media (max-width: 760px) {
          #sage-results .results-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
