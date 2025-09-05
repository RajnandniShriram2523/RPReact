import React, { useEffect, useState } from "react";
import viewCategorys from "../services/dataservice";
import "./viewcategory.css";
import AdminSidebar from "./adminslidebar";
import { NavLink } from 'react-router-dom';

export default function ViewCategory() {
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const fetchCategories = async (page, search = "") => {
        setLoading(true);
        try {
            let res;
            if (search.trim()) {
                res = await viewCategorys.saveSearchCategory(search, page, 5);
                const data = res.data;
                setCategories(data.categoryList || []);
                setCurrentPage(data.currentPage || 1);
                setTotalPages(data.totalPages || 1);
            } else {
                res = await viewCategorys.saveviewCategory(page, 5);
                const data = res.data;
                setCategories(data.categorylist || []);
                setCurrentPage(data.currentPage || 1);
                setTotalPages(data.totalPages || 1);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories(currentPage, searchTerm);
    }, [currentPage, searchTerm]);

    const showMessage = (text, type = "success") => {
        setMessage(text);
        setMessageType(type);
        setTimeout(() => {
            setMessage("");
            setMessageType("");
        }, 3000);
    };

    const handleDelete = async (id) => {
        try {
            const res = await viewCategorys.savedeletecategory(id);
            if (res.data.status === "delete") {
                showMessage("✅ Category deleted successfully", "success");
                fetchCategories(currentPage, searchTerm);
            } else {
                showMessage("❌ Failed to delete category", "error");
            }
        } catch (error) {
            console.error("Error deleting category:", error);
            showMessage("⚠️ Something went wrong", "error");
        }
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    return (
        <div className="category-main">
            <AdminSidebar />
            <div className="category-container">
                <h3 className="category-title">Category List</h3>

                {/* Search */}
                <div className="search-bar2">
                    <input
                        type="text"
                        name="search"
                        value={searchTerm}
                        placeholder="Search category..."
                        onChange={(e) => {
                            setCurrentPage(1);
                            setSearchTerm(e.target.value);
                        }}
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

                {/* Loading & Table */}
                {loading ? (
                    <p className="text-center">Loading categories...</p>
                ) : (
                    <>
                        <table className="category-table">
                            <thead>
                                <tr>
                                    <th>SR.No</th>
                                    <th>CATEGORY NAME</th>
                                    <th>DELETE</th>
                                    <th>UPDATE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.length > 0 ? (
                                    categories.map((cat, index) => (
                                        <tr key={cat.category_id}>
                                            <td>{(currentPage - 1) * 5 + index + 1}</td>
                                            <td>{cat.category_name}</td>
                                            <td>
                                                <button
                                                    onClick={() => handleDelete(cat.category_id)}
                                                    className="link-button delete-button"
                                                >
                                                    🗑️
                                                </button>
                                            </td>
                                            <td>
                                                <NavLink to={`/updatecategory/${cat.category_id}`} className="link-button">
                                                    ✍️
                                                </NavLink>
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

                        {/* Pagination inside container */}
                        <div className="pagination-boxed1">
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

                {/* Message */}
                {message && (
                    <div className={`custom-message ${messageType}`}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}
