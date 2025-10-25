import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProductCardProfessional = ({ 
  product, 
  onAddToCart, 
  onRate, 
  showRating = true, 
  showQuickActions = true,
  variant = 'default' // 'default', 'featured', 'compact'
}) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const StarRating = ({ rating, onRate, editable = false }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <i
            key={i}
            className={`fas fa-star text-yellow-400 text-xs md:text-sm ${editable ? 'cursor-pointer hover:text-yellow-500 transition-colors' : ''}`}
            onClick={editable ? () => onRate(i) : undefined}
          />
        );
      } else if (i === fullStars + 1 && halfStar) {
        stars.push(
          <i
            key="half"
            className={`fas fa-star-half-alt text-yellow-400 text-xs md:text-sm ${editable ? 'cursor-pointer hover:text-yellow-500 transition-colors' : ''}`}
            onClick={editable ? () => onRate(i - 0.5) : undefined}
          />
        );
      } else {
        stars.push(
          <i
            key={`empty-${i}`}
            className={`far fa-star text-gray-300 text-xs md:text-sm ${editable ? 'cursor-pointer hover:text-yellow-500 transition-colors' : ''}`}
            onClick={editable ? () => onRate(i) : undefined}
          />
        );
      }
    }
    return <div className="flex items-center gap-0.5 md:gap-1">{stars}</div>;
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      // Default add to cart logic
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
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
      
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cartUpdated'));
      toast.success(`${product.title} added to cart!`);
    }
  };

  const getImageUrl = (product) => {
    if (product.images && product.images.length > 0) {
      const imageUrl = product.images[0].image;
      return imageUrl.startsWith("http") 
        ? imageUrl 
        : "https://qualityfarm-b-1.onrender.com" + imageUrl;
    }
    return "/placeholder.jpg";
  };

  // Variant-specific classes
  const variantClasses = {
    default: "bg-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl",
    featured: "bg-white rounded-xl md:rounded-2xl lg:rounded-3xl shadow-xl hover:shadow-2xl border border-gray-100 hover:border-green-200",
    compact: "bg-white rounded-lg md:rounded-xl shadow-md hover:shadow-lg"
  };

  const imageClasses = {
    default: "aspect-square",
    featured: "aspect-square",
    compact: "aspect-[4/3]"
  };

  return (
    <div className={`group ${variantClasses[variant]} transition-all duration-500 overflow-hidden hover:-translate-y-1 md:hover:-translate-y-2`}>
      {/* Product Image */}
      <div className={`relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 ${imageClasses[variant]}`}>
        <img
          src={getImageUrl(product)}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = "/placeholder.jpg";
          }}
        />
        
        {/* Overlay badges */}
        <div className="absolute top-2 left-2 md:top-3 md:left-3 lg:top-4 lg:left-4">
          {variant === 'featured' && (
            <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-2 py-0.5 md:px-2.5 md:py-1 rounded-full text-xs font-bold shadow-lg">
              Featured
            </span>
          )}
          {product.is_bestselling && (
            <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-0.5 md:px-2.5 md:py-1 rounded-full text-xs font-bold shadow-lg mt-1 md:mt-1.5 block">
              Best Seller
            </span>
          )}
        </div>
        
        {/* Quick action buttons */}
        {showQuickActions && (
          <div className="absolute top-2 right-2 md:top-3 md:right-3 lg:top-4 lg:right-4 flex flex-col gap-1.5 md:gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-red-500 w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center text-xs md:text-sm"
              onClick={(e) => {
                e.stopPropagation();
                toast.info('Wishlist feature coming soon!');
              }}
            >
              <i className="fas fa-heart"></i>
            </button>
            <Link 
              to={`/product/${encodeURIComponent(product.title)}`}
              className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-blue-500 w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center text-xs md:text-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <i className="fas fa-eye"></i>
            </Link>
          </div>
        )}

        {/* Discount percentage */}
        {product.original_price && product.original_price > product.price && (
          <div className="absolute bottom-2 left-2 md:bottom-3 md:left-3 lg:bottom-4 lg:left-4">
            <span className="bg-red-500 text-white px-1.5 py-0.5 md:px-2 md:py-1 rounded-full text-xs font-bold">
              -{Math.round(((product.original_price - product.price) / product.original_price) * 100)}%
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className={`${variant === 'compact' ? 'p-2.5 md:p-3' : 'p-3 md:p-4 lg:p-5'}`}>
        {/* Category */}
        <div className="mb-1.5 md:mb-2">
          <span className="inline-block bg-blue-50 text-blue-700 px-2 py-0.5 md:px-2.5 md:py-1 rounded-full text-xs font-semibold border border-blue-200">
            {product.category?.name || 'Agricultural'}
          </span>
        </div>

        {/* Title */}
        <Link to={`/product/${encodeURIComponent(product.title)}`}>
          <h3 className={`font-bold text-gray-900 mb-1.5 md:mb-2 line-clamp-2 group-hover:text-green-600 transition-colors duration-200 ${
            variant === 'compact' ? 'text-xs md:text-sm' : 'text-sm md:text-base lg:text-lg'
          }`}>
            {product.title}
          </h3>
        </Link>

        {/* Description */}
        {variant !== 'compact' && (
          <p className="text-gray-600 text-xs md:text-sm mb-2 md:mb-3 line-clamp-2">
            {product.description || 'Premium quality agricultural product for optimal results.'}
          </p>
        )}

        {/* Rating */}
        {showRating && (
          <div className="flex items-center justify-between mb-2 md:mb-3">
            <StarRating 
              rating={product.average_rating || 0} 
              onRate={onRate ? (rating) => onRate(product.id, rating) : undefined}
              editable={!!onRate && !!localStorage.getItem('token')}
            />
            <span className="text-xs text-gray-500">
              ({product.rating_count || 0})
            </span>
          </div>
        )}

        {/* Price */}
        <div className={`flex items-center justify-between ${variant === 'compact' ? 'mb-2 md:mb-2.5' : 'mb-2.5 md:mb-3 lg:mb-4'}`}>
          <div>
            <span className={`font-black text-gray-900 ${variant === 'compact' ? 'text-sm md:text-base' : 'text-base md:text-lg lg:text-xl'}`}>
              {formatCurrency(product.price)}
            </span>
            {product.original_price && product.original_price > product.price && (
              <span className="ml-1 md:ml-2 text-xs md:text-sm text-gray-500 line-through">
                {formatCurrency(product.original_price)}
              </span>
            )}
          </div>
          {product.stock_count !== undefined && product.stock_count < 10 && (
            <span className="text-xs text-orange-600 font-semibold">
              {product.stock_count} left
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 md:gap-2.5">
          <button
            onClick={handleAddToCart}
            className={`flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-lg md:rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 flex items-center justify-center gap-1.5 md:gap-2 ${
              variant === 'compact' ? 'py-1.5 px-2 md:py-2 md:px-3 text-xs md:text-sm' : 'py-2 px-3 md:py-2.5 md:px-4 text-xs md:text-sm'
            }`}
          >
            <i className="fas fa-shopping-cart text-xs md:text-sm"></i>
            <span className="hidden sm:inline">{variant === 'compact' ? 'Add' : 'Add to Cart'}</span>
            <span className="sm:hidden">Add</span>
          </button>
          {variant !== 'compact' && (
            <Link
              to={`/product/${encodeURIComponent(product.title)}`}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 font-semibold py-2 px-3 md:py-2.5 md:px-4 rounded-lg md:rounded-xl transition-all duration-200 flex items-center justify-center text-xs md:text-sm"
            >
              <i className="fas fa-info-circle"></i>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCardProfessional;
