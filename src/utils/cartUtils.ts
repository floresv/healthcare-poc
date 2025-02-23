import { CartItem } from "@/types/cart";

const apiEndpoint = process.env.API_ENDPOINT;

export const validateInputs = (name: string, email: string): boolean => {
  const nameRegex = /^[a-zA-Z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return nameRegex.test(name) && emailRegex.test(email);
};  

export const createOrder = async (name: string, email: string, cart: CartItem[]) => {
    const orderData = {
        order: {
        username: name,
        email: email,
        order_items_attributes: cart.map(item => ({
            meal_id: item.id,
            quantity: item.quantity
        }))
    }
  };

  if (!apiEndpoint) {
    throw new Error('API_ENDPOINT is not defined');
  }

  const response = await fetch(`${apiEndpoint}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderData)
  });

  if (!response.ok) {
    throw new Error('Error creating the order');
  }

  return response.json();
};

export const processPayment = async (orderId: number, fullName: string, cardNumber: string) => {
    const paymentData = {
        payment: {
            payment_type: "card",
            card_number: cardNumber,
            full_name: fullName
        }
    };

    const response = await fetch(`${apiEndpoint}/orders/${orderId}/pay`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
    });
    if (!response.ok) {
        throw new Error('Error processing the payment');
    }

    return response.json();
}; 