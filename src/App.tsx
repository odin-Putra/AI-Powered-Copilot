import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import About from './pages/About';
import Contact from './pages/Contact';
import StudentDashboard from './pages/StudentDashboard';
import HRDashboard from './pages/HRDashboard';

function ProtectedRoute({ children, allowedRole }: { children: React.ReactNode, allowedRole: 'student' | 'hr' }) {
  // authentication removed, always render children
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          <Route path="/student/*" element={<StudentDashboard />} />
          <Route path="/hr/*" element={<HRDashboard />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}
