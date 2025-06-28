import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import BackToHome from '../Components/BackToHome';

function WarrantyForm() {
  const navigate = useNavigate();

  const [itemName, setItemName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [reminder, setReminder] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting warranty:', { itemName, expiryDate, description, category, reminder });

    const response = await fetch('http://localhost:8080/api/warranty', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemName, expiryDate, description, category, reminder })
    });

    if (response.ok) {
      alert('✅ Warranty saved!');
      setItemName('');
      setExpiryDate('');
      setDescription('');
      setCategory('');
      setReminder(false);
      navigate('/'); // Redirect to categories page
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
              placeholder="e.g. TV, Fridge, Insurance"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Category</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select category</option>
              <option value="household">🏠 House</option>
              <option value="car">🚗 Car</option>
              <option value="finance">💰 Finance</option>
              <option value="healthcare">🩺 Healthcare</option>
              <option value="accessories">🎧 Accessories</option>
              <option value="other">🗂️ Other</option>
            </select>
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

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              <input
                type="checkbox"
                checked={reminder}
                onChange={(e) => setReminder(e.target.checked)}
                className="mr-2"
              />
              Set Reminder
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-blue-700 transition duration-300"
          >
            💾 Save Warranty
          </button>
        </form>

        <BackToHome/>
      </div>
    </div>
  );
}

export default WarrantyForm;
