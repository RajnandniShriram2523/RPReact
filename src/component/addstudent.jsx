import React from "react";
import '../component/addstudent.css';
import AdminSidebar from "./adminslidebar";
import Addstudent from "../services/dataservice";

export default class AddStudent extends React.Component {
    constructor() {
        super();
        this.state = {
            student_name: "",
            student_email: "",
            student_password: "",
            study_year: "",
            errors: {} // For holding error messages
        };
    }
    sendstudentToServer = () => {
        let promise =Addstudent.savestudent(this.state);
        promise
            .then((result) => {
                this.setState({
                    msg: result.data.status,
                    student_name: "",
                    student_email: "",
                    student_password: "",
                    study_year: "",

                });
            })
            .catch((err) => {
                this.setState({ msg: err.msg });
            });
    }

    validateForm = () => {
        const { student_name, student_email, student_password, study_year } = this.state;
        const errors = {};

        if (!student_name.trim()) {
            errors.student_name = "Name is required.";
        }

        if (!student_email.trim()) {
            errors.student_email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(student_email)) {
            errors.student_email = "Email format is invalid.";
        }

        if (!student_password.trim()) {
            errors.student_password = "Password is required.";
        } else if (student_password.length < 6) {
            errors.student_password = "Password must be at least 6 characters.";
        }

        if (!study_year.trim()) {
            errors.study_year = "Study year is required.";
        }

        this.setState({ errors });

        return Object.keys(errors).length === 0;
    };

    handleAddStudent = () => {
        if (this.validateForm()) {
            // Submit logic here
            alert("Student added successfully!");
            this.setState({
                student_name: "",
                student_email: "",
                student_password: "",
                study_year: "",
                errors: {}
            });
        }
    };

    handleClear = () => {
        this.setState({
            student_name: "",
            student_email: "",
            student_password: "",
            study_year: "",
            errors: {}
        });
    };

    render() {
        const { student_name, student_email, student_password, study_year, errors } = this.state;

        return (
            <div className="main4">
                <AdminSidebar />
                <div className="form3"><br></br>
                    <h2 style={{ color: "yellow" }}>ADD STUDENT</h2><br />
                    <input
                        type="text"
                        name="student_name"
                        placeholder="Enter Student Name"
                        value={student_name}
                        onChange={(e) => this.setState({ student_name: e.target.value })}
                    /><br></br>
                    {errors.student_name && <div className="error">{errors.student_name}</div>}

                    <input
                        type="text"
                        name="student_email"
                        placeholder="Enter Student Email"
                        value={student_email}
                        onChange={(e) => this.setState({ student_email: e.target.value })}
                    /><br></br>
                    {errors.student_email && <div className="error">{errors.student_email}</div>}

                    <input
                        type="password"
                        name="student_password"
                        placeholder="Enter Student Password"
                        value={student_password}
                        onChange={(e) => this.setState({ student_password: e.target.value })}
                    /><br></br>
                    {errors.student_password && <div className="error">{errors.student_password}</div>}

                    <input
                        type="text"
                        name="study_year"
                        placeholder="Enter Student Study Year"
                        value={study_year}
                        onChange={(e) => this.setState({ study_year: e.target.value })}
                    /><br></br>
                    {errors.study_year && <div className="error">{errors.study_year}</div>}

                    <div className="buttons">
                        <button className="btn" onClick={this.sendstudentToServer}>Add Student</button>
                        <button className="btn" onClick={this.handleClear}>Clear</button>
                    </div>
                </div>
            </div>
        );
    }
}