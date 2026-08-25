import { useEffect, useState } from 'react';
import API from '../services/api';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [editingId, setEditingId] = useState(null);

  const fetchData = async () => {
    try {
      const [resProd, resCat] = await Promise.all([
        API.get('/products'),
        API.get('/categories')
      ]);
      setProducts(resProd.data);
      setCategories(resCat.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resetForm = () => {
    setName('');
    setPrice('');
    setStock('');
    setCategoryId('');
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name,
      price: Number(price),
      stock: Number(stock),
      category_id: categoryId ? Number(categoryId) : null
    };

    try {
      if (editingId) {
        await API.put(`/products/${editingId}`, payload);
      } else {
        await API.post('/products', payload);
      }
      resetForm();
      fetchData();
    } catch (err) {
      alert('บันทึกข้อมูลไม่สำเร็จ');
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setName(product.name);
    setPrice(product.price);
    setStock(product.stock);
    setCategoryId(product.category_id || '');
  };

  const handleDelete = async (id) => {
    if (confirm('ยืนยันการลบสินค้านี้?')) {
      try {
        await API.delete(`/products/${id}`);
        fetchData();
      } catch (err) {
        alert('ลบข้อมูลไม่สำเร็จ');
      }
    }
  };

  return (
    <div>
      <h2>จัดการสินค้า</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          placeholder="ชื่อสินค้า"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="ราคา"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          placeholder="จำนวนสต็อก"
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          <option value="">-- เลือกหมวดหมู่ --</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <button type="submit">{editingId ? 'อัปเดต' : 'เพิ่มสินค้า'}</button>
        {editingId && <button type="button" onClick={resetForm}>ยกเลิก</button>}
      </form>

      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>ID</th>
            <th>ชื่อสินค้า</th>
            <th>ราคา</th>
            <th>สต็อก</th>
            <th>หมวดหมู่</th>
            <th>จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.price} บาท</td>
              <td>{p.stock}</td>
              <td>{p.category_name || '-'}</td>
              <td>
                <button onClick={() => handleEdit(p)}>แก้ไข</button>
                <button onClick={() => handleDelete(p.id)} style={{ marginLeft: '5px', color: 'red' }}>ลบ</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}