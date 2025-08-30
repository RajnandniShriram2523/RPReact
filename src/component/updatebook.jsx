import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DataService from "../services/dataservice";
import AdminSidebar from "./adminslidebar";
import "./updatebook.css";

export default function UpdateBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    book_title: "",
    book_author: "",
    book_price: "",
    book_published_date: "",
    isbn_code: "",
    category_id: "",
    status: ""
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    DataService.getBookById(id)
      .then(res => {
        setFormData({
          book_title: res.data.book_title,
          book_author: res.data.book_author,
          book_price: res.data.book_price,
          book_published_date: res.data.book_published_date.split('T')[0],
          isbn_code: res.data.isbn_code,
          category_id: res.data.category_id,
          status: res.data.status || "available"
        });
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });

    DataService.getCategories()
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    DataService.updateBook(id, formData)
      .then(() => {
        setMessage("✅ Book updated successfully!");
        setTimeout(() => navigate("/viewbook"), 1500);
      })
      .catch(err => {
        console.error(err);
        setMessage("❌ Update failed!");
      });
  };

  if (loading) return <h3>Loading book data...</h3>;

  return (
    <div className="updatebook-main">
      {/* <AdminSidebar /> */}
      <div className="updatebook-wrapper">
        {message && (
          <div className={`updatebook-message ${message.includes("❌") ? "error" : "success"}`}>
            {message}
          </div>
        )}
        <h2>Update Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="updatebook-group">
            <input type="text" name="book_title" value={formData.book_title} onChange={handleChange} placeholder=" " required />
            <label>Title</label>
          </div>

          <div className="updatebook-group">
            <input type="text" name="book_author" value={formData.book_author} onChange={handleChange} placeholder=" " required />
            <label>Author</label>
          </div>

          <div className="updatebook-group">
            <input type="number" name="book_price" value={formData.book_price} onChange={handleChange} placeholder=" " required />
            <label>Price</label>
          </div>

          <div className="updatebook-group">
            <input type="date" name="book_published_date" value={formData.book_published_date} onChange={handleChange} placeholder=" " required />
            <label>Published Date</label>
          </div>

          <div className="updatebook-group">
            <input type="text" name="isbn_code" value={formData.isbn_code} onChange={handleChange} placeholder=" " required />
            <label>ISBN Code</label>
          </div>

          <div className="updatebook-group">
            <select name="category_id" value={formData.category_id} onChange={handleChange} required>
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat.category_id} value={cat.category_id}>{cat.category_name}</option>
              ))}
            </select>
            <label>Category</label>
          </div>

          <div className="updatebook-group">
            <select name="status" value={formData.status} onChange={handleChange} required>
              <option value="available">Available</option>
              <option value="issued">Issued</option>
            </select>
            <label>Status</label>
          </div>

          <button type="submit" className="updatebook-btn">Update Book</button>
        </form>
      </div>
    </div>
  );
}
