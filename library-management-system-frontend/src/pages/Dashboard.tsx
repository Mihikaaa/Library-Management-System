import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css"; // Ensure this CSS file includes styles for the icons
import { FaHome, FaBook, FaPlus } from "react-icons/fa"; // Importing Font Awesome icons

const Dashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  // Fetch logged-in username from localStorage
  useEffect(() => {
    const loggedInUsername = localStorage.getItem("loggedInUsername");
    if (!loggedInUsername) {
      navigate("/login"); // Redirect to login if not logged in
    } else {
      setUsername(loggedInUsername);
    }
  }, [navigate]);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("loggedInUsername"); // Clear the username
    navigate("/login"); // Redirect to login
  };

  return (
    <div className="dashboard-container">
      
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="logo-container">
          <img src="/logo library.png" alt="Library Logo" className="logo" />
        </div>
        <nav className="dashboard-nav-links">
          <ul>
            <li className="dashboard-nav-item">
              <Link to="/dashboard" className="dashboard-nav-item active">
                <FaHome className="icon" /> Dashboard
              </Link>
            </li>
            <li className="dashboard-nav-section">
              <h3>Books</h3>
              <ul>
                <li className="dashboard-nav-item">
                  <Link to="/view-books" className="dashboard-nav-link">
                    <FaBook className="icon" /> View Books
                  </Link>
                </li>
                <li className="dashboard-nav-item">
                  <Link to="/add-book" className="dashboard-nav-link">
                    <FaPlus className="icon" /> Add Books
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        <header className="dashboard-header">
          <h1 className="page-title">Hello, {username}!</h1>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </header>

        {/* Welcome Section */}
        <section className="welcome-section">
          <h2>Welcome to the Book Worm Library </h2>
          <p>
            Manage your books, view recent activities, and take quick actions
            with ease!
          </p>
        </section>

        {/* Summary Statistics */}
        <section className="statistics-section">
          <div className="stats-card">
            <h3>Total Books</h3>
            <p>120</p>
          </div>
          <div className="stats-card">
            <h3>Books Issued</h3>
            <p>45</p>
          </div>
          <div className="stats-card">
            <h3>Books Available</h3>
            <p>75</p>
          </div>
        </section>

        {/* Recent Activities */}
        <section className="recent-activities">
          <h3>Recent Activities</h3>
          <div className="activities-container">
            <div className="activity-card">
              <p>
                <strong>Book:</strong> "The Great Gatsby"
              </p>
              <p>
                <strong>Issued to:</strong> John Doe
              </p>
            </div>
            <div className="activity-card">
              <p>
                <strong>Book:</strong> "1984"
              </p>
              <p>
                <strong>Returned by:</strong> Jane Smith
              </p>
            </div>
            <div className="activity-card">
              <p>
                <strong>New Book:</strong> "To Kill a Mockingbird"
              </p>
              <p>Added to the collection</p>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="actions-container">
            <Link to="/add-book" className="action-button">
              Add Book
            </Link>
            <Link to="/view-books" className="action-button">
              View Books
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
