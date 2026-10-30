import { createContext, useContext, useMemo, useState } from 'react';
import { products } from '../data/products';
import { usePersistentState } from '../hooks/usePersistentState';
const ShopContext = createContext(null);
const seededOrders = [
  {
    id: 'ORD-20418',
    items: [{ productId: 'b-x40', size: '3-pack', qty: 2 }],
    total: 1380,
    fulfillment: 'pickup',
    pickupVenueId: 'v-kasambagan',
    status: 'Ready for pickup',
    createdAt: '2026-10-20T10:12:00.000Z'
  },
  {
    id: 'ORD-19877',
    items: [{ productId: 'a-tee', size: 'M', qty: 1 }],
    total: 1040,
    fulfillment: 'delivery',
    address: 'Unit 12B, Avida Towers, Cebu IT Park',
    status: 'Completed',
    createdAt: '2026-09-28T08:40:00.000Z'
  }
];
function ShopProvider({ children }) {
  const [cart, setCart] = usePersistentState('cart', []);
  const [orders, setOrders] = useState(seededOrders);
  const value = useMemo(() => {
    const cartTotal = cart.reduce((sum, item) => {
      const p = products.find((x) => x.id === item.productId);
      return sum + (p ? p.price * item.qty : 0);
    }, 0);
    return {
      cart,
      cartCount: cart.reduce((n, i) => n + i.qty, 0),
      cartTotal,
      addToCart: (item) =>
        setCart((c) => {
          const existing = c.find((x) => x.productId === item.productId && x.size === item.size);
          if (existing) return c.map((x) => (x === existing ? { ...x, qty: x.qty + item.qty } : x));
          return [...c, item];
        }),
      updateQty: (productId, size, qty) =>
        setCart((c) =>
          qty <= 0
            ? c.filter((x) => !(x.productId === productId && x.size === size))
            : c.map((x) => (x.productId === productId && x.size === size ? { ...x, qty } : x))
        ),
      clearCart: () => setCart([]),
      orders,
      placeOrder: (order) => setOrders((o) => [order, ...o])
    };
  }, [cart, orders, setCart]);
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}
function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error('useShop must be used inside ShopProvider');
  return ctx;
}
export { ShopProvider, useShop };
