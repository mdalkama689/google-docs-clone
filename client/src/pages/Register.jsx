import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../api/axiosInstance";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsloading] = useState(false);
  const { setUserDetails, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      if (!formValidation) return;
      setIsloading(false);
      const response = await axiosInstance.post("/register", formValues);

      toast.success("Registration successful and user logged in!");
      localStorage.setItem("userDetails", JSON.stringify(response?.data?.user));
      localStorage.setItem("isAuthenticated", true);
      setUserDetails(response?.data?.user);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      console.log("Error during registration:", error);
      const errorMessage =
        error?.response?.data?.message ||
        "An error occurred during registration.";
      toast.error(errorMessage);
    } finally {
      setIsloading(false);
    }
  };

  const formValidation = () => {
    if (!formValues.username.trim() || !formValues.password.trim()) {
      return toast.error("All fields are required.");
    }

    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!usernameRegex.test(formValues.username)) {
      return toast.error("Username can only contain letters and numbers.");
    }

    if (formValues.password.trim().length < 8) {
      return toast.error("Password must contain at least 8 characters.");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              name="username"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={handleChangeInput}
              value={formValues.username}
              disabled={isLoading}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={handleChangeInput}
              value={formValues.password}
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:text-blue-700">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
