export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div className="wrap" style={styles.inner}>
        <div>
          <div style={styles.brand}>◐ EMBER</div>
          <p style={styles.tagline}>คั่วสดทุกล็อต ส่งตรงจากโรงคั่วถึงแก้วของคุณ</p>
        </div>
        <div className="mono" style={styles.meta}>
          <span>โรงคั่ว: กรุงเทพฯ · เปิดคั่วทุกวันอังคาร</span>
          <span>© {new Date().getFullYear()} Ember Roastery Co.</span>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: 'var(--ink)',
    color: 'var(--cream-text)',
    marginTop: 100,
    padding: '48px 0',
  },
  inner: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 24,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  brand: { fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700 },
  tagline: { opacity: 0.65, marginTop: 6, fontSize: 14 },
  meta: { display: 'flex', flexDirection: 'column', gap: 4, fontSize: 11.5, opacity: 0.55, textAlign: 'right' },
};
