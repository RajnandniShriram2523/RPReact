import React, { useEffect, useState } from "react";
import viewStudent from "../services/dataservice";
import "./viewstudent.css";
import AdminSidebar from "./adminslidebar";

export default function Viewstudent() {
    const [students, setStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchStudents = (page) => {
        setLoading(true);
        viewStudent.saveviewStudent(page, 6) // hardcoded 6 as page size
            .then((res) => {
                const data = res.data;
                setStudents(data.studentList || []);
                setCurrentPage(data.currentPage || 1);
                setTotalPages(data.totalPages || 1);
            })
            .catch((error) => {
                console.error("Failed to fetch students:", error);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchStudents(currentPage);
    }, [currentPage]);

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const handleDelete = (id) => {
        console.log("Delete student with id:", id);
    };

    const handleUpdate = (id) => {
        console.log("Update student with id:", id);
    };

    return (
        <div className="main13">
            <AdminSidebar />
            <div className="student-container">
                <h3 className="student-title">Student List</h3>

                {loading ? (
                    <p className="text-center">Loading students...</p>
                ) : (
                    <>
                        <table className="student-table">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Password</th>
                                    <th>Study Year</th>
                                    <th>Created At</th>
                                    <th>Delete</th>
                                    <th>Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.length > 0 ? (
                                    students.map((student, index) => (
                                        <tr key={student.student_id}>
                                            <td>{(currentPage - 1) * 6 + index + 1}</td>
                                            <td>{student.student_name}</td>
                                            <td>{student.student_email}</td>
                                            <td>{student.student_password}</td>
                                            <td>{student.study_year}</td>
                                            <td>{student.created_at?.substring(0, 10)}</td>
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
                                        <td colSpan="8" className="text-center">No students found</td>
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
