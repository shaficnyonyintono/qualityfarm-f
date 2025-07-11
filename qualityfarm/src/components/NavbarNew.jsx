import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const [profileOpen, setProfileOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const profileRef = useRef(null)
  const navigate = useNavigate();

  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      setCartCount(cart.reduce((total, item) => total + item.quantity, 0))
    }
    updateCartCount()
    window.addEventListener('cartUpdated', updateCartCount)
    return () => window.removeEventListener('cartUpdated', updateCartCount)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false)
      }
    }
    if (profileOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [profileOpen])

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("cart"); // Clear cart on logout
    setProfileOpen(false);
    toast.success("Successfully logged out!");
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search)}`);
      setMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isSticky 
        ? 'bg-white/90 backdrop-blur-xl shadow-2xl border-b border-green-200/30' 
        : 'bg-gradient-to-b from-white to-gray-50/80 backdrop-blur-sm'
    }`}>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Premium top bar */}
        <div className="hidden lg:flex items-center justify-between py-3 text-sm border-b border-green-100/50 bg-gradient-to-r from-green-50/30 to-blue-50/30">
          <div className="flex items-center gap-8 text-gray-700">
            <div className="flex items-center gap-2 hover:text-green-600 transition-colors duration-200">
              <div className="h-8 w-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <i className="fas fa-phone text-white text-xs"></i>
              </div>
              <span className="font-medium">+256 123 456 789</span>
            </div>
            <div className="flex items-center gap-2 hover:text-green-600 transition-colors duration-200">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <i className="fas fa-envelope text-white text-xs"></i>
              </div>
              <span className="font-medium">support@qualityfarm.com</span>
            </div>
            <div className="flex items-center gap-2 text-green-700 bg-green-50 px-3 py-1 rounded-full">
              <i className="fas fa-clock text-green-600"></i>
              <span className="font-medium">Mon-Fri: 8AM-6PM</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-gradient-to-r from-orange-50 to-red-50 text-orange-700 px-4 py-1 rounded-full border border-orange-200">
              <i className="fas fa-truck text-orange-600"></i>
              <span className="font-semibold">Free shipping on orders over UGX 100,000</span>
            </div>
            <div className="flex items-center gap-3">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-green-600 transition-colors">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Premium main navbar */}
        <nav className="flex items-center justify-between py-5 min-w-0">
          {/* Enhanced Logo */}
          <Link to="/" className="flex items-center gap-4 group flex-1 min-w-0">
            <div className="relative">
              <div className="h-12 w-12 sm:h-14 sm:w-14 bg-gradient-to-br from-green-400 via-green-500 to-green-700 rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-green-500/25 transition-all duration-500 group-hover:scale-105">
                <i className="fas fa-seedling text-white text-lg sm:text-2xl"></i>
              </div>
              <div className="absolute -top-1 -right-1 h-3 w-3 sm:h-4 sm:w-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
            </div>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-3xl font-black bg-gradient-to-r from-green-600 via-green-700 to-green-800 bg-clip-text text-transparent tracking-tight truncate">
                QualityFarm
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 font-semibold tracking-wide hidden xs:block">Premium Agricultural Excellence</p>
            </div>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 bg-gray-50/50 backdrop-blur-sm rounded-2xl px-2 py-2 border border-gray-200/50">
            <Link 
              to="/" 
              className="px-6 py-2.5 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600 font-semibold transition-all duration-300 rounded-xl relative group"
            >
              <i className="fas fa-home mr-2"></i>
              Home
              <span className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
            <Link 
              to="/products" 
              className="px-6 py-2.5 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 font-semibold transition-all duration-300 rounded-xl relative group"
            >
              <i className="fas fa-shopping-bag mr-2"></i>
              Products
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
            <Link 
              to="/categories" 
              className="px-6 py-2.5 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600 font-semibold transition-all duration-300 rounded-xl relative group"
            >
              <i className="fas fa-th-large mr-2"></i>
              Categories
              <span className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
            <Link 
              to="/featured" 
              className="px-6 py-2.5 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 font-semibold transition-all duration-300 rounded-xl relative group"
            >
              <i className="fas fa-star mr-2"></i>
              Featured
              <span className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
          </div>

          {/* Premium Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative flex items-center bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 focus-within:ring-4 focus-within:ring-green-500/20 focus-within:border-green-500 focus-within:bg-white">
                <div className="absolute left-5 flex items-center pointer-events-none">
                  <i className="fas fa-search text-gray-500 group-focus-within:text-green-600 transition-colors duration-200"></i>
                </div>
                <input
                  type="text"
                  placeholder="Search premium agricultural products..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="flex-1 pl-14 pr-4 py-4 rounded-l-2xl bg-transparent outline-none font-medium placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-4 rounded-r-2xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <i className="fas fa-search"></i>
                  <span className="hidden md:inline">Search</span>
                </button>
              </div>
            </form>
          </div>

          {/* Premium Right section */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Premium Cart */}
            <Link to="/cart" className="relative group p-3 hover:bg-green-50 rounded-xl transition-all duration-300">
              <div className="relative">
                <i className="fas fa-shopping-bag text-xl sm:text-2xl text-gray-600 group-hover:text-green-600 transition-colors duration-200"></i>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center animate-bounce shadow-lg">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
                {cartCount > 0 && (
                  <div className="absolute -bottom-1 -right-1 h-2 w-2 sm:h-3 sm:w-3 bg-green-500 rounded-full animate-pulse"></div>
                )}
              </div>
              <span className="hidden lg:block text-xs text-gray-500 text-center mt-1 font-medium">Cart</span>
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-3 rounded-xl hover:bg-gray-100 transition-all duration-200 border border-gray-200"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'} text-xl text-gray-700`}></i>
            </button>

            {/* Premium Profile - Desktop Only */}
            <div className="hidden md:block relative" ref={profileRef}>
              <button
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 transition-all duration-300 border border-gray-200/50 hover:border-green-300/50 hover:shadow-lg"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <div className="relative">
                  <div className="h-12 w-12 bg-gradient-to-br from-green-500 via-green-600 to-green-700 rounded-2xl flex items-center justify-center text-white shadow-xl hover:shadow-green-500/25 transition-all duration-300">
                    <i className="fas fa-user text-lg"></i>
                  </div>
                  {token && (
                    <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="hidden lg:block text-left">
                  <div className="text-sm font-bold text-gray-800">
                    {token && username ? username : 'Welcome'}
                  </div>
                  <div className="text-xs text-gray-500 font-medium">
                    {token ? 'Premium Member' : 'Join Today'}
                  </div>
                </div>
                <i className="fas fa-chevron-down text-xs text-gray-400 hidden lg:block transition-transform duration-200 group-hover:rotate-180"></i>
              </button>

              {/* Profile dropdown */}
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-fade-in">
                  {token ? (
                    <>
                      <div className="px-4 py-2 border-b border-gray-100">
                        <div className="text-sm font-medium text-gray-900">Welcome back!</div>
                        <div className="text-xs text-gray-500">{username}</div>
                      </div>
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                        onClick={() => setProfileOpen(false)}
                      >
                        <i className="fas fa-user-circle"></i>
                        My Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                        onClick={() => setProfileOpen(false)}
                      >
                        <i className="fas fa-box"></i>
                        My Orders
                      </Link>
                      {(username === 'admin' || username === 'administrator') && (
                        <div className="border-t border-gray-100 mt-2 pt-2">
                          <Link
                            to="/admin"
                            className="flex items-center gap-3 px-4 py-2 text-blue-600 hover:bg-blue-50 transition-colors"
                            onClick={() => setProfileOpen(false)}
                          >
                            <i className="fas fa-cog"></i>
                            Admin Panel
                          </Link>
                        </div>
                      )}
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <i className="fas fa-sign-out-alt"></i>
                          Sign Out
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                        onClick={() => setProfileOpen(false)}
                      >
                        <i className="fas fa-sign-in-alt"></i>
                        Sign In
                      </Link>
                      <Link
                        to="/signup"
                        className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                        onClick={() => setProfileOpen(false)}
                      >
                        <i className="fas fa-user-plus"></i>
                        Create Account
                      </Link>
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <Link
                          to="/admin"
                          className="flex items-center gap-3 px-4 py-2 text-blue-600 hover:bg-blue-50 transition-colors"
                          onClick={() => setProfileOpen(false)}
                        >
                          <i className="fas fa-shield-alt"></i>
                          Admin Access
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 animate-fade-in">
            {/* Mobile search */}
            <form onSubmit={handleSearch} className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <i className="fas fa-search text-gray-400"></i>
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200"
              />
            </form>

            {/* Mobile Profile Section */}
            <div className="mb-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <div className="h-10 w-10 bg-gradient-to-br from-green-500 via-green-600 to-green-700 rounded-xl flex items-center justify-center text-white shadow-lg">
                    <i className="fas fa-user"></i>
                  </div>
                  {token && (
                    <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-800">
                    {token && username ? username : 'Welcome'}
                  </div>
                  <div className="text-xs text-gray-500 font-medium">
                    {token ? 'Premium Member' : 'Join Today'}
                  </div>
                </div>
              </div>
              
              {token ? (
                <div className="space-y-2">
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-white hover:text-green-700 rounded-lg transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    <i className="fas fa-user-circle w-4"></i>
                    My Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-white hover:text-green-700 rounded-lg transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    <i className="fas fa-box w-4"></i>
                    My Orders
                  </Link>
                  {(username === 'admin' || username === 'administrator') && (
                    <Link
                      to="/admin"
                      className="flex items-center gap-3 px-3 py-2 text-blue-600 hover:bg-white rounded-lg transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      <i className="fas fa-cog w-4"></i>
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="flex items-center gap-3 w-full px-3 py-2 text-red-600 hover:bg-white rounded-lg transition-colors"
                  >
                    <i className="fas fa-sign-out-alt w-4"></i>
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-white hover:text-green-700 rounded-lg transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    <i className="fas fa-sign-in-alt w-4"></i>
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-white hover:text-green-700 rounded-lg transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    <i className="fas fa-user-plus w-4"></i>
                    Create Account
                  </Link>
                  <Link
                    to="/admin"
                    className="flex items-center gap-3 px-3 py-2 text-blue-600 hover:bg-white rounded-lg transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    <i className="fas fa-shield-alt w-4"></i>
                    Admin Access
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile navigation links */}
            <div className="space-y-2">
              <Link
                to="/"
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <i className="fas fa-home w-5"></i>
                Home
              </Link>
              <Link
                to="/products"
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <i className="fas fa-shopping-bag w-5"></i>
                Products
              </Link>
              <Link
                to="/categories"
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <i className="fas fa-th-large w-5"></i>
                Categories
              </Link>
              <Link
                to="/featured"
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <i className="fas fa-star w-5"></i>
                Featured
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
