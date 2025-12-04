import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">

        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400"
            placeholder="Enter email"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400"
            placeholder="Enter password"
          />
        </div>

        <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
          Login
        </button>

        <p className="text-center mt-4 text-sm">
          Don’t have an account? <a href="/register" className="text-blue-500 underline">Register</a>
        </p>

      </div>
    </div>
  );
};

export default Login;
