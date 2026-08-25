import { useEffect, useState } from 'react';
import API from '../services/api';

const [products, setProducts] = useState([]);

const fetchProducts = async () => {
  try {
    const res = await API.get('/products');
    setProducts(res.data);
  } catch (err) {
    console.error('Error fetching products:', err);
  }
};

useEffect(() => {
  fetchProducts();
}, []);

const handleAddProduct = async (formData) => {
  
  try {
    await API.post('/products', formData);
    alert('เพิ่มสินค้าสำเร็จ!');
    fetchProducts(); 
  } catch (err) {
    alert('เกิดข้อผิดพลาดในการเพิ่มสินค้า');
  }
};

const handleDelete = async (id) => {
  if (confirm('คุณต้องการลบสินค้านี้ใช่หรือไม่?')) {
    try {
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      alert('ลบไม่สำเร็จ');
    }
  }
};