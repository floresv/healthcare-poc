import { CartItemProps } from "@/types/cart";
import { FaRegTrashAlt } from "react-icons/fa";

export default function CartItem({ item, index, incrementQuantity, decrementQuantity, removeCartItem }: CartItemProps) {
  return (
    <div className="flex justify-between items-center py-1 border-b last:border-0 text-black">
        <span className="text-black">{item.name}</span>
        <div className="flex items-center ml-auto">
            <span className="text-black">${((item.priceCents / 100) * item.quantity).toFixed(2)}</span>
            <div className="flex items-center border rounded ml-4">
                <button onClick={() => incrementQuantity(index)} aria-label="Increment quantity" className="px-2 py-1 hover:text-green-600">
                +
                </button>
                <div className="px-2">{item.quantity}</div>
                <button onClick={() => decrementQuantity(index)} aria-label="Decrement quantity" className="px-2 py-1 hover:text-orange-600">
                -
                </button>
            </div>
            <button onClick={() => removeCartItem(index)} aria-label="Remove item" className="hover:text-red-600 ml-4">
            <FaRegTrashAlt size={16} />
            </button>
        </div>
    </div>
  );
} 