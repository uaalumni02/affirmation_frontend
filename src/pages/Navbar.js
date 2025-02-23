import React from "react";
import { useNavigate } from "react-router-dom";
import "../static/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  // Handle Logout (Clear cookies & session storage)
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

  return (
    <nav className="navbar">
      <div className="nav-container">
        <button className="nav-btn" onClick={() => navigate(`/dashboard/${window.location.pathname.split('/').pop()}`)}>
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
