import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h2>Welcome to RefHub</h2>
      <p>
        RefHub is a platform for managing reference ranges and studies.
      </p>

      <div>
        <h3>Get Started</h3>
        <ul>
          <li>
            If you're new, <Link to="/register">create an account</Link> to get started.
          </li>
          <li>
            If you already have an account, <Link to="/login">log in</Link> to access your data.
          </li>
        </ul>
      </div>

      <div>
        <h3>Key Features</h3>
        <ul>
          <li>Manage reference ranges for various analytes.</li>
          <li>Organize and track your research studies.</li>
          <li>Secure authentication and data storage.</li>
          {/* Add more features as you expand your application */}
        </ul>
      </div>

      {/* You can add more sections like contact information, support links, etc. */}
    </div>
  );
}

export default HomePage;