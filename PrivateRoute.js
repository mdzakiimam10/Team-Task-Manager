import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, adminOnly = false }) {
  const token = localStorage.getItem("token");

  // ❌ No token → login page
  if (!token) {
    return <Navigate to="/" />;
  }

  let user = null;

  try {
    // 🔥 SAFE DECODE
    user = JSON.parse(atob(token.split(".")[1]));
  } catch (err) {
    // invalid token → logout
    localStorage.removeItem("token");
    return <Navigate to="/" />;
  }

  // ❌ Admin only check
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/dashboard" />;
  }

  return children;
}