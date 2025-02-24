import { Metadata } from 'next';
import Wishlist from '@/app/components/wishlist/Wishlist';


export const metadata: Metadata = {
  title: 'Wishlist | 17 Tech FoodApp',
  description: 'Wishlist',
};

export default async function CategoryPage() {
  return (
    <div className="min-h-screen p-8 sm:p-20">
      <div className="max-w-3xl mx-auto">
        <Wishlist />
      </div>
    </div>
  );
} 