import React, { useState, useEffect, useCallback } from 'react';
import { fetchWishlist, removeFromWishlist } from '../api.js';
import { toast } from 'react-toastify';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  const loadWishlist = useCallback(async () => {
    if (!token) {
      setError('Please login to view your wishlist');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await fetchWishlist();
      setWishlistItems(data);
      setError(null);
    } catch (err) {
      console.error('Error loading wishlist:', err);
      setError('Failed to load wishlist');
      toast.error('Failed to load wishlist');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadWishlist();
  }, [loadWishlist]);

  const handleRemoveFromWishlist = async (itemId) => {
    try {
      await removeFromWishlist(itemId);
      setWishlistItems(prev => prev.filter(item => item.item.id !== itemId));
      toast.success('Item removed from wishlist');
      
      // Dispatch custom event to update wishlist count in navbar
      window.dispatchEvent(new Event('wishlistUpdated'));
    } catch (err) {
      console.error('Error removing from wishlist:', err);
      toast.error('Failed to remove item from wishlist');
    }
  };

  const addToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      existingItem.cartQuantity += 1;
    } else {
      cart.push({ ...item, cartQuantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    toast.success('Added to cart');
  };

  if (!token) {
    return (
      <div className="min-h-screen pt-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <i className="fas fa-heart text-6xl text-gray-300 mb-4"></i>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Wishlist</h2>
            <p className="text-gray-600 mb-6">Please login to view and manage your wishlist</p>
            <a 
              href="/login" 
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Login to Continue
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your wishlist...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <i className="fas fa-exclamation-triangle text-6xl text-red-400 mb-4"></i>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Error</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button 
              onClick={loadWishlist}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            <i className="fas fa-heart text-green-600 mr-3"></i>
            My Wishlist
          </h1>
          <p className="text-gray-600">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <i className="fas fa-heart text-6xl text-gray-300 mb-4"></i>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-6">Start adding your favorite items to your wishlist</p>
              <a 
                href="/products" 
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-block"
              >
                Browse Products
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((wishlistItem) => {
              const item = wishlistItem.item;
              const firstImage = item.images && item.images.length > 0 ? item.images[0].image : null;
              
              return (
                <div key={wishlistItem.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative">
                    <img
                      src={firstImage || 'https://via.placeholder.com/300x200?text=No+Image'}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    <button
                      onClick={() => handleRemoveFromWishlist(item.id)}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors"
                      title="Remove from wishlist"
                    >
                      <i className="fas fa-times text-sm"></i>
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-green-600">
                        ${parseFloat(item.price).toFixed(2)}
                      </span>
                      <div className="flex items-center text-yellow-500">
                        <i className="fas fa-star mr-1"></i>
                        <span className="text-gray-600">
                          {item.average_rating > 0 ? item.average_rating.toFixed(1) : 'No ratings'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => addToCart(item)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
                      >
                        <i className="fas fa-shopping-cart mr-2"></i>
                        Add to Cart
                      </button>
                      <a
                        href={`/products/${item.id}`}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-semibold transition-colors text-center"
                      >
                        <i className="fas fa-eye"></i>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
