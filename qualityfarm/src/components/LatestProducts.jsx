import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";

const LatestProducts = () => {
  const [latestProducts, setLatestProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("https://qualityfarm-b-1.onrender.com/new/")
      .then(res => res.json())
      .then(setLatestProducts)
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
      <section className="max-w-7xl mx-auto px-3 sm:px-4 py-5 md:py-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 rounded-full border border-green-200">
            <div className="w-4 h-4 md:w-5 md:h-5 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-green-700 font-semibold text-xs md:text-sm">Loading latest products...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 py-5 md:py-6 lg:py-8 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-transparent to-emerald-50/30 rounded-2xl md:rounded-3xl"></div>
      <div className="absolute top-0 right-0 w-20 h-20 md:w-32 md:h-32 bg-gradient-to-br from-green-200/20 to-emerald-300/20 rounded-full blur-2xl md:blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-emerald-200/20 to-green-300/20 rounded-full blur-xl md:blur-2xl"></div>
      
      <div className="relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-4 md:mb-5">
          <h2 className="text-lg md:text-2xl lg:text-3xl font-black mb-1.5 md:mb-2" data-aos="fade-up" data-aos-delay="200">
            Fresh <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Arrivals</span>
          </h2>
          
          <p className="text-xs md:text-sm lg:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed px-2 md:px-4" data-aos="fade-up" data-aos-delay="400">
            Discover our newest premium agricultural products, carefully selected for quality and excellence
          </p>
          
          <div className="flex items-center justify-center mt-3 md:mt-4" data-aos="fade-up" data-aos-delay="600">
            <Link
              to="/latest"
              className="inline-flex items-center gap-1.5 md:gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold px-4 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 group text-xs md:text-sm"
            >
              <span>View All Products</span>
              <i className="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform duration-200"></i>
            </Link>
          </div>
        </div>

        {/* Products Grid */}
        <div className="relative" data-aos="fade-up" data-aos-delay="800">
          {/* Scroll Gradient Overlays - Hidden on mobile for better scrolling */}
          <div className="absolute left-0 top-0 bottom-0 w-6 md:w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none hidden md:block"></div>
          <div className="absolute right-0 top-0 bottom-0 w-6 md:w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none hidden md:block"></div>
          
          <div className="flex gap-2.5 md:gap-4 lg:gap-5 overflow-x-auto pb-4 md:pb-5 scrollbar-hide px-1 md:px-0" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
            {latestProducts.map((product, idx) => {
              const alreadyInCart = isInCart(product.id);
              return (
                <div
                  key={product.id || idx}
                  className="relative bg-white rounded-xl md:rounded-2xl shadow-md hover:shadow-lg transition-all duration-500 p-2.5 md:p-5 lg:p-6 flex flex-col border border-gray-100 group min-w-[160px] md:min-w-[240px] lg:min-w-[280px] max-w-[160px] md:max-w-[240px] lg:max-w-[280px] hover:-translate-y-1"
                  data-aos="fade-right"
                  data-aos-delay={idx * 200}
                  data-aos-duration="600"
                >
                  {/* Product Badge */}
                  <div className="absolute top-1.5 md:top-3 right-1.5 md:right-3">
                    <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-1.5 py-0.5 md:px-2.5 md:py-1 rounded-full text-[9px] md:text-xs font-bold shadow-md">
                      New
                    </span>
                  </div>

                  {/* Product Image */}
                  <div className="relative mb-2 md:mb-4">
                    <div className="w-full h-28 md:h-40 lg:h-44 rounded-lg md:rounded-xl overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 group-hover:border-green-300 transition-colors duration-300">
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={product.images[0].image}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <i className="fas fa-image text-xl md:text-3xl text-green-300"></i>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-xs md:text-sm lg:text-base font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-green-600 transition-colors duration-200">
                      {product.title}
                    </h3>
                    
                    <p className="text-gray-600 text-[10px] md:text-xs mb-1.5 md:mb-3 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                    
                    {/* Price */}
                    <div className="mb-2 md:mb-4">
                      <span className="text-sm md:text-base lg:text-lg font-bold text-green-600">
                        UGX {product.price?.toLocaleString()}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-auto space-y-1 md:space-y-2">
                      <button
                        className={`w-full py-1.5 md:py-2.5 lg:py-3 rounded-lg md:rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-1 md:gap-2 shadow-sm hover:shadow-md text-[10px] md:text-xs lg:text-sm ${
                          alreadyInCart
                            ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                            : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white hover:scale-105 active:scale-95"
                        }`}
                        onClick={() => handleAddToCart(product)}
                        disabled={alreadyInCart}
                      >
                        <i className={`fas ${alreadyInCart ? 'fa-check' : 'fa-shopping-cart'} text-[9px] md:text-xs`}></i>
                        <span>{alreadyInCart ? "Added" : "Add to Cart"}</span>
                      </button>
                      
                      <Link
                        to={`/product/${product.id}`}
                        className="w-full py-1 md:py-2 rounded-md md:rounded-lg border border-green-200 hover:border-green-400 text-green-600 hover:text-green-700 font-medium transition-all duration-200 flex items-center justify-center gap-1 hover:bg-green-50 text-[10px] md:text-xs"
                      >
                        <i className="fas fa-eye text-[9px] md:text-xs"></i>
                        <span>Details</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        {latestProducts.length === 0 && (
          <div className="text-center py-8 md:py-12" data-aos="fade-up" data-aos-delay="400">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-5">
              <i className="fas fa-seedling text-xl md:text-2xl text-green-600"></i>
            </div>
            <h3 className="text-base md:text-xl font-bold text-gray-900 mb-2 md:mb-3">No products available yet</h3>
            <p className="text-gray-600 text-xs md:text-sm lg:text-base px-4">Check back soon for our latest agricultural products!</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default LatestProducts
