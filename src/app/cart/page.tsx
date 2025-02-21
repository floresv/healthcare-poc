"use client";

import { useState, useEffect } from "react";
import CartSummary from "../components/cart/CartSummary";

interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export default function Page() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const toggleCart = () => setShowCart(!showCart);

  return (
    <div className="relative p-6">
      <CartSummary cart={cart} setCart={setCart} showCart={showCart} toggleCart={toggleCart} />
    </div>
  );
}