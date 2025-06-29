import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

export default function EditWarranty() {
  const location = useLocation();
  const navigate = useNavigate();

  const item = location.state?.item;

  const itemNameRef = useRef(null);
  
  const [id, setId] = useState(item?.id || '');
  const [itemName, setItemName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [reminder, setReminder] = useState(false);

  useEffect(() => {
    const handleWindowFocus = () => {
      if (itemNameRef.current) {
        itemNameRef.current.focus();
      }
    };

    window.addEventListener('focus', handleWindowFocus);

    // Optionally focus right away if the window is already focused
    if (document.hasFocus()) {
      handleWindowFocus();
    }

    return () => {
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, []);

  useEffect(() => {

    if (item) {
      setId(item.id);
      setItemName(item.itemName);
      setExpiryDate(item.expiryDate);
      setDescription(item.description);
      setCategory(item.category?.replace(/"/g, '') || '');
      setReminder(item.reminder?.toString().toLowerCase() === 'true');
    }

  }, [item]);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">❌ No item data provided. Go back and try again.</p>
      </div>
    );
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("Updated warranty:", { id, itemName, expiryDate, description, category, reminder });
    
    const response = await fetch('http://localhost:8080/api/warranty', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, itemName, expiryDate, description, category, reminder })
    });

    if (response.ok) {
      alert('✅ Warranty updated!');
    navigate(-1);
    } else {
      alert('❌ Failed to update warranty');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-6">
      <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-extrabold text-blue-800 text-center mb-6">✏️ Edit Warranty</h2>
        <form onSubmit={handleUpdate} className="space-y-5">
          <div className="form-wrapper" style={{ WebkitAppRegion: 'no-drag' }}>
            <label className="block text-gray-700 font-semibold mb-1" htmlFor='itemName'>Item Name</label>
            <div className="relative z-50 pointer-events-auto" style={{ WebkitAppRegion: 'no-drag' }}>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-xl pointer-events-auto"
              style={{ zIndex: 10, position: 'relative', WebkitAppRegion: 'no-drag' }}
              id='itemName'
              ref={itemNameRef}
              onClick={(e) => {
                console.log("Input clicked", e);
                itemNameRef.current?.focus();
                console.log("Focused:", document.activeElement === itemNameRef.current);
              }}
              onFocus={() => console.log("Input focused")}
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Expiry Date</label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
          </div>
          <div className="form-wrapper" style={{ WebkitAppRegion: 'no-drag' }}>
            <label className="block text-gray-700 font-semibold mb-1" htmlFor='desc'>Description</label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              style={{ zIndex: 10, position: 'relative' }}
              id='desc'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Category</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">-- Select Category --</option>
              <option value="household">🏠 House</option>
              <option value="car">🚗 Car</option>
              <option value="finance">💰 Finance</option>
              <option value="healthcare">🏥 Healthcare</option>
              <option value="accessories">👜 Accessories</option>
              <option value="other">🗂️ Other</option>
            </select>
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
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
          >
            💾 Save Changes
          </button>
        </form>
        <div className="text-center mt-6">
          <button
            className="text-blue-600 font-medium hover:underline"
            onClick={() => navigate(-1)}
          >
            ← Cancel and Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
