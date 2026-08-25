import { useEffect, useState } from 'react';
import API from '../services/api';
import Cart from '../components/Cart';
import ProductCard from '../components/ProductCard';

export default function PosPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [receivedAmount, setReceivedAmount] = useState('');

  const fetchProducts = async () => {
    try {
      const res = await API.get('/products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    if (product.stock <= 0) {
      alert('สินค้าหมดสต็อก');
      return;
    }

    const exist = cart.find((item) => item.id === product.id);
    if (exist) {
      if (exist.quantity >= product.stock) {
        alert('จำนวนในตะกร้าเกินสต็อกที่มี');
        return;
      }
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, delta) => {
    setCart(
      cart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    const cash = Number(receivedAmount);
    if (cart.length === 0) {
      alert('กรุณาเลือกสินค้าใส่ตะกร้า');
      return;
    }
    if (cash < totalAmount) {
      alert('จำนวนเงินที่รับมาไม่พอ');
      return;
    }

    try {
      const payload = {
        items: cart,
        received_amount: cash,
        payment_type: 'cash'
      };

      const res = await API.post('/orders/checkout', payload);
      alert(`ชำระเงินสำเร็จ!\nเงินทอน: ${res.data.change_amount} บาท`);
      setCart([]);
      setReceivedAmount('');
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || 'ชำระเงินไม่สำเร็จ');
    }
  };

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <div style={{ flex: 2 }}>
        <h2>รายการสินค้า</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '15px' }}>
          {products.map((p) => (
            <ProductCard key={p.id} product={p} addToCart={addToCart} />
          ))}
        </div>
      </div>

      <Cart
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        receivedAmount={receivedAmount}
        setReceivedAmount={setReceivedAmount}
        totalAmount={totalAmount}
        handleCheckout={handleCheckout}
      />
    </div>
  );
}