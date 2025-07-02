import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    pendingOrders: 0,
    lowStockItems: 0,
    todayOrders: 0,
    todayRevenue: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // This would be replaced with actual API calls
      setTimeout(() => {
        setStats({
          totalProducts: 156,
          totalOrders: 1240,
          totalRevenue: 8500000,
          totalCustomers: 890,
          pendingOrders: 23,
          lowStockItems: 8,
          todayOrders: 12,
          todayRevenue: 250000
        });

        setRecentOrders([
          { id: 1, orderNumber: 'QF-2025-001', customer: 'John Doe', total: 125000, status: 'pending', date: '2025-07-02' },
          { id: 2, orderNumber: 'QF-2025-002', customer: 'Jane Smith', total: 89000, status: 'processing', date: '2025-07-02' },
          { id: 3, orderNumber: 'QF-2025-003', customer: 'Mike Johnson', total: 67000, status: 'shipped', date: '2025-07-01' }
        ]);

        setRecentProducts([
          { id: 1, name: 'Premium Tomato Seeds', stock: 150, sales: 45 },
          { id: 2, name: 'Organic Fertilizer', stock: 8, sales: 23 },
          { id: 3, name: 'Garden Hoe', stock: 0, sales: 12 }
        ]);

        setLoading(false);
      }, 1000);
    } catch (error) {
      toast.error('Failed to load dashboard data');
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      case 'processing': return 'text-blue-700 bg-blue-100 border-blue-200';
      case 'shipped': return 'text-purple-700 bg-purple-100 border-purple-200';
      case 'delivered': return 'text-green-700 bg-green-100 border-green-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { text: 'Out of Stock', color: 'text-red-700 bg-red-100' };
    if (stock < 10) return { text: 'Low Stock', color: 'text-orange-700 bg-orange-100' };
    return { text: 'In Stock', color: 'text-green-700 bg-green-100' };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-3xl p-8 text-white shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black mb-2">Welcome back, Admin! 👋</h1>
            <p className="text-xl opacity-90">Here's what's happening with your business today.</p>
          </div>
          <div className="hidden lg:block">
            <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center">
              <i className="fas fa-chart-line text-4xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Today's Orders */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Today's Orders</p>
              <p className="text-3xl font-black text-gray-900 mt-2">{stats.todayOrders}</p>
              <p className="text-sm text-green-600 font-medium mt-1">
                <i className="fas fa-arrow-up mr-1"></i>
                +8% from yesterday
              </p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <i className="fas fa-shopping-cart text-white text-2xl"></i>
            </div>
          </div>
        </div>

        {/* Today's Revenue */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Today's Revenue</p>
              <p className="text-2xl font-black text-gray-900 mt-2">{formatCurrency(stats.todayRevenue)}</p>
              <p className="text-sm text-green-600 font-medium mt-1">
                <i className="fas fa-arrow-up mr-1"></i>
                +12% from yesterday
              </p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
              <i className="fas fa-dollar-sign text-white text-2xl"></i>
            </div>
          </div>
        </div>

        {/* Pending Orders */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Pending Orders</p>
              <p className="text-3xl font-black text-gray-900 mt-2">{stats.pendingOrders}</p>
              <p className="text-sm text-orange-600 font-medium mt-1">
                <i className="fas fa-clock mr-1"></i>
                Requires attention
              </p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
              <i className="fas fa-exclamation-triangle text-white text-2xl"></i>
            </div>
          </div>
        </div>

        {/* Low Stock Items */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Low Stock Items</p>
              <p className="text-3xl font-black text-gray-900 mt-2">{stats.lowStockItems}</p>
              <p className="text-sm text-red-600 font-medium mt-1">
                <i className="fas fa-arrow-down mr-1"></i>
                Needs restocking
              </p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <i className="fas fa-box text-white text-2xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
              <i className="fas fa-shopping-cart text-blue-600"></i>
              Recent Orders
            </h2>
            <Link
              to="/admin/orders"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold transition-colors duration-200 text-sm"
            >
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {recentOrders.map(order => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl flex items-center justify-center text-white font-bold">
                    #{order.id}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{order.customer}</h3>
                    <p className="text-sm text-gray-600">{order.orderNumber} • {order.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{formatCurrency(order.total)}</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Status */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
              <i className="fas fa-boxes text-green-600"></i>
              Product Status
            </h2>
            <Link
              to="/admin/products"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-semibold transition-colors duration-200 text-sm"
            >
              Manage
            </Link>
          </div>
          <div className="space-y-4">
            {recentProducts.map(product => {
              const stockStatus = getStockStatus(product.stock);
              return (
                <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div>
                    <h3 className="font-bold text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.sales} sales this month</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{product.stock} units</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${stockStatus.color}`}>
                      {stockStatus.text}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
          <i className="fas fa-bolt text-yellow-600"></i>
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/admin/products"
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-3"
          >
            <i className="fas fa-plus-circle text-2xl"></i>
            <span>Add Product</span>
          </Link>
          <Link
            to="/admin/orders"
            className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-3"
          >
            <i className="fas fa-eye text-2xl"></i>
            <span>View Orders</span>
          </Link>
          <Link
            to="/admin/customers"
            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-3"
          >
            <i className="fas fa-users text-2xl"></i>
            <span>Customers</span>
          </Link>
          <Link
            to="/admin/analytics"
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-3"
          >
            <i className="fas fa-chart-bar text-2xl"></i>
            <span>Analytics</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
