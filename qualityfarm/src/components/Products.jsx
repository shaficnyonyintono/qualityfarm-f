// filepath: c:\Users\user\Desktop\qualityfarm\frontend\qualityfarm\src\Products.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProductCard from './ProductCard';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = useQuery();
  const searchTerm = query.get("search") || "";
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    let url = "https://qualityfarm-b-1.onrender.com/items/";
    if (searchTerm) {
      url += `?search=${encodeURIComponent(searchTerm)}`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [searchTerm]);

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
      <div className="min-h-screen pt-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {searchTerm ? `Search Results for "${searchTerm}"` : "All Products"}
          </h1>
          <button
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-full font-semibold transition-colors duration-200"
            onClick={() => navigate("/")}
          >
            ← Back to Home
          </button>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <i className="fas fa-search text-6xl text-gray-300 mb-4"></i>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {searchTerm ? "No products found" : "No products available"}
              </h2>
              <p className="text-gray-600 mb-6">
                {searchTerm 
                  ? `Try searching for something else or browse all products.`
                  : "Check back later for new products."
                }
              </p>
              {searchTerm && (
                <button
                  onClick={() => window.location.reload()}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  View All Products
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? `Found ${products.length} ${products.length === 1 ? 'product' : 'products'} matching "${searchTerm}"`
                : `Showing ${products.length} ${products.length === 1 ? 'product' : 'products'}`
              }
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isInCart={isInCart(product.id)}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Products;