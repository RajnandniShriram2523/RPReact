// PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import AuthService from "../services/authservice";

export default function PrivateRoute({ children, role }) {
  const isLoggedIn = AuthService.isAuthenticated();
  const userRole = AuthService.getRole();

  // ❌ Not logged in → redirect to login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Logged in but role doesn't match → redirect to login
  if (role && userRole !== role) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Authorized → render the route
  return children;
}
