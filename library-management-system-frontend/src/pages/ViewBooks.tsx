import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./ViewBooks.css";
import { FaHome, FaBook, FaPlus } from "react-icons/fa"; // Importing Font Awesome icons

// Define the type for books
interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
}

const ViewBooks = () => {
  // State variables for managing books, search, modals, and UI interactions
  const [books, setBooks] = useState<Book[]>([]); // Stores the list of all books
  const [searchTerm, setSearchTerm] = useState<string>(""); // Tracks the search input value
  const [searchResult, setSearchResult] = useState<Book | null>(null); // Stores the search result
  const [hasSearched, setHasSearched] = useState(false); // Tracks if a search has been performed
  const [showUpdateModal, setShowUpdateModal] = useState(false); // Controls visibility of the update modal
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Controls visibility of the delete modal
  const [showUpdateSuccess, setShowUpdateSuccess] = useState(false); // Controls visibility of the update success modal
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false); // Controls visibility of the delete success modal
  const [selectedBook, setSelectedBook] = useState<Book | null>(null); // Tracks the book selected for update
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null); // Tracks the book ID selected for delete
  const navigate = useNavigate(); // For navigating between pages

  // Fetch books when the component mounts
  useEffect(() => {
    fetchBooks();
  }, []);

  // Function to fetch all books from the API
  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:5105/api/Book");
      setBooks(response.data); // Update the books state with the fetched data
      setSearchResult(null); // Clear any existing search results
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Function to handle book search by ID
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setSearchResult(null); // Clear search results
      setHasSearched(false); // Reset the search flag
      return;
    }

    setHasSearched(true); // Mark that a search attempt was made

    try {
      const response = await axios.get(
        `http://localhost:5105/api/Book/${searchTerm}`
      );
      setSearchResult(response.data); // Update the search result state
    } catch (error) {
      setSearchResult(null); // No results found
      console.error("Error searching for book:", error);
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("loggedInUsername"); // Clear stored user data
    navigate("/login"); // Redirect to the login page
  };

  // Function to handle book deletion
  const handleDelete = async () => {
    if (selectedBookId) {
      try {
        await axios.delete(`http://localhost:5105/api/Book/${selectedBookId}`);
        setBooks(books.filter((book) => book.id !== selectedBookId)); // Remove deleted book from the list
        setShowDeleteModal(false); // Hide delete modal
        setShowDeleteSuccess(true); // Show delete success modal
      } catch (error) {
        console.error("Error deleting book:", error);
      }
    }
  };

  // Function to handle book update
  const handleUpdate = async () => {
    if (selectedBook) {
      try {
        await axios.put(
          `http://localhost:5105/api/Book/${selectedBook.id}`,
          selectedBook
        );
        // Update the book list with the updated book details
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.id === selectedBook.id ? selectedBook : book
          )
        );
        setShowUpdateModal(false); // Hide update modal
        setShowUpdateSuccess(true); // Show update success modal
      } catch (error) {
        console.error("Error updating book:", error);
      }
    }
  };

  // Function to open the update modal
  const openUpdateModal = (book: Book) => {
    setSelectedBook(book); // Set the selected book for updating
    setShowUpdateModal(true); // Show update modal
  };

  // Function to open the delete modal
  const openDeleteModal = (bookId: string) => {
    setSelectedBookId(bookId); // Set the selected book ID for deleting
    setShowDeleteModal(true); // Show delete modal
  };

  // Function to close all modals
  const closeModals = () => {
    setShowUpdateModal(false);
    setShowDeleteModal(false);
    setShowUpdateSuccess(false);
    setShowDeleteSuccess(false);
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
              <Link to="/dashboard" className="dashboard-nav-item">
                <FaHome className="icon" /> Dashboard
              </Link>
            </li>
            <li className="dashboard-nav-section">
              <h3>Books</h3>
              <ul>
                <li className="dashboard-nav-item">
                  <Link to="/view-books" className="dashboard-nav-item active">
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
        {/* Header */}
        <header className="header">
          <h1 className="page-title">View Books</h1>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </header>
        
        {/* Book List Section */}
        <section className="books-list">
          <div className="books-header">
            <h2>Books List</h2>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search by Book ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update search term state
              />
              <button onClick={handleSearch}>
                <img src="/search-icon.png" alt="Search" />
              </button>
            </div>
          </div>

          {/* Conditionally render books or search results */}
          {searchTerm.trim() === "" && !searchResult && !hasSearched ? (
            <div className="cards-container">
              {books.map((book) => (
                <div className="book-card" key={book.id}>
                  <div className="card-background">
                    <img
                      src="/book-icon.jpg"
                      alt="Book Watermark"
                      className="card-watermark"
                    />
                  </div>
                  <div className="book-details">
                    <p>
                      <strong>ID :</strong> {book.id}
                    </p>
                    <p>
                      <strong>Title :</strong> {book.title}
                    </p>
                    <p>
                      <strong>Author :</strong> {book.author}
                    </p>
                    <p>
                      <strong>Description :</strong> {book.description}
                    </p>
                  </div>
                  <div className="card-actions">
                    <button
                      className="update-btn"
                      onClick={() => openUpdateModal(book)}
                    >
                      Update
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => openDeleteModal(book.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : searchResult ? (
            <div className="single-card-container">
              {/* Render search result */}
              <div className="single-book-card">
                <div className="single-card-background">
                  <img
                    src="/book-icon.jpg"
                    alt="Book Watermark"
                    className="single-card-watermark"
                  />
                </div>
                <div className="book-details">
                  <p>
                    <strong>ID :</strong> {searchResult.id}
                  </p>
                  <p>
                    <strong>Title :</strong> {searchResult.title}
                  </p>
                  <p>
                    <strong>Author :</strong> {searchResult.author}
                  </p>
                  <p>
                    <strong>Description :</strong> {searchResult.description}
                  </p>
                </div>
                <div className="card-actions">
                  <button
                    className="update-btn"
                    onClick={() => openUpdateModal(searchResult)}
                  >
                    Update
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => openDeleteModal(searchResult.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ) : (
            hasSearched && <p className="no-results">No Results Found</p>
          )}
        </section>
      </div>

      {/* Modals */}
      {/* Update Modal */}
      {showUpdateModal && selectedBook && (
        <div className="modal">
          <div className="modal-content">
            <h2>Update Book</h2>
            <form>
              <div className="form-group">
                <label>Book ID</label>
                <input type="text" value={selectedBook.id} readOnly />
              </div>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={selectedBook.title}
                  onChange={(e) =>
                    setSelectedBook({
                      ...selectedBook,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Author</label>
                <input
                  type="text"
                  value={selectedBook.author}
                  onChange={(e) =>
                    setSelectedBook({
                      ...selectedBook,
                      author: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={selectedBook.description}
                  onChange={(e) =>
                    setSelectedBook({
                      ...selectedBook,
                      description: e.target.value,
                    })
                  }
                ></textarea>
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={closeModals}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="update-btn"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this book?</p>
            <div className="modal-actions">
              <button className="delete-confirm-btn" onClick={handleDelete}>
                Yes
              </button>
              <button className="cancel-btn" onClick={closeModals}>
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modals */}
      {/* Update Success Modal */}
      {showUpdateSuccess && (
        <div className="modal">
          <div className="modal-content">
            <img
              src="/success-icon.png"
              alt="Success"
              className="success-icon"
            />
            <h2>Succeed</h2>
            <p>Book details updated successfully</p>
            <button
              className="close-btn"
              onClick={() => setShowUpdateSuccess(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Delete Success Modal */}
      {showDeleteSuccess && (
        <div className="modal">
          <div className="modal-content">
            <img
              src="/success-icon.png"
              alt="Success"
              className="success-icon"
            />
            <h2>Succeed</h2>
            <p>Book deleted successfully</p>
            <button
              className="close-btn"
              onClick={() => setShowDeleteSuccess(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewBooks;
