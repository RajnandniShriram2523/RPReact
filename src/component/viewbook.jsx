import React, { useEffect, useState } from "react";
import viewBook from "../services/dataservice";
import "./viewbook.css";
import { NavLink } from "react-router-dom";
import AdminSidebar from "./adminslidebar";

export default function ViewBook() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Fetch Books (with search support)
  const fetchBooks = async (page, search = "") => {
    setLoading(true);
    try {
      let res;

      if (search.trim() !== "") {
        res = await viewBook.searchBookByName(search, page, 5);
      } else {
        res = await viewBook.saveviewBook(page, 5);
      }

      const data = res.data;
      setBooks(data.BookList || data.data || []);
      setCurrentPage(data.currentPage || data.page || page);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error("Failed to fetch books:", err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Refresh on page/searchTerm change (debounced)
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchBooks(currentPage, searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [currentPage, searchTerm]);

  // ✅ Show message
  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };

  // ✅ Delete Book
  const handleDelete = async (id) => {
    try {
      const res = await viewBook.savedeletebook(id);
      if (res.data.status === "delete") {
        showMessage("✅ Book deleted successfully", "success");
        fetchBooks(currentPage, searchTerm);
      } else {
        showMessage("❌ Failed to delete book", "error");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      showMessage("⚠️ Something went wrong", "error");
    }
  };

  // ✅ Pagination
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="viewbook-page1">
      <AdminSidebar />
      <div className="viewbook-container">
        <h3 className="viewbook-heading">📚 Book List</h3>

        {/* 🔍 Search Bar */}
        <div className="viewbook-search">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setCurrentPage(1);
              setSearchTerm(e.target.value);
            }}
            placeholder="🔍 Search book by title..."
            className="search-input"
          />
          {searchTerm && (
            <button
              className="clear-search"
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        {loading ? (
          <p className="loading-text">Loading books...</p>
        ) : (
          <>
            <table className="book-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Book Name</th>
                  <th>Author</th>
                  <th>Price</th>
                  <th>Published</th>
                  <th>ISBN Code</th>
                  <th>Category Name</th>
                  <th>Status</th>
                  <th>Delete</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
                {books.length > 0 ? (
                  books.map((book, index) => (
                    <tr key={book.book_id}>
                      <td>{(currentPage - 1) * 5 + index + 1}</td>
                      <td>{book.book_title}</td>
                      <td>{book.book_author}</td>
                      <td>₹{book.book_price}</td>
                      <td>{book.book_published_date?.substring(0, 10)}</td>
                      <td>{book.isbn_code}</td>
                      <td>{book.category_name || "Unknown"}</td>
                      <td>{book.status || "N/A"}</td>
                      <td>
                        <button
                          className="btn-action btn-delete"
                          onClick={() => handleDelete(book.book_id)}
                        >
                          🗑️
                        </button>
                      </td>
                      <td>
                        <NavLink
                          to={`/updatebook/${book.book_id}`}
                          className="btn-action btn-edit"
                        >
                          ✍️
                        </NavLink>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="no-data">
                      ❌ No books found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="pagination-container">
              <button onClick={handlePrev} disabled={currentPage === 1}>
                Prev
              </button>
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={page === currentPage ? "active" : ""}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}

        {message && (
          <div className={`message-box ${messageType}`}>{message}</div>
        )}
      </div>
    </div>
  );
}
