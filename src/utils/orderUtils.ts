export const validateInputs = (name: string, email: string): boolean => {
  const nameRegex = /^[a-zA-Z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return nameRegex.test(name) && emailRegex.test(email);
};

export const createOrder = async (name: string, email: string, cart: any[]) => {
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

  const apiEndpoint = process.env.API_ENDPOINT;
  if (!apiEndpoint) {
    throw new Error('API_ENDPOINT is not defined');
  }
  console.log(apiEndpoint);

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