// filepath: c:\Users\user\Desktop\qualityfarm\frontend\qualityfarm\src\Products.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // <-- import useNavigate

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const backendUrl = "http://127.0.0.1:8000";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = useQuery();
  const searchTerm = query.get("search") || "";
  const navigate = useNavigate(); // <-- initialize navigate

  useEffect(() => {
    setLoading(true);
    let url = "http://127.0.0.1:8000/api/items/";
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
      existing.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1,
        image: product.images && product.images.length > 0 ? product.images[0].image : null
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated")); // update cart badge
    alert(`${product.title} added to cart!`);
  };

  // Helper to check if product is in cart
  const isInCart = (productId) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    return cart.some((item) => item.id === productId);
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">
        {searchTerm ? `Results for "${searchTerm}"` : "All Products"}
      </h2>
      <button
        className="mb-6 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-full font-semibold shadow transition-all duration-200"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
      {products.length === 0 ? (
        <div>No products found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => {
            const alreadyInCart = isInCart(product.id);
            return (
              <div key={product.id} className="bg-white rounded shadow p-4">
                {product.images && product.images.length > 0 && (
                  <img
                    src={
                      product.images[0].image.startsWith("http")
                        ? product.images[0].image
                        : backendUrl + product.images[0].image
                    }
                    alt={product.title}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                )}
                <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <p className="text-green-700 font-bold mb-2">UGX {product.price}</p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className={`mt-2 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-4 py-2 rounded-full font-semibold shadow transition-all duration-200 w-full ${
                    alreadyInCart ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={alreadyInCart}
                >
                  {alreadyInCart ? "In Cart" : "Add to Cart"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Products;