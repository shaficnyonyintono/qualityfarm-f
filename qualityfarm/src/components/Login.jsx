import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Add this import

function Login() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  // Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMsg("");
    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/send-otp/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (res.status === 401) {
        localStorage.removeItem("token");
        toast.error("Session expired. Please log in again.");
        navigate("/login");
        return;
      }
      if (res.ok) {
        setMsg("OTP sent! Please check your phone.");
        setStep(2);
      } else {
        setError(data.error || "Failed to send OTP.");
      }
    } catch {
      setError("Network error.");
    }
    setLoading(false);
  };

  // Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMsg("");
    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/verify-otp/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      });
      const data = await res.json();
      if (res.status === 401) {
        localStorage.removeItem("token");
        toast.error("Session expired. Please log in again.");
        navigate("/login");
        return;
      }
      if (res.ok) {
        toast.success("Login successful!"); // Show toast on successful login
        setMsg("Login successful!");
        localStorage.setItem("token", data.access); // Store only the access token!
        localStorage.setItem("username", data.name); // Save the name for Navbar
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setError(data.error || "Invalid OTP.");
      }
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
          {step === 1 ? "Log In" : "Verify OTP"}
        </h2>
        {msg && <div className="mb-4 text-green-700 text-center">{msg}</div>}
        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
        {step === 1 ? (
          <form onSubmit={handleSendOtp} className="space-y-5">
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
                placeholder="+256xxxxxxxxx"
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-green-400"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white py-2 rounded font-semibold shadow transition-all duration-200"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-green-400"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white py-2 rounded font-semibold shadow transition-all duration-200"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;