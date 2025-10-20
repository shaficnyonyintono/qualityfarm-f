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
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-100 to-emerald-100 px-6 py-3 rounded-full border border-green-200 mb-8">
            <div className="w-6 h-6 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-green-700 font-semibold">Loading latest products...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-transparent to-emerald-50/30 rounded-3xl"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-200/20 to-emerald-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-emerald-200/20 to-green-300/20 rounded-full blur-2xl"></div>
      
      <div className="relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4" data-aos="fade-up" data-aos-delay="200">
            Fresh <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Arrivals</span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4" data-aos="fade-up" data-aos-delay="400">
            Discover our newest premium agricultural products, carefully selected for quality and excellence
          </p>
          
          <div className="flex items-center justify-center mt-6" data-aos="fade-up" data-aos-delay="600">
            <Link
              to="/latest"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold px-6 md:px-8 py-3 md:py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group text-sm md:text-base"
            >
              <span>View All Products</span>
              <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-200"></i>
            </Link>
          </div>
        </div>

        {/* Products Grid */}
        <div className="relative" data-aos="fade-up" data-aos-delay="800">
          {/* Scroll Gradient Overlays - Hidden on mobile for better scrolling */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none hidden md:block"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none hidden md:block"></div>
          
          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-6 scrollbar-hide px-2 md:px-0" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
            {latestProducts.map((product, idx) => {
              const alreadyInCart = isInCart(product.id);
              return (
                <div
                  key={product.id || idx}
                  className="relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-4 md:p-8 flex flex-col border border-gray-100 group min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px] hover:-translate-y-2"
                  data-aos="fade-right"
                  data-aos-delay={idx * 200}
                  data-aos-duration="600"
                >
                  {/* Product Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      New
                    </span>
                  </div>

                  {/* Product Image */}
                  <div className="relative mb-4 md:mb-6">
                    <div className="w-full h-40 md:h-48 rounded-2xl overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-100 group-hover:border-green-300 transition-colors duration-300">
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={product.images[0].image}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <i className="fas fa-image text-4xl text-green-300"></i>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-lg md:text-xl font-black text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors duration-200">
                      {product.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-3 md:mb-4 line-clamp-3 leading-relaxed">
                      {product.description}
                    </p>
                    
                    {/* Price */}
                    <div className="mb-4 md:mb-6">
                      <span className="text-xl md:text-2xl font-black text-green-600">
                        UGX {product.price?.toLocaleString()}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-auto space-y-2 md:space-y-3">
                      <button
                        className={`w-full py-3 md:py-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl text-sm md:text-base ${
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
                        className="w-full py-2 md:py-3 rounded-xl border-2 border-green-200 hover:border-green-400 text-green-600 hover:text-green-700 font-semibold transition-all duration-200 flex items-center justify-center gap-2 hover:bg-green-50 text-sm md:text-base"
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
        {latestProducts.length === 0 && (
          <div className="text-center py-12 md:py-16" data-aos="fade-up" data-aos-delay="400">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-seedling text-2xl md:text-3xl text-green-600"></i>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">No products available yet</h3>
            <p className="text-gray-600 text-base md:text-lg px-4">Check back soon for our latest agricultural products!</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default LatestProducts
