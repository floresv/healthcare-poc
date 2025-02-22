"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AiFillHome, AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import CartSummary from "../app/components/cart/CartSummary";
import { CartItem } from "@/types/cart";


export default function NavBar() {
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const toggleCart = () => {
    setShowCart((prev) => !prev);
  };

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="flex items-center justify-between relative">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold">17 Tech FoodApp</h1>
        <Link href="/" className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
          <AiFillHome size={24} />
          <span className="hidden md:inline">Home</span>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/profile" className="hover:text-blue-600 transition-colors">
          <AiOutlineUser size={24} />
        </Link>
        <button
          onClick={toggleCart}
          className="relative hover:text-blue-600 transition-colors"
          aria-label="Toggle Cart"
        >
          <AiOutlineShoppingCart size={24} />
          {totalQuantity > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {totalQuantity}
            </span>
          )}
        </button>
      </div>
      <CartSummary cart={cart} setCart={setCart} showCart={showCart} toggleCart={toggleCart} />
    </nav>
  );
}