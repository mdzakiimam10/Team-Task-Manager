import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  // 🔥 LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("token"); // token delete
    navigate("/"); // redirect to login
  };

  return (
    <div className="navbar">
      <h2 className="logo">Task Manager</h2>

      <div className="nav-links">
        <Link
          className={location.pathname === "/dashboard" ? "active" : ""}
          to="/dashboard"
        >
          Dashboard
        </Link>

        <Link
          className={location.pathname === "/tasks" ? "active" : ""}
          to="/tasks"
        >
          Tasks
        </Link>

        <Link
          className={location.pathname === "/projects" ? "active" : ""}
          to="/projects"
        >
          Projects
        </Link>

        <Link
          className={location.pathname === "/admin" ? "active" : ""}
          to="/admin"
        >
          Admin
        </Link>

        {/* 🔥 FIXED LOGOUT */}
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}