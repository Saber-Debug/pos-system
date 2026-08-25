import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatBaht } from '../utils/format';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, totalCents } = useCart();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            style={styles.overlay}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            style={styles.drawer}
          >
            <div style={styles.header}>
              <h3 style={{ fontSize: 20 }}>ตะกร้าของคุณ</h3>
              <button onClick={() => setIsOpen(false)} aria-label="ปิดตะกร้า" style={styles.closeBtn}>✕</button>
            </div>

            {items.length === 0 ? (
              <div style={styles.empty}>
                <p style={{ opacity: 0.6 }}>ยังไม่มีสินค้าในตะกร้า</p>
                <button className="btn btn-ghost" onClick={() => { setIsOpen(false); navigate('/shop'); }}>
                  เลือกซื้อกาแฟ
                </button>
              </div>
            ) : (
              <>
                <div style={styles.list}>
                  {items.map((item) => (
                    <div key={item.item_id} style={styles.item}>
                      <img src={item.image_url} alt={item.name} style={styles.thumb} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: 14.5 }}>{item.name}</div>
                        <div className="mono" style={{ fontSize: 12, opacity: 0.6, margin: '4px 0' }}>
                          {formatBaht(item.price_cents)}
                        </div>
                        <div style={styles.qtyRow}>
                          <button style={styles.qtyBtn} onClick={() => updateQuantity(item.item_id, item.quantity - 1)}>−</button>
                          <span className="mono" style={{ fontSize: 13, width: 20, textAlign: 'center' }}>{item.quantity}</span>
                          <button style={styles.qtyBtn} onClick={() => updateQuantity(item.item_id, item.quantity + 1)}>+</button>
                          <button style={styles.removeBtn} onClick={() => removeItem(item.item_id)}>ลบ</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={styles.footer}>
                  <div style={styles.totalRow}>
                    <span>ยอดรวม</span>
                    <span className="mono" style={{ fontSize: 18 }}>{formatBaht(totalCents)}</span>
                  </div>
                  <button
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                    onClick={() => { setIsOpen(false); navigate('/checkout'); }}
                  >
                    ไปชำระเงิน
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

const styles = {
  overlay: { position: 'fixed', inset: 0, background: 'rgba(27,23,18,0.45)', zIndex: 50 },
  drawer: {
    position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(420px, 100vw)',
    background: 'var(--parchment)', zIndex: 51, display: 'flex', flexDirection: 'column',
    boxShadow: '-20px 0 50px rgba(0,0,0,0.2)',
  },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '22px 24px', borderBottom: '1px solid rgba(27,23,18,0.1)' },
  closeBtn: { fontSize: 16, padding: 6 },
  empty: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 },
  list: { flex: 1, overflowY: 'auto', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 18 },
  item: { display: 'flex', gap: 12 },
  thumb: { width: 64, height: 64, borderRadius: 8, objectFit: 'cover', flexShrink: 0 },
  qtyRow: { display: 'flex', alignItems: 'center', gap: 8 },
  qtyBtn: { width: 24, height: 24, borderRadius: 6, background: 'rgba(27,23,18,0.08)', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  removeBtn: { fontSize: 11.5, opacity: 0.55, marginLeft: 'auto', textDecoration: 'underline' },
  footer: { padding: '20px 24px 26px', borderTop: '1px solid rgba(27,23,18,0.1)', display: 'flex', flexDirection: 'column', gap: 14 },
  totalRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 600 },
};
