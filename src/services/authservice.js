import axios from "axios";

class AdminAuthService {
  // 🔹 Admin login
  login({ username, password }) {
    console.log("📌 Admin login request creds:", username, password);
    return axios
      .post("http://localhost:4000/adminLogin", { username, password })
      .then((res) => res.data);
  }

  // 🔹 Student login
  async userlogin(credentials) {
    this.logout(); // Clear old session

    const res = await axios.post("http://localhost:4000/login", credentials);
    const data = res.data;

    console.log("🔍 Full login API response:", data);

    // Store student_id
    const studentId = data?.user?.id || (data.token ? JSON.parse(atob(data.token.split(".")[1])).id : null);
    if (studentId) localStorage.setItem("student_id", studentId);

    // Store token
    if (data?.token) localStorage.setItem("token", data.token);

    // Store role
    localStorage.setItem("role", "student");

    // Store full user object
    if (data?.user) localStorage.setItem("user", JSON.stringify(data.user));

    // ✅ Return full API response (important!)
    return data;
  }

  // 🔹 Register student
  register(studentData) {
    return axios.post("http://localhost:4000/register", studentData).then((res) => res.data);
  }

  // 🔹 Logout (clear everything)
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    localStorage.removeItem("student_id");
  }

  // 🔹 Auth checks
  isAuthenticated() {
    return !!localStorage.getItem("token");
  }

  getToken() {
    return localStorage.getItem("token");
  }

  getRole() {
    return localStorage.getItem("role");
  }

  getstudent_id() {
    return localStorage.getItem("student_id");
  }

  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  // 🔹 Fetch profile
  getProfile() {
    const token = this.getToken();
    return axios
      .get("http://localhost:4000/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  }

  // 🔹 Fetch student history
  getMyHistory() {
    const token = this.getToken();
    const studentId = this.getstudent_id();

    if (!token) return Promise.reject({ error: "No token found" });

    return axios
      .get(`http://localhost:4000/myhistory/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  }
}

export default new AdminAuthService();
