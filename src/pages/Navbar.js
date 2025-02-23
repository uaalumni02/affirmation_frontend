import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../static/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // To get the current URL path

  const handleLogout = () => {
    // Clear cookies by setting expiration to past date
    document.cookie.split(";").forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
    });

    // Clear local storage & session storage if used
    sessionStorage.clear();

    // Redirect to home page
    navigate("/");
  };

  const isDashboardPage = location.pathname.includes("dashboard");

  return (
    <nav className="navbar">
      <div className="nav-container">
        <button
          className={`nav-btn ${isDashboardPage ? "inactive" : ""}`} // Add inactive class if on dashboard page
          onClick={() =>
            navigate(`/dashboard/${window.location.pathname.split("/").pop()}`)
          }
          disabled={isDashboardPage} // Disable the button if already on dashboard
        >
          🏠 Dashboard
        </button>
        <button className="nav-btn logout" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
