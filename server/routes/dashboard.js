const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/summary', async (req, res) => {
  try {
    const [[{ total_sales }]] = await db.query('SELECT COALESCE(SUM(total_amount), 0) AS total_sales FROM orders');
    const [[{ total_orders }]] = await db.query('SELECT COUNT(*) AS total_orders FROM orders');
    const [[{ total_products }]] = await db.query('SELECT COUNT(*) AS total_products FROM products');
    const [low_stock] = await db.query('SELECT * FROM products WHERE stock <= 5 ORDER BY stock ASC');

    res.json({
      total_sales,
      total_orders,
      total_products,
      low_stock_count: low_stock.length,
      low_stock_items: low_stock
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;