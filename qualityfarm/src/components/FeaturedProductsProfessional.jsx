import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { toast } from "react-toastify";

// Helper function to check if user is logged in
const isLoggedIn = () => !!localStorage.getItem('token')

// Professional star rating component
const StarRating = ({ rating, onRate, editable = false, size = 'sm' }) => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }
  
  const fullStars = Math.floor(rating)
  const halfStar = rating % 1 >= 0.5
  const stars = []
  
  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(
        <i
          key={i}
          className={`fas fa-star text-yellow-400 ${sizeClasses[size]} ${editable ? 'cursor-pointer hover:text-yellow-500 transition-colors' : ''}`}
          onClick={editable ? () => onRate(i) : undefined}
        />
      )
    } else if (i === fullStars + 1 && halfStar) {
      stars.push(
        <i
          key="half"
          className={`fas fa-star-half-alt text-yellow-400 ${sizeClasses[size]} ${editable ? 'cursor-pointer hover:text-yellow-500 transition-colors' : ''}`}
          onClick={editable ? () => onRate(i - 0.5) : undefined}
        />
      )
    } else {
      stars.push(
        <i
          key={`empty-${i}`}
          className={`far fa-star text-gray-300 ${sizeClasses[size]} ${editable ? 'cursor-pointer hover:text-yellow-500 transition-colors' : ''}`}
          onClick={editable ? () => onRate(i) : undefined}
        />
      )
    }
  }
  return <div className="flex items-center gap-1">{stars}</div>
}

const ProfessionalFeaturedProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [_ratingSubmitting, setRatingSubmitting] = useState({})
  const [currentSlide, setCurrentSlide] = useState(0)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://qualityfarm-b-1.onrender.com/featured/')
        if (!res.ok) {
          const errorText = await res.text()
          console.error('API error:', res.status, errorText)
          toast.error('Failed to load featured products')
          return
        }
        const data = await res.json()
        setProducts(data.slice(0, 8)) // Limit to 8 products for better design
      } catch (e) {
        console.error(e)
        toast.error('Network error while loading products')
      } finally {
        setLoading(false)
      }
    }
    
    fetchProducts()
  }, [])

  // Auto-slide functionality
  useEffect(() => {
    if (products.length > 4) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % Math.ceil(products.length / 4))
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [products.length])

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existing = cart.find(item => item.id === product.id)
    
    if (existing) {
      existing.quantity += 1
    } else {
      cart.push({
        ...product,
        quantity: 1,
        image: product.images && product.images.length > 0 ? product.images[0].image : null
      })
    }
    
    localStorage.setItem('cart', JSON.stringify(cart))
    window.dispatchEvent(new Event('cartUpdated'))
    toast.success(`${product.title} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
    })
  }

  const handleRate = async (productId, rating) => {
    if (!isLoggedIn()) {
      toast.warning('Please log in to rate products')
      return
    }
    
    setRatingSubmitting(prev => ({ ...prev, [productId]: true }))
    
    try {
      const response = await fetch('https://qualityfarm-b-1.onrender.com/rate-item/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ item_id: productId, rating })
      })
      
      if (response.ok) {
        toast.success('Rating submitted successfully!')
        // Refresh products to show updated rating
        const res = await fetch('https://qualityfarm-b-1.onrender.com/featured-items/')
        const data = await res.json()
        setProducts(data.slice(0, 8))
      } else {
        toast.error('Failed to submit rating')
      }
    } catch {
      toast.error('Network error while submitting rating')
    } finally {
      setRatingSubmitting(prev => ({ ...prev, [productId]: false }))
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0
    }).format(amount)
  }

  if (loading) {
    return (
      <section className="py-5 md:py-6 bg-gradient-to-br from-green-50 via-emerald-25 to-green-100">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="text-center">
            <div className="w-10 h-10 md:w-14 md:h-14 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-2.5 md:mb-3"></div>
            <p className="text-gray-600 font-medium text-xs md:text-sm">Loading featured products...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-5 md:py-6 lg:py-8 bg-gradient-to-br from-green-50 via-emerald-25 to-green-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Professional Header */}
        <div className="text-center mb-4 md:mb-6" data-aos="fade-up">
          <h2 className="text-lg md:text-2xl lg:text-3xl font-black text-gray-900 mb-1.5 md:mb-3 tracking-tight" data-aos="fade-up" data-aos-delay="200">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Products</span>
          </h2>
          <p className="text-xs md:text-sm lg:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed px-2 md:px-4" data-aos="fade-up" data-aos-delay="400">
            Discover our handpicked collection of premium agricultural products, 
            carefully selected for their exceptional quality and proven performance.
          </p>
          
          {/* Back button for featured page */}
          {location.pathname.startsWith("/featured") && (
            <div className="mt-4 md:mt-6" data-aos="fade-up" data-aos-delay="600">
              <button
                onClick={() => navigate("/")}
                className="inline-flex items-center gap-1.5 md:gap-2 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 px-3 md:px-5 py-1.5 md:py-2.5 rounded-lg md:rounded-xl font-medium md:font-semibold shadow-md hover:shadow-lg transition-all duration-300 text-xs md:text-sm"
              >
                <i className="fas fa-arrow-left text-xs"></i>
                Back to Home
              </button>
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div className="relative">
          {/* Navigation arrows for large screens */}
          {products.length > 4 && (
            <>
              <button
                onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-4 z-10 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-green-600 w-7 md:w-10 h-7 md:h-10 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center group"
                disabled={currentSlide === 0}
              >
                <i className="fas fa-chevron-left text-xs md:text-sm group-hover:scale-110 transition-transform"></i>
              </button>
              <button
                onClick={() => setCurrentSlide(Math.min(Math.ceil(products.length / 4) - 1, currentSlide + 1))}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-4 z-10 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-green-600 w-7 md:w-10 h-7 md:h-10 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center group"
                disabled={currentSlide === Math.ceil(products.length / 4) - 1}
              >
                <i className="fas fa-chevron-right text-xs md:text-sm group-hover:scale-110 transition-transform"></i>
              </button>
            </>
          )}

          {/* Products container */}
          <div className="overflow-hidden rounded-2xl md:rounded-3xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: Math.ceil(products.length / 4) }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-4 lg:gap-6">
                    {products.slice(slideIndex * 4, (slideIndex + 1) * 4).map((product, idx) => (
                      <div
                        key={product.id || idx}
                        className="group bg-white rounded-lg md:rounded-2xl shadow-md hover:shadow-lg transition-all duration-500 overflow-hidden border border-gray-100 hover:border-green-200 hover:-translate-y-1"
                        data-aos="fade-up"
                        data-aos-delay={idx * 100}
                        data-aos-duration="600"
                      >
                        {/* Product Image */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 aspect-square">
                          {product.images && product.images.length > 0 ? (
                            <img
                              src={
                                product.images[0].image.startsWith("http")
                                  ? product.images[0].image
                                  : "https://qualityfarm-b-1.onrender.com" + product.images[0].image
                              }
                              alt={product.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <i className="fas fa-image text-xl md:text-3xl text-gray-400"></i>
                            </div>
                          )}
                          
                          {/* Overlay badges */}
                          <div className="absolute top-1.5 md:top-3 left-1.5 md:left-3">
                            <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-1.5 md:px-2.5 py-0.5 rounded-full text-[9px] md:text-[10px] font-bold shadow-md">
                              Featured
                            </span>
                          </div>
                          
                          {/* Quick action buttons */}
                          <div className="absolute top-1.5 md:top-3 right-1.5 md:right-3 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-red-500 w-6 md:w-8 h-6 md:h-8 rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center">
                              <i className="fas fa-heart text-[9px] md:text-xs"></i>
                            </button>
                            <button className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-blue-500 w-6 md:w-8 h-6 md:h-8 rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center">
                              <i className="fas fa-eye text-[9px] md:text-xs"></i>
                            </button>
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-2 md:p-4 lg:p-5">
                          {/* Category */}
                          {product.category && (
                            <div className="mb-1 md:mb-2">
                              <span className="inline-block bg-green-50 text-green-700 px-1.5 md:px-2.5 py-0.5 rounded-full text-[9px] md:text-[10px] font-semibold border border-green-200">
                                {product.category.name || product.category}
                              </span>
                            </div>
                          )}

                          {/* Title */}
                          <h3 className="font-semibold md:font-bold text-gray-900 text-xs md:text-sm lg:text-base mb-1 md:mb-2 line-clamp-2 group-hover:text-green-600 transition-colors duration-200">
                            {product.title}
                          </h3>

                          {/* Description */}
                          <p className="text-gray-600 text-[10px] md:text-xs mb-1.5 md:mb-3 line-clamp-2 hidden md:block">
                            {product.description || 'Premium quality agricultural product for optimal results.'}
                          </p>

                          {/* Rating */}
                          <div className="flex items-center justify-between mb-1.5 md:mb-3">
                            <StarRating 
                              rating={product.average_rating || 0} 
                              onRate={(rating) => handleRate(product.id, rating)}
                              editable={isLoggedIn()}
                              size="sm"
                            />
                            <span className="text-[9px] md:text-[10px] text-gray-500">
                              ({product.rating_count || 0})
                            </span>
                          </div>

                          {/* Price */}
                          <div className="flex items-center justify-between mb-1.5 md:mb-4">
                            <div>
                              <span className="text-sm md:text-base lg:text-lg font-bold md:font-black text-gray-900">
                                {formatCurrency(product.price)}
                              </span>
                              {product.original_price && product.original_price > product.price && (
                                <span className="ml-1 text-[9px] md:text-xs text-gray-500 line-through">
                                  {formatCurrency(product.original_price)}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-1 md:gap-2">
                            <button
                              onClick={() => handleAddToCart(product)}
                              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold md:font-bold py-1 md:py-2 px-1.5 md:px-3 rounded-md md:rounded-lg transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 active:scale-95 flex items-center justify-center gap-1 text-[10px] md:text-xs"
                            >
                              <i className="fas fa-shopping-cart text-[9px] md:text-xs"></i>
                              <span className="hidden sm:inline">Add to Cart</span>
                              <span className="sm:hidden">Add</span>
                            </button>
                            <Link
                              to={`/product/${encodeURIComponent(product.title)}`}
                              className="bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 font-medium md:font-semibold py-1 md:py-2 px-1.5 md:px-3 rounded-md md:rounded-lg transition-all duration-200 flex items-center justify-center"
                            >
                              <i className="fas fa-info-circle text-[9px] md:text-xs"></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slide indicators */}
          {products.length > 4 && (
            <div className="flex justify-center mt-4 md:mt-6 gap-1 md:gap-1.5">
              {Array.from({ length: Math.ceil(products.length / 4) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? 'bg-gradient-to-r from-green-500 to-green-600 w-5 md:w-7'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Call-to-action */}
        <div className="text-center mt-6 md:mt-10">
          <Link
            to="/featured"
            className="inline-flex items-center gap-1.5 md:gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 text-xs md:text-sm"
          >
            <span>Explore All Featured Products</span>
            <i className="fas fa-arrow-right text-xs"></i>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ProfessionalFeaturedProducts
