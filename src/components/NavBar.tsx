"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AiFillHome, AiOutlineUser, AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai";

interface CartItem {
  id: number;
  name: string;
}

export default function NavBar() {
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const toggleCart = () => {
    setShowCart((prev) => !prev);
  };

  // Remove cart item by index and update localStorage
  const removeCartItem = (index: number) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

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
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cart.length}
            </span>
          )}
        </button>
      </div>
      {showCart && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-white border rounded shadow-lg p-4 z-10">
          {cart.length > 0 ? (
            <>
              <ul className="mb-4">
                {cart.map((item, index) => (
                  <li key={item.id} className="flex justify-between items-center py-1 border-b last:border-0 text-black">
                    <div className="flex items-center space-x-2">
                      <AiOutlineShoppingCart size={20} />
                      <span className="text-black">{item.name}</span>
                    </div>
                    <button
                      onClick={() => removeCartItem(index)}
                      aria-label="Remove item"
                      className="hover:text-red-600"
                    >
                      <AiOutlineClose size={16} />
                    </button>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => {
                  // Clear cart
                  setCart([]);
                  localStorage.setItem("cart", "[]");
                  setShowCart(false);
                  alert("Order placed successfully!");
                }}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
              >
                Place Order
              </button>
            </>
          ) : (
            <p className="text-gray-700">Your cart is empty.</p>
          )}
        </div>
      )}
    </nav>
  );
} 