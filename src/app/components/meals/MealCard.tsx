'use client';

import Image from 'next/image';
import { Meal } from '@/types/meal';
import { AiFillHeart, AiOutlineShoppingCart } from 'react-icons/ai';

interface MealCardProps {
  meal: Meal;
  onAddToCart: (meal: Meal) => void;
  onAddToWishlist: (meal: Meal) => void;
}

export default function MealCard({ meal, onAddToCart, onAddToWishlist }: MealCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-48 group">
        <Image
          src={meal.imageUrl}
          alt={meal.name}
          fill
          className="object-cover"
        />
        <div className="absolute bottom-2 left-2 flex space-x-2">
          <button 
            className="bg-white p-2 rounded-full shadow-lg 
                      hover:bg-gray-100 transition-colors duration-200 
                      opacity-90 hover:opacity-100 cursor-pointer"
            onClick={() => onAddToWishlist(meal)}
          >
            <AiFillHeart className="w-6 h-6 text-gray-800" />
          </button>
        </div>
        <div className="absolute bottom-2 right-2 flex space-x-2">
          <button 
            className="bg-white p-2 rounded-full shadow-lg 
                      hover:bg-gray-100 transition-colors duration-200 
                      opacity-90 hover:opacity-100 cursor-pointer"
            onClick={() => onAddToCart(meal)}
          >
            <AiOutlineShoppingCart className="w-6 h-6 text-gray-800" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{meal.name}</h2>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-gray-600">Category: {meal.category.name}</span>
          <span className="text-green-600 font-bold">{meal.price}</span>
        </div>
      </div>
    </div>
  );
} 