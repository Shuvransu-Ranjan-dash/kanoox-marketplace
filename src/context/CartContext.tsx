"use client";

import React, { createContext, useContext } from "react";

const CartContext = createContext<any>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function useCart() {
  return {
    cart: [],
    addToCart: () => {},
    removeFromCart: () => {},
    updateQuantity: () => {},
    clearCart: () => {},
    totalItems: 0,
    subtotal: 0,
    isCartOpen: false,
    setIsCartOpen: (_open?: boolean) => {},
  };
}
