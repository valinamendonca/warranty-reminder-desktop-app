import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BackToHome from '../Components/BackToHome';

export default function CategoryItemsPage() {
  const { category } = useParams();
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/api/warranty/valid')
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(item => item.category?.replace(/"/g, '') === category);
        setItems(filtered);
        console.log(filtered);
      });
  }, [category]);

  const handleDelete = async (itemName, id) => {
    
    const confirm = window.confirm(`Are you sure you want to delete ${itemName}?`);
    if (!confirm) return;

    try {
      console.log(`Deleting warranty: ${itemName} with ID: ${id}`);
      
      const res = await fetch(`http://localhost:8080/api/warranty?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setItems(prev => prev.filter(i => i.id !== id));
        alert("✅ Warranty deleted.");
      } else {
        alert("❌ Error deleting warranty.");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Network error.");
    }
  };

  const handleEdit = (item) => {
    // You can navigate to a form and pass item via state or params
    console.log(`Editing warranty: ${item.itemName} with ID: ${item.id}`);
    navigate('/edit-warranty', { state: { item } });
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h2 className="text-2xl font-bold text-center mb-6">📂 {category} Warranties</h2>
      {items.length === 0 ? (
        <p className="text-center text-gray-500">No warranties found for this category.</p>
      ) : (
        <ul className="space-y-4">
          {items.map((item, idx) => (
            
            <li key={idx} className="bg-white p-4 rounded-xl shadow space-y-1">
              <h3 className="text-lg font-semibold">{item.itemName}</h3>
              <div className="text-xs text-gray-400">ID: {item.id}</div>
              <p className="text-sm text-gray-600">Expiry: {item.expiryDate}</p>
              <p className="text-sm text-gray-500">{item.description}</p>
              <div className="flex gap-4 mt-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-600 hover:underline font-medium"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(item.itemName, item.id)}
                  className="text-red-600 hover:underline font-medium"
                >
                  🗑️ Delete
                </button>
                {item.reminder?.toString().toLowerCase() === 'true' && (
                  <div className="flex items-center text-green-600 text-sm font-medium">
                    ⏰ Reminder Set
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
      <BackToHome to="/categories" label="← Back to Categories" />
    </div>
  );
}
