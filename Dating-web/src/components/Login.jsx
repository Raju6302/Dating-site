import React, { useState } from "react";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const [login, setLogin] = useState(true);

  const {
    handleLogin,
    handleSignUp,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmailId,
    password,
    setPassword,
    error
   } = useLogin();

  const handleSignInSignUp = () => {
    setLogin(!login);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
     
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {login ? "Login to FlareHeart" : "create your FlareHeart account"}
        </h2>

        {!login && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            value={email}
            onChange={(e) => setEmailId(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <p className="text-red-500">{error}</p>
        </div>

        <button
          onClick={login ? handleLogin : handleSignUp}
          className="mt-4 cursor-pointer w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-800 transition duration-200"
        >
          {login ? "Login" : "Sign Up"}
        </button>

        <p
          onClick={handleSignInSignUp}
          className="mt-4 text-sm text-center text-gray-800 hover:underline cursor-pointer"
        >
          {login ? "New user? Sign up here" : "Existing user? Login here"}
        </p>
      </div>
    </div>
  );
};

export default Login;
