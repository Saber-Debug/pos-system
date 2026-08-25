const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
  try {
    const sql = `
      SELECT p.*, c.name AS category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      ORDER BY p.id DESC
    `;
    const [rows] = await db.query(sql);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { name, price, stock, category_id } = req.body;
  if (!name || price === undefined || stock === undefined) {
    return res.status(400).json({ message: 'Name, price, and stock are required' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO products (name, price, stock, category_id) VALUES (?, ?, ?, ?)',
      [name, price, stock, category_id || null]
    );
    res.status(201).json({ id: result.insertId, name, price, stock, category_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, stock, category_id } = req.body;
  try {
    await db.query(
      'UPDATE products SET name = ?, price = ?, stock = ?, category_id = ? WHERE id = ?',
      [name, price, stock, category_id || null, id]
    );
    res.json({ message: 'Product updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM products WHERE id = ?', [id]);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;