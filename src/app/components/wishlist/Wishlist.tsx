'use client';

import React, { useState, useEffect } from 'react';
import { WishlistItem, WishlistResponse } from '@/types/wishlist';
import MealCard from '../meals/MealCard';
import { Meal } from '@/types/meal';

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiEndpoint = process.env.API_ENDPOINT;

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${apiEndpoint}/wishlists`
        );
        if (!response.ok) {
          throw new Error('Error fetching wishlist');
        }
        const data: WishlistResponse = await response.json();
        setWishlistItems(data.wishlists);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [apiEndpoint]);

  const handleDeleteItem = async (meal: Meal) => {
    const wishlistItem = wishlistItems.find(item => item.wishlistable.id === meal.id);
    if (!wishlistItem) return;

    try {
      const response = await fetch(`${apiEndpoint}/wishlists/${wishlistItem.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error deleting wishlist item');
      }
      setWishlistItems((prevItems) => 
        prevItems.filter(item => item.id !== wishlistItem.id)
      );
      alert('Item removed from wishlist');
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to remove item from wishlist');
    }
  };

  const addToCart = (meal: Meal) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]') as Array<Meal & { quantity: number }>;
    const existingItem = existingCart.find(cartItem => cartItem.id === meal.id);

    let newCart;
    if (existingItem) {
      newCart = existingCart.map(cartItem => 
        cartItem.id === meal.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      newCart = [...existingCart, { ...meal, quantity: 1 }];
    }

    localStorage.setItem('cart', JSON.stringify(newCart));
    alert(`Added ${meal.name} to cart`);
  };

  if (loading) return <p>Loading wishlist...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-3xl font-bold mb-4 text-center">My Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 text-lg">Your wishlist is empty</p>
          <p className="text-gray-500 mt-2">
            Add items to your wishlist by clicking the heart icon on meals
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <MealCard
              key={item.id}
              meal={item.wishlistable}
              onAddToCart={addToCart}
              onAddToWishlist={handleDeleteItem}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
