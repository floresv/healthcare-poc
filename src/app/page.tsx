import type { Metadata } from 'next';
import CategoriesList from './components/categories/CategoriesList';
import { CategoriesListProps } from '@/types/category';

// Make page component async to fetch data
export default async function Home() {
  try {
    // Use the API_ENDPOINT environment variable with a fallback
    const apiUrl = process.env.API_ENDPOINT;
    const response = await fetch(`${apiUrl}/categories/?page=1&per_page=10`, {
      cache: 'no-store', // Disable caching for real-time data
    });
    
    if (!response.ok) {
      console.error('API response error:', response.status, response.statusText);
      throw new Error(`API call failed: ${response.status}`);
    }

    const data: CategoriesListProps = await response.json();
    console.log('API response:', data); // For debugging

    // Check for valid categories data
    if (!data?.categories) {
      return <div>Error: No categories data available</div>;
    }

    return (
      <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">Categories</h1>
        </div>
        <main className="flex flex-col gap-8 items-center sm:items-start">
          <CategoriesList categories={data.categories} />
        </main>
      </div>
    );
  } catch (error) {
    console.error('Error fetching categories:', error);
    return <div>Error loading categories. Please try again later.</div>;
  }
}

export const metadata: Metadata = {
  title: 'Home | 17 Tech FoodApp',
  description: 'Welcome to 17 Tech FoodApp',
};
