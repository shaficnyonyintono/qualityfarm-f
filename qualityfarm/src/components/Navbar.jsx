import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [profileOpen, setProfileOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false)
  const profileRef = useRef(null)
  const navigate = useNavigate();

  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      setCartCount(cart.length)
    }
    updateCartCount()
    window.addEventListener('cartUpdated', updateCartCount)
    return () => window.removeEventListener('cartUpdated', updateCartCount)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
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
    setProfileOpen(false);
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
      setSearch("");
      setMenuOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="https://i.pinimg.com/736x/70/f9/97/70f9971cf96024d33a315823f85f994e.jpg"
              alt="Logo"
              className="h-12 w-12 rounded-full object-cover border-2 border-green-600 shadow"
            />
            <div>
              <span className="text-2xl font-extrabold text-green-700 tracking-tight">QualityFarm</span>
              <div className="text-xs text-gray-500 font-medium mt-1 max-w-[180px] leading-tight break-words">
                Get the freshest produce and best farm deals delivered to your door.
              </div>
            </div>
          </div>
          {/* Hamburger */}
          <button
            className="sm:hidden flex items-center text-green-700 text-2xl focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <i className={menuOpen ? "fas fa-times" : "fas fa-bars"}></i>
          </button>
          {/* Desktop Nav */}
          <div className="hidden sm:flex flex-1 items-center justify-between ml-10">
            {/* Searchbar */}
            <form className="relative flex items-center max-w-lg mx-auto flex-1" onSubmit={handleSearch}>
              <span className="absolute left-4 text-gray-500 text-lg z-10">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                placeholder="Search for products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-l-full border-2 border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all duration-200 shadow-md bg-white"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-8 py-3 rounded-r-full font-semibold shadow-md transition-all duration-200 hover:shadow-lg"
              >
                Search
              </button>
            </form>
            {/* Cart & Profile */}
            <div className="flex items-center gap-6 ml-8">
              {/* Cart */}
              <Link to="/cart" className="relative flex items-center group">
                <span className="text-2xl text-green-700 group-hover:text-green-900 transition-colors">
                  <i className="fas fa-shopping-cart"></i>
                </span>
                <span className="ml-2 text-gray-700 font-medium hidden sm:inline">Cart</span>
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full px-1.5 py-0.5 shadow">
                  {cartCount}
                </span>
              </Link>
              {/* Profile */}
              <div className="relative" ref={profileRef}>
                <button
                  className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded-full transition"
                  onClick={() => setProfileOpen((prev) => !prev)}
                  type="button"
                >
                  <div className="h-9 w-9 bg-gray-200 rounded-full flex items-center justify-center border border-gray-300">
                    <i className="fas fa-user text-gray-500 text-lg"></i>
                  </div>
                  <span className="hidden md:inline text-gray-700 font-medium">Profile</span>
                </button>
                {token && username && (
                  <div className="text-xs text-center text-green-700 font-semibold mt-1">
                    Welcome, {username}
                  </div>
                )}
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50 animate-fade-in">
                    {token ? (
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-green-50 hover:text-red-800 transition"
                      >
                        Logout
                      </button>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
                          onClick={() => setProfileOpen(false)}
                        >
                          Login
                        </Link>
                        <Link
                          to="/signup"
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
                          onClick={() => setProfileOpen(false)}
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
        {/* Mobile Menu */}
        {menuOpen && (
          <div className="sm:hidden mt-4">
            <form className="relative flex items-center mb-4" onSubmit={handleSearch}>
              <span className="absolute left-4 text-gray-500 text-lg z-10">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                placeholder="Search for products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-l-full border-2 border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all duration-200 shadow-md bg-white"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-8 py-3 rounded-r-full font-semibold shadow-md transition-all duration-200 hover:shadow-lg"
              >
                Search
              </button>
            </form>
            <div className="flex flex-col gap-4">
              <Link to="/cart" className="relative flex items-center group" onClick={() => setMenuOpen(false)}>
                <span className="text-2xl text-green-700 group-hover:text-green-900 transition-colors">
                  <i className="fas fa-shopping-cart"></i>
                </span>
                <span className="ml-2 text-gray-700 font-medium">Cart</span>
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full px-1.5 py-0.5 shadow">
                  {cartCount}
                </span>
              </Link>
              <div className="relative" ref={profileRef}>
                <button
                  className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded-full transition"
                  onClick={() => setProfileOpen((prev) => !prev)}
                  type="button"
                >
                  <div className="h-9 w-9 bg-gray-200 rounded-full flex items-center justify-center border border-gray-300">
                    <i className="fas fa-user text-gray-500 text-lg"></i>
                  </div>
                  <span className="text-gray-700 font-medium">Profile</span>
                </button>
                {token && username && (
                  <div className="text-xs text-center text-green-700 font-semibold mt-1">
                    Welcome, {username}
                  </div>
                )}
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50 animate-fade-in">
                    {token ? (
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-green-50 hover:text-red-800 transition"
                      >
                        Logout
                      </button>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
                          onClick={() => setProfileOpen(false)}
                        >
                          Login
                        </Link>
                        <Link
                          to="/signup"
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
                          onClick={() => setProfileOpen(false)}
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
