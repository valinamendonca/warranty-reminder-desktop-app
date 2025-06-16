// src/App.jsx
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-blue-100 to-gray-200 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-2xl text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8">
          🎉 Welcome to <span className="text-blue-600">Warranty Tracker</span>
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          Easily manage and view your product warranties all in one place.
        </p>
        <div className="flex flex-col items-center gap-4">
        {/* First Row */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link to="/warranty" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition duration-300">
              ➕ Add Item Warranty
            </button>
          </Link>
          <Link to="/valid-warranty" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-green-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-green-700 transition duration-300">
              ✅ View Valid Warranties
            </button>
          </Link>
        </div>

        {/* Second Row */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link to="/renewal-reminder" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-green-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-green-700 transition duration-300">
              ✅ Set a Renewal Reminder
            </button>
          </Link>
          <Link to="/reminders" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-green-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-green-700 transition duration-300">
              ✅ View All Reminders
            </button>
          </Link>
        </div>
      </div>

      </div>
    </div>
  );
}

export default App;
