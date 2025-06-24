import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMsg("");
    try {
      const res = await fetch("https://qualityfarm-b-1.onrender.com/auth/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, email, name, location }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg("Account created successfully! You can now log in.");
        setTimeout(() => {
          navigate("/login");
        }, 1200);
      } else {
        setError(data.error || "Signup failed.");
      }
    } catch {
      setError("Network error.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
          Sign Up
        </h2>
        {msg && <div className="mb-4 text-green-700 text-center">{msg}</div>}
        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              placeholder="Your Name"
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Location</label>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              required
              placeholder="Your Location"
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-green-400"
            />
          </div>
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
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-green-400"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white py-2 rounded font-semibold shadow transition-all duration-200"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;