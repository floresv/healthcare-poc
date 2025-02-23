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

export interface CartItemProps {
    item: CartItem;
    index: number;
    incrementQuantity: (index: number) => void;
    decrementQuantity: (index: number) => void;
    removeCartItem: (index: number) => void;
};