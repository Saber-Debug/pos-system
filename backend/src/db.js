import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// สร้าง Connection Pool สำหรับ MySQL ใน XAMPP
export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ember_roastery',
  multipleStatements: true,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const query = async (text, params) => {
  let mysqlText = text;
  if (params && params.length > 0) {
    mysqlText = text.replace(/\$[0-9]+/g, () => '?');
  }
  const [rows] = await pool.query(mysqlText, params);
  return { rows };
};