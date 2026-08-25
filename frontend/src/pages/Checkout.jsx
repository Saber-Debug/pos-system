import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import client from '../api/client';
import { useCart } from '../context/CartContext';
import { formatBaht } from '../utils/format';

export default function Checkout() {
  const { items, totalCents, refresh } = useCart();
  const [form, setForm] = useState({ shippingName: '', shippingAddress: '', shippingPhone: '' });
  const [placing, setPlacing] = useState(false);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setPlacing(true);
    try {
      const { data } = await client.post('/orders', form);
      setOrder(data);
      await refresh();
    } catch (err) {
      setError(err.response?.data?.error || 'สั่งซื้อไม่สำเร็จ');
    } finally {
      setPlacing(false);
    }
  };

  if (order) {
    return (
      <div className="wrap" style={{ padding: '100px 20px', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
          <div style={styles.successCircle}>✓</div>
          <h1 style={{ fontSize: 28, marginTop: 24 }}>สั่งซื้อสำเร็จแล้ว</h1>
          <p style={{ opacity: 0.7, marginTop: 10 }}>หมายเลขคำสั่งซื้อ <span className="mono">#{order.orderId}</span></p>
          <p className="mono" style={{ fontSize: 20, marginTop: 16 }}>{formatBaht(order.total)}</p>
          <button className="btn btn-primary" style={{ marginTop: 30 }} onClick={() => navigate('/shop')}>
            เลือกซื้อกาแฟต่อ
          </button>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="wrap" style={{ padding: '100px 20px', textAlign: 'center' }}>
        <p style={{ opacity: 0.6 }}>ตะกร้าว่างเปล่า</p>
        <button className="btn btn-ghost" style={{ marginTop: 18 }} onClick={() => navigate('/shop')}>เลือกซื้อกาแฟ</button>
      </div>
    );
  }

  return (
    <div className="wrap" style={{ paddingTop: 48, paddingBottom: 90 }}>
      <h1 style={{ fontSize: 30, marginBottom: 36 }}>ชำระเงิน</h1>
      <div className="checkout-layout" style={styles.layout}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>ชื่อผู้รับ</label>
          <input name="shippingName" style={styles.input} required onChange={handleChange} value={form.shippingName} />

          <label style={styles.label}>ที่อยู่จัดส่ง</label>
          <textarea name="shippingAddress" style={{ ...styles.input, minHeight: 90, resize: 'vertical' }} required onChange={handleChange} value={form.shippingAddress} />

          <label style={styles.label}>เบอร์โทรศัพท์</label>
          <input name="shippingPhone" style={styles.input} required onChange={handleChange} value={form.shippingPhone} />

          <AnimatePresence>
            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ color: 'var(--ember)', fontSize: 13, marginTop: 14 }}>
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <button className="btn btn-primary" type="submit" disabled={placing} style={{ width: '100%', justifyContent: 'center', marginTop: 24 }}>
            {placing ? 'กำลังดำเนินการ...' : `ยืนยันสั่งซื้อ · ${formatBaht(totalCents)}`}
          </button>
          <p style={{ fontSize: 11.5, opacity: 0.5, marginTop: 10, textAlign: 'center' }}>
            หมายเหตุ: นี่เป็นระบบสาธิต ไม่มีการเรียกเก็บเงินจริง
          </p>
        </form>

        <div style={styles.summary}>
          <h3 style={{ fontSize: 16, marginBottom: 16 }}>สรุปคำสั่งซื้อ</h3>
          {items.map((item) => (
            <div key={item.item_id} style={styles.summaryRow}>
              <span>{item.name} × {item.quantity}</span>
              <span className="mono">{formatBaht(item.price_cents * item.quantity)}</span>
            </div>
          ))}
          <div style={{ ...styles.summaryRow, borderTop: '1px solid rgba(27,23,18,0.12)', marginTop: 12, paddingTop: 14, fontWeight: 700 }}>
            <span>ยอดรวม</span>
            <span className="mono">{formatBaht(totalCents)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  layout: { display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 40, alignItems: 'start' },
  form: { background: '#f6f1e6', border: '1px solid rgba(27,23,18,0.08)', borderRadius: 16, padding: 32 },
  label: { display: 'block', fontSize: 12.5, fontWeight: 600, marginTop: 16, marginBottom: 6, opacity: 0.75 },
  input: { width: '100%', padding: '11px 14px', borderRadius: 8, border: '1.5px solid rgba(27,23,18,0.15)', fontSize: 14.5, background: '#fff', fontFamily: 'inherit' },
  summary: { background: 'var(--ink)', color: 'var(--cream-text)', borderRadius: 16, padding: 28 },
  summaryRow: { display: 'flex', justifyContent: 'space-between', fontSize: 13.5, opacity: 0.85, padding: '6px 0' },
  successCircle: { width: 68, height: 68, borderRadius: '50%', background: 'var(--moss)', color: '#fff', fontSize: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' },
};
