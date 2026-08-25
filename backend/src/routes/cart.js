import { Router } from 'express';
import { query } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

async function getOrCreateCartId(userId) {
  const existing = await query('SELECT id FROM carts WHERE user_id = $1', [userId]);
  if (existing.rows.length) return existing.rows[0].id;
  const created = await query('INSERT INTO carts (user_id) VALUES ($1)', [userId]);
  return created.rows.insertId || created.insertId;
}

router.use(requireAuth);

router.get('/', async (req, res) => {
  try {
    const cartId = await getOrCreateCartId(req.userId);
    const result = await query(
      `SELECT ci.id AS item_id, ci.quantity, p.*
       FROM cart_items ci
       JOIN products p ON p.id = ci.product_id
       WHERE ci.cart_id = $1
       ORDER BY ci.id`,
      [cartId]
    );
    res.json({ cartId, items: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'โหลดตะกร้าไม่สำเร็จ' });
  }
});

router.post('/items', async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  try {
    const cartId = await getOrCreateCartId(req.userId);
    await query(
      `INSERT INTO cart_items (cart_id, product_id, quantity)
       VALUES ($1, $2, $3)
       ON DUPLICATE KEY UPDATE quantity = quantity + $4`,
      [cartId, productId, quantity, quantity]
    );
    res.status(201).json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'เพิ่มสินค้าลงตะกร้าไม่สำเร็จ' });
  }
});

router.patch('/items/:itemId', async (req, res) => {
  const { quantity } = req.body;
  try {
    if (quantity <= 0) {
      await query('DELETE FROM cart_items WHERE id = $1', [req.params.itemId]);
    } else {
      await query('UPDATE cart_items SET quantity = $1 WHERE id = $2', [quantity, req.params.itemId]);
    }
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'อัปเดตตะกร้าไม่สำเร็จ' });
  }
});

router.delete('/items/:itemId', async (req, res) => {
  try {
    await query('DELETE FROM cart_items WHERE id = $1', [req.params.itemId]);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'ลบสินค้าออกจากตะกร้าไม่สำเร็จ' });
  }
});

export default router;