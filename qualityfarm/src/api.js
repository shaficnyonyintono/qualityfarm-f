const API_BASE = "https://qualityfarm-b-1.onrender.com";

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

// Order API functions
export async function createOrder(orderData) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_BASE}/orders/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });
  if (!res.ok) throw new Error("Failed to create order");
  return res.json();
}

export async function fetchOrders() {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_BASE}/orders/`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
}

export async function fetchOrderDetail(orderId) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_BASE}/orders/${orderId}/`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) throw new Error("Failed to fetch order details");
  return res.json();
}

export async function cancelOrder(orderId) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_BASE}/orders/${orderId}/cancel/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) throw new Error("Failed to cancel order");
  return res.json();
}

export async function updateOrderStatus(orderId, status, message) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_BASE}/orders/${orderId}/status/`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status, message }),
  });
  if (!res.ok) throw new Error("Failed to update order status");
  return res.json();
}

export async function fetchOrderAnalytics() {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_BASE}/orders/analytics/`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) throw new Error("Failed to fetch order analytics");
  return res.json();
}