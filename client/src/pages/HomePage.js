import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      

      {/* Hero Section */}
      <main className="container mx-auto flex-grow p-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
            Welcome to RefHub
          </h2>
          <p className="text-lg text-gray-600">
            An integrated platform designed to streamline the management of medical studies and standardized reference ranges.
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Studies Card */}
          <Link to="/studies" className="block bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex flex-col items-center">
              <svg className="h-12 w-12 text-blue-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V7a2 2 0 012-2h5l2 2h5a2 2 0 012 2v10a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Studies</h3>
              <p className="text-gray-600 text-center">
                Manage medical studies and their associated reference ranges.
              </p>
            </div>
          </Link>

          {/* Reference Ranges Card */}
          <Link to="/reference-ranges" className="block bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex flex-col items-center">
              <svg className="h-12 w-12 text-blue-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Reference Ranges</h3>
              <p className="text-gray-600 text-center">
                View and update medical reference ranges for various analytes.
              </p>
            </div>
          </Link>

          {/* Login Card */}
          <Link to="/login" className="block bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex flex-col items-center">
              <svg className="h-12 w-12 text-blue-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 17l-4 4m0 0l-4-4m4 4V3" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Login</h3>
              <p className="text-gray-600 text-center">
                Securely access your account and manage your data.
              </p>
            </div>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 py-4 text-center">
        <p className="text-gray-600">© 2025 RefHub. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
