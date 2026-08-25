import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/shop');
    } catch (err) {
      setError(err.response?.data?.error || 'สมัครสมาชิกไม่สำเร็จ');
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
        <div className="eyebrow">เริ่มต้นใช้งาน</div>
        <h1 style={{ fontSize: 30, marginTop: 8, marginBottom: 26 }}>สมัครสมาชิก</h1>

        <label style={styles.label}>ชื่อ</label>
        <input style={styles.input} required value={name} onChange={(e) => setName(e.target.value)} />

        <label style={styles.label}>อีเมล</label>
        <input style={styles.input} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />

        <label style={styles.label}>รหัสผ่าน (อย่างน้อย 6 ตัวอักษร)</label>
        <input style={styles.input} type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />

        {error && <p style={styles.error}>{error}</p>}

        <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
          {loading ? 'กำลังสมัคร...' : 'สมัครสมาชิก'}
        </button>

        <p style={styles.footer}>
          มีบัญชีอยู่แล้ว? <Link to="/login" style={{ color: 'var(--copper)', fontWeight: 600 }}>เข้าสู่ระบบ</Link>
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
