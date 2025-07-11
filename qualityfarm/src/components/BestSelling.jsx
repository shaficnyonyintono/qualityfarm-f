import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from "react-toastify";

const BestSelling = () => {
  const [bestSellingProducts, setBestSellingProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://qualityfarm-b-1.onrender.com/bestselling/')
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
    toast.success(`${product.title} added to cart!`);
  };

  // Helper to check if product is in cart
  const isInCart = (productId) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    return cart.some(item => item.id === productId);
  };

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-16 relative">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-transparent to-emerald-50/30 rounded-3xl"></div>
        
        <div className="relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-100 to-emerald-100 px-6 py-3 rounded-full border border-green-200 mb-8">
              <div className="w-6 h-6 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-green-700 font-semibold">Loading best sellers...</span>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-transparent to-emerald-50/30 rounded-3xl"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-200/20 to-emerald-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-emerald-200/20 to-green-300/20 rounded-full blur-2xl"></div>
      
      <div className="relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-100 to-emerald-100 px-6 py-3 rounded-full border border-green-200 mb-6">
            <i className="fas fa-fire text-green-600 text-lg"></i>
            <span className="text-green-700 font-semibold tracking-wide">Best Sellers</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-black mb-4" data-aos="fade-up" data-aos-delay="200">
            Top <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Selling</span> Products
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="400">
            Discover our most popular agricultural products, trusted and loved by farmers everywhere
          </p>
          
          <div className="flex items-center justify-center mt-8" data-aos="fade-up" data-aos-delay="600">
            <Link
              to="/products"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group"
            >
              <span>View All Products</span>
              <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-200"></i>
            </Link>
          </div>
        </div>

        {/* Products Grid */}
        <div className="relative">
          {/* Scroll Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
          
          <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
            {bestSellingProducts.map((product, idx) => {
              const alreadyInCart = isInCart(product.id);
              return (
                <div
                  key={product.id || idx}
                  className="relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 flex flex-col border border-gray-100 group min-w-[320px] max-w-[320px] hover:-translate-y-2"
                  data-aos="fade-up"
                  data-aos-delay={idx * 150}
                  data-aos-duration="600"
                >
                  {/* Best Seller Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                      <i className="fas fa-crown"></i>
                      <span>Best Seller</span>
                    </div>
                  </div>

                  {/* Ranking Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center text-white font-black text-sm shadow-lg">
                      #{idx + 1}
                    </div>
                  </div>

                  {/* Product Image */}
                  <div className="relative mb-6 mt-4">
                    <div className="w-full h-48 rounded-2xl overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-100 group-hover:border-green-300 transition-colors duration-300">
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={product.images[0].image}
                          alt={product.title || product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <i className="fas fa-image text-4xl text-green-300"></i>
                          </div>
                        )}
                    </div>
                    
                    {/* Sales Indicator */}
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                      <div className="flex items-center gap-1 text-green-600">
                        <i className="fas fa-chart-line text-xs"></i>
                        <span className="text-xs font-bold">Hot Sale</span>
                      </div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-xl font-black text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors duration-200">
                      {product.title || product.name}
                    </h3>
                    
                    {/* Rating Stars */}
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="fas fa-star text-yellow-400 text-sm"></i>
                      ))}
                      <span className="text-gray-500 text-sm ml-1">(4.8)</span>
                    </div>
                    
                    {/* Price */}
                    <div className="mb-6">
                      {/* Calculate realistic discount: current price is already discounted */}
                      {(() => {
                        const currentPrice = product.price;
                        const discountPercent = 15; // 15% discount for best sellers
                        const originalPrice = Math.round(currentPrice / (1 - discountPercent / 100));
                        
                        return (
                          <>
                            <span className="text-2xl font-black text-green-600">
                              UGX {currentPrice?.toLocaleString ? currentPrice.toLocaleString() : currentPrice}
                            </span>
                            <div className="text-gray-500 text-sm">
                              <span className="line-through">UGX {originalPrice?.toLocaleString ? originalPrice.toLocaleString() : originalPrice}</span>
                              <span className="text-green-600 font-semibold ml-2">Save {discountPercent}%</span>
                            </div>
                          </>
                        );
                      })()}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-auto space-y-3">
                      <button
                        className={`w-full py-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl ${
                          alreadyInCart
                            ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                            : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white hover:scale-105 active:scale-95"
                        }`}
                        onClick={() => handleAddToCart(product)}
                        disabled={alreadyInCart}
                      >
                        <i className={`fas ${alreadyInCart ? 'fa-check' : 'fa-shopping-cart'}`}></i>
                        <span>{alreadyInCart ? "Added to Cart" : "Add to Cart"}</span>
                      </button>
                      
                      <Link
                        to={`/product/${product.id}`}
                        className="w-full py-3 rounded-xl border-2 border-green-200 hover:border-green-400 text-green-600 hover:text-green-700 font-semibold transition-all duration-200 flex items-center justify-center gap-2 hover:bg-green-50"
                      >
                        <i className="fas fa-eye"></i>
                        <span>View Details</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        {bestSellingProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-fire text-3xl text-green-600"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No best sellers available yet</h3>
            <p className="text-gray-600 text-lg">Check back soon for our top-performing products!</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default BestSelling
