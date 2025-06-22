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
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-green-700 mb-6">Your Cart</h2>
        <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
          Your cart is empty.
        </div>
        <div className="flex justify-center mt-6">
          <button
            className="bg-green-600 hover:bg-green-800 text-white px-6 py-2 rounded-full font-semibold shadow transition-all duration-200"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-green-700 mb-6">Your Cart</h2>
      <div className="bg-white rounded-xl shadow p-6">
        <table className="w-full text-left">
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
                <td className="py-3 flex items-center gap-3">
                  <img
                    src={item.image ? item.image : "/placeholder.jpg"}
                    alt={item.title}
                    className="w-14 h-14 object-cover rounded border"
                  />
                  <span className="font-semibold">{item.title}</span>
                </td>
                <td className="py-3 text-green-700 font-bold">UGX {item.price}</td>
                <td className="py-3">
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
                <td className="py-3 font-semibold">
                  UGX {(Number(item.price) * item.quantity).toLocaleString()}
                </td>
                <td className="py-3">
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
    </div>
  );
}

export default Cart;