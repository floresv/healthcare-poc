import { Metadata } from 'next';
import CategoryCard from '@/app/components/categories/CategoryCard';
import MealList from '@/app/components/meals/MealList';

interface Category {
  id: number;
  name: string;
  extId: number;
  extStrCategoryHumb: string;
  extStrCategoryDescription: string;
}

interface ApiResponse {
  category: Category;
}

export const metadata: Metadata = {
  title: 'Category Details | 17 Tech FoodApp',
  description: 'View category details',
};

export default async function CategoryPage({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>;
}) {
  // Await the promise to extract the id.
  const { id } = await params;
  const apiUrl = process.env.API_ENDPOINT;
  const response = await fetch(`${apiUrl}/categories/${id}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.status}`);
  }

  const data: ApiResponse = await response.json();

  if (!data?.category) {
    return <div>Error: Category not found</div>;
  }

  return (
    <div className="min-h-screen p-8 sm:p-20">
      <div className="max-w-2xl mx-auto">
        <CategoryCard category={data.category} />
      </div>
    </div>
  );
} 