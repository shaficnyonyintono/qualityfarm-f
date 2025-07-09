import React, { useState } from 'react';

function OrderTestPage() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testOrderAPI = async () => {
    setLoading(true);
    setResult('');

    try {
      const token = localStorage.getItem('token');
      const API_BASE = window.location.hostname === 'localhost' 
        ? "http://localhost:8000" 
        : "https://qualityfarm-b-1.onrender.com";

      console.log('Testing API endpoint:', `${API_BASE}/orders/`);
      console.log('Token:', token ? 'Token exists' : 'No token');

      const testOrder = {
        customer_name: 'Test User',
        customer_email: 'test@example.com',
        customer_phone: '+1234567890',
        delivery_address: '123 Test St',
        delivery_city: 'Test City',
        delivery_notes: 'Test notes',
        items: [
          {
            item_id: 1,
            quantity: 1
          }
        ]
      };

      const response = await fetch(`${API_BASE}/orders/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testOrder),
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      const data = await response.json();
      console.log('Response data:', data);

      setResult(JSON.stringify({
        status: response.status,
        ok: response.ok,
        data: data
      }, null, 2));

    } catch (error) {
      console.error('Test error:', error);
      setResult(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Order API Test</h1>
      
      <button
        onClick={testOrderAPI}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {loading ? 'Testing...' : 'Test Order API'}
      </button>

      {result && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Result:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
            {result}
          </pre>
        </div>
      )}
    </div>
  );
}

export default OrderTestPage;
