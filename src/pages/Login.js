import React, { useState } from "react";
import "../static/login.css";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  // const [InvalidLogin, setInvalidLogin] = useState("");
  // const [loggedIn, setLoggedIn] = useState(false);
  // const [userId, setUserId] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/api/user/login", {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        password,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        // if (response.success == false) {
        //   setInvalidLogin("**Invalid Credentials");
        // } else {
        //   setLoggedIn(true);
        //   setUserId(response.user._id);
        // }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className={`login-container ${darkMode ? "dark-mode" : ""}`}>
      {/* Dark Mode Button */}
      <button className="dark-mode-button" onClick={toggleDarkMode}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <div className="login-left">
        {/* Logo placed next to the title */}
        <div className="login-title">
          <img
            src="/images/logo.webp"
            alt="Positive Affirmations Logo"
            className="logo-image"
          />
          Positive Affirmations
        </div>

        <img
          src="/images/affirmation.png"
          alt="Affirmation"
          className="login-image"
        />
      </div>

      <div className="login-right">
        <h1>Welcome Back</h1>
        <p>Enter your username and password to access your account</p>
        <form className="login-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-options">
            <a href="/forgot-password" className="forgot-password">
              Forgot Password?
            </a>
          </div>
          <button type="submit" className="login-button" onClick={handleSubmit}>
            Login
          </button>
        </form>
        <p>
          Don’t have an account? <a href="/register">Create new account</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
