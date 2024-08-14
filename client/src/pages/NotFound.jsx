import React from 'react';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">404</h1>
        <p className="text-lg text-gray-700">Page Not Found</p>
        <a href="/" className="mt-4 text-blue-500 hover:underline">Go Back to Home</a>
      </div>
    </div>
  );
};

export default NotFound