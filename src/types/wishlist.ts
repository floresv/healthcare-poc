import { Meal } from './meal';
import { Category } from './category';

interface WishlistableMeal extends Meal {
  category: Category;
}

export interface WishlistItem {
  id: number;
  wishlistableType: string;
  wishlistableId: number;
  wishlistable: WishlistableMeal;
}

export interface WishlistResponse {
  wishlists: WishlistItem[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    perPage: number;
  };
} 