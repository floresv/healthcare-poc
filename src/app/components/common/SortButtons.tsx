import { FaSortAlphaDown, FaSortAlphaUp, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

interface SortButtonsProps {
  sortCriteria: 'nameAsc' | 'nameDesc' | 'priceAsc' | 'priceDesc';
  setSortCriteria: (criteria: 'nameAsc' | 'nameDesc' | 'priceAsc' | 'priceDesc') => void;
}

export default function SortButtons({ sortCriteria, setSortCriteria }: SortButtonsProps) {
  return (
    <div className="mb-4 flex justify-end">
      <div className="flex gap-4">
        <button 
          onClick={() => setSortCriteria(sortCriteria === 'nameAsc' ? 'nameDesc' : 'nameAsc')}
          className="flex items-center gap-2 p-2 border rounded text-gray-600 hover:bg-gray-100 transition-colors"
        >
          {sortCriteria === 'nameAsc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}
        </button>
        <button 
          onClick={() => setSortCriteria(sortCriteria === 'priceAsc' ? 'priceDesc' : 'priceAsc')}
          className="flex items-center gap-2 p-2 border rounded text-gray-600 hover:bg-gray-100 transition-colors"
        >
          {sortCriteria === 'priceAsc' ? <FaSortAmountDown /> : <FaSortAmountUp />}
        </button>
      </div>
    </div>
  );
} 