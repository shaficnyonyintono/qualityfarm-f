import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Load cart from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(stored);
  }, []);

  // Update localStorage and Navbar badge
  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleIncrease = (id) => {
    const newCart = cart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(newCart);
  };

  const handleDecrease = (id) => {
    const newCart = cart
      .map(item =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter(item => item.quantity > 0);
    updateCart(newCart);
  };

  const handleRemove = (id) => {
    const newCart = cart.filter(item => item.id !== id);
    updateCart(newCart);
  };

  const handleCheckout = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to proceed to checkout."); // replaced alert
      navigate("/login");
      return;
    }
    navigate("/checkout");
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  if (cart.length === 0)
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 md:py-12 mt-16 md:mt-24">
        <h2 className="text-xl md:text-2xl font-bold text-green-700 mb-4 md:mb-6">Your Cart</h2>
        <div className="bg-white rounded-xl shadow p-6 md:p-8 text-center text-gray-500">
          <i className="fas fa-shopping-cart text-4xl md:text-6xl text-gray-300 mb-4"></i>
          <p className="text-base md:text-lg">Your cart is empty.</p>
          <p className="text-sm text-gray-400 mt-2">Add some products to get started!</p>
        </div>
        <div className="flex justify-center mt-4 md:mt-6">
          <button
            className="bg-green-600 hover:bg-green-800 text-white px-6 py-2 rounded-full font-semibold shadow transition-all duration-200 text-sm md:text-base"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12 mt-16 md:mt-24">
      <h2 className="text-xl md:text-2xl font-bold text-green-700 mb-4 md:mb-6">Your Cart</h2>
      
      {/* Mobile Card Layout */}
      <div className="block md:hidden space-y-4">
        {cart.map(item => (
          <div key={item.id} className="bg-white rounded-xl shadow p-4 border border-gray-100">
            <div className="flex gap-3 mb-3">
              <img
                src={item.image ? item.image : "/placeholder.jpg"}
                alt={item.title}
                className="w-16 h-16 object-cover rounded border flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">{item.title}</h3>
                <p className="text-green-700 font-bold text-sm">UGX {Number(item.price).toLocaleString()}</p>
              </div>
              <button
                className="text-red-500 hover:text-red-700 p-1"
                onClick={() => handleRemove(item.id)}
                aria-label="Remove item"
              >
                <i className="fas fa-trash text-sm"></i>
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 flex items-center justify-center text-sm"
                  onClick={() => handleDecrease(item.id)}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="px-3 py-1 bg-gray-50 rounded text-sm font-medium">{item.quantity}</span>
                <button
                  className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 flex items-center justify-center text-sm"
                  onClick={() => handleIncrease(item.id)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Subtotal</p>
                <p className="font-bold text-sm text-gray-900">
                  UGX {(Number(item.price) * item.quantity).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden md:block bg-white rounded-xl shadow p-6 overflow-x-auto">
        <table className="w-full text-left min-w-[600px] sm:min-w-0">
          <thead>
            <tr className="border-b">
              <th className="py-2">Product</th>
              <th className="py-2">Price</th>
              <th className="py-2">Quantity</th>
              <th className="py-2">Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="py-3 flex items-center gap-3 min-w-[180px]">
                  <img
                    src={item.image ? item.image : "/placeholder.jpg"}
                    alt={item.title}
                    className="w-14 h-14 object-cover rounded border"
                  />
                  <span className="font-semibold break-words">{item.title}</span>
                </td>
                <td className="py-3 text-green-700 font-bold min-w-[90px]">UGX {item.price}</td>
                <td className="py-3 min-w-[100px]">
                  <div className="flex items-center gap-2">
                    <button
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() => handleDecrease(item.id)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() => handleIncrease(item.id)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="py-3 font-semibold min-w-[110px]">
                  UGX {(Number(item.price) * item.quantity).toLocaleString()}
                </td>
                <td className="py-3 min-w-[60px]">
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleRemove(item.id)}
                    aria-label="Remove item"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-6">
          <div className="text-lg font-bold">
            Total: <span className="text-green-700">UGX {total.toLocaleString()}</span>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-full font-semibold shadow transition-all duration-200"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
          <button
            className="bg-green-600 hover:bg-green-800 text-white px-8 py-2 rounded-full font-semibold shadow transition-all duration-200"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

      {/* Mobile Total and Actions */}
      <div className="block md:hidden mt-6 space-y-4">
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-bold text-gray-900">Total:</span>
            <span className="text-xl font-bold text-green-700">UGX {total.toLocaleString()}</span>
          </div>
          
          <div className="space-y-3">
            <button
              className="w-full bg-green-600 hover:bg-green-800 text-white py-3 rounded-xl font-semibold shadow transition-all duration-200"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
            <button
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-medium shadow transition-all duration-200"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;