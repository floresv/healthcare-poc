export interface SortButtonsProps {
    sortCriteria: 'nameAsc' | 'nameDesc' | 'priceAsc' | 'priceDesc';
    setSortCriteria: (criteria: 'nameAsc' | 'nameDesc' | 'priceAsc' | 'priceDesc') => void;
};