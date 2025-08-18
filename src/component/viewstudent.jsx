import React, { useEffect, useState } from "react";
import viewStudent from "../services/dataservice";
import "./viewbook.css";
import AdminSidebar from "./adminslidebar";

export default function ViewBook() {
    const [students, setstudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchBooks = (page) => {
        setLoading(true);
        viewStudent.saveviewBook(page, 3)
            .then((res) => {
                const data = res.data;
                setstudents(data.studentList || []);
                setCurrentPage(data.currentPage || 1);
                setTotalPages(data.totalPages || 1);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchBooks(currentPage);
    }, [currentPage]);

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    // Optional: Delete and Update handlers (implement as needed)
    const handleDelete = (id) => {
        console.log("Delete book with id:", id);
    };

    const handleUpdate = (id) => {
        console.log("Update book with id:", id);
    };

    return (
        <div className="main12">
            <AdminSidebar />
            <div className="student-container">
                <h3 className="student-title">Book List</h3>

                {loading ? (
                    <p className="text-center">Loading books...</p>
                ) : (
                    <>
                        <table className="student-table">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>student_name</th>
                                    <th>student_email</th>
                                    <th>student_password</th>
                                    <th>study_year</th>
                                    <th>created_at</th>
                                    <th>Delete</th>
                                    <th>Update</th>
                                </tr>
                            </thead>
                           
                                    <tbody>
                                        {students.length > 0 ? (
                                            students.map((book, index) => (
                                                <tr key={book.book_id}>
                                                    <td>{(currentPage - 1) * 6 + index + 1}</td>
                                                    <td>{book.book_title}</td>
                                                    <td>{book.book_author}</td>
                                                    <td>{book.book_price}</td>
                                                   <td>{book.book_published_date?.substring(0, 10)}</td>

                                                    <td>{book.isbn_code}</td>
                                                    <td>{book.category_name || "Unknown Category"}</td>
                                                    <td>{book.status || "N/A"}</td>
                                                    <td>
                                                        <button onClick={() => handleDelete(book.book_id)}>🗑️</button>
                                                    </td>
                                                    <td>
                                                        <button onClick={() => handleUpdate(book.book_id)}>✍️</button>
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
