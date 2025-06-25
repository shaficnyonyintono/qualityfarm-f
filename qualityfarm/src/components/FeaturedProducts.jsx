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
    fetch("https://qualityfarm-b-1.onrender.com/featured/")
      .then((res) => res.json())
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

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

  if (loading) return <div>Loading products...</div>

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-green-700">Featured Products</h2>
      </div>
      {location.pathname.startsWith("/featured") && (
        <div className="mb-6">
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-full font-semibold shadow transition-all duration-200"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>
      )}
      <div
        className="flex flex-row gap-6 pb-4 items-center overflow-x-auto"
        style={{
          maxWidth: "100%",
          paddingBottom: "1rem",
          scrollbarWidth: "thin",
          paddingLeft: "1rem",
          scrollSnapType: "x mandatory"
        }}
      >
        {products.map((product, idx) => (
          <div
            key={product.id || idx}
            className="min-w-[300px] px-4 flex justify-center"
            style={{
              marginLeft: idx === 0 ? 0 : undefined,
              scrollSnapAlign: "start"
            }}
          >
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 flex flex-col items-center border border-gray-100">
              <div className="relative">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={
                      product.images[0].image.startsWith("http")
                        ? product.images[0].image
                        : "https://qualityfarm-b-1.onrender.com" + product.images[0].image
                    }
                    alt={product.title}
                    className="h-40 w-40 object-cover rounded-full mb-5 border-4 border-green-500 shadow"
                  />
                ) : (
                  <img
                    src="/placeholder.jpg"
                    alt="No product"
                    className="h-40 w-40 object-cover rounded-full mb-5 border-4 border-green-500 shadow"
                  />
                )}
                <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full shadow">
                  UGX {product.price}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.title}</h3>
              <div className="flex items-center mb-2">
                {isLoggedIn()
                  ? renderStars(
                      product.average_rating || 0,
                      (rating) => handleRate(product.id, rating),
                      true
                    )
                  : renderStars(product.average_rating || 0)
                }
                {isLoggedIn() && ratingSubmitting[product.id] && (
                  <span className="ml-2 text-xs text-gray-400">Submitting...</span>
                )}
                {!isLoggedIn() && (
                  <span className="ml-2 text-xs text-gray-400">Login to rate</span>
                )}
              </div>
              <p className="text-gray-500 text-base text-center mb-5">{product.description}</p>
              <button
                className="mt-auto bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-6 py-2 rounded-full font-semibold shadow transition-all duration-200 text-center w-full"
                onClick={() => navigate(`/product/${encodeURIComponent(product.title)}`)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
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
