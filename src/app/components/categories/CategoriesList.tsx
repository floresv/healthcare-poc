import Image from "next/image";
import Link from 'next/link';

interface Category {
  id: number;
  name: string;
  extId: number;
  extStrCategoryHumb: string;
  extStrCategoryDescription: string;
}

interface CategoriesListProps {
  categories: Category[];
}

export default function CategoriesList({ categories }: CategoriesListProps) {
  return (
    <div className="w-full">
      <ul className="text-xl font-bold space-y-4">
        {categories.map((category) => (
          <Link href={`/categories/${category.id}`} key={category.id} className="category-link">
            <li className="p-4 border rounded flex items-center gap-4 hover:bg-gray-50 transition-colors">
              <Image
                src={category.extStrCategoryHumb}
                alt={`${category.name} category`}
                width={64}
                height={64}
                className="rounded-md"
              />
              <span className="font-medium">{category.name}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
} 