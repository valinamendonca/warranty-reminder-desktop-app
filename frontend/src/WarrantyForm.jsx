// src/WarrantyForm.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

function WarrantyForm() {
  const [itemName, setItemName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting warranty:', { itemName, expiryDate, description });

    const response = await fetch('http://localhost:8080/api/warranty', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemName, expiryDate, description })
    });

    if (response.ok) {
      alert('✅ Warranty saved!');
      setItemName('');
      setExpiryDate('');
      setDescription('');
    } else {
      alert('❌ Error saving warranty');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-6">
      <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-extrabold text-blue-800 text-center mb-6">
          📝 Add a New Warranty
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Item Name</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g. Laptop, Phone, etc."
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Expiry Date</label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Description</label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Brief description of the product or warranty"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-blue-700 transition duration-300"
          >
            💾 Save Warranty
          </button>
        </form>

        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-blue-600 font-medium hover:underline hover:text-blue-800 transition"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default WarrantyForm;
