import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";

// Component for user login functionality
const Login = () => {
  // State variables to manage input values and error messages
  const [username, setUsername] = useState(""); // Stores the username input
  const [password, setPassword] = useState(""); // Stores the password input
  const [error, setError] = useState(""); // Stores error messages to display to the user

  const navigate = useNavigate(); // React Router hook for navigation between pages

  // Function to handle login button click
  const handleLogin = async () => {
    try {
      // API request to authenticate user
      const response = await axios.post("http://localhost:5105/api/Auth/Login", {
        username, // Username entered by the user
        password, // Password entered by the user
      });

      // Check if the login response is successful
      if (response.data.message === "Login successful") {
        localStorage.setItem("loggedInUsername", response.data.username); // Store the username in local storage for session persistence
        navigate("/dashboard"); // Navigate to the dashboard page on successful login
      } else {
        setError("Invalid username or password"); // Set error message for invalid credentials
      }
    } catch (error) {
      setError("An error occurred while logging in. Please try again."); // Generic error message for API call failure
      console.error(error); // Log the error for debugging purposes
    }
  };

  // JSX for rendering the login page
  return (
    <div className="login-container">
      {/* Wrapper for centering the login content */}
      <div className="login-wrapper">
        {/* Logo Section */}
        <div className="login-logo">
          <img src="/logo library.png" alt="Library Logo" /> {/* Displays the library logo */}
        </div>
        {/* Login Box */}
        <div className="login-box">
          <h2>Welcome Back!</h2> {/* Page heading */}
          {/* Username Input */}
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username} // Bind the input value to state
              onChange={(e) => setUsername(e.target.value)} // Update state on user input
            />
          </div>
          {/* Password Input */}
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password} // Bind the input value to state
              onChange={(e) => setPassword(e.target.value)} // Update state on user input
            />
          </div>
          {/* Error Message */}
          {error && <p className="error-message">{error}</p>} {/* Display error if exists */}
          {/* Login Button */}
          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>
          {/* Register Link */}
          <p className="register-link">
            Don’t Have An Account?{" "}
            <span onClick={() => navigate("/register")}>Register</span> {/* Navigate to the registration page */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login; // Export the Login component
