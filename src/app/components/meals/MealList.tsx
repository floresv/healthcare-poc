"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface Meal {
  id: number;
  name: string;
  imageUrl: string;
  price: string;
  extStrMealThumb: string | null;
  category: {
    id: number;
    name: string;
  };
}

interface CartItem extends Meal {
  quantity: number;
}

interface MealListProps {
  categoryId: number;
}

export default function MealList({ categoryId }: MealListProps) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Using API_ENDPOINT (exposed via next.config.js)
  const apiEndpoint = process.env.API_ENDPOINT;

  // Add new function to handle adding items to cart
  const addToCart = (meal: Meal) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[];
    const existingItem = existingCart.find((item: CartItem) => item.id === meal.id);

    let newCart: CartItem[];
    if (existingItem) {
      // If item exists, increment quantity
      newCart = existingCart.map((item: CartItem) => 
        item.id === meal.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      // If item doesn't exist, add it with quantity 1
      newCart = [...existingCart, { ...meal, quantity: 1 }];
    }

    localStorage.setItem('cart', JSON.stringify(newCart));
    // Optional: Add some visual feedback
    alert(`Added ${meal.name} to cart`);
  };

  useEffect(() => {
    if (!apiEndpoint) {
      console.error("API_ENDPOINT is not defined");
      return;
    }

    const fetchMeals = async () => {
      setLoading(true);
      try {
        // Adjust the URL structure if needed.
        const response = await fetch(
          `${apiEndpoint}/meals/?category_id=${categoryId}&page=${page}`
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error ${response.status}: ${errorText.substring(0, 200)}`);
        }

        const data = await response.json();
        setMeals(data.meals);
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
      setLoading(false);
    };

    fetchMeals();
  }, [apiEndpoint, categoryId, page]);

  // Client-side filtering of meals based on the search term.
  const filteredMeals = meals.filter((meal) =>
    meal.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-8">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search meals..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded text-black"
        />
      </div>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMeals.map((meal) => (
              <div key={meal.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-48 group">
                  <Image
                    src={meal.imageUrl}
                    alt={meal.name}
                    fill
                    className="object-cover"
                  />
                  <button 
                    className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-lg 
                              hover:bg-gray-100 transition-colors duration-200 
                              opacity-90 hover:opacity-100 cursor-pointer"
                    onClick={() => addToCart(meal)}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={1.5} 
                      stroke="currentColor" 
                      className="w-6 h-6 text-gray-800"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" 
                      />
                    </svg>
                  </button>
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">{meal.name}</h2>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-gray-600">Category: {meal.category.name}</span>
                    <span className="text-green-600 font-bold">{meal.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
} 