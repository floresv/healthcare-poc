export interface CartItem {
    id: number;
    name: string;
    description?: string;
    price: string;
    quantity: number;
    priceCents: number;
};

export interface CartProps {
    cart: CartItem[];
    setCart: (cart: CartItem[]) => void;
    showCart: boolean;
    toggleCart: () => void;
};