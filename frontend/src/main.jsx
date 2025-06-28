// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import WarrantyForm from './Pages/WarrantyForm.jsx';
import IconsPage from './Pages/Icons.jsx';
import CategoryItemsPage from './Pages/CategoryItemsPage.jsx';
import './index.css';
import EditWarranty from './Pages/EditWarranty.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/warranty" element={<WarrantyForm />}/>
        {/*<Route path="/valid-warranty" element={<ValidWarranty />} />*/}
        <Route path="/categories" element={<IconsPage />} />
        <Route path="/category/:category" element={<CategoryItemsPage />} />
        <Route path="/edit-warranty" element={<EditWarranty />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  </React.StrictMode>
);
