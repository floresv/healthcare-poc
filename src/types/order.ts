import { Meal } from './meal';

export interface OrderItem {
  id: number;
  quantity: number;
  unitPrice: string;
  totalPrice: string;
  meal: Meal;
  unitPriceCents: number;
  unitPriceCurrency: string;
}

export interface Order {
  id: number;
  username: string;
  email: string;
  total: string;
  createdAt: string;
  updatedAt: string;
  totalCents: number;
  totalCurrency: string;
  state: string;
  orderItems: OrderItem[];
}

export interface OrdersData {
  orders: Order[];
}

export interface OrdersResponse {
  orders: OrdersData;
  pagination: {
    current_page: number;
    next_page: number | null;
    prev_page: number | null;
    total_pages: number;
    total_count: number;
  };
} 