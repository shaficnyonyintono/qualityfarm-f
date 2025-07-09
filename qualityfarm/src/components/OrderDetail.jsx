import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE = window.location.hostname === 'localhost' 
    ? "http://localhost:8000" 
    : "https://qualityfarm-b-1.onrender.com";

  const loadOrderDetail = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(`${API_BASE}/orders/${orderId}/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setOrder(data);
      } else {
        toast.error('Failed to load order details');
        navigate('/orders');
      }
    } catch (error) {
      console.error('Error loading order details:', error);
      toast.error('Network error');
      navigate('/orders');
    } finally {
      setLoading(false);
    }
  }, [orderId, navigate, API_BASE]);

  useEffect(() => {
    loadOrderDetail();
  }, [loadOrderDetail]);

  const cancelOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/orders/${orderId}/cancel/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        toast.success('Order cancelled successfully');
        loadOrderDetail(); // Refresh order details
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Failed to cancel order');
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
      toast.error('Network error');
    }
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
      processing: 'bg-purple-100 text-purple-800 border-purple-200',
      shipped: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      delivered: 'bg-green-100 text-green-800 border-green-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200',
      refunded: 'bg-gray-100 text-gray-800 border-gray-200',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-UG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-exclamation-triangle text-6xl text-red-500 mb-4"></i>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h2>
          <p className="text-gray-600 mb-6">The order you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/orders')}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/orders')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Orders
          </button>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Order #{order.order_number}</h1>
              <p className="text-gray-600 mt-1">Placed on {formatDate(order.created_at)}</p>
            </div>
            <div className="mt-4 sm:mt-0">
              {getStatusBadge(order.status)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Items</h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                    <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                      {item.item_image ? (
                        <img src={item.item_image} alt={item.item_title} className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <i className="fas fa-image text-gray-400 text-2xl"></i>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg">{item.item_title}</h3>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-gray-600">Price: {formatCurrency(item.price)} each</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">
                        {formatCurrency(item.subtotal)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Tracking */}
            {order.tracking && order.tracking.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Tracking</h2>
                <div className="space-y-4">
                  {order.tracking.map((track) => (
                    <div key={track.id} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <i className="fas fa-check text-white text-sm"></i>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-900">{track.status.charAt(0).toUpperCase() + track.status.slice(1)}</h3>
                          <span className="text-sm text-gray-500">{formatDate(track.created_at)}</span>
                        </div>
                        <p className="text-gray-600 mt-1">{track.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Order Summary & Customer Info */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">{formatCurrency(order.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee:</span>
                  <span className="font-medium">{formatCurrency(order.delivery_fee)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax:</span>
                  <span className="font-medium">{formatCurrency(order.tax_amount)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-green-600">{formatCurrency(order.total_amount)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Customer Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Name:</label>
                  <p className="font-medium text-gray-900">{order.customer_name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Email:</label>
                  <p className="font-medium text-gray-900">{order.customer_email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Phone:</label>
                  <p className="font-medium text-gray-900">{order.customer_phone}</p>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Delivery Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Address:</label>
                  <p className="font-medium text-gray-900">{order.delivery_address}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">City:</label>
                  <p className="font-medium text-gray-900">{order.delivery_city}</p>
                </div>
                {order.delivery_notes && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Notes:</label>
                    <p className="font-medium text-gray-900">{order.delivery_notes}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              {order.status === 'pending' && (
                <button
                  onClick={cancelOrder}
                  className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Cancel Order
                </button>
              )}
              
              <button
                onClick={() => window.print()}
                className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                Print Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
