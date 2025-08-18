import React, { useEffect, useState } from "react";
import viewCategorys from "../services/dataservice";
import "./viewcategory.css";
import AdminSidebar from "./adminslidebar";

export default function ViewCategory() {
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchCategories = (page) => {
        setLoading(true);
        viewCategorys.saveviewCategory(page, 6)  // pass limit=10 here
            .then((res) => {
                const data = res.data;
                setCategories(data.categorylist || []);
                setCurrentPage(data.currentPage || 1);
                setTotalPages(data.totalPages || 1);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchCategories(currentPage);
    }, [currentPage]);

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    return (
        <div className="main11">
            <AdminSidebar />
            <div className="category-container">

                <h3 className="category-title">Category List</h3>

                {loading ? (
                    <p className="text-center">Loading categories...</p>
                ) : (
                    <>
                        <table className="category-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>CATEGORY NAME</th>
                                    <th>DELETE</th>
                                    <th>UPDATE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.length > 0 ? (
                                    categories.map((cat, index) => (
                                        <tr key={cat.category_id}>
                                            <td>{(currentPage - 1) * 6 + index + 1}</td> {/* Continuous serial number */}
                                            <td>{cat.category_name}</td>
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
                                        <td colSpan="4" className="text-center">No categories found</td>
                                    </tr>
                                )}


                            </tbody>
                        </table>

                        <div className="pagination-boxed">
                            <button onClick={handlePrev} disabled={currentPage === 1}>Prev</button>

                            {[...Array(totalPages)].map((_, index) => {
                                const page = index + 1;
                                return (
                                    <button key={page} onClick={() => setCurrentPage(page)} className={page === currentPage ? "active" : ""}>{page}</button>
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
