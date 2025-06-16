// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import WarrantyForm from './WarrantyForm.jsx';
import ValidWarranty from './ValidWarranty.jsx';
import RenewalForm from './RenewalForm.jsx';
import ViewReminders from './ViewReminders.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/warranty" element={<WarrantyForm />} />
        <Route path="/valid-warranty" element={<ValidWarranty />} />
        <Route path="/renewal-reminder" element={<RenewalForm />} />
        <Route path="/reminders" element={<ViewReminders />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  </React.StrictMode>
);
