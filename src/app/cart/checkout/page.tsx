"use client";

import React from 'react';
import { processPayment } from '@/utils/cartUtils';
import PaymentForm from '@/app/components/cart/PaymentForm';

const CheckoutPage: React.FC = () => {
    const [currentOrder, setCurrentOrder] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const order = localStorage.getItem("currentOrder");
            setCurrentOrder(order);
        }
    }, []);

    if (!currentOrder) {
        return (
            <div className="flex justify-center m-8">
                <div className="w-3/4 p-8 bg-white shadow-md rounded-lg">
                    <h1 className="text-2xl font-bold mb-4 text-center text-black">There are no current orders</h1>
                </div>
            </div>
        );
    }

    const handleCancel = () => {
        window.location.href = '/orders';
    };

    const handlePay = async (event: React.FormEvent) => {
        event.preventDefault();
        
        const fullName = (event.target as HTMLFormElement).fullName.value;
        const cardNumber = (event.target as HTMLFormElement).cardNumber.value;

        try {
            const orderId = JSON.parse(currentOrder).orderId;
            const data = await processPayment(orderId, fullName, cardNumber);
            console.log('Payment processed successfully:', data);
            localStorage.removeItem("currentOrder");
            alert('Payment processed successfully');
            window.location.href = '/';
        } catch (error) {
            console.error('There was a problem processing the payment:', error);
        }
    };

    return (
        <div className="flex justify-center m-8">
            <div className="w-3/4 p-8 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold mb-4 text-center text-black">Checkout</h1>
                <PaymentForm onPay={handlePay} onCancel={handleCancel} />
            </div>
        </div>
    );
};

export default CheckoutPage;
