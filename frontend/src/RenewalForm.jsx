import { useState } from 'react';
import { Link } from 'react-router-dom';

function RenewalForm() {
  const [itemName, setItemName] = useState('');
  const [reminderDate, setReminderDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/api/reminder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemName, reminderDate, description }),
    });

    if (response.ok) {
      alert('Reminder saved to CSV!');
      setItemName('');
      setReminderDate('');
      setDescription('');
    } else {
      alert('Failed to save reminder');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-50 to-blue-50 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-xl">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">🔔 Set Renewal Reminder</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="date"
            value={reminderDate}
            onChange={(e) => setReminderDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <textarea
            rows={4}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Save Reminder
          </button>
        </form>
        <div className="text-center mt-6">
          <Link to="/" className="text-blue-600 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RenewalForm;
