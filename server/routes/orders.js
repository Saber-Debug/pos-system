const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
  try {
    const [orders] = await db.query(`
      SELECT o.*, u.name as seller_name 
      FROM orders o 
      LEFT JOIN users u ON o.user_id = u.id 
      ORDER BY o.id DESC
    `);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/checkout', async (req, res) => {
  const connection = await db.getConnection();
  try {
    const { items, received_amount, payment_type, user_id } = req.body;
    
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Cart items cannot be empty' });
    }

    await connection.beginTransaction();

    let total_amount = 0;
    for (const item of items) {
      total_amount += item.price * item.quantity;
    }

    const change_amount = received_amount - total_amount;
    if (change_amount < 0) {
      await connection.rollback();
      return res.status(400).json({ message: 'Insufficient cash amount' });
    }

    const order_number = 'ORD-' + Date.now();

    const [orderResult] = await connection.query(
      `INSERT INTO orders (order_number, total_amount, received_amount, change_amount, payment_type, user_id) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [order_number, total_amount, received_amount, change_amount, payment_type || 'cash', user_id || null]
    );

    const orderId = orderResult.insertId;

    for (const item of items) {
      const [productRows] = await connection.query('SELECT stock FROM products WHERE id = ?', [item.id]);
      if (productRows.length === 0 || productRows[0].stock < item.quantity) {
        throw new Error(`Product ID ${item.id} is out of stock`);
      }

      await connection.query(
        `INSERT INTO order_items (order_id, product_id, quantity, unit_price, total_price) 
         VALUES (?, ?, ?, ?, ?)`,
        [orderId, item.id, item.quantity, item.price, item.price * item.quantity]
      );

      await connection.query(
        'UPDATE products SET stock = stock - ? WHERE id = ?',
        [item.quantity, item.id]
      );
    }

    await connection.commit();
    res.status(201).json({ 
      message: 'Checkout successful', 
      order_id: orderId,
      order_number, 
      total_amount, 
      change_amount 
    });

  } catch (err) {
    await connection.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    connection.release();
  }
});

module.exports = router;