import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import client from '../api/client';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatBaht, roastLabel, processLabel, formatRoastDate } from '../utils/format';

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [status, setStatus] = useState('idle');
  const { addItem } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setProduct(null);
    client.get(`/products/${slug}`).then(({ data }) => setProduct(data)).catch(() => setProduct(false));
  }, [slug]);

  if (product === false) {
    return <div className="wrap" style={{ padding: '80px 0', textAlign: 'center' }}>ไม่พบสินค้านี้</div>;
  }
  if (!product) {
    return <div className="wrap" style={{ padding: '80px 0', textAlign: 'center', opacity: 0.5 }}>กำลังโหลด...</div>;
  }

  const handleAdd = async () => {
    if (!user) return navigate('/login');
    setStatus('adding');
    await addItem(product, qty);
    setStatus('added');
    setTimeout(() => setStatus('idle'), 1500);
  };

  return (
    <div className="wrap" style={{ paddingTop: 44, paddingBottom: 90 }}>
      <Link to="/shop" style={{ fontSize: 13, opacity: 0.6 }}>← กลับไปร้านค้า</Link>

      <div className="pd-layout" style={styles.layout}>
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} style={styles.imageWrap}>
          <img src={product.image_url} alt={product.name} style={styles.image} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <div className="eyebrow">{product.origin_country} · {product.origin_region} · {product.altitude_m}m</div>
          <h1 style={styles.title}>{product.name}</h1>
          <p style={styles.desc}>{product.description}</p>

          <div style={styles.notesRow}>
            {product.tasting_notes.map((n) => <span key={n} style={styles.noteTag}>{n}</span>)}
          </div>

          <div className="lot-ticket" style={{ transform: 'none', display: 'inline-block', marginTop: 22 }}>
            <div className="row"><span className="label">LOT</span><span>{product.lot_number}</span></div>
            <div className="row"><span className="label">ROAST DATE</span><span>{formatRoastDate(product.roast_date)}</span></div>
            <div className="row"><span className="label">LEVEL</span><span>{roastLabel[product.roast_level]}</span></div>
            <div className="row"><span className="label">PROCESS</span><span>{processLabel[product.process]}</span></div>
            <div className="row"><span className="label">WEIGHT</span><span>{product.weight_grams}g</span></div>
          </div>

          <div style={styles.buyRow}>
            <span style={styles.price}>{formatBaht(product.price_cents)}</span>
            <div style={styles.qtyBox}>
              <button style={styles.qtyBtn} onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
              <span className="mono" style={{ width: 24, textAlign: 'center' }}>{qty}</span>
              <button style={styles.qtyBtn} onClick={() => setQty((q) => q + 1)}>+</button>
            </div>
            <button className="btn btn-primary" onClick={handleAdd} disabled={status === 'adding' || product.stock === 0}>
              {product.stock === 0 ? 'สินค้าหมด' : status === 'added' ? '✓ เพิ่มลงตะกร้าแล้ว' : 'เพิ่มลงตะกร้า'}
            </button>
          </div>
          {product.stock > 0 && product.stock <= 15 && (
            <p style={{ fontSize: 12.5, color: 'var(--ember)', marginTop: 10 }}>เหลือเพียง {product.stock} ถุงในล็อตนี้</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}

const styles = {
  layout: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, marginTop: 24, alignItems: 'start' },
  imageWrap: { borderRadius: 18, overflow: 'hidden', aspectRatio: '1 / 1' },
  image: { width: '100%', height: '100%', objectFit: 'cover' },
  title: { fontSize: 36, marginTop: 12 },
  desc: { fontSize: 15.5, opacity: 0.75, marginTop: 16, lineHeight: 1.7 },
  notesRow: { display: 'flex', gap: 8, marginTop: 18, flexWrap: 'wrap' },
  noteTag: { fontSize: 12.5, padding: '5px 12px', borderRadius: 16, background: 'rgba(68,89,64,0.12)', color: 'var(--moss)', fontWeight: 600 },
  buyRow: { display: 'flex', alignItems: 'center', gap: 18, marginTop: 30, flexWrap: 'wrap' },
  price: { fontFamily: 'var(--font-mono)', fontSize: 24 },
  qtyBox: { display: 'flex', alignItems: 'center', gap: 12, border: '1.5px solid rgba(27,23,18,0.15)', borderRadius: 8, padding: '6px 12px' },
  qtyBtn: { fontSize: 16, width: 20 },
};
