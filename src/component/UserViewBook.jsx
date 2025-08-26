import React, { useEffect, useState } from "react";
import viewuserBook from "../services/dataservice"; // Axios API functions
import "./UserViewBook.css";
import Userslidebar from "./userpanel";

export default function UserViewBooks() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchBooks = (page, title) => {
    setLoading(true);
    viewuserBook
      .searchUserBooks(title, page, 5)
      .then((res) => {
        setBooks(res.data.BookList || []);
        setCurrentPage(res.data.currentPage || 1);
        setTotalPages(res.data.totalPages || 1);
      })
      .catch((err) => {
        console.error("Error fetching books:", err);
        setBooks([]);
        setTotalPages(1);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBooks(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to page 1 on search
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="uvb-main">
      <Userslidebar />
      <div className="uvb-content">
        <h3 className="uvb-title">Search Books by Title</h3>

        <div className="uvb-search-bar">
          <input
            type="text"
            placeholder="Search by book title"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {loading ? (
          <p className="uvb-center-text">Loading books...</p>
        ) : (
          <>
            <table className="uvb-table">
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>Book Name</th>
                  <th>Author</th>
                  <th>Price</th>
                  <th>Published</th>
                  <th>ISBN</th>
                  <th>Category</th>
                  <th>Status</th>
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
                      <td>{book.category_name}</td>
                      <td>{book.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="uvb-center-text">
                      No books found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="uvb-pagination">
              <button onClick={handlePrev} disabled={currentPage === 1}>
                Prev
              </button>
              {[...Array(totalPages)].map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={pageNum === currentPage ? "uvb-active" : ""}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button onClick={handleNext} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}