import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading dashboard data
    const loadDashboardData = async () => {
      try {
        // This would be replaced with actual API calls
        setTimeout(() => {
          setStats({
            totalProducts: 156,
            totalOrders: 1240,
            totalRevenue: 8500000,
            totalCustomers: 890
          });
          setRecentOrders([
            { id: 1, customer: 'John Doe', total: 125000, status: 'delivered', date: '2025-07-01' },
            { id: 2, customer: 'Jane Smith', total: 89000, status: 'processing', date: '2025-07-01' },
            { id: 3, customer: 'Mike Johnson', total: 67000, status: 'shipped', date: '2025-06-30' },
            { id: 4, customer: 'Sarah Williams', total: 234000, status: 'pending', date: '2025-06-30' },
          ]);
          setLoading(false);
        }, 1000);
      } catch (error) {
        toast.error('Failed to load dashboard data');
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'text-green-700 bg-green-100 border-green-200';
      case 'processing': return 'text-blue-700 bg-blue-100 border-blue-200';
      case 'shipped': return 'text-purple-700 bg-purple-100 border-purple-200';
      case 'pending': return 'text-orange-700 bg-orange-100 border-orange-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-black text-gray-900 mb-2">
                  Welcome back, Admin! 👋
                </h1>
                <p className="text-lg text-gray-600 font-medium">
                  Here's what's happening with your agricultural business today.
                </p>
              </div>
              <div className="hidden lg:block">
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-3xl flex items-center justify-center shadow-2xl">
                  <i className="fas fa-chart-line text-white text-3xl"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Products */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Products</p>
                <p className="text-3xl font-black text-gray-900 mt-2">{stats.totalProducts}</p>
                <p className="text-sm text-green-600 font-medium mt-1">
                  <i className="fas fa-arrow-up mr-1"></i>
                  +12% from last month
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <i className="fas fa-box text-white text-2xl"></i>
              </div>
            </div>
          </div>

          {/* Total Orders */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Orders</p>
                <p className="text-3xl font-black text-gray-900 mt-2">{stats.totalOrders}</p>
                <p className="text-sm text-green-600 font-medium mt-1">
                  <i className="fas fa-arrow-up mr-1"></i>
                  +8% from last month
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                <i className="fas fa-shopping-cart text-white text-2xl"></i>
              </div>
            </div>
          </div>

          {/* Total Revenue */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Revenue</p>
                <p className="text-3xl font-black text-gray-900 mt-2">{formatCurrency(stats.totalRevenue)}</p>
                <p className="text-sm text-green-600 font-medium mt-1">
                  <i className="fas fa-arrow-up mr-1"></i>
                  +15% from last month
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <i className="fas fa-dollar-sign text-white text-2xl"></i>
              </div>
            </div>
          </div>

          {/* Total Customers */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Customers</p>
                <p className="text-3xl font-black text-gray-900 mt-2">{stats.totalCustomers}</p>
                <p className="text-sm text-green-600 font-medium mt-1">
                  <i className="fas fa-arrow-up mr-1"></i>
                  +5% from last month
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                <i className="fas fa-users text-white text-2xl"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl border border-gray-200/50 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-gray-900">Recent Orders</h2>
              <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                <i className="fas fa-plus mr-2"></i>
                New Order
              </button>
            </div>
            <div className="overflow-hidden">
              <div className="space-y-4">
                {recentOrders.map(order => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-gray-200/50 hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl flex items-center justify-center text-white font-bold">
                        #{order.id}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{order.customer}</h3>
                        <p className="text-sm text-gray-600">{order.date}</p>
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
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-8">
            <h2 className="text-2xl font-black text-gray-900 mb-6">Quick Actions</h2>
            <div className="space-y-4">
              <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-3">
                <i className="fas fa-plus-circle text-xl"></i>
                Add New Product
              </button>
              <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-3">
                <i className="fas fa-eye text-xl"></i>
                View All Orders
              </button>
              <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-xl font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-3">
                <i className="fas fa-users text-xl"></i>
                Manage Customers
              </button>
              <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-3">
                <i className="fas fa-chart-bar text-xl"></i>
                View Analytics
              </button>
              <button className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white p-4 rounded-xl font-semibold hover:from-gray-700 hover:to-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-3">
                <i className="fas fa-cog text-xl"></i>
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
