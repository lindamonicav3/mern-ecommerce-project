import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = product => {
    const existing = cart.find(item => item._id === product._id);

    if (existing) {
      if (existing.quantity + product.quantity > product.stock) {
        toast.error('Not enough stock available');
        return;
      }

      setCart(
        cart.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        )
      );
    } else {
      if (product.quantity > product.stock) {
        toast.error('Not enough stock available');
        return;
      }

      setCart([...cart, product]);
    }
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(
        cart.map(item => (item._id === id ? { ...item, quantity } : item))
      );
    }
  };

  const removeFromCart = id => {
    setCart(cart.filter(item => item._id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
