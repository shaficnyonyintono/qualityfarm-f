import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from "react-toastify"; // Add this import

// Helper: check if user is logged in (adjust as needed)
const isLoggedIn = () => !!localStorage.getItem('token')

// Render stars, optionally clickable
const renderStars = (rating, onRate, editable = false) => {
  const fullStars = Math.floor(rating)
  const halfStar = rating % 1 >= 0.5
  const stars = []
  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(
        <i
          key={i}
          className={`fas fa-star text-yellow-400 ${editable ? 'cursor-pointer hover:text-yellow-500' : ''}`}
          onClick={editable ? () => onRate(i) : undefined}
        />
      )
    } else if (i === fullStars + 1 && halfStar) {
      stars.push(
        <i
          key="half"
          className={`fas fa-star-half-alt text-yellow-400 ${editable ? 'cursor-pointer hover:text-yellow-500' : ''}`}
          onClick={editable ? () => onRate(i - 0.5) : undefined}
        />
      )
    } else {
      stars.push(
        <i
          key={`empty-${i}`}
          className={`far fa-star text-yellow-300 ${editable ? 'cursor-pointer hover:text-yellow-500' : ''}`}
          onClick={editable ? () => onRate(i) : undefined}
        />
      )
    }
  }
  return stars
}

const FeaturedProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [ratingSubmitting, setRatingSubmitting] = useState({})
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        
        // Try to fetch from the API first
        const response = await fetch("https://qualityfarm-b-1.onrender.com/featured/", {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          timeout: 10000 // 10 second timeout
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        if (data && data.length > 0) {
          setProducts(data);
        } else {
          // Use fallback data if API returns empty
          setProducts(getFallbackProducts());
        }
      } catch (error) {
        console.error('Failed to fetch featured products:', error);
        toast.error("Using demo data - API temporarily unavailable");
        
        // Use fallback data when API fails
        setProducts(getFallbackProducts());
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, [])

  // Fallback demo data for when API is unavailable
  const getFallbackProducts = () => [
    {
      id: 1,
      title: "Premium Tomato Seeds",
      price: 25000,
      images: [{ image: "/api/placeholder/300/200" }],
      description: "High-quality hybrid tomato seeds with excellent yield potential",
      category: "Seeds",
      rating: 4.5,
      is_featured: true
    },
    {
      id: 2,
      title: "Organic Fertilizer",
      price: 45000,
      images: [{ image: "/api/placeholder/300/200" }],
      description: "100% organic fertilizer for healthy plant growth",
      category: "Fertilizers",
      rating: 4.8,
      is_featured: true
    },
    {
      id: 3,
      title: "Professional Garden Hoe",
      price: 35000,
      images: [{ image: "/api/placeholder/300/200" }],
      description: "Durable steel garden hoe for all your farming needs",
      category: "Tools",
      rating: 4.3,
      is_featured: true
    },
    {
      id: 4,
      title: "Drip Irrigation Kit",
      price: 85000,
      images: [{ image: "/api/placeholder/300/200" }],
      description: "Complete drip irrigation system for water-efficient farming",
      category: "Equipment",
      rating: 4.7,
      is_featured: true
    },
    {
      id: 5,
      title: "Maize Seeds - Hybrid",
      price: 30000,
      images: [{ image: "/api/placeholder/300/200" }],
      description: "Disease-resistant hybrid maize seeds with high productivity",
      category: "Seeds",
      rating: 4.6,
      is_featured: true
    },
    {
      id: 6,
      title: "Pesticide Sprayer",
      price: 55000,
      images: [{ image: "/api/placeholder/300/200" }],
      description: "Manual pesticide sprayer for effective crop protection",
      category: "Tools",
      rating: 4.4,
      is_featured: true
    }
  ];

  // Handle rating submission
  const handleRate = async (productId, rating) => {
    if (!isLoggedIn()) {
      toast.error("You must be logged in to rate products.");
      return;
    }
    setRatingSubmitting(prev => ({ ...prev, [productId]: true }))
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`https://qualityfarm-b-1.onrender.com/products/${productId}/rate/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ rating })
      })
      if (!res.ok) {
        const errorText = await res.text();
        console.error('API error:', res.status, errorText);
        toast.error('Failed to submit rating.');
        throw new Error('Failed to submit rating');
      }
      // Optionally update the product's rating in state
      setProducts(products =>
        products.map(p =>
          p.id === productId ? { ...p, average_rating: rating } : p
        )
      )
      if (rating === 0) {
        toast.info('Your rating has been removed.');
      } else {
        toast.success('Thank you for rating!');
      }
    } catch (e) {
      toast.error('Failed to submit rating.');
    } finally {
      setRatingSubmitting(prev => ({ ...prev, [productId]: false }))
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading featured products...</p>
          </div>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <section className="bg-gradient-to-br from-gray-50 via-white to-green-50/30 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Professional Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-100 to-green-200 px-6 py-2 rounded-full mb-4">
            <i className="fas fa-star text-green-600"></i>
            <span className="text-green-700 font-semibold text-sm uppercase tracking-wide">Premium Selection</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600 font-medium max-w-2xl mx-auto">
            Discover our handpicked premium agricultural products trusted by thousands of farmers
          </p>
        </div>

        {/* Back button for featured page */}
        {location.pathname.startsWith("/featured") && (
          <div className="mb-8">
            <button
              className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 flex items-center gap-2"
              onClick={() => navigate("/")}
            >
              <i className="fas fa-arrow-left"></i>
              Back to Home
            </button>
          </div>
        )}

        {/* Professional Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, idx) => (
            <div
              key={product.id || idx}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-green-200 hover:-translate-y-2"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <div className="aspect-w-4 aspect-h-3 bg-gray-100">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={
                        product.images[0].image.startsWith("http")
                          ? product.images[0].image
                          : product.images[0].image.startsWith("/api/placeholder")
                          ? `https://via.placeholder.com/300x200/10B981/ffffff?text=${encodeURIComponent(product.title)}`
                          : "https://qualityfarm-b-1.onrender.com" + product.images[0].image
                      }
                      alt={product.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/300x200/10B981/ffffff?text=${encodeURIComponent(product.title)}`;
                      }}
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                      <div className="text-center">
                        <i className="fas fa-seedling text-4xl text-green-600 mb-2"></i>
                        <p className="text-green-700 font-semibold">{product.title}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Featured Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    ⭐ FEATURED
                  </span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Product Details */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-700 transition-colors duration-200">
                  {product.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {isLoggedIn()
                        ? renderStars(
                            product.average_rating || 0,
                            (rating) => handleRate(product.id, rating),
                            true
                          )
                        : renderStars(product.average_rating || 0)
                      }
                    </div>
                    <span className="text-sm text-gray-500">
                      ({(product.average_rating || 0).toFixed(1)})
                    </span>
                  </div>
                  {isLoggedIn() && ratingSubmitting[product.id] && (
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-xs text-gray-400">Rating...</span>
                    </div>
                  )}
                  {!isLoggedIn() && (
                    <span className="text-xs text-gray-400">Login to rate</span>
                  )}
                </div>

                {/* Price and Actions */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-black text-green-600">
                      {formatCurrency(product.price)}
                    </span>
                  </div>
                  <button
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 hover:scale-105"
                    onClick={() => navigate(`/product/${encodeURIComponent(product.title)}`)}
                  >
                    <i className="fas fa-eye"></i>
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/featured")}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <i className="fas fa-arrow-right mr-2"></i>
            View All Featured Products
          </button>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts

// After a successful login response from your backend:
// fetch('https://qualityfarm-b-1.onrender.com/token/', {
// //   method: 'POST',
// //   headers: { 'Content-Type': 'application/json' },
// //   body: JSON.stringify({ username, password })
// // })
// //   .then(res => res.json())
// //   .then(data => {
// //     localStorage.setItem('token', data.access); // <-- Only the access token!
// //   });
