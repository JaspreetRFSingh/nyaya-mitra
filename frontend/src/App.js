import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import LawyerRegister from './pages/LawyerRegister';
import Dashboard from './pages/Dashboard';
import Lawyers from './pages/Lawyers';
import LawyerDetail from './pages/LawyerDetail';
import Consultations from './pages/Consultations';
import Documents from './pages/Documents';
import DocumentGenerator from './pages/DocumentGenerator';
import Cases from './pages/Cases';
import CaseDetail from './pages/CaseDetail';
import FAQs from './pages/FAQs';
import FAQDetail from './pages/FAQDetail';
import Courts from './pages/Courts';
import Profile from './pages/Profile';
import LegalAid from './pages/LegalAid';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="register/lawyer" element={<LawyerRegister />} />
        <Route path="lawyers" element={<Lawyers />} />
        <Route path="lawyers/:id" element={<LawyerDetail />} />
        <Route path="faqs" element={<FAQs />} />
        <Route path="faqs/:id" element={<FAQDetail />} />
        <Route path="courts" element={<Courts />} />
        <Route path="legal-aid" element={<LegalAid />} />
        
        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="consultations"
          element={
            <PrivateRoute>
              <Consultations />
            </PrivateRoute>
          }
        />
        <Route
          path="documents"
          element={
            <PrivateRoute>
              <Documents />
            </PrivateRoute>
          }
        />
        <Route
          path="documents/generate"
          element={
            <PrivateRoute>
              <DocumentGenerator />
            </PrivateRoute>
          }
        />
        <Route
          path="cases"
          element={
            <PrivateRoute>
              <Cases />
            </PrivateRoute>
          }
        />
        <Route
          path="cases/:id"
          element={
            <PrivateRoute>
              <CaseDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
