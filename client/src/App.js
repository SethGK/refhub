import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Dashboard from './components/Dashboard';
import ReferenceRangesPage from './pages/ReferenceRangesPage';
import StudiesPage from './pages/StudiesPage';
import AuthNavigation from './components/AuthNavigation';
import Navigation from './components/Navigation';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    console.log('App.js - Token:', token, typeof token, token === null, token === undefined, token === '');
  }, [token]);

  return (
    <BrowserRouter>
      <div className="App">
        {token ? <Navigation onLogout={handleLogout} /> : <AuthNavigation />}
        <Routes>
          <Route path="/" element={token ? <Dashboard token={token} /> : <Navigate to="/login" />} />
          <Route path="/login" element={!token ? <LoginForm onLogin={handleLogin} /> : <Navigate to="/" />} />
          <Route path="/register" element={!token ? <RegistrationForm /> : <Navigate to="/" />} />
          <Route path="/reference-ranges" element={token ? <ReferenceRangesPage token={token} /> : <Navigate to="/login" />} />
          <Route path="/studies" element={token ? <StudiesPage token={token} /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;