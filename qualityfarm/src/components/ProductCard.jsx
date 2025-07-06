import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProductCard = ({ product, isInCart = false, onAddToCart }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/product/${encodeURIComponent(product.title)}`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0,
    }).format(price).replace('UGX', 'UGX ');
  };

  const discountPercentage = product.originalPrice ? 
    Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-green-200">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              -{discountPercentage}%
            </span>
          </div>
        )}

        {/* New/Featured Badge */}
        {product.is_featured && (
          <div className="absolute top-3 right-3 z-10">
            <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              Featured
            </span>
          </div>
        )}

        {/* Product Image */}
        <Link to={`/product/${encodeURIComponent(product.title)}`} className="block h-full">
          <div className="relative h-full">
            {imageLoading && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                <i className="fas fa-image text-gray-400 text-3xl"></i>
              </div>
            )}
            <img
              src={
                product.images && product.images.length > 0
                  ? product.images[0].image.startsWith("http")
                    ? product.images[0].image
                    : "https://qualityfarm-b-1.onrender.com" + product.images[0].image
                  : "/placeholder.jpg"
              }
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onLoad={() => setImageLoading(false)}
              onError={() => setImageLoading(false)}
            />
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
            
            {/* Quick View Button */}
            <button
              onClick={handleQuickView}
              className="absolute inset-x-4 bottom-4 bg-white text-gray-800 py-2 px-4 rounded-full font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-green-50 hover:text-green-700"
            >
              Quick View
            </button>
          </div>
        </Link>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        {product.category && (
          <span className="text-xs text-green-600 font-medium uppercase tracking-wide">
            {product.category.name || product.category}
          </span>
        )}

        {/* Title */}
        <Link to={`/product/${encodeURIComponent(product.title)}`}>
          <h3 className="font-semibold text-gray-900 mt-1 mb-2 line-clamp-2 hover:text-green-700 transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        {product.average_rating > 0 && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <i
                  key={i}
                  className={`fas fa-star text-xs ${
                    i < Math.floor(product.average_rating)
                      ? 'text-yellow-400'
                      : i < product.average_rating
                      ? 'text-yellow-300'
                      : 'text-gray-200'
                  }`}
                ></i>
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">
              ({product.average_rating.toFixed(1)})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-green-700">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Description */}
        {product.description && (
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {product.description}
          </p>
        )}

        {/* Stock Status */}
        <div className="flex items-center gap-2 mb-3">
          <div className={`w-2 h-2 rounded-full ${product.quantity > 0 ? 'bg-green-400' : 'bg-red-400'}`}></div>
          <span className={`text-xs font-medium ${product.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.quantity > 0 ? `${product.quantity} in stock` : 'Out of stock'}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isInCart || product.quantity === 0}
          className={`w-full py-2.5 px-4 rounded-xl font-medium transition-all duration-200 ${
            isInCart
              ? 'bg-green-100 text-green-700 cursor-not-allowed'
              : product.quantity === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 hover:shadow-lg transform hover:-translate-y-0.5'
          }`}
        >
          {isInCart ? (
            <span className="flex items-center justify-center gap-2">
              <i className="fas fa-check"></i>
              In Cart
            </span>
          ) : product.quantity === 0 ? (
            'Out of Stock'
          ) : (
            <span className="flex items-center justify-center gap-2">
              <i className="fas fa-shopping-cart"></i>
              Add to Cart
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
