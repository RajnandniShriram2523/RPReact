import React from "react";
import "../component/addcategory.css";
import AdminSidebar from "./adminslidebar.jsx";
import AddCategory from "../services/dataservice";

export default class Addcategory extends React.Component {
  constructor() {
    super();
    this.state = {
      category_name: "",
      msg: "",
      msgType: "" // "success" or "error"
    };
  }

  sendCategoryToServer = () => {
    const { category_name } = this.state;

    // Validation: empty input
    if (category_name.trim() === "") {
      this.setState({
        msg: "Please Enter Category Name.",
        msgType: "error"
      });
      return;
    }

    // Save category
    AddCategory.saveCategory({ category_name })
      .then(() => {
        this.setState({
          msg: "Category Added Successfully!",
          msgType: "success",
          category_name: ""
        });
      })
      .catch(() => {
        this.setState({
          msg: "Failed to add category. Try again!",
          msgType: "error"
        });
      });
  };

  clearInput = () => {
    this.setState({
      category_name: "",
      msg: "",
      msgType: ""
    });
  };

  render() {
    const { category_name, msg, msgType } = this.state;

    return (
      <div className="main2">
        <AdminSidebar />
        <div className="form1">
          <h2 className="title">📚 Add New Category</h2>

          {/* Input */}
          <input
            type="text"
            name="name"
            value={category_name}
            placeholder="Enter New Category Name"
            onChange={(e) => {
              let value = e.target.value;

              // Remove spaces
              value = value.replace(/\s/g, "");

              // Capitalize first letter
              if (value.length > 0) {
                value = value.charAt(0).toUpperCase() + value.slice(1);
              }

              this.setState({ category_name: value });
            }}
          />

          {/* Buttons */}
          <div className="button-container">
            <button className="btn" onClick={this.sendCategoryToServer}>
              ➕ Add Category
            </button>
            <button className="btn clear-btn1" onClick={this.clearInput}>
              🧹 Clear
            </button>
          </div>

          {/* Message */}
          {msg && (
            <p className={`msg ${msgType}`}>
              {msg}
            </p>
          )}
        </div>
      </div>
    );
  }
}
