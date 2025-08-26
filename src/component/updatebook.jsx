// src/components/updatebook.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DataService from "../services/dataservice";
import AdminSidebar from "./adminslidebar";
import "./updatebook.css";

function UpdateBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({
    book_id: "",
    book_title: "",
    book_author: "",
    book_price: "",
    book_published_date: "",
    isbn_code: "",
    category_id: "",
    status: ""
  });

  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  // Load book + categories
  useEffect(() => {
    const load = async () => {
      try {
        const [bookRes, catRes] = await Promise.all([
          DataService.getBookById(id),
          DataService.getAllCategories()
        ]);

        // Book response is the row object (see controller)
        const b = bookRes.data || {};
        setBook({
          book_id: b.book_id || "",
          book_title: b.book_title || "",
          book_author: b.book_author || "",
          book_price: b.book_price ?? "",
          book_published_date: b.book_published_date ? b.book_published_date.substring(0, 10) : "",
          isbn_code: b.isbn_code || "",
          category_id: b.category_id ?? "",
          status: String(b.status ?? "") // keep as string for <select>
        });

        // Categories
        setCategories(catRes.data?.CategoryList || []);
      } catch (err) {
        console.error("Error fetching book/categories:", err);
        showMessage("❌ Could not load book or categories", "error");
      }
    };

    if (id) load();
  }, [id]);

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!book.book_title.trim()) {
      showMessage("Book title is required", "error");
      return false;
    }
    if (!book.book_author.trim()) {
      showMessage("Author is required", "error");
      return false;
    }
    if (!book.book_price || Number(book.book_price) <= 0) {
      showMessage("Enter a valid price", "error");
      return false;
    }
    return true;
  };

  const handleUpdate = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await DataService.updateBook(id, {
        book_title: book.book_title,
        book_author: book.book_author,
        book_price: book.book_price,
        book_published_date: book.book_published_date || null,
        isbn_code: book.isbn_code,
        category_id: book.category_id || null,
        status: book.status === "" ? null : book.status
      });
      showMessage("✅ Book updated successfully!", "success");
      setTimeout(() => navigate("/viewbook"), 800);
    } catch (err) {
      console.error("Error updating book:", err);
      showMessage("❌ Error updating book", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main16">
      <AdminSidebar />
      <div className="update-book-box">
        <h2>Update Book</h2>

        <label>Book ID</label>
        <input type="text" name="book_id" value={book.book_id} disabled />

        <label>Book Title</label>
        <input
          type="text"
          name="book_title"
          placeholder="Book Title"
          value={book.book_title}
          onChange={handleChange}
        />

        <label>Author</label>
        <input
          type="text"
          name="book_author"
          placeholder="Author"
          value={book.book_author}
          onChange={handleChange}
        />

        <label>Price</label>
        <input
          type="number"
          name="book_price"
          placeholder="Price"
          value={book.book_price}
          onChange={handleChange}
        />

        <label>Published</label>
        <input
          type="date"
          name="book_published_date"
          value={book.book_published_date}
          onChange={handleChange}
        />

        <label>ISBN Code</label>
        <input
          type="text"
          name="isbn_code"
          placeholder="ISBN Code"
          value={book.isbn_code}
          onChange={handleChange}
        />

        <label>Category</label>
        <select name="category_id" value={book.category_id} onChange={handleChange}>
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c.category_id} value={c.category_id}>
              {c.category_name}
            </option>
          ))}
        </select>

        <label>Status</label>
        <select name="status" value={book.status} onChange={handleChange}>
          <option value="">Select Status</option>
          <option value="1">Active</option>
          <option value="0">Inactive</option>
        </select>

        <button onClick={handleUpdate} disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </button>

        {message && <p className={`update-message ${messageType}`}>{message}</p>}
      </div>
    </div>
  );
}

export default UpdateBook;
