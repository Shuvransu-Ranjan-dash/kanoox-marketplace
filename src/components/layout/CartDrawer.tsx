"use client";

import React from "react";
import Image from "next/image";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";
import { formatPrice } from "@/utils/formatPrice";
import Button from "@/components/ui/Button";

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();
  const { currentCountry } = useTheme();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-primary" />
              <h2 className="text-lg font-bold text-content-primary">
                Shopping Cart ({totalItems})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-content-secondary hover:text-content-primary rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 divide-y divide-border">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-brand-light flex items-center justify-center text-brand-primary mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-semibold text-content-primary">
                  Your cart is empty
                </h3>
                <p className="text-sm text-content-secondary max-w-xs mt-1">
                  Explore our featured deals and add authentic tech, appliances & fashion to your cart.
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  className="mt-6"
                  onClick={() => setIsCartOpen(false)}
                >
                  Start Shopping
                </Button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.product.id} className="py-4 flex gap-4">
                  <div className="relative w-20 h-20 rounded-md overflow-hidden bg-gray-50 flex-shrink-0 border border-border">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-sm font-semibold text-content-primary line-clamp-2">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-gray-400 hover:text-red-500 p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-content-secondary mt-0.5">
                        {item.product.categoryName}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-border rounded-md bg-white">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 text-gray-600 rounded-l"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-semibold text-content-primary">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 text-gray-600 rounded-r"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-sm font-bold text-brand-primary">
                        {formatPrice(item.product.price * item.quantity, currentCountry.currency)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Subtotal & Checkout */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-border bg-gray-50/50">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm text-content-secondary">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal, currentCountry.currency)}</span>
                </div>
                <div className="flex justify-between text-sm text-content-secondary">
                  <span>Estimated Delivery</span>
                  <span className="text-emerald-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-base font-bold text-content-primary pt-2 border-t border-border">
                  <span>Total</span>
                  <span className="text-brand-primary">
                    {formatPrice(subtotal, currentCountry.currency)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  onClick={() => {
                    alert("Demo checkout completed! In production this leads to KanooX secure checkout.");
                    setIsCartOpen(false);
                  }}
                >
                  Proceed to Checkout
                </Button>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full text-center text-xs text-content-secondary hover:text-content-primary py-2"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
