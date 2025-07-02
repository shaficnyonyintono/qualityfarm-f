const API_BASE = "http://localhost:8000";

export async function fetchProducts() {
  const res = await fetch(`${API_BASE}/items/`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchCategories() {
  const res = await fetch(`${API_BASE}/categories/`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

// Wishlist API functions
export async function fetchWishlist() {
  const token = localStorage.getItem('token');
  if (!token) throw new Error("No authentication token found");
  
  const res = await fetch(`${API_BASE}/wishlist/`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) throw new Error("Failed to fetch wishlist");
  return res.json();
}

export async function addToWishlist(itemId) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error("No authentication token found");
  
  const res = await fetch(`${API_BASE}/wishlist/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ item_id: itemId }),
  });
  if (!res.ok) throw new Error("Failed to add to wishlist");
  return res.json();
}

export async function removeFromWishlist(itemId) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error("No authentication token found");
  
  const res = await fetch(`${API_BASE}/wishlist/remove/${itemId}/`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) throw new Error("Failed to remove from wishlist");
  return res.json();
}

export async function checkWishlistStatus(itemId) {
  const token = localStorage.getItem('token');
  if (!token) return { is_wishlisted: false };
  
  const res = await fetch(`${API_BASE}/wishlist/check/${itemId}/`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) return { is_wishlisted: false };
  return res.json();
}