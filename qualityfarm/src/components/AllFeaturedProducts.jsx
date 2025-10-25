import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ProductCard from './ProductCard';
import "react-toastify/dist/ReactToastify.css";

// Helper: check if user is logged in
const isLoggedIn = () => !!localStorage.getItem('token');

// Render stars, optionally clickable
const renderStars = (rating, onRate, editable = false) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(
        <i
          key={i}
          className={`fas fa-star text-yellow-400 ${editable ? 'cursor-pointer hover:text-yellow-500' : ''}`}
          onClick={editable ? () => onRate(i) : undefined}
        />
      );
    } else if (i === fullStars + 1 && halfStar) {
      stars.push(
        <i
          key="half"
          className={`fas fa-star-half-alt text-yellow-400 ${editable ? 'cursor-pointer hover:text-yellow-500' : ''}`}
          onClick={editable ? () => onRate(i - 0.5) : undefined}
        />
      );
    } else {
      stars.push(
        <i
          key={`empty-${i}`}
          className={`far fa-star text-yellow-300 ${editable ? 'cursor-pointer hover:text-yellow-500' : ''}`}
          onClick={editable ? () => onRate(i) : undefined}
        />
      );
    }
  }
  return stars;
};

function AllFeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ratingSubmitting, setRatingSubmitting] = useState({});

  useEffect(() => {
    fetch("https://qualityfarm-b-1.onrender.com/featured/")
      .then((res) => res.json())
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Handle rating submission
  const handleRate = async (productId, rating) => {
    if (!isLoggedIn()) {
      toast.error("You must be logged in to rate products.");
      return;
    }
    setRatingSubmitting(prev => ({ ...prev, [productId]: true }));
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`https://qualityfarm-b-1.onrender.com/products/${productId}/rate/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ rating })
      });
      if (res.status === 401) {
        localStorage.removeItem('token');
        toast.error("Session expired. Please log in again.");
        window.location.href = "/login";
        return;
      }
      if (!res.ok) {
        const errorText = await res.text();
        console.error('API error:', res.status, errorText);
        toast.error("Failed to submit rating.");
        throw new Error('Failed to submit rating');
      }
      toast.success("Rating submitted!");
      // Optionally update the product's rating in state
      setProducts(products =>
        products.map(p =>
          p.id === productId ? { ...p, average_rating: rating } : p
        )
      );
    } catch (e) {
      console.error(e);
      toast.error("An error occurred while submitting your rating.");
    } finally {
      setRatingSubmitting(prev => ({ ...prev, [productId]: false }));
    }
  };

  if (loading) return (
    <div className="min-h-screen pt-16 md:pt-20 px-3 md:px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center py-6 md:py-8">
          <div className="animate-spin rounded-full h-8 w-8 md:h-10 md:w-10 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-3 text-sm md:text-base text-gray-600">Loading featured products...</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-16 md:pt-20 px-3 md:px-4 pb-6 md:pb-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-green-700 mb-4 md:mb-6 text-center">All Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-5 lg:p-6 flex flex-col items-center border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <img
                src={product.image ? `https://qualityfarm-b-1.onrender.com${product.image}` : "/placeholder.jpg"}
                alt={product.title}
                className="h-24 w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 object-cover rounded-full mb-2 md:mb-3 border-2 md:border-4 border-green-500 shadow"
              />
              <h3 className="text-sm md:text-base lg:text-lg font-semibold text-gray-800 mb-1 text-center line-clamp-2">{product.title}</h3>
              <span className="text-green-700 font-bold mb-1.5 md:mb-2 text-sm md:text-base">
                UGX {new Intl.NumberFormat('en-UG').format(product.price)}
              </span>
              <p className="text-gray-500 text-xs md:text-sm text-center mb-2 line-clamp-2">{product.description}</p>
              <div className="flex items-center mb-2 md:mb-3 text-xs md:text-sm">
                {isLoggedIn()
                  ? renderStars(
                      product.average_rating || 0,
                      (rating) => handleRate(product.id, rating),
                      true
                    )
                  : renderStars(product.average_rating || 0)
                }
                {isLoggedIn() && ratingSubmitting[product.id] && (
                  <span className="ml-1.5 text-xs text-gray-400">Submitting...</span>
                )}
                {!isLoggedIn() && (
                  <span className="ml-1.5 text-xs text-gray-400">Login to rate</span>
                )}
              </div>
              <Link
                to={`/product/${encodeURIComponent(product.title)}`}
                className="mt-auto bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-4 py-1.5 md:px-5 md:py-2 rounded-full text-xs md:text-sm font-semibold shadow transition-all duration-200 text-center w-full"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllFeaturedProducts;