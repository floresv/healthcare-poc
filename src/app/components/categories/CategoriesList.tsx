import Image from "next/image";
import Link from 'next/link';
import { CategoriesListProps } from "@/types/category";

export default function CategoriesList({ categories }: CategoriesListProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {categories.map((category) => (
          <Link href={`/categories/${category.id}`} key={category.id} className="category-link">
            <div className="p-4 border rounded flex flex-col items-center gap-4 hover:bg-gray-50 transition-colors">
              <Image
                src={category.extStrCategoryHumb}
                alt={`${category.name} category`}
                width={100}
                height={100}
                className="rounded-md"
              />
              <span className="font-medium">{category.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 