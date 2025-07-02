import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      // This would be replaced with actual API call
      setTimeout(() => {
        setProducts([
          { 
            id: 1, 
            title: 'Premium Tomato Seeds', 
            price: 25000, 
            category: 'Seeds', 
            stock: 150, 
            status: 'active',
            image: '/api/placeholder/100/100',
            description: 'High-quality hybrid tomato seeds for optimal yield'
          },
          { 
            id: 2, 
            title: 'Organic Fertilizer', 
            price: 45000, 
            category: 'Fertilizers', 
            stock: 75, 
            status: 'active',
            image: '/api/placeholder/100/100',
            description: 'Natural organic fertilizer for healthy soil'
          },
          { 
            id: 3, 
            title: 'Garden Hoe', 
            price: 35000, 
            category: 'Tools', 
            stock: 0, 
            status: 'out_of_stock',
            image: '/api/placeholder/100/100',
            description: 'Professional grade garden hoe for cultivation'
          },
          { 
            id: 4, 
            title: 'Irrigation Pipes', 
            price: 15000, 
            category: 'Equipment', 
            stock: 200, 
            status: 'active',
            image: '/api/placeholder/100/100',
            description: 'Durable PVC pipes for irrigation systems'
          }
        ]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      toast.error('Failed to load products');
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status, stock) => {
    if (stock === 0) {
      return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200">Out of Stock</span>;
    }
    if (stock < 10) {
      return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700 border border-orange-200">Low Stock</span>;
    }
    return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">In Stock</span>;
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowAddModal(true);
  };

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
      toast.success('Product deleted successfully');
    }
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
          <p className="text-gray-600 font-medium">Loading products...</p>
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
                  <i className="fas fa-boxes text-green-600"></i>
                  Product Management
                </h1>
                <p className="text-lg text-gray-600 font-medium">
                  Manage your agricultural products inventory
                </p>
              </div>
              <button 
                onClick={() => {setShowAddModal(true); setEditingProduct(null);}}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl font-bold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-3"
              >
                <i className="fas fa-plus text-xl"></i>
                Add New Product
              </button>
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
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200"
                />
              </div>
            </div>
            <div className="lg:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200"
              >
                <option value="all">All Categories</option>
                <option value="Seeds">Seeds</option>
                <option value="Fertilizers">Fertilizers</option>
                <option value="Tools">Tools</option>
                <option value="Equipment">Equipment</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
              <i className="fas fa-list text-blue-600"></i>
              Products ({filteredProducts.length})
            </h2>
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center">
              <i className="fas fa-box-open text-6xl text-gray-300 mb-4"></i>
              <h3 className="text-xl font-bold text-gray-600 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your search or add a new product.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-16 bg-gray-200 rounded-xl flex items-center justify-center overflow-hidden">
                            <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900">{product.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-gray-900">{formatCurrency(product.price)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-900">{product.stock} units</span>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(product.status, product.stock)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors duration-200"
                            title="Edit Product"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors duration-200"
                            title="Delete Product"
                          >
                            <i className="fas fa-trash"></i>
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

        {/* Add/Edit Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                  <i className={`fas ${editingProduct ? 'fa-edit' : 'fa-plus'} text-green-600`}></i>
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h3>
              </div>
              <div className="p-6">
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Product Name</label>
                    <input
                      type="text"
                      defaultValue={editingProduct?.title || ''}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200"
                      placeholder="Enter product name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                    <textarea
                      defaultValue={editingProduct?.description || ''}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200"
                      rows="3"
                      placeholder="Enter product description"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Price (UGX)</label>
                      <input
                        type="number"
                        defaultValue={editingProduct?.price || ''}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Stock</label>
                      <input
                        type="number"
                        defaultValue={editingProduct?.stock || ''}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200"
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                    <select
                      defaultValue={editingProduct?.category || ''}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200"
                    >
                      <option value="">Select Category</option>
                      <option value="Seeds">Seeds</option>
                      <option value="Fertilizers">Fertilizers</option>
                      <option value="Tools">Tools</option>
                      <option value="Equipment">Equipment</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="p-6 border-t border-gray-200 flex gap-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-xl font-semibold transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    toast.success(editingProduct ? 'Product updated successfully!' : 'Product added successfully!');
                    setShowAddModal(false);
                  }}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-xl font-semibold transition-all duration-200"
                >
                  {editingProduct ? 'Update' : 'Add'} Product
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductManagement;
