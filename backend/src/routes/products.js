import { Router } from 'express';
import { query } from '../db.js';

const router = Router();

router.get('/', async (req, res) => {
  const { roast, sort } = req.query;
  const clauses = [];
  const params = [];

  if (roast && ['light', 'medium', 'dark'].includes(roast)) {
    params.push(roast);
    clauses.push(`roast_level = $${params.length}`);
  }

  let sql = 'SELECT * FROM products';
  if (clauses.length) sql += ' WHERE ' + clauses.join(' AND ');

  const sortMap = {
    price_asc: 'price_cents ASC',
    price_desc: 'price_cents DESC',
    newest: 'roast_date DESC',
  };
  sql += ` ORDER BY ${sortMap[sort] || 'is_featured DESC, roast_date DESC'}`;

  try {
    const result = await query(sql, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'โหลดรายการสินค้าไม่สำเร็จ' });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const result = await query('SELECT * FROM products WHERE slug = $1', [req.params.slug]);
    if (!result.rows.length) return res.status(404).json({ error: 'ไม่พบสินค้านี้' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'โหลดข้อมูลสินค้าไม่สำเร็จ' });
  }
});

export default router;