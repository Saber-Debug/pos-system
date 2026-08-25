import { Router } from 'express';
import { query, pool } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth);

router.post('/', async (req, res) => {
  const { shippingName, shippingAddress, shippingPhone } = req.body;
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [cartRows] = await connection.query('SELECT id FROM carts WHERE user_id = ?', [req.userId]);
    if (!cartRows.length) throw new Error('ไม่พบตะกร้าสินค้า');
    const cartId = cartRows[0].id;

    const [itemRows] = await connection.query(
      `SELECT ci.quantity, p.id AS product_id, p.name, p.price_cents, p.stock
       FROM cart_items ci JOIN products p ON p.id = ci.product_id
       WHERE ci.cart_id = ?`,
      [cartId]
    );

    if (!itemRows.length) {
      await connection.rollback();
      return res.status(400).json({ error: 'ตะกร้าว่าง ไม่สามารถสั่งซื้อได้' });
    }

    for (const item of itemRows) {
      if (item.quantity > item.stock) {
        await connection.rollback();
        return res.status(409).json({ error: `${item.name} มีสินค้าคงเหลือไม่พอ` });
      }
    }

    const total = itemRows.reduce((sum, i) => sum + i.price_cents * i.quantity, 0);

    const [orderResult] = await connection.query(
      `INSERT INTO orders (user_id, total_cents, shipping_name, shipping_address, shipping_phone)
       VALUES (?, ?, ?, ?, ?)`,
      [req.userId, total, shippingName, shippingAddress, shippingPhone]
    );
    const orderId = orderResult.insertId;

    for (const item of itemRows) {
      await connection.query(
        `INSERT INTO order_items (order_id, product_id, product_name, unit_price_cents, quantity)
         VALUES (?, ?, ?, ?, ?)`,
        [orderId, item.product_id, item.name, item.price_cents, item.quantity]
      );
      await connection.query('UPDATE products SET stock = stock - ? WHERE id = ?', [item.quantity, item.product_id]);
    }

    await connection.query('DELETE FROM cart_items WHERE cart_id = ?', [cartId]);
    await connection.commit();

    const [newOrderRows] = await connection.query('SELECT created_at FROM orders WHERE id = ?', [orderId]);
    res.status(201).json({ orderId, total, createdAt: newOrderRows[0].created_at });
  } catch (err) {
    await connection.rollback();
    console.error(err);
    res.status(500).json({ error: 'สั่งซื้อไม่สำเร็จ ลองใหม่อีกครั้ง' });
  } finally {
    connection.release();
  }
});

router.get('/', async (req, res) => {
  try {
    const [rows] = await query(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
      [req.userId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'โหลดประวัติการสั่งซื้อไม่สำเร็จ' });
  }
});

export default router;