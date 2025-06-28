// src/Icons.jsx
import { useNavigate } from 'react-router-dom';
import { categories } from '../categories'; // category metadata (defined below)
import BackToHome from '../Components/BackToHome';

export default function Icons() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-gray-100 to-blue-50">
      <h1 className="text-3xl font-bold text-center mb-6">🔍 Choose a Category</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 justify-center">
        {categories.map(({ name, icon }) => (
          <button
            key={name}
            onClick={() => navigate(`/category/${name}`)}
            className="flex flex-col items-center justify-center p-4 rounded-xl bg-white shadow-lg hover:bg-blue-100 transition"
          >
            <span className="text-4xl">{icon}</span>
            <span className="mt-2 font-semibold text-gray-700">{name}</span>
          </button>
        ))}
      </div>
      <BackToHome/>
    </div>
  );
}
