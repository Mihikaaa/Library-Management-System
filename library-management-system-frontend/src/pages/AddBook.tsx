import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './AddBook.css';
import { FaHome, FaBook, FaPlus } from "react-icons/fa"; // Importing Font Awesome icons

const AddBook = () => {
    // State to manage form input data
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        description: '',
    });

    // State to manage form validation errors
    const [errors, setErrors] = useState({
        title: '',
        author: '',
        description: '',
    });

    // State to control the visibility of the success modal
    const [showModal, setShowModal] = useState(false);

    // Navigation hook for redirecting to other pages
    const navigate = useNavigate();

    // Handle changes in form inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value, // Update specific form field
        });
        setErrors({
            ...errors,
            [e.target.name]: '', // Clear validation error for the current field
        });
    };

    // Validate form fields and set errors
    const validateFields = () => {
        const newErrors: any = {};
        if (!formData.title) newErrors.title = 'Please enter the Title';
        if (!formData.author) newErrors.author = 'Please enter the Author';
        if (!formData.description) newErrors.description = 'Please enter the Description';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateFields()) return; // Stop submission if validation fails

        try {
            // Send form data to the backend API
            await axios.post('http://localhost:5105/api/Book', formData);
            setShowModal(true); // Show success modal on successful submission
            setFormData({
                title: '',
                author: '',
                description: '',
            }); // Clear form fields
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };

    // Handle form reset
    const handleReset = () => {
        setFormData({
            title: '',
            author: '',
            description: '',
        });
        setErrors({
            title: '',
            author: '',
            description: '',
        }); // Clear validation errors
    };

    // Close the success modal
    const closeModal = () => {
        setShowModal(false);
    };

    // Handle logout and redirect to login page
    const handleLogout = () => {
        localStorage.removeItem('loggedInUsername'); // Clear stored username
        navigate('/login'); // Redirect to login page
    };

    return (
        <>
            <div className="dashboard-container">
                {/* Sidebar for navigation */}
                <aside className="dashboard-sidebar">
                    <div className="logo-container">
                        <img src="/logo library.png" alt="Library Logo" className="logo" />
                    </div>
                    <nav className="dashboard-nav-links">
                        <ul>
                            {/* Dashboard navigation link */}
                            <li className="dashboard-nav-item">
                                <Link to="/dashboard" className="dashboard-nav-item">
                                    <FaHome className="icon" /> Dashboard
                                </Link>
                            </li>
                            <li className="dashboard-nav-section">
                                <h3>Books</h3>
                                <ul>
                                    {/* View Books navigation link */}
                                    <li className="dashboard-nav-item">
                                        <Link to="/view-books" className="dashboard-nav-link">
                                            <FaBook className="icon" /> View Books
                                        </Link>
                                    </li>
                                    {/* Add Books navigation link */}
                                    <li className="dashboard-nav-item">
                                        <Link to="/add-book" className="dashboard-nav-item active">
                                            <FaPlus className="icon" /> Add Books
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </aside>

                {/* Main content area */}
                <div className="main-content">
                    <header className="header">
                        <h1 className="page-title">Add Book</h1>
                        {/* Logout button */}
                        <button className="logout-btn" onClick={handleLogout}>
                            Logout
                        </button>
                    </header>
                    <section className="form-container">
                        <h2>Book Details</h2>
                        {/* Add Book form */}
                        <form className="book-form" onSubmit={handleSubmit}>
                            {/* Title input */}
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                                {/* Validation error message for title */}
                                {errors.title && <span className="error-message">{errors.title}</span>}
                            </div>
                            {/* Author input */}
                            <div className="form-group">
                                <label htmlFor="author">Author</label>
                                <input
                                    type="text"
                                    id="author"
                                    name="author"
                                    value={formData.author}
                                    onChange={handleChange}
                                />
                                {/* Validation error message for author */}
                                {errors.author && <span className="error-message">{errors.author}</span>}
                            </div>
                            {/* Description input */}
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                ></textarea>
                                {/* Validation error message for description */}
                                {errors.description && <span className="error-message">{errors.description}</span>}
                            </div>
                            {/* Form action buttons */}
                            <div className="form-actions">
                                <button type="button" className="reset-btn" onClick={handleReset}>Reset</button>
                                <button type="submit" className="add-btn">Add</button>
                            </div>
                        </form>
                    </section>
                </div>
            </div>

            {/* Success modal */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <img src="/success-icon.png" alt="Success" className="success-icon" />
                        <h2>Succeed</h2>
                        <p>Book added successfully</p>
                        <button className="close-btn" onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddBook;
