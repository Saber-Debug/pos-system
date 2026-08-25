import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import client from '../api/client';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(null);

  const refresh = useCallback(async () => {
    if (!user) return setItems([]);
    try {
      const { data } = await client.get('/cart');
      setItems(data.items);
    } catch {
      setItems([]);
    }
  }, [user]);

  useEffect(() => { refresh(); }, [refresh]);

  const addItem = useCallback(async (product, quantity = 1) => {
    if (!user) throw new Error('NEEDS_LOGIN');
    await client.post('/cart/items', { productId: product.id, quantity });
    setJustAdded(product.id);
    setTimeout(() => setJustAdded(null), 1200);
    await refresh();
    setIsOpen(true);
  }, [user, refresh]);

  const updateQuantity = useCallback(async (itemId, quantity) => {
    await client.patch(`/cart/items/${itemId}`, { quantity });
    await refresh();
  }, [refresh]);

  const removeItem = useCallback(async (itemId) => {
    await client.delete(`/cart/items/${itemId}`);
    await refresh();
  }, [refresh]);

  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalCents = items.reduce((sum, i) => sum + i.quantity * i.price_cents, 0);

  return (
    <CartContext.Provider
      value={{ items, count, totalCents, isOpen, setIsOpen, addItem, updateQuantity, removeItem, refresh, justAdded }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
