import Image from 'next/image';
import { Category } from '@/types/category';
import MealList from '../meals/MealList';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-6 mb-6">
          <Image
            src={category.extStrCategoryHumb}
            alt={category.name}
            width={120}
            height={120}
            className="rounded-lg"
          />
          <h1 className="text-3xl text-gray-600 font-bold">{category.name}</h1>
        </div>
        <p className="text-gray-600 mt-4">
          {category.extStrCategoryDescription}
        </p>
        <MealList categoryId={category.id} />
      </div>
    </div>
  );
} 