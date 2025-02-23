import React from 'react';

interface PaymentFormProps {
    onPay: (event: React.FormEvent) => void;
    onCancel: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onPay, onCancel }) => (
    <form onSubmit={onPay} className="space-y-6">
        <div className="mb-4">
            <label htmlFor="fullName" className="block text-gray-700">Nombre Completo:</label>
            <input
                type="text"
                id="fullName"
                name="fullName"
                required
                className="w-full p-2 border rounded"
                defaultValue={JSON.parse(localStorage.getItem("currentOrder") || "{}").buyerName || ""}
            />
        </div>
        <div className="mb-4">
            <label htmlFor="cardNumber" className="block text-gray-700">Card Number:</label>
            <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                required
                className="w-full p-2 border rounded"
            />
        </div>
        <div className="flex justify-between">
            <button
                type="button"
                onClick={onCancel}
                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
            >
                Cancel
            </button>
            <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
            >
                Pay
            </button>
        </div>
    </form>
);

export default PaymentForm; 