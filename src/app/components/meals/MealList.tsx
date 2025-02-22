"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Meal, MealListProps } from '@/types/meal';
import { CartItem } from '@/types/cart';


const sortMeals = (meals: Meal[], criteria: 'nameAsc' | 'nameDesc' | 'priceAsc' | 'priceDesc') => {
  return meals.sort((a, b) => {
    switch (criteria) {
      case 'nameAsc':
        return a.name.localeCompare(b.name);
      case 'nameDesc':
        return b.name.localeCompare(a.name);
      case 'priceAsc':
        return parseFloat(a.price) - parseFloat(b.price);
      case 'priceDesc':
        return parseFloat(b.price) - parseFloat(a.price);
      default:
        return 0;
    }
  });
};

export default function MealList({ categoryId, sortCriteria }: MealListProps) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Using API_ENDPOINT (exposed via next.config.js)
  const apiEndpoint = process.env.API_ENDPOINT;

  const addToCart = (meal: Meal) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[];
    const existingItem = existingCart.find((item: CartItem) => item.id === meal.id);

    let newCart: CartItem[];
    if (existingItem) {
      newCart = existingCart.map((item: CartItem) => 
        item.id === meal.id 
          ? { ...item, quantity: item.quantity + 1, priceCents: item.priceCents }
          : item
      );
    } else {
      newCart = [...existingCart, { ...meal, quantity: 1, priceCents: meal.priceCents}];
    }

    localStorage.setItem('cart', JSON.stringify(newCart));

    // Optional: Add some visual feedback
    alert(`Added ${meal.name} to cart`);
  };

  useEffect(() => {
    const sortBy = ["nameAsc", "nameDesc"].includes(sortCriteria) ? "name" : "price";
    const sortDirection = ["nameAsc", "priceAsc"].includes(sortCriteria) ? "asc" : "desc";

    if (!apiEndpoint) {
      console.error("API_ENDPOINT is not defined");
      return;
    }

    const fetchMeals = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${apiEndpoint}/meals/?category_id=${categoryId}&page=${page}&sort_by=${sortBy}&direction=${sortDirection}`
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
  }, [apiEndpoint, categoryId, page, sortCriteria]);

  // Client-side filtering of meals based on the search term.
  const filteredMeals = meals.filter((meal) =>
    meal.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedMeals = sortMeals(filteredMeals, sortCriteria);

  return (
    <div className="mt-8" style={{ marginTop: '16px' }}>
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
            {sortedMeals.map((meal) => (
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
                    <AiOutlineShoppingCart className="w-6 h-6 text-gray-800" />
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