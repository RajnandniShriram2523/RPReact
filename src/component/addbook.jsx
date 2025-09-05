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
    status: "" // total copies
  });
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");

  useEffect(() => {
    dataservice
      .saveviewCategory(1, 100)
      .then((res) => {
        setCategories(res.data.categorylist || []);
      })
      .catch((err) => {
        console.error("Failed to fetch categories:", err);
      });
  }, []);

  // ✅ Custom Change Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    // ❌ Prevent leading space
    if (newValue.startsWith(" ")) {
      newValue = newValue.trimStart();
    }

    // ❌ Prevent multiple spaces
    newValue = newValue.replace(/\s+/g, " ");

    // ✅ Capitalize first letter of each word (only for title & author)
    if (["book_title", "book_author"].includes(name)) {
      newValue = newValue.replace(/\b\w/g, (char) => char.toUpperCase());
    }

    // ✅ ISBN auto-format
    if (name === "isbn_code") {
      // Remove all non-digits
      let digits = newValue.replace(/\D/g, "");

      if (digits.length <= 10) {
        // ISBN-10 → plain digits
        newValue = digits;
      } else if (digits.length <= 13) {
        // ISBN-13 → format XXX-X-XX-XXXXXX-X
        let parts = [];
        if (digits.length >= 3) parts.push(digits.slice(0, 3));
        if (digits.length >= 4) parts.push(digits.slice(3, 4));
        if (digits.length >= 6) parts.push(digits.slice(4, 6));
        if (digits.length >= 12) parts.push(digits.slice(6, 12));
        if (digits.length >= 13) parts.push(digits.slice(12, 13));

        newValue = parts.join("-");
      }
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  // ✅ Validation Rules
  const validateForm = () => {
    const {
      book_title,
      book_author,
      book_price,
      book_published_date,
      isbn_code,
      category_id,
      status,
    } = formData;

    if (
      !book_title ||
      !book_author ||
      !book_price ||
      !book_published_date ||
      !isbn_code ||
      !category_id ||
      !status
    ) {
      setMsg("❗ All fields are required.");
      setMsgType("error");
      return false;
    }

    if (isNaN(book_price) || Number(book_price) <= 0) {
      setMsg("❗ Price must be a positive number.");
      setMsgType("error");
      return false;
    }

    // validate ISBN → remove hyphens, check length
    const isbnDigits = isbn_code.replace(/-/g, "");
    if (!(isbnDigits.length === 10 || isbnDigits.length === 13)) {
      setMsg("❗ ISBN must be 10 or 13 digits.");
      setMsgType("error");
      return false;
    }

    if (isNaN(status) || Number(status) <= 0) {
      setMsg("❗ Copies must be a positive number.");
      setMsgType("error");
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    dataservice
      .savebook(formData)
      .then(() => {
        setMsg("Book Added Successfully!");
        setMsgType("success");
        setFormData({
          book_title: "",
          book_author: "",
          book_price: "",
          book_published_date: "",
          isbn_code: "",
          category_id: "",
          status: "",
        });
      })
      .catch((err) => {
        console.error("Add Book Error:", err);
        setMsg("Something went wrong!");
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
      status: "",
    });
    setMsg("Form Cleared!");
    setMsgType("success");
  };

  return (
    <div className="main3">
      <AdminSidebar />
      <div className="form2">
        <h2>📚 Add Book</h2>

        <input
          type="text"
          name="book_title"
          placeholder="Enter Book Title"
          value={formData.book_title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="book_author"
          placeholder="Enter Author Name"
          value={formData.book_author}
          onChange={handleChange}
        />
        <input
          type="number"
          name="book_price"
          placeholder="Enter Book Price"
          value={formData.book_price}
          onChange={handleChange}
        />
        <input
          type="date"
          name="book_published_date"
          value={formData.book_published_date}
          onChange={handleChange}
        />
        <input
          type="text"
          name="isbn_code"
          placeholder="Enter ISBN (10 or 13 digits)"
          value={formData.isbn_code}
          onChange={handleChange}
        />

        <select
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
        >
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat.category_id} value={cat.category_id}>
              {cat.category_name}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="status"
          placeholder="Enter Total Copies"
          value={formData.status}
          onChange={handleChange}
        />

        <div className="buttons1">
          <button className="bttn1" type="button" onClick={handleSubmit}>
            ➕ Add Book
          </button>
          <button className="btnn1" type="button" onClick={handleClear}>
          🧹 Clear
          </button>
        </div>

        {msg && <div className={`message1 ${msgType}`}>{msg}</div>}
      </div>
    </div>
  );
}
