import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      toast.success("Thank you for subscribing to QualityFarm!");
      setEmail("");
    } else {
      toast.error("Please enter a valid email address");
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-green-900 to-emerald-950 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-transparent to-emerald-900/20"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Premium Call to Action */}
        <div className="py-16 text-center border-b border-green-800/50">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-800/50 to-emerald-800/50 backdrop-blur-sm px-6 py-3 rounded-full border border-green-700/50 mb-8">
              <i className="fas fa-leaf text-green-400 text-lg"></i>
              <span className="text-green-200 font-semibold tracking-wide">Stay Connected</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-black mb-6">
              Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">QualityFarm</span> Today
            </h2>
            
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Get exclusive access to the freshest produce, premium agricultural products, and special deals delivered straight to your door.
            </p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <div className="relative flex-1 w-full">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="fas fa-envelope text-gray-500"></i>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border-2 border-green-700/30 focus:border-green-500 focus:ring-4 focus:ring-green-500/20 outline-none text-white placeholder-gray-400 transition-all duration-300"
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap"
              >
                <i className="fas fa-paper-plane mr-2"></i>
                Subscribe Now
              </button>
            </form>
          </div>
        </div>
        
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Enhanced Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 bg-gradient-to-br from-green-400 via-green-500 to-green-700 rounded-2xl flex items-center justify-center shadow-2xl">
                  <i className="fas fa-seedling text-white text-2xl"></i>
                </div>
                <div>
                  <h3 className="text-3xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent tracking-tight">
                    QualityFarm
                  </h3>
                  <p className="text-sm text-gray-400 font-semibold">Premium Agricultural Excellence</p>
                </div>
              </div>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-md">
                Your trusted partner for premium agricultural products. We connect farmers with consumers, 
                delivering fresh, quality produce directly to your doorstep.
              </p>
              
              {/* Enhanced Social Media */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-green-400 mb-4">Connect With Us</h4>
                <div className="flex gap-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="group w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                  >
                    <i className="fab fa-facebook-f text-white text-lg group-hover:scale-110 transition-transform duration-300"></i>
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                    className="group w-12 h-12 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-sky-500/25"
                  >
                    <i className="fab fa-twitter text-white text-lg group-hover:scale-110 transition-transform duration-300"></i>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="group w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-pink-500/25"
                  >
                    <i className="fab fa-instagram text-white text-lg group-hover:scale-110 transition-transform duration-300"></i>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="group w-12 h-12 bg-gradient-to-br from-blue-700 to-blue-800 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-blue-700/25"
                  >
                    <i className="fab fa-linkedin-in text-white text-lg group-hover:scale-110 transition-transform duration-300"></i>
                  </a>
                  <a
                    href="https://wa.me/256740432030"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="group w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-green-500/25"
                  >
                    <i className="fab fa-whatsapp text-white text-lg group-hover:scale-110 transition-transform duration-300"></i>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-bold text-green-400 mb-6 flex items-center gap-2">
                <i className="fas fa-link text-green-500"></i>
                Quick Links
              </h4>
              <ul className="space-y-4">
                {[
                  { to: "/", label: "Home", icon: "fas fa-home" },
                  { to: "/products", label: "Products", icon: "fas fa-shopping-bag" },
                  { to: "/categories", label: "Categories", icon: "fas fa-th-large" },
                  { to: "/featured", label: "Featured", icon: "fas fa-star" },
                  { to: "/cart", label: "Cart", icon: "fas fa-shopping-cart" },
                  { to: "/profile", label: "Profile", icon: "fas fa-user" }
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link 
                      to={link.to} 
                      className="flex items-center gap-3 text-gray-300 hover:text-green-400 transition-colors duration-200 group"
                    >
                      <i className={`${link.icon} w-4 text-green-500 group-hover:scale-110 transition-transform duration-200`}></i>
                      <span className="group-hover:translate-x-1 transition-transform duration-200">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Contact & Support */}
            <div>
              <h4 className="text-xl font-bold text-green-400 mb-6 flex items-center gap-2">
                <i className="fas fa-headset text-green-500"></i>
                Support & Contact
              </h4>
              
              <div className="space-y-6">
                {/* Contact Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-300">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center">
                      <i className="fas fa-envelope text-green-400"></i>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <a href="mailto:support@qualityfarm.com" className="text-white hover:text-green-400 transition-colors duration-200">
                        support@qualityfarm.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-300">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center">
                      <i className="fas fa-phone text-green-400"></i>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Phone</p>
                      <a href="tel:+256740432030" className="text-white hover:text-green-400 transition-colors duration-200">
                        +256 740432030
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-300">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center">
                      <i className="fas fa-map-marker-alt text-green-400"></i>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Location</p>
                      <p className="text-white">Kampala, Uganda</p>
                    </div>
                  </div>
                </div>
                
                {/* Support Links */}
                <div className="pt-4 border-t border-green-800/30">
                  <ul className="space-y-3">
                    {[
                      { to: "/contact", label: "Contact Us", icon: "fas fa-comment" },
                      { to: "/faq", label: "FAQ", icon: "fas fa-question-circle" },
                      { to: "/support", label: "Support Center", icon: "fas fa-life-ring" }
                    ].map((link, idx) => (
                      <li key={idx}>
                        <Link 
                          to={link.to} 
                          className="flex items-center gap-3 text-gray-300 hover:text-green-400 transition-colors duration-200 group"
                        >
                          <i className={`${link.icon} w-4 text-green-500 group-hover:scale-110 transition-transform duration-200`}></i>
                          <span className="group-hover:translate-x-1 transition-transform duration-200">{link.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Legal Section */}
        <div className="border-t border-green-800/50 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                <i className="fas fa-copyright text-white text-sm"></i>
              </div>
              <span className="text-gray-300">
                &copy; {new Date().getFullYear()} QualityFarm. All rights reserved.
              </span>
            </div>
            
            {/* Trust Badges */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-green-400">
                <i className="fas fa-shield-alt"></i>
                <span className="text-sm font-semibold">Secure</span>
              </div>
              <div className="flex items-center gap-2 text-green-400">
                <i className="fas fa-truck"></i>
                <span className="text-sm font-semibold">Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-green-400">
                <i className="fas fa-leaf"></i>
                <span className="text-sm font-semibold">100% Organic</span>
              </div>
            </div>
            
            {/* Legal Links */}
            <div className="flex items-center gap-6 text-sm">
              <Link 
                to="/privacy" 
                className="text-gray-400 hover:text-green-400 transition-colors duration-200 flex items-center gap-2"
              >
                <i className="fas fa-user-shield"></i>
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-gray-400 hover:text-green-400 transition-colors duration-200 flex items-center gap-2"
              >
                <i className="fas fa-file-contract"></i>
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;