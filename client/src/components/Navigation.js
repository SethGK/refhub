import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation({ onLogout }) {
  return (
    <nav>
      <NavLink to="/" end>Dashboard</NavLink> |
      <NavLink to="/reference-ranges">Reference Ranges</NavLink> |
      <NavLink to="/studies">Studies</NavLink> |
      <button onClick={onLogout}>Logout</button>
    </nav>
  );
}

export default Navigation;