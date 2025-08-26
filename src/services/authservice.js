import axios from "axios";

class AdminAuthService {
  // Admin login
  login(credentials) {
    return axios
      .post("http://localhost:4000/adminLogin", credentials)
      .then((res) => res.data);
  }

  // Student login
  userlogin(credentials) {
    return axios
      .post("http://localhost:4000/login", credentials)
      .then((res) => res.data);
  }

  // Register student
  register(studentData) {
    return axios
      .post("http://localhost:4000/register", studentData)
      .then((res) => res.data);
  }

  // Store student data in localStorage
  setUserData(data) {
    localStorage.setItem("user", JSON.stringify(data));
  }

  // Logout
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
  }

  isAuthenticated() {
    return !!localStorage.getItem("token");
  }

  getToken() {
    return localStorage.getItem("token");
  }

  getRole() {
    return localStorage.getItem("role");
  }

  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AdminAuthService();
