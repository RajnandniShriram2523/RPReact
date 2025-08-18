import React from "react";
import AdminSidebar from "./adminslidebar";
import "../component/addbook.css";
import AddBook from "../services/dataservice";

export default class Addbook extends React.Component {
  constructor() {
    super();
    this.state = {
      book_title: "",
      book_author: "",
      book_price: "",
      book_published_date: "",
      isbn_code: "",
      category_id: "",
      status: "",
      msg: "",
      msgType: "", // "error" or "success"
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  validateForm = () => {
    const {
      book_title,
      book_author,
      book_price,
      book_published_date,
      isbn_code,
      category_id,
      status,
    } = this.state;

    if (
      !book_title.trim() ||
      !book_author.trim() ||
      !book_price.trim() ||
      !book_published_date.trim() ||
      !isbn_code.trim() ||
      !category_id.trim() ||
      !status.trim()
    ) {
      this.setState({ msg: "❗ All fields are required.", msgType: "error" });
      return false;
    }

    return true;
  };

  sendBookToServer = () => {
    if (!this.validateForm()) return;

    AddBook.savebook(this.state)
      .then((result) => {
        this.setState({
          msg: "✅ Book added successfully!",
          msgType: "success",
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
        this.setState({
          msg: err?.message || "❗ Something went wrong!",
          msgType: "error",
        });
      });
  };

  handleClear = () => {
    this.setState({
      book_title: "",
      book_author: "",
      book_price: "",
      book_published_date: "",
      isbn_code: "",
      category_id: "",
      status: "",
      msg: "✅ Form cleared",
      msgType: "success",
    });
  };

  render() {
    const { msg, msgType } = this.state;

    return (
      <div className="main3">
        <AdminSidebar />
        <div className="form2">
          <h2>ADD BOOK</h2><br/>

          <input
            type="text"
            name="book_title"
            placeholder="Enter Book Title"
            value={this.state.book_title}
            onChange={this.handleInputChange}
          />
          <br />

          <input
            type="text"
            name="book_author"
            placeholder="Enter Book Author"
            value={this.state.book_author}
            onChange={this.handleInputChange}
          />
          <br />

          <input
            type="text"
            name="book_price"
            placeholder="Enter Book Price"
            value={this.state.book_price}
            onChange={this.handleInputChange}
          />
          <br />

          <input
            type="text"
            name="book_published_date"
            placeholder="Enter Book Published Date"
            value={this.state.book_published_date}
            onChange={this.handleInputChange}
          />
          <br />

          <input
            type="text"
            name="isbn_code"
            placeholder="Enter ISBN Code"
            value={this.state.isbn_code}
            onChange={this.handleInputChange}
          />
          <br />

          <input
            type="text"
            name="category_id"
            placeholder="Enter Category ID"
            value={this.state.category_id}
            onChange={this.handleInputChange}
          />
          <br />

          <input
            type="text"
            name="status"
            placeholder="Enter Total Copies"
            value={this.state.status}
            onChange={this.handleInputChange}
          />
          <br />

          <div className="buttons">
            <button className="bttn" type="button" onClick={this.sendBookToServer}>
              Add Book
            </button>
            <button className="btnn" type="button" onClick={this.handleClear}>
              Clear
            </button>
          </div>

          {msg && (
            <div className={`message ${msgType === "error" ? "error" : "success"}`}>
              <p>{msg}</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
