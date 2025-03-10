import { Metadata } from 'next';
import OrderList from '../components/orders/OrderList';


export const metadata: Metadata = {
  title: 'Orders | 17 Tech FoodApp',
  description: 'View Orders',
};

export default async function CategoryPage() {
  return (
    <div className="min-h-screen p-8 sm:p-20">
      <div className="max-w-6xl mx-auto">
        <OrderList />
      </div>
    </div>
  );
} 