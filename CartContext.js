import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(product, amount) {
    const itemInCart = cartItems.find((item) => item.id === product.id);

    if (itemInCart) {
      const newItems = cartItems.map((item) => {
        if (item.id === product.id) {
          return { ...item, amount: item.amount + amount };
        }

        return item;
      });

      setCartItems(newItems);
    } else {
      setCartItems([...cartItems, { ...product, amount }]);
    }
  }

  function removeFromCart(productId) {
    const newItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(newItems);
  }

  function changeAmount(productId, difference) {
    const newItems = cartItems.map((item) => {
      if (item.id === productId) {
        return { ...item, amount: Math.max(1, item.amount + difference) };
      }

      return item;
    });

    setCartItems(newItems);
  }

  function clearCart() {
    setCartItems([]);
  }

  const cartCount = cartItems.reduce((total, item) => total + item.amount, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.amount, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        changeAmount,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
