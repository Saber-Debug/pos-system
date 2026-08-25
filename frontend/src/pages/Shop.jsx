import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import client from '../api/client';
import ProductCard from '../components/ProductCard';
import { roastLabel } from '../utils/format';

const ROASTS = ['all', 'light', 'medium', 'dark'];

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [roast, setRoast] = useState('all');
  const [sort, setSort] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (roast !== 'all') params.roast = roast;
    if (sort) params.sort = sort;
    client.get('/products', { params }).then(({ data }) => {
      setProducts(data);
      setLoading(false);
    });
  }, [roast, sort]);

  return (
    <div className="wrap" style={{ paddingTop: 48, paddingBottom: 80 }}>
      <div style={styles.head}>
        <div>
          <div className="eyebrow">ร้านค้า</div>
          <h1 style={{ fontSize: 34, marginTop: 8 }}>เมล็ดกาแฟทั้งหมด</h1>
        </div>
        <select value={sort} onChange={(e) => setSort(e.target.value)} style={styles.select} className="mono">
          <option value="">เรียงตาม: แนะนำ</option>
          <option value="price_asc">ราคา: น้อย → มาก</option>
          <option value="price_desc">ราคา: มาก → น้อย</option>
          <option value="newest">คั่วล่าสุด</option>
        </select>
      </div>

      <div style={styles.filterRow}>
        {ROASTS.map((r) => (
          <button
            key={r}
            onClick={() => setRoast(r)}
            style={{ 
              ...styles.filterBtn, 
              ...(roast === r ? styles.filterBtnActive : styles.filterBtnInactive) 
            }}
          >
            {r === 'all' ? 'ทั้งหมด' : roastLabel[r]}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={styles.loading}>กำลังคั่ว...</div>
      ) : products.length === 0 ? (
        <div style={styles.loading}>ไม่พบสินค้าในหมวดนี้</div>
      ) : (
        <motion.div layout className="product-grid" style={styles.grid}>
          {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </motion.div>
      )}
    </div>
  );
}

const styles = {
  head: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 28 },
  select: { padding: '10px 14px', borderRadius: 8, border: '1.5px solid rgba(27,23,18,0.15)', background: '#f6f1e6', fontSize: 13 },
  filterRow: { display: 'flex', gap: 10, marginBottom: 36, flexWrap: 'wrap' },
  filterBtn: { padding: '8px 18px', borderRadius: 20, fontSize: 13.5, transition: 'all 0.2s ease' },
  filterBtnInactive: { background: 'transparent', border: '1.5px solid rgba(27,23,18,0.18)', color: 'inherit' },
  filterBtnActive: { background: 'var(--ink)', border: '1.5px solid var(--ink)', color: 'var(--cream-text)' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 },
  loading: { padding: '80px 0', textAlign: 'center', opacity: 0.5, fontFamily: 'var(--font-mono)' },
};