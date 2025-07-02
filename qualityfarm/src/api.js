const API_BASE = window.location.hostname === 'localhost' 
  ? "http://localhost:8000" 
  : "https://qualityfarm-b-1.onrender.com";

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