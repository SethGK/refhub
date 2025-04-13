import React from 'react';
import { Link } from 'react-router-dom';

function AuthNavigation() {
  return (
    <nav className="bg-gray-100 p-4 shadow">
      <div className="container mx-auto flex justify-end space-x-4">
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
        <Link to="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </div>
    </nav>
  );
}

export default AuthNavigation;
