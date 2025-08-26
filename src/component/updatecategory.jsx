import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DataService from "../services/dataservice";
import AdminSidebar from "./adminslidebar";
import "./updatecategory.css"; // ✅ import css

export default function UpdateCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // success / error

  useEffect(() => {
    if (id) {
      DataService.getCategoryById(id)
        .then((res) => {
          setCategoryId(res.data.category.category_id);
          setCategoryName(res.data.category.category_name);
        })
        .catch(() => {
          setMessage("❌ Failed to fetch category details");
          setStatus("error");
        });
    }
  }, [id]);

  const handleUpdate = async () => {
    try {
      await DataService.updateCategory(id, { category_name: categoryName });
      setMessage("✅ Category updated successfully!");
      setStatus("success");
      setTimeout(() => navigate("/viewcategory"), 1000);
    } catch (error) {
      setMessage("❌ Error updating category");
      setStatus("error");
    }
  };

  return (
    <div className="update-container">
      <AdminSidebar />
      <div className="update-content">
        <div className="update-card">
          <h2 className="update-title">Update Category</h2>
          
          <label className="update-label">Category ID</label>
          <input
            type="text"
            value={categoryId}
            readOnly
            className="update-input"
          />

          <label className="update-label">Category Name</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="update-input"
          />

          <button
            onClick={handleUpdate}
            className="update-button"
          >
            Update
          </button>
          {message && (
            <p className={`update-message ${status}`}>
              {message}
            </p>
          )}

        </div>
      </div>
    </div>
  );
}
