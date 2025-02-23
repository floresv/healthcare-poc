import { CartProps } from "@/types/cart";
import Link from 'next/link';
import CartItem from './CartItem';

export default function CartSummary({ cart, setCart, showCart, toggleCart }: CartProps) {
  const incrementQuantity = (index: number) => {
    const newCart = [...cart];
    newCart[index].quantity += 1;
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const decrementQuantity = (index: number) => {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  };

  const removeCartItem = (index: number) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const totalPrice = cart.reduce((acc, item) => acc + (item.priceCents / 100) * item.quantity, 0).toFixed(2);

  return (
    showCart && (
      <div className="absolute top-full right-0 mt-2 w-72 bg-white border rounded shadow-lg p-4 z-10">
        {cart.length > 0 ? (
          <>
            <div className="mb-4">
              {cart.map((item, index) => (
                <CartItem
                  key={item.id}
                  item={item}
                  index={index}
                  incrementQuantity={incrementQuantity}
                  decrementQuantity={decrementQuantity}
                  removeCartItem={removeCartItem}
                />
              ))}
            </div>
            <p className="text-gray-700 flex justify-between">
              <span>Total:</span>
              <span>${totalPrice}</span>
            </p>
            <Link href="/cart" onClick={toggleCart}>
              <div className="w-full bg-blue-600 text-white text-center py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                Place Order
              </div>
            </Link>
          </>
        ) : (
          <p className="text-gray-700">Your cart is empty.</p>
        )}
      </div>
    )
  );
} 