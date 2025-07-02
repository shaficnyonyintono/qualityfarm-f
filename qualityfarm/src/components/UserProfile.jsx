import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      // This would be replaced with actual API calls
      setTimeout(() => {
        setUser({
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '+256 123 456 789',
          address: '123 Farm Road, Kampala, Uganda',
          joinDate: '2024-01-15',
          totalOrders: 12,
          totalSpent: 450000,
          avatar: null
        });
        
        setOrderHistory([
          { id: 1, orderNumber: 'QF-2025-001', date: '2025-07-01', total: 95000, status: 'delivered' },
          { id: 2, orderNumber: 'QF-2025-002', date: '2025-06-28', total: 67000, status: 'delivered' },
          { id: 3, orderNumber: 'QF-2025-003', date: '2025-06-25', total: 123000, status: 'delivered' }
        ]);

        setLoading(false);
      }, 1000);
    } catch (error) {
      toast.error('Failed to load user data');
      setLoading(false);
    }
  };

  const handleSaveProfile = () => {
    // This would send data to backend
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'delivered':
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">Delivered</span>;
      case 'shipped':
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">Shipped</span>;
      case 'processing':
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 border border-yellow-200">Processing</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">Unknown</span>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-green-500 via-green-600 to-green-700 rounded-3xl flex items-center justify-center text-white shadow-2xl">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-3xl" />
                ) : (
                  <i className="fas fa-user text-5xl"></i>
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                <i className="fas fa-check text-white text-sm"></i>
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-black text-gray-900 mb-2">{user.name}</h1>
              <p className="text-lg text-gray-600 font-medium mb-4">{user.email}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="bg-gradient-to-r from-green-50 to-green-100 px-4 py-2 rounded-xl border border-green-200">
                  <span className="text-green-700 font-bold">{user.totalOrders}</span>
                  <span className="text-green-600 text-sm ml-1">Orders</span>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-2 rounded-xl border border-blue-200">
                  <span className="text-blue-700 font-bold">{formatCurrency(user.totalSpent)}</span>
                  <span className="text-blue-600 text-sm ml-1">Spent</span>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 px-4 py-2 rounded-xl border border-purple-200">
                  <span className="text-purple-700 font-bold">Member since</span>
                  <span className="text-purple-600 text-sm ml-1">{user.joinDate}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <i className={`fas ${isEditing ? 'fa-times' : 'fa-edit'}`}></i>
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 mb-8">
          <div className="flex flex-wrap border-b border-gray-200">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-8 py-4 font-semibold transition-all duration-200 ${
                activeTab === 'profile'
                  ? 'text-green-600 border-b-2 border-green-500 bg-green-50'
                  : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'
              }`}
            >
              <i className="fas fa-user mr-2"></i>
              Profile Information
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-8 py-4 font-semibold transition-all duration-200 ${
                activeTab === 'orders'
                  ? 'text-blue-600 border-b-2 border-blue-500 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <i className="fas fa-shopping-bag mr-2"></i>
              Order History
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-8 py-4 font-semibold transition-all duration-200 ${
                activeTab === 'settings'
                  ? 'text-purple-600 border-b-2 border-purple-500 bg-purple-50'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
              }`}
            >
              <i className="fas fa-cog mr-2"></i>
              Settings
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-8">
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <i className="fas fa-user-edit text-green-600"></i>
                Profile Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    defaultValue={user.name}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 ${
                      isEditing
                        ? 'border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500'
                        : 'border-gray-200 bg-gray-50'
                    } outline-none`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    defaultValue={user.email}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 ${
                      isEditing
                        ? 'border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500'
                        : 'border-gray-200 bg-gray-50'
                    } outline-none`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    defaultValue={user.phone}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 ${
                      isEditing
                        ? 'border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500'
                        : 'border-gray-200 bg-gray-50'
                    } outline-none`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Join Date</label>
                  <input
                    type="text"
                    value={user.joinDate}
                    disabled
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Address</label>
                  <textarea
                    defaultValue={user.address}
                    disabled={!isEditing}
                    rows="3"
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 ${
                      isEditing
                        ? 'border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500'
                        : 'border-gray-200 bg-gray-50'
                    } outline-none`}
                  />
                </div>
              </div>
              {isEditing && (
                <div className="mt-6 flex gap-4">
                  <button
                    onClick={handleSaveProfile}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <i className="fas fa-save mr-2"></i>
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <i className="fas fa-history text-blue-600"></i>
                Order History
              </h2>
              <div className="space-y-4">
                {orderHistory.map(order => (
                  <div key={order.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-200">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">Order {order.orderNumber}</h3>
                        <p className="text-gray-600">Placed on {order.date}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-bold text-gray-900 text-xl">{formatCurrency(order.total)}</p>
                        </div>
                        {getStatusBadge(order.status)}
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <i className="fas fa-cog text-purple-600"></i>
                Account Settings
              </h2>
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Password & Security</h3>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200">
                    Change Password
                  </button>
                </div>
                <div className="border border-gray-200 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Notifications</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span>Email notifications for new orders</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span>SMS notifications for order updates</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" className="rounded" />
                      <span>Marketing emails</span>
                    </label>
                  </div>
                </div>
                <div className="border border-red-200 rounded-xl p-6">
                  <h3 className="font-bold text-red-700 mb-4">Danger Zone</h3>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
