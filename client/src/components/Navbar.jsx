import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{
      display: 'flex',
      gap: '20px',
      padding: '15px 30px',
      backgroundColor: '#1e293b',
      color: '#fff'
    }}>
      <h2 style={{ margin: 0, paddingRight: '20px' }}>POS System</h2>
      <Link to="/" style={{ color: '#fff', textDecoration: 'none', alignSelf: 'center' }}>
        🛒 แคชเชียร์ (POS)
      </Link>
      <Link to="/products" style={{ color: '#fff', textDecoration: 'none', alignSelf: 'center' }}>
        📦 จัดการสินค้า
      </Link>
      <Link to="/dashboard" style={{ color: '#fff', textDecoration: 'none', alignSelf: 'center' }}>
        📊 แดชบอร์ด
      </Link>
    </nav>
  );
}