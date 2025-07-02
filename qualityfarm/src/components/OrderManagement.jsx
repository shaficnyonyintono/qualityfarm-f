import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      // This would be replaced with actual API call
      setTimeout(() => {
        setOrders([
          {
            id: 1,
            orderNumber: 'QF-2025-001',
            customer: {
              name: 'John Doe',
              email: 'john@example.com',
              phone: '+256 123 456 789'
            },
            items: [
              { name: 'Premium Tomato Seeds', quantity: 2, price: 25000 },
              { name: 'Organic Fertilizer', quantity: 1, price: 45000 }
            ],
            total: 95000,
            status: 'pending',
            paymentStatus: 'paid',
            date: '2025-07-02',
            shippingAddress: '123 Farm Road, Kampala, Uganda'
          },
          {
            id: 2,
            orderNumber: 'QF-2025-002',
            customer: {
              name: 'Jane Smith',
              email: 'jane@example.com',
              phone: '+256 987 654 321'
            },
            items: [
              { name: 'Garden Hoe', quantity: 1, price: 35000 }
            ],
            total: 35000,
            status: 'processing',
            paymentStatus: 'paid',
            date: '2025-07-01',
            shippingAddress: '456 Agriculture Avenue, Entebbe, Uganda'
          },
          {
            id: 3,
            orderNumber: 'QF-2025-003',
            customer: {
              name: 'Mike Johnson',
              email: 'mike@example.com',
              phone: '+256 555 123 456'
            },
            items: [
              { name: 'Irrigation Pipes', quantity: 5, price: 15000 },
              { name: 'Premium Tomato Seeds', quantity: 1, price: 25000 }
            ],
            total: 100000,
            status: 'shipped',
            paymentStatus: 'paid',
            date: '2025-06-30',
            shippingAddress: '789 Harvest Street, Jinja, Uganda'
          },
          {
            id: 4,
            orderNumber: 'QF-2025-004',
            customer: {
              name: 'Sarah Williams',
              email: 'sarah@example.com',
              phone: '+256 777 888 999'
            },
            items: [
              { name: 'Organic Fertilizer', quantity: 3, price: 45000 }
            ],
            total: 135000,
            status: 'delivered',
            paymentStatus: 'paid',
            date: '2025-06-29',
            shippingAddress: '321 Green Valley, Mbarara, Uganda'
          }
        ]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      toast.error('Failed to load orders');
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 border border-yellow-200">Pending</span>;
      case 'processing':
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">Processing</span>;
      case 'shipped':
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 border border-purple-200">Shipped</span>;
      case 'delivered':
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">Delivered</span>;
      case 'cancelled':
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200">Cancelled</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">Unknown</span>;
    }
  };

  const getPaymentBadge = (status) => {
    switch (status) {
      case 'paid':
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">Paid</span>;
      case 'pending':
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 border border-yellow-200">Pending</span>;
      case 'failed':
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200">Failed</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">Unknown</span>;
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    toast.success(`Order status updated to ${newStatus}`);
  };

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <h1 className="text-4xl font-black text-gray-900 mb-2 flex items-center gap-3">
                  <i className="fas fa-shopping-cart text-blue-600"></i>
                  Order Management
                </h1>
                <p className="text-lg text-gray-600 font-medium">
                  Track and manage customer orders
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-green-50 to-green-100 px-6 py-3 rounded-xl border border-green-200">
                  <span className="text-green-700 font-bold text-lg">{orders.length}</span>
                  <span className="text-green-600 text-sm ml-1">Total Orders</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="fas fa-search text-gray-400"></i>
                </div>
                <input
                  type="text"
                  placeholder="Search orders, customers, or order numbers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200"
                />
              </div>
            </div>
            <div className="lg:w-64">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
              <i className="fas fa-list text-purple-600"></i>
              Orders ({filteredOrders.length})
            </h2>
          </div>
          
          {filteredOrders.length === 0 ? (
            <div className="p-12 text-center">
              <i className="fas fa-shopping-cart text-6xl text-gray-300 mb-4"></i>
              <h3 className="text-xl font-bold text-gray-600 mb-2">No orders found</h3>
              <p className="text-gray-500">Try adjusting your search criteria.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Order</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Payment</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-bold text-gray-900">{order.orderNumber}</div>
                          <div className="text-sm text-gray-600">{order.items.length} item(s)</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-bold text-gray-900">{order.customer.name}</div>
                          <div className="text-sm text-gray-600">{order.customer.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-gray-900">{formatCurrency(order.total)}</span>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="px-6 py-4">
                        {getPaymentBadge(order.paymentStatus)}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-900 font-medium">{order.date}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => viewOrderDetails(order)}
                            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors duration-200"
                            title="View Details"
                          >
                            <i className="fas fa-eye"></i>
                          </button>
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            className="text-xs px-2 py-1 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Order Details Modal */}
        {showOrderModal && selectedOrder && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                  <i className="fas fa-receipt text-blue-600"></i>
                  Order Details - {selectedOrder.orderNumber}
                </h3>
              </div>
              <div className="p-6 space-y-6">
                {/* Customer Info */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <i className="fas fa-user text-green-600"></i>
                    Customer Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-600">Name</label>
                      <p className="font-medium text-gray-900">{selectedOrder.customer.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-600">Email</label>
                      <p className="font-medium text-gray-900">{selectedOrder.customer.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-600">Phone</label>
                      <p className="font-medium text-gray-900">{selectedOrder.customer.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-600">Order Date</label>
                      <p className="font-medium text-gray-900">{selectedOrder.date}</p>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <i className="fas fa-map-marker-alt text-red-600"></i>
                    Shipping Address
                  </h4>
                  <p className="text-gray-900">{selectedOrder.shippingAddress}</p>
                </div>

                {/* Order Items */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <i className="fas fa-box text-purple-600"></i>
                    Order Items
                  </h4>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center bg-white p-3 rounded-lg">
                        <div>
                          <h5 className="font-semibold text-gray-900">{item.name}</h5>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">{formatCurrency(item.price * item.quantity)}</p>
                          <p className="text-sm text-gray-600">{formatCurrency(item.price)} each</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-gray-900 flex items-center gap-2">
                        <i className="fas fa-calculator text-green-600"></i>
                        Order Total
                      </h4>
                      <div className="flex items-center gap-4 mt-2">
                        {getStatusBadge(selectedOrder.status)}
                        {getPaymentBadge(selectedOrder.paymentStatus)}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-black text-gray-900">{formatCurrency(selectedOrder.total)}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 flex gap-4">
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-xl font-semibold transition-colors duration-200"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    toast.success('Invoice sent to customer!');
                    setShowOrderModal(false);
                  }}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-xl font-semibold transition-all duration-200"
                >
                  Send Invoice
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;
