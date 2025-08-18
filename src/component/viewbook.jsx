import React, { useEffect, useState } from "react";
import viewBook from "../services/dataservice";
import "./viewbook.css";
import AdminSidebar from "./adminslidebar";

export default function ViewBook() {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    // Fetch books for a given page
    const fetchBooks = (page) => {
        setLoading(true);
        viewBook.saveviewBook(page, 2) // You are requesting 5 books per page
            .then((res) => {
                const data = res.data;
                setBooks(data.BookList || []);
                setCurrentPage(data.currentPage || page);
                setTotalPages(data.totalPages || 1); // Use totalPages from backend
            })
            .catch((err) => {
                console.error("Failed to fetch books:", err);
                setBooks([]);
            })
            .finally(() => setLoading(false));
    };

    // Fetch books whenever currentPage changes
    useEffect(() => {
        fetchBooks(currentPage);
    }, [currentPage]);

    // Pagination Handlers
    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handleDelete = (id) => {
        console.log("Delete book with ID:", id);
    };

    const handleUpdate = (id) => {
        console.log("Update book with ID:", id);
    };

    return (
        <div className="main12">
            <AdminSidebar />
            <div className="book-container">
                <h3 className="book-title">Book List</h3>

                {loading ? (
                    <p className="text-center">Loading books...</p>
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
                                            <td>{book.book_price}</td>
                                            <td>{book.book_published_date?.substring(0, 10)}</td>
                                            <td>{book.isbn_code}</td>
                                            <td>{book.category_name || "Unknown"}</td>
                                            <td>{book.status || "N/A"}</td>
                                              <td>
                                                <button className="link-button" onClick={() => handleDelete(cat.category_id)}>🗑️</button>
                                            </td>
                                            <td>
                                                <button className="link-button" onClick={() => handleUpdate(cat.category_id)}>✍️</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="10" className="text-center">No books found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* Pagination Controls */}
                        <div className="pagination-boxed">
                            <button onClick={handlePrev} disabled={currentPage === 1}>Prev</button>
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
                            <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
