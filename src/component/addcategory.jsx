import React from "react";
import ReactDOM from "react-dom";
import "../component/addcategory.css";
import AdminSidebar from "./adminslidebar.jsx";
import AddCategory from "../services/dataservice";



export default class Addcategory extends React.Component {
    constructor() {
        super();
        this.state = {
            id:0,
            category_name: "",
            msg: ""
        };
    }
    sendCategoryToServer = () => {
        let promise = AddCategory.saveCategory(this.state);
        promise
            .then((result) => {
                this.setState({ 
                    msg: result.data.status,
                    category_name: "",
                   
                });
            })
            .catch((err) => {
                this.setState({ msg: err.msg });
            });
    }

    // handleAddCategory = () => {
    //     const { category_name } = this.state;

    //     if (category_name.trim() === "") {
    //         //   alert("Please enter a category.");
    //         this.setState({
    //             msg: "Please Enter A Category!"
    //         })
    //         return;
    //     }
    //     // Here you can make an API call or handle logic
    //     console.log("Category added:", category_name);

    //     // Show success message and clear the field
    //     this.setState({
    //         msg: "Category added successfully!",
    //         category_name: ""
    //     });

    //     // alert("Category added!");
    // };

    render() {
        return (
            <>
                <div className="main2">
                    <AdminSidebar />
                    <div className="form1">
                   
                        {/* <div className="form"> */}
                        <input
                            type="text"
                            name="name"
                            value={this.state.category_name}
                            placeholder="Enter Category"
                            onChange={(e) =>
                                this.setState({ category_name: e.target.value })
                            }
                        />
                        <br /><br />

                        <button className="btn" onClick={this.sendCategoryToServer}>Add Category</button>
                        {this.state.msg && (
                            <p style={{ color: "yellow", marginTop: "10px" }}>
                                {this.state.msg}
                            </p>
                        )}
                    
                </div>
                </div>
            </>
        );
    }
}
