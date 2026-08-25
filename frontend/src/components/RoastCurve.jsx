import { motion } from 'framer-motion';

// The roast curve: a literal graph of bean temperature over time during
// roasting, with "First Crack" / "Second Crack" markers — the hero's
// signature visual, grounded in the actual craft rather than a generic
// gradient blob.
export default function RoastCurve() {
  const pathD = 'M0,210 C60,206 100,190 140,168 C190,140 220,108 260,78 C300,50 340,30 380,10';

  return (
    <svg viewBox="0 0 400 230" width="100%" height="100%" role="img" aria-label="กราฟอุณหภูมิการคั่วกาแฟ">
      <defs>
        <linearGradient id="curveFade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#bd6b33" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#c6491f" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* baseline grid */}
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1="0" x2="400" y1={40 + i * 50} y2={40 + i * 50} stroke="#1b1712" strokeOpacity="0.06" />
      ))}

      {/* the curve itself, drawn on load */}
      <motion.path
        d={pathD}
        fill="none"
        stroke="url(#curveFade)"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* First Crack marker */}
      <motion.g initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.3, duration: 0.5 }}>
        <circle cx="230" cy="95" r="5" fill="#c6491f" />
        <text x="240" y="92" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#1b1712" opacity="0.75">
          FIRST CRACK · 196°C
        </text>
      </motion.g>

      {/* Second Crack marker */}
      <motion.g initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.9, duration: 0.5 }}>
        <circle cx="345" cy="22" r="5" fill="#445940" />
        <text x="270" y="16" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#1b1712" opacity="0.75">
          SECOND CRACK · 224°C
        </text>
      </motion.g>

      {/* drifting ember dot riding the curve, ambient loop */}
      <motion.circle
        r="4.5"
        fill="#e08a4f"
        initial={{ offsetDistance: '0%' }}
        animate={{ offsetDistance: '100%' }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear', delay: 2.4 }}
        style={{ offsetPath: `path('${pathD}')` }}
      />
    </svg>
  );
}
