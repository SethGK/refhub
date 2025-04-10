import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // For navigation
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import ReferenceRangePage from './components/ReferenceRangePage';
import './App.css';

function App() {
  const [token, setToken] = React.useState(localStorage.getItem('token'));

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken); // Store token
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token'); // Clear token
  };

  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          {token ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <a href="/login">Login</a> | <a href="/register">Register</a>
            </>
          )}
        </nav>
        <Routes>
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/reference-ranges" element={<ReferenceRangePage token={token} />} />
          <Route path="/" element={<h1>Welcome to RefHub</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;