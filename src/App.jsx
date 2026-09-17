import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';

import { SignedIn, SignedOut, RedirectToSignIn, SignIn, SignUp } from '@clerk/clerk-react';
import { useAuth } from './contexts/AuthContext';

const Landing = lazy(() => import('./pages/Landing'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Services = lazy(() => import('./pages/Services'));
const BookingPage = lazy(() => import('./pages/BookingPage'));
const Settings = lazy(() => import('./pages/Settings'));


const ProtectedRoute = ({ children }) => {
  const { shop, loading } = useAuth();
  const location = useLocation();

  return (
    <>
      <SignedIn>
        {!loading && !shop && location.pathname !== '/settings' ? <Navigate to="/settings" replace /> : children}
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="h-screen w-full flex items-center justify-center bg-slate-50"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div></div>}>
        <Routes>
          <Route path="/" element={<Landing />} />
          
          <Route path="/login/*" element={<div className="flex justify-center items-center h-screen bg-slate-50"><SignIn routing="path" path="/login" fallbackRedirectUrl="/dashboard" forceRedirectUrl="/dashboard" /></div>} />
          <Route path="/signup/*" element={<div className="flex justify-center items-center h-screen bg-slate-50"><SignUp routing="path" path="/signup" fallbackRedirectUrl="/dashboard" forceRedirectUrl="/dashboard" /></div>} />
          
          <Route path="/book/:shopSlug" element={<BookingPage />} />
          
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/services" element={<Services />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
