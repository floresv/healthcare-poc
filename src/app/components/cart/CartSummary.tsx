import { FaRegTrashAlt } from "react-icons/fa";
import { CartProps } from "@/types/cart";

export default function Cart({ cart, setCart, showCart, toggleCart }: CartProps) {
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
                <div key={item.id} className="flex justify-between items-center py-1 border-b last:border-0 text-black">
                  <div className="flex items-center space-x-2">
                    <span className="text-black">{item.name}</span>
                    <span className="text-black">${((item.priceCents / 100) * item.quantity).toFixed(2)}</span>
                    <div className="flex items-center border rounded">
                      <button
                        onClick={() => incrementQuantity(index)}
                        aria-label="Increment quantity"
                        className="px-2 py-1 hover:text-green-600"
                      >
                        +
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        onClick={() => decrementQuantity(index)}
                        aria-label="Decrement quantity"
                        className="px-2 py-1 hover:text-orange-600"
                      >
                        -
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeCartItem(index)}
                    aria-label="Remove item"
                    className="hover:text-red-600 ml-4"
                  >
                    <FaRegTrashAlt size={16} />
                  </button>
                </div>
              ))}
            </div>
            <p className="text-gray-700 flex justify-between">
              <span>Total:</span>
              <span>${totalPrice}</span>
            </p>
            <button 
              onClick={() => {
                setCart([]);
                localStorage.setItem("cart", "[]");
                toggleCart();
                alert("Order placed successfully!");
              }}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
            >
              Place Order
            </button>
          </>
        ) : (
          <p className="text-gray-700">Your cart is empty.</p>
        )}
      </div>
    )
  );
} 