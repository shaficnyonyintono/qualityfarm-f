import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const BestSelling = () => {
  const [bestSellingProducts, setBestSellingProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [cartVersion, setCartVersion] = useState(0) // Add this

  useEffect(() => {
    fetch('http://localhost:8000/bestselling/')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch best selling products')
        return res.json()
      })
      .then(setBestSellingProducts)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  // Add to Cart functionality
  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1,
        image: product.images && product.images.length > 0 ? product.images[0].image : null
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    setCartVersion(v => v + 1); // Trigger re-render
    alert(`${product.title} added to cart!`);
  };

  // Helper to check if product is in cart
  const isInCart = (productId) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    return cart.some(item => item.id === productId);
  };

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-extrabold text-green-700 tracking-tight mb-8">Best Selling Products</h2>
        <div>Loading...</div>
      </section>
    )
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-extrabold text-green-700 tracking-tight">Best Selling Products</h2>
        <Link
          to="/products"
          className="text-green-600 hover:text-green-800 text-base font-semibold transition"
        >
          View All
        </Link>
      </div>
      <div className="flex flex-row gap-8 overflow-x-auto pb-4">
        {bestSellingProducts.map((product, idx) => {
          const alreadyInCart = isInCart(product.id);
          return (
            <div
              key={product.id || idx}
              className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col items-center border border-gray-100 group min-w-[260px]"
            >
              <div className="w-28 h-28 mb-4 rounded-full overflow-hidden border-4 border-green-500 shadow-lg group-hover:scale-105 transition-transform duration-300">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0].image}
                    alt={product.title || product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src="/placeholder.jpg"
                    alt="No product"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-1 text-center">{product.title}</h3>
              <p className="text-green-700 font-bold text-base mb-1">{product.price}</p>
              <button
                className={`mt-auto bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-6 py-2 rounded-full font-semibold shadow transition-all duration-200 w-full ${alreadyInCart ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => handleAddToCart(product)}
                disabled={alreadyInCart}
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007.5 17h9a1 1 0 00.85-1.53L17 13M7 13V6a1 1 0 011-1h3m4 0h2a1 1 0 011 1v7"></path>
                  </svg>
                  {alreadyInCart ? "In Cart" : "Add to Cart"}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  )
}

export default BestSelling
