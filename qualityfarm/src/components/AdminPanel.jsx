import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useLocation, Link, Outlet } from 'react-router-dom';

const AdminPanel = () => {
  const [adminStats, setAdminStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    pendingOrders: 0,
    lowStockItems: 0
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAdminStatus = () => {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');
      const userRole = localStorage.getItem('userRole');
      
      if (!token) {
        toast.error('Please log in to access admin panel');
        navigate('/login');
        return;
      }

      // Check if user has admin privileges
      if (username === 'admin' || username === 'administrator' || userRole === 'admin') {
        loadAdminStats();
      } else {
        toast.error('Access denied. Admin privileges required.');
        navigate('/');
        return;
      }
    };

    checkAdminStatus();
  }, [navigate]);

  const loadAdminStats = async () => {
    try {
      // This would be replaced with actual API calls
      setTimeout(() => {
        setAdminStats({
          totalProducts: 156,
          totalOrders: 1240,
          totalRevenue: 8500000,
          totalCustomers: 890,
          pendingOrders: 23,
          lowStockItems: 8
        });
      }, 500);
    } catch {
      toast.error('Failed to load admin statistics');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userRole");
    localStorage.removeItem("cart");
    toast.success("Successfully logged out!");
    navigate("/login");
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const menuItems = [
    {
      title: 'Dashboard',
      icon: 'fas fa-tachometer-alt',
      path: '/admin',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      title: 'Products',
      icon: 'fas fa-boxes',
      path: '/admin/products',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      title: 'Orders',
      icon: 'fas fa-shopping-cart',
      path: '/admin/orders',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      badge: adminStats.pendingOrders
    },
    {
      title: 'Customers',
      icon: 'fas fa-users',
      path: '/admin/customers',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      title: 'Categories',
      icon: 'fas fa-th-large',
      path: '/admin/categories',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200'
    },
    {
      title: 'Analytics',
      icon: 'fas fa-chart-bar',
      path: '/admin/analytics',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200'
    },
    {
      title: 'Settings',
      icon: 'fas fa-cog',
      path: '/admin/settings',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-20'} transition-all duration-300 bg-white shadow-2xl border-r border-gray-200 flex flex-col`}>
        {/* Admin Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50">
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-3 ${!sidebarOpen && 'justify-center'}`}>
              <div className="h-12 w-12 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center shadow-lg">
                <i className="fas fa-seedling text-white text-xl"></i>
              </div>
              {sidebarOpen && (
                <div>
                  <h1 className="text-xl font-black text-gray-900">QualityFarm</h1>
                  <p className="text-sm text-gray-600 font-medium">Admin Panel</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-white transition-colors duration-200"
            >
              <i className={`fas ${sidebarOpen ? 'fa-chevron-left' : 'fa-chevron-right'} text-gray-600`}></i>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        {sidebarOpen && (
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                <div className="text-2xl font-black text-green-700">{adminStats.totalProducts}</div>
                <div className="text-xs text-green-600 font-medium">Products</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                <div className="text-2xl font-black text-blue-700">{adminStats.totalOrders}</div>
                <div className="text-xs text-blue-600 font-medium">Orders</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                <div className="text-lg font-black text-purple-700">{formatCurrency(adminStats.totalRevenue)}</div>
                <div className="text-xs text-purple-600 font-medium">Revenue</div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
                <div className="text-2xl font-black text-orange-700">{adminStats.totalCustomers}</div>
                <div className="text-xs text-orange-600 font-medium">Customers</div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-200 relative group ${
                    isActive
                      ? `${item.bgColor} ${item.color} border ${item.borderColor} shadow-lg`
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  } ${!sidebarOpen && 'justify-center'}`}
                >
                  <i className={`${item.icon} text-xl ${isActive ? item.color : ''}`}></i>
                  {sidebarOpen && (
                    <>
                      <span className="font-semibold flex-1">{item.title}</span>
                      {item.badge && item.badge > 0 && (
                        <span className="bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                  {isActive && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-green-500 to-green-600 rounded-l-full"></div>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Admin User Info */}
        <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
          <div className={`flex items-center gap-3 ${!sidebarOpen && 'justify-center'}`}>
            <div className="h-10 w-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white shadow-md">
              <i className="fas fa-user-shield"></i>
            </div>
            {sidebarOpen && (
              <div className="flex-1">
                <div className="text-sm font-bold text-gray-900">
                  {localStorage.getItem("username") || 'Admin'}
                </div>
                <div className="text-xs text-gray-600">System Administrator</div>
              </div>
            )}
            <button
              onClick={handleLogout}
              className={`p-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors duration-200 ${!sidebarOpen && 'w-full'}`}
              title="Logout"
            >
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow-lg border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-black text-gray-900">
                {menuItems.find(item => item.path === location.pathname)?.title || 'Admin Dashboard'}
              </h2>
              <p className="text-gray-600 font-medium">
                Manage your agricultural business efficiently
              </p>
            </div>
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-3 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                <i className="fas fa-bell text-xl text-gray-600"></i>
                {adminStats.pendingOrders > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {adminStats.pendingOrders}
                  </span>
                )}
              </button>
              
              {/* Quick Actions */}
              <Link
                to="/"
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <i className="fas fa-external-link-alt"></i>
                View Site
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
