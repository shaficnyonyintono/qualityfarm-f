import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Checkout() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    delivery_address: '',
    delivery_city: '',
    delivery_notes: ''
  });
  const navigate = useNavigate();

  const API_BASE = window.location.hostname === 'localhost' 
    ? "http://localhost:8000" 
    : "https://qualityfarm-b-1.onrender.com";

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(stored);
    
    // Pre-fill with user data if available
    const username = localStorage.getItem('username');
    if (username) {
      setOrderData(prev => ({
        ...prev,
        customer_name: username,
        customer_phone: username // Since username is phone in your system
      }));
    }
  }, []);

  const calculateTotals = () => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = 10000; // Fixed delivery fee
    const taxAmount = subtotal * 0.18; // 18% tax
    const total = subtotal + deliveryFee + taxAmount;
    
    return { subtotal, deliveryFee, taxAmount, total };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please log in to place an order');
        navigate('/login');
        return;
      }

      // Prepare order items
      const items = cart.map(item => ({
        item_id: item.id,
        quantity: item.quantity
      }));

      const orderPayload = {
        ...orderData,
        items
      };

      const response = await fetch(`${API_BASE}/orders/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload),
      });

      if (response.ok) {
        await response.json();
        toast.success('Order placed successfully!');
        
        // Clear cart
        localStorage.removeItem('cart');
        window.dispatchEvent(new Event('cartUpdated'));
        
        // Redirect to orders page
        navigate('/orders');
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Failed to place order');
      }
    } catch (error) {
      console.error('Order submission error:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const { subtotal, deliveryFee, taxAmount, total } = calculateTotals();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <i className="fas fa-shopping-cart text-6xl text-gray-300 mb-4"></i>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some items to your cart to proceed with checkout.</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">Complete your order details</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Delivery Information</h2>
            
            <form onSubmit={handleOrder} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="customer_name"
                    value={orderData.customer_name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="customer_email"
                    value={orderData.customer_email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="customer_phone"
                  value={orderData.customer_phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Address *
                </label>
                <textarea
                  name="delivery_address"
                  value={orderData.delivery_address}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  placeholder="Enter your full delivery address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  name="delivery_city"
                  value={orderData.delivery_city}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Notes (Optional)
                </label>
                <textarea
                  name="delivery_notes"
                  value={orderData.delivery_notes}
                  onChange={handleInputChange}
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  placeholder="Any special delivery instructions"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Placing Order...
                  </div>
                ) : (
                  'Place Order'
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <i className="fas fa-image text-gray-400"></i>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-sm font-medium text-green-600">
                      {formatCurrency(item.price)} × {item.quantity} = {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Delivery Fee:</span>
                <span>{formatCurrency(deliveryFee)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax (18%):</span>
                <span>{formatCurrency(taxAmount)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold border-t pt-2">
                <span>Total:</span>
                <span className="text-green-600">{formatCurrency(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;