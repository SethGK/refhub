import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation({ onLogout }) {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <NavLink
            to="/"
            end
            className="hover:underline"
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/reference-ranges"
            className="hover:underline"
          >
            Reference Ranges
          </NavLink>
          <NavLink
            to="/studies"
            className="hover:underline"
          >
            Studies
          </NavLink>
        </div>
        <button
          onClick={onLogout}
          className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
