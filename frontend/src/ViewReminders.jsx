import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ViewReminders() {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/reminder')
      .then((res) => res.json())
      .then((data) => setReminders(data))
      .catch((err) => console.error("Failed to fetch reminders", err));
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
        📋 Upcoming Renewal Reminders
      </h1>

      {reminders.length === 0 ? (
        <p className="text-center text-gray-600">No reminders found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reminders.map((r, i) => (
            <div key={i} className="bg-white shadow-lg rounded-xl p-4">
              <h2 className="text-lg font-semibold text-blue-700">{r.itemName}</h2>
              <p className="text-sm text-gray-500 mt-1">Reminder Date: <span className="font-medium">{r.reminderDate}</span></p>
              <p className="text-gray-600 mt-2">{r.description}</p>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-8">
        <Link to="/" className="text-blue-600 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default ViewReminders;
