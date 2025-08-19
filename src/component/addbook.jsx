import React, { useEffect, useState } from "react";
import AdminSidebar from "./adminslidebar";
import dataservice from "../services/dataservice";
import "./addbook.css";

export default function AddBook() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    book_title: "",
    book_author: "",
    book_price: "",
    book_published_date: "",
    isbn_code: "",
    category_id: "",
    status: ""
  });
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");

  useEffect(() => {
    dataservice.saveviewCategory(1,100)
      .then(res => {
        // Extract categorylist from response data
        setCategories(res.data.categorylist || []);
      })
      .catch(err => {
        console.error("Failed to fetch categories:", err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { book_title, book_author, book_price, book_published_date, isbn_code, category_id, status } = formData;
    if (!book_title || !book_author || !book_price || !book_published_date || !isbn_code || !category_id || !status) {
      setMsg("❗ All fields are required.");
      setMsgType("error");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    dataservice.savebook(formData)
      .then(() => {
        setMsg("✅ Book added successfully!");
        setMsgType("success");
        setFormData({
          book_title: "",
          book_author: "",
          book_price: "",
          book_published_date: "",
          isbn_code: "",
          category_id: "",
          status: ""
        });
      })
      .catch(err => {
        console.error("Add book error:", err);
        setMsg("❗ Something went wrong!");
        setMsgType("error");
      });
  };

  const handleClear = () => {
    setFormData({
      book_title: "",
      book_author: "",
      book_price: "",
      book_published_date: "",
      isbn_code: "",
      category_id: "",
      status: ""
    });
    setMsg("Form cleared");
    setMsgType("success");
  };

  return (
    <div className="main3">
      <AdminSidebar />
      <div className="form2">
        <h2>ADD BOOK</h2>
        {/* Form Fields */}
        <input
          type="text"
          name="book_title"
          placeholder="Enter Book_Title"
          value={formData.book_title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="book_author"
          placeholder="Enter Book_Author"
          value={formData.book_author}
          onChange={handleChange}
        />
        <input
          type="text"
          name="book_price"
          placeholder="Enter Book_Price"
          value={formData.book_price}
          onChange={handleChange}
        />
        <input
          type="date"
          name="book_published_date"
          placeholder="Enter Published_Date"
          value={formData.book_published_date}
          onChange={handleChange}
        />
        <input
          type="text"
          name="isbn_code"
          placeholder="Enter ISBN_Code"
          value={formData.isbn_code}
          onChange={handleChange}
        />

        {/* Category Dropdown */}
        <select
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
        >
          <option value="">-- Select Category --</option>
          {categories.map(cat => (
            <option key={cat.category_id} value={cat.category_id}>
              {cat.category_name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="status"
          placeholder="Status / Total Copies"
          value={formData.status}
          onChange={handleChange}
        />

        {/* Buttons */}
        <div className="buttons1">
          <button className="bttn1" type="button" onClick={handleSubmit}> Add Book   </button>
          <button className="btnn1" type="button" onClick={handleClear}>
            Clear
          </button>
        </div>
        {/* Feedback Message */}
        {msg && (
          <div className={`message ${msgType === "error" ? "error" : "success"}`}>
            {msg}
          </div>
        )}
      </div>
    </div>
  );
}
