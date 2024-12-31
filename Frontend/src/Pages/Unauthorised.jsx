import React from "react";

const Unauthorized = () => {
  return (
    <div className="text-center mt-28">
      <h1 className="text-4xl font-bold text-red-500">403 - Unauthorized</h1>
      <p className="text-lg mt-4">You do not have permission to access this page.</p>
      <p className="text-lg mt-4"></p>

      <a href="/" className="text-blue-500 mt-6">
        Go back to Home
      </a>
    </div>
  );
};

export default Unauthorized;
