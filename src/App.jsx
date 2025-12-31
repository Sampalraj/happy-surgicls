import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import VirtualTour from './pages/VirtualTour';
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
import SegmentManager from './pages/admin/SegmentManager';
import Branding from './pages/admin/Branding';
import AdminLogin from './pages/admin/AdminLogin';
import Enquiries from './pages/admin/Enquiries';
import MediaLibrary from './pages/admin/MediaLibrary';
import PageManager from './pages/admin/PageManager';
import CertificatesList from './pages/admin/CertificatesList';
import CertificateForm from './pages/admin/CertificateForm';
import AuditLog from './pages/admin/AuditLog';
import ReportGenerator from './pages/admin/ReportGenerator';
import AuditReportPrint from './pages/admin/AuditReportPrint';
import GeneralSettings from './pages/admin/GeneralSettings';
import UserManager from './pages/admin/UserManager';
import AdminRegister from './pages/admin/AdminRegister';
import AdminForgotPassword from './pages/admin/AdminForgotPassword';
import SupabaseMigration from './pages/admin/SupabaseMigration';

import './styles/index.css';

import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
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

          {/* Admin Auth Routes (Public/Semipublic) */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/request-access" element={<AdminRegister />} />
          <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />


          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="products" element={<ProductManager />} />
              <Route path="products/new" element={<ProductForm />} />
              <Route path="products/edit/:id" element={<ProductForm />} />
              <Route path="categories" element={<CategoryManager />} />
              <Route path="segments" element={<SegmentManager />} />
              <Route path="branding" element={<Branding />} />
              <Route path="enquiries" element={<Enquiries />} />
              <Route path="certificates" element={<CertificatesList />} />
              <Route path="certificates/new" element={<CertificateForm />} />
              <Route path="certificates/edit/:id" element={<CertificateForm />} />
              <Route path="audit" element={<AuditLog />} />
              <Route path="media" element={<MediaLibrary />} />
              <Route path="pages" element={<PageManager />} />
              <Route path="settings" element={<GeneralSettings />} />
              <Route path="users" element={<UserManager />} />
              <Route path="audit-reports" element={<ReportGenerator />} />
              <Route path="migrate" element={<SupabaseMigration />} />
            </Route>
            <Route path="/admin/reports/print" element={<AuditReportPrint />} />
          </Route>

          <Route path="/virtual-tour" element={<VirtualTour />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
