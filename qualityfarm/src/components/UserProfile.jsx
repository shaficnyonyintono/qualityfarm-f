import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);
  const [formData, setFormData] = useState({});

  const API_BASE = window.location.hostname === 'localhost' 
    ? "http://localhost:8000" 
    : "https://qualityfarm-b-1.onrender.com";

  const loadUserData = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token found:', !!token); // Debug log
      
      if (!token) {
        toast.error('Please log in to view your profile');
        setUser(null);
        setLoading(false);
        return;
      }

      console.log('Making API call to:', `${API_BASE}/profile/`); // Debug log

      const response = await fetch(`${API_BASE}/profile/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Response status:', response.status); // Debug log

      if (response.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        toast.error('Session expired. Please log in again.');
        setUser(null);
        setLoading(false);
        return;
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText); // Debug log
        toast.error(`Failed to load profile: ${response.status} ${response.statusText}`);
        setUser(null);
        setLoading(false);
        return;
      }

      const userData = await response.json();
      console.log('User data received:', userData); // Debug log
      
      if (!userData || !userData.name) {
        console.error('Invalid user data received:', userData);
        toast.error('Invalid profile data received');
        setUser(null);
        setLoading(false);
        return;
      }
      
      setUser(userData);
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        address: userData.address || '',
      });
      setLoading(false);
    } catch (error) {
      console.error('Error loading user data:', error);
      toast.error(`Failed to load profile data: ${error.message}`);
      setUser(null);
      setLoading(false);
    }
  }, [API_BASE]);

  const loadOrderHistory = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`${API_BASE}/profile/orders/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const orders = await response.json();
        setOrderHistory(orders);
      }
    } catch (error) {
      console.error('Error loading order history:', error);
    }
  }, [API_BASE]);

  useEffect(() => {
    loadUserData();
    loadOrderHistory();
  }, [loadUserData, loadOrderHistory]);

  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please log in to update your profile');
        return;
      }

      const response = await fetch(`${API_BASE}/profile/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update profile');
      }

      // Reload user data to reflect changes
      await loadUserData();
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.message || 'Failed to update profile');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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

  // If user is null after loading, show error state
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-exclamation-triangle text-red-500 text-2xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Not Available</h2>
          <p className="text-gray-600 mb-6">
            Unable to load your profile data. Please try logging in again.
          </p>
          <button 
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('username');
              window.location.href = '/login';
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Go to Login
          </button>
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
                  <span className="text-green-700 font-bold">{user.total_orders}</span>
                  <span className="text-green-600 text-sm ml-1">Orders</span>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-2 rounded-xl border border-blue-200">
                  <span className="text-blue-700 font-bold">{formatCurrency(user.total_spent)}</span>
                  <span className="text-blue-600 text-sm ml-1">Spent</span>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 px-4 py-2 rounded-xl border border-purple-200">
                  <span className="text-purple-700 font-bold">Member since</span>
                  <span className="text-purple-600 text-sm ml-1">{user.join_date}</span>
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
                    name="name"
                    value={isEditing ? formData.name || '' : user.name}
                    onChange={handleInputChange}
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
                    name="email"
                    value={isEditing ? formData.email || '' : user.email}
                    onChange={handleInputChange}
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
                    name="phone"
                    value={user.phone}
                    disabled
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">Phone number cannot be changed</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Join Date</label>
                  <input
                    type="text"
                    value={user.join_date}
                    disabled
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Address</label>
                  <textarea
                    name="address"
                    value={isEditing ? formData.address || '' : user.address}
                    onChange={handleInputChange}
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
