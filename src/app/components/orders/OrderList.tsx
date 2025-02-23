'use client';

import React, { useState, useEffect } from 'react';
import { Order, OrdersResponse } from '@/types/order';
import { AiFillDelete } from 'react-icons/ai';
import { FaCreditCard } from "react-icons/fa";

function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);
  const apiEndpoint = process.env.API_ENDPOINT;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        console.log(`Fetching from: ${apiEndpoint}/orders/?&page=${currentPage}`);
        const response = await fetch(
          `${apiEndpoint}/orders/?&page=${currentPage}`
        );
        if (!response.ok) {
          throw new Error('Error fetching orders');
        }
        const data: OrdersResponse = await response.json();

        setOrders(data.orders.orders);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentPage, apiEndpoint]);

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDeleteOrder = (order: Order) => {
    setOrderToDelete(order);
  };

  const confirmDeleteOrder = () => {
    if (orderToDelete) {
      console.log('Confirmed delete order:', orderToDelete);
      if (orderToDelete) {
        const deleteOrder = async () => {
          try {
            const response = await fetch(`${apiEndpoint}/orders/${orderToDelete.id}`, {
              method: 'DELETE',
            });
            if (!response.ok) {
              throw new Error('Error deleting order');
            }
            setOrders((prevOrders) => prevOrders.filter(order => order.id !== orderToDelete.id));
            alert('Order deleted successfully');
          } catch (error) {
            if (error instanceof Error) {
              setError(error.message);
            } else {
              setError('An unknown error occurred');
            }
          }
        };
        deleteOrder();
      }
      setOrderToDelete(null);
    }
  };

  const cancelDeleteOrder = () => {
    setOrderToDelete(null);
  };

  const translateOrderState = (state: string): string => {
    switch (state) {
      case 'pending_of_payment':
        return 'pending';
      default:
        return state;
    }
  };

  const handleCheckout = (order: Order) => {
    localStorage.setItem('currentOrder', JSON.stringify({
      orderId: order.id,
      buyerName: order.username,
    }));
    window.location.href = `/cart/checkout`;
  };

  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Orders</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Total</th>
            <th className="py-2 px-4 border-b">State</th>
            <th className="py-2 px-4 border-b">Created At</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage).map(order => (
            <tr key={order.id} className="text-center hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{order.id}</td>
              <td className="py-2 px-4 border-b">{order.username}</td>
              <td className="py-2 px-4 border-b">{order.email}</td>
              <td className="py-2 px-4 border-b">{order.total}</td>
              <td className="py-2 px-4 border-b">{translateOrderState(order.state)}</td>
              <td className="py-2 px-4 border-b">{new Date(order.createdAt).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b">
                <div className="flex space-x-2 justify-center">
                  <button 
                    onClick={() => handleCheckout(order)}
                    className={order.state !== 'pending_of_payment' ? 'text-gray-400' : "text-green-600 hover:text-green-800"}
                    disabled={order.state !== 'pending_of_payment'}
                  >
                    <FaCreditCard size={20} />
                  </button>
                  <button 
                    onClick={() => handleDeleteOrder(order)} 
                    className={order.state !== 'pending_of_payment' ? 'text-gray-400' : "text-red-600 hover:text-red-800"}
                    disabled={order.state !== 'pending_of_payment'}
                  >
                    <AiFillDelete size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button onClick={handlePreviousPage} disabled={currentPage === 1} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300">
          Previous
        </button>
        <span className="text-lg">Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300">
          Next
        </button>
      </div>

      {orderToDelete &&(
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete order #{orderToDelete.id}?</p>
            <div className="flex justify-end mt-4">
              <button onClick={cancelDeleteOrder} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 mr-2">
                Cancel
              </button>
              <button 
                onClick={confirmDeleteOrder} 
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderList;