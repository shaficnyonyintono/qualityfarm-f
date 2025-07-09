import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const navigate = useNavigate();

  const API_BASE = window.location.hostname === 'localhost' 
    ? "http://localhost:8000" 
    : "https://qualityfarm-b-1.onrender.com";

  const loadOrders = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(`${API_BASE}/orders/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        toast.error('Failed to load orders');
      }
    } catch (error) {
      console.error('Error loading orders:', error);
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  }, [navigate, API_BASE]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const cancelOrder = async (orderId) => {
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
        loadOrders(); // Refresh orders
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
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
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
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredOrders = selectedStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === selectedStatus);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600 mt-2">Track and manage your orders</p>
        </div>

        {/* Filter Buttons */}
        <div className="mb-6 flex flex-wrap gap-2">
          {['all', 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedStatus === status
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <i className="fas fa-box text-6xl text-gray-300 mb-4"></i>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders found</h2>
            <p className="text-gray-600 mb-6">
              {selectedStatus === 'all' 
                ? "You haven't placed any orders yet." 
                : `You have no ${selectedStatus} orders.`}
            </p>
            <button
              onClick={() => navigate('/products')}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Order #{order.order_number}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Placed on {formatDate(order.created_at)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 mt-3 sm:mt-0">
                      {getStatusBadge(order.status)}
                      <span className="text-lg font-bold text-green-600">
                        {formatCurrency(order.total_amount)}
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="border-t pt-4 mb-4">
                    <h4 className="font-medium text-gray-900 mb-3">Items ({order.items.length})</h4>
                    <div className="space-y-2">
                      {order.items.slice(0, 3).map((item) => (
                        <div key={item.id} className="flex items-center gap-3 text-sm">
                          <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                            {item.item_image ? (
                              <img src={item.item_image} alt={item.item_title} className="w-full h-full object-cover rounded-lg" />
                            ) : (
                              <i className="fas fa-image text-gray-400"></i>
                            )}
                          </div>
                          <div className="flex-1">
                            <span className="font-medium text-gray-900">{item.item_title}</span>
                            <span className="text-gray-600 ml-2">× {item.quantity}</span>
                          </div>
                          <span className="text-gray-900 font-medium">
                            {formatCurrency(item.subtotal)}
                          </span>
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <p className="text-sm text-gray-500 mt-2">
                          +{order.items.length - 3} more items
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Order Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                    <button
                      onClick={() => navigate(`/orders/${order.id}`)}
                      className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                    >
                      View Details
                    </button>
                    
                    {order.status === 'pending' && (
                      <button
                        onClick={() => cancelOrder(order.id)}
                        className="flex-1 bg-red-100 text-red-700 py-2 px-4 rounded-lg hover:bg-red-200 transition-colors font-medium"
                      >
                        Cancel Order
                      </button>
                    )}
                    
                    {order.status === 'delivered' && (
                      <button
                        onClick={() => navigate(`/products/${order.items[0]?.item}/review`)}
                        className="flex-1 bg-green-100 text-green-700 py-2 px-4 rounded-lg hover:bg-green-200 transition-colors font-medium"
                      >
                        Leave Review
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
