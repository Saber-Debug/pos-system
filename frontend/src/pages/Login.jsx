import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/shop');
    } catch (err) {
      setError(err.response?.data?.error || 'เข้าสู่ระบบไม่สำเร็จ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrap" style={{ display: 'flex', justifyContent: 'center', padding: '90px 20px' }}>
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={styles.form}
      >
        <div className="eyebrow">ยินดีต้อนรับกลับ</div>
        <h1 style={{ fontSize: 30, marginTop: 8, marginBottom: 26 }}>เข้าสู่ระบบ</h1>

        <label style={styles.label}>อีเมล</label>
        <input style={styles.input} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />

        <label style={styles.label}>รหัสผ่าน</label>
        <input style={styles.input} type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />

        {error && <p style={styles.error}>{error}</p>}

        <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
          {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
        </button>

        <p style={styles.footer}>
          ยังไม่มีบัญชี? <Link to="/register" style={{ color: 'var(--copper)', fontWeight: 600 }}>สมัครสมาชิก</Link>
        </p>
      </motion.form>
    </div>
  );
}

const styles = {
  form: { width: '100%', maxWidth: 380, background: '#f6f1e6', border: '1px solid rgba(27,23,18,0.08)', borderRadius: 16, padding: 36 },
  label: { display: 'block', fontSize: 12.5, fontWeight: 600, marginTop: 16, marginBottom: 6, opacity: 0.75 },
  input: { width: '100%', padding: '11px 14px', borderRadius: 8, border: '1.5px solid rgba(27,23,18,0.15)', fontSize: 14.5, background: '#fff' },
  error: { color: 'var(--ember)', fontSize: 13, marginTop: 14 },
  footer: { fontSize: 13.5, textAlign: 'center', marginTop: 22, opacity: 0.75 },
};
