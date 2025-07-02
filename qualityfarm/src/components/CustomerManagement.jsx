import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showCustomerModal, setShowCustomerModal] = useState(false);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      // This would be replaced with actual API call
      setTimeout(() => {
        setCustomers([
          {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+256 123 456 789',
            totalOrders: 12,
            totalSpent: 450000,
            joinDate: '2024-01-15',
            status: 'active',
            lastOrder: '2025-07-01'
          },
          {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            phone: '+256 987 654 321',
            totalOrders: 8,
            totalSpent: 320000,
            joinDate: '2024-02-20',
            status: 'active',
            lastOrder: '2025-06-28'
          },
          {
            id: 3,
            name: 'Mike Johnson',
            email: 'mike@example.com',
            phone: '+256 555 123 456',
            totalOrders: 15,
            totalSpent: 680000,
            joinDate: '2023-11-10',
            status: 'active',
            lastOrder: '2025-07-02'
          },
          {
            id: 4,
            name: 'Sarah Williams',
            email: 'sarah@example.com',
            phone: '+256 777 888 999',
            totalOrders: 5,
            totalSpent: 180000,
            joinDate: '2024-03-05',
            status: 'inactive',
            lastOrder: '2025-05-15'
          }
        ]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      toast.error('Failed to load customers');
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">Active</span>;
      case 'inactive':
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">Inactive</span>;
      case 'blocked':
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200">Blocked</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">Unknown</span>;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const viewCustomerDetails = (customer) => {
    setSelectedCustomer(customer);
    setShowCustomerModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading customers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2 flex items-center gap-3">
              <i className="fas fa-users text-purple-600"></i>
              Customer Management
            </h1>
            <p className="text-lg text-gray-600 font-medium">
              Manage your customer relationships and analytics
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 px-6 py-3 rounded-xl border border-purple-200">
              <span className="text-purple-700 font-bold text-lg">{customers.length}</span>
              <span className="text-purple-600 text-sm ml-1">Total Customers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <i className="fas fa-search text-gray-400"></i>
              </div>
              <input
                type="text"
                placeholder="Search customers by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-200"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
            <i className="fas fa-list text-purple-600"></i>
            Customers ({filteredCustomers.length})
          </h2>
        </div>
        
        {filteredCustomers.length === 0 ? (
          <div className="p-12 text-center">
            <i className="fas fa-users text-6xl text-gray-300 mb-4"></i>
            <h3 className="text-xl font-bold text-gray-600 mb-2">No customers found</h3>
            <p className="text-gray-500">Try adjusting your search criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Orders</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Total Spent</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Last Order</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                          {customer.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{customer.name}</h3>
                          <p className="text-sm text-gray-600">Joined {customer.joinDate}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{customer.email}</p>
                        <p className="text-sm text-gray-600">{customer.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-gray-900">{customer.totalOrders}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-gray-900">{formatCurrency(customer.totalSpent)}</span>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(customer.status)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-900 font-medium">{customer.lastOrder}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => viewCustomerDetails(customer)}
                          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors duration-200"
                          title="View Details"
                        >
                          <i className="fas fa-eye"></i>
                        </button>
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors duration-200"
                          title="Send Email"
                        >
                          <i className="fas fa-envelope"></i>
                        </button>
                        <button
                          className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg transition-colors duration-200"
                          title="Edit Customer"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Customer Details Modal */}
      {showCustomerModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                <i className="fas fa-user text-purple-600"></i>
                Customer Details - {selectedCustomer.name}
              </h3>
            </div>
            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-bold text-gray-900 mb-3">Contact Information</h4>
                  <div className="space-y-2">
                    <div>
                      <label className="text-sm font-semibold text-gray-600">Name</label>
                      <p className="font-medium text-gray-900">{selectedCustomer.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-600">Email</label>
                      <p className="font-medium text-gray-900">{selectedCustomer.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-600">Phone</label>
                      <p className="font-medium text-gray-900">{selectedCustomer.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-bold text-gray-900 mb-3">Purchase History</h4>
                  <div className="space-y-2">
                    <div>
                      <label className="text-sm font-semibold text-gray-600">Total Orders</label>
                      <p className="font-medium text-gray-900">{selectedCustomer.totalOrders}</p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-600">Total Spent</label>
                      <p className="font-medium text-gray-900">{formatCurrency(selectedCustomer.totalSpent)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-600">Last Order</label>
                      <p className="font-medium text-gray-900">{selectedCustomer.lastOrder}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Status */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-gray-900">Account Status</h4>
                    <p className="text-sm text-gray-600">Customer since {selectedCustomer.joinDate}</p>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(selectedCustomer.status)}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-4">
              <button
                onClick={() => setShowCustomerModal(false)}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-xl font-semibold transition-colors duration-200"
              >
                Close
              </button>
              <button
                onClick={() => {
                  toast.success('Email sent to customer!');
                  setShowCustomerModal(false);
                }}
                className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all duration-200"
              >
                Send Email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerManagement;
