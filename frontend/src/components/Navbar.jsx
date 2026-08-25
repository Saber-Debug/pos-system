import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { count, setIsOpen } = useCart();
  const { user, logout } = useAuth();

  return (
    <header style={styles.header}>
      <div className="wrap" style={styles.inner}>
        <Link to="/" style={styles.brand}>
          <span style={styles.brandMark}>◐</span>
          <span>EMBER</span>
        </Link>

        <nav style={styles.nav}>
          <NavLink to="/shop" style={({ isActive }) => ({ ...styles.link, opacity: isActive ? 1 : 0.72 })}>
            ร้านค้า
          </NavLink>
          <NavLink to="/#process" style={styles.link}>
            จากเมล็ดสู่แก้ว
          </NavLink>
        </nav>

        <div style={styles.actions}>
          {user ? (
            <button className="mono" style={styles.userBtn} onClick={logout} title="ออกจากระบบ">
              {user.name.split(' ')[0]} · ออกจากระบบ
            </button>
          ) : (
            <Link to="/login" style={styles.link}>เข้าสู่ระบบ</Link>
          )}

          <button style={styles.cartBtn} onClick={() => setIsOpen(true)} aria-label="เปิดตะกร้าสินค้า">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M3 6h2l2.4 12.2a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L21 8H6" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="10" cy="21" r="1.3" fill="currentColor" stroke="none" />
              <circle cx="17" cy="21" r="1.3" fill="currentColor" stroke="none" />
            </svg>
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                  style={styles.badge}
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </header>
  );
}

const styles = {
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 40,
    background: 'rgba(236, 228, 211, 0.86)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(27,23,18,0.1)',
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 72,
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: 22,
    letterSpacing: '0.02em',
  },
  brandMark: { color: 'var(--copper)', fontSize: 18 },
  nav: { display: 'flex', gap: 28 },
  link: { fontSize: 14.5, fontWeight: 500 },
  actions: { display: 'flex', alignItems: 'center', gap: 22 },
  userBtn: { fontSize: 12.5, opacity: 0.8 },
  cartBtn: { position: 'relative', display: 'flex', padding: 6 },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    background: 'var(--ember)',
    color: 'var(--cream-text)',
    fontFamily: 'var(--font-mono)',
    fontSize: 10.5,
    minWidth: 17,
    height: 17,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 2px',
  },
};
