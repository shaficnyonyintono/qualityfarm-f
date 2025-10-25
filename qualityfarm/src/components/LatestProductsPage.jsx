import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductCard from './ProductCard';

const LatestProductsPage = () => {
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://qualityfarm-b-1.onrender.com/new/")
      .then(res => res.json())
      .then(setLatestProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Add to Cart functionality
  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      existing.cartQuantity = (existing.cartQuantity || 1) + 1;
    } else {
      cart.push({
        ...product,
        cartQuantity: 1,
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
    return cart.some((item) => item.id === productId);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 md:pt-20 px-3 md:px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-6 md:py-8">
            <div className="animate-spin rounded-full h-8 w-8 md:h-10 md:w-10 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-3 text-sm md:text-base text-gray-600">Loading latest products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 md:pt-20 px-3 md:px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4 md:mb-6">
          <button
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-1.5 md:px-5 md:py-2 rounded-full text-sm md:text-base font-semibold transition-colors duration-200 mb-3 md:mb-4"
            onClick={() => navigate("/")}
          >
            ← Back to Home
          </button>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-green-700 mb-2 md:mb-3">Latest Products</h1>
          <p className="text-sm md:text-base text-gray-600">Discover our newest arrivals and latest additions</p>
        </div>
        
        {latestProducts.length === 0 ? (
          <div className="text-center py-8 md:py-10">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <i className="fas fa-clock text-4xl md:text-5xl text-gray-300 mb-3 md:mb-4"></i>
              <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3">No new products available</h2>
              <p className="text-sm md:text-base text-gray-600">Check back later for our latest products.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-3 lg:gap-4">
            {latestProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isInCart={isInCart(product.id)}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestProductsPage;