import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Career from './pages/Career';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Manufacturing from './pages/Manufacturing';

// Admin Imports
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ProductManager from './pages/admin/ProductManager';
import ProductForm from './pages/admin/ProductForm';
import CategoryManager from './pages/admin/CategoryManager';
import Branding from './pages/admin/Branding';
import AdminLogin from './pages/admin/AdminLogin';
import Enquiries from './pages/admin/Enquiries';
import MediaLibrary from './pages/admin/MediaLibrary';
import PageManager from './pages/admin/PageManager';

import './styles/index.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="services" element={<Services />} />
          <Route path="manufacturing" element={<Manufacturing />} />
          <Route path="about" element={<About />} />
          <Route path="career" element={<Career />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductManager />} />
          <Route path="products/new" element={<ProductForm />} />
          <Route path="products/edit/:id" element={<ProductForm />} />
          <Route path="categories" element={<CategoryManager />} />
          <Route path="branding" element={<Branding />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="media" element={<MediaLibrary />} />
          <Route path="pages" element={<PageManager />} />
          <Route path="settings" element={<div style={{ padding: '2rem' }}><h2>Settings</h2><p>Coming Soon</p></div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
