import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DashboardProvider } from './context/DashboardContext';
import { SignInPage } from './pages/auth/SignInPage';
import { SignUpPage } from './pages/auth/SignUpPage';
import { Dashboard } from './pages/dashboard/Dashboard';

function App() {
  return (
    <AuthProvider>
      <DashboardProvider>
        <BrowserRouter>
          <Routes>
            {/* Direct landing on Dashboard - No login barrier */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/Lvl-Dashboard" element={<Dashboard />} />
            
            {/* Dedicated Auth Pages */}
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </DashboardProvider>
    </AuthProvider>
  );
}

export default App;
