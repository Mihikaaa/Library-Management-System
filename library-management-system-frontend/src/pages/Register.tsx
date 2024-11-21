import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Reuse the same CSS as the Login page for consistent styling
import axios from "axios";

// Component for user registration
const Register = () => {
  // State variables to manage input values and error/success messages
  const [username, setUsername] = useState(""); // Stores the username input
  const [password, setPassword] = useState(""); // Stores the password input
  const [confirmPassword, setConfirmPassword] = useState(""); // Stores the confirm password input
  const [error, setError] = useState(""); // Stores error messages to display to the user
  const [successMessage, setSuccessMessage] = useState(""); // Stores success message after registration
  const navigate = useNavigate(); // React Router hook for navigation between pages

  // Function to handle registration logic
  const handleRegister = async () => {
    // Validate that passwords match
    if (password !== confirmPassword) {
      setError("Password and Confirm Password must match"); // Set error if passwords don't match
      return;
    }

    try {
      // API request to register the user
      const response = await axios.post("http://localhost:5105/api/Auth/Register", {
        username, // Username entered by the user
        password, // Password entered by the user
        confirmPassword, // Confirm password entered by the user
      });

      // Check if registration is successful
      if (response.status === 200) {
        setSuccessMessage("Registration successful!"); // Display success message
        setTimeout(() => {
          navigate("/login"); // Redirect to login page after 2 seconds
        }, 2000);
      }
    } catch (error) {
      setError("An error occurred while registering. Please try again."); // Generic error message for API call failure
      console.error(error); // Log the error for debugging purposes
    }
  };

  // JSX for rendering the registration page
  return (
    <div className="login-container">
      {/* Wrapper for centering the registration content */}
      <div className="login-wrapper">
        {/* Logo Section */}
        <div className="login-logo">
          <img src="/logo library.png" alt="Library Logo" /> {/* Displays the library logo */}
        </div>
        {/* Registration Box */}
        <div className="login-box">
          <h2>Register To Book Worm Library</h2> {/* Page heading */}
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
          {/* Confirm Password Input */}
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword} // Bind the input value to state
              onChange={(e) => setConfirmPassword(e.target.value)} // Update state on user input
            />
          </div>
          {/* Error Message */}
          {error && <p className="error-message">{error}</p>} {/* Display error if exists */}
          {/* Success Message */}
          {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success message if exists */}
          {/* Register Button */}
          <button className="login-btn" onClick={handleRegister}>
            Register
          </button>
          {/* Login Redirect Link */}
          <p className="register-link">
            Already Have An Account?{" "}
            <span onClick={() => navigate("/login")}>Login</span> {/* Navigate to the login page */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register; // Export the Register component
