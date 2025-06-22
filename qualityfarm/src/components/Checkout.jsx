import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Checkout() {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(stored);
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const handleOrder = (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate order submission (replace with real API call)
    setTimeout(() => {
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cartUpdated"));
      setSubmitting(false);
      toast.success("Order placed successfully!"); // replaced alert
      navigate("/");
    }, 1500);
  };

  if (cart.length === 0)
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-green-700 mb-6">Checkout</h2>
        <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
          Your cart is empty.
        </div>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-green-700 mb-6">Checkout</h2>
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h3 className="font-semibold mb-4">Order Summary</h3>
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="mb-2 flex justify-between">
              <span>
                {item.title} x {item.quantity}
              </span>
              <span>UGX {(Number(item.price) * item.quantity).toLocaleString()}</span>
            </li>
          ))}
        </ul>
        <div className="font-bold mt-4">
          Total: <span className="text-green-700">UGX {total.toLocaleString()}</span>
        </div>
      </div>
      <form onSubmit={handleOrder} className="bg-white rounded-xl shadow p-6">
        <label className="block mb-2 font-semibold">Delivery Address</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2 mb-4"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-800 text-white px-8 py-2 rounded-full font-semibold shadow transition-all duration-200 w-full"
          disabled={submitting}
        >
          {submitting ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}

export default Checkout;