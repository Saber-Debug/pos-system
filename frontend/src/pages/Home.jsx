import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import client from '../api/client';
import ProductCard from '../components/ProductCard';
import RoastCurve from '../components/RoastCurve';
import { useReveal } from '../hooks/useReveal';

const ORIGINS = ['เอธิโอเปีย', 'โคลอมเบีย', 'เคนยา', 'บราซิล', 'กัวเตมาลา', 'อินโดนีเซีย', 'คอสตาริกา'];

const PROCESS_STEPS = [
  { n: '01', title: 'เก็บเกี่ยว', desc: 'คัดเก็บเฉพาะผลเชอร์รี่สุกแดงด้วยมือจากไร่พันธมิตร' },
  { n: '02', title: 'แปรรูป', desc: 'ล้าง ตากแห้ง หรือฮันนี่ ตามลักษณะของแต่ละแปลง' },
  { n: '03', title: 'คั่ว', desc: 'คั่วเป็นล็อตเล็กในโรงคั่วของเรา ควบคุมกราฟอุณหภูมิทุกนาที' },
  { n: '04', title: 'พัก', desc: 'ปล่อยให้ก๊าซคาร์บอนไดออกไซด์คลายตัว 5–14 วันก่อนบรรจุ' },
  { n: '05', title: 'ชง', desc: 'บดสดใหม่ก่อนชง เพื่อรสชาติที่สมบูรณ์ที่สุดในแก้วของคุณ' },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    client.get('/products').then(({ data }) => setFeatured(data.filter((p) => p.is_featured).slice(0, 3)));
  }, []);

  useReveal([featured]);

  return (
    <div>
      {/* ---------- Hero ---------- */}
      <section className="wrap hero-grid" style={styles.hero}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>LOT-TRACKED SPECIALTY COFFEE</div>
          <h1 style={styles.h1}>
            คั่วตามกราฟ<br />ไม่ใช่ตามความเคยชิน
          </h1>
          <p style={styles.heroText}>
            ทุกล็อตของเราถูกบันทึกอุณหภูมิตั้งแต่วินาทีแรกจนถึง Second Crack
            เพื่อให้รสชาติในถุงตรงกับที่เราชิมตอนคัพปิ้งทุกครั้ง
          </p>
          <div style={{ display: 'flex', gap: 14, marginTop: 30 }}>
            <Link to="/shop" className="btn btn-primary">เลือกซื้อกาแฟ</Link>
            <a href="#process" className="btn btn-ghost">ดูกระบวนการคั่ว</a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={styles.heroGraphic}
        >
          <RoastCurve />
        </motion.div>
      </section>

      {/* ---------- Origin strip ---------- */}
      <div style={styles.originStrip}>
        <div className="wrap" style={styles.originInner}>
          {[...ORIGINS, ...ORIGINS].map((o, i) => (
            <span key={i} className="mono" style={styles.originItem}>{o}</span>
          ))}
        </div>
      </div>

      {/* ---------- Featured products ---------- */}
      <section className="wrap" style={{ marginTop: 96 }}>
        <div className="reveal" style={styles.sectionHead}>
          <div className="eyebrow">ล็อตประจำสัปดาห์</div>
          <h2 style={styles.h2}>เมล็ดคั่วใหม่ ส่งตรงจากถัง</h2>
        </div>
        <div className="product-grid" style={styles.grid}>
          {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
        <div style={{ textAlign: 'center', marginTop: 36 }}>
          <Link to="/shop" className="btn btn-ghost">ดูสินค้าทั้งหมด</Link>
        </div>
      </section>

      {/* ---------- Process timeline ---------- */}
      <section id="process" className="wrap" style={{ marginTop: 120 }}>
        <div className="reveal" style={styles.sectionHead}>
          <div className="eyebrow">กระบวนการ</div>
          <h2 style={styles.h2}>จากเมล็ดสู่แก้ว</h2>
        </div>
        <div className="process-timeline" style={styles.timeline}>
          {PROCESS_STEPS.map((step) => (
            <div key={step.n} className="reveal" style={styles.step}>
              <span className="mono" style={styles.stepN}>{step.n}</span>
              <h3 style={styles.stepTitle}>{step.title}</h3>
              <p style={styles.stepDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const styles = {
  hero: {
    display: 'grid',
    gridTemplateColumns: '1.1fr 1fr',
    gap: 40,
    alignItems: 'center',
    paddingTop: 64,
    paddingBottom: 40,
  },
  h1: { fontSize: 'clamp(38px, 5vw, 58px)', lineHeight: 1.06 },
  heroText: { fontSize: 16.5, opacity: 0.75, maxWidth: 460, marginTop: 22 },
  heroGraphic: { background: '#f6f1e6', border: '1px solid rgba(27,23,18,0.08)', borderRadius: 18, padding: 20 },
  originStrip: { background: 'var(--ink)', color: 'var(--cream-text)', padding: '16px 0', marginTop: 64, overflow: 'hidden' },
  originInner: { display: 'flex', gap: 40, whiteSpace: 'nowrap' },
  originItem: { fontSize: 12.5, letterSpacing: '0.08em', opacity: 0.75 },
  sectionHead: { textAlign: 'center', marginBottom: 44 },
  h2: { fontSize: 'clamp(26px, 3vw, 36px)', marginTop: 10 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 },
  timeline: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 20, marginBottom: 40 },
  step: { borderTop: '2px solid var(--copper)', paddingTop: 16 },
  stepN: { fontSize: 12, opacity: 0.45 },
  stepTitle: { fontSize: 17, margin: '8px 0 6px', fontFamily: 'var(--font-display)' },
  stepDesc: { fontSize: 13, opacity: 0.7, lineHeight: 1.5 },
};
