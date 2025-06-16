import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ValidWarranty = () => {
  const [warranties, setWarranties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/warranty/valid')
      .then((res) => res.json())
      .then((data) => setWarranties(data))
      .catch((err) => console.error("Error fetching warranties:", err));
  }, []);

  const filteredWarranties = warranties.filter((item) =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-10">
          ✅ Valid Warranties
        </h1>

        <div className="max-w-xl mx-auto mb-10">
          <input
            type="text"
            placeholder="🔍 Search by item name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-3 rounded-xl border border-gray-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {filteredWarranties.length === 0 ? (
          <p className="text-center text-gray-500 text-lg font-medium">
            😕 No valid warranties found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWarranties.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-xl p-6 hover:scale-[1.02] transition-transform duration-200"
              >
                <h2 className="text-2xl font-bold text-blue-700 mb-2">
                  {item.itemName}
                </h2>
                <p className="text-gray-600 mb-3">{item.description}</p>
                <p className="text-sm text-gray-500">
                  📅 Expiry:{' '}
                  <span className="font-medium text-gray-700">
                    {item.expiryDate}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/"
            className="inline-block text-blue-600 font-semibold hover:underline hover:text-blue-800 transition"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ValidWarranty;
