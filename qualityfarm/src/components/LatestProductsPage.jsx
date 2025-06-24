import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import

const LatestProductsPage = () => {
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    fetch("https://qualityfarm-b-1.onrender.com/new/")
      .then(res => res.json())
      .then(setLatestProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading latest products...</div>;

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-6">
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-full font-semibold shadow transition-all duration-200"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
      <h2 className="text-3xl font-extrabold text-green-700 tracking-tight mb-8">All Latest Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {latestProducts.map((product, idx) => (
          <div
            key={product.id || idx}
            className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col items-center border border-gray-100 group"
          >
            <div className="w-28 h-28 mb-4 rounded-full overflow-hidden border-4 border-green-500 shadow-lg group-hover:scale-105 transition-transform duration-300">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[0].image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src="/placeholder.jpg"
                  alt="No product"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1 text-center">{product.title}</h3>
            <p className="text-green-700 font-bold text-base mb-1">UGX {product.price}</p>
            <p className="text-gray-500 text-sm text-center mb-4">{product.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestProductsPage;