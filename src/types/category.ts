export interface Category {
  id: number;
  name: string;
  extId: number;
  extStrCategoryHumb: string;
  extStrCategoryDescription: string;
}

export interface ApiResponse {
  category: Category;
} 