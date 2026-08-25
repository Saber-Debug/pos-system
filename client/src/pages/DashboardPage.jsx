import { useEffect, useState } from 'react';
import API from '../services/api';

export default function DashboardPage() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    API.get('/dashboard/summary')
      .then((res) => setSummary(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!summary) return <div>กำลังโหลดข้อมูล...</div>;

  return (
    <div>
      <h2>ภาพรวมระบบ (Dashboard)</h2>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', flex: 1, backgroundColor: '#e0f2fe' }}>
          <h3>ยอดขายรวมทั้งหมด</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>{summary.total_sales} บาท</p>
        </div>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', flex: 1, backgroundColor: '#dcfce7' }}>
          <h3>จำนวนบิลที่ขายได้</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>{summary.total_orders} รายการ</p>
        </div>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', flex: 1, backgroundColor: '#fef3c7' }}>
          <h3>จำนวนสินค้าในระบบ</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>{summary.total_products} ชนิด</p>
        </div>
      </div>

      <h3>รายการสินค้าสต็อกใกล้หมด (น้อยกว่าหรือเท่ากับ 5 ชิ้น)</h3>
      {summary.low_stock_items.length === 0 ? (
        <p>ไม่มีสินค้าที่สต็อกต่ำกว่าเกณฑ์</p>
      ) : (
        <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr style={{ backgroundColor: '#fee2e2' }}>
              <th>ID</th>
              <th>ชื่อสินค้า</th>
              <th>สต็อกคงเหลือ</th>
            </tr>
          </thead>
          <tbody>
            {summary.low_stock_items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td style={{ color: 'red', fontWeight: 'bold' }}>{item.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}