'use client';

import { useState, useEffect } from 'react';
import { CartItem } from '@/types/cart';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import CartItemComponent from '../components/cart/CartItem';
import { validateInputs, createOrder } from '@/utils/cartUtils';

export default function OrderPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    document.title = 'Order Details | 17 Tech FoodApp';
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = 'View cart details';
    document.head.appendChild(metaDescription);

    return () => {
      document.head.removeChild(metaDescription);
    };
  }, []);

  const totalPrice = cart.reduce((acc, item) => acc + (item.priceCents / 100) * item.quantity, 0).toFixed(2);

  const incrementQuantity = (index: number) => {
    const newCart = [...cart];
    newCart[index].quantity += 1;
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const decrementQuantity = (index: number) => {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  };

  const removeCartItem = (index: number) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleCreateOrder = async () => {
    if (!validateInputs(name, email)) {
      alert('Please enter a valid name and email.');
      return;
    }

    try {
      const orderResponse = await createOrder(name, email, cart);
      alert('Order created successfully');
      setCart([]);
      localStorage.removeItem("cart");

      localStorage.setItem("currentOrder", JSON.stringify({
        orderId: orderResponse.id,
        buyerName: name
      }));

      window.location.href = '/cart/checkout';
    } catch (error) {
      alert('There was a problem creating the order');
    }
  };

  return (
    <div className="flex m-8">
      <div className="w-3/4 p-8 bg-white shadow-md rounded-lg mr-8">
        <h1 className="text-2xl font-bold mb-4 text-center text-black">Cart Details</h1>
        {cart.length > 0 ? (
          <div className="space-y-6">
            {cart.map((item, index) => (
              <CartItemComponent
                key={item.id}
                item={item}
                index={index}
                incrementQuantity={incrementQuantity}
                decrementQuantity={decrementQuantity}
                removeCartItem={removeCartItem}
              />
            ))}
            <p className="text-gray-700 flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span className="text-blue-600">${totalPrice}</span>
            </p>
          </div>
        ) : (
          <p className="text-gray-700 text-center flex items-center justify-center">
            <AiOutlineShoppingCart size={24} className="mr-2" />
            Your cart is empty.
          </p>
        )}
      </div>
      <div className="w-1/4 p-8 bg-gray-100 shadow-md rounded-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            className="w-full p-2 border rounded"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border rounded"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          onClick={handleCreateOrder}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}