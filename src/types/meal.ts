export interface Meal {
    id: number;
    name: string;
    imageUrl: string;
    price: string;
    extStrMealThumb: string | null;
    priceCents: number;
    category: {
        id: number;
        name: string;
    };
};
  
export interface MealListProps {
    categoryId: string;
    sortCriteria: 'nameAsc' | 'nameDesc' | 'priceAsc' | 'priceDesc';
};