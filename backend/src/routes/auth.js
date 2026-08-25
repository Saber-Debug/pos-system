import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../db.js';

const router = Router();

function signToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password || password.length < 6) {
    return res.status(400).json({ error: 'กรอกชื่อ อีเมล และรหัสผ่าน (อย่างน้อย 6 ตัวอักษร)' });
  }

  try {
    const existing = await query('SELECT id FROM users WHERE email = $1', [email.toLowerCase()]);
    if (existing.rows.length) {
      return res.status(409).json({ error: 'อีเมลนี้ถูกใช้งานแล้ว' });
    }

    const hash = await bcrypt.hash(password, 10);
    const result = await query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3)',
      [name, email.toLowerCase(), hash]
    );
    
    const userId = result.rows.insertId || result.insertId;

    const cart = await query('INSERT INTO carts (user_id) VALUES ($1)', [userId]);
    const cartId = cart.rows.insertId || cart.insertId;

    const user = { id: userId, name, email: email.toLowerCase() };

    res.status(201).json({ token: signToken(userId), user, cartId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'สมัครสมาชิกไม่สำเร็จ ลองใหม่อีกครั้ง' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'กรอกอีเมลและรหัสผ่าน' });
  }

  try {
    const result = await query('SELECT * FROM users WHERE email = $1', [email.toLowerCase()]);
    const user = result.rows[0];
    
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
    }

    res.json({
      token: signToken(user.id),
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'เข้าสู่ระบบไม่สำเร็จ ลองใหม่อีกครั้ง' });
  }
});

export default router;